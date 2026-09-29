// narration.js — 6. sınıf Film 4: "Ne Kadar Hızlı, Hangi Yöne? Sürat ve Hız"  (Maarif FB.6.2.3)
// Tek düzenlenebilir metin kaynağı. Sessiz film: text = altyazı.
// Sınırlama: grafik okuma ve matematiksel hesaplama YOK; birim dönüştürme YOK; m/s ve km/h kullanılır.
const NARRATION = {
  film: '04-surat-hiz',
  title: 'Ne Kadar Hızlı, Hangi Yöne? Sürat ve Hız',
  outcome: 'FB.6.2.3',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.6, text: 'Merhaba! Ben Damla. Her sabah evimden okula yürüyorum.' },
    { id: 'q', pad: 0.8, text: 'Okula giderken ne kadar yol alıyorum? Okul, evime göre nerede?', key: 'Soru sor' },
    // SAHNE 2 — Alınan yol / yer değiştirme
    { id: 'path', pad: 0.6, min: 7, text: 'Sokakları izleyerek yürüdüğüm yolun tamamı, alınan yoldur.', key: 'Alınan yol' },
    { id: 'disp', pad: 0.6, min: 7, text: 'Başlangıçtan bitişe çizilen düz ok ise yer değiştirmedir. Onun bir yönü vardır.', key: 'Yer değiştirme' },
    { id: 'longer', pad: 0.8, text: 'Gördün mü? Alınan yol, yer değiştirmeden uzun olabilir.' },
    { id: 'pool', pad: 0.8, min: 9, text: 'Bu yüzücü 50 metrelik havuzda gidip geri döndü. 100 m yol aldı, ama yer değiştirmesi sıfır!' },
    { id: 'matrix', pad: 0.8, min: 9, text: 'Gözlediğim hareketleri matris tabloya kaydediyorum.', key: 'Matris tablo' },
    // SAHNE 3 — Sürat
    { id: 'who', pad: 0.6, text: 'Peki kim daha hızlı? Bunun için birim zamanda alınan yola bakarız.', key: 'Birim zaman' },
    { id: 'race', pad: 0.6, min: 9, text: 'Her saniyede bir işaret koydum. Bisiklet her saniyede 5 m, ben 1 m yol alıyorum.' },
    { id: 'surat', pad: 0.8, text: 'Birim zamanda alınan yola sürat denir. Bisikletin sürati 5 m/s, benimki 1 m/s.', key: 'Sürat' },
    { id: 'units', pad: 0.8, min: 7, text: 'Sürat m/s ya da km/h ile ifade edilir. Arabanın göstergesi yön söylemez; sürati gösterir.', key: 'm/s · km/h' },
    { id: 'constant', pad: 0.8, text: 'Eşit zaman aralıklarında eşit yol alan cisim, sabit süratle hareket eder.', key: 'Sabit sürat' },
    // SAHNE 4 — Hız
    { id: 'hiz', pad: 0.6, text: 'Hız ise birim zamandaki yer değiştirmedir. Hızın hem büyüklüğü hem yönü vardır.', key: 'Hız' },
    { id: 'twocars', pad: 0.8, min: 8, text: 'Bu iki arabanın sürati 50 km/h. Süratleri aynı, ama zıt yönlere gittikleri için hızları farklı!' },
    { id: 'circle', pad: 0.8, min: 8, text: 'Dairesel pistte sabit süratle koşan atletin yönü sürekli değişir. Onun hızı sabit değildir.' },
    { id: 'consthiz', pad: 0.8, text: 'Sabit hız için sürat de yön de değişmemeli: düz bir yolda, hep aynı yönde.', key: 'Sabit hız' },
    // SAHNE 5 — Karşılaştır ve kaydet
    { id: 'compare', pad: 0.6, min: 13, text: 'Şimdi sürat ve hızın benzerliklerini ve farklılıklarını listeleyelim.', key: 'Karşılaştır' },
    { id: 'record', pad: 0.8, text: 'Kısacası: sürat ne kadar hızlı gittiğimi, hız ise ne kadar hızlı ve hangi yöne gittiğimi anlatır.', key: 'Kaydet' },
    { id: 'task', pad: 0.8, min: 8, text: 'Sıra sende! Arkadaşınla sınıfta bir yol yürüyün. Alınan yolu ve yer değiştirmeyi tabloya kaydedin.', key: 'Sıra sende' },
    { id: 'next', pad: 0.8, text: 'Sıradaki gözlemim: Canlılar nasıl çoğalır? Üreme çeşitleri!' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
