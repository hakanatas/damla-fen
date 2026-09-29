// narration.js — Film 19: "Buzdan Buhara: Hâl Değişimi"  (Maarif FB.5.5.4)
// Tek düzenlenebilir metin kaynağı. Sessiz sürüm: text = altyazı.
const NARRATION = {
  film: '19-hal-degisimi',
  title: 'Buzdan Buhara: Hâl Değişimi',
  outcome: 'FB.5.5.4 Maddenin ısı etkisiyle hâl değiştirebileceğini bilimsel gözleme dayalı tahmin edebilme',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Donmuş uyanış (ön deneyim)
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.8, text: 'Günaydın! Bu sabah pencerede donmuş olarak uyandım. Buz olmuşum!' },
    { id: 'melt', pad: 1.2, min: 7, text: 'Güneş beni ısıttı. Isı aldım ve yeniden sıvı oldum!' },
    // SAHNE 2 — Önerme: gözleme dayalı olan / olmayan
    { id: 'guess', pad: 0.8, text: 'Buradan bir önerme çıkardım: Maddeler ısı alınca ya da verince hâl değiştirebilir.', key: 'Önerme' },
    { id: 'compare', pad: 0.8, text: 'Ama bu önerim yalnızca günlük deneyimime dayanıyor. Hiç ölçüm yapmadım.' },
    { id: 'science', pad: 1.2, text: 'Bilimsel gözlem için ölçmeli, kaydetmeli ve deneyi tekrarlayabilmeliyim.', key: 'Gözleme dayalı mı?' },
    // SAHNE 3 — Güvenlik
    { id: 'safety', pad: 0.6, text: 'Sınıfta bir gösteri deneyi izleyeceğiz. Isıtıcıyı yalnızca öğretmenim kullanacak!', key: 'Güvenlik' },
    { id: 'hot', pad: 1.0, text: 'Isıtıcı, sıcak kap ve buhar yakar. Asla dokunmayız!' },
    // SAHNE 4 — Gösteri deneyi: veri toplama
    { id: 'setup', pad: 0.8, text: 'Beherdeki buzu ısıtıyoruz. Her iki dakikada sıcaklığı ölçüp tabloya yazıyorum.', key: 'Veri topla' },
    { id: 'warm-ice', pad: 0.6, min: 6, text: 'Buz ısınıyor: eksi on derece... eksi beş... sıfır!' },
    { id: 'melt-plateau', pad: 1.0, min: 9, text: 'Buz eriyor. Isı almaya devam ediyor ama sıcaklık 0 °C’de sabit kalıyor!', key: 'Erime' },
    { id: 'evap', pad: 1.0, min: 9, text: 'Buz bitti, su ısınıyor. Yüzeyden buhar yükseliyor: buharlaşma. Bu, her sıcaklıkta olur.', key: 'Buharlaşma' },
    { id: 'boil', pad: 1.4, min: 8, text: 'Yaklaşık 100 °C’de su kaynıyor. Isı almaya devam ediyor, sıcaklık yine sabit!', key: 'Kaynama' },
    // SAHNE 5 — Veriden sonuç
    { id: 'conclude', pad: 1.4, min: 10, text: 'Verilerimi grafiğe döktüm. Erime ve kaynama boyunca sıcaklık sabit kalıyor.', key: 'Sonuç çıkar' },
    // SAHNE 6 — Akış şeması
    { id: 'freeze', pad: 0.8, text: 'Tersi de olur: Su ısı verince 0 °C’de donar. Donarken sıcaklık sabit kalır.', key: 'Donma' },
    { id: 'condense', pad: 0.8, text: 'Su buharı soğuk bir yüzeye değip ısı verince su damlacıklarına döner: yoğuşma.', key: 'Yoğuşma' },
    { id: 'sub', pad: 0.8, text: 'Bazı katılar sıvı olmadan doğrudan gaza dönüşür: süblimleşme. Naftalin buna bir örnektir.', key: 'Süblimleşme' },
    { id: 'frost', pad: 0.8, text: 'Soğuk gecelerde su buharı da doğrudan buza dönüşebilir. Bu, kırağılaşmadır.', key: 'Kırağılaşma' },
    { id: 'flow', pad: 1.4, min: 8, text: 'İşte akış şemam: Isı alınca bir yöne, ısı verince ters yöne!', key: 'Akış şeması' },
    // SAHNE 7 — Gözlemlenmemiş durum için tahmin + geçerliği sorgulama
    { id: 'predict', pad: 0.6, text: 'Gözlemlemediğim bir durumu tahmin edeyim: Serin bir günde ıslak çamaşır kurur mu?', key: 'Tahmin' },
    { id: 'guess2', pad: 0.8, text: 'Tahminim: Kurur! Çünkü buharlaşma her sıcaklıkta olur. Ama daha yavaş kurur.' },
    { id: 'validity', pad: 1.2, min: 9, text: 'Tahminim geçerli mi? İki ıslak bezi serin ve ılık yerde kurutup karşılaştırmalıyım.', key: 'Geçerliği sorgula' },
    // SAHNE 8 — Kaydet, sıra sende, sonraki
    { id: 'record', pad: 0.6, min: 11, text: 'Bulgularımı gözlem defterime kaydedeyim.', key: 'Kaydet' },
    { id: 'yourturn', pad: 1.2, min: 9, text: 'Sıra sende! Buzdolabından çıkan şişenin dışı neden ıslanır? Önce tahmin et, sonra gözlemle.' },
    { id: 'next', pad: 0.8, text: 'Sıradaki gözlemim: Hangi maddeler ısıyı iyi iletir?' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
