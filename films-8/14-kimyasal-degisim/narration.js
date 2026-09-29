// narration.js — 8. sınıf Film 14: "Değişimin İzleri: Fiziksel ve Kimyasal Değişim"  (Maarif FB.8.5.2 · FB.8.5.3)
// Tek düzenlenebilir metin kaynağı. Sessiz film: text altyazı olarak görünür.
const NARRATION = {
  film: '14-kimyasal-degisim',
  title: 'Değişimin İzleri: Fiziksel ve Kimyasal Değişim',
  outcome: 'FB.8.5.2 · FB.8.5.3',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak: sekiz olay
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.3, min: 8, text: 'Merhaba! Masamda sekiz olay var: ekmek dilimleme, patates haşlama, mum yakma, kâğıt yırtma...' },
    { id: 'hello2', pad: 0.4, min: 6, text: '...buz eritme, tahta kırma, çaya şeker atma ve çaya limon sıkma.' },
    { id: 'q', pad: 0.6, text: 'Hangisinde madde yalnızca dış görünüşünü değiştirir, hangisinde yeni bir madde oluşur?', key: 'Fiziksel mi, kimyasal mı?' },
    // SAHNE 2 — Önermeler
    { id: 'claimA', pad: 0.4, text: 'Önce önerme yazayım. Birincisi: Eriyen buz yine sudur; dondurunca yeniden buz olur.', key: 'Önerme' },
    { id: 'claimB', pad: 0.4, text: 'İkincisi: Yanan mum yok olur. Ama ben yalnızca mumun küçüldüğünü gördüm!' },
    { id: 'claimC', pad: 0.8, text: 'Birincisi gözleme dayanıyor, ikincisi dayanmıyor. Sınayalım!', key: 'Gözleme dayalı mı?' },
    // SAHNE 3 — Tanecik düzeyi
    { id: 'phys', pad: 0.4, min: 7, text: 'Buz eriyince su tanecikleri aynı kalır; yalnızca dizilişleri değişir. Bu fiziksel değişimdir.', key: 'Fiziksel değişim' },
    { id: 'chem', pad: 0.4, min: 7, text: 'Mum yanınca mumun tanecikleri oksijenle tepkimeye girer; karbondioksit ve su buharı oluşur.', key: 'Kimyasal değişim' },
    { id: 'bonds', pad: 0.8, text: 'Kimyasal değişimde bağlar kırılır, yeni bağlar oluşur; fiziksel değişimde kırılmaz.' },
    // SAHNE 4 — İpuçları
    { id: 'clues', pad: 0.4, min: 9, text: 'Kimyasal değişimin ipuçları: gaz çıkışı, renk değişimi, ısı ve ışık, koku ve tat değişimi, çökelti.', key: 'İpuçları' },
    { id: 'notaste', pad: 0.8, text: 'Uyarı: Deneylerde maddelerin tadına bakılmaz, doğrudan koklanmaz!' },
    // SAHNE 5 — Sınıflandır
    { id: 'sort', pad: 0.3, min: 8, text: 'Şimdi sekiz olayı sınıflandırayım. Dilimleme, yırtma, erime, kırma, çözünme: fiziksel.', key: 'Sınıflandır' },
    { id: 'sort2', pad: 0.8, min: 7, text: 'Patates haşlama, mum yakma, çaya limon sıkma: kimyasal. Renk, koku ya da yeni madde var!' },
    // SAHNE 6 — Gözlenmemiş durumlar için tahmin
    { id: 'rain', pad: 0.4, min: 6, text: 'Tanecikleri göremesem de tahmin ederim. Yağmurda su buharı yoğuşur, yine sudur: fiziksel.', key: 'Tahmin' },
    { id: 'dough', pad: 0.4, min: 6, text: 'Mayalı hamur kabarır, kokusu değişir, gaz çıkar: kimyasal.' },
    { id: 'criteria', pad: 0.8, text: 'Ölçütüm: Yeni madde oluştu mu? Kimyasal bağlar değişti mi?', key: 'Ölçüt' },
    // SAHNE 7 — Kimyasal tepkime: suyun oluşumu boncuk modeli
    { id: 'reaction', pad: 0.4, text: 'Kimyasal değişim bir kimyasal tepkimedir. Suyun oluşumunu boncuklarla modelleyelim.', key: 'Kimyasal tepkime' },
    { id: 'beads', pad: 0.4, min: 8, text: 'Beyazlar hidrojen, maviler oksijen atomu. Moleküller ayrılır, atomlar yeniden düzenlenir: iki su molekülü!' },
    { id: 'count', pad: 0.4, min: 7, text: 'Önce 4 hidrojen, 2 oksijen; sonra yine 4 hidrojen, 2 oksijen. Atomların sayısı ve cinsi korunur.', key: 'Atomlar korunur' },
    { id: 'newprop', pad: 0.8, text: 'Hidrojen ve oksijen gazdır, su sıvıdır. Elementler özelliklerini kaybeder; yeni bir bileşik oluşur.', key: 'Bileşik' },
    // SAHNE 8 — Deney: kütlenin korunumu
    { id: 'expq', pad: 0.3, min: 7.5, text: 'Kütle de korunur mu? Sirke ve karbonatla deneyelim. Önce güvenlik!', key: 'Kütlenin korunumu' },
    { id: 'before', pad: 0.4, min: 7, text: 'Karbonat küçük kapta, sirke şişede. Kapak kapalı. Terazi: 215,6 gram.' },
    { id: 'mix', pad: 0.4, min: 6, text: 'Şişeyi eğdim. Köpürme ve gaz çıkışı var: kimyasal tepkime!' },
    { id: 'after', pad: 0.4, min: 5.5, text: 'Kapak kapalıyken terazi yine 215,6 gram.', key: 'Kütle korunur' },
    { id: 'open', pad: 0.4, min: 6.5, text: 'Kapağı açınca gaz havaya karıştı; terazi 215,1 gram. Kütle kaybolmadı, gazla dışarı çıktı.' },
    { id: 'concl', pad: 0.8, text: 'Sonuç: Tepkimede yeni maddeler oluşur, toplam kütle korunur.' },
    // SAHNE 9 — Kaydet · Sıra sende · Sıradaki
    { id: 'record', pad: 0.3, min: 9, text: 'Bulduklarımı gözlem defterime kaydedeyim.', key: 'Kaydet' },
    { id: 'task', pad: 0.5, min: 6.5, text: 'Sıra sende! Deneyi öğretmeninle yap, verileri tabloya yaz, bir deney raporu hazırla.' },
    { id: 'next', pad: 0.8, text: 'Sıradaki gözlemim: Kimyasal tepkimeler günlük yaşamımızı nasıl etkiliyor?' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
