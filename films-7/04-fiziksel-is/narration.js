// narration.js — 7. sınıf Film 4: "Her Çaba İş mi? Fiziksel Anlamda İş"  (Maarif FB.7.2.1)
// Tek düzenlenebilir metin kaynağı. Sessiz film: text = altyazı.
const NARRATION = {
  film: '04-fiziksel-is',
  title: 'Her Çaba İş mi? Fiziksel Anlamda İş',
  outcome: 'FB.7.2.1',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak ve beyin fırtınası
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.8, text: 'Merhaba! Ben Damla. Bugün tam iki saat ders çalıştım, çok yoruldum.' },
    { id: 'tired', pad: 0.8, text: 'Annem “Bugün çok iş yaptın!” dedi. Peki bir fizikçi de aynı şeyi söyler mi?', key: 'Soru sor' },
    { id: 'brainstorm', pad: 0.6, min: 9, text: 'Önce kuvvetin etkilerini hatırlayalım: Kuvvet bir cismi hareket ettirir, durdurur, yönünü ya da şeklini değiştirir.', key: 'Beyin fırtınası' },
    // SAHNE 2 — Gözlem: dört durum
    { id: 'intro', pad: 0.6, text: 'Günlük yaşamdan dört durumu gözlemleyip verileri kaydedeyim.', key: 'Gözlemle, kaydet' },
    { id: 'ex1', pad: 0.6, min: 6, text: 'Birinci durum: Kutuyu sağa itiyorum. Kuvvet sağa, kutu da sağa kayıyor.' },
    { id: 'ex2', pad: 0.6, min: 6, text: 'İkinci durum: Duvarı var gücümle itiyorum. Kuvvet var ama duvar yerinden kıpırdamıyor.' },
    { id: 'ex3', pad: 0.6, min: 6, text: 'Üçüncü durum: Çantayı yerden kaldırıyorum. Kuvvet yukarı, çanta da yukarı çıkıyor.' },
    { id: 'ex4', pad: 0.8, min: 7, text: 'Dördüncü durum: Çantayı hep aynı yükseklikte tutup yürüyorum. Kuvvetim yukarı, hareket ise yatay.' },
    // SAHNE 3 — Matris tablo
    { id: 'table', pad: 0.6, min: 9, text: 'Her durumda kuvvetin yönünü ve cismin hareketini tabloya yazdım. Şimdi karşılaştıralım.', key: 'Matris tablo' },
    { id: 'compare', pad: 0.6, text: 'Birinci ve üçüncü durumda cisim, kuvvetle aynı doğrultuda yer değiştirdi.' },
    { id: 'nowork', pad: 0.8, text: 'İkinci durumda duvar hiç yer değiştirmedi. Dördüncüde çanta, kuvvete dik doğrultuda hareket etti.' },
    // SAHNE 4 — Tanım
    { id: 'define', pad: 0.8, min: 8, text: 'Fiziksel anlamda iş için iki şart var: Kuvvet uygulanmalı ve cisim bu kuvvetin doğrultusunda yer değiştirmeli.', key: 'Fiziksel anlamda iş' },
    { id: 'both', pad: 0.8, min: 7, text: 'Şartlardan biri eksikse iş yapılmaz. Duvarı iten kuvvet de yatay taşınan çantayı tutan kuvvet de iş yapmaz.' },
    { id: 'daily', pad: 1.0, text: 'Ders çalışmak günlük dilde bir iştir. Ama fizikteki iş kavramı bundan farklıdır.', key: 'Günlük dil ≠ fizik' },
    // SAHNE 5 — Bağlı olduğu faktörler + birim
    { id: 'factors', pad: 0.6, min: 8, text: 'Peki iş neye bağlı? Aynı kuvvetle aynı kutuyu önce 2 metre, sonra 4 metre itelim.', key: 'Yer değiştirme' },
    { id: 'farther', pad: 0.8, text: 'Kuvvet aynı, yol daha uzun. Yer değiştirme arttıkça yapılan iş de artar.' },
    { id: 'bigger', pad: 0.8, min: 8, text: 'Şimdi hafif ve ağır çantayı aynı yüksekliğe kaldıralım. Ağır çanta daha büyük kuvvet ister, daha çok iş yapılır.', key: 'Kuvvet' },
    { id: 'depends', pad: 0.8, text: 'Sonuç: Yapılan iş, uygulanan kuvvete ve kuvvet doğrultusundaki yer değiştirmeye bağlıdır.', key: 'İş neye bağlı?' },
    { id: 'joule', pad: 1.0, text: 'Fiziksel anlamda işin birimi joule’dür ve J harfiyle gösterilir. Adını bilim insanı James Joule’den alır.', key: 'Birim: joule (J)' },
    // SAHNE 6 — Kaydet, Sıra sende, sonraki film
    { id: 'record', pad: 0.8, min: 12, text: 'Bulduklarımı gözlem defterime kaydediyorum.', key: 'Kaydet' },
    { id: 'task', pad: 0.8, min: 8, text: 'Sıra sende! Evde beş durum gözlemle, tabloya yaz ve hangisinde fiziksel anlamda iş yapıldığını değerlendir.', key: 'Sıra sende' },
    { id: 'next', pad: 0.8, text: 'Sıradaki gözlemim: İş yapabilmek için enerji gerekir. Kinetik ve potansiyel enerjiyi tanıyalım!' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
