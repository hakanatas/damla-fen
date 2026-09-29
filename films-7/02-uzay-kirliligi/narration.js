// narration.js — 7. sınıf Film 2: "Uzay Kirliliği"  (Maarif FB.7.1.3)
// Sessiz film: text → altyazı. Süreler: python3 tools/tts.py films-7/02-uzay-kirliligi --silent --wps=2.0
const NARRATION = {
  film: '02-uzay-kirliligi',
  title: 'Uzay Kirliliği',
  outcome: 'FB.7.1.3',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.6, min: 9, text: 'Merhaba, ben Damla! Görevi biten uydular, roket parçaları ve sondalar ne olur? Uzayda kaybolup gider mi?', key: 'Soru sor' },
    { id: 'group', pad: 0.8, text: 'Bu soruyu arkadaşlarımla birlikte araştırıyoruz. Herkesin fikrini açık fikirlilikle ve saygıyla dinliyoruz.', key: 'İş birliği' },
    // SAHNE 2 — Problemleri yapılandır
    { id: 'debris', pad: 0.6, text: 'Görevini tamamlamış uydular, roket parçaları ve kopan parçalar Dünya’nın çevresinde dolanmaya devam eder.', key: 'Uzay çöpü' },
    { id: 'p1', pad: 0.6, text: 'Birinci problem: Bu parçalar çok hızlı hareket eder. Küçük bir parça bile çalışan bir uyduya zarar verebilir.', key: 'Çarpışma riski' },
    { id: 'p2', pad: 0.6, text: 'Bir çarpışma yeni parçalar üretir. Bu parçalar başka çarpışmalara yol açabilir: zincirleme bir tehlike!' },
    { id: 'p3', pad: 0.6, text: 'İkinci problem: Atmosfere giren parçaların çoğu yanıp yok olur. Ama büyük parçalar nadiren yeryüzüne düşebilir.', key: 'Düşen parçalar' },
    { id: 'p4', pad: 0.6, text: 'Üçüncü problem: Çok sayıda uydu, gökyüzü fotoğraflarında ışık izleri bırakıp gözlemleri zorlaştırabilir.', key: 'Gözlemlere etkisi' },
    { id: 'map', pad: 1.0, min: 8, text: 'Problemleri bir kavram haritasında yapılandırdım: nedenler, problemler ve sonuçlar.', key: 'Yapılandır' },
    // SAHNE 3 — Özetle, veri, tahmin
    { id: 'summary', pad: 0.8, text: 'Kendi cümlemle özetliyorum: Uzaydaki araç ve parça sayısı arttıkça çarpışma ve gözlem sorunları da artar.', key: 'Özetle' },
    { id: 'data', pad: 0.6, min: 7, text: 'Güvenilir kaynaklardaki verilere bakıyorum: Yörüngedeki nesne sayısı yıllar geçtikçe artıyor.', key: 'Veri' },
    { id: 'predict', pad: 1.0, min: 6.5, text: 'Tahminim: Önlem alınmazsa bu artış sürer, çarpışma riski de yükselir.', key: 'Veriye dayalı tahmin' },
    // SAHNE 4 — Çözüm önerileri ve akıl yürütme
    { id: 'solutions', pad: 0.6, min: 10, text: 'Çözüm önerileri: Görevi biten uyduyu atmosfere indirip yakmak, parçaları ağ ya da robot kolla toplamak.', key: 'Çözüm önerileri' },
    { id: 'design', pad: 0.6, text: 'Bir de yeni uyduları, görev sonunda yörüngeden çıkacak biçimde baştan tasarlamak.' },
    { id: 'reason', pad: 0.6, min: 8, text: 'Akıl yürütüyorum: Eğer her yeni uydu görev sonunda yörüngeden çıkarsa, yeni çöp birikmez.', key: 'Akıl yürüt' },
    { id: 'reason2', pad: 1.0, text: 'Ama eski çöpler yerinde kalır. O hâlde önlemek ve temizlemek birlikte gerekir.' },
    // SAHNE 5 — Değerlendir (altı ayakkabı)
    { id: 'shoes', pad: 0.6, min: 10, text: 'Çözümleri altı ayakkabı tekniğiyle tartışıyoruz. Her ayakkabı, probleme farklı bir açıdan bakmamızı sağlar.', key: 'Altı ayakkabı' },
    { id: 'evaluate', pad: 1.0, min: 10, text: 'Değerlendirmemiz: Temizlik zor ve pahalı, önlemek daha kolay. Ülkelerin birlikte kurallar koyması da gerekir.', key: 'Değerlendir' },
    // SAHNE 6 — Kaydet
    { id: 'record', pad: 0.6, min: 10, text: 'Bulduklarımızı rapor gibi gözlem defterime kaydediyorum.', key: 'Kaydet' },
    // SAHNE 7 — Sıra sende + sonraki
    { id: 'task', pad: 0.8, min: 9, text: 'Sıra sende! Grubunla bir uzay problemi seç. Veri topla, tahmin yap, çözüm öner ve raporunu hazırla.', key: 'Sıra sende' },
    { id: 'next', pad: 1.0, text: 'Sıradaki gözlemim: Yıldızlar nasıl doğar, nasıl yaşar? Yıldızlar, galaksiler ve evren!' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
