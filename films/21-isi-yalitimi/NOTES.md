# 21 · Sıcaklığı Koruyan Ev: Isı Yalıtımı — FB.5.5.6

**Çıktı:** Isı yalıtımını gösteren bilimsel model oluşturabilme
**Süre:** ≈ 195 sn (sessiz sürüm, `timing.js`) · 8 sahne · 23 beat

## Sahne planı
| # | Sahne (dosya) | Beat'ler | Ne öğretiyor |
|---|---|---|---|
| 1 | Kış gecesi (`s1-kis.js`) | title, hello, question | Senaryo: kaloriferli evden duvar, pencere ve çatıdan ısı kaçıyor; "Evin sıcaklığını nasıl koruruz?" |
| 2 | Günlük örnekler (`s2-ornekler.js`) | examples, thermos, notheat | Isı akışını yavaşlatan örnekler: termos, mont, kuşların kabarık tüyleri. Termos: çay sıcak, ayran soğuk kalır (iki yön). "Mont ısı üretir" YANLIŞ → "vücut ısısının kaçmasını yavaşlatır" |
| 3 | Güvenlik (`s3-guvenlik.js`) | safety | Kırmızı kart: ılık suyu yetişkin hazırlar, kaynar su yok, makas/maket bıçağı yetişkinle |
| 4 | Model öner (`s4-model.js`) | plan, propose, test1, data1 | Karton kutu ev + ılık su şişesi (= evin ısısı) + termometre; hipotez: duvarları buruşuk gazete kâğıdıyla kaplamak; A/B testi, 5 dakikada bir ölçüm, grafik (örnek veriler): A 40→28 °C, B 40→32 °C |
| 5 | Modeli yenile (`s5-yenile.js`) | compare, evidence, revise, test2 | Ece'nin modeliyle karşılaştırma (35 °C); yeni kanıt: çatı kaplı, aralıklar kapalı; Damla'nın modelinde ısının kaçtığı yerler işaretlenir; yenileme listesi (çatı, bant, çift pencere); v1 32 °C → v2 35 °C |
| 6 | Tüm mevsimler (`s6-mevsimler.js`) | summer, allyear, heritage | Yazın buzlu su testi (yalıtımlı ev daha uzun soğuk kalır); Kış/Yaz paneli: dışarı / içeri ısı geçişi yavaşlar; Harran kümbet evleri (Şanlıurfa): kalın kerpiç duvarlar, yazın içi serin |
| 7 | Kaydet ve paylaş + Sıradaki (`s7-kaydet.js`) | record, share, yourturn, next, end | Defter; üç modelin (Damla, Ece, Can) paylaşılıp karşılaştırılması; "Sıra sende": mühendislik tasarım döngüsü (Sorunu belirle → Tasarla → Yap → Test et → Karşılaştır ve yenile); sonraki film (pil-ampul devresi); bitiş kartı |

## TYMM uyumu
| Süreç bileşeni / uygulama | Filmde |
|---|---|
| Günlük yaşamda ısı akışını yavaşlatan örnekler | S2 termos, mont, kuş tüyleri |
| Bir binanın sıcaklık değerinin korunması senaryosu | S1 kış evi → S4 kutu ev modeli |
| a) Isı yalıtımı ile ilgili model önerir | S4 model + hipotez kartı |
| b) Yeni kanıtlarla modeli yeniler; aynı amaçla geliştirilmiş modelleri karşılaştırır (E3.4) | S5 Ece'nin modeli → yeni kanıt → v2 → yeniden test |
| "Isı yalıtımının tüm mevsimlerde işlevsel olduğu" | S6 yaz testi + kış/yaz paneli |
| Kültürel mirasa ait tarihi yerleri ısı yalıtımı açısından inceleme (KB2.6, D17.2, OB5) | S6 Harran kümbet evleri |
| Mühendislik ve tasarım döngüsü (E3.3) | S7 Sıra sende döngüsü |
| Tasarımları paylaşma (SDB2.1) | S7 paylaş/karşılaştır/yenile |
| "Bina ısı yalıtım malzemesi türlerine değinilmez" | Gerçek bina malzemesi adı verilmedi; modelde yalnızca günlük malzeme (buruşuk gazete kâğıdı, bant) kullanıldı |
| Güvenlik | S3 kırmızı kart; defterde uyarı satırı |

## Bilimsel doğruluk kontrolü
| İfade | Not |
|---|---|
| Yalıtım ısı/soğuk üretmez, ısı akışını yavaşlatır | S2 YANLIŞ/DOĞRU kartı; S6 kış/yaz ✔ |
| Termos iki yönde çalışır | ✔ |
| Buruşuk kâğıt, kabarık tüy, çift pencere: aradaki hava ısıyı iyi iletmez | ✔ (film 20 ile tutarlı) |
| Yalıtımlı modelde de ısı kaybı vardır | İnce oklar ve sıcaklık düşüşü (40→35) gösterilir; sıfır değil ✔ |
| Sıcaklık verileri | "örnek veriler" etiketi; gerçekçi eğilim (oda sıcaklığına yaklaşma), ölçekli değil |
| Harran kümbet evleri kalın kerpiç duvarlarıyla yazın içini serin tutar | Yaygın kabul gören bilgi; "(çizim ölçekli değildir)" ✔ |
| Renk kodu | ısı #B5553F/kehribar; madde/soğuk mavi; kırmızı yalnızca güvenlik ve YANLIŞ; yeşil halka yalnızca "iyi örnek" vurgusu |

## Bilinen notlar
- Art arda anahtar kavram etiketleri ~1 sn üst üste biner (lib/engine.js davranışı).
- `audio/mix.m4a` yok (sessiz sürüm) → konsolda tek ERR_FILE_NOT_FOUND.
- "Ece" ve "Can" yalnızca model etiketi olarak geçer (karakter çizilmedi).
