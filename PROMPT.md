# Seriyi üreten istem (prompt)

Bu seri, "The Learning Ink" filmindeki istemin fen bilimlerine uyarlanmış hâliyle üretildi.

## Kullanıcı isteği

> Yukarıdaki karakteri değiştirelim ve başka bir karakter yapalım ama tarzı güzel olmuştu, fene uyarlayarak bir tarz oluşturabiliriz. Önce karakteri ve stili yakalamak için bana görsel ver; karakteri onayladıktan sonra Maarif Modeline uygun bir şekilde 5. sınıf ilk konudan başlayıp videolar üreteceğiz, adım adım gidelim.
>
> Karakter çok güzel oldu. 5. sınıf konulardan başlayarak videolar oluştur. Maarif Modeline uygun olduğundan ve ortaokul öğrencilerine uygun olduğundan emin ol. Öğrencilerin bu videoları izleyeceğini unutma. Maarif Modeli için TYMM sitesine ulaş.

## Temel ilkeler (The Learning Ink isteminden devralınanlar)

- Kareler yalnızca JavaScript + Canvas 2D ile, prosedürel olarak çizilir. Harici görsel, video ya da yapay zekâ görsel üretimi kullanılmaz.
- Merkezî bir zaman çizelgesi vardır. `renderFrame(t)` saf bir fonksiyondur, rastgelelik tohumludur (seeded), sonuç deterministiktir.
- Sahneler ayrı modüllerde durur. Metinler ve zamanlamalar tek bir düzenlenebilir dosyada toplanır. Altyazı .srt olarak dışa aktarılır.
- MP4, Playwright + FFmpeg ile kare kare dışa aktarılır (ekran kaydı kullanılmaz).
- Her görsel metafor gerçek bir bilimsel kavrama karşılık gelir ve README'de doğruluk tablosu yer alır.

## Fen serisine özgü kararlar

- **Karakter:** Damla, meraklı bir su damlası. Saydam gövdesinde tanecikler görünür (madde tanecikli yapıdadır). Gözlem gözlüğü, büyüteç ve arazi çantası taşır. Katı, sıvı ve gaz hâllerine dönüşebilir.
- **Stil:** "Gözlem Defteri" — mürekkep ve sulu boya, kareli defter sayfaları, el yazısı etiketler.
- **Anlamlı renk kodu:** mürekkep (çizgi), su mavisi (su ve madde), kehribar (ışık ve enerji), yosun yeşili (canlılar), kırmızı (yalnızca güvenlik uyarısı).
- **Öğrenci odaklılık:** Türkçe nöral seslendirmeyi Damla yapar, anlatım yavaş ve net tutulur. Altyazılar en fazla 2 satır olur. Ekranda anahtar kavram etiketi bulunur. Kavramlar arasında nefes payı bırakılır.
- **Maarif Modeli:** Her film ilgili öğrenme çıktısının süreç bileşenlerini izler. TYMM'deki öğrenme-öğretme uygulamaları (soru sorma, araç seçme, doğrulama, kaydetme, güvenlik uyarıları, köprü kurma, zenginleştirme) sahnelere yerleştirilir.
