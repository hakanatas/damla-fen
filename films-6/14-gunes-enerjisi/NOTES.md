# 14 · Güneş Enerjisinden Yararlanma — FB.6.4.7

**Çıktı:** Güneş enerjisinin günlük hayat ve teknolojideki yenilikçi uygulamalarına ilişkin eleştirel düşünebilme (KB3.3)
**Süre:** ≈ 163,4 sn (sessiz sürüm, `timing.js`, `--wps=1.85`)

## Sahne planı ve Maarif uyumu
| # | Sahne (beat'ler) | Öğrettiği | TYMM eşleştirmesi |
|---|---|---|---|
| 1 | Güneşli oda (title–energy) | Kış günü, evin kesiti: gölgedeki oda daha serin, güneş alan oda daha sıcak (termometreler). Işık camdan geçer, soğurulur, oda ısınır. "Güneş → ışık + enerji" | Köprü sorusu, birebir ("Kışın güneşli günlerde… güneş ışığı alan odalar…"), SDB2.1. Film 13'teki soğurmayla bağ kurulur. |
| 2 | Uygulamalar (drying–examples) | 2×2 kartlar: güneşte kurutma (çamaşır, biber, kayısı); güneş kolektörü (koyu yüzey ışığı soğurur, depodaki su ısınır); güneş paneli (ışık → elektrik → ampul); teknolojide (hesap makinesi, sokak lambası, sulama pompası, uydu) | "Günlük yaşamda güneş enerjisinin kullanıldığı alanlara örnekler" (OB1) |
| 3 | Sorgula (question–cloud) | "Her zaman, her yerde işe yarar mı?" İddia kartı: "Güneş paneli gece de elektrik üretir." → YANLIŞ. Güneşli / bulutlu / gece sütunları ve nitel üretim çubukları (çok / az / yok). Akü: gündüz depola, gece kullan. | a) fikirleri sorgular (KB3.3) |
| 4 | Artı ve eksi (pros–decide) | İki sütunlu tablo: avantajlar ve sınırlılıklar, bir terazi; çıkarım kutusu: "doğru yerde, doğru biçimde kullanılmalı" | b) akıl yürütür; faydaları sorgulama (KB2.14) |
| 5 | Gelecek (nature–future) | Karşılaştırma: çok yakıt yakılınca daha çok duman, güneş enerjisi yaygınlaşınca daha temiz hava. Gelecek fikirleri: güneşle çalışan araçlar, panel kaplı çatılar, "senin fikrin?" kartı | İnsana ve doğaya faydaları (OB8, D5.2); "Gelecekte… özgün fikir üretmeleri" |
| 6 | Kaydet + Sıra sende (record–end) | Gözlem defteri (6 madde); performans görevi: gelecekte kullanım için özgün bir fikir üret, çiz, adlandır, sun; "Arkadaşlarının fikirlerini de saygıyla dinle."; güvenlik notları; zenginleştirme: güneş fırını; sonraki film: 15 · Genleşme ve Büzülme | c) çıkarımları yansıtır; performans görevi (SDB3.3); "olumlu iletişim ve saygı çerçevesinde" (SDB2.1, D14.1); zenginleştirme: güneş fırını |

## Bilimsel doğruluk
| Konu | Film ne gösteriyor | Kontrol |
|---|---|---|
| Güneşli oda | Işık camdan geçer, eşyalar ve duvarlar ışığı soğurup ısınır. Sıcaklıklar yalnızca termometre seviyesiyle nitel gösterilir, sayı verilmez. | ✔ |
| Güneş kolektörü | Suyu ısıtır, elektrik üretmez. Koyu yüzey ışığı soğurur (film 13'le bağlantı). | ✔ |
| Güneş paneli | Işığı doğrudan elektrik enerjisine dönüştürür. Isıtma amaçlı gösterilmez. | ✔ |
| Örnekler | Güneş panelli hesap makinesi, sokak lambası, sulama pompası ve uydu gerçek kullanım alanlarıdır. | ✔ |
| Gece ve bulut | Gece üretim yoktur, bulutlu havada azdır. Çubuklar niteldir (sayı yok). Depolama için akü gösterilir. | ✔ |
| Avantajlar | Yenilenebilir kaynak. Paneller **çalışırken** duman ve zararlı gaz çıkarmaz ("hiç çevre etkisi yok" denmez). Güneş ışığı için ücret ödenmez. | ✔ |
| Sınırlılıklar | Gece yok / bulutta az üretim, depolama ihtiyacı, kurulum maliyeti, geniş alan, eski panellerin geri dönüşümü | ✔ |
| Doğaya fayda | Kömür ve petrol gibi yakıtlar daha az yakılır, hava temizlenir. Sağdaki köyde duman azalır ama sıfır gösterilmez (ısınma gibi başka yakıt kullanımları sürebilir). | ✔ |
| Gelecek fikirleri | Güneşle çalışan araçlar ve panel kaplı çatılar bugün de denenen fikirlerdir. Kesin tahmin yapılmaz, soru biçiminde sunulur. | ✔ |
| Güvenlik | "Güneş’e asla doğrudan bakma." "Kolektör ve güneş ocağı yüzeyleri çok ısınabilir." Güneş fırını "bir yetişkinle" yapılır. | ✔ |
| Renk kodu | Işık ve enerji kehribar, ısı #B5553F, su mavi; kırmızı (#A23A2A) yalnızca "YANLIŞ" ve güvenlik uyarılarında | ✔ |

## Teknik notlar
- `props.js` (window.F614): `glow`, `ray`, `card`, `fit`, `thermo`, `squiggle` yardımcıları ve ek olarak `panel` (perspektifli güneş paneli), `standPanel`, `bulb`, `cloud`, `battery`, `collector`, `house`, `chimney`, `car`, `icon.{calculator, streetlamp, pump, satellite}`.
- 15. filmin başlığı "Genleşme ve Büzülme" olarak tahmin edildi. 15. film farklı bir başlıkla yayımlanırsa `scenes/s6-kaydet.js` içindeki tanıtım metni güncellenmeli.
- Konsolda yalnızca `audio/mix.m4a` bulunamadı uyarısı var (sessiz sürüm).
