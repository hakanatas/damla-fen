// narration.js — 6. sınıf Film 6: "Çiçekten Tohuma, Tohumdan Fideye"  (Maarif FB.6.3.2 · FB.6.3.3)
const NARRATION = {
  film: '06-bitkilerde-ureme',
  title: 'Çiçekten Tohuma, Tohumdan Fideye',
  outcome: 'FB.6.3.2 Bitkilerde üreme, büyüme ve gelişme hakkında bilimsel çıkarım yapabilme · FB.6.3.3 Tohumun çimlenmesine etki eden faktörlere ilişkin hipotez oluşturabilme',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.6, text: 'Merhaba! Bir çiçek nasıl olur da meyveye ve tohuma dönüşür?' },
    // SAHNE 2 — Sınıflandırma
    { id: 'classify', pad: 0.8, min: 9, text: 'Bitkileri çiçekli ve çiçeksiz diye ayırabiliriz. Eğrelti otu ve kara yosunu çiçeksiz bitkilere örnektir.', key: 'Çiçekli · çiçeksiz' },
    // SAHNE 3 — Temel kısımlar ve çiçek
    { id: 'parts', pad: 0.6, min: 8, text: 'Çiçekli bir bitkinin temel kısımları kök, gövde, yaprak ve çiçektir.', key: 'Temel kısımlar' },
    { id: 'flower', pad: 0.6, text: 'Çanak yapraklar tomurcuğu korur, taç yapraklar böcekleri çeker. Erkek organın başçığında polenler oluşur.', key: 'Çiçeğin kısımları' },
    { id: 'female', pad: 0.8, text: 'Dişi organ; tepecik, dişicik borusu ve yumurtalıktan oluşur. Yumurtalıkta tohum taslakları bulunur.', key: 'Dişi organ' },
    // SAHNE 4 — Tozlaşma, meyve, tohum
    { id: 'pollin', pad: 0.8, min: 10, text: 'Polenlerin tepeciğe taşınmasına tozlaşma denir. Rüzgâr, su ya da arı gibi hayvanlar polen taşır.', key: 'Tozlaşma' },
    { id: 'fruit', pad: 0.6, min: 9, text: 'Sonra döllenme olur. Yumurtalık meyveye, tohum taslakları da tohuma dönüşür.', key: 'Meyve ve tohum' },
    // SAHNE 5 — Yaşam döngüsü
    { id: 'cycle', pad: 0.6, min: 11, text: 'Tohum çimlenir, fide olur, büyür, çiçek açar ve yeniden tohum verir. Bu, bitkinin yaşam döngüsüdür.', key: 'Yaşam döngüsü' },
    // SAHNE 6 — Büyüme faktörleri ve veri
    { id: 'factors', pad: 0.6, min: 8, text: 'Büyüme ve gelişme için su, ışık, uygun sıcaklık, hava ve topraktaki mineraller gerekir.', key: 'Büyüme faktörleri' },
    { id: 'data', pad: 0.8, min: 10, text: 'Bir hafta boyunca iki fasulye fidesinin boyunu ölçtüm: biri ışıkta, biri karanlıkta.', key: 'Veri topla, kaydet' },
    { id: 'interp', pad: 0.8, text: 'Şaşırtıcı! Karanlıktaki fide daha uzun, ama soluk ve cılız. Işıktaki fide yeşil ve sağlıklı.', key: 'Veriyi yorumla' },
    { id: 'human', pad: 1.0, text: 'Çiçek koparmak, ağaç kesmek, kirlilik bitkilere zarar verir. Doğaya duyarlı olalım!', key: 'Çevreye duyarlılık' },
    // SAHNE 7 — Çimlenme: hipotez ve değişkenler
    { id: 'hypo', pad: 0.8, min: 9, text: 'Tohumun çimlenmesi için ne gerekir? Hipotezlerim: Su gerekir. Işık da gerekir.', key: 'Hipotez' },
    { id: 'setup', pad: 0.8, min: 10, text: 'Üç kap hazırladım. A: ıslak pamuk, ışıkta. B: kuru pamuk, ışıkta. C: ıslak pamuk, karanlıkta.', key: 'Deney düzeneği' },
    { id: 'vars', pad: 0.6, min: 9, text: 'Değiştirdiğim su ve ışık, bağımsız değişkendir. Gözlediğim çimlenme ise bağımlı değişkendir.', key: 'Bağımsız · bağımlı' },
    { id: 'ctrl', pad: 0.8, text: 'Tohum cinsi ve sayısı, pamuk miktarı ve sıcaklık hep aynı. Bunlar kontrol edilen değişkenlerdir.', key: 'Kontrol edilen değişken' },
    // SAHNE 8 — Gözlem, sonuç, önerme
    { id: 'observe', pad: 0.4, min: 8.5, text: 'Her gün aynı saatte gözledim, çizdim ve kaydettim.', key: 'Gözle, kaydet' },
    { id: 'result', pad: 0.6, text: 'A ve C çimlendi, kuru B çimlenmedi.' },
    { id: 'conclude', pad: 1.0, text: 'Su hipotezim doğrulandı. Işık hipotezim ise çürütüldü: fasulye tohumu karanlıkta da çimlenir!', key: 'Sonuç' },
    { id: 'oxygen', pad: 0.8, text: 'Oksijen de gerekir; bunu sınıfta deneyemediğimiz için öğretmenimiz açıkladı.' },
    { id: 'prop', pad: 0.8, min: 9, text: 'Önermem: Fasulye tohumu su, uygun sıcaklık ve oksijen olunca çimlenir; ışık gerekmez.', key: 'Önerme' },
    // SAHNE 9 — Sıra sende + Sıradaki
    { id: 'task', pad: 0.8, min: 9, text: 'Sıra sende! Grubunla bir düzenek kur. Yalnızca sıcaklığı değiştir, gerisini aynı tut ve her gün kaydet.' },
    { id: 'next', pad: 1.2, text: 'Sıradaki gözlemim: hayvanlarda üreme, büyüme ve gelişme.' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
