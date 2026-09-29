# 6. sınıf Film 4 · Ne Kadar Hızlı, Hangi Yöne? Sürat ve Hız — FB.6.2.3

**Çıktı:** FB.6.2.3 Sürat ve hız kavramlarını karşılaştırabilme · Ünite 2 "Kuvvetin Etkisinde Hareket" · süre ≈ 182 sn (sessiz, altyazılı, `--wps=1.85`)

## Sahne planı
| # | Sahne (dosya) | Beat'ler | Öğrettiği |
|---|---|---|---|
| 1 | Merak (`s1-merak.js`) | title, hello, q | Evden okula yürüyüş; "Ne kadar yol aldım?" "Okul hangi yönde?" (günlük yaşam soruları, SDB2.1) |
| 2a | Yol ve yer değiştirme (`s2-yol.js`) | path, disp, longer | Kareli harita: sokak boyunca iz = alınan yol 700 m; düz mavi ok = yer değiştirme 500 m, yönü evden okula; ölçekli şeritlerle karşılaştırma |
| 2b | Havuz | pool | 50 m havuzda gidiş-dönüş: alınan yol 100 m, yer değiştirme 0 |
| 2c | Matris tablo | matrix | Hareket / alınan yol / yer değiştirme tablosu + çıkarım: yer değiştirme alınan yoldan büyük olamaz |
| 3a | Sürat (`s3-surat.js`) | who, race, surat | Her saniyede işaret: bisiklet her saniye 5 m, Damla 1 m (cetvelden okunur) → sürat = birim zamanda alınan yol; 5 m/s, 1 m/s |
| 3b | Birimler | units | m/s ve km/h; araç göstergesi (km/h) yön söylemez → sürati gösterir |
| 3c | Sabit sürat | constant | Eşit zaman aralıklarında eşit yol → sabit süratli hareket |
| 4a | Hız (`s4-hiz.js`) | hiz, twocars | Hız = birim zamandaki yer değiştirme; büyüklük + yön (5 m/s doğuya); iki araba 50 km/h, zıt yön → sürat aynı, hız farklı |
| 4b | Dairesel pist / sabit hız | circle, consthiz | Çembersel pistte sabit sürat, sürekli değişen yön (teğet oklar eşit boy) → hız sabit değil; sabit hız = aynı sürat + aynı yön, düz yol |
| 5 | Karşılaştır + Sıradaki (`s5-karsilastir.js`) | compare, record, task, next, end | Üç sütun: Sürat (farklılık) · İkisinde de (benzerlik) · Hız (farklılık); özet cümle; Sıra sende (sınıfta yürü, tabloya kaydet, soru sor); Film 5 tanıtımı; bitiş kartı |

## Maarif (TYMM) uyumu
| TYMM ögesi | Filmde |
|---|---|
| Alınan yol ve yer değiştirme hakkında günlük yaşam soruları, örneklerle açıklama | S1 sorular; S2 harita ve havuz |
| İki konum arasındaki hareket, alınan yol ve yer değiştirmeyi matris tabloya kaydetme (OB1) | S2c matris tablo |
| Görsel verilerden akıl yürütüp birim zamanda alınan yol / yer değiştirme çıkarımı (OB4) | S3a işaretler ve cetvel; S4a hız okları |
| a) Sürat ve hızın özelliklerini belirler | S3 (yalnızca büyüklük, m/s–km/h), S4 (büyüklük + yön) |
| b) Benzerlikleri listeler | S5 orta sütun |
| c) Farklılıkları listeler | S5 sol/sağ sütunlar, özet cümle |
| **Grafik okumaya ve matematiksel hesaplamalara girilmez** | Hiç grafik yok; hiçbir bölme/formül işlemi yapılmıyor. Değerler görselden okunuyor (cetvel, işaretler, hazır etiketler); 700 m ve 500 m haritada doğrudan etiketli |
| **km/h ve m/s kullanılır, birim dönüştürme yapılmaz** | Her iki birim ayrı örneklerde; dönüşüm yok |
| Öğrenciler merak ettiği soruları sorar (E1.1, E3.8); rol oynama | Sıra sende kartı: sınıfta yürüme etkinliği + "Merak ettiğin soruları deftere yaz" |
| İçerik çerçevesi: sabit süratli ve sabit hızlı hareket | S3c, S4b |

## Bilimsel doğruluk kontrolü
| İfade / görsel | Not |
|---|---|
| Harita: 400 m doğu + 300 m kuzey (basamaklı rota) | Alınan yol 700 m, yer değiştirme √(400²+300²) = 500 m; çizimde 1,2 px = 1 m, ok açısı 36,9° (hesap yalnızca yapım aşamasında; filmde gösterilmez) |
| Havuz gidiş-dönüş | Başlangıç = bitiş → yer değiştirme 0; alınan yol 2 × 50 m |
| Bisiklet 5 m/s (18 km/h), yürüyüş 1 m/s | Gerçekçi değerler; animasyonda gerçek zamanla birebir (1 s film = 1 s) |
| Araç göstergesi sürati gösterir | Gösterge yön bilgisi vermez; yaygın "hız göstergesi" yanılgısı düzeltildi |
| 50 km/h doğuya / batıya | Aynı sürat, zıt yön → farklı hız; oklar eşit boy |
| Çembersel pistte sabit sürat | Pist tam çember, açısal hız sabit → sürat sabit; teğet oklar eşit boy, yön değişiyor |
| Yer değiştirme ≤ alınan yol | Genel olarak doğru; eşitlik düz ve tek yönlü harekette |
| "Skaler/vektörel" terimleri | Kullanılmadı (programda yok); "yalnızca büyüklük" / "büyüklük + yön" denildi |

## Teknik notlar
- `props.js` → `window.F64`: Film 3'ün props.js kopyası (film 5 kökenli `car`, `table`, `card` ... + `title`, `endCard`, `grid`, `tag`) ve yeni: `house`, `school`, `bike`, `swimmer`, `gauge` (km/h göstergesi), `varrow`.
- Renk: alınan yol kahverengi, yer değiştirme/hız mavi; kırmızı kullanılmadı.
- lib/ değişmedi. Konsoldaki tek hata `audio/mix.m4a` bulunamadı (beklenen).
