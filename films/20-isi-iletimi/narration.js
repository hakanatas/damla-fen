// narration.js — Film 20: "Isıyı İleten, İletmeyen"  (Maarif FB.5.5.5)
// Tek düzenlenebilir metin kaynağı. Sessiz sürüm: text = altyazı.
const NARRATION = {
  film: '20-isi-iletimi',
  title: 'Isıyı İleten, İletmeyen',
  outcome: 'FB.5.5.5 Maddeleri ısı iletimi bakımından sınıflandırabilme',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak: iki kaşık
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.8, text: 'Merhaba! Sıcak çorbanın içinde bir metal, bir de tahta kaşık duruyor.' },
    { id: 'question', pad: 1.0, min: 8, text: 'Biraz sonra metal kaşığın sapı ısındı, tahta kaşığınki pek ısınmadı. Neden?', key: 'Soru sor' },
    // SAHNE 2 — Güvenlik
    { id: 'safety', pad: 1.2, text: 'Sıcak kaşığa ve tencereye dokunmayız! Deneyi bir yetişkinle, güvenli biçimde yapacağız.', key: 'Güvenlik' },
    // SAHNE 3 — Nitelik: ısı iletimi
    { id: 'conduct', pad: 0.8, min: 9, text: 'Isı, sıcak uçtan soğuk uca doğru tanecikten taneciğe aktarılır. Buna ısı iletimi denir.', key: 'Isı iletimi' },
    { id: 'define', pad: 1.2, text: 'Isıyı iyi ileten maddelere ısı iletkeni, iyi iletmeyenlere ısı yalıtkanı denir.', key: 'İletken · yalıtkan' },
    // SAHNE 4 — Deney: boncuk testi
    { id: 'setup', pad: 0.8, text: 'Sıcak su dolu kaba farklı çubuklar koyduk. Uçlarına tereyağıyla birer boncuk yapıştırdık.', key: 'Deney' },
    { id: 'predict', pad: 0.8, text: 'Sence hangi çubuktaki boncuk önce düşer? Tahminini aklında tut!', key: 'Tahmin et' },
    { id: 'watch', pad: 0.6, min: 8, text: 'Isı çubuğun ucuna ulaşıp tereyağını eritirse boncuk düşer. Bekleyip gözleyelim.' },
    { id: 'result', pad: 1.2, min: 8, text: 'Metal çubuklardaki boncuklar düştü! Tahta ve plastikteki boncuklar yerinde duruyor.', key: 'Kanıt' },
    // SAHNE 5 — Ayrıştır, gruplandır, etiketle
    { id: 'sort', pad: 0.6, text: 'Şimdi eşyaları iki gruba ayıralım: ısı iletkenleri ve ısı yalıtkanları.', key: 'Sınıflandır' },
    { id: 'metals', pad: 0.8, min: 7, text: 'Demir, bakır ve alüminyum gibi metaller ısıyı iyi iletir.', key: 'Isı iletkeni' },
    { id: 'insul', pad: 0.8, min: 8, text: 'Tahta, plastik, yün, mantar ve hava ise ısıyı iyi iletmez. Bunlar ısı yalıtkanıdır.', key: 'Isı yalıtkanı' },
    { id: 'air', pad: 1.0, text: 'Yün kazak, lifleri arasında hava tuttuğu için vücudumuzun ısısını korur.' },
    { id: 'pot', pad: 0.6, text: 'Peki tencerenin gövdesi metal, sapı neden plastik?', key: 'Etiketle' },
    { id: 'pot2', pad: 1.2, text: 'Gövde ısıyı yemeğe iletsin, sap da elimizi korusun diye!' },
    // SAHNE 6 — Binalar ve tasarruf
    { id: 'home', pad: 0.8, text: 'Binalarda da ısı yalıtkanı malzemeler kullanılır. Böylece ısı, duvarlardan daha yavaş geçer.', key: 'Binalarda yalıtım' },
    { id: 'economy', pad: 1.2, text: 'Daha az yakıt ve enerji harcanır. Bu, hem aile bütçesine hem ülke ekonomisine katkıdır.', key: 'Tasarruf' },
    // SAHNE 7 — Kaydet, sıra sende, sonraki
    { id: 'record', pad: 0.6, min: 10, text: 'Bulgularımı gözlem defterime kaydedeyim.', key: 'Kaydet' },
    { id: 'yourturn', pad: 1.2, min: 9, text: 'Sıra sende! Evindeki eşyaları ısı iletkeni ve ısı yalıtkanı olarak iki gruba ayır.' },
    { id: 'next', pad: 0.8, text: 'Sıradaki gözlemim: Evleri sıcak tutan bir ısı yalıtımı modeli!' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
