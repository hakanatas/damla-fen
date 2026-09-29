// narration.js — 8. sınıf Film 27: "Isınan Dünya: Küresel İklim Değişikliği"  (Maarif FB.8.7.6 · FB.8.7.7)
// 5–8. sınıf serisinin FİNALİ. Tek düzenlenebilir metin kaynağı. Sessiz film: text altyazı olarak görünür.
const NARRATION = {
  film: '27-iklim-degisikligi',
  title: 'Isınan Dünya: Küresel İklim Değişikliği',
  outcome: 'FB.8.7.6 · FB.8.7.7',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'q', pad: 0.6, min: 9, text: 'Merhaba! Haberlerde rekor sıcaklık, kuraklık, orman yangını sözlerini duyuyorum. Dünya neden ısınıyor? Bu bizi nasıl etkiler?', key: 'Soru sor' },
    { id: 'climate', pad: 0.8, text: 'Önce hatırlayalım: Hava olayları günlüktür. İklim ise uzun yılların ortalamasıdır.', key: 'Hava ≠ iklim' },
    // SAHNE 2 — Sera etkisi
    { id: 'sun', pad: 0.5, min: 9, text: 'Güneş ışığı yeryüzünü ısıtır. Isınan yeryüzü de gözle göremediğimiz kızılötesi ışınlarla ısı yayar.', key: 'Sera etkisi' },
    { id: 'trap', pad: 0.5, text: 'Karbondioksit, metan ve su buharı gibi sera gazları bu ısının bir kısmını tutar.', key: 'Sera gazları' },
    { id: 'natural', pad: 0.5, text: 'Bu doğal sera etkisi olmasaydı Dünya buz gibi olurdu. Yani sera etkisi yaşam için gereklidir.' },
    { id: 'more', pad: 0.6, text: 'Sera gazları artınca daha çok ısı tutulur; Dünya’nın ortalama sıcaklığı yükselir.', key: 'Küresel ısınma' },
    { id: 'myth', pad: 0.8, min: 8, text: 'Yaygın bir yanılgı: “Küresel ısınmanın nedeni ozon deliğidir.” Hayır! Ozon incelmesi ayrı bir sorundur.', key: 'Tutarsızlığı bul' },
    // SAHNE 3 — Nedenler, karbon ayak izi
    { id: 'causes', pad: 0.5, text: 'Sera gazları neden artıyor? Bilim insanlarına göre asıl neden insan etkinlikleri.', key: 'Nedenler' },
    { id: 'fossil', pad: 0.6, text: 'Kömür, petrol ve doğal gaz yanınca havaya karbondioksit salınır. Kesilen ormanlar da artık onu tutamaz.', key: 'Fosil yakıtlar' },
    { id: 'footprint', pad: 0.5, text: 'Bir kişinin ya da kurumun havaya saldığı sera gazlarının ölçüsüne karbon ayak izi denir.', key: 'Karbon ayak izi' },
    { id: 'save', pad: 0.8, min: 8.5, text: 'Ulaşım, elektrik, yiyecek, giysi: Her tüketimin bir izi var. Tasarruf, izi de faturayı da küçültür.', key: 'Tasarruf' },
    // SAHNE 4 — Olası sonuçlar ve münazara
    { id: 'effects', pad: 0.8, min: 10, text: 'Olası sonuçlar: Buzullar erir, deniz yükselir; kuraklık, sel, orman yangınları sıklaşabilir. Tarım, su ve sağlık etkilenir.', key: 'Olası sonuçlar' },
    { id: 'debate', pad: 0.6, min: 10.5, text: 'Münazarada biri dedi ki: “Bu kış çok kar yağdı, Dünya ısınmıyor.” Tutarsız! Tek bir kış hava olayıdır, iklim değil.', key: 'Münazara' },
    { id: 'valid', pad: 0.8, text: 'Geçerli fikrimiz: Bugünkü ısınmanın asıl nedeni insan. Türkiye de Paris Anlaşması’yla çaba gösteriyor.', key: 'Geçerli fikir' },
    // SAHNE 5 — Ülkemizden bir problem: kuraklık
    { id: 'problem', pad: 0.5, min: 7.5, text: 'Ülkemizden bir problem seçtik: kuraklık. Bazı göllerimiz küçülüyor, barajlarda su azalıyor.', key: 'Problemi yapılandır' },
    { id: 'struct', pad: 0.5, min: 8, text: 'Nedenleri: azalan yağış, artan sıcaklık, suyun israfı. Etkileri: tarım, içme suyu, sağlık.' },
    { id: 'summary', pad: 0.6, text: 'Özetim: Isınan iklim ve bilinçsiz kullanım yüzünden su kaynaklarımız azalıyor.', key: 'Özetle' },
    { id: 'predict', pad: 0.6, text: 'Okulumuzun su sayacını bir hafta okuduk. Tahminim: Damlatan muslukları onarırsak tüketim azalır.', key: 'Tahmin yürüt' },
    { id: 'options', pad: 0.5, min: 9, text: 'Önerileri tartıyoruz: Etkili mi? Uygulanabilir mi? Yan etkisi var mı?', key: 'Önermeler' },
    { id: 'evaluate', pad: 0.6, text: 'Değerlendirmemiz: Musluk onarımı, yağmur suyu toplama ve damla sulama en güçlü öneriler.', key: 'Değerlendir' },
    { id: 'project', pad: 0.8, text: 'Sosyal sorumluluk projemizin adı: “Her Damla Değerli”. Sağlıklı bir çevre hepimizin hakkı ve sorumluluğu.', key: 'Sosyal sorumluluk' },
    // SAHNE 6 — Kaydet · Sıra sende
    { id: 'record', pad: 0.6, min: 9, text: 'Bulduklarımı gözlem defterime kaydediyorum.', key: 'Kaydet' },
    { id: 'task', pad: 0.8, min: 9, text: 'Sıra sende! Güvenilir bir siteden karbon ayak izini hesapla. Grubunla ülkemizden bir iklim sorunu seç, çözüm öner.' },
    // SAHNE 7 — FİNAL: dört yılın gözlem defteri
    { id: 'lookback', pad: 0.8, min: 14, text: 'Ve bu, defterimin son sayfası. Dört yıl önce Güneş’e bakarak başladık. Ay, hücreler, ışık, elektrik, uzay, DNA, ses...', key: 'Dört yılın defteri' },
    { id: 'thanks', pad: 0.8, min: 7, text: 'Her soruda birlikte gözlemledik, sorguladık, kanıt aradık. Yanımda olduğun için teşekkürler!' },
    { id: 'bye', pad: 1.2, min: 5, text: 'Merakını hiç kaybetme. Hoşça kal!' },
    { id: 'end', min: 7.5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
