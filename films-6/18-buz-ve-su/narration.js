// narration.js — 6. sınıf Film 18: "Buz Neden Yüzer?"  (Maarif FB.6.5.5 · FB.6.5.6)
// Tek düzenlenebilir metin kaynağı. Sessiz film: text altyazı olarak görünür.
const NARRATION = {
  film: '18-buz-ve-su',
  title: 'Buz Neden Yüzer?',
  outcome: 'FB.6.5.5 · FB.6.5.6',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.8, min: 8.5, text: 'Brrr, kış geldi! Kışın su boruları neden patlar? Dondurucuda unutulan şişe neden çatlar?', key: 'Soru sor' },
    // SAHNE 2 — Suyun iki hâli
    { id: 'states', pad: 0.7, min: 10, text: 'Önce suyun iki hâline bakalım. Sıvı su akar, kabın şeklini alır. Buz katıdır, belirli bir şekli vardır.', key: 'Suyun iki hâli' },
    // SAHNE 3 — Veri topla
    { id: 'exp', pad: 0.6, min: 8.5, text: 'Deney: Plastik bardağa 100 g su koyup seviyesini işaretledim. Hacmi 100 cm³. Şimdi dondurucuya!', key: 'Veri topla' },
    { id: 'frozen', pad: 0.6, min: 9, text: 'Donunca buz, çizginin üstüne çıktı! Hacmi yaklaşık 109 cm³ oldu. Kütlesi ise hâlâ 100 g.' },
    { id: 'calc', pad: 0.8, min: 9, text: 'Buzun yoğunluğu: 100 ÷ 109 ≈ 0,92 g/cm³. Suyunki 1 g/cm³. Buz, sudan az yoğundur.', key: 'Buz ≈ 0,92 g/cm³' },
    { id: 'pipe', pad: 0.8, min: 9, text: 'Su donunca hacmi artar. Borular ve kapalı şişeler bu yüzden çatlar. Dondurucuya cam şişe koymayalım!', key: 'Donunca hacim artar' },
    // SAHNE 4 — Model öner, yenile
    { id: 'float', pad: 0.6, min: 8, text: 'Suya bir buz küpü bırakıyorum. Yüzüyor! Büyük kısmı suyun içinde, küçük bir kısmı dışarıda.' },
    { id: 'model1', pad: 0.6, min: 8.5, text: 'Eski modelimde katının tanecikleri daha sıkıydı. Buna göre buz batmalıydı. Kanıt modelimle çelişiyor!', key: 'Model öner' },
    { id: 'model2', pad: 0.9, min: 10, text: 'Modelimi yeniliyorum: Su donarken tanecikler düzenli ama daha boşluklu dizilir. Çoğu maddede böyle değildir; su özeldir.', key: 'Modeli yenile' },
    // SAHNE 5 — Göl ve canlılar
    { id: 'lake', pad: 0.8, min: 10, text: 'Göller de yüzeyden donar. Buz örtüsü alttaki suyu korur; derinlerde su donmaz ve canlılar yaşamaya devam eder.', key: 'Canlılar için önemi' },
    { id: 'whatif', pad: 0.9, min: 9, text: 'Buz batsaydı? Göller dipten donar, zamanla tamamen buz tutabilirdi. Birçok su canlısı yaşayamazdı.', key: 'Beyin fırtınası' },
    // SAHNE 6 — Tekne modeli
    { id: 'boatq', pad: 0.6, min: 7.5, text: 'Yeni soru: Madenî para batıyor. Peki metalden yapılmış dev gemiler nasıl yüzüyor?', key: 'Yoğunluk modeli' },
    { id: 'clay', pad: 0.6, min: 8.5, text: 'Model: 40 g oyun hamurundan top yaptım. Hacmi 20 cm³, yoğunluğu 2 g/cm³. Battı!' },
    { id: 'boat', pad: 0.6, min: 10, text: 'Aynı hamurdan tekne yaptım. İçindeki havayla birlikte 100 cm³ yer kaplıyor: 40 ÷ 100 = 0,4. Yüzüyor!' },
    { id: 'load', pad: 0.6, min: 10, text: '30 g yükle 70 ÷ 100 = 0,7: yüzüyor. 40 g daha ekleyince 110 ÷ 100 = 1,1: battı!' },
    { id: 'revise', pad: 0.9, min: 9, text: 'Tasarımımı geliştirdim: Hacmi büyük tekne daha çok yük taşır. Arkadaşlarımın modelleriyle de karşılaştırdım.', key: 'Tasarımı geliştir' },
    // SAHNE 7 — Taka ve Piri Reis
    { id: 'taka', pad: 1.0, min: 10, text: 'Karadeniz’in takaları fırtınaya dayanıklıdır. Denizcimiz Piri Reis ise 1513’te ünlü dünya haritasını çizdi.', key: 'Mavi Vatan' },
    // SAHNE 8 — Kaydet
    { id: 'record', pad: 0.6, min: 9.5, text: 'Bulduklarımı gözlem defterime kaydediyorum.', key: 'Kaydet' },
    // SAHNE 9 — Sıra sende · Sıradaki
    { id: 'task', pad: 1.0, min: 9.5, text: 'Sıra sende! Kolay bulunan malzemelerle yüzen bir taka tasarla. Kaç misket taşıdığını dene ve geliştir.', key: 'Sıra sende!' },
    { id: 'next', pad: 0.8, min: 5, text: 'Sıradaki gözlemim: Elektriği hangi maddeler iletir?' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
