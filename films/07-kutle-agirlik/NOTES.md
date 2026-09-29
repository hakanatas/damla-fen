# Film 7 · Kütle ve Ağırlık — FB.5.2.3

**Çıktı:** FB.5.2.3 Kütle ve ağırlık kavramlarını karşılaştırabilme · Ünite 2 · süre ≈ 195 sn (sessiz, altyazılı)

## Sahne planı
| # | Sahne (dosya) | Beat'ler | Öğrettiği |
|---|---|---|---|
| 1 | Merak (`s1-merak.js`) | title, hello, question, moon | Pazar dili ("iki kilo elma") → ön bilgi sorusu "kütle = ağırlık?"; Ay'da zıplayarak yürüyen astronot (köprü kurma) |
| 2 | Tanımlar (`s2-tanim.js`) | mass, weight | Kütle: madde miktarı, kg/g, eşit kollu terazi · Ağırlık: yer çekiminin uyguladığı kuvvet, N, dinamometre |
| 3 | Ölçüm (`s3-olcum.js`) | balance, dynam, table, relation | Elma teraziyle 50 g + 50 g ile dengelenir → 100 g; dinamometrede ≈ 1 N; tablo (elma, kitap); kütle ↑ → ağırlık ↑; 1 kg ≈ 9,8 N, 2 kg ≈ 19,6 N |
| 4 | Ay'da (`s4-ay.js`) | tomoon, moonmass, balwhy, moonweight, why | Hayalî yolculuk; Ay'da terazi yine dengede (6 kg); iki kefe aynı ölçüde hafifler; dinamometre Dünya ≈ 59 N, Ay ≈ 10 N; Ay cisimleri ≈ 6 kat daha az çeker |
| 5 | Konum (`s5-konum.js`) | earthpos | Dünya'da kutupta biraz fazla, ekvatorda ve yüksek dağda biraz az ağırlık; kütle her yerde aynı |
| 6 | Karşılaştırma (`s6-karsilastir.js`) | same, diff | Benzerlikler listesi (3 madde) + farklılıklar tablosu (tanım, birim, ölçme aracı, yere göre) |
| 7 | Sıra sende + Sıradaki (`s7-son.js`) | task, research, next, end | Ölçme görevi; Hazinî araştırması (zenginleştirme); Film 8 tanıtımı (yavaşlayan kutu); bitiş kartı |

## Maarif (TYMM) uyumu
| TYMM ögesi | Filmde |
|---|---|
| a) Kütle ve ağırlığa ilişkin özellikleri belirler | S2 tanım defteri; S6 tablo satırları |
| b) Benzerlikleri listeler | S6 "Benzerlikler" (onay kutulu liste) |
| c) Farklılıkları listeler | S6 "Farklılıklar" tablosu |
| Ön bilgi soruları | S1 pazar + "Kütle ile ağırlık aynı şey mi?" |
| Köprü: astronotların Ay'daki yürüyüşü | S1 Ay sahnesi, S4 "why" |
| Dinamometreyle ağırlık, eşit kollu teraziyle kütle ölçümü, not etme (D3.3, OB7) | S3 |
| Sonuçları karşılaştırma ve farklılığı yorumlama (OB1) | S3 tablo, S4 Dünya/Ay |
| Konuma bağlı ağırlık değişimi | S5 |
| Dünya ve Ay'da farklı ağırlık | S4 |
| **Sınırlama:** yalnızca Dünya ve Ay | Başka gezegen yok |
| **Sınırlama:** "kütle çekim kuvveti" terimi yok | Yalnızca "yer çekimi"; Ay için "Ay, cisimleri … daha az çeker" |
| Matematikle ilişkilendirme | 1 kg ≈ 9,8 N, 2 kg ≈ 19,6 N |
| Zenginleştirme: Hazinî | S7 araştırma sorusu (iddia verilmez, soru sorulur) |

## Bilimsel doğruluk kontrolü
| İfade | Not |
|---|---|
| 100 g elma ≈ 1 N | 0,1 kg × 9,8 N/kg = 0,98 N |
| 400 g kitap ≈ 4 N | 3,92 N |
| 1 kg ≈ 9,8 N (Dünya) | g ≈ 9,8 N/kg |
| 6 kg: Dünya ≈ 59 N, Ay ≈ 10 N | 6 × 9,8 = 58,8; 6 × 1,62 = 9,7 |
| Ay ≈ 1/6 | 1,62 / 9,81 ≈ 0,165 |
| Eşit kollu terazi Ay'da da aynı kütleyi gösterir | Terazi kütleleri karşılaştırır; iki kefe aynı oranda hafifler |
| Kutupta biraz fazla, ekvatorda ve yüksek dağda biraz az | g kutupta ≈ 9,83, ekvatorda ≈ 9,78 N/kg; yükseklikle azalır (sayı verilmedi) |
| "(çizim ölçekli değildir)", "(hayalî yolculuk)" notları | S4, S5 |

## Teknik notlar
- `props.js` → `window.F07`: Film 5 yardımcıları + `balance` (eğim/ibre, kefe içerikleri), `mass`, `sandbag`, `astronaut`, `helmet`, `moonGround`.
- lib/ içinde değişiklik yok. Konsoldaki tek hata `audio/mix.m4a` yokluğu (sessiz sürüm).
