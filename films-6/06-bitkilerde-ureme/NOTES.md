# 6-06 · Çiçekten Tohuma, Tohumdan Fideye — FB.6.3.2 · FB.6.3.3

Bitkilerde üreme, büyüme ve gelişme hakkında bilimsel çıkarım + tohumun çimlenmesine etki eden faktörlere ilişkin hipotez. Süre ≈ 210 sn (iki çıktı; sessiz, `--wps=1.85`).

## Sahne planı
| # | Sahne | Beat'ler | Ne öğretiyor |
|---|---|---|---|
| 1 | Merak | title–hello | Çiçek → meyve → tohum sorusu |
| 2 | Sınıflandır | classify | Çiçekli (elma ağacı, fasulye, papatya) / çiçeksiz (eğrelti otu, kara yosunu) — yalnızca örnek |
| 3 | Temel kısımlar | parts | Kök, gövde, yaprak, çiçek |
| 4 | Çiçek | flower–fruit | Kesit şeması: çanak yaprak, taç yaprak, erkek organ (başçık, sapçık, polen), dişi organ (tepecik, dişicik borusu, yumurtalık, tohum taslakları); tozlaşma (arı; rüzgâr/su/hayvanlar kartı); döllenme → yumurtalık meyveye, tohum taslakları tohuma |
| 5 | Yaşam döngüsü | cycle | Tohum → çimlenme → fide → çiçekli bitki → meyve ve tohum → … |
| 6 | Büyüme | factors–human | Faktörler (su, ışık, uygun sıcaklık, hava, mineraller); veri toplama/kaydetme tablosu (ışıkta/karanlıkta fide, örnek veri); yorum; insan etkisi ve çevreye duyarlılık |
| 7 | Hipotez | hypo–ctrl | İki hipotez; A/B/C düzeneği; bağımsız (su: A↔B, ışık: A↔C), bağımlı (çimlenen tohum sayısı), kontrol edilen değişkenler |
| 8 | Gözlem ve sonuç | observe–prop | 5 günlük gözlem + çizimli günlük; sonuç 5/5, 0/5, 5/5; H1 doğrulandı, H2 çürütüldü; oksijen öğretmen tarafından açıklanır; önerme |
| 9 | Sıra sende | task–end | Grup düzeneği: yalnızca sıcaklığı değiştir; sıradaki film; bitiş kartı |

## Maarif (TYMM) uyumu
| Program ögesi | Filmde |
|---|---|
| 6.3.2 a) faktörlere ait nitelikleri tanımlar | Sahne 6 faktörler |
| 6.3.2 b) veri toplar ve kaydeder | Sahne 6 gözlem kaydı tablosu, cetvel, takvim |
| 6.3.2 c) verileri yorumlar ve değerlendirir | Sahne 6: karanlıktaki fide daha uzun ama soluk/cılız → sağlık yalnız boyla değerlendirilmez |
| Çiçekli/çiçeksiz sınıflandırma; çiçeksizlerin özelliklerine değinilmez | Sahne 2 (yalnızca ad + çizim) |
| Çiçekli bitkinin temel kısımları; çiçeğin kısımları model/poster üzerinde | Sahne 3–4 |
| Tozlaşma çiçeğe ait kısımlar gösterilerek açıklanır | Sahne 4 (başçık → tepecik) |
| Yaşam döngüsü görsel/animasyonla | Sahne 5 |
| İnsanların olumsuz etkileri, çevreye duyarlılık (SDB1.2, D5.2) | Sahne 6 sonu |
| 6.3.3 a) faktörleri tanımlar | Sahne 7–8 (su, ışık, sıcaklık, oksijen) |
| b) neden-sonuç ilişkileri | A↔B (su), A↔C (ışık) karşılaştırmaları |
| c) değişkenleri belirler | Bağımsız / bağımlı / kontrol edilen değişken kartları |
| ç) değişkenleri kontrol eder | Tek değişken farklı, gerisi aynı; görevde yalnız sıcaklık değiştirilir |
| d) önerme sunar | Sahne 8 "Önerme" defter sayfası |
| Oksijen düzeneğe dâhil edilmez, öğretmen açıklar | Sahne 8 oksijen kartı |
| Sistematik gözlem, gözlemleri çizme (Görsel Sanatlar) | Her gün aynı saatte gözlem, günlük |
| Performans görevi: çimlenme deneyi | "Sıra sende" (film yapmaz, özendirir) |

## Bilimsel doğruluk
| İfade | Kontrol |
|---|---|
| Çanak yaprak tomurcuğu korur, taç yaprak böcekleri çeker | Ders kitabı düzeyinde doğru |
| Başçıkta polen oluşur; tepecik yapışkandır | Doğru |
| Tozlaşma: polenin tepeciğe taşınması; rüzgâr, su, hayvanlar | Doğru (su ile tozlaşma az sayıda bitkide) |
| Yumurtalık → meyve, tohum taslağı → tohum | Doğru; örnek olarak fasulye kını (gerçek meyve) seçildi — elma yalancı meyve olduğu için kullanılmadı |
| Karanlıktaki fide daha uzun, soluk sarı, cılız | Doğru (etiyolasyon). Sayılar "örnek veri" olarak etiketli |
| Fasulye tohumu karanlıkta da çimlenir | Doğru; çimlenme için su, uygun sıcaklık, oksijen gerekir. Önermede "bazı tohumlar (ör. marul çeşitleri) ışıkta daha iyi çimlenir; tohumun cinsi önemli" notu var |
| Işık sağlıklı fide gelişimi için gerekir | Doğru (fotosentez kavramına girilmedi) |
| Kök → ~3. günde, 5. günde fide | Oda sıcaklığında fasulye için gerçekçi |
Gelincik (kırmızı) yerine papatya seçildi: kırmızı renk yalnızca güvenlik/YANLIŞ işaretlerine ayrılmış.

## Teknik notlar
- `props.js` → `window.F06`: ortak yardımcılar + çiçek kesiti (`flowerX`, bölüm vurgulama ve yumurtalık→meyve dönüşümü), bitki, eğrelti, yosun, ağaç, arı, fide (normal/soluk), saksı, çimlenme kavanozu, faktör ikonları.
- Süre 200 sn hedefini ~10 sn aşıyor (iki öğrenme çıktısı ve tüm süreç bileşenleri).
