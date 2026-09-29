// narration.js — 7. sınıf Film 1: "Uzayı Keşfeden Teknolojiler"  (Maarif FB.7.1.1 · FB.7.1.2)
// Sessiz film: text → altyazı. Süreler: python3 tools/tts.py films-7/01-uzay-teknolojileri --silent --wps=2.0
const NARRATION = {
  film: '01-uzay-teknolojileri',
  title: 'Uzayı Keşfeden Teknolojiler',
  outcome: 'FB.7.1.1 · FB.7.1.2',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.6, min: 8, text: 'Merhaba, ben Damla! Bu akşam gökyüzünde göz kırpmadan, yavaşça kayan bir ışık gördüm.' },
    { id: 'sat', pad: 0.6, text: 'Bu bir yapay uyduydu! Güneş ışığını yansıttığı için onu görebildim.' },
    { id: 'q', pad: 0.8, min: 7.5, text: 'Uzay nedir? Uzayı hangi araçlarla keşfediyoruz? Türkiye uzayda neler yapıyor?', key: 'Soru sor' },
    // SAHNE 2 — Uzay ve teknolojilerin özellikleri
    { id: 'space', pad: 0.6, text: 'Uzay; Dünya’nın atmosferinin ötesinde uzanan, gök cisimlerinin bulunduğu uçsuz bucaksız ortamdır.', key: 'Uzay' },
    { id: 'cards1', pad: 0.6, min: 10, text: 'Roket, araçları uzaya fırlatır. Yapay uydu, Dünya’nın çevresinde dolanır. Uzay sondası, insansız olarak uzak gök cisimlerine gider.', key: 'Özellikleri belirle' },
    { id: 'cards2', pad: 0.8, min: 10, text: 'Uzay istasyonunda astronotlar yaşar, deney yapar. Uzay mekikleri insan ve yük taşırdı. Gezici araçlar Ay’ı ve Mars’ı inceler.' },
    // SAHNE 3 — Karşılaştır
    { id: 'same', pad: 0.6, text: 'Benzerlikler: Hepsi insan yapımıdır, uzayı keşfetmeye yardım eder. Çoğu güneş paneliyle enerji üretir.', key: 'Benzerlikler' },
    { id: 'diff', pad: 1.0, min: 9, text: 'Farklılıklar: Kimi insanlı, kimi insansızdır. Kimi Dünya’nın çevresinde kalır, kimi uzak gök cisimlerine gider.', key: 'Farklılıklar' },
    // SAHNE 4 — Uydular ve Türkiye
    { id: 'sats', pad: 0.6, text: 'Yapay uyduları görevlerine göre gruplayabilirim: haberleşme, gözlem, hava tahmini ve yer-yön bulma uyduları.', key: 'Yapay uydular' },
    { id: 'daily', pad: 0.6, text: 'Haritada yol ararken, hava durumuna bakarken uydu verilerini kullanırız.', key: 'Günlük hayatta' },
    { id: 'tr', pad: 0.6, text: 'Ülkemizin yerli uyduları da var: TÜRKSAT 6A haberleşme uydusu, İMECE ise gözlem uydusudur.', key: 'Yerli uydular' },
    { id: 'tua', pad: 1.0, text: 'Bu çalışmalarda TÜBİTAK UZAY ve Türkiye Uzay Ajansı görev alır.', key: 'TUA · TÜBİTAK UZAY' },
    // SAHNE 5 — İnsanlar
    { id: 'alper', pad: 0.6, text: 'Alper Gezeravcı, 18 Ocak 2024’te uzaya çıkan ilk Türk astronottur. Uluslararası Uzay İstasyonu’nda deneyler yaptı.', key: 'İlk Türk astronot' },
    { id: 'nuzhet', pad: 1.0, text: 'Nüzhet Gökdoğan ise ilk Türk kadın astronomdur. Üniversitede astronomi çalıştı, pek çok astronom yetiştirdi.', key: 'Astronom · Astronot' },
    // SAHNE 6 — Teleskoplar
    { id: 'ground', pad: 0.6, min: 9, text: 'Yer tabanlı teleskoplar gözlemevlerindedir. Gözlemevleri yüksek, açık havalı ve şehir ışıklarından uzak yerlere kurulur.', key: 'Yer tabanlı teleskop' },
    { id: 'space-tel', pad: 0.7, text: 'Hubble ve James Webb ise uzay teleskoplarıdır. Atmosferin dışında oldukları için bulutlar görüntüyü bozmaz.', key: 'Uzay teleskobu' },
    // SAHNE 7 — Model
    { id: 'model', pad: 0.6, min: 9, text: 'Şimdi bir gözlem aracı modeli öneriyorum: Karton tüp ve dibinde ışığı toplayan çukur bir ayna.', key: 'Model öner' },
    { id: 'evidence', pad: 0.6, min: 8.5, text: 'Yeni kanıtlar: Ayna büyüdükçe daha çok ışık toplanır. Bulutlar ve şehir ışıkları ise gözlemi zorlaştırır.', key: 'Yeni kanıt' },
    { id: 'revise', pad: 1.0, min: 10, text: 'Modelimi yeniliyorum: Aynayı büyüttüm, teleskobu karanlık bir dağa kurdum. Uzaydakine güneş paneli ve anten ekledim.', key: 'Modeli yenile' },
    // SAHNE 8 — Kaydet
    { id: 'record', pad: 0.6, min: 9.6, text: 'Bulduklarımı gözlem defterime kaydediyorum.', key: 'Kaydet' },
    // SAHNE 9 — Sıra sende + sonraki
    { id: 'task', pad: 0.8, min: 9, text: 'Sıra sende! Atık malzemelerle dürbün, teleskop, uydu ya da gezici araç modeli tasarla. Karşılaştır, geliştir.', key: 'Sıra sende' },
    { id: 'research', pad: 0.5, text: 'Araştır: Alper Gezeravcı’nın görev armasındaki semboller ne anlatıyor?' },
    { id: 'next', pad: 1.0, text: 'Sıradaki gözlemim: Görevi biten uydular nereye gider? Uzaydaki çöpler!' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
