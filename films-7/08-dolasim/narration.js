// narration.js — 7. sınıf Film 8: "Vücudumuzun Taşıma Ağı: Dolaşım Sistemi" (FB.7.3.3)
const NARRATION = {
  film: '08-dolasim',
  title: 'Vücudumuzun Taşıma Ağı: Dolaşım Sistemi',
  outcome: 'FB.7.3.3',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // S1 — Merak: nabız
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'pulse', pad: 0.6, min: 7, text: 'Merhaba, ben Damla! Ela parmaklarını bileğine koydu. Tık, tık, tık... Bu atış nereden geliyor?', key: 'Nabız' },
    { id: 'count', pad: 0.6, min: 8, text: 'Nabzını ölçelim: 15 saniye sayıp 4 ile çarpıyoruz. 20 × 4 = 80 atım/dakika!', key: 'Nabzı ölç' },
    { id: 'range', pad: 0.8, text: 'Dinlenirken nabız çoğunlukla dakikada 60 ile 100 arasındadır. Koşunca hızlanır.' },
    // S2 — Dolaşım sistemi ve kalp
    { id: 'system', pad: 0.5, min: 7, text: 'Nabız, kalp atışlarının damarlardaki izidir. Dolaşım sistemi kalp, kan damarları ve kandan oluşur.', key: 'Dolaşım sistemi' },
    { id: 'job', pad: 0.5, text: 'Bu sistem oksijeni, besinleri ve atıkları bütün vücuda taşır.' },
    { id: 'heart', pad: 0.5, min: 7.5, text: 'Kalp, göğüs boşluğunda iki akciğerin arasında, biraz solda duran kaslı bir organdır.', key: 'Kalp' },
    { id: 'pump', pad: 0.9, min: 7, text: 'Yaklaşık yumruğumuz büyüklüğündedir. Kasılıp gevşeyerek kanı damarlara pompalar.', key: 'Kalp bir pompadır' },
    // S3 — Damarlar
    { id: 'artery', pad: 0.5, text: 'Atardamarlar kanı kalpten vücuda götürür. Çeperleri kalın ve esnektir; nabzı onlarda hissederiz.', key: 'Atardamar' },
    { id: 'vein', pad: 0.5, text: 'Toplardamarlar kanı vücuttan kalbe geri getirir. Çeperleri daha incedir.', key: 'Toplardamar' },
    { id: 'capil', pad: 0.9, min: 8, text: 'Kılcal damarlar çok incedir. Kan ile hücreler arasındaki madde alışverişi burada olur.', key: 'Kılcal damar' },
    // S4 — Kan
    { id: 'blood', pad: 0.5, min: 7, text: 'Kanın sıvı kısmına plazma denir. Plazma; su, besin ve atık maddeleri taşır.', key: 'Kan · Plazma' },
    { id: 'cells', pad: 0.9, min: 11, text: 'Alyuvarlar oksijen taşır. Akyuvarlar vücudu mikroplara karşı savunur. Kan pulcukları pıhtılaşmayı sağlar.', key: 'Kan hücreleri' },
    // S5 — Küçük ve büyük kan dolaşımı
    { id: 'small', pad: 0.5, min: 9, text: 'Küçük kan dolaşımı: kalp → akciğerler → kalp. Kan akciğerlerde karbondioksit bırakır, oksijen alır.', key: 'Küçük kan dolaşımı' },
    { id: 'smallO2', pad: 0.5, text: 'Böylece küçük kan dolaşımında kanın oksijen oranı artar.', key: 'Oksijen artar' },
    { id: 'big', pad: 0.5, min: 9, text: 'Büyük kan dolaşımı: kalp → vücut → kalp. Kan hücrelere oksijen ve besin verir, atıkları alır.', key: 'Büyük kan dolaşımı' },
    { id: 'bigO2', pad: 0.5, text: 'Bu yüzden büyük kan dolaşımında kanın oksijen oranı azalır.', key: 'Oksijen azalır' },
    { id: 'color', pad: 0.9, text: 'Şemalarda oksijeni az kanı mavi çizeriz. Ama gerçekte bu kan da koyu kırmızıdır!', key: 'Renk bir koddur' },
    // S6 — İbnü'n Nefîs
    { id: 'nafis', pad: 0.9, min: 8, text: 'Küçük kan dolaşımını ilk kez 13. yüzyılda İbnü’n Nefîs açıkladı ve anatomik çizimini yaptı.', key: 'İbnü’n Nefîs' },
    // S7 — Kaydet
    { id: 'record', pad: 0.9, min: 10, text: 'Model üzerindeki gözlemlerimi defterime kaydediyorum: yapı ve görevi.', key: 'Kaydet' },
    // S8 — Sıra sende · Sıradaki · Bitiş
    { id: 'task', pad: 0.8, min: 8.5, text: 'Sıra sende! Arkadaşlarınla rol oyunu yapın: kalp, damarlar ve kan hücreleri olup kanın yolculuğunu canlandırın.', key: 'Sıra sende' },
    { id: 'next', pad: 1.0, min: 5.5, text: 'Sıradaki gözlemim: kan bağışı ve dolaşım sisteminin sağlığı.' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
