// SAHNE 4 — Frekans tanımı, birimi hertz (Hz); aynı sürede çok titreşim = yüksek frekans = ince ses; tını (aynı frekans, farklı dalga biçimi)
(function () {
  const { PAL, stroke, line } = INK; const F = S8;
  function wave(ctx, x0, y0, w, amp, cyc, harm, k) {
    const pts = []; for (let j = 0; j <= 240; j++) { const u = j / 240, a = 2 * Math.PI * cyc * u; let y = Math.sin(a); if (harm) y = 0.72 * Math.sin(a) + 0.38 * Math.sin(2 * a + 0.7) + 0.22 * Math.sin(3 * a + 1.2); pts.push([x0 + u * w, y0 - y * amp]); }
    P.drawOn(ctx, pts, k, { w: 4, color: F.AMB, dry: false, taper: 0.02 });
  }
  E.scene({
    name: 'Frekans', concept: 'Frekans, hertz, tını', from: 'freq', to: 'timbre', trFrom: [960, 540],
    draw(ctx, t) {
      const sf = E.s('freq'), sg = E.s('graph'), st = E.s('timbre');
      const aA = 1 - E.se(t, st - 0.3, st + 0.5), aB = E.se(t, st - 0.3, st + 0.5);
      if (aA > 0) E.layer(ctx, aA, c => {
        F.card(c, 360, 175, 1200, 150, 171, { tint: PAL.light, tintA: 0.18 });
        F.fit(c, 'Frekans: 1 saniyedeki titreşim sayısı', 960, 245, 1120, 54);
        F.fit(c, 'birimi: hertz (Hz)', 960, 300, 1120, 42, { color: F.AMB });
        const x0 = 420, w = 1000;
        const kg = E.se(t, sf + 3, sf + 4);
        if (kg > 0) {
          c.save(); c.globalAlpha *= kg;
          line(c, [x0, 390], [x0 + w, 390], { w: 2.4, dry: false }); line(c, [x0, 375], [x0, 405], { w: 2.4, dry: false }); line(c, [x0 + w, 375], [x0 + w, 405], { w: 2.4, dry: false });
          INK.label(c, 'aynı süre (ör. 1 saniye)', x0 + w / 2, 370, { size: 34, weight: 700, align: 'center' });
          c.restore();
        }
        const k1 = E.se(t, sg + 0.3, sg + 2.2), k2 = E.se(t, sg + 2.8, sg + 4.6);
        F.graph(c, x0 - 20, 430, w + 40, 170, 12, 55, k1, { axis: false, seed: 181 });
        F.graph(c, x0 - 20, 650, w + 40, 170, 4, 55, k2, { axis: false, seed: 182 });
        if (k1 > 0.9) { F.wfit(c, 'çok titreşim', 1480, 490, 1, 38, 400); F.wfit(c, 'yüksek frekans', 1480, 540, 1, 38, 400, { color: F.AMB }); F.wfit(c, '→ ince ses', 1480, 590, E.seg(t, sg + 5, sg + 6), 42, 400); }
        if (k2 > 0.9) { F.wfit(c, 'az titreşim', 1480, 710, 1, 38, 400); F.wfit(c, 'düşük frekans', 1480, 760, 1, 38, 400, { color: PAL.water }); F.wfit(c, '→ kalın ses', 1480, 810, E.seg(t, sg + 6, sg + 7), 42, 400); }
        F.damla(c, t, { x: 200, y: 900, s: 0.85, expr: 'curious', look: [0.8, -0.4], arms: [[-1, 0.4], [1, 2.2]] });
      });
      if (aB > 0) E.layer(ctx, aB, c => {
        P.write(c, 'Aynı frekans, farklı tını', 960, 225, E.seg(t, st + 0.4, st + 1.6), { size: 62, align: 'center' });
        F.card(c, 200, 300, 720, 520, 191); F.card(c, 1000, 300, 720, 520, 192);
        F.flute(c, 350, 420, 1.0, t, 0.8); F.baglama(c, 1480, 450, 0.6, t, 0.8, { rot: 0.3 });
        F.fit(c, 'flüt', 560, 530, 300, 46); F.fit(c, 'bağlama', 1360, 530, 300, 46);
        wave(c, 250, 670, 620, 70, 4, false, E.se(t, st + 1.2, st + 2.6));
        wave(c, 1050, 670, 620, 70, 4, true, E.se(t, st + 1.8, st + 3.2));
        [[250, 870], [1050, 1670]].forEach(([a, b]) => { const k = E.se(t, st + 3.4, st + 4.2); if (k <= 0) return; c.save(); c.globalAlpha *= k; for (let i = 0; i <= 4; i++) line(c, [a + i * (b - a) / 4, 755], [a + i * (b - a) / 4, 775], { w: 2, dry: false }); INK.label(c, '4 titreşim', (a + b) / 2, 805, { size: 32, weight: 700, align: 'center', alpha: 0.8 }); c.restore(); });
        F.fit(c, 'dalga biçimi farklı → kulağımız ayırt eder', 960, 890, 1200, 42, { color: F.AMB, alpha: E.se(t, st + 4.6, st + 5.4) });
      });
    }
  });
})();
