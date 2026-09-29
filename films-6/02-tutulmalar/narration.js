// narration.js — 6. sınıf Film 2: "Güneş ve Ay Tutulmaları"  (Maarif FB.6.1.3 · FB.6.1.4)
// Sessiz film: text → altyazı. Süreler: python3 tools/tts.py films-6/02-tutulmalar --silent --wps=1.85
const NARRATION = {
  film: '02-tutulmalar',
  title: 'Güneş ve Ay Tutulmaları',
  outcome: 'FB.6.1.3 · FB.6.1.4',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Haber ve merak
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'news', pad: 0.6, text: 'Merhaba! Bugün gazetede bir haber gördüm: “Gökyüzünde tutulma var!”' },
    { id: 'q', pad: 0.8, text: 'Tutulma nasıl olur? Güneş neden kararır? Ay neden kararır? Her ay olur mu?', key: 'Soru sor' },
    // SAHNE 2 — Güvenlik
    { id: 'safety', pad: 0.6, min: 5, text: 'Önce güvenlik! Güneş tutulmasına asla çıplak gözle bakmayız.', key: 'Güvenlik' },
    { id: 'glasses', pad: 1.0, text: 'Yalnızca onaylı tutulma gözlüğüyle, bir yetişkin eşliğinde bakılır. Güneş gözlüğü korumaz; filtresiz dürbün ve teleskop çok tehlikelidir!' },
    // SAHNE 3 — Güneş tutulması
    { id: 'solar', pad: 0.8, min: 9, text: 'Güneş tutulmasında Ay, Güneş ile Dünya’nın arasına girer. Güneş’i örter, gölgesi Dünya’ya düşer.', key: 'Güneş tutulması' },
    { id: 'newmoon', pad: 0.8, text: 'Bu yalnızca Yeni Ay evresinde olur. Gölgenin düştüğü yerde gündüz ortalık kararır.', key: 'Yeni Ay' },
    { id: 'narrow', pad: 1.0, text: 'Ay’ın gölgesi küçüktür. Bu yüzden Güneş tutulması Dünya’nın yalnızca bir bölgesinden görülür.' },
    // SAHNE 4 — Ay tutulması
    { id: 'lunar', pad: 0.8, min: 9, text: 'Ay tutulmasında ise Dünya, Güneş ile Ay’ın arasına girer. Dünya’nın gölgesi Ay’ın üzerine düşer.', key: 'Ay tutulması' },
    { id: 'fullmoon', pad: 0.8, text: 'Bu yalnızca Dolunay evresinde olur. Ay kararır, hatta kızılımsı görünebilir.', key: 'Dolunay' },
    { id: 'wide', pad: 1.0, text: 'Ay tutulması, o gece Ay’ı gören her yerden izlenebilir. Çıplak gözle bakmak güvenlidir.' },
    // SAHNE 5 — Veri topla, kaydet, karşılaştır
    { id: 'data', pad: 0.6, min: 12, text: 'Topladığım bilgileri çizimlerle çalışma yaprağıma kaydediyorum ve iki tutulmayı karşılaştırıyorum.', key: 'Veri topla, kaydet' },
    // SAHNE 6 — Değerlendir: neden her ay yok?
    { id: 'why', pad: 0.6, text: 'Ama bir sorum var: Her ay Yeni Ay ve Dolunay oluyor. Neden her ay tutulma olmuyor?', key: 'Değerlendir' },
    { id: 'tilt', pad: 0.8, min: 8, text: 'Çünkü Ay’ın yörüngesi, Dünya’nın Güneş çevresindeki yörüngesine göre yaklaşık 5 derece eğiktir.', key: '≈ 5° eğim' },
    { id: 'miss', pad: 0.8, min: 9, text: 'Çoğu ay, Ay gölgenin biraz üstünden ya da altından geçer. Üçü aynı hizaya gelince tutulma olur.', key: 'Aynı hiza' },
    { id: 'fergani', pad: 1.0, text: 'Fergani, 800’lü yıllarda tutulma zamanlarını belirlemek için bir yöntem bulmuştur.', key: 'Fergani' },
    // SAHNE 7 — Model öner, yenile
    { id: 'model', pad: 0.6, text: 'Şimdi bir tutulma modeli öneriyorum: El feneri Güneş, oyun hamurundan toplar Dünya ve Ay olsun.', key: 'Model öner' },
    { id: 'test', pad: 0.6, min: 8.5, text: 'Ay’ı düz bir çemberde dolaştırınca her turda iki tutulma çıktı. Ama gerçekte böyle olmuyor!' },
    { id: 'revise', pad: 0.8, min: 9, text: 'Kanıtlara göre modelimi yeniliyorum: Ay’ın yörüngesini biraz eğdim. Artık çoğu turda tutulma olmuyor.', key: 'Modeli yenile' },
    // SAHNE 8 — Sıra sende + sonraki
    { id: 'task', pad: 0.8, text: 'Sıra sende! Atık malzemelerle kendi tutulma modelini kur. Arkadaşlarınla karşılaştırıp geliştir.', key: 'Sıra sende' },
    { id: 'research', pad: 1.0, text: 'Bir de araştır: En son tutulma ne zaman oldu? En yakın tutulma ne zaman olacak?' },
    { id: 'next', pad: 1.0, text: 'Sıradaki gözlemim: Kuvvetler birleşince ne olur? Bileşke kuvvet!' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
