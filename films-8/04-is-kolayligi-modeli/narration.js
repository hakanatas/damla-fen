// narration.js — 8. sınıf Film 4: "Kendi Makinemi Tasarlıyorum: İş Kolaylığı Modeli"  (Maarif FB.8.2.2)
// Tek düzenlenebilir metin kaynağı. Sessiz film: text = altyazı.
const NARRATION = {
  film: '04-is-kolayligi-modeli',
  title: 'Kendi Makinemi Tasarlıyorum: İş Kolaylığı Modeli',
  outcome: 'FB.8.2.2',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Problem
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.6, min: 6, text: 'Merhaba! Okulumuzun balkon bahçesine toprak torbası taşımak çok yorucu.', key: 'Problem' },
    { id: 'goal', pad: 0.8, text: 'Bu işi kolaylaştıracak bir basit makine modeli tasarlamaya karar verdim!' },
    // SAHNE 2 — Tarihten ilham
    { id: 'history', pad: 0.4, text: 'Arşimet’ten Cezeri’ye, bilim insanları işi kolaylaştıran makineler tasarladı.' },
    { id: 'cezeri', pad: 0.8, min: 7, text: 'Cezeri, 1206’da bitirdiği kitabında suyu yükselten, dişli çarklı makineler çizdi.', key: 'Cezeri' },
    // SAHNE 3 — Tasarım döngüsü, ölçüt, sınırlılık, güvenlik
    { id: 'cycle', pad: 0.6, min: 9, text: 'Mühendisler tasarım döngüsünü kullanır: tanımla, araştır, tasarla, yap, test et, geliştir, paylaş.', key: 'Tasarım döngüsü' },
    { id: 'criteria', pad: 0.6, text: 'Ölçütüm: Model, 10 N’luk yükü yarısından az kuvvetle kaldırmalı.', key: 'Ölçüt' },
    { id: 'limits', pad: 0.6, text: 'Sınırlılığım: Yalnızca iplik makarası, ip, karton ve çubuk gibi atık malzemeler.', key: 'Sınırlılık' },
    { id: 'safety', pad: 0.8, min: 5.5, text: 'Kesici aletleri bir yetişkin eşliğinde kullan. Asılı yükün altında durma!', key: 'Güvenlik' },
    // SAHNE 4 — Model 1: sabit makara
    { id: 'v1', pad: 0.6, min: 6, text: 'İlk modelim: Balkona bir sabit makara bağladım. İpi aşağı çekince yük yukarı çıkıyor.', key: 'Model öner' },
    { id: 'test1', pad: 0.6, min: 6, text: 'Dinamometre yaklaşık 10 N gösteriyor. Yön değişti ama kuvvet azalmadı.', key: 'Test et' },
    { id: 'evidence', pad: 0.8, text: 'Bu yeni kanıt, ölçütümü karşılamadığımı gösteriyor. Modelimi yenilemeliyim.', key: 'Yeni kanıt' },
    // SAHNE 5 — Model 2: makara sistemi
    { id: 'v2', pad: 0.6, min: 6, text: 'Yüke hareketli bir makara ekledim. Artık yükü iki ip taşıyor.', key: 'Modeli yenile' },
    { id: 'test2', pad: 0.8, min: 6, text: 'Kuvvet yaklaşık 6 N. Neden tam 5 değil? Makaranın ağırlığı ve sürtünme de var!' },
    // SAHNE 6 — Karşılaştır + Model 3: çıkrık eklenir
    { id: 'peers', pad: 0.6, min: 6.5, text: 'Modelleri karşılaştırdık. Arkadaşımın çıkrığı çok az kuvvet istiyordu.', key: 'Karşılaştır' },
    { id: 'v3', pad: 0.6, min: 6, text: 'İpi bir çıkrığa sardım. Makara sistemi ve çıkrık birlikte: bileşik makine!', key: 'Bileşik makine' },
    { id: 'test3', pad: 0.6, min: 6.5, text: 'Kuvvet yaklaşık 2 N’a indi. Ama kolu epey çevirmem gerekiyor.' },
    { id: 'work', pad: 1.0, text: 'İşten kazanç yok; sürtünme yüzünden biraz fazla iş bile yapıyorum. Ama çok daha az kuvvetle!' },
    // SAHNE 7 — Kontrol listesi
    { id: 'check', pad: 0.8, min: 9, text: 'Son olarak kontrol listesiyle modelimi değerlendiriyorum.', key: 'Kontrol listesi' },
    // SAHNE 8 — Sıra sende + sonraki
    { id: 'task', pad: 0.6, min: 6.5, text: 'Sıra sende! Grubunla evde ya da okulda bir işi kolaylaştıracak bir model tasarla.', key: 'Sıra sende' },
    { id: 'task2', pad: 0.8, text: 'Ölçütlerini yaz, modelini test et, arkadaşlarınınkiyle karşılaştır ve yenile.' },
    { id: 'next', pad: 0.8, text: 'Sıradaki sayfa: Yaşamın gizemi! Hücrelerimizdeki DNA’yı tanıyacağız.' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
