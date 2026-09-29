// narration.js — 8. sınıf Film 23: "Elektriği Bilinçli Kullanalım"  (Maarif FB.8.6.10)
// Tek düzenlenebilir metin kaynağı. Sessiz film: text altyazı olarak görünür.
const NARRATION = {
  film: '23-elektrik-tasarrufu',
  title: 'Elektriği Bilinçli Kullanalım',
  outcome: 'FB.8.6.10',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.6, min: 6, text: 'Merhaba! Akşam eve döndüm. Kimsenin olmadığı odalarda lambalar yanıyor, televizyon da bekleme modunda.' },
    { id: 'q', pad: 0.8, text: 'Elektriği nasıl kullanıyoruz? Bilinçli ve tasarruflu kullanmak neden önemli?', key: 'Soru sor' },
    // SAHNE 2 — Bilgi topla
    { id: 'research', pad: 0.4, min: 6, text: 'Güvenilir kaynaklardan bilgi topladım. İlk bulgum: Boş odada lamba yanmasın, çıkarken ışığı kapat!', key: 'Bilgi topla' },
    { id: 'led', pad: 0.4, min: 6, text: 'Ampuller de farklı! Akkor ampul, elektrik enerjisinin büyük kısmını ısıya dönüştürür.', key: 'Akkor · LED' },
    { id: 'led2', pad: 0.8, min: 5.5, text: 'LED ampul ise aynı aydınlığı çok daha az elektrik enerjisiyle sağlar.' },
    { id: 'standby', pad: 0.4, min: 6, text: 'Bekleme modundaki aletler de elektrik harcar. Kullanmadığımız aletin fişini çekeriz.', key: 'Bekleme modu' },
    { id: 'plug', pad: 0.8, min: 6, text: 'Güvenlik için fişi kablosundan değil, fişin kendisinden tutarak çekeriz. Islak elle asla dokunmayız!', key: 'Güvenlik' },
    { id: 'label', pad: 0.8, min: 7, text: 'Yeni bir alet alırken enerji etiketine bakarız. A sınıfına yaklaştıkça alet aynı işi daha az enerjiyle yapar.', key: 'Enerji etiketi' },
    { id: 'habits', pad: 0.8, min: 8, text: 'Buzdolabının kapağını açık bırakmayız. Çamaşır makinesini tam dolu çalıştırırız. Gün ışığından yararlanırız.', key: 'Tasarruf alışkanlıkları' },
    // SAHNE 3 — Altı şapkalı düşünme (a)
    { id: 'hats', pad: 0.4, min: 6, text: 'Sınıfta altı şapkalı düşünme tekniğiyle tartıştık. Her şapka başka bir bakış açısı.', key: 'Altı şapka' },
    { id: 'hats2', pad: 0.8, min: 13, text: 'Beyaz veriler, kırmızı duygular, siyah riskler, sarı faydalar, yeşil yeni fikirler; mavi de özetler.' },
    // SAHNE 4 — Görüş ve mantıksal çelişkiler (a, b)
    { id: 'myview', pad: 0.6, text: 'Benim görüşüm: Tasarruf önemli, çünkü elektrik üretirken kaynaklar kullanılıyor ve çevre etkileniyor.', key: 'Görüşünü sun' },
    { id: 'friend', pad: 0.4, text: 'Bir arkadaşım dedi ki: “Tek bir lambayı kapatmakla ne değişir ki?”', key: 'Çelişkiyi bul' },
    { id: 'contra', pad: 0.6, min: 6.5, text: 'Ama milyonlarca evde birer lamba kapanırsa? Küçük tasarruflar birleşince büyür.' },
    { id: 'friend2', pad: 0.4, text: 'Bir başkası: “Tasarruf, karanlıkta oturmak demek.” Bu da mantıklı değil!' },
    { id: 'contra2', pad: 0.8, text: 'Tasarruf; ihtiyacımız kadar kullanmak, israf etmemek demektir. Güvenli aydınlatmadan vazgeçmeyiz.' },
    // SAHNE 5 — Aile ve ülke ekonomisine katkı (c)
    { id: 'family', pad: 0.6, min: 6, text: 'Tasarruf aile bütçesine katkı sağlar: Fatura azalır, para başka ihtiyaçlara kalır.', key: 'Aile ekonomisi' },
    { id: 'country', pad: 0.6, min: 6.5, text: 'Ülkemiz enerji kaynaklarının önemli bir kısmını dışarıdan alır. Tasarruf, ülke ekonomisine de katkı sağlar.', key: 'Ülke ekonomisi' },
    { id: 'nature', pad: 0.8, text: 'Daha az yakıt yakılır, doğa daha az kirlenir. Kaynaklar gelecek nesillere de kalır.', key: 'Sürdürülebilirlik' },
    // SAHNE 6 — Kaydet · Sıra sende · Sıradaki
    { id: 'record', pad: 0.6, min: 9.5, text: 'Bulduklarımı gözlem defterime kaydediyorum.', key: 'Kaydet' },
    { id: 'task', pad: 0.6, min: 7.5, text: 'Sıra sende! Bir hafta ailenle enerji dedektifi ol: israfı not et, birlikte bir tasarruf planı hazırlayın.' },
    { id: 'next', pad: 0.8, text: 'Enerji dönüşümleri canlılarda da var. Sıradaki gözlemim: Bitkiler ışık enerjisini nasıl kullanır? Fotosentez!' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
