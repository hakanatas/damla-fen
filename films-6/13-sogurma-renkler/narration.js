// narration.js — 6. sınıf Film 13: "Renklerin Sırrı: Soğurma ve Renkler"  (FB.6.4.4 · FB.6.4.5 · FB.6.4.6)
// Tek düzenlenebilir metin kaynağı. Zamanlama: python3 tools/tts.py films-6/13-sogurma-renkler --silent --wps=1.85
const NARRATION = {
  film: '13-sogurma-renkler',
  title: 'Renklerin Sırrı: Soğurma ve Renkler',
  outcome: 'FB.6.4.4 · FB.6.4.5 · FB.6.4.6 Işığın soğurulması; beyaz ışığın bileşimi; cisimlerin siyah, beyaz ve renkli görünmesi',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Soru (köprü: yazın açık renkli giysiler)
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.8, text: 'Merhaba, ben Damla! Yazın neden hep açık renkli giysiler seçeriz?', key: 'Soru sor' },
    // SAHNE 2 — Soğurma deneyi (FB.6.4.4 b: sıcaklık değişimlerini tabloya kaydetme)
    { id: 'setup', pad: 0.6, min: 8.5, text: 'Bir deney kuralım: beyaz ve siyah iki kutu, içlerinde birer termometre, aynı güneşli yerde.', key: 'Deney' },
    { id: 'data', pad: 0.6, min: 9.5, text: 'Her beş dakikada sıcaklıkları ölçüp tabloya yazdım. Siyah kutu çok daha fazla ısındı!', key: 'Veri kaydet' },
    // SAHNE 3 — Soğurma (FB.6.4.4 a, c)
    { id: 'absorb', pad: 0.6, min: 8, text: 'Işık bir maddeye çarpınca bir kısmı yansır, bir kısmı da madde tarafından soğurulur.', key: 'Soğurma' },
    { id: 'heat', pad: 0.6, text: 'Soğurulan ışık maddeyi ısıtır. Siyah yüzey ışığın çoğunu soğurur, beyaz yüzey çoğunu yansıtır.' },
    { id: 'summer', pad: 0.6, text: 'Açık renkli giysiler de bu yüzden yazın serin tutar.' },
    // SAHNE 4 — Beyaz ışık: gökkuşağı ve prizma (FB.6.4.5 a)
    { id: 'rainbow', pad: 0.6, min: 11, text: 'Peki cisimler neden renkli görünür? Önce ışığa bakalım: Güneş’in beyaz ışığı yağmur damlalarında renklere ayrılır, gökkuşağı oluşur.', key: 'Beyaz ışık' },
    { id: 'prism', pad: 0.6, text: 'Cam prizma da beyaz ışığı renklere ayırır. Güneş ışığıyla bu deneyi yalnızca bir yetişkinle yap!', key: 'Prizma' },
    // SAHNE 5 — Newton çarkı (FB.6.4.5 b, c)
    { id: 'wheel', pad: 0.5, text: 'Şimdi tersini deneyelim: Karton bir daireyi bu renklere boyadım. İşte Newton çarkı!', key: 'Newton çarkı' },
    { id: 'spin', pad: 0.6, min: 6.5, text: 'Hızla döndürünce renkler kayboluyor, çark beyaza yakın görünüyor!' },
    { id: 'white', pad: 0.6, text: 'Demek ki beyaz ışık, tüm ışık renklerinin bileşiminden oluşur.', key: 'Renklerin bileşimi' },
    // SAHNE 6 — Işığın ana ve ara renkleri (FB.6.4.5: spektrum ve filtreye girilmeden)
    { id: 'primary', pad: 0.6, text: 'Işığın ana renkleri kırmızı, yeşil ve mavidir. Üçü üst üste gelince beyaz ışık oluşur.', key: 'Ana renkler' },
    { id: 'secondary', pad: 0.6, min: 7, text: 'İkişer birleşince ara renkler oluşur: sarı, camgöbeği ve magenta.', key: 'Ara renkler' },
    // SAHNE 7 — Renkli görünme (FB.6.4.6 a)
    { id: 'shop', pad: 0.5, text: 'Mağazadaki giysi evde farklı renkte görünebilir. Neden?', key: 'Renkli görünme' },
    { id: 'redlight', pad: 0.6, text: 'Beyaz bir topa önce güneş ışığı, sonra kırmızı ışık tuttum. Kırmızı ışıkta top kırmızı göründü!', key: 'Gözlem' },
    { id: 'apple', pad: 0.6, text: 'Kırmızı elma, beyaz ışıktaki kırmızıyı yansıtır, öteki renkleri soğurur. Gözümüze kırmızı ışık ulaşır.', key: 'Yansıtma ve soğurma' },
    { id: 'bw', pad: 0.6, text: 'Beyaz cisim bütün renkleri yansıtır. Siyah cisim ise bütün renkleri soğurur.', key: 'Siyah ve beyaz' },
    // SAHNE 8 — Veri tablosu + açıklama + bilim tarihi (FB.6.4.6 b, c; D19.2)
    { id: 'table', pad: 0.4, min: 10.5, text: 'Farklı renkteki cisimlere farklı renkte ışık tuttum, gördüklerimi tabloya yazdım.', key: 'Veri tablosu' },
    { id: 'leaf', pad: 0.6, text: 'Kırmızı ışıkta yeşil yaprak siyah göründü. Çünkü yansıtacağı yeşil ışık yoktu!' },
    { id: 'explain', pad: 0.6, text: 'Bir cismin rengi, üzerine düşen ışığa ve hangi renkleri yansıttığına bağlıdır.' },
    { id: 'scholars', pad: 0.6, text: 'İbnülheysem ve Ali Kuşçu, ışık ile renk ilişkisini yorumlayan Türk-İslam bilim insanlarıdır.', key: 'Bilim tarihi' },
    // SAHNE 9 — Kaydet + Sıra sende + sonraki film
    { id: 'record', pad: 0.5, min: 10, text: 'Bulduklarımı gözlem defterime kaydedeyim.', key: 'Kaydet' },
    { id: 'task', pad: 0.6, text: 'Sıra sende! Renkli cisimleri farklı renkte ışıklar altında gözle ve tablona kaydet.' },
    { id: 'next', pad: 0.6, min: 5.5, text: 'Sıradaki gözlemim: Güneş’in enerjisinden nasıl yararlanıyoruz?' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
