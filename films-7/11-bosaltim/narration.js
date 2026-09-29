// narration.js — 7. sınıf Film 11: "Vücudumuzun Temizlik Ekibi: Boşaltım Sistemi" (FB.7.3.8 · FB.7.3.9)
const NARRATION = {
  film: '11-bosaltim',
  title: 'Vücudumuzun Temizlik Ekibi: Boşaltım Sistemi',
  outcome: 'FB.7.3.8 · FB.7.3.9',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // S1 — Merak
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.6, min: 7.5, text: 'Merhaba, ben Damla! Uzun bir yürüyüşten sonra terledim. Şimdi bolca su içiyorum.' },
    { id: 'question', pad: 0.8, min: 7, text: 'Hücrelerimizde oluşan atıklar vücudumuzdan nasıl uzaklaştırılıyor? Bu işi hangi yapılar yapıyor?', key: 'Soru sor' },
    // S2 — Kavram haritası
    { id: 'map', pad: 0.5, min: 8, text: 'Önce bir kavram haritası çizelim. Boşaltım sistemi, kandaki atıkları süzer ve idrarla dışarı atar.', key: 'Kavram haritası' },
    { id: 'parts', pad: 0.5, min: 8, text: 'Sistemin yapıları: böbrekler, üreter, idrar kesesi ve üretra. Deri, akciğerler ve kalın bağırsak da atık uzaklaştırır.' },
    // S3 — Model üzerinde yapılar
    { id: 'kidney', pad: 0.5, min: 8, text: 'Böbrekler, belimizin iki yanında, fasulyeye benzeyen iki organdır. Kanı süzer, atıkları ve fazla suyu ayırır.', key: 'Böbrekler' },
    { id: 'balance', pad: 0.5, text: 'Böbrekler vücudun su ve tuz dengesini de korur. Süzülen kan temizlenerek dolaşıma döner.', key: 'Su ve tuz dengesi' },
    { id: 'ureter', pad: 0.5, text: 'Böbreklerde oluşan idrar, üreter denen iki ince borudan idrar kesesine iner.', key: 'Üreter (idrar borusu)' },
    { id: 'bladder', pad: 0.5, text: 'İdrar kesesi idrarı biriktirir. Dolmaya başlayınca idrara çıkma isteği duyarız.', key: 'İdrar kesesi (mesane)' },
    { id: 'urethra', pad: 0.5, text: 'Üretra, idrarı idrar kesesinden vücudun dışına taşıyan kanaldır.', key: 'Üretra (idrar kanalı)' },
    { id: 'path', pad: 0.9, min: 7, text: 'İdrarın yolu şöyle: böbrek, üreter, idrar kesesi ve üretra.', key: 'İdrarın yolu' },
    // S4 — Atık uzaklaştıran diğer organlar
    { id: 'liver', pad: 0.5, min: 8, text: 'Karaciğer, zararlı bazı maddeleri daha az zararlı hâle getirir. Örneğin amonyağı üreye çevirir; üre idrarla atılır.', key: 'Karaciğer' },
    { id: 'skin', pad: 0.5, text: 'Deri, ter bezleriyle su, tuz ve bir miktar üreyi ter olarak atar.', key: 'Deri' },
    { id: 'lung', pad: 0.5, text: 'Akciğerler, karbondioksit ve su buharını soluk verirken dışarı atar.', key: 'Akciğerler' },
    { id: 'colon', pad: 0.8, text: 'Kalın bağırsak ise sindirilemeyen artıkları dışkı olarak uzaklaştırır.', key: 'Kalın bağırsak' },
    { id: 'record', pad: 0.8, min: 9, text: 'Yapıları ve özelliklerini gözlem defterime kaydettim.', key: 'Kaydet' },
    // S5 — Sağlık: bilgi toplama (FB.7.3.9)
    { id: 'health', pad: 0.5, text: 'Boşaltım sistemimi nasıl korurum? Önce bilgiye ulaşacağım güvenilir araçları belirleyeyim.', key: 'Bilgi toplama araçları' },
    { id: 'tools', pad: 0.8, min: 8.5, text: 'Güvenilir internet siteleri, basılı kaynaklar, bir uzmanla görüşme... Bulduklarımı öğretmenim ve arkadaşlarımla tartışıp doğrularım.', key: 'Doğrula' },
    { id: 'water', pad: 0.5, text: 'Bulgu bir: Yeterli su içmeliyim. Su, atıkların idrarla uzaklaştırılmasına yardım eder.', key: 'Yeterli su' },
    { id: 'food', pad: 0.5, text: 'Bulgu iki: Dengeli beslenmeliyim. Aşırı tuzlu ve hazır yiyecekler böbrekleri yorar.', key: 'Dengeli beslenme' },
    { id: 'hygiene', pad: 0.5, text: 'Bulgu üç: İdrarımı uzun süre tutmamalı, tuvalet temizliğine ve el hijyenine dikkat etmeliyim.', key: 'Temizlik' },
    { id: 'active', pad: 0.8, min: 8, text: 'Bulgu dört: Spor ve sosyal etkinlikler sağlığımızı destekler. Ekran başında saatlerce hareketsiz kalmak ise zararlıdır.', key: 'Hareket et' },
    // S6 — Kaydet · Sıra sende · Sıradaki · Bitiş
    { id: 'record2', pad: 0.8, min: 7, text: 'Doğruladığım bilgileri kaydettim. Yanlış alışkanlıklarımı doğrularıyla değiştireceğim!', key: 'Kaydet' },
    { id: 'task', pad: 0.8, min: 8.5, text: 'Sıra sende! Atık malzemelerle boşaltım sistemini tanıtan bir model ya da sağlık posteri hazırla.', key: 'Sıra sende' },
    { id: 'next', pad: 1.0, min: 6, text: 'Sıradaki gözlemim: Işık, bir ortamdan başka bir ortama geçerken ne olur? Işığın kırılması!' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
