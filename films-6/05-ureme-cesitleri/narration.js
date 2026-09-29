// narration.js — 6. sınıf Film 5: "Canlılar Nasıl Çoğalır? Eşeyli ve Eşeysiz Üreme"  (Maarif FB.6.3.1)
const NARRATION = {
  film: '05-ureme-cesitleri',
  title: 'Canlılar Nasıl Çoğalır?',
  outcome: 'FB.6.3.1 Eşeyli ve eşeysiz üremeyi karşılaştırabilme',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Bahçe: merak
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.6, text: 'Merhaba! Bugün bahçede iki ilginç şey gözledim.' },
    { id: 'obs', pad: 0.8, min: 10, text: 'Tavuğun yumurtasından civciv çıktı. Çilek bitkisi ise yere uzattığı bir koldan yeni bir fide verdi!' },
    { id: 'q', pad: 0.8, text: 'Bütün canlılar aynı yolla mı çoğalır? Hadi bir beyin fırtınası yapalım!', key: 'Soru sor' },
    // SAHNE 2 — Üreme + beyin fırtınası
    { id: 'def', pad: 0.8, text: 'Canlıların kendilerine benzer yeni canlılar oluşturmasına üreme denir. Üreme, neslin devamını sağlar.', key: 'Üreme' },
    { id: 'storm', pad: 1.0, min: 10, text: 'Aklıma gelenler: iki ata, tek ata, eşey hücresi, tomurcuk, kopan parça... Bunları iki gruba ayırabilirim!', key: 'Beyin fırtınası' },
    // SAHNE 3 — Eşeyli üreme
    { id: 'sex1', pad: 0.8, min: 10, text: 'Birinci grup eşeyli üreme. Dişi ve erkek eşey hücreleri birleşir; bunlar genellikle iki farklı atadan gelir.', key: 'Eşeyli üreme' },
    { id: 'sex2', pad: 1.0, text: 'Yavrular atalarına benzer ama onların aynısı değildir. Böylece aynı türde çeşitlilik ortaya çıkar.', key: 'Çeşitlilik' },
    // SAHNE 4 — Eşeysiz üreme
    { id: 'asex1', pad: 0.8, text: 'İkinci grup eşeysiz üreme. Tek bir ata yeterlidir; eşey hücreleri birleşmez.', key: 'Eşeysiz üreme' },
    { id: 'asex2', pad: 0.8, min: 9, text: 'Oluşan yavrular, atanın kalıtsal özelliklerini aynen taşır. Eşeysiz üremenin dört çeşidini inceleyelim.' },
    // SAHNE 5–8 — Dört çeşit
    { id: 'div', pad: 1.0, min: 10, text: 'Bölünme: Tek hücreli bir canlı ikiye bölünür. Amip ve bakteriler böyle çoğalır.', key: 'Bölünmeyle üreme' },
    { id: 'bud', pad: 1.0, min: 11, text: 'Tomurcuklanma: Canlının üzerinde bir tomurcuk oluşur, büyür ve ayrılır. Hidra ve bira mayası buna örnektir.', key: 'Tomurcuklanmayla üreme' },
    { id: 'regen', pad: 1.0, min: 11, text: 'Rejenerasyon: Kopan bir parçanın eksikleri tamamlanır ve yeni bir canlı oluşur. Deniz yıldızı ve planarya örnektir.', key: 'Rejenerasyonla üreme' },
    { id: 'lizard', pad: 1.2, min: 9, text: 'Dikkat! Kertenkele kopan kuyruğunu yeniler, ama kuyruktan yeni kertenkele oluşmaz. Bu üreme değildir.' },
    { id: 'veg', pad: 1.2, min: 11, text: 'Vejetatif üreme: Bitkinin kök, gövde ya da yaprak parçasından yeni bitki gelişir. Patates, çilek ve sardunya örnektir.', key: 'Vejetatif üreme' },
    // SAHNE 9 — Karşılaştır
    { id: 'cmp', pad: 0.6, min: 8.5, text: 'Şimdi karşılaştıralım. Önce benzerlikleri listeleyeyim.', key: 'Benzerlikler' },
    { id: 'diff', pad: 0.8, min: 12, text: 'Sonra farklılıkları: ata sayısı, eşey hücreleri, yavruların benzerliği, çeşitlilik ve hız.', key: 'Farklılıklar' },
    { id: 'adv', pad: 1.2, text: 'Eşeysiz üreme hızlıdır. Eşeyli üremedeki çeşitlilik ise değişen koşullarda canlılara avantaj sağlayabilir.' },
    // SAHNE 10 — Kaydet
    { id: 'record', pad: 0.8, min: 10.5, text: 'Bulduklarımı gözlem defterime bir kavram ağı olarak kaydediyorum.', key: 'Kavram ağı' },
    // SAHNE 11 — Sıra sende + Sıradaki
    { id: 'task', pad: 0.8, min: 9, text: 'Sıra sende! Arkadaşlarınla vızıltı grubu kurun. Çevrenizde eşeysiz üreyen canlıları araştırıp listeleyin.' },
    { id: 'respect', pad: 1.0, text: 'Tartışırken herkesin fikrini nezaketle dinleyin. Her fikir değerlidir!' },
    { id: 'next', pad: 1.2, text: 'Sıradaki gözlemim: bitkilerde üreme, büyüme ve gelişme.' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
