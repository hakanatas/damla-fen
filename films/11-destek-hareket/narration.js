// narration.js — Film 11: "Destek ve Hareket Sistemi"  (Maarif FB.5.3.3)
const NARRATION = {
  film: '11-destek-hareket',
  title: 'Destek ve Hareket Sistemi',
  outcome: 'FB.5.3.3 Destek ve hareket sistemine ait yapıları sınıflandırabilme',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak ve köprü (bina iskeleti)
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.6, text: 'Merhaba! Ben bir su damlasıyım, iskeletim yok. Ama senin var!' },
    { id: 'building', pad: 0.8, min: 8, text: 'Bir bina, iskeleti sayesinde ayakta durur. Peki bizi ayakta tutan ne?', key: 'Soru sor' },
    // SAHNE 2 — Kendi vücudundan yola çıkarak
    { id: 'body', pad: 0.4, text: 'Kendi vücudunu yokla! Koluna bastır: içinde sert bir yapı var mı?', key: 'Vücudunu keşfet' },
    { id: 'bend', pad: 0.4, text: 'Kolunu bük: nereden bükülüyor? Kulağına dokun: neden esnek?' },
    { id: 'move', pad: 0.8, text: 'Kolunu kaldır: bu hareketi ne sağlıyor? Bu soruların cevabı tek bir sistemde.' },
    { id: 'jobs', pad: 1.0, min: 10, text: 'Destek ve hareket sistemi vücuda şekil verir, onu destekler, iç organları korur ve hareketi sağlar.', key: 'Destek ve hareket sistemi' },
    // SAHNE 3 — Gruplandırma
    { id: 'groups', pad: 0.6, min: 7, text: 'Bu sistemin yapılarını iki gruba ayırıyorum: iskelet ve kaslar.', key: 'Gruplandır' },
    { id: 'skeleton', pad: 1.0, min: 7.5, text: 'İskelet; kemik, kıkırdak ve eklemlerden oluşur.', key: 'İskelet' },
    // SAHNE 4 — Kemik
    { id: 'bone', pad: 0.4, text: 'Kemikler sert yapılardır. Vücudu destekler, bazıları da iç organları korur.', key: 'Kemik' },
    { id: 'bonetypes', pad: 1.0, min: 12, text: 'Şekillerine göre üç çeşittir: uyluk kemiği gibi uzun, el bileğindeki gibi kısa, kafatası gibi yassı kemikler.', key: 'Kemik çeşitleri' },
    // SAHNE 5 — Kıkırdak ve eklem
    { id: 'cartilage', pad: 1.0, text: 'Kıkırdak, kemikten daha yumuşak ve esnektir. Kulak kepçemizde ve burnumuzun ucunda bulunur.', key: 'Kıkırdak' },
    { id: 'joint', pad: 0.4, text: 'Kemiklerin birleştiği yerlere eklem denir. Hareket etme durumlarına göre üç çeşittir.', key: 'Eklem' },
    { id: 'jointtypes', pad: 1.0, min: 12, text: 'Kafatası kemikleri arasındaki eklemler oynamaz. Omurlar arasındakiler yarı oynar. Diz ve dirsek ise oynar eklemdir.', key: 'Eklem çeşitleri' },
    // SAHNE 6 — Kas
    { id: 'muscle', pad: 0.4, text: 'Kaslar, iskeletle birlikte hareket etmemizi sağlar. Kaslar da üç çeşittir.', key: 'Kas' },
    { id: 'muscletypes', pad: 1.2, min: 13, text: 'İskelet kasları isteğimizle çalışır. Mide ve bağırsaktaki düz kaslar ile kalp kası ise isteğimiz dışında çalışır.', key: 'Kas çeşitleri' },
    // SAHNE 7 — Sınıflandırmayı tamamla + İbni Sina
    { id: 'classify', pad: 1.2, min: 10, text: 'Sınıflandırmamı tamamladım: her yapı kendi grubunda, etiketiyle yerini aldı.', key: 'Sınıflandır ve etiketle' },
    { id: 'ibnisina', pad: 0.6, text: 'Yaklaşık bin yıl önce İbni Sina, El-Kanun fi’t-Tıb adlı eserinde insan vücudunun yapısını anlattı.', key: 'İbni Sina' },
    { id: 'canon', pad: 1.0, text: 'Bu eser, yüzyıllar boyunca pek çok ülkede tıp eğitiminde kullanıldı.' },
    // SAHNE 8 — Sıra sende, sonraki
    { id: 'task', pad: 1.0, text: 'Sıra sende! Vücudunda üç eklem bul. Hangi çeşit olduklarını defterine yaz.', key: 'Sıra sende' },
    { id: 'next', pad: 0.8, text: 'Sıradaki gözlemim: Destek ve hareket sistemimizi nasıl sağlıklı tutarız?' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
