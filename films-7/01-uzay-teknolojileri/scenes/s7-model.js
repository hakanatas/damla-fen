// SAHNE 7 — Uzay gözlem aracı modeli: öner → yeni kanıtlar → yenile (FB.7.1.2 a, b · temel kabul: ışığın yansıması)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = U7;
  // yansıtmalı teleskop modeli: sol ağzı açık tüp, sağ uçta çukur ayna, ışınlar odakta toplanır
  function scope(c, x0, x1, yc, h, t, rk, o = {}) {
    const tube = [[x0, yc - h / 2], [x1, yc - h / 2 - 2], [x1 + 2, yc + h / 2], [x0 + 2, yc + h / 2 + 2], [x0, yc - h / 2]];
    P.fillPts(c, tube, '#C9A56A', 0.55); wash(c, tube, '#8A6A45', 0.25, 180, { bleed: 1, blooms: 0 }); stroke(c, tube, { w: 3, closed: true, seed: 181 });
    const mh = h * 0.42, depth = h * 0.16;
    const mx = y => x1 - 8 - depth * (1 - Math.pow((y - yc) / mh, 2));
    const mir = []; for (let i = 0; i <= 20; i++) { const y = yc - mh + i / 20 * 2 * mh; mir.push([mx(y), y]); }
    stroke(c, mir, { w: 7, color: PAL.water, seed: 182, taper: 0 });
    const fx = x1 - 8 - depth - (mh * mh) / (4 * depth);   // parabolik aynanın odağı
    const n = o.rays ?? 4;
    for (let i = 0; i < n; i++) {
      const y = yc - mh * 0.85 + i / (n - 1) * mh * 1.7, xm = mx(y);
      const k1 = E.clamp(rk * 2), k2 = E.clamp(rk * 2 - 1);
      if (k1 > 0) P.drawOn(c, [[x0 - (o.lead ?? 200), y], [E.lerp(x0 - (o.lead ?? 200), xm, k1), y]], 1, { w: 2.4, color: PAL.light, dry: false });
      if (k2 > 0) P.drawOn(c, [[xm, y], [E.lerp(xm, fx, k2), E.lerp(y, yc, k2)]], 1, { w: 2.4, color: PAL.light, dry: false });
    }
    if (rk >= 1) INK.inkDot(c, fx, yc, 6, { color: '192,127,30' });
    return fx;
  }
  function cloud(c, x, y, s) { [[-50, 0, 34], [-10, -20, 40], [36, -4, 32], [0, 10, 36]].forEach(([dx, dy, r]) => P.fillPts(c, circlePts(x + dx * s, y + dy * s, r * s, r * s * 0.8, 24), '#D8DEE6', 1)); }
  E.scene({
    name: 'Model', concept: 'Model önerme ve yenileme', from: 'model', to: 'revise', trFrom: [960, 360],
    draw(ctx, t) {
      const sm = E.s('model'), se = E.s('evidence'), sv = E.s('revise');
      // --- Model 1 ---
      const m1 = 1 - E.se(t, sv - 0.2, sv + 0.6);
      if (m1 > 0) E.layer(ctx, m1, c => {
        const tk = E.se(t, sm + 0.5, sm + 1.5);
        c.save(); c.globalAlpha = tk; scope(c, 560, 1300, 360, 150, t, E.se(t, sm + 4.2, sm + 7.0)); c.restore();
        F.star(c, 230, 360, 14, '#FFE6A8', t);
        INK.label(c, 'yıldızdan gelen ışık', 250, 300, { size: 32, weight: 700, color: F.AMBER_D, alpha: E.se(t, sm + 4.2, sm + 5) });
        INK.label(c, 'karton tüp', 760, 480, { size: 36, weight: 700, alpha: E.se(t, sm + 2, sm + 2.8) });
        INK.label(c, 'çukur ayna', 1300, 480, { size: 36, weight: 700, align: 'center', color: PAL.water, alpha: E.se(t, sm + 3.2, sm + 4) });
        INK.label(c, 'ışık bir noktada toplanır', 1180, 250, { size: 32, align: 'center', alpha: E.se(t, sm + 7.0, sm + 7.8), color: F.AMBER_D });
        INK.label(c, 'Model 1', 1520, 380, { size: 60, weight: 700, alpha: tk });
      });
      // --- yeni kanıtlar ---
      const ek = E.se(t, se + 0.2, se + 0.9, 'out') * (1 - E.se(t, sv - 0.2, sv + 0.6));
      if (ek > 0) E.layer(ctx, ek, c => {
        F.card(c, 160, 570, 760, 320, { seed: 190 });
        INK.label(c, 'Kanıt 1: kaynaklar, arkadaş modelleri', 190, 620, { size: 32, weight: 700, color: F.AMBER_D });
        [[260, 3, 50, 'küçük ayna'], [560, 7, 110, 'büyük ayna']].forEach(([x, n, h, lb], i) => {
          const mir = P.arc(x + 160, 760, h, Math.PI * 0.82, Math.PI * 1.18, 20);
          stroke(c, mir, { w: 6, color: PAL.water, seed: 191 + i, taper: 0 });
          for (let j = 0; j < n; j++) line(c, [x - 20, 760 - h * 0.28 + j * (h * 0.56 / Math.max(1, n - 1))], [x + 40 + (i ? 0 : 20), 760 - h * 0.28 + j * (h * 0.56 / Math.max(1, n - 1))], { w: 2, color: PAL.light, dry: false });
          INK.label(c, lb, x + 60, 860, { size: 30, weight: 700, align: 'center' });
        });
        INK.label(c, '→ daha çok ışık', 440, 700, { size: 32, weight: 700, color: '#4E6B22', alpha: E.se(t, se + 2.4, se + 3.2) });
        const k2 = E.se(t, se + 4.0, se + 4.7, 'out');
        if (k2 > 0) { c.save(); c.globalAlpha = k2; F.card(c, 1000, 570, 760, 320, { seed: 195 }); c.restore();
          INK.label(c, 'Kanıt 2: gözlem koşulları', 1030, 620, { size: 32, weight: 700, color: F.AMBER_D, alpha: k2 });
          c.save(); c.globalAlpha = k2; cloud(c, 1180, 740, 1.1);
          const g = c.createRadialGradient(1560, 820, 5, 1560, 820, 150); g.addColorStop(0, 'rgba(227,160,58,0.8)'); g.addColorStop(1, 'rgba(227,160,58,0)'); c.fillStyle = g; c.fillRect(1400, 670, 330, 210);
          for (let i = 0; i < 8; i++) c.fillRect(1500 + i * 16, 815 + (i % 3) * 12, 8, 14);
          c.restore();
          INK.label(c, 'bulutlar', 1180, 860, { size: 30, weight: 700, align: 'center', alpha: k2 });
          INK.label(c, 'şehir ışıkları', 1560, 865, { size: 30, weight: 700, align: 'center', alpha: k2 });
          INK.label(c, '→ gözlemi zorlaştırır', 1330, 700, { size: 30, weight: 700, color: F.RED, alpha: E.se(t, se + 5.6, se + 6.4), align: 'center' }); }
      });
      // --- Model 2 (yenilendi) ---
      const m2 = E.se(t, sv + 0.3, sv + 1.1);
      if (m2 > 0) E.layer(ctx, m2, c => {
        INK.label(c, 'Model 2 (yenilendi)', 960, 240, { size: 60, weight: 700, align: 'center', color: F.AMBER_D });
        // dağda, büyük aynalı teleskop
        F.night(c, 0.0);
        const mt = [[140, 880], [330, 700], [470, 620], [610, 700], [820, 880]];
        P.fillPts(c, mt, '#5A6478', 0.9); stroke(c, mt, { w: 3, seed: 200 });
        c.save(); c.translate(470, 520); c.rotate(0.6); c.translate(-470, -520); scope(c, 330, 610, 520, 130, t, E.se(t, sv + 1.2, sv + 3.0), { rays: 6, lead: 120 }); c.restore();
        INK.label(c, 'büyük ayna', 640, 450, { size: 34, weight: 700, align: 'center', color: PAL.water, alpha: E.se(t, sv + 1.8, sv + 2.6) });
        INK.label(c, 'karanlık dağ tepesi', 480, 860, { size: 36, weight: 700, align: 'center', color: '#FBF3DC', alpha: E.se(t, sv + 3.2, sv + 4.0) });
        // uzaydaki kopya: güneş paneli + anten
        const sk = E.se(t, sv + 5.2, sv + 6.0, 'out');
        if (sk > 0) {
          c.save(); c.globalAlpha = sk;
          const cx = 1400, cy = 560;
          [-1, 1].forEach(sy => { const p = [[cx - 100, cy + sy * 70], [cx + 60, cy + sy * 70], [cx + 60, cy + sy * 150], [cx - 100, cy + sy * 150], [cx - 100, cy + sy * 70]]; P.fillPts(c, p, PAL.water, 0.55); stroke(c, p, { w: 2.4, closed: true, seed: 210 + sy }); line(c, [cx - 20, cy + sy * 58], [cx - 20, cy + sy * 70], { w: 3 }); });
          scope(c, 1260, 1540, cy, 116, t, 1, { rays: 4, lead: 90 });
          line(c, [1540, cy - 58], [1600, cy - 120], { w: 3 }); stroke(c, P.arc(1612, cy - 132, 26, 2.4, 5.5, 16), { w: 3, seed: 212 });
          c.restore();
          INK.label(c, 'güneş paneli', 1180, 760, { size: 34, weight: 700, align: 'center', alpha: E.se(t, sv + 6.4, sv + 7.2) });
          INK.label(c, 'anten: veriyi Dünya’ya gönderir', 1640, 380, { size: 32, weight: 700, align: 'center', alpha: E.se(t, sv + 7.2, sv + 8.0) });
          INK.label(c, 'uzayda: bulut yok', 1400, 850, { size: 36, weight: 700, align: 'center', color: '#4E6B22', alpha: E.se(t, sv + 8, sv + 8.8) });
        }
      });
      DAMLA.draw(ctx, { x: 1800, y: 905, s: 0.8, view: 'q3', flip: true, expr: t > se && t < sv ? 'surprised' : (t > sv ? 'happy' : 'curious'), look: [-0.8, -0.3], blink: E.blink(t, 6), squash: E.breath(t), t, seed: 4,
        arms: [[-1, 0.35], [1, t > sv + 0.2 && t < sv + 3.4 ? 1.6 + Math.sin(t * 6) * 0.3 : 0.4]] });
    }
  });
})();
