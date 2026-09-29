// narration.js — 7. sınıf Film 20: "Elektriklenme"  (Maarif FB.7.6.1 · FB.7.6.2)
const NARRATION = {
  film: '20-elektriklenme',
  title: 'Elektriklenme',
  outcome: 'FB.7.6.1 · FB.7.6.2',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Kaydırak
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hook', pad: 0.6, text: 'Ece kaydıraktan kaydı. Aşağı indiğinde saçları havaya dikildi!' },
    { id: 'question', pad: 0.8, text: 'Kazağımı çıkarırken de çıtırtı duyuyorum. Bu olayların arkasında aynı sebep mi var?', key: 'Soru sor' },
    // SAHNE 2 — Bilgi toplama
    { id: 'tools', pad: 0.6, text: 'Önce bilgi toplayacağım. Ders kitabı, güvenilir dijital kaynaklar, bilim merkezi ve öğretmenim işime yarar.', key: 'Bilgi toplama araçları' },
    { id: 'claim', pad: 0.4, text: 'Bir sitede "Elektriklenme yalnızca kışın olur." yazıyor. Kaynak gösterilmemiş.', key: 'Doğrula' },
    { id: 'verify', pad: 0.8, text: 'Güvenilir kaynaklarla karşılaştırdım: Elektriklenme her mevsim olur, kuru havada daha kolay gözlenir.' },
    // SAHNE 3 — Bulgular
    { id: 'define', pad: 0.8, text: 'Cisimler sürtünme, dokunma ya da etki ile elektrik yükü kazanabilir. Buna elektriklenme denir.', key: 'Elektriklenme' },
    { id: 'examples', pad: 0.8, min: 10, text: 'Şimşek ve yıldırım, kapı kolunda çarpılma, fotokopi makinesi ve elektrostatik boyama da elektriklenmeyle ilgilidir.', key: 'Doğa ve teknoloji' },
    // SAHNE 4 — Deney tasarımı
    { id: 'design', pad: 0.6, text: 'Şimdi elektriklenme çeşitlerini gözlemleyebileceğim bir deney tasarlayalım.', key: 'Deney tasarla' },
    { id: 'materials', pad: 0.6, text: 'Malzemeler: iki balon, yün kumaş, küçük kâğıt parçaları ve kavanozdan yaptığım bir elektroskop.' },
    { id: 'elscope', pad: 0.8, text: 'Elektroskop, bir cismin yüklü olup olmadığını gösterir. Yüklenince ince folyo yaprakları açılır.', key: 'Elektroskop' },
    // SAHNE 5 — Sürtünme
    { id: 'rub', pad: 0.6, min: 8.5, text: 'Birinci deney: Balonu yün kumaşa sürtüyorum. Bu sırada bazı elektronlar kumaştan balona geçer.', key: 'Sürtünme ile' },
    { id: 'rub2', pad: 0.8, text: 'Balon da kumaş da yüklendi. Sürtünme ile elektriklenme temaslıdır.' },
    // SAHNE 6 — Dokunma
    { id: 'touch', pad: 0.6, text: 'İkinci deney: Yüklü balonu elektroskobun topuzuna dokunduruyorum. Yapraklar açıldı!', key: 'Dokunma ile' },
    { id: 'touch2', pad: 0.8, text: 'Balonu uzaklaştırsam da yapraklar açık kalıyor. Yükün bir kısmı dokunma ile geçti.' },
    // SAHNE 7 — Etki
    { id: 'induce', pad: 0.6, text: 'Üçüncü deney: Yüklü balonu kâğıt parçalarına dokundurmadan yaklaştırıyorum. Kâğıtlar balona sıçradı!', key: 'Etki ile' },
    { id: 'induce2', pad: 0.6, text: 'Balon, kâğıttaki yüklerin yerini dokunmadan değiştirdi. Etki ile elektriklenme temassızdır.', key: 'Temassız' },
    { id: 'induce3', pad: 0.8, text: 'Yüksüz elektroskoba yaklaştırınca yapraklar açılıyor, balonu uzaklaştırınca kapanıyor.' },
    // SAHNE 8 — Ölçme ve veri analizi
    { id: 'measure', pad: 0.6, text: 'Ölçme zamanı! Balonu kaç kez sürtersem kaç kâğıt parçası çeker?', key: 'Ölçme' },
    { id: 'variables', pad: 0.6, text: 'Balon, kâğıt boyutu ve uzaklık hep aynı. Yalnızca sürtme sayısını değiştiriyorum.', key: 'Değişkenler' },
    { id: 'data', pad: 0.8, min: 10, text: 'Her ölçümü üç kez tekrarladım ve ortalamasını aldım. Sürtme sayısı arttıkça çekilen kâğıt sayısı da arttı.', key: 'Veri analizi' },
    // SAHNE 9 — Güvenlik
    { id: 'safety', pad: 0.6, text: 'Dikkat! Bu deneyler balon, kumaş ve kâğıtla yapılır. Prizle ve elektrik kablolarıyla asla deney yapılmaz.', key: 'Güvenlik' },
    { id: 'vdg', pad: 0.8, text: 'Van de Graaff jeneratörüne yalnızca öğretmen gözetiminde dokunulur.' },
    // SAHNE 10 — Kaydet · Sıra sende · Sıradaki
    { id: 'record', pad: 0.6, min: 8.5, text: 'Kaynaklarımı, deneyimi ve verilerimi gözlem defterime kaydediyorum.', key: 'Kaydet' },
    { id: 'task', pad: 0.8, text: 'Sıra sende! Elektriklenmenin doğadaki ve teknolojideki örneklerini anlatan bir poster hazırla.', key: 'Sıra sende' },
    { id: 'next', pad: 1.0, text: 'Sıradaki gözlemim: Elektrik yükleri. Balonlar neden bazen iter, bazen çeker?' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
