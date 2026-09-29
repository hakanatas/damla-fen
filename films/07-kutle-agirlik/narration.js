// narration.js — Film 7: "Kütle ve Ağırlık"  (Maarif FB.5.2.3)
// Sınırlama: kütle/ağırlık yalnızca Dünya ve Ay; "kütle çekim" terimi yok, "yer çekimi" denir.
const NARRATION = {
  film: '07-kutle-agirlik',
  title: 'Kütle ve Ağırlık',
  outcome: 'FB.5.2.3 Kütle ve ağırlık kavramlarını karşılaştırabilme',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.8, min: 7, text: 'Merhaba! Pazarda “İki kilo elma tartar mısınız?” diyoruz. Peki kilogram neyin birimi?' },
    { id: 'question', pad: 0.8, text: 'Kütle ile ağırlık aynı şey mi? Sen ne düşünüyorsun?', key: 'Ön bilgi' },
    { id: 'moon', pad: 1.0, min: 8, text: 'Ay’da yürüyen astronotları hatırla. Neden zıplaya zıplaya, hafifçe yürüyorlar?', key: 'Ay’da yürüyüş' },
    // SAHNE 2 — Tanımlar
    { id: 'mass', pad: 1.0, min: 9, text: 'Kütle, bir cisimdeki madde miktarıdır. Birimi kilogram ya da gramdır; eşit kollu teraziyle ölçülür.', key: 'Kütle' },
    { id: 'weight', pad: 1.2, min: 9, text: 'Ağırlık ise yer çekiminin o cisme uyguladığı kuvvettir. Birimi Newton’dur; dinamometreyle ölçülür.', key: 'Ağırlık' },
    // SAHNE 3 — Ölç ve kaydet
    { id: 'balance', pad: 0.8, min: 9, text: 'Eşit kollu terazide elmayı, kütlesi bilinen parçalarla dengeliyorum. Kütlesi 100 gram!', key: 'Kütleyi ölç' },
    { id: 'dynam', pad: 0.8, min: 7, text: 'Aynı elmayı dinamometreye asıyorum. Ağırlığı yaklaşık 1 N.', key: 'Ağırlığı ölç' },
    { id: 'table', pad: 0.8, min: 9, text: 'Kitabı da ölçtüm: 400 gram ve yaklaşık 4 N. Kütle arttıkça ağırlık da artıyor.', key: 'Kaydet' },
    { id: 'relation', pad: 1.2, text: 'Dünya’da kütlesi 1 kilogram olan bir cismin ağırlığı yaklaşık 9,8 N’dur.', key: '1 kg ≈ 9,8 N' },
    // SAHNE 4 — Ay'da
    { id: 'tomoon', pad: 0.8, min: 8, text: 'Şimdi hayal gücümle Ay’a gidiyorum! Yanımda terazim, dinamometrem ve 6 kilogramlık kum torbam var.' },
    { id: 'moonmass', pad: 0.8, min: 8, text: 'Ay’da terazi yine dengede: Kum torbasının kütlesi yine 6 kilogram. Kütle değişmedi!', key: 'Kütle değişmez' },
    { id: 'balwhy', pad: 0.8, text: 'Terazi iki kefeyi karşılaştırır. Ay’da iki kefe de aynı ölçüde hafifler, denge bozulmaz.' },
    { id: 'moonweight', pad: 0.8, min: 8, text: 'Dinamometre ise Dünya’da yaklaşık 59 N, Ay’da yaklaşık 10 N gösteriyor.', key: 'Ağırlık değişir' },
    { id: 'why', pad: 1.2, text: 'Çünkü Ay, cisimleri Dünya’dan yaklaşık 6 kat daha az çeker. Bu yüzden astronotlar hafifçe zıplar.' },
    // SAHNE 5 — Dünya'da konum
    { id: 'earthpos', pad: 1.2, min: 10, text: 'Dünya’da bile ağırlık biraz değişebilir: Kutuplarda biraz daha fazla, ekvatorda ve yüksek dağlarda biraz daha azdır.', key: 'Konuma göre ağırlık' },
    // SAHNE 6 — Karşılaştırma
    { id: 'same', pad: 1.0, min: 10, text: 'Şimdi karşılaştırayım. Benzerlikler: İkisi de ölçülebilir ve birimi vardır. Aynı yerde kütle artınca ağırlık da artar.', key: 'Benzerlikler' },
    { id: 'diff', pad: 1.2, min: 13, text: 'Farklılıklar: Tanımları, birimleri ve ölçme araçları farklıdır. Kütle her yerde aynıdır; ağırlık konuma göre değişir.', key: 'Farklılıklar' },
    // SAHNE 7 — Sıra sende
    { id: 'task', pad: 0.8, min: 8, text: 'Sıra sende! Üç cismin kütlesini teraziyle, ağırlığını dinamometreyle ölç. Sonuçlarını karşılaştır.' },
    { id: 'research', pad: 0.8, text: 'Sen de araştır: Hazinî, yer çekimi hakkında hangi fikri ileri sürdü?' },
    { id: 'next', pad: 1.0, text: 'Sıradaki gözlemim: Hareketi zorlaştıran bir kuvvet, sürtünme!' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
