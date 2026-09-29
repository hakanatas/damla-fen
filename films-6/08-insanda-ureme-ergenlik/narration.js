// narration.js — 6. sınıf Film 8: "İnsanda Üreme ve Ergenlik" (FB.6.3.5 · FB.6.3.8)
// Hassas konu: program düzeyinde, ders kitabı üslubunda, şematik ve saygılı anlatım.
const NARRATION = {
  film: '08-insanda-ureme-ergenlik',
  title: 'İnsanda Üreme ve Ergenlik',
  outcome: 'FB.6.3.5 · FB.6.3.8',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // S1 — Büyüme (köprü: kendi gelişimi)
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.6, min: 8, text: 'Merhaba, ben Damla! Kapıdaki çizgiler, bir çocuğun her yıl ne kadar uzadığını gösteriyor.', key: 'Büyüme ve gelişme' },
    { id: 'questions', pad: 0.8, min: 8, text: 'Yeni bir insan nasıl oluşur? Ergenliğe geçerken bedende ve duygularda neler değişir?', key: 'Soru sor' },
    // S2 — Eşey hücreleri ve döllenme
    { id: 'cells', pad: 0.5, text: 'İnsanlar eşeyli ürer. Anneden gelen eşey hücresi yumurta, babadan gelen ise spermdir.', key: 'Eşey hücreleri' },
    { id: 'compare', pad: 0.6, text: 'Yumurta büyüktür, hareket etmez ve besin depolar. Sperm çok küçüktür ve kuyruğuyla hareket eder.' },
    { id: 'fert', pad: 0.8, min: 8, text: 'Sperm ile yumurtanın birleşmesine döllenme denir. Böylece zigot adlı ilk hücre oluşur.', key: 'Döllenme → zigot' },
    // S3 — Üreme yapı ve organları (poster)
    { id: 'female', pad: 0.5, min: 9, text: 'Posterde dişi üreme sistemi var. Yumurtalıklar yumurtayı üretir; yumurta kanalı onu rahime taşır.', key: 'Üreme organları' },
    { id: 'uterus', pad: 0.6, text: 'Döllenme genellikle yumurta kanalında olur. Bebek rahimde gelişir. Dölyolu doğum kanalıdır.' },
    { id: 'male', pad: 0.8, min: 10, text: 'Erkek üreme sisteminde testisler spermi üretir. Sperm kanalları taşır, salgı bezleri sıvı ekler, üretra dışarı iletir.', key: 'Organlar arası ilişki' },
    // S4 — Âdet döngüsü
    { id: 'cycle', pad: 0.5, min: 8.5, text: 'Ergenlikten sonra yumurtalıklar yaklaşık ayda bir yumurta bırakır. Rahim duvarı da kalınlaşır.', key: 'Âdet döngüsü' },
    { id: 'period', pad: 0.9, text: 'Döllenme olmazsa bu duvar, birkaç gün süren kanamayla atılır. Döngü ortalama 28 gündür.' },
    // S5 — Zigottan bebeğe (bilgi haritası)
    { id: 'develop', pad: 0.5, min: 9, text: 'Döllenme olursa zigot bölünür ve embriyo oluşur. Yaklaşık sekiz haftadan sonra ona fetüs denir.', key: 'Zigot → embriyo → fetüs' },
    { id: 'baby', pad: 1.0, min: 7.5, text: 'Fetüs rahimde yaklaşık dokuz ay gelişir ve bebek olarak doğar. İşte bilgi haritam!', key: 'Bilgi haritası' },
    // S6 — Ergenlik: kavram karikatürü, tahmin, bilgi toplama
    { id: 'puberty', pad: 0.6, min: 9, text: 'Çocukluktan yetişkinliğe geçiş dönemine ergenlik denir. Üç arkadaş tartışıyor. Sence hangisi doğru?', key: 'Ergenlik' },
    { id: 'gather', pad: 0.8, text: 'Tahminleri güvenilir kaynaklarla sınayalım: ders kitabı, rehber öğretmen ve sağlık uzmanı.', key: 'Bilgi topla' },
    // S7 — Değişimler: ortak olan / ortak olmayan
    { id: 'common', pad: 0.5, min: 8.5, text: 'Herkeste boy uzar, kilo artar. Ter ve yağ bezleri daha çok çalışır, kıllanma başlar.', key: 'Ortak değişimler' },
    { id: 'emotions', pad: 0.5, text: 'Duygular çabuk değişebilir. Arkadaşlık önem kazanır, bağımsızlık isteği artar.', key: 'Ruhsal değişimler' },
    { id: 'different', pad: 1.0, min: 9, text: 'Kızlarda göğüsler gelişir, âdet döngüsü başlar. Erkeklerde ses kalınlaşır, sakal ve bıyık çıkar.', key: 'Ortak olmayanlar' },
    // S8 — Genelleme, tahminlere dönüş, saygı
    { id: 'pattern', pad: 0.6, min: 8.5, text: 'Örüntü şu: Ergenlik herkeste olur; ama başlama zamanı ve hızı kişiden kişiye değişir.', key: 'Genelleme' },
    { id: 'answers', pad: 0.6, min: 8.5, text: 'Yani ergenlik herkeste aynı yaşta başlamaz. Sivilce yalnızca kirden çıkmaz. Değişimler normaldir!' },
    { id: 'respect', pad: 1.0, text: 'Farklılıklarla alay edilmez. Herkesin bedeni kendine özeldir; mahremiyete saygı gösteririz.', key: 'Saygı ve mahremiyet' },
    // S9 — Sağlıklı ergenlik
    { id: 'healthy', pad: 0.5, min: 10, text: 'Sağlıklı bir ergenlik için her gün yıkanırım, dengeli beslenirim, hareket ederim ve yeterince uyurum.', key: 'Ergen sağlığı' },
    { id: 'talk', pad: 1.0, text: 'Aklıma takılan bir şeyi ailemle, rehber öğretmenimle ya da doktorla konuşurum.', key: 'Güvenilir yetişkin' },
    // S10 — Sıra sende · Sıradaki · Bitiş
    { id: 'task', pad: 0.8, min: 8.5, text: 'Sıra sende! Ergenliği sağlıklı geçirmek için neler yapılabilir? Arkadaşlarınla bir poster hazırla.', key: 'Sıra sende' },
    { id: 'next', pad: 1.0, min: 5.5, text: 'Sıradaki gözlemim: vücudumuzun haberleşme ağı, sinir sistemi.' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
