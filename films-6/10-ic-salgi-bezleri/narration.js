// narration.js — 6. sınıf Film 10: "Kimyasal Haberciler: İç Salgı Bezleri" (FB.6.3.7 · FB.6.3.9)
const NARRATION = {
  film: '10-ic-salgi-bezleri',
  title: 'Kimyasal Haberciler: İç Salgı Bezleri',
  outcome: 'FB.6.3.7 · FB.6.3.9',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // S1 — Merak: balon patlar, kalp hızlanır
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'scare', pad: 0.6, min: 7, text: 'Merhaba, ben Damla! Pat! Bir balon patladı. Kalbim birden hızlandı!' },
    { id: 'question', pad: 0.8, min: 8, text: 'Kalbime "hızlan" haberini kim gönderdi? Bu kez haberci bir sinir değil, kanda taşınan bir madde!', key: 'Soru sor' },
    // S2 — Hormon tanımı
    { id: 'hormone', pad: 0.5, min: 8, text: 'Bu maddelere hormon denir. Hormonları iç salgı bezleri üretir ve doğrudan kana verir.', key: 'Hormon' },
    { id: 'carry', pad: 0.9, min: 7.5, text: 'Kan, hormonları vücudun her yerine taşır. Her hormon belirli organları etkiler.', key: 'İç salgı bezleri' },
    // S3 — Bezler ve hormonlar: kavram haritası
    { id: 'map', pad: 0.5, text: 'Model üzerinde bezleri inceleyelim. Yapılarına girmeden, görevlerini kavram haritamda toplayacağım.', key: 'Kavram haritası' },
    { id: 'growth', pad: 0.5, text: 'Hipofiz bezi büyüme hormonunu üretir. Bu hormon büyümemizi ve gelişmemizi sağlar. Diğer bazı bezleri de düzenler.', key: 'Büyüme hormonu' },
    { id: 'thyroid', pad: 0.5, text: 'Boynumuzdaki tiroit bezi tiroksin üretir. Tiroksin, vücudun enerji kullanma hızını düzenler.', key: 'Tiroksin' },
    { id: 'adrenaline', pad: 0.5, text: 'Böbrek üstü bezleri adrenalin üretir. Korku ya da heyecan anında kalbi ve solunumu hızlandırır.', key: 'Adrenalin' },
    { id: 'pancreas', pad: 0.5, text: 'Pankreas iki hormon üretir. İnsülin kandaki şekeri düşürür, glukagon ise yükseltir. Böylece kan şekeri dengede kalır.', key: 'İnsülin ve glukagon' },
    { id: 'sex', pad: 0.9, text: 'Yumurtalıklar ve testisler eşeysel hormonları üretir. Ergenlikteki değişimleri bu hormonlar başlatır.', key: 'Eşeysel hormonlar' },
    // S4 — Aile analojisi: uyumlu bütün
    { id: 'family', pad: 0.5, min: 9.5, text: 'Bir ailede herkesin görevi farklıdır, ama birlikte evi düzenli tutarlar. İç salgı bezleri de böyle çalışır.', key: 'Analoji: aile' },
    { id: 'whole', pad: 0.9, min: 8, text: 'Bezler, sinir sistemiyle birlikte vücudu denetler ve düzenler. Hepsi uyumlu bir bütündür.', key: 'Uyumlu bütün' },
    // S5 — FB.6.3.9: araç belirle, bilgi bul, doğrula
    { id: 'healthq', pad: 0.5, text: 'Peki denetleyici ve düzenleyici sistemlerimizi sağlıklı tutmak için ne yapmalıyız? Araştırma zamanı!', key: 'Bilgi topla' },
    { id: 'tools', pad: 0.5, min: 8.5, text: 'Araçlarımı seçiyorum: güvenilir internet siteleri, basılı kaynaklar ve bir sağlık uzmanıyla görüşme.', key: 'Araç belirle' },
    { id: 'verify', pad: 0.9, min: 10, text: 'Bir sitede "Bu içecek bir haftada boy uzatır!" yazıyor. Öğretmenime ve güvenilir kaynaklara danıştım: doğru değil!', key: 'Doğrula' },
    // S6 — Bulgular ve rapor
    { id: 'findings', pad: 0.5, min: 8, text: 'Doğruladığım bilgiler: dengeli beslen, iyotlu tuz kullan, yeterince uyu, düzenli hareket et.', key: 'Bulgular' },
    { id: 'findings2', pad: 0.5, min: 8, text: 'Başını ve omurganı koru. Şekerli yiyecekleri azalt, zararlı maddelerden uzak dur, ilaçları doktora sormadan kullanma.' },
    { id: 'record', pad: 0.9, min: 6, text: 'Bulgularımı bir rapor olarak gözlem defterime kaydettim.', key: 'Kaydet' },
    // S7 — Sıra sende · Sıradaki · Bitiş
    { id: 'task', pad: 0.8, min: 8.5, text: 'Sıra sende! Bu sistemlerin sağlığı için neler yapılabilir? Araştır, doğrula ve kısa bir rapor hazırla.', key: 'Sıra sende' },
    { id: 'next', pad: 1.0, min: 5.5, text: 'Sıradaki gözlemim: ışığın yansıması.' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
