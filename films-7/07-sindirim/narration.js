// narration.js — 7. sınıf Film 7: "Besinlerin Yolculuğu: Sindirim Sistemi" (FB.7.3.1 · FB.7.3.2)
const NARRATION = {
  film: '07-sindirim',
  title: 'Besinlerin Yolculuğu: Sindirim Sistemi',
  outcome: 'FB.7.3.1 · FB.7.3.2',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // S1 — Merak ve beyin fırtınası
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'apple', pad: 0.6, min: 7, text: 'Merhaba, ben Damla! Arkadaşım Ela bir elma ısırdı. Bu lokma vücutta nereye gidiyor?', key: 'Soru sor' },
    { id: 'storm', pad: 0.8, min: 7.5, text: 'Beyin fırtınası yapalım: ağız, mide, bağırsak... Bu yolculukta başka hangi yapılar var?', key: 'Beyin fırtınası' },
    // S2 — Model: sindirim kanalı
    { id: 'def', pad: 0.5, text: 'Besinlerin, hücrelerin kullanabileceği küçük parçalara ayrılmasına sindirim denir.', key: 'Sindirim' },
    { id: 'canal', pad: 0.5, min: 8, text: 'Besinler sindirim kanalında ilerler. Bu kanal ağızda başlar, anüste biter.', key: 'Sindirim kanalı' },
    { id: 'mouth', pad: 0.5, text: 'Ağızda dişler besini parçalar, dil karıştırır. Tükürük besini ıslatır ve yumuşatır.', key: 'Ağız' },
    { id: 'esoph', pad: 0.5, text: 'Yutkununca lokma yutaktan yemek borusuna geçer. Yemek borusu kasılarak lokmayı mideye iter.', key: 'Yutak · Yemek borusu' },
    { id: 'stomach', pad: 0.5, text: 'Mide kaslı bir torbadır. Besini karıştırır; mide öz suyu sindirime yardım eder.', key: 'Mide' },
    { id: 'small', pad: 0.5, text: 'İnce bağırsakta sindirim tamamlanır. Küçülen besin parçaları buradan kana geçer.', key: 'İnce bağırsak' },
    { id: 'large', pad: 0.9, text: 'Kalın bağırsak suyun bir kısmını emer. Sindirilmeyen artıklar anüsten dışarı atılır.', key: 'Kalın bağırsak · Anüs' },
    // S3 — Yardımcı organlar
    { id: 'liver', pad: 0.5, text: 'Sindirime yardımcı organlar da var. Karaciğer safra üretir; safra yağları küçük damlacıklara ayırır.', key: 'Karaciğer' },
    { id: 'pancreas', pad: 0.5, text: 'Pankreas, ince bağırsağa sindirim enzimleri gönderir.', key: 'Pankreas' },
    { id: 'notpass', pad: 0.9, text: 'Dikkat! Besinler bu iki organın içinden geçmez. Salgıları ince bağırsağa gelir.', key: 'Yardımcı organlar' },
    // S4 — Enzim, fiziksel ve kimyasal sindirim
    { id: 'enzyme', pad: 0.5, text: 'Enzimler, besinlerin parçalanmasını hızlandıran özel maddelerdir.', key: 'Enzim' },
    { id: 'physical', pad: 0.5, min: 7.5, text: 'Fiziksel sindirimde besin küçük parçalara ayrılır ama yapısı değişmez. Çiğnemek gibi.', key: 'Fiziksel sindirim' },
    { id: 'chemical', pad: 0.9, min: 8, text: 'Kimyasal sindirimde enzimler besini yapısı farklı, çok küçük maddelere dönüştürür.', key: 'Kimyasal sindirim' },
    // S5 — Kaydet
    { id: 'record', pad: 0.9, min: 11, text: 'Model üzerindeki gözlemlerimi defterime kaydediyorum: yapı ve görevi.', key: 'Kaydet' },
    // S6 — Sağlık: örnek olay, araçlar, doğrulama
    { id: 'case', pad: 0.6, min: 8, text: 'Örnek olay: Arda kahvaltıyı atlıyor, ekran başında hızlı hızlı atıştırıyor ve az su içiyor.', key: 'Örnek olay' },
    { id: 'tools', pad: 0.5, min: 8, text: 'Bu durum sindirimi nasıl etkiler? Araçlarımı seçiyorum: güvenilir resmî siteler, basılı kaynaklar ve bir uzman.', key: 'Bilgi toplama araçları' },
    { id: 'verify', pad: 0.8, text: 'Bulduklarımı doğruluyorum: kaynakları karşılaştırıyor, öğretmenime ve bir diyetisyene danışıyorum.', key: 'Doğrula' },
    // S7 — Doğru davranışlar
    { id: 'habits', pad: 0.5, min: 9, text: 'Yanlışları doğrularla değiştirelim: düzenli ve dengeli beslen, yavaş çiğne, yeterince su iç.', key: 'Sağlıklı beslenme' },
    { id: 'active', pad: 0.9, min: 8, text: 'Spor ve sosyal etkinlikler sindirime iyi gelir. Teknoloji bağımlılığı ise hareketsizliğe yol açar.', key: 'Hareketli yaşam' },
    // S8 — Sıra sende · Sıradaki · Bitiş
    { id: 'task', pad: 0.8, min: 8.5, text: 'Sıra sende! Kumaş ve kâğıt gibi yeniden kullanılabilir malzemelerle bir sindirim sistemi posteri hazırla.', key: 'Sıra sende' },
    { id: 'next', pad: 1.0, min: 5.5, text: 'Sıradaki gözlemim: vücudumuzun taşıma ağı, dolaşım sistemi.' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
