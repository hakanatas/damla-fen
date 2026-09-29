// narration.js — Film 26: "Geri Dönüşüm Neden Önemli?"  (Maarif FB.5.7.2)
// Tek düzenlenebilir metin kaynağı. Her "beat" bir anlatım cümlesidir (sessiz sürüm: altyazı).
const NARRATION = {
  film: '26-geri-donusumun-onemi',
  title: 'Geri Dönüşüm Neden Önemli?',
  outcome: 'FB.5.7.2 Kaynakların etkili kullanımı konusunda geri dönüşümün önemli olduğuna yönelik bilimsel çıkarım yapabilme',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.6, text: 'Merhaba! Atıkları ayırmayı öğrendim. Bugün aklımda yeni bir soru var.' },
    { id: 'question', pad: 0.8, text: 'Geri dönüşüm, ülkemizin kaynaklarını nasıl etkiler?', key: 'Soru sor' },
    // SAHNE 2 — Kaynaklar
    { id: 'resource', pad: 0.6, text: 'Önce kaynak ne demek, onu tanımlayalım.', key: 'Kaynak' },
    { id: 'natural', pad: 0.6, text: 'Ağaçlar, kum, topraktaki madenler ve petrol doğal kaynaklardır. Kullandığımız ürünler bunlardan yapılır.' },
    { id: 'chain', pad: 0.6, min: 9.5, text: 'Kâğıt ağaçtan, cam kumdan, metal madenden, plastik ise çoğunlukla petrolden üretilir.' },
    { id: 'limited', pad: 0.6, text: 'Bu kaynakların çoğu sınırlıdır. Bazılarının yenilenmesi de çok uzun zaman alır.', key: 'Sınırlı kaynak' },
    { id: 'efficient', pad: 0.8, text: 'Kaynakları israf etmeden, ihtiyacımız kadar kullanmaya kaynakların etkili kullanımı denir.', key: 'Etkili kullanım' },
    // SAHNE 3 — Veri topla, kaydet
    { id: 'data', pad: 0.6, min: 11, text: 'Bir hafta boyunca evimizde ayrıştırdığım atıkları tarttım ve tabloya kaydettim.', key: 'Verileri kaydet' },
    { id: 'total', pad: 0.8, text: 'Toplam altı buçuk kilogram! Hepsi çöpe gitseydi, bu malzemeler boşa gidecekti.' },
    // SAHNE 4 — Değerlendir
    { id: 'evaluate', pad: 0.6, text: 'Şimdi verilerimi değerlendireyim. Geri dönüşüm neleri korur?', key: 'Değerlendir' },
    { id: 'raw', pad: 0.6, text: 'Geri dönüştürülen kâğıt, yeni ağaç kesilmesini azaltır. Ham madde korunur.', key: 'Ham madde' },
    { id: 'energy', pad: 0.8, text: 'Alüminyum kutuyu geri dönüştürmek, madenden yenisini yapmaktan çok daha az enerji harcar.', key: 'Enerji tasarrufu' },
    { id: 'glass', pad: 0.6, text: 'Cam, kalitesi bozulmadan tekrar tekrar geri dönüştürülebilir.' },
    { id: 'landfill', pad: 0.8, text: 'Çöpe giden atık azalınca, depolama alanları daha yavaş dolar ve çevre temiz kalır.' },
    // SAHNE 5 — Çıkarım
    { id: 'infer', pad: 1.0, min: 10, text: 'Çıkarımım şu: Geri dönüşüm kaynaklarımızı ve enerjimizi korur. Kaynakların etkili kullanımı için önemlidir.', key: 'Bilimsel çıkarım' },
    // SAHNE 6 — Benim payım + ortak görev
    { id: 'me', pad: 0.6, text: 'Peki bunda benim payım ne? Kendi davranışlarıma bakayım.', key: 'Benim payım' },
    { id: 'habits', pad: 0.6, min: 10.5, text: 'Kâğıdın tek yüzünü kullanıp atıyordum. Artık iki yüzünü de kullanıyorum ve atıkları ayrıştırıyorum.' },
    { id: 'duty', pad: 0.8, text: 'Belediyeler kutuları koyar ve atıkları toplar. Biz de doğru ayrıştırırız. Bu hepimizin görevidir.', key: 'Ortak görev' },
    // SAHNE 7 — Kaydet
    { id: 'record', pad: 0.6, min: 10.5, text: 'Bulduklarımı gözlem defterime kaydediyorum.', key: 'Kaydet' },
    { id: 'method', pad: 0.8, text: 'Tanımladım, veri topladım, kaydettim, değerlendirdim ve çıkarım yaptım.' },
    // SAHNE 8 — Sıra sende + sonraki
    { id: 'task', pad: 0.8, text: 'Sıra sende! Geri dönüştürülebilen bir madde seç. Güvenilir kaynaklardan araştır ve poster hazırla.' },
    { id: 'next', pad: 0.8, text: 'Sıradaki gözlemim: Yakın çevremde atık yönetimi ve Sıfır Atık.' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
