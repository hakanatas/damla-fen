// narration.js — 6. sınıf Film 22: "Isınma Yakıtları ve Çevre"  (Maarif FB.6.7.3 · FB.6.7.4) — 6. sınıf serisinin finali
const NARRATION = {
  film: '22-yakitlar-cevre',
  title: 'Isınma Yakıtları ve Çevre',
  outcome: 'FB.6.7.3 · FB.6.7.4',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Kış akşamı
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.6, min: 6.5, text: 'Kış geldi! Bacalardan duman yükseliyor. Herkes evini ısıtıyor.' },
    { id: 'question', pad: 0.8, text: 'Hangi yakıtlarla ısınıyoruz? Bu yakıtlar bizi ve çevreyi nasıl etkiliyor?', key: 'Soru sor' },
    // SAHNE 2 — Yakıtlar
    { id: 'brainstorm', pad: 0.4, min: 7, text: 'Önce beyin fırtınası: odun, kömür, fuel-oil, doğal gaz, tüp gaz...', key: 'Beyin fırtınası' },
    { id: 'classify', pad: 0.8, min: 8, text: 'Odun ve kömür katı, fuel-oil sıvı, doğal gaz ve tüp gaz ise gaz yakıttır.', key: 'Katı · Sıvı · Gaz' },
    // SAHNE 3 — Etkiler
    { id: 'burn', pad: 0.8, min: 9, text: 'Yanan yakıt ısı verir ama duman, is ve gazlar da havaya karışır. Kışın hava bu yüzden kirlenir.', key: 'Çevre kirliliği' },
    { id: 'health', pad: 0.8, text: 'Kirli hava solunum yolu hastalıklarını artırabilir. Çocuklar ve yaşlılar daha çok etkilenir.', key: 'İnsan sağlığı' },
    // SAHNE 4 — Tartışma
    { id: 'debate', pad: 0.6, min: 8, text: 'Münazara yaptık. Bir grup: "Doğal gaz daha az duman çıkarır, şehrin havası temizlenir."', key: 'Mantıksal temellendirme' },
    { id: 'contra', pad: 0.8, min: 9, text: 'Diğeri: "Doğal gaz tamamen zararsızdır." Çelişki var! O da yanınca iklim değişikliğine katkıda bulunan karbondioksit üretir.', key: 'Çelişkiyi bul' },
    { id: 'valid', pad: 0.8, text: 'Geçerli fikir: Her yakıtın bir etkisi vardır. Az tüketmek ve güvenli kullanmak önemlidir.', key: 'Geçerli fikir' },
    // SAHNE 5 — Güvenlik: karbon monoksit
    { id: 'co', pad: 0.6, min: 7.5, text: 'Görünmeyen bir tehlike daha var: Yakıt tam yanmazsa karbon monoksit gazı oluşur.', key: 'Karbon monoksit' },
    { id: 'co-what', pad: 0.8, text: 'Renksiz ve kokusuzdur, fark edilmeden solunur. Soba ve doğal gaz zehirlenmelerinin nedeni budur.' },
    { id: 'symptoms', pad: 0.8, min: 8, text: 'Baş ağrısı, baş dönmesi, bulantı, uyku hâli olursa hemen temiz havaya çık, yetişkine haber ver.', key: 'Belirtiler' },
    { id: 'prevent', pad: 0.8, min: 9, text: 'Baca her yıl temizlenmeli, soba ve kombi yetkililerce kurulmalı. Evde karbon monoksit dedektörü olmalı.', key: 'Önlemler' },
    { id: 'stove', pad: 0.8, min: 7, text: 'Yatmadan önce sobaya yakıt eklenmez. Doğal gaz kokusu alırsan pencereleri aç, yetişkine haber ver.' },
    // SAHNE 6 — Bilinçli tüketim
    { id: 'economy', pad: 0.8, min: 8, text: 'Az yakıt yakmak bütçeyi de havayı da korur. Yalıtım yapmak ve evi fazla ısıtmamak işe yarar.', key: 'Bilinçli tüketim' },
    // SAHNE 7 — Çevre problemi çözme
    { id: 'problems', pad: 0.4, min: 7.5, text: 'Su ve toprak kirliliği, orman yangınları, ormansızlaşma... Çevre sorunlarının çoğu insan kaynaklıdır.', key: 'Çevre sorunları' },
    { id: 'structure', pad: 0.6, min: 10, text: 'Mahallemdeki kış hava kirliliğini seçip yapılandırdım. Özetim: Akşamları yakılan kömür ve odun dumanı havayı kirletiyor.', key: 'Yapılandır · Özetle' },
    { id: 'predict', pad: 0.6, min: 8.5, text: 'Ölçüm verileri kışın kirliliğin arttığını gösteriyor. Tahminim: Evler yalıtılırsa daha az yakıt yakılır.', key: 'Veriye dayalı tahmin' },
    { id: 'reason', pad: 0.6, min: 8, text: 'Önerileri akıl yürüterek tartıyoruz: Etkili mi? Uygulanabilir mi? Yan etkisi var mı?', key: 'Akıl yürüt' },
    { id: 'evaluate', pad: 0.8, min: 8, text: 'Yalıtım ve doğru yakma güçlü öneriler. "Evi hiç havalandırmayalım" önerisi ise güvenli değil!', key: 'Değerlendir' },
    // SAHNE 8 — Final
    { id: 'record', pad: 0.6, min: 7.5, text: 'Bulduklarımı gözlem defterime kaydediyorum.', key: 'Kaydet' },
    { id: 'task', pad: 0.8, min: 8, text: 'Sıra sende! Grubunla bir çevre sorunu için sosyal sorumluluk projesi tasarla, 5 Haziran’da paylaş!', key: 'Sıra sende' },
    { id: 'bye', pad: 1.0, text: '6. sınıf gözlemlerim burada bitiyor. Sıradaki durak: 7. sınıf ve Uzay Çağı!' },
    { id: 'end', min: 5.5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
