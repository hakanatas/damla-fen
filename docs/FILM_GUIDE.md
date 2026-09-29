# Damla'nın Gözlem Defteri — Film Yapım Kılavuzu (ajanlar için)

Bu seri, Türkiye Yüzyılı Maarif Modeli (TYMM) **5. sınıf Fen Bilimleri** programının her öğrenme çıktısı için bir kısa animasyon filmidir. Filmleri **ortaokul öğrencileri (10–11 yaş) sınıfta izleyecek.** Her film:
- tek bir öğrenme çıktısını (FB.5.x.y) ve onun **süreç bileşenlerini** adım adım işler,
- TYMM'deki öğrenme-öğretme uygulamalarını, vurguları, **sınırlamaları** ve güvenlik uyarılarını birebir dikkate alır (program metni: `docs/tymm_5sinif_raw.md`),
- **SESSİZDİR**: seslendirme yok. Damla'nın cümleleri altyazı olarak görünür, arkada yumuşak fon müziği çalar. Bu yüzden anlatım cümleleri kısa, sade ve okunabilir olmalıdır.
- 2:30–3:30 dakika uzunluğundadır.

Referans film: `films/01-gunes` (FB.5.1.1). Bitmiş, onaylanmış bir örnek. Önce onun `narration.js` ve `scenes/*.js` dosyalarını okuyup kalıbı öğren.

## Karakter ve stil (değişmez)
- **Damla**: meraklı bir su damlası, küçük bir bilim insanı. Saydam mavi gövdesinde tanecikler görünür. Gözlem gözlüğü, büyüteç ve gözlem defteri kullanır.
- **Stil**: "Gözlem Defteri". Sıcak kâğıt dokusu, titrek mürekkep çizgileri, sulu boya lekeleri, el yazısı etiketler (Kalam). Başlık kartlarında Fraunces kullanılır.
- **Renk kodu** (anlamlıdır, bozma): mürekkep `PAL.ink` çizgi ve karakter · su mavisi `PAL.water` su ve madde · kehribar `PAL.light` (#E3A03A, koyu tonu #C07F1E) ışık, enerji, ısı · yosun yeşili `PAL.life` canlılar · kırmızı `#A23A2A` **yalnızca** güvenlik uyarıları ve "YANLIŞ" işaretleri · sıcaklık/ısı vurgusu için `#B5553F` kullanılabilir.
- Jenerik "teknoloji grafiği" estetiği, neon, robot ve mavi devre görselleri kullanma. Her şey elle çizilmiş defter ve mürekkep dünyası içinde kalmalı.

## Öğretim ilkeleri
1. **Sorgulama akışı**: merak ve soru → (gerekirse güvenlik) → gözlem, deney ya da araç seçimi → veri ve kanıt → çıkarım veya genelleme → gözlem defterine kaydetme → "Sıra sende!" (öğrenciye görev veya soru) → sonraki filmin tanıtımı → bitiş kartı.
2. Süreç bileşenlerinin fiilleri (sınıflandırır, karşılaştırır, ölçer, model önerir, yeniler, hipotez kurar, genelleme yapar...) ekranda **görünür biçimde** yapılmalı. Örneğin "karşılaştırma" için iki sütunlu tablo doldurulmalı, "model" için Damla model önerip yeni kanıtla revize etmeli.
3. Öğrencinin kendisinin yapacağı performans görevlerini (dinamometre modeli, Ay gözlemi, devre deneyi, atık yönetimi...) film **yapmaz, özendirir**. Damla örnek bir süreç gösterir, sonunda "Sıra sende" kartı açık uçlu bir görev verir.
4. **Doğruluk**: Her sayı, terim ve görsel metafor bilimsel olarak doğru olmalı. Emin olmadığın bir sayıyı kullanma. Ölçekli olmayan çizimlerde "(çizim ölçekli değildir)" yaz. Yaygın kavram yanılgılarını düzelt ama yenisini üretme.
5. **TYMM sınırlamaları kesindir.** Örnekler: Güneş katman isimleri verilmez · kütle ve ağırlık yalnızca Dünya ve Ay ile sınırlıdır · "kütle çekim kuvveti" kavramına girilmez, "yer çekimi" denir. Her ünitenin sınırlamalarını `docs/tymm_5sinif_raw.md` içinden oku ve uy.
6. Dil: doğru Türkçe yazım ve imla (ğ, ş, ı, İ, ç, ö, ü; kesme işareti `’` ya da `'`). Cümleler kısa olmalı (en fazla 18–20 kelime). Hitap samimi ama bilimsel; Damla birinci tekil şahısla konuşur ("Hadi birlikte bakalım!").
7. Güvenlik gerektiren konularda (ısı, elektrik, keskin ya da sıcak malzemeler) kırmızı uyarı kartı ve "bir yetişkin eşliğinde" vurgusu olmalı. Örnek: elektrik → prizle oynanmaz, yalnızca pil kullanılır.

## Teknik yapı
```
lib/ink.js     INK: PAL, rng, noiseFn, paper, wobble, stroke, line, dashed, wash, circlePts, inkDot, splash, label, arrowHead, leader, hatch
lib/damla.js   DAMLA.draw(ctx, opts), DAMLA.lensProp/notebookProp/pencilProp, DAMLA.edgeX
lib/props.js   P: path, fillPts, partial, drawOn, arc, bez, write(el yazısı açılışı), pop, sun, sunspot, earth, moon,
               hillLine, hillY, landscape, notebook, bubble, check, cross, arrow,
               icon.{books, laptop, observatory, probe, binoculars, telescope, magnifier, eye, pencil, calendar, clock}
lib/engine.js  E: clamp, lerp, mix, ease{io,out,in,back,sine}, seg, se, B, s, e, blink, breath, talk, walk,
               cam, camLerp, layer, inkText, scene, renderFrame   (1920×1080, 30 fps)
films/NN-slug/
  narration.js   beats (TEK metin kaynağı)
  timing.js      ÜRETİLİR: python3 tools/tts.py films/NN-slug --silent
  scenes/sN-*.js sahneler (dosya adına göre sıralı yüklenir)
  props.js       (isteğe bağlı) bu filme özel çizim yardımcıları → global bir ad altında, ör. window.F05 = {...}
  index.html     ÜRETİLİR: tools/build-index.sh films/NN-slug
  NOTES.md       Maarif uyum tablosu + bilimsel doğruluk tablosu (README'ye eklenecek)
```

### narration.js
Kalıbı `films/01-gunes/narration.js` dosyasından kopyala. `film`, `title`, `outcome` alanlarını doldur. Her beat şu alanlardan oluşur:
- `{ id, text, key?, min?, pad? }`
- `text`: Damla'nın cümlesi, ekranda altyazı olarak görünür. Boş bırakılırsa sessiz görsel an olur; o zaman `min` saniye ver.
- `key`: sol üstte beliren anahtar kavram etiketi (1–4 kelime, TYMM anahtar kavramları).
- Süre sessiz modda otomatik hesaplanır: `kelime/1.7 + 1 sn`. Buna `pad` eklenir; `min` bir alt sınırdır. Görsel olarak uzun bir anim gereken beat'lere `min` ver.
- İlk beat `{ id: 'title', min: 5.5, pad: 0, text: '' }` olmalı, son beat `{ id: 'end', min: 5, pad: 0, text: '' }`.
- Toplam süre hedefi 150–210 sn. Kabaca 18–26 beat.

### Sahneler
```js
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  E.scene({
    name: 'Kısa ad', concept: 'Kavram', from: 'ilkBeatId', to: 'sonBeatId',
    tr: 1.1,            // mürekkep lekesi geçiş süresi (0.01 → neredeyse kesme; aynı mekân devam ediyorsa)
    trFrom: [960, 540], // geçiş lekesinin çıktığı nokta
    draw(ctx, t) {      // t = MUTLAK film zamanı (sn). Her şey t'nin saf fonksiyonu olmalı; durum tutma.
      const s1 = E.s('beatId');                       // beat başlangıcı
      const k = E.se(t, s1 + 0.5, s1 + 1.5, 'out');   // 0..1 yumuşatılmış ilerleme
      ctx.save(); E.cam(ctx, { x: 960, y: 540, z: 1 }); /* dünya çizimi */ ctx.restore();
      // ekran-uzayı yazılar kameradan sonra
    }
  });
})();
```
- Sahneler beat'leri sırayla ve boşluksuz kapsamalı (bir sahnenin `to`'su ile sonrakinin `from`'u ardışık olmalı).
- Kâğıt zeminini motor çizer. Sahne yalnızca kendi içeriğini çizer.
- **Solma ve geçişler için `E.layer(ctx, alpha, c => {...})` kullan.** Ink yardımcıları globalAlpha'yı çarpar ama DAMLA.draw'ın bazı parçaları mutlak alpha kullanır. Damla'yı ya da karmaşık grupları soldururken mutlaka `E.layer` kullan.
- **Yasak bölgeler**:
  - Sol üst (x < 720, y < 150): anahtar kavram etiketi burada çıkar.
  - Alt şerit (y > 925): altyazı şeridi (1–2 satır, 50px) burada. Önemli içerik y ≈ 150–900 arasında kalsın.
- Yazı boyutları: etiketler ≥ 34px, önemli kavramlar 46–70px. Metin ekran dışına taşmasın; `ctx.measureText` ile genişliği kontrol et.
- `P.write(ctx, txt, x, y, k, {size, align, color, weight})` el yazısıyla açılan metin çizer (k: 0..1). `E.inkText(ctx, txt, x, y, t, t0, t1, opts)` belirli zaman aralığında solarak gelip giden metin çizer.
- Performans: `ctx.filter` (blur) kullanma. Bir karede yüzlerce `wash` çağırma. Hedef ≤ 150 ms/kare; bu değeri `shots.js` çıktısında görürsün.
- Rastgelelik yalnızca `INK.rng(seed)` ile yapılır (deterministik). `Math.random` yasak.

### DAMLA.draw seçenekleri
`{ x, y, s }`: ayak noktası ve ölçek (s=1 → ~220px boy). Diğer seçenekler:
- `view: 'front'|'q3'|'side'|'back'`, `flip` (sola baksın)
- `expr: 'neutral'|'curious'|'surprised'|'thinking'|'happy'|'determined'|'sad'|'sleepy'`
- `look: [-1..1, -1..1]`, `blink: E.blink(t, seed)` (0..1), `squash: E.breath(t)`, `lean` (radyan)
- `arms: [[side(-1|1), açı(0=aşağı, π=yukarı) | [x,y] yerel hedef, bend], ...]`, `armsBack`, `handR` (açık el)
- `feet: E.walk(faz)` yürüyüş için; gövdeyi de `y` ile hafifçe zıplat
- `prop: 'lens'|'notebook'`, `propTilt`, `hold: (ctx, res) => {...}` (res[1].hand = sağ el yerel koordinatı; eşya çizmek için)
- `state: 'liquid'|'ice'|'vapor'` (maddenin halleri!), `t` (tanecik hareketi; hız artışı için t'yi ölçekle), `seed`, `shadow:false`
- Yerel koordinat: ayak (0,0), göz hizası y≈-128, gövde merkezi y≈-133, tepe y≈-218.

## İş akışı (her film için)
1. `docs/tymm_5sinif_raw.md` içinden kendi çıktının bölümünü oku: süreç bileşenleri, uygulamalar, sınırlamalar.
2. `NOTES.md` içinde bir plan yaz: sahne listesi, her sahnenin öğrettiği şey, TYMM eşleştirmesi, doğruluk kontrolü.
3. `narration.js` yaz → `python3 tools/tts.py films/NN-slug --silent` çalıştır (timing.js ve .srt üretir).
4. Sahneleri yaz → `tools/build-index.sh films/NN-slug` çalıştır.
5. Kontrol: `tools/look.sh films/NN-slug t1 t2 ... t8` (en fazla 8 zaman noktası) → `/tmp/sh-NN-slug/grid.jpg` dosyasını **Read ile aç ve bak**. Her sahneyi ve her geçişi en az bir kez kontrol et. Şunlara bak: taşan veya kesilen metin, altyazıyla çakışma, boş ya da anlamsız kare, üst üste binen etiketler, tutarsız renk kodu, konsol hataları (look.sh "ERR" basar). Düzelt ve tekrar bak. En az 2–3 tur yap.
6. Metni değiştirirsen tts.py'yi yeniden çalıştır. Beat eklersen ya da çıkarırsan sahnelerin `from`/`to` alanlarını güncelle.
7. **MP4 ÜRETME** (export.js çalıştırma). Export'u koordinatör sırayla yapacak.
8. **lib/, tools/ ve başka filmlerin klasörlerini DEĞİŞTİRME.** Ortak kütüphanede hata bulursan geçici çözümü kendi `props.js` dosyana yaz ve raporunda belirt.

## Film listesi (numara · klasör · çıktı)
| # | klasör | çıktı |
|---|---|---|
| 1 | 01-gunes | FB.5.1.1 Güneş'in yapısı ve dönme hareketi (BİTTİ) |
| 2 | 02-ay | FB.5.1.2 Ay'ın özellikleri, dönme ve dolanma hareketleri |
| 3 | 03-ay-evreleri | FB.5.1.3 Ay'ın evreleri modeli |
| 4 | 04-gunes-dunya-ay | FB.5.1.4 Güneş-Dünya-Ay hareketleri ve hacimsel büyüklükleri modeli |
| 5 | 05-kuvvet-olcme | FB.5.2.1 Kuvvetin büyüklüğü, dinamometre, Newton |
| 6 | 06-dinamometre-modeli | FB.5.2.2 Basit araçlarla dinamometre modeli |
| 7 | 07-kutle-agirlik | FB.5.2.3 Kütle ve ağırlık karşılaştırması |
| 8 | 08-surtunme | FB.5.2.4 Sürtünme kuvveti (katı, sıvı, gaz ortamlar) |
| 9 | 09-hucre | FB.5.3.1 Bitki ve hayvan hücresi karşılaştırması |
| 10 | 10-hucreden-organizmaya | FB.5.3.2 Hücre-doku-organ-sistem-organizma |
| 11 | 11-destek-hareket | FB.5.3.3 Destek ve hareket sistemi yapıları |
| 12 | 12-destek-hareket-saglik | FB.5.3.4 Destek ve hareket sisteminin sağlığı |
| 13 | 13-isigin-yayilmasi | FB.5.4.1 Işığın her yönde doğrusal yayılması |
| 14 | 14-isigi-gecirme | FB.5.4.2 Maddelerin ışığı geçirme durumları |
| 15 | 15-tam-golge | FB.5.4.3 Tam gölge |
| 16 | 16-tanecikli-yapi | FB.5.5.1 Maddenin tanecikli, boşluklu, hareketli yapısı |
| 17 | 17-isi-sicaklik | FB.5.5.2 Isı ve sıcaklık |
| 18 | 18-isi-alisverisi | FB.5.5.3 Farklı sıcaklıktaki sıvıların karışımı, ısı alışverişi |
| 19 | 19-hal-degisimi | FB.5.5.4 Isı etkisiyle hâl değişimi |
| 20 | 20-isi-iletimi | FB.5.5.5 Isı iletimi bakımından sınıflandırma |
| 21 | 21-isi-yalitimi | FB.5.5.6 Isı yalıtımı modeli |
| 22 | 22-devre-elemanlari | FB.5.6.1 Devre elemanları ve sembolleri |
| 23 | 23-devre-deneyi | FB.5.6.2 Şemasını çizdiği devreyle deney |
| 24 | 24-ampul-parlakligi | FB.5.6.3 Ampul parlaklığını etkileyen değişkenler (hipotez) |
| 25 | 25-geri-donusum | FB.5.7.1 Evsel atıklar: geri dönüştürülebilen ve dönüştürülemeyen |
| 26 | 26-geri-donusumun-onemi | FB.5.7.2 Kaynakların etkili kullanımı ve geri dönüşümün önemi |
| 27 | 27-atik-yonetimi | FB.5.7.3 Yakın çevrede atık yönetimi |

Başlık kartı: "Damla’nın Gözlem Defteri" (Fraunces), altına "N · Film Başlığı" ve "Fen Bilimleri · 5. sınıf · Ünite U". Bitiş kartı 01-gunes ile aynı: başlık, alt başlık, "Fen Bilimleri · 5. sınıf · FB.5.x.y · Türkiye Yüzyılı Maarif Modeli", "Hazırlayan: Hakan Ataş" ve el sallayan küçük Damla. Sonraki filmin tanıtımı listedeki bir sonraki başlığı göstermeli (27. film serinin finalidir).

## Ek notlar (paralel çalışma)
- Scratchpad/tmp dizini ajanlar arasında ORTAK. Geçici dosyalara benzersiz ad ver (ör. `/tmp/<film-slug>-*.js`), başkasının dosyasını ezme.
- `INK.dashed` yoğun örneklenmiş nokta ister; seyrek noktalar için önce noktaları sıklaştır (ör. her 4 px'te bir nokta).
- Ardışık iki beat'te `key` varsa motor ilk etiketi ikincisi gelmeden kaldırır; ek düzeltme gerekmez.
