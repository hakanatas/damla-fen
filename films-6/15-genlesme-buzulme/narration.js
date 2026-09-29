// narration.js — 6. sınıf Film 15: "Genleşme ve Büzülme"  (Maarif FB.6.5.1)
// Tek düzenlenebilir metin kaynağı. Sessiz sürüm: text = altyazı.
const NARRATION = {
  film: '15-genlesme-buzulme',
  title: 'Genleşme ve Büzülme',
  outcome: 'FB.6.5.1 Isı etkisiyle maddelerin genleşip büzüleceğine yönelik bilimsel gözleme dayalı tahmin edebilme',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Sıkışan kavanoz kapağı (ön deneyim)
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.8, min: 9, text: 'Merhaba! Kavanozun metal kapağı sıkışmıştı. Bir yetişkin kapağı sıcak suya tuttu, kapak açıldı!' },
    // SAHNE 2 — Hatırla + önerme + gözleme dayalı mı?
    { id: 'why', pad: 0.8, text: 'Neden? Hâl değişiminde tanecikler arası mesafe değişir. Peki hâl değişmezse ne olur?', key: 'Tanecikler arası mesafe' },
    { id: 'claim', pad: 0.8, text: 'Önermem: Isı alan madde genleşir, yani hacmi artar. Isı veren madde büzülür, hacmi azalır.', key: 'Önerme' },
    { id: 'compare', pad: 1.0, min: 10, text: '“Sıcakta her şey büyür” sözü gözleme dayalı değildir. Gözleme dayalı önerme için ölçüp karşılaştırmalıyım.', key: 'Gözleme dayalı mı?' },
    // SAHNE 3 — Güvenlik
    { id: 'safety', pad: 1.0, min: 8.5, text: 'Sıcak suyu ve ısıtıcıyı yalnızca bir yetişkin kullanır. Isınan metale asla dokunmayız!', key: 'Güvenlik' },
    // SAHNE 4 — Gaz: balonlu şişeler
    { id: 'gas', pad: 0.6, min: 8.5, text: 'Birinci deney: Ağzına balon takılı iki boş şişe. Birini sıcak, diğerini soğuk suya koyalım.', key: 'Gazlar' },
    { id: 'gas-obs', pad: 1.0, min: 8.5, text: 'Sıcak sudaki balon şişti, soğuk sudaki büzüldü. Şişedeki hava ısı alınca genleşti!', key: 'Genleşme · Büzülme' },
    // SAHNE 5 — Sıvı: pipetli şişe + termometre
    { id: 'liquid', pad: 0.6, min: 8.5, text: 'İkinci deney: Renkli su dolu şişeye pipet taktım. Sıcak suda pipetteki su yükseldi!', key: 'Sıvılar' },
    { id: 'thermo', pad: 1.0, min: 9, text: 'Termometre de böyle çalışır: İçindeki sıvı ısınınca genleşip yükselir, soğuyunca büzülüp alçalır.', key: 'Termometre' },
    // SAHNE 6 — Katı: Gravzant halkası
    { id: 'solid', pad: 1.2, min: 11.2, text: 'Üçüncü deney: Gravzant halkası. Soğuk küre halkadan geçiyor. Isıtılınca geçmiyor! Soğuyunca yine geçiyor.', key: 'Katılar' },
    // SAHNE 7 — Tanecik açıklaması ve sonuç
    { id: 'particles', pad: 0.8, min: 9, text: 'Isı alan maddenin tanecikleri daha hızlı hareket eder. Aralarındaki mesafe az da olsa artar.', key: 'Tanecik modeli' },
    { id: 'notbigger', pad: 0.8, text: 'Dikkat: Tanecikler büyümez! Aralarındaki mesafe değiştiği için maddenin hacmi değişir.' },
    { id: 'conclude', pad: 1.2, min: 9, text: 'Sonucum: Isı alan maddeler genleşebilir, ısı veren maddeler büzülebilir. Gözlemlerim önermemi destekledi.', key: 'Sonuç çıkar' },
    // SAHNE 8 — Ayırt edici özellik: metal çubuklar
    { id: 'rods', pad: 0.6, min: 8.5, text: 'Eşit uzunlukta alüminyum, bakır ve demir çubukları özdeş ısıtıcılarla eşit süre ısıtalım.', key: 'Ayırt edici özellik' },
    { id: 'rods-res', pad: 1.2, min: 9, text: 'Hepsi uzadı ama farklı miktarda! Genleşme, saf maddeleri birbirinden ayırt etmemizi sağlar.' },
    // SAHNE 9 — Günlük yaşam, tahmin, geçerlik
    { id: 'life', pad: 1.0, min: 9.5, text: 'Kavanozun metal kapağı da sıcak suda genleşip gevşedi. Raylar arasında bu yüzden boşluk bırakılır.', key: 'Günlük yaşam' },
    { id: 'predict', pad: 0.8, min: 9, text: 'Gözlemlemediğim bir durum: Elektrik telleri yazın mı, kışın mı daha sarkıktır? Tahminim: Yazın!', key: 'Tahmin' },
    { id: 'validity', pad: 1.2, min: 9.5, text: 'Tahminim geçerli mi? Aynı teli yazın ve kışın, aynı yerden fotoğraflayıp karşılaştırmalıyım.', key: 'Geçerliği sorgula' },
    // SAHNE 10 — Kaydet, sıra sende, sonraki
    { id: 'record', pad: 0.6, min: 10.5, text: 'Bulgularımı gözlem defterime kaydedeyim.', key: 'Kaydet' },
    { id: 'yourturn', pad: 1.2, min: 9.5, text: 'Sıra sende! Çöldeki kayalar gece-gündüz sıcaklık farkıyla neden ufalanır? Tahmin et ve araştır.' },
    { id: 'next', pad: 0.8, text: 'Sıradaki gözlemim: Maddeler hangi sıcaklıkta erir, donar ve kaynar?' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
