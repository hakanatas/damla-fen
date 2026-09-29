# 7. sınıf Film 6 · Enerji Kaybolur mu? Enerjinin Korunumu — FB.7.2.3

**Çıktı:** FB.7.2.3 Enerji dönüşümünden hareketle enerjinin korunduğuna tümevarımsal akıl yürütebilme · Ünite 2 · süre ≈ 175,3 sn (sessiz, altyazılı, `--wps=2.0`)

## Sahne planı
| # | Sahne (dosya) | Beat'ler | Öğrettiği |
|---|---|---|---|
| 1 | Merak (`s1-merak.js`) | title, hello, question, plan | Basit sarkaç; uçlarda en yavaş, altta en hızlı; plan: 4 gözlem → örüntü → genelleme (tümevarım) |
| 2 | Sarkaç (`s2-sarkac.js`) | p-top, p-bottom, p-up | Yavaş çekim sarkaç; nitel enerji çubukları (potansiyel, kinetik, toplam) |
| 3 | Serbest düşme / sarmal yay (`s3-dusme-yay.js`) | fall, spring | Eşit zaman aralıklı konumlar (stroboskop); yay: esneklik PE → kinetik → çekim PE |
| 4 | Hız treni (`s4-tren.js`) | coaster, pattern, pattern2 | Eğik düzlem/hız treni; iz noktaları eşit zaman aralıklı; örüntü kartı |
| 5 | Sürtünme (`s5-surtunme.js`) | stop, friction, rub, neglect | Sönümlenen sarkaç: mekanik enerjinin bir kısmı ısıya (bağlantı yeri + hava); eller sürtünce ısınır, ısı çevreye yayılır; sürtünme ihmal edilince hep aynı yükseklik |
| 6 | Genelleme (`s6-genelleme.js`) | general, total | 4 gözlem → örüntü → genelleme kartı; toplam çubuğu sabit kalırken bileşimi değişir |
| 7 | Kaydet + Sıra sende + Sıradaki (`s7-kaydet.js`) | record, task, next, end | 5 maddelik defter · balık kılçığı diyagramı görevi (+ tarafsız akran değerlendirmesi, D1.2) · Ünite 3 sindirim tanıtımı |

## Maarif (TYMM) uyumu
| TYMM ögesi | Filmde |
|---|---|
| Sarkaç, serbest düşme, sarmal yay, eğik düzlem gözlemleri | S2–S4 (dördü de) |
| a) Kinetik ↔ potansiyel dönüşümüne yönelik örüntü bulur (yükseklik, kütle, hız gözlemleri) | S4 örüntü kartı: yükseklik ↓ → sürat ↑, yükseklik ↑ → sürat ↓ |
| b) Enerjinin korunumuna yönelik genelleme (yok olmaz, türden türe dönüşür, korunur) | S6 |
| Sürtünmenin olumsuz etkisi vurgulanır; bazı durumlarda ihmal edilebilir | S5 (ısıya dönüşüm, hareket için kullanılamaz; ihmal sahnesi) |
| **Sınırlama:** dönüşümlerle ilgili matematiksel bağlantılara girilmez | Hiç formül/sayı yok; çubuklar "enerji (nitel)" başlıklı, ölçeksiz |
| Performans görevi: balık kılçığı diyagramı; tarafsızlık (D1.2) | S7 "Sıra sende" + küçük kılçık şeması |
| Anahtar kavram "ısı" | S5 (yalnızca sürtünmenin sonucu olarak) |

## Bilimsel doğruluk
| İfade / görsel | Not |
|---|---|
| Sarkaç çubukları | PE ∝ 1−cosθ (en alçak noktaya göre), KE = kalan; sürtünmesiz durumda toplam sabit |
| Sönüm | Genlik üstel azalır; mekanik enerji 1−cos(genlik) ile, ısı = kalan; toplam çubuğu hep dolu |
| Serbest düşme konumları | y ∝ t² (eşit zaman aralıkları) |
| Yay | Sıkıştırırken esneklik PE artar (Damla iş yapar); bırakınca kinetik, tepe noktasında çekim PE |
| Hız treni | Vagon hızı v = √(2g·Δh + v0²) ile hesaplanan zaman tablosundan (enerji korunumu, sürtünmesiz) — iz noktaları altta seyrek, tepede sık |
| "Sürtünme enerjinin bir kısmını ısıya dönüştürür" | Doğru (çok küçük ses payı anılmadı; program ısıyı vurgular) |
| "Sürtünme ihmal edilirse top hep aynı yüksekliğe çıkar" | İdeal durum olarak açıkça belirtildi |

## Teknik notlar
- `props.js` (F7E) Film 4/5 ile aynı; filme özel çizimler `scenes/s0-art.js` → `window.F76` (sarkaç ve askı, genel enerji çubukları, hız treni rayı/vagon ve zaman tablosu).
- Renk: potansiyel #8A4A10, kinetik #E3A03A, ısı #B5553F, esneklik PE taralı koyu kahve.
- lib/ değişmedi. Konsoldaki tek hata `audio/mix.m4a` (beklenen).
