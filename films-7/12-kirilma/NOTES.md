# 12 · Işığın Kırılması — FB.7.4.1 (7. sınıf, Ünite 4)

**Çıktı:** FB.7.4.1 Ortam değiştiren ışığın izlediği yolu gözlemleyerek kırılma olayına yönelik bilimsel çıkarım yapabilme
**Süre:** ≈ 207,7 sn (sessiz sürüm, `--wps=2.0`, `timing.js`)

## Sahne planı ve Maarif uyumu
| # | Sahne (beat'ler) | Öğrettiği | TYMM eşleştirmesi |
|---|---|---|---|
| 1 | Bardaktaki kalem (title–bridge) | Su dolu bardaktaki kalem kırık görünür; çıkarılınca dümdüz → "gözüm neden yanılıyor?"; havuzdaki balık sorusu | Uygulama: "bir bardak su ve kalem ile ışığın kırılması deneyi" (OB1, E1.2, KB2.2); köprü kurma: balığın yakın görünmesi |
| 2 | Havadan suya (setup–angles) | Işık kutusu → su: sınırda yön değişimi ("düz gitseydi" kesikli karşılaştırma); kırılma tanımı; normal, gelen/kırılan ışın, gelme/kırılma açısı (40° → 29°) | a) kırılmaya yönelik nitelikleri tanımlar; anahtar kavramlar: gelen ışın, kırılan ışın, gelme açısı, kırılma açısı, kırılma |
| 3 | Veri topla (measure–perp) | Gelme açısı 0°/30°/60° (su) ve 30°/60° (cam); tablo; kırılma açısı < gelme açısı → normale yaklaşır; aynı açıda cam sudan çok kırar; dik gelen ışın kırılmaz | b) farklı yoğunluktaki ortamlarda verileri toplar ve kaydeder (OB7); "dik olarak gönderilen ışığın kırılmaya uğramadığı belirtilir" |
| 4 | Sudan havaya (reverse–away) | Su içinden 30° gelen ışın havaya 42° ile çıkar → normalden uzaklaşır; özet kartı iki yönü karşılaştırır | c) az yoğun / çok yoğun ortamda ışığın yolunu yorumlar ve değerlendirir (SDB1.2) |
| 5 | Kalem neden kırık? (why–fish) | Kalem ucundan gelen ışın yüzeyde kırılıp göze ulaşır; göz ışığı düz gelmiş sayar → uç yukarıda görünür; balık kutucuğu aynı açıklama | Günlük yaşam olaylarına ilişkin sorular / çıkarım (FBAB8) |
| 6 | Prizma (prism) | Beyaz ışık prizmada kırılarak renklerine ayrılır | "Prizmada beyaz ışığın kırılarak renklerine ayrılmasına değinilir." |
| 7 | Kaydet (record) | 7 maddelik gözlem defteri | Verileri kaydetme / genelleme |
| 8 | Sıra sende (task–end) | Görev: bardak-kalem deneyini üç açıdan gözlemle ve çiz; tartış: havuz neden sığ görünür, farklı fikirlere saygı; Araştır: Mirim Çelebi; sonraki: 13 · Mercekler | SDB2.1 tartışma ortamı, D14.1 saygı; OB5 "Mirim Çelebi'nin çalışmalarından söz edilerek" (araştırma görevi olarak) |

## Sınırlamalar (program metninden)
- "Snell Yasası ve matematiksel hesaplamalara girilmeden kırılma kanunları açıklanır." → Filmde yasa adı, formül, kırılma indisi YOK. Kanunlar sözel verildi (normale yaklaşır / uzaklaşır / dik gelen kırılmaz). Tablodaki dereceler "ölçülen veri" olarak gösterilir, hesap yapılmaz.
- "Sınır açısı ve tam yansıma olaylarına girilmez." → Sudan havaya deneyinde gelme açısı yalnızca 30° (sınır açısı ≈ 48,8°'nin çok altında). Kalem sahnesindeki göz konumu da tam yansıma bölgesinin dışında seçildi.
- Temel kabul: ışık doğrusal yayılır → tüm ışınlar düz çizgi + ok.
- Güvenlik: lazer değil ışık kutusu kullanıldı; su içindeki kaynak "su geçirmez ışık kutusu" olarak etiketlendi.

## Bilimsel doğruluk (geometri hesaplanır, uydurulmaz)
| Konu | Film ne gösteriyor | Kontrol |
|---|---|---|
| Kırılma yönü | Tüm kırılan ışınlar `F712.V.refract` (Snell'in vektör biçimi) ile, n_hava = 1,00, n_su = 1,33, n_cam = 1,50 | ✔ |
| Sahne 2 açıları | 40° → 28,9° (ekranda 40° / 29°, çizilen ışınlardan ölçülür) | ✔ |
| Veri tablosu | su: 0→0, 30→22 (22,1), 60→41 (40,6); cam: 30→19 (19,5), 60→35 (35,3) | ✔ |
| Sudan havaya | 30° → 41,7° (ekranda 42°) | ✔ |
| Görünen uç | Yüzey noktası ikiye bölme ile bulunur (`surfPoint`); görünen uç, göze giden çok yakın iki ışının geri uzantılarının kesişimi (`apparent`) → uç yukarıda ve göze doğru kaymış | ✔ |
| Balık | Aynı yöntemle; görünen balık daha sığda | ✔ |
| Prizma | Her renk iki yüzeyde ayrı kırılır; kırmızı en az, mor en çok sapar. Kırılma farkları görünür olsun diye abartıldı (n 1,49–1,57) ve ekranda "abartılı çizilmiştir" yazıyor | ✔ |
| "Yoğunluk" | Program "az yoğun / çok yoğun saydam ortam" der; burada kastedilen optik yoğunluktur. Hava–su–cam için kütle yoğunluğu sıralamasıyla aynıdır; film yalnızca bu üç ortamı kullanır | ✔ (not) |
| Sahne 1 kırık kalem | Gözlem (görünüş) olarak çizildi; yanal kaymanın biçimi silindirik bardağa göre değişir, sahne 5 düz yüzeyde doğru geometriyi verir | ✔ (şematik) |

## Notlar
- `props.js` (window.F712): V (vektör + refract), ray, dline, lightbox, card, angleArc, medium (su/cam), pencil, surfPoint, apparent, warnTri, glow. `F712.fish` s1'de tanımlanır, s5'te kullanılır.
- Mirim Çelebi: Program "çalışmalarından söz edilerek" der; ayrıntılı iddia üretmemek için filmde araştırma sorusu olarak verildi.
- Konsolda yalnızca `audio/mix.m4a` bulunamadı uyarısı var (sessiz sürüm).
