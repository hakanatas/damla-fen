// narration.js — Film 1: "Gökyüzündeki Komşumuz: Güneş"  (Maarif FB.5.1.1)
// Tek düzenlenebilir metin kaynağı. Her "beat" bir anlatım cümlesidir.
//  id    : sahnelerin zamanlamada kullandığı ad
//  text  : Damla'nın seslendirdiği cümle (TTS + altyazı .srt)
//  min   : sesten bağımsız en kısa süre (sn)  — sessiz anlar için
//  pad   : cümleden sonra bırakılan nefes/boşluk (sn)
//  key   : ekranda el yazısıyla beliren anahtar kavram (kısa)
const NARRATION = {
  film: '01-gunes',
  title: 'Gökyüzündeki Komşumuz: Güneş',
  outcome: 'FB.5.1.1 Güneş\'in yapısı ve dönme hareketi ile ilgili bilgi toplayabilme',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Uyanış
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.8, text: 'Günaydın! Ben Damla. Minicik bir su damlasıyım, ama merakım kocaman.' },
    { id: 'warm', pad: 1.2, text: 'Sabah oldu, Güneş doğuyor. Oh, içim ısındı! Taneciklerim daha hızlı kıpırdıyor.' },
    // SAHNE 2 — Merak
    { id: 'neighbor', pad: 0.6, text: 'Her gün gökyüzünde bu komşumuzu görüyoruz. Ama onu gerçekten tanıyor muyuz?' },
    { id: 'questions', pad: 1.0, min: 9, text: 'Aklımda bir sürü soru var. Güneş neden bu kadar sıcak? Ne kadar büyük? Peki, o da döner mi?', key: 'Soru sor' },
    { id: 'science', pad: 0.8, text: 'Bilim, iyi bir soruyla başlar. Hadi cevapları birlikte arayalım!' },
    // SAHNE 3 — Güvenlik
    { id: 'lens', pad: 0.2, text: 'Önce ona büyüteçle yakından bakayım...' },
    { id: 'stop', pad: 0.6, min: 1.6, text: 'Dur!' },
    { id: 'never', pad: 0.8, text: 'Güneş\'e asla doğrudan bakmamalıyız. Işığı gözlerimize zarar verir.', key: 'Güneş\'e doğrudan bakma!' },
    { id: 'tools-no', pad: 1.4, text: 'Güneş filtresi olmayan dürbün, teleskop ya da büyüteçle de bakmayız. Bu araçlar ışığı toplar, zararı artırır.' },
    // SAHNE 4 — Bilgi toplama araçları
    { id: 'where', pad: 0.5, text: 'Peki bilgiyi nereden toplayabilirim? Önce doğru araçları seçmeliyim.', key: 'Bilgi toplama araçları' },
    { id: 'tools', pad: 0.8, min: 10, text: 'Kütüphanedeki kitaplar... güvenilir dijital kaynaklar... güneş filtreli teleskoplarla çalışan gözlemevleri... ve Güneş\'e yaklaşan uzay araçları!' },
    { id: 'verify', pad: 1.4, text: 'Ama dikkat! İnternetteki her bilgi doğru değildir. Bulduklarımı bilimsel kaynaklarla ve öğretmenimle doğrulamalıyım.', key: 'Doğrula' },
    // SAHNE 5 — Güneş'in yapısı
    { id: 'star', pad: 0.8, text: 'İlk bulgum: Güneş bir yıldızdır! Isıyı ve ışığı kendisi üretir.', key: 'Güneş bir yıldızdır' },
    { id: 'gas', pad: 1.0, text: 'Güneş katı bir top değildir. Çok sıcak gazlardan oluşur; en çok da hidrojen ve helyumdan.', key: 'Sıcak gazlar' },
    { id: 'layers', pad: 0.8, text: 'Tıpkı Dünya gibi, Güneş de katmanlardan oluşur. En sıcak yeri, tam ortasıdır: yaklaşık 15 milyon derece!', key: 'Katmanlar' },
    { id: 'surface', pad: 1.4, text: 'Gördüğümüz parlak yüzeyin sıcaklığı ise yaklaşık 5500 derecedir.' },
    // SAHNE 6 — Büyüklük ve uzaklık
    { id: 'howbig', pad: 0.2, text: 'Peki, Güneş ne kadar büyük? Çapı boyunca Dünyaları yan yana dizelim...' },
    { id: 'count', pad: 0.4, min: 6.5, text: 'Bir, iki, üç... tam yüz dokuz tane!' },
    { id: 'x109', pad: 1.0, text: 'Güneş\'in çapı, Dünya\'nın çapının yaklaşık 109 katıdır.', key: '≈ 109 kat' },
    { id: 'ball', pad: 1.2, text: 'Şöyle düşün: Güneş bir basketbol topu olsaydı, Dünya bir toplu iğne başı kadar olurdu.' },
    { id: 'volume', pad: 1.0, text: 'Güneş o kadar büyüktür ki içine yaklaşık 1 milyon 300 bin Dünya sığar!' },
    { id: 'far', pad: 1.6, text: 'Peki gökyüzünde neden küçük görünür? Çünkü bizden çok uzaktadır: yaklaşık 150 milyon kilometre!', key: '≈ 150 milyon km' },
    // SAHNE 7 — Dönme hareketi
    { id: 'rotate-q', pad: 0.6, text: 'Son sorum: Güneş döner mi? Gözlemevlerinin, güneş filtreli teleskoplarla çektiği fotoğraflara bakalım.' },
    { id: 'spots', pad: 0.8, text: 'Şu koyu noktalar Güneş lekeleridir. Çevrelerinden biraz daha soğuk oldukları için koyu görünürler.', key: 'Güneş lekeleri' },
    { id: 'days', pad: 0.8, min: 7, text: 'Birinci gün... üçüncü gün... beşinci gün... Lekeler hep aynı yöne kayıyor!' },
    { id: 'rotation', pad: 0.8, text: 'Demek ki Güneş, kendi ekseni etrafında dönüyor. Buna dönme hareketi denir.', key: 'Dönme hareketi' },
    { id: 'ccw', pad: 1.6, text: 'Kuzeyden bakınca, saat yönünün tersine döner. Bir turunu yaklaşık 25 günde tamamlar.', key: '≈ 25 gün' },
    // SAHNE 8 — Kaydet
    { id: 'record', pad: 0.6, min: 12, text: 'Şimdi bulduklarımı gözlem defterime kaydedeyim.', key: 'Kaydet' },
    { id: 'method', pad: 1.2, text: 'Soru sordum, araç seçtim, bilgi topladım, doğruladım ve kaydettim. Bilim insanları da böyle çalışır!' },
    { id: 'next', pad: 1.0, text: 'Sıradaki gözlemim: gece gökyüzündeki komşumuz, Ay.' },
    { id: 'research', pad: 0.5, text: 'Sen de araştır: Battani ve Fergani, Güneş hakkında neler keşfetti?' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
