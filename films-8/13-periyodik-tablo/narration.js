// narration.js — 8. sınıf Film 13: "Periyodik Tablonun Haritası"  (Maarif FB.8.5.1)
// Tek düzenlenebilir metin kaynağı. Sessiz film: text altyazı olarak görünür.
const NARRATION = {
  film: '13-periyodik-tablo',
  title: 'Periyodik Tablonun Haritası: Metal, Ametal, Yarımetal, Soy Gaz',
  outcome: 'FB.8.5.1',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.5, text: 'Merhaba! Masamda renksiz bir periyodik tablo ve dört kalem var.' },
    { id: 'q', pad: 0.5, text: 'Elementleri özelliklerine göre dört sınıfa ayırabilir miyim?', key: 'Element sınıfları' },
    { id: 'classes', pad: 0.6, min: 5, text: 'Bu sınıflar: metaller, ametaller, yarımetaller ve soy gazlar.' },
    // SAHNE 2 — Nitelikleri tanımla (dört örnek)
    { id: 'metal', pad: 0.4, text: 'Bakır bir metaldir: parlaktır, ısıyı ve elektriği iyi iletir, tel ve levha hâline getirilebilir.', key: 'Metal' },
    { id: 'metal2', pad: 0.6, text: 'Oda koşullarında cıva hariç hepsi katıdır. Erime noktaları genellikle yüksektir.' },
    { id: 'ametal', pad: 0.4, text: 'Kükürt bir ametaldir: mattır, ısıyı ve elektriği iletmez, kırılgandır.', key: 'Ametal' },
    { id: 'ametal2', pad: 0.6, text: 'Ametaller katı, sıvı ya da gaz olabilir. Erime ve kaynama noktaları genellikle düşüktür.' },
    { id: 'yari', pad: 0.6, text: 'Silisyum bir yarımetaldir: parlaktır ama kırılgandır. Elektriği metallerden az, ametallerden iyi iletir.', key: 'Yarımetal' },
    { id: 'soy', pad: 0.6, text: 'Neon bir soy gazdır. Soy gazlar oda koşullarında gazdır ve tek atomlu hâlde bulunur.', key: 'Soy gaz' },
    { id: 'grid', pad: 0.6, min: 6, text: 'Özellikleri tabloya işaretleyince sınıflar birbirinden ayrışıyor.', key: 'Ayrıştır' },
    // SAHNE 3 — Elektron dizilimi: Na, Cl, Ar
    { id: 'why', pad: 0.4, text: 'Neden farklı davranırlar? Sodyum, klor ve argonun elektron dizilimine bakalım.', key: 'Elektron dizilimi' },
    { id: 'argon', pad: 0.5, text: 'Argon: 2, 8, 8. Son katmanı dolu; soy gazlar kendi başlarına kararlıdır.' },
    { id: 'na', pad: 0.5, min: 6.5, text: 'Sodyum: 2, 8, 1. Son katmandaki tek elektronu verir ve artı yüklü iyon olur.', key: 'Elektron verir' },
    { id: 'cl', pad: 0.5, min: 6.5, text: 'Klor: 2, 8, 7. Bir elektron alır ve eksi yüklü iyon olur. İkisi de kararlı hâle gelir.', key: 'Elektron alır' },
    { id: 'trend', pad: 0.8, text: 'Metaller genellikle elektron verir, ametaller ise elektron alır.' },
    // SAHNE 4 — Tabloyu boya (gruplandır)
    { id: 'paint', pad: 0.4, min: 7, text: 'Şimdi tabloyu boyayalım. Metaller solda ve ortada; en kalabalık sınıf onlar.', key: 'Gruplandır' },
    { id: 'place2', pad: 0.4, min: 6, text: 'Ametaller sağ üstte. Merdiven çizgisinin iki yanında yarımetaller var.' },
    { id: 'noble', pad: 0.5, text: 'Soy gazlar en sağda, 8A grubunda. Onlar da ametaldir ama ayrı ele alınır.' },
    { id: 'hyd', pad: 0.8, text: 'Dikkat! Hidrojen 1A grubunda ama metal değil; bir ametaldir.', key: 'H bir ametal!' },
    // SAHNE 5 — İlk 18 elementi etiketle
    { id: 'first', pad: 0.4, text: 'İlk 18 elemente bakalım. Katman sayısı periyodu, son katmandaki elektron sayısı grubu verir.', key: 'Etiketle' },
    { id: 'mg', pad: 0.4, min: 7, text: 'Magnezyum: 2, 8, 2. Üç katman: 3. periyot. Son katmanda iki elektron: 2A grubu. Metal!' },
    { id: 'labels', pad: 0.4, min: 8, text: 'Hepsini etiketledim. Aynı gruptaki elementler genellikle benzer kimyasal özellikler gösterir.' },
    // SAHNE 6 — Kimler birleşir?
    { id: 'alloy', pad: 0.4, text: 'Metaller kendi aralarında bileşik oluşturmaz; alaşım denen homojen karışımlar oluşturur.', key: 'Alaşım' },
    { id: 'bonds', pad: 0.8, min: 9, text: 'Ametaller hem kendi aralarında hem metallerle bağ yapar. Soy gazlar sıradan koşullarda bileşik oluşturmaz.' },
    // SAHNE 7 — Kaydet · Sıra sende · Sıradaki
    { id: 'record', pad: 0.4, min: 10, text: 'Bulduklarımı gözlem defterime kaydedeyim.', key: 'Kaydet' },
    { id: 'task', pad: 0.6, min: 7, text: 'Sıra sende! Renksiz bir periyodik tabloyu dört renkle boya ve bir renk anahtarı ekle.' },
    { id: 'next', pad: 0.8, text: 'Sıradaki gözlemim: Maddeler nasıl değişir? Fiziksel ve kimyasal değişimler!' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
