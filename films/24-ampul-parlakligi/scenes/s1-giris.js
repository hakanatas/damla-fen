// SAHNE 1–2 — Merak (köprü: uygun aydınlatma) · Değişkenleri tanımlama ve hipotez kurma
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  function book(ctx, x, y, s) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const L = [[-90, 0], [0, 12], [0, -60], [-86, -72], [-90, 0]], R = [[0, 12], [90, 0], [86, -72], [0, -60], [0, 12]];
    [L, R].forEach((pg, i) => { P.fillPts(ctx, pg, PAL.white); stroke(ctx, pg, { w: 2.6, closed: true, seed: 10 + i }); });
    for (let i = 0; i < 4; i++) { line(ctx, [-76, -52 + i * 12], [-14, -44 + i * 12], { w: 1.2, dry: false, alpha: 0.5 }); line(ctx, [14, -44 + i * 12], [74, -52 + i * 12], { w: 1.2, dry: false, alpha: 0.5 }); }
    ctx.restore();
  }
  E.scene({
    name: 'Merak', concept: 'Ampul parlaklığı nelere bağlı?', from: 'title', to: 'q',
    draw(ctx, t) {
      const sh = E.s('hello'), sq = E.s('q');
      ctx.save();
      E.cam(ctx, { x: 960, y: 540, z: 1 + 0.03 * E.se(t, 0, E.e('q'), 'sine') });
      // loş ortam
      ctx.fillStyle = 'rgba(46,70,110,0.14)'; ctx.fillRect(-100, -100, E.W + 200, E.H + 200);
      CK.table(ctx, 820);
      // pilli masa lambası: 1 pil, sönükçe
      const b = 0.3 + 0.03 * Math.sin(t * 3);
      F24.rig(ctx, 1320, 800, 0.9, 1, 1, b, t);
      // Damla kitap okuyor
      const o = { x: 620, y: 822, s: 1.35, view: 'q3', expr: 'neutral', look: [0.3, 0.6], blink: E.blink(t, 2), squash: E.breath(t), t, talk: E.talk(t), seed: 1,
        arms: [[-1, [-34, -52]], [1, [38, -52]]], hold: (c, res) => book(c, 2, -26, 0.5) };
      if (t > sh + 2.5) { o.look = [0.9, -0.3]; o.expr = 'thinking'; }
      if (t > sq) { o.expr = 'curious'; o.look = [0.8, -0.6]; }
      DAMLA.draw(ctx, o);
      ctx.restore();
      // düşünce balonu
      const kb = E.se(t, sq + 0.3, sq + 0.9, 'out');
      if (kb > 0) {
        P.bubble(ctx, 900, 330, 620, 260, [700, 540], kb, 5);
        if (kb > 0.6) {
          CK.bulb(ctx, 710, 420, 0.9, 0.5 + 0.4 * Math.sin(t * 2.2), t);
          P.write(ctx, 'Parlaklık', 810, 320, E.seg(t, sq + 0.9, sq + 1.8), { size: 48 });
          P.write(ctx, 'nelere bağlı?', 810, 385, E.seg(t, sq + 1.5, sq + 2.6), { size: 48 });
        }
      }
      CK.titleCard(ctx, t, 24, 'Ampulün Parlaklığı: Hipotez Kuralım');
    }
  });

  // ---------------- SAHNE 2: değişkenler + hipotez ----------------
  E.scene({
    name: 'Hipotez', concept: 'Değişkenleri tanımlama, hipotez kurma', from: 'vars', to: 'hyp2', trFrom: [900, 330],
    draw(ctx, t) {
      const sv = E.s('vars'), s1 = E.s('hyp1'), s2 = E.s('hyp2');
      ctx.save();
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 80, 1620, 900);
      P.write(ctx, 'Neyi değiştirebilirim?', 300, 220, E.seg(t, sv + 0.3, sv + 1.6), { size: 58 });
      // iki değişken kartı
      const kA = E.se(t, sv + 2.4, sv + 3.0, 'out'), kB = E.se(t, sv + 3.8, sv + 4.4, 'out');
      if (kA > 0) {
        ctx.save(); ctx.translate(560, 420); ctx.rotate(-0.02); ctx.scale(P.pop(kA), P.pop(kA));
        CK.card(ctx, -260, -130, 520, 250, { seed: 30 });
        for (let i = 0; i < 3; i++) CK.battery(ctx, -130 + i * 20, -40 + i * 26 - 20, 0.6);
        INK.label(ctx, 'pil sayısı', 0, 92, { size: 46, weight: 700, align: 'center' });
        ctx.restore();
      }
      if (kB > 0) {
        ctx.save(); ctx.translate(1180, 420); ctx.rotate(0.02); ctx.scale(P.pop(kB), P.pop(kB));
        CK.card(ctx, -260, -130, 520, 250, { seed: 31 });
        for (let i = 0; i < 3; i++) CK.bulb(ctx, -110 + i * 110, 30, 0.7, 0);
        INK.label(ctx, 'ampul sayısı', 0, 92, { size: 46, weight: 700, align: 'center' });
        ctx.restore();
      }
      // hipotezler
      const hyp = (at, n, txt, up, y) => {
        const k = E.se(t, at, at + 0.5); if (k <= 0) return;
        INK.label(ctx, 'Hipotez ' + n + ':', 300, y, { size: 42, weight: 700, color: '#8A4A10', alpha: k });
        P.write(ctx, txt, 510, y, E.seg(t, at + 0.3, at + 2.3), { size: 40 });
        const ka = E.se(t, at + 2.4, at + 3.2);
        if (ka > 0) { ctx.save(); ctx.globalAlpha = ka; INK.label(ctx, up, 510, y + 52, { size: 34, alpha: 0.75 }); ctx.restore(); }
      };
      hyp(s1 + 0.2, 1, 'Pil sayısı artarsa ampul daha parlak yanar.', 'pil sayısı ↑  →  parlaklık ↑', 660);
      hyp(s2 + 0.2, 2, 'Ampul sayısı artarsa her ampul daha sönük yanar.', 'ampul sayısı ↑  →  parlaklık ↓', 800);
      if (t > s2 + 4.0) E.inkText(ctx, '(deneyle test edeceğim)', 510, 900, t, s2 + 4.0, 1e9, { size: 32, alpha: 0.7 });
      DAMLA.draw(ctx, {
        x: 1640, y: 900, s: 0.95, view: 'q3', flip: true, expr: t > s1 ? 'determined' : 'curious', look: [-0.8, -0.3], blink: E.blink(t, 6), squash: E.breath(t), t, talk: E.talk(t), seed: 3,
        arms: t > s1 ? [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]] : [[-1, 2.2], [1, 0.4]], prop: t > s1 ? 'notebook' : null
      });
      ctx.restore();
    }
  });
})();
