// narration.js — 7. sınıf Film 12: "Işığın Kırılması"  (Maarif FB.7.4.1)
// Tek düzenlenebilir metin kaynağı. Sessiz film: text = altyazı.
const NARRATION = {
  film: '12-kirilma',
  title: 'Işığın Kırılması',
  outcome: 'FB.7.4.1',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Bardaktaki kalem (köprü kurma)
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.6, text: 'Merhaba! Ben Damla. Su dolu bardağa bir kalem koydum. Bak, kalem kırılmış gibi görünüyor!', key: 'Gözlem' },
    { id: 'pullout', pad: 0.6, min: 8, text: 'Kalem gerçekten kırıldı mı? Çıkarıp bakalım... Hayır, dümdüz! Öyleyse gözüm neden yanılıyor?', key: 'Soru sor' },
    { id: 'bridge', pad: 0.8, min: 6.5, text: 'Havuzdaki balık da olduğundan yakında görünür. Neden acaba?' },
    // SAHNE 2 — Deney: havadan suya
    { id: 'setup', pad: 0.5, min: 7, text: 'Bir deney yapalım. Işık kutusundan çıkan ince bir ışını su dolu kaba gönderelim.', key: 'Deney' },
    { id: 'bend', pad: 1.0, min: 6, text: 'Işık havadan suya geçerken, iki ortamın sınırında yön değiştirdi!' },
    { id: 'define', pad: 1.0, text: 'Işığın bir saydam ortamdan diğerine geçerken yön değiştirmesine kırılma denir.', key: 'Kırılma' },
    // SAHNE 2b — Terimler
    { id: 'normal', pad: 0.8, text: 'Yansımadaki gibi, ışının çarptığı noktadan yüzeye dik bir çizgi çizelim: normal.', key: 'Normal' },
    { id: 'rays', pad: 0.8, text: 'Havada ilerleyen ışın gelen ışın, suda ilerleyen ışın kırılan ışındır.', key: 'Gelen ışın · kırılan ışın' },
    { id: 'angles', pad: 1.2, min: 10, text: 'Gelen ışınla normal arasındaki açıya gelme açısı, kırılan ışınla normal arasındaki açıya kırılma açısı denir.', key: 'Gelme ve kırılma açısı' },
    // SAHNE 3 — Veri toplama (su ve cam)
    { id: 'measure', pad: 0.5, text: 'Gelme açısını değiştirip iki açıyı ölçelim. Önce suyla, sonra camla deneyelim.', key: 'Veri topla' },
    { id: 'data', pad: 0.4, min: 12.5, text: 'Sıfır derece... otuz derece... altmış derece... Şimdi de cam blok.' },
    { id: 'toward', pad: 1.0, text: 'Az yoğun havadan çok yoğun suya ya da cama geçen ışık, normale yaklaşarak kırılır.', key: 'Normale yaklaşır' },
    { id: 'glass', pad: 1.0, text: 'Aynı gelme açısında camdaki kırılma açısı daha küçük. Cam, ışığı sudan daha çok kırıyor.' },
    { id: 'perp', pad: 1.0, min: 6.5, text: 'Sınıra dik gelen ışın ise kırılmaz; doğrultusunu değiştirmeden geçer.', key: 'Dik gelen ışın kırılmaz' },
    // SAHNE 4 — Tersine: sudan havaya
    { id: 'reverse', pad: 0.4, text: 'Şimdi tersini deneyelim: ışını suyun içinden havaya gönderelim.' },
    { id: 'away', pad: 1.0, min: 7.5, text: 'Çok yoğun sudan az yoğun havaya geçen ışık, normalden uzaklaşarak kırılır.', key: 'Normalden uzaklaşır' },
    // SAHNE 5 — Kalem neden kırık görünür?
    { id: 'why', pad: 0.6, text: 'Peki kalem neden kırık görünüyordu? Kalemin ucundan gelen ışık, su yüzeyinde kırılarak gözümüze ulaşır.', key: 'Açıklama' },
    { id: 'brain', pad: 0.8, min: 8.5, text: 'Gözümüz ışığın hep düz geldiğini varsayar. Bu yüzden kalemin ucunu olduğundan yukarıda görürüz.', key: 'Görünen konum' },
    { id: 'fish', pad: 0.8, min: 4.5, text: 'Balığın daha yakında görünmesi de aynı nedenledir.' },
    // SAHNE 6 — Prizma
    { id: 'prism', pad: 1.0, min: 8.5, text: 'Kırılmanın bir sürprizi daha var: Beyaz ışık bir prizmada kırılırken renklerine ayrılır.', key: 'Prizma' },
    // SAHNE 7 — Kaydet + Sıra sende + sonraki film
    { id: 'record', pad: 0.5, min: 12, text: 'Bulduklarımı gözlem defterime kaydedeyim.', key: 'Kaydet' },
    { id: 'task', pad: 0.8, min: 8, text: 'Sıra sende! Bir bardak su ve kalemle deneyi yap. Kalemi farklı açılardan gözlemle ve çiz.', key: 'Sıra sende' },
    { id: 'discuss', pad: 0.8, min: 7, text: 'Sınıfta tartışın: Havuz neden olduğundan sığ görünür? Farklı fikirleri saygıyla dinleyelim.' },
    { id: 'research', pad: 0.8, min: 6, text: 'Araştır: Osmanlı bilgini Mirim Çelebi’nin ışıkla ilgili çalışmaları nelerdir?' },
    { id: 'next', pad: 0.8, min: 5.5, text: 'Sıradaki gözlemim: ışığı kırarak toplayan ve dağıtan mercekler!' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
