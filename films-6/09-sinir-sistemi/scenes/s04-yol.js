// SAHNE 4 — Haberin yolu: göz → sinir → beyin → omurilik → sinir → kas (c: görevleri açıklar)
(function () {
  const { PAL } = INK; const K = KIT, F = F09;
  const STEPS = ['1 · Göz topu görür.', '2 · Sinirler haberi beyne taşır.', '3 · Beyin karar verir.', '4 · Emir omurilik ve sinirlerle kaslara gider.'];
  E.scene({
    name: 'Haberin yolu', concept: 'Uyarı → beyin → cevap', from: 'path', to: 'path', trFrom: [560, 300],
    draw(ctx, t) {
      const s = E.s('path');
      const up = E.se(t, s + 6.8, s + 7.6);
      const A = F.body(ctx, 560, 560, 0.95, { cns: 1, pns: 0.8, armR: [E.lerp(0.32, 2.4, up), E.lerp(0.1, 1.6, up)], armL: [E.lerp(0.32, 2.4, up), E.lerp(0.1, 1.6, up)] });
      // top
      const fk = E.se(t, s + 0.2, s + 7.6, 'io'), bx = E.lerp(1000, 560, fk), by = E.lerp(250, 178, fk) - Math.sin(fk * Math.PI) * 60;
      F.ball(ctx, bx, by, 34, t * 3 * (1 - up));
      // sinyaller
      F.pulse(ctx, [A.eye, [A.eye[0] + 20, A.eye[1] - 30], A.brain], E.se(t, s + 1.8, s + 3.2));
      const bg = E.se(t, s + 3.6, s + 4.2) * (1 - E.se(t, s + 6, s + 6.6));
      if (bg > 0) { ctx.save(); ctx.globalAlpha = bg * 0.6; ctx.strokeStyle = PAL.light; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(A.brain[0], A.brain[1], 62 + Math.sin(t * 8) * 4, 0, 7); ctx.stroke(); ctx.restore(); }
      const out = [A.brain, A.neck, A.cordMid.map((v, i) => i ? v - 40 : v), A.shR, A.elbowR, A.handR];
      F.pulse(ctx, out, E.se(t, s + 5.4, s + 6.9));
      const outL = [A.brain, A.neck, A.cordMid.map((v, i) => i ? v - 40 : v), A.tr([-108, -190]), A.handL];
      F.pulse(ctx, outL, E.se(t, s + 5.4, s + 6.9));
      STEPS.forEach((st, i) => { const at = s + [0.8, 1.8, 3.6, 5.4][i]; K.node(ctx, st, 1400, 290 + i * 150, E.se(t, at, at + 0.5, 'out'), { size: 38, w: 780, h: 96, tint: i === 2 ? PAL.light : null, tintA: 0.25, seed: 20 + i });
        if (i > 0) P.arrow(ctx, [1400, 290 + i * 150 - 100], [1400, 290 + i * 150 - 52], E.se(t, at - 0.3, at), { w: 3, head: 11 }); });
      K.text(ctx, 'hepsi bir saniyeden kısa sürede!', 1400, 890, { size: 36, align: 'center', color: K.AMBER_D, alpha: E.se(t, s + 8.2, s + 8.9) });
    }
  });
})();
