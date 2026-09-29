# 19 · Akım ve Gerilim — FB.8.6.2 · FB.8.6.3 · FB.8.6.4

**Süre:** 207,4 sn (sessiz, altyazılı, `--wps=2.1`) · 8 sahne · 27 beat · `props.js` → `window.CK` / `window.U6` (18–20 ortak kopya) · film içi yardımcılar `window.F19` (s1-merak.js)
Üç çıktıyı işlediği için 200 sn hedefini ~7 sn aşar.

## Sahne planı
| # | Sahne | Beat'ler | Öğrettiği |
|---|---|---|---|
| 1 | Merak | title, hello, brain | Anahtar kapanınca ampul yanar; kablo büyüteç altında "?"; beyin fırtınası kartları |
| 2 | Elektrik akımı | flow, dir | Kapalı devrede yüklerin düzenli hareketi = akım (yönsüz parıltı); anahtar açık → akım yok; akım yönü (+ → dış devre → −) |
| 3 | Güvenlik | safety | Priz yok; **ampermetre asla doğrudan pile bağlanmaz (kısa devre)**; kısa devre yok; yetişkin eşliği |
| 4 | Ampermetre | ammeter, amp, same, avar, adef | A sembolü seri; dijital ampermetre 0,30 A; başka noktada aynı okuma; pil/ampul sayısını kontrol ederek tekrarlama (tablo); operasyonel tanım kartı |
| 5 | Gerilim | vq, water, voltm, vexp, vdef | Pilin uçları arasında potansiyel fark; su seviyesi benzetmesi; voltmetre paralel; 1 pil 1,5 V, 2 pil 3,0 V (kontrol: 1 ampul); operasyonel tanım |
| 6 | Soru ve düzenek | rq, rwhy, rset | Yeni soru; ampulün direnci ısınınca değişir → 30 Ω sabit direnç; A seri, V direncin uçlarına paralel, pil 1→4 |
| 7 | Veri ve genelleme | rtab, pattern, graph, ohm, formula | Tablo + canlı alet okumaları; ×2 örüntüsü, Gerilim ÷ Akım = 30; V–I grafiği (orijinden geçen doğru); Ohm Yasası; Direnç = Gerilim ÷ Akım (Ω, V, A) |
| 8 | Sıra sende | task, next, end | Ölçüm, tablo, grafik, TGA raporu, Georg Simon Ohm araştırması, temizlik; sıradaki: 20 · Aydınlatma Aracı Tasarlıyorum |

## Maarif (TYMM) uyumu
| Program ögesi | Filmde |
|---|---|
| FB.8.6.2 a) Akımın niteliklerini tanımlar | S2 (kapalı devre, anahtar, yön), S4 (seri devrede her noktada aynı) |
| FB.8.6.2 b) Akımı ampermetre ile ölçer; "ampermetrenin devreye seri bağlandığı belirtilir" | S4 |
| FB.8.6.2 c) Amper birimi | S4 ("birim: amper (A)", tanım kartı) |
| FB.8.6.2 pil sayısı/ampul sayısı değişkenlerini kontrol ederek tekrarlama, tabloya kayıt | S4 tablo (2 pil/1 ampul, 2 pil/2 ampul, 1 pil/1 ampul) |
| FB.8.6.3 a–c) Potansiyel fark nitelikleri, voltmetre ile ölçme ("paralel bağlandığı belirtilir"), volt birimi | S5 |
| FB.8.6.3 kontrol değişkeni ampul sayısı, bağımsız değişken pil sayısı | S5 (1 ampul sabit; 1–2 pil) ve S6 |
| FB.8.6.4 a) Akım–gerilim örüntüsü | S7 (×2, oran 30) |
| FB.8.6.4 b) Genelleme: iletkenin uçları arasındaki gerilimin akıma oranı sabittir; grafik; Ohm Yasası'na ulaşma | S7 (grafik, Ohm Yasası kartı) — anahtar kavram "Ohm yasası" programda var |
| Georg Simon Ohm (Giyorg Zimon Om) araştırması; TGA raporu; temizlik | S8 |
| Beyin fırtınası (E3.5), soru sorma (E3.8) | S1 |
| Temel kabul: ampul bir dirençtir | S6 ("Ampul de bir dirençtir…") |

## Bilimsel doğruluk kontrolü (ölçümler birbiriyle tutarlı)
| Ölçüm / ifade | Kontrol |
|---|---|
| Pil = 1,5 V; pillerin iç direnci ihmal edildi → voltmetre ampulün/direncin uçlarında pil gerilimini okur | İdeal model |
| Ampul: 1,5 V'ta 0,20 A; 3,0 V'ta 0,30 A (direnci 7,5 Ω → 10 Ω, tel ısındıkça artar) | Küçük el feneri ampulü için gerçekçi; oran sabit değil, bu yüzden S6'da sabit direnç kullanıldı |
| 2 pil + 2 seri özdeş ampul: her ampule 1,5 V → 0,20 A; 1 pil + 1 ampul → 0,20 A | Yukarıdaki ampul verisiyle tutarlı |
| Seri devrede ampermetre her noktada aynı değeri okur | Doğru |
| 30 Ω direnç: 1,5/3,0/4,5/6,0 V → 0,05/0,10/0,15/0,20 A; oran 30 Ω | Ohm yasası; en büyük güç 1,2 W (uygun güçte direnç gerekir, NOTES bilgisi) |
| V–I grafiği orijinden geçen doğru | Ohmik iletken için doğru |
| Akımın yönü dış devrede + uçtan − uca (geleneksel yön) | Doğru; elektron yönüne girilmedi, yük hareketi yönsüz parıltıyla gösterildi (yanılgı üretmemek için) |
| Ampermetrenin doğrudan pile bağlanması kısa devredir | Doğru (ampermetre direnci çok küçük) |
| Su seviyesi benzetmesi "yalnızca bir benzetme" notuyla | — |
| Ondalık ayırıcı virgül (0,30 A; 1,5 V) | Türkçe yazım |

## Bilinen durumlar
- Süre 207 sn (üç çıktı).
- `audio/mix.m4a` yok (sessiz film): konsolda tek ERR_FILE_NOT_FOUND beklenen.
