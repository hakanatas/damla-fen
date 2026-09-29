# 17 · Bileşiklerin Dili: Formüller — FB.7.5.7

**Çıktı:** Bileşiklerin isimlerini formülleriyle yapılandırabilme
**Süre:** ≈ 200 sn (sessiz sürüm, `--wps=2.0`) · 9 sahne · 25 beat

## Sahne planı
| # | Sahne (dosya) | Beat'ler | Ne öğretiyor |
|---|---|---|---|
| 1 | Merak (`s1-merak.js`) | title, hello, q | Ön öğrenme: element sembol kartları (H, O, C, N, Na, Cl, S); soru balonu H + H + O → ? |
| 2 | Ortak dil (`s2-ortak-dil.js`) | lang, common | su / water / eau / Wasser → tek formül H₂O (bilimin ortak dili, E3.7) |
| 3 | H₂O'yu oku (`s3-su.js`) | model, build, subscript, one | Top-çubuk modelden formüle: semboller yan yana, alt sayı = atom sayısı, 1 yazılmaz |
| 4 | CO ve CO₂ (`s4-co-co2.js`) | co, co-read, co-diff, name | İki model + formül + atom sayısı; tek alt sayı farkı = farklı bileşik; isimdeki mono = 1, di = 2 ipucu |
| 5 | Atomları say (`s5-sayma.js`) | caps, nacl, table, glucose | Büyük harf kuralı (NaCl: Na + Cl, 1 : 1); tablo: NH₃, SO₂, HCl, H₂SO₄, NaOH atom çeşit/sayısı; glikoz C₆H₁₂O₆ = 24 atom |
| 6 | Elementler de formülle (`s6-element.js`) | elements, o2 | Molekül yapılı elementler O₂, H₂, N₂ (tek cins atom → element) ↔ H₂O (iki cins atom → bileşik) |
| 7 | Kart eşleştirme (`s7-oyun.js`) | match, whole | Model ↔ formül ↔ isim kartları eşleştirilir; "uyumlu bir bütün" |
| 8 | Kaydet (`s8-kaydet.js`) | record, yourturn | Defter maddeleri; Sıra sende: programdaki 10 bileşik için kart eşleştirme oyunu |
| 9 | Sıradaki (`s8-kaydet.js`) | next, end | 18 · Karışımlar tanıtımı (şekerli su, kum-su, zeytinyağı-su); bitiş kartı |

## TYMM uyumu
| Süreç bileşeni / uygulama | Filmde |
|---|---|
| a) Yaygın bileşiklerin formüllerini inceleyerek mantıksal ilişkiler ortaya koyar | S3 alt sayı = atom sayısı, 1 yazılmaz; S4 CO/CO₂ ve mono/di; S5 büyük harf kuralı, atom sayma tablosu |
| b) Ön öğrenmelerine bağlı olarak uyumlu bir bütün oluşturur | S1 sembol kartları (FB.7.5.5 ön öğrenmesi); S6 element/bileşik (FB.7.5.4); S7 model-formül-isim bütünü |
| Farklı cins elementlerin birleşerek bileşik oluşturduğu hatırlatılır; nasıl gösterileceği sorulur | S1 soru balonu |
| Bileşiklerin de uluslararası ortak dile ihtiyacı | S2 |
| Molekül yapılı elementlerin de formülle gösterildiği | S6 |
| Kart eşleştirme, dijital içerik; atom çeşit/sayısı ile formülün bütünlüğü (OB2, OB4) | S7, Sıra sende |
| **Sınırlama:** yalnızca su, sodyum klorür, karbondioksit, karbonmonoksit, amonyak, kükürt dioksit, hidrojen klorür, sülfürik asit, sodyum hidroksit, glikoz; kullanım alanlarına girilmez | Filmde yalnızca bu 10 bileşik (+ molekül yapılı elementler O₂, H₂, N₂) geçer. CH₄ vb. listede olmadığı için KULLANILMADI. Hiçbir bileşiğin kullanım alanı söylenmez. |

## Bilimsel doğruluk kontrolü
| İfade | Not |
|---|---|
| H₂O: 2 H + 1 O; CO: 1 C + 1 O; CO₂: 1 C + 2 O | ✔ |
| NH₃ (1 N, 3 H), SO₂ (1 S, 2 O), HCl (1 H, 1 Cl), H₂SO₄ (2 H, 1 S, 4 O), NaOH (1 Na, 1 O, 1 H) | ✔ |
| Glikoz C₆H₁₂O₆ → 6 + 12 + 6 = 24 atom | ✔ |
| NaCl: sodyum ve klor 1 : 1 oranında | NaCl molekül değil (iyonik); filmde "molekül" denmez, yalnızca oran ve element sembolleri ✔ |
| "mono = bir, di = iki" | Karbonmonoksit / karbondioksit / kükürt dioksit adlandırmasıyla uyumlu ✔ |
| Su molekülü açılı (bükük), CO₂ doğrusal, NH₃ piramit (2B çizim), SO₂ bükük | Modeller şematik; atom renkleri temsili (O mavi, çünkü kırmızı yalnızca güvenlik için ayrılmış) |
| Azot (N) | MEB programındaki adlandırma ("azot") ✔ |
| Renk kodu | alt sayılar kehribar vurgulu; kırmızı yalnızca "1 yazılmaz" YANLIŞ işareti |

## Bilinen notlar
- `props.js` (window.K7) 17–19 filmlerinde birebir aynı kopyadır; formül yazıcı alt simgeleri küçük font + aşağı kaydırma ile çizer (Kalam'da ₂ glifi yok). Altyazılarda Unicode ₂ ₃ kullanıldı (sistem yedek fontuyla görünüyor).
- `audio/mix.m4a` yok (sessiz sürüm); konsolda yalnızca bu dosya için ERR_FILE_NOT_FOUND.
- Süre 200 sn (hedefin üst sınırı).
