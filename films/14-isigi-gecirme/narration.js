// narration.js — Film 14: "Işık Geçer mi?"  (Maarif FB.5.4.2)
// Tek düzenlenebilir metin kaynağı. Her "beat" bir anlatım cümlesidir (sessiz sürüm: altyazı).
const NARRATION = {
  film: '14-isigi-gecirme',
  title: 'Işık Geçer mi?',
  outcome: 'FB.5.4.2 Maddeleri ışığı geçirme durumlarına göre sınıflandırabilme',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Perdeler
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.6, text: 'Günaydın! Odamda iki perde var: ince bir tül ve kalın bir perde.' },
    { id: 'curtain', pad: 0.8, min: 7.5, text: 'Tülü kapatınca oda aydınlık kalıyor. Kalın perdeyi çekince oda kararıyor!' },
    { id: 'why', pad: 0.8, text: 'Neden farklılar? Çünkü maddeler ışığı farklı geçirir.', key: 'Işığı geçirme' },
    // SAHNE 2 — Düzenek
    { id: 'setup', pad: 0.6, text: 'Fenerimi maddelere tutup arkadaki beyaz ekrana bakacağım.', key: 'Gözlem' },
    { id: 'safe', pad: 0.8, text: 'Unutma: Fenerin ışığını kimsenin gözüne tutmayız!', key: 'Güvenlik' },
    // SAHNE 3 — Gözlemler (nitelik belirleme)
    { id: 'glass', pad: 0.8, min: 6.5, text: 'Cam ışığı geçirdi. Arkasındaki çiçeği net görüyorum.', key: 'Nitelik belirle' },
    { id: 'frost', pad: 0.8, min: 6.5, text: 'Buzlu camdan ışığın bir kısmı geçti. Çiçek bulanık görünüyor.' },
    { id: 'carton', pad: 0.8, min: 6.5, text: 'Karton ışığı hiç geçirmedi. Ekran karanlık, çiçek görünmüyor.' },
    { id: 'table', pad: 1.0, min: 10, text: 'Diğer maddeleri de denedim. Sonuçları bir tabloya yazdım.', key: 'Veri tablosu' },
    // SAHNE 4 — Ayrıştır, gruplandır, etiketle
    { id: 'sort', pad: 0.6, min: 6, text: 'Şimdi maddeleri ayrıştırıp üç gruba ayırıyorum.', key: 'Gruplandır' },
    { id: 'clear', pad: 0.6, text: 'Işığı geçiren, arkası net görünen maddeler saydamdır.', key: 'Saydam' },
    { id: 'semi', pad: 0.6, text: 'Işığın bir kısmını geçiren, arkası bulanık görünenler yarı saydamdır.', key: 'Yarı saydam' },
    { id: 'opaque', pad: 1.0, text: 'Işığı geçirmeyen, arkası görünmeyenler saydam olmayan, yani opak maddelerdir.', key: 'Opak' },
    // SAHNE 5 — Kalınlık ve sis
    { id: 'thick', pad: 0.6, min: 8, text: 'Şeffaf dosyaları üst üste koydukça ekrandaki ışık azalıyor.', key: 'Kalınlık' },
    { id: 'rule', pad: 0.6, text: 'Saydam ve yarı saydam maddeler kalınlaştıkça daha az ışık geçirir.' },
    { id: 'fog', pad: 1.0, min: 7, text: 'Sis de böyledir: Sis kalınlaştıkça arabaların farları zor görünür.' },
    // SAHNE 6 — Yakından uzağa etiketleme
    { id: 'near', pad: 0.6, min: 7, text: 'Yakından uzağa etiketleyelim. Sınıfımda pencere camı saydam, sıram opak.', key: 'Etiketle' },
    { id: 'far', pad: 1.0, min: 7.5, text: 'Evimde tül perde yarı saydam. Sokakta vitrin camı saydam, duvar opak.' },
    // SAHNE 7 — Kaydet, sıra sende, sonraki film
    { id: 'record', pad: 0.6, min: 9, text: 'Bulduklarımı gözlem defterime kaydedeyim.', key: 'Kaydet' },
    { id: 'sum', pad: 0.8, text: 'Sonuç: Maddeler ışığı geçirme durumuna göre saydam, yarı saydam ve opak olarak sınıflandırılır.' },
    { id: 'task', pad: 1.0, min: 8, text: 'Sıra sende! Çevrendeki maddeleri ışığı geçirme durumlarına göre sınıflandıran bir afiş hazırla.' },
    { id: 'next', pad: 0.8, text: 'Sıradaki gözlemim: Opak bir cismin arkasında ne oluşur?' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
