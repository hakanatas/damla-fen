#!/usr/bin/env python3
"""Seslendirme + zamanlama üretici.
Kullanım: python3 tools/tts.py films/01-gunes
 - narration.js'deki her cümleyi Türkçe nöral sesle mp3'e çevirir (edge-tts)
 - süreleri ölçer, timing.js (sahnelerin kullandığı zaman çizelgesi) ve altyazı .srt üretir
Ses dosyası zaten varsa ve metin değişmediyse yeniden üretmez.
"""
import sys, os, json, subprocess, asyncio, hashlib, ssl
film = sys.argv[1].rstrip('/')
SILENT = '--silent' in sys.argv  # sessiz sürüm: seslendirme yok, süreler okuma hızına göre
WPS = float(next((a.split('=')[1] for a in sys.argv if a.startswith('--wps=')), '1.7'))  # okuma hızı (kelime/sn): 5.sınıf 1.7, 6: 1.85, 7: 2.0, 8: 2.1
N = json.loads(subprocess.check_output(['node', '-e', f"console.log(JSON.stringify(require('./{film}/narration.js')))"]))
os.makedirs(f'{film}/audio', exist_ok=True)

def dur(p):
    return float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p]).strip())

async def synth(text, out):
    import certifi
    ca = os.environ.get('TTS_CA', '/root/.ccr/ca-bundle.crt')
    if os.path.exists(ca):
        import edge_tts.communicate as c
        c._SSL_CTX = ssl.create_default_context(cafile=ca)
    import edge_tts
    await edge_tts.Communicate(text, N['voice'], rate=N['rate'], pitch=N['pitch']).save(out)

t = 0.0
timing = {}
srt = []
for i, b in enumerate(N['beats']):
    s = t
    d = 0.0
    if b['text'] and SILENT:
        words = len(b['text'].split())
        d = round(words / WPS + 1.0, 3)          # 5. sınıf okuma hızı ≈ 1,7 kelime/sn + 1 sn pay
        srt.append((s + 0.05, s + d, b['text']))
    elif b['text']:
        h = hashlib.md5((b['text'] + N['voice'] + N['rate'] + N['pitch']).encode()).hexdigest()[:8]
        mp = f"{film}/audio/{i:02d}_{b['id']}_{h}.mp3"
        if not os.path.exists(mp):
            for f in os.listdir(f'{film}/audio'):
                if f.startswith(f"{i:02d}_{b['id']}_"): os.remove(f'{film}/audio/' + f)
            asyncio.run(synth(b['text'], mp))
        d = dur(mp)
        b['file'] = mp
        srt.append((s + 0.05, s + d, b['text']))
    length = max(d + b.get('pad', 0.8), b.get('min', 0))
    timing[b['id']] = {'s': round(s, 3), 'e': round(s + length, 3), 'speech': round(d, 3), 'i': i}
    t += length

total = round(t, 3)
with open(f'{film}/timing.js', 'w') as f:
    f.write('// OTOMATİK ÜRETİLDİ (tools/tts.py) — elle düzenlemeyin; narration.js\'i düzenleyip yeniden çalıştırın\n')
    f.write('const TIMING = ' + json.dumps({'total': total, 'silent': SILENT, 'beats': timing}, ensure_ascii=False, indent=1) + ';\n')
    f.write("if (typeof module !== 'undefined') module.exports = TIMING; else window.TIMING = TIMING;\n")

def ts(x):
    ms = int(round(x * 1000)); h, ms = divmod(ms, 3600000); m, ms = divmod(ms, 60000); s, ms = divmod(ms, 1000)
    return f'{h:02d}:{m:02d}:{s:02d},{ms:03d}'
# split long lines into ≤2 lines of ~42 chars for young readers
def wrap(txt, n=42):
    words, lines, cur = txt.split(), [], ''
    for w in words:
        if len(cur) + len(w) + 1 > n and cur: lines.append(cur); cur = w
        else: cur = (cur + ' ' + w).strip()
    lines.append(cur); return lines
cues = []
for s, e, txt in srt:
    ls = wrap(txt)
    if len(ls) <= 2: cues.append((s, e, '\n'.join(ls)))
    else:  # split by time proportionally into 2-line chunks
        chunks = ['\n'.join(ls[k:k + 2]) for k in range(0, len(ls), 2)]
        tot = sum(len(c) for c in chunks); cs = s
        for c in chunks:
            ce = cs + (e - s) * len(c) / tot; cues.append((cs, ce, c)); cs = ce
with open(f'{film}/{N["film"]}.srt', 'w') as f:
    for k, (s, e, txt) in enumerate(cues, 1):
        f.write(f'{k}\n{ts(s)} --> {ts(e)}\n{txt}\n\n')
with open(f'{film}/audio/cues.json', 'w') as f:
    json.dump([] if SILENT else [{'file': b['file'], 's': timing[b['id']]['s']} for b in N['beats'] if b.get('file')], f)
print('toplam süre:', total, 'sn;', len(cues), 'altyazı')
