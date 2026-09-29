// narration.js — Film 6: "Kendi Dinamometremi Tasarlıyorum"  (Maarif FB.5.2.2)
// Tek düzenlenebilir metin kaynağı (sessiz sürüm: altyazı).
const NARRATION = {
  film: '06-dinamometre-modeli',
  title: 'Kendi Dinamometremi Tasarlıyorum',
  outcome: 'FB.5.2.2 Basit araç gereçle bilimsel bir dinamometre modeli oluşturabilme',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Problem
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.8, text: 'Merhaba! Dinamometreyle kuvvet ölçmeyi öğrendim. Bugün kendi dinamometremi tasarlayacağım!' },
    { id: 'problem', pad: 0.8, min: 8, text: 'Önce problemi belirleyeyim: Basit malzemelerle 0 ile 5 N arasındaki kuvvetleri ölçen bir araç yapmalıyım.', key: 'Problemi belirle' },
    { id: 'criteria', pad: 1.0, text: 'Ölçeği kolay okunmalı. Aynı cismi tekrar ölçünce aynı sonucu vermeli.', key: 'Ölçütler' },
    // SAHNE 2 — Tasarım döngüsü
    { id: 'cycle', pad: 1.0, min: 10, text: 'Mühendisler böyle bir işte tasarım döngüsünü izler. Ben de bu adımları izleyeceğim.', key: 'Tasarım döngüsü' },
    // SAHNE 3 — Fikir, malzeme, güvenlik
    { id: 'ideas', pad: 0.8, text: 'Gerçek dinamometrede esnek bir yay vardı. Evdeki hangi malzemeler esnek?', key: 'Fikir üret' },
    { id: 'materials', pad: 0.8, min: 8.5, text: 'Lastik bant, karton, plastik bardak, ataş ve cetvel seçtim. Lastik bant çekince uzuyor.' },
    { id: 'safety', pad: 1.0, text: 'Kartonu keserken makası dikkatli ve bir yetişkin eşliğinde kullanmalıyım.', key: 'Güvenlik' },
    // SAHNE 4 — Model önerisi ve ölçekleme
    { id: 'plan', pad: 0.8, min: 10, text: 'İlk modelimi öneriyorum: Lastik bandın ucuna bir bardak asacağım. Ataştan gösterge, kartonun üstünde ölçek olacak.', key: 'Model öner' },
    { id: 'calib', pad: 1.0, min: 10, text: 'Ölçeği işaretlemek için gerçek dinamometreyle ölçtüğüm cisimleri asıyorum: 1 N, 2 N, 3 N...', key: 'Ölçeklendir' },
    // SAHNE 5 — Test ve yeni kanıt
    { id: 'test', pad: 0.8, min: 8, text: 'Şimdi test zamanı! A cismi 2 N, B cismi 4 N gösterdi. Harika!', key: 'Test et' },
    { id: 'evidence', pad: 0.8, min: 9, text: 'Ama bardağı boşaltınca gösterge sıfıra dönmedi! A cismini tekrar ölçünce 2,5 N okudum.', key: 'Yeni kanıt' },
    { id: 'why', pad: 1.0, text: 'Lastik bant çok gerilince eski hâline tam dönemedi. Modelim ikinci ölçütümü sağlamıyor.' },
    // SAHNE 6 — Karşılaştır ve yenile
    { id: 'compare', pad: 0.8, min: 9, text: 'Modelimi arkadaşlarımın modelleriyle karşılaştırdım. Tükenmez kalem yayı kullanan model hep sıfıra dönüyordu.', key: 'Karşılaştır' },
    { id: 'revise', pad: 0.8, min: 9, text: 'Bu yeni kanıtla modelimi yeniliyorum: Lastik bant yerine yay takıp ölçeği yeniden işaretliyorum.', key: 'Modeli yenile' },
    { id: 'retest', pad: 1.0, min: 8, text: 'Tekrar test ettim: Gösterge sıfıra dönüyor, A cismi yine 2 N. Ölçütlerim sağlandı!' },
    // SAHNE 7 — Kanıtlar, paylaşım
    { id: 'table', pad: 0.8, min: 8.5, text: 'Sonuçları tabloya yazdım. Hatalarım, modelimi geliştirmem için bir fırsat oldu.', key: 'Kaydet' },
    { id: 'thick', pad: 1.0, text: 'Daha büyük kuvvetleri ölçmek istersem daha kalın bir yay seçmeliyim.' },
    { id: 'share', pad: 1.0, min: 8, text: 'Son adım: Modelimi sınıfta paylaşıyorum ve arkadaşlarımın önerilerini dinliyorum.', key: 'Paylaş' },
    // SAHNE 8 — Sıra sende
    { id: 'task', pad: 1.0, min: 10, text: 'Sıra sende! Grubunla basit malzemelerden bir dinamometre modeli tasarla, test et ve geliştir.' },
    { id: 'next', pad: 1.0, text: 'Sıradaki gözlemim: Kütle ve ağırlık aynı şey mi? Hadi karşılaştıralım!' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
