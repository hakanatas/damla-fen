# 17 · Isı ve Sıcaklık Aynı Şey mi? — FB.5.5.2

**Çıktı:** Isı ve sıcaklık kavramlarını karşılaştırabilme
**Süre:** ≈ 202 sn (sessiz, altyazılı) · 10 sahne · 25 beat

## Sahne planı
| # | Sahne | Beat'ler | Öğrettiği |
|---|---|---|---|
| 1 | Merak | title, hello, q | Mutfakta sıcak çay ve soba: "sıcak" / "ısıtıyor" → ısı = sıcaklık? |
| 2 | Kavram karikatürü | cartoon, decide | Ali, Ece, Can'ın üç görüşü; "Sence kim haklı?" → önce kanıt topla (E2.5, OB4) |
| 3 | Isı kaynakları + güvenlik | sources, safety | Güneş: doğal ve en temel ısı kaynağı; ocak, soba: yapay · kırmızı güvenlik kartı (yetişkin eşliği) |
| 4 | Sıcaklık | temp1, tpart, thermo, tools | Soğuk–sıcak ölçeği; sıcak suda tanecikler ortalamada daha hızlı; termometre, °C (Selsiyus); duvar/dijital termometre, ateşölçer, hava durumu raporu |
| 5 | Isı | heat1, spoon, amountq, ice, amount | Isı bir enerji çeşidi, sıcaktan soğuğa aktarılır; sıcak çay → soğuk kaşık; aynı sıcaklıkta (60 °C) bardak ve tencere + aynı buzlar → aktarılan ısı madde miktarına bağlı |
| 6 | Ölçme ve birimler | measure, units | Isı termometreyle doğrudan ölçülmez, kalorimetre kabı yardımıyla hesaplanır · ısı: J / cal · sıcaklık: °C |
| 7 | Karşılaştır | similar, diff | Venn şeması (benzerlikler) + farklılıklar tablosu (tanım, bulunma yolu, birim, madde miktarına bağlılık) |
| 8 | Karar | verdict | Karikatüre dönüş: Can haklı; ısı ≠ sıcaklık |
| 9–10 | Kaydet / Sıra sende / Sıradaki | record, task, next, end | Defter özeti; kendi kavram karikatürünü çiz + Anders Celsius'u araştır (zenginleştirme); sonraki: ısı alışverişi |

## Maarif (TYMM) uyumu
| Program ögesi | Filmde |
|---|---|
| a) Özelliklerini belirler | Sahne 4 (sıcaklık) ve 5–6 (ısı) |
| b) Benzerlikleri listeler | Sahne 7 Venn (ortak alan) |
| c) Farklılıkları listeler | Sahne 7 tablo |
| Günlük yaşamdan örnek olay, açık uçlu soru | Sahne 1 |
| Kavram karikatürüyle tartışma | Sahne 2 ve 8 |
| Isı doğrudan ölçülmez, kalorimetre kabıyla hesaplanır; sıcaklık termometreyle ölçülür | Sahne 6, sahne 4 |
| Isı birimi joule (J) veya kalori (cal); sıcaklık birimi °C | Sahne 6 kartları, sahne 4 kartı ("Selsiyus" okunuşuyla) |
| Isının bir enerji çeşidi olduğu | Sahne 5 |
| Kendi kararlarını alma (D11.2, E1.5) | "Sence kim haklı? Önce kanıt topla" → sahne 8'de karar |
| Köprü: Güneş en temel ısı kaynağı, doğal/yapay kaynaklar | Sahne 3 |
| Köprü: duvar, dijital termometre, ateşölçer; hava durumu | Sahne 4 son bölüm |
| Zenginleştirme: Termometrenin tarihi, Anders Celsius | "Sıra sende" görevi |
| Sınırlama: ısı doğrudan ölçülmez | Kırmızı ✗ + kalorimetre kabı |

## Bilimsel doğruluk kontrolü
| İfade / görsel | Kontrol |
|---|---|
| "Isı ... sıcaklığı yüksek olandan düşük olana aktarılır" | Doğru; ısı aktarılan enerji olarak tanımlandı ("maddenin içindeki ısı" ifadesi kullanılmadı). |
| "Sıcaklık tanecik hareketiyle ilgilidir; sıcak suda tanecikler ortalamada daha hızlı" | 5. sınıf düzeyinde doğru (ortalama kinetik enerji); "ortalamada" notu ekranda. |
| Bardak ve tencere 60 °C; aynı sayıda buz → tencere hepsini, bardak birkaçını eritir; bardağın sıcaklığı çok, tenceresinki az düşer | Nicel olarak tutarlı (≈150 g su 60 °C'den 0 °C'ye soğurken ≈ 27 g buz eritebilir; birkaç litre su yüzlerce gram). Buzdan sonra sıcaklık sayısı gösterilmedi. |
| "Madde ısı alınca sıcaklığı genellikle artar" | "Genellikle": hâl değişimi sırasında sıcaklık sabit kalır (FB.5.5.4'e bırakıldı). |
| Kalorimetre kabı: yalıtımlı iç içe kap, kapak, termometre, karıştırıcı | Basit kalorimetre düzeneği. Hesaplama formülü verilmedi (program düzeyi). |
| Termometre okumaları 10 °C / 70 °C, hava durumu 24 °C | Örnek değerler, gerçekçi. |
| Güvenlik | Sıcak kaba çıplak elle dokunma, ocak/soba tek başına kullanılmaz, yetişkin eşliği. |

## Teknik notlar
- `props.js` → `window.F17` (F16 tanecik yardımcıları + `heatArrow`, `kid`, `speech`, `flame`, `stove`, `cooktop`, `iceCube`, `pot`, `spoon`, `calorimeter`, `digiThermo`, `feverThermo`, `weather`, `desk`).
- Lib geçici çözümü: `INK.dashed` seyrek noktalarda kesik üretmediği için `F17.rectPts` ile yoğunlaştırıldı.
