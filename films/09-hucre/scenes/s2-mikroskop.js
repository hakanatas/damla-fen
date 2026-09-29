// SAHNE 2 — Mikroskobun bölümleri ve işlevleri + güvenli çalışma (TYMM: mikroskobun bölümleri ve işlevi tanıtılır)
(function () {
  const { PAL, line, stroke, circlePts, splash } = INK;
  const RED = '#A23A2A';
  function slideIcon(ctx, x, y, s, crack) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-0.08);
    const lam = [[-120, -30], [120, -30], [120, 30], [-120, 30], [-120, -30]]; P.fillPts(ctx, lam, '#E3EEF2', 0.95); stroke(ctx, lam, { w: 3, closed: true, seed: 51 });
    const lamel = [[-34, -26], [34, -26], [34, 26], [-34, 26], [-34, -26]]; P.fillPts(ctx, lamel, '#FFFFFF', 0.8); stroke(ctx, lamel, { w: 2, closed: true, seed: 52, dry: false });
    line(ctx, [-100, -18], [-70, -24], { w: 2, color: PAL.white, dry: false });
    if (crack > 0) P.drawOn(ctx, [[60, -30], [72, -10], [64, 4], [82, 30]], crack, { w: 2.4, color: RED });
    ctx.restore();
  }
  function mirrorIcon(ctx, x, y, s, t) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const m = circlePts(0, 0, 50, 22, 40); P.fillPts(ctx, m, '#E3EEF2'); stroke(ctx, m, { w: 3.4, closed: true, seed: 53 });
    line(ctx, [0, 22], [0, 60], { w: 5 }); line(ctx, [-30, 60], [30, 60], { w: 5 });
    ctx.restore();
    P.sun(ctx, x - 170 * s, y - 90 * s, 42 * s, t, { nrays: 12, glow: false, cells: false });
  }
  E.scene({
    name: 'Mikroskop', concept: 'Mikroskobun bölümleri ve güvenli kullanım', from: 'micro', to: 'safety', trFrom: [700, 500],
    draw(ctx, t) {
      const F = F09, sm = E.s('micro'), sp = E.s('parts'), ss = E.s('safety');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      // table edge
      const tab = [[-20, 905], [1940, 895], [1940, 1100], [-20, 1100]]; P.fillPts(ctx, tab, '#D9C4A0', 0.8); stroke(ctx, [[-20, 905], [1940, 895]], { w: 3.4, seed: 5 });
      const mk = E.se(t, sm + 0.1, sm + 1.2, 'out');
      const on = t > sp + 6;
      ctx.save(); ctx.globalAlpha = mk;
      const A = F.microscope(ctx, 700, 905, 1.1, { lampOn: on });
      ctx.restore();
      // part labels
      const L = [
        ['göz merceği', 'büyütür', 1000, 225, A.eye, sp + 0.3],
        ['objektif', 'büyütür', 1000, 380, A.obj, sp + 1.4],
        ['tabla', 'örneği taşır', 1000, 540, A.stage, sp + 3.6],
        ['ışık kaynağı', 'aydınlatır', 1000, 720, A.lamp, sp + 5.6],
        ['ayar vidası', 'netleştirir', 380, 560, A.knob, sp + 7.6]
      ];
      const safe = E.se(t, ss + 0.2, ss + 1.0);
      L.forEach(([n, f, x, y, p, at], i) => {
        const k = E.se(t, at, at + 0.9) * (1 - safe * (x > 900 ? 1 : 0));
        if (k <= 0) return;
        F.tag(ctx, n, x, y, [p[0] + (x > 900 ? 6 : -4), p[1]], k, { size: 46, align: x > 900 ? 'left' : 'right', seed: 20 + i, bend: 0.1 });
        P.write(ctx, f, x + (x > 900 ? 0 : -0), y + 48, E.se(t, at + 0.8, at + 1.6) * (1 - safe * (x > 900 ? 1 : 0)), { size: 34, weight: 400, align: x > 900 ? 'left' : 'right', color: '#6B4A1E' });
      });
      // Damla peeking
      const pk = E.se(t, sm + 0.6, sm + 1.6, 'out');
      DAMLA.draw(ctx, { x: E.lerp(-150, 190, pk), y: 1040, s: 1.05, view: 'q3', flip: false, expr: t > ss ? 'determined' : 'curious', look: [0.8, -0.3], blink: E.blink(t, 3), squash: E.breath(t), t, talk: E.talk(t), seed: 2, arms: t > sp && t < ss ? [[-1, 0.4], [1, 2.2 + Math.sin(t * 2) * 0.08]] : [[-1, 0.35], [1, 0.4]] });
      // safety card
      if (safe > 0) {
        const k = E.se(t, ss + 0.2, ss + 1.0, 'out');
        ctx.save(); ctx.translate((1 - k) * 900, 0);
        F.card(ctx, 1000, 150, 1850, 860, { color: RED, seed: 31 });
        line(ctx, [1010, 226], [1850, 216], { w: 3, color: RED, dry: false });
        ctx.font = '700 46px Kalam'; ctx.fillStyle = RED; ctx.textAlign = 'center'; ctx.fillText('⚠  GÜVENLİ ÇALIŞMA', 1430, 202);
        slideIcon(ctx, 1200, 340, 0.9, E.se(t, ss + 1.4, ss + 2.2));
        P.write(ctx, 'Lam ve lamel camdır.', 1370, 320, E.seg(t, ss + 1.4, ss + 2.6), { size: 42 });
        P.write(ctx, 'Özenle tut, kırılırsa dokunma!', 1370, 375, E.seg(t, ss + 2.2, ss + 3.4), { size: 34, weight: 400 });
        mirrorIcon(ctx, 1230, 560, 1, t);
        P.arrow(ctx, [1100, 490], [1195, 545], E.se(t, ss + 4, ss + 4.6), { w: 3, color: '#C07F1E', head: 12 });
        P.cross(ctx, 1170, 520, 60, E.se(t, ss + 4.6, ss + 5.2), { w: 10, color: RED });
        P.write(ctx, 'Ayna asla', 1370, 530, E.seg(t, ss + 4.4, ss + 5.4), { size: 42 });
        P.write(ctx, 'Güneş’e çevrilmez!', 1370, 585, E.seg(t, ss + 5, ss + 6.2), { size: 42, color: RED });
        P.write(ctx, 'Bir yetişkin eşliğinde çalış.', 1430, 780, E.seg(t, ss + 6.4, ss + 7.6), { size: 44, align: 'center' });
        ctx.restore();
      }
    }
  });
})();
