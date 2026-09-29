// narration.js — 8. sınıf Film 1: "Mevsimler Nasıl Oluşur?"  (Maarif FB.8.1.1)
// Sessiz film: text → altyazı. Süreler: python3 tools/tts.py films-8/01-mevsimler --silent --wps=2.1
const NARRATION = {
  film: '01-mevsimler',
  title: 'Mevsimler Nasıl Oluşur?',
  outcome: 'FB.8.1.1',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.6, min: 7, text: 'Merhaba, ben Damla! Bugün 21 Aralık. Öğle vakti çubuğun gölgesi upuzun. Yazın ise kısacıktı!' },
    { id: 'q', pad: 0.8, min: 7.5, text: 'Mevsimler neden oluşur? Gölge neden uzayıp kısalır? Kışın günler neden kısalır?', key: 'Soru sor' },
    // SAHNE 2 — Kavram yanılgısı: uzaklık
    { id: 'guess', pad: 0.6, text: 'Bir tahminim var: Yazın Güneş’e yakın, kışın uzak oluyoruz. Bunu kanıtlarla sınayalım.', key: 'Tahmin' },
    { id: 'close', pad: 0.8, min: 8, text: 'Yörüngemiz neredeyse bir çemberdir. Dünya, Güneş’e en çok ocak başında yaklaşır. Oysa biz o sırada kıştayız!', key: 'Kanıt 1' },
    { id: 'hemi', pad: 1.0, min: 8, text: 'Üstelik biz kıştayken Avustralya’da yaz yaşanır. Demek ki mevsimlerin nedeni uzaklık değil!', key: 'Kanıt 2' },
    // SAHNE 3 — Eksen eğikliği
    { id: 'axis', pad: 0.6, text: 'Kaynaklardan araştırdım: Dünya, kutuplarından geçen hayali bir eksen etrafında döner.', key: 'Dönme ekseni' },
    { id: 'plane', pad: 0.6, text: 'Yörüngesinin oluşturduğu düzleme dolanma düzlemi denir.', key: 'Dolanma düzlemi' },
    { id: 'tilt', pad: 0.8, min: 7, text: 'Dönme ekseni, dolanma düzlemine dik doğrultuyla yaklaşık 23,5 derecelik açı yapar.', key: 'Eksen eğikliği' },
    { id: 'lines', pad: 1.0, min: 8, text: 'Ekvator, Dünya’yı iki yarım küreye ayırır. Ekvatorun 23,5 derece kuzeyinde ve güneyinde dönenceler vardır.', key: 'Ekvator · Dönenceler' },
    // SAHNE 4 — Dolanma ve tarihler
    { id: 'tour', pad: 0.6, min: 6.5, text: 'Şimdi Dünya’yı Güneş’in etrafında dolandıralım. Eksen hep aynı yöne eğik kalıyor.', key: 'Dolanma' },
    { id: 'june', pad: 0.8, min: 8.5, text: '21 Haziran: Kuzey Yarım Küre Güneş’e doğru eğik. Işınlar Yengeç Dönencesi’ne dik düşer. Bizde yaz başlar.', key: '21 Haziran' },
    { id: 'dec', pad: 0.8, min: 8.5, text: '21 Aralık: Güney Yarım Küre Güneş’e doğru eğik. Işınlar Oğlak Dönencesi’ne dik düşer. Bizde kış başlar.', key: '21 Aralık' },
    { id: 'equi', pad: 0.8, min: 8.5, text: '21 Mart ve 23 Eylül: Işınlar ekvatora dik düşer. Gece ve gündüz her yerde yaklaşık eşittir: ekinoks!', key: 'Ekinoks' },
    { id: 'south', pad: 1.0, min: 7, text: 'Güney Yarım Küre’de mevsimler terstir: 21 Haziran’da kış, 21 Aralık’ta yaz başlar.', key: 'Yarım küreler' },
    // SAHNE 5 — Işının düşme açısı modeli
    { id: 'model', pad: 0.6, text: 'Işınların düşme açısı sıcaklığı nasıl etkiler? Lamba ve termometrelerle bir model kuruyorum.', key: 'Işının düşme açısı' },
    { id: 'safe', pad: 0.6, min: 5, text: 'Lamba ısınır, dokunmam; deneyi bir yetişkin eşliğinde yaparım.', key: 'Güvenlik' },
    { id: 'spread', pad: 0.8, min: 8, text: 'Dik gelen ışık küçük bir alanı aydınlatır. Eğik gelen aynı ışık daha geniş bir alana yayılır.' },
    { id: 'therm', pad: 1.0, min: 6.5, text: 'Bu yüzden dik ışık alan yüzey daha çok ısınır. Termometreler de bunu gösteriyor!', key: 'Dik ışın · daha çok ısınma' },
    // SAHNE 6 — Veri, yorum, çıkarım
    { id: 'data', pad: 0.8, min: 9, text: 'İstanbul için verileri kaydediyorum: öğle vakti ışınların düşme açısı, 1 metrelik çubuğun gölgesi, gündüz süresi.', key: 'Verileri kaydet' },
    { id: 'interp', pad: 0.8, min: 7.5, text: 'Yorumum: Işınlar dike yaklaştıkça gölge kısalır, gündüz uzar ve yüzey daha çok ısınır.', key: 'Yorumla' },
    { id: 'infer', pad: 0.8, text: 'Çıkarımım: Mevsimler, eksen eğikliği ve Dünya’nın Güneş etrafında dolanması sonucu oluşur.', key: 'Bilimsel çıkarım' },
    // SAHNE 7 — Kaydet
    { id: 'record', pad: 0.8, min: 9.5, text: 'Bulduklarımı gözlem defterime kaydediyorum.', key: 'Kaydet' },
    // SAHNE 8 — Sıra sende + sonraki
    { id: 'task', pad: 1.0, min: 9, text: 'Sıra sende! Bir hafta boyunca aynı yerde, öğle vakti bir çubuğun gölge boyunu ölç ve kaydet.', key: 'Sıra sende' },
    { id: 'next', pad: 1.0, text: 'Sıradaki gözlemim: Bugün yağmur yağacak mı? Hava olayları ve iklim!' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
