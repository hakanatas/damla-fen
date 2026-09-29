// SAHNE 3 — Nitelikleri belirleme: anlam çözümleme tablosu + hacimsel büyüklük karşılaştırması (FB.6.1.1 a)
// TYMM: uydu SAYILARINA girilmez → yalnızca "var / yok".
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = G61;
  const X0 = 250, X1 = 1720, Y0 = 180, HH = 78, RH = 74;
  const COLS = [{ h: 'Karasal', k: 'rock' }, { h: 'Gazsal', k: 'gas' }, { h: 'Halkası var', k: 'ring' }, { h: 'Uydusu var', k: 'moon' }];
  const CW0 = 410, CW = (X1 - X0 - CW0) / 4;
  const cx = j => X0 + CW0 + CW * (j + 0.5);
  const ry = i => Y0 + HH + RH * (i + 0.5);

  function table(ctx, t) {
    const st = E.s('traits'), sr = E.s('rings');
    F.card(ctx, X0 - 20, Y0 - 20, X1 - X0 + 40, HH + RH * 8 + 40, { seed: 31 });
    // ızgara
    ctx.save(); ctx.globalAlpha = 0.55;
    for (let i = 0; i <= 8; i++) line(ctx, [X0, Y0 + HH + RH * i], [X1, Y0 + HH + RH * i], { w: i === 0 ? 2.6 : 1.2, dry: false, seed: 40 + i });
    for (let j = 0; j <= 4; j++) line(ctx, [X0 + CW0 + CW * j, Y0 + 6], [X0 + CW0 + CW * j, Y0 + HH + RH * 8], { w: j === 0 ? 2.6 : 1.2, dry: false, seed: 50 + j });
    ctx.restore();
    INK.label(ctx, 'Gezegen', X0 + 30, Y0 + 54, { size: 40, weight: 700 });
    COLS.forEach((c, j) => {
      const at = j < 2 ? st + 0.3 + j * 0.3 : sr + 0.2 + (j - 2) * 2.2;
      P.write(ctx, c.h, cx(j), Y0 + 54, E.seg(t, at, at + 0.8), { size: 38, align: 'center', color: j < 2 ? PAL.ink : '#8A4A10' });
    });
    F.PLANETS.forEach((p, i) => {
      const y = ry(i);
      F.planet(ctx, i, X0 + 52, y, i >= 4 ? 22 : 16, { rings: i === 5 });
      INK.label(ctx, p.n, X0 + 104, y + 13, { size: 38, weight: 700 });
      const vals = [!p.gas, p.gas, p.ring, p.moon];
      vals.forEach((v, j) => {
        const at = j < 2 ? st + 2.0 + i * 0.55 : sr + 0.8 + (j - 2) * 2.6 + i * 0.25;
        const k = E.se(t, at, at + 0.4);
        if (v) P.check(ctx, cx(j), y - 2, 38, k, { w: 6, color: j < 2 ? PAL.ink : PAL.life });
        else F.dash(ctx, cx(j), y, 40, k);
      });
    });
    // Merkür ve Venüs: uydu yok vurgusu
    const hk = E.se(t, sr + 4.6, sr + 5.4);
    if (hk > 0) { ctx.save(); ctx.globalAlpha = hk; stroke(ctx, INK.wobble(circlePts(cx(3), (ry(0) + ry(1)) / 2, 90, 76, 50), 3, 9), { w: 3, closed: true, color: PAL.light }); ctx.restore(); }
  }

  function sizes(ctx, t) {
    const sz = E.s('size'); const r0 = 15;   // Dünya yarıçapı (px) — çaplar birbirine göre ölçekli
    const R = F.PLANETS.map(p => p.d * r0);
    const GAP = [70, 70, 70, 45, 45, 45, 45];
    const tot = R.reduce((s, r) => s + 2 * r, 0) + GAP.reduce((s, g) => s + g, 0);
    let x = (E.W - tot) / 2; const y = 540; const X = [];
    R.forEach((r, i) => { X.push(x + r); x += 2 * r + (GAP[i] ?? 0); });
    F.PLANETS.forEach((p, i) => {
      const k = P.pop(E.seg(t, sz + 0.2 + i * 0.25, sz + 0.9 + i * 0.25)); if (k <= 0) return;
      F.planet(ctx, i, X[i], y, Math.max(2.5, R[i] * k), { rings: false });
      const small = i < 4, up = small && i % 2 === 1;
      const ly = small ? (up ? y - 70 : y + 90) : y + R[i] + 55;
      if (small) { ctx.save(); ctx.globalAlpha = 0.6; line(ctx, [X[i], up ? y - R[i] - 6 : y + R[i] + 6], [X[i], up ? ly + 8 : ly - 34], { w: 1.4, dry: false }); ctx.restore(); }
      INK.label(ctx, p.n, X[i], ly, { size: 34, weight: 700, align: 'center' });
    });
    const k2 = E.se(t, sz + 3.2, sz + 4.2);
    if (k2 > 0) { ctx.save(); ctx.globalAlpha = k2; stroke(ctx, INK.wobble(circlePts(X[2], y, 34, 34, 30), 2, 5), { w: 3, closed: true, color: PAL.light }); ctx.restore(); }
    E.inkText(ctx, 'Jüpiter’in içine ≈ 1300 Dünya sığar', 1230, 230, t, sz + 4.4, 1e9, { size: 44, align: 'center' });
    E.inkText(ctx, 'en büyük: Jüpiter · en küçük: Merkür', 960, 830, t, sz + 1.8, 1e9, { size: 44, align: 'center' });
    E.inkText(ctx, '(çaplar birbirine göre ölçekli; aralarındaki uzaklıklar ölçekli değildir)', 960, 885, t, sz + 2.5, 1e9, { size: 28, weight: 400, align: 'center', alpha: 0.65 });
  }

  E.scene({
    name: 'Nitelikler', concept: 'Gezegenlerin niteliklerini belirleme', from: 'traits', to: 'size', trFrom: [960, 540],
    draw(ctx, t) {
      const a = E.se(t, E.s('size') - 0.3, E.s('size') + 0.5);
      if (a < 1) E.layer(ctx, 1 - a, c => table(c, t));
      if (a > 0) E.layer(ctx, a, c => sizes(c, t));
      if (a < 1) E.layer(ctx, 1 - a, c => DAMLA.draw(c, { x: 120, y: 900, s: 0.62, view: 'q3', expr: 'curious', look: [0.8, -0.3], blink: E.blink(t, 4), squash: E.breath(t), t, seed: 2, prop: 'notebook', arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.1]] }));
    }
  });
})();
