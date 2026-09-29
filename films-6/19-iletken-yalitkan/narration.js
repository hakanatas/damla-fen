// narration.js — 6. sınıf Film 19: "İletken mi, Yalıtkan mı?"  (Maarif FB.6.6.1)
// Tek düzenlenebilir metin kaynağı. Sessiz sürüm: text = altyazı.
const NARRATION = {
  film: '19-iletken-yalitkan',
  title: 'İletken mi, Yalıtkan mı?',
  outcome: 'FB.6.6.1 Maddelerin elektriği iletme durumlarını gösteren deney yapabilme',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.6, text: 'Merhaba! Devremde bilerek bir boşluk bıraktım. Bu boşluğa farklı maddeler koyacağım.' },
    { id: 'q', pad: 1.0, text: 'Sence hangi maddeler elektriği iletir, hangileri iletmez?', key: 'Soru sor' },
    // SAHNE 2 — Güvenlik
    { id: 'safety', pad: 0.6, text: 'Önce güvenlik! Yalnızca pil kullanırım. Prize ve şehir elektriğine asla dokunmam.', key: 'Güvenlik' },
    { id: 'safety2', pad: 1.2, min: 8, text: 'Pilin iki ucunu tek kabloyla birleştirmem. Kablolar ısınabilir. Bir yetişkin eşliğinde çalışırım.' },
    // SAHNE 3 — Devre tasarımı
    { id: 'design', pad: 0.6, text: 'Düzeneğimi tasarlıyorum: pil, ampul ve kablolar. İki kablo ucunun arasında boşluk var.', key: 'Devre tasarla' },
    { id: 'schema', pad: 0.6, text: 'Şemamda boşluk açıkça görünüyor. Devre tamamlanmadığı için ampul yanmıyor.' },
    { id: 'rule', pad: 1.0, min: 7.5, text: 'Boşluğa koyduğum madde elektriği iletirse devre tamamlanır ve ampul yanar.', key: 'Test kuralı' },
    // SAHNE 4 — Görev paylaşımı
    { id: 'group', pad: 1.0, min: 7, text: 'Grubumuzda görevleri paylaştık: biri test eder, biri gözler, biri kaydeder.', key: 'İş birliği' },
    // SAHNE 5 — Deney
    { id: 'test1', pad: 0.4, min: 10.5, text: 'Demir çivi... ampul yandı! Alüminyum folyo... yandı! Bakır tel... o da yandı!', key: 'Gözlem' },
    { id: 'test2', pad: 0.4, min: 12, text: 'Plastik cetvel... yanmadı. Tahta çubuk... yanmadı. Cam çubuk ve silgi... yine yanmadı.' },
    { id: 'fair', pad: 1.0, text: 'Her maddeyi aynı pil, aynı ampul ve aynı kablolarla, sırayla test ettim.', key: 'Sistematik çalış' },
    // SAHNE 6 — Veri, kavramlar, analiz
    { id: 'record', pad: 0.6, min: 8, text: 'Sonuçları tabloma kaydediyorum: Ampul yandı mı, yanmadı mı?', key: 'Veri kaydet' },
    { id: 'conductor', pad: 0.8, text: 'Elektriği ileten maddelere iletken madde denir. Metaller iyi iletkendir.', key: 'İletken madde' },
    { id: 'insulator', pad: 0.8, text: 'Elektriği iletmeyen maddelere yalıtkan madde denir: plastik, tahta, cam ve lastik gibi.', key: 'Yalıtkan madde' },
    { id: 'graphite', pad: 0.8, text: 'Bir sürpriz: Kurşun kalemin ucu metal değildir ama ampulü sönük de olsa yaktı.', key: 'Grafit' },
    { id: 'graphite2', pad: 1.0, text: 'Kalem ucu grafitten yapılır. Grafit de elektriği iletir.' },
    { id: 'analyze', pad: 1.2, text: 'Verilerimi inceledim: Ampulü yakan maddeler iletken, yakmayanlar yalıtkan grubunda.', key: 'Veri analizi' },
    // SAHNE 7 — Günlük yaşam
    { id: 'daily', pad: 0.8, min: 8, text: 'Kabloların içi bakırdır, dışı plastikle kaplıdır. Prizlerin ve anahtarların dış kısmı da plastiktir.', key: 'Günlük yaşamda' },
    { id: 'workers', pad: 0.8, text: 'Elektrik işçileri de yalıtkan eldiven, bot ve plastik saplı aletlerle çalışır.', key: 'İş güvenliği' },
    { id: 'digital', pad: 1.2, text: 'Güvenilir bir sanal deney sitesinde de denedim. Sonuçlar aynı çıktı!', key: 'Sanal deney' },
    // SAHNE 8 — Sıra sende + sonraki film
    { id: 'yourturn', pad: 1.2, min: 9, text: 'Sıra sende! Grubunla maddeleri test et. İletken ve yalıtkan maddeler posteri hazırla.', key: 'Sıra sende!' },
    { id: 'next', pad: 1.0, text: 'Sıradaki gözlemim: Aynı pil ve ampulle, teller parlaklığı değiştirir mi?' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
