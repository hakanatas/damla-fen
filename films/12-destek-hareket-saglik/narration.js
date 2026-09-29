// narration.js — Film 12: "Destek ve Hareket Sistemimizin Sağlığı"  (Maarif FB.5.3.4)
const NARRATION = {
  film: '12-destek-hareket-saglik',
  title: 'Destek ve Hareket Sistemimizin Sağlığı',
  outcome: 'FB.5.3.4 Destek ve hareket sisteminin sağlığı için yapılması gerekenler konusunda bilgi toplayabilme',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Örnek olay
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.6, text: 'Merhaba! Bugün bir örnek olayla başlıyorum: arkadaşım Ege’nin başına gelenler.', key: 'Örnek olay' },
    { id: 'case', pad: 0.6, min: 7, text: 'Ege kasksız ve dizliksiz paten kayarken düştü. Kolu çok ağrıdı.' },
    { id: 'xray', pad: 0.8, text: 'Doktor röntgen filmine baktı: kol kemiği kırılmıştı! Kolu alçıya alındı.', key: 'Kemik kırığı' },
    { id: 'firstaid', pad: 1.2, min: 9, text: 'Kırık şüphesinde o bölgeyi hareket ettirmeyiz. Hemen bir yetişkine haber verir, gerekirse 112’yi ararız.', key: 'Güvenlik' },
    // SAHNE 2 — Soru ve araçlar
    { id: 'question', pad: 0.6, text: 'Aklıma bir soru takıldı: Destek ve hareket sistemimizi sağlıklı tutmak için ne yapmalıyız?', key: 'Soru sor' },
    { id: 'tools', pad: 1.0, min: 10, text: 'Önce araçlarımı belirledim: güvenilir genel ağ adresleri, basılı kaynaklar ve bir alan uzmanıyla görüşme.', key: 'Araç belirle' },
    { id: 'interview', pad: 0.8, text: 'Okulumuzu ziyaret eden bir fizyoterapistle görüştüm. Sorularımı önceden hazırlamıştım.' },
    // SAHNE 3 — Bilgi bulma
    { id: 'food', pad: 0.6, text: 'İlk bulgum: Yeterli ve dengeli beslenmek kemiklerin ve kasların gelişimini destekler.', key: 'Bilgi bul' },
    { id: 'sport', pad: 0.6, text: 'Düzenli spor ve sosyal etkinlikler kasları ve kemikleri güçlendirir. Sporda koruyucu malzeme kullanılır.' },
    { id: 'tech', pad: 1.0, text: 'Saatlerce ekrana eğilmek boynu ve sırtı yorar. Teknoloji bağımlılığı bizi hareketsiz bırakır.', key: 'Teknoloji bağımlılığı' },
    // SAHNE 4 — Doğrulama
    { id: 'claim', pad: 0.4, min: 7, text: 'Bir sitede şunu okudum: “Çok süt içenin kemiği asla kırılmaz.” Doğru mu?', key: 'Doğrula' },
    { id: 'check', pad: 0.6, min: 9, text: 'Öğretmenime ve bir doktora sordum, bilimsel kaynaklara baktım, arkadaşlarımla tartıştım.' },
    { id: 'wrong', pad: 1.0, text: 'Bu bilgi yanlış! Beslenme önemlidir ama kazalardan korunmak da gerekir.' },
    // SAHNE 5 — Yanlış → doğru davranışlar
    { id: 'habits', pad: 1.2, min: 14, text: 'Günlük hayattaki yanlış alışkanlıkları buldum ve doğrularını yazdım.', key: 'Yanlış → doğru' },
    // SAHNE 6 — Kaydet, söz, Sıra sende, sonraki
    { id: 'record', pad: 0.6, min: 8, text: 'Doğruladığım bilgileri gözlem defterime kaydettim. Ege de iyileşti!', key: 'Kaydet' },
    { id: 'quote', pad: 1.0, min: 7, text: '“Hastalığınızdan önce sağlığınızın kıymetini bilin.” Sağlığımız çok değerli!', key: 'Sağlığın kıymeti' },
    { id: 'task', pad: 1.0, text: 'Sıra sende! Bu konuda bir poster ya da afiş hazırla. İstersen bir uzmanla röportaj yap.', key: 'Sıra sende' },
    { id: 'next', pad: 0.8, text: 'Sıradaki gözlemim: Işığın yolculuğu! Işık nasıl yayılır?' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
