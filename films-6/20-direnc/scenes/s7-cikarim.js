// SAHNE 7 — Çıkarım (FB.6.6.3 c): reosta = ayarlanabilir direnç; semboller; birim ohm (Ω) — Ohm Yasası'na girilmez; günlük yaşam
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  function heater(ctx, x, y, s, t) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const body = CK.densify(CK.rect(-140, -90, 280, 180)); P.fillPts(ctx, body, PAL.white); stroke(ctx, body, { w: 3, closed: true, seed: 610 });
    for (let i = 0; i < 3; i++) { const yy = -50 + i * 34; stroke(ctx, P.arc(-40, yy, 70, Math.PI * 0.1, Math.PI * 0.9, 20, 8).map(q => [q[0], q[1] - 8]), { w: 3, color: '#B5553F', dry: false }); }
    const kn = circlePts(95, 40, 30, 30, 30); P.fillPts(ctx, kn, '#3F3B45', 0.85); stroke(ctx, kn, { w: 2.4, closed: true });
    const a = -1.2 + 0.8 * Math.sin(t * 0.8); line(ctx, [95, 40], [95 + Math.cos(a) * 24, 40 + Math.sin(a) * 24], { w: 4, color: PAL.white, dry: false });
    ['1', '2', '3'].forEach((n, i) => INK.label(ctx, n, 95 + Math.cos(-2.4 + i * 1.2) * 48, 52 + Math.sin(-2.4 + i * 1.2) * 48, { size: 26, align: 'center', weight: 700 }));
    ctx.restore();
  }
  E.scene({
    name: 'Çıkarım', concept: 'Reosta, semboller, ohm', from: 'variable', to: 'daily', trFrom: [960, 540],
    draw(ctx, t) {
      const sv = E.s('variable'), ss = E.s('symbol'), su = E.s('unit'), sd = E.s('daily');
      ctx.save();
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 80, 1620, 900);
      P.write(ctx, 'Çıkarımım', 290, 215, E.seg(t, sv + 0.2, sv + 1.0), { size: 58 });
      P.write(ctx, 'Reosta, değeri değiştirilebilen bir dirençtir.', 290, 300, E.seg(t, sv + 0.8, sv + 2.6), { size: 44 });
      P.write(ctx, '= ayarlanabilir direnç', 330, 365, E.seg(t, sv + 3.2, sv + 4.4), { size: 44, color: '#8A4A10' });
      // semboller
      const k1 = E.se(t, ss + 0.3, ss + 1.5), k2 = E.se(t, ss + 1.6, ss + 2.8);
      if (k1 > 0) { CK.sym(ctx, 'direnc', 400, 490, 1.1, { k: k1 }); INK.label(ctx, 'direnç', 400, 570, { size: 38, weight: 700, align: 'center', alpha: k1 }); }
      if (k2 > 0) { CK.sym(ctx, 'reosta', 650, 490, 1.1, { k: k2 }); INK.label(ctx, 'reosta', 650, 570, { size: 38, weight: 700, align: 'center', alpha: k2 }); }
      const k3 = E.se(t, ss + 2.8, ss + 4.6);
      if (k3 > 0) {
        CK.loop(ctx, { x0: 1000, y0: 440, x1: 1500, y1: 700 }, [{ type: 'pil', side: 'left', f: 0.5, pm: true }, { type: 'ampul', side: 'top', f: 0.5, lit: 0.5 }, { type: 'reosta', side: 'bottom', f: 0.5 }], { s: 0.85, w: 4.6, k: k3 });
        INK.label(ctx, 'pil · ampul · reosta', 1250, 790, { size: 34, align: 'center', alpha: E.se(t, ss + 4.2, ss + 4.8) * 0.8 });
      }
      // birim
      const ku = E.se(t, su + 0.2, su + 0.8, 'out');
      if (ku > 0) {
        ctx.save(); ctx.translate(520, 700); ctx.rotate(-0.02); ctx.scale(P.pop(ku), P.pop(ku));
        CK.card(ctx, -220, -90, 440, 170, { fill: '#F6E7B8', seed: 140 });
        INK.label(ctx, 'Direncin birimi', 0, -30, { size: 38, align: 'center' });
        INK.label(ctx, 'ohm (Ω)', 0, 50, { size: 60, weight: 700, align: 'center', color: '#8A4A10' });
        ctx.restore();
      }
      // günlük yaşam
      const kd = E.se(t, sd + 0.2, sd + 0.8, 'out');
      if (kd > 0) E.layer(ctx, kd, c => {
        CK.card(c, 920, 410, 720, 440, { seed: 150, fill: '#FAF6EC' });
        heater(c, 1280, 580, 1.2, t);
        INK.label(c, 'ısıtıcının ayar düğmesi', 1280, 780, { size: 38, weight: 700, align: 'center' });
        INK.label(c, '→ dirençle ilişkili', 1280, 830, { size: 36, align: 'center', alpha: 0.8 });
      });
      ctx.restore();
    }
  });
})();
