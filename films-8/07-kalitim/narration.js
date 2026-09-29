// narration.js — 8. sınıf Film 7: "Aslı Ne İse Nesli Odur: Kalıtım" (FB.8.3.4 · FB.8.3.5)
const NARRATION = {
  film: '07-kalitim',
  title: 'Aslı Ne İse Nesli Odur: Kalıtım',
  outcome: 'FB.8.3.4 · FB.8.3.5',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // S1 — Merak
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'family', pad: 0.6, min: 6.5, text: 'Merhaba, ben Damla! Ela’nın saçları babası gibi kıvırcık, gülüşü annesine benziyor. Neden?', key: 'Soru sor' },
    { id: 'proverb', pad: 0.6, min: 6, text: 'Atalarımız “Aslı ne ise nesli odur.” demiş. Sence bu söz ne anlatıyor?', key: 'Aslı ne ise nesli odur' },
    { id: 'inherit', pad: 0.7, text: 'Özelliklerin genlerle anne babadan yavrulara aktarılmasına kalıtım denir.', key: 'Kalıtım' },
    // S2 — Mendel ve bezelye
    { id: 'mendel', pad: 0.5, text: '1800’lerde Gregor Mendel, bezelyelerle yaptığı deneylerle kalıtımın temel kurallarını ortaya koydu.', key: 'Mendel' },
    { id: 'why', pad: 0.5, min: 7.5, text: 'Neden bezelye? Kolay yetişir, kısa sürede çok tohum verir, kendi kendini tozlaşabilir ve özellikleri belirgindir.', key: 'Bezelyenin avantajları' },
    { id: 'traits', pad: 0.7, min: 7, text: 'Tohum rengi, tohum şekli, çiçek rengi, bitki boyu... Kalıtımla aktarılan her özelliğe karakter denir.', key: 'Karakter' },
    // S3 — Kavramlar (FB.8.3.4)
    { id: 'allele', pad: 0.5, min: 7, text: 'Her karakter için iki gen taşırız: biri anneden, biri babadan. Bir karakterin farklı hâllerini belirleyen genlere alel denir.', key: 'Gen · Alel' },
    { id: 'dom', pad: 0.5, text: 'Baskın gen, yanında hangi gen olursa olsun kendini gösterir. Bezelyede sarı renk geni baskındır: S.', key: 'Baskın' },
    { id: 'rec', pad: 0.5, text: 'Çekinik gen ancak iki tane olunca kendini gösterir. Yeşil renk geni çekiniktir: s.', key: 'Çekinik' },
    { id: 'geno', pad: 0.5, min: 8, text: 'Genotip, bireyin taşıdığı gen çiftidir: SS, Ss ya da ss. Fenotip ise gözlenen özelliktir: sarı ya da yeşil.', key: 'Genotip · Fenotip' },
    { id: 'pure', pad: 0.6, min: 8, text: 'Aynı iki geni taşıyana saf döl, farklı iki geni taşıyana melez döl denir. Melez Ss sarıdır ama yeşil geni saklar.', key: 'Saf döl · Melez döl' },
    { id: 'map', pad: 0.8, min: 8, text: 'Bu kavramları bir kavram haritasında birleştirelim.', key: 'Kavram haritası' },
    // S4 — Çaprazlama 1
    { id: 'cross1', pad: 0.4, min: 5.5, text: 'Problem 1: Saf sarı tohumlu bezelye ile yeşil tohumlu bezelyeyi çaprazlayalım.', key: 'Çaprazlama' },
    { id: 'gam', pad: 0.4, min: 5.5, text: 'Her ata, üreme hücresine gen çiftinden yalnızca birini verir. Mayozu hatırla!' },
    { id: 'f1', pad: 0.8, min: 7, text: 'Tabloyu dolduralım. Bütün yavrular Ss: hepsi sarı tohumlu ve melez.', key: '1. döl: hepsi sarı' },
    // S5 — Çaprazlama 2
    { id: 'cross2', pad: 0.4, min: 5, text: 'Problem 2: Bu melez bezelyeleri kendi aralarında çaprazlayalım.' },
    { id: 'f2', pad: 0.4, min: 6, text: 'Sonuçlar: bir SS, iki Ss, bir ss.', key: '2. döl' },
    { id: 'ratio', pad: 0.6, min: 9, text: 'Genotip oranı 1 : 2 : 1, fenotip oranı 3 sarı : 1 yeşil. Birinci dölde saklanan yeşil geri döndü!', key: '1 : 2 : 1 · 3 : 1' },
    { id: 'data', pad: 0.6, min: 8, text: 'Mendel binlerce tohum saydı: 6022 sarı, 2001 yeşil, yani yaklaşık 3’e 1. Oranlar olasılıktır; az yavruda sonuç farklı çıkabilir.', key: 'Veri · Olasılık' },
    { id: 'predict', pad: 0.8, text: 'Tahmin: yeşil tohumlar ss’dir; kendi aralarında hep yeşil döl verirler. Diğer canlılarda da aktarım benzerdir.' },
    // S6 — Cinsiyet
    { id: 'sex1', pad: 0.5, min: 8, text: 'Cinsiyet nasıl belirlenir? Kadında XX, erkekte XY eşey kromozomu vardır. Yumurta hep X, sperm X ya da Y taşır.', key: 'Cinsiyet' },
    { id: 'sex3', pad: 0.8, min: 7, text: 'Yani cinsiyeti babadan gelen eşey kromozomu belirler. Kız ya da erkek olma olasılığı yarı yarıyadır.', key: 'Babadan gelen kromozom' },
    // S7 — Kaydet
    { id: 'record', pad: 0.8, min: 10, text: 'Problem çözümlerimi gözlem defterime kaydediyorum.', key: 'Kaydet' },
    // S8 — Sıra sende · Sıradaki · Bitiş
    { id: 'task', pad: 0.8, min: 8.5, text: 'Sıra sende! Düzgün tohum (D), buruşuk tohuma (d) baskındır. Dd ile dd bezelyeleri çaprazla. Oranlar ne olur?', key: 'Sıra sende' },
    { id: 'next', pad: 1.0, min: 5.5, text: 'Sıradaki gözlemim: akraba evliliklerinin genetik sonuçları ve mutasyon.' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
