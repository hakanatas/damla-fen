// narration.js — 6. sınıf Film 14: "Güneş Enerjisinden Yararlanma"  (FB.6.4.7)
// Tek düzenlenebilir metin kaynağı. Zamanlama: python3 tools/tts.py films-6/14-gunes-enerjisi --silent --wps=1.85
const NARRATION = {
  film: '14-gunes-enerjisi',
  title: 'Güneş Enerjisinden Yararlanma',
  outcome: 'FB.6.4.7 Güneş enerjisinin günlük hayat ve teknolojideki yenilikçi uygulamalarına ilişkin eleştirel düşünebilme',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Güneşli oda (köprü sorusu)
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.6, min: 8, text: 'Kışın güneşli bir günde, güneş alan odamız öteki odalardan daha sıcak olur. Neden acaba?', key: 'Soru sor' },
    { id: 'window', pad: 0.6, min: 8, text: 'Güneş ışığı camdan geçer. Eşyalar ve duvarlar ışığı soğurup ısınır, oda da ısınır.' },
    { id: 'energy', pad: 0.8, text: 'Demek ki Güneş bize ışıkla birlikte enerji de gönderir. Bu enerjiden nasıl yararlanıyoruz?', key: 'Güneş enerjisi' },
    // SAHNE 2 — Günlük hayatta ve teknolojide (FB.6.4.7; OB1 örnek verme)
    { id: 'drying', pad: 0.6, min: 6.5, text: 'En eski yol: çamaşırları, meyveleri ve biberleri güneşte kurutmak.', key: 'Günlük hayatta' },
    { id: 'collector', pad: 0.6, min: 8.5, text: 'Çatılardaki güneş kolektörleri, koyu renkli yüzeyleriyle ışığı soğurur ve suyu ısıtır.', key: 'Güneş kolektörü' },
    { id: 'panel', pad: 0.6, min: 7.5, text: 'Güneş panelleri ise ışığı doğrudan elektrik enerjisine dönüştürür.', key: 'Güneş paneli' },
    { id: 'examples', pad: 0.8, min: 9.5, text: 'Hesap makineleri, sokak lambaları, tarladaki sulama pompaları, hatta uzaydaki uydular bu enerjiyle çalışır.', key: 'Teknolojide' },
    // SAHNE 3 — Sorgula (a: fikirleri sorgular)
    { id: 'question', pad: 0.5, text: 'Ama her fikri sorgulamalıyım. Güneş enerjisi her zaman, her yerde işe yarar mı?', key: 'Sorgula' },
    { id: 'claim', pad: 0.6, min: 8.5, text: 'Bir iddia: “Güneş paneli gece de elektrik üretir.” Gece Güneş ışığı yoktur, panel üretim yapamaz.' },
    { id: 'cloud', pad: 0.8, min: 8, text: 'Bulutlu günlerde üretim azalır. Bu yüzden gündüz üretilen enerji akülerde depolanabilir.' },
    // SAHNE 4 — Avantajlar ve sınırlılıklar (b: akıl yürütür)
    { id: 'pros', pad: 0.6, min: 8, text: 'Artılarını yazalım: Güneş enerjisi yenilenebilir. Paneller çalışırken duman ve zararlı gaz çıkarmaz.', key: 'Avantajlar' },
    { id: 'cons', pad: 0.6, min: 8.5, text: 'Sınırlılıkları da var: kurulum maliyeti, geniş alan ihtiyacı ve eski panellerin geri dönüşümü.', key: 'Sınırlılıklar' },
    { id: 'decide', pad: 0.8, text: 'Yani güneş enerjisi çok değerlidir, ama doğru yerde ve doğru biçimde kullanılmalıdır.', key: 'Çıkarım' },
    // SAHNE 5 — İnsanlara ve doğaya faydası + gelecek (OB8, D5.2)
    { id: 'nature', pad: 0.6, min: 7.5, text: 'Güneş enerjisi yaygınlaşırsa kömür ve petrol gibi yakıtları daha az yakarız, hava temizlenir.', key: 'Doğaya faydası' },
    { id: 'future', pad: 0.8, min: 8.5, text: 'Gelecekte neler olabilir? Güneşle çalışan araçlar, panel kaplı çatılar... ve belki de senin fikrin!', key: 'Gelecek fikirleri' },
    // SAHNE 6 — Kaydet + Sıra sende (c: çıkarımları yansıtır; performans görevi)
    { id: 'record', pad: 0.5, min: 10, text: 'Düşüncelerimi gözlem defterime kaydedeyim.', key: 'Kaydet' },
    { id: 'task', pad: 0.8, min: 9.5, text: 'Sıra sende! Güneş enerjisinin gelecekte kullanımıyla ilgili özgün bir fikir üret ve arkadaşlarına sun.' },
    { id: 'next', pad: 0.6, min: 5.5, text: 'Sıradaki gözlemim: Isınan maddeler neden genleşir?' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
