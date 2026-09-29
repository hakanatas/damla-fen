// narration.js — 6. sınıf Film 16: "Erime, Donma ve Kaynama Noktası"  (Maarif FB.6.5.2)
// Tek düzenlenebilir metin kaynağı. Sessiz sürüm: text = altyazı.
const NARRATION = {
  film: '16-erime-kaynama-noktasi',
  title: 'Erime, Donma ve Kaynama Noktası',
  outcome: 'FB.6.5.2 Maddelerin erime, donma ve kaynama noktasını gösteren deney yapabilme',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.8, min: 8, text: 'Merhaba! Buz 0 °C’de erir. Peki bütün katılar aynı sıcaklıkta mı erir?' },
    // SAHNE 2 — Tanecikli yapı, saf ve saf olmayan madde
    { id: 'particles', pad: 0.6, text: 'Önce hatırlayalım: Bütün maddeler taneciklerden oluşur. Toplarla modelleyelim.', key: 'Tanecikli yapı' },
    { id: 'pure', pad: 0.8, min: 9, text: 'Aynı cins taneciklerden oluşan maddeye saf madde denir. Farklı cins tanecikler karışmışsa saf değildir.', key: 'Saf madde' },
    { id: 'both', pad: 0.8, text: 'İkisi de taneciklerden oluşur. Saf maddeleri hangi özellikleriyle ayırt edebiliriz?' },
    // SAHNE 3 — Deney tasarımı + güvenlik
    { id: 'design', pad: 0.6, text: 'Bir deney tasarlayalım. Sorum: Suyun erime, donma ve kaynama noktası kaçtır?', key: 'Deney tasarla' },
    { id: 'tools', pad: 0.6, min: 9, text: 'Malzemeler: buz, beher, ısıtıcı, termometre ve kronometre. Her dakika sıcaklığı ölçüp tabloya yazacağım.' },
    { id: 'vars', pad: 0.8, text: 'Değiştirdiğim şey süre, ölçtüğüm şey sıcaklık. Isıtıcı hep aynı ayarda kalacak.', key: 'Değişkenler' },
    { id: 'safety', pad: 1.0, min: 9, text: 'Isıtıcıyı yalnızca öğretmenim kullanır. Sıcak kap, kaynar su ve buhar yakar; güvenli mesafede dururuz!', key: 'Güvenlik' },
    // SAHNE 4 — Ölçüm
    { id: 'melt', pad: 0.8, min: 10, text: 'Buz ısınıyor... 0 °C’de erimeye başladı. Buz bitene kadar termometre 0 °C’yi gösteriyor!', key: 'Erime noktası' },
    { id: 'heat', pad: 0.4, min: 8, text: 'Buz bitti, su ısınıyor: 20, 40, 60, 80 derece...' },
    { id: 'boil', pad: 1.0, min: 9, text: 'Yaklaşık 100 °C’de su kaynamaya başladı. Kaynarken sıcaklık sabit kalıyor!', key: 'Kaynama noktası' },
    // SAHNE 5 — Grafik ve veri analizi
    { id: 'graph', pad: 0.6, min: 10, text: 'Verilerimi sıcaklık-zaman grafiğine döktüm. İki düz bölge var: 0 °C ve 100 °C.', key: 'Veri analizi' },
    { id: 'meaning', pad: 1.0, text: 'Düz bölgelerde madde hâl değiştiriyor. Isı alıyor ama sıcaklığı değişmiyor.' },
    // SAHNE 6 — Donma
    { id: 'freeze', pad: 0.8, min: 9, text: 'Şimdi suyu soğutalım. Su 0 °C’de donmaya başladı. Donarken de sıcaklık sabit!', key: 'Donma noktası' },
    { id: 'equal', pad: 1.0, text: 'Aynı saf maddenin erime noktası ile donma noktası birbirine eşittir.' },
    // SAHNE 7 — Farklı saf maddeler
    { id: 'others', pad: 0.6, min: 8, text: 'Laurik asit ve stearik asidi de deney tüplerinde, sıcak su içinde ısıtalım.', key: 'Farklı saf maddeler' },
    { id: 'others-res', pad: 0.8, min: 9.5, text: 'Laurik asit yaklaşık 44 °C’de, stearik asit yaklaşık 69 °C’de eridi. Erime noktaları farklı!' },
    { id: 'table', pad: 1.2, min: 10, text: 'Farklı saf maddelerin erime ve kaynama noktaları farklıdır. Bu yüzden bunlar ayırt edici özelliklerdir.', key: 'Ayırt edici özellik' },
    // SAHNE 8 — Kaydet, sıra sende, sonraki
    { id: 'record', pad: 0.6, min: 10.5, text: 'Bulgularımı gözlem defterime kaydedeyim.', key: 'Kaydet' },
    { id: 'yourturn', pad: 1.2, min: 9, text: 'Sıra sende! Öğretmeninle farklı saf maddelerin erime noktalarını karşılaştıran bir deney düzeneği tasarla.' },
    { id: 'next', pad: 0.8, text: 'Sıradaki gözlemim: Aynı hacimdeki maddelerin kütleleri neden farklı?' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
