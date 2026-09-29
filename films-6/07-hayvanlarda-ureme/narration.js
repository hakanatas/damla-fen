// narration.js — 6. sınıf Film 7: "Yumurtadan Kelebeğe: Hayvanlarda Üreme"  (Maarif FB.6.3.4)
const NARRATION = {
  film: '07-hayvanlarda-ureme',
  title: 'Yumurtadan Kelebeğe: Hayvanlarda Üreme',
  outcome: 'FB.6.3.4 Hayvanlarda üreme, büyüme ve gelişme hakkında bilimsel çıkarım yapabilme',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak + beyin fırtınası
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.6, text: 'Merhaba! Bugün hayvanların nasıl çoğaldığını, büyüyüp geliştiğini araştırıyorum.' },
    { id: 'storm', pad: 0.8, min: 9, text: 'Beyin fırtınası: Kedi yavru doğurur, tavuk yumurtlar. Peki hidra ve deniz yıldızı?', key: 'Beyin fırtınası' },
    // SAHNE 2 — Eşeyli ve eşeysiz
    { id: 'both', pad: 1.0, min: 9, text: 'Hayvanların çoğu eşeyli ürer. Hidra ve deniz yıldızı ise eşeysiz de üreyebilir.', key: 'Eşeyli · eşeysiz' },
    // SAHNE 3 — Doğurarak / yumurtayla
    { id: 'birth', pad: 0.8, min: 8, text: 'Bazı hayvanlar yavrularını doğurur: kedi, inek, yunus ve yarasa gibi.', key: 'Doğurarak çoğalma' },
    { id: 'egg', pad: 1.0, min: 8, text: 'Bazıları ise yumurtayla çoğalır: tavuk, kaplumbağa, balık ve kelebek gibi.', key: 'Yumurtayla çoğalma' },
    // SAHNE 4 — Büyüme ve gelişme
    { id: 'grow', pad: 1.0, min: 8, text: 'Yavru kedi doğduğunda annesine benzer. Beslenerek büyür ve gelişir.', key: 'Büyüme ve gelişme' },
    // SAHNE 5 — Başkalaşım
    { id: 'meta', pad: 0.6, text: 'Bazı hayvanlar ise gelişirken şekil değiştirir. Buna başkalaşım denir.', key: 'Başkalaşım' },
    { id: 'butterfly', pad: 1.0, min: 12, text: 'Kelebek: yumurta, tırtıl, pupa ve ergin kelebek. Yavru, erginine hiç benzemez. Bu tam başkalaşımdır.', key: 'Tam başkalaşım' },
    { id: 'grass', pad: 1.0, min: 11, text: 'Çekirgenin yavrusu erginine benzer ama kanatları gelişmemiştir. Deri değiştirerek büyür. Bu eksik başkalaşımdır.', key: 'Eksik başkalaşım' },
    { id: 'frog', pad: 1.0, min: 11, text: 'Kurbağa da başkalaşım geçirir: Yumurtadan çıkan iribaş suda yaşar, zamanla bacakları çıkar ve kurbağaya dönüşür.' },
    // SAHNE 6 — Faktörler, veri, koruma
    { id: 'factors', pad: 0.6, min: 8, text: 'Büyüme ve gelişme için yeterli besin, su, uygun sıcaklık ve güvenli bir ortam gerekir.', key: 'Büyüme faktörleri' },
    { id: 'data', pad: 0.8, min: 10, text: 'Sınıfımızın ipek böceği kayıtlarına baktım. Tırtıllar dut yaprağıyla beslenip hızla büyüdü.', key: 'Veri topla, kaydet' },
    { id: 'interp', pad: 1.0, min: 10, text: 'Tırtıl yaklaşık dört haftada yirmi kattan fazla uzadı! Sonra koza ördü ve içinde pupaya dönüştü.', key: 'Veriyi yorumla' },
    { id: 'protect', pad: 1.0, text: 'Hayvanları sevelim ve koruyalım. Yuvalarına, yumurtalarına ve yaşam alanlarına zarar vermeyelim.', key: 'Hayvanları koru' },
    // SAHNE 7 — Kaydet
    { id: 'record', pad: 0.8, min: 11, text: 'Bulduklarımı gözlem defterime kaydediyorum.', key: 'Kaydet' },
    // SAHNE 8 — Sıra sende + Sıradaki
    { id: 'task', pad: 1.0, min: 9, text: 'Sıra sende! Bir hayvanın yaşam döngüsünü araştır ve poster yap. Merak ettiğin soruları da yaz.' },
    { id: 'next', pad: 1.2, text: 'Sıradaki gözlemim: insanda üreme ve ergenlik.' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
