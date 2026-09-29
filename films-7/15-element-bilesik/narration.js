// narration.js — 7. sınıf Film 15: "Molekül Modelleri: Element mi, Bileşik mi?"  (Maarif FB.7.5.3 · FB.7.5.4)
// Tek düzenlenebilir metin kaynağı. Sessiz film: text altyazı olarak görünür.
const NARRATION = {
  film: '15-element-bilesik',
  title: 'Molekül Modelleri: Element mi, Bileşik mi?',
  outcome: 'FB.7.5.3 · FB.7.5.4',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak: atomlar bir araya gelir
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.4, min: 6.5, text: 'Merhaba! Atomlar hep tek başına mı dolaşır? Bakın, bazıları bir araya geliyor!' },
    { id: 'moldef', pad: 0.6, text: 'Aynı ya da farklı atomlar belirli oranlarda birleşerek molekül oluşturabilir.', key: 'Molekül' },
    // SAHNE 2 — Model atölyesi
    { id: 'material', pad: 0.4, text: 'Oyun hamuru ve kürdanla model yapalım. Kural: Aynı cins atoma aynı renk ve boyut!', key: 'Model kuralı' },
    { id: 'same', pad: 0.4, min: 8, text: 'İki hidrojen atomu birleşince hidrojen molekülü oluşur. Oksijen ve azot molekülleri de iki atomludur.' },
    { id: 'water1', pad: 0.4, text: 'Su molekülü: bir oksijen, iki hidrojen. İlk modelim düz bir çizgi, toplar da aynı boyda.', key: 'Model öner' },
    { id: 'evidence', pad: 0.4, min: 8, text: 'Yeni kanıt: Ölçümlere göre su molekülü bükük, açısı yaklaşık 104,5 derece. Oksijen atomu da hidrojenden büyük.', key: 'Yeni kanıt' },
    { id: 'revise', pad: 0.6, min: 7, text: 'Modelimi yeniliyorum: Bükük yapı, büyük oksijen, küçük ve farklı renkte hidrojenler.', key: 'Modeli yenile' },
    { id: 'co2', pad: 0.8, text: 'Karbondioksitte bir karbon, iki oksijen var. Bu molekül ise doğrusaldır.' },
    // SAHNE 3 — Saf maddeler: element ve bileşik
    { id: 'pure', pad: 0.4, text: 'Şimdi bazı saf maddelerin tanecik modellerini dikkatle inceleyelim.', key: 'Saf maddeler' },
    { id: 'onekind', pad: 0.4, text: 'Demirde ve oksijen gazında tek cins atom var. Oksijende atomlar ikişerli moleküller hâlinde.' },
    { id: 'twokind', pad: 0.4, text: 'Su ve karbondioksitte ise farklı cins atomlar bir arada.' },
    { id: 'element', pad: 0.4, text: 'Aynı cins atomlardan oluşan saf maddelere element denir.', key: 'Element' },
    { id: 'compound', pad: 0.8, text: 'Farklı cins atomlardan oluşan saf maddelere bileşik denir.', key: 'Bileşik' },
    // SAHNE 4 — Çevremdeki maddeleri etiketle
    { id: 'label', pad: 0.4, min: 13, text: 'Çevremdeki saf maddeleri etiketleyeyim: oksijen, azot, demir, bakır, su, karbondioksit, etil alkol.', key: 'Etiketle' },
    { id: 'rule', pad: 0.8, text: 'Soru hep aynı: Maddede tek cins atom mu var, farklı cins atomlar mı?' },
    // SAHNE 5 — Kaydet
    { id: 'record', pad: 0.4, min: 10, text: 'Bulduklarımı gözlem defterime kaydedeyim.', key: 'Kaydet' },
    { id: 'method', pad: 0.8, text: 'Model önerdim, yeni kanıtla yeniledim, sınıflandırdım ve etiketledim.' },
    // SAHNE 6 — Sıra sende · Sıradaki · Bitiş
    { id: 'task', pad: 0.8, min: 8, text: 'Sıra sende! Oyun hamuru ve kürdanla molekül modelleri yap, arkadaşlarınla karşılaştırıp geliştir.', key: 'Sıra sende' },
    { id: 'next', pad: 0.8, text: 'Sıradaki gözlem: Periyodik tablodaki ilk 18 element ve sembolleri!' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
