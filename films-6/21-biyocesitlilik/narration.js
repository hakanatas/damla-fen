// narration.js — 6. sınıf Film 21: "Canlıların Zenginliği: Biyoçeşitlilik"  (Maarif FB.6.7.1 · FB.6.7.2)
// Tek düzenlenebilir metin kaynağı. Sessiz sürüm: text altyazı olarak görünür.
const NARRATION = {
  film: '21-biyocesitlilik',
  title: 'Canlıların Zenginliği: Biyoçeşitlilik',
  outcome: 'FB.6.7.1 · FB.6.7.2',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Gölet kenarı
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'look', pad: 0.8, min: 7.5, text: 'Merhaba! Gölet kenarındayım. Çiçekler, arılar, kurbağalar, kuşlar... Burada ne çok canlı var!', key: 'Doğal yaşam' },
    // SAHNE 2 — Kavramlar
    { id: 'habitat', pad: 0.6, text: 'Bir canlının yaşadığı, beslendiği ve barındığı doğal ortama habitat denir.', key: 'Habitat' },
    { id: 'ecosystem', pad: 0.6, text: 'Canlılar ve su, toprak, ışık gibi cansız ögeler birlikte bir ekosistem oluşturur.', key: 'Ekosistem' },
    { id: 'biodiv', pad: 0.8, min: 6, text: 'Bir bölgedeki canlı türlerinin çeşitliliğine biyoçeşitlilik denir.', key: 'Biyoçeşitlilik' },
    // SAHNE 3 — Gruplandırma
    { id: 'group', pad: 0.4, min: 7.5, text: 'Gördüklerimi kartlara yazdım. Şimdi benzer canlıları gruplandırayım.', key: 'Gruplandır' },
    { id: 'criteria', pad: 0.8, text: 'Ölçütüm canlı grupları oldu. Sen yaşadıkları ortama göre de gruplayabilirsin.', key: 'Ölçüt' },
    // SAHNE 4 — Sorgula
    { id: 'questions', pad: 0.6, min: 9, text: 'Bu çeşitlilik neden önemli? Bir tür yok olursa ne olur? Kitaplardan ve belgesellerden bilgi topladım.', key: 'Soru sor · Bilgi topla' },
    { id: 'check', pad: 0.8, min: 8, text: 'Ama her bilgi doğru değildir. Kaynağı belli ve kanıta dayalı olanı seçiyorum.', key: 'Doğruluğu değerlendir' },
    // SAHNE 5 — Önemi
    { id: 'web', pad: 0.4, min: 8, text: 'Canlılar birbirine bağlıdır. Arılar çiçekleri tozlaştırır, kurbağa böcek yer, balıkçıl da kurbağa.', key: 'Birbirine bağlı' },
    { id: 'chain', pad: 0.4, min: 7, text: 'Kurbağalar yok olursa böcekler çoğalır, balıkçıllar besinsiz kalır. Bir tür diğerlerini etkiler.' },
    { id: 'gifts', pad: 0.6, text: 'Biyoçeşitlilik bize besin, oksijen, temiz su, verimli toprak ve ilaç ham maddesi sağlar.' },
    { id: 'inference', pad: 0.8, text: 'Çıkarımım: Çeşitlilik zenginse ekosistem daha dengeli ve değişimlere karşı daha dayanıklıdır.', key: 'Çıkarım' },
    // SAHNE 6 — Türkiye
    { id: 'endemic', pad: 0.6, min: 8, text: 'Yalnızca belli bir bölgede doğal olarak yaşayan türlere endemik tür denir. Ülkemizde binlercesi var.', key: 'Endemik tür' },
    { id: 'kanuni', pad: 0.8, text: '1539’da Kanuni Sultan Süleyman, Edirne’de çevreyi korumaya yönelik bir kanun yayımladı.', key: '1539 · Edirne' },
    // SAHNE 7 — Tehditler
    { id: 'threat-q', pad: 0.4, min: 6.5, text: 'Biyoçeşitliliği neler tehdit ediyor? Önce bildiklerime dayanarak bir önerme yazdım.', key: 'Önerme' },
    { id: 'threats', pad: 0.8, min: 10, text: 'Sonra araştırdım. Kaynaklar pek çok tehdide dikkat çekiyor. Çoğunun kaynağı insan faaliyetleri.', key: 'Tehditler' },
    { id: 'extinct', pad: 0.8, text: 'Anadolu’da da yaşamış Hazar kaplanının nesli tükendi. Kelaynak ve Akdeniz foku ise tehlike altında.', key: 'Nesli tükenen canlılar' },
    // SAHNE 8 — Önermeleri karşılaştır
    { id: 'claims', pad: 0.4, min: 8, text: 'Arkadaşlarımın önermelerini topladım. Hangileri veriye dayalı, hangileri değil?', key: 'Karşılaştır' },
    { id: 'compare', pad: 0.8, text: 'Veriye dayalı önermenin kaynağı ve kanıtı vardır. Ben de önermemi böyle güçlendirdim.' },
    // SAHNE 9 — Tahmin
    { id: 'predict', pad: 0.4, min: 9, text: 'Tahminim: Mera sürülüp tarla yapılırsa bitki çeşitleri azalır; arılar ve kuşlar da azalır.', key: 'Tahmin' },
    { id: 'valid', pad: 0.8, text: 'Tahminim geçerli mi? Yeni veriler, arkadaşlarımın bulguları ve öğretmenimle kontrol ediyorum.', key: 'Geçerliği sorgula' },
    // SAHNE 10 — Sorumluluk
    { id: 'duty', pad: 0.8, min: 8, text: 'Hepimiz sorumluyuz. 22 Mayıs Dünya Biyolojik Çeşitlilik Günü de bize bunu hatırlatır.', key: 'Sorumluluk' },
    // SAHNE 11 — Kaydet
    { id: 'record', pad: 0.6, min: 9, text: 'Bulduklarımı gözlem defterime kaydediyorum.', key: 'Kaydet' },
    // SAHNE 12 — Sıra sende + sıradaki
    { id: 'task', pad: 0.8, min: 8, text: 'Sıra sende! Çevrendeki canlıları araştır, onları korumak için bir poster hazırla.', key: 'Sıra sende' },
    { id: 'next', pad: 1.0, text: 'Sıradaki gözlemim: Isınma yakıtları çevreyi ve sağlığımızı nasıl etkiliyor?' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
