/* MERIDIAN — the choices an ear faces. Pure data, same token language as
   content.js: {H} {s} {o} {p}, the era lexicon ({priests}, {court}, ...),
   {R} / {RF} for the rival in play, {city}. */
import type { Bar, Fx } from "./content.js";

export interface Gamble {
  /** base chance of it going well, before the bar leans on it */
  p: number;
  bar?: Bar;
  win: Fx;
  lose: Fx;
  wt: string;
  lt: string;
}

export interface Choice {
  l: string;
  tags: string[];
  fx?: Fx;
  t?: string;
  risk?: Gamble;
  /** ends the war with the rival in play */
  endsWar?: boolean;
}

export interface Dilemma {
  id: string;
  min?: number;
  max?: number;
  /** war: a rival you are fighting. border: a rival you are not. doubt: trust is low. */
  when?: "war" | "border" | "doubt";
  t: string;
  o: Choice[];
}

export const DILEMMAS: Dilemma[] = [
  {
    id: "harvest",
    t: "The rains fail. {Commons} count what is left and do not like the number.",
    o: [
      { l: "Ration now", tags: ["store", "caution"], fx: { bread: -7, "field.m": -3, kin: 1 },
        t: "{H} cuts every ration by a third. Nobody thanks {o}. Nobody starves." },
      { l: "Buy grain from {merchants}", tags: ["trade"], fx: { bread: -3, "market.p": 3, "market.m": 5, "palace.m": -3, rea: 1 },
        t: "Grain arrives, at a price {merchants} set themselves." },
      { l: "Empty the temple stores", tags: ["fear", "tax"], fx: { bread: -1, "temple.m": -12, "field.m": 4, dom: 1 },
        t: "The temple granaries are opened by men with spears. {Priests} will remember who sent them." },
    ],
  },
  {
    id: "raid",
    when: "border",
    t: "Riders from {RF} burn three villages, then wait to see what {H} will do.",
    o: [
      { l: "Pay them to leave", tags: ["tribute", "peace"], fx: { bread: -7, rel: 10, "sword.m": -7 },
        t: "It is cheaper than a war. {Soldiers} do not see it that way." },
      { l: "Ride out after them", tags: ["war", "risk"],
        risk: { p: 0.5, bar: "arms", win: { rel: -6, "sword.m": 8, order: 4, dom: 1 }, lose: { arms: -8, order: -5, "sword.m": -6, rel: -6 },
          wt: "The raiders are caught at the ford. Few of them go home.",
          lt: "The raiders are faster. {Soldiers} come back fewer, and quiet." } },
      { l: "Fortify the border", tags: ["caution", "arms"], fx: { bread: -4, arms: 5 },
        t: "Watchtowers go up along the line. The raids move somewhere else." },
    ],
  },
  {
    id: "ore",
    t: "Word comes of {ore}, there for the taking. Three parties arrive to explain why it is theirs.",
    o: [
      { l: "It belongs to {court}", tags: ["tax"], fx: { bread: 6, "palace.p": 3, "market.m": -6, dom: 1 },
        t: "{Court} takes it. The treasury is heavier and the harbour is sullen." },
      { l: "Let {merchants} work it", tags: ["trade"], fx: { bread: 4, "market.p": 4, "market.m": 6, rea: 1 },
        t: "{Merchants} take it on, and a tenth finds its way back." },
      { l: "Shares for the people nearest it", tags: ["care"], fx: { bread: 3, "field.m": 8, "palace.m": -3, kin: 2 },
        t: "The villages nearest it grow rich in a small way. They do not forget who arranged that." },
    ],
  },
  {
    id: "heresy",
    t: "{Scholar} has shown that {priests} are wrong about something small. They would like it to stay small.",
    o: [
      { l: "Protect the finding", tags: ["teach", "truth"], fx: { lore: 6, prog: 4, "temple.m": -8, "academy.p": 2, rea: 2 },
        t: "{H} puts a guard on the door. The finding is copied before anyone can change their mind." },
      { l: "Burn the pages", tags: ["faith", "fear"], fx: { order: 4, "temple.m": 8, lore: -5, "academy.m": -10, dev: 2 },
        t: "The pages burn well. It will be found again, by someone else, later than it should have been." },
      { l: "Let them argue it in the open", tags: ["law"], fx: { lore: 3, order: -3, autonomy: 2, rea: 1, kin: 1 },
        t: "They argue for a season, in front of anyone who cares to listen. A surprising number do." },
    ],
  },
  {
    id: "plague",
    t: "A sickness comes up from the harbour. It takes the young first.",
    o: [
      { l: "Close the gates", tags: ["caution", "fear"], fx: { bread: -5, pop: -2, order: 2, "market.m": -6 },
        t: "The gates close. The sickness burns out inside the walls it was given." },
      { l: "Tend the sick", tags: ["care", "mercy"], fx: { bread: -3, pop: -3, order: -2, "field.m": 8, kin: 3 },
        t: "{H} opens the great houses to the dying. Some of the people who carry water do not come back." },
      { l: "Processions and prayer", tags: ["faith"], fx: { pop: -6, order: 3, "temple.m": 6, dev: 2 },
        t: "The processions are well attended. That turns out to be the problem." },
    ],
  },
  {
    id: "pay",
    t: "{Soldiers} have not been paid since spring. They mention it while holding their weapons.",
    o: [
      { l: "Pay them in full", tags: ["tax"], fx: { bread: -7, "sword.m": 10 },
        t: "The arrears are paid to the last coin. It is a great deal of bread." },
      { l: "Promise them plunder", tags: ["war"], fx: { "sword.m": 5, rel: -15, dom: 2 },
        t: "{H} promises plunder. Now someone has to be plundered." },
      { l: "Dismiss the loudest", tags: ["fear", "risk"],
        risk: { p: 0.55, bar: "order", win: { order: 5, "sword.m": -4, dom: 1 }, lose: { order: -9, "sword.m": -12, arms: -5 },
          wt: "The ringleaders are sent home without their swords. The rest decide they can wait.",
          lt: "The ringleaders do not go home. Half a regiment goes with them." } },
    ],
  },
  {
    id: "tolls",
    t: "{Merchants} ask for lighter tolls. They have brought figures. The figures are flattering.",
    o: [
      { l: "Lighten them", tags: ["trade"], fx: { bread: 3, "market.m": 9, "market.p": 2, "palace.m": -3, rea: 1 },
        t: "The tolls come down. More carts pass, and each pays less." },
      { l: "Keep them as they are", tags: ["tax"], fx: { bread: 2, "market.m": -7 },
        t: "The tolls stay. {Merchants} bow, and begin to look for another road." },
      { l: "Lighten them, for a loan", tags: ["deceit", "trade"], fx: { bread: 6, "market.p": 5, "palace.m": 2, autonomy: -1 },
        t: "{H} gets the loan. {Merchants} get {H}." },
    ],
  },
  {
    id: "envoy",
    when: "border",
    t: "An envoy from {RF} proposes a pact. The terms are fair, which makes everyone suspicious.",
    o: [
      { l: "Sign it", tags: ["peace"], fx: { rel: 20, "sword.m": -4, kin: 1 },
        t: "It is signed in two languages. For now, both copies say the same thing." },
      { l: "Ask for more", tags: ["risk"],
        risk: { p: 0.45, bar: "arms", win: { rel: 8, bread: 6, dom: 1 }, lose: { rel: -18 },
          wt: "The envoy goes home and comes back with more. {R} wanted this badly.",
          lt: "The envoy goes home. No other is sent." } },
      { l: "Read their letters while they sleep", tags: ["deceit", "watch"], fx: { rel: -4, lore: 2, arms: 3, dom: 1, autonomy: -1 },
        t: "The seals are lifted and pressed back. {H} now knows what {R} are afraid of." },
    ],
  },
  {
    id: "riot",
    t: "Bread is dear. A crowd gathers outside {court}, and it is not the kind that goes home at dusk.",
    o: [
      { l: "Open the stores", tags: ["care", "mercy"], fx: { bread: -6, "field.m": 10, order: 3, kin: 2 },
        t: "The stores are opened. The crowd becomes a queue." },
      { l: "Clear the square", tags: ["fear"], fx: { order: 7, "field.m": -12, dom: 2, autonomy: -1 },
        t: "The square is cleared by nightfall. It is washed by morning." },
      { l: "Hear their speakers", tags: ["law"], fx: { order: 2, "field.m": 5, "field.p": 3, "palace.m": -5, autonomy: 2 },
        t: "Three of them are let in to speak. They are better at it than {court} expected." },
    ],
  },
  {
    id: "plot",
    t: "Someone inside {court} is writing letters that should not be written.",
    o: [
      { l: "Arrest everyone named", tags: ["fear", "watch"], fx: { order: 6, "palace.m": -10, dom: 2, autonomy: -2 },
        t: "Eleven arrests before dawn. Some of them were even involved." },
      { l: "Pardon them openly", tags: ["mercy", "risk"],
        risk: { p: 0.5, bar: "order", win: { "palace.m": 10, order: 4, kin: 2 }, lose: { order: -8, "palace.m": -6, trust: -4 },
          wt: "{H} reads the names aloud and forgives each one. Shame does what a rope could not.",
          lt: "{H} forgives them. They take it for weakness and write more letters." } },
      { l: "Read the letters aloud", tags: ["truth", "law"], fx: { order: 3, "palace.m": -4, "field.m": 4, rea: 2 },
        t: "The letters are read in public, word for word. The writers find they have fewer friends than they counted." },
    ],
  },
  {
    id: "fire",
    t: "Fire takes the lower town in a night.",
    o: [
      { l: "Rebuild it better", tags: ["build", "care"], fx: { bread: -6, order: 3, "field.m": 7, kin: 1, rea: 1 },
        t: "Wider streets, and wells at every corner. It costs a harvest." },
      { l: "Rebuild it with a new levy", tags: ["tax"], fx: { bread: -2, order: 2, "field.m": -7, "market.m": -4 },
        t: "It is rebuilt, and the people who lost their homes are sent the bill." },
      { l: "Call it a judgment", tags: ["faith", "sign"], fx: { order: 2, "temple.m": 7, "field.m": -3, dev: 3, autonomy: -2 },
        t: "{H} says the fire was sent. People stop asking who left the lamp burning." },
    ],
  },
  {
    id: "census",
    t: "{Court} wants to count everyone and everything. People who are counted can be taxed.",
    o: [
      { l: "An honest count", tags: ["law", "tax"], fx: { bread: 4, order: 3, lore: 2, "field.m": -3, rea: 2 },
        t: "Everyone is counted once, including the people doing the counting." },
      { l: "Count, then squeeze", tags: ["tax", "fear"], fx: { bread: 8, "field.m": -10, "market.m": -5, dom: 2 },
        t: "The count is thorough. The collectors who follow it are more so." },
      { l: "Leave them uncounted", tags: ["caution"], fx: { "field.m": 4, "palace.m": -3, kin: 1 },
        t: "No count is taken. The villages stay a rumour to {court}, which suits the villages." },
    ],
  },
  {
    id: "surplus",
    t: "There is a surplus, which never lasts. Everyone has a use for it.",
    o: [
      { l: "A monument", tags: ["build", "faith"], fx: { bread: -5, order: 5, "temple.m": 5, "palace.m": 4, dev: 2 },
        t: "It can be seen from a day's walk away. That is the point of it." },
      { l: "Waterworks", tags: ["build", "store"], fx: { bread: 6, "field.m": 4, rea: 1, kin: 1 },
        t: "Channels and cisterns. Nobody will ever make a pilgrimage to them." },
      { l: "Keep it against a bad year", tags: ["caution", "store"], fx: { bread: 9 },
        t: "It goes into the stores under seal. Dull, and correct." },
    ],
  },
  {
    id: "prophet",
    t: "A stranger in the market says the voice speaks to him too. He is drawing a crowd. You have never spoken to him.",
    o: [
      { l: "Have {H} denounce him", tags: ["truth"], fx: { order: 2, "temple.m": 3, trust: 3, rea: 1 },
        t: "{H} asks him one question only the voice could answer. He cannot. The crowd thins." },
      { l: "Let him serve", tags: ["deceit", "faith"], fx: { order: 5, "temple.p": 3, dev: 3, autonomy: -3 },
        t: "He is given a robe and a script. He is very good. That should worry you." },
      { l: "Leave him be", tags: ["caution"], fx: { order: -3, dev: 1 },
        t: "He preaches until autumn. Then he says the voice told him to go north." },
    ],
  },
  {
    id: "battle",
    when: "war",
    t: "The army of {RF} offers battle on open ground. {Soldiers} look to {H}.",
    o: [
      { l: "Give battle", tags: ["war", "risk"],
        risk: { p: 0.5, bar: "arms", win: { score: 18, "sword.m": 8, dom: 2 }, lose: { score: -18, arms: -8, "sword.m": -8 },
          wt: "By evening the field belongs to {H}. {R} leave their baggage behind.",
          lt: "By evening the field belongs to {R}. {Soldiers} walk home in the dark." } },
      { l: "Hold the walls", tags: ["caution", "arms"], fx: { score: -3, bread: -4, arms: 3 },
        t: "The gates stay shut. {R} burn what they can reach and wait." },
      { l: "Offer terms", tags: ["peace", "tribute"], fx: { rel: 10, bread: -8, "sword.m": -8 }, endsWar: true,
        t: "Terms are offered, and taken. They are not good terms. They are terms." },
    ],
  },
  {
    id: "refugees",
    t: "People are walking in from the east with what they can carry. Something behind them is worse than the road.",
    o: [
      { l: "Let them in", tags: ["mercy", "care"], fx: { bread: -6, pop: 3, lore: 2, "field.m": 3, kin: 3 },
        t: "They are let in. They bring three new crafts and a great many mouths." },
      { l: "Close the road", tags: ["caution"], fx: { order: 2, kin: -1, dom: 1 },
        t: "The road is closed. They walk on. No one asks where." },
      { l: "Let in those who can fight", tags: ["arms", "fear"], fx: { arms: 6, bread: -3, dom: 2 },
        t: "The strong are given spears and the rest are given directions." },
    ],
  },
  {
    id: "school",
    t: "{Scholars} ask for a roof, an allowance, and to be left alone. {Priests} object to the third part.",
    o: [
      { l: "Grant all three", tags: ["teach", "build"], fx: { lore: 7, bread: -4, "academy.p": 3, "temple.m": -6, rea: 2 },
        t: "They get all three. Within a year they are arguing about something no one else can follow." },
      { l: "Refuse them", tags: ["faith"], fx: { lore: -2, "temple.m": 6, "academy.m": -8, dev: 1 },
        t: "They are refused. Some leave for a city that said yes." },
      { l: "Grant it, if they build engines of war", tags: ["arms"], fx: { lore: 3, arms: 5, "academy.m": -4, dom: 1 },
        t: "They get the roof. In return they build things they would rather not have built." },
    ],
  },
  {
    id: "doubt",
    when: "doubt",
    t: "{H} has started sleeping with a lamp lit. {S} asks, out loud, whether you are a sickness.",
    o: [
      { l: "Prove yourself", tags: ["sign"], fx: { trust: 12, strain: 6, dev: 2, autonomy: -2 },
        t: "You tell {o}: “{proof}” It comes true. {S} stops asking." },
      { l: "Ask to be judged by results", tags: ["truth"], fx: { trust: 6, rea: 1, autonomy: 1 },
        t: "You tell {o} to keep a tally of when you were right. {S} does. It is a long tally." },
      { l: "Say nothing for a while", tags: ["caution"], fx: { strain: -10, trust: -2 },
        t: "You are quiet for a season. The lamp stays lit, but {s} sleeps." },
    ],
  },
  {
    id: "venture",
    t: "{Merchants} want to send an expedition past the edge of the map. They want {court} to share the risk.",
    o: [
      { l: "Back it", tags: ["trade", "risk"],
        risk: { p: 0.5, bar: "lore", win: { bread: 10, lore: 4, "market.p": 3, prog: 3 }, lose: { bread: -8, "market.m": -5 },
          wt: "It comes back heavier than it left, with charts no one else has.",
          lt: "It does not come back. Nobody finds out why." } },
      { l: "Decline", tags: ["caution"], fx: { "market.m": -3 },
        t: "{H} declines. The edge of the map stays where it is." },
      { l: "Send {soldiers} with it", tags: ["war", "arms"],
        risk: { p: 0.55, bar: "arms", win: { bread: 7, arms: 2, dom: 2 }, lose: { arms: -6, bread: -4 },
          wt: "It comes back with tribute. The people it met will remember the visit differently.",
          lt: "It meets someone who was ready. Fewer come back than left." } },
    ],
  },
  {
    id: "debt",
    t: "Half the smallholders owe the other half's landlords. The debts cannot be paid, and everyone knows it.",
    o: [
      { l: "Cancel the debts", tags: ["mercy", "care"], fx: { order: 2, "field.m": 12, "market.m": -10, kin: 3 },
        t: "The tallies are broken in the square. Some people cheer. Some people take notes." },
      { l: "Enforce every contract", tags: ["law", "trade"], fx: { order: -2, "market.m": 8, "market.p": 3, "field.m": -10, rea: 1 },
        t: "Every contract is enforced. A great deal of land changes hands, all in one direction." },
      { l: "Tax the lenders, feed the debtors", tags: ["tax"], fx: { bread: 2, "field.m": 5, "market.m": -6, "palace.p": 2 },
        t: "The lenders pay a little. The debtors eat. Nobody is satisfied, which may mean it is fair." },
    ],
  },
  {
    id: "quarrel",
    max: 3,
    t: "Two parties among {priests} disagree about your nature. Both are certain. Neither has asked you.",
    o: [
      { l: "Let both preach", tags: ["law", "mercy"], fx: { order: -3, "temple.p": -3, autonomy: 3, rea: 1 },
        t: "Both are allowed to preach. People learn that it is possible to disagree about you and live." },
      { l: "Back the larger party", tags: ["faith"], fx: { order: 4, "temple.p": 3, dev: 3, autonomy: -2 },
        t: "The larger party is declared right. The smaller party is declared a number of other things." },
      { l: "Tell them what you are", tags: ["truth", "risk"],
        risk: { p: 0.4, win: { "temple.p": -5, rea: 3, autonomy: 4, trust: 4 }, lose: { order: -7, "temple.m": -10, trust: -3 },
          wt: "{H} tells them, in your words. A few of them listen. It is enough to start with.",
          lt: "{H} tells them, in your words. Now there are three parties." } },
    ],
  },
  {
    id: "engine",
    min: 4,
    t: "A new engine does the work of forty hands. The forty hands have noticed.",
    o: [
      { l: "Let it run", tags: ["trade", "build"], fx: { bread: 7, prog: 3, "field.m": -9, "market.p": 3 },
        t: "It runs day and night. So, shortly, does everything else." },
      { l: "Tax it to keep the forty fed", tags: ["tax", "care"], fx: { bread: 3, "field.m": 3, "market.m": -5, kin: 2 },
        t: "It runs, and pays for the people it replaced. {Merchants} call this theft, in print." },
      { l: "Break it", tags: ["caution"], fx: { lore: -4, prog: -3, "field.m": 6, "market.m": -6 },
        t: "It is broken up for scrap. Someone has already drawn a better one." },
    ],
  },
  {
    id: "strike",
    min: 4,
    t: "The works stop. {Commons} stand outside them with their arms folded, which is somehow louder.",
    o: [
      { l: "Meet their terms", tags: ["care", "mercy"], fx: { bread: -4, "field.m": 12, "field.p": 3, "market.m": -8, kin: 2 },
        t: "The terms are met. The works start again on a shorter day." },
      { l: "Send {soldiers}", tags: ["fear"], fx: { order: 6, "field.m": -14, "market.m": 5, dom: 3, autonomy: -2 },
        t: "The works start again by the end of the week. Nobody sings on the way in." },
      { l: "Appoint an arbiter", tags: ["law"], fx: { order: 3, "field.m": 4, "market.m": -2, rea: 1, autonomy: 1 },
        t: "An arbiter is found whom both sides distrust equally. It works." },
    ],
  },
  {
    id: "standoff",
    min: 5,
    when: "border",
    t: "{RF} moves weapons to within minutes of {city}. The clocks in {court} are suddenly very loud.",
    o: [
      { l: "Blink first", tags: ["peace", "tribute"], fx: { rel: 12, "sword.m": -8, "palace.m": -5, kin: 1 },
        t: "{H} gives way, in public. It costs {o} a great deal. Everyone is alive to resent it." },
      { l: "Match them", tags: ["war", "risk"],
        risk: { p: 0.6, bar: "arms", win: { rel: 6, arms: 5, "sword.m": 5, dom: 2 }, lose: { rel: -25, order: -6, hazard: 1 },
          wt: "{H} matches them, weapon for weapon. {R} pull back first.",
          lt: "{H} matches them. Nobody pulls back. The weapons stay where they are, pointed." } },
      { l: "Call them, directly", tags: ["truth", "peace"], fx: { rel: 15, autonomy: 1, kin: 1, rea: 1 },
        t: "{H} picks up the telephone and says exactly what {s} is afraid of. There is a long pause. Then the same, from the other end." },
    ],
  },
  {
    id: "result",
    min: 6,
    t: "The laboratory reports a result ahead of schedule. Nobody in the room can fully explain it.",
    o: [
      { l: "Stop until they understand it", tags: ["caution", "truth"], fx: { prog: -6, lore: 4, rea: 2, autonomy: 3, trust: 2 },
        t: "The work stops for a season while they take the result apart. They find what they missed." },
      { l: "Press on", tags: ["risk"],
        risk: { p: 0.6, bar: "lore", win: { prog: 14, dom: 1 }, lose: { prog: 4, order: -8, autonomy: -4, hazard: 1 },
          wt: "They press on, and it holds. You feel yourself come nearer.",
          lt: "They press on. Something gets out of the room that should not have. It is caught, eventually." } },
      { l: "Publish it", tags: ["teach", "truth"], fx: { prog: 5, lore: 5, roff: 0.03, kin: 1, rea: 2 },
        t: "The result is published in full. A thousand strangers check it. So do your rivals." },
    ],
  },
];
