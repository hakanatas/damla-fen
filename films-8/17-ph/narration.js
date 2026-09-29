// narration.js — 8. sınıf Film 17: "pH Cetveli ve Asit-Bazların Etkileri"  (Maarif FB.8.5.7 · FB.8.5.8)
// Tek düzenlenebilir metin kaynağı. Sessiz film: text altyazı olarak görünür.
const NARRATION = {
  film: '17-ph',
  title: 'pH Cetveli ve Asit-Bazların Etkileri',
  outcome: 'FB.8.5.7 · FB.8.5.8',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.3, min: 6, text: 'Limon suyu da sirke de asit. Ama ikisi aynı derecede mi asidik?', key: 'Asitlik derecesi' },
    { id: 'hello2', pad: 0.5, min: 6.5, text: 'Mor lahana suyunda renk tonları farklıydı. Bu bir ipucu olabilir!' },
    // SAHNE 2 — pH cetveli, veri, örüntü, genelleme
    { id: 'scale', pad: 0.3, min: 7, text: 'Asitlik ve bazlığı karşılaştırmak için pH cetvelini kullanırız. Cetvel 0’dan 14’e kadardır.', key: 'pH cetveli' },
    { id: 'measure', pad: 0.3, min: 6, text: 'pH değerini pH kâğıdıyla ya da elektronik pH metreyle ölçebiliriz.', key: 'pH ölçümü' },
    { id: 'data', pad: 0.3, min: 8, text: 'Yaklaşık değerler: limon suyu 2, sirke 3, yoğurt 4,5, süt 6,5.', key: 'Veri' },
    { id: 'data2', pad: 0.4, min: 8, text: 'Saf su 7, karbonatlı su 8,3, sabunlu su 10, çamaşır suyu 12,5.' },
    { id: 'pattern', pad: 0.3, min: 7, text: 'Örüntüyü görüyor musun? Asit olduğunu bildiğim maddeler hep 7’nin altında, bazlar 7’nin üstünde.', key: 'Örüntü' },
    { id: 'general', pad: 0.3, min: 7, text: 'Genelleme: pH 7’den küçükse asit, 7 ise nötr, 7’den büyükse bazdır.', key: 'Genelleme' },
    { id: 'strength', pad: 0.6, min: 7, text: '7’den 0’a gittikçe asitlik artar; 7’den 14’e gittikçe bazlık artar.' },
    // SAHNE 3 — Etiketler
    { id: 'label', pad: 0.6, min: 7, text: 'Ambalajlara bak! Bu şampuanda pH 5,5, bu içme suyunda pH 7,4 yazıyor.', key: 'Etiketteki pH' },
    // SAHNE 4 — Problem ve hipotez
    { id: 'problem', pad: 0.3, min: 7, text: 'Bir sorun: Mermer tezgâha limon suyu damladı, yerinde mat bir leke kaldı. Neden?', key: 'Problem' },
    { id: 'hypo', pad: 0.5, text: 'Hipotezim: Asitler mermerle tepkimeye girer. Bunu sınamak için deney tasarlayayım.', key: 'Hipotez' },
    // SAHNE 5 — Deney
    { id: 'safety', pad: 0.3, min: 8, text: 'Yalnızca sirke gibi tehlikesiz maddeler kullanırım. Gözlük, eldiven ve öğretmen eşliği şart!', key: 'Güvenlik' },
    { id: 'design', pad: 0.3, min: 8, text: 'Mermer parçası, yumurta kabuğu ve demir çiviyi ikişer behere koydum: birine sirke, birine su.', key: 'Deney tasarla' },
    { id: 'vars', pad: 0.3, min: 7, text: 'Değiştirdiğim tek şey sıvının türü. Parça boyutu, sıvı miktarı ve süre aynı.', key: 'Değişkenler' },
    { id: 'observe', pad: 0.3, min: 7, text: 'Sirkedeki mermerde ve yumurta kabuğunda kabarcıklar çıktı. Sudakilerde değişim yok.' },
    { id: 'weigh', pad: 0.3, min: 9, text: 'Üç gün sonra tarttım: Sirkedeki mermer 10,0 gramdan 9,2 grama indi. Sudaki hâlâ 10,0 gram.', key: 'Ölçme ve veri' },
    { id: 'nail', pad: 0.6, min: 7, text: 'Çivinin yüzeyi de aşındı. Hipotezim desteklendi: asitler metallerle ve mermerle tepkimeye girer.' },
    // SAHNE 6 — Bazlar, saklama, karıştırma uyarısı
    { id: 'base', pad: 0.3, min: 8, text: 'Bazlar ise genellikle cam, porselen ve seramikle tepkimeye girer. Bardakların zamanla matlaşması bir örnektir.', key: 'Bazların etkisi' },
    { id: 'store', pad: 0.3, min: 7, text: 'Bu yüzden asitleri metal kaplarda, güçlü bazları cam kaplarda uzun süre saklamayız.', key: 'Saklama' },
    { id: 'chem', pad: 0.3, text: 'Bu olayların hepsi kimyasal tepkimedir: yeni maddeler oluşur.' },
    { id: 'mix', pad: 0.6, min: 7.5, text: 'Önemli uyarı: Temizlik ürünlerini asla karıştırma! Çamaşır suyu ile tuz ruhu zehirli gaz oluşturur.', key: 'Asla karıştırma!' },
    // SAHNE 7 — Kaydet · Sıra sende · Sıradaki
    { id: 'record', pad: 0.3, min: 8.5, text: 'Bulduklarımı gözlem defterime kaydedeyim.', key: 'Kaydet' },
    { id: 'task', pad: 0.4, min: 6.5, text: 'Sıra sende! Etiketlerde pH değerlerini ara, 0–14 arası renkli bir pH cetveli posteri hazırla.' },
    { id: 'next', pad: 0.6, text: 'Sıradaki gözlemim: Elektriğin yolculuğu! İki ampulü seri ya da paralel bağlarsam hangisi daha parlak yanar?' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
