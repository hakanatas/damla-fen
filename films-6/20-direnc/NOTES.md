# 20 · Elektriksel Direnç ve Reosta  — FB.6.6.2 · FB.6.6.3
Fen Bilimleri · 6. sınıf · Ünite 6 (Elektriğin İletimi ve Direnç) · süre ≈ 197 sn (sessiz, `--wps=1.85`)

## Sahneler
| # | sahne (beat'ler) | öğrettiği |
|---|---|---|
| 1 | Merak (title–q) | temel kabul (pil/ampul sayısı) → soru: yalnızca tel değişirse? |
| 2 | Benzetme (roads–resist) | program analojisi: uzun/kısa, tek/çift şeritli, çakıllı/asfalt yol → uzunluk, kesit alanı, cins; direnç tanımı |
| 3 | Güvenlik (safety) | yalnızca pil, kısa devre yok, ince teller ısınabilir, yetişkin |
| 4 | Tasarım (design) | bağımsız / kontrol edilen / bağımlı değişken |
| 5 | Deneyler (len–mat-r) | 3 deney: uzunluk (25/50/100 cm), kesit alanı (kalın/ince), cins (bakır/krom-nikel); parlaklık çubukları |
| 6 | Tablo (table) | veri tablosu; direnç ↑ → parlaklık ↓; direncin bağlı olduğu 3 faktör |
| 7 | Reosta (rheo–rheo-data) | laboratuvar reostası; sürgülü tel reosta; akımın geçtiği tel boyu; 4 konumlu veri tablosu |
| 8 | Çıkarım (variable–daily) | reosta = ayarlanabilir direnç; direnç ve reosta sembolleri; pil-ampul-reosta şeması; birim ohm (Ω); ısıtıcı ayar düğmesi |
| 9 | Sıra sende (yourturn–end) | kalem ucuyla basit reosta, veri tablosu, V diyagramı; sonraki film; bitiş kartı |

## Maarif uyumu
| program ögesi | filmde |
|---|---|
| FB.6.6.2 a) değişkenleri belirleyen deney tasarlar | Sahne 4 plan + Sahne 5 her deneyde tek değişken |
| FB.6.6.2 b) ölçme ve veri analizi | Sahne 5 sonuç şeritleri, Sahne 6 tablo ve yorum |
| uzunluk, dik kesit alanı, cins; yol analojisi (OB1) | Sahne 2, 5 |
| "matematiksel bağlantıya girilmemesi" | hiçbir sayısal direnç değeri/formül yok; yalnızca ↑/↓ ilişkileri |
| FB.6.6.3 a) reosta ile direncin niteliklerini tanımlar | Sahne 7 (sürgü → tel uzunluğu → direnç) |
| FB.6.6.3 b) direncin değişkenliğini dikkate alarak toplar ve kaydeder | Sahne 7 konum-parlaklık tablosu |
| FB.6.6.3 c) parlaklıkta direncin etkisini yorumlar | Sahne 6 ve 8 çıkarımları |
| "reostanın değiştirilebilir bir direnç olduğu çıkarımı" | Sahne 8 ilk beat |
| "Ohm Yasası'na girilmeden direncin birimi verilir" | yalnızca "ohm (Ω)" |
| reosta yoksa basit reosta yapma | Sahne 9 kalem ucu (grafit) reosta görevi |
| V diyagramı / TGA raporlaştırma | Sahne 9 görev maddesi |
| köprü: ısıtıcı düğmelerinin dirençle ilişkisi | Sahne 8 son beat |
| güvenlik | Sahne 3 kırmızı kart + Sahne 9 uyarı satırı |

## Bilimsel doğruluk
| iddia | durum |
|---|---|
| uzun tel → direnç büyük → ampul sönük | doğru (R ∝ L) |
| ince tel (küçük kesit alanı) → direnç büyük | doğru (R ∝ 1/A) |
| aynı boyutta krom-nikel telin direnci bakırdan büyük | doğru (özdirenç ≈ 1,1×10⁻⁶ vs 1,7×10⁻⁸ Ω·m) |
| uzunluk ve kesit deneylerinde krom-nikel tel | bilinçli seçim: bakırda fark gözle görülmez |
| reosta: sürgü akımın geçtiği tel uzunluğunu değiştirir | doğru |
| direnç ve reosta sembolleri | TS EN 60617 / IEC: dikdörtgen; reosta için çapraz oklu dikdörtgen |
| parlaklık görselleri | yalnızca sıralama doğru; ölçekli değil ("çizim ölçekli değildir" notu) |
| ısıtıcı ayar düğmeleri dirençle ilişkili | programın ifadesiyle, genelleme yapılmadan |

## Teknik
- `props.js`: 5. sınıf `CK` kopyası (6. sınıf etiketleri) + `F20` (tel tahtası, sürgülü reosta, laboratuvar reostası, yol/araç çizimleri, parlaklık çubuğu). `CK.sym` sarmalanarak 'direnc' ve 'reosta' tipleri eklendi (CK.loop içinde de çalışır).
- Sonraki film tanıtımı: "21 · Biyoçeşitlilik" (21. filmin kesin başlığı henüz bilinmediği için genel ad).
- Bilinen tek konsol hatası: `audio/mix.m4a` yok (sessiz sürüm).
