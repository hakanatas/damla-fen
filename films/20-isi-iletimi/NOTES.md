# 20 · Isıyı İleten, İletmeyen — FB.5.5.5

**Çıktı:** Maddeleri ısı iletimi bakımından sınıflandırabilme
**Süre:** ≈ 177 sn (sessiz sürüm, `timing.js`) · 8 sahne · 22 beat

## Sahne planı
| # | Sahne (dosya) | Beat'ler | Ne öğretiyor |
|---|---|---|---|
| 1 | İki kaşık (`s1-kasiklar.js`) | title, hello, question | Sıcak çorbadaki metal ve tahta kaşık; metalin sapı ısınır (renk + titreşim), tahtanınki pek ısınmaz → soru |
| 2 | Güvenlik (`s2-guvenlik.js`) | safety | Kırmızı kart: sıcak kaşık/tencereye dokunma, sıcak suyu yalnızca yetişkin kullanır, ısı kaynağı yanında oyun yok |
| 3 | Isı iletimi (`s3-iletim.js`) | conduct, define | Tanecik modeli: ısı sıcak uçtan soğuk uca tanecikten taneciğe aktarılır; metal çubuk hızlı ısınır (ısı iletkeni), tahta yavaş (ısı yalıtkanı) — nitelikleri belirleme |
| 4 | Boncuk deneyi (`s4-deney.js`) | setup, predict, watch, result | Sıcak suya konan metal kaşık, bakır çubuk, tahta çubuk, plastik kaşık; uçlarda tereyağı + boncuk. Önce tahmin, sonra gözlem; metallerdeki boncuklar düşer (aynı anda), diğerleri durur → kanıt kartı |
| 5 | Sınıflandırma (`s5-siniflandir.js`) | sort, metals, insul, air, pot, pot2 | 9 eşya iki kutuya ayrıştırılır/gruplandırılır: ISI İLETKENİ (metal kaşık, bakır tel, alüminyum folyo, demir çivi) · ISI YALITKANI (tahta kaşık, plastik spatula, yün eldiven, mantar nihale, hava). Yün liflerinde hapsolan hava (büyüteç). Etiketleme: tencere gövdesi metal = iletken, sapı plastik = yalıtkan |
| 6 | Binalar ve tasarruf (`s6-binalar.js`) | home, economy | Kışın yalıtımsız ve yalıtımlı ev kesiti; ısı akışı okları (çok/kalın ↔ az/ince); "ısı yalıtkanı malzeme" (tür adı yok); yakıt göstergesi; aile bütçesi + ülke ekonomisi |
| 7 | Kaydet + Sıradaki (`s7-kaydet.js`) | record, yourturn, next, end | Gözlem defteri; "Sıra sende": evdeki eşyalar için iki sütunlu boş tablo; sonraki film (ayakkabı kutusu ev modeli + termometre); bitiş kartı |

## TYMM uyumu
| Süreç bileşeni / uygulama | Filmde |
|---|---|
| Açık uçlu soru, günlük yaşam | S1 iki kaşık |
| a) Niteliklerini belirler | S3 tanecik modeli, iletken/yalıtkan tanımı; S4 kanıt kartı |
| b) Isı iletkeni veya yalıtkanı olarak ayrıştırır | S4 boncuk deneyi, S5 eşyaların ayrılması |
| c) Gruplandırır | S5 iki kutu |
| ç) Etiketler | S5 kutu başlıkları + tencere gövde/sap etiketleri (günlük yaşamdan örnek olay, KB2.9) |
| "Demir, bakır, alüminyum … kendi içinde karşılaştırma yapılmadan örnek olarak verilebilir" | Metaller yalnızca örnek; deneyde metal kaşık ile bakır çubuğun boncukları **aynı anda** düşer, sıralama yapılmaz |
| "Bina ısı yalıtım malzemesi türlerine değinilmez" | S6'da yalnızca "ısı yalıtkanı malzeme" etiketi; tür adı yok |
| Aile ekonomisi ve ülke varlıklarının tasarruflu kullanımı | S6 tasarruf kartı: aile bütçesi, ülke ekonomisi |
| Güvenlik | S2 kırmızı kart; S7 defterde "Sıcak cisimlere asla dokunma!" |

## Bilimsel doğruluk kontrolü
| İfade | Not |
|---|---|
| Isı iletimi: tanecikten taneciğe aktarım | 5. sınıf tanecik modeline uygun sadeleştirme (metallerde serbest elektron katkısına girilmedi) ✔ |
| Metaller iyi iletken; tahta, plastik, yün, mantar, hava kötü iletken | ✔ |
| Tahta çubuk "hiç" değil "çok yavaş" ısınır | Model çubukta tahtanın ısı cephesi ~%20'ye kadar ilerler; kartta "çok yavaş ilerledi" ✔ |
| Yün, lifleri arasındaki havayı tuttuğu için vücut ısısını korur | "ısıtır" denmedi; "ısısını korur" ✔ |
| Yalıtım ısı akışını yavaşlatır | "ısı duvarlardan daha yavaş geçer"; yalıtımlı evde de ince ok var (sıfır değil) ✔ |
| Renk kodu | ısı #B5553F/kehribar; madde mavi; kırmızı yalnızca güvenlik ve "SICAK!" |

## Bilinen notlar
- Art arda anahtar kavram etiketleri ~1 sn üst üste biner (lib/engine.js davranışı).
- `audio/mix.m4a` yok (sessiz sürüm) → konsolda tek ERR_FILE_NOT_FOUND.
