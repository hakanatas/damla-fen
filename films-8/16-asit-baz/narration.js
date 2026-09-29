// narration.js — 8. sınıf Film 16: "Asitler ve Bazlar: Renklerin Dili"  (Maarif FB.8.5.5 · FB.8.5.6)
// Tek düzenlenebilir metin kaynağı. Sessiz film: text altyazı olarak görünür.
const NARRATION = {
  film: '16-asit-baz',
  title: 'Asitler ve Bazlar: Renklerin Dili',
  outcome: 'FB.8.5.5 · FB.8.5.6',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.3, min: 6.5, text: 'Merhaba! Mutfakta limon, sirke, yoğurt; banyoda sabun, şampuan, çamaşır suyu var.' },
    { id: 'hello2', pad: 0.6, text: 'Bunların çoğunda asitler ya da bazlar bulunur. Onları nasıl tanıyabilirim?', key: 'Asitler ve bazlar' },
    // SAHNE 2 — Güvenlik
    { id: 'safety', pad: 0.3, min: 8, text: 'Önce güvenlik! Asit ve bazların tadına, kokusuna bakılmaz; dokunulmaz. Gözlük ve eldiven takar, öğretmenimle çalışırım.', key: 'Güvenlik' },
    { id: 'symbols', pad: 0.5, text: 'Etiketteki uyarı işaretlerini okurum. “Aşındırıcı” işareti: cildi, gözü ve yüzeyleri yakabilir.', key: 'Uyarı işaretleri' },
    // SAHNE 3 — İyonlar
    { id: 'ions', pad: 0.5, text: 'Asitler suda çözününce hidrojen iyonu, H artı verir. Bazlar ise hidroksit iyonu, OH eksi verir.', key: 'Suda iyon verir' },
    // SAHNE 4 — Yaygın asitler ve bazlar
    { id: 'names', pad: 0.3, text: 'Yaygın asitler: tuz ruhu, kezzap, akü asidi, sirkedeki asetik asit ve gazozdaki karbonik asit.', key: 'Yaygın asitler' },
    { id: 'names2', pad: 0.5, min: 6.5, text: 'Yaygın bazlar: sud kostik, potas kostik, sönmüş kireç ve amonyak.', key: 'Yaygın bazlar' },
    // SAHNE 5 — Karşılaştırma
    { id: 'common', pad: 0.3, min: 8, key: 'Karşılaştır', text: 'Karşılaştırayım. Ortak: İkisinin de sulu çözeltisi elektrik iletir, ayıraç rengini değiştirir, aşındırıcı olabilir.' },
    { id: 'diff', pad: 0.3, text: 'Farklar: Asitler bazı metallerle ve mermerle tepkimeye girer; bazlar ise cam, porselen ve yağlarla.' },
    { id: 'salt', pad: 0.5, min: 6, text: 'Asit ile baz tepkimeye girince birbirinin etkisini azaltır; tuz ve su oluşur.', key: 'Tuz ve su' },
    // SAHNE 6 — Ayıraç ve önermeler
    { id: 'how', pad: 0.4, text: 'Tadına bakamıyorsak nasıl ayırt ederiz? Rengi değişen özel maddelerle: ayıraçlarla!', key: 'Ayıraç (belirteç)' },
    { id: 'claims', pad: 0.3, min: 9, text: 'Önce önermelerimi yazayım: Limon suyu asittir. Sabunlu su bazdır. Süt beyaz olduğu için nötrdür.', key: 'Önerme' },
    { id: 'claims2', pad: 0.5, text: 'İlk ikisi deneyimlerime dayanıyor. Üçüncüsü dayanmıyor: renk tek başına kanıt değil. Sınayalım!', key: 'Gözleme dayalı mı?' },
    // SAHNE 7 — Turnusol
    { id: 'litmus', pad: 0.3, min: 8, text: 'Turnusol kâğıdı: Mavi turnusol asitte kırmızıya döner. Kırmızı turnusol bazda maviye döner.', key: 'Turnusol kâğıdı' },
    { id: 'litmus2', pad: 0.3, min: 9, text: 'Limon suyunda mavi kâğıt kırmızı oldu: asit! Sabunlu suda kırmızı kâğıt mavi oldu: baz!' },
    { id: 'litmus3', pad: 0.5, min: 5, text: 'Saf suda iki kâğıt da değişmedi: nötr.' },
    // SAHNE 8 — Mor lahana suyu + diğer ayıraçlar
    { id: 'cabbage', pad: 0.3, min: 6, text: 'Doğal bir ayıraç: mor lahana suyu. Altı behere eşit miktarda ekledim.', key: 'Mor lahana suyu' },
    { id: 'cab2', pad: 0.3, min: 9, text: 'Limon suyu kırmızı, sirke pembe, süt ve saf su mor, karbonatlı su mavi, sabunlu su yeşil oldu!' },
    { id: 'milk', pad: 0.5, text: 'Süt nötre çok yakın: önermem doğru, ama gerekçem yanlıştı!' },
    { id: 'others', pad: 0.5, text: 'Başka ayıraçlar da var. Fenolftalein bazda pembe olur. Metil oranj asitte kırmızı, bazda sarı olur.', key: 'Başka ayıraçlar' },
    // SAHNE 9 — Sonuç, tahmin, sorgulama
    { id: 'infer', pad: 0.3, text: 'Sonuç: Ayıracın rengi, maddenin asit mi, baz mı, nötr mü olduğunu gösterir.', key: 'Sonuç çıkar' },
    { id: 'predict', pad: 0.3, text: 'Tahmin: Amonyaklı cam temizleyicisi bazdır. Denemeden söylüyorum: kırmızı turnusolu maviye çevirir.', key: 'Tahmin' },
    { id: 'question', pad: 0.5, text: 'Ama her asit ve baz aynı rengi verir mi? Zayıf olanlarda renk az değişebilir; deneyle sınamalıyım.', key: 'Sorgula' },
    // SAHNE 10 — Kaydet · Sıra sende · Sıradaki
    { id: 'record', pad: 0.3, min: 8, text: 'Bulduklarımı gözlem defterime kaydedeyim.', key: 'Kaydet' },
    { id: 'task', pad: 0.4, min: 6.5, text: 'Sıra sende! Öğretmeninle mor lahana suyu hazırla, evdeki maddeleri test et, tabloya yaz.' },
    { id: 'next', pad: 0.6, text: 'Sıradaki gözlemim: Limon da sirke de asit. Peki hangisi daha asidik? pH cetveli!' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
