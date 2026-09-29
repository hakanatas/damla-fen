import sys
from PIL import Image, ImageDraw
out, fs = sys.argv[1], sys.argv[2:]
W, H = 960, 540; cols = 2; rows = (len(fs) + 1) // 2
c = Image.new('RGB', (W * cols, H * rows), 'white')
for i, f in enumerate(fs):
    im = Image.open(f).resize((W, H)); c.paste(im, ((i % cols) * W, (i // cols) * H))
    ImageDraw.Draw(c).text(((i % cols) * W + 8, (i // cols) * H + 8), f.split('/')[-1], fill='red')
c.save(out, quality=85)
