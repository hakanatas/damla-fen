# 7. sınıf Film 5 · Hareket ve Konum: Kinetik ve Potansiyel Enerji — FB.7.2.2

**Çıktı:** FB.7.2.2 Enerji çeşitlerinden kinetik ve potansiyel enerjiyi karşılaştırabilme · Ünite 2 · süre ≈ 204,2 sn (sessiz, altyazılı, `--wps=2.0`)

## Sahne planı
| # | Sahne (dosya) | Beat'ler | Öğrettiği |
|---|---|---|---|
| 1 | Parkta merak (`s1-park.js`) | title, hello, energy, question | Enerji = iş yapabilme yeteneği (yuvarlanan top kutuyu iter → iş, Film 4 ile köprü); "hareketinden mi, konumundan mı?" |
| 2 | Sınıflandırma (`s2-sinif.js`) | classify, sort | 6 görsel kart (top, bisiklet, daldaki elma, raftaki saksı, gerilmiş ok yayı, sıkışmış yay) iki gruba taşınır |
| 3 | Kinetik enerji (`s3-kinetik.js`) | ke, ke-speed, ke-mass, ke-rest | Tanım; aynı top yavaş/hızlı → kutu az/çok itilir (sürat); tenis/bowling topu aynı süratle (kütle); duran cisimde kinetik enerji yok |
| 4 | Potansiyel enerji (`s4-potansiyel.js`) | pe, grav, grav-h, grav-m, elastic, elastic2 | Tanım; daldaki elma (çekim PE, yükseklik); kuma bırakılan top: yükseklik ve kütle → çukur derinliği; esneklik PE: ok yayı, sıkışmış yay; az/çok sıkıştırılan yay topu az/çok yükseltir |
| 5 | Karşılaştırma (`s5-karsilastir.js`) | compare, similar, differ, both | Venn şeması: ortak (enerjidir, iş yapabilir, birimi joule, kütle — çekim PE ile), farklar; uçan kuşta ikisi birden |
| 6 | Kaydet + Sıra sende + Sıradaki (`s6-kaydet.js`) | record, task, next, end | 5 maddelik defter · görev (3+3 örnek, kendi cümleleriyle, soru ekle) · Film 6 (Enerjinin Korunumu) tanıtımı |

## Maarif (TYMM) uyumu
| TYMM ögesi | Filmde |
|---|---|
| Esneklik ve çekim potansiyel enerji çeşitlerine değinilir | S4 (iki çeşit ayrı başlıkla) |
| Görselleri hareket/konum kaynaklı diye sınıflandırma (OB4, SDB2.1) | S2 |
| a) Kinetik ve potansiyel enerjinin özelliklerini belirler | S3, S4 (tanımlar ve bağlı olduğu değişkenler) |
| b) Benzer özellikleri listeler | S5 Venn ortak bölgesi |
| c) Farklı özellikleri listeler | S5 Venn sol/sağ bölgeler |
| Çalışma kâğıdı: kendi cümleleriyle cevap (D3.4, OB7); merak edilen soruları sorma (E1.1, E3.8) | S6 "Sıra sende" (son madde: bir soru ekle) |
| **Sınırlama:** kinetik ve potansiyel dışında enerji çeşidine girilmez | Isı, ses, elektrik, kimyasal vb. hiç anılmadı; "enerji dönüşümü" Film 6'ya bırakıldı |

## Bilimsel doğruluk
| İfade / görsel | Not |
|---|---|
| Enerji: iş yapabilme yeteneği; birim joule | Ders kitabı tanımı |
| Kinetik enerji sürat ve kütle arttıkça artar; duran cisimde yok | Doğru (yere göre); formül verilmedi |
| Hızlı / kütlesi büyük top kutuyu daha uzağa iter | Nitel; kutunun kayma mesafesi az/çok, sayı yok |
| Çekim PE yükseklik ve kütle arttıkça artar | Kuma düşen topta çukur derinliği nitel gösterge; aynı boyutta hafif/ağır top kullanıldı (yalnızca kütle değişkeni) |
| Serbest düşme | Konum ∝ t² (düzgün hızlanan) çizildi |
| Esneklik PE: çok sıkıştırılan yay topu daha yükseğe fırlatır | Esneklik sınırı içinde doğru; sıçrama zamanı ve tepe noktası v²=2gh ile tutarlı |
| Uçan kuş: kinetik + çekim PE | Doğru |
| "Kütleye bağlı" ortak özellik | Yalnızca kinetik ve **çekim** PE için söylendi (Venn: "kütle (çekim PE)"); esneklik PE kütleye değil gerilme/sıkışma miktarına bağlıdır |

## Teknik notlar
- `props.js` (F7E) Film 4 ile aynı; filme özel çizimler `scenes/s0-art.js` → `window.F75` (elma ağacı, saksı, ok yayı, bisiklet, kum havuzu, kuş).
- Renk: kinetik = kehribar #E3A03A (yazılarda #9A6412), potansiyel = koyu kahve #8A4A10.
- lib/ değişmedi. Konsoldaki tek hata `audio/mix.m4a` (beklenen).
