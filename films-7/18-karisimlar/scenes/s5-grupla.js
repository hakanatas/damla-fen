// SAHNE 5 — Gruplandırma (homojen/heterojen) · çözelti = çözücü + çözünen · tuzun suda iyonlarına ayrışması
(function () {
  const { PAL, line, stroke, circlePts, rng } = INK;
  const K = K7;
  function groupPart(ctx, t) {
    const sg = E.s('group');
    stroke(ctx, K.linePts([960, 200], [960, 860], 40), { w: 2.4, alpha: 0.4, seed: 5801 });
    P.write(ctx, 'HOMOJEN', 520, 250, E.seg(t, sg + 0.4, sg + 1.2), { size: 70, align: 'center', color: PAL.water });
    P.write(ctx, 'HETEROJEN', 1400, 250, E.seg(t, sg + 3.4, sg + 4.2), { size: 70, align: 'center', color: K.AMBER });
    P.write(ctx, 'her yerinde aynı özellik', 520, 320, E.seg(t, sg + 1.2, sg + 2.2), { size: 40, align: 'center' });
    P.write(ctx, 'her yerinde aynı değil', 1400, 320, E.seg(t, sg + 4.2, sg + 5.2), { size: 40, align: 'center' });
    const from = [[360, 840], [760, 840], [1160, 840], [1560, 840]], to = [[380, 820], [660, 820], [1260, 820], [1540, 820]];
    const pos = from.map((p, i) => { const k = E.se(t, sg + 1.0 + (i > 1 ? 3 : 0) + (i % 2) * 0.6, sg + 2.4 + (i > 1 ? 3 : 0) + (i % 2) * 0.6); return E.mix(p, to[i], k); });
    F18.four(ctx, t, { mix: 1, settle: 1 }, { pos, s: 0.85 });
  }
  function solPart(ctx, t) {
    const ss = E.s('solution'), si = E.s('ions');
    // çözücü + çözünen → çözelti
    const y = 560;
    const k1 = E.se(t, ss + 1.8, ss + 2.4, 'out'), k2 = E.se(t, ss + 2.6, ss + 3.2, 'out'), k3 = E.se(t, ss + 3.6, ss + 4.2, 'out');
    if (k1 > 0) E.layer(ctx, k1, c => { K.beaker(c, 300, y + 150, 190, 220, { level: 0.6, t, seed: 60 }); INK.label(c, 'su', 300, y - 110, { size: 44, weight: 700, align: 'center' }); INK.label(c, 'çözücü', 300, y + 220, { size: 44, weight: 700, align: 'center', color: PAL.water }); });
    INK.label(ctx, '+', 470, y + 40, { size: 70, weight: 700, align: 'center', alpha: k2 });
    if (k2 > 0) E.layer(ctx, k2, c => { const r = rng(5810); for (let i = 0; i < 26; i++) { c.save(); c.fillStyle = '#FFFDF6'; c.strokeStyle = PAL.ink; c.lineWidth = 1; c.beginPath(); c.rect(560 + r() * 80, y + 60 + r() * 60 - (i % 5) * 4, 7, 7); c.fill(); c.stroke(); c.restore(); } INK.label(c, 'şeker', 600, y - 110, { size: 44, weight: 700, align: 'center' }); INK.label(c, 'çözünen', 600, y + 220, { size: 44, weight: 700, align: 'center', color: K.AMBER }); });
    INK.label(ctx, '→', 740, y + 40, { size: 70, weight: 700, align: 'center', alpha: k3 });
    if (k3 > 0) E.layer(ctx, k3, c => { K.beaker(c, 900, y + 150, 190, 220, { level: 0.62, t, seed: 61, tint: ['#E8DFC4', 0.15] }); INK.label(c, 'şekerli su', 900, y - 110, { size: 44, weight: 700, align: 'center' }); INK.label(c, 'çözelti', 900, y + 220, { size: 48, weight: 700, align: 'center', color: PAL.water }); });
    E.inkText(ctx, 'homojen karışım = çözelti', 600, 250, t, ss + 0.4, 1e9, { size: 54, align: 'center', color: PAL.water });
    // tuz iyonları
    const ik = E.se(t, si + 0.2, si + 0.9);
    if (ik > 0) E.layer(ctx, ik, c => {
      const cx = 1480, cy = 560, R = 250;
      c.save(); c.beginPath(); c.arc(cx, cy, R, 0, 7); c.clip(); c.fillStyle = '#E4EEF2'; c.fillRect(cx - R, cy - R, 2 * R, 2 * R);
      const r = rng(5820); for (let i = 0; i < 50; i++) { c.fillStyle = 'rgba(46,106,140,0.45)'; c.beginPath(); c.arc(cx - R + r() * 2 * R + Math.sin(t * 2 + i) * 3, cy - R + r() * 2 * R, 8, 0, 7); c.fill(); }
      const sep = E.se(t, si + 1.0, si + 4.0);
      // kristal kümesi → dağılan iyonlar
      for (let i = 0; i < 12; i++) {
        const gx = cx - 60 + (i % 4) * 40, gy = cy + 40 + Math.floor(i / 4) * 40; const el = (i + Math.floor(i / 4)) % 2 ? 'Cl' : 'Na';
        const ang = i * 2.4, dist = 60 + (i * 37) % 150;
        const x = E.lerp(gx, cx + Math.cos(ang) * dist, sep) + Math.sin(t * 1.4 + i) * 4 * sep, y = E.lerp(gy, cy - 30 + Math.sin(ang) * dist * 0.9, sep);
        K.atom(c, x, y, el === 'Cl' ? 22 : 17, el, { raw: true, seed: 90 + i });
      }
      c.restore(); stroke(c, circlePts(cx, cy, R, R, 60), { w: 5, closed: true, seed: 5830 });
    });
    E.inkText(ctx, 'tuz suda: sodyum ve klor iyonları', 1480, 250, t, si + 1.4, 1e9, { size: 42, align: 'center' });
    E.inkText(ctx, '(model, ölçekli değildir)', 1480, 870, t, si + 1.4, 1e9, { size: 30, align: 'center', alpha: 0.6, weight: 400 });
  }
  E.scene({
    name: 'Homojen · Heterojen', concept: 'Gruplandırma; çözelti: çözücü + çözünen', from: 'group', to: 'ions', trFrom: [960, 500],
    draw(ctx, t) {
      const ss = E.s('solution');
      const a1 = 1 - E.se(t, ss - 0.2, ss + 0.4), a2 = E.se(t, ss + 0.1, ss + 0.7);
      if (a1 > 0) E.layer(ctx, a1, c => groupPart(c, t));
      if (a2 > 0) E.layer(ctx, a2, c => solPart(c, t));
    }
  });
})();
