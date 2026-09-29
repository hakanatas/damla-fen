// narration.js — Film 5: "Kuvveti Ölçelim: Dinamometre"  (Maarif FB.5.2.1)
// Tek düzenlenebilir metin kaynağı. Her "beat" bir anlatım cümlesidir (sessiz sürüm: altyazı).
const NARRATION = {
  film: '05-kuvvet-olcme',
  title: 'Kuvveti Ölçelim: Dinamometre',
  outcome: 'FB.5.2.1 Kuvveti büyüklüğü ile operasyonel tanımlayabilme',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak: itme ve çekme
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.8, text: 'Merhaba! Ben Damla. Bugün gözlem defterime itmeyi ve çekmeyi yazacağım.' },
    { id: 'push', pad: 0.8, min: 8.5, text: 'Topa vurunca top hareket etti. Kapıyı çekince açıldı. Hamuru sıkınca şekli değişti.' },
    { id: 'define', pad: 1.0, text: 'Bir cismi itmek ya da çekmek, ona kuvvet uygulamaktır.', key: 'Kuvvet' },
    // SAHNE 2 — Beyin fırtınası
    { id: 'brain', pad: 0.8, min: 9, text: 'Kuvvet deyince aklına neler geliyor? Ben de fikirlerimi defterime yazdım.', key: 'Beyin fırtınası' },
    { id: 'quality', pad: 1.0, text: 'Fikirlerimden şunu çıkardım: Her kuvvetin bir büyüklüğü ve bir yönü vardır.', key: 'Kuvvetin nitelikleri' },
    // SAHNE 3 — Büyüklük ve yön
    { id: 'size', pad: 1.0, min: 9, text: 'Arabayı hafifçe itersem az, güçlüce itersem çok kuvvet uygularım. Ok da buna göre uzar.', key: 'Büyüklük' },
    { id: 'dir', pad: 1.0, min: 8.5, text: 'Sağa itersem araba sağa, sola çekersem sola gider. Okun ucu kuvvetin yönünü gösterir.', key: 'Yön' },
    { id: 'howmuch', pad: 1.0, text: 'Peki “az” ve “çok” ne kadar? Tahmin yetmez, ölçmeliyim!' },
    // SAHNE 4 — Dinamometre
    { id: 'dyn', pad: 0.8, text: 'İşte ölçme aracım: dinamometre! Kuvvetin büyüklüğünü ölçer.', key: 'Dinamometre' },
    { id: 'parts', pad: 1.0, min: 11, text: 'İçinde bir yay var. Kancaya kuvvet uygulanınca yay uzar. Gösterge, ölçekteki değeri gösterir.' },
    { id: 'kantar', pad: 1.0, text: 'Pazarda gördüğümüz el kantarı da bir çeşit dinamometredir.' },
    { id: 'newton', pad: 1.2, text: 'Kuvvetin birimi Newton’dur, N harfiyle gösterilir. Adını Isaac Newton’dan alır.', key: 'Newton (N)' },
    // SAHNE 5 — Esneklik
    { id: 'stretch', pad: 0.8, min: 8.5, text: 'Kancayı çektikçe yay daha çok uzuyor. Bırakınca yay eski hâline dönüyor.' },
    { id: 'elastic', pad: 1.2, text: 'Yayın bu özelliğine esneklik denir. Dinamometre, yayın esnekliği sayesinde çalışır.', key: 'Esneklik' },
    // SAHNE 6 — Ölç ve kaydet
    { id: 'measure', pad: 0.6, min: 12, text: 'Hadi ölçelim! Kancaya sırayla bir elma, bir kitap ve bir su şişesi asıyorum.', key: 'Ölç ve kaydet' },
    { id: 'table', pad: 1.2, min: 9, text: 'Sonuçları tabloya yazıp karşılaştırdım. En büyük değer su şişesinde, en küçüğü elmada.' },
    // SAHNE 7 — Yay kalınlığı
    { id: 'bag', pad: 0.6, min: 7.5, text: 'Şimdi okul çantamı asayım... Eyvah! Gösterge ölçeğin sonuna dayandı.' },
    { id: 'over', pad: 1.0, text: 'Bu ince yay, çantanın kuvveti için fazla zayıf. Aşırı gerilirse bozulabilir.' },
    { id: 'thick', pad: 1.0, min: 9, text: 'Kalın yaylı dinamometreyi seçtim. Kalın yay aynı kuvvetle daha az uzar, büyük kuvvetleri ölçer.', key: 'Yay kalınlığı' },
    { id: 'choose', pad: 0.8, text: 'Küçük kuvvetler için ince yaylı, büyük kuvvetler için kalın yaylı dinamometre seçmeliyiz.' },
    // SAHNE 8 — Kaydet, Sıra sende, sonraki film
    { id: 'record', pad: 0.8, min: 10, text: 'Defterime yazıyorum: Kuvvet, dinamometreyle ölçülen ve birimi Newton olan bir büyüklüktür.', key: 'Kaydet' },
    { id: 'task', pad: 1.0, min: 9, text: 'Sıra sende! Kalem kutunu ve suluğunu ölç, tabloya yaz. Hangi dinamometreyi neden seçtin?' },
    { id: 'next', pad: 1.0, text: 'Sıradaki gözlemim: basit malzemelerle kendi dinamometremi tasarlayacağım!' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
