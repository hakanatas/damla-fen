// narration.js — 7. sınıf Film 14: "Atomun İçine Yolculuk"  (Maarif FB.7.5.1 · FB.7.5.2)
// Tek düzenlenebilir metin kaynağı. Sessiz film: text altyazı olarak görünür.
const NARRATION = {
  film: '14-atom',
  title: 'Atomun İçine Yolculuk',
  outcome: 'FB.7.5.1 · FB.7.5.2',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Parkta kum
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.4, text: 'Merhaba, ben Damla! Parkta bir avuç kumu yavaşça döküyorum.' },
    { id: 'grains', pad: 0.8, text: 'Tek tek kum taneleri! Park zemini de bu tanelerin bir araya gelmesiyle oluşmuş.', key: 'Tanecikler' },
    { id: 'foil', pad: 0.4, min: 6.5, text: 'Alüminyum folyoyu durmadan ikiye bölsem? Parçalar küçülür, küçülür...' },
    { id: 'smallest', pad: 0.8, text: 'En küçük parça daha da küçülür mü? Onu görebilir miyiz?', key: 'Merak' },
    // SAHNE 2 — Democritus ve sorular
    { id: 'democ', pad: 0.8, text: 'Yaklaşık 2400 yıl önce Democritus, maddenin bölünemeyen en küçük parçasına “atomos” dedi.', key: 'atomos: bölünemez' },
    { id: 'atomdef', pad: 0.8, text: 'Bugün maddeleri oluşturan bu gözle görülmeyen parçacıklara atom diyoruz.', key: 'Atom' },
    { id: 'questions', pad: 0.8, text: 'Sorularım var: Atomun içinde ne var? Bilim insanları atomu nasıl modelledi?', key: 'Soru sor' },
    // SAHNE 3 — Atom modellerinin tarihi
    { id: 'dalton', pad: 0.4, text: '1800’lerin başında Dalton, atomu içi dolu, bölünemeyen bir küre gibi düşündü.', key: 'Dalton' },
    { id: 'thomson', pad: 0.4, text: 'Elektron keşfedilince Thomson, atomu içinde eksi yüklü elektronlar olan artı yüklü bir küre gibi modelledi.', key: 'Thomson' },
    { id: 'rutherford', pad: 0.4, text: 'Rutherford’un deneyi yeni kanıt getirdi: Ortada küçük, artı yüklü bir çekirdek var; çevresi çoğunlukla boşluk.', key: 'Rutherford' },
    { id: 'bohr', pad: 0.4, text: 'Bohr’a göre elektronlar, çekirdeğin çevresinde belirli katmanlarda dolanır.', key: 'Bohr: katmanlar' },
    { id: 'modern', pad: 0.8, text: 'Modern atom teorisine göre elektronların yeri saptanamaz. Bu yüzden elektron bulutundan söz edilir.', key: 'Elektron bulutu' },
    { id: 'verify', pad: 0.4, text: 'Bilgileri güvenilir kaynaklardan ve modern atom teorisiyle karşılaştırarak doğruluyorum.', key: 'Doğrula' },
    { id: 'theory', pad: 0.4, text: 'Teori, doğadaki olayları açıklamaya çalışan bilimsel bilgidir.', key: 'Teori' },
    { id: 'change', pad: 0.8, text: 'Çıkarımım: Atom modeli yeni kanıtlarla değişti. Bilimsel bilgi değişebilir!', key: 'Bilimsel bilgi değişebilir' },
    // SAHNE 4 — Atomun yapısı
    { id: 'parts', pad: 0.4, text: 'Bugünkü bilgilerle atoma bakalım: Ortada çekirdek, çevresinde elektronlar var.', key: 'Çekirdek' },
    { id: 'nucleus', pad: 0.4, text: 'Çekirdekte proton ve nötronlar bulunur. Proton artı yüklü, nötron yüksüzdür.', key: 'Proton · Nötron' },
    { id: 'electron', pad: 0.4, text: 'Eksi yüklü elektronlar, çekirdeğin çevresindeki katmanlarda bulunur. Zıt yükler birbirini çeker.', key: 'Elektron' },
    { id: 'mass', pad: 0.4, min: 7, text: 'Proton ve nötronun kütlesi neredeyse eşit; elektron ise yaklaşık 1836 kat hafif. Kütlenin neredeyse tamamı çekirdekte!', key: 'Kütle' },
    { id: 'identity', pad: 0.4, min: 7.5, text: 'Atomun kimliğini proton sayısı belirler: Hidrojende 1, karbonda 6, oksijende 8 proton var.', key: 'Kimlik: proton sayısı' },
    // SAHNE 5 — Elektron bulutu ve atomun yarıçapı
    { id: 'fast', pad: 0.4, key: 'Bulunma ihtimali', text: 'Elektronlar çok hızlıdır; yerlerini tam olarak bilemeyiz. Ama bulunma ihtimalinin fazla olduğu yerleri söyleyebiliriz.' },
    { id: 'radius', pad: 0.4, text: 'Atomun yarıçapını, elektronların bulunabildiği son sınır belirler.', key: 'Atomun yarıçapı' },
    { id: 'tiny', pad: 0.8, min: 7, text: 'Atom bir stadyum kadar olsa, çekirdeği ortada bir nohut kadar kalırdı!' },
    // SAHNE 6 — Kaydet
    { id: 'record', pad: 0.4, min: 11.5, text: 'Bulduklarımı gözlem defterime kaydedeyim.', key: 'Kaydet' },
    { id: 'method', pad: 0.8, text: 'Soru sordum, bilgi topladım, doğruladım, çıkarım yaptım. Bilim böyle ilerler!' },
    // SAHNE 7 — Sıra sende · Sıradaki · Bitiş
    { id: 'task', pad: 0.8, min: 8, text: 'Sıra sende! Geçmişten bugüne atom modellerini anlatan bir poster hazırla, sınıfta sun.', key: 'Sıra sende' },
    { id: 'next', pad: 0.8, text: 'Sıradaki yolculuk: Atomlar bir araya gelince ne olur? Moleküller, elementler, bileşikler!' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
