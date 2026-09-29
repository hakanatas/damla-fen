// narration.js — 8. sınıf Film 11: "Sesin Özellikleri: Frekans ve Şiddet"  (Maarif FB.8.4.3 · FB.8.4.4)
const NARRATION = {
  film: '11-ses-ozellikleri',
  title: 'Sesin Özellikleri: Frekans ve Şiddet',
  outcome: 'FB.8.4.3 · FB.8.4.4',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Kedi ve aslan (köprü)
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hook', pad: 0.8, min: 8, text: 'Kedinin miyavlaması ile aslanın kükremesi çok farklı. Kedinin sesi ince, aslanınki kalın.', key: 'İnce ses · kalın ses' },
    // SAHNE 2 — Müzik aletleri, soru
    { id: 'instr', pad: 0.8, min: 8, text: 'Müzik aletleri de farklı sesler çıkarır. Farklı kaynaklardaki titreşimler de farklıdır.' },
    { id: 'q', pad: 0.8, text: 'Peki aynı kaynaktan çıkan ses neden bazen ince, bazen kalın duyulur? Deney tasarlayalım.', key: 'Deney tasarla' },
    // SAHNE 3 — Cetvel deneyi (FB.8.4.3 a, b)
    { id: 'design', pad: 0.8, min: 8, text: 'Hep aynı cetvel ve aynı vuruş. Değiştirdiğim tek şey, masadan taşan kısmın uzunluğu.', key: 'Değişkenler' },
    { id: 'long', pad: 0.6, min: 7, text: 'Taşan kısım uzunken cetvel yavaş titreşiyor. Ses kalın duyuluyor.' },
    { id: 'short', pad: 0.6, min: 7.5, text: 'Taşan kısmı kısaltınca cetvel daha hızlı titreşiyor. Ses inceliyor!' },
    { id: 'data', pad: 1.0, min: 7, text: 'Verilerim açık: Titreşim hızlandıkça ses daha ince duyuluyor.', key: 'Veri analizi' },
    // SAHNE 4 — Frekans, hertz, tını
    { id: 'freq', pad: 0.8, min: 8, text: 'Bir saniyedeki titreşim sayısına frekans denir. Frekansın birimi hertzdir, kısaca Hz yazılır.', key: 'Frekans · hertz (Hz)' },
    { id: 'graph', pad: 1.0, min: 10, text: 'Aynı sürede daha çok titreşim, yüksek frekans demektir. Yüksek frekanslı ses ince, düşük frekanslı ses kalın duyulur.' },
    { id: 'timbre', pad: 1.0, min: 8, text: 'Flüt ve bağlama aynı frekansta çalsa bile onları ayırt ederiz. Sesin bu özelliğine tını denir.', key: 'Tını' },
    // SAHNE 5 — Ses şiddeti ve uzaklık (FB.8.4.4)
    { id: 'drumq', pad: 0.8, text: '“Davulun sesi uzaktan hoş gelir.” Uzaklık ve ses şiddeti işitmemizi nasıl etkiler?', key: 'Problem' },
    { id: 'loud', pad: 0.6, text: 'Ses şiddeti, sesi şiddetli ya da zayıf işitmemize neden olan özelliktir.', key: 'Ses şiddeti' },
    { id: 'hard', pad: 0.8, min: 7.5, text: 'Davula sert vurunca deri daha büyük titreşir. Ses daha şiddetli duyulur.' },
    { id: 'exp1', pad: 0.8, min: 9, text: 'Birinci deney: Vuruşu aynı tuttum ve davuldan uzaklaştım. Uzaklaştıkça ses daha zayıf duyuldu.', key: 'Uzaklık' },
    { id: 'exp2', pad: 0.8, min: 8.5, text: 'İkinci deney: Uzaklığı aynı tuttum, vuruşu güçlendirdim. Ses daha şiddetli duyuldu.' },
    { id: 'claims', pad: 1.0, min: 9.5, text: 'İki önermem var: Kaynaktan uzaklaştıkça ses daha zayıf işitilir. Ses şiddeti arttıkça ses daha güçlü işitilir.', key: 'Önerme' },
    // SAHNE 6 — Ses enerjisi ve işitme sağlığı
    { id: 'energy', pad: 0.8, min: 8.5, text: 'Ses bir enerji türüdür. Alçaktan uçan uçak camları titretir. Ses dalgalarıyla böbrek taşı bile kırılabilir.', key: 'Ses bir enerjidir' },
    { id: 'danger', pad: 0.6, text: 'Çok şiddetli sesler kulağımıza zarar verir ve işitme kaybına yol açabilir.', key: 'İşitme sağlığı' },
    { id: 'protect', pad: 1.0, min: 8, text: 'Kulaklıkla kısık sesle ve ara vererek dinle. Çok gürültülü yerlerde kulağını koru.' },
    // SAHNE 7 — Kaydet, Sıra sende, sıradaki
    { id: 'record', pad: 0.6, min: 9, text: 'Bulduklarımı gözlem defterime kaydediyorum.', key: 'Kaydet' },
    { id: 'task', pad: 0.8, min: 9, text: 'Sıra sende! Farklı frekanslarda ses çıkaran bir müzik aleti tasarla. Uzaklık deneyini V diyagramıyla açıkla.' },
    { id: 'next', pad: 0.8, text: 'Sıradaki gözlemim: Ses bir duvara çarpınca ne olur? Yansır mı, soğurulur mu?' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
