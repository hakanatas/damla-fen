#!/usr/bin/env python3
"""Ses miksajı: seslendirme cümleleri + yumuşak, prosedürel fon müziği → audio/mix.m4a
Kullanım: python3 tools/audio.py films/01-gunes"""
import sys, json, subprocess, numpy as np, wave, os
film = sys.argv[1].rstrip('/')
T = json.loads(subprocess.check_output(['node', '-e', f"console.log(JSON.stringify(require('./{film}/timing.js')))"]))
cues = json.load(open(f'{film}/audio/cues.json'))
SR = 44100; total = T['total']; N = int(SR * (total + 0.5))
import zlib
SEED = zlib.crc32(film.encode()) % 100000
rng = np.random.default_rng(SEED)

# ---- procedural music: warm pad + music-box plucks (C major pentatonic), seeded ----
t = np.arange(N) / SR
music = np.zeros(N)
def note(f): return 440 * 2 ** ((f - 69) / 12)
PROGS = [[[48, 55, 64], [45, 52, 60], [41, 48, 57], [43, 50, 59]], [[41, 48, 57], [43, 50, 59], [48, 55, 64], [45, 52, 60]], [[45, 52, 60], [41, 48, 57], [48, 55, 64], [43, 50, 59]], [[48, 55, 64], [41, 48, 57], [45, 52, 60], [43, 50, 59]]]
chords = PROGS[SEED % 4]  # film'e göre değişen akor dizisi
bar = 4 * 60 / 70  # 70 bpm
for i in range(int(total / bar) + 1):
    s = int(i * bar * SR); e = min(N, int((i + 1) * bar * SR) + SR)
    if s >= N: break
    seg = np.arange(e - s) / SR
    env = np.minimum(1, seg / 1.2) * np.exp(-np.maximum(0, seg - bar) * 2.0)
    for m in chords[i % 4]:
        f = note(m)
        music[s:e] += 0.05 * env * (np.sin(2 * np.pi * f * seg) + 0.3 * np.sin(2 * np.pi * 2 * f * seg + 0.3))
pent = [72, 74, 76, 79, 81, 84]
beat = 60 / 70
for k in range(int(total / beat * 2)):
    if rng.random() < 0.42:
        s = int(k * beat / 2 * SR);
        if s >= N: break
        m = pent[rng.integers(len(pent))]; f = note(m); L = min(N - s, int(SR * 1.6)); seg = np.arange(L) / SR
        env = np.exp(-seg * 3.2) * np.minimum(1, seg / 0.005)
        music[s:s + L] += 0.07 * env * (np.sin(2 * np.pi * f * seg) + 0.25 * np.sin(2 * np.pi * 3 * f * seg))
# gentle fades
fade = np.minimum(1, t / 3) * np.minimum(1, (total - t) / 4).clip(0, 1)
music *= fade / (np.abs(music).max() + 1e-9) * 0.9
# duck music under speech
duck = np.ones(N)
for b in T['beats'].values():
    if b['speech'] > 0:
        s, e = int((b['s'] - 0.2) * SR), int((b['s'] + b['speech'] + 0.3) * SR)
        duck[max(0, s):min(N, e)] = 0.45 if cues else 0.8
k = int(0.25 * SR); duck = np.convolve(duck, np.ones(k) / k, mode='same')
music *= duck
wav = f'{film}/audio/music.wav'
with wave.open(wav, 'w') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((music * 32767 * 0.9).astype(np.int16).tobytes())

# ---- mix with ffmpeg ----
inputs = ['-i', wav]; filt = []
for i, c in enumerate(cues):
    inputs += ['-i', c['file']]; d = int(c['s'] * 1000)
    filt.append(f'[{i + 1}:a]aresample=44100,adelay={d}|{d},volume=1.0[v{i}]')
mixin = ('[0:a]volume=0.32[m];' + ';'.join(filt) + ';[m]' + ''.join(f'[v{i}]' for i in range(len(cues))) + f'amix=inputs={len(cues) + 1}:normalize=0:duration=first,loudnorm=I=-16:TP=-1.5:LRA=11[out]') if cues else '[0:a]loudnorm=I=-22:TP=-2:LRA=11[out]'
out = f'{film}/audio/mix.m4a'
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error'] + inputs + ['-filter_complex', mixin, '-map', '[out]', '-t', str(total), '-c:a', 'aac', '-b:a', '160k', out], check=True)
print('mix:', out)
