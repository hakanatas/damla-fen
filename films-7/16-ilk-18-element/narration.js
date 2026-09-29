// narration.js — 7. sınıf Film 16: "İlk 18 Element ve Periyodik Tablo"  (Maarif FB.7.5.5 · FB.7.5.6)
// Tek düzenlenebilir metin kaynağı. Sessiz film: text altyazı olarak görünür.
const NARRATION = {
  film: '16-ilk-18-element',
  title: 'İlk 18 Element ve Periyodik Tablo',
  outcome: 'FB.7.5.5 · FB.7.5.6',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Ortak dil
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.4, text: 'Merhaba! Bilim insanları elementlere kendi dillerinde ad verseydi ne olurdu?', key: 'Ortak dil' },
    { id: 'lang', pad: 0.4, min: 6.5, text: 'Oksijen, oxygen, Sauerstoff... Aynı element, farklı adlar! Ortak bir dil gerekiyor.' },
    { id: 'symbol', pad: 0.4, text: 'Çözüm: Her elementin uluslararası bir sembolü var. Oksijenin sembolü her dilde O’dur.', key: 'Sembol' },
    // SAHNE 2 — Sembol yazım kuralı
    { id: 'rule1', pad: 0.4, text: 'Tek harfli semboller büyük harfle yazılır: H, C, N, O.', key: 'Tek harf: büyük' },
    { id: 'rule2', pad: 0.4, min: 7.5, text: 'İki harfliyse ilki büyük, ikincisi küçük: He, Na, Cl. NA ya da na yazmak yanlış!', key: 'İlki büyük, ikincisi küçük' },
    { id: 'latin', pad: 0.4, text: 'Bazı semboller Latince addan gelir: Sodyumun sembolü Na, “natrium” adından.' },
    // SAHNE 3 — İlk 18 element
    { id: 'order', pad: 0.4, text: 'İlk 18 elementi, kimliklerini belirleyen proton sayısına göre dizelim.', key: 'Proton sayısı sırası' },
    { id: 'list1', pad: 0.4, min: 9, text: 'Hidrojen, helyum, lityum, berilyum, bor, karbon, azot, oksijen, flor, neon...' },
    { id: 'list2', pad: 0.4, min: 8.5, text: 'Sodyum, magnezyum, alüminyum, silisyum, fosfor, kükürt, klor ve argon.' },
    { id: 'extra', pad: 0.4, min: 8, text: 'Şunları da öğrenelim: altın, gümüş, bakır, çinko, kurşun, cıva, platin, demir ve iyot.', key: 'Diğer elementler' },
    // SAHNE 4 — Periyodik tablo: grup ve periyot
    { id: 'shelf', pad: 0.4, text: 'Kitapları rafa bir düzenle dizeriz. Elementler de periyodik tabloda bir düzenle yerleşir.', key: 'Periyodik tablo' },
    { id: 'history', pad: 0.4, text: 'Tablo önce artan atom kütlesine göre dizildi. Bugün artan proton sayısına göre dizilir.' },
    { id: 'rows', pad: 0.4, min: 6, text: 'Yatay satırlara periyot, dikey sütunlara grup denir.', key: 'Periyot · Grup' },
    { id: 'counts', pad: 0.4, min: 6.5, text: 'Tabloda 7 periyot, 8 tane A grubu ve 10 tane B grubu vardır.', key: '7 periyot · 8 A · 10 B' },
    // SAHNE 5 — Elektron dizilimi, periyot ve grup
    { id: 'shells', pad: 0.4, text: 'İlk 18 elementte ilk katmana en fazla 2, sonraki katmanlara en fazla 8 elektron yerleşir.', key: 'Elektron dizilimi' },
    { id: 'neutral', pad: 0.4, min: 7, text: 'Nötr atomda elektron sayısı proton sayısına eşittir. Sodyum: 11 elektron → 2, 8, 1.' },
    { id: 'period', pad: 0.4, text: 'Katman sayısı periyodu gösterir: Sodyumun 3 katmanı var, 3. periyottadır.', key: 'Katman sayısı → periyot' },
    { id: 'group', pad: 0.4, text: 'Son katmandaki elektron sayısı A grubunu gösterir: Sodyum 1A grubundadır.', key: 'Son katman → grup' },
    { id: 'helium', pad: 0.4, text: 'Helyum istisnadır: 2 elektronu var ama 8A grubundadır.', key: 'Helyum istisnası' },
    { id: 'stable', pad: 0.4, min: 7.5, text: 'Son katmanı dolu atomlar kararlıdır. Helyum 2 elektronla dubleti, neon ve argon 8 elektronla okteti tamamlar.', key: 'Dublet · Oktet' },
    { id: 'ion', pad: 0.4, min: 8, text: 'Son katmanında 1, 2, 3 elektron olanlar genellikle elektron verir; 5, 6, 7 olanlar genellikle alır.', key: 'Elektron alma-verme' },
    { id: 'ion2', pad: 0.4, text: 'Elektron veren atom artı, alan atom eksi yüklü olur. Bu taneciklere iyon denir.', key: 'İyon' },
    // SAHNE 6 — Karşılaştırma
    { id: 'same', pad: 0.4, min: 7, text: 'Karşılaştıralım: Aynı gruptakilerin son katman elektron sayısı aynı, katman sayısı farklı.', key: 'Grup: benzer / farklı' },
    { id: 'diffp', pad: 0.4, min: 7, text: 'Aynı periyottakilerin katman sayısı aynı, son katman elektron sayısı farklı.', key: 'Periyot: benzer / farklı' },
    // SAHNE 7 — Kaydet
    { id: 'record', pad: 0.4, min: 9.5, text: 'Bulduklarımı gözlem defterime kaydedeyim.', key: 'Kaydet' },
    // SAHNE 8 — Sıra sende · Sıradaki · Bitiş
    { id: 'task', pad: 0.4, min: 8, text: 'Sıra sende! Element adları ve sembolleriyle bir kart eşleştirme oyunu hazırla.', key: 'Sıra sende' },
    { id: 'next', pad: 0.4, text: 'Sıradaki gözlem: Bileşikler nasıl gösterilir? Bileşik formülleri!' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
