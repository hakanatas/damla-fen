// narration.js — Film 18: "Karışınca Ne Olur? Isı Alışverişi"  (Maarif FB.5.5.3)
// Tek düzenlenebilir metin kaynağı. Sessiz film: text → altyazı.
const NARRATION = {
  film: '18-isi-alisverisi',
  title: 'Karışınca Ne Olur? Isı Alışverişi',
  outcome: 'FB.5.5.3 Sıcaklığı farklı olan sıvıların karıştırılması sonucu ısı alışverişi olduğuna yönelik bilimsel çıkarım yapabilme',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.6, text: 'Merhaba, ben Damla! Önümde iki kap su var: biri soğuk, biri sıcak.' },
    { id: 'q', pad: 0.8, text: 'Bunları karıştırırsam karışımın sıcaklığı ne olur?', key: 'Soru sor' },
    // SAHNE 2 — TGA: Tahmin
    { id: 'predict', pad: 0.6, text: 'Önce tahmin edelim! Tahmin et, gözle, açıkla: TGA.', key: 'T: Tahmin' },
    { id: 'guesses', pad: 0.8, min: 10, text: 'Karışım 80 derece mi olur? 20 dereceden soğuk mu? Yoksa ikisinin arasında mı? Tahminini yaz!' },
    // SAHNE 3 — Deney tasarımı + güvenlik
    { id: 'design', pad: 0.6, min: 7, text: 'Deneyimi tasarlıyorum. Sıcaklıkları ölçmek için termometre seçiyorum.', key: 'Deney tasarla' },
    { id: 'vars', pad: 0.8, min: 6.5, text: 'Sıvılar aynı tür olmalı: su ile su. Miktarları da eşit olsun.', key: 'Aynı tür sıvı' },
    { id: 'safety', pad: 0.8, text: 'Sıcak suyu bir yetişkin hazırlar. Dikkatli ve sabırlı çalışırız!', key: 'Güvenlik' },
    // SAHNE 4 — Gözlem: ölç, kaydet, karıştır, bekle
    { id: 'before', pad: 0.8, min: 7, text: 'Karıştırmadan önce ölçüyorum: soğuk su 20 °C, sıcak su 60 °C.', key: 'G: Gözlem' },
    { id: 'rec1', pad: 0.6, min: 4.5, text: 'Ölçümleri çalışma yaprağıma yazıyorum.' },
    { id: 'mix', pad: 0.6, min: 6, text: 'Şimdi eşit miktardaki suları karıştırıyorum.' },
    { id: 'wait', pad: 0.6, min: 7, text: 'Sabırla karıştırıp termometrenin durmasını bekliyorum...', key: 'Sabır' },
    { id: 'after', pad: 1.0, min: 6.5, text: 'Karışım 39 °C oldu! İki sıcaklığın neredeyse tam ortası.' },
    // SAHNE 5 — Açıklama
    { id: 'explain', pad: 0.8, min: 8, text: 'Neden böyle oldu? Tanecik modeliyle bakalım.', key: 'A: Açıklama' },
    { id: 'flow', pad: 0.8, min: 8, text: 'Isı, sıcaklığı yüksek olan sudan düşük olana akar. Sıcak su ısı verir, soğuk su ısı alır.', key: 'Isı alışverişi' },
    { id: 'equil', pad: 0.8, min: 7, text: 'Sıcaklıklar eşitlenince ısı akışı durur. Buna termal denge denir.', key: 'Termal denge' },
    { id: 'ideal', pad: 1.0, text: 'Hesapla 40 °C beklenir. Ama biraz ısı kaba ve havaya geçer; bu yüzden 39 °C ölçtüm.' },
    { id: 'equal', pad: 1.0, min: 7, text: 'Sıcaklıkları eşit iki su karışırsa? Isı alışverişi olmaz, sıcaklık değişmez.', key: 'Eşit sıcaklık' },
    // SAHNE 6 — Günlük yaşam + genelleme
    { id: 'daily', pad: 0.8, min: 11, text: 'Günlük yaşamda da böyle: çorbadaki kaşık ısınır, buzlu içecek soğur, kalorifer odanın havasını ısıtır.' },
    { id: 'nature', pad: 1.0, text: 'Doğada maddeler arasında hep ısı alışverişi vardır.', key: 'Genelleme' },
    // SAHNE 7 — Rapor + görev + sonraki
    { id: 'record', pad: 0.6, min: 9, text: 'Deney raporumu yazıyorum: tahmin, ölçümler ve açıklama.', key: 'Raporla' },
    { id: 'task', pad: 0.8, min: 7, text: 'Sıra sende! Bir yetişkinle deneyi farklı miktarlarla tekrarla ya da sanal laboratuvarda dene.' },
    { id: 'next', pad: 1.0, text: 'Sıradaki gözlemim: ısı, maddenin hâlini nasıl değiştirir?' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
