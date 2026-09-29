// narration.js — 6. sınıf Film 12: "Aynalar"  (Maarif FB.6.4.3)
// Tek düzenlenebilir metin kaynağı. Sessiz film: text = altyazı.
const NARRATION = {
  film: '12-aynalar',
  title: 'Aynalar',
  outcome: 'FB.6.4.3',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Çaydanlık ve boy aynası (köprü)
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.6, text: 'Merhaba! Çaydanlıkta kendi görüntümü gördüm. Küçücük ve şişkin görünüyorum!' },
    { id: 'kettle', pad: 0.8, text: 'Boy aynasında ise tam boyumdayım. Görüntülerim neden farklı?', key: 'Soru sor' },
    // SAHNE 2 — Üç ayna
    { id: 'three', pad: 0.8, min: 6, text: 'Üç çeşit aynayı inceleyelim: düz ayna, çukur ayna ve tümsek ayna.', key: 'Ayna çeşitleri' },
    { id: 'spoon', pad: 1.0, min: 5.5, text: 'Kaşığın içi çukur ayna gibidir, sırtı ise tümsek ayna gibidir.' },
    // SAHNE 3 — Düz ayna
    { id: 'plane', pad: 0.6, text: 'Önce düz ayna. Görüntüm düz duruyor ve benimle aynı boyda.', key: 'Düz ayna' },
    { id: 'lr', pad: 0.8, min: 6, text: 'Sağ elimi kaldırınca görüntüm sol elini kaldırıyor gibi. Sağ ve sol yer değiştirir.' },
    { id: 'dist', pad: 0.8, min: 6, text: 'Görüntüm aynanın arkasında, benimle aynı uzaklıkta görünür. Yaklaşınca o da yaklaşır.' },
    { id: 'ambul', pad: 1.0, min: 7, text: 'Ambulansın önündeki yazı ters yazılır. Öndeki sürücü onu dikiz aynasında düz okur!' },
    // SAHNE 4 — Tümsek ayna
    { id: 'convex', pad: 0.6, text: 'Şimdi tümsek ayna. Görüntüm yine düz ama daha küçük.', key: 'Tümsek ayna' },
    { id: 'wide', pad: 0.8, min: 6, text: 'Tümsek ayna ışınları dağıtır. Bu yüzden geniş bir alanı gösterir.', key: 'Geniş görüş alanı' },
    { id: 'convuse', pad: 1.0, min: 6, text: 'Kavşaklardaki trafik aynaları ve mağaza güvenlik aynaları tümsek aynadır.' },
    // SAHNE 5 — Çukur ayna
    { id: 'concave', pad: 0.6, text: 'Sıra çukur aynada. Yakından bakınca görüntüm düz ve büyük!', key: 'Çukur ayna' },
    { id: 'far', pad: 0.8, min: 7, text: 'Uzaklaşınca görüntüm ters dönüyor ve küçülüyor. Görüntü, uzaklığa göre değişir.', key: 'Uzaklık değişince' },
    { id: 'gather', pad: 0.6, min: 5.5, text: 'Çukur ayna, gelen ışınları bir bölgede toplar.' },
    { id: 'caveuse', pad: 0.8, min: 6, text: 'Diş hekimi aynası, makyaj aynası ve el feneri yansıtıcısı çukur aynadır.' },
    { id: 'danger', pad: 1.0, text: 'Dikkat! Çukur aynayla toplanan güneş ışığı yakabilir. Asla göze tutma!', key: 'Güvenlik' },
    // SAHNE 6 — İbnülheysem
    { id: 'ibn', pad: 0.6, min: 6, text: 'Yaklaşık bin yıl önce İbnülheysem, düz ve küresel aynalarda yansımayı deneylerle inceledi.', key: 'İbnülheysem' },
    { id: 'ibn2', pad: 1.0, text: 'Yansıma kanununu geometriyle kanıtladı. Optik kitabı yüzyıllarca okundu.' },
    // SAHNE 7 — Kaydet, Sıra sende, sonraki film
    { id: 'record', pad: 0.5, min: 12, text: 'Gözlemlerimi tabloya kaydedeyim.', key: 'Kaydet' },
    { id: 'task', pad: 0.8, min: 6.5, text: 'Sıra sende! Bir kaşığı yüzüne yaklaştırıp uzaklaştır. Görüntündeki değişimi kaydet.', key: 'Sıra sende' },
    { id: 'research', pad: 0.8, min: 5.5, text: 'Araştır: Kahkaha aynaları nasıl yapılır? Periskopta hangi aynalar kullanılır?' },
    { id: 'next', pad: 0.8, min: 5, text: 'Sıradaki gözlemim: Işık soğurulur mu? Cisimler neden renkli görünür?' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
