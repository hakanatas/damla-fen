// narration.js — 7. sınıf Film 17: "Bileşiklerin Dili: Formüller"  (Maarif FB.7.5.7)
const NARRATION = {
  film: '17-bilesik-formulleri',
  title: 'Bileşiklerin Dili: Formüller',
  outcome: 'FB.7.5.7 Bileşiklerin isimlerini formülleriyle yapılandırabilme',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.8, text: 'Merhaba, ben Damla! Elementleri sembollerle yazmayı öğrenmiştik: H, O, C, N, Na, Cl...' },
    { id: 'q', pad: 1.2, min: 6, text: 'Peki farklı elementlerin birleşmesiyle oluşan bileşikleri nasıl yazarız?', key: 'Bileşik nasıl yazılır?' },
    // SAHNE 2 — Ortak dil
    { id: 'lang', pad: 0.8, min: 6, text: 'Suya her dilde başka bir ad verilir: su, water, eau, Wasser...' },
    { id: 'common', pad: 1.2, text: 'Bilim dünyası ise ortak bir dil kullanır: formül. Suyun formülü H₂O’dur.', key: 'Formül: ortak dil' },
    // SAHNE 3 — Su formülünü okuma
    { id: 'model', pad: 0.8, text: 'Su molekülünün modeline bakalım: iki hidrojen atomu, bir oksijen atomu.' },
    { id: 'build', pad: 0.8, text: 'Formülde, bileşikteki elementlerin sembolleri yan yana yazılır: H ve O.' },
    { id: 'subscript', pad: 1.0, text: 'Sembolün sağ altındaki küçük sayı, o atomdan kaç tane olduğunu gösterir.', key: 'Alt sayı = atom sayısı' },
    { id: 'one', pad: 1.2, text: 'Atom tek ise 1 yazılmaz. Yani H₂O’da 2 hidrojen, 1 oksijen var.' },
    // SAHNE 4 — CO ve CO₂
    { id: 'co', pad: 0.6, text: 'Şimdi iki bileşiği karşılaştıralım: karbonmonoksit ve karbondioksit.' },
    { id: 'co-read', pad: 0.8, text: 'CO’da 1 karbon, 1 oksijen var. CO₂’de ise 1 karbon, 2 oksijen var.' },
    { id: 'co-diff', pad: 1.0, text: 'Tek bir küçük sayı değişti, bambaşka bir bileşik oluştu!', key: 'Sayı değişirse madde değişir' },
    { id: 'name', pad: 1.2, text: 'İsimde de ipucu var: “mono” bir, “di” iki anlamına gelir.' },
    // SAHNE 5 — Büyük harf kuralı ve atom sayma
    { id: 'caps', pad: 0.8, text: 'Bir mantıksal ilişki daha: Her büyük harf, yeni bir elementin başladığını gösterir.', key: 'Büyük harf = yeni element' },
    { id: 'nacl', pad: 1.0, text: 'NaCl’de iki büyük harf var: Na sodyum, Cl klor. Sodyum klorürde ikisi 1’e 1 oranındadır.' },
    { id: 'table', pad: 1.0, min: 14, text: 'Programımızdaki diğer yaygın bileşiklerin formüllerinde de atomları tek tek sayalım.', key: 'Atomları say' },
    { id: 'glucose', pad: 1.4, text: 'En uzunu glikoz: 6 karbon, 12 hidrojen, 6 oksijen. Toplam 24 atom!' },
    // SAHNE 6 — Molekül yapılı elementler
    { id: 'elements', pad: 0.8, text: 'Formül yalnızca bileşiklere özgü değil. Molekül yapılı elementler de formülle gösterilir.', key: 'Molekül yapılı element' },
    { id: 'o2', pad: 1.4, text: 'O₂, H₂ ve N₂’de tek cins atom var; bunlar element. H₂O’da iki cins atom var; o bir bileşik.' },
    // SAHNE 7 — Kart eşleştirme
    { id: 'match', pad: 0.8, min: 10, text: 'Hadi bir kart eşleştirme oyunu oynayalım: model, formül ve isim!', key: 'Kart eşleştirme' },
    { id: 'whole', pad: 1.4, text: 'Atomların çeşidi ve sayısı, formül ve isim birlikte uyumlu bir bütün oluşturur.' },
    // SAHNE 8 — Kaydet, Sıra sende, Sıradaki
    { id: 'record', pad: 0.6, min: 12, text: 'Bulduklarımı gözlem defterime kaydedeyim.', key: 'Kaydet' },
    { id: 'yourturn', pad: 1.0, min: 8, text: 'Sıra sende! On yaygın bileşik için kendi eşleştirme kartlarını hazırla.' },
    { id: 'next', pad: 1.0, text: 'Sıradaki gözlemim: Maddeler her zaman birleşmez, bazen yalnızca karışır. Karışımlar!' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
