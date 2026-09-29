// narration.js — 8. sınıf Film 22: "Elektrik Nerede Üretilir? Santraller"  (Maarif FB.8.6.8 · FB.8.6.9)
// Tek düzenlenebilir metin kaynağı. Sessiz film: text altyazı olarak görünür.
const NARRATION = {
  film: '22-santraller',
  title: 'Elektrik Nerede Üretilir? Santraller',
  outcome: 'FB.8.6.8 · FB.8.6.9',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak: vantilatör ve dinamo
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.4, text: 'Merhaba! Vantilatör, elektrik enerjisini hareket enerjisine dönüştürür. Peki tersi olabilir mi?', key: 'Soru sor' },
    { id: 'dynamo', pad: 0.4, min: 6, text: 'Bisikletimin tekerine bir dinamo takılı. Pedal çevirdikçe far yanıyor!', key: 'Dinamo' },
    { id: 'dynamo2', pad: 0.8, text: 'Hareket enerjisi elektrik enerjisine dönüştü. Durunca far sönüyor.' },
    // SAHNE 2 — Elektrik üretiminin nitelikleri (a)
    { id: 'how', pad: 0.4, text: 'Şehirlerin elektriği ise santrallerde üretilir. Nasıl?', key: 'Santral' },
    { id: 'feat', pad: 0.4, min: 6, text: 'Çoğu santralde bir enerji kaynağı türbini döndürür. Türbin de jeneratörü döndürür.', key: 'Türbin · Jeneratör' },
    { id: 'feat2', pad: 0.8, min: 6, text: 'Jeneratörde mıknatıs ile tel sargı birbirine göre döner ve elektrik üretilir.' },
    // SAHNE 3 — Santralleri kaynağa göre ayrıştır (b)
    { id: 'sort', pad: 0.4, text: 'Şimdi santralleri kullandıkları enerji kaynağına göre tek tek ayrıştırıyorum.', key: 'Ayrıştır' },
    { id: 'hes', pad: 0.4, min: 7, text: 'Hidroelektrik santrali: Barajda biriken suyun potansiyel enerjisi, akarken kinetik enerjiye dönüşür ve türbini çevirir.', key: 'Hidroelektrik' },
    { id: 'hes2', pad: 0.4, text: 'Fırat Nehri’ndeki Atatürk Barajı’nda böyle bir santral var.' },
    { id: 'termik', pad: 0.4, min: 7, text: 'Termik santral: Kömür ya da doğal gaz yakılır. Isı suyu buhara dönüştürür, buhar türbini çevirir.', key: 'Termik' },
    { id: 'nukleer', pad: 0.4, min: 7, text: 'Nükleer santral: Uranyum yakıttan elde edilen ısıyla buhar oluşur. Ülkemizde Mersin’de Akkuyu Nükleer Güç Santrali var.', key: 'Nükleer' },
    { id: 'jeo', pad: 0.4, min: 6, text: 'Jeotermal santral: Yer altındaki sıcak su ve buhar türbini çevirir. Denizli ve Aydın’da örnekleri var.', key: 'Jeotermal' },
    { id: 'ruzgar', pad: 0.4, min: 5.5, text: 'Rüzgâr santrali: Rüzgârın hareket enerjisi, türbinin kanatlarını doğrudan çevirir.', key: 'Rüzgâr' },
    { id: 'dalga', pad: 0.4, min: 5.5, text: 'Dalga santrali: Deniz dalgalarının hareket enerjisi elektrik enerjisine dönüştürülür.', key: 'Dalga' },
    { id: 'gunes', pad: 0.8, min: 6, text: 'Güneş santrali: Güneş panelleri ışık enerjisini doğrudan elektrik enerjisine dönüştürür. Türbin gerekmez!', key: 'Güneş' },
    // SAHNE 4 — Gruplandır ve etiketle (c, ç)
    { id: 'group', pad: 0.4, min: 5, text: 'Şimdi kartları eşleştirip santralleri iki gruba ayırıyorum.', key: 'Gruplandır' },
    { id: 'renew', pad: 0.4, min: 7, text: 'Güneş, rüzgâr, akarsu, dalga ve yer altı ısısı tükenmez ya da kısa sürede yenilenir. Bunlar yenilenebilir kaynaklardır.', key: 'Yenilenebilir' },
    { id: 'nonrenew', pad: 0.8, min: 7, text: 'Kömür, doğal gaz ve uranyum ise zamanla tükenir. Termik ve nükleer santraller yenilenemeyen kaynak kullanır.', key: 'Yenilenemeyen' },
    // SAHNE 5 — Tartış: kartopu, avantaj/dezavantaj, görüş karşılaştırma (FB.8.6.9)
    { id: 'debate', pad: 0.4, min: 7, text: 'Hangi santral daha iyi? Sınıfta kartopu tekniğiyle tartıştık: önce ikişer, sonra dörder kişi, en sonunda tüm sınıf.', key: 'Kartopu tekniği' },
    { id: 'table', pad: 0.6, min: 15, text: 'Her santralin avantajlarını ve dezavantajlarını tabloya yazdık.', key: 'Avantaj · Dezavantaj' },
    { id: 'view', pad: 0.4, text: 'Ben rüzgâr santralini savundum, çünkü yakıt yakmaz ve havayı kirletmez.', key: 'Görüşünü temellendir' },
    { id: 'view2', pad: 0.4, text: 'Arkadaşım itiraz etti: “Ama rüzgâr her zaman esmez!” Onun gerekçesi de mantıklıydı.', key: 'Görüşleri kıyasla' },
    { id: 'fair', pad: 0.8, text: 'Sonuç: Her santralin artıları ve eksileri var. Karar verirken kanıtlara bakar, tarafsız davranırız.', key: 'Tarafsız ol' },
    // SAHNE 6 — Kaydet · Sıra sende · Sıradaki
    { id: 'record', pad: 0.6, min: 9, text: 'Bulduklarımı gözlem defterime kaydediyorum.', key: 'Kaydet' },
    { id: 'task', pad: 0.6, min: 7.5, text: 'Sıra sende! Bir santral seç, avantajlarını ve dezavantajlarını araştır; görüşünü gerekçesiyle sınıfta paylaş.' },
    { id: 'next', pad: 0.8, text: 'Elektrik üretmek emek ve kaynak ister. Sıradaki gözlemim: elektriği bilinçli ve tasarruflu kullanmak!' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
