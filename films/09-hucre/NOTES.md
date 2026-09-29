# 09 · Canlıların Yapı Taşı: Hücre — FB.5.3.1

Bitki ve hayvan hücrelerini temel kısımları ve özellikleri açısından karşılaştırabilme. Süre ≈ 210 sn (sessiz sürüm).

## Sahne planı
| # | Sahne | Beat'ler | Ne öğretiyor |
|---|---|---|---|
| 1 | Merak | title–cell | Soru: canlılar neyden yapılmış? Köprü: tuğla → duvar / hücre → canlı. Hücreler gözle görülmez. |
| 2 | Mikroskop | micro–safety | Mikroskobun bölümleri ve işlevleri (göz merceği, objektif, tabla, ışık kaynağı, ayar vidası). Güvenlik kartı: lam/lamel cam, ayna Güneş'e çevrilmez, yetişkin eşliği. |
| 3 | Gözlem | samples–nomicro | Birden fazla örnek (soğan zarı, yanak hücreleri, yaprak); bitki + hayvan hücresi gözlemi; netleştirme; mikroskop yoksa fotoğraf/dijital içerik. |
| 4 | Temel kısımlar | draw–nucleus | Gözleme dayalı çizim; hücre zarı, sitoplazma, çekirdek her iki çizimde korunur; analojiler (kapı, yönetim merkezi). |
| 5 | Organeller | organel–wall | Yalnızca ad + görev: mitokondri (enerji), kloroplast (ışıkla besin), koful (depo), hücre duvarı (koruma, şekil). |
| 6 | Karşılaştır | compare–diff | İki sütunlu tablo; "benzer" (zar, sitoplazma, çekirdek, mitokondri) ve "farklı" (duvar, kloroplast, koful, şekil) listeleri. |
| 7 | Kaydet / Sıra sende / Sıradaki | record–end | Defter kaydı; grup performans görevi: hücre modeli tasarla (ADPA); sonraki film: Hücreden Organizmaya. |

## Maarif (TYMM) uyumu
| Program ögesi | Filmde |
|---|---|
| a) Bitki ve hayvan hücrelerinin özelliklerini belirler | Sahne 3 (gözlem: köşeli/düzenli – yuvarlak/düzensiz; yeşil tanecikler), Sahne 4–5 |
| b) Benzer özelliklerini listeler | Sahne 6, "benzer" satırları |
| c) Farklı özelliklerini listeler | Sahne 6, "farklı" satırları |
| Mikroskobun bölümleri ve işlevi tanıtılır | Sahne 2 |
| Birden fazla örnek; hem bitki hem hayvan hücresi | Sahne 3 (soğan zarı, yaprak / yanak hücreleri) |
| Gözleme dayalı çizim; zar, sitoplazma, çekirdek korunur (sınırlama) | Sahne 4: iki çizimde de üç temel kısım ayrıca vurgulanır |
| Mikroskop yoksa görsel/dijital içerik | Sahne 3 son beat |
| Organellerin ayrıntılı yapısı verilmez, yalnızca isim ve görev (sınırlama) | Organeller içi boş sade şekiller; iç zar, krista, grana vb. çizilmez/adlandırılmaz |
| Analoji yöntemi | kapı, yönetim merkezi, enerji santrali, besin fabrikası, depo; köprü: tuğla–bina |
| Performans görevi: grup hücre modeli (ADPA) | "Sıra sende" kartı (film yapmaz, özendirir) |
| Köprü kurma: tuğla ↔ hücre | Sahne 1 |

## Bilimsel doğruluk
| İfade | Kontrol |
|---|---|
| Soğan zarı hücreleri köşeli, düzenli dizili; kloroplast yok | Doğru: soğanın etli yaprakları (toprak altı) ışık almaz, kloroplast içermez. Yaprak hücrelerinde kloroplast görülür. Yaygın yanılgı ("bütün bitki hücrelerinde kloroplast görülür") filmde düzeltilir. |
| Yanak (insan) hücreleri hayvan hücresi özelliği taşır; yuvarlak/düzensiz | Doğru (yassı epitel hücreleri). |
| Hücre zarı madde giriş-çıkışını denetler | Doğru. |
| Sitoplazma akışkan; organeller içinde | Doğru (5. sınıf düzeyi). |
| Çekirdek yönetim merkezi | Doğru (ders kitabı düzeyi). |
| Mitokondri enerji üretir; bitki ve hayvanda var | Doğru. |
| Kloroplast yalnızca bitki hücresinde, ışıkla besin üretir | Doğru (fotosentez kavramına girilmedi). |
| Koful bitkide büyük ve az, hayvanda küçük ve çok | Türk ders kitaplarındaki standart ifade. |
| Hücre duvarı yalnızca bitkide, zarın dışında; korur, şekil verir | Doğru. |
| Mikroskop güvenliği: ayna Güneş'e çevrilmez | Doğru: odaklanan güneş ışığı göze zarar verir. |
Not: organel listesi (mitokondri, kloroplast, koful) + hücre duvarı ile sınırlı tutuldu; ribozom, golgi, ER, lizozom, sentrozom gibi yapılara girilmedi. Çizimler "model çizim · ölçekli değildir" notu taşır.

## Teknik notlar
- `props.js` → `window.F09`: bitki/hayvan hücresi (parça parça görünürlük ve vurgulama), mikroskop, görüş alanı (soğan/yanak/yaprak), tuğla duvar, kartlar, başlık/bitiş kartı.
- `props.js` sonunda **lib geçici çözümü**: motorun anahtar kavram etiketleri ardışık beat'lerde ~0,9 sn üst üste biniyordu; etiket bir sonraki başlarken bitecek şekilde yeniden çiziliyor (lib değiştirilmedi).
