// narration.js — 7. sınıf Film 22: "Besin Zinciri"  (Maarif FB.7.7.1)
const NARRATION = {
  film: '22-besin-zinciri',
  title: 'Besin Zinciri',
  outcome: 'FB.7.7.1',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Çayır
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'meadow', pad: 0.6, min: 7, text: 'Çayırda bir çekirge ot yiyor. Az ötede bir kurbağa onu izliyor!' },
    { id: 'question', pad: 0.8, text: 'Kim kimi yiyor? Bu canlıların enerjisi nereden geliyor?', key: 'Soru sor' },
    // SAHNE 2 — Gruplama
    { id: 'group', pad: 0.6, min: 8, text: 'Önce canlıları beslenme şekillerine göre gruplayalım. Ot, çekirge, kurbağa, yılan, şahin, mantar...', key: 'Grupla' },
    { id: 'producer', pad: 0.6, text: 'Bitkiler, Güneş ışığını kullanarak kendi besinini üretir. Onlar üreticidir.', key: 'Üretici' },
    { id: 'consumer', pad: 0.6, text: 'Besinini üretemeyen, başka canlıları yiyen canlılar tüketicidir.', key: 'Tüketici' },
    { id: 'decomposer', pad: 0.8, text: 'Bakteri ve mantarlar ise ölü canlıları ve atıkları ayrıştırır. Onlar ayrıştırıcıdır.', key: 'Ayrıştırıcı' },
    // SAHNE 3 — Besin zinciri
    { id: 'chain', pad: 0.6, min: 9, text: 'Şimdi zinciri kuralım: ot, çekirge, kurbağa, yılan ve şahin.', key: 'Besin zinciri' },
    { id: 'arrows', pad: 0.6, text: 'Oklar yenilen canlıdan yiyen canlıya doğru çizilir. Çünkü ok, enerjinin aktığı yönü gösterir.', key: 'Enerji akışı' },
    { id: 'sun', pad: 0.8, text: 'Bu zincirin başında Güneş enerjisini besine dönüştüren bir üretici vardır.' },
    // SAHNE 4 — Nedensel ilişki
    { id: 'cause', pad: 0.6, text: 'Peki kurbağalar yok olursa ne olur? Neden-sonuç ilişkisini düşünelim.', key: 'Neden-sonuç' },
    { id: 'effect', pad: 0.8, min: 9, text: 'Çekirgeler çoğalır, otlar azalır. Yılanlar ise yeterince besin bulamaz. Bir halka, bütün zinciri etkiler.' },
    // SAHNE 5 — Ayrıştırıcılar
    { id: 'recycle', pad: 0.8, min: 9, text: 'Ölen canlıları mantar ve bakteriler ayrıştırır. Maddeler toprağa döner, bitkiler onları yeniden kullanır.', key: 'Ayrıştırıcılar' },
    // SAHNE 6 — Besin ağı
    { id: 'web', pad: 0.8, min: 9, text: 'Doğada bir canlı birden çok canlıyla beslenebilir. Zincirler birbirine bağlanınca besin ağı oluşur.', key: 'Besin ağı' },
    // SAHNE 7 — Ekoloji piramidi
    { id: 'pyramid', pad: 0.6, text: 'Bu ilişkileri bir piramitle de gösterebiliriz: ekoloji piramidi. Tabanda üreticiler vardır.', key: 'Ekoloji piramidi' },
    { id: 'energy', pad: 0.6, min: 8.5, text: 'Her basamağa enerjinin yalnızca küçük bir kısmı geçer, ortalama yaklaşık onda biri.', key: 'Enerji aktarımı' },
    { id: 'heat', pad: 0.8, text: 'Enerjinin çoğu yaşamsal faaliyetlerde kullanılır ve ısı olarak ortama verilir. Bu yüzden tepeye az enerji ulaşır.' },
    // SAHNE 8 — Biyolojik birikim
    { id: 'accum', pad: 0.6, min: 8, text: 'Suya karışan bazı zararlı maddeler canlının vücudundan kolayca atılamaz.', key: 'Biyolojik birikim' },
    { id: 'accum2', pad: 0.8, min: 9, text: 'Zincirde yukarı çıktıkça bu maddenin vücuttaki miktarı artar. Buna biyolojik birikim denir.' },
    // SAHNE 9 — Uyumlu bütün
    { id: 'whole', pad: 0.6, text: 'Tüm canlılar uyumlu bir bütündür. Her canlı bu sistem için çok değerlidir.', key: 'Uyumlu bütün' },
    { id: 'protect', pad: 0.8, text: 'Doğanın dengesi için canlıların nesli devam etmeli. Onları korumak hepimizin görevi.' },
    // SAHNE 10 — Kaydet · Sıra sende · Sıradaki
    { id: 'record', pad: 0.6, min: 8.5, text: 'Bulduklarımı gözlem defterime kaydediyorum.', key: 'Kaydet' },
    { id: 'task', pad: 0.8, text: 'Sıra sende! Grubunla canlı görselleri topla, bir besin zinciri ve ekoloji piramidi kurup sun.', key: 'Sıra sende' },
    { id: 'next', pad: 1.0, text: 'Sıradaki gözlemim: Kaynakların tasarruflu kullanımı. Her damla değerli!' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
