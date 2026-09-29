# 19 · Karışımları Ayırma — FB.7.5.10

**Çıktı:** Karışımları ayırmak için çeşitli deney yapabilme
**Süre:** ≈ 174 sn (sessiz sürüm, `--wps=2.0`) · 10 sahne · 22 beat

## Sahne planı
| # | Sahne (dosya) | Beat'ler | Ne öğretiyor |
|---|---|---|---|
| 1 | Merak (`s1-merak.js`) | title, hello, brain, props, known | Karışımlar ayrılabilir mi? Beyin fırtınası: tanecik boyutu, çözünürlük, yoğunluk, erime ve kaynama noktası farkları; bilinen yöntemler: eleme, süzme, mıknatısla ayırma |
| 2 | Kart ve hipotez (`s2-hipotez.js`) | cards, draw | Kartlar: kum-su, tuz-su, zeytinyağı-su, etil alkol-su, kepek-un, odun talaşı-su; "tuz-su" çekilir; hipotez: süzme |
| 3 | Süzme testi (`s2-hipotez.js`) | test, fail | Süzgeç kâğıdında tuz yok (çözündü, geçti) → hipotez doğrulanmadı → yeni yöntem (SDB3.1) |
| 4 | Güvenlik (`s3-buharlastirma.js`) | safety | Kırmızı kart: öğretmen gözetimi, koruyucu gözlük, maşa, alkol yanıcıdır (vurgulu), tadına bakma |
| 5 | Buharlaştırma (`s3-buharlastirma.js`) | evap, measure | Isıtıcıda buharlaştırma kabı: su buharlaşır, tuz kalır; terazi + ölçüm tablosu (örnek veri 10,0 g → 9,9 g), veri analizi |
| 6 | Damıtma (`s4-damitma.js`) | distill-q, distill, alcohol | Balon + soğutucu + toplama kabı: buharlaşma → yoğuşma, saf su toplanır, tuz balonda; etil alkol-su: kaynama noktası ≈78 °C / 100 °C, alkol önce buharlaşır |
| 7 | Cabir bin Hayyan (`s4-damitma.js`) | cabir | İmbik ve deney tüpleri onun eseri; ilk kimya laboratuvarı (D19.2) |
| 8 | Yoğunluk farkı (`s5-yogunluk.js`) | density, sawdust | Ayırma hunisi: yağ üstte, su alttan akıtılır; odun talaşı yüzer, toplanır |
| 9 | Kaydet (`s6-kaydet.js`) | record, yourturn | Defter tablosu: karışım · farklı özellik · yöntem (7 satır); Sıra sende: farklı büyüklükte katıları ayıran düzenek tasarımı |
| 10 | Sıradaki (`s6-kaydet.js`) | next, end | 20 · Elektriklenme tanıtımı (balon ve kâğıt parçacıkları); bitiş kartı |

## TYMM uyumu
| Süreç bileşeni / uygulama | Filmde |
|---|---|
| a) Farklı karışımları ayırmak için deney tasarlar | S2 kart çekme + hipotez + düzenek; S5–S8 düzenekler; Sıra sende tasarım görevi |
| b) Deney ile ilgili ölçme ve veri analizi yapar | S5 terazi, ölçüm tablosu, "≈ aynı → yöntem işe yaradı"; S9 özellik-yöntem tablosu |
| Beyin fırtınası; tanecik boyutu, çözünürlük, yoğunluk, erime ve kaynama noktası farklarından yararlanma (vurgulanır) | S1 |
| Buharlaştırma, yoğunluk farkından yararlanma, damıtma | S5, S8, S6 |
| Kartlardaki karışımlar (kum-su, tuz-su, zeytinyağı-su, etil alkol-su, kepek-un, odun talaşı-su) | S2 (tümü), S9 tabloda hepsi |
| Hipoteze göre düzenek; bileşenleri elde edemezlerse yeni yöntem (SDB3.1) | S3 başarısız süzme → buharlaştırma |
| Cabir bin Hayyan: damıtma imbiği ve deney tüpleri; ilk kimya laboratuvarı (vurgulanır) | S7 |
| Temel kabul: eleme, süzme, mıknatısla ayırma biliniyor | S1 "bunları biliyoruz", yalnızca hatırlatma |
| Zenginleştirme: farklı büyüklükteki katı tanecikleri ayıran düzenek | Sıra sende |
| Güvenlik (ısıtma, yanıcı alkol) | S4 kırmızı kart; Sıra sende "öğretmeninle, güvenle" |

## Bilimsel doğruluk kontrolü
| İfade | Not |
|---|---|
| Tuz suda çözündüğü için süzgeç kâğıdından geçer | ✔ |
| Buharlaştırmada su buharlaşır, tuz kalır | ✔ |
| Ölçüm 10,0 g → 9,9 g | "örnek veri"; küçük kayıp (kaba yapışma) gerçekçi; anlatımda "yaklaşık 10 gram" |
| Damıtma: buharlaşma + soğutucuda yoğuşma, saf su toplanır, tuz balonda kalır | ✔ |
| Etil alkol kaynama noktası ≈ 78 °C, su 100 °C (deniz seviyesinde) | ✔ ; basit damıtmada alkolün tamamen saf elde edilemeyeceği detayına girilmedi |
| Zeytinyağı sudan az yoğun → üstte | ✔ (≈0,92 g/cm³) |
| Odun talaşı suda yüzer | Kuru talaş için ✔ |
| Kepek-un: eleme (tanecik boyutu); demir tozu-kum: mıknatıs | ✔ |
| Cabir bin Hayyan, 8. yüzyıl | ✔ (yaklaşık 721–815) |
| Renk kodu | ısı #B5553F / kehribar; su mavi; kırmızı yalnızca güvenlik ve "hipotez doğrulanmadı" |

## Bilinen notlar
- `audio/mix.m4a` yok (sessiz sürüm); konsolda yalnızca bu dosya için ERR_FILE_NOT_FOUND.
- Damıtma sahnesinde "alcohol" beat'inde düzenek tuzlu su etiketini korur; alkol-su yalnızca yan kartta kaynama noktası karşılaştırmasıyla işlenir.
