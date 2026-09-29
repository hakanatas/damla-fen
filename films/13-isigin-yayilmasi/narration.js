// narration.js — Film 13: "Işığın Yolculuğu"  (Maarif FB.5.4.1)
// Tek düzenlenebilir metin kaynağı. Her "beat" bir anlatım cümlesidir (sessiz sürüm: altyazı).
const NARRATION = {
  film: '13-isigin-yayilmasi',
  title: 'Işığın Yolculuğu',
  outcome: 'FB.5.4.1 Bir kaynaktan çıkan ışığın her yönde doğrusal bir yol izlediğini bilimsel olarak gözlemleyebilme',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Karanlık oda, anahtar deliği
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.8, min: 6.5, text: 'Merhaba, ben Damla! Işığı kapatıp karanlıkta bir gözlem yapalım.' },
    { id: 'keyhole', pad: 0.6, text: 'Aa, anahtar deliğinden içeri ince bir ışık süzülüyor!' },
    { id: 'beam', pad: 0.8, text: 'Toz tanecikleri ışığın yolunu gösteriyor. Bu yol eğri değil, dümdüz!', key: 'Işığın yolu' },
    // SAHNE 2 — Işık kaynakları, soru, güvenlik
    { id: 'sources', pad: 0.8, min: 10, text: 'Işık, ışık kaynağından çıkar. Güneş ve yıldızlar doğal; ampul, el feneri ve mum yapay kaynaktır.', key: 'Işık kaynağı' },
    { id: 'question', pad: 0.6, min: 8, text: 'Işık nasıl yol alır? Eğri mi, düz mü? Tek yöne mi, her yöne mi?', key: 'Soru sor' },
    { id: 'safety', pad: 0.8, min: 7, text: 'Kural: Güneş’e, lazer ışığına ve güçlü fenerlere asla doğrudan bakmayız!', key: 'Gözünü koru!' },
    // SAHNE 3 — Rulo deneyi
    { id: 'tube', pad: 0.6, text: 'Bir kâğıdı rulo yaptım. İçinden küçük gece lambama bakacağım.', key: 'Gözlem' },
    { id: 'straight', pad: 0.8, min: 6, text: 'Rulo düzken lambayı görüyorum. Işık dümdüz gözüme geliyor.' },
    { id: 'bent', pad: 1.0, min: 6.5, text: 'Ruloyu büküyorum... Lamba kayboldu! Işık kıvrımda dönemiyor.' },
    { id: 'data', pad: 0.8, min: 6, text: 'Kaydediyorum: Düz rulo, görüldü. Bükülmüş rulo, görülmedi.', key: 'Veri kaydet' },
    // SAHNE 4 — İbnülheysem'in karanlık kutusu
    { id: 'ibn', pad: 0.8, text: 'Bin yıl kadar önce İbnülheysem, ışığı karanlık bir odada incelemişti.', key: 'İbnülheysem' },
    { id: 'box', pad: 0.6, text: 'Kutumun ön yüzünde küçücük bir delik var. Karşısında bir mum yanıyor.' },
    { id: 'image', pad: 1.0, min: 5.5, text: 'Arka yüzde mumun görüntüsü oluştu, ama ters!' },
    { id: 'why', pad: 0.6, min: 7.5, text: 'Alevin tepesinden gelen ışık delikten geçip aşağı iner, alttan gelen yukarı çıkar.' },
    { id: 'because', pad: 0.8, text: 'Çünkü ışık, düz çizgiler hâlinde yol alır.', key: 'Doğrusal yayılma' },
    // SAHNE 5 — Her yöne
    { id: 'alldirs', pad: 0.4, text: 'Işık tek yöne mi gider? Lambanın çevresine kartlar dizelim.' },
    { id: 'cards', pad: 0.8, min: 6, text: 'Öndeki, arkadaki, sağdaki, soldaki... Bütün kartlar aydınlandı!' },
    { id: 'every', pad: 0.6, text: 'Demek ki ışık, kaynağından her yöne yayılır.', key: 'Her yöne yayılır' },
    { id: 'torch', pad: 0.6, text: 'El feneri ışığı öne yönlendirir, ama her ışık yine dümdüz gider.' },
    { id: 'cloud', pad: 0.6, text: 'Bulut aralığından süzülen güneş ışığı da dümdüz çizgiler çizer.' },
    // SAHNE 6 — Işık ışını çizimi
    { id: 'ray', pad: 0.6, text: 'Işığın yolunu ok uçlu, düz bir çizgiyle çizeriz: ışık ışını.', key: 'Işık ışını' },
    { id: 'math', pad: 0.6, text: 'Matematikteki ışın gibi: Bir noktadan başlar, bir yönde dümdüz uzar.' },
    { id: 'wrong', pad: 1.0, text: 'Eğri ya da dalgalı çizmek yanlış. Ok ucu kaynaktan dışarı bakar.' },
    // SAHNE 7 — Kaydet, sıra sende, sonraki film
    { id: 'record', pad: 0.6, min: 8.5, text: 'Şimdi gözlemlerimi defterime kaydedeyim.', key: 'Kaydet' },
    { id: 'sum', pad: 0.6, text: 'Sonuç: Işık, kaynağından her yöne ve doğrusal bir yolla yayılır!' },
    { id: 'task', pad: 1.0, min: 8, text: 'Sıra sende! Kâğıt ruloyla arkadaşına bak: Önce düz, sonra bükük. Işınları çiz.' },
    { id: 'next', pad: 0.8, text: 'Sıradaki gözlemim: Işık her maddeden geçer mi?' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
