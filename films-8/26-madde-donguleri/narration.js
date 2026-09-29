// narration.js — 8. sınıf Film 26: "Hiçbir Şey Kaybolmaz: Madde Döngüleri"  (Maarif FB.8.7.4 · FB.8.7.5)
// Tek düzenlenebilir metin kaynağı. Sessiz film: text altyazı olarak görünür.
const NARRATION = {
  film: '26-madde-donguleri',
  title: 'Hiçbir Şey Kaybolmaz: Madde Döngüleri',
  outcome: 'FB.8.7.4 · FB.8.7.5',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'q', pad: 0.6, min: 8, text: 'Merhaba! Dünya’daki su milyonlarca yıldır dolaşıyor. Su, karbon ve oksijen nasıl dolaşır? Neden hiç tükenmez?', key: 'Soru sor' },
    { id: 'define', pad: 0.8, text: 'Maddenin canlılar ile çevre arasında sürekli dolaşmasına madde döngüsü denir.', key: 'Madde döngüsü' },
    // SAHNE 2 — Damla'nın su yolculuğu
    { id: 'sea', pad: 0.6, min: 6, text: 'Denizdeyim. Güneş ısıtınca taneciklerim hızlanıyor ve buharlaşıyorum.', key: 'Buharlaşma' },
    { id: 'vapor', pad: 0.6, min: 6.5, text: 'Artık görünmeyen su buharıyım. Bitkiler de yapraklarından terlemeyle su buharı verir.', key: 'Terleme' },
    { id: 'cloud', pad: 0.6, min: 6.5, text: 'Yükseklerde hava soğuk. Soğuyunca yoğuşup minicik bir damlacık oluyorum. Sayısız damlacık bulutu oluşturur.', key: 'Yoğuşma' },
    { id: 'snow', pad: 0.6, min: 6, text: 'Bulutun tepesi daha da soğuk. Donup kar tanesi oluyorum ve dağa yağıyorum.', key: 'Yağış' },
    { id: 'melt', pad: 0.8, min: 8, text: 'Bahar gelince eriyorum, dereyle akıp yine denize dönüyorum. Bir kısmım toprağa sızıp yeraltı suyuna karışır.' },
    // SAHNE 3 — Şema ve nitelikler
    { id: 'schema', pad: 0.6, min: 8, text: 'Yolculuğumu şemaya çizdim. Oklar, suyun hangi süreçle nereye gittiğini gösteriyor.', key: 'Şema üzerinde incele' },
    { id: 'traits', pad: 0.8, min: 8, text: 'Çıkarımım: Döngünün başı ve sonu yok. Su yok olmuyor, yalnızca hâl ve yer değiştiriyor.', key: 'Döngünün nitelikleri' },
    // SAHNE 4 — Karbon ve oksijen döngüleri
    { id: 'co', pad: 0.5, text: 'Şimdi karbon ve oksijen döngülerine bakalım. Bu iki döngü el ele çalışır.', key: 'Karbon · Oksijen döngüsü' },
    { id: 'photo', pad: 0.5, text: 'Bitkiler fotosentezde karbondioksit ve su kullanır, besin ve oksijen üretir. Besindeki karbon hayvanlara geçer.', key: 'Fotosentez' },
    { id: 'resp', pad: 0.5, text: 'Tüm canlılar solunumda oksijen kullanır ve karbondioksit verir. Bitkiler de solunum yapar!', key: 'Solunum' },
    { id: 'decomp', pad: 0.5, text: 'Ölen canlıları ayrıştırıcılar parçalar. Karbon yine karbondioksit olarak havaya döner.', key: 'Ayrıştırıcılar' },
    { id: 'fossil', pad: 0.8, text: 'Bazı kalıntılar milyonlarca yılda fosil yakıta dönüşür. Yakıt yanınca oksijen harcanır, karbondioksit çıkar.', key: 'Yanma' },
    // SAHNE 5 — Veri kaydet, yorumla
    { id: 'table', pad: 0.6, min: 10, text: 'Şemayı inceleyip verileri tabloya kaydettim: Hangi süreç hangi gazı alıyor, hangisini veriyor?', key: 'Veri topla, kaydet' },
    { id: 'balance', pad: 0.8, text: 'Yorumum: Fotosentez ile solunum birbirini dengeler. Havadaki oksijen ve karbondioksit böyle yenilenir.', key: 'Yorumla' },
    { id: 'lungs', pad: 0.8, min: 11, text: '“Ormanlar dünyanın akciğeridir” sözü tam doğru değil: Akciğer oksijen alır, orman ise oksijen verir. Ama ormanların önemini güzel anlatır.', key: 'Eleştirel bak' },
    // SAHNE 6 — Yaşam için önemi ve döngüleri bozan sorunlar
    { id: 'why', pad: 0.8, min: 9, text: 'Döngüler olmasaydı tatlı su, oksijen ve besin tükenirdi. Döngüler sayesinde aynı madde tekrar tekrar kullanılır.', key: 'Yaşam için önemi' },
    { id: 'jigsaw', pad: 0.5, text: 'Ama insan etkinlikleri döngüleri bozabilir. Sınıfta ayrılıp birleşme tekniğiyle dört sorunu araştırdık.', key: 'Ayrılıp birleşme' },
    { id: 'acid', pad: 0.5, min: 7, text: 'Asit yağmurları: Fosil yakıtlardan çıkan bazı gazlar yağmuru asitleştirir. Ormanlar, göller, yapılar zarar görür.', key: 'Asit yağmurları' },
    { id: 'ozone', pad: 0.5, min: 7, text: 'Ozon tabakası zararlı morötesi ışınları süzer. Onu incelten bazı eski sprey ve soğutucu gazları yasaklandı.', key: 'Ozon tabakası' },
    { id: 'green', pad: 0.8, min: 7, text: 'Fazla karbondioksit ise karbon döngüsünün dengesini bozar; sera etkisi artar. Bu, ozon incelmesinden farklı bir sorundur!', key: 'Sera etkisi' },
    // SAHNE 7 — Kaydet · Sıra sende · Sıradaki
    { id: 'record', pad: 0.6, min: 9.5, text: 'Bulduklarımı gözlem defterime kaydediyorum.', key: 'Kaydet' },
    { id: 'task', pad: 0.6, min: 8, text: 'Sıra sende! Bir madde döngüsünü poster ya da dijital içerikle anlat. Onu bozan bir insan etkinliğini de göster.' },
    { id: 'next', pad: 0.8, text: 'Sıradaki gözlemim: Karbon döngüsünün dengesi bozulursa iklim ne olur? Küresel iklim değişikliği!' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
