// narration.js — 8. sınıf Film 6: "Hücreler Bölünüyor: Mitoz ve Mayoz" (FB.8.3.3)
const NARRATION = {
  film: '06-mitoz-mayoz',
  title: 'Hücreler Bölünüyor: Mitoz ve Mayoz',
  outcome: 'FB.8.3.3',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // S1 — Merak ve beyin fırtınası
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'wound', pad: 0.6, min: 8, text: 'Merhaba, ben Damla! Dizimdeki sıyrık birkaç günde kapandı. Yaranın yerini dolduran yeni hücreler nereden geldi?', key: 'Soru sor' },
    { id: 'storm', pad: 0.6, min: 7, text: 'Beyin fırtınası: büyümek, iyileşmek, üremek... Hepsinde hücreler bölünür.', key: 'Hücre bölünmesi' },
    { id: 'two', pad: 0.8, text: 'Hücre bölünmesinin iki çeşidini karşılaştıracağız: mitoz ve mayoz.' },
    // S2 — Hazırlık: kromozomlar ve DNA eşlenmesi
    { id: 'model', pad: 0.6, min: 7, text: 'İnsanın vücut hücrelerinde 46 kromozom bulunur. Modelimde sadece 4 kromozom çizdim.', key: '46 kromozom' },
    { id: 'pairs', pad: 0.6, text: 'Kromozomlar çiftler hâlindedir: çiftin biri anneden, diğeri babadan gelir.', key: 'Kromozom çiftleri' },
    { id: 'copy', pad: 0.8, min: 7, text: 'Her iki bölünmeden önce de DNA kendini eşler. Kromozomlar ikişer kopyalı hâle gelir.', key: 'DNA eşlenir' },
    // S3 — Mitoz
    { id: 'mit1', pad: 0.5, min: 8, text: 'Mitoz bölünmede kopyalar eşit paylaştırılır ve bir hücreden iki yeni hücre oluşur.', key: 'Mitoz' },
    { id: 'mit2', pad: 0.6, text: 'Yeni hücrelerin kromozom sayısı ana hücreyle aynıdır: 46’dan 46’ya. Kalıtsal bilgileri de aynıdır.', key: '46 → 46' },
    { id: 'mit3', pad: 0.6, min: 7, text: 'Mitoz vücut hücrelerinde olur. Büyümeyi, yaraların onarılmasını ve yıpranan hücrelerin yenilenmesini sağlar.', key: 'Büyüme · onarım' },
    { id: 'mit4', pad: 0.9, text: 'Amip gibi bir hücreli canlılarda ise mitoz, eşeysiz üremeyi sağlar.', key: 'Eşeysiz üreme' },
    // S4 — Mayoz
    { id: 'may1', pad: 0.5, text: 'Mayoz bölünme ise üreme organlarındaki üreme ana hücrelerinde olur. Üreme hücrelerini oluşturur.', key: 'Mayoz' },
    { id: 'may2', pad: 0.6, min: 9, text: 'Mayoz iki aşamada gerçekleşir. Sonunda bir hücreden dört yeni hücre oluşur.', key: 'İki aşama · 4 hücre' },
    { id: 'may3', pad: 0.6, text: 'Kromozom sayısı yarıya iner: 46 kromozomlu hücreden 23 kromozomlu sperm ya da yumurta oluşur.', key: '46 → 23' },
    { id: 'may4', pad: 0.6, text: 'Oluşan üreme hücrelerinin kalıtsal bilgileri birbirinden farklıdır. Bu, kalıtsal çeşitliliği sağlar.', key: 'Çeşitlilik' },
    { id: 'fert', pad: 0.9, min: 8, text: 'Döllenmede 23 ve 23 birleşir; zigot yine 46 kromozomludur. Böylece sayı nesilden nesile korunur.', key: 'Döllenme' },
    // S5 — Karşılaştırma tablosu
    { id: 'same', pad: 0.6, min: 8, text: 'Şimdi karşılaştırma tablosu yapalım. Önce benzerlikler: ikisi de hücre bölünmesidir ve öncesinde DNA eşlenir.', key: 'Benzerlikler' },
    { id: 'diff', pad: 0.9, min: 15, text: 'Sonra farklılıklar: nerede olduğu, amacı, aşama sayısı, yeni hücre sayısı, kromozom sayısı ve kalıtsal bilgi.', key: 'Farklılıklar' },
    // S6 — Sıra sende · Sıradaki · Bitiş
    { id: 'task', pad: 0.8, min: 8.5, text: 'Sıra sende! Grubunla bir mitoz–mayoz karşılaştırma posteri hazırla ve sınıfta sun.', key: 'Sıra sende' },
    { id: 'next', pad: 1.0, min: 5.5, text: 'Sıradaki gözlemim: Aslı ne ise nesli odur. Mendel’in bezelyeleri ve kalıtım!' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
