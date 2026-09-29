// narration.js — Film 17: "Isı ve Sıcaklık Aynı Şey mi?"  (Maarif FB.5.5.2)
// Tek düzenlenebilir metin kaynağı. Sessiz film: text → altyazı.
const NARRATION = {
  film: '17-isi-sicaklik',
  title: 'Isı ve Sıcaklık Aynı Şey mi?',
  outcome: 'FB.5.5.2 Isı ve sıcaklık kavramlarını karşılaştırabilme',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.6, text: 'Merhaba, ben Damla! Bugün mutfaktayım. Şu çay çok sıcak!' },
    { id: 'q', pad: 0.8, text: 'Çay sıcak diyoruz, soba ısıtıyor diyoruz. Isı ile sıcaklık aynı şey mi?', key: 'Soru sor' },
    // SAHNE 2 — Kavram karikatürü
    { id: 'cartoon', pad: 0.4, min: 13, text: 'Arkadaşlarım farklı düşünüyor. Bu kavram karikatürüne bak: sence kim haklı?', key: 'Kavram karikatürü' },
    { id: 'decide', pad: 0.6, text: 'Karar vermeden önce kanıt toplayalım!' },
    // SAHNE 3 — Isı kaynakları + güvenlik
    { id: 'sources', pad: 0.8, min: 7, text: 'Dünya’nın en temel ısı kaynağı Güneş’tir. Ocak ve soba ise yapay ısı kaynaklarıdır.', key: 'Isı kaynakları' },
    { id: 'safety', pad: 0.8, text: 'Sıcak su ve ısı kaynaklarıyla yalnızca bir yetişkin eşliğinde çalışırız!', key: 'Güvenlik' },
    // SAHNE 4 — Sıcaklık
    { id: 'temp1', pad: 0.6, text: 'Sıcaklık, bir maddenin ne kadar sıcak ya da soğuk olduğunu gösterir.', key: 'Sıcaklık' },
    { id: 'tpart', pad: 0.8, min: 7, text: 'Sıcak suda tanecikler ortalamada daha hızlı hareket eder. Sıcaklık bu hareketle ilgilidir.' },
    { id: 'thermo', pad: 0.8, min: 6.5, text: 'Sıcaklığı termometreyle ölçeriz. Birimi derece Celsius’tur.', key: 'Termometre · °C' },
    { id: 'tools', pad: 0.8, min: 7, text: 'Duvar termometresi, dijital termometre, ateşölçer... Hava durumu raporları da sıcaklığı bildirir.' },
    // SAHNE 5 — Isı
    { id: 'heat1', pad: 0.8, text: 'Isı ise bir enerji çeşididir. Sıcaklığı yüksek olandan düşük olana aktarılır.', key: 'Isı: bir enerji' },
    { id: 'spoon', pad: 0.8, min: 7, text: 'Soğuk kaşığı sıcak çaya koyunca ısı çaydan kaşığa geçer. Kaşık ısınır.' },
    { id: 'amountq', pad: 0.6, text: 'Aynı sıcaklıkta bir bardak su ve bir tencere su. Hangisi daha çok ısı verebilir?' },
    { id: 'ice', pad: 0.8, min: 9, text: 'İkisine de aynı buzlardan koyalım. Tenceredeki su hepsini eritti, bardaktaki su yalnızca birkaçını!' },
    { id: 'amount', pad: 1.0, text: 'Sıcaklıkları aynıydı ama aktarılan ısı, madde miktarına bağlıdır.', key: 'Madde miktarı' },
    // SAHNE 6 — Isı nasıl bulunur?
    { id: 'measure', pad: 0.8, min: 7, text: 'Isı termometreyle doğrudan ölçülemez. Kalorimetre kabı yardımıyla hesaplanır.', key: 'Kalorimetre kabı' },
    { id: 'units', pad: 1.0, text: 'Isının birimi joule ya da kaloridir.', key: 'J · cal' },
    // SAHNE 7 — Karşılaştırma
    { id: 'similar', pad: 0.8, min: 9, text: 'Benzerlikler: İkisi de taneciklerin hareketiyle ilgilidir. Madde ısı alınca sıcaklığı genellikle artar.', key: 'Benzerlikler' },
    { id: 'diff', pad: 0.8, min: 13, text: 'Farklılıklar: tanımları, ölçme yolları, birimleri ve madde miktarına bağlı olup olmamaları.', key: 'Farklılıklar' },
    { id: 'verdict', pad: 1.0, text: 'Karikatürde haklı olan Can! Isı ve sıcaklık aynı şey değildir.' },
    // SAHNE 8 — Kaydet + görev + sonraki
    { id: 'record', pad: 0.6, min: 9, text: 'Bulduklarımı gözlem defterime kaydediyorum.', key: 'Kaydet' },
    { id: 'task', pad: 0.8, min: 7, text: 'Sıra sende! Kendi kavram karikatürünü çiz. Bir de Anders Celsius’u araştır!' },
    { id: 'next', pad: 1.0, text: 'Sıradaki gözlemim: sıcak ve soğuk su karışınca ne olur?' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
