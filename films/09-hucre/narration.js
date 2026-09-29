// narration.js — Film 9: "Canlıların Yapı Taşı: Hücre"  (Maarif FB.5.3.1)
const NARRATION = {
  film: '09-hucre',
  title: 'Canlıların Yapı Taşı: Hücre',
  outcome: 'FB.5.3.1 Bitki ve hayvan hücrelerini temel kısımları ve özellikleri açısından karşılaştırabilme',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak ve köprü: tuğla / hücre
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.6, text: 'Merhaba! Ben Damla. Bugün canlıların içine çok yakından bakacağım.' },
    { id: 'bricks', pad: 0.8, min: 8, text: 'Bu duvar küçük tuğlalardan yapılmış. Peki canlılar neyden yapılmış?', key: 'Soru sor' },
    { id: 'cell', pad: 0.8, text: 'Canlıların yapı taşına hücre denir. Hücreler çok küçüktür, gözle görülmez.', key: 'Hücre' },
    // SAHNE 2 — Mikroskop ve güvenlik
    { id: 'micro', pad: 0.4, text: 'Onları mikroskopla görürüz. Önce bölümlerini tanıyalım.', key: 'Mikroskop' },
    { id: 'parts', pad: 1.0, min: 11, text: 'Göz merceği ve objektif büyütür. Tabla örneği taşır. Işık aydınlatır, ayar vidası netleştirir.' },
    { id: 'safety', pad: 1.2, min: 8.5, text: 'Dikkat! Lam ve lamel camdır, özenle tutulur. Aynalı mikroskopta ayna asla Güneş’e çevrilmez.', key: 'Güvenli çalış' },
    // SAHNE 3 — Gözlem
    { id: 'samples', pad: 0.6, min: 8, text: 'Birden fazla örnek hazırladık: soğan zarı, yanaktan alınan hücreler ve bir yaprak.', key: 'Gözlem yap' },
    { id: 'onion', pad: 0.8, text: 'Soğan zarındaki hücreler tuğla gibi dizilmiş. Köşeli ve düzenliler.', key: 'Bitki hücresi' },
    { id: 'cheek', pad: 0.8, text: 'Yanak hücreleri ise yuvarlak ve düzensiz. Bunlar hayvan hücresi özelliği taşır.', key: 'Hayvan hücresi' },
    { id: 'leaf', pad: 0.8, text: 'Yaprak hücrelerinde yeşil tanecikler var! Toprak altındaki soğan zarında bunlar yoktu.' },
    { id: 'nomicro', pad: 0.8, text: 'Mikroskop yoksa hücre fotoğraflarından ve dijital içeriklerden yararlanırız.' },
    // SAHNE 4 — Çizim ve temel kısımlar
    { id: 'draw', pad: 0.6, min: 7, text: 'Gördüklerimi çiziyorum. Her iki hücrede de üç temel kısım var.', key: 'Temel kısımlar' },
    { id: 'membrane', pad: 0.6, text: 'Hücre zarı hücreyi sarar. Maddelerin giriş ve çıkışını denetler, tıpkı bir kapı gibi.', key: 'Hücre zarı' },
    { id: 'cyto', pad: 0.6, text: 'Sitoplazma hücrenin içini dolduran akışkan kısımdır. Organeller bunun içindedir.', key: 'Sitoplazma' },
    { id: 'nucleus', pad: 0.8, text: 'Çekirdek, hücrenin yönetim merkezidir. Hücredeki olayları yönetir.', key: 'Çekirdek' },
    // SAHNE 5 — Organeller (yalnızca ad ve görev)
    { id: 'organel', pad: 0.4, text: 'Sitoplazmadaki görevli küçük yapılara organel denir. Adlarını ve görevlerini öğrenelim.', key: 'Organeller' },
    { id: 'mito', pad: 0.6, text: 'Mitokondri enerji üretir. Hem bitki hem de hayvan hücresinde bulunur.', key: 'Mitokondri' },
    { id: 'chloro', pad: 0.6, text: 'Kloroplast yalnızca bitki hücresindedir. Işığı kullanarak besin üretir.', key: 'Kloroplast' },
    { id: 'vacuole', pad: 0.6, text: 'Koful su ve maddeleri depolar. Bitkide büyük ve az, hayvanda küçük ve çoktur.', key: 'Koful' },
    { id: 'wall', pad: 0.8, text: 'Hücre duvarı yalnızca bitki hücresinde, zarın dışındadır. Hücreyi korur, şekil verir.', key: 'Hücre duvarı' },
    // SAHNE 6 — Karşılaştırma
    { id: 'compare', pad: 0.4, text: 'Şimdi iki hücreyi karşılaştırıyorum. Önce benzerlikler...', key: 'Karşılaştır' },
    { id: 'same', pad: 0.8, min: 6, text: 'İkisinde de hücre zarı, sitoplazma, çekirdek ve mitokondri var.', key: 'Benzerlikler' },
    { id: 'diff', pad: 1.0, min: 10, text: 'Farklılıklar: hücre duvarı ve kloroplast yalnızca bitkide var. Koful ve şekil de farklı.', key: 'Farklılıklar' },
    // SAHNE 7 — Kaydet, Sıra sende, sonraki
    { id: 'record', pad: 0.6, min: 7.6, text: 'Bulduklarımı gözlem defterime kaydettim.', key: 'Kaydet' },
    { id: 'task', pad: 1.0, text: 'Sıra sende! Arkadaşlarınla bir hücre modeli tasarla. Hangi malzemeleri seçerdin?', key: 'Sıra sende' },
    { id: 'next', pad: 0.8, text: 'Sıradaki gözlemim: Hücreler bir araya gelince neler oluşur?' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
