// SAHNE 6 — Kimler bağ yapar? metal+metal → alaşım (homojen karışım) · ametal+ametal → su · metal+ametal → sofra tuzu · soy gaz → bileşik yok
(function () {
  const { PAL, stroke, line, circlePts, rng } = INK;
  const U = U5;
  const PAN = [[110, 175], [990, 175], [110, 545], [990, 545]], PW = 820, PH = 330;
  function panel(ctx, i, k, head, sub, color) {
    const [x, y] = PAN[i];
    U.card(ctx, x, y, PW, PH, { seed: 1800 + i });
    P.write(ctx, head, x + 30, y + 58, k, { size: 44, color: color ?? PAL.ink });
    if (sub) P.write(ctx, sub, x + 30, y + PH - 24, k, { size: 36, alpha: 0.85 });
  }
  E.scene({
    name: 'Kimler birleşir?', concept: 'Alaşım; ametallerin bağ yapması; soy gazlar', from: 'alloy', to: 'bonds', trFrom: [960, 540],
    draw(ctx, t) {
      const sa = E.s('alloy'), sb = E.s('bonds');
      // 1) alaşım: bakır + çinko → pirinç (atomlar karışık, bağ yok)
      const k1 = E.se(t, sa + 0.2, sa + 0.9, 'out');
      if (k1 > 0) E.layer(ctx, k1, c => {
        panel(c, 0, E.seg(t, sa + 0.4, sa + 1.6), 'metal + metal → alaşım', 'bakır + çinko = pirinç (homojen karışım)', '#4E5E75');
        const r = rng(1811), mixk = E.se(t, sa + 1.6, sa + 4.0); let ci = 0, zi = 0;
        for (let gy = 0; gy < 4; gy++) for (let gx = 0; gx < 9; gx++) {
          const zn = r() < 0.35, x0 = 200 + gx * 52 + (gy % 2) * 26, y0 = 272 + gy * 44;
          const st = zn ? [640 + (zi % 4) * 46, 272 + Math.floor(zi++ / 4) * 44] : [170 + (ci % 6) * 46, 272 + Math.floor(ci++ / 6) * 44];
          U.ball(c, E.lerp(st[0], x0, mixk), E.lerp(st[1], y0, mixk), 19, zn ? '#B8BCC4' : '#C07A45', { sym: zn ? 'Zn' : 'Cu', symSize: 15 });
        }
        if (mixk > 0.9) P.write(c, 'bileşik değil!', 700, 350, E.seg(t, sa + 4.2, sa + 5.2), { size: 40, color: U.AMBER });
      });
      // 2) ametal + ametal → su (bileşik)
      const k2 = E.se(t, sb + 0.1, sb + 0.8, 'out');
      if (k2 > 0) E.layer(ctx, k2, c => {
        panel(c, 1, E.seg(t, sb + 0.3, sb + 1.4), 'ametal + ametal → bileşik', 'hidrojen + oksijen → su', '#8A6A10');
        const cx = 1400, cy = 360, a = 104.5 / 2 * Math.PI / 180, d = 78;
        const hL = [cx - Math.sin(a) * d, cy + Math.cos(a) * d], hR = [cx + Math.sin(a) * d, cy + Math.cos(a) * d];
        U.bondLine(c, [cx, cy], hL, 10); U.bondLine(c, [cx, cy], hR, 10);
        U.atom(c, cx, cy, 50, 'O', { label: true }); U.atom(c, hL[0], hL[1], 50, 'H', { label: true, seed: 1 }); U.atom(c, hR[0], hR[1], 50, 'H', { label: true, seed: 2 });
      });
      // 3) metal + ametal → sofra tuzu (iyonlar düzenli dizilir)
      const k3 = E.se(t, sb + 1.6, sb + 2.3, 'out');
      if (k3 > 0) E.layer(ctx, k3, c => {
        panel(c, 2, E.seg(t, sb + 1.8, sb + 2.9), 'metal + ametal → bileşik', 'sodyum + klor → sofra tuzu', U.AMBER);
        for (let gy = 0; gy < 3; gy++) for (let gx = 0; gx < 5; gx++) {
          const na = (gx + gy) % 2 === 0, x = 380 + gx * 62, y = 655 + gy * 58;
          U.ball(c, x, y, na ? 20 : 27, na ? '#C49A6C' : '#93B560', { sym: na ? 'Na⁺' : 'Cl⁻', symSize: na ? 14 : 16 });
        }
      });
      // 4) soy gaz → bileşik yok (tek atomlar)
      const k4 = E.se(t, sb + 4.4, sb + 5.1, 'out');
      if (k4 > 0) E.layer(ctx, k4, c => {
        panel(c, 3, E.seg(t, sb + 4.6, sb + 5.7), 'soy gaz → bileşik oluşturmaz', 'sıradan koşullarda tek atom hâlinde', '#2F7A70');
        const r = rng(1830);
        for (let i = 0; i < 7; i++) { const x = 1090 + i * 95 + Math.sin(t * 1.3 + i * 2) * 18, y = 700 + (i % 2 ? 50 : -20) + Math.cos(t * 1.1 + i) * 14; U.ball(c, x, y, 24, U.CLS.soy.c, { sym: 'Ne', symSize: 20 }); }
      });
      INK.label(ctx, '(model, ölçekli değildir)', 1880, 912, { size: 24, align: 'right', alpha: 0.5 });
    }
  });
})();
