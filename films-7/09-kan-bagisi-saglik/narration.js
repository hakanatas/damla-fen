// narration.js — 7. sınıf Film 9: "Bir Damla Kan, Bir Hayat: Kan Bağışı ve Dolaşım Sağlığı" (FB.7.3.4 · FB.7.3.5)
const NARRATION = {
  film: '09-kan-bagisi-saglik',
  title: 'Kan Bağışı ve Dolaşım Sağlığı',
  outcome: 'FB.7.3.4 · FB.7.3.5',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // S1 — Merak: kana ihtiyaç
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'need', pad: 0.6, min: 7, text: 'Merhaba, ben Damla! Kazalarda ve ameliyatlarda hastaların kana ihtiyacı olur. Bu kan nereden gelir?', key: 'Soru sor' },
    { id: 'nofab', pad: 0.8, text: 'Kan fabrikada üretilemez. Hastalar, gönüllülerin bağışladığı kanla iyileşir.', key: 'Kan bağışı' },
    // S2 — Altı şapka
    { id: 'hats', pad: 0.4, min: 6, text: 'Konuyu altı şapka tekniğiyle tartışalım. Her şapka farklı bir bakış açısıdır.', key: 'Altı şapka düşünme' },
    { id: 'white', pad: 0.4, text: 'Beyaz şapka, bilgi: Bağışlanan kan bölümlerine ayrılır; bir bağış birden fazla hastaya yardım edebilir.' },
    { id: 'red', pad: 0.4, text: 'Kırmızı şapka, duygu: Yardım etmek güzel hissettirir. İğneden çekinmek de doğaldır.' },
    { id: 'black', pad: 0.4, text: 'Siyah şapka, dikkat: Bağış yalnızca resmî kurumlarda, sağlık kontrolünden sonra yapılır.' },
    { id: 'yellow', pad: 0.4, text: 'Sarı şapka, yarar: Bugünkü bir bağış, yarın birinin hayatını kurtarabilir.' },
    { id: 'green', pad: 0.4, text: 'Yeşil şapka, yeni fikir: Okulda kan bağışı için farkındalık afişi hazırlayabiliriz.' },
    { id: 'blue', pad: 0.8, text: 'Mavi şapka, özet: Kan bağışı, toplumsal dayanışmanın güçlü bir örneğidir.' },
    // S3 — Mantıksal çelişki → geçerli fikir
    { id: 'contra', pad: 0.5, min: 7.5, text: 'Bir arkadaşım dedi ki: “Kan bağışı çok önemli ama nasılsa başkaları verir.”', key: 'Çelişkiyi bul' },
    { id: 'contra2', pad: 0.6, text: 'Çelişkiyi gördün mü? Herkes böyle düşünürse kimse bağış yapmaz!' },
    { id: 'valid', pad: 0.9, text: 'Geçerli fikir: Her gönüllü bağışçı fark yaratır. Dayanışma, herkesin katkısıyla güçlenir.', key: 'Geçerli fikir' },
    // S4 — Kurumlar, organ bağışı, yapılacaklar
    { id: 'kizilay', pad: 0.5, min: 7, text: 'Ülkemizde kan bağışını resmî kurumlar yürütür. Bunların başında Türk Kızılay gelir.', key: 'Türk Kızılay' },
    { id: 'apply', pad: 0.5, text: 'Kızılay’ın kan bağış merkezlerine ya da gezici kan bağış araçlarına gidilir.' },
    { id: 'donor', pad: 0.5, text: 'Bağışı yetişkinler yapar. Yaş, kilo ve sağlık durumu bağıştan önce kontrol edilir.', key: 'Bağışçı koşulları' },
    { id: 'organ', pad: 0.5, text: 'Organ bağışı da hayat kurtarır. Bunun için hastanelere ya da il sağlık müdürlüklerine başvurulur.', key: 'Organ bağışı' },
    { id: 'todo', pad: 0.9, min: 8, text: 'Yapılacaklar: öğren, ailene anlat, duyur ve ileride gönüllü bağışçı ol!', key: 'Yapılacaklar' },
    // S5 — Dolaşım sağlığı: örnek olay, araçlar, doğrulama
    { id: 'case', pad: 0.5, min: 8, text: 'Şimdi dolaşım sağlığına bakalım. Örnek olay: Ece gece geç saate kadar ekran başında, hiç spor yapmıyor.', key: 'Örnek olay' },
    { id: 'tools', pad: 0.5, min: 8, text: 'Araçlarım: Sağlık Bakanlığı gibi resmî siteler, basılı kaynaklar ve bir doktorla görüşme.', key: 'Bilgi toplama araçları' },
    { id: 'verify', pad: 0.8, text: 'Bilgileri kaynakları karşılaştırarak ve öğretmenime danışarak doğruluyorum, sonra kaydediyorum.', key: 'Doğrula' },
    // S6 — Doğru davranışlar
    { id: 'habits', pad: 0.5, min: 9, text: 'Bulgularım: düzenli uyku, dengeli beslenme, az tuz ve yağ, düzenli spor ve sosyal etkinlik.', key: 'Dolaşım sağlığı' },
    { id: 'screen', pad: 0.9, min: 7, text: 'Teknoloji bağımlılığı uykuyu azaltır ve hareketsizliğe yol açar. Ekran süremi sınırlarım.', key: 'Ekran süresi' },
    // S7 — Sıra sende · Sıradaki · Bitiş
    { id: 'task', pad: 0.8, min: 8.5, text: 'Sıra sende! Dolaşım sisteminin sağlığı ya da kan bağışı için bir afiş tasarla ve sınıfta sun.', key: 'Sıra sende' },
    { id: 'next', pad: 1.0, min: 5.5, text: 'Sıradaki gözlemim: soluk alıp vermemizi sağlayan solunum sistemi.' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
