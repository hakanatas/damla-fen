# 23 · Şemadan Devreye: Deney Zamanı — FB.5.6.2

**Öğrenme çıktısı:** FB.5.6.2 Şemasını çizdiği elektrik devresine uygun deney yapabilme
**Süre:** ≈ 187 sn (sessiz sürüm, timing.js `total`) · 11 sahne · 23 beat

## Sahne planı
| # | Sahne (beat'ler) | Ne öğretiyor |
|---|---|---|
| 1 | Giriş (title–question) | Plan: şema çiz → düzenek kur → gözle, kaydet → raporla. Deney sorusu: "Anahtar açıkken ve kapalıyken ampul ışık verir mi?" |
| 2 | Şema (draw) | Öğrenilen sembollerle devre şeması çizilir (pil, anahtar, ampul, kablolar; dik köşeli düz çizgiler). |
| 3 | Grup (group) | Görev dağılımı: malzeme sorumlusu, düzeneği kuran, gözlem yapan, kayıt tutan; görev bilinci, yardımlaşma, sorumluluk. |
| 4 | Güvenlik (safety–adult) | Kırmızı kart: prizle oynama, yalnızca pil, pilin iki ucunu tek kabloyla birleştirme, öğretmen/yetişkin gözetimi. |
| 5 | Malzemeler (materials–holders) | Düzenek tasarımı: şemadaki her sembol için bir eleman seçilir (kesik çizgilerle eşleşir); pil yatağı ve duy şemada çizilmez ama gereklidir. |
| 6 | Kurulum (build–works) | Adım adım kurulum; anahtar kapanınca ışık yok → düzenek şemayla karşılaştırılır (kontrol listesi) → duya takılmamış kablo bulunur → düzeltilir → ampul ışık verir: "düzenek şemaya uygun". |
| 7 | Ölçüm (measure–table) | 3 deneme: her denemede anahtar açık / kapalı durumunda ampul gözlenir, veri tablosuna "ışık yok / ışık var" yazılır (tekrar = güvenilirlik). |
| 8 | Analiz (analyze–result) | Sütun vurgusu + sayım grafiği (kapalı: 3, açık: 0) → Sonuç: ışık için devre tamamlanmalı. |
| 9 | Temizlik (clean) | Malzemeler kutuya toplanır, masa silinir (D18.2). |
| 10 | Rapor (report) | Deney raporu: soru, şema, malzemeler, adımlar, veriler, sonuç (SDB2.1; Türkçe dersiyle ilişki). |
| 11 | Sıra sende + sıradaki (yourturn–end) | Görev: grupla şema çiz, düzeneği kur, verileri tabloya yaz ve raporla (yalnızca pil, yetişkin gözetimi). Sonraki film tanıtımı: 1 pil / 2 pil ampul parlaklığı sorusu → 24 · Ampulün Parlaklığı: Hipotez Kuralım. Bitiş kartı. |

## Maarif (TYMM) uyum tablosu
| Program ögesi | Filmde karşılığı |
|---|---|
| Sembolleri kullanarak devre şeması çizme | S2 şema çizimi |
| a) Çizdiği devreye uygun deney düzeneği tasarlar | S5 şema ↔ malzeme eşleştirme; S6 kurulum ve şemayla karşılaştırma, sorun giderme |
| b) Deney ile ilgili ölçme ve veri analizi yapar | S7 üç tekrarlı gözlem ve veri tablosu; S8 sayım grafiği ve çıkarım |
| Gruplar, görev bilinci, yardımlaşma (D16.3, D20.1, SDB2.2) | S3 görev kartları |
| Planları ertelemeden, sorumlulukla yürütme (E2.2, D3.3) | S1 plan kartı, S3 "sorumluluk" |
| Ölçüm sonuçlarını tabloya kaydedip analiz (OB7) | S7–S8 |
| Malzemeleri ve alanı temiz tutma (D18.2) | S9 temizlik |
| Deneyi raporlaştırma, geçerli bilgiler (SDB2.1) | S10 rapor sayfası |
| Güvenlik | S4 kırmızı kart + S11 hatırlatma |
| Performans görevini film yapmaz, özendirir | S11 "Sıra sende" |
| Anahtar kavram | "Devre şeması" etiketi |

## Bilimsel doğruluk tablosu
| İçerik | Kontrol |
|---|---|
| Anahtar kapalı → devre tamamlanır → ampul ışık verir; açık → vermez | Doğru |
| Gevşek bağlantı (duya takılmamış kablo) → devre tamamlanmaz → ışık yok | Doğru, yaygın gerçek sorun |
| Pil yatağı ve duy şemada çizilmez | 5. sınıf ders kitabı gösterimiyle uyumlu |
| 3 tekrar: sonuçların güvenilirliği | Bilimsel süreç ilkesi |
| Kısa devre uyarısı | Pilin uçlarının tek kabloyla birleştirilmesi pili ısıtır — sayısal değer verilmedi |
| Akım, direnç, voltaj terimleri kullanılmadı; akım yönü/hareketli nokta gösterilmedi | Program kapsamı: yalnızca ampulün ışık verip vermemesi |
| Sonraki film tanıtımında 2 pil → daha parlak ampul | Fiziksel olarak doğru (pil sayısı artınca parlaklık artar) |

## Teknik notlar
- `props.js` → `window.CK` (22. filmle aynı devre çizim kütüphanesi) + `window.F23.schemaCard` (bu filme özel şema kartı).
- lib/ içinde değişiklik yapılmadı.
