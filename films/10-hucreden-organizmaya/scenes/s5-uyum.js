// SAHNE 5 — Organizma uyumlu bir bütündür (ülke benzeşimi) + koşan çocuk + tek hücreli canlılar
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  E.scene({
    name: 'Uyumlu bütün', concept: 'Organizma uyumlu bir bütündür', from: 'harmony', to: 'single', trFrom: [960, 540],
    draw(ctx, t) {
      const F = F10, sh = E.s('harmony'), sr = E.s('run'), ss = E.s('single');
      ctx.fillStyle = 'rgba(138,106,69,0.10)'; ctx.fillRect(0, 0, E.W, E.H);
      const a1 = 1 - E.se(t, sr - 0.4, sr + 0.3), a2 = Math.min(E.se(t, sr - 0.2, sr + 0.5), 1 - E.se(t, ss - 0.4, ss + 0.3)), a3 = E.se(t, ss - 0.2, ss + 0.5);
      if (a1 > 0) E.layer(ctx, a1, c => {
        F.region(c, 580, 520, 360, 220, 620, { cuts: 7, amp: 0.1 });
        const R = INK.rng(12);
        for (let i = 0; i < 7; i++) { const x = 330 + (i / 6) * 480 + (R() - 0.5) * 60, y = 390 + ((i * 3) % 7) / 6 * 260; P.check(c, x, y, 40, E.se(t, sh + 1 + i * 0.5, sh + 1.4 + i * 0.5), { w: 5, color: '#3E5A1A' }); }
        P.write(c, 'ülke', 580, 820, E.se(t, sh + 0.5, sh + 1.3), { size: 52, align: 'center', color: '#8A4A10' });
        INK.label(c, '≈', 1010, 560, { size: 110, weight: 700, align: 'center', alpha: E.se(t, sh + 4, sh + 4.6) });
        const kk = E.se(t, sh + 4.6, sh + 5.4, 'out');
        if (kk > 0) { c.save(); c.globalAlpha *= kk; F.kid(c, 1400, 780, 1.2, { t }); c.restore(); P.write(c, 'organizma', 1400, 850, kk, { size: 52, align: 'center', color: '#3E5A1A' }); }
        P.write(c, 'uyumlu bir bütün', 960, 230, E.se(t, sh + 6, sh + 7.2), { size: 64, align: 'center' });
      });
      if (a2 > 0) E.layer(ctx, a2, c => {
        // speed lines + ground
        for (let i = 0; i < 6; i++) { const y = 420 + i * 70, x = 700 - ((t * 500 + i * 130) % 400); stroke(c, [[x - 120, y], [x, y]], { w: 3, alpha: 0.35, dry: false, seed: 700 + i }); }
        stroke(c, [[500, 885], [1420, 882]], { w: 3, seed: 710 });
        const A = F.kid(c, 960, 880, 1.5, { run: true, phase: t * 8, lungs: 1, t });
        P.write(c, 'hepsi birlikte çalışır!', 960, 230, E.se(t, sr + 5.5, sr + 6.8), { size: 60, align: 'center', color: '#3E5A1A' });
        F.tag(c, 'akciğerler', 640, 360, [A.lungs[0] - 20, A.lungs[1] - 10], E.se(t, sr + 3.2, sr + 4), { size: 46, align: 'right', seed: 3 });
        F.tag(c, 'kalp', 1300, 430, [A.heart[0] + 14, A.heart[1] + 6], E.se(t, sr + 2.2, sr + 3), { size: 46, seed: 4 });
        F.tag(c, 'kaslar', 1320, 700, [A.leg[0] + 20, A.leg[1]], E.se(t, sr + 1.2, sr + 2), { size: 46, seed: 5 });
      });
      if (a3 > 0) E.layer(ctx, a3, c => {
        const R = 250; const g = INK.wobble(circlePts(900, 520, R, R, 80), 1, 9); P.fillPts(c, g, '#F6F3E6'); 
        c.save(); P.path(c, g); c.clip(); F.paramecium(c, 900, 520, 0.95, t); c.restore();
        stroke(c, circlePts(900, 520, R, R, 90), { w: 9, closed: true, seed: 11 });
        P.write(c, 'terlik hayvanı', 1220, 360, E.se(t, ss + 0.8, ss + 1.8), { size: 54, color: '#3E5A1A' });
        P.write(c, 'tek hücreli canlı', 1220, 430, E.se(t, ss + 1.6, ss + 2.6), { size: 40, weight: 400 });
        P.write(c, 'tek hücre = organizma', 1220, 560, E.se(t, ss + 4, ss + 5.2), { size: 50, color: '#8A4A10' });
        INK.label(c, '(mikroskopla görülür · çizim ölçekli değildir)', 900, 830, { size: 28, align: 'center', alpha: 0.6 * E.se(t, ss + 1, ss + 2) });
      });
      DAMLA.draw(ctx, { x: 1840, y: 1045, s: 0.85, view: 'q3', flip: true, expr: 'happy', look: [-0.7, -0.3], blink: E.blink(t, 9), squash: E.breath(t), t, talk: E.talk(t), seed: 4, arms: [[-1, 0.4], [1, 2.2 + Math.sin(t * 2) * 0.06]] });
    }
  });
})();
