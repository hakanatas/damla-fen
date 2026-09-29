// narration.js — 8. sınıf Film 9: "Canlıların Çevreye Uyumu"  (Maarif FB.8.3.8)
const NARRATION = {
  film: '09-adaptasyon',
  title: 'Canlıların Çevreye Uyumu',
  outcome: 'FB.8.3.8',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Çöl ve kutup: iki tilki
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'desert', pad: 0.6, min: 6.5, text: 'Çölde gündüz kavurucu bir sıcak var. Şu küçük tilkinin kulakları ne kadar büyük!', key: 'Gözlem' },
    { id: 'arctic', pad: 0.6, min: 6.5, text: 'Kutupta ise her yer buz. Oradaki tilkinin kulakları küçük, kürkü kalın ve beyaz.' },
    { id: 'question', pad: 0.8, text: 'İkisi de tilki, peki neden bu kadar farklılar? Bu özelliklerin sebebi ne olabilir?', key: 'Soru sor' },
    // SAHNE 2 — Veri tablosu
    { id: 'table', pad: 0.5, min: 9, text: 'Verileri bir tabloya kaydedelim: yaşam alanı, kulak, kürk ve renk.', key: 'Veri topla' },
    { id: 'ears', pad: 0.6, text: 'Büyük kulaklar vücut ısısının dışarı atılmasına yardım eder. Küçük kulaklar ısı kaybını azaltır.', key: 'Isı dengesi' },
    { id: 'color', pad: 0.6, text: 'Kum rengi kürk çölde, beyaz kürk karda canlıyı gizler. Buna kamuflaj denir.', key: 'Kamuflaj' },
    { id: 'related', pad: 0.8, text: 'Bu iki tilki akraba ama farklı türlerdir. Her biri kendi ortamına uygun özellikler taşır.' },
    // SAHNE 3 — Adaptasyon tanımı
    { id: 'adapt', pad: 1.0, min: 8.5, text: 'Canlının yaşadığı ortamda hayatta kalma ve üreme şansını artıran kalıtsal özelliklerine adaptasyon denir.', key: 'Adaptasyon' },
    // SAHNE 4 — Başka örnekler
    { id: 'polar', pad: 0.5, text: 'Kutup ayısının kalın yağ tabakası ve yoğun kürkü onu soğuktan korur.', key: 'Başka örnekler' },
    { id: 'brown', pad: 0.6, text: 'Boz ayı ormanlarda yaşar. Sonbaharda yağ depolar, kışı kış uykusunda geçirir.' },
    { id: 'cactus', pad: 0.6, text: 'Kaktüsün yaprakları dikene dönüşmüştür, böylece su kaybı azalır. Kalın gövdesinde su depolar.' },
    { id: 'camel', pad: 0.8, text: 'Devenin hörgücünde su değil, yağ depolanır. Uzun kirpikleri gözlerini kumdan korur.', key: 'Hörgüç: yağ' },
    // SAHNE 5 — Kavram yanılgısı
    { id: 'wrong', pad: 0.5, min: 6.5, text: '“Tilki soğukta üşüdüğü için kalın kürk geliştirdi.” Bu açıklama doğru değil!', key: 'Kavram yanılgısı' },
    { id: 'why', pad: 0.8, text: 'Bir canlı, ihtiyaç duyduğu için yeni bir kalıtsal özellik kazanamaz. Peki ne olur?' },
    // SAHNE 6 — Varyasyon ve doğal seçilim
    { id: 'variation', pad: 0.6, min: 8, text: 'Aynı türün bireyleri birbirinden biraz farklıdır; kimi açık, kimi koyu renklidir. Buna varyasyon denir.', key: 'Varyasyon' },
    { id: 'select', pad: 0.5, min: 8, text: 'Karlı bir ortam düşünelim. Açık renkli tavşanları avcılar daha zor fark eder.', key: 'Doğal seçilim' },
    { id: 'survive', pad: 0.5, min: 8, text: 'Onlar daha çok hayatta kalır ve yavru bırakır. Yavrular bu özelliği kalıtımla alır.' },
    { id: 'generations', pad: 1.0, min: 9, text: 'Nesiller boyunca açık renkli bireyler çoğalır. Ortama uygun özelliklerin böyle yaygınlaşmasına doğal seçilim denir.' },
    // SAHNE 7 — Yorumla, saygı
    { id: 'interpret', pad: 0.6, text: 'Verilerimi yorumluyorum: Her canlının özellikleri, yaşadığı ortamda hayatta kalmasını destekler.', key: 'Yorumla' },
    { id: 'respect', pad: 1.0, text: 'Her canlı kendi ortamında değerlidir. Farklılıklara saygı duyalım, yaşam alanlarını koruyalım.', key: 'Saygı' },
    // SAHNE 8 — Kaydet · Sıra sende · Sıradaki
    { id: 'record', pad: 0.6, min: 9, text: 'Bulduklarımı gözlem defterime kaydediyorum.', key: 'Kaydet' },
    { id: 'task', pad: 0.8, min: 8, text: 'Sıra sende! Bir yaşam alanı seç, oradaki canlıların uyumlarını bir hikâyeyle anlat.', key: 'Sıra sende' },
    { id: 'next', pad: 1.0, text: 'Sıradaki gözlemim: Ses nasıl oluşur ve nasıl yayılır?' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
