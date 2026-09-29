// narration.js — 8. sınıf Film 18: "Seri mi, Paralel mi?"  (Maarif FB.8.6.1)
// Tek düzenlenebilir metin kaynağı. Sessiz film: text altyazı olarak görünür.
const NARRATION = {
  film: '18-seri-paralel',
  title: 'Seri mi, Paralel mi?',
  outcome: 'FB.8.6.1',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak (köprü kurma: evdeki ampuller)
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.4, min: 6, text: 'Dün akşam avizedeki ampullerden biri patladı. Ama diğerleri aynı parlaklıkta yanmaya devam etti!' },
    { id: 'string', pad: 0.4, min: 6, text: 'Oysa eski bir süs ışığında tek ampul bozulunca bütün ampuller sönmüştü.' },
    { id: 'q', pad: 0.8, text: 'Merak ediyorum: Ampullerin bağlanma şekli parlaklıklarını nasıl etkiler?', key: 'Soru sor' },
    // SAHNE 2 — İki çeşit bağlama (devre görselleri)
    { id: 'look', pad: 0.4, text: 'Önce kitaplardaki ve dijital kaynaklardaki devre görsellerini dikkatle inceledim.', key: 'Görselleri incele' },
    { id: 'series', pad: 0.6, min: 7, text: 'Bazı devrelerde ampuller art arda dizilmiş. Akımın izleyebileceği tek bir yol var. Buna seri bağlama denir.', key: 'Seri bağlama' },
    { id: 'parallel', pad: 0.6, min: 7, text: 'Bazılarında ise her ampul ayrı bir koldadır. Akım kollara ayrılır. Buna paralel bağlama denir.', key: 'Paralel bağlama' },
    { id: 'two', pad: 0.8, text: 'Çıkarımım: Ampuller devreye iki şekilde bağlanabilir, seri ya da paralel.' },
    // SAHNE 3 — Güvenlik
    { id: 'safety', pad: 1.0, min: 9, text: 'Deneyden önce güvenlik! Yalnızca pil kullanırım, kısa devre yapmam, bir yetişkin eşliğinde çalışırım.', key: 'Güvenlik' },
    // SAHNE 4 — Deney tasarımı
    { id: 'design', pad: 0.4, text: 'Deneyimi tasarlıyorum. Bağımsız değişken: ampullerin bağlanma şekli ve sayısı.', key: 'Deney tasarla' },
    { id: 'vars', pad: 0.8, min: 7, text: 'Bağımlı değişken: ampullerin parlaklığı. Pil sayısı, kablolar ve özdeş ampuller hep aynı kalacak.' },
    { id: 'ref', pad: 0.8, min: 6, text: 'Karşılaştırma için önce tek ampullü devreyi kurdum. Bu, parlaklık ölçütüm olacak.', key: 'Tek ampul' },
    // SAHNE 5 — Seri deney
    { id: 's2', pad: 0.4, min: 6.5, text: 'Şimdi iki özdeş ampulü seri bağladım. İkisi de tek ampulden daha sönük yanıyor.', key: 'Seri devre' },
    { id: 's3', pad: 0.4, min: 6, text: 'Üç ampul seri bağlanınca her biri daha da sönükleşti.' },
    { id: 'sout', pad: 1.0, min: 7, text: 'Ampullerden birini duyundan söktüm. Yol kesildi, hepsi söndü!' },
    // SAHNE 6 — Paralel deney
    { id: 'p2', pad: 0.4, min: 6.5, text: 'Aynı pillerle iki ampulü paralel bağladım. Her biri tek ampul kadar parlak!', key: 'Paralel devre' },
    { id: 'p3', pad: 0.4, min: 6, text: 'Üç ampulü paralel bağlayınca da parlaklık değişmedi.' },
    { id: 'pout', pad: 1.0, min: 7, text: 'Birini söktüm. Diğerleri kendi kollarında yanmaya devam ediyor!' },
    // SAHNE 7 — Veri ve analiz
    { id: 'data', pad: 0.6, min: 8, text: 'Gözlemlerimi tabloya kaydettim. Şimdi verileri karşılaştırarak analiz edeyim.', key: 'Veri analizi' },
    { id: 'rs', pad: 0.4, min: 7, text: 'Seri bağlamada ampul sayısı arttıkça her ampulün parlaklığı azalır. Biri sökülünce hepsi söner.', key: 'Sonuç' },
    { id: 'rp', pad: 0.4, min: 7, text: 'Paralel bağlamada her ampul tek ampul kadar parlaktır. Biri sökülünce diğerleri yanmaya devam eder.' },
    { id: 'home', pad: 0.6, min: 6.5, text: 'Demek ki evimizdeki lambalar paralel bağlı! Avizedeki ampul bu yüzden tek başına söndü.' },
    { id: 'drain', pad: 1.0, text: 'Bir not daha: Paralel bağlı ampuller pilden daha çok akım çeker, pil daha çabuk biter.' },
    // SAHNE 8 — Sıra sende + sonraki film
    { id: 'task', pad: 1.0, min: 10, text: 'Sıra sende! Grubunla seri ve paralel devreler kur. Sonuçlarını raporla. Deneyden sonra masanı temizle.', key: 'Sıra sende!' },
    { id: 'next', pad: 0.8, text: 'Sıradaki gözlemim: Kablolarda akan akımı ve pilin gerilimini ölçmek.' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
