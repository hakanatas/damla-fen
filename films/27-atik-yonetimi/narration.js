// narration.js — Film 27: "Atık Yönetimi ve Sıfır Atık"  (Maarif FB.5.7.3) — 5. sınıf serisinin finali
// Tek düzenlenebilir metin kaynağı. Her "beat" bir anlatım cümlesidir (sessiz sürüm: altyazı).
const NARRATION = {
  film: '27-atik-yonetimi',
  title: 'Atık Yönetimi ve Sıfır Atık',
  outcome: 'FB.5.7.3 Yakın çevresinde atık yönetiminin uygulanabilirliğine ilişkin deneyimlerini yansıtabilme',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.6, text: 'Merhaba! Bu hafta evde ve okulda atıklarımı not ettim.' },
    { id: 'question', pad: 0.8, text: 'Atıklarımızı nasıl yönetiyoruz? Daha iyisini yapabilir miyiz?', key: 'Soru sor' },
    // SAHNE 2 — Atık yönetimi ve Sıfır Atık hiyerarşisi
    { id: 'manage', pad: 0.6, text: 'Atık oluşmadan önce başlayıp uzaklaştırılmasına kadar süren işlerin hepsine atık yönetimi denir.', key: 'Atık yönetimi' },
    { id: 'pyramid', pad: 0.6, min: 8, text: 'Sıfır Atık hiyerarşisi, en iyi yoldan en son çareye doğru sıralanır.', key: 'Sıfır atık hiyerarşisi' },
    { id: 'prevent', pad: 0.6, min: 9.5, text: 'İlk ve en önemli adım önlemek, sonra azaltmak: Gereksiz ürün almamak, az ambalajlı ürün seçmek.', key: 'Önleme' },
    { id: 'reuse', pad: 0.6, text: 'Yeniden kullanım: Bir eşyayı atmadan tekrar kullanmak. Cam kavanozu yıkayıp yeniden doldurmak gibi.', key: 'Yeniden kullanım' },
    { id: 'recycle', pad: 0.6, text: 'Geri dönüşüm: Atık işlenir, ham maddeye dönüşür. Eski şişelerden yeni şişe yapılır.', key: 'Geri dönüşüm' },
    { id: 'recover', pad: 0.6, text: 'Geri kazanım: Atıktan kompost ya da enerji gibi yararlı bir şey elde etmek.', key: 'Geri kazanım' },
    { id: 'dispose', pad: 0.8, text: 'Uzaklaştırma en son çaredir: Kullanılamayan atık, düzenli depolama alanına gönderilir.', key: 'Uzaklaştırma' },
    // SAHNE 3 — İleri dönüşüm ve atıktan sanata
    { id: 'upcycle', pad: 0.6, text: 'Bir de ileri dönüşüm var: Atıktan daha değerli, yeni bir ürün yapmak.', key: 'İleri dönüşüm' },
    { id: 'compare', pad: 0.6, min: 11, text: 'Kavanozu yine kavanoz olarak kullanmak yeniden kullanımdır. Eski kottan çanta dikmek ise ileri dönüşümdür.' },
    { id: 'art', pad: 0.8, min: 9, text: 'İleri dönüşüm sanatta da yer bulur. Sanatçılar şişe kapaklarından kocaman resimler yapar.', key: 'Atıktan sanata' },
    // SAHNE 4 — Deneyimlerimi yansıtıyorum
    { id: 'diary', pad: 0.6, min: 11, text: 'Şimdi kendi haftamı gözden geçireyim. Pet şişe su aldım, kâğıtların yarısını boş attım.', key: 'Gözden geçir' },
    { id: 'inference', pad: 0.8, text: 'Çıkarımım: Matara taşırsam şişe atığı hiç oluşmaz. Önlemek, geri dönüşümden de iyidir!', key: 'Çıkarım' },
    { id: 'buzz', pad: 0.6, min: 9, text: 'Sınıfta vızıltı gruplarıyla tartıştık. Hangi fikirler okulumuzda uygulanabilir?', key: 'Grup tartışması' },
    { id: 'evaluate', pad: 0.8, min: 8, text: 'Fikirleri değerlendirdik: Sınıfa kâğıt kutusu koymak hemen uygulanabilir!', key: 'Değerlendir' },
    { id: 'sustain', pad: 1.0, text: 'Atık yönetimi yalnızca temizlik değildir. Kaynakları gelecek nesillere bırakmanın, yani sürdürülebilirliğin parçasıdır.', key: 'Sürdürülebilirlik' },
    // SAHNE 5 — Yılın defteri (final)
    { id: 'record', pad: 0.6, text: 'Bunu da gözlem defterime yazdım. Bu, 5. sınıf defterimin son sayfası!' },
    { id: 'lookback', pad: 0.8, min: 14, text: 'Bu yıl neler öğrendik? Güneş ve Ay, kuvvet, hücre, ışık, madde ve ısı, elektrik ve geri dönüşüm!', key: 'Bir yılın defteri' },
    { id: 'thanks', pad: 1.0, text: 'Her soruda birlikte gözlem yaptık, araştırdık, çıkarım yaptık. Teşekkürler!' },
    // SAHNE 6 — Sıra sende + veda
    { id: 'task', pad: 0.8, text: 'Sıra sende! Bir hafta atık günlüğü tut. Neleri önleyebilir, azaltabilir, yeniden kullanabilirsin?' },
    { id: 'bye', pad: 0.8, text: 'Merakını hiç kaybetme. Görüşmek üzere!' },
    { id: 'end', min: 7, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
