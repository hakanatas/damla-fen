// narration.js — Film 10: "Hücreden Organizmaya"  (Maarif FB.5.3.2)
const NARRATION = {
  film: '10-hucreden-organizmaya',
  title: 'Hücreden Organizmaya',
  outcome: 'FB.5.3.2 Hücre-doku-organ-sistem-organizma kavramlarını yapılandırabilme',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak + rol oynama
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.6, text: 'Merhaba! Hücrelerin canlının yapı taşı olduğunu öğrendim. Peki hücreler bir araya gelince ne olur?', key: 'Soru sor' },
    { id: 'role', pad: 0.8, text: 'Bugün rol oynayacağım! Her kartta bir yapıyı canlandıracağım.', key: 'Rol oynama' },
    // SAHNE 2 — Basamaklar
    { id: 'cell', pad: 0.6, text: 'Ben bir kas hücresiyim! Tek başıma çok küçüğüm, ama benim de bir görevim var.', key: 'Hücre' },
    { id: 'tissue', pad: 0.6, min: 9, text: 'Benim gibi pek çok hücre bir araya geldi. Benzer yapı ve görevdeki hücreler doku oluşturur.', key: 'Doku' },
    { id: 'organ', pad: 0.6, text: 'Kas dokusu, başka dokularla birlikte kalbi oluşturur. Belirli bir görevi yapan bu yapıya organ denir.', key: 'Organ' },
    { id: 'system', pad: 0.6, text: 'Kalp, damarlarla birlikte kanı vücuda taşır. Birlikte çalışan organlar sistem oluşturur.', key: 'Sistem' },
    { id: 'organism', pad: 1.0, text: 'Pek çok sistem uyum içinde çalışır ve bir canlıyı, yani organizmayı oluşturur.', key: 'Organizma' },
    // SAHNE 3 — Hiyerarşi
    { id: 'ladder', pad: 0.8, min: 10, text: 'Basamakları sıralayalım: hücre, doku, organ, sistem, organizma. Her basamak bir öncekilerden oluşur.', key: 'Sıralama' },
    { id: 'wrong', pad: 0.4, min: 6, text: 'Bir arkadaşım “Organ, dokudan küçüktür.” dedi. Sence doğru mu?' },
    { id: 'fix', pad: 1.0, min: 7, text: 'Hayır! Organ, dokulardan oluşur. Bu yüzden dokudan daha büyük bir yapıdır.' },
    // SAHNE 4 — Analoji
    { id: 'analogy', pad: 0.4, text: 'Bu sıralamayı yaşadığımız yerlere benzetebiliriz.', key: 'Analoji' },
    { id: 'places', pad: 0.8, min: 10, text: 'Evler mahalleyi, mahalleler ilçeyi, ilçeler ili, iller de ülkeyi oluşturur.' },
    { id: 'match', pad: 1.0, min: 8, text: 'Hücre eve, doku mahalleye, organ ilçeye, sistem ile, organizma da ülkeye benzer.' },
    // SAHNE 5 — Uyumlu bütün
    { id: 'harmony', pad: 0.8, text: 'Bir ülkede herkes görevini yaparsa ülke uyum içinde işler. Organizma da uyumlu bir bütündür.', key: 'Uyumlu bir bütün' },
    { id: 'run', pad: 1.0, min: 9, text: 'Koşan bir çocuğu düşün: kasları, kalbi ve akciğerleri aynı anda birlikte çalışır.' },
    { id: 'single', pad: 1.0, text: 'Bazı canlılar yalnızca bir hücreden oluşur. Onlarda tek hücre, organizmanın kendisidir.', key: 'Tek hücreli canlılar' },
    // SAHNE 6 — Kaydet, Sıra sende, sonraki
    { id: 'record', pad: 0.6, min: 8, text: 'Öğrendiklerimi defterime bir şema olarak kaydettim.', key: 'Kaydet' },
    { id: 'task', pad: 1.0, text: 'Sıra sende! Arkadaşlarınla bu beş rolü canlandırın. Her rol, bir sonrakine nasıl katılıyor?', key: 'Sıra sende' },
    { id: 'next', pad: 0.8, text: 'Sıradaki gözlemim: Bizi taşıyan ve hareket ettiren destek ve hareket sistemi!' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
