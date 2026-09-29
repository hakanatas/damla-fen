// narration.js — Film 24: "Ampulün Parlaklığı: Hipotez Kuralım"  (Maarif FB.5.6.3)
// Tek düzenlenebilir metin kaynağı. Sessiz sürüm: text = altyazı.
const NARRATION = {
  film: '24-ampul-parlakligi',
  title: 'Ampulün Parlaklığı: Hipotez Kuralım',
  outcome: 'FB.5.6.3 Bir elektrik devresindeki ampul parlaklığını etkileyen değişkenlerin neler olduğuna ilişkin hipotez oluşturabilme',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak (köprü: uygun aydınlatma)
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.6, text: 'Merhaba! Kitap okurken ışığın yeterince parlak olması gerekir.' },
    { id: 'q', pad: 0.8, text: 'Peki bir devredeki ampulün parlaklığı nelere bağlıdır?', key: 'Soru sor' },
    // SAHNE 2 — Değişkenler ve hipotez
    { id: 'vars', pad: 0.6, min: 6.5, text: 'Devremde neyi değiştirebilirim? Pil sayısını ya da ampul sayısını!', key: 'Değişkenler' },
    { id: 'hyp1', pad: 0.6, text: 'Hipotezim: Pil sayısı artarsa ampul daha parlak yanar.', key: 'Hipotez' },
    { id: 'hyp2', pad: 1.0, text: 'İkinci hipotezim: Ampul sayısı artarsa her ampul daha sönük yanar.' },
    // SAHNE 3 — Bağımsız, bağımlı, kontrol edilen değişkenler
    { id: 'indep', pad: 0.6, text: 'Değiştirdiğim şey bağımsız değişkendir: pil sayısı ya da ampul sayısı.', key: 'Bağımsız değişken' },
    { id: 'dep', pad: 0.6, text: 'Gözlediğim sonuç bağımlı değişkendir: ampulün parlaklığı.', key: 'Bağımlı değişken' },
    { id: 'ctrl', pad: 1.0, text: 'Geri kalan her şeyi aynı tutarım: aynı tür piller, aynı tür ampuller, aynı kablolar.', key: 'Kontrol edilen değişken' },
    // SAHNE 4 — Güvenlik
    { id: 'safety', pad: 1.0, text: 'Deneyi yalnızca pille ve bir yetişkin eşliğinde yapıyorum. Pilin iki ucunu tek kabloyla birleştirmiyorum.', key: 'Güvenlik' },
    // SAHNE 5 — Deney 1: pil sayısı (TGA)
    { id: 'e1', pad: 0.4, text: 'Deney 1: Ampul sayısı hep bir. Yalnızca pil sayısını değiştiriyorum.', key: 'Deney 1: pil sayısı' },
    { id: 'e1-t', pad: 0.4, text: 'Önce tahminimi yazıyorum: Pil arttıkça ampul daha parlak olacak.', key: 'Tahmin' },
    { id: 'e1-g', pad: 0.4, min: 9, text: 'Şimdi gözlem: bir pil... iki pil... üç pil!', key: 'Gözlem' },
    { id: 'e1-a', pad: 1.0, text: 'Açıklama: Tahminim doğru. Pil sayısı arttıkça ampulün parlaklığı arttı.', key: 'Açıklama' },
    // SAHNE 6 — Deney 2: ampul sayısı (TGA)
    { id: 'e2', pad: 0.4, text: 'Deney 2: Pil sayısı hep iki. Bu kez ampul sayısını değiştiriyorum.', key: 'Deney 2: ampul sayısı' },
    { id: 'e2-t', pad: 0.4, text: 'Tahminim: Ampul sayısı artınca ampuller daha sönük yanacak.', key: 'Tahmin' },
    { id: 'e2-g', pad: 0.4, min: 9, text: 'Gözlem: bir ampul... iki ampul... üç ampul!', key: 'Gözlem' },
    { id: 'e2-a', pad: 1.0, text: 'Açıklama: Ampul sayısı arttıkça her bir ampulün parlaklığı azaldı.', key: 'Açıklama' },
    // SAHNE 7 — Tekrar ve önermeler
    { id: 'repeat', pad: 0.8, text: 'Deneyleri tekrarladım, sonuçlar aynı. Güvenilir bir dijital deney düzeneğinde de aynısını gördüm.', key: 'Tekrarla' },
    { id: 'prop', pad: 0.4, min: 7.5, text: 'Önermelerim: Pil sayısı artarsa ampulün parlaklığı artar.', key: 'Önermeler' },
    { id: 'prop2', pad: 1.2, min: 7.5, text: 'Ampul sayısı artarsa her bir ampulün parlaklığı azalır.' },
    // SAHNE 8 — Sıra sende + sonraki film
    { id: 'yourturn', pad: 1.2, text: 'Sıra sende! Grubunla tahminini yaz, pil ya da ampul sayısını değiştir, gözle ve açıkla.', key: 'Sıra sende!' },
    { id: 'next', pad: 1.2, text: 'Sıradaki gözlemim: evimizdeki atıklar. Hangileri geri dönüştürülebilir?' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
