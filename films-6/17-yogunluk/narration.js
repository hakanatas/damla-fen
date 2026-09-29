// narration.js — 6. sınıf Film 17: "Aynı Hacim, Farklı Kütle: Yoğunluk"  (Maarif FB.6.5.3 · FB.6.5.4)
// Tek düzenlenebilir metin kaynağı. Sessiz film: text altyazı olarak görünür.
const NARRATION = {
  film: '17-yogunluk',
  title: 'Aynı Hacim, Farklı Kütle: Yoğunluk',
  outcome: 'FB.6.5.3 · FB.6.5.4',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.5, min: 8.5, text: 'Merhaba, ben Damla! Aynı büyüklükte iki küpüm var: biri tahta, biri demir. Teraziye koyalım.' },
    { id: 'puzzle', pad: 0.8, text: 'Demir ağır bastı! Hacimleri aynı ama kütleleri farklı. Neden acaba?', key: 'Aynı hacim, farklı kütle' },
    // SAHNE 2 — Ölçme araçları
    { id: 'tools', pad: 0.8, min: 9.5, text: 'Önce ölçelim. Kütleyi eşit kollu terazide gram (g), sıvı hacmini dereceli silindirde santimetreküp (cm³) ile ölçeriz.', key: 'Ölçme araçları' },
    // SAHNE 3 — Taşın kütlesi ve hacmi
    { id: 'mass', pad: 0.6, min: 8.5, text: 'Taş sol kefede, kütleler sağ kefede: 50, 52, 54... Denge! Taşın kütlesi 54 g.', key: 'Kütle: 54 g' },
    { id: 'vol', pad: 0.6, min: 10, text: 'Silindirde 50 cm³ su var. Taşı bırakınca 70 cm³ oldu. Son hacim eksi ilk hacim: 20 cm³.', key: 'Hacim: 20 cm³' },
    { id: 'care', pad: 0.6, min: 8.5, text: 'Dikkat: Cisim silindire sığmalı, su taşmamalı. Taşırma kabında ise taşan su, cismin hacmi kadardır.', key: 'Taşırma kabı' },
    // SAHNE 4 — Yoğunluk
    { id: 'ratio', pad: 0.6, min: 10, text: 'Aynı demirden bir küp: 10 cm³, 79 g. İki küp: 20 cm³, 158 g. Hacim iki katı, kütle de!' },
    { id: 'def', pad: 0.7, min: 11, text: 'Kütlenin hacme bölümü hep 7,9. Bu orana yoğunluk denir. Taşınki ise 54 ÷ 20 = 2,7 g/cm³.', key: 'Yoğunluk = kütle ÷ hacim' },
    // SAHNE 5 — Önermeler
    { id: 'claim', pad: 0.6, min: 10, text: 'Bir önerme: “Büyük cisim daha yoğundur.” Veriye dayanmıyor. Sınayalım: büyük tahta blok 30 g, 60 cm³.', key: 'Önerme' },
    { id: 'verdict', pad: 0.7, min: 10, text: 'Tahtanın yoğunluğu 0,5 g/cm³, küçük demirinki 7,9 g/cm³! Önerme geçersiz. Yoğunluk, maddenin cinsine bağlıdır.', key: 'Ayırt edici özellik' },
    // SAHNE 6 — Sıvılar: hipotez
    { id: 'hyp', pad: 0.6, text: 'Hipotezim: “Farklı cins sıvıların yoğunlukları farklıdır.” 100’er cm³ su ve zeytinyağı tartalım.', key: 'Hipotez kur' },
    { id: 'liquids', pad: 0.6, min: 10, text: 'Boş kap 50 g. Suyla 150 g, yağla 142 g. Kabın kütlesini çıkarınca su 100 g, yağ 92 g.' },
    { id: 'liqd', pad: 0.6, min: 7.5, text: 'Su: 100 ÷ 100 = 1 g/cm³. Zeytinyağı: 92 ÷ 100 = 0,92 g/cm³.' },
    { id: 'layer', pad: 0.6, min: 8, text: 'Aynı kaba dökünce az yoğun olan yağ üstte kaldı. Hipotez doğrulandı!' },
    { id: 'oil', pad: 0.7, min: 8.5, text: 'Deneyden sonra yağı lavaboya dökmem! Biriktirip geri dönüşüm için ilgili kuruluşa veririm.', key: 'Yağı lavaboya dökme!' },
    // SAHNE 7 — Katılar suda: tümdengelim
    { id: 'predict', pad: 0.6, min: 11, text: 'Katılar suda nasıl konumlanır? Kural: Sudan az yoğun olan yüzer, daha yoğun olan batar, eşit olan askıda kalır.', key: 'Tümdengelim' },
    { id: 'test', pad: 0.6, min: 8.5, text: 'Tahta 0,5: yüzer. Taş 2,7 ve demir 7,9: batar. Deneyince tahminler tuttu!' },
    { id: 'new', pad: 0.7, min: 8, text: 'Yeni durum: Mumun yoğunluğu yaklaşık 0,9 g/cm³. Kurala göre yüzmeli... Gerçekten yüzüyor!', key: 'Yeni durum' },
    // SAHNE 8 — Kaydet
    { id: 'record', pad: 0.6, min: 9.5, text: 'Bulduklarımı gözlem defterime kaydediyorum.', key: 'Kaydet' },
    // SAHNE 9 — Sıra sende · Sıradaki
    { id: 'task', pad: 1.0, min: 9.5, text: 'Sıra sende! Suda çözünmeyen üç cismin yoğunluğunu hesapla, suda konumlarını tahmin et ve dene.', key: 'Sıra sende!' },
    { id: 'next', pad: 0.8, min: 5, text: 'Sıradaki gözlemim: Buz neden suyun üstünde yüzer?' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
