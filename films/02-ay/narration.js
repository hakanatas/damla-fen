// narration.js — Film 2: "Gökyüzündeki Komşumuz: Ay"  (Maarif FB.5.1.2)
// Tek düzenlenebilir metin kaynağı. Her "beat" bir altyazı cümlesidir (film sessizdir).
const NARRATION = {
  film: '02-ay',
  title: 'Gökyüzündeki Komşumuz: Ay',
  outcome: 'FB.5.1.2 Ay\'ın özellikleri, dönme ve dolanma hareketleri ile ilgili bilimsel çıkarım yapabilme',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Gece
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.8, text: 'Merhaba, ben Damla! Güneş battı, gökyüzünde komşumuz Ay parlıyor!' },
    { id: 'safe', pad: 1.0, text: 'Ay\'a dürbünle bakabilirim, ışığı sönüktür. Ama Güneş\'e asla!', key: 'Ay gözlemi' },
    // SAHNE 2 — Merak
    { id: 'questions', pad: 0.8, min: 9, text: 'Aklımda sorular var: Ay neden parlıyor? Yüzeyi nasıl? Peki, Ay da döner mi?', key: 'Soru sor' },
    { id: 'news', pad: 1.0, text: 'Haberlere göre Ay\'da donmuş su bulundu! Hadi Ay\'ı yakından tanıyalım.', key: 'Güncel bilgi' },
    // SAHNE 3 — Ay'ın nitelikleri
    { id: 'moon-sat', pad: 0.8, text: 'Ay, Dünya\'nın doğal uydusudur; Dünya\'nın çevresinde dolanır.', key: 'Doğal uydu' },
    { id: 'nolight', pad: 0.8, text: 'Ay\'ın kendi ışığı yoktur. Güneş\'ten aldığı ışığı yansıttığı için parlak görünür.', key: 'Kendi ışığı yok' },
    { id: 'surface', pad: 1.0, text: 'Yüzeyi kayalık ve tozludur. Kraterler, dağlar ve düzlükler vardır.', key: 'Kraterler' },
    { id: 'air', pad: 1.0, text: 'Ay\'da nefes alacak hava yoktur. Oradan gökyüzü gündüz bile kara görünür.', key: 'Hava yok' },
    { id: 'temp', pad: 1.0, text: 'Gündüz 100 °C\'nin üzerine çıkar, gece −150 °C\'nin altına iner.', key: 'Sıcaklık farkı' },
    { id: 'water', pad: 0.8, text: 'Hiç Güneş ışığı almayan kutup kraterlerinde ise buz bulunur.', key: 'Buz' },
    // SAHNE 4 — Verileri kaydet
    { id: 'record', pad: 0.6, min: 10, text: 'Topladığım verileri çalışma yaprağıma kaydedeyim.', key: 'Verileri kaydet' },
    // SAHNE 5 — Dönme ve dolanma
    { id: 'revolve', pad: 1.0, text: 'Kuzeyden bakalım: Ay, Dünya\'nın çevresinde dolanır. Bir turu yaklaşık 27,3 gün sürer.', key: 'Dolanma' },
    { id: 'rotate', pad: 1.0, text: 'Kendi ekseni etrafında da döner. Bir dönüşü de yaklaşık 27,3 gün sürer!', key: 'Dönme' },
    { id: 'dir', pad: 1.2, text: 'Kuzeyden bakınca iki hareket de saat yönünün tersinedir.', key: 'Yön' },
    // SAHNE 6 — Rol oynama: neden hep aynı yüz?
    { id: 'same-q', pad: 0.8, text: 'Dünya\'dan hep Ay\'ın aynı yüzünü görürüz. Neden acaba?', key: 'Hep aynı yüz' },
    { id: 'roleplay', pad: 0.6, min: 8.5, text: 'Rol oynayalım! Ben Ay\'ım, bu küre Dünya. Yüzüm hep ona dönük yürüyorum.', key: 'Rol oynama' },
    { id: 'turned', pad: 1.0, text: 'Bir tur bitti; kendi çevremde de bir kez döndüm. Dünya sırtımı hiç görmedi!' },
    { id: 'noturn', pad: 0.6, min: 8, text: 'Peki hiç dönmeden yürüseydim? O zaman Dünya sırtımı da görürdü.' },
    { id: 'because', pad: 1.0, text: 'Sonuç: Ay\'ın dönme ve dolanma süreleri eşit. Bu yüzden hep aynı yüzü görürüz.', key: 'Süreler eşit' },
    // SAHNE 7 — Yorumla, değerlendir
    { id: 'darkside', pad: 1.0, min: 9, text: 'Dikkat! Ay\'ın arka yüzü karanlık değildir; o da Güneş ışığı alır. Yalnızca Dünya\'dan görünmez.', key: 'Kavram yanılgısı' },
    // SAHNE 8 — Özet, görev, sonraki film
    { id: 'summary', pad: 1.0, min: 8, text: 'Nitelikleri tanımladım, verileri kaydettim ve yorumladım. İşte bilimsel çıkarım!', key: 'Bilimsel çıkarım' },
    { id: 'yourturn', pad: 1.0, text: 'Sıra sende! Arkadaşlarınla rol oynayın: biri Dünya, biri Ay olsun. Hareketleri çizin.', key: 'Sıra sende' },
    { id: 'research', pad: 0.6, text: 'Sen de araştır: Ali Kuşçu ve Cacabey kimdi? Ay\'daki Toros Dağları\'nda hangi Türk isimleri var?' },
    { id: 'next', pad: 0.6, text: 'Sıradaki gözlemim: Ay neden her gece farklı görünür? Ay\'ın evreleri!' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
