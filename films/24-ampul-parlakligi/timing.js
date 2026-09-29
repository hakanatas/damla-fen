// OTOMATİK ÜRETİLDİ (tools/tts.py) — elle düzenlemeyin; narration.js'i düzenleyip yeniden çalıştırın
const TIMING = {
 "total": 178.04,
 "silent": true,
 "beats": {
  "title": {
   "s": 0.0,
   "e": 5.5,
   "speech": 0.0,
   "i": 0
  },
  "hello": {
   "s": 5.5,
   "e": 11.806,
   "speech": 5.706,
   "i": 1
  },
  "q": {
   "s": 11.806,
   "e": 17.724,
   "speech": 5.118,
   "i": 2
  },
  "vars": {
   "s": 17.724,
   "e": 24.618,
   "speech": 6.294,
   "i": 3
  },
  "hyp1": {
   "s": 24.618,
   "e": 30.924,
   "speech": 5.706,
   "i": 4
  },
  "hyp2": {
   "s": 30.924,
   "e": 38.806,
   "speech": 6.882,
   "i": 5
  },
  "indep": {
   "s": 38.806,
   "e": 46.288,
   "speech": 6.882,
   "i": 6
  },
  "dep": {
   "s": 46.288,
   "e": 51.417,
   "speech": 4.529,
   "i": 7
  },
  "ctrl": {
   "s": 51.417,
   "e": 61.652,
   "speech": 9.235,
   "i": 8
  },
  "safety": {
   "s": 61.652,
   "e": 71.887,
   "speech": 9.235,
   "i": 9
  },
  "e1": {
   "s": 71.887,
   "e": 79.169,
   "speech": 6.882,
   "i": 10
  },
  "e1-t": {
   "s": 79.169,
   "e": 85.863,
   "speech": 6.294,
   "i": 11
  },
  "e1-g": {
   "s": 85.863,
   "e": 94.863,
   "speech": 5.706,
   "i": 12
  },
  "e1-a": {
   "s": 94.863,
   "e": 102.157,
   "speech": 6.294,
   "i": 13
  },
  "e2": {
   "s": 102.157,
   "e": 110.028,
   "speech": 7.471,
   "i": 14
  },
  "e2-t": {
   "s": 110.028,
   "e": 116.134,
   "speech": 5.706,
   "i": 15
  },
  "e2-g": {
   "s": 116.134,
   "e": 125.134,
   "speech": 5.118,
   "i": 16
  },
  "e2-a": {
   "s": 125.134,
   "e": 132.428,
   "speech": 6.294,
   "i": 17
  },
  "repeat": {
   "s": 132.428,
   "e": 141.287,
   "speech": 8.059,
   "i": 18
  },
  "prop": {
   "s": 141.287,
   "e": 148.787,
   "speech": 5.118,
   "i": 19
  },
  "prop2": {
   "s": 148.787,
   "e": 156.287,
   "speech": 5.706,
   "i": 20
  },
  "yourturn": {
   "s": 156.287,
   "e": 166.722,
   "speech": 9.235,
   "i": 21
  },
  "next": {
   "s": 166.722,
   "e": 173.04,
   "speech": 5.118,
   "i": 22
  },
  "end": {
   "s": 173.04,
   "e": 178.04,
   "speech": 0.0,
   "i": 23
  }
 }
};
if (typeof module !== 'undefined') module.exports = TIMING; else window.TIMING = TIMING;
