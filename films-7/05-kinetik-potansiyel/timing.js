// OTOMATİK ÜRETİLDİ (tools/tts.py) — elle düzenlemeyin; narration.js'i düzenleyip yeniden çalıştırın
const TIMING = {
 "total": 204.2,
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
   "e": 12.3,
   "speech": 6.0,
   "i": 1
  },
  "energy": {
   "s": 12.3,
   "e": 20.1,
   "speech": 7.0,
   "i": 2
  },
  "question": {
   "s": 20.1,
   "e": 26.8,
   "speech": 6.0,
   "i": 3
  },
  "classify": {
   "s": 26.8,
   "e": 33.9,
   "speech": 6.5,
   "i": 4
  },
  "sort": {
   "s": 33.9,
   "e": 45.2,
   "speech": 10.5,
   "i": 5
  },
  "ke": {
   "s": 45.2,
   "e": 52.0,
   "speech": 6.0,
   "i": 6
  },
  "ke-speed": {
   "s": 52.0,
   "e": 62.3,
   "speech": 9.5,
   "i": 7
  },
  "ke-mass": {
   "s": 62.3,
   "e": 72.6,
   "speech": 9.5,
   "i": 8
  },
  "ke-rest": {
   "s": 72.6,
   "e": 80.9,
   "speech": 7.5,
   "i": 9
  },
  "pe": {
   "s": 80.9,
   "e": 88.7,
   "speech": 7.0,
   "i": 10
  },
  "grav": {
   "s": 88.7,
   "e": 97.0,
   "speech": 7.5,
   "i": 11
  },
  "grav-h": {
   "s": 97.0,
   "e": 106.0,
   "speech": 7.5,
   "i": 12
  },
  "grav-m": {
   "s": 106.0,
   "e": 117.3,
   "speech": 10.5,
   "i": 13
  },
  "elastic": {
   "s": 117.3,
   "e": 126.1,
   "speech": 8.0,
   "i": 14
  },
  "elastic2": {
   "s": 126.1,
   "e": 135.1,
   "speech": 6.5,
   "i": 15
  },
  "compare": {
   "s": 135.1,
   "e": 140.2,
   "speech": 4.5,
   "i": 16
  },
  "similar": {
   "s": 140.2,
   "e": 150.0,
   "speech": 9.0,
   "i": 17
  },
  "differ": {
   "s": 150.0,
   "e": 161.3,
   "speech": 10.5,
   "i": 18
  },
  "both": {
   "s": 161.3,
   "e": 169.6,
   "speech": 7.5,
   "i": 19
  },
  "record": {
   "s": 169.6,
   "e": 181.6,
   "speech": 3.0,
   "i": 20
  },
  "task": {
   "s": 181.6,
   "e": 191.4,
   "speech": 9.0,
   "i": 21
  },
  "next": {
   "s": 191.4,
   "e": 199.2,
   "speech": 7.0,
   "i": 22
  },
  "end": {
   "s": 199.2,
   "e": 204.2,
   "speech": 0.0,
   "i": 23
  }
 }
};
if (typeof module !== 'undefined') module.exports = TIMING; else window.TIMING = TIMING;
