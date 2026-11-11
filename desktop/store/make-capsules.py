"""Cut the Steam store and library images from the key art in source/.

Run from this folder:  python3 make-capsules.py
Everything is derived by cropping, scaling and compositing the three source
images, so re-running it after replacing them with higher-resolution renders
regenerates the whole set.
"""
from pathlib import Path
from PIL import Image, ImageChops, ImageDraw, ImageFilter

HERE = Path(__file__).parent
SRC = HERE / "source"
OUT = HERE / "capsules"
OUT.mkdir(exist_ok=True)

horizon = Image.open(SRC / "key-art-horizon.jpg").convert("RGB")
planet_art = Image.open(SRC / "key-art-planet.jpg").convert("RGB")
mark_art = Image.open(SRC / "wordmark.jpg").convert("RGB")


def cover(im, w, h, focus=(0.5, 0.5)):
    """Scale to fill w x h and crop around a focus point."""
    scale = max(w / im.width, h / im.height)
    big = im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)
    left = round((big.width - w) * focus[0])
    top = round((big.height - h) * focus[1])
    return big.crop((left, top, left + w, top + h))


def feather(im, edge):
    """Fade an image to black at its borders so it sits on black without a seam."""
    mask = Image.new("L", im.size, 0)
    ImageDraw.Draw(mask).rectangle((edge, edge, im.width - edge, im.height - edge), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(edge / 2))
    return Image.composite(im, Image.new("RGB", im.size, (0, 0, 0)), mask)


def wordmark():
    """The lettering alone, tight, as a greyscale mask."""
    grey = mark_art.convert("L")
    box = grey.point(lambda v: 255 if v > 40 else 0).getbbox()
    pad = 12
    return grey.crop((box[0] - pad, box[1] - pad, box[2] + pad, box[3] + pad))


# the planet with nothing written on it: everything above the baked lettering
planet = planet_art.crop((0, 0, planet_art.width, 590))


def portrait(w, h):
    """Tall formats: the planet above, the lettering below, on black."""
    canvas = Image.new("RGB", (w, h), (0, 0, 0))
    globe = planet.crop((860, 60, 1680, 590))
    scale = (w * 1.28) / globe.width
    globe = globe.resize((round(globe.width * scale), round(globe.height * scale)), Image.LANCZOS)
    globe = feather(globe, round(globe.width * 0.06))
    layer = Image.new("RGB", (w, h), (0, 0, 0))
    layer.paste(globe, (round((w - globe.width) / 2), round(h * 0.08)))
    canvas = ImageChops.lighter(canvas, layer)
    mark = wordmark()
    mw = round(w * 0.82)
    mark = mark.resize((mw, round(mark.height * mw / mark.width)), Image.LANCZOS)
    text = Image.new("RGB", (w, h), (0, 0, 0))
    text.paste(Image.merge("RGB", (mark, mark, mark)), (round((w - mw) / 2), round(h * 0.76)))
    return ImageChops.lighter(canvas, text)


jobs = {
    "header_capsule_920x430.jpg": cover(horizon, 920, 430, (0.5, 0.5)),
    "small_capsule_462x174.jpg": cover(horizon, 462, 174, (0.5, 0.5)),
    "main_capsule_1232x706.jpg": cover(horizon, 1232, 706, (0.5, 0.5)),
    "library_header_920x430.jpg": cover(horizon, 920, 430, (0.5, 0.5)),
    "vertical_capsule_748x896.jpg": portrait(748, 896),
    "library_capsule_600x900.jpg": portrait(600, 900),
    "library_hero_3840x1240.jpg": cover(planet, 3840, 1240, (0.5, 0.35)),
    "page_background_1438x810.jpg": cover(planet, 1438, 810, (0.5, 0.2)).point(lambda v: int(v * 0.55)),
}
for name, image in jobs.items():
    image.save(OUT / name, quality=92)
    print(name, image.size)

# library logo: the lettering in white on a transparent field
mark = wordmark()
logo = Image.new("RGBA", (1280, 720), (0, 0, 0, 0))
mw = 1120
mark = mark.resize((mw, round(mark.height * mw / mark.width)), Image.LANCZOS)
white = Image.new("RGBA", mark.size, (255, 255, 255, 255))
white.putalpha(mark)
logo.paste(white, ((1280 - mw) // 2, (720 - mark.height) // 2), white)
logo.save(OUT / "library_logo_1280x720.png")
print("library_logo_1280x720.png", logo.size)
