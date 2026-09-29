# 12 · Aynalar — FB.6.4.3 (6. sınıf, Ünite 4)

**Çıktı:** FB.6.4.3 Günlük hayattaki ayna çeşitlerine ilişkin bilimsel çıkarım yapabilme
**Süre:** ≈ 172,1 sn (sessiz sürüm, `--wps=1.85`, `timing.js`)

## Sahne planı ve Maarif uyumu
| # | Sahne (beat'ler) | Öğrettiği | TYMM eşleştirmesi |
|---|---|---|---|
| 1 | Çaydanlık (title–kettle) | Çaydanlıkta küçük ve şişkin görüntü, boy aynasında aynı boy görüntü → "Neden farklı?" | Köprü kurma: "Çaydanlık yüzeyindeki kendi görüntünüz ... boy aynasındaki görüntünüz" |
| 2 | Ayna çeşitleri (three–spoon) | Düz, çukur, tümsek ayna kesitleri; kaşığın içi çukur, sırtı tümsek | a) ayna çeşitlerinin niteliklerini tanımlar; "her gruba üç ayna çeşidi" |
| 3 | Düz ayna (plane–ambul) | Görüntü düz ve aynı boy; sağ-sol yer değiştirir; aynanın arkasında eşit uzaklıkta, yaklaşınca yaklaşır; ambulans yazısı dikiz aynasında düz okunur | "Düz ... aynada görüntü özellikleri belirtilir"; aynayı yaklaştırıp uzaklaştırma gözlemi; köprü: itfaiye/ambulans yazısı |
| 4 | Tümsek ayna (convex–convuse) | Görüntü düz ve küçük; ışınları dağıtır → geniş görüş alanı; kavşak aynası, mağaza güvenlik aynası | "... Tümsek aynada görüntü özellikleri belirtilir"; c) günlük yaşamdaki aynaları yorumlar |
| 5 | Çukur ayna (concave–danger) | Yakında düz ve büyük, uzakta ters ve küçük (uzaklığa göre değişir); ışınları bir bölgede toplar; diş hekimi aynası, makyaj aynası, el feneri yansıtıcısı; kırmızı güvenlik kartı | "Çukur aynada cismin görüntüsünün özelliklerinin (büyük/küçük, ters/düz) cismin aynaya olan uzaklığına göre değişebileceği belirtilir." |
| 6 | İbnülheysem (ibn–ibn2) | Yaklaşık bin yıl önce düz ve küresel aynalarda yansımayı deneylerle incelemesi, yansıma kanununu geometriyle kanıtlaması; Kitâbü'l-Menâzır | "İbnülheysem’in ... Türk-İslam bilim insanlarından olduğu bilgisi öğrencilerle paylaşılır (D19.2)" |
| 7 | Kaydet + Sıra sende (record–end) | Ayna / görüntü / kullanım tablosu + kırmızı güvenlik notu; görev: kaşıkla yaklaş-uzaklaş gözlemi; araştır: kahkaha aynaları, periskop; sonraki film: 13 · Renklerin Sırrı: Soğurma ve Renkler | b) veri toplar ve kaydeder (OB7); Zenginleştirme: kahkaha aynaları, periskop modeli |

## Sınırlamalar (program metninden)
- "Aynalarda özel ışınlarla görüntü çizimine ve matematiksel bağıntılara girilmez." (FB.6.4.2) → Hiçbir sahnede görüntü, ışın çizimiyle bulunmaz. Görüntüler gözlem olarak (aynanın içinde) gösterilir. Tümsek/çukur aynada paralel ışın demeti yalnızca "dağıtır / bir bölgede toplar" niteliğini göstermek için çizildi; "odak", "merkez" gibi terimler ve formüller kullanılmadı.
- Çukur ayna için yalnızca programın istediği nitel bilgi verildi: özellikler uzaklığa göre değişir (yakında düz-büyük, uzakta ters-küçük).
- Güvenlik: çukur aynayla toplanan güneş ışığı yakabilir, göze tutulmaz (sahne 5 kırmızı kart + defterde kırmızı not). Lazer yok.
- İbnülheysem'in portresi çizilmedi (güvenilir bir görseli yok); el yazması sayfa ve geometrik şema kullanıldı.

## Bilimsel doğruluk
| Konu | Film ne gösteriyor | Kontrol |
|---|---|---|
| Düz ayna görüntüsü | Damla çizimi ayna doğrusuna göre tam yansıtılır (`translate(2·MX) · scale(−1,1)`): aynı boy, düz, aynaya eşit uzaklık, sağ-sol yer değiştirmiş | ✔ |
| Sağ-sol | q3 görünümde Damla'nın sağ kolu ekranın solundaki koldur (DAMLA side −1); görüntüde ayna karşılığı "sol eli gibi" etiketlenir | ✔ |
| Ambulans | Önde ters yazı; dikiz aynası içinde aynı çizim yansıtılınca yazı düz okunur (çift yansıtma) | ✔ |
| Tümsek ayna ışınları | `F612.hitArc` (çember kesişimi, dış normal) + `V.reflect`; paralel ışınlar dağılır | ✔ |
| Çukur ayna ışınları | `F612.hitArc` (uzak kesişim, merkeze doğru normal) + `V.reflect`; paralel ışınlar merkez ile yüzey arasında bir bölgede toplanır (küresel sapma nedeniyle tek nokta değil → "bir bölgede") | ✔ |
| Tümsek görüntü | Her zaman düz ve küçük; aynada daha geniş oda görünür | ✔ |
| Çukur görüntü | Yakında (odak içinde) düz ve büyük; uzakta ters (çok uzakta küçük) | ✔ |
| Kullanım alanları | Düz: boy aynası, araç içi dikiz aynası · Tümsek: kavşak, mağaza güvenlik aynası · Çukur: diş hekimi aynası, makyaj (büyüten) aynası, el feneri yansıtıcısı | ✔ |
| İbnülheysem | Yaklaşık 965–1040; Kitâbü'l-Menâzır (Optik Kitabı), Latinceye çevrilip yüzyıllarca okundu | ✔ |

## Notlar
- `props.js` (window.F612): film 11 (F611) yardımcılarının kopyası (`V`, `glow`, `ray`, `flashlight`, `card`, `mirror`, `angleArc`, `warn`, `bulb`) + `hitArc`, `beamArc`, `arcMirror`, `roundMirror`, `kettle`, `ambulance`, `spoon`.
- Sonraki film tanıtımı 13. filmin narration.js başlığıyla aynı: "13 · Renklerin Sırrı: Soğurma ve Renkler".
- Konsolda yalnızca `audio/mix.m4a` bulunamadı uyarısı var (sessiz sürüm).
