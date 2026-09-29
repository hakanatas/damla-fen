// narration.js — 7. sınıf Film 21: "Elektrik Yükleri"  (Maarif FB.7.6.3)
const NARRATION = {
  film: '21-elektrik-yukleri',
  title: 'Elektrik Yükleri',
  outcome: 'FB.7.6.3',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — İki balon
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hook', pad: 0.6, text: 'Ece’nin saçına sürttüğümüz iki balonu yan yana astık. Birbirlerinden kaçıyorlar!' },
    { id: 'hook2', pad: 0.8, text: 'Balonu Ece’nin saçına yaklaştırınca ise saçlar balona uzanıyor. Neden bazen iter, bazen çeker?', key: 'Soru sor' },
    // SAHNE 2 — Atomdaki yükler
    { id: 'atom', pad: 0.6, text: 'Cevap atomlarda. Çekirdekte pozitif yüklü protonlar, çevresinde negatif yüklü elektronlar vardır.', key: 'Proton · Elektron' },
    { id: 'move', pad: 0.8, text: 'Protonlar çekirdekte sıkıca durur. Cisimler arasında yer değiştirebilen yalnızca elektronlardır.' },
    // SAHNE 3 — Nitelikler: nötr, negatif, pozitif
    { id: 'neutral', pad: 0.6, text: 'Bir cisimde pozitif ve negatif yük sayısı eşitse cisim nötrdür.', key: 'Nötr cisim' },
    { id: 'negative', pad: 0.6, text: 'Cisim elektron alırsa negatif yükü fazla olur. Negatif yüklü cisim oldu!', key: 'Negatif yüklü cisim' },
    { id: 'positive', pad: 0.6, text: 'Cisim elektron verirse pozitif yükü fazla kalır. Artık pozitif yüklü!', key: 'Pozitif yüklü cisim' },
    { id: 'myth', pad: 0.8, text: 'Dikkat: Pozitif yüklenen cisim proton kazanmaz, elektron kaybeder.' },
    // SAHNE 4 — İtme ve çekme
    { id: 'repel', pad: 0.6, text: 'İki balon da elektron aldı, ikisi de negatif. Aynı cins yükler birbirini iter.', key: 'Aynı cins yükler iter' },
    { id: 'attract', pad: 0.6, text: 'Ece’nin saçı elektron verdi, pozitif oldu. Zıt cins yükler birbirini çeker.', key: 'Zıt cins yükler çeker' },
    { id: 'caution', pad: 0.8, text: 'Ama yüklü balon nötr kâğıdı da çeker. Bu yüzden çekme tek başına yük cinsini göstermez; itme ise aynı cinsi kanıtlar.' },
    // SAHNE 5 — Elektroskop
    { id: 'scope', pad: 0.8, text: 'Elektroskop bir cismin yüklü olup olmadığını gösterir. Yaprakları aynı cins yükle yüklenip birbirini iter.', key: 'Elektroskop' },
    // SAHNE 6 — Sınıflandırma
    { id: 'sort', pad: 0.6, text: 'Şimdi sınıflandıralım. Farklı cisimleri birbirine sürtüp yük durumlarını inceliyorum.', key: 'Ayrıştır' },
    { id: 'pairs', pad: 0.6, min: 9, text: 'Cam çubuk ipeğe sürtülünce elektron verir; ipek alır. Plastik çubuk yüne sürtülünce elektron alır; yün verir.' },
    { id: 'group', pad: 0.6, min: 9, text: 'Elektron verenleri bir gruba, alanları diğer gruba koyuyorum. Hiç sürtülmemiş kalem ise ayrı bir grupta.', key: 'Grupla' },
    { id: 'label', pad: 0.8, min: 8, text: 'Son olarak gruplarımı etiketliyorum: pozitif, negatif ve nötr.', key: 'Etiketle' },
    { id: 'rule', pad: 0.8, text: 'Birbirine sürtülen iki cisim her zaman zıt cins yükle yüklenir.' },
    // SAHNE 7 — Doğada: şimşek ve yıldırım
    { id: 'storm', pad: 0.6, text: 'Doğada da yükler birikir. Bulutlar arasındaki elektrik boşalmasına şimşek denir.', key: 'Şimşek ve yıldırım' },
    { id: 'bolt', pad: 0.6, text: 'Bulut ile yer arasındaki boşalma ise yıldırımdır.' },
    { id: 'safe', pad: 0.8, min: 8.5, text: 'Yıldırımlı havada açık alanda ve ağaç altında durma. Güvenli bir binaya gir, sudan uzak dur.', key: 'Güvenlik' },
    // SAHNE 8 — Kaydet · Sıra sende · Sıradaki
    { id: 'record', pad: 0.6, min: 8.5, text: 'Bulduklarımı gözlem defterime kaydediyorum.', key: 'Kaydet' },
    { id: 'task', pad: 0.8, text: 'Sıra sende! Evindeki cisimleri sürterek yüklerini tahmin et ve bir tabloda grupla.', key: 'Sıra sende' },
    { id: 'next', pad: 1.0, text: 'Sıradaki gözlemim: Besin zinciri. Kim kimi yer, enerji nereye akar?' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
