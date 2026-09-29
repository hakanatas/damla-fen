# Film 5 · Kuvveti Ölçelim: Dinamometre — FB.5.2.1

**Çıktı:** FB.5.2.1 Kuvveti büyüklüğü ile operasyonel tanımlayabilme · Ünite 2 "Kuvveti Tanıyalım" · süre ≈ 209 sn (sessiz, altyazılı)

## Sahne planı
| # | Sahne (dosya) | Beat'ler | Öğrettiği |
|---|---|---|---|
| 1 | Merak (`s1-merak.js`) | title, hello, push, define | Günlük hayatta itme/çekme: top, kapı, hamur (hareket, şekil değişimi) → "itmek ya da çekmek = kuvvet uygulamak" |
| 2 | Beyin fırtınası (`s2-beyin.js`) | brain, quality | Zihin haritası; fikirlerden niteliklerin çıkarılması: **büyüklük** ve **yön** |
| 3 | Büyüklük ve yön (`s3-buyukluk-yon.js`) | size, dir, howmuch | Hafif/güçlü itme → kısa/uzun ok; sağa itme/sola çekme → okun ucu yön; "tahmin yetmez, ölç" |
| 4 | Dinamometre (`s4-dinamometre.js`) | dyn, parts, kantar, newton | Bölümler (halka, yay, gösterge, ölçek, kanca); el kantarı bir çeşit dinamometredir; birim Newton (N) |
| 5 | Esneklik (`s5-esneklik.js`) | stretch, elastic | Çekme arttıkça uzama artar (3 N → 7 N); bırakınca eski hâline döner → esneklik |
| 6 | Ölç ve kaydet (`s6-olcum.js`) | measure, table | Elma ≈ 1 N, kitap ≈ 4 N, su şişesi ≈ 5 N; tabloya kayıt; çubuklarla karşılaştırma (en büyük / en küçük) |
| 7 | Yay kalınlığı (`s7-yay.js`) | bag, over, thick, choose | İnce yay (0–10 N) çantayla sınırı aşar → kırmızı uyarı; kalın yay (0–50 N) 30 N okur; aynı kuvvet → ince çok, kalın az uzar; kuvvete uygun yay seçimi |
| 8 | Kaydet + Sıradaki (`s8-kaydet.js`) | record, task, next, end | Operasyonel tanım: "Kuvvet, dinamometreyle ölçülen ve birimi Newton (N) olan bir büyüklüktür." · Sıra sende · Film 6 tanıtımı · bitiş kartı |

## Maarif (TYMM) uyumu
| TYMM ögesi | Filmde |
|---|---|
| a) Kuvvetin niteliklerini tanımlar | S2 beyin fırtınası → büyüklük ve yön; S3 ok boyu/ok ucu |
| b) Kuvvetin büyüklüğünü dinamometre ile ölçer | S4–S6 ölçüm; gösterge okuma; tabloya kayıt |
| c) Kuvvetin büyüklüğünü Newton (N) ile tanımlar | S4 birim kartı; S8 operasyonel tanım |
| Beyin fırtınası, açık uçlu sorular (E3.5) | S2 "Kuvvet deyince aklına neler geliyor?" |
| Ölçülecek kuvvete uygun kalınlıkta yaylı dinamometre seçimi | S7 tamamı |
| Yay kalınlığı ↔ uygulanan kuvvet, esneklik kavramı ile | S5 esneklik, S7 aynı kuvvet/farklı uzama |
| Ölçümleri tabloya kaydetme, karşılaştırma (D3.3, OB7, KB2.6) | S6 tablo + çubuklar; S8 görevi |
| Köprü kurma: el kantarı bir çeşit dinamometredir | S4 kantar beat'i |
| Gruplarla ölçme | "Sıra sende" kartı: grubunla çalış |

## Bilimsel doğruluk kontrolü
| İfade | Not |
|---|---|
| Elma ≈ 1 N | ≈100 g × 9,8 N/kg ≈ 0,98 N |
| Kitap ≈ 4 N, 0,5 L su şişesi ≈ 5 N | ≈400 g ve ≈520 g (şişe dâhil) |
| Okul çantası 30 N | ≈3 kg; 0–10 N'luk dinamometrenin sınırını aşar |
| Kalın yay aynı kuvvetle daha az uzar | Yay sertliği tel kalınlığıyla artar |
| Sınırı aşan yay bozulabilir | Esneklik sınırı aşılırsa kalıcı şekil değişimi |
| Isaac Newton (1643–1727) | Birim onun adını taşır |
| Kütle/ağırlık terimleri bu filmde kullanılmaz | FB.5.2.3'e bırakıldı; ölçülen şey "kuvvet" olarak adlandırıldı |

## Teknik notlar
- `props.js` → `window.F05`: `spring`, `dyn` (ölçekli, ince/kalın yaylı, aşırı yük gösterimli dinamometre), asılan cisimler (`apple`, `book`, `bottle`, `bag`), `kantar`, `car`, `table`, `floor`, `card`, `title`, `endCard`.
- lib/ içinde değişiklik yok. Konsoldaki tek hata `audio/mix.m4a` bulunamadı (sessiz sürüm; beklenen).
