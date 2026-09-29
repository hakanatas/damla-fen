// narration.js — 8. sınıf Film 3: "İşi Kolaylaştıran Sırlar: Basit Makineler"  (Maarif FB.8.2.1)
// Tek düzenlenebilir metin kaynağı. Sessiz film: text = altyazı.
const NARRATION = {
  film: '03-basit-makineler',
  title: 'İşi Kolaylaştıran Sırlar: Basit Makineler',
  outcome: 'FB.8.2.1',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak (köprü kurma)
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.4, min: 4.5, text: 'Merhaba! Ben Damla. Bahçedeki şu taş çok ağır!' },
    { id: 'try', pad: 0.6, min: 6, text: 'Uzun bir çubuğu bir destek üzerinden bastırıyorum... Kalktı!' },
    { id: 'question', pad: 0.8, text: 'Çubuk işimi kolaylaştırdı. Peki yaptığım işi azalttı mı?', key: 'Soru sor' },
    // SAHNE 2 — Tanım
    { id: 'define', pad: 0.6, text: 'Kuvvetin büyüklüğünü, yönünü ya da etki ettiği yolu değiştiren araçlar basit makinedir.', key: 'Basit makine' },
    { id: 'inout', pad: 0.8, text: 'Bizim uyguladığımız kuvvet giriş kuvveti, makinenin yüke uyguladığı kuvvet çıkış kuvvetidir.', key: 'Giriş ve çıkış kuvveti' },
    // SAHNE 3 — Kaldıraç: denge, oran, yol
    { id: 'balance', pad: 0.6, min: 5.5, text: 'Kaldıraçla başlayalım. Destek tam ortadaysa, eşit kuvvetler dengede kalır.', key: 'Kaldıraç' },
    { id: 'longarm', pad: 0.6, min: 6.5, text: 'Desteği yüke yaklaştırdım. Kuvvet kolu yük kolunun iki katı olunca yarı kuvvet yetiyor!' },
    { id: 'distance', pad: 0.6, min: 6, text: 'Ama yük 10 cm yükselirken benim ucum 20 cm iniyor.', key: 'Kuvvet ↓ · Yol ↑' },
    { id: 'nowork', pad: 1.0, text: 'Kuvvetten kazandım, yoldan kaybettim. Yaptığım iş değişmedi!', key: 'İşten kazanç yok' },
    { id: 'types', pad: 0.6, min: 7, text: 'Destek, yük ve kuvvetin yerine göre kaldıraçları üç gruba ayırabiliriz.', key: 'Kaldıraç türleri' },
    { id: 'types2', pad: 1.0, text: 'Yük ortadaysa hep kuvvetten, kuvvet ortadaysa hep yoldan kazanırız.' },
    // SAHNE 4 — Makaralar
    { id: 'fixed', pad: 0.6, min: 6, text: 'Sabit makara kuvvetin yönünü değiştirir. Kuvvet, yükün ağırlığına eşittir.', key: 'Sabit makara' },
    { id: 'movable', pad: 0.6, min: 6.5, text: 'Hareketli makarada yükü iki ip taşır. Kuvvet yarıya iner, ama ipi iki kat çekerim.', key: 'Hareketli makara' },
    { id: 'system', pad: 0.8, min: 6, text: 'İkisi birleşince makara sistemi olur: Hem yön değişir hem kuvvet azalır.', key: 'Makara sistemi' },
    // SAHNE 5 — Eğik düzlem ve vida
    { id: 'ramp', pad: 0.6, min: 6.5, text: 'Eğik düzlemde yükü dik kaldırmak yerine rampa boyunca iteriz. Rampa uzadıkça kuvvet azalır.', key: 'Eğik düzlem' },
    { id: 'screw', pad: 0.8, min: 6, text: 'Vida, bir çubuğa sarılmış eğik düzlemdir. Az kuvvetle çeviririz, vida yavaşça ilerler.', key: 'Vida' },
    // SAHNE 6 — Çıkrık, çark, kasnak
    { id: 'wheel', pad: 0.6, min: 6.5, text: 'Çıkrıkta kolu büyük bir çemberde çeviririz. Kol, milin dört katıysa kuvvet dörtte bire iner.', key: 'Çıkrık' },
    { id: 'gears', pad: 0.6, min: 6.5, text: 'Dişli çarklar dönmeyi aktarır. Küçük çark, büyüğün bir turunda ters yönde iki tur atar.', key: 'Dişli çark' },
    { id: 'belts', pad: 0.8, min: 6, text: 'Kasnaklar kayışla bağlıdır. Düz kayışta aynı yöne, çapraz kayışta zıt yöne dönerler.', key: 'Kasnak' },
    // SAHNE 7 — Sınıflandır: nitelik → ayrıştır → grupla → etiketle
    { id: 'sort', pad: 0.4, min: 6, text: 'Şimdi günlük yaşamdan örnekleri niteliklerine göre ayrıştırıp gruplandıralım.', key: 'Ayrıştır, grupla' },
    { id: 'groups', pad: 0.4, min: 7, text: 'Kuvvetten kazandıranlar, yoldan kazandıranlar ve kuvvetin yönünü değiştirenler.' },
    { id: 'label', pad: 0.8, min: 5.5, text: 'Son olarak her birini basit makine adıyla etiketliyorum.', key: 'Etiketle' },
    // SAHNE 8 — Bileşik makine
    { id: 'compound', pad: 0.4, min: 6, text: 'Birden çok basit makine birlikte çalışırsa bileşik makine olur. Bisiklet buna bir örnektir.', key: 'Bileşik makine' },
    { id: 'advantage', pad: 0.8, text: 'Böylece işi daha hızlı ve daha az yorularak yaparız.' },
    // SAHNE 9 — Kaydet + görev + sonraki
    { id: 'record', pad: 0.4, min: 7.5, text: 'Bulduklarımı gözlem defterime kaydediyorum.', key: 'Kaydet' },
    { id: 'rule', pad: 0.8, text: 'Kuvvetten kazanırsak yoldan kaybederiz. İş aynı kalır, çünkü enerji korunur.' },
    { id: 'task', pad: 0.8, min: 7, text: 'Sıra sende! Evinde beş basit makine bul. Türünü ve ne kazandırdığını tabloya yaz.', key: 'Sıra sende' },
    { id: 'next', pad: 0.8, text: 'Sıradaki sayfa: Bir işi kolaylaştıran kendi makine modelimi tasarlayacağım!' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
