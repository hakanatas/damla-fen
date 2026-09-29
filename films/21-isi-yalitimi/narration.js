// narration.js — Film 21: "Sıcaklığı Koruyan Ev: Isı Yalıtımı"  (Maarif FB.5.5.6)
// Tek düzenlenebilir metin kaynağı. Sessiz sürüm: text = altyazı.
const NARRATION = {
  film: '21-isi-yalitimi',
  title: 'Sıcaklığı Koruyan Ev: Isı Yalıtımı',
  outcome: 'FB.5.5.6 Isı yalıtımını gösteren bilimsel model oluşturabilme',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Senaryo: kışın ev
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.8, text: 'Brr, kış geldi! Kalorifer yanıyor ama ısı duvarlardan ve pencereden dışarı kaçıyor.' },
    { id: 'question', pad: 1.0, text: 'Evin sıcaklığını korumak için ne yapabiliriz? Hadi bir model tasarlayalım!', key: 'Senaryo' },
    // SAHNE 2 — Günlük yaşamda ısı akışını yavaşlatan örnekler
    { id: 'examples', pad: 0.8, min: 8, text: 'Önce günlük yaşama bakalım: Termos, mont ve kuşların kabarık tüyleri ısı akışını yavaşlatır.', key: 'Isı akışını yavaşlat' },
    { id: 'thermos', pad: 0.8, text: 'Termos, çayı sıcak, ayranı soğuk tutar. Yalıtım iki yönde de işe yarar.' },
    { id: 'notheat', pad: 1.2, text: 'Mont ısı üretmez. Vücudumuzun ısısının dışarı kaçmasını yavaşlatır.', key: 'Yalıtım ısı üretmez' },
    // SAHNE 3 — Güvenlik
    { id: 'safety', pad: 1.0, text: 'Model için ılık suyu bir yetişkin hazırlasın. Sıcak su ve ısıtıcı yakabilir!', key: 'Güvenlik' },
    // SAHNE 4 — Model önerisi ve ilk test
    { id: 'plan', pad: 0.8, text: 'Modelim karton kutudan bir ev. İçindeki ılık su şişesi, evin ısısını temsil ediyor.', key: 'Model öner' },
    { id: 'propose', pad: 0.8, text: 'Önerim: Duvarları buruşturulmuş gazete kâğıdıyla kaplarsam ısı daha yavaş kaçar.' },
    { id: 'test1', pad: 0.8, min: 9, text: 'İki evi yan yana koydum. Her beş dakikada suyun sıcaklığını ölçüp kaydettim.', key: 'Test et' },
    { id: 'data1', pad: 1.2, min: 8, text: 'Yirmi dakika sonra: Kaplamasız evde 28, kaplamalı evde 32 derece. Kaplama işe yaradı!' },
    // SAHNE 5 — Yeni kanıt ve modeli yenileme
    { id: 'compare', pad: 0.8, text: 'Arkadaşım Ece de bir model yapmış. Onun evindeki su 35 derecede kalmış!', key: 'Modelleri karşılaştır' },
    { id: 'evidence', pad: 0.8, min: 8, text: 'Farkı buldum: Ece çatıyı da kaplamış, kapı ve pencere aralıklarını da kapatmış.', key: 'Yeni kanıt' },
    { id: 'revise', pad: 0.8, min: 10, text: 'Modelimi yeniliyorum: Çatıyı kaplıyorum, aralıkları bantlıyorum, pencereye ikinci bir kat ekliyorum.', key: 'Modeli yenile' },
    { id: 'test2', pad: 1.2, min: 8, text: 'Yeniden test ettim: Su 35 derecede kaldı. Yeni kanıtla modelim gelişti!' },
    // SAHNE 6 — Tüm mevsimler + kültürel miras
    { id: 'summer', pad: 0.8, min: 8, text: 'Peki yazın? Kutulara buzlu su koydum. Yalıtımlı evdeki su daha uzun süre soğuk kaldı.', key: 'Tüm mevsimlerde' },
    { id: 'allyear', pad: 1.2, text: 'Isı yalıtımı kışın ısının dışarı, yazın ise içeri geçişini yavaşlatır.' },
    { id: 'heritage', pad: 1.4, min: 9, text: 'Atalarımız da bunu biliyordu! Harran’ın kalın kerpiç duvarlı kümbet evleri, yazın içini serin tutar.', key: 'Kültürel miras' },
    // SAHNE 7 — Kaydet, paylaş, sıra sende, sonraki
    { id: 'record', pad: 0.6, min: 10, text: 'Model sürecimi gözlem defterime kaydedeyim.', key: 'Kaydet' },
    { id: 'share', pad: 0.8, text: 'Bilim insanları modellerini paylaşır, karşılaştırır ve yeni kanıtlarla yeniler.', key: 'Paylaş' },
    { id: 'yourturn', pad: 1.2, min: 9, text: 'Sıra sende! Kutudan bir ev modeli tasarla. Test et, arkadaşlarınınkiyle karşılaştır ve yenile!' },
    { id: 'next', pad: 0.8, text: 'Sıradaki gözlemim: Elektrik devresinin elemanları ve sembolleri.' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
