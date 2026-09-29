// narration.js — 6. sınıf Film 11: "Işığın Yansıması"  (Maarif FB.6.4.1 · FB.6.4.2)
// Tek düzenlenebilir metin kaynağı. Sessiz film: text = altyazı.
const NARRATION = {
  film: '11-yansima',
  title: 'Işığın Yansıması',
  outcome: 'FB.6.4.1 · FB.6.4.2',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Ay bir ışık kaynağı mı?
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.8, text: 'Merhaba! Ben Damla. Bu gece Ay çok parlak. Peki Ay bir ışık kaynağı mıdır?', key: 'Soru sor' },
    { id: 'moona', pad: 1.0, min: 6.5, text: 'Hayır! Güneş’ten gelen ışık Ay’ın yüzeyine çarpıp gözümüze gelir.', key: 'Ay ışık kaynağı değildir' },
    { id: 'define', pad: 1.0, text: 'Işığın bir yüzeye çarpıp geri dönmesine yansıma denir.', key: 'Yansıma' },
    // SAHNE 2 — Saatin camı (köprü) + güvenlik
    { id: 'watch', pad: 0.8, min: 8, text: 'Saatimin camı duvara bir ışık lekesi düşürdü. Saati eğince leke kayıyor. Neden?' },
    { id: 'safety', pad: 0.8, text: 'Dikkat! Yansıyan güneş ışığını asla kimsenin gözüne tutma.', key: 'Güvenlik' },
    // SAHNE 3 — Folyo deneyi (FB.6.4.1)
    { id: 'foil', pad: 0.5, text: 'Bir deney yapalım: düzgün ve buruşturulmuş iki alüminyum folyo.', key: 'Deney' },
    { id: 'look', pad: 0.8, text: 'Düzgün folyoda görüntümü görüyorum, buruşuk folyoda göremiyorum.', key: 'Gözlem' },
    { id: 'shine', pad: 0.3, min: 5, text: 'İkisine de aynı açıdan el feneri tutalım.' },
    { id: 'regular', pad: 0.8, text: 'Düzgün yüzeyde ışınlar paralel yansıdı: düzgün yansıma.', key: 'Düzgün yansıma' },
    { id: 'diffuse', pad: 1.0, text: 'Pürüzlü yüzeyde ışınlar farklı yönlere dağıldı: dağınık yansıma.', key: 'Dağınık yansıma' },
    // SAHNE 4 — Veri tablosu + günlük hayat
    { id: 'table', pad: 0.4, min: 8.5, text: 'Gözlemlerimi bir tabloya kaydedeyim.', key: 'Kaydet' },
    { id: 'everyday', pad: 0.8, text: 'Ayna ve durgun su düzgün yansıtır. Kâğıt, duvar ve kumaş dağınık yansıtır.' },
    { id: 'see', pad: 1.0, min: 5, text: 'Dağınık yansıma sayesinde cisimleri her yerden görebiliriz.' },
    // SAHNE 5 — Gelen ışın, yansıyan ışın, normal (FB.6.4.2)
    { id: 'mirror', pad: 0.4, text: 'Şimdi bir aynada tek bir ışının yolunu izleyelim.' },
    { id: 'incident', pad: 0.8, text: 'Aynaya gelene gelen ışın, aynadan dönene yansıyan ışın denir.', key: 'Gelen ve yansıyan ışın' },
    { id: 'normal', pad: 0.8, text: 'Çarpma noktasından yüzeye dik çizgi: yüzeyin normali.', key: 'Yüzey normali' },
    { id: 'angles', pad: 1.0, text: 'Gelen ışınla normal arasında gelme açısı, yansıyan ışınla normal arasında yansıma açısı var.', key: 'Gelme ve yansıma açısı' },
    // SAHNE 6 — Ölçüm ve veri seti
    { id: 'measure', pad: 0.3, text: 'Işık kaynağını döndürüp iki açıyı da ölçelim.', key: 'Veri topla' },
    { id: 'data', pad: 0.6, min: 10.5, text: 'Otuz derece... kırk beş derece... altmış derece...' },
    { id: 'equal', pad: 0.8, text: 'Her denemede gelme açısı, yansıma açısına eşit!', key: 'Gelme açısı = Yansıma açısı' },
    { id: 'sides', pad: 1.0, text: 'Gelen ve yansıyan ışın, normalin iki farklı yanındadır.' },
    // SAHNE 7 — Kural her yüzeyde
    { id: 'rule', pad: 0.8, min: 7, text: 'Pürüzlü yüzeyde de her ışın bu kurala uyar. Ama her noktanın normali farklıdır.', key: 'Her ışın kurala uyar' },
    { id: 'why', pad: 1.0, min: 6, text: 'Bu yüzden ışınlar dağılır. Saat eğilince de normal döner, leke kayar!' },
    // SAHNE 8 — Kaydet, Sıra sende, sonraki film
    { id: 'record', pad: 0.5, min: 11, text: 'Bulduklarımı gözlem defterime kaydedeyim.', key: 'Kaydet' },
    { id: 'task', pad: 0.8, min: 7, text: 'Sıra sende! Ayna ve el feneriyle üç açı dene, sonuçları arkadaşlarınla karşılaştır.', key: 'Sıra sende' },
    { id: 'research', pad: 0.8, min: 5.5, text: 'Araştır: Spot lambaların çanağı neden parlak ve pürüzlü yapılır?' },
    { id: 'next', pad: 0.8, min: 5, text: 'Sıradaki gözlemim: düz, çukur ve tümsek aynalar!' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
