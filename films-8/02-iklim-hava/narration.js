// narration.js — 8. sınıf Film 2: "İklim ve Hava Olayları"  (Maarif FB.8.1.2)
// Sessiz film: text → altyazı. Süreler: python3 tools/tts.py films-8/02-iklim-hava --silent --wps=2.1
const NARRATION = {
  film: '02-iklim-hava',
  title: 'İklim ve Hava Olayları',
  outcome: 'FB.8.1.2',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.6, min: 7, text: 'Merhaba, ben Damla! Sabah güneş vardı, öğlen yağmur başladı. Hava ne çabuk değişti!' },
    { id: 'q', pad: 0.8, min: 7.5, text: 'Yağmur, kar, dolu nasıl oluşur? Hava ile iklim aynı şey mi?', key: 'Soru sor' },
    { id: 'records', pad: 1.0, min: 9, text: 'Dünya’da ölçülen en yüksek sıcaklık 56,7 °C, en düşük sıcaklık ise −89,2 °C. Ülkemizde en düşük değer −46,4 °C!', key: 'Sıcaklık rekorları' },
    // SAHNE 2 — Atmosfer ve su buharı
    { id: 'air', pad: 0.8, min: 8, text: 'Hava olayları atmosferde gerçekleşir. Atmosferdeki su buharı hâl değiştirerek birçok hava olayını oluşturur.', key: 'Su buharı' },
    // SAHNE 3 — Oluşumlar
    { id: 'rain', pad: 0.6, min: 8, text: 'Yağmur: Yükselen su buharı soğuyup yoğuşur, bulut damlacıkları oluşur. Damlacıklar birleşip ağırlaşınca düşer.', key: 'Yağmur' },
    { id: 'snow', pad: 0.6, min: 7, text: 'Kar: Bulutta sıcaklık 0 °C’nin altındaysa su buharı doğrudan buz kristallerine dönüşür.', key: 'Kar' },
    { id: 'hail', pad: 0.6, min: 8.5, text: 'Dolu: Güçlü hava akımları damlaları bulutun soğuk üst kısmına taşır. Damlalar donar, buz katmanlarıyla büyür.', key: 'Dolu' },
    { id: 'dew', pad: 0.6, min: 8.5, text: 'Çiy: Soğuk yüzeyde su buharı yoğuşur. Kırağı: Yüzey 0 °C’nin altındaysa su buharı doğrudan buz kristali olur.', key: 'Çiy · Kırağı' },
    { id: 'fog', pad: 0.8, min: 7, text: 'Sis: Yere yakın havadaki su buharı yoğuşur. Havada asılı minik damlacıklar görüşü azaltır.', key: 'Sis' },
    // SAHNE 4 — Büyük hava olayları ve yeryüzü şekilleri
    { id: 'storm', pad: 0.6, min: 7, text: 'Fırtına, kasırga, hortum ve dolu gibi hava olayları yaşamı büyük ölçüde etkileyebilir.', key: 'Büyük hava olayları' },
    { id: 'land', pad: 0.6, min: 8, text: 'Hava olayları yeryüzünü de şekillendirir. Dalgalar kıyıları aşındırır. Rüzgâr çöllerde kum tepelerini sürekli taşır.', key: 'Yeryüzü şekilleri' },
    { id: 'peri', pad: 1.0, min: 7.5, text: 'Kapadokya’nın peri bacalarını da yağmur, akarsu ve rüzgâr çok uzun sürede aşındırarak şekillendirmiştir.', key: 'Peri bacaları' },
    // SAHNE 5 — Hava olayı ve iklim; bilim dalları; tahmin
    { id: 'weather', pad: 0.6, text: 'Atmosferde gerçekleşen bu olaylara hava olayları denir. Kısa sürede, dar bir alanda değişebilirler.', key: 'Hava olayları' },
    { id: 'climate', pad: 0.8, text: 'İklim ise geniş alanlarda, uzun yıllar boyunca gerçekleşen hava olaylarının ortalamasıdır.', key: 'İklim' },
    { id: 'sci', pad: 0.8, min: 8.5, text: 'Hava olaylarını meteoroloji, iklimi iklim bilimi inceler. Bu bilim insanlarına meteorolog ve iklim bilimci denir.', key: 'Meteorolog · İklim bilimci' },
    { id: 'forecast', pad: 0.8, min: 9, text: 'Bir hafta boyunca hava tahminlerini kendi gözlemlerimle karşılaştırdım. Yedi günün beşinde tahmin doğru çıktı.', key: 'Tahmin ve gözlem' },
    { id: 'jobs', pad: 0.8, text: 'Çiftçi, kaptan ve pilot da işini planlarken hava durumunu mutlaka takip eder.', key: 'Meslekler' },
    // SAHNE 6 — Karşılaştırma (Venn)
    { id: 'same', pad: 0.8, min: 8.5, text: 'Benzerlikler: İkisi de atmosferle ilgilidir. İkisi de sıcaklık, yağış ve rüzgâr gibi ölçümlerle incelenir.', key: 'Benzerlikler' },
    { id: 'diff', pad: 1.0, min: 9.5, text: 'Farklılıklar: Hava olayları kısa sürelidir, hızla değişir. İklim uzun yılların ortalamasıdır, yavaş değişir.', key: 'Farklılıklar' },
    // SAHNE 7 — Kaydet
    { id: 'record', pad: 0.8, min: 9.5, text: 'Bulduklarımı gözlem defterime kaydediyorum.', key: 'Kaydet' },
    // SAHNE 8 — Sıra sende + sonraki
    { id: 'task', pad: 1.0, min: 9, text: 'Sıra sende! Grubunla hava olayları ve iklimin benzerlik ve farklılıklarını anlatan bir poster hazırla.', key: 'Sıra sende' },
    { id: 'next', pad: 1.0, text: 'Sıradaki gözlemim: Ağır bir yükü nasıl daha kolay kaldırırız? Basit makineler!' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
