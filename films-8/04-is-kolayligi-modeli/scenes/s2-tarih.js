// SAHNE 2 — Tarihten ilham (zenginleştirme: hiyel ilmi): Arşimet burgusu ve Cezeri'nin su yükselten makinesi
(function () {
  const { PAL, line, stroke, circlePts, wash, dashed } = INK;
  const F = F8M;
  const SEP = '#7A5A36';
  function archimedes(ctx, t, k) {
    // eğik boru içinde sarmal: alttaki sudan yukarı
    const a = [360, 760], b = [760, 420], r = 46;
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]), u = [(b[0] - a[0]) / L, (b[1] - a[1]) / L], n = [-u[1], u[0]];
    const water = [[200, 740], [520, 740], [520, 820], [200, 820], [200, 740]]; P.fillPts(ctx, water, PAL.water, 0.25); line(ctx, [200, 740], [520, 740], { w: 2.4, color: PAL.water, dry: false });
    const tube = [[a[0] + n[0] * r, a[1] + n[1] * r], [b[0] + n[0] * r, b[1] + n[1] * r], [b[0] - n[0] * r, b[1] - n[1] * r], [a[0] - n[0] * r, a[1] - n[1] * r], [a[0] + n[0] * r, a[1] + n[1] * r]];
    P.fillPts(ctx, tube, '#F3E6CC', 0.8); stroke(ctx, tube, { w: 3, closed: true, color: SEP, seed: 4100 });
    const ph = t * 1.5; const pts = [];
    for (let i = 0; i <= 300; i++) { const s = i / 300, ang = s * 7 * 2 * Math.PI - ph; const c = Math.sin(ang); pts.push([a[0] + u[0] * L * s + n[0] * r * 0.9 * c, a[1] + u[1] * L * s + n[1] * r * 0.9 * c]); }
    stroke(ctx, pts, { w: 2.6, color: SEP, dry: false, taper: 0, noBoil: true });
    line(ctx, b, [b[0] + u[0] * 70, b[1] + u[1] * 70], { w: 5, color: SEP });
    line(ctx, [b[0] + u[0] * 70, b[1] + u[1] * 70], [b[0] + u[0] * 70 + 40, b[1] + u[1] * 70 + 50], { w: 5, color: SEP });
    F.txt(ctx, 'Arşimet burgusu', 520, 880, { size: 44, align: 'center', color: SEP });
  }
  function cezeri(ctx, t, k) {
    // yatay dişli (kol ile döner) → dikey dişli → kovalı çark (su yükseltme, temsilî)
    const gx = 1220, gy = 640, th = t * 0.8;
    const water = [[1420, 780], [1780, 780], [1780, 850], [1420, 850], [1420, 780]]; P.fillPts(ctx, water, PAL.water, 0.25); line(ctx, [1420, 780], [1780, 780], { w: 2.4, color: PAL.water, dry: false });
    // yatay dişli (perspektif elips)
    const el = []; for (let i = 0; i <= 48; i++) { const a = i / 48 * 2 * Math.PI; el.push([gx + Math.cos(a) * 150, gy + Math.sin(a) * 40]); }
    P.fillPts(ctx, el, '#F3E6CC'); stroke(ctx, el, { w: 3, closed: true, color: SEP, seed: 4110 });
    for (let i = 0; i < 16; i++) { const a = th + i / 16 * 2 * Math.PI; if (Math.sin(a) < -0.1) continue; line(ctx, [gx + Math.cos(a) * 150, gy + Math.sin(a) * 40], [gx + Math.cos(a) * 150, gy + Math.sin(a) * 40 - 18], { w: 3, color: SEP, dry: false }); }
    line(ctx, [gx, gy], [gx, gy - 160], { w: 6, color: SEP });
    line(ctx, [gx, gy - 150], [gx + Math.cos(th) * 190, gy - 150 + Math.sin(th) * 50], { w: 6, color: SEP });   // döndürme kolu
    // dikey dişli + kovalı çark
    const vx = 1440, vy = 560;
    F.gear(ctx, vx, vy, 70, 12, -th * 1.6, { col: SEP, mark: SEP, seed: 4111, td: 14 });
    const wx = 1600, wy = 560, wr = 200;
    line(ctx, [vx, vy], [wx, wy], { w: 6, color: SEP });
    stroke(ctx, circlePts(wx, wy, wr, wr, 70), { w: 3, closed: true, color: SEP, seed: 4112, noBoil: true });
    for (let i = 0; i < 10; i++) { const a = -th * 1.6 + i / 10 * 2 * Math.PI; const px = wx + Math.cos(a) * wr, py = wy + Math.sin(a) * wr; line(ctx, [wx, wy], [px, py], { w: 1.6, color: SEP, dry: false, alpha: 0.7 }); const pot = circlePts(px, py + 10, 16, 20, 14); P.fillPts(ctx, pot, '#E8C4A8'); stroke(ctx, pot, { w: 2, closed: true, color: SEP, dry: false }); }
    F.txt(ctx, 'Cezeri · 1206', 1450, 850, { size: 44, align: 'center', color: SEP });
    F.txt(ctx, 'su yükselten makine (temsilî çizim)', 1450, 900, { size: 34, align: 'center', color: SEP, alpha: 0.8 });
  }
  E.scene({
    name: 'Tarihten ilham', concept: 'Hiyel ilmi: Arşimet, Cezeri', from: 'history', to: 'cezeri', trFrom: [960, 540],
    draw(ctx, t) {
      const sh = E.s('history'), sc = E.s('cezeri');
      ctx.fillStyle = 'rgba(160,120,70,0.14)'; ctx.fillRect(0, 0, E.W, E.H);
      P.write(ctx, 'Hiyel ilmi: makine bilimi', 960, 250, E.seg(t, sh + 0.2, sh + 1.5), { size: 64, align: 'center', color: SEP });
      if (t > sh + 1.2) P.drawOn(ctx, P.bez([640, 272], [960, 284], [1280, 268], 30), E.se(t, sh + 1.2, sh + 1.8), { w: 3, color: PAL.light });
      const k1 = E.se(t, sh + 1.0, sh + 2.0);
      if (k1 > 0) E.layer(ctx, k1, c => archimedes(c, t, k1));
      const k2 = E.se(t, sc + 0.2, sc + 1.2);
      if (k2 > 0) E.layer(ctx, k2, c => cezeri(c, t, k2));
      const k3 = E.se(t, sc + 3.2, sc + 4.0);
      if (k3 > 0) { ctx.save(); ctx.globalAlpha *= k3; F.tag(ctx, 'dişli çarklar + kol', 1280, 380, { size: 40, color: F.FORCE, seed: 4120 }); ctx.restore(); }
    }
  });
})();
