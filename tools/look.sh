#!/bin/bash
# usage: tools/look.sh films/NN-slug t1 t2 ...  → /tmp/sh-NN-slug/grid.jpg (2 sütunlu kontrol ızgarası)
F=${1%/}; shift; N=$(basename $F); O=/tmp/sh-$N
cd "$(dirname "$0")/.." || exit 1
rm -rf $O; NODE_PATH=$(npm root -g) node tools/shots.js $F $O "$@" | grep -v "^t=" ; python3 tools/grid.py $O/grid.jpg $(ls $O/t*.jpg | sort -t t -k2 -g)
echo "$O/grid.jpg"
