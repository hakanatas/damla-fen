# 13 · Işığın Yolculuğu — FB.5.4.1

**Çıktı:** Bir kaynaktan çıkan ışığın her yönde doğrusal bir yol izlediğini bilimsel olarak gözlemleyebilme
**Süre:** ≈ 209,8 sn (sessiz sürüm, `timing.js`)

## Sahne planı
| # | Sahne (beat'ler) | Öğrettiği | TYMM eşleştirmesi |
|---|---|---|---|
| 1 | Karanlık oda (title–beam) | Damla ışığı kapatır; anahtar deliğinden süzülen hüzme toz tanecikleriyle görünür, cetvel çizgisiyle dümdüz olduğu gösterilir | Köprü kurma: anahtar deliğinden karanlık odaya süzülen ışık hüzmesi |
| 2 | Işık kaynakları (sources–safety) | Doğal (Güneş, yıldızlar) / yapay (ampul, el feneri, mum) kaynaklar; araştırma sorusu (eğri mi, düz mü, tek yöne mi, her yöne mi?); göz güvenliği kartı | Ön değerlendirme: ışık kaynağı çeşitleri; KB2.7 soru sorma; güvenlik |
| 3 | Rulo deneyi (tube–data) | Düz rulodan lamba görülür, bükülmüş rulodan görülmez; kesit çiziminde ışın kıvrımda duvara çarpar; veri tablosu doldurulur | "Doğrusal ve doğrusal olmayan A4 kâğıdı rulo" etkinliği; b) verileri kaydeder |
| 4 | Karanlık kutu (ibn–because) | İbnülheysem (≈965–1040), Kitâbü'l-Menâzır; delikli karanlık kutuda mumun görüntüsü ters; alevin tepesi/altından gelen iki ışın delikte kesişir | "İbnülheysem'in karanlık oda (kutu) deneyi"; gösteri deneyi, ışınları çizme; c) açıklar |
| 5 | Her yöne (alldirs–cloud) | Lambanın çevresindeki 8 kartın hepsi aydınlanır; kartlar arasından geçen ışınlar sürer; el feneri (ayna ile öne yönlendirme) ve bulut aralığından süzülen güneş ışığı | El feneri, araba farı, bulutlu günde güneş ışığı örnekleri; a) nitelikleri tanımlar |
| 6 | Işık ışını (ray–wrong) | Işın = ok uçlu düz çizgi; matematikteki [AB ışını ile ilişki; doğru/yanlış çizim kartları (eğri ✗, dalgalı ✗, ok ucu ters ✗) | "Çizimlerinde ışığı bir doğru şeklinde çizmeleri"; matematik ile ilişkilendirme; görsel tamamlama |
| 7 | Kaydet + Sıra sende (record–end) | Gözlem defteri (5 madde + ışın çizimi), genelleme; "Sıra sende": rulo ile arkadaşını gözlemle, ışınları çiz; sonraki film: 14 · Işık Geçer mi? | b) verileri kaydeder; c) genelleme; grup etkinliği özendirme |

## Bilimsel doğruluk
| Konu | Film ne gösteriyor | Kontrol |
|---|---|---|
| Işığın doğrusal yayılması | Bütün ışınlar düz çizgi (`F13.ray` → `INK.line`, bend 0) | ✔ |
| Bükük rulo | Geometrik olarak hesaplanır: rulo kesiti kıvrılır, ağız lambaya bakacak şekilde döndürülür; ışın rulo ekseni boyunca düz gider ve ilk duvar kesişimine kadar çizilir (`firstHit`, hesaplanır) | ✔ |
| Karanlık kutu | Delik (760,560), arka yüz 500 px, mum 500 px uzakta → büyütme 1, y' = 1120 − y (hesaplı); tepe (400) → 720, alevin altı (510) → 610; ekran görünüşünde mum ters (−1,−1 ölçek) | ✔ |
| Her yöne | Kartlara giden ışınlar kartta durur, aradakiler devam eder; "yukarıya ve aşağıya da" notu (tepeden görünüş 2B'dir) | ✔ |
| El feneri | Ayna ışığı öne yönlendirir; her ışın yine düz | ✔ |
| Bulut aralığı | Güneş bulutun arkasında gizli (doğrudan bakılmaz); hüzmeler gizli kaynaktan aralıktan geçen düz çizgiler | ✔ |
| İbnülheysem | yaklaşık 965–1040, "optik biliminin mimarı sayılır" (TYMM ifadesi), Kitâbü'l-Menâzır | ✔ |
| Işın gösterimi | Ok ucu kaynaktan dışarı; matematikte [AB ışını: A başlangıç noktası | ✔ |
| Güvenlik | Güneş, lazer, güçlü fener: doğrudan bakılmaz (kırmızı kart); gözlem için yalnızca küçük gece lambası | ✔ |
| Renk kodu | Işık kehribar (#C07F1E); kırmızı yalnız güvenlik ve yanlış çizimler | ✔ |

## Notlar
- `props.js` (window.F13): glow, dark, ray (ok uçlu düz ışın), burst, bulb, nightLamp, candle, flashlight, card, star, hit/firstHit (ışın–kesit kesişimi).
- Konsolda yalnızca `audio/mix.m4a` bulunamadı uyarısı var (sessiz sürüm; ses dosyası export aşamasında üretilir).
