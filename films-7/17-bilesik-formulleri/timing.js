// OTOMATİK ÜRETİLDİ (tools/tts.py) — elle düzenlemeyin; narration.js'i düzenleyip yeniden çalıştırın
const TIMING = {
 "total": 200.2,
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
   "e": 13.8,
   "speech": 7.5,
   "i": 1
  },
  "q": {
   "s": 13.8,
   "e": 20.0,
   "speech": 5.0,
   "i": 2
  },
  "lang": {
   "s": 20.0,
   "e": 27.3,
   "speech": 6.5,
   "i": 3
  },
  "common": {
   "s": 27.3,
   "e": 35.0,
   "speech": 6.5,
   "i": 4
  },
  "model": {
   "s": 35.0,
   "e": 41.8,
   "speech": 6.0,
   "i": 5
  },
  "build": {
   "s": 41.8,
   "e": 48.6,
   "speech": 6.0,
   "i": 6
  },
  "subscript": {
   "s": 48.6,
   "e": 56.1,
   "speech": 6.5,
   "i": 7
  },
  "one": {
   "s": 56.1,
   "e": 64.3,
   "speech": 7.0,
   "i": 8
  },
  "co": {
   "s": 64.3,
   "e": 69.4,
   "speech": 4.5,
   "i": 9
  },
  "co-read": {
   "s": 69.4,
   "e": 77.7,
   "speech": 7.5,
   "i": 10
  },
  "co-diff": {
   "s": 77.7,
   "e": 84.2,
   "speech": 5.5,
   "i": 11
  },
  "name": {
   "s": 84.2,
   "e": 91.4,
   "speech": 6.0,
   "i": 12
  },
  "caps": {
   "s": 91.4,
   "e": 99.2,
   "speech": 7.0,
   "i": 13
  },
  "nacl": {
   "s": 99.2,
   "e": 108.7,
   "speech": 8.5,
   "i": 14
  },
  "table": {
   "s": 108.7,
   "e": 122.7,
   "speech": 6.0,
   "i": 15
  },
  "glucose": {
   "s": 122.7,
   "e": 131.1,
   "speech": 7.0,
   "i": 16
  },
  "elements": {
   "s": 131.1,
   "e": 138.4,
   "speech": 6.5,
   "i": 17
  },
  "o2": {
   "s": 138.4,
   "e": 149.8,
   "speech": 10.0,
   "i": 18
  },
  "match": {
   "s": 149.8,
   "e": 159.8,
   "speech": 6.0,
   "i": 19
  },
  "whole": {
   "s": 159.8,
   "e": 168.2,
   "speech": 7.0,
   "i": 20
  },
  "record": {
   "s": 168.2,
   "e": 180.2,
   "speech": 3.0,
   "i": 21
  },
  "yourturn": {
   "s": 180.2,
   "e": 188.2,
   "speech": 6.0,
   "i": 22
  },
  "next": {
   "s": 188.2,
   "e": 195.2,
   "speech": 6.0,
   "i": 23
  },
  "end": {
   "s": 195.2,
   "e": 200.2,
   "speech": 0.0,
   "i": 24
  }
 }
};
if (typeof module !== 'undefined') module.exports = TIMING; else window.TIMING = TIMING;
