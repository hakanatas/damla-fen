// narration.js — 8. sınıf Film 24: "Işıktan Besine: Fotosentez"  (Maarif FB.8.7.1 · FB.8.7.2)
// Tek düzenlenebilir metin kaynağı. Sessiz film: text altyazı olarak görünür.
const NARRATION = {
  film: '24-fotosentez',
  title: 'Işıktan Besine: Fotosentez',
  outcome: 'FB.8.7.1 · FB.8.7.2',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.4, text: 'Merhaba! Bu küçük fidan bir gün kocaman bir ağaç olacak.' },
    { id: 'q', pad: 0.4, text: 'Peki bitkiler nasıl büyür? Bu kadar besin nereden geliyor?', key: 'Soru sor' },
    { id: 'brain', pad: 0.4, min: 6.5, text: 'Aklıma gelenler: topraktan mı, sudan mı, ışıktan mı, havadan mı?' },
    { id: 'producer', pad: 0.8, text: 'Besin zincirinde bitkiler üreticidir; besinlerini kendileri üretir. Ama nasıl?', key: 'Üretici' },
    // SAHNE 2 — Yaprağın içinde
    { id: 'leaf', pad: 0.3, min: 3.8, text: 'Hadi bir yaprağa yakından bakalım!' },
    { id: 'chloro', pad: 0.4, text: 'Yaprak hücrelerindeki kloroplastlarda klorofil var. Klorofil ışık enerjisini yakalar.', key: 'Klorofil' },
    { id: 'inputs', pad: 0.4, min: 6.5, text: 'Kökler topraktan suyu alır. Yapraklar havadan karbondioksit alır.', key: 'Su + karbondioksit' },
    { id: 'make', pad: 0.4, min: 6, text: 'Işık enerjisiyle su ve karbondioksitten besin üretilir: glikoz adlı bir şeker.', key: 'Besin (glikoz)' },
    { id: 'oxygen', pad: 0.4, text: 'Bu sırada oksijen de üretilir ve havaya verilir.', key: 'Oksijen' },
    { id: 'name', pad: 0.6, min: 6, text: 'Bu olayın adı fotosentez: Bitkinin ışık enerjisini kullanarak besin üretmesi.', key: 'Fotosentez' },
    // SAHNE 3 — Yapay ışık ve önem
    { id: 'artificial', pad: 0.8, text: 'Fotosentez için Güneş şart değil. Seralardaki lambalar gibi yapay ışıkta da gerçekleşir.', key: 'Yapay ışık' },
    { id: 'cause', pad: 0.4, min: 8, text: 'Neden-sonuç zincirini kuralım: Işık yoksa fotosentez olmaz, besin üretilmez, bitki büyüyemez.', key: 'Neden → sonuç' },
    { id: 'chain', pad: 0.4, text: 'Bitkinin ürettiği besin, besin zinciriyle çekirgeye, kurbağaya, yılana ulaşır.' },
    { id: 'balance', pad: 0.6, text: 'Havadaki oksijen de fotosentezle yenilenir. Fotosentez, doğanın dengesi için vazgeçilmezdir.', key: 'Doğanın dengesi' },
    // SAHNE 4 — Hipotez
    { id: 'rate', pad: 0.4, text: 'Yeni sorum: Fotosentez hızı neye bağlı?', key: 'Fotosentez hızı' },
    { id: 'factors', pad: 0.4, min: 7, text: 'Olası faktörler: ışık şiddeti, ışık rengi, karbondioksit miktarı, sıcaklık ve su.', key: 'Faktörler' },
    { id: 'measure', pad: 0.4, text: 'Hızı ölçmek için bir su bitkisinin çıkardığı oksijen kabarcıklarını sayacağım.' },
    { id: 'hypo', pad: 0.8, text: 'Hipotezim: Işık şiddeti artarsa fotosentez hızı artar.', key: 'Hipotez' },
    { id: 'safety', pad: 0.6, min: 6, text: 'Dikkat! Lamba ve kablo suya değmemeli. Deneyi bir yetişkin eşliğinde yaparız.', key: 'Güvenlik' },
    // SAHNE 5 — Değişkenler ve deney
    { id: 'indep', pad: 0.4, text: 'Bağımsız değişken ışık şiddeti. Lambayı bitkiye yaklaştırıp uzaklaştırarak değiştiriyorum.', key: 'Bağımsız değişken' },
    { id: 'dep', pad: 0.4, text: 'Bağımlı değişken: bir dakikadaki kabarcık sayısı.', key: 'Bağımlı değişken' },
    { id: 'ctrl', pad: 0.6, text: 'Kontrol edilen değişkenler: aynı bitki, su miktarı, sıcaklık, lamba ve süre.', key: 'Kontrol değişkenleri' },
    { id: 'data', pad: 0.4, min: 8, text: 'Her uzaklıkta üç kez saydım ve ortalamayı tabloya kaydettim.', key: 'Veri kaydet' },
    { id: 'result', pad: 0.4, text: 'Lamba yaklaştıkça kabarcık sayısı arttı. Verilerim hipotezimi destekliyor!' },
    { id: 'limit', pad: 0.6, text: 'Ama ışık çok artınca hız bir noktadan sonra artmıyor; başka faktörler sınır olur.' },
    // SAHNE 6 — Diğer faktörler ve önerme
    { id: 'co2', pad: 0.4, text: 'Suya biraz karbonat ekledim. Suda karbondioksit arttı, kabarcıklar da çoğaldı.', key: 'Karbondioksit' },
    { id: 'temp', pad: 0.4, text: 'Çok soğukta ve çok sıcakta fotosentez yavaşlar. Su azalınca da yavaşlar.', key: 'Sıcaklık · su' },
    { id: 'color', pad: 0.4, text: 'Işık rengi de etkiler: Yeşil ışıkta, kırmızı ve mavi ışığa göre daha yavaştır.', key: 'Işık rengi' },
    { id: 'prop', pad: 0.6, min: 8, text: 'Önermem: Işık şiddeti, ışık rengi, karbondioksit, sıcaklık ve su fotosentez hızını etkiler.', key: 'Önerme' },
    // SAHNE 7 — Sıra sende · Sıradaki
    { id: 'task', pad: 0.6, min: 8, text: 'Sıra sende! Bir faktör seç, düzeneğini kur, verilerini kaydet ve raporla. Afiş de hazırlayabilirsin.' },
    { id: 'next', pad: 0.8, text: 'Bitkiler ürettikleri besini nasıl kullanıyor? Sıradaki gözlemim: canlılarda solunum.' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
