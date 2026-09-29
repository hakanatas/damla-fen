// narration.js — 7. sınıf Film 10: "Her Nefeste Bir Yolculuk: Solunum Sistemi" (FB.7.3.6 · FB.7.3.7)
const NARRATION = {
  film: '10-solunum',
  title: 'Her Nefeste Bir Yolculuk: Solunum Sistemi',
  outcome: 'FB.7.3.6 · FB.7.3.7',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // S1 — Merak: nefes al, fark et
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'breathe', pad: 0.6, min: 8, text: 'Merhaba, ben Damla! Derin bir nefes al... şimdi yavaşça ver. Göğsün nasıl hareket etti?' },
    { id: 'question', pad: 0.8, min: 7, text: 'Aldığımız hava vücudumuzda hangi yolu izliyor? Orada ne işe yarıyor?', key: 'Soru sor' },
    // S2 — Model üzerinde yapılar (FB.7.3.6 a, b, c)
    { id: 'model', pad: 0.5, min: 7, text: 'Bir model üzerinde inceleyelim. Solunum sistemi, soluk alıp vermemizi ve gaz değişimini sağlar.', key: 'Solunum sistemi' },
    { id: 'nose', pad: 0.5, text: 'Hava burundan girer. Burun kılları ve mukus tozu tutar; hava burada ısınır ve nemlenir.', key: 'Burun' },
    { id: 'larynx', pad: 0.5, min: 8.5, text: 'Yutak, hava ve besinin ortak yoludur. Gırtlakta ses telleri bulunur. Yutkunurken bir kapak gırtlağı kapatır.', key: 'Yutak ve gırtlak' },
    { id: 'trachea', pad: 0.5, text: 'Soluk borusunu kıkırdak halkalar destekler. Bu halkalar borunun kapanmasını önler.', key: 'Soluk borusu' },
    { id: 'bronchi', pad: 0.5, text: 'Soluk borusu iki bronşa ayrılır. Bronşlar akciğerlerde ağaç dalları gibi bronşçuklara ayrılır.', key: 'Bronş · bronşçuk' },
    { id: 'alveoli', pad: 0.9, min: 8, text: 'Bronşçukların ucunda üzüm salkımına benzeyen minik keseler vardır: alveoller. Çevrelerini kılcal damarlar sarar.', key: 'Alveol' },
    // S3 — Gaz değişimi (vurgu)
    { id: 'exchange', pad: 0.5, min: 9, text: 'Akciğerlerin görevi gaz değişimidir. Alveoldeki oksijen kana geçer; kandaki karbondioksit alveole geçer.', key: 'Gaz değişimi' },
    { id: 'carry', pad: 0.9, min: 7, text: 'Oksijence zenginleşen kan kalbe döner. Karbondioksit ise soluk verirken dışarı atılır.' },
    // S4 — Soluk alma ve verme: diyafram
    { id: 'inhale', pad: 0.6, min: 9, text: 'Soluk alırken diyafram kasılır ve aşağı iner. Kaburgalar yukarı ve dışa kalkar; göğüs boşluğu genişler.', key: 'Soluk alma' },
    { id: 'exhale', pad: 0.6, min: 8, text: 'Soluk verirken diyafram gevşer ve kubbe gibi yukarı çıkar. Göğüs boşluğu daralır, hava dışarı çıkar.', key: 'Soluk verme' },
    { id: 'jar', pad: 0.8, min: 10, text: 'Bir benzetme: şişe göğüs boşluğu, balonlar akciğer, alttaki lastik zar diyafram. Zarı çekince balonlar şişer!', key: 'Model ve benzetme' },
    { id: 'correct', pad: 0.8, min: 8, text: 'Doğru nefes: burundan al, derin ve yavaş al. Diyafram inince karnın hafifçe şişer.', key: 'Doğru nefes alma' },
    { id: 'record', pad: 0.8, min: 8, text: 'Yapıları ve görevlerini gözlem defterime kaydettim.', key: 'Kaydet' },
    // S5 — Sağlık: bilgi toplama (FB.7.3.7 a, b, c)
    { id: 'health', pad: 0.5, text: 'Solunum sistemimi nasıl korurum? Önce bilgi toplamak için güvenilir araçları seçmeliyim.', key: 'Bilgi toplama araçları' },
    { id: 'tools', pad: 0.5, min: 8, text: 'Güvenilir internet siteleri, basılı kaynaklar ve bir uzmanla, örneğin aile hekimiyle görüşme.' },
    { id: 'verify', pad: 0.8, text: 'Bulduklarımı öğretmenime danışarak, bilimsel kaynaklarla ve arkadaşlarımla tartışarak doğrularım.', key: 'Doğrula' },
    // S6 — Bulgular: alışkanlıklar, sigara, bağımlılık, Yeşilay
    { id: 'habits', pad: 0.5, min: 8, text: 'Bulgularım: düzenli spor, dengeli beslenme ve odaları sık sık havalandırmak solunum sistemini destekler.', key: 'Sağlıklı yaşam' },
    { id: 'smoke', pad: 0.5, min: 7.5, text: 'Sigara dumanı soluk yollarına ve alveollere zarar verir. Dumanlı ortamda durmak da zararlıdır.', key: 'Sigara dumanı' },
    { id: 'addict', pad: 0.5, min: 9, text: 'Sigara bağımlılık yapar. Bağımlı bir kişi neler yaşar? Sağlığı, ailesi, okulu ve arkadaşlıkları etkilenebilir.', key: 'Bağımlılık' },
    { id: 'yesilay', pad: 0.5, min: 7.5, text: 'Yeşilay, bağımlılıkla mücadele eden bir kuruluştur. Yeşil hilal, onun simgesidir.', key: 'Yeşilay' },
    { id: 'alo', pad: 0.8, text: 'Sağlık Bakanlığının ALO 191 hattı, sigarayı bırakmak isteyenlere ücretsiz destek verir.', key: 'ALO 191' },
    // S7 — Kaydet · Sıra sende · Sıradaki · Bitiş
    { id: 'record2', pad: 0.8, min: 7, text: 'Doğruladığım bilgileri kaydettim. Yanlış alışkanlığı doğrusuyla değiştirmek bizim elimizde!', key: 'Kaydet' },
    { id: 'task', pad: 0.8, min: 8.5, text: 'Sıra sende! Atık malzemelerle bir solunum sistemi maketi yap ya da bir farkındalık posteri hazırla.', key: 'Sıra sende' },
    { id: 'next', pad: 1.0, min: 5.5, text: 'Sıradaki gözlemim: vücudumuzun temizlik ekibi, boşaltım sistemi.' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
