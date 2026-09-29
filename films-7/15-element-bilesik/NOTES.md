# 15 · Molekül Modelleri: Element mi, Bileşik mi? — FB.7.5.3 · FB.7.5.4

**Süre:** 155,3 sn (sessiz, altyazılı, `--wps=2.0`) · 6 sahne · 21 beat · Madde = mavi vurgu

## Sahne planı
| # | Sahne | Beat'ler | Öğrettiği |
|---|---|---|---|
| 1 | Atomlar birleşir | title, hello, moldef | Serbest H, O atomları birleşir → H₂, O₂ (aynı cins atomlar), H₂O (farklı cins atomlar); molekül tanımı |
| 2 | Model atölyesi | material, same, water1, evidence, revise, co2 | Oyun hamuru + kürdan; kural kartı (aynı cins → aynı renk/boyut; farklı cins → farklı renk ya da boyut); H₂ (tekli), O₂ (ikili), N₂ (üçlü bağ); **model önerisi**: su düz ve eşit toplar → **yeni kanıt**: bükük, ≈104,5°, O > H → **model yenilenir** (morf animasyonu, açı yayı); CO₂ doğrusal (180°) |
| 3 | Saf maddeler | pure, onekind, twokind, element, compound | Tanecik modeli kutuları: demir (düzenli Fe atomları), oksijen gazı (O₂), su (H₂O, sıvı), karbondioksit gazı (CO₂); tek cins / farklı cins vurgusu → ELEMENT / BİLEŞİK |
| 4 | Etiketle | label, rule | Çevredeki maddeler kartları kutulara taşınır: oksijen, azot, demir, bakır → element; su, karbondioksit, etil alkol → bileşik; kural sorusu kartı |
| 5 | Kaydet | record, method | 5 maddelik defter; süreç zinciri Model öner → Yeni kanıt → Modeli yenile → Sınıflandır |
| 6 | Sıra sende | task, next, end | Hamurla H₂, O₂, H₂O, CO₂ modelleri; renk/boyut kuralı; akranla karşılaştırıp geliştirme; etiketleme · Sıradaki: İlk 18 Element ve Periyodik Tablo · bitiş kartı |

## Maarif (TYMM) uyumu
| Program ögesi | Filmde |
|---|---|
| Tanecikler molekül şeklinde olabilir; aynı/farklı atomlar belirli oranlarda birleşir | S1 |
| FB.7.5.3 a) Aynı veya farklı atomlarla molekül modeli önerir; oyun hamuru, pinpon topu vb. | S2 (hamur + kürdan; H₂, O₂, N₂; su için ilk model) |
| Aynı cins atom → aynı renk ve büyüklük; farklı cins → farklı renk/büyüklük (OB7) | S2 kural kartı, tüm modellerde uygulandı |
| FB.7.5.3 b) Yeni kanıtlarla modeli yeniler | S2 su modeli: düz/eşit → bükük/farklı boy-renk |
| Modelleri karşılaştırma, geliştirme, nazikçe sunma (D14.1) | S6 görev kartı |
| FB.7.5.4 a) Saf maddelerin farklı yapıda olduğunu belirler (tahtaya çizilen tanecikli yapılar, OB4) | S3 dört tanecik kutusu |
| FB.7.5.4 b) Niteliklerine göre ayrıştırır (aynı / farklı cins atom) | S3 vurgu etiketleri |
| FB.7.5.4 c) Element ve bileşik olarak sınıflar | S3 ELEMENT / BİLEŞİK |
| Örnekler: oksijen, demir, bakır (tek cins); su, karbondioksit (farklı cins) | S3, S4 |
| FB.7.5.4 ç) Çevresindeki oksijen, azot, demir, bakır, su, karbondioksit, etil alkol → etiketleme | S4 (programdaki liste birebir) |
| Formül yazımı FB.7.5.7'ye aittir | Ekranda yalnızca model etiketi olarak H₂, O₂, N₂, H₂O, CO₂ görünür; formül kuralı anlatılmaz |

## Bilimsel doğruluk kontrolü
| İfade | Kontrol |
|---|---|
| H₂O bükük, H–O–H açısı ≈ 104,5° | Doğru (104,45°). Modelde açı birebir 104,5° çizildi. |
| CO₂ doğrusal (180°), O=C=O ikili bağlar | Doğru. |
| O₂ ikili bağ (O=O), N₂ üçlü bağ (N≡N), H₂ tekli bağ | Doğru. |
| Oksijen atomu hidrojenden büyük | Doğru (kovalent yarıçap O ≈ 66 pm, H ≈ 31 pm). |
| Demir, bakır: tek cins atomdan oluşan element (düzenli dizilmiş atomlar) | Doğru; metal örgüsü şematik. |
| Etil alkol C₂H₅OH (2 C, 6 H, 1 O) | Çizimde 2 C, 6 H, 1 O ve 8 bağ; 2B şematik çizim. |
| Su sıvıda moleküller birbirine yakın; gazlarda moleküller uzak ve serbest | Tanecik modeli önceki ünitelerle tutarlı. |

## Teknik notlar
- `props.js` → `window.F7M` (film 14 ile aynı ortak kopya). Renkler: H krem (küçük), O mavi, C koyu gri, N lavanta, Fe gri, Cu bakır.
- Kalan: `audio/mix.m4a` yok (sessiz film; konsolda tek ERR_FILE_NOT_FOUND beklenen).
