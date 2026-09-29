// narration.js — Film 25: "Atıklarımızı Tanıyalım"  (Maarif FB.5.7.1)
// Tek düzenlenebilir metin kaynağı. Her "beat" bir anlatım cümlesidir (sessiz sürüm: altyazı).
const NARRATION = {
  film: '25-geri-donusum',
  title: 'Atıklarımızı Tanıyalım',
  outcome: 'FB.5.7.1 Evsel atıklarda geri dönüştürülebilen ve dönüştürülemeyen maddeleri sınıflandırabilme',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Mutfak: merak
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.6, text: 'Merhaba! Yemekten sonra mutfağı topluyoruz. Çöp kovası yine doldu.' },
    { id: 'bag', pad: 0.6, text: 'Bu torbadakilerin hepsi gerçekten çöp mü? Hadi bakalım!', key: 'Soru sor' },
    // SAHNE 2 — Güvenlik + döküm
    { id: 'stop', pad: 0.6, text: 'Dur! Arada kırık cam ya da pil olabilir. Önce eldivenlerimi takayım.', key: 'Güvenlik' },
    { id: 'adult', pad: 0.6, text: 'Kırık cam ve porselen parçalarını bir yetişkin toplamalı. Piller asla açılmaz.' },
    { id: 'spill', pad: 0.8, min: 8.5, text: 'Evlerimizde oluşan bu atıklara evsel atık denir. Ben katı atıklara bakacağım.', key: 'Evsel atık' },
    // SAHNE 3 — Nitelikler
    { id: 'paper', pad: 0.6, text: 'Önce özelliklerine bakayım. Kâğıt ve karton hafiftir; kolayca yırtılır ve katlanır.', key: 'Nitelikleri tanımla' },
    { id: 'glass', pad: 0.6, text: 'Cam saydam, sert ama kırılgandır. Metal kutular parlak ve sağlamdır.' },
    { id: 'plastic', pad: 0.6, text: 'Plastik hafif ve esnektir. Doğada çok uzun sürede parçalanır.' },
    { id: 'organic', pad: 0.8, text: 'Besin artıkları ise yumuşaktır ve kısa sürede çürür.' },
    // SAHNE 4 — Geri dönüşüm sembolü
    { id: 'symbol', pad: 0.6, text: 'Bu işareti ambalajlarda sık görürüz. Bu, geri dönüşüm sembolüdür.', key: 'Geri dönüşüm sembolü' },
    { id: 'loop', pad: 0.8, min: 10, text: 'Oklar bir döngü çizer: Atık toplanır, ayrıştırılır ve yeni bir ürünün ham maddesi olur.' },
    { id: 'define', pad: 0.8, text: 'Atığın işlenip yeniden ham maddeye dönüşmesine geri dönüşüm denir.', key: 'Geri dönüşüm' },
    // SAHNE 5 — Ayrıştır
    { id: 'sort', pad: 0.6, min: 11, text: 'Şimdi atıkları ikiye ayırıyorum: Geri dönüştürülebilenler ve geri dönüştürülemeyenler.', key: 'Ayrıştır' },
    { id: 'nonrec', pad: 0.6, text: 'Kirli peçete, ıslak mendil ve kırık porselen geri dönüştürülemez.' },
    { id: 'compost', pad: 0.8, text: 'Besin artıkları geri dönüşüm kutusuna atılmaz. Kompost yapılarak toprağa geri kazandırılabilir.', key: 'Kompost' },
    // SAHNE 6 — Grupla ve etiketle
    { id: 'group', pad: 0.6, text: 'Geri dönüştürülebilenleri malzemelerine göre gruplandırayım. Sıfır Atık kutularının renkleri yol gösterir.', key: 'Gruplandır' },
    { id: 'colors', pad: 1.0, min: 12, text: 'Mavi kâğıt, sarı plastik, yeşil cam, gri metal içindir. Kahverengi organik, siyah ise diğer atıklar içindir.', key: 'Etiketle' },
    // SAHNE 7 — Özel toplama kutuları
    { id: 'battery', pad: 0.6, text: 'Bazı atıkların kendi kutusu vardır. Piller çöpe atılmaz; içindeki zararlı maddeler toprağa ve suya karışır.', key: 'Atık pil' },
    { id: 'oil', pad: 0.6, text: 'Kızartma yağı lavaboya dökülmez. Soğuyunca şişeye konur, atık yağ kumbarasına verilir.', key: 'Atık yağ' },
    { id: 'textile', pad: 0.6, text: 'Temiz kumaş parçaları da tekstil kutusunda toplanır.' },
    // SAHNE 8 — Kaydet + değer
    { id: 'record', pad: 0.6, min: 10.5, text: 'Bulduklarımı gözlem defterime kaydedeyim.', key: 'Kaydet' },
    { id: 'method', pad: 0.8, text: 'Tanımladım, ayrıştırdım, gruplandırdım, etiketledim: Sınıflandırdım!', key: 'Sınıflandırma' },
    { id: 'value', pad: 0.6, text: 'Büyüklerimiz der ki: Temizliğe özen göster, elindekinin değerini bil.' },
    // SAHNE 9 — Sıra sende + sonraki
    { id: 'task', pad: 0.8, text: 'Sıra sende! Evindeki atıkları incele ve etiketle: Hangisi hangi kutuya gider?' },
    { id: 'next', pad: 0.8, text: 'Sıradaki gözlemim: Geri dönüşüm neden bu kadar önemli?' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
