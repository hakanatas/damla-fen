// narration.js — 7. sınıf Film 19: "Karışımları Ayırma"  (Maarif FB.7.5.10)
const NARRATION = {
  film: '19-karisim-ayirma',
  title: 'Karışımları Ayırma',
  outcome: 'FB.7.5.10 Karışımları ayırmak için çeşitli deney yapabilme',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak ve beyin fırtınası
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.8, text: 'Merhaba! Karışımları hazırladık. Peki onları yeniden bileşenlerine ayırabilir miyiz?' },
    { id: 'brain', pad: 0.6, text: 'Önce beyin fırtınası: Karışımdaki maddeler hangi özellikleriyle birbirinden farklı?', key: 'Beyin fırtınası' },
    { id: 'props', pad: 1.0, min: 9, text: 'Tanecik boyutu, çözünürlük, yoğunluk, erime ve kaynama noktası... Ayırırken bu farklardan yararlanırız.', key: 'Özellik farkı' },
    { id: 'known', pad: 1.0, min: 7, text: 'Eleme, süzme ve mıknatısla ayırmayı zaten biliyoruz. Bugün yeni yöntemler deneyeceğim.' },
    // SAHNE 2 — Kart çek, hipotez, test
    { id: 'cards', pad: 0.6, min: 9, text: 'Grubumuz bir kart çekiyor: kum-su, tuz-su, zeytinyağı-su, etil alkol-su, kepek-un, odun talaşı-su...', key: 'Kart çek' },
    { id: 'draw', pad: 0.8, text: 'Tuz-su çıktı! Hipotezim: Süzersem tuzu sudan ayırabilirim.', key: 'Hipotez' },
    { id: 'test', pad: 0.8, min: 9, text: 'Süzdüm. Süzgeç kâğıdında hiç tuz kalmadı. Tuz suda çözündüğü için kâğıttan geçti.' },
    { id: 'fail', pad: 1.0, text: 'Hipotezim doğrulanmadı. O hâlde yeni bir yöntem denemeliyim.', key: 'Yeni yöntem dene' },
    // SAHNE 3 — Güvenlik
    { id: 'safety', pad: 1.0, min: 9, text: 'Isıtma yapacağım. Önce güvenlik kurallarını hatırlayalım.' },
    // SAHNE 4 — Buharlaştırma + ölçme
    { id: 'evap', pad: 0.8, min: 9, text: 'Buharlaştırma: Tuzlu suyu ısıtınca su buharlaşıp gider, tuz kapta kalır.', key: 'Buharlaştırma' },
    { id: 'measure', pad: 1.0, min: 8, text: 'Ölçelim: Başta 10 gram tuz koymuştum. Kapta yaklaşık 10 gram tuz kaldı. Yöntem işe yaradı!', key: 'Ölç ve analiz et' },
    // SAHNE 5 — Damıtma
    { id: 'distill-q', pad: 0.6, text: 'Peki suyu da geri kazanmak istersem? O zaman damıtma yaparım.', key: 'Damıtma' },
    { id: 'distill', pad: 0.8, min: 9, text: 'Su buharı soğutucudan geçerken yoğuşur ve başka bir kapta toplanır. Tuz ise balonda kalır.' },
    { id: 'alcohol', pad: 1.0, text: 'Etil alkol-su karışımı da damıtılır: Kaynama noktası daha düşük olan alkol önce buharlaşır.', key: 'Kaynama noktası farkı' },
    { id: 'cabir', pad: 1.2, text: 'Damıtmada kullanılan imbik ve deney tüpleri Cabir bin Hayyan’ın eseridir. İlk kimya laboratuvarını da o kurmuştur.', key: 'Cabir bin Hayyan' },
    // SAHNE 6 — Yoğunluk farkı
    { id: 'density', pad: 0.8, min: 9, text: 'Zeytinyağı-su için yoğunluk farkından yararlanırım. Su altta, yağ üstte kalır; su ayırma hunisinden akıtılır.', key: 'Yoğunluk farkı' },
    { id: 'sawdust', pad: 1.0, min: 6, text: 'Odun talaşı suyun üstünde yüzer; kaşıkla ya da süzerek kolayca toplanır.' },
    // SAHNE 7 — Kaydet, Sıra sende, Sıradaki
    { id: 'record', pad: 0.6, min: 13, text: 'Hangi karışımı, hangi özellik farkıyla ayırdığımı defterime kaydedeyim.', key: 'Özellik → yöntem' },
    { id: 'yourturn', pad: 1.0, min: 8, text: 'Sıra sende! Farklı büyüklükteki katı tanecikleri birbirinden ayıran bir düzenek tasarla.' },
    { id: 'next', pad: 1.0, text: 'Sıradaki gözlemim: Balon neden saça yapışır? Elektriklenme!' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
