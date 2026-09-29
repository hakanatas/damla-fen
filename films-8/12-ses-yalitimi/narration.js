// narration.js — 8. sınıf Film 12: "Sesin Madde ile Etkileşimi ve Ses Kirliliği"  (Maarif FB.8.4.5 · FB.8.4.6)
// TYMM sınırlamaları: yankı olayına girilmez · ses yalıtım malzeme çeşitlerine girilmez · ses şiddeti birimi verilmez
const NARRATION = {
  film: '12-ses-yalitimi',
  title: 'Sesin Madde ile Etkileşimi ve Ses Kirliliği',
  outcome: 'FB.8.4.5 · FB.8.4.6',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Banyo ve salon (köprü)
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hook', pad: 0.8, min: 8.5, text: 'Banyoda şarkı söyleyince sesim daha güçlü duyuluyor. Salonda ise daha yumuşak. Neden farklı?', key: 'Soru' },
    // SAHNE 2 — İletim, yansıma, soğurulma (FB.8.4.5 a)
    { id: 'meet', pad: 0.6, min: 8.5, text: 'Ses bir maddeye çarpınca bir kısmı geri döner, bir kısmı içinden geçer, bir kısmı da tutulur.', key: 'Ses ve madde' },
    { id: 'terms', pad: 0.8, min: 8, text: 'Geri dönmesine yansıma, geçmesine iletim, madde tarafından tutulmasına soğurulma denir.', key: 'Yansıma · iletim · soğurulma' },
    { id: 'transmit', pad: 0.8, min: 7, text: 'Komşunun müziğini duvarın arkasından da duyarız, çünkü ses duvardan iletilir.', key: 'İletim' },
    // SAHNE 3 — Yansıma/soğurma deneyi (FB.8.4.5 b)
    { id: 'setup', pad: 0.6, min: 8, text: 'Deneyim: Saatin sesini bir boruyla yüzeye gönderiyorum. Yansıyan sesi öbür borudan dinliyorum.', key: 'Deney' },
    { id: 'surfaces', pad: 0.6, min: 9, text: 'Yalnızca yüzeyi değiştiriyorum: metal tepsi, tahta, kumaş ve girintili çıkıntılı sünger.' },
    { id: 'data', pad: 0.8, min: 7.5, text: 'Sert ve düz metalden ses en güçlü yansıdı. Yumuşak, gözenekli süngerden ise en az.', key: 'Veri' },
    { id: 'infer', pad: 0.8, min: 9, text: 'Sert ve düz yüzeyler sesi daha çok yansıtır. Yumuşak, gözenekli, girintili çıkıntılı yüzeyler sesi soğurur.', key: 'Çıkarım' },
    { id: 'differ', pad: 1.0, min: 8.5, text: 'Maddelerin sesi soğurma özellikleri farklıdır. Banyodaki fayans sesi yansıtır; salondaki halı ve perde soğurur.' },
    // SAHNE 4 — Akustik (FB.8.4.5 c)
    { id: 'acoustic', pad: 0.8, text: 'Sesin oluşumunu, iletilmesini, soğurulmasını ve gürültü kontrolünü inceleyen bilim dalına akustik denir.', key: 'Akustik' },
    { id: 'sinan', pad: 1.0, min: 8.5, text: 'Mimar Sinan, Edirne’deki Selimiye Camii’nde sesin her yere iyi ulaşması için akustiğe özen göstermiştir.' },
    // SAHNE 5 — Ses kirliliği ve canlılara etkisi (FB.8.4.6 a)
    { id: 'noise', pad: 0.6, min: 8.5, text: 'Okulun yanındaki yolda korna ve motor sesleri hiç bitmiyor. Gürültünün çevrede yaygınlaşmasına ses kirliliği denir.', key: 'Ses kirliliği' },
    { id: 'effects', pad: 0.6, text: 'Ses kirliliği işitme kaybına, uykusuzluğa, strese ve dikkat dağınıklığına yol açabilir.', key: 'Olumsuz etkiler' },
    { id: 'animals', pad: 0.8, text: 'Hayvanlar da etkilenir. Kuşlar birbirini duymakta zorlanır; gemi gürültüsü balinaların iletişimini bozar.' },
    { id: 'problem', pad: 0.8, text: 'Problemim: Yol gürültüsü sınıfımızdaki dersi nasıl etkiliyor ve nasıl azaltabiliriz?', key: 'Problem' },
    // SAHNE 6 — Model, araştırma, kanıta dayalı çözüm, sorumluluk (FB.8.4.6 b–e)
    { id: 'model', pad: 0.8, min: 8.5, text: 'Fikrim: Yol kenarına ağaç şeridi, pencerelere çift cam, sınıfa kalın perdeler.', key: 'Model' },
    { id: 'research', pad: 0.8, min: 8, text: 'Araştırmamı planladım: Pencere açık ve kapalıyken, perde varken ve yokken gürültüyü karşılaştırdım.', key: 'Araştırma' },
    { id: 'analyze', pad: 0.8, min: 8, text: 'Verilere göre kapalı pencere ve perde gürültüyü azalttı. Çözümümü bu kanıta dayandırdım.', key: 'Kanıta dayalı çözüm' },
    { id: 'respons', pad: 1.0, text: 'Gereksiz korna çalmamak, gece yüksek sesle müzik dinlememek başkalarına saygıdır. Sorumluluk hepimizin!' },
    // SAHNE 7 — Kaydet, Sıra sende, sıradaki
    { id: 'record', pad: 0.6, min: 9, text: 'Bulduklarımı gözlem defterime kaydediyorum.', key: 'Kaydet' },
    { id: 'task', pad: 0.8, min: 9, text: 'Sıra sende! Çevrende bir ses kirliliği problemi seç. Kanıta dayalı çözümünü poster ya da sunumla paylaş.' },
    { id: 'next', pad: 0.8, min: 6, text: 'Sıradaki gözlemim: Elementlerin dünyası, periyodik tablo!' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
