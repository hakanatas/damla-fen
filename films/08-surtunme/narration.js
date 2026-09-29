// narration.js — Film 8: "Sürtünme Kuvveti"  (Maarif FB.5.2.4)
// Tümevarım: örnekler (katı, sıvı, gaz) → örüntü → genelleme.
const NARRATION = {
  film: '08-surtunme',
  title: 'Sürtünme Kuvveti',
  outcome: 'FB.5.2.4 Sürtünme kuvvetinin çeşitli ortamlardaki etkilerine yönelik tümevarımsal akıl yürütebilme',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Soru
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.8, text: 'Merhaba! Bugünkü sorum: Hareketi zorlaştıran ya da kolaylaştıran etkiler var mı?' },
    { id: 'slide', pad: 1.0, min: 8, text: 'Kutuyu ittim; bir süre kaydı ve durdu. Onu ne durdurdu?', key: 'Soru' },
    // SAHNE 2 — Yüzeyler
    { id: 'rough', pad: 0.6, min: 9, text: 'Halıda kutu hemen duruyor, cilalı zeminde daha uzağa kayıyor. Yüzeylere büyüteçle bakayım.', key: 'Pürüzlü ve az pürüzlü' },
    { id: 'zoom', pad: 1.0, min: 9, text: 'Halının yüzeyi çok pürüzlü, cilalı zemin az pürüzlü. En düz yüzeyde bile küçük girinti ve çıkıntılar var.' },
    { id: 'def', pad: 1.2, min: 8, text: 'Temas eden yüzeyler arasında harekete karşı koyan bu kuvvete sürtünme kuvveti denir.', key: 'Sürtünme kuvveti' },
    // SAHNE 3 — Ortamlar
    { id: 'solid', pad: 0.8, min: 8, text: 'Katı yüzeylerden örnekler: Buzda kaymak kolaydır; kum dökülmüş yolda ise ayağımız kaymaz.', key: 'Katı ortam' },
    { id: 'water', pad: 0.8, min: 8, text: 'Havuzda yürümek karada yürümekten zordur. Su da harekete karşı koyar; buna su direnci denir.', key: 'Su direnci' },
    { id: 'fish', pad: 1.0, min: 7, text: 'Balıkların ve teknelerin sivri burunlu biçimi, su direncini azaltır.' },
    { id: 'air', pad: 0.8, min: 8, text: 'Bisiklet sürerken rüzgârı yüzümde hissederim. Hava da harekete karşı koyar; buna hava direnci denir.', key: 'Hava direnci' },
    { id: 'chute', pad: 1.0, min: 7, text: 'Paraşüt, geniş yüzeyiyle hava direncini artırır; bu yüzden yavaşça iner.' },
    // SAHNE 4 — Örüntü ve genelleme
    { id: 'pattern', pad: 0.8, min: 10, text: 'Örneklerimi yan yana koydum. Bir örüntü var: Her örnekte ortam, harekete karşı koyuyor.', key: 'Örüntü' },
    { id: 'general', pad: 0.8, min: 8, text: 'Genelleme: Sürtünme katı, sıvı ve gaz ortamlarda vardır ve harekete zıt yönde etki eder.', key: 'Genelleme' },
    { id: 'general2', pad: 1.2, text: 'Yüzey ne kadar pürüzlüyse sürtünme o kadar fazladır. Su ve hava direnci de birer sürtünmedir.' },
    // SAHNE 5 — Etkiler, sanat
    { id: 'plus', pad: 0.8, min: 8, text: 'Sürtünme olmasaydı yürüyemez, bisikletle fren yapamaz, kalemle yazı yazamazdık.', key: 'Olumlu etkiler' },
    { id: 'minus', pad: 1.0, min: 8, text: 'Ama sürtünme ayakkabı tabanını ve makine parçalarını aşındırır, ısıtır. Yağlama onu azaltır.', key: 'Olumsuz etkiler' },
    { id: 'art', pad: 1.0, min: 8, text: 'Resimde de sürtünme işe yarar: Pürüzlü resim kâğıdı, kara kalemin ve pastelin tozunu tutar.', key: 'Sanatta sürtünme' },
    // SAHNE 6 — Tarih
    { id: 'ships', pad: 0.8, min: 10, text: '1453’te Fatih Sultan Mehmed, gemileri yağlanmış kalaslar ve yuvarlak kütükler üzerinde karadan Haliç’e indirdi.', key: '1453 · Gemiler karadan' },
    { id: 'ships2', pad: 1.2, text: 'Yağ ve yuvarlak kütükler sürtünmeyi azalttı; ağır gemiler çok daha kolay kaydı.' },
    // SAHNE 7 — Sıra sende
    { id: 'task', pad: 1.0, min: 9, text: 'Sıra sende! Evinde sürtünmeyi artıran ve azaltan üçer örnek bul, balık kılçığı şemasına yerleştir.' },
    { id: 'next', pad: 1.0, text: 'Sıradaki gözlemim: Canlıların yapısına yolculuk! İlk durak: hücre.' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
