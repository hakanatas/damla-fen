// narration.js — 7. sınıf Film 13: "Mercekler"  (Maarif FB.7.4.2 · FB.7.4.3)
// Tek düzenlenebilir metin kaynağı. Sessiz film: text = altyazı.
const NARRATION = {
  film: '13-mercekler',
  title: 'Mercekler',
  outcome: 'FB.7.4.2 · FB.7.4.3',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Yapraktaki damlalar (köprü kurma)
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.6, min: 8, text: 'Merhaba! Yağmurdan sonra yaprağa baktım. Damlaların altındaki damarlar daha belirgin görünüyor!', key: 'Gözlem' },
    { id: 'text', pad: 0.6, min: 7, text: 'Üzerine su damlamış yazı da daha büyük görünüyor. Damlalar mercek gibi mi davranıyor?', key: 'Soru sor' },
    { id: 'define', pad: 1.0, text: 'Mercek, ışığı kırarak yolunu değiştiren, en az bir yüzeyi eğri, saydam bir cisimdir.', key: 'Mercek' },
    // SAHNE 2 — İki mercek: şekil ve görüntü
    { id: 'two', pad: 0.5, min: 6, text: 'Grubumuza iki mercek verildi. Yandan bakalım ve kenarlarına dikkat edelim.', key: 'Mercek çeşitleri' },
    { id: 'thin', pad: 0.8, text: 'Ortası kalın, kenarları ince olana ince kenarlı mercek denir.', key: 'İnce kenarlı mercek' },
    { id: 'thick', pad: 0.8, text: 'Ortası ince, kenarları kalın olana kalın kenarlı mercek denir.', key: 'Kalın kenarlı mercek' },
    { id: 'look', pad: 0.4, min: 6, text: 'İkisiyle de yakındaki bir yazıya bakalım ve gözlemimizi kaydedelim.', key: 'Veri kaydet' },
    { id: 'bigger', pad: 0.8, min: 6, text: 'İnce kenarlı mercekte yazı olduğundan büyük görünüyor.' },
    { id: 'smaller', pad: 0.8, min: 6, text: 'Kalın kenarlı mercekte ise yazı olduğundan küçük görünüyor.' },
    // SAHNE 3 — Işık ışınları: toplama ve dağıtma
    { id: 'rays', pad: 0.5, min: 6, text: 'Şimdi merceklere paralel ışınlar gönderip ışığın yolunu izleyelim.', key: 'Işığın yolu' },
    { id: 'converge', pad: 0.8, min: 7, text: 'Işık mercekte iki kez kırılıyor. İnce kenarlı mercek ışınları bir noktada topluyor.', key: 'Toplayıcı mercek' },
    { id: 'focus', pad: 1.0, text: 'Işınların toplandığı bu noktaya odak noktası denir.', key: 'Odak noktası' },
    { id: 'diverge', pad: 0.8, min: 7, text: 'Kalın kenarlı mercek ise ışınları kırarak dağıtıyor.', key: 'Dağıtıcı mercek' },
    { id: 'vfocus', pad: 1.0, min: 7, text: 'Dağılan ışınların geriye doğru uzantıları, merceğin önündeki odak noktasında kesişir.' },
    // SAHNE 4 — Karşılaştırma tablosu
    { id: 'compare', pad: 0.8, min: 10, text: 'Bulduklarımı karşılaştırma tablosuna kaydedeyim.', key: 'Karşılaştır' },
    // SAHNE 5 — Güvenlik ve çevre
    { id: 'safety', pad: 0.8, min: 7, text: 'Dikkat! Mercekle güneş ışığını asla bir noktada toplamayın. Yangın çıkabilir, gözler zarar görebilir.', key: 'Güvenlik' },
    { id: 'forest', pad: 0.8, min: 7.5, text: 'Ormana atılan cam kırıkları ve su dolu pet şişeler de mercek gibi davranıp yangına yol açabilir.', key: 'Çevreyi koru' },
    { id: 'protect', pad: 1.0, text: 'Çöplerimizi doğada bırakmayalım; ormanlarımızı birlikte koruyalım.' },
    // SAHNE 6 — Kullanım alanları: belirle, ayrıştır, grupla, etiketle
    { id: 'uses', pad: 0.5, min: 8, text: 'Mercekleri günlük hayatta nerelerde kullanıyoruz? Önce kullanım alanlarını belirleyelim.', key: 'Kullanım alanları' },
    { id: 'sort', pad: 0.6, min: 6.5, text: 'Şimdi ayrıştıralım: Hangisinde ışığı toplayan, hangisinde dağıtan mercek var?', key: 'Ayrıştır ve grupla' },
    { id: 'group1', pad: 0.8, min: 8, text: 'Büyüteç, mikroskop, mercekli teleskop ve fotoğraf makinesinde ince kenarlı mercek kullanılır.' },
    { id: 'group2', pad: 0.8, min: 7, text: 'Yakını net göremeyenlerin gözlüğü ince kenarlı, uzağı net göremeyenlerin gözlüğü kalın kenarlı mercektir.' },
    { id: 'label', pad: 1.0, min: 6, text: 'Son olarak her gruba bir etiket yazalım.', key: 'Etiketle' },
    { id: 'tubitak', pad: 1.0, min: 8, text: 'Biliyor musun? Yerli uydularımızın mercek ve prizma gibi parçaları TÜBİTAK UZAY’da üretiliyor.', key: 'Yerli üretim' },
    // SAHNE 7 — Sıra sende + sonraki film
    { id: 'task', pad: 0.8, min: 8, text: 'Sıra sende! Evindeki mercekli araçları bul, iki gruba ayır ve etiketleyerek bir afişte sun.', key: 'Sıra sende' },
    { id: 'research', pad: 0.8, min: 6.5, text: 'Merak et: İki mercekle basit bir teleskop nasıl tasarlanır?' },
    { id: 'next', pad: 0.8, min: 5.5, text: 'Sıradaki gözlemim: maddenin yapı taşı, atom!' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
