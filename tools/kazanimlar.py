#!/usr/bin/env python3
"""docs/tymm_*sinif_raw.md dosyalarından öğrenme çıktısı metinlerini ve ünite adlarını çıkarır
→ docs/kazanimlar.json (öğretmen sayfası kullanır). Kullanım: python3 tools/kazanimlar.py"""
import json, re, glob
out = {'kazanim': {}, 'unite': {}}
for f in sorted(glob.glob('docs/tymm_*sinif_raw.md')):
    g = re.search(r'tymm_(\d)sinif', f).group(1)
    for line in open(f, encoding='utf-8'):
        m = re.match(r'\s*## ÜNİTE (\d+) — (.+?) \(unite/', line)
        if m:
            out['unite'][f'{g}.{m.group(1)}'] = re.sub(r' Ve ', ' ve ', m.group(2).strip())
        m = re.match(r'\s*- (FB\.\d+\.\d+\.\d+)\.?\s*(.+?)\.?\s*$', line.replace('**', ''))
        if m and m.group(1) not in out['kazanim']:
            out['kazanim'][m.group(1)] = m.group(2).strip()
json.dump(out, open('docs/kazanimlar.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(len(out['kazanim']), 'kazanım,', len(out['unite']), 'ünite → docs/kazanimlar.json')
