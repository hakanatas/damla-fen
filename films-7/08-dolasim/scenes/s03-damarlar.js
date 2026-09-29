// SAHNE 3 — Damar çeşitleri: atardamar, toplardamar, kılcal damar (özel damar adı verilmez)
(function () {
  const { PAL, stroke, line, circlePts, wash, inkDot } = INK; const K = KIT, F = F08;
  const ART = F.cr([[400, 470], [500, 380], [700, 370], [900, 380], [1060, 390]], 10);
  const VEIN = F.cr([[1060, 690], [900, 700], [700, 710], [500, 700], [400, 600]], 10);
  const CAPS = [0, 1, 2, 3, 4].map(i => F.cr([[1060, 390], [1110 + i * 8, 420 + i * 20], [1170 + (i % 2) * 40, 470 + i * 45], [1150 - (i % 2) * 30, 560 + i * 25], [1100 + i * 6, 650 + i * 5], [1060, 690]], 8));
  const CELLS = [[1250, 470], [1245, 590], [1180, 530], [1300, 530], [1215, 650], [1195, 420]];
  function tube(ctx, pts, col, wall, lumen, k) { const pp = F.upto(pts, k); stroke(ctx, pp, { w: lumen + wall * 2, color: col, dry: false, taper: 0.01 }); stroke(ctx, pp, { w: lumen, color: '#F6E6E0', dry: false, taper: 0.01 }); stroke(ctx, pp, { w: lumen * 0.55, color: col, alpha: 0.35, dry: false, taper: 0.01 }); }
  function xsec(ctx, x, y, R, wall, col, lab, k) { if (k <= 0) return; ctx.save(); ctx.globalAlpha *= k; const o = circlePts(x, y, R, R * 0.92, 40); P.fillPts(ctx, o, col, 0.75); const i = circlePts(x, y, R - wall, (R - wall) * 0.92, 40); P.fillPts(ctx, i, '#F6E6E0'); stroke(ctx, o, { w: 2.4, closed: true, dry: false }); stroke(ctx, i, { w: 1.6, closed: true, dry: false });
    K.text(ctx, lab, x + R + 20, y + 10, { size: 30, alpha: 0.85 }); ctx.restore(); }
  E.scene({
    name: 'Damarlar', concept: 'Atardamar, toplardamar, kılcal damar', from: 'artery', to: 'capil', trFrom: [300, 540],
    draw(ctx, t) {
      const sa = E.s('artery'), sv = E.s('vein'), sc = E.s('capil');
      const cur = t < sv ? 'artery' : t < sc ? 'vein' : 'capil';
      F.heart(ctx, 330, 540, 0.9, { beat: ((t % 0.8) / 0.8) < 0.3 ? Math.sin(((t % 0.8) / 0.8) / 0.3 * Math.PI) : 0, vessels: false });
      K.text(ctx, 'kalp', 330, 680, { size: 36, align: 'center', color: F.HEART });
      const ak = E.se(t, sa + 0.3, sa + 2.0), vk = E.se(t, sv + 0.3, sv + 2.0), ck = E.se(t, sc + 0.3, sc + 1.5);
      // hücreler (doku)
      if (ck > 0) { ctx.save(); ctx.globalAlpha *= ck; CELLS.forEach(([x, y], i) => { const c = K.blob(x, y, 42, 34, 8400 + i, 0.08); P.fillPts(ctx, c, '#EFE6CC'); wash(ctx, c, PAL.life, 0.25, 8410 + i, { bleed: 0.5, blooms: 0 }); stroke(ctx, c, { w: 1.8, closed: true, dry: false, color: '#4E6628' }); inkDot(ctx, x, y, 5, { color: '78,102,40' }); });
        CAPS.forEach((c, i) => { for (let j = 0; j < c.length - 1; j++) { const f = 1 - j / (c.length - 1); stroke(ctx, [c[j], c[j + 1]], { w: 4, color: F.oxCol(f), dry: false, taper: 0 }); } }); ctx.restore(); }
      if (ak > 0) tube(ctx, ART, F.OXY, 9, 20, ak);
      if (vk > 0) tube(ctx, VEIN, F.LOW, 4, 26, vk);
      // akış
      const dots = (pts, t0, rgb, n = 5) => { if (t < t0) return; for (let j = 0; j < n; j++) { const u = ((t - t0) * 0.16 + j / n) % 1; const p = F.at(pts, u); inkDot(ctx, p[0], p[1], 6, { color: rgb }); } };
      dots(ART, sa + 2.0, '150,40,30'); dots(VEIN, sv + 2.0, '60,62,120');
      if (t > sc + 1.5) CAPS.forEach((c, i) => { const u = ((t - sc) * 0.3 + i * 0.2) % 1; const p = F.at(c, u); inkDot(ctx, p[0], p[1], 4, { color: F.oxRGB(1 - u) }); });
      // yön okları ve etiketler
      if (ak > 0.9) { P.arrow(ctx, [620, 320], [780, 318], 1, { w: 3, head: 12, color: F.OXY }); K.text(ctx, 'atardamar', 700, 290, { size: 38, align: 'center', color: F.OXY }); }
      if (vk > 0.9) { P.arrow(ctx, [780, 770], [620, 772], 1, { w: 3, head: 12, color: F.LOW }); K.text(ctx, 'toplardamar', 700, 820, { size: 38, align: 'center', color: F.LOW }); }
      if (ck > 0.5) { K.text(ctx, 'kılcal damarlar', 1170, 360, { size: 34, align: 'center', color: '#4E6628', alpha: ck }); K.text(ctx, 'hücreler', 1250, 760, { size: 30, align: 'center', alpha: ck * 0.8 });
        const xk = E.se(t, sc + 3.5, sc + 4.2); if (xk > 0) { ctx.save(); ctx.globalAlpha = xk; K.text(ctx, 'O₂, besin → hücrelere', 1080, 815, { size: 28, color: F.OXY }); K.text(ctx, 'CO₂, atık → kana', 1080, 855, { size: 28, color: F.LOW }); ctx.restore(); } }
      // kesitler
      xsec(ctx, 500, 225, 50, 18, F.OXY, 'kalın çeper', E.se(t, sa + 3.0, sa + 3.7) * (t < sc ? 1 : 0.5));
      xsec(ctx, 500, 880 - 30, 52, 8, F.LOW, 'ince çeper', E.se(t, sv + 3.0, sv + 3.7) * (t < sc ? 1 : 0.5));
      // kartlar
      const CARD = { artery: ['Atardamar', ['kanı kalpten vücuda', 'götürür', 'kalın, esnek çeper', 'nabız hissedilir'], F.OXY], vein: ['Toplardamar', ['kanı vücuttan kalbe', 'getirir', 'daha ince çeper'], F.LOW], capil: ['Kılcal damar', ['çok ince çeper', 'hücrelerle madde', 'alışverişi burada'], '#4E6628'] };
      ['artery', 'vein', 'capil'].forEach((b, i) => { const s0 = E.s(b), e0 = E.e(b), k = Math.min(E.se(t, s0 + 0.2, s0 + 0.8, 'out'), 1 - E.se(t, e0 - 0.3, e0 + 0.2)); if (k <= 0) return; const [ti, items, col] = CARD[b];
        E.layer(ctx, k, c => { K.card(c, 1420, 230, 440, 440, { seed: 8420 + i, tint: col, tintA: 0.07 }); K.text(c, ti, 1450, 305, { size: 46, color: col, maxW: 390 });
          items.forEach((it, j) => P.write(c, it, 1450, 385 + j * 64, E.seg(t, s0 + 0.9 + j * 0.9, s0 + 1.8 + j * 0.9), { size: 34 })); }); });
      INK.label(ctx, 'şema · ölçekli değildir', 60, 205, { size: 28, alpha: 0.55 });
    }
  });
})();
