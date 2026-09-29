// narration.js — 7. sınıf Film 18: "Karışımlar ve Çözünme Hızı"  (Maarif FB.7.5.8 · FB.7.5.9)
const NARRATION = {
  film: '18-karisimlar',
  title: 'Karışımlar ve Çözünme Hızı',
  outcome: 'FB.7.5.8 Karışımları homojen ve heterojen olarak sınıflandırabilme · FB.7.5.9 Çözünme hızına etki eden faktörler ile ilgili hipotez oluşturabilme',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.8, text: 'Merhaba! Salata, ayran, limonata... Hepsi birer karışım.' },
    { id: 'q', pad: 1.0, text: 'Peki karışımları saf maddelerden ayıran özellikler neler?', key: 'Karışım' },
    // SAHNE 2 — Karışımın özellikleri
    { id: 'ratio', pad: 0.8, min: 9, text: 'Karışımın belirli bir oranı, formülü, erime ve kaynama noktası yoktur. Az ya da çok şekerle yine şekerli su olur.', key: 'Belirli oran yok' },
    { id: 'keep', pad: 1.2, min: 7, text: 'Karışımı oluşturan maddeler özelliklerini korur: Demir tozu, kumla karışsa da mıknatısa çekilir.', key: 'Özellikler korunur' },
    // SAHNE 3 — Dört karışım
    { id: 'make', pad: 0.6, min: 8, text: 'Dört karışım hazırlayalım: şeker-su, tuz-su, kum-su ve zeytinyağı-su.', key: 'Karışım hazırla' },
    { id: 'observe', pad: 1.0, text: 'Şeker ve tuz gözden kayboldu. Kum dibe çöktü, zeytinyağı üstte ayrı bir katman oldu.' },
    // SAHNE 4 — Yakından bakış
    { id: 'zoom', pad: 0.8, min: 7, text: 'Yakından bakalım. Şeker tanecikleri suyun her yerine eşit dağılmış.' },
    { id: 'zoom2', pad: 1.0, text: 'Kum ise suda çözünmüyor. Karışımın her yeri aynı özelliği göstermiyor.' },
    // SAHNE 5 — Gruplandırma ve çözelti
    { id: 'group', pad: 0.8, min: 9, text: 'Her yerinde aynı özelliği gösteren karışımlar homojendir; göstermeyenler heterojendir.', key: 'Homojen · Heterojen' },
    { id: 'solution', pad: 0.8, text: 'Homojen karışımların özel adı çözeltidir. Çözelti, çözücü ve çözünenden oluşur.', key: 'Çözelti' },
    { id: 'ions', pad: 1.0, text: 'Tuz suda çözünürken sodyum ve klor iyonlarına ayrışır.' },
    // SAHNE 6 — Çevremizdeki karışımlar
    { id: 'around', pad: 1.0, min: 12, text: 'Çevremizdeki karışımları da etiketleyelim: katı, sıvı ve gaz hâlindeki maddelerin farklı ikilileri.', key: 'Çevremdeki karışımlar' },
    // SAHNE 7 — Çözünme hızı: soru ve değişkenler
    { id: 'tea', pad: 0.8, text: 'Çayıma şeker attım. Bazen hemen çözünüyor, bazen uzun sürüyor. Neden?', key: 'Çözünme hızı' },
    { id: 'melt', pad: 1.0, text: 'Dikkat: Şeker çayda erimez, çözünür! Erime, ısı alan katının sıvıya dönüşmesidir.' },
    { id: 'vars', pad: 0.8, min: 9, text: 'Tanecik boyutu, karıştırma ve suyun sıcaklığı bağımsız değişkenler. Çözünme hızı ise bağımlı değişken.', key: 'Değişkenler' },
    { id: 'control', pad: 1.0, text: 'Su miktarı, şeker miktarı ve kap hep aynı kalmalı. Bunlar kontrol edilen değişkenler.', key: 'Kontrol edilen değişkenler' },
    // SAHNE 8 — Güvenlik + deneyler
    { id: 'safety', pad: 1.0, min: 6.5, text: 'Sıcak suyla bir yetişkin eşliğinde ve dikkatle çalışmalıyım.' },
    { id: 'exp1', pad: 0.8, min: 9, text: 'Hipotez 1: Tanecik boyutu küçülürse temas yüzeyi artar, şeker daha hızlı çözünür.', key: 'Temas yüzeyi' },
    { id: 'exp2', pad: 0.8, min: 8, text: 'Hipotez 2: Karıştırırsam şeker daha hızlı çözünür.', key: 'Karıştırma' },
    { id: 'exp3', pad: 0.8, min: 8, text: 'Hipotez 3: Suyun sıcaklığı artarsa şeker daha hızlı çözünür.', key: 'Sıcaklık' },
    { id: 'why', pad: 1.2, text: 'Neden mi? Sıcak suda tanecikler daha hızlı hareket eder. Karıştırmak da çözünen tanecikleri çabuk dağıtır.' },
    // SAHNE 9 — Kaydet, Sıra sende, Sıradaki
    { id: 'record', pad: 0.6, min: 11, text: 'Deneylerim üç hipotezimi de destekledi. Önermelerimi defterime yazayım.', key: 'Önermeler' },
    { id: 'yourturn', pad: 1.0, min: 8, text: 'Sıra sende! Çevrendeki karışımları bir tabloda homojen ya da heterojen diye etiketle.' },
    { id: 'next', pad: 1.0, text: 'Sıradaki gözlemim: Karıştırdık, peki geri ayırabilir miyiz?' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
