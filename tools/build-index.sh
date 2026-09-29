#!/bin/bash
# usage: tools/build-index.sh films/NN-slug   → (yeniden) films/NN-slug/index.html üretir
# scenes/*.js dosyalarını ada göre sıralı yükler; film klasöründe props.js varsa onu da ekler; ../_shared/*.js varsa onları da.
F=${1%/}; cd "$(dirname "$0")/.." || exit 1
SC=""; for s in $(ls $F/scenes/*.js | sort); do SC="$SC<script src=\"scenes/$(basename $s)\"></script>\n"; done
EX=""; for s in $(ls films/_shared/*.js 2>/dev/null | sort); do EX="$EX<script src=\"../_shared/$(basename $s)\"></script>\n"; done
[ -f $F/props.js ] && EX="$EX<script src=\"props.js\"></script>\n"
python3 - "$F" "$SC" "$EX" <<'PY'
import sys
f,sc,ex=sys.argv[1],sys.argv[2].replace('\\n','\n'),sys.argv[3].replace('\\n','\n')
t=open('tools/template/index.html').read().replace('<!--SCENES-->\n',sc).replace('<!--EXTRA-->\n',ex)
open(f+'/index.html','w').write(t)
PY
echo "index.html → $F"
