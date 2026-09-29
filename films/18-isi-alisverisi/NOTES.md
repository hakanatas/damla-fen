# 18 · Karışınca Ne Olur? Isı Alışverişi — FB.5.5.3

**Çıktı:** Sıcaklığı farklı olan sıvıların karıştırılması sonucu ısı alışverişi olduğuna yönelik bilimsel çıkarım yapabilme
**Süre:** ≈ 184 sn (sessiz, altyazılı) · 10 sahne · 24 beat

## Sahne planı
| # | Sahne | Beat'ler | Öğrettiği |
|---|---|---|---|
| 1 | Merak | title, hello, q | Soğuk ve sıcak su → karışım ? °C |
| 2 | Tahmin (TGA-T) | predict, guesses | Tahmin–Gözlem–Açıklama şeridi; üç olası tahmin (80 °C? · 20 °C'den soğuk? · arada?) + "Tahminim: ..... °C" |
| 3 | Deney tasarımı | design, vars, safety | Araç seçimi (2 termometre, özdeş kaplar, büyük kap, karıştırıcı, çalışma yaprağı) · aynı tür sıvı (su+su ✓, su+yağ ✗) ve eşit miktar · kırmızı güvenlik kartı |
| 4 | Gözlem (TGA-G) | before, rec1, mix, wait, after | Önce ölç (20 °C, 60 °C) → çalışma yaprağına yaz → dök ve karıştır → sabırla bekle → 39 °C; sayı doğrusunda "neredeyse tam ortası" |
| 5 | Açıklama (TGA-A) | explain, flow, equil, ideal | Karışımda tanecik modeli (sıcak sudan gelen hızlı / soğuk sudan gelen yavaş tanecikler) + sıcaklık–zaman grafiği: sıcak su ısı verir ↓, soğuk su ısı alır ↑ → termal denge (40 °C) · hesap 40 °C, ölçüm 39 °C (bir miktar ısı kaba ve havaya geçer) |
| 6 | Eşit sıcaklık | equal | 30 °C + 30 °C → 30 °C: ısı alışverişi yok |
| 7 | Günlük yaşam | daily, nature | Katı (çorbadaki kaşık), sıvı (buzlu içecek), gaz (kalorifer–oda havası) örnekleri · genelleme: doğada maddeler arasında hep ısı alışverişi vardır |
| 8–10 | Rapor / Sıra sende / Sıradaki | record, task, next, end | Deney raporu (soru, tahmin, ölçüm, açıklama, not) · görev: farklı miktarlarla (yetişkinle) ya da sanal laboratuvarda tekrarla · sonraki: Isı etkisiyle hâl değişimi (Damla buzdan suya) |

## Maarif (TYMM) uyumu
| Program ögesi | Filmde |
|---|---|
| a) Isı alışverişinin niteliklerini tanımlar | Sahne 5 (sıcaktan soğuğa akış, verir/alır, termal denge) |
| b) Karıştırmadan önceki ve sonraki sıcaklık verilerini toplar ve kaydeder | Sahne 4 (termometreyle ölçüm + çalışma yaprağı), sahne 8 rapor |
| c) Isı alışverişi olduğunu yorumlayarak değerlendirir | Sahne 5 grafik + model, sahne 6 |
| TGA tekniğiyle tahmin | Sahne 2 (T), 4 (G), 5 (A) — ekranda T·G·A şeridi |
| Ölçme aracı belirleme ve deney tasarlama | Sahne 3 |
| Termometreyle ölçüp çalışma yaprağına kaydetme (OB7, KB2.2) | Sahne 4 |
| Yüksek sıcaklıktan düşüğe ısı akışı (E3.10) | Sahne 5 |
| Deneylerde aynı tür sıvı | Sahne 3 (su+su ✓, su+yağ ✗) ve rapor notu |
| Sıcaklıkları eşit maddeler arasında ısı alışverişi olmadığı | Sahne 6 |
| Raporlaştırma, sabır (D12.3) | "Sabır" anahtar kavramı, bekleme + saat; sahne 8 rapor |
| Günlük yaşamdan katı, sıvı, gaz örnekleri | Sahne 7 |
| Sanal laboratuvar (OB2) | "Sıra sende" görevi |
| Genelleme: doğada ısı alışverişi (termal denge) | Sahne 7 son kart; "termal denge" anahtar kavramı |

## Bilimsel doğruluk kontrolü
| İfade / görsel | Kontrol |
|---|---|
| Eşit kütlede 20 °C ve 60 °C su → ideal 40 °C | Doğru (aynı tür sıvı, eşit miktar: aritmetik ortalama). |
| Ölçülen 39 °C | Gerçekçi; kaba ve havaya ısı kaybı ekranda açıklandı. |
| Grafik: sıcak 60→40, soğuk 20→40 üstel yaklaşım | Nitel olarak doğru (denge sıcaklığına asimptotik yaklaşım). |
| Tanecik modeli: sıcak sudan gelen tanecikler hızlı, soğuk sudan gelenler yavaş; dengede aynı ortalama hız | 5. sınıf düzeyinde doğru; "(model; çizim ölçekli değildir)" notu. |
| Buzlu içecek: içecek ısı verir, buz ısı alır | Doğru yön. |
| Kalorifer odanın havasını ısıtır | Doğru (ısı kaloriferden havaya). |
| Güvenlik | Sıcak suyu yetişkin hazırlar, kaynar su kullanılmaz, ısıya dayanıklı kap, cam termometre karıştırıcı olarak kullanılmaz. |

## Teknik notlar
- `props.js` → `window.F18` (F17 yardımcıları + `integ` (hız değişirken pürüzsüz faz), `mixModel`, `graph`, `sheet`, `radiator`, `bowl`, `linePts`).
- Lib geçici çözümü: `INK.dashed` seyrek noktalı çizgilerde kesik üretmiyor → `F18.linePts` / `F18.rectPts` ile noktalar yoğunlaştırıldı.
