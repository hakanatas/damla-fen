# 15 · Tam Gölge — FB.5.4.3

**Çıktı:** Tam gölgeyi bilimsel olarak gözlemleyebilme
**Süre:** ≈ 169,9 sn (sessiz sürüm, `timing.js`)

## Sahne planı
| # | Sahne (beat'ler) | Öğrettiği | TYMM eşleştirmesi |
|---|---|---|---|
| 1 | Bahçede gölgeler (title–bridge) | Damla'nın, ağacın ve binanın gölgesi; "Gölge nasıl oluşur?" | Köprü kurma: yüksek binaların ve kendi gölgelerinin oluşumu |
| 2 | Tangram (tangram–cat) | Opak kartondan 7 parçalı tangram (makas: yetişkin eşliğinde); pipete sabitleme; tek küçük lamba + sabit ekran; yandan görünüşte kenar ışınları, "ekrandan görünüş"te üçgen ve kedi gölgesi | "Saydam olmayan maddelerden tangram ... pipet, kalem vb. araçlara sabitleyip ... ekran üzerinde gölge" |
| 3 | Tam gölge (what–shape) | Her yöne giden ışınların cisme çarpanları durur; arkadaki ışık almayan bölge = tam gölge; kare → kare, daire → daire gölge | a) tam gölgenin niteliklerini tanımlar |
| 4 | Işınla çizim (draw–extend) | 3 adım: kaynaktan kenarlara ışın, ekrana uzat, aradaki karanlık bölge | "Kare veya daire şeklindeki cisimler kullanılarak yarı gölgeye girilmeden tam gölgeyi basit ışık ışınlarıyla çizme"; görsel tamamlama |
| 5 | Mesafe (varq–data) | Lamba ve ekran SABİT, değişken yalnızca lamba–cisim mesafesi; tahmin sorusu; 50 → 20 → 80 cm hareket, gölge boyu canlı hesaplanır; veri tablosu | c) değişkeni açıklar; b) verileri kaydeder; KB2.7 soru sorma |
| 6 | Gölge oyunu (hand) | Kukla duvara yakın → küçük gölge, lambaya yakın → büyük gölge | Günlük yaşamdan benzer örnekler |
| 7 | Kaydet + Sıra sende (record–end) | Gözlem defteri (5 madde + "mesafe azalır → tam gölge büyür"); tangram görevi; Divriği Ulu Camii ve Darüşşifası kapısındaki gölge araştırması, güneş saati (zenginleştirme); sonraki film: 16 · Maddenin Tanecikli Yapısı | Performans görevi özendirme; zenginleştirme önerileri |

## Bilimsel doğruluk (geometri hesaplanır, uydurulmaz)
| Konu | Film ne gösteriyor | Kontrol |
|---|---|---|
| Gölge izdüşümü | `F15.proj(S, P, X)`: kaynaktan cisim kenarına giden doğrunun ekranla kesişimi; tüm gölge sınırları bununla çizilir | ✔ |
| Tangram gölgesi | Büyütme K = (ekran − lamba)/(cisim − lamba) = 850/400 = 2,125; ekran görünüşündeki şekil cisim şeklinin K katı (ters dönme yok: ekran cismin arkasında) | ✔ |
| Mesafe deneyi | Lamba 0 cm, ekran 100 cm, cisim boyu 10 cm, 1 cm = 10 px (ölçekli); G = 10 · 100 / d → d = 20: 50 cm, d = 50: 20 cm, d = 80: 12,5 cm (tablo ve canlı etiket aynı formülden) | ✔ |
| Gölge oyunu | Duvardaki gölge = kukla boyu × (lamba–duvar)/(lamba–kukla): 1,25× ve 3,75× | ✔ |
| Sınırlamalar | Yarı gölge yok (noktasal kaynak, keskin kenarlar); küresel kaynağa değinilmez; tek ışık kaynağı (kaynak sayısı işlenmez); ekran sabit, değişken kaynak–cisim mesafesi | ✔ |
| Işınlar | Düz kehribar çizgiler, ok ucu kaynaktan dışarı; cisme çarpan ışınlar orada biter | ✔ |
| Güvenlik | Makas yetişkin eşliğinde (kırmızı not); Güneş'e bakılmaz (Güneş yalnızca açılış sahnesinde küçük ve dekoratif) | ✔ |
| Sahne 1 | Güneş ışığıyla oluşan gölgeler yalnız köprü amaçlı, nitel (geometri Güneş için hesaplanmaz; küresel kaynak konusuna girilmez) | ✔ |

## Notlar
- `props.js` (window.F15): film 13 yardımcılarının kopyası + `SHADOW`, `proj`, `TAN` (tangram parçaları), `CAT` (aynı 7 parçadan kedi), `TCOL`, `poly`, `BIRD` (kukla silueti).
- Konsolda yalnızca `audio/mix.m4a` bulunamadı uyarısı var (sessiz sürüm).
