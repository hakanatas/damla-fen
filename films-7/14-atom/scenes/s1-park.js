// SAHNE 1 — Parkta kum: madde taneciklerden oluşur; folyoyu bölme → en küçük parça merakı (FB.7.5.1 uygulaması)
(function () {
  const { PAL, line, stroke, circlePts, rng } = INK;
  const F = F7M;
  E.scene({
    name: 'Parkta kum', concept: 'Madde taneciklerden oluşur', from: 'title', to: 'smallest',
    draw(ctx, t) {
      const hill = P.hillLine(E.W);
      const sh = E.s('hello'), sg = E.s('grains'), sf = E.s('foil'), ss = E.s('smallest');
      P.landscape(ctx, E.W, E.H, t, { hill, treeAt: [150, P.hillY(hill, 150) + 6] });
      const dx = 520, dy = P.hillY(hill, dx) + 4, S = 1.35;
      const pouring = t > sh + 0.6 && t < sg + 1.5;
      const heapK = E.se(t, sh + 0.8, sg + 1.5);
      const expr = t > ss ? 'thinking' : (t > sg ? 'curious' : 'happy');
      F.damla(ctx, t, {
        x: dx, y: dy, s: S, view: 'q3', expr, look: t > sf ? [0.9, -0.3] : [0.7, 0.5], seed: 2,
        arms: pouring ? [[-1, 0.35], [1, 1.45]] : (t > ss ? [[-1, 0.35], [1, [40, -150]]] : [[-1, 0.35], [1, 0.45]]),
        hold: (c, res) => {
          const h = res[1] && res[1].hand; if (!h) return;
          const gx = 150, gy = -4;
          // kum yığını (yerde)
          if (heapK > 0) {
            const w = 70 * (0.35 + 0.65 * heapK), hh = 34 * heapK;
            const heap = []; for (let i = 0; i <= 24; i++) { const u = i / 24; heap.push([gx - w + 2 * w * u, gy - Math.sin(u * Math.PI) * hh]); }
            P.fillPts(c, heap, '#D9B77A'); stroke(c, heap, { w: 2.4, seed: 21, dry: false });
            const R = rng(31); for (let i = 0; i < 26 * heapK; i++) { const u = R(), x = gx - w * 0.9 + 1.8 * w * u; const top = Math.sin(u * Math.PI) * hh; F.grain(c, x, gy - R() * top * 0.9 - 2, 3.2, i); }
          }
          // akan kum taneleri
          if (pouring) {
            const R = rng(41);
            for (let i = 0; i < 26; i++) {
              const ph = ((t * 1.3 + R()) % 1); const x0 = h[0] + 4 + (R() - 0.5) * 10, y0 = h[1] + 8;
              const x = x0 + (gx - x0) * ph + Math.sin(i + t * 3) * 3, y = y0 + (gy - 20 - y0) * ph * ph;
              F.grain(c, x, y, 3.4, i);
            }
          }
        }
      });
      // büyüteç: kum taneleri yakından
      const lk = Math.min(E.se(t, sg + 0.3, sg + 1.2, 'out'), 1 - E.se(t, sf - 0.2, sf + 0.4));
      if (lk > 0) E.layer(ctx, lk, c => {
        const cx = 1240, cy = 470, r = 250;
        const hx = dx + 150 * S, hy = dy - 10;
        INK.leader(c, [cx - r * 0.8, cy + r * 0.6], [hx + 10, hy - 20], { w: 2, bend: 0.1 });
        const disk = circlePts(cx, cy, r, r, 80);
        P.fillPts(c, disk, '#FBF3E0');
        c.save(); c.beginPath(); c.arc(cx, cy, r - 4, 0, 7); c.clip();
        const R = rng(7);
        for (let i = 0; i < 60; i++) { const a = R() * 6.283, d = Math.sqrt(R()) * r * 1.05; F.grain(c, cx + Math.cos(a) * d, cy + Math.sin(a) * d, 26 + R() * 12, i); }
        c.restore();
        stroke(c, disk, { w: 7, closed: true, seed: 61 });
        line(c, [cx + r * 0.72, cy + r * 0.72], [cx + r * 1.08, cy + r * 1.05], { w: 16, taper: 0.02 });
        P.write(c, 'kum taneleri', cx - 20, cy - r - 30, E.seg(t, sg + 1.0, sg + 2.0), { size: 50, align: 'center' });
      });
      // folyo bölme dizisi
      const fk = E.se(t, sf, sf + 0.6, 'out');
      if (fk > 0) E.layer(ctx, fk, c => {
        F.card(c, 830, 250, 1830, 700, { seed: 71 });
        P.write(c, 'alüminyum folyo', 880, 330, E.seg(t, sf + 0.1, sf + 1.0), { size: 48 });
        let x = 890; const y = 520; const ws = [200, 100, 50, 25, 12, 6];
        ws.forEach((w, i) => {
          const at = sf + 0.6 + i * 0.75; const k = E.se(t, at, at + 0.4, 'out'); if (k <= 0) return;
          const h = w * 0.75; const r = F.rect(x, y - h / 2, x + w, y + h / 2);
          c.save(); c.globalAlpha *= k;
          const g = c.createLinearGradient(x, y - h / 2, x + w, y + h / 2); g.addColorStop(0, '#E9ECEE'); g.addColorStop(0.5, '#B9C0C6'); g.addColorStop(1, '#DDE2E5');
          c.fillStyle = g; c.fillRect(x, y - h / 2, w, h); stroke(c, r, { w: w > 20 ? 2.4 : 1.4, closed: true, dry: false, seed: 80 + i });
          c.restore();
          { const ak = E.se(t, at + 0.35, at + 0.7); if (ak > 0) { P.arrow(c, [x + w + 10, y], [x + w + 56, y], ak, { w: 2.4, head: 10 }); INK.label(c, '÷2', x + w + 20, y - 18, { size: 30, weight: 700, alpha: 0.7 * ak }); } }
          x += w + 66;
        });
        const qk = E.se(t, ss + 0.3, ss + 1.0, 'out');
        if (qk > 0) {
          INK.label(c, '?', 1745, 555, { size: 110 * P.pop(qk), weight: 700, color: PAL.water, align: 'center' });
          P.write(c, 'Daha da küçülür mü? Görülebilir mi?', 880, 650, E.seg(t, ss + 0.8, ss + 2.2), { size: 42, color: PAL.water });
        }
      });
      F.title(ctx, t, '14 · Atomun İçine Yolculuk');
    }
  });
})();
