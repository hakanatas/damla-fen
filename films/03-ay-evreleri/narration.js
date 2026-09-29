// narration.js — Film 3: "Ay'ın Evreleri"  (Maarif FB.5.1.3)
const NARRATION = {
  film: '03-ay-evreleri',
  title: 'Ay’ın Evreleri',
  outcome: 'FB.5.1.3 Ay\'ın evrelerini temsil eden bilimsel model oluşturabilme',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Bayraktaki hilal
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'flag', pad: 0.8, text: 'Bayrağımızdaki hilale bak! Gökyüzündeki Ay hep bu şekilde mi görünür?', key: 'Bayraktaki hilal' },
    { id: 'predict', pad: 1.0, min: 8, text: 'Tahminim: Ay bazen ince, bazen yuvarlak görünüyor. Bunu gözlemle sınamalıyım.', key: 'Tahmin' },
    // SAHNE 2 — Gözlem planı ve defter
    { id: 'plan', pad: 1.0, min: 8.5, text: 'Önce plan yaptım: açık bir alanda, bir yetişkinle, yaklaşık bir ay boyunca gözlem.', key: 'Gözlem planı' },
    { id: 'diary', pad: 1.0, min: 10, text: 'Her gözlemi defterime çizdim. Ay\'ın görünüşü gün gün değişiyor!', key: 'Gözlem defteri' },
    // SAHNE 3 — Model 1
    { id: 'why', pad: 0.6, text: 'Neden değişiyor? Önce bir model önereyim.', key: 'Model öner' },
    { id: 'model1', pad: 1.0, min: 8, text: 'Modelim: Dünya\'nın gölgesi Ay\'ın üstüne düşüyor, o kısım karanlık görünüyor.', key: 'Model 1' },
    // SAHNE 4 — Yeni kanıt
    { id: 'evidence', pad: 0.8, min: 7, text: 'Ama yeni bir kanıt buldum: Hilal, akşamüstü Güneş\'e yakın görünüyor.', key: 'Yeni kanıt' },
    { id: 'wrong', pad: 1.0, min: 8, text: 'Dünya\'nın gölgesi ise hep Güneş\'in ters yönündedir. Demek ki modelimi yenilemeliyim!', key: 'Modeli yenile' },
    // SAHNE 5 — Model 2: lamba, top, baş
    { id: 'model2', pad: 0.6, text: 'Yeni modelim: Lamba Güneş, top Ay, başım da Dünya olsun.', key: 'Model 2' },
    { id: 'half', pad: 0.8, text: 'Lamba topun hep yarısını aydınlatır. Ay da Güneş ışığını yansıtır.', key: 'Hep yarısı aydınlık' },
    { id: 'turn', pad: 0.8, min: 10, text: 'Topu başımın çevresinde döndürünce aydınlık yarının farklı kısımlarını görüyorum!' },
    // SAHNE 6 — Evreler
    { id: 'space', pad: 0.8, text: 'Uzaydan bakınca Ay hep yarı aydınlıktır. Dünya\'dan bakınca görünüşü değişir.', key: 'Uzaydan ve Dünya’dan' },
    { id: 'names', pad: 0.8, min: 13, text: 'Yeni Ay, Hilal, İlk Dördün, Şişkin Ay, Dolunay, Şişkin Ay, Son Dördün, Hilal... ve yine Yeni Ay!', key: 'Ay’ın evreleri' },
    { id: 'side', pad: 1.0, text: 'Türkiye\'den bakınca Ay büyürken sağ tarafı, küçülürken sol tarafı aydınlıktır.', key: 'Sağ ve sol' },
    // SAHNE 7 — Periyot ve "ay"
    { id: 'period', pad: 1.0, min: 9, text: 'Aynı evre yaklaşık 29,5 gün sonra yeniden görünür. Evreler her ay tekrar eder.', key: '≈ 29,5 gün' },
    { id: 'month', pad: 1.0, text: 'Zaman birimi olan “ay” da buradan gelir. Bir yılda 12 ay vardır.', key: 'Zaman birimi: ay' },
    // SAHNE 8 — Kaydet, görev, sonraki
    { id: 'record', pad: 1.0, min: 9, text: 'Model önerdim, yeni kanıtla yeniledim. Bilim insanları da modellerini böyle geliştirir!', key: 'Modeli yenile' },
    { id: 'yourturn', pad: 1.0, min: 9, text: 'Sıra sende! Bir ay boyunca Ay\'ı gözlemle ve çiz. Sonra modelini yap, arkadaşlarınınkiyle karşılaştır.', key: 'Sıra sende' },
    { id: 'research', pad: 0.8, text: 'Sen de araştır: Ramazan ayı ve dinî bayramlar, hangi gök cisimlerinin hareketine göre belirlenir?' },
    { id: 'next', pad: 0.8, text: 'Sıradaki gözlemim: Güneş, Dünya ve Ay birlikte nasıl hareket eder?' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
