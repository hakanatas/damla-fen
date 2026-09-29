// narration.js — 6. sınıf Film 1: "Güneş Sistemi ve Gezegenler"  (Maarif FB.6.1.1 · FB.6.1.2)
// Sessiz film: text → altyazı. Süreler: python3 tools/tts.py films-6/01-gunes-sistemi --silent --wps=1.85
const NARRATION = {
  film: '01-gunes-sistemi',
  title: 'Güneş Sistemi ve Gezegenler',
  outcome: 'FB.6.1.1 · FB.6.1.2',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.6, text: 'Merhaba! Ben Damla. Bu akşam gökyüzünde pek göz kırpmayan parlak bir nokta gördüm.' },
    { id: 'q', pad: 0.8, min: 8, text: 'Yıldız mı, gezegen mi? Güneş’in çevresinde kaç gezegen var? Hepsi birbirine benzer mi?', key: 'Soru sor' },
    // SAHNE 2 — Güneş sistemi
    { id: 'system', pad: 0.6, text: 'Güneş sistemi; Güneş, çevresinde dolanan sekiz gezegen ve daha küçük gök cisimlerinden oluşur.', key: 'Güneş sistemi' },
    { id: 'order', pad: 1.0, min: 9.5, text: 'Güneş’e yakınlık sırası: Merkür, Venüs, Dünya, Mars, Jüpiter, Satürn, Uranüs, Neptün.', key: 'Güneş’e yakınlık' },
    { id: 'biruni', pad: 1.0, text: 'Biruni de çalışmalarında Dünya’nın ve diğer gezegenlerin Güneş’in çevresinde dolandığını vurgulamıştır.', key: 'Biruni' },
    // SAHNE 3 — Nitelikleri belirleme
    { id: 'traits', pad: 0.6, min: 9, text: 'Önce güvenilir kaynaklardan gezegenlerin niteliklerini belirliyorum. Yüzeyi kayalık mı, yoksa gazlardan mı oluşuyor?', key: 'Nitelikleri belirle' },
    { id: 'rings', pad: 0.8, min: 8, text: 'Halkası var mı? Uydusu var mı? Merkür ile Venüs’ün hiç uydusu yok.', key: 'Uydu ve halka' },
    { id: 'size', pad: 1.0, min: 8, text: 'Hacimce en büyük gezegen Jüpiter, en küçüğü Merkür. Dünya, Jüpiter’in yanında minicik kalır.', key: 'Hacimsel büyüklük' },
    // SAHNE 4 — Ayrıştır, grupla, etiketle
    { id: 'sort', pad: 0.6, min: 7.5, text: 'Şimdi ayrıştırıyorum: Kayalık olanlar bir yana, gazlardan oluşanlar öbür yana.', key: 'Ayrıştır' },
    { id: 'groups', pad: 0.8, text: 'İlk dördü küçük, karasal ve halkasız. Son dördü büyük, gazsal ve halkalı.', key: 'Grupla' },
    { id: 'label', pad: 1.2, text: 'Gruplarıma etiket veriyorum: iç gezegenler ve dış gezegenler!', key: 'Etiketle' },
    // SAHNE 5 — Asteroit kuşağı, meteor, meteorit
    { id: 'belt', pad: 0.8, text: 'İki grubun arasında, Mars ile Jüpiter arasında, asteroit kuşağı bulunur.', key: 'Asteroit kuşağı' },
    { id: 'rock', pad: 0.6, text: 'Asteroitlerden kopan parçalara gök taşı denir. Dünya atmosferine giren gök taşına ise meteor denir.', key: 'Gök taşı · Meteor' },
    { id: 'meteorit', pad: 1.2, min: 8, text: 'Yeryüzüne ulaşan parçaya meteorit, açtığı çukura da meteor çukuru denir.', key: 'Meteorit' },
    // SAHNE 6 — Model önerme ve yenileme
    { id: 'model', pad: 0.6, min: 8.5, text: 'Şimdi bir Güneş sistemi modeli öneriyorum. Oyun hamuru, taş parçaları ve atık kapaklar kullanıyorum.', key: 'Model öner' },
    { id: 'evidence', pad: 0.8, min: 7.5, text: 'Modelimi bilimsel kaynaklarla karşılaştırdım. Gezegenlerin hepsi aynı büyüklükte değilmiş!', key: 'Yeni kanıt' },
    { id: 'revise', pad: 0.8, min: 9, text: 'Modelimi yeniliyorum: Büyükleri büyüttüm, küçükleri küçülttüm. Asteroit kuşağını da yerine ekledim.', key: 'Modeli yenile' },
    { id: 'scale', pad: 1.2, text: 'Gerçek uzaklıklar o kadar büyük ki masaya sığmaz. Bu yüzden modelim ölçekli değildir.' },
    // SAHNE 7 — Kaydet
    { id: 'record', pad: 0.8, min: 11, text: 'Bulduklarımı gözlem defterime kaydediyorum.', key: 'Kaydet' },
    // SAHNE 8 — Sıra sende + sonraki
    { id: 'task', pad: 0.8, text: 'Sıra sende! Yakınlık sırası için kendi tekerlemeni yaz, atık malzemelerle modelini kur.', key: 'Sıra sende' },
    { id: 'discuss', pad: 1.0, text: 'Arkadaşlarınla tartışın: Güneş sisteminde canlılar başka nerede yaşayabilir?' },
    { id: 'next', pad: 1.0, text: 'Sıradaki gözlemim: Gündüz neden bazen kararır? Güneş ve Ay tutulmaları!' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
