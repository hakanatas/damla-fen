// narration.js — Film 16: "Maddenin Tanecikli Yapısı"  (Maarif FB.5.5.1)
// Tek düzenlenebilir metin kaynağı. Sessiz film: text → altyazı.
const NARRATION = {
  film: '16-tanecikli-yapi',
  title: 'Maddenin Tanecikli Yapısı',
  outcome: 'FB.5.5.1 Maddeleri tanecikli, boşluklu ve hareketli yapısına göre sınıflandırabilme',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.6, text: 'Merhaba, ben Damla! Gövdemdeki minik noktaları gördün mü?' },
    { id: 'wonder', pad: 1.0, text: 'Bir taş, biraz su, bir balon. Ortak yanları ne?', key: 'Soru sor' },
    // SAHNE 2 — Madde nedir?
    { id: 'mass', pad: 0.8, min: 6.5, text: 'Terazi gösteriyor: hepsinin kütlesi var, balondaki havanın bile!', key: 'Kütle' },
    { id: 'volume', pad: 0.8, min: 6.5, text: 'Taşı suya bırakınca su yükseliyor. Taş yer kaplıyor, yani hacmi var.', key: 'Hacim' },
    { id: 'def', pad: 0.8, text: 'Kütlesi olan ve yer kaplayan, yani hacmi olan her şeye madde denir.', key: 'Madde' },
    // SAHNE 3 — Tanecikli, boşluklu, hareketli
    { id: 'zoom', pad: 0.6, min: 5, text: 'Hayal gücümüzle suyun içine çok yakından bakalım.' },
    { id: 'particles', pad: 0.8, text: 'Madde, gözle göremediğimiz kadar küçük taneciklerden oluşur.', key: 'Tanecikli yapı' },
    { id: 'gaps', pad: 0.8, text: 'Tanecikler arasında boşluklar vardır. Bu boşluklar her maddede aynı değildir.', key: 'Boşluklu yapı' },
    { id: 'moving', pad: 1.0, text: 'Tanecikler hiç durmaz, sürekli hareket eder.', key: 'Hareketli yapı' },
    // SAHNE 4 — Üç hareket
    { id: 'vib', pad: 0.8, min: 5.5, text: 'Titreşim: tanecik olduğu yerde ileri geri sallanır.', key: 'Titreşim' },
    { id: 'rot', pad: 0.8, min: 5, text: 'Dönme: tanecik kendi etrafında döner.', key: 'Dönme' },
    { id: 'trans', pad: 1.0, min: 5.5, text: 'Öteleme: tanecik bir yerden başka bir yere gider.', key: 'Öteleme' },
    // SAHNE 5 — Katı, sıvı, gaz (Damla: buz · su · buhar)
    { id: 'states', pad: 0.8, min: 6, text: 'Maddeler katı, sıvı ya da gaz olabilir. Ben de buz, su ya da buhar olabilirim!' },
    { id: 'solid', pad: 0.8, text: 'Katıda tanecikler çok yakın ve düzenlidir. Yalnızca titreşirler.', key: 'Katı' },
    { id: 'liquid', pad: 0.8, text: 'Sıvıda tanecikler yine yakındır ama düzensizdir. Titreşir, döner ve öteler.', key: 'Sıvı' },
    { id: 'gas', pad: 0.8, text: 'Gazda boşluklar çok büyüktür. Tanecikler her yöne serbestçe öteler.', key: 'Gaz' },
    { id: 'flow', pad: 0.8, text: 'Öteleme sayesinde sıvılar ve gazlar akabilir. Buna akışkanlık denir.', key: 'Akışkanlık' },
    // SAHNE 6 — Şekil, hacim, sıkıştırma
    { id: 'shape', pad: 0.8, min: 6, text: 'Katının belirli bir şekli vardır. Sıvı ve gaz, bulunduğu kabın şeklini alır.', key: 'Şekil' },
    { id: 'vol2', pad: 0.8, text: 'Katı ve sıvının hacmi belirlidir. Gazın hacmi ise değişebilir.', key: 'Hacim' },
    { id: 'syringe', pad: 0.6, min: 7, text: 'Ucu kapalı, iğnesiz iki enjektör: birinde hava, diğerinde su var. Bastıralım!', key: 'Sıkıştırılabilme' },
    { id: 'syr-res', pad: 0.8, text: 'Hava sıkıştı; tanecikleri arasında çok boşluk var. Su ise sıkışmadı.' },
    { id: 'assume', pad: 0.8, text: 'Katılar sıkıştırılamaz. Sıvıların da sıkıştırılamadığını kabul ederiz.' },
    // SAHNE 7 — Sınıflandırma
    { id: 'sort', pad: 0.6, min: 9, text: 'Günlük yaşamdan maddeleri katı, sıvı ve gaz olarak gruplandıralım.', key: 'Gruplandır' },
    { id: 'table', pad: 1.0, min: 9.5, text: 'Anlam çözümleme tablomda her grubun tanecik özelliklerini işaretliyorum.', key: 'Etiketle' },
    // SAHNE 8 — Kaydet + görev + sonraki
    { id: 'record', pad: 0.6, min: 9, text: 'Hâl değişince tanecikler arası boşluk ve hareketlilik değişir. Hepsini defterime yazıyorum.' },
    { id: 'task', pad: 0.8, min: 7.5, text: 'Sıra sende! Katı, sıvı ve gazdan ikişer örnek bul, tanecik modeliyle çiz.' },
    { id: 'next', pad: 1.0, text: 'Sıradaki gözlemim: ısı ve sıcaklık aynı şey mi?' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
