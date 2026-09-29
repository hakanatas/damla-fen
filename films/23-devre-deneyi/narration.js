// narration.js — Film 23: "Şemadan Devreye: Deney Zamanı"  (Maarif FB.5.6.2)
// Tek düzenlenebilir metin kaynağı. Sessiz sürüm: text = altyazı.
const NARRATION = {
  film: '23-devre-deneyi',
  title: 'Şemadan Devreye: Deney Zamanı',
  outcome: 'FB.5.6.2 Şemasını çizdiği elektrik devresine uygun deney yapabilme',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Giriş ve deney sorusu
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.6, text: 'Merhaba! Devre elemanlarının sembollerini artık tanıyorum.' },
    { id: 'plan', pad: 0.6, text: 'Bugün önce bir devre şeması çizeceğim. Sonra ona uygun bir deney düzeneği kuracağım.' },
    { id: 'question', pad: 1.0, text: 'Deney sorum: Anahtar açıkken ve kapalıyken ampul ışık verir mi?', key: 'Deney sorusu' },
    // SAHNE 2 — Şema çizimi
    { id: 'draw', pad: 1.0, min: 10, text: 'Önce sembollerle şemamı çiziyorum: bir pil, bir anahtar, bir ampul ve kablolar.', key: 'Devre şeması' },
    // SAHNE 3 — Grup çalışması
    { id: 'group', pad: 1.0, min: 9, text: 'Deneyi grupça yapıyoruz. Herkesin bir görevi var, birbirimize yardım ediyoruz.', key: 'Grup çalışması' },
    // SAHNE 4 — Güvenlik
    { id: 'safety', pad: 0.8, text: 'Güvenlik kuralları: Prizle oynamak yok, yalnızca pil. Pilin iki ucunu tek kabloyla birleştirmek yok.', key: 'Güvenlik' },
    { id: 'adult', pad: 1.0, text: 'Deneyi öğretmenimizin ya da bir yetişkinin gözetiminde yapıyoruz.' },
    // SAHNE 5 — Malzeme seçimi (düzenek tasarımı)
    { id: 'materials', pad: 0.6, min: 8, text: 'Şemaya bakarak malzemeleri seçiyorum. Her sembol için bir eleman.', key: 'Düzenek tasarla' },
    { id: 'holders', pad: 1.0, text: 'Pil yatağı ve duy da gerekli. Şemada çizilmezler ama pili ve ampulü tutarlar.' },
    // SAHNE 6 — Kurulum, karşılaştırma, sorun giderme
    { id: 'build', pad: 0.6, min: 10, text: 'Şimdi düzeneği şemaya bakarak adım adım kuruyorum.' },
    { id: 'check', pad: 0.6, min: 7, text: 'Anahtarı kapattım... ama ampul ışık vermedi! Bir sorun var.' },
    { id: 'compare', pad: 0.6, min: 7.5, text: 'Düzeneği şemayla karşılaştırıyorum. Duyun bir kablosu takılı değil!', key: 'Şemayla karşılaştır' },
    { id: 'works', pad: 1.0, text: 'Bağlantıyı düzelttim. İşte! Düzenek artık şemaya uygun.' },
    // SAHNE 7 — Ölçüm ve veri kaydı
    { id: 'measure', pad: 0.6, min: 7, text: 'Şimdi gözlem zamanı. Anahtarı açıp kapatarak ampulü gözlüyorum.', key: 'Gözlem ve ölçüm' },
    { id: 'table', pad: 1.0, min: 11, text: 'Sonuçları tabloya kaydediyorum. Güvenilir olsun diye deneyi üç kez tekrarlıyorum.', key: 'Veri tablosu' },
    // SAHNE 8 — Veri analizi ve sonuç
    { id: 'analyze', pad: 0.8, text: 'Verileri inceleyelim. Üç denemede de anahtar kapalıyken ampul ışık verdi.', key: 'Veri analizi' },
    { id: 'result', pad: 1.2, text: 'Anahtar açıkken hiç ışık vermedi. Demek ki ampulün ışık vermesi için devre tamamlanmalı.', key: 'Sonuç' },
    // SAHNE 9 — Temizlik ve rapor
    { id: 'clean', pad: 0.8, min: 7, text: 'Deney bitti. Malzemeleri toplayıp masamızı temizliyoruz.', key: 'Temizlik' },
    { id: 'report', pad: 1.0, min: 10, text: 'Son olarak raporumu yazıyorum: soru, şema, malzemeler, adımlar, veriler ve sonuç.', key: 'Deney raporu' },
    // SAHNE 10 — Sıra sende + sonraki film
    { id: 'yourturn', pad: 1.2, text: 'Sıra sende! Grubunla bir devre şeması çiz, ona uygun düzeneği kur ve sonuçları raporla.', key: 'Sıra sende!' },
    { id: 'next', pad: 1.2, text: 'Sıradaki gözlemim: Ampulün parlaklığı nelere bağlı? Hipotez kuracağım!' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
