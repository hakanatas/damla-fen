# 6. sınıf ek kılavuzu (FILM_GUIDE.md'ye ek; çelişki olursa bu dosya geçerli)

- Klasör: `films-6/NN-slug` (index.html yine `../../lib` kullanır; tüm araçlar klasör yoluyla çalışır: `tools/look.sh films-6/NN-slug ...`).
- Program metni: `docs/tymm_6sinif_raw.md`. Ayrı bir "Sınırlamalar" bölümü YOK; sınırlamalar ve güvenlik notları uygulama metninin içindeki cümlelerdedir ("girilmez", "değinilmez", "ile sınırlı", "verilmez", "vurgulanır"...). Her ünitenin sonunda anahtar kelimeyle çıkarılmış yardımcı bir liste var ama asıl olan tam metindir. Kendi çıktılarının bütün metnini dikkatle oku.
- İzleyici 11–12 yaşında. Dil 5. sınıftan bir tık ileri olabilir ama yine kısa ve sade olmalı.
- Zamanlama: `python3 tools/tts.py films-6/NN-slug --silent --wps=1.85`
- Bazı filmler iki ya da üç öğrenme çıktısını birlikte işler. Her çıktının süreç bileşenlerini ayrı ayrı ve görünür biçimde karşıla. `narration.js` içindeki `outcome` alanına bütün kodları yaz (ör. `FB.6.1.1 · FB.6.1.2`).
- Hedef süre 150–200 sn. **Verimli çalış:** en fazla 3 kontrol turu yap. Her turda tek look.sh çağrısı (en fazla 8 kare) kullan.
- Başlık kartı: "Damla’nın Gözlem Defteri", altında "N · Başlık", altında "Fen Bilimleri · 6. sınıf · Ünite U". Bitiş kartı: "Fen Bilimleri · 6. sınıf · FB kodları · Türkiye Yüzyılı Maarif Modeli" ve "Hazırlayan: Hakan Ataş".
- Sonraki film tanıtımı aşağıdaki listeye göre yapılır. 22. filmin tanıtımı: "Sıradaki: 7. sınıf · Uzay Çağı".
- 5. sınıf filmlerinde (`films/`) hazır çizimler var: Güneş, Dünya, Ay, evreler, dinamometre, devre sembolleri, hücre, ışık ışınları, tanecik modelleri. Gerekirse o filmlerin props.js dosyalarından kendi `props.js` dosyana kopyala. Başka klasörleri değiştirme.
- Hassas konu (08-insanda-ureme-ergenlik): yalnızca programın istediği düzeyde kal. Ders kitabı üslubuyla şematik, sade ve saygılı diyagramlar çiz. Çıplak insan figürü çizme; organları basit, etiketli şemalar olarak göster. Ergenliği olumlu, normalleştiren ve kişisel bakım ile sağlığa odaklı bir dille anlat. Programın koyduğu sınırlamalara birebir uy.

## 6. sınıf film listesi
| # | klasör | çıktılar |
|---|---|---|
| 1 | 01-gunes-sistemi | FB.6.1.1 gezegenleri sınıflandırma · FB.6.1.2 Güneş sistemi modeli |
| 2 | 02-tutulmalar | FB.6.1.3 Güneş ve Ay tutulması çıkarımı · FB.6.1.4 tutulma modeli |
| 3 | 03-bileske-kuvvet | FB.6.2.1 bileşke kuvvet · FB.6.2.2 dengelenmiş/dengelenmemiş kuvvet deneyi |
| 4 | 04-surat-hiz | FB.6.2.3 sürat ve hız karşılaştırması |
| 5 | 05-ureme-cesitleri | FB.6.3.1 eşeyli ve eşeysiz üreme |
| 6 | 06-bitkilerde-ureme | FB.6.3.2 bitkilerde üreme, büyüme, gelişme · FB.6.3.3 tohumun çimlenmesi (hipotez) |
| 7 | 07-hayvanlarda-ureme | FB.6.3.4 hayvanlarda üreme, büyüme, gelişme |
| 8 | 08-insanda-ureme-ergenlik | FB.6.3.5 insanda üreme yapı ve organları · FB.6.3.8 ergenlik dönemi değişimleri |
| 9 | 09-sinir-sistemi | FB.6.3.6 sinir sistemi modeli |
| 10 | 10-ic-salgi-bezleri | FB.6.3.7 iç salgı bezleri · FB.6.3.9 denetleyici ve düzenleyici sistemlerin sağlığı |
| 11 | 11-yansima | FB.6.4.1 farklı yüzeylerde yansıma · FB.6.4.2 gelen ışın, yansıyan ışın, normal |
| 12 | 12-aynalar | FB.6.4.3 ayna çeşitleri |
| 13 | 13-sogurma-renkler | FB.6.4.4 soğurma · FB.6.4.5 beyaz ışığın bileşimi · FB.6.4.6 siyah, beyaz ve renkli görünme |
| 14 | 14-gunes-enerjisi | FB.6.4.7 Güneş enerjisi uygulamaları (eleştirel düşünme) |
| 15 | 15-genlesme-buzulme | FB.6.5.1 genleşme ve büzülme |
| 16 | 16-erime-kaynama-noktasi | FB.6.5.2 erime, donma ve kaynama noktası deneyi |
| 17 | 17-yogunluk | FB.6.5.3 yoğunluk hesaplamaları · FB.6.5.4 yoğunluk (tümdengelim) |
| 18 | 18-buz-ve-su | FB.6.5.5 buz ve suyun yoğunluğu, canlılar için önemi · FB.6.5.6 yoğunluk modeli |
| 19 | 19-iletken-yalitkan | FB.6.6.1 elektriksel iletken/yalıtkan deneyi |
| 20 | 20-direnc | FB.6.6.2 ampul parlaklığının değişkenleri · FB.6.6.3 ayarlanabilir direnç |
| 21 | 21-biyocesitlilik | FB.6.7.1 biyoçeşitliliğin önemi · FB.6.7.2 biyoçeşitliliği tehdit eden faktörler |
| 22 | 22-yakitlar-cevre | FB.6.7.3 ısınma amaçlı yakıtların etkileri · FB.6.7.4 bir çevre problemini çözme |
