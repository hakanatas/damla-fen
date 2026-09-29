// narration.js — 8. sınıf Film 15: "Hayatın İçindeki Tepkimeler"  (Maarif FB.8.5.4)
// Tek düzenlenebilir metin kaynağı. Sessiz film: text altyazı olarak görünür.
const NARRATION = {
  film: '15-tepkimeler-yasam',
  title: 'Hayatın İçindeki Tepkimeler',
  outcome: 'FB.8.5.4',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.4, text: 'Merhaba! Kimyasal tepkimeler yalnızca laboratuvarda mı olur?' },
    { id: 'q', pad: 0.8, text: 'Bir araştırma sorum var: Kimyasal tepkimeler günlük yaşamımızı nasıl etkiler?', key: 'Araştırma sorusu' },
    // SAHNE 2 — Araçları belirle
    { id: 'tools', pad: 0.4, text: 'Önce bilgiye ulaşmak için hangi araçları kullanacağımı belirleyeyim.', key: 'Araçları belirle' },
    { id: 'toollist', pad: 0.8, min: 9, text: 'Okul kütüphanesindeki kitaplar, bilgisayar laboratuvarında güvenilir dijital içerikler, görsel kaynaklar ve kendi gözlemlerim.' },
    // SAHNE 3 — Bilgi topla
    { id: 'collect', pad: 0.4, text: 'Araştırdıkça buldum: Kimyasal tepkimeler her yerde!', key: 'Bilgiye ulaş' },
    { id: 'body', pad: 0.4, min: 6.5, text: 'Vücudumuzda sindirimle besinler parçalanır. Hücrelerimiz besinlerden enerji üretir.' },
    { id: 'plant', pad: 0.4, min: 6, text: 'Bitkiler fotosentezle ışık enerjisini kullanarak besin ve oksijen üretir.' },
    { id: 'kitchen', pad: 0.4, min: 6.5, text: 'Mutfakta yemek pişer, hamur mayalanır. Temizlik maddeleri de lekeleri tepkimelerle giderir.' },
    { id: 'outside', pad: 0.8, min: 7, text: 'Dışarıda demir paslanır, meyveler çürür, odun yanar. Yanmadan çıkan gazlar havayı kirletebilir.' },
    // SAHNE 4 — Doğrula
    { id: 'verify', pad: 0.4, text: 'Ama bulduğum her bilgi doğru mu? Bir sitede şunu okudum: “Demir yalnızca suda paslanır.”', key: 'Doğrula' },
    { id: 'check', pad: 0.4, min: 6, text: 'Ders kitabına baktım, öğretmenime ve arkadaşlarıma danıştım.' },
    { id: 'fact', pad: 0.8, min: 7, text: 'Doğrusu: Demir, su ve oksijen birlikte olunca paslanır. Kuru havada çok yavaş paslanır.' },
    // SAHNE 5 — Tartış: olumlu / olumsuz
    { id: 'argue', pad: 0.4, text: 'Sınıfta tartıştık: Çürüme iyi mi, kötü mü?', key: 'Tartış' },
    { id: 'bad', pad: 0.4, text: 'Besinlerin ve dişlerin çürümesi olumsuz bir etkidir.' },
    { id: 'good', pad: 0.4, min: 6.5, text: 'Ama yaprak gibi canlı atıklar çürüyüp toprağa karışır ve toprağı besler. Bu olumlu!', key: 'Olumlu · Olumsuz' },
    { id: 'fire', pad: 0.8, text: 'Yanma da öyle: Isınır, yemek pişiririz; ama kontrolsüz yangınlar ve duman zarar verir.' },
    // SAHNE 6 — Kaydet: balık kılçığı
    { id: 'fish', pad: 0.4, min: 12, text: 'Bulduklarımı balık kılçığı şemasına kaydediyorum: üstte olumlu, altta olumsuz etkiler.', key: 'Kaydet' },
    { id: 'fish2', pad: 0.8, text: 'Aynı tepkimenin hem olumlu hem olumsuz etkisi olabilir.' },
    // SAHNE 7 — Güvenlik · Sıra sende · Sıradaki
    { id: 'safe', pad: 0.8, min: 7, text: 'Önemli uyarı: Temizlik maddeleri asla birbirine karıştırılmaz. Zehirli gazlar oluşabilir!', key: 'Güvenlik' },
    { id: 'task', pad: 0.6, min: 7.5, text: 'Sıra sende! Evindeki kimyasal tepkimeleri araştır, bilgilerini doğrula ve bir afiş hazırla.' },
    { id: 'next', pad: 0.8, text: 'Sıradaki gözlemim: Temizlik maddelerinin çoğu asit ya da bazdır. Asitler ve bazlar!' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
