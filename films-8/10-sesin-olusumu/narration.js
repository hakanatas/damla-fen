// narration.js — 8. sınıf Film 10: "Sesin Oluşumu ve Yayılması"  (Maarif FB.8.4.1 · FB.8.4.2)
const NARRATION = {
  film: '10-sesin-olusumu',
  title: 'Sesin Oluşumu ve Yayılması',
  outcome: 'FB.8.4.1 · FB.8.4.2',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Rüzgârda ağaç (köprü kurma)
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hook', pad: 0.8, min: 8, text: 'Rüzgâr esiyor ve ağaçtan bir hışırtı geliyor. Peki bir ağaç nasıl ses çıkarır?', key: 'Ses oluşumu' },
    // SAHNE 2 — Ses kaynakları ve titreşim (FB.8.4.1 a, b)
    { id: 'ruler', pad: 0.6, min: 7.5, text: 'Masanın kenarındaki cetvele vurdum. Cetvel hızla ileri geri gidip geliyor: titreşiyor!', key: 'Titreşim' },
    { id: 'drum', pad: 0.6, min: 7, text: 'Davulun derisine pirinç taneleri koydum. Vurunca taneler zıplıyor, çünkü deri titreşiyor.' },
    { id: 'string', pad: 0.6, text: 'Bağlamanın teli de titreşiyor. Flütte ise borunun içindeki hava titreşir.' },
    { id: 'stop', pad: 0.8, min: 6, text: 'Titreşen teli elimle tutup durdurunca ses de hemen kesiliyor!' },
    { id: 'infer', pad: 1.0, min: 9, text: 'Verilerime bakıyorum: Bütün kaynaklarda bir şey titreşiyor. Demek ki ses, titreşim sonucunda oluşur.', key: 'Ses titreşimle oluşur' },
    // SAHNE 3 — Dalgalar hâlinde yayılma (FB.8.4.1 c)
    { id: 'drops', pad: 0.6, min: 7, text: 'Suya damla damlatınca yüzeyde halkalar oluşup her yöne yayılıyor.', key: 'Dalga' },
    { id: 'invisible', pad: 0.6, text: 'Ses de dalgalar hâlinde her yöne yayılır. Ama ses dalgalarını gözümüzle göremeyiz.' },
    { id: 'particles', pad: 0.8, min: 8, text: 'Titreşen diyapazon, havanın taneciklerini iter ve çeker. Tanecikler bir sık, bir seyrek dizilir.', key: 'Ses dalgası' },
    { id: 'pass', pad: 1.0, min: 8, text: 'Her tanecik kendi yerinde ileri geri titreşir ve titreşimi komşusuna aktarır. Böylece ses kulağımıza ulaşır.' },
    // SAHNE 4 — Soru, Farabi, deney tasarımı (FB.8.4.2 a)
    { id: 'farabi', pad: 0.8, text: 'Farabi, bin yılı aşkın süre önce müzik üzerine yazdığı eserinde sesi de incelemişti.', key: 'Farabi' },
    { id: 'mediaq', pad: 0.8, min: 9.5, text: 'Peki ses her ortamda yayılır mı? Deney tasarlayalım: Yalnızca ortamı değiştireceğim, kaynak ve uzaklık aynı kalacak.', key: 'Deney tasarla' },
    // SAHNE 5 — Deney, veri ve yayılma hızı (FB.8.4.2 b)
    { id: 'setup', pad: 0.6, min: 7.5, text: 'Özdeş üç saat seçtim. Tahta masadan, su dolu balondan ve hava dolu balondan dinliyorum.' },
    { id: 'result', pad: 0.8, min: 7, text: 'Tik tak sesini üç ortamda da duydum. Ses katı, sıvı ve gazda yayılabiliyor.', key: 'Katı · sıvı · gaz' },
    { id: 'speed', pad: 0.8, min: 8.5, text: 'Ses genellikle katılarda en hızlı, gazlarda en yavaş yayılır. Sıvılar ikisinin arasındadır.', key: 'katı > sıvı > gaz' },
    { id: 'why', pad: 0.8, text: 'Katılarda tanecikler birbirine çok yakın ve sıkıca bağlıdır. Titreşimi komşularına hızla aktarırlar.' },
    { id: 'change', pad: 0.8, text: 'Ses kaynağının bulunduğu ortam değişirse duyduğumuz ses de değişir. Su altında sesler farklı duyulur.' },
    // SAHNE 6 — Boşluk (FB.8.4.2: maddesel ortam gerekliliği)
    { id: 'jar', pad: 0.6, min: 7, text: 'Şimdi çalan bir saati cam fanusa koydum. Pompayla içindeki havayı boşaltıyorum.' },
    { id: 'fade', pad: 0.8, min: 8, text: 'Çekiç hâlâ titreşiyor ama ses gitgide azalıyor. Hava neredeyse bitince ses duyulmuyor!' },
    { id: 'need', pad: 0.8, text: 'Demek ki sesin yayılması için maddesel ortam gerekir. Ses boşlukta yayılmaz.', key: 'Maddesel ortam' },
    { id: 'sun', pad: 1.0, min: 9, text: 'Güneş’teki dev patlamaları duyamayız. Uzayda madde yok denecek kadar azdır. Işık bize ulaşır, ses ulaşamaz.' },
    // SAHNE 7 — Kaydet, Sıra sende, sıradaki
    { id: 'record', pad: 0.6, min: 9, text: 'Bulduklarımı gözlem defterime kaydediyorum.', key: 'Kaydet' },
    { id: 'task', pad: 0.8, min: 9, text: 'Sıra sende! Okulunda ses kaynaklarını bul, neyin titreştiğini kaydet. Kendi ortam deneyini tasarla.' },
    { id: 'next', pad: 0.8, text: 'Sıradaki gözlemim: Bazı sesler neden ince, bazıları neden kalın duyulur?' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
