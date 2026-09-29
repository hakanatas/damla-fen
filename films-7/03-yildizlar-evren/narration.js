// narration.js — 7. sınıf Film 3: "Yıldızlar, Galaksiler ve Evren"  (Maarif FB.7.1.4 · FB.7.1.5)
// Sessiz film: text → altyazı. Süreler: python3 tools/tts.py films-7/03-yildizlar-evren --silent --wps=2.0
const NARRATION = {
  film: '03-yildizlar-evren',
  title: 'Yıldızlar, Galaksiler ve Evren',
  outcome: 'FB.7.1.4 · FB.7.1.5',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.8, min: 9, text: 'Merhaba, ben Damla! Güneş de bir yıldız. Peki Güneş nasıl doğdu? Bir gün söner mi?', key: 'Soru sor' },
    // SAHNE 2 — Yıldızların genel özellikleri
    { id: 'star', pad: 0.6, text: 'Yıldızlar, ısı ve ışık yayan dev gaz kütleleridir. Renkleri bize sıcaklıkları hakkında ipucu verir.', key: 'Yıldız' },
    { id: 'color', pad: 0.6, min: 7.5, text: 'Mavi yıldızlar en sıcaktır, kırmızılar daha soğuktur. Büyüklükleri de birbirinden çok farklıdır.', key: 'Renk ve sıcaklık' },
    { id: 'ly', pad: 1.0, text: 'Yıldızlar çok uzaktadır. Işığın bir yılda aldığı yola ışık yılı denir: yaklaşık 9,5 trilyon kilometre!', key: 'Işık yılı' },
    // SAHNE 3 — Yıldızların yaşamı
    { id: 'nebula', pad: 0.6, text: 'Her yıldız, gaz ve tozdan oluşan bir bulutsuda doğar. Bulutsunun bir bölümü sıkışıp ısınır, önyıldız oluşur.', key: 'Bulutsu → önyıldız' },
    { id: 'mass', pad: 0.6, text: 'Önyıldız, küçük ya da büyük kütleli bir yıldıza dönüşür. Yıldızın yaşamını en çok kütlesi belirler.', key: 'Kütle belirler' },
    { id: 'small', pad: 0.6, text: 'Güneş gibi küçük kütleli yıldızlar milyarlarca yıl ışır. Sonra şişip kırmızı deve dönüşür.', key: 'Kırmızı dev' },
    { id: 'small2', pad: 0.8, text: 'Dış katmanları gezegenimsi bulutsu olarak dağılır. Geriye küçük ve sıcak bir beyaz cüce kalır.', key: 'Beyaz cüce' },
    { id: 'big', pad: 0.6, text: 'Büyük kütleli yıldızlar daha kısa yaşar. Kırmızı süperdeve dönüşür ve süpernova olarak patlar.', key: 'Süpernova' },
    { id: 'big2', pad: 0.8, text: 'Geriye bir nötron yıldızı ya da ışığın bile kaçamadığı bir kara delik kalır.', key: 'Nötron yıldızı · kara delik' },
    { id: 'whole', pad: 1.0, min: 9, text: 'Hepsi uyumlu bir bütün: Yıldızlardan geriye kalan gaz ve toz, yeni yıldızların doğacağı bulutsulara katılır.', key: 'Uyumlu bir bütün' },
    // SAHNE 4 — Takımyıldızlar
    { id: 'const', pad: 1.0, min: 10, text: 'Yıldızları hayalî çizgilerle birleştirip takımyıldızlar oluştururuz: Büyükayı, Küçükayı, Kraliçe ve Avcı gibi.', key: 'Takımyıldız' },
    // SAHNE 5 — Galaksi ve evren
    { id: 'galaxy', pad: 0.6, text: 'Milyarlarca yıldız, gaz ve toz bir arada galaksiyi oluşturur. Güneş sistemimiz Samanyolu galaksisindedir.', key: 'Galaksi' },
    { id: 'andromeda', pad: 0.6, text: 'Büyük komşumuz Andromeda galaksisidir. Işığı bize yaklaşık 2,5 milyon yılda ulaşır.', key: 'Andromeda' },
    { id: 'universe', pad: 0.8, text: 'Evren ise bütün galaksileri, yıldızları, gezegenleri ve aradaki uzayı kapsar.', key: 'Evren' },
    { id: 'hier', pad: 0.6, min: 9, text: 'Hiyerarşiyi kuralım: Dünya, Güneş sistemi, Samanyolu, evren. Her biri bir öncekini içine alır.', key: 'Hiyerarşi' },
    { id: 'address', pad: 1.0, min: 8.5, text: 'Tıpkı adresim gibi: evim, şehrim, Türkiye… Dünya, Güneş sistemi, Samanyolu ve evren!', key: 'Evrendeki adresim' },
    // SAHNE 6 — Kaydet
    { id: 'record', pad: 0.6, min: 10, text: 'Bulduklarımı gözlem defterime kaydediyorum.', key: 'Kaydet' },
    // SAHNE 7 — Sıra sende + sonraki
    { id: 'task', pad: 0.8, min: 9, text: 'Sıra sende! Yıldızların yaşam sürecini anlatan bir afiş hazırla. Arkadaşlarınla bir kavram haritası kur.', key: 'Sıra sende' },
    { id: 'next', pad: 1.0, text: 'Sıradaki gözlemim: Kuvvet uyguladığımızda her zaman iş yapar mıyız? Fiziksel anlamda iş!' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
