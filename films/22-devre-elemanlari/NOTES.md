# 22 · Devrenin Ortak Dili: Semboller — FB.5.6.1

**Öğrenme çıktısı:** FB.5.6.1 Bir elektrik devresindeki elemanları sembollerinin olup olmamasına göre sınıflandırabilme
**Süre:** ≈ 210 sn (sessiz sürüm, timing.js `total`) · 10 sahne · 29 beat

## Sahne planı
| # | Sahne (beat'ler) | Ne öğretiyor |
|---|---|---|
| 1 | Giriş (title–slow) | Damla'nın pil + anahtar + duy/ampul devresi yanar; devreyi arkadaşına resim gibi çizmek çok uzun sürer (köprü kurma: sembolsüz anlatımın sorunu). |
| 2 | Ortak dil (confuse–common) | Aynı pilin üç farklı çizimi → karışıklık; günlük hayattaki semboller (P, H, mecburi yön levhaları); tek pil sembolü, dört dilde farklı kelime → "Semboller = ortak bilimsel dil". |
| 3 | Güvenlik (safe1–safe2) | Kırmızı kart: prizle oynama · yalnızca pil · pilin iki ucunu tek kabloyla birleştirme (ısınır) · yetişkin eşliğinde. |
| 4 | Elemanlar (parts–game) | Altı eleman kartı: pil, ampul, anahtar, bağlantı kablosu, duy, pil yatağı; sembol kartı destesi. |
| 5 | Eşleştir (m-pil–m-none) | Kart eşleştirme: pil ↔ uzun+kısa çizgi, ampul ↔ daire içinde çarpı, anahtar ↔ açık/kapalı, kablo ↔ düz çizgi; duy ve pil yatağı için kart yok. |
| 6 | Grupla (sort–why) | Elemanlar iki gruba ayrılır: 1. grup sembolü olan (4), 2. grup sembolü olmayan (2). Duy ampulü, pil yatağı pili tutar; şemada yalnızca ampul ve pil çizilir. |
| 7 | Etiketle (l-pil–l-kablo) | Pil: uzun çizgi (+), kısa çizgi (−) · anahtar: açık → devre kesik, kapalı → devre tamam (mini şemalar) · kablo: düz çizgi, dik köşe (eğri çizim ✗). |
| 8 | Devre şeması (schema–world) | Gerçek devre ↔ şeması eşleştirilir; şema birkaç saniyede çizilir; Dünya'nın her yerinde aynı okunur. |
| 9 | Kaydet + Sıra sende (record–yourturn) | Gözlem defterinde eleman–sembol–özellik tablosu (afiş) + "Sembolü olmayanlar: duy, pil yatağı". Görev: kart hazırla, eşleştirme oyunu oyna, afiş yap. |
| 10 | Sıradaki (next–end) | Şemadan gerçek devreye → 23 · Şemadan Devreye: Deney Zamanı; bitiş kartı. |

## Maarif (TYMM) uyum tablosu
| Program ögesi | Filmde karşılığı |
|---|---|
| a) Elemanların sembollerini belirler | S5 kart eşleştirme (her eleman ↔ sembol kartı) |
| b) Sembollerinin olup olmamasına göre ayrıştırır | S5 "?" / "sembol kartı yok" + S6 ayrıştırma animasyonu |
| c) Gruplandırır | S6 "1. grup: Sembolü olan" / "2. grup: Sembolü olmayan" kutuları |
| ç) Sembollerini niteliklerine göre etiketler | S7 pil kutupları, anahtar açık/kapalı, kablo düz/dik köşe; S9 tablo "özelliği" sütunu |
| Sembol kullanmanın ortak bilimsel dil açısından önemi (SDB2.1, KB2.9) | S2 üç farklı çizim, trafik levhaları, dört dil–tek sembol; S8 "Dünyanın her yerinde aynı okunur" |
| Köprü kurma: günlük yaşamdaki semboller; sembol kullanılmamasının sorunları | S1 resimle çizmenin uzunluğu, S2 karışıklık + levhalar |
| Kart eşleştirme tekniği | S4–S5 "Kart eşleştirme" (anahtar kavram etiketi) |
| Eleman–sembol afişi/posteri | S9 defter tablosu + Sıra sende görevi 3 |
| Zenginleştirme: eşleştirme oyunu | Sıra sende görevi 2 |
| Anahtar kavramlar | "Devre elemanları", "Sembol", "Devre şeması" etiketleri |
| Güvenlik | S3 kırmızı kart (priz, yalnızca pil, kısa devre, yetişkin eşliği) |
| Performans görevini film yapmaz, özendirir | Sıra sende kartı açık uçlu görev verir |

## Bilimsel doğruluk tablosu
| İçerik | Kontrol |
|---|---|
| Pil sembolü: uzun ince çizgi (+), kısa kalın çizgi (−) | TS/IEC 60617 hücre sembolü; ders kitaplarıyla aynı |
| Ampul sembolü: daire içinde çarpı | IEC lamba sembolü; Türkçe ders kitaplarında kullanılan biçim |
| Anahtar: iki uç noktası + açık (eğik) / kapalı (düz) kol | Ders kitabı gösterimi |
| Kablo: düz çizgi, dik açılı köşeler | Şema çizim kuralı |
| Duy ve pil yatağının şema sembolü yoktur; şemada ampul ve pil çizilir | 5. sınıf ders kitabı sınıflandırması |
| Açık anahtar → devre tamamlanmaz → ampul ışık vermez | Doğru |
| Kısa devre uyarısı: pil ısınır | Doğru; sayısal değer verilmedi |
| Akım yönü / hareketli yük gösterimi yok | Program akımdan söz etmediği için yalnızca yanık/sönük ampul gösterildi |
| "Direnç", "voltaj", "seri/paralel" terimleri kullanılmadı | Program kapsamı dışında |

## Teknik notlar
- `props.js` → `window.CK`: gerçekçi devre elemanları (pil, pil yatağı, duy, ampul, anahtar, kablo, priz), TS/IEC sembolleri (`CK.sym`), otomatik devre şeması (`CK.loop`), güvenlik/başlık/bitiş kartları. Aynı dosya 23 ve 24. filmlerde de (kendi kopyaları olarak) kullanılır.
- lib/ içinde değişiklik yapılmadı.
