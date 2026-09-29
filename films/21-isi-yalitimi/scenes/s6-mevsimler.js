// SAHNE 6 — Isı yalıtımı tüm mevsimlerde işlevseldir (TYMM vurgusu) + kültürel miras: Harran kümbet evleri (KB2.6, D17.2)
(function () {
  const { PAL, line, stroke, circlePts, wash, rng } = INK;
  const F = F21;
  E.scene({
    name: 'Tüm mevsimler', concept: 'Yalıtım kışın ve yazın ısı akışını yavaşlatır; tarihi yapılar', from: 'summer', to: 'heritage', trFrom: [1600, 250],
    draw(ctx, t) {
      const ss = E.s('summer'), sa = E.s('allyear'), sh = E.s('heritage');
      const A = 1 - E.se(t, sa - 0.3, sa + 0.4), B = Math.min(E.se(t, sa - 0.3, sa + 0.4), 1 - E.se(t, sh - 0.3, sh + 0.4)), C = E.se(t, sh - 0.3, sh + 0.4);
      ctx.fillStyle = 'rgba(227,160,58,0.10)'; ctx.fillRect(0, 0, E.W, E.H);
      // A: summer test with iced water
      if (A > 0) E.layer(ctx, A, c => {
        P.sun(c, 1700, 190, 80, t, { nrays: 16, cells: false });
        const tb = [[60, 800], [1500, 796], [1510, 840], [50, 844], [60, 800]]; P.fillPts(c, tb, '#E3D3B3'); wash(c, tb, '#8A6A45', 0.4, 4701); stroke(c, tb, { w: 3, closed: true, seed: 4702 });
        const m = E.clamp((t - (ss + 1.2)) / 5) * 20;
        F.model(c, 460, 796, 380, 330, { T: F.at(F.D.sPlain, m), inward: true, t, flow: E.se(t, ss + 0.8, ss + 1.5) });
        F.model(c, 1100, 796, 380, 330, { walls: 1, roof: 1, gaps: 1, dbl: 1, T: F.at(F.D.sFull, m), inward: true, t, flow: E.se(t, ss + 0.8, ss + 1.5) });
        INK.label(c, 'A: kaplamasız', 460, 866, { size: 36, weight: 700, align: 'center' });
        INK.label(c, 'v2: yalıtımlı', 1100, 866, { size: 36, weight: 700, align: 'center' });
        INK.label(c, 'buzlu su · 20 dakika', 1560, 420, { size: 34, weight: 700, align: 'center', alpha: E.se(t, ss + 1, ss + 1.8) });
        if (m >= 20) P.write(c, 'daha uzun süre soğuk!', 1560, 480, E.seg(t, ss + 6.4, ss + 7.4), { size: 38, align: 'center', color: F.COLD });
      });
      // B: winter / summer summary
      if (B > 0) E.layer(ctx, B, c => {
        const panels = [{ x: 80, lab: 'Kışın', sub: 'ısının dışarı kaçışı yavaşlar', inward: false, bg: 'rgba(46,70,110,0.22)' }, { x: 980, lab: 'Yazın', sub: 'ısının içeri girişi yavaşlar', inward: true, bg: 'rgba(227,160,58,0.22)' }];
        panels.forEach((p, i) => {
          const r = [[p.x, 170], [p.x + 860, 166], [p.x + 862, 880], [p.x + 2, 882]]; P.fillPts(c, r, '#FAF6EC'); P.fillPts(c, r, p.bg); stroke(c, r.concat([r[0]]), { w: 2.6, closed: true, seed: 4710 + i });
          INK.label(c, p.lab, p.x + 60, 250, { size: 54, weight: 700, color: i ? '#8A4A10' : F.COLD });
          if (i) P.sun(c, p.x + 740, 260, 50, t, { nrays: 12, cells: false }); else { const R = rng(4715); c.save(); c.fillStyle = PAL.white; for (let j = 0; j < 30; j++) { const x = p.x + 20 + R() * 820, y = 180 + ((R() * 690 + t * 40) % 690); c.beginPath(); c.arc(x, y, 3, 0, 7); c.fill(); } c.restore(); }
          c.save(); c.translate(p.x + 430, 0); c.scale(0.8, 0.8); c.translate(-(p.x + 430), 0);
          F.model(c, p.x + 430, 1000, 380, 330, { walls: 1, roof: 1, gaps: 1, dbl: 1, T: i ? 10 : 35, inward: p.inward, t, flow: 1, showT: false });
          c.restore();
          P.write(c, p.sub, p.x + 430, 860, E.seg(t, sa + 0.8 + i * 1.6, sa + 2.2 + i * 1.6), { size: 40, align: 'center' });
        });
      });
      // C: Harran kümbet houses
      if (C > 0) E.layer(ctx, C, c => {
        const g = c.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(227,170,90,0.35)'); g.addColorStop(1, 'rgba(227,170,90,0.08)'); c.fillStyle = g; c.fillRect(0, 0, E.W, E.H);
        P.sun(c, 1650, 220, 90, t, { nrays: 18, cells: false });
        const gr = [[-20, 820], [1940, 812], [1940, 1100], [-20, 1100]]; P.fillPts(c, gr, '#E8D2A8'); stroke(c, gr.slice(0, 2), { w: 3 });
        [[330, 1.25, 4720], [620, 1.45, 4730], [900, 1.3, 4740], [1180, 1.15, 4750]].forEach(([x, s, sd]) => F.kumbet(c, x, 822, s, sd));
        // sun heat slowed by thick walls
        const k = E.se(t, sh + 2.5, sh + 3.3);
        if (k > 0) for (let i = 0; i < 3; i++) { const u = ((t * 0.5 + i * 0.33) % 1); c.save(); c.globalAlpha = k * (0.4 + 0.6 * Math.sin(u * Math.PI)); P.arrow(c, [1540 - i * 50, 300 + i * 30], [820 + i * 50, 450 + i * 45], 1, { w: 6, color: F.HEAT, head: 18 }); c.restore(); }
        P.write(c, 'Harran kümbet evleri', 1300, 600, E.seg(t, sh + 1, sh + 2.2), { size: 50, color: '#8A4A10' });
        INK.label(c, 'Şanlıurfa', 1300, 648, { size: 34, alpha: 0.75 * E.se(t, sh + 2, sh + 2.6) });
        P.write(c, 'kalın kerpiç duvarlar', 1300, 720, E.seg(t, sh + 4, sh + 5.2), { size: 42 });
        P.write(c, '→ yazın içi serin', 1300, 780, E.seg(t, sh + 5.2, sh + 6.4), { size: 42, color: F.COLD });
        INK.label(c, '(çizim ölçekli değildir)', 1300, 870, { size: 26, alpha: 0.55 });
      });
      DAMLA.draw(ctx, { x: 1790, y: 1070, s: 0.9, view: 'q3', flip: true, t, seed: 4, blink: E.blink(t, 5), squash: E.breath(t), talk: E.talk(t), expr: t > sh ? 'happy' : 'curious', look: [-0.8, -0.6], arms: [[-1, 0.35], [1, 2.3]], shadow: false });
    }
  });
})();
