// narration.js — 6. sınıf Film 20: "Elektriksel Direnç ve Reosta"  (Maarif FB.6.6.2 · FB.6.6.3)
// Tek düzenlenebilir metin kaynağı. Sessiz sürüm: text = altyazı.
const NARRATION = {
  film: '20-direnc',
  title: 'Elektriksel Direnç ve Reosta',
  outcome: 'FB.6.6.2 · FB.6.6.3 Ampulün parlaklığının bağlı olduğu değişkenler; ayarlanabilir direncin ampulün parlaklığına etkisi',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.6, text: 'Merhaba! Pil ya da ampul sayısı değişince ampulün parlaklığının değiştiğini biliyoruz.' },
    { id: 'q', pad: 1.0, text: 'Peki pil ve ampul aynı kalsa, yalnızca tel değişse parlaklık değişir mi?', key: 'Soru sor' },
    // SAHNE 2 — Yol benzetmesi
    { id: 'roads', pad: 0.4, text: 'Bir benzetme düşünelim: Aynı sayıda araç, farklı yollardan hedefe gidiyor.', key: 'Benzetme' },
    { id: 'road1', pad: 0.4, min: 4.5, text: 'Uzun yol, kısa yoldan daha zordur.' },
    { id: 'road2', pad: 0.4, min: 4.5, text: 'Tek şeritli yol, çift şeritli yoldan daha zordur.' },
    { id: 'road3', pad: 0.8, min: 4.5, text: 'Çakıllı yol, asfalt yoldan daha zordur.' },
    { id: 'resist', pad: 1.2, min: 9, text: 'Teller de elektrik akımına karşı bir zorluk gösterir. Buna elektriksel direnç denir.', key: 'Elektriksel direnç' },
    // SAHNE 3 — Güvenlik + deney tasarımı
    { id: 'safety', pad: 1.0, min: 8, text: 'Yalnızca pil kullanırım, kısa devre yapmam. İnce teller ısınabilir; bir yetişkin eşliğinde çalışırım.', key: 'Güvenlik' },
    { id: 'design', pad: 0.8, text: 'Deneyimi tasarlıyorum: Her seferinde yalnızca bir değişkeni değiştirip gerisini aynı tutacağım.', key: 'Deney tasarla' },
    // SAHNE 4 — Deneyler
    { id: 'len', pad: 0.4, text: 'Deney 1: Aynı kalınlıkta krom-nikel teller. Yalnızca uzunlukları farklı.', key: 'Uzunluk' },
    { id: 'len-r', pad: 1.0, min: 7, text: 'Tel uzadıkça ampul sönükleşti. Uzun telin direnci daha büyüktür.' },
    { id: 'area', pad: 0.4, text: 'Deney 2: Aynı uzunlukta krom-nikel teller. Biri ince, biri kalın.', key: 'Kesit alanı' },
    { id: 'area-r', pad: 1.0, min: 7, text: 'İnce telde ampul daha sönük. Kesit alanı küçük olan telin direnci daha büyüktür.' },
    { id: 'mat', pad: 0.4, text: 'Deney 3: Aynı uzunlukta ve kalınlıkta bakır tel ve krom-nikel tel.', key: 'İletkenin cinsi' },
    { id: 'mat-r', pad: 1.0, min: 7, text: 'Krom-nikel telde ampul daha sönük. Direnç, iletkenin cinsine de bağlıdır.' },
    { id: 'table', pad: 1.2, min: 9, text: 'Verilerimi tabloya kaydettim. Direnç arttıkça ampulün parlaklığı azalıyor.', key: 'Veri analizi' },
    // SAHNE 5 — Reosta
    { id: 'rheo', pad: 0.6, text: 'Direnci, teli değiştirmeden ayarlayabilir miyim? Evet, reosta ile!', key: 'Reosta' },
    { id: 'rheo-how', pad: 0.6, text: 'Reostada sürgü, tel üzerinde kayar. Böylece akımın geçtiği telin uzunluğu değişir.' },
    { id: 'rheo-obs', pad: 0.8, min: 9, text: 'Sürgüyü kaydırdıkça tel uzuyor, direnç artıyor ve ampul sönükleşiyor.', key: 'Gözlem' },
    { id: 'rheo-data', pad: 1.0, min: 7.5, text: 'Sürgünün her konumunda parlaklığı tabloya kaydettim.', key: 'Veri topla' },
    // SAHNE 6 — Çıkarım
    { id: 'variable', pad: 0.8, text: 'Çıkarımım: Reosta, değeri değiştirilebilen bir dirençtir. Buna ayarlanabilir direnç de denir.', key: 'Ayarlanabilir direnç' },
    { id: 'symbol', pad: 0.8, min: 6.5, text: 'Devre şemasında direnç ve reosta bu sembollerle gösterilir.', key: 'Semboller' },
    { id: 'unit', pad: 0.8, text: 'Direncin birimi ohmdur. Ω simgesiyle gösterilir.', key: 'Birim: ohm (Ω)' },
    { id: 'daily', pad: 1.2, text: 'Günlük yaşamda bazı ısıtıcıların ayar düğmeleri de dirençle ilişkilidir.', key: 'Günlük yaşamda' },
    // SAHNE 7 — Sıra sende + sonraki film
    { id: 'yourturn', pad: 1.2, min: 9, text: 'Sıra sende! Kalem ucuyla basit bir reosta yap. Verilerini V diyagramıyla raporla.', key: 'Sıra sende!' },
    { id: 'next', pad: 1.0, text: 'Sıradaki gözlemim: Canlıların zenginliği, biyoçeşitlilik.' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
