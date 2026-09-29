# Film 6 · Kendi Dinamometremi Tasarlıyorum — FB.5.2.2

**Çıktı:** FB.5.2.2 Basit araç gereçle bilimsel bir dinamometre modeli oluşturabilme · Ünite 2 · süre ≈ 190 sn (sessiz, altyazılı)

Film öğrencinin performans görevini **yapmaz**; Damla örnek bir mühendislik-tasarım sürecini gösterir, sonda "Sıra sende" kartı görevi verir.

## Sahne planı
| # | Sahne (dosya) | Beat'ler | Öğrettiği |
|---|---|---|---|
| 1 | Problem (`s1-problem.js`) | title, hello, problem, criteria | Sınırlılıkları belirli problem: basit malzeme, 0–5 N; ölçütler (okunur ölçek, tekrarlanabilirlik, güvenli malzeme) |
| 2 | Tasarım döngüsü (`s2-dongu.js`) | cycle | 7 adım: Problemi belirle → Fikir üret → Planla → Üret → Test et → Geliştir → Paylaş; "yeni kanıt → modeli yenile" dönüşü |
| 3 | Fikir ve malzeme (`s3-fikir.js`) | ideas, materials, safety | Esnek malzeme arayışı; lastik bant, karton, bardak, ataş, cetvel, makas; lastik esner; kırmızı güvenlik kartı (makas, yetişkin eşliği) |
| 4 | Model öner (`s4-model.js`) | plan, calib | Model 1 plan çizimi ve parça etiketleri; gerçek dinamometreyle ölçülen yüklerle 0 (dara) … 5 N çizgilerinin işaretlenmesi |
| 5 | Test (`s5-test.js`) | test, evidence, why | A = 2 N ✓, B = 4 N ✓; yeni kanıt: boşken 0,5 N, A tekrar 2,5 N ✗ → lastik tam geri dönmedi; ölçüt 2 sağlanmadı |
| 6 | Karşılaştır ve yenile (`s6-yenile.js`) | compare, revise, retest | Arkadaş modelleriyle karşılaştırma (kalem yayı hep sıfıra döner); Model 2: yay + yeniden ölçekleme; tekrar test ✓ |
| 7 | Kanıt ve paylaşım (`s7-kanit.js`) | table, thick, share | Gerçek / Model 1 / Model 2 tablosu; "hata → gelişme fırsatı"; büyük kuvvet → kalın yay; sınıf sergisi ve öneri notları |
| 8 | Sıra sende + Sıradaki (`s8-son.js`) | task, next, end | 6 adımlı görev + döngü + güvenlik notu; Film 7 (terazi ve dinamometre) tanıtımı; bitiş kartı |

Sağ üstteki küçük döngü rozeti her sahnede hangi tasarım adımında olunduğunu gösterir.

## Maarif (TYMM) uyumu
| TYMM ögesi | Filmde |
|---|---|
| a) Basit araç gereçle dinamometre modeli önerir | S4 plan çizimi, "Bu benim önerim" |
| b) Modelini yeni kanıtlara göre yeniler | S5 test kanıtı → S6 Model 2, tekrar test |
| Sınırlılıkları belirlenmiş problem durumu | S1 problem kartı + ölçütler |
| Malzemelerin esnekliği ve kalınlığı | S3 esneklik testi; S7 kalın yay notu |
| Mühendislik ve tasarım döngüsü | S2 döngü + tüm filmde rozet |
| Arkadaş modelleriyle karşılaştırma, hataları gelişim fırsatı (SDB1.3, D16.3) | S6 model galerisi; S7 "hata → gelişme fırsatı" |
| İş birliği, paylaşım (SDB2.1, SDB2.2, E1.2) | S7 sınıf sergisi; görev "grubunla" |
| Performans görevini film yapmaz, özendirir | S8 "Sıra sende!" |
| Güvenlik | S3 kırmızı kart; S8 hatırlatma |

## Bilimsel doğruluk kontrolü
| İfade | Not |
|---|---|
| Lastik bant çok gerilince tam geri dönmeyebilir | Kauçuğun kalıcı uzaması / histerezis; ölçümde sıfır kayması |
| Ölçekleme gerçek dinamometreyle ölçülen yüklerle yapılır; 0 = boş bardak | Dara alma; her çizgi ölçümle işaretlenir (doğrusal olduğu varsayılmaz) |
| Metal yay küçük yüklerde kararlı esner | Esneklik sınırı içinde |
| Büyük kuvvet → kalın yay | Film 5 ile tutarlı |
| Ondalık gösterim Türkçe: 0,5 N; 2,5 N | |

## Teknik notlar
- `props.js` → `window.F06`: Film 5'in yardımcıları (dyn, spring, cisimler, tablo) + `band`, `cup`, `block`, `model` (ev yapımı dinamometre, sıfır kayması parametresi `shift`), `cycle`, `badge`.
- lib/ içinde değişiklik yok. Konsoldaki tek hata `audio/mix.m4a` yokluğu (sessiz sürüm).
