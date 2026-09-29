// SAHNE 4 — Beyaz ışık: gökkuşağı ve prizma (FB.6.4.5 a: günlük hayattan örneklerle beyaz ışığı oluşturan nitelikler)
// Sınırlama: ışık spektrumu / filtre terimlerine girilmez; yalnızca "renklere ayrılır" denir.
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F613, RED = F613.RED;
  function rainbow(ctx, t, k) {
    const cx = 1420, cy = 1000;
    F.SPEC.forEach((s, i) => { // outer band = kırmızı, inner = mor
      const r0 = 560 - i * 30, r1 = r0 - 30;
      const a0 = Math.PI * 1.02, a1 = E.lerp(a0, Math.PI * 1.98, k);
      if (k <= 0) return;
      const band = P.arc(cx, cy, r0, a0, a1, 50).concat(P.arc(cx, cy, r1, a1, a0, 50));
      ctx.save(); ctx.globalAlpha *= 0.7; wash(ctx, band, s.c, 0.8, 400 + i, { bleed: 2, blooms: 0 }); ctx.restore();
    });
  }
  E.scene({
    name: 'Beyaz ışık', concept: 'Gökkuşağı ve prizma', from: 'rainbow', to: 'prism', trFrom: [1420, 500],
    draw(ctx, t) {
      const sr = E.s('rainbow'), sp = E.s('prism');
      const toLab = E.se(t, sp - 0.2, sp + 0.8);
      // ---- part 1: rainbow after the rain, Sun behind Damla ----
      if (toLab < 1) E.layer(ctx, 1 - toLab, c => {
        const hill = P.hillLine(E.W);
        const g = c.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(46,106,140,0.18)'); g.addColorStop(1, 'rgba(46,106,140,0.02)'); c.fillStyle = g; c.fillRect(0, 0, E.W, E.H);
        P.sun(c, 230, 330, 70, t, { nrays: 14, cells: false });
        // passing rain on the right
        const R = INK.rng(5);
        for (let i = 0; i < 46; i++) { const x = 900 + R() * 1000, y0 = 170 + ((R() * 700 + t * 380) % 650); line(c, [x, y0], [x - 6, y0 + 26], { w: 1.8, color: PAL.water, alpha: 0.45 * (1 - 0.6 * E.se(t, sr + 5, sr + 9)), dry: false, seed: 500 + i }); }
        rainbow(c, t, E.se(t, sr + 5.4, sr + 8.2));
        P.landscape(c, E.W, E.H, t, { hill, tree: false });
        const dx = 640, dy = P.hillY(hill, dx) + 4;
        DAMLA.draw(c, { x: dx, y: dy, s: 1.3, view: 'q3', expr: t > sr + 7 ? 'happy' : 'curious', look: [0.9, -0.5], blink: E.blink(t, 5), squash: E.breath(t), t, talk: E.talk(t), seed: 1, arms: [[-1, 0.35], [1, t > sr + 7 ? 2.2 : 0.4]] });
        if (t > sr + 8) {
          INK.label(c, 'gökkuşağı', 1420, 560, { size: 46, weight: 700, align: 'center', alpha: E.se(t, sr + 8, sr + 8.6) });
          INK.label(c, 'Güneş arkamızda', 230, 460, { size: 34, weight: 700, align: 'center', alpha: E.se(t, sr + 8.4, sr + 9) });
        }
        // Damla herself is a droplet: inset — beyaz ışık bir damlada renklere ayrılır
        const ik = E.se(t, sr + 3.4, sr + 4.2, 'out');
        if (ik > 0) {
          c.save(); c.globalAlpha *= ik;
          const ox = 1040, oy = 300;
          P.fillPts(c, circlePts(ox, oy, 120, 120, 50), '#FBF8F1', 0.95); stroke(c, circlePts(ox, oy, 120, 120, 50), { w: 2.4, closed: true, seed: 510 });
          const d = circlePts(ox + 10, oy + 6, 46, 46, 40); P.fillPts(c, d, PAL.water, 0.25); stroke(c, d, { w: 2.4, closed: true, seed: 511 });
          F.beam(c, [ox - 105, oy - 10], [ox - 30, oy - 10], E.se(t, sr + 4, sr + 4.8), 14);
          F.SPEC.forEach((s, i) => F.ray(c, [ox + 30, oy + 8], [ox + 96, oy + 36 + i * 9 - 30], E.se(t, sr + 4.6, sr + 5.4), { color: s.c, w: 2.2, heads: [], seed: 520 + i }));
          INK.label(c, 'su damlası', ox, oy + 100, { size: 28, weight: 700, align: 'center' });
          c.restore();
        }
      });
      // ---- part 2: glass prism ----
      if (toLab > 0) E.layer(ctx, toLab, c => {
        c.fillStyle = 'rgba(138,106,69,0.12)'; c.fillRect(0, 0, E.W, E.H);
        // window slit on the left
        const win = [[120, 330], [200, 330], [200, 640], [120, 640], [120, 330]]; P.fillPts(c, win, '#FFF3CF', 0.9); stroke(c, win, { w: 3, closed: true, seed: 530 });
        line(c, [160, 330], [160, 640], { w: 2, dry: false }); INK.label(c, 'pencere', 160, 690, { size: 32, weight: 700, align: 'center' });
        const px = 860, py = 480, L = 300;
        F.prism(c, px, py, L);
        // beam enters the left face at y≈470
        const ay = py - L * 0.866 * 2 / 3, fx = y => (y - ay) / (L * 0.866) * L / 2; // face half-width at y
        const inP = [px - fx(470), 470];
        F.beam(c, [200, 450], inP, E.se(t, sp + 0.6, sp + 1.6), 22);
        const kf = E.se(t, sp + 1.6, sp + 3.0);
        // inside the glass: slight spread; out of the right face: fan (red least bent → top)
        F.SPEC.forEach((s, i) => {
          const my = 478 + i * 7, mid = [px + fx(my), my];
          F.ray(c, inP, mid, E.clamp(kf * 2), { color: s.c, w: 2.2, heads: [], seed: 540 + i });
          const end = [1520, 560 + i * 36];
          F.ray(c, mid, end, E.clamp(kf * 2 - 1), { color: s.c, w: 3, heads: [0.6], head: 12, seed: 550 + i });
        });
        // screen with the colour band
        const scr = [[1530, 470], [1580, 470], [1580, 850], [1530, 850], [1530, 470]]; P.fillPts(c, scr, '#FBF8F1'); stroke(c, scr, { w: 3, closed: true, seed: 560 });
        INK.label(c, 'ekran', 1555, 440, { size: 32, weight: 700, align: 'center' });
        const bk = E.se(t, sp + 2.8, sp + 3.6);
        F.SPEC.forEach((s, i) => {
          if (bk <= 0) return;
          c.save(); c.globalAlpha *= bk; P.fillPts(c, [[1532, 545 + i * 36], [1578, 545 + i * 36], [1578, 575 + i * 36], [1532, 575 + i * 36]], s.c, 0.85); c.restore();
          INK.label(c, s.n, 1610, 572 + i * 36, { size: 30, weight: 700, alpha: E.se(t, sp + 3.4 + i * 0.25, sp + 3.9 + i * 0.25) });
        });
        INK.label(c, 'beyaz ışık', 330, 420, { size: 38, weight: 700, alpha: E.se(t, sp + 1.2, sp + 1.8), color: '#8A4A10' });
        INK.label(c, 'cam prizma', px, py + 150, { size: 38, weight: 700, align: 'center', alpha: E.se(t, sp + 0.4, sp + 1) });
        // safety card
        const sk = E.se(t, sp + 4.4, sp + 5.1, 'out');
        if (sk > 0) {
          c.save(); c.translate(0, (1 - sk) * 60); c.globalAlpha *= sk;
          const card = F.card(c, 330, 690, 900, 190, { color: RED, seed: 570 });
          c.font = '700 44px Kalam'; c.fillStyle = RED; c.textAlign = 'left'; c.fillText('⚠  Bir yetişkin eşliğinde!', 370, 752);
          c.font = '700 34px Kalam'; c.fillStyle = PAL.ink; c.fillText('Güneş ışığıyla prizma deneyini yalnız yapma.', 370, 808);
          c.fillText('Güneş’e asla doğrudan bakma!', 370, 856);
          P.icon.eye(c, 1150, 790, 0.45, 1);
          c.restore();
        }
        DAMLA.draw(c, { x: 1780, y: 1040, s: 0.8, view: 'q3', flip: true, expr: 'curious', look: [-0.8, -0.4], blink: E.blink(t, 6), squash: E.breath(t), t, talk: E.talk(t), seed: 2, arms: [[-1, 0.4], [1, 0.4]] });
      });
    }
  });
})();
