// narration.js — 8. sınıf Film 19: "Akım ve Gerilim"  (Maarif FB.8.6.2 · FB.8.6.3 · FB.8.6.4)
// Tek düzenlenebilir metin kaynağı. Sessiz film: text altyazı olarak görünür.
// Ölçüm verileri tutarlıdır: ampul (I = 0,20 A @ 1,5 V; 0,30 A @ 3,0 V) · direnç 30 Ω (1,5 V → 0,05 A ... 6,0 V → 0,20 A).
const NARRATION = {
  film: '19-akim-gerilim',
  title: 'Akım ve Gerilim',
  outcome: 'FB.8.6.2 · FB.8.6.3 · FB.8.6.4',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak ve beyin fırtınası
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.4, text: 'Anahtarı kapatınca ampul yanıyor. Peki kabloların içinde neler oluyor?' },
    { id: 'brain', pad: 0.8, min: 8, text: 'Arkadaşlarımla beyin fırtınası yaptık. Bir şey mi akıyor? Pil neyi itiyor? Bunu ölçebilir miyiz?', key: 'Beyin fırtınası' },
    // SAHNE 2 — Elektrik akımı
    { id: 'flow', pad: 0.4, min: 7, text: 'Devre kapalıyken elektrik yükleri kablolar boyunca düzenli hareket eder. Buna elektrik akımı denir.', key: 'Elektrik akımı' },
    { id: 'dir', pad: 0.8, min: 7, text: 'Anahtar açılınca akım durur. Akımın yönü, dış devrede pilin + ucundan − ucuna doğru gösterilir.' },
    { id: 'safety', pad: 1.0, min: 8.5, text: 'Güvenlik: Yalnızca pil kullanırım. Ampermetreyi asla doğrudan pilin uçlarına bağlamam; bu kısa devre olur!', key: 'Güvenlik' },
    { id: 'ammeter', pad: 0.6, min: 7, text: 'Akımın büyüklüğünü ampermetre ile ölçeriz. Ampermetre, devreye akımın yolu üzerinde seri bağlanır.', key: 'Ampermetre' },
    { id: 'amp', pad: 0.6, min: 7, text: 'İki pil ve bir ampulle ölçtüm: 0,30 amper. Akımın birimi amperdir, A harfiyle gösterilir.', key: 'Birim: amper (A)' },
    { id: 'same', pad: 0.6, min: 6, text: 'Ampermetreyi seri devrenin başka bir yerine taktım. Okunan değer yine aynı!' },
    { id: 'avar', pad: 0.8, min: 9, text: 'Deneyi tekrarladım. İkinci ampulü seri bağlayınca da, pili bire indirince de akım 0,20 ampere düştü.', key: 'Değişkenleri kontrol et' },
    { id: 'adef', pad: 1.0, min: 7, key: 'Operasyonel tanım', text: 'Operasyonel tanımım: Elektrik akımı, ampermetre ile ölçülen ve birimi amper olan büyüklüktür.' },
    // SAHNE 3 — Gerilim (potansiyel fark)
    { id: 'vq', pad: 0.4, text: 'Peki pil ne yapıyor? Pil, uçları arasında bir potansiyel fark, yani gerilim oluşturur.', key: 'Gerilim' },
    { id: 'water', pad: 0.6, min: 8, text: 'Bir benzetme: Seviye farkı varsa su akar. Gerilim de yüklerin devrede hareket etmesini sağlar.', key: 'Benzetme' },
    { id: 'voltm', pad: 0.6, min: 7, text: 'Gerilimi voltmetre ile ölçeriz. Voltmetre, ölçülecek elemanın iki ucuna paralel bağlanır.', key: 'Voltmetre' },
    { id: 'vexp', pad: 0.6, min: 8, text: 'Tek ampulle pil sayısını değiştirdim. Bir pille 1,5 volt, iki pille 3,0 volt ölçtüm.', key: 'Birim: volt (V)' },
    { id: 'vdef', pad: 1.0, min: 7, text: 'Tanımım: Gerilim, voltmetre ile ölçülen ve birimi volt olan büyüklüktür. V harfiyle gösterilir.' },
    // SAHNE 4 — Akım-gerilim ilişkisi (tümevarım)
    { id: 'rq', pad: 0.4, text: 'Yeni sorum: Bir elemanın uçlarındaki gerilim artınca, üzerinden geçen akım nasıl değişir?', key: 'Akım–gerilim ilişkisi' },
    { id: 'rwhy', pad: 0.6, text: 'Ampul de bir dirençtir, ama teli ısındıkça direnci değişir. Bu yüzden sabit bir direnç kullandım.' },
    { id: 'rset', pad: 0.6, min: 7, text: 'Ampermetre seri, voltmetre direncin uçlarına paralel. Pil sayısını birer birer artırıyorum.' },
    { id: 'rtab', pad: 0.8, min: 8.5, text: 'Ölçümlerimi tabloya kaydettim. Gerilim arttıkça akım da artıyor.', key: 'Veri kaydet' },
    { id: 'pattern', pad: 0.8, min: 8, text: 'Örüntü: Gerilim iki katına çıkınca akım da iki katına çıkıyor. Gerilimin akıma oranı hep 30!', key: 'Örüntü' },
    { id: 'graph', pad: 0.8, min: 8, text: 'Verileri grafiğe geçirdim. Noktalar, başlangıç noktasından geçen bir doğru üzerinde.', key: 'Grafik' },
    { id: 'ohm', pad: 0.6, min: 8, text: 'Genelleme: Bir iletkenin uçları arasındaki gerilimin, içinden geçen akıma oranı sabittir.', key: 'Ohm Yasası' },
    { id: 'formula', pad: 1.0, min: 8, text: 'Bu sabit orana direnç denir. Direnç = Gerilim ÷ Akım. Birimi ohmdur, Ω ile gösterilir.' },
    // SAHNE 5 — Sıra sende + sonraki film
    { id: 'task', pad: 1.0, min: 9, text: 'Sıra sende! Grubunla ölç, tabloya ve grafiğe kaydet, raporla. Georg Simon Ohm’u da araştır!', key: 'Sıra sende!' },
    { id: 'next', pad: 0.8, text: 'Sıradaki gözlemim: Kendi aydınlatma aracımı tasarlamak.' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
