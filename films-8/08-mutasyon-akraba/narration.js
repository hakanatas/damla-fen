// narration.js — 8. sınıf Film 8: "Akraba Evliliği ve Mutasyon"  (Maarif FB.8.3.6 · FB.8.3.7)
const NARRATION = {
  film: '08-mutasyon-akraba',
  title: 'Akraba Evliliği ve Mutasyon',
  outcome: 'FB.8.3.6 · FB.8.3.7',
  voice: 'tr-TR-EmelNeural', rate: '+0%', pitch: '+0Hz',
  beats: [
    // SAHNE 1 — Açılış: aile, kalıtım, soru
    { id: 'title', min: 5.5, pad: 0, text: '' },
    { id: 'question', pad: 0.8, min: 8, text: 'Büyüklerimizden bize genlerle pek çok özellik aktarılır. Peki akraba evliliklerinin genetik sonuçları nelerdir?', key: 'Soru sor' },
    // SAHNE 2 — Beyin fırtınası
    { id: 'ideas', pad: 0.6, min: 8.5, text: 'Sınıfta üç fikir çıktı. Hepsini not ediyorum; sonra kanıtlarla sınayacağım.', key: 'Beyin fırtınası' },
    // SAHNE 3 — Taşıyıcı
    { id: 'recess', pad: 0.5, text: 'Bazı kalıtsal hastalıklara çekinik bir alel yol açar. Ona küçük "a" diyelim.', key: 'Çekinik alel' },
    { id: 'carrier', pad: 0.8, min: 8.5, text: 'Aa genotipli kişi sağlıklı ama taşıyıcıdır. Hastalık yalnızca aa genotipinde ortaya çıkar.', key: 'Taşıyıcı' },
    // SAHNE 4 — Ortak ata: mantıksal temellendirme
    { id: 'ancestor', pad: 0.4, text: 'Bir aile ağacı çizelim. En üstteki büyükbaba taşıyıcı olsun.', key: 'Ortak ata' },
    { id: 'spread', pad: 0.6, min: 7.5, text: 'Alel çocuklara ve torunlara geçebilir. İki kuzen aynı aleli almış olabilir.' },
    { id: 'likely', pad: 0.8, text: 'Akrabalar ortak atalardan gen aldığı için aynı çekinik aleli taşıma olasılıkları daha yüksektir.', key: 'Olasılık artar' },
    // SAHNE 5 — Çaprazlama
    { id: 'cross', pad: 0.4, min: 8, text: 'İki taşıyıcı ebeveyn düşünelim: Aa ile Aa. Çaprazlama tablosunu dolduralım.', key: 'Aa × Aa' },
    { id: 'quarter', pad: 0.8, text: 'Her çocuk için aa olma olasılığı dörtte birdir. Dörtte üç olasılıkla hastalık görülmez.', key: '1/4 olasılık' },
    // SAHNE 6 — Tutarsızlıklar ve geçerli fikir
    { id: 'check1', pad: 0.6, text: 'Fikirleri sınayalım. Birinci fikir tutarsız: olasılık, her çocukta görüleceği anlamına gelmez.', key: 'Tutarsızlığı bul' },
    { id: 'check2', pad: 0.6, text: 'İkinci fikir de tutarsız: akraba olmayanlarda da daha düşük olasılıkla görülebilir.' },
    { id: 'data', pad: 0.6, min: 7.5, text: 'Araştırmalar da akraba evliliklerinde bazı kalıtsal hastalıkların daha sık görüldüğünü gösteriyor.', key: 'Veriler' },
    { id: 'valid', pad: 0.6, text: 'Üçüncü fikir geçerli: Akraba evliliği, çekinik kalıtsal hastalıkların görülme olasılığını artırır.', key: 'Geçerli fikir' },
    { id: 'respect', pad: 0.8, text: 'Bu bir olasılık bilgisidir, kimseyi suçlamaz. Kalıtsal hastalığı olan herkes saygıyı hak eder.', key: 'Saygı' },
    // SAHNE 7 — Mutasyon: örnek olay + araç seçimi
    { id: 'squirrel', pad: 0.6, min: 7.5, text: 'Bir belgeselde bembeyaz bir sincap gördüm. Kardeşleri kahverengiydi. Bu nasıl olabilir?', key: 'Örnek olay' },
    { id: 'tools', pad: 0.8, min: 8, text: 'Araç seçiyorum: güvenilir genel ağ adresleri, basılı kaynaklar ve bir uzmanla görüşme.', key: 'Araç seç' },
    // SAHNE 8 — Mutasyon nedir, nedenleri
    { id: 'define', pad: 0.6, min: 9, text: 'İlk bulgum: DNA’da oluşan kalıcı değişikliklere mutasyon denir. Beyaz sincapta renk genlerinden birinde mutasyon vardır.', key: 'Mutasyon' },
    { id: 'causes', pad: 1.0, min: 9, text: 'Mutasyon kendiliğinden de olabilir. Radyasyon, aşırı güneş ışığı ve bazı kimyasallar ise olasılığını artırır.', key: 'Nedenleri' },
    // SAHNE 9 — Kalıtsal mı?
    { id: 'body', pad: 0.4, text: 'Vücut hücresinde oluşan mutasyon yavruya aktarılmaz.', key: 'Vücut hücresi' },
    { id: 'germ', pad: 1.0, text: 'Üreme hücresinde oluşan mutasyon ise kalıtsaldır; yavru bireye aktarılabilir.', key: 'Üreme hücresi' },
    // SAHNE 10 — Etkiler
    { id: 'effects', pad: 1.0, min: 9, text: 'Mutasyonların etkisi farklıdır: bazıları zararlıdır, birçoğunun belirgin etkisi olmaz, bazıları ise yarar sağlayabilir.', key: 'Olumlu · olumsuz' },
    // SAHNE 11 — Doğrula + sağlıklı yaşam
    { id: 'verify', pad: 0.6, text: 'Bulduklarımı farklı kaynaklarla karşılaştırıp arkadaşlarımla tartışarak doğruluyorum.', key: 'Doğrula' },
    { id: 'health', pad: 1.0, min: 8.5, text: 'Dengeli beslenmek, güneşten korunmak, zararlı maddeler kullanmamak ve kimyasallardan korunmak sağlığımızı korur.', key: 'Sağlıklı yaşam' },
    // SAHNE 12 — Kaydet · Sıra sende · Sıradaki
    { id: 'record', pad: 0.6, min: 9, text: 'Bulduklarımı gözlem defterime kaydediyorum.', key: 'Kaydet' },
    { id: 'task', pad: 0.8, min: 8, text: 'Sıra sende! Güvenilir kaynaklardan mutasyon hakkında bilgi topla ve bir afiş hazırla.', key: 'Sıra sende' },
    { id: 'next', pad: 1.0, text: 'Sıradaki gözlemim: Canlılar yaşadıkları çevreye nasıl uyum sağlar?' },
    { id: 'end', min: 5, pad: 0, text: '' }
  ]
};
if (typeof module !== 'undefined') module.exports = NARRATION; else window.NARRATION = NARRATION;
