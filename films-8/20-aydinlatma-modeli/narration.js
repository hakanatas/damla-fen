// narration.js — 8. sınıf Film 20: "Aydınlatma Aracı Tasarlıyorum"  (Maarif FB.8.6.5)
// Tek düzenlenebilir metin kaynağı. Sessiz film: text altyazı olarak görünür.
const NARRATION = {
  film: '20-aydinlatma-modeli',
  title: 'Aydınlatma Aracı Tasarlıyorum',
  outcome: 'FB.8.6.5',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak: geçmişten günümüze aydınlatma araçları
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.4, text: 'İnsanlar karanlığı aydınlatmak için geçmişte neler kullandı?', key: 'Soru sor' },
    { id: 'past', pad: 0.6, min: 11, text: 'Ateş ve meşale, yağ kandili, mum, gaz lambası... Sonra elektrikle çalışan akkor ampul, floresan lamba ve LED geldi.', key: 'Geçmişten günümüze' },
    { id: 'trend', pad: 0.6, text: 'Tahminim: Aydınlatma araçları daha güvenli, daha az enerji harcayan ve daha uzun ömürlü oldu.', key: 'Tahmin et' },
    { id: 'future', pad: 0.8, text: 'Peki gelecekte nasıl olacaklar? Güvenilir kaynaklardan araştırıp fikirlerimi analiz ettim.', key: 'Araştır' },
    // SAHNE 2 — Tasarım süreci
    { id: 'cycle', pad: 0.8, min: 10, text: 'Kendi aydınlatma aracımı tasarlıyorum. Adımlarım: ihtiyacı belirle, araştır, model öner, dene, kanıtlara göre yenile, sun.', key: 'Tasarım süreci' },
    { id: 'need', pad: 0.4, min: 6.5, text: 'İhtiyaç: Kamp çadırında kitap okumak için pille çalışan, taşınabilir bir okuma lambası.', key: 'İhtiyaç' },
    { id: 'criteria', pad: 0.8, min: 8, text: 'Ölçütlerim: Yeterince parlak olsun. Bir ampul bozulsa da ışık sönmesin. Işık kitabın üzerine düşsün.', key: 'Ölçütler' },
    // SAHNE 3 — Güvenlik
    { id: 'safety', pad: 1.0, min: 9, text: 'Güvenlik: Yalnızca pil kullanırım, kısa devre yapmam. Ampul ısınabilir; kâğıdı ampule değdirmem. Makası bir yetişkinle kullanırım.', key: 'Güvenlik' },
    // SAHNE 4 — Model 1
    { id: 'model1', pad: 0.6, min: 8, text: 'Modelimi öneriyorum: Karton bir gövde, iki pil, bir anahtar ve seri bağlı iki ampul.', key: 'Model öner' },
    { id: 'test1', pad: 0.4, min: 6, text: 'Denedim ve gözlemlerimi not ettim.', key: 'Dene' },
    { id: 'ev1', pad: 0.4, min: 7, text: 'Kanıt 1: Işık sönük. Seri bağlı iki ampul, tek ampulden daha az parlak yanıyor.', key: 'Kanıt topla' },
    { id: 'ev2', pad: 0.4, min: 6.5, text: 'Kanıt 2: Bir ampul gevşeyince diğeri de söndü.' },
    { id: 'ev3', pad: 1.0, min: 6.5, text: 'Kanıt 3: Işık her yöne dağılıyor, kitaba az ulaşıyor.' },
    // SAHNE 5 — Model 2 (yenileme)
    { id: 'revise', pad: 0.4, min: 7, text: 'Modelimi bu kanıtlara göre yeniliyorum.', key: 'Modeli yenile' },
    { id: 'fix1', pad: 0.4, min: 7, text: 'Ampulleri paralel bağladım. Her biri tek ampul kadar parlak, biri bozulsa diğeri yanıyor.' },
    { id: 'fix2', pad: 0.4, min: 7, text: 'Ampullerin üstüne alüminyum folyodan bir yansıtıcı ekledim. Işık kitaba yöneldi.' },
    { id: 'fix3', pad: 1.0, min: 7, text: 'Paralel devre pili daha çabuk bitirir. Kullanmadığımda anahtarı kapatırım.' },
    { id: 'test2', pad: 1.0, min: 7, text: 'Yeniden denedim: Üç ölçütüm de karşılandı!', key: 'Yeniden dene' },
    // SAHNE 6 — Sunum ve karşılaştırma
    { id: 'present', pad: 0.6, min: 8, text: 'Modelimi dijital bir sunumla sınıfıma anlattım. Arkadaşlarımın modellerini de inceledik, karşılaştırdık.', key: 'Sun ve karşılaştır' },
    { id: 'kind', pad: 1.0, text: 'Sunumlarda birbirimizi nazikçe dinledik, önerilerle modellerimizi geliştirdik.' },
    // SAHNE 7 — Sıra sende + sonraki film
    { id: 'task', pad: 1.0, min: 10, text: 'Sıra sende! Grubunla özgün bir aydınlatma aracı modeli tasarla. Dene, kanıtlara göre yenile ve sun.', key: 'Sıra sende!' },
    { id: 'next', pad: 0.8, text: 'Lambam ışık veriyor ama ısınıyor da. Sıradaki gözlemim: Elektrik enerjisinin dönüşümü.' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
