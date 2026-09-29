# 6. sınıf Film 3 · Kuvvetler Bir Araya Gelince: Bileşke Kuvvet — FB.6.2.1 · FB.6.2.2

**Çıktılar:** FB.6.2.1 Aynı doğrultudaki kuvvetler arasındaki ilişkileri açıklayarak bileşke kuvveti yapılandırabilme · FB.6.2.2 Dengelenmiş ve dengelenmemiş kuvvetlerin etkisi altındaki bir cismin hareketine yönelik deney yapabilme · Ünite 2 "Kuvvetin Etkisinde Hareket" · süre ≈ 206 sn (sessiz, altyazılı, `--wps=1.85`)

## Sahne planı
| # | Sahne (dosya) | Beat'ler | Öğrettiği |
|---|---|---|---|
| 1 | Merak (`s1-merak.js`) | title, hello, push, question | Ağır kutu: tek itme yetmez, arkadaş aynı yönde ip ile çekince kutu kayar → "Birden fazla kuvvet etki edince ne olur?" (köprü kurma) |
| 2 | Kuvvetin özellikleri (`s2-ozellikler.js`) | point, line, size | Kareli defterde ok: uygulama noktası (daire), doğrultu (kesikli çizgi), aynı doğrultuda iki yön (sağ/sol), büyüklük = kare sayısı (1 kare = 1 N → 5 N) |
| 3 | Aynı yön (`s3-ayni-yon.js`) | same, sum, resultant | İki dinamometre 3 N ve 2 N okur; ölçekli oklar uç uca eklenir; bileşke 5 N aynı yönde; "3 N + 2 N = 5 N" |
| 4 | Zıt yön (`s4-zit-yon.js`) | opp, diff | 5 N sağa, 3 N sola; 3 N'luk ok 5 N'un ucuna taşınır; bileşke 2 N, büyük kuvvetin yönünde; "5 N − 3 N = 2 N" |
| 5 | Denge (`s5-denge.js`) | equal, zero, balancer, balancer2 | 4 N / 4 N → bileşke 0 → dengelenmiş; hatırlatma kartı: bileşke ≠ 0 → dengelenmemiş; 6 N sağa + 2 N sola → bileşke 4 N sağa; yeşil 4 N dengeleyici kuvvet eklenince yeni bileşke 0 |
| 6a | Deney (`s6-deney.js`) | hyp, setup, trial1–3, analyze | Hipotez kartı → düzenek (tekerlekli araba, ip, iki dinamometre) + değişkenler (değiştirilen/gözlenen/sabit tutulan) → üç deneme, dinamometre okumaları, veri tablosu → "Hipotez desteklendi ✓", grupların verileri karşılaştırılır |
| 6b | Hareket ve denge (`s6-deney.js`) | moving | Yolda giden araba: iten kuvvet 3 N = sürtünme 3 N → bileşke 0 → eşit zamanlarda eşit yol, sabit süratle devam |
| 7 | Kaydet + Sıradaki (`s7-kaydet.js`) | record, task, next, end | 5 maddelik defter özeti · Sıra sende: poster görevi (+ İbni Sina araştırma notu) · Film 4 tanıtımı · bitiş kartı |

## Maarif (TYMM) uyumu
| TYMM ögesi | Filmde |
|---|---|
| Kuvvet tanımı: uygulama noktası, yön, doğrultu, büyüklük (OB4) | S2 tamamı |
| FB.6.2.1 a) Aynı doğrultudaki kuvvetleri inceleyip mantıksal ilişkileri ortaya koyar | S3–S4: aynı yön → toplanır; zıt yön → fark, büyük kuvvetin yönü |
| FB.6.2.1 b) İlişkileri yapılandırarak bileşke kuvveti açıklar; bileşkenin yönünü, doğrultusunu, büyüklüğünü çizer | S3–S5: ölçekli oklar kareli zeminde uç uca eklenerek bileşke oku çizilir |
| Bileşke 0 → dengelenmiş, ≠ 0 → dengelenmemiş | S5 |
| Dengeleyici kuvvetin bileşke üzerindeki etkisi vurgulanır | S5 balancer/balancer2 |
| FB.6.2.2 a) Deney düzeneği tasarlar; hipotez geliştirir; araç-gereç belirler; değişkenler | S6 hyp, setup (değişken kartları) |
| FB.6.2.2 b) Ölçme ve veri analizi (OB7); gruplar arası karşılaştırma | S6 trial1–3 (dinamometre okumaları + tablo), analyze (Grup A/B/C) |
| Performans görevi: günlük yaşamdan dengelenmiş/dengelenmemiş kuvvet posteri | S7 "Sıra sende" |
| Zenginleştirme: İbni Sina'nın hareket görüşü (bilimin doğası) | S7 görev kartında araştırma sorusu |
| Temel kabul: dinamometre ve Newton bilinir | Yeniden öğretilmez; doğrudan ölçüm aracı olarak kullanılır |

## Bilimsel doğruluk kontrolü
| İfade / görsel | Not |
|---|---|
| Oklar ölçekli | Tüm diyagramlarda 1 N = 60 px (1 kare); 3+2, 5−3, 4−4, 6−2, dengeleyici 4 N birebir kare sayısıyla çizildi |
| Aynı yön: toplanır; zıt yön: fark, büyük kuvvetin yönü | Aynı doğrultudaki kuvvetler için doğru |
| Bileşke 0 → duran cisim durur; ≠ 0 → bileşke yönünde harekete geçer | Deney sürtünmesi az tekerlekli arabayla; denemelerde bileşke 3 N |
| Dengeleyici kuvvet = bileşkeye eşit büyüklükte, zıt yönde | Tanımla uyumlu |
| Hareketli cisimde dengelenmiş kuvvetler → sabit süratle devam | Program "hareketine etkisi" der; içerik çerçevesinde "sabit süratli hareket" var; tek beat, hesaplama yok |
| S1 kutu tek itmeyle kıpırdamıyor | Nitel gösterim; sayısal değer ve sürtünme yorumu verilmedi (yanılgı üretmemek için) |
| Dinamometre okumaları | Dinamometre göstergesi (0–10 N) uygulanan kuvvetle orantılı; etiketle aynı |

## Teknik notlar
- `props.js` → `window.F63`: films/05-kuvvet-olcme/props.js'ten kopya (`spring`, `dyn`, `car`, `table`, `floor`, `card`) + yeni: `title`/`endCard` (6. sınıf), `grid`, `farrow` (ölçekli kuvvet oku), `box`, `hdyn` (yatay dinamometre), `rope`, `tag`, `rig`.
- Renk: kuvvet okları kahverengi (film 5 ile aynı), bileşke kalın mürekkep + kehribar şerit, dengeleyici yeşil; kırmızı kullanılmadı.
- lib/ değişmedi. Konsoldaki tek hata `audio/mix.m4a` bulunamadı (beklenen).
