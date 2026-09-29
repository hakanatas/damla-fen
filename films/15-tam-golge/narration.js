// narration.js — Film 15: "Tam Gölge"  (Maarif FB.5.4.3)
// Tek düzenlenebilir metin kaynağı. Her "beat" bir anlatım cümlesidir (sessiz sürüm: altyazı).
const NARRATION = {
  film: '15-tam-golge',
  title: 'Tam Gölge',
  outcome: 'FB.5.4.3 Tam gölgeyi bilimsel olarak gözlemleyebilme',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Bahçede gölgeler
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.6, min: 6, text: 'Merhaba! Bahçede yürürken gölgem de benimle yürüyor.' },
    { id: 'bridge', pad: 0.8, min: 7, text: 'Ağacın ve binaların da gölgesi var. Peki gölge nasıl oluşur?', key: 'Soru sor' },
    // SAHNE 2 — Tangram gölgeleri
    { id: 'tangram', pad: 0.6, min: 7, text: 'Kartondan, yani opak bir maddeden tangram parçaları kestim.', key: 'Tangram' },
    { id: 'stick', pad: 0.6, text: 'Parçaları pipetlere yapıştırdım. Küçük bir lambam ve sabit bir ekranım var.' },
    { id: 'cast', pad: 0.8, min: 6, text: 'Lambayı yakınca ekranda üçgenin gölgesi oluştu!' },
    { id: 'cat', pad: 1.0, min: 7.5, text: 'Parçaları birleştirince ekranda bir kedi gölgesi belirdi!' },
    // SAHNE 3 — Nitelikler
    { id: 'what', pad: 0.8, text: 'Işık opak cisimden geçemez. Cismin arkasında ışık almayan karanlık bölgeye tam gölge denir.', key: 'Tam gölge' },
    { id: 'shape', pad: 1.0, min: 8, text: 'Tam gölgenin şekli cismin şekline benzer: Kare, kare gölge; daire, daire gölge verir.', key: 'Gölgenin şekli' },
    // SAHNE 4 — Işınlarla çizim
    { id: 'draw', pad: 0.6, min: 7, text: 'Tam gölgeyi çizelim. Noktasal kaynaktan cismin kenarlarına düz ışınlar çizeriz.', key: 'Işın çizimi' },
    { id: 'extend', pad: 1.0, min: 8, text: 'Işınları ekrana kadar uzatırız. İki ışın arasında kalan karanlık bölge tam gölgedir.' },
    // SAHNE 5 — Değişken: kaynak–cisim mesafesi
    { id: 'varq', pad: 0.6, text: 'Gölgenin boyu neye bağlı? Lambayı ve ekranı sabit tutup yalnızca cismi hareket ettireceğim.', key: 'Değişken' },
    { id: 'guess', pad: 0.8, min: 6, text: 'Sence cisim lambaya yaklaşınca gölge büyür mü, küçülür mü?' },
    { id: 'closer', pad: 0.6, min: 7, text: 'Cisim lambaya yaklaştıkça tam gölge büyüyor.' },
    { id: 'farther', pad: 0.8, min: 7, text: 'Cisim lambadan uzaklaşıp ekrana yaklaştıkça tam gölge küçülüyor.' },
    { id: 'data', pad: 1.2, min: 9, text: 'Verilerimi kaydettim: Kaynak ile cisim arasındaki mesafe azaldıkça tam gölgenin boyu artar.', key: 'Veri kaydet' },
    // SAHNE 6 — Günlük yaşam
    { id: 'hand', pad: 1.0, min: 7, text: 'Gölge oyununda da kuklayı lambaya yaklaştırınca duvardaki gölgesi büyür.', key: 'Günlük yaşam' },
    // SAHNE 7 — Kaydet, sıra sende, sonraki film
    { id: 'record', pad: 0.6, min: 9, text: 'Gözlemlerimi defterime kaydedeyim.', key: 'Kaydet' },
    { id: 'sum', pad: 0.8, text: 'Sonuç: Opak cisim ışığı engeller ve arkasında tam gölge oluşur. Cisim kaynağa yaklaştıkça gölge büyür.' },
    { id: 'task', pad: 1.0, min: 9, text: 'Sıra sende! Kendi tangramını yap, gölgesini çiz. Divriği Ulu Camii’nin kapısındaki gölgeyi de araştır.' },
    { id: 'next', pad: 0.8, text: 'Sıradaki gözlemim: Maddenin tanecikli yapısı.' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
