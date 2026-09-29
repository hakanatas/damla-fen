// narration.js — Film 4: "Güneş, Dünya ve Ay"  (Maarif FB.5.1.4)
const NARRATION = {
  film: '04-gunes-dunya-ay',
  title: 'Güneş, Dünya ve Ay',
  outcome: 'FB.5.1.4 Güneş, Dünya ve Ay\'ın birbirlerine göre hareketlerini ve hacimsel büyüklüklerini temsil eden bilimsel model oluşturabilme',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.8, text: 'Güneş, Dünya ve Ay: gökyüzündeki üç komşu. Birbirlerine göre nasıl hareket ederler?', key: 'Soru sor' },
    { id: 'size-q', pad: 0.8, text: 'Peki hangisi ne kadar büyük? Bir model tasarlayıp göstermek istiyorum.', key: 'Model öner' },
    // SAHNE 2 — Model 1
    { id: 'model1', pad: 1.0, min: 8, text: 'İlk modelim: üç top ve bir karton. Ama toplarım neredeyse aynı büyüklükte!', key: 'Model 1' },
    { id: 'data-q', pad: 0.8, text: 'Gerçek büyüklükler böyle mi? Bilimsel kaynaklardan veri toplayayım.', key: 'Veri topla' },
    // SAHNE 3 — Hacim
    { id: 'volume', pad: 0.8, text: 'Önce bir kavram: Maddenin boşlukta kapladığı yere hacim denir.', key: 'Hacim' },
    { id: 'units', pad: 1.0, min: 9, text: 'Birimi cm³, m³ gibidir. Bu küpün hacmi 1 cm³. Kutuya 8 küp sığıyor: hacmi 8 cm³!', key: 'cm³ · m³' },
    // SAHNE 4 — Veriler
    { id: 'sun-size', pad: 0.8, text: 'Güneş\'in çapı, Dünya\'nın çapının yaklaşık 109 katıdır.', key: 'Çap ≈ 109 kat' },
    { id: 'moon-size', pad: 0.8, text: 'Ay\'ın çapı ise Dünya\'nın çapının yaklaşık dörtte biridir.', key: 'Çap ≈ 1/4' },
    { id: 'vol-data', pad: 1.2, min: 10, text: 'Hacimleri karşılaştıralım: Güneş\'e yaklaşık 1 milyon 300 bin Dünya, Dünya\'ya ise yaklaşık 50 Ay sığar!', key: 'Hacimler' },
    // SAHNE 5 — Model 2 (yenilenmiş büyüklükler ve uzaklıklar)
    { id: 'revise', pad: 0.8, text: 'Modelimi yeniliyorum! Dünya bir nohut kadarsa, Ay bir susam tanesi kadar olur.', key: 'Model 2' },
    { id: 'sunball', pad: 0.8, text: 'Güneş ise yaklaşık 1 metrelik kocaman bir top olur!' },
    { id: 'dist', pad: 1.2, min: 9, text: 'Uzaklıklar da çok büyük: Ay nohuttan 30 cm, Güneş ise yaklaşık 117 metre uzakta olmalı!', key: 'Uzaklıklar' },
    // SAHNE 6 — Hareketler
    { id: 'earth', pad: 1.0, min: 8, text: 'Kuzeyden bakalım: Dünya kendi ekseni etrafında 1 günde döner, Güneş\'in çevresinde 1 yılda dolanır.', key: 'Dünya: 1 gün · 1 yıl' },
    { id: 'moon', pad: 1.0, text: 'Ay, Dünya\'nın çevresinde yaklaşık 27,3 günde dolanır. Dünya ile birlikte Güneş\'in çevresini de dolaşır.', key: 'Ay: ≈ 27,3 gün' },
    { id: 'sun', pad: 0.8, text: 'Güneş de kendi ekseni etrafında yaklaşık 25 günde döner.', key: 'Güneş: ≈ 25 gün' },
    { id: 'ccw', pad: 1.0, text: 'Kuzeyden bakınca bu hareketlerin hepsi saat yönünün tersinedir.', key: 'Saat yönünün tersi' },
    // SAHNE 7 — Eşleştirme oyunu ve karşılaştırma
    { id: 'match', pad: 0.8, min: 11, text: 'Hadi bir eşleştirme oyunu oynayalım! Her hareketi süresiyle eşleştir.', key: 'Eşleştirme oyunu' },
    { id: 'final', pad: 1.0, min: 9, text: 'Son modelim hazır! Arkadaşlarımın modelleriyle karşılaştırıp tarafsızca değerlendireceğiz.', key: 'Karşılaştır' },
    // SAHNE 8 — Kaydet, görev, sonraki
    { id: 'record', pad: 1.0, min: 9, text: 'Model önerdim, verilerle yeniledim, test ettim. Tasarım böyle gelişir!', key: 'Tasarım döngüsü' },
    { id: 'yourturn', pad: 1.0, text: 'Sıra sende! Arkadaşlarınla bir Güneş, Dünya ve Ay modeli tasarla. Hareketleri, yönleri ve hacimleri göster.', key: 'Sıra sende' },
    { id: 'research', pad: 0.8, text: 'Sen de araştır: “Süper Ay” nedir? Ay gerçekten büyür mü?' },
    { id: 'next', pad: 0.8, text: 'Bu ünite bitti! Sıradaki ünitemiz: Kuvveti Tanıyalım.' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
