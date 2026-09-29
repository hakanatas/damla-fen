# 24 · Ampulün Parlaklığı: Hipotez Kuralım — FB.5.6.3

**Öğrenme çıktısı:** FB.5.6.3 Bir elektrik devresindeki ampul parlaklığını etkileyen değişkenlerin neler olduğuna ilişkin hipotez oluşturabilme
**Süre:** ≈ 178 sn (sessiz sürüm, timing.js `total`) · 8 sahne · 24 beat

## Sahne planı
| # | Sahne (beat'ler) | Ne öğretiyor |
|---|---|---|
| 1 | Merak (title–q) | Köprü: okurken ışık yeterince parlak olmalı. Soru: ampulün parlaklığı nelere bağlı? |
| 2 | Hipotez (vars–hyp2) | Değiştirilebilecekler: pil sayısı, ampul sayısı. Hipotez 1: pil ↑ → parlaklık ↑. Hipotez 2: ampul ↑ → her ampul daha sönük. "(deneyle test edeceğim)" |
| 3 | Değişkenler (indep–ctrl) | Üç kart: bağımsız (değiştirdiğim: pil sayısı ya da ampul sayısı), bağımlı (gözlediğim: ampulün parlaklığı), kontrol edilen (aynı tür piller, ampuller, kablolar, duy/pil yatağı). |
| 4 | Güvenlik (safety) | Kırmızı kart: priz yok, yalnızca pil, yetişkin eşliği, kısa devre yok. |
| 5 | Deney 1 (e1–e1-a) | TGA panosu. Ampul sayısı sabit (1), pil sayısı 1 → 2 → 3; gerçek düzenek + şema + parlaklık çubuğu. Açıklama: neden (pil sayısı arttı) → sonuç (ampul daha parlak). |
| 6 | Deney 2 (e2–e2-a) | Pil sayısı sabit (2), ampul sayısı 1 → 2 → 3; tüm ampuller eşit ve giderek daha sönük. Neden–sonuç açıklaması. |
| 7 | Önermeler (repeat–prop2) | Deneyler tekrarlanır (aynı sonuç), güvenilir kaynaktaki dijital deney düzeneğiyle karşılaştırılır. Önermeler: "Pil sayısı artarsa ampulün parlaklığı artar." / "Ampul sayısı artarsa her ampulün parlaklığı azalır." |
| 8 | Sıra sende + sıradaki (yourturn–end) | Görev: grupla tahmin yaz, pil ya da ampul sayısını değiştir (gerisini aynı tut), gözle–kaydet–açıkla, tekrarla. Sonraki film: 25 · Atıklarımızı Tanıyalım. Bitiş kartı. |

## Maarif (TYMM) uyum tablosu
| Program ögesi | Filmde karşılığı |
|---|---|
| a) Parlaklığı etkileyen değişkenleri tanımlar | S2 "Neyi değiştirebilirim?" → pil sayısı, ampul sayısı |
| b) Pil ve ampul sayısını değiştirerek neden-sonuç ilişkisi | S5–S6 "Neden: … arttı / Sonuç: …" açıklama kartları |
| c) Bağımlı, bağımsız, kontrol edilen değişkenler | S3 üç sütunlu değişken panosu (+ anahtar kavram etiketleri) |
| ç) Bağımsız değişken olarak pil ve ampul sayısını kontrol eder | S5 "sabit: 1 ampul / değişen: pil = n", S6 "sabit: 2 pil / değişen: ampul = n" |
| d) Farklı devreler üzerinden önermeler | S7 önermeler kartları + 3'er devrelik parlaklık şeritleri |
| TGA ile tahmin alma | S5–S6 Tahmin · Gözlem · Açıklama panosu |
| Merak edilen soruları sorma (E3.8) | S1 soru balonu |
| Deneyi tekrarlama (D3.2) | S7 "1. tekrar ✓ 2. tekrar ✓ aynı sonuç" |
| Dijital deney düzeneklerine güvenilir kaynaktan erişme (OB1, OB2, KB2.6) | S7 dijital deney düzeneği (güvenilir kaynak) |
| Grup çalışması (D16.3, SDB2.2) | S8 Sıra sende "Grubunla…" |
| Köprü: uygun aydınlatma | S1 okurken yeterli ışık |
| **Sınırlama:** bağımsız değişkenler yalnızca pil sayısı ve ampul sayısı | Başka bağımsız değişken yok; kablo, pil türü, ampul türü yalnızca kontrol edilen (sabit) değişken olarak anılır |
| Güvenlik | S4 kırmızı kart, S8 hatırlatma |

## Bilimsel doğruluk tablosu
| İçerik | Kontrol |
|---|---|
| Aynı devrede (tek halka) pil sayısı artınca ampul daha parlak | Doğru (piller art arda bağlı; özdeş piller) |
| Pil sayısı sabitken ampul sayısı artınca her ampul daha sönük, hepsi eşit parlaklıkta | Doğru (özdeş ampuller tek halkada) |
| Görsel parlaklık ölçeği nitel (çubuk); sayı/birim verilmedi | Program ölçüm birimi istemiyor |
| 3 pil + 1 ampul | 5. sınıf ders kitaplarındaki 1-2-3 pil deneyiyle uyumlu |
| "Direnç", "voltaj", "akım", "seri/paralel" kullanılmadı | Program kapsamı dışında |
| Hipotez = test edilecek önerme; deney sonrası "önerme" | Program diliyle uyumlu |

## Teknik notlar
- `props.js` → `window.CK` (22. filmle aynı devre çizim kütüphanesi) + `window.F24` (n pil + m ampullü gerçekçi düzenek, küçük şema, parlaklık çubuğu).
- Sonraki film başlığı `films/25-geri-donusum/narration.js` içindeki "Atıklarımızı Tanıyalım" başlığından alındı; o başlık değişirse `scenes/s7-onerme.js` güncellenmeli.
- lib/ içinde değişiklik yapılmadı.
