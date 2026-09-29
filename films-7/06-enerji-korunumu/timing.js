// OTOMATİK ÜRETİLDİ (tools/tts.py) — elle düzenlemeyin; narration.js'i düzenleyip yeniden çalıştırın
const TIMING = {
 "total": 175.3,
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
   "e": 13.3,
   "speech": 7.0,
   "i": 1
  },
  "question": {
   "s": 13.3,
   "e": 19.6,
   "speech": 5.5,
   "i": 2
  },
  "plan": {
   "s": 19.6,
   "e": 26.2,
   "speech": 6.0,
   "i": 3
  },
  "p-top": {
   "s": 26.2,
   "e": 36.5,
   "speech": 9.5,
   "i": 4
  },
  "p-bottom": {
   "s": 36.5,
   "e": 43.5,
   "speech": 6.0,
   "i": 5
  },
  "p-up": {
   "s": 43.5,
   "e": 50.5,
   "speech": 6.0,
   "i": 6
  },
  "fall": {
   "s": 50.5,
   "e": 59.3,
   "speech": 8.0,
   "i": 7
  },
  "spring": {
   "s": 59.3,
   "e": 69.1,
   "speech": 9.0,
   "i": 8
  },
  "coaster": {
   "s": 69.1,
   "e": 78.1,
   "speech": 7.5,
   "i": 9
  },
  "pattern": {
   "s": 78.1,
   "e": 86.1,
   "speech": 6.5,
   "i": 10
  },
  "pattern2": {
   "s": 86.1,
   "e": 91.4,
   "speech": 4.5,
   "i": 11
  },
  "stop": {
   "s": 91.4,
   "e": 100.5,
   "speech": 8.5,
   "i": 12
  },
  "friction": {
   "s": 100.5,
   "e": 108.3,
   "speech": 7.0,
   "i": 13
  },
  "rub": {
   "s": 108.3,
   "e": 116.1,
   "speech": 7.0,
   "i": 14
  },
  "neglect": {
   "s": 116.1,
   "e": 125.4,
   "speech": 8.5,
   "i": 15
  },
  "general": {
   "s": 125.4,
   "e": 135.2,
   "speech": 9.0,
   "i": 16
  },
  "total": {
   "s": 135.2,
   "e": 143.2,
   "speech": 6.5,
   "i": 17
  },
  "record": {
   "s": 143.2,
   "e": 155.2,
   "speech": 3.0,
   "i": 18
  },
  "task": {
   "s": 155.2,
   "e": 164.0,
   "speech": 8.0,
   "i": 19
  },
  "next": {
   "s": 164.0,
   "e": 170.3,
   "speech": 5.5,
   "i": 20
  },
  "end": {
   "s": 170.3,
   "e": 175.3,
   "speech": 0.0,
   "i": 21
  }
 }
};
if (typeof module !== 'undefined') module.exports = TIMING; else window.TIMING = TIMING;
