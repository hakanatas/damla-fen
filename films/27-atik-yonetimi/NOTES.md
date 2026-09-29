# 27 · Atık Yönetimi ve Sıfır Atık — FB.5.7.3 (5. sınıf serisinin finali)

**Çıktı:** Yakın çevresinde atık yönetiminin uygulanabilirliğine ilişkin deneyimlerini yansıtabilme
**Süre:** ≈ 204,8 sn (sessiz sürüm, `timing.js`)
**Film yardımcıları:** `props.js` → `window.W7` (25. filmdekiyle aynı dosya). `scenes/s1-merak.js` okul binasını (`W7.school`), `scenes/s5-yil.js` 7 ünitenin simgelerini (`W7.UNITS`, `W7.unitCard`) ekler; bitiş kartı bunları kullanır.

## Sahne planı
| # | Sahne | Beat'ler | Öğrettiği |
|---|---|---|---|
| 1 | Merak | title → question | Okul bahçesi; "Atıklarımızı nasıl yönetiyoruz? Daha iyisini yapabilir miyiz?" |
| 2 | Hiyerarşi | manage → dispose | Atık yönetimi tanımı (oluşmadan önce → uzaklaştırma); ters piramit: önleme, azaltma, yeniden kullanım, geri dönüşüm, geri kazanım, uzaklaştırma; her katman için örnek paneli |
| 3 | İleri dönüşüm | upcycle → art | Kot → çanta; "Farkı görelim" üç sütun (yeniden kullanım / geri dönüşüm / ileri dönüşüm); şişe kapaklarından mozaik: atıktan sanata |
| 4 | Yansıtma | diary → inference | Damla'nın atık günlüğü (✗/✓), çıkarım: "Önlemek, geri dönüşümden de iyidir" |
| 5 | Grup tartışması | buzz → evaluate | Vızıltı grupları, pano notları; değerlendirme: "hemen uygulanabilir" / "öğretmenle planla" |
| 6 | Sürdürülebilirlik | sustain | Temiz çevre + korunan kaynaklar → gelecek nesiller |
| 7 | Son sayfa | record | Defterin son sayfası (özet) |
| 8 | Bir yılın defteri | lookback → thanks | FİNAL: 7 ünite kartı (Güneş-Dünya-Ay, Kuvvet, Hücre, Işık, Madde ve ısı, Elektrik, Geri dönüşüm), "Teşekkürler!" |
| 9 | Veda | task → end | Sıra sende: bir haftalık atık günlüğü; "Merakını hiç kaybetme!"; bitiş kartı: "5. sınıf serisinin sonu · 27 film · Teşekkürler!" + ünite simgeleri |

## Maarif (TYMM) uyumu
| Program ögesi | Filmde |
|---|---|
| a) Deneyimlerini gözden geçirir | Sahne 4 atık günlüğü |
| b) Deneyimlerine dayalı çıkarım yapar | Sahne 4 çıkarım kartı |
| c) Ulaşılan çıkarımları değerlendirir | Sahne 5 uygulanabilirlik değerlendirmesi |
| Atık yönetimi uygulamaları ve sıfır atık hiyerarşisi tanıtılır; ilk aşama önleme | Sahne 2 (önleme en üstte, "en iyi"; uzaklaştırma "son çare") |
| Geri kazanım, ileri dönüşüm ve yeniden kullanım açıklanır, geri dönüşümle farkları belirtilir | Sahne 2 panelleri + Sahne 3 "Farkı görelim" tablosu |
| İleri dönüşümün sanatta yer bulması, atıktan sanata (OB9, D7.3) | Sahne 3 şişe kapağı mozaiği |
| Ayrılıp birleşme, vızıltı grupları ile grup tartışması (KB2.18) | Sahne 5 |
| Kendi davranışlarını değerlendirme, tasarruflu davranma sorumluluğu | Sahne 4 ve Sıra sende görevi |
| Atık yönetimi çevresel temizliğin yanında sürdürülebilirliğin parçasıdır (D18, OB8) | Sahne 6 |
| Anahtar kavramlar: atık yönetimi, yeniden kullanım, geri kazanım, geri dönüşüm, ileri dönüşüm, sıfır atık hiyerarşisi, uzaklaştırma | Hepsi anahtar kavram etiketi olarak ekranda |
| Zenginleştirme: 5R ve kompost | Hiyerarşide azaltma/geri kazanım (kompost) katmanları |

## Bilimsel doğruluk kontrolü
| İfade | Not |
|---|---|
| Sıfır Atık hiyerarşisi: önleme → azaltma → yeniden kullanım → geri dönüşüm → geri kazanım → uzaklaştırma (bertaraf) | Sıfır Atık Yönetmeliği'ndeki öncelik sırası; program "uzaklaştırma" terimini kullandığı için bu terim seçildi |
| Geri kazanım: atıktan kompost ya da enerji elde etmek | Doğru; geri dönüşümden (ham maddeye dönüştürme) ayrı tutuldu |
| Yeniden kullanım: şekli değişmeden tekrar kullanmak (kavanozu yeniden doldurmak) | 25. filmin sınırlamasıyla çelişmez; yeniden kullanım bu filmde anlatılır |
| İleri dönüşüm: atıktan daha değerli yeni ürün (kot → çanta, kapaklardan sanat) | Genel tanım |
| Uzaklaştırma: kullanılamayan atık düzenli depolama alanına gider | Nitel, son çare vurgusu |
| Sayısal veri kullanılmadı | — |
| Ünite simgeleri (defter özeti) | Ünite adları programla uyumlu kısaltmalar: Ü1 Güneş-Dünya-Ay, Ü2 Kuvvet (dinamometre, 1 N), Ü3 Hücre, Ü4 Işık (doğrusal yayılma + gölge), Ü5 Madde ve ısı (katı-sıvı-gaz Damla), Ü6 Elektrik (pil-ampul devresi), Ü7 Geri dönüşüm |

## Bilinen durumlar
- Art arda gelen beat'lerdeki anahtar kavram etiketleri yaklaşık 1 sn üst üste biner (motor davranışı).
- `look.sh` çalışırken `audio/mix.m4a` bulunamadı uyarısı çıkar (sessiz film; zararsız).
