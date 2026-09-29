// narration.js — Film 22: "Devrenin Ortak Dili: Semboller"  (Maarif FB.5.6.1)
// Tek düzenlenebilir metin kaynağı. Sessiz sürüm: text = altyazı.
const NARRATION = {
  film: '22-devre-elemanlari',
  title: 'Devrenin Ortak Dili: Semboller',
  outcome: 'FB.5.6.1 Bir elektrik devresindeki elemanları sembollerinin olup olmamasına göre sınıflandırabilme',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Giriş: devreyi resim gibi çizmek çok uzun sürer
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.8, text: 'Merhaba! Ben Damla. Dün pille çalışan küçük bir lamba devresi kurdum.' },
    { id: 'draw', pad: 0.4, min: 7.5, text: 'Arkadaşım da aynısını kurmak istedi. Devremi ona çizerek anlatayım dedim...' },
    { id: 'slow', pad: 0.8, text: 'Ama her parçayı resim gibi çizmek çok uzun sürdü!' },
    // SAHNE 2 — Merak: ortak dil
    { id: 'confuse', pad: 0.8, min: 8, text: 'Üstelik herkes aynı pili farklı çiziyor. Hangisi ne? Kafalar karışabilir.', key: 'Soru sor' },
    { id: 'daily', pad: 0.8, text: 'Günlük hayatta sembolleri hep kullanırız. Trafik levhalarını herkes aynı biçimde anlar.', key: 'Sembol' },
    { id: 'common', pad: 1.0, text: 'Devre elemanlarının da sembolleri vardır. Semboller, bilimin ortak dilidir.', key: 'Ortak bilimsel dil' },
    // SAHNE 3 — Güvenlik
    { id: 'safe1', pad: 0.8, text: 'Önce güvenlik! Prizlerle asla oynamayız. Deneylerde yalnızca pil kullanırız.', key: 'Güvenlik' },
    { id: 'safe2', pad: 1.0, text: 'Pilin iki ucunu tek kabloyla birleştirmeyiz. Pil ısınır, zarar verir. Bir yetişkin eşliğinde çalışırız.' },
    // SAHNE 4 — Devre elemanları
    { id: 'parts', pad: 0.4, text: 'Şimdi devremin elemanlarını masaya dizelim.', key: 'Devre elemanları' },
    { id: 'list', pad: 0.6, min: 8, text: 'Pil, ampul, anahtar, bağlantı kablosu, duy ve pil yatağı.' },
    { id: 'game', pad: 0.8, text: 'Hangisinin sembolü var? Kart eşleştirme oyunuyla bulalım!', key: 'Kart eşleştirme' },
    // SAHNE 5 — Eşleştirme (sembolleri belirler)
    { id: 'm-pil', pad: 0.4, min: 6.2, text: 'Pilin sembolü: biri uzun, biri kısa iki paralel çizgi.' },
    { id: 'm-ampul', pad: 0.4, min: 5.6, text: 'Ampulün sembolü: içinde çarpı olan bir daire.' },
    { id: 'm-anahtar', pad: 0.4, min: 6.4, text: 'Anahtarın sembolü, gerçek anahtar gibi açık ya da kapalı çizilir.' },
    { id: 'm-kablo', pad: 0.4, min: 5.2, text: 'Bağlantı kablosu ise düz bir çizgiyle gösterilir.' },
    { id: 'm-none', pad: 1.0, min: 6.5, text: 'Peki duy ve pil yatağı? Onlara uyan bir sembol kartı yok!' },
    // SAHNE 6 — Ayrıştır ve grupla
    { id: 'sort', pad: 0.6, min: 8.5, text: 'Elemanları ayıralım: sembolü olanlar bir gruba, olmayanlar öbür gruba.', key: 'Ayrıştır ve grupla' },
    { id: 'why', pad: 1.0, text: 'Duy ampulü, pil yatağı da pili tutar. Şemada yalnızca ampulü ve pili çizeriz.' },
    // SAHNE 7 — Etiketle + devre şeması
    { id: 'l-pil', pad: 1.0, text: 'Sembolleri etiketleyelim. Pilde uzun çizgi artı (+), kısa çizgi eksi (−) kutbu gösterir.', key: 'Etiketle' },
    { id: 'l-anahtar', pad: 0.8, text: 'Açık anahtar devreyi keser. Kapalı anahtar devreyi tamamlar.' },
    { id: 'l-kablo', pad: 0.8, text: 'Kablolar şemada düz çizilir. Köşelerde dik açıyla döner.' },
    { id: 'schema', pad: 0.8, min: 9, text: 'Sembolleri birleştirince devre şeması oluşur. Devremi artık saniyeler içinde çizebiliyorum!', key: 'Devre şeması' },
    { id: 'world', pad: 1.2, text: 'Bu şemayı dünyanın her yerinde herkes aynı biçimde okur.' },
    // SAHNE 8 — Kaydet + Sıra sende
    { id: 'record', pad: 0.6, min: 9, text: 'Bulduklarımı gözlem defterime bir afiş gibi kaydedeyim.', key: 'Kaydet' },
    { id: 'yourturn', pad: 1.0, text: 'Sıra sende! Eleman ve sembol kartları hazırla. Arkadaşınla eşleştirme oyunu oyna, sonra bir afiş yap.', key: 'Sıra sende!' },
    // SAHNE 9 — Sonraki film
    { id: 'next', pad: 1.4, text: 'Sıradaki gözlemim: şemasını çizdiğim devreyi kurup deney yapacağım!' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
