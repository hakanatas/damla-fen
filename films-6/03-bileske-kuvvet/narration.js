// narration.js — 6. sınıf Film 3: "Kuvvetler Bir Araya Gelince: Bileşke Kuvvet"  (Maarif FB.6.2.1 · FB.6.2.2)
// Tek düzenlenebilir metin kaynağı. Sessiz film: text = altyazı.
const NARRATION = {
  film: '03-bileske-kuvvet',
  title: 'Kuvvetler Bir Araya Gelince: Bileşke Kuvvet',
  outcome: 'FB.6.2.1 · FB.6.2.2',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.8, text: 'Merhaba! Ben Damla. Bu ağır kutuyu kenara itmem gerekiyor.' },
    { id: 'push', pad: 0.8, min: 8, text: 'Tek başıma itiyorum... kıpırdamıyor. Arkadaşım da aynı yönde itince kutu kaydı!' },
    { id: 'question', pad: 0.7, text: 'Bir cisme birden fazla kuvvet etki edince ne olur? Hadi inceleyelim!', key: 'Soru sor' },
    // SAHNE 2 — Kuvvetin özellikleri
    { id: 'point', pad: 0.6, min: 6.5, text: 'Kuvveti bir okla çizelim. Okun başladığı nokta, kuvvetin uygulama noktasıdır.', key: 'Uygulama noktası' },
    { id: 'line', pad: 0.8, min: 7, text: 'Okun üzerinde durduğu çizgi doğrultudur. Yatay doğrultuda iki yön var: sağ ve sol.', key: 'Doğrultu ve yön' },
    { id: 'size', pad: 0.7, min: 6.5, text: 'Okun boyu kuvvetin büyüklüğünü gösterir. Defterimde her kare 1 N.', key: 'Büyüklük' },
    // SAHNE 3 — Aynı yön
    { id: 'same', pad: 0.6, min: 8, text: 'Kutuyu iki dinamometreyle aynı yöne çekiyoruz: biri 3 N, diğeri 2 N gösteriyor.', key: 'Aynı yönlü kuvvetler' },
    { id: 'sum', pad: 0.8, min: 7, text: 'Okları uç uca ekleyelim: tek bir 5 N’luk kuvvet ikisinin etkisini yapar.' },
    { id: 'resultant', pad: 0.8, text: 'Bu tek kuvvete bileşke kuvvet denir. Aynı yöndeki kuvvetler toplanır.', key: 'Bileşke kuvvet' },
    // SAHNE 4 — Zıt yön
    { id: 'opp', pad: 0.6, min: 7.5, text: 'Peki kuvvetler zıt yönde olursa? Sağa 5 N, sola 3 N çekiyoruz.', key: 'Zıt yönlü kuvvetler' },
    { id: 'diff', pad: 0.8, min: 7, text: 'Zıt yöndeki kuvvetlerin farkı alınır. Bileşke 2 N olur ve büyük kuvvetin yönündedir.' },
    // SAHNE 5 — Denge
    { id: 'equal', pad: 0.6, min: 7, text: 'Ya iki taraf da 4 N ile çekerse? Kutu kıpırdamıyor.' },
    { id: 'zero', pad: 0.7, min: 7, text: 'Bileşke sıfır! Bunlar dengelenmiş kuvvetlerdir. Bileşke sıfırdan farklıysa kuvvetler dengelenmemiştir.', key: 'Dengelenmiş kuvvetler' },
    { id: 'balancer', pad: 0.6, min: 8, text: 'Sağa 6 N, sola 2 N: bileşke 4 N sağa. Sola 4 N eklersem?' },
    { id: 'balancer2', pad: 0.7, min: 7, text: 'Bileşke sıfır oldu! Bileşkeye eşit büyüklükte, zıt yönlü bu kuvvete dengeleyici kuvvet denir.', key: 'Dengeleyici kuvvet' },
    // SAHNE 6 — Deney
    { id: 'hyp', pad: 0.8, text: 'Deney zamanı! Hipotezim: Bileşke sıfırsa duran araba durur, değilse harekete geçer.', key: 'Hipotez' },
    { id: 'setup', pad: 0.6, min: 7, text: 'Düzenek: masada tekerlekli araba, iki ip, iki dinamometre. Yalnızca kuvvetleri değiştiriyorum.', key: 'Deney düzeneği' },
    { id: 'trial1', pad: 0.4, min: 5.5, text: 'Birinci deneme: iki taraf da 3 N. Araba duruyor.', key: 'Ölç ve kaydet' },
    { id: 'trial2', pad: 0.4, min: 6, text: 'İkinci deneme: sol 2 N, sağ 5 N. Araba sağa doğru harekete geçti!' },
    { id: 'trial3', pad: 0.6, min: 6, text: 'Üçüncü deneme: sol 4 N, sağ 1 N. Bu kez sola gitti.' },
    { id: 'analyze', pad: 0.7, text: 'Veriler hipotezimi destekliyor. Diğer grupların verileri de öyle.', key: 'Veri analizi' },
    { id: 'moving', pad: 0.7, min: 8, text: 'Hareket eden bir cisimde kuvvetler dengelenirse, cisim sabit süratle yoluna devam eder.' },
    // SAHNE 7 — Kaydet, Sıra sende, sonraki film
    { id: 'record', pad: 0.8, min: 11, text: 'Öğrendiklerimi gözlem defterime kaydediyorum.', key: 'Kaydet' },
    { id: 'task', pad: 0.7, min: 8, text: 'Sıra sende! Günlük yaşamdan dengelenmiş ve dengelenmemiş kuvvet örnekleriyle bir poster hazırla.', key: 'Sıra sende' },
    { id: 'next', pad: 0.7, text: 'Sıradaki gözlemim: Sürat ve hız aynı şey mi?' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
