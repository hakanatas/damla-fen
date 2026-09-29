// narration.js — 7. sınıf Film 23: "Kaynakların Tasarruflu Kullanımı"  (Maarif FB.7.7.2) — 7. sınıf serisinin finali
const NARRATION = {
  film: '23-kaynak-tasarrufu',
  title: 'Kaynakların Tasarruflu Kullanımı',
  outcome: 'FB.7.7.2',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Damlayan musluk
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hook', pad: 0.6, min: 7, text: 'Banyodaki musluk bütün gece damladı. Tık, tık, tık... Bu kadar su boşa mı gitti?' },
    { id: 'question', pad: 0.8, text: 'Kaynakları neden tasarruflu kullanmalıyız? Önce problemi tanımlayalım.', key: 'Problemi tanımla' },
    // SAHNE 2 — Tatlı su kaynakları
    { id: 'fresh', pad: 0.6, min: 8, text: 'Dünya’daki suyun yaklaşık yüzde 97’si tuzludur. Tatlı su yalnızca yaklaşık yüzde 3’tür.', key: 'Tatlı su kaynakları' },
    { id: 'fresh2', pad: 0.8, text: 'Tatlı suyun da çoğu buzullarda ve yer altındadır. Kolayca kullanabildiğimiz su çok azdır.' },
    { id: 'sustain', pad: 0.8, text: 'Sürdürülebilir yaşam, bugünün ihtiyaçlarını gelecek nesillerin haklarını koruyarak karşılamaktır.', key: 'Sürdürülebilir yaşam' },
    { id: 'problem', pad: 0.8, text: 'Problemim: Evimizde su boşa gidiyor mu? Nerede ve ne kadar?', key: 'Problem' },
    // SAHNE 3 — Su ayak izi
    { id: 'footprint', pad: 0.6, text: 'Su ayak izi, bir ürünün üretiminden tüketimine kadar kullanılan toplam tatlı su miktarıdır.', key: 'Su ayak izi' },
    { id: 'hidden', pad: 0.8, min: 8, text: 'Bir tişörtün ya da ekmeğin üretiminde de su kullanılır. Bu suyu göremeyiz ama ayak izimize eklenir.' },
    // SAHNE 4 — Model: evdeki su yolculuğu, atık su
    { id: 'model', pad: 0.6, min: 7.5, text: 'Evimizdeki suyun yolculuğunu gösteren bir model çizdim: musluk, lavabo, atık su.', key: 'Model geliştir' },
    { id: 'waste', pad: 0.6, min: 8, text: 'Atık su kanalizasyonla arıtma tesisine gider. Arıtılan su doğaya geri verilir.', key: 'Atık su' },
    { id: 'oil', pad: 0.6, text: 'Kullanılmış yağ lavaboya dökülmez; suyu kirletir, arıtmayı zorlaştırır. Ayrı toplanır.' },
    { id: 'model2', pad: 0.8, min: 7.5, text: 'Modelimi yeniledim: Sebze yıkama suyunu toplayıp çiçekleri suluyoruz.', key: 'Modeli yenile' },
    // SAHNE 5 — Araştırma ve veri
    { id: 'plan', pad: 0.6, min: 8, text: 'Araştırmamı planladım: Damlayan musluğun altına ölçü kabı koyup on dakika bekledim.', key: 'Araştırma' },
    { id: 'measure', pad: 0.6, min: 7.5, text: 'On dakikada yüz mililitre su toplandı. Bir saatte altı yüz mililitre eder.', key: 'Veri' },
    { id: 'interpret', pad: 0.8, min: 7.5, text: 'Bir günde yaklaşık 14 litre! Küçük bir damla, büyük bir kayıp demek.', key: 'Yorumla' },
    // SAHNE 6 — Çözüm, değerlendirme, paylaşma
    { id: 'solution', pad: 0.6, text: 'Kanıta dayalı çözümüm: Musluk hemen tamir edilmeli. Dişleri fırçalarken de musluğu kapatıyoruz.', key: 'Çözüm üret' },
    { id: 'evaluate', pad: 0.6, min: 9, text: 'Çözümleri değerlendirdim: Etkili mi, kolay mı, maliyeti ne? Musluk tamiri hem suyu hem faturayı korur.', key: 'Değerlendir' },
    { id: 'share', pad: 0.8, text: 'Bulgularımı bir afişle okulda paylaştım. Her damla değerli!', key: 'Paylaş' },
    // SAHNE 7 — Kaydet · Sıra sende · Veda
    { id: 'record', pad: 0.6, min: 8.5, text: 'Bulduklarımı gözlem defterime kaydediyorum.', key: 'Kaydet' },
    { id: 'task', pad: 0.8, text: 'Sıra sende! Suyu tasarruflu kullanmak için bir proje tasarla: Problemi bul, ölç, çözüm üret ve paylaş.', key: 'Sıra sende' },
    { id: 'bye', pad: 1.0, text: '7. sınıf gözlemlerim burada bitiyor. Sıradaki durak: 8. sınıf, Mevsimler ve İklim!' },
    { id: 'end', min: 6, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
