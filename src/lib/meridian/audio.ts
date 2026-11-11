/* MERIDIAN — sound. Everything is synthesised in the browser: a slow pad
   that changes key with the age, and short cues for what the voice does.
   No samples, so it ships in the bundle and works offline. */

export type Cue =
  | "ui"
  | "advance"
  | "whisper"
  | "heard"
  | "refused"
  | "found"
  | "era"
  | "death"
  | "broke"
  | "wake"
  | "ending"
  | "unlock";

/** "title", or the index of an age. null is silence. */
export type Scene = number | "title" | null;

export interface Levels {
  master: number;
  music: number;
  sfx: number;
}

/* Four-note chords as MIDI numbers. Each age keeps to its own small world. */
const CHORDS: Record<string, number[][]> = {
  title: [[38, 50, 57, 64], [38, 50, 55, 62], [36, 48, 55, 64]],
  0: [[38, 50, 57, 62], [38, 50, 55, 64], [43, 50, 57, 62]],
  1: [[36, 48, 55, 63], [34, 46, 53, 62], [36, 48, 56, 63]],
  2: [[41, 53, 60, 65], [39, 51, 58, 67], [41, 53, 60, 69]],
  3: [[43, 55, 62, 71], [40, 52, 59, 67], [36, 48, 55, 64], [38, 50, 57, 66]],
  4: [[45, 52, 60, 64], [41, 53, 57, 65], [43, 50, 59, 62], [40, 52, 56, 64]],
  5: [[40, 52, 59, 66], [36, 48, 55, 66], [39, 51, 58, 66]],
  6: [[37, 56, 63, 68], [42, 54, 61, 68], [37, 49, 56, 67]],
};
const CHORD_SECONDS = 16;
const VOICE_LEVEL = 0.055;

const hz = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);

interface Voice {
  a: OscillatorNode;
  b: OscillatorNode;
  gain: GainNode;
}

export class Sound {
  private ctx: BaseAudioContext | null;
  private out: GainNode | null = null;
  private music: GainNode | null = null;
  private sfx: GainNode | null = null;
  private pad: GainNode | null = null;
  private voices: Voice[] = [];
  private levels: Levels = { master: 0.8, music: 0.6, sfx: 0.8 };
  private scene: Scene = null;
  private step = 0;
  private timer: ReturnType<typeof setInterval> | null = null;

  /** Pass a context to render offline; otherwise one is made on the first gesture. */
  constructor(ctx: BaseAudioContext | null = null) {
    this.ctx = ctx;
    if (ctx) this.build(ctx);
  }

  /** Browsers only allow sound after a gesture. Call this from one. */
  unlock(): void {
    if (typeof window === "undefined") return;
    if (!this.ctx) {
      const Make = window.AudioContext ?? (window as any).webkitAudioContext;
      if (!Make) return;
      const ctx: AudioContext = new Make();
      this.ctx = ctx;
      this.build(ctx);
      const scene = this.scene;
      this.scene = null;
      this.setScene(scene);
    }
    const live = this.ctx as AudioContext;
    if (live.state === "suspended" && live.resume) void live.resume().catch(() => {});
  }

  private build(ctx: BaseAudioContext): void {
    const limiter = ctx.createDynamicsCompressor();
    limiter.threshold.value = -14;
    limiter.knee.value = 12;
    limiter.ratio.value = 6;
    limiter.attack.value = 0.005;
    limiter.release.value = 0.25;
    limiter.connect(ctx.destination);

    this.out = ctx.createGain();
    this.out.connect(limiter);
    this.music = ctx.createGain();
    this.music.connect(this.out);
    this.sfx = ctx.createGain();
    this.sfx.connect(this.out);
    this.applyLevels();

    /* the pad: four soft voices through a low filter and two long echoes */
    this.pad = ctx.createGain();
    this.pad.gain.value = 0;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 950;
    filter.Q.value = 0.4;
    this.pad.connect(filter);
    filter.connect(this.music);
    for (const seconds of [0.37, 0.53]) {
      const delay = ctx.createDelay(1);
      delay.delayTime.value = seconds;
      const feedback = ctx.createGain();
      feedback.gain.value = 0.42;
      const damp = ctx.createBiquadFilter();
      damp.type = "lowpass";
      damp.frequency.value = 1400;
      filter.connect(delay);
      delay.connect(damp);
      damp.connect(feedback);
      feedback.connect(delay);
      const wet = ctx.createGain();
      wet.gain.value = 0.35;
      damp.connect(wet);
      wet.connect(this.music);
    }

    for (let i = 0; i < 4; i++) {
      const gain = ctx.createGain();
      gain.gain.value = 0;
      gain.connect(this.pad);
      const a = ctx.createOscillator();
      a.type = "sine";
      const b = ctx.createOscillator();
      b.type = "triangle";
      b.detune.value = 6 + i * 2;
      const soft = ctx.createGain();
      soft.gain.value = 0.35;
      a.connect(gain);
      b.connect(soft);
      soft.connect(gain);
      /* each voice breathes at its own slow rate */
      const breath = ctx.createOscillator();
      breath.frequency.value = 0.05 + i * 0.021;
      const depth = ctx.createGain();
      depth.gain.value = VOICE_LEVEL * 0.3;
      breath.connect(depth);
      depth.connect(gain.gain);
      a.start();
      b.start();
      breath.start();
      this.voices.push({ a, b, gain });
    }
  }

  private applyLevels(): void {
    if (!this.ctx || !this.out || !this.music || !this.sfx) return;
    const t = this.ctx.currentTime;
    this.out.gain.setTargetAtTime(this.levels.master, t, 0.05);
    this.music.gain.setTargetAtTime(this.levels.music, t, 0.05);
    this.sfx.gain.setTargetAtTime(this.levels.sfx, t, 0.05);
  }

  setLevels(levels: Levels): void {
    this.levels = { ...levels };
    this.applyLevels();
  }

  /** Move every voice to a chord, one after another, so the change is never a cut. */
  playChord(chord: number[], at: number): void {
    this.voices.forEach((voice, i) => {
      const t = at + i * 1.7;
      const f = hz(chord[i % chord.length]);
      voice.gain.gain.setTargetAtTime(0, t, 0.5);
      voice.a.frequency.setValueAtTime(f, t + 1.6);
      voice.b.frequency.setValueAtTime(f, t + 1.6);
      voice.gain.gain.setTargetAtTime(VOICE_LEVEL, t + 1.6, 0.9);
    });
  }

  setScene(scene: Scene): void {
    if (scene === this.scene) return;
    this.scene = scene;
    if (!this.ctx || !this.pad) return;
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    const t = this.ctx.currentTime;
    if (scene === null) {
      this.pad.gain.setTargetAtTime(0, t, 0.8);
      return;
    }
    const chords = CHORDS[String(scene)] ?? CHORDS.title;
    this.step = 0;
    this.pad.gain.setTargetAtTime(1, t, 1.5);
    this.playChord(chords[0], t + 0.05);
    if (typeof window !== "undefined" && "resume" in this.ctx) {
      this.timer = setInterval(() => {
        if (!this.ctx) return;
        this.step = (this.step + 1) % chords.length;
        this.playChord(chords[this.step], this.ctx.currentTime + 0.05);
      }, CHORD_SECONDS * 1000);
    }
  }

  private tone(
    freq: number,
    at: number,
    seconds: number,
    level: number,
    type: OscillatorType = "sine",
    endFreq?: number,
  ): void {
    if (!this.ctx || !this.sfx) return;
    const osc = this.ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, at);
    if (endFreq) osc.frequency.exponentialRampToValueAtTime(endFreq, at + seconds);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, at);
    gain.gain.linearRampToValueAtTime(level, at + Math.min(0.02, seconds / 4));
    gain.gain.exponentialRampToValueAtTime(0.0001, at + seconds);
    osc.connect(gain);
    gain.connect(this.sfx);
    osc.start(at);
    osc.stop(at + seconds + 0.05);
  }

  private breath(at: number, seconds: number, level: number, centre: number): void {
    if (!this.ctx || !this.sfx) return;
    const frames = Math.ceil(this.ctx.sampleRate * seconds);
    const buffer = this.ctx.createBuffer(1, frames, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < frames; i++) data[i] = Math.random() * 2 - 1;
    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    const band = this.ctx.createBiquadFilter();
    band.type = "bandpass";
    band.frequency.value = centre;
    band.Q.value = 1.1;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, at);
    gain.gain.linearRampToValueAtTime(level, at + seconds * 0.4);
    gain.gain.linearRampToValueAtTime(0, at + seconds);
    src.connect(band);
    band.connect(gain);
    gain.connect(this.sfx);
    src.start(at);
  }

  play(cue: Cue, at?: number): void {
    if (!this.ctx) return;
    const t = at ?? this.ctx.currentTime + 0.01;
    switch (cue) {
      case "ui":
        this.tone(880, t, 0.05, 0.05);
        break;
      case "advance":
        this.tone(170, t, 0.12, 0.16, "sine", 110);
        break;
      case "whisper":
        this.breath(t, 0.45, 0.14, 1900);
        break;
      case "heard":
        this.tone(hz(74), t, 0.22, 0.09);
        this.tone(hz(81), t + 0.11, 0.3, 0.09);
        break;
      case "refused":
        this.tone(hz(57), t, 0.3, 0.12, "triangle", hz(55));
        break;
      case "found":
        for (const [i, note] of [50, 57, 62, 69].entries()) {
          this.tone(hz(note), t + i * 0.06, 1.4, 0.08);
        }
        break;
      case "era":
        for (const [partial, level] of [[1, 0.14], [2, 0.08], [2.76, 0.05], [5.4, 0.025]]) {
          this.tone(196 * partial, t, 4.2 / Math.sqrt(partial), level);
        }
        this.breath(t, 1.6, 0.05, 700);
        break;
      case "death":
        this.tone(110, t, 2.2, 0.16, "sine", 62);
        this.breath(t + 0.1, 1.8, 0.06, 420);
        break;
      case "broke":
        this.tone(300, t, 0.9, 0.08);
        this.tone(318, t, 0.9, 0.08);
        break;
      case "wake":
        for (const [i, note] of [38, 50, 57, 62, 66, 69, 74].entries()) {
          this.tone(hz(note), t + i * 0.32, 5 - i * 0.3, 0.07);
        }
        break;
      case "ending":
        this.tone(hz(38), t, 3.5, 0.14);
        this.tone(hz(39), t + 0.05, 3.2, 0.07);
        this.tone(hz(45), t + 0.1, 3, 0.06);
        break;
      case "unlock":
        for (const [i, note] of [74, 78, 81].entries()) {
          this.tone(hz(note), t + i * 0.09, 0.5, 0.07);
        }
        break;
    }
  }

  dispose(): void {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    const live = this.ctx as AudioContext | null;
    if (live && "close" in live) void live.close().catch(() => {});
    this.ctx = null;
    this.voices = [];
  }
}
