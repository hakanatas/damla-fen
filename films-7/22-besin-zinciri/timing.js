// OTOMATİK ÜRETİLDİ (tools/tts.py) — elle düzenlemeyin; narration.js'i düzenleyip yeniden çalıştırın
const TIMING = {
 "total": 187.5,
 "silent": true,
 "beats": {
  "title": {
   "s": 0.0,
   "e": 5.5,
   "speech": 0.0,
   "i": 0
  },
  "meadow": {
   "s": 5.5,
   "e": 12.6,
   "speech": 6.5,
   "i": 1
  },
  "question": {
   "s": 12.6,
   "e": 18.4,
   "speech": 5.0,
   "i": 2
  },
  "group": {
   "s": 18.4,
   "e": 26.4,
   "speech": 7.0,
   "i": 3
  },
  "producer": {
   "s": 26.4,
   "e": 32.5,
   "speech": 5.5,
   "i": 4
  },
  "consumer": {
   "s": 32.5,
   "e": 37.6,
   "speech": 4.5,
   "i": 5
  },
  "decomposer": {
   "s": 37.6,
   "e": 44.9,
   "speech": 6.5,
   "i": 6
  },
  "chain": {
   "s": 44.9,
   "e": 53.9,
   "speech": 5.5,
   "i": 7
  },
  "arrows": {
   "s": 53.9,
   "e": 62.0,
   "speech": 7.5,
   "i": 8
  },
  "sun": {
   "s": 62.0,
   "e": 68.8,
   "speech": 6.0,
   "i": 9
  },
  "cause": {
   "s": 68.8,
   "e": 74.9,
   "speech": 5.5,
   "i": 10
  },
  "effect": {
   "s": 74.9,
   "e": 83.9,
   "speech": 8.0,
   "i": 11
  },
  "recycle": {
   "s": 83.9,
   "e": 92.9,
   "speech": 7.5,
   "i": 12
  },
  "web": {
   "s": 92.9,
   "e": 101.9,
   "speech": 7.5,
   "i": 13
  },
  "pyramid": {
   "s": 101.9,
   "e": 109.0,
   "speech": 6.5,
   "i": 14
  },
  "energy": {
   "s": 109.0,
   "e": 117.5,
   "speech": 7.0,
   "i": 15
  },
  "heat": {
   "s": 117.5,
   "e": 127.3,
   "speech": 9.0,
   "i": 16
  },
  "accum": {
   "s": 127.3,
   "e": 135.3,
   "speech": 5.5,
   "i": 17
  },
  "accum2": {
   "s": 135.3,
   "e": 144.3,
   "speech": 7.0,
   "i": 18
  },
  "whole": {
   "s": 144.3,
   "e": 151.9,
   "speech": 7.0,
   "i": 19
  },
  "protect": {
   "s": 151.9,
   "e": 159.2,
   "speech": 6.5,
   "i": 20
  },
  "record": {
   "s": 159.2,
   "e": 167.7,
   "speech": 3.0,
   "i": 21
  },
  "task": {
   "s": 167.7,
   "e": 176.5,
   "speech": 8.0,
   "i": 22
  },
  "next": {
   "s": 176.5,
   "e": 182.5,
   "speech": 5.0,
   "i": 23
  },
  "end": {
   "s": 182.5,
   "e": 187.5,
   "speech": 0.0,
   "i": 24
  }
 }
};
if (typeof module !== 'undefined') module.exports = TIMING; else window.TIMING = TIMING;
