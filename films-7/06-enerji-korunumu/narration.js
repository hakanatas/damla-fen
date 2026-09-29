// narration.js — 7. sınıf Film 6: "Enerji Kaybolur mu? Enerjinin Korunumu"  (Maarif FB.7.2.3)
// Tek düzenlenebilir metin kaynağı. Sessiz film: text = altyazı.
const NARRATION = {
  film: '06-enerji-korunumu',
  title: 'Enerji Kaybolur mu? Enerjinin Korunumu',
  outcome: 'FB.7.2.3',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Merak
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'hello', pad: 0.8, text: 'Merhaba! Ben Damla. Bir ipin ucuna top bağlayıp basit bir sarkaç yaptım.' },
    { id: 'question', pad: 0.8, text: 'Top yükselirken yavaşlıyor, alçalırken hızlanıyor. Peki enerjisine ne oluyor?', key: 'Soru sor' },
    { id: 'plan', pad: 0.6, text: 'Birkaç gözlem yapıp bir örüntü arayacağım. Sonra da genelleme yapacağım.', key: 'Tümevarım' },
    // SAHNE 2 — Gözlem 1: sarkaç
    { id: 'p-top', pad: 0.8, min: 8, text: 'Birinci gözlem: Topu yana çekip bıraktım. En yüksek noktada bir an duruyor; çekim potansiyel enerjisi en fazla.', key: 'Sarkaç' },
    { id: 'p-bottom', pad: 0.8, min: 7, text: 'En alçak noktada en hızlı. Potansiyel enerji kinetik enerjiye dönüştü.' },
    { id: 'p-up', pad: 0.8, min: 7, text: 'Öbür tarafa çıkarken yavaşlıyor. Kinetik enerji yeniden potansiyel enerjiye dönüşüyor.' },
    // SAHNE 3 — Gözlem 2 ve 3: serbest düşme, yay
    { id: 'fall', pad: 0.8, min: 8, text: 'İkinci gözlem: Topu serbest bıraktım. Yükseklik azaldıkça sürati artıyor; potansiyel enerji kinetik enerjiye dönüşüyor.', key: 'Serbest düşme' },
    { id: 'spring', pad: 0.8, min: 9, text: 'Üçüncü gözlem: Sıkışmış yay topu fırlattı. Esneklik potansiyel enerjisi önce kinetik, sonra çekim potansiyel enerjisine dönüştü.', key: 'Sarmal yay' },
    // SAHNE 4 — Gözlem 4: eğik düzlem / hız treni, örüntü
    { id: 'coaster', pad: 0.8, min: 9, text: 'Dördüncü gözlem: Oyuncak hız treni. Yokuş aşağı inerken hızlanıyor, yokuş yukarı çıkarken yavaşlıyor.', key: 'Eğik düzlem' },
    { id: 'pattern', pad: 0.8, min: 8, text: 'Bir örüntü buldum! Yükseklik azalınca sürat artıyor, yükseklik artınca sürat azalıyor.', key: 'Örüntü' },
    { id: 'pattern2', pad: 0.8, text: 'Yani kinetik ve potansiyel enerji birbirine dönüşüyor.' },
    // SAHNE 5 — Sürtünme
    { id: 'stop', pad: 0.6, min: 7, text: 'Ama sarkacım her salınımda biraz daha az yükseliyor ve sonunda duruyor. Enerji yok mu oldu?' },
    { id: 'friction', pad: 0.8, text: 'Hayır! Hava ve ipin bağlandığı yerdeki sürtünme, enerjinin bir kısmını ısıya dönüştürür.', key: 'Sürtünme → ısı' },
    { id: 'rub', pad: 0.8, min: 6.5, text: 'Ellerimi birbirine sürtünce ısınıyor. Bu ısı çevreye yayılır ve hareket için kullanılamaz.' },
    { id: 'neglect', pad: 0.8, text: 'Sürtünme çok az olduğunda bu etkiyi ihmal edebiliriz. O zaman top hep aynı yüksekliğe çıkar.', key: 'İhmal edilebilir' },
    // SAHNE 6 — Genelleme
    { id: 'general', pad: 0.8, min: 8, text: 'Genelleme: Enerji yoktan var olmaz, var olan enerji yok olmaz. Yalnızca bir türden başka türe dönüşür.', key: 'Genelleme' },
    { id: 'total', pad: 1.0, min: 8, text: 'Dönüşümler sırasında toplam enerji hep aynı kalır. Buna enerjinin korunumu denir.', key: 'Enerjinin korunumu' },
    // SAHNE 7 — Kaydet, Sıra sende, sonraki film
    { id: 'record', pad: 0.8, min: 12, text: 'Bulduklarımı gözlem defterime kaydediyorum.', key: 'Kaydet' },
    { id: 'task', pad: 0.8, min: 8, text: 'Sıra sende! Bir balık kılçığı diyagramı hazırla ve günlük yaşamdan enerji dönüşümü örneklerini göster.', key: 'Sıra sende' },
    { id: 'next', pad: 0.8, text: 'Sıradaki gözlemim: Yediğimiz besinler vücudumuzda nasıl bir yolculuğa çıkıyor?' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
