// SAHNE 3 — Merkezî sinir sistemindeki yapılar ve görevleri (beynin ayrıntılı yapısına girilmez)
(function () {
  const { PAL, leader } = INK; const K = KIT, F = F09;
  const PARTS = [
    ['brain', 'Beyin', ['düşünme, öğrenme, hafıza', 'duyu bilgilerini yorumlar', 'istemli hareketleri yönetir'], 960, 190],
    ['cereb', 'Beyincik', ['dengeyi sağlar', 'hareketleri düzenli ve', 'uyumlu kılar'], 1400, 190],
    ['medulla', 'Omurilik soğanı', ['kalp atışı, soluk alıp verme', 'yutkunma, öksürme, hapşırma', '→ istemsiz olaylar'], 960, 550],
    ['cord', 'Omurilik', ['beyin ↔ vücut iletim yolu', 'bazı reflekslerin merkezi', 'omurga içinde korunur'], 1400, 550]
  ];
  E.scene({
    name: 'Yapılar', concept: 'Beyin, beyincik, omurilik soğanı, omurilik', from: 'brain', to: 'cord', trFrom: [575, 390],
    draw(ctx, t) {
      const beats = ['brain', 'cereb', 'medulla', 'cord'];
      let cur = null; beats.forEach(b => { if (t >= E.s(b)) cur = b; });
      const A = F.head(ctx, { hi: cur });
      INK.label(ctx, 'sade şema · ölçekli değildir', 540, 180, { size: 28, align: 'center', alpha: 0.55 });
      K.text(ctx, 'kafatası', 250, 300, { size: 30, color: '#8A6A45', alpha: 0.75 });
      K.text(ctx, 'omurga', 290, 850, { size: 30, color: '#8A6A45', alpha: 0.75 });
      const lab = (txt, tx, ty, to, a0, o = {}) => { const k = E.se(t, a0, a0 + 0.6); if (k <= 0) return; if (to) { ctx.save(); ctx.globalAlpha = k; leader(ctx, [tx + (o.dx ?? 0), ty - 12], to, { bend: 0.1 }); ctx.restore(); } K.text(ctx, txt, tx, ty, { size: o.size ?? 40, alpha: k, color: K.LIFE_D, align: o.align ?? 'left' }); };
      lab('beyin', 575, 405, null, E.s('brain') + 0.3, { align: 'center', size: 46 });
      lab('beyincik', 150, 690, [430, 575], E.s('cereb') + 0.3, { dx: 120 });
      lab('omurilik soğanı', 690, 745, [553, 590], E.s('medulla') + 0.3, { dx: 0 });
      lab('omurilik', 690, 855, [546, 820], E.s('cord') + 0.3, { dx: 0 });
      PARTS.forEach(([id, name, items, x, y], i) => {
        const s0 = E.s(id), k = E.se(t, s0 + 0.4, s0 + 1.0, 'out'); if (k <= 0) return;
        E.layer(ctx, k, c => {
          K.card(c, x, y, 410, 330, { seed: 8200 + i, tint: cur === id ? PAL.light : PAL.life, tintA: cur === id ? 0.14 : 0.06 });
          K.text(c, name, x + 24, y + 62, { size: 44, color: K.LIFE_D, maxW: 370 });
          items.forEach((it, j) => { const kk = E.seg(t, s0 + 1.2 + j * 1.3, s0 + 2.2 + j * 1.3); if (kk <= 0) return; c.save(); c.globalAlpha *= Math.min(1, kk * 1.5); K.text(c, it, x + 24, y + 140 + j * 66, { size: 32, maxW: 370 }); c.restore(); });
        });
      });
    }
  });
})();
