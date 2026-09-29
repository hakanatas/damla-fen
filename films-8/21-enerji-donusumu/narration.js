// narration.js — 8. sınıf Film 21: "Elektrik Enerjisi Neye Dönüşür?"  (Maarif FB.8.6.6 · FB.8.6.7)
// Tek düzenlenebilir metin kaynağı. Sessiz film: text altyazı olarak görünür.
const NARRATION = {
  film: '21-enerji-donusumu',
  title: 'Elektrik Enerjisi Neye Dönüşür?',
  outcome: 'FB.8.6.6 · FB.8.6.7',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.6, min: 6, text: 'Merhaba! Akşam oldu. Evde lamba yanıyor, su ısıtıcısı kaynıyor, vantilatör dönüyor.' },
    { id: 'q', pad: 0.8, text: 'Hepsi elektrik enerjisiyle çalışıyor. Peki bu enerji her alette neye dönüşüyor?', key: 'Elektrik enerjisi' },
    // SAHNE 2 — Güvenlik
    { id: 'safe', pad: 0.4, min: 6.5, text: 'Önce güvenlik! Prize parmak ya da metal bir şey sokulmaz. Islak elle fişe dokunulmaz.', key: 'Güvenlik' },
    { id: 'safe2', pad: 0.8, text: 'Deneylerimde yalnızca pil kullanırım ve bir yetişkin eşliğinde çalışırım.' },
    // SAHNE 3 — Ampul: dönüşümün nitelikleri (FB.8.6.6 a)
    { id: 'bulb', pad: 0.4, min: 5, text: 'Pile bir ampul bağladım. Ampul ışığı nereden alıyor?' },
    { id: 'bulb2', pad: 0.6, text: 'Akım ampulden geçince elektrik enerjisi ışık enerjisine dönüşür. Enerji yok olmaz, biçim değiştirir.', key: 'Enerji dönüşümü' },
    { id: 'bulb3', pad: 0.6, min: 6, text: 'Ampulün yanına bir termometre koydum. Sıcaklık artıyor! Enerjinin bir kısmı ısıya da dönüşüyor.' },
    { id: 'feat', pad: 0.8, min: 7, text: 'Niteliklerini not ediyorum: Elektrik enerjisi başka enerjilere dönüşür. Çoğu alette birden fazla dönüşüm olur.', key: 'Nitelikler' },
    // SAHNE 4 — Ayrıştır, gruplandır, etiketle (b, c, ç)
    { id: 'sort', pad: 0.4, min: 6, text: 'Şimdi evdeki aletleri tek tek inceleyip ayrıştırıyorum. Her biri elektriği en çok neye dönüştürüyor?', key: 'Ayrıştır' },
    { id: 'group', pad: 0.4, min: 5, text: 'Ütü ve su ısıtıcısı ısı verir. Ampul ve el feneri ışık verir.', key: 'Gruplandır' },
    { id: 'group2', pad: 0.4, min: 5, text: 'Hoparlör ve kapı zili ses çıkarır. Vantilatör ve mikser hareket eder.' },
    { id: 'label', pad: 0.6, min: 5, text: 'Kartları eşleştirip her gruba bir etiket veriyorum: ısı, ışık, ses, hareket.', key: 'Etiketle' },
    { id: 'multi', pad: 0.4, min: 6, text: 'Ama saç kurutma makinesi hem ısıtır hem de içindeki pervaneyi döndürür! Televizyon ise hem ışık hem ses verir.' },
    { id: 'multi2', pad: 0.8, text: 'Demek ki bir alet, elektrik enerjisini aynı anda birden fazla enerjiye dönüştürebilir.' },
    // SAHNE 5 — Akımın ısı etkisi + güvenlik
    { id: 'iron', pad: 0.6, min: 6, text: 'Ütü nasıl ısınıyor? İçinde bir direnç teli var. Telden akım geçince tel ısınır.', key: 'Akımın ısı etkisi' },
    { id: 'iron2', pad: 0.6, text: 'Su ısıtıcısı, tost makinesi ve elektrikli ısıtıcı da bu etkiyle çalışır.' },
    { id: 'fire', pad: 0.8, min: 6.5, text: 'Kablolar da aşırı akımla ısınabilir. Bu yüzden tek bir prize çok sayıda güçlü alet takılmaz!', key: 'Güvenlik' },
    // SAHNE 6 — Model öner ve yenile (FB.8.6.7)
    { id: 'model', pad: 0.6, min: 7, text: 'Şimdi bir model öneriyorum: pil, kablo, küçük bir motor ve pervane. Elektrik enerjisi hareket enerjisine!', key: 'Model öner' },
    { id: 'test', pad: 0.6, min: 6, text: 'Modeli çalıştırıp kayıt tutuyorum. Pervane dönüyor... ama motor ısınıyor ve vızıldıyor!' },
    { id: 'revise', pad: 0.6, min: 6, text: 'Yeni kayıtlara göre modelimi yeniliyorum: Elektrik enerjisi hareket, ısı ve ses enerjisine dönüşüyor.', key: 'Modeli yenile' },
    { id: 'useful', pad: 0.8, text: 'Burada istenen dönüşüm hareket. Isı ve ses, istenmeyen dönüşümler.' },
    // SAHNE 7 — Kaydet
    { id: 'record', pad: 0.6, min: 11, text: 'Bulduklarımı gözlem defterime kaydediyorum.', key: 'Kaydet' },
    // SAHNE 8 — Sıra sende · Sıradaki
    { id: 'task', pad: 0.6, min: 8, text: 'Sıra sende! Evindeki aletleri dört gruba ayırıp bir afiş hazırla. Ya da kendi dönüşüm modelini tasarla.' },
    { id: 'next', pad: 0.8, text: 'Peki prizdeki elektrik nereden geliyor? Sıradaki gözlemim: elektrik üretim santralleri!' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
