// narration.js — 8. sınıf Film 5: "Yaşamın Şifresi: DNA" (FB.8.3.1 · FB.8.3.2)
const NARRATION = {
  film: '05-dna',
  title: 'Yaşamın Şifresi: DNA',
  outcome: 'FB.8.3.1 · FB.8.3.2',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // S1 — Merak
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.6, min: 7, text: 'Merhaba, ben Damla! Kardeşler neden birbirine benzer? Bu benzerliğin bilgisi nerede saklanır?', key: 'Soru sor' },
    { id: 'storm', pad: 0.8, min: 7, text: 'Hatırlayalım: Hücrenin yönetim merkezi çekirdektir. Kalıtım maddesi de çekirdekte bulunur.', key: 'Kalıtım maddesi' },
    // S2 — Hiyerarşi (FB.8.3.1)
    { id: 'chromo', pad: 0.5, min: 6.5, text: 'Çekirdeğe yaklaşalım. İşte kromozomlar! Kromozom, sıkıca paketlenmiş DNA ve proteinlerden oluşur.', key: 'Kromozom' },
    { id: 'dna', pad: 0.5, min: 6, text: 'Kromozomun paketini açınca uzun, çift zincirli bir molekül çıkar: DNA.', key: 'DNA' },
    { id: 'gene', pad: 0.5, min: 6, text: 'DNA üzerinde, bir özelliğin bilgisini taşıyan bölümlere gen denir.', key: 'Gen' },
    { id: 'nucl', pad: 0.8, min: 6, text: 'DNA’nın yapı birimi ise nükleotiddir. Genler de art arda dizilmiş nükleotidlerden oluşur.', key: 'Nükleotid' },
    { id: 'hier', pad: 0.6, min: 8, text: 'Kavram haritası: kromozomda DNA bulunur, DNA’da genler bulunur, genler nükleotidlerden oluşur.', key: 'Kavram haritası' },
    { id: 'analogy', pad: 0.6, min: 9, text: 'Bir benzetme: Kromozom bir kitapsa DNA onun metnidir. Gen bir cümle, nükleotid ise bir harftir.', key: 'Benzetme' },
    { id: 'whole', pad: 0.9, text: 'Hepsi uyumlu bir bütündür. Kalıtım bilgisi böyle saklanır ve yeni hücrelere aktarılır.', key: 'Uyumlu bütün' },
    // S3 — Nükleotid (FB.8.3.2 a)
    { id: 'nparts', pad: 0.6, min: 7, text: 'Bir nükleotidi büyütelim. Üç parçası var: fosfat, şeker ve organik baz.', key: 'Nükleotidin yapısı' },
    { id: 'bases', pad: 0.9, min: 9, text: 'DNA’da dört çeşit organik baz bulunur: adenin, timin, guanin ve sitozin. Bu yüzden dört çeşit nükleotid vardır.', key: 'A · T · G · C' },
    // S4 — Model kur, veri topla, yenile (FB.8.3.2 b, c)
    { id: 'build', pad: 0.5, min: 7, text: 'Şimdi bir DNA modeli kuralım! Kenarlar için pipet, bazlar için renkli karton kullanıyorum.', key: 'Model kur' },
    { id: 'try', pad: 0.6, min: 8, text: 'İlk denemem: bazları rastgele eşleştirdim. Ama basamaklar eşit olmuyor, parçalar birbirine oturmuyor!', key: 'İlk deneme' },
    { id: 'evid', pad: 0.5, min: 7, text: 'Kaynaklara bakıyorum: DNA’da adenin her zaman timinle, guanin her zaman sitozinle eşleşir.', key: 'A – T · G – C' },
    { id: 'revise', pad: 0.6, min: 7, text: 'Modelimi yeniliyorum. Artık bütün basamaklar eşit, iki zincir tam karşılıklı!', key: 'Modeli yenile' },
    { id: 'bonds', pad: 0.6, text: 'Nükleotidler arasında bağlar vardır. Bu bağlar zincirleri ve iki zinciri bir arada tutar.', key: 'Bağlar' },
    { id: 'helix', pad: 0.9, min: 8, text: 'Son adım: merdiveni kendi etrafında burkuyorum. İşte DNA’nın çift sarmal yapısı!', key: 'Çift sarmal' },
    // S5 — Bilim insanları
    { id: 'sci', pad: 0.9, min: 9, text: 'Rosalind Franklin’in X-ışınıyla çektiği fotoğraf, 1953’te Watson ve Crick’in çift sarmal modeline yol gösterdi.', key: 'Bilim insanları' },
    // S6 — Eşleme ve hatalar
    { id: 'copy', pad: 0.5, min: 7, text: 'Hücre bölünmeden önce DNA kendini eşler. Önce iki zincir, bir fermuar gibi ayrılır.', key: 'DNA’nın eşlenmesi' },
    { id: 'copy2', pad: 0.6, min: 8, text: 'Her zincir bir kalıptır. Karşısına uygun nükleotidler gelir ve birbirinin aynısı iki DNA oluşur.' },
    { id: 'error', pad: 0.9, min: 8, text: 'Eşlemede olan hataların çoğu onarılır. Onarılamayan hatalar ise DNA’da kalıcı değişikliğe yol açabilir.', key: 'Hata ve onarım' },
    // S7 — Kaydet
    { id: 'record', pad: 0.9, min: 12, text: 'Modelden topladığım verileri gözlem defterime kaydediyorum.', key: 'Kaydet' },
    // S8 — Sıra sende · Sıradaki · Bitiş
    { id: 'task', pad: 0.8, min: 8.5, text: 'Sıra sende! Farklı malzemelerle kendi DNA modelini tasarla. Parçaları ve baz eşleşmelerini etiketle.', key: 'Sıra sende' },
    { id: 'next', pad: 1.0, min: 5.5, text: 'Sıradaki gözlemim: Hücreler nasıl bölünür? Mitoz ve mayoz.' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
