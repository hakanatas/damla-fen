// SAHNE 6 — Kaydet (şema), Sıra sende (rol oynama), sonraki film, bitiş
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const N = ['organizma', 'sistem', 'organ', 'doku', 'hücre'];
  const PL = ['ülke', 'il', 'ilçe', 'mahalle', 'ev'];
  function record(ctx, t) {
    const F = F10, sr = E.s('record'), st = E.s('task');
    ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
    P.notebook(ctx, 150, 60, 1620, 850);
    const la = 1 - E.se(t, st - 0.2, st + 0.6);
    if (la > 0) E.layer(ctx, la, c => {
      P.write(c, 'Gözlem Defteri · Hücreden Organizmaya', 290, 170, E.seg(t, sr + 0.2, sr + 1.4), { size: 60 });
      // nested boxes
      N.forEach((n, i) => {
        const k = E.se(t, sr + 1 + i * 0.9, sr + 1.6 + i * 0.9, 'out'); if (k <= 0) return;
        const w = 1000 - i * 170, h = 620 - i * 110, cx = 800, cy = 560 + i * 20;
        const r = INK.wobble(F.rrect(cx, cy, w * k, h * k, 30), 1.5, 500 + i);
        P.fillPts(c, r, i % 2 ? '#F3ECDD' : '#EEF2DC', 0.9); wash(c, r, PAL.life, 0.08 + i * 0.05, 510 + i, { bleed: 1, blooms: 0 }); stroke(c, r, { w: 2.6, closed: true, seed: 520 + i });
        if (k > 0.8) INK.label(c, n, cx, cy - h / 2 + 46, { size: 40, weight: 700, align: 'center', color: '#3E5A1A' });
      });
      // analogy column
      PL.forEach((p, i) => { const k = E.se(t, sr + 5.2 + i * 0.3, sr + 5.8 + i * 0.3); P.write(c, '≈ ' + p, 1440, 312 + i * 75, k, { size: 44, color: '#8A4A10' }); });
    });
    const tk = E.se(t, st, st + 0.8, 'out');
    if (tk > 0) E.layer(ctx, tk, c => {
      P.write(c, 'Sıra sende!', 960, 280, E.seg(t, st + 0.4, st + 1.4), { size: 84, align: 'center', color: '#8A4A10' });
      P.write(c, 'Arkadaşlarınla beş rolü canlandırın.', 960, 380, E.seg(t, st + 1.2, st + 2.6), { size: 52, align: 'center' });
      ['HÜCRE', 'DOKU', 'ORGAN', 'SİSTEM', 'ORGANİZMA'].forEach((T, i) => {
        const k = E.se(t, st + 2.6 + i * 0.4, st + 3.2 + i * 0.4, 'out'); if (k <= 0) return;
        const x = 430 + i * 265, y = 560;
        c.save(); c.translate(x, y); c.rotate((i - 2) * 0.03); c.scale(P.pop(k), P.pop(k));
        const b = [[-115, -60], [115, -62], [117, 60], [-113, 62], [-115, -60]]; P.fillPts(c, b, '#FBF8F1'); stroke(c, b, { w: 2.6, closed: true, seed: 530 + i });
        c.font = '700 36px Kalam'; c.textAlign = 'center'; c.fillStyle = '#3E5A1A'; c.fillText(T, 0, 12); c.restore();
      });
      P.write(c, 'Her rol, bir sonrakine nasıl katılıyor?', 960, 740, E.seg(t, st + 5, st + 6.4), { size: 46, align: 'center', weight: 400 });
    });
    DAMLA.draw(ctx, { x: 1830, y: 1045, s: 0.85, view: 'q3', flip: true, expr: t > st ? 'happy' : 'neutral', look: [-0.7, -0.3], blink: E.blink(t, 11), squash: E.breath(t), t, talk: E.talk(t), seed: 5, prop: t > st ? null : 'notebook', arms: t > st ? [[-1, 0.4], [1, 2.3 + 0.2 * Math.sin(t * 5)]] : [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]] });
  }
  function bone(ctx, x, y, L, rot) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
    const pts = [[-L / 2 + 14, -8], [L / 2 - 14, -8]].concat(P.arc(L / 2 - 8, -10, 13, Math.PI * 1.2, Math.PI * 2.4, 10), P.arc(L / 2 - 8, 10, 13, Math.PI * 1.6, Math.PI * 2.8, 10), [[L / 2 - 14, 8], [-L / 2 + 14, 8]], P.arc(-L / 2 + 8, 10, 13, Math.PI * 0.2, Math.PI * 1.4, 10), P.arc(-L / 2 + 8, -10, 13, Math.PI * 0.6, Math.PI * 1.8, 10));
    P.fillPts(ctx, pts, '#F6EEDC'); stroke(ctx, pts.concat([pts[0]]), { w: 3, closed: true, seed: 540 });
    ctx.restore();
  }
  function next(ctx, t) {
    const sn = E.s('next'), hill = P.hillLine(E.W);
    P.landscape(ctx, E.W, E.H, t, { hill });
    const dx = 820, dy = P.hillY(hill, dx) + 4;
    DAMLA.draw(ctx, { x: dx, y: dy, s: 1.4, view: 'q3', expr: 'happy', look: [0.6, -0.5], blink: E.blink(t, 12), squash: E.breath(t), t, talk: E.talk(t), seed: 1, arms: [[-1, 0.35], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    E.inkText(ctx, 'Sıradaki gözlem:', 960, 200, t, sn + 0.5, E.e('next') + 1, { size: 50, align: 'center', weight: 400 });
    E.inkText(ctx, 'Destek ve Hareket Sistemi', 960, 285, t, sn + 1.1, E.e('next') + 1, { size: 76, align: 'center' });
    const k = E.se(t, sn + 2, sn + 3, 'out');
    if (k > 0) { ctx.save(); ctx.globalAlpha *= k; bone(ctx, 1400, 560, 260 * P.pop(k), -0.4); ctx.restore(); }
    F10.endCard(ctx, t, 10, 'Hücreden Organizmaya', 'FB.5.3.2');
  }
  E.scene({ name: 'Kaydet', concept: 'Şema ve rol oynama görevi', from: 'record', to: 'task', trFrom: [960, 540], draw: record });
  E.scene({ name: 'Sıradaki', concept: 'Destek ve hareket sistemi', from: 'next', to: 'end', trFrom: [820, 700], draw: next });
})();
