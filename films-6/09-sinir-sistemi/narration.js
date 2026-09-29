// narration.js — 6. sınıf Film 9: "Vücudumuzun Haberleşme Ağı: Sinir Sistemi" (FB.6.3.6)
const NARRATION = {
  film: '09-sinir-sistemi',
  title: 'Vücudumuzun Haberleşme Ağı: Sinir Sistemi',
  outcome: 'FB.6.3.6',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // S1 — Merak: topu yakalama
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'catch', pad: 0.6, min: 7, text: 'Merhaba, ben Damla! Bir top geliyor... Hop, yakaladım!' },
    { id: 'question', pad: 0.8, min: 8, text: 'Gözüm topu gördü, kollarım harekete geçti. Bu haberleşmeyi vücudumuzda hangi sistem sağlıyor?', key: 'Soru sor' },
    // S2 — Model: bölümler
    { id: 'system', pad: 0.5, text: 'Cevap: sinir sistemi! Vücudumuzdaki bütün sistemleri denetler ve uyum içinde çalışmalarını sağlar.', key: 'Sinir sistemi' },
    { id: 'model', pad: 0.5, min: 8, text: 'Bir model üzerinde inceleyelim. Sinir sistemi iki bölümden oluşur: merkezî ve çevresel sinir sistemi.', key: 'Model üzerinde incele' },
    { id: 'central', pad: 0.5, min: 9, text: 'Merkezî sinir sisteminde beyin, beyincik, omurilik soğanı ve omurilik bulunur. Kafatası ve omurga onları korur.', key: 'Merkezî sinir sistemi' },
    { id: 'peripheral', pad: 0.9, min: 8, text: 'Beyin ve omurilikten çıkıp bütün vücuda uzanan sinirler ise çevresel sinir sistemini oluşturur.', key: 'Çevresel sinir sistemi' },
    // S3 — Merkezî sinir sisteminin yapıları ve görevleri
    { id: 'brain', pad: 0.5, text: 'Beyin düşünür, öğrenir ve hatırlar. Duyu organlarından gelen bilgiyi yorumlar, isteyerek yaptığımız hareketleri yönetir.', key: 'Beyin' },
    { id: 'cereb', pad: 0.5, text: 'Beyincik dengemizi sağlar. Hareketlerimizin düzenli ve uyumlu olmasına yardım eder.', key: 'Beyincik' },
    { id: 'medulla', pad: 0.5, text: 'Omurilik soğanı kalp atışı, soluk alıp verme, yutkunma, öksürme ve hapşırma gibi istemsiz olayları denetler.', key: 'Omurilik soğanı' },
    { id: 'cord', pad: 0.9, text: 'Omurilik, beyin ile vücut arasındaki ana iletim yoludur. Haberler bu yoldan gidip gelir.', key: 'Omurilik' },
    // S4 — Haberin yolu
    { id: 'path', pad: 0.9, min: 11, text: 'Topu yakalarken göz, haberi sinirlerle beyne iletti. Beyin karar verdi. Emir, omurilik ve sinirlerle kaslara ulaştı.', key: 'Haberin yolu' },
    // S5 — Refleks (ayrıntıya girmeden)
    { id: 'reflex', pad: 0.5, min: 8, text: 'Peki sıcak bir bardağa dokununca? Elimizi düşünmeden, çok hızlı çekeriz. Buna refleks denir.', key: 'Refleks' },
    { id: 'reflex2', pad: 0.9, min: 8, text: 'Bazı reflekslerde cevabı beyin değil, omurilik verir. Böylece zaman kazanır, kendimizi koruruz.' },
    // S6 — Köprü: omurilik zedelenmesi
    { id: 'injury', pad: 0.5, min: 8, text: 'Omurilik zedelenirse haberler iletilemeyebilir ve felç oluşabilir. Bu yüzden omurgamızı korumalıyız.', key: 'Omurilik zedelenmesi' },
    { id: 'protect', pad: 0.9, min: 7, text: 'Bisiklette kask takarım, araçta emniyet kemerimi bağlarım, sığ suya atlamam.', key: 'Omurgamı korurum' },
    // S7 — Analoji ile kaydet
    { id: 'analogy', pad: 0.5, min: 10, text: 'Bunu benzetmelerle kaydedelim: beyin yönetim merkezi, omurilik ana kablo, sinirler de iletişim hatları gibidir.', key: 'Analoji' },
    { id: 'record', pad: 0.9, min: 6, text: 'Yapıları, görevleri ve benzetmeleri gözlem defterime kaydettim.', key: 'Kaydet' },
    // S8 — Sıra sende · Sıradaki · Bitiş
    { id: 'task', pad: 0.8, min: 8.5, text: 'Sıra sende! Sinir sistemini benzetmelerle anlatan bir poster tasarla ve arkadaşlarına sun.', key: 'Sıra sende' },
    { id: 'next', pad: 1.0, min: 5.5, text: 'Sıradaki gözlemim: vücudumuzun kimyasal habercileri, iç salgı bezleri.' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
