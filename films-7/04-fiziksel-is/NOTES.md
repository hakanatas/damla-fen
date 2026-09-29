# 7. sınıf Film 4 · Her Çaba İş mi? Fiziksel Anlamda İş — FB.7.2.1

**Çıktı:** FB.7.2.1 Fiziksel anlamda yapılan işin bağlı olduğu faktörlere ilişkin bilimsel çıkarım yapabilme · Ünite 2 "Kuvvet ve Enerjiyi Keşfedelim" · süre ≈ 196,5 sn (sessiz, altyazılı, `--wps=2.0`)

## Sahne planı
| # | Sahne (dosya) | Beat'ler | Öğrettiği |
|---|---|---|---|
| 1 | Merak (`s1-merak.js`) | title, hello, tired | "Bugün çok iş yaptın!" (günlük dil) → "Fizikte de iş mi?" |
| 1b | Beyin fırtınası (`s1-merak.js`) | brainstorm | Kuvvetin etkileri zihin haritası: hareket ettirir, durdurur, yönünü/şeklini değiştirir (köprü kurma, E3.5) |
| 2 | Dört durum (`s2-gozlem.js`) | intro, ex1–ex4 | 2×2 panel: kutu itme · duvar itme · çanta kaldırma · çantayı aynı yükseklikte taşıma. Kuvvet (kahverengi ok) ve yer değiştirme (mavi kesikli ok) |
| 3 | Matris tablo (`s3-tablo.js`) | table, compare, nowork | Durum / kuvvet yönü / hareket / aynı doğrultu? / fiziksel iş; 1 ve 3 ✓, 2 ve 4 ✗ |
| 4 | Tanım (`s4-tanim.js`) | define, both | İki şart kartı (kuvvet + kuvvet doğrultusunda yer değiştirme); biri eksikse iş yok (duvar, yatay taşıma) |
| 4b | Günlük dil ≠ fizik (`s4-tanim.js`) | daily | Sol: ders çalışmak/emek; sağ: kuvvet + yer değiştirme |
| 5 | Faktörler (`s5-faktorler.js`) | factors, farther, bigger, depends, joule | Aynı kuvvet, 2 m ve 4 m → daha çok iş; hafif/ağır çanta aynı yüksekliğe → daha büyük kuvvet, daha çok iş; sonuç kartı; birim joule (J) |
| 6 | Kaydet + Sıra sende + Sıradaki (`s6-kaydet.js`) | record, task, next, end | 5 maddelik defter · gözlem/tablo görevi · Film 5 (Kinetik ve Potansiyel Enerji) tanıtımı · bitiş kartı |

## Maarif (TYMM) uyumu
| TYMM ögesi | Filmde |
|---|---|
| Açık uçlu sorular, beyin fırtınası (E3.5) | S1 zihin haritası |
| a) Fiziksel işin niteliklerini tanımlar | S4 iki şart kartı |
| b) Farklı örnekleri gözlemleyip verileri toplar ve kaydeder; matris tablo (OB4, OB7, KB2.6) | S2 dört görsel örnek → S3 matris tablo (kuvvetin yönü/doğrultusu, hareket doğrultusu) |
| "Kuvvet uygulanması ve cismin kuvvetle aynı doğrultuda yer değiştirmesi" vurgusu | S3 "aynı doğrultu?" sütunu, S4 tanım |
| c) İşin kuvvet ve yer değiştirmeye bağlı olduğunu yorumlar | S5 iki karşılaştırmalı deney + sonuç kartı |
| Günlük dildeki iş ≠ fiziksel iş (OB1) | S1 (anne sözü) + S4b |
| Birim "joule" tanımlanır | S5 joule beat'i (hesap yok) |
| Değerlendirme: çalışma kâğıdı | S6 "Sıra sende": 5 durum gözlemle, tabloya yaz, değerlendir |
| Temel kabul: kuvvet, yön, doğrultu, yer değiştirme bilinir | Yeniden öğretilmez, doğrudan kullanılır |

## Bilimsel doğruluk
| İfade / görsel | Not |
|---|---|
| İş = kuvvet + kuvvet doğrultusunda yer değiştirme (nitel) | W = F·d formülü ve sayısal hesap **verilmedi** (program yalnızca faktörleri ve birimi ister) |
| Duvar itme: iş yok | Yer değiştirme 0 |
| Çantayı aynı yükseklikte taşıma: tutan kuvvet iş yapmaz | Kuvvet düşey, yer değiştirme yatay (dik); sabit süratle yürüme varsayıldı; ifade "çantayı tutan kuvvet" diye sınırlandı |
| 2 m / 4 m → daha çok iş; iş çubukları 1:2 | Aynı kuvvette iş yer değiştirmeyle orantılı; sayı yazılmadı |
| Ağır çantayı aynı yüksekliğe kaldırmak daha büyük kuvvet ister | Sabit süratle kaldırmada kuvvet ≈ ağırlık; ağır çanta kuvvet oku ve iş çubuğu ≈ 2 kat |
| James Prescott Joule (1818–1889), İngiliz | Doğru |
| Çizim ölçeği | 1 m = 150 px (yalnızca şematik) |

## Teknik notlar
- `props.js` → `window.F7E`: 04/05/06'da birebir aynı kopya (başlık/bitiş kartı, zemin, kart, tablo, kuvvet ve yer değiştirme okları, kutu, çanta, top, yaylar, raf, kayıt sayfası, "Sıra sende" + tanıtım). Bazı parçalar films-6/03-bileske-kuvvet/props.js'ten uyarlandı.
- Renk: kuvvet oku kahverengi #8A4A10, yer değiştirme mavi (PAL.water), iş çubukları kehribar; kırmızı kullanılmadı.
- lib/ değişmedi. Konsoldaki tek hata `audio/mix.m4a` bulunamadı (beklenen).
