# 7. sınıf ek kılavuzu (FILM_GUIDE.md'ye ek; çelişki olursa bu dosya geçerli)

- Klasör: `films-7/NN-slug` (index.html yine `../../lib` kullanır; tüm araçlar klasör yoluyla çalışır: `tools/look.sh films-7/NN-slug ...`).
- Program metni: `docs/tymm_7sinif_raw.md`. Ayrı bir "Sınırlamalar" bölümü YOK; sınırlamalar ve güvenlik notları uygulama metninin içindeki cümlelerdedir ("girilmez", "değinilmez", "ile sınırlı", "verilmez", "vurgulanır"...). Her ünitenin sonunda anahtar kelimeyle çıkarılmış yardımcı bir liste var ama asıl olan tam metindir. Kendi çıktılarının bütün metnini dikkatle oku.
- İzleyici 12–13 yaşında. Dil 5. sınıftan bir tık ileri olabilir ama yine kısa ve sade olmalı.
- Zamanlama: `python3 tools/tts.py films-7/NN-slug --silent --wps=2.0`
- Bazı filmler iki ya da üç öğrenme çıktısını birlikte işler. Her çıktının süreç bileşenlerini ayrı ayrı ve görünür biçimde karşıla. `narration.js` içindeki `outcome` alanına bütün kodları yaz (ör. `FB.7.1.1 · FB.7.1.2`).
- Hedef süre 150–200 sn. **Verimli çalış:** en fazla 3 kontrol turu yap. Her turda tek look.sh çağrısı (en fazla 8 kare) kullan.
- Başlık kartı: "Damla’nın Gözlem Defteri", altında "N · Başlık", altında "Fen Bilimleri · 7. sınıf · Ünite U". Bitiş kartı: "Fen Bilimleri · 7. sınıf · FB kodları · Türkiye Yüzyılı Maarif Modeli" ve "Hazırlayan: Hakan Ataş".
- Sonraki film tanıtımı aşağıdaki listeye göre yapılır. 23. filmin tanıtımı: "Sıradaki: 8. sınıf · Mevsimler ve İklim".
- 5. sınıf filmlerinde (`films/`) hazır çizimler var: Güneş, Dünya, Ay, evreler, dinamometre, devre sembolleri, hücre, ışık ışınları, tanecik modelleri. Gerekirse o filmlerin props.js dosyalarından kendi `props.js` dosyana kopyala. Başka klasörleri değiştirme.
- Hassas konular (sindirim, boşaltım, kan bağışı): ders kitabı üslubunda şematik, sade ve saygılı organ diyagramları çiz; ürkütücü ya da kanlı görsel kullanma. Kan bağışı yaşa bağlı koşullarıyla programdaki kadar anlatılır.

## 7. sınıf film listesi
| # | klasör | çıktılar |
|---|---|---|
| 1 | 01-uzay-teknolojileri | FB.7.1.1 uzay teknolojileri · FB.7.1.2 uzay gözlem araçları modeli |
| 2 | 02-uzay-kirliligi | FB.7.1.3 uzay araştırmalarının yol açabileceği problemler |
| 3 | 03-yildizlar-evren | FB.7.1.4 yıldızların yaşamı · FB.7.1.5 yıldız, galaksi, evren |
| 4 | 04-fiziksel-is | FB.7.2.1 fiziksel iş |
| 5 | 05-kinetik-potansiyel | FB.7.2.2 kinetik ve potansiyel enerji |
| 6 | 06-enerji-korunumu | FB.7.2.3 enerjinin korunumu (tümevarım) |
| 7 | 07-sindirim | FB.7.3.1 sindirim sistemi · FB.7.3.2 sindirim sistemi sağlığı |
| 8 | 08-dolasim | FB.7.3.3 dolaşım sistemi |
| 9 | 09-kan-bagisi-saglik | FB.7.3.4 kan bağışı · FB.7.3.5 dolaşım sistemi sağlığı |
| 10 | 10-solunum | FB.7.3.6 solunum sistemi · FB.7.3.7 solunum sistemi sağlığı |
| 11 | 11-bosaltim | FB.7.3.8 boşaltım sistemi · FB.7.3.9 boşaltım sistemi sağlığı |
| 12 | 12-kirilma | FB.7.4.1 ışığın kırılması |
| 13 | 13-mercekler | FB.7.4.2 mercek çeşitleri · FB.7.4.3 merceklerin kullanım alanları |
| 14 | 14-atom | FB.7.5.1 atomun yapısı · FB.7.5.2 atom modellerinin tarihi |
| 15 | 15-element-bilesik | FB.7.5.3 molekül modelleri · FB.7.5.4 element ve bileşik |
| 16 | 16-ilk-18-element | FB.7.5.5 ilk 18 elementin sembolleri · FB.7.5.6 grup ve periyot |
| 17 | 17-bilesik-formulleri | FB.7.5.7 bileşik formülleri |
| 18 | 18-karisimlar | FB.7.5.8 homojen ve heterojen karışımlar · FB.7.5.9 çözünme hızı (hipotez) |
| 19 | 19-karisim-ayirma | FB.7.5.10 karışımları ayırma deneyleri |
| 20 | 20-elektriklenme | FB.7.6.1 elektriklenme hakkında bilgi toplama · FB.7.6.2 elektriklenme çeşitleri deneyi |
| 21 | 21-elektrik-yukleri | FB.7.6.3 elektrik yüklerini sınıflandırma |
| 22 | 22-besin-zinciri | FB.7.7.1 besin zinciri |
| 23 | 23-kaynak-tasarrufu | FB.7.7.2 kaynakların tasarruflu kullanımı |
