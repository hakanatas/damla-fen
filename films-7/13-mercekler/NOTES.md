# 13 · Mercekler — FB.7.4.2 · FB.7.4.3 (7. sınıf, Ünite 4)

**Çıktılar:** FB.7.4.2 Mercek çeşitlerine yönelik bilimsel çıkarım yapabilme · FB.7.4.3 Merceklerin günlük hayatta kullanım alanlarını örneklerle sınıflandırabilme
**Süre:** ≈ 204,2 sn (sessiz sürüm, `--wps=2.0`, `timing.js`)

## Sahne planı ve Maarif uyumu
| # | Sahne (beat'ler) | Öğrettiği | TYMM eşleştirmesi |
|---|---|---|---|
| 1 | Yapraktaki damlalar (title–define) | Yağmur damlalarının altındaki damarlar ve üzerine su damlamış yazı büyük görünür → "damla mercek gibi mi?"; mercek tanımı | FB.7.4.2 uygulaması: "yapraktaki yağmur damlaları… üzerine su damlamış yazı" örnekleri (SDB2.1) |
| 2 | Mercek çeşitleri (two–smaller) | Grup çalışmasında iki mercek: yandan şekil (ortası kalın / kenarı ince ↔ ortası ince / kenarı kalın); yakındaki yazı: büyük / küçük görünür; Damla defterine kaydeder | 4.2 a) nitelikleri deneyerek tanımlar; b) veri kaydeder (OB1, E1.2, D20.1, SDB2.2); anahtar kavramlar: ince / kalın kenarlı mercek |
| 3 | Işığın yolu (rays–vfocus) | Paralel ışınlar: ışık mercekte iki kez kırılır; ince kenarlı toplar → odak noktası; kalın kenarlı dağıtır → uzantılar önde odakta kesişir | "merceklere ışık ışınları göndererek ışığın izlediği yolu gözlemleme" (OB7); 4.2 c) ışığı kırma özelliğine göre değerlendirir (KB2.17); anahtar kavram: odak noktası |
| 4 | Karşılaştır (compare) | İki sütunlu defter tablosu: şekil, paralel ışınlar, odak noktası, yakındaki yazı → toplayıcı / dağıtıcı | 4.2 b, c (KB2.5 sınıflandırma) |
| 5 | Güvenlik ve çevre (safety–protect) | Kırmızı kart: mercekle güneş ışığı asla toplanmaz (yangın, göz); ormana atılan cam kırığı ve su dolu pet şişe mercek gibi davranıp yangına yol açabilir; çöpünü doğada bırakma | "Ormana bırakılan cam kırıkları veya içi su dolu pet şişelerin sebep olduğu olumsuz durumlar" (D16.2, SDB2.3, SDB3.3) |
| 6 | Kullanım alanları (uses–tubitak) | 7 kart: belirle → ışığı toplayan / dağıtan diye ayrıştır → gruplandır → "İnce kenarlı mercek" / "Kalın kenarlı mercek" etiketleri; TÜBİTAK UZAY optik laboratuvarı | 4.3 a) belirler, b) ayrıştırır, c) gruplandırır, ç) etiketler (KB2.5, OB4); köprü kurma soruları (mikroskop, gözlük, uzak gözlem araçları); D19.4 |
| 7 | Sıra sende (task–end) | Performans görevi: evdeki mercekli araçları bul, iki gruba ayır, etiketle, afişle sun (+ güvenlik notu); Merak et: iki mercekle teleskop tasarımı; sonraki: 14 · Atomun Yapısı | Ölçme: "merceklerin günlük hayatta kullanım alanları ile ilgili performans görevi"; Zenginleştirme: teleskop/mikroskop tasarlama; E3.8 soru sorma |

## Sınırlamalar (program metninden)
- "Özel ışınlarla görüntü çizimine ve matematiksel bağıntıya girilmeden kırılma olayı açıklanır." → Hiç görüntü çizimi yok; yalnızca paralel ışın demeti ve odak noktası (anahtar kavram). Odak uzaklığı, formül, büyütme oranı verilmez. Görüntü gözlemi (büyük/küçük) doğrudan bakış olarak gösterilir.
- Güvenlik (program + FILM_GUIDE): güneş ışığı mercekle toplanmaz; kırmızı uyarı kartı sahne 5'te, görev kartında da kırmızı hatırlatma.

## Bilimsel doğruluk
| Konu | Film ne gösteriyor | Kontrol |
|---|---|---|
| Işın izleme | Her ışın iki küresel yüzeyde Snell ile (n = 1,5) izlenir: `F713.traceLens`; ışık mercekte iki kez kırılır | ✔ |
| Odak noktası | Eksene çok yakın (1 px) ışınla bulunur (`F713.focus`): ince kenarlı ≈ mercek merkezinin 425 px arkası; kalın kenarlı ≈ 396 px önü (uzantılar) | ✔ |
| Küresel sapma | Işın yükseklikleri ±40, ±80 px seçildi; kenar ışınları odaktan ≈ 25 px önce kesişir (gerçek mercek davranışı, gizlenmedi; odak parıltısı bu bölgeyi kapsar) | ✔ (not) |
| Mercek şekilleri | `F713.lens`: iki eşit küresel yüzey; ince kenarlıda kenar kalınlığı ≈ 10 px, kalın kenarlıda ≈ 79 px (ışın sahnesi) | ✔ |
| Yakındaki yazı | İnce kenarlı: odak içindeki yakın cisim büyük ve düz görünür (büyüteç); kalın kenarlı: küçük ve düz görünür. Uzaktaki cisimler ince kenarlıda ters/küçük görünebilir — filmde "yakındaki yazı" diye sınırlandı | ✔ |
| Su damlası | Damla yukarı doğru tümsek yüzeyiyle ince kenarlı mercek gibi davranır → alttaki damar/yazı büyük görünür | ✔ |
| Kullanım alanları | Büyüteç, mikroskop, mercekli teleskop, fotoğraf makinesi objektifi: toplayıcı (ince kenarlı) etkisi; yakını net göremeyen (hipermetrop/yaşa bağlı) gözlüğü: ince kenarlı; uzağı net göremeyen (miyop) gözlüğü: kalın kenarlı; kapı dürbünü: kalın kenarlı mercekle geniş alanı küçülterek gösterir | ✔ ("mercekli" teleskop dendi; aynalı teleskoplar ayrı) |
| Pet şişe / cam kırığı | Su dolu yuvarlak şişe ışığı toplayabilir → kuru otta yangın riski (şematik; "(şematik)" çizim) | ✔ |
| TÜBİTAK UZAY | Program metnindeki ifadeyle: yerli uyduların mercek, prizma gibi optik bileşenleri Optik Sistemler Araştırma Laboratuvarı'nda üretiliyor | ✔ |

## Notlar
- `props.js` (window.F713): F712 kopyası (V.refract, ray, dline, lightbox, card, angleArc, warnTri…) + `lens`, `drawLens`, `traceLens`, `focus`, `toX`, `icon.{microscope, camera, glasses, peephole, satellite}`.
- "Kapı dürbünü" ayrıca anlatılmadı (süre); kart olarak kalın kenarlı grubunda yer alır.
- Konsolda yalnızca `audio/mix.m4a` bulunamadı uyarısı var (sessiz sürüm).
