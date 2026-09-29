# Film 8 · Sürtünme Kuvveti — FB.5.2.4

**Çıktı:** FB.5.2.4 Sürtünme kuvvetinin çeşitli ortamlardaki etkilerine yönelik tümevarımsal akıl yürütebilme · Ünite 2 · süre ≈ 196 sn (sessiz, altyazılı)

## Sahne planı
| # | Sahne (dosya) | Beat'ler | Öğrettiği |
|---|---|---|---|
| 1 | Soru (`s1-soru.js`) | title, hello, slide | "Hareketi zorlaştıran/kolaylaştıran etkiler var mı?"; itilen kutu kayar ve durur → "Onu ne durdurdu?" |
| 2 | Yüzeyler (`s2-yuzey.js`) | rough, zoom, def | Halı vs cilalı zemin (aynı itiş, farklı uzaklık); büyüteçte çok/az pürüzlü profil; yakın görünümde temas eden yüzeyler, hareket → / ← sürtünme kuvveti |
| 3 | Ortamlar (`s3-ortam.js`) | solid, water, fish, air, chute | Katı: buz (kolay kayar) / kum (kaymaz) · Sıvı: havuzda yürüme → su direnci; sivri balık/tekne biçimi vs düz yüzey · Gaz: bisiklet → hava direnci; paraşüt (hava direnci ↑, ağırlık ↓) |
| 4 | Örüntü (`s4-oruntu.js`) | pattern, general, general2 | Katı/Sıvı/Gaz sütunlarında 6 örnek kartı; her kartta hareket ve karşı ok → örüntü; 4 maddelik genelleme |
| 5 | Etkiler (`s5-etkiler.js`) | plus, minus, art | Balık kılçığı: olumlu (yürüme, fren, yazı) / olumsuz (aşınma, ısınma) + yağlama; sanatta: pürüzlü resim kâğıdı kalem tozunu tutar |
| 6 | 1453 (`s6-tarih.js`) | ships, ships2 | Gemiler yağlanmış kalaslar ve yuvarlak kütükler üzerinde karadan Haliç'e; sürtünme azaldı |
| 7 | Sıra sende + Sıradaki (`s7-son.js`) | task, next, end | Evde 3 artıran/3 azaltan örnek, boş balık kılçığı şablonu; Film 9 (Ünite 3, hücre) tanıtımı; bitiş kartı |

Sağ üstteki "ortam: KATI / SIVI / GAZ" etiketi 3. sahnede örneklerin ortamını gösterir.

## Maarif (TYMM) uyumu
| TYMM ögesi | Filmde |
|---|---|
| Açılış sorusu: "Hareketi zorlaştıran veya kolaylaştıran etkiler var mıdır?" | S1 |
| Yüzeyin pürüzlü / az pürüzlü olması kısaca açıklanır | S2 |
| Katı, sıvı ve gaz ortamlardan günlük hayat örnekleri | S3 |
| a) Ön bilgilerle örüntü oluşturur | S4 örnek kartları + "Örüntü" satırı |
| b) Çeşitli ortamlardaki etkilere yönelik genelleme yapar | S4 genelleme kutusu |
| Su ve hava direnci sürtünme ile ilişkilendirilir | S3 + S4 "Su ve hava direnci de birer sürtünmedir" |
| Olumlu–olumsuz etkiler; balık kılçığı tekniği | S5, S7 şablon |
| Anlam çözümleme tablosu / veri kaydı (OB7) | S4 sütunlu örnek tablosu |
| Resim kâğıtları ve kalem türleri (OB9) | S5 sanat bölümü |
| Fatih Sultan Mehmed'in gemileri yağlı kalaslar ve yuvarlak nesnelerle karadan yürütmesi (D19.2) | S6 |

## Bilimsel doğruluk kontrolü
| İfade | Not |
|---|---|
| Sürtünme temas eden yüzeyler arasında harekete karşı koyar (zıt yönde) | 5. sınıf düzeyinde doğru genelleme |
| Pürüzlü yüzeyde sürtünme daha fazla | Günlük örneklerle tutarlı; yakın görünüm "ölçekli değildir" |
| Su ve hava direnci akışkan direncidir; sürtünmenin bir türü olarak ele alınır | TYMM ilişkilendirmesi |
| Sivri biçim su direncini azaltır | Akım çizgili biçim |
| Paraşüt: geniş yüzey → daha çok hava direnci → yavaş iniş | Ağırlık aşağı, hava direnci yukarı |
| Sürtünme aşındırır ve ısıtır; yağlama azaltır | |
| Pürüzlü resim kâğıdı kara kalem/pastel tozunu tutar | Kâğıdın "dişi" |
| 1453, gemiler karadan Haliç'e; yağlanmış kalaslar ve yuvarlak kütükler | TYMM metniyle uyumlu; çizim temsilîdir |

## Teknik notlar
- `props.js` → `window.F08`: Film 5 yardımcıları + `box`, `profile`, `carpet`, `polished`, `farrow`, `fish`, `boat`, `parachute`, `bike`, `galley`, `log`.
- lib/ içinde değişiklik yok. Konsoldaki tek hata `audio/mix.m4a` yokluğu (sessiz sürüm).
