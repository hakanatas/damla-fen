// narration.js — 7. sınıf Film 5: "Hareket ve Konum: Kinetik ve Potansiyel Enerji"  (Maarif FB.7.2.2)
// Tek düzenlenebilir metin kaynağı. Sessiz film: text = altyazı.
const NARRATION = {
  film: '05-kinetik-potansiyel',
  title: 'Hareket ve Konum: Kinetik ve Potansiyel Enerji',
  outcome: 'FB.7.2.2',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.8, text: 'Merhaba! Ben Damla. Bugün oyun parkındayım ve gözlem defterim yanımda.' },
    { id: 'energy', pad: 0.8, text: 'Bir cismin iş yapabilme yeteneğine enerji denir. Enerjisi olan cisim iş yapabilir.', key: 'Enerji' },
    { id: 'question', pad: 0.7, text: 'Parktaki cisimler bu enerjiyi nereden alıyor? Hareketinden mi, konumundan mı?', key: 'Soru sor' },
    // SAHNE 2 — Sınıflandırma
    { id: 'classify', pad: 0.6, min: 6, text: 'Altı görüntüyü iki gruba ayıralım: hareket edenler ve bir konumda bekleyenler.', key: 'Sınıflandır' },
    { id: 'sort', pad: 0.8, min: 10, text: 'Yuvarlanan top ve giden bisiklet hareket ediyor. Daldaki elma, raftaki saksı, gerilmiş ok yayı ve sıkışmış yay ise bekliyor.' },
    // SAHNE 3 — Kinetik enerji
    { id: 'ke', pad: 0.8, text: 'Bir cismin hareketinden dolayı sahip olduğu enerjiye kinetik enerji denir.', key: 'Kinetik enerji' },
    { id: 'ke-speed', pad: 0.8, min: 10, text: 'Aynı topu yavaş ve hızlı yuvarladım. Hızlı top kutuyu daha uzağa itti: Sürat arttıkça kinetik enerji artar.', key: 'Sürat' },
    { id: 'ke-mass', pad: 0.8, min: 9, text: 'Şimdi aynı süratle bir tenis topu ve bir bowling topu. Kütlesi büyük olan kutuyu daha uzağa itti.', key: 'Kütle' },
    { id: 'ke-rest', pad: 0.8, text: 'Kütle arttıkça da kinetik enerji artar. Duran bir cismin ise kinetik enerjisi yoktur.' },
    // SAHNE 4 — Potansiyel enerji
    { id: 'pe', pad: 0.8, text: 'Bir cismin konumundan ya da durumundan dolayı depoladığı enerjiye potansiyel enerji denir.', key: 'Potansiyel enerji' },
    { id: 'grav', pad: 0.8, text: 'Yerden yüksekte duran cisimlerin çekim potansiyel enerjisi vardır. Daldaki elma buna bir örnektir.', key: 'Çekim potansiyel enerjisi' },
    { id: 'grav-h', pad: 0.8, min: 9, text: 'Aynı topu farklı yüksekliklerden kuma bıraktım. Yüksekten düşen top daha derin çukur açtı.', key: 'Yükseklik' },
    { id: 'grav-m', pad: 0.8, min: 10, text: 'Aynı yükseklikten bıraktığım toplardan kütlesi büyük olan daha derin çukur açtı. Yükseklik ve kütle arttıkça çekim potansiyel enerjisi artar.', key: 'Kütle' },
    { id: 'elastic', pad: 0.8, text: 'Gerilen ya da sıkışan esnek cisimler de enerji depolar. Buna esneklik potansiyel enerjisi denir.', key: 'Esneklik potansiyel enerjisi' },
    { id: 'elastic2', pad: 0.8, min: 9, text: 'Yayı az sıkıştırınca top biraz yükseldi. Çok sıkıştırınca daha yükseğe fırladı.' },
    // SAHNE 5 — Karşılaştırma
    { id: 'compare', pad: 0.6, text: 'Şimdi kinetik ve potansiyel enerjiyi karşılaştırıp listeleyelim.', key: 'Karşılaştır' },
    { id: 'similar', pad: 0.8, min: 9, text: 'Benzerlikler: İkisi de enerjidir ve iş yapabilir; birimleri joule’dür. Kinetik ve çekim potansiyel enerji kütleye bağlıdır.', key: 'Benzerlikler' },
    { id: 'differ', pad: 0.8, min: 10, text: 'Farklılıklar: Kinetik enerji hareketten, potansiyel enerji konumdan ya da durumdan kaynaklanır. Biri sürate, diğeri yüksekliğe ya da esnekliğe bağlıdır.', key: 'Farklılıklar' },
    { id: 'both', pad: 0.8, min: 7, text: 'Uçan bir kuşun ise ikisi birden vardır: hem kinetik hem çekim potansiyel enerjisi.' },
    // SAHNE 6 — Kaydet, Sıra sende, sonraki film
    { id: 'record', pad: 0.8, min: 12, text: 'Bulduklarımı gözlem defterime kaydediyorum.', key: 'Kaydet' },
    { id: 'task', pad: 0.8, min: 8, text: 'Sıra sende! Çevrende üç kinetik, üç potansiyel enerji örneği bul. Benzerlik ve farklılıklarını kendi cümlelerinle yaz.', key: 'Sıra sende' },
    { id: 'next', pad: 0.8, text: 'Sıradaki gözlemim: Kinetik ve potansiyel enerji birbirine dönüşür mü? Enerji kaybolur mu?' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
