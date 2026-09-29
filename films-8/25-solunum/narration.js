// narration.js — 8. sınıf Film 25: "Besinden Enerjiye: Canlılarda Solunum"  (Maarif FB.8.7.3)
// Tek düzenlenebilir metin kaynağı. Sessiz film: text altyazı olarak görünür.
const NARRATION = {
  film: '25-solunum',
  title: 'Besinden Enerjiye: Canlılarda Solunum',
  outcome: 'FB.8.7.3',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.4, text: 'Merhaba! Arkadaşım Ela ip atlıyor. Bu hareketin enerjisi nereden geliyor?' },
    { id: 'q', pad: 0.4, text: 'Enerji besinlerden gelir. Ama besindeki enerji nasıl açığa çıkar?', key: 'Soru sor' },
    { id: 'breath', pad: 0.8, text: 'Solunum deyince aklına soluk alıp vermek mi geliyor? Asıl solunum hücrelerin içinde olur.', key: 'Solunum' },
    // SAHNE 2 — Hücrede solunum
    { id: 'cell', pad: 0.4, min: 7, text: 'Soluk aldığımız oksijen kanla hücrelere taşınır. Sindirilen besinler de hücrelere ulaşır.', key: 'Hücrede solunum' },
    { id: 'mito', pad: 0.4, min: 6.5, text: 'Hücredeki mitokondride besin oksijenle parçalanır ve besindeki enerji açığa çıkar.', key: 'Enerji açığa çıkar' },
    { id: 'waste', pad: 0.4, text: 'Bu sırada karbondioksit ve su oluşur. Karbondioksiti soluk verirken dışarı atarız.', key: 'Karbondioksit + su' },
    { id: 'atp', pad: 0.4, text: 'Açığa çıkan enerjinin bir kısmı ATP adlı bir molekülde depolanır. ATP, hücrenin enerji parası gibidir.', key: 'ATP' },
    { id: 'use', pad: 0.8, min: 7, text: 'Hücre ATP’yi harcayarak kasları çalıştırır, büyür ve onarılır. Enerjinin bir kısmı ısı olarak yayılır.' },
    // SAHNE 3 — Kanıt: kireç suyu
    { id: 'evid', pad: 0.4, text: 'Soluk verdiğimiz havada karbondioksit olduğunu nasıl kanıtlarım? Kireç suyuyla!', key: 'Kanıt' },
    { id: 'safety', pad: 0.6, min: 7, text: 'Dikkat! Kireç suyu içilmez; pipetle yalnızca üflenir, çekilmez. Gözlük tak, yetişkin eşliğinde çalış.', key: 'Güvenlik' },
    { id: 'lime', pad: 0.8, min: 7, text: 'Kireç suyuna üfleyince berrak su bulanıyor. Bulanma, karbondioksitin kanıtıdır.' },
    // SAHNE 4 — Tüm canlılar
    { id: 'all', pad: 0.4, text: 'Peki solunum yalnızca insanlarda mı olur? Hayır! Solunum tüm canlılar için ortak bir özelliktir.', key: 'Tüm canlılar' },
    { id: 'consumer', pad: 0.4, text: 'Tüketiciler solunum için gereken besini dışarıdan, yiyerek alır.', key: 'Tüketici' },
    { id: 'producer', pad: 0.8, text: 'Üreticiler ise besinlerini fotosentezle kendileri üretir, sonra solunumla bu besinden enerji elde eder.', key: 'Üretici' },
    // SAHNE 5 — Bitkilerde solunum: gece ve gündüz
    { id: 'myth', pad: 0.4, text: 'Sık duyulan bir yanlış: “Bitkiler gündüz fotosentez, gece solunum yapar.”', key: 'Yanlış bilgi' },
    { id: 'truth', pad: 0.4, text: 'Doğrusu: Bitkiler gece de gündüz de solunum yapar. Fotosentez ise yalnızca ışıkta olur.', key: 'Gece ve gündüz' },
    { id: 'day', pad: 0.4, min: 6, text: 'Gündüz fotosentez solunumdan hızlıdır; bitki dışarıya oksijen verir.' },
    { id: 'night', pad: 0.8, min: 6, text: 'Gece yalnızca solunum olur; bitki oksijen alır, karbondioksit verir.' },
    // SAHNE 6 — Karşılaştır ve kavram haritası
    { id: 'compare', pad: 0.4, min: 12, text: 'Fotosentez ile solunumu karşılaştıralım.', key: 'Karşılaştır' },
    { id: 'link', pad: 0.8, text: 'Birinin ürettikleri, diğerinin kullandıklarıdır. İkisi birlikte yaşamı sürdürür.' },
    { id: 'map', pad: 0.4, min: 10, text: 'Kavram haritamı defterime çiziyorum.', key: 'Kavram haritası' },
    { id: 'why', pad: 0.8, text: 'Solunum durursa hücreler enerji elde edemez ve yaşam durur. Solunum bu yüzden hayati önemdedir.' },
    // SAHNE 7 — Sıra sende · Sıradaki
    { id: 'task', pad: 0.6, min: 8, text: 'Sıra sende! Bir besinin vücudunda enerjiye dönüşme yolculuğunu araştır ve grubunla tartış.' },
    { id: 'next', pad: 0.8, text: 'Oksijen ve karbon canlılar ile çevre arasında dolaşıp duruyor. Sıradaki gözlemim: madde döngüleri!' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
