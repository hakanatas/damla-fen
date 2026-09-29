// SAHNE 6 — Rol oynama: neden Ay'ın hep aynı yüzü görünür? (dönme süresi = dolanma süresi)
(function () {
  const { PAL, line, stroke, circlePts, dashed, arrowHead, wash } = INK;
  const AMB = '#C07F1E';
  const CX = 960, CY = 630, RX = 560, RY = 175;
  function stateAt(t) {
    const sR = E.s('roleplay'), sT = E.s('turned'), sN = E.s('noturn');
    let phi = Math.PI / 2, turning = true, walking = false;
    if (t < sN) { const k = E.se(t, sR + 1.2, sT + 2.4, 'sine'); phi = Math.PI / 2 - k * 6.283; walking = k > 0 && k < 1; }
    else if (t < E.s('because')) { const k = E.se(t, sN + 0.6, sN + 7.4, 'sine'); phi = Math.PI / 2 - k * 6.283; turning = false; walking = k > 0 && k < 1; }
    const f = turning ? [-Math.cos(phi), -Math.sin(phi)] : [0, 1];
    return { phi, turning, walking, f };
  }
  function viewFor(f) {
    if (f[1] > 0.75) return { view: 'front', flip: false };
    if (f[1] > 0.15) return { view: 'q3', flip: f[0] < 0 };
    if (f[1] > -0.55) return { view: 'side', flip: f[0] < 0 };
    return { view: 'back', flip: false };
  }
  function globe(ctx, t) {
    const gx = CX, gy = CY - 150;
    P.fillPts(ctx, circlePts(CX, CY, 70, 16, 30), PAL.paperDeep, 1); stroke(ctx, circlePts(CX, CY, 70, 16, 30), { w: 2.4, closed: true });
    line(ctx, [CX, CY], [gx, gy + 70], { w: 6, taper: 0.02 });
    stroke(ctx, P.arc(gx, gy, 88, -2.2, 1.0, 30), { w: 3, dry: false });
    P.earth(ctx, gx, gy, 72, { rot: t * 0.05 });
  }
  E.scene({
    name: 'Rol oynama', concept: 'Ay\'ın hep aynı yüzünün görünmesi', from: 'same-q', to: 'because', trFrom: [960, 540],
    draw(ctx, t) {
      const sQ = E.s('same-q'), sR = E.s('roleplay'), sT = E.s('turned'), sN = E.s('noturn'), sB = E.s('because');
      ctx.fillStyle = 'rgba(138,106,69,0.10)'; ctx.fillRect(0, 0, E.W, E.H);
      // same-q: gökyüzünde Ay, hep aynı desen (üç gece)
      const qA = 1 - E.se(t, sR - 0.3, sR + 0.4);
      if (qA > 0) E.layer(ctx, qA, c => {
        F02.night(c, 0.8);
        [['ocak dolunayı', 520], ['şubat dolunayı', 960], ['mart dolunayı', 1400]].forEach(([s, x], i) => {
          const k = E.se(t, sQ + 0.6 + i * 0.8, sQ + 1.2 + i * 0.8, 'out'); if (k <= 0) return;
          c.save(); c.globalAlpha = k; F02.glowMoon(c, x, 470, 150); c.restore();
          INK.label(c, s, x, 710, { size: 42, weight: 700, align: 'center', color: '#FBF3DC', alpha: k });
        });
        E.inkText(c, 'her dolunayda aynı desen!', 960, 820, t, sQ + 3.4, 1e9, { size: 56, align: 'center', color: '#FBF3DC' });
      });
      if (t < sR - 0.3) return;
      const st = stateAt(t);
      const pA = E.se(t, sR - 0.3, sR + 0.4);
      E.layer(ctx, pA, c => {
        // zemin yolu
        c.save(); c.globalAlpha = 0.6; dashed(c, circlePts(CX, CY, RX, RY, 140), { w: 2.6, on: 14, off: 10 }); c.restore();
        const ak = E.se(t, sR + 0.4, sR + 1.2); if (ak > 0) { c.save(); c.globalAlpha = ak; F02.orbitArrow(c, CX, CY, RX + 30, RY + 22, 0.35, -0.55, { w: 4, head: 18 }); c.restore(); }
        const x = CX + Math.cos(st.phi) * RX, y = CY + Math.sin(st.phi) * RY + 40;
        const sc = 0.72 + 0.18 * (Math.sin(st.phi) + 1) / 2;
        const v = viewFor(st.f);
        const drawD = () => DAMLA.draw(c, { x, y, s: sc, view: v.view, flip: v.flip, expr: 'happy', look: [0, 0], blink: E.blink(t, 7), squash: E.breath(t), t, seed: 3,
          feet: st.walking ? E.walk(t * 9) : undefined, arms: [[-1, 0.35 + (st.walking ? Math.sin(t * 9) * 0.25 : 0)], [1, 0.35 - (st.walking ? Math.sin(t * 9) * 0.25 : 0)]] });
        if (Math.sin(st.phi) < 0) { drawD(); globe(c, t); } else { globe(c, t); drawD(); }
        INK.label(c, 'Dünya', CX - 100, CY - 210, { size: 38, weight: 700, align: 'right' });
        INK.label(c, 'Ay (ben)', x + 85 * sc, y - 150 * sc, { size: 32, weight: 700, alpha: 0.85 });
        // yüzümün yönü kadranı (üstten)
        const dx = 300, dy = 330;
        F02.card(c, dx - 150, dy - 130, 300, 300, { seed: 71 });
        stroke(c, circlePts(dx, dy, 80, 80, 40), { w: 2.4, closed: true, dry: false });
        const fa = Math.atan2(st.f[1], st.f[0]);
        P.arrow(c, [dx - Math.cos(fa) * 30, dy - Math.sin(fa) * 30], [dx + Math.cos(fa) * 70, dy + Math.sin(fa) * 70], 1, { w: 5, color: AMB, bend: 0, head: 16 });
        INK.label(c, 'yüzümün yönü', dx, dy + 140, { size: 32, weight: 700, align: 'center' });
        // Dünya'nın gördüğü (iç çerçeve)
        const ix = 1620, iy = 330, ir = 140;
        const dot = st.f[0] * -Math.cos(st.phi) + st.f[1] * -Math.sin(st.phi);
        c.save(); c.beginPath(); c.arc(ix, iy, ir, 0, 7); c.fillStyle = '#FAF6EC'; c.fill(); c.clip();
        const iv = dot > 0.3 ? { view: 'front', flip: false } : dot < -0.3 ? { view: 'back', flip: false } : { view: 'side', flip: (st.f[0] * Math.sin(st.phi) - st.f[1] * Math.cos(st.phi)) < 0 };
        DAMLA.draw(c, { x: ix, y: iy + 150, s: 0.95, view: iv.view, flip: iv.flip, expr: 'happy', blink: E.blink(t, 7), t, seed: 3, shadow: false });
        c.restore();
        stroke(c, circlePts(ix, iy, ir, ir, 50), { w: 4, closed: true });
        INK.label(c, 'Dünya’nın gördüğü', ix, iy + ir + 50, { size: 32, weight: 700, align: 'center' });
        if (dot < -0.3) INK.label(c, 'sırtım!', ix - 60, iy - ir - 20, { size: 40, weight: 700, color: AMB, rot: 0.1 });
        // tur sonucu notları
        if (t > sT + 1.5 && t < sN) { P.write(c, '1 tur = kendi çevremde 1 dönüş', 960, 230, E.seg(t, sT + 1.5, sT + 3), { size: 46, color: AMB, align: 'center' }); }
        if (t > sN + 0.4 && t < sB) P.write(c, 'dönmeden yürüyorum: yüzüm hep aynı yöne bakıyor', 960, 230, E.seg(t, sN + 0.4, sN + 1.8), { size: 42, align: 'center' });
      });
      // sonuç kartı
      const kb = E.se(t, sB + 0.4, sB + 1.2, 'out');
      if (kb > 0) E.layer(ctx, kb, c => {
        F02.card(c, 560, 150, 800, 250, { seed: 77, fill: '#FBF3DC' });
        P.write(c, 'dönme süresi = dolanma süresi', 960, 240, E.seg(t, sB + 0.8, sB + 2.4), { size: 50, align: 'center' });
        P.write(c, '→ Dünya’dan hep aynı yüz görünür', 960, 320, E.seg(t, sB + 3.0, sB + 4.6), { size: 44, align: 'center', color: '#8A4A10' });
      });
    }
  });
})();
