// SAHNE 7 — Dönme hareketi: güneş lekelerinin günler içinde kayması → Güneş kendi ekseni etrafında döner
// (TYMM: "Güneş lekelerini fark etmeleri ve dönme yönünü keşfetmeleri sağlanabilir"; saat yönü ön bilgisi)
(function () {
  const { PAL, line, stroke, circlePts, arrowHead, dashed, rng } = INK;
  const D2R = Math.PI / 180, W_DAY = 360 / 25; // ≈ 14.4° per day (equatorial ~25 days)
  const GROUPS = [{ lat: 16, lon0: -62, s: 1 }, { lat: -11, lon0: -26, s: 0.75 }];
  function spotsFor(cx, cy, R, lonShift) {
    const out = [];
    GROUPS.forEach(g => { const L = (g.lon0 + lonShift) * D2R, f = g.lat * D2R; const c = Math.cos(L); if (c > 0.05) out.push([cx + R * Math.cos(f) * Math.sin(L), cy - R * Math.sin(f), R * 0.06 * g.s, Math.max(0.25, c)]); });
    return out;
  }
  function card(ctx, x, y, day, t, hl) {
    ctx.save(); ctx.translate(x, y); ctx.rotate([-0.03, 0.02, -0.015, 0.03][(day - 1) / 2]);
    const fr = [[-175, -190], [175, -194], [178, 200], [-172, 204], [-175, -190]];
    ctx.save(); ctx.shadowColor = 'rgba(60,40,20,0.25)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 6; P.fillPts(ctx, fr, '#FAF6EC'); ctx.restore();
    stroke(ctx, fr, { w: 2.4, closed: true, seed: day });
    P.fillPts(ctx, [[-150, -165], [150, -165], [150, 135], [-150, 135]], '#2A2830', 0.92); // dark filtered photo background
    P.sun(ctx, 0, -15, 128, t, { rays: false, glow: false, cells: false, spots: spotsFor(0, -15, 128, (day - 1) * W_DAY), seed: 3 });
    ctx.font = '700 44px Kalam'; ctx.textAlign = 'center'; ctx.fillStyle = PAL.ink; ctx.fillText(day + '. gün', 0, 185);
    // tape
    P.fillPts(ctx, [[-50, -210], [50, -206], [48, -176], [-52, -180]], 'rgba(227,200,140,0.7)');
    ctx.restore();
    if (hl > 0) { ctx.save(); ctx.globalAlpha = hl; stroke(ctx, INK.wobble(circlePts(x, y, 210, 230, 60), 4, day * 3), { w: 5, closed: true, color: PAL.light }); ctx.restore(); }
  }
  E.scene({
    name: 'Dönme', concept: 'Güneş kendi ekseni etrafında döner (≈ 25 gün)', from: 'rotate-q', to: 'ccw', trFrom: [960, 540],
    draw(ctx, t) {
      const sq = E.s('rotate-q'), ss = E.s('spots'), sd = E.s('days'), sr = E.s('rotation'), sc = E.s('ccw');
      const xs = [300, 720, 1140, 1560], cy = 520;
      const zIn = E.se(t, ss - 0.2, ss + 1.4), zOut = E.se(t, sd - 0.5, sd + 0.6);
      const cam = E.camLerp(E.camLerp({ x: 960, y: 540, z: 1 }, { x: 420, y: 560, z: 1.8 }, zIn), { x: 960, y: 540, z: 1 }, zOut);
      const cardsA = 1 - E.se(t, sr - 0.4, sr + 0.4);
      if (cardsA > 0) E.layer(ctx, cardsA, c => {
        c.save(); E.cam(c, cam);
        c.fillStyle = 'rgba(138,106,69,0.12)'; c.fillRect(-100, -100, 2200, 1300);
        if (t < sq + 4.6) { // intro: filtered telescope at observatory
          const k = 1 - E.se(t, sq + 4.2, sq + 4.8);
          c.save(); c.globalAlpha = k; P.icon.observatory(c, 960, 520, 1.6); c.restore();
          E.inkText(c, 'gözlemevi · güneş filtreli teleskop', 960, 800, t, sq + 0.8, sq + 4.8, { size: 44, align: 'center' });
        }
        xs.forEach((x, i) => {
          const at = sq + 4.6 + i * 0.5, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
          let hl = 0; const hs = [sd + 0.1, sd + 1.5, sd + 3.0, sd + 4.3][i]; if (t > hs) hl = Math.min(1, (t - hs) / 0.4) * (1 - E.se(t, sd + 5.6, sd + 6.4) * 0.6);
          c.save(); c.translate(x, cy + (1 - k) * 700); c.rotate((1 - k) * 0.5); card(c, 0, 0, i * 2 + 1, t, hl); c.restore();
        });
        // spot label (zoomed on card 1)
        const lk = E.se(t, ss + 1.4, ss + 2.2) * (1 - zOut);
        if (lk > 0) {
          const sp = spotsFor(300, cy - 15, 128, 0)[0];
          c.save(); c.globalAlpha = lk; INK.leader(c, [200, 312], [sp[0] - 4, sp[1] - 6], { w: 1.4, bend: -0.2 }); c.restore();
          P.write(c, 'Güneş lekesi', 150, 300, lk, { size: 30 });
          P.write(c, 'çevresinden daha soğuk,', 480, 296, E.se(t, ss + 3.4, ss + 4.4) * (1 - zOut), { size: 24, weight: 400 });
          P.write(c, 'bu yüzden koyu görünür', 480, 326, E.se(t, ss + 4.4, ss + 5.4) * (1 - zOut), { size: 24, weight: 400 });
        }
        // same direction arrow
        const ak = E.se(t, sd + 4.6, sd + 5.8);
        if (ak > 0) { P.arrow(c, [220, 830], [1700, 830], ak, { w: 5, color: '#C07F1E', bend: 30, head: 24 }); if (ak > 0.9) E.inkText(c, 'lekeler hep aynı yöne kayıyor', 960, 910, t, sd + 5.6, 1e9, { size: 46, align: 'center' }); }
        c.restore();
      });

      // rotating sphere
      const rotA = Math.min(E.se(t, sr - 0.2, sr + 0.6), 1 - E.se(t, sc - 0.3, sc + 0.5));
      if (rotA > 0) E.layer(ctx, rotA, c => {
        const x = 960, y = 540, R = 300, sh = ((t - sr) / 12) * 360; // visual speed: 1 turn / 12 s (real: ~25 days)
        dashed(c, [[x, y - R - 110], [x, y + R + 110]], { w: 3, on: 14, off: 10 });
        P.sun(c, x, y, R, t, { spots: spotsFor(x, y, R, sh).concat(spotsFor(x, y, R, sh + 180)), cells: false, nrays: 28 });
        line(c, [x, y - R - 110], [x, y - R + 4], { w: 4 }); INK.label(c, 'K', x + 18, y - R - 80, { size: 44, weight: 700 });
        const eq = P.arc(x, y + 20, R * 1.18, Math.PI * 0.22, Math.PI * 0.78, 30, R * 0.28).reverse();
        stroke(c, eq, { w: 5, color: '#C07F1E' }); arrowHead(c, eq[26], eq[30], 22, { w: 4.4, color: '#C07F1E' });
        E.inkText(c, 'eksen', x + 30, y + R + 90, t, sr + 1.5, 1e9, { size: 40 });
        E.inkText(c, 'kendi ekseni etrafında döner', 1560, 200, t, sr + 1.8, 1e9, { size: 44, align: 'center' });
      });

      // top view from the north + clock + 25 days
      const topA = E.se(t, sc - 0.3, sc + 0.6);
      if (topA > 0) E.layer(ctx, topA, c => {
        const x = 600, y = 480, R = 220;
        P.sun(c, x, y, R, t, { cells: false, nrays: 24 });
        INK.label(c, 'K', x, y + 16, { size: 56, weight: 700, align: 'center' }); INK.inkDot(c, x, y + 30, 5);
        const a0 = -0.3 - E.seg(t, sc + 0.5, sc + 3) * 0; const spin = -(t - sc) * 0.9;
        const arc = P.arc(x, y, R * 1.32, spin + 2.0, spin - 2.2, 50);
        stroke(c, arc, { w: 6, color: '#C07F1E' }); arrowHead(c, arc[46], arc[50], 26, { w: 5, color: '#C07F1E' });
        E.inkText(c, 'Kuzeyden bakış', x, 110, t, sc + 0.4, 1e9, { size: 46, align: 'center' });
        // Earth below: we see the near side moving left → right (consistent with the spots)
        P.earth(c, x, y + R + 150, 26); INK.label(c, 'Dünya (biz)', x + 50, y + R + 162, { size: 32 });
        // clock comparison
        const ck = E.se(t, sc + 2.2, sc + 3.0, 'out');
        if (ck > 0) {
          c.save(); c.globalAlpha = ck;
          P.icon.clock(c, 1180, 360, 1.2, (t - sc) * 2);
          const ca = P.arc(1180, 360, 108, -2.3, -0.4, 24); stroke(c, ca, { w: 3.4, alpha: 0.6 }); arrowHead(c, ca[20], ca[24], 14, { w: 3 });
          INK.label(c, 'saat yönü', 1180, 520, { size: 36, align: 'center', alpha: 0.7 });
          c.restore();
          P.write(c, 'Güneş: saat yönünün tersine', 1000, 640, E.se(t, sc + 3.0, sc + 4.2), { size: 44, color: '#8A4A10' });
        }
        const dk = E.se(t, sc + 4.8, sc + 5.6, 'out');
        if (dk > 0) { c.save(); c.translate(1120, 820); c.scale(P.pop(dk) * 1.15, P.pop(dk) * 1.15); P.icon.calendar(c, 0, 0, 1, '25'); c.restore(); P.write(c, '1 tur ≈ 25 gün', 1230, 845, E.se(t, sc + 5.4, sc + 6.4), { size: 60 }); }
      });
    }
  });
})();
