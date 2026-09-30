# Damla'nın Gözlem Defteri

**Türkiye Yüzyılı Maarif Modeli Fen Bilimleri dersi için prosedürel mürekkep animasyonları**

Damla, meraklı bir su damlası. Saydam gövdesinin içinde tanecikleri görünüyor. Her bölümde bir soru soruyor, doğru araçları seçiyor, bilgi topluyor, bulduklarını doğrulayıp gözlem defterine kaydediyor. Böylece öğrenciler konuyu öğrenirken bilimsel sorgulamanın adımlarını da görüyor.

Filmin tüm karelerini JavaScript + Canvas 2D kodu çiziyor. Harici görsel, video ya da yapay zekâ görsel üretimi kullanılmadı.

## Bölümler

| # | Film | Sınıf · Ünite | Öğrenme çıktısı | Süre |
|---|------|---------------|-----------------|------|
| 1 | Gökyüzündeki Komşumuz: Güneş | 5 · Ünite 1 | FB.5.1.1 | ≈ 4:35 (sessiz, altyazılı) |

## Öğretmen sayfası ve öğrenci bağlantıları (GitHub Pages)

Depo GitHub Pages ile yayınlandığında (Settings → Pages → *Deploy from a branch*, `main`, `/ (root)`):

| Sayfa | Kime | Ne işe yarar |
|---|---|---|
| `ogretmen-cd3e6a91e7.html` | Yalnızca öğretmen | 5–8. sınıf filmleri; sınıf ve ünite sırasıyla, önizleme görseli, kazanım metni, arama; her film için öğrenci bağlantısını kopyalama ve sayfada önizleme |
| `films…/<film>/` | Öğrenci | Yalnızca o filmi oynatır, başka filmlere bağlantı yoktur |
| `index.html` | Herkes | Boş kapak sayfası; film listesi içermez |

Öğretmen bağlantısı: `https://hakanatas.github.io/damla-fen/ogretmen-cd3e6a91e7.html`

- Film listesi `docs/catalog.json` dosyasından okunur. Kazanım metinleri ve ünite adları `docs/kazanimlar.json` dosyasındadır (`python3 tools/kazanimlar.py` program metinlerinden üretir).
- Yeni film ekledikten sonra önizleme görselini üretin: `npm run preview` açıkken `node tools/thumbs.js` (yalnızca eksik görselleri üretir → `img/filmler/`).
- Sayfalar arama motorlarına kapalıdır (`robots.txt`, `noindex`) ve siteden öğretmen sayfasına bağlantı yoktur.
  Ancak depo herkese açık olduğu için dosya adı GitHub'da görülebilir; bu "bağlantıyı bilen görür" düzeyinde bir gizliliktir.
  Bağlantı yayılırsa dosyayı yeni bir rastgele adla yeniden adlandırın; öğrenci bağlantıları etkilenmez.

## Çalıştırma

```bash
npm install                                     # playwright
pip install edge-tts numpy --break-system-packages

python3 tools/tts.py   films/01-gunes --silent  # SESSİZ sürüm: süreler 5. sınıf okuma hızına göre (≈1,7 kelime/sn)
# python3 tools/tts.py films/01-gunes           # (isteğe bağlı) yapay seslendirme ile zamanlama
python3 tools/audio.py films/01-gunes           # seslendirme + fon müziği → audio/mix.m4a
node tools/export.js   films/01-gunes --captions=on    # altyazılı MP4 (öğrenci sürümü)
node tools/export.js   films/01-gunes --captions=off   # altyazısız MP4 (öğretmen kendi sesiyle anlatabilir)
```

**Önizleme:** Klasörü herhangi bir yerel sunucuyla açın (`npx http-server .`), ardından `films/01-gunes/index.html` sayfasına girin. Önizlemede şunlar var: oynat/duraklat, sahne işaretli zaman çubuğu, sahneye atlama, 0,25×–2× hız, altyazıyı açıp kapatma, ses. O an hangi sahnenin ve kavramın işlendiği de ekranda görünür. Boşluk tuşu oynatır, ← → tuşları 2 sn atlar.

**Sessiz sürüm:** Film seslendirmesiz, yalnızca altyazılı ve fon müzikli. Öğretmen isterse derste kendisi anlatır; `.srt` dosyası konuşma metni olarak da kullanılabilir. Altyazıların ekranda kalma süresi 5. sınıf okuma hızına göre ayarlandı.

## Mimari

```
lib/ink.js       mürekkep fırçası, sulu boya, kâğıt dokusu, çizgi titreşimi (seeded)
lib/damla.js     Damla karakter rig'i (ifadeler, göz kırpma, konuşma, kollar/IK, haller: buz/su/buhar)
lib/props.js     Güneş, Dünya, Ay, manzara, defter, ikonlar, el yazısı açılışı
lib/engine.js    ana zaman çizelgesi, kamera, mürekkep lekesi geçişi, anahtar kavram etiketi, altyazı
films/01-gunes/
  narration.js   TEK düzenlenebilir metin kaynağı (cümleler, anahtar kavramlar, boşluklar)
  timing.js      tts.py tarafından üretilir — sahneler zamanlamayı buradan alır
  scenes/*.js    sahne modülleri (başlangıç/bitiş = anlatım cümleleri)
  01-gunes.srt   altyazı
```

- Her kare zamanın saf bir fonksiyonu: `E.renderFrame(ctx, t)`. Rastgelelik tohumlu (seeded), önceki karelere bağımlılık yok.
- Metni değiştirmek için `narration.js` dosyasını düzenleyin, sonra `tts.py` → `audio.py` → `export.js` sırasıyla çalıştırın. Sahneler yeni sürelere kendiliğinden uyar.
- Renk kodu her filmde aynı. **Mürekkep:** çizgi ve karakter. **Su mavisi:** su ve madde. **Kehribar:** ışık ve enerji. **Yosun yeşili:** canlılar. **Kırmızı:** yalnızca güvenlik uyarıları.

## Film 1 · Maarif Modeli uyumu (tymm.meb.gov.tr, 5. sınıf, 1. ünite)

| Program öğesi | Filmde karşılığı |
|---|---|
| FB.5.1.1 süreç bileşeni: bilgiye ulaşmak için araç belirler | Sahne 4: kütüphane, güvenilir dijital kaynaklar, gözlemevi (güneş filtreli teleskop), uzay araçları |
| … araçları kullanarak bilgi bulur | Sahne 5–7: yapı, büyüklük ve dönme bulguları |
| … bulduğu bilgileri doğrular | Sahne 4: internetteki yanlış iddia, bilimsel kaynak ve öğretmenle kontrol edilir |
| … bilgileri kaydeder | Sahne 8: gözlem defterine kayıt (günlük / bilgi notu) |
| Öğrenme-öğretme: öğrenciler merak ettikleri soruları sorar | Sahne 2: üç soru balonu (sıcaklık, büyüklük, dönme) |
| Güneş'in gazlardan ve katmanlardan oluştuğuna değinilir | Sahne 5: sıcak gazlar (H, He) ve katman kesiti |
| Köprü kurma: Dünya'nın katmanları ↔ Güneş'in katmanları | Sahne 5: Dünya kesiti (yer kabuğu, manto, çekirdek) ile Güneş kesiti yan yana |
| Farklı büyüklükteki cisimlerle büyüklük çıkarımı | Sahne 6: basketbol topu / toplu iğne başı |
| Güneş lekelerini fark edip dönme yönünü keşfetme | Sahne 7: 1., 3., 5. ve 7. gün fotoğraflarında lekelerin kayması |
| Ön bilgi: saatin dönme yönü | Sahne 7: saat yönü ile Güneş'in dönme yönü karşılaştırılır |
| Güvenlik: doğrudan ya da filtresiz dürbün, teleskop, mercekle bakılmaz | Sahne 3: "DUR!" uyarısı ve merceğin ışığı toplaması |
| Dijital okuryazarlık, gerçeği arama eğilimi | Sahne 4: kaynak güvenilirliği |
| Zenginleştirme: Battani ve Fergani araştırması | Sahne 8: araştırma görevi |

## Bilimsel doğruluk kontrolü

| Ekrandaki ifade | Gerçek değer / not |
|---|---|
| Güneş bir yıldızdır, ısıyı ve ışığı kendisi üretir | Doğru (çekirdekte hidrojen, helyuma dönüşür) |
| Çok sıcak gazlardan oluşur; en çok hidrojen ve helyum | Kütlece ≈ %73 H, ≈ %25 He (plazma hâlinde; 5. sınıf düzeyinde "sıcak gaz") |
| Çekirdek ≈ 15 milyon °C | ≈ 15,7 milyon K |
| Görünen yüzey (fotosfer) ≈ 5500 °C | ≈ 5772 K ≈ 5500 °C |
| Çapı Dünya'nınkinin ≈ 109 katı | 1 392 000 km / 12 742 km ≈ 109 |
| İçine ≈ 1,3 milyon Dünya sığar | 109³ ≈ 1,3 milyon (hacim oranı) |
| Basketbol topu ↔ toplu iğne başı | 24 cm / 109 ≈ 2,2 mm |
| Uzaklık ≈ 150 milyon km | 1 AB = 149,6 milyon km. Çizimin ölçekli olmadığı ekranda belirtiliyor. |
| Güneş lekeleri çevresinden daha soğuk, bu yüzden koyu | ≈ 3500–4500 K, fotosferden daha soğuk |
| Kuzeyden bakınca saat yönünün tersine döner | Doğru (Dünya'nın dönme yönüyle aynı) |
| Bir tur ≈ 25 gün | Ekvatorda ≈ 25 gün (kutuplara doğru ≈ 35 gün) |
| Lekeler Dünya'dan bakınca soldan sağa kayar | Kuzey yukarıdayken, saat yönünün tersine dönüşle tutarlı |
| Mercek ışığı bir noktada toplar | Doğru. Filtresiz optik alet göze kalıcı hasar verebilir. |

## Lisans

CC BY-NC 4.0: Atıf vermek koşuluyla ticari olmayan amaçlarla kullanılabilir. © Hakan Ataş
