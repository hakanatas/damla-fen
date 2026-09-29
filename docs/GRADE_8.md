# 8. sınıf ek kılavuzu (FILM_GUIDE.md'ye ek; çelişki olursa bu dosya geçerli)

- Klasör: `films-8/NN-slug` (index.html yine `../../lib` kullanır; tüm araçlar klasör yoluyla çalışır: `tools/look.sh films-8/NN-slug ...`).
- Program metni: `docs/tymm_8sinif_raw.md`. Ayrı bir "Sınırlamalar" bölümü YOK; sınırlamalar ve güvenlik notları uygulama metninin içindeki cümlelerdedir ("girilmez", "değinilmez", "ile sınırlı", "verilmez", "vurgulanır"...). Her ünitenin sonunda anahtar kelimeyle çıkarılmış yardımcı bir liste var ama asıl olan tam metindir. Kendi çıktılarının bütün metnini dikkatle oku.
- İzleyici 13–14 yaşında. Dil 5. sınıftan bir tık ileri olabilir ama yine kısa ve sade olmalı.
- Zamanlama: `python3 tools/tts.py films-8/NN-slug --silent --wps=2.1`
- Bazı filmler iki ya da üç öğrenme çıktısını birlikte işler. Her çıktının süreç bileşenlerini ayrı ayrı ve görünür biçimde karşıla. `narration.js` içindeki `outcome` alanına bütün kodları yaz (ör. `FB.8.1.1 · FB.8.1.2`).
- Hedef süre 150–200 sn. **Verimli çalış:** en fazla 3 kontrol turu yap. Her turda tek look.sh çağrısı (en fazla 8 kare) kullan.
- Başlık kartı: "Damla’nın Gözlem Defteri", altında "N · Başlık", altında "Fen Bilimleri · 8. sınıf · Ünite U". Bitiş kartı: "Fen Bilimleri · 8. sınıf · FB kodları · Türkiye Yüzyılı Maarif Modeli" ve "Hazırlayan: Hakan Ataş".
- Sonraki film tanıtımı aşağıdaki listeye göre yapılır. 27. film serinin finalidir: 5–8. sınıf yolculuğunun kapanışı; sıcak bir veda, "Damla'nın Gözlem Defteri · son sayfa".
- 5. sınıf filmlerinde (`films/`) hazır çizimler var: Güneş, Dünya, Ay, evreler, dinamometre, devre sembolleri, hücre, ışık ışınları, tanecik modelleri. Gerekirse o filmlerin props.js dosyalarından kendi `props.js` dosyana kopyala. Başka klasörleri değiştirme.
- Hassas konular (akraba evliliği, mutasyon): bilimsel, damgalamayan, saygılı bir dil kullan; bireyleri ya da toplulukları suçlama; programdaki kadarını anlat. Kimya deneylerinde güvenlik kartı zorunludur (asit ve bazların tadına ya da kokusuna bakılmaz, gözlük ve eldiven takılır, deneyler bir yetişkin eşliğinde yapılır).

## 8. sınıf film listesi
| # | klasör | çıktılar |
|---|---|---|
| 1 | 01-mevsimler | FB.8.1.1 dolanma ve eksen eğikliğinin sonuçları (mevsimler) |
| 2 | 02-iklim-hava | FB.8.1.2 iklim ve hava olayları |
| 3 | 03-basit-makineler | FB.8.2.1 basit makineleri sınıflandırma |
| 4 | 04-is-kolayligi-modeli | FB.8.2.2 iş kolaylığı sağlayan model |
| 5 | 05-dna | FB.8.3.1 nükleotid, gen, DNA, kromozom · FB.8.3.2 DNA modeli |
| 6 | 06-mitoz-mayoz | FB.8.3.3 mitoz ve mayoz |
| 7 | 07-kalitim | FB.8.3.4 kalıtım kavramları · FB.8.3.5 tek karakter çaprazlamaları |
| 8 | 08-mutasyon-akraba | FB.8.3.6 akraba evliliği · FB.8.3.7 mutasyon |
| 9 | 09-adaptasyon | FB.8.3.8 çevreye uyum |
| 10 | 10-sesin-olusumu | FB.8.4.1 sesin oluşumu · FB.8.4.2 sesin yayıldığı ortamlar |
| 11 | 11-ses-ozellikleri | FB.8.4.3 frekans (ince/kalın ses) · FB.8.4.4 ses değişkenlerinin işitmeye etkisi |
| 12 | 12-ses-yalitimi | FB.8.4.5 iletim, yansıma, soğurma · FB.8.4.6 ses kirliliği önlemleri |
| 13 | 13-periyodik-tablo | FB.8.5.1 metal, ametal, yarımetal, soy gaz |
| 14 | 14-kimyasal-degisim | FB.8.5.2 fiziksel ve kimyasal değişim · FB.8.5.3 kimyasal tepkimeler |
| 15 | 15-tepkimeler-yasam | FB.8.5.4 tepkimelerin günlük yaşamdaki etkileri |
| 16 | 16-asit-baz | FB.8.5.5 asit ve baz özellikleri · FB.8.5.6 ayıraçlar |
| 17 | 17-ph | FB.8.5.7 pH · FB.8.5.8 asit ve bazların maddelere etkisi (deney) |
| 18 | 18-seri-paralel | FB.8.6.1 seri/paralel bağlı ampullerin parlaklığı |
| 19 | 19-akim-gerilim | FB.8.6.2 akım · FB.8.6.3 gerilim · FB.8.6.4 akım-gerilim ilişkisi |
| 20 | 20-aydinlatma-modeli | FB.8.6.5 aydınlatma aracı modeli |
| 21 | 21-enerji-donusumu | FB.8.6.6 · FB.8.6.7 elektrik enerjisinin dönüşümleri |
| 22 | 22-santraller | FB.8.6.8 · FB.8.6.9 santraller, avantaj ve dezavantajları |
| 23 | 23-elektrik-tasarrufu | FB.8.6.10 elektriğin tasarruflu kullanımı |
| 24 | 24-fotosentez | FB.8.7.1 fotosentez · FB.8.7.2 fotosentez hızı (hipotez) |
| 25 | 25-solunum | FB.8.7.3 solunum (canlılarda enerji dönüşümü) |
| 26 | 26-madde-donguleri | FB.8.7.4 · FB.8.7.5 madde döngüleri |
| 27 | 27-iklim-degisikligi | FB.8.7.6 küresel iklim değişikliği · FB.8.7.7 ülkemizde iklim kaynaklı bir problemi çözme |
