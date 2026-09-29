// SAHNE 1 — Senaryo (TYMM: bir binanın sıcaklık değerinin korunması): kış gecesi, ısı evden kaçıyor
(function () {
  const { PAL, line, stroke, circlePts, wash, rng } = INK;
  const F = F21;
  E.scene({
    name: 'Kış gecesi', concept: 'Senaryo: evin sıcaklığı nasıl korunur?', from: 'title', to: 'question',
    draw(ctx, t) {
      const sh = E.s('hello'), sq = E.s('question');
      ctx.save();
      E.cam(ctx, { x: 960, y: 540 + 20 * E.se(t, 0, sh, 'sine'), z: 1 + 0.03 * E.se(t, 0, sq + 4, 'sine') });
      const sky = ctx.createLinearGradient(0, 0, 0, E.H); sky.addColorStop(0, 'rgba(46,70,110,0.45)'); sky.addColorStop(1, 'rgba(46,70,110,0.15)'); ctx.fillStyle = sky; ctx.fillRect(-200, -200, E.W + 400, E.H + 400);
      P.moon(ctx, 1700, 200, 60);
      const R = rng(4201); ctx.save(); ctx.fillStyle = PAL.white; ctx.globalAlpha = 0.85; for (let i = 0; i < 70; i++) { const x = R() * E.W, y = ((R() * 1000 + t * (30 + R() * 30)) % 1000); ctx.beginPath(); ctx.arc(x + Math.sin(t + i) * 6, y, 2.5 + R() * 2, 0, 7); ctx.fill(); } ctx.restore();
      const ground = [[-200, 860], [E.W + 200, 856], [E.W + 200, 1300], [-200, 1300]]; P.fillPts(ctx, ground, '#F4F1EA'); stroke(ctx, ground.slice(0, 2), { w: 3 });
      // house section
      const x0 = 480, x1 = 1440, base = 860, top = 400, th = 30;
      const inner = [[x0 + th, top + th], [x1 - th, top + th], [x1 - th, base], [x0 + th, base]];
      P.fillPts(ctx, inner, '#F6E3C4'); wash(ctx, inner, PAL.light, 0.3, 4202, { bleed: 1 });
      [[x0, top, th, base - top], [x1 - th, top, th, base - top], [x0, top, x1 - x0, th]].forEach(([x, y, w, h], i) => { const r = [[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]]; P.fillPts(ctx, r, '#D8C9B0'); stroke(ctx, r, { w: 2.4, closed: true, dry: false, seed: 4203 + i }); });
      // window in left wall
      P.fillPts(ctx, [[x0 - 1, 520], [x0 + th + 1, 520], [x0 + th + 1, 680], [x0 - 1, 680]], '#DDEBF0'); line(ctx, [x0 + th / 2, 520], [x0 + th / 2, 680], { w: 2.4, color: F.COLD, dry: false });
      const roof = [[x0 - 50, top], [960, top - 190], [x1 + 50, top]]; P.fillPts(ctx, roof, '#C98E6A'); stroke(ctx, roof.concat([roof[0]]), { w: 3, closed: true, seed: 4207 });
      P.fillPts(ctx, [[x0 - 50, top], [960, top - 190], [980, top - 178], [x0 - 26, top + 2]], PAL.white, 0.9);
      // radiator
      const rx = 700, ry = 760; for (let i = 0; i < 6; i++) { const r = [[rx + i * 22, ry], [rx + i * 22 + 18, ry], [rx + i * 22 + 18, ry + 80], [rx + i * 22, ry + 80], [rx + i * 22, ry]]; P.fillPts(ctx, r, '#E8E1D3'); stroke(ctx, r, { w: 1.6, closed: true, dry: false }); }
      for (let i = 0; i < 3; i++) { const p = []; for (let j = 0; j <= 14; j++) { const u = j / 14; p.push([rx + 26 + i * 30 + Math.sin(u * 8 + t * 5 + i) * 4, ry - 8 - u * 50]); } stroke(ctx, p, { w: 2.4, color: F.HEAT, dry: false }); }
      INK.label(ctx, 'kalorifer', rx + 66, ry + 120, { size: 32, align: 'center', alpha: 0.75 });
      // escaping heat
      const k = E.se(t, sh + 2.5, sh + 3.5);
      if (k > 0) {
        const fl = [[[x0 + 40, 600], [x0 - 150, 580]], [[x0 + 40, 780], [x0 - 150, 790]], [[x1 - 40, 560], [x1 + 150, 560]], [[x1 - 40, 740], [x1 + 150, 740]], [[960, top + 40], [960, top - 250]], [[x0 + 50, 470], [x0 - 150, 440]]];
        fl.forEach(([a, b], i) => { const u = ((t * 0.5 + i * 0.31) % 1); ctx.save(); ctx.globalAlpha = k * (0.35 + 0.65 * Math.sin(u * Math.PI)); P.arrow(ctx, a, b, 1, { w: 7, color: F.HEAT, head: 20 }); ctx.restore(); });
        INK.label(ctx, 'ısı kaçıyor!', 240, 700, { size: 44, weight: 700, color: F.HEAT, align: 'center', alpha: E.se(t, sh + 4, sh + 5) });
      }
      // Damla inside, shivering a little
      const q = t > sq;
      DAMLA.draw(ctx, {
        y: base, s: 1.3, view: 'front', t, seed: 1, blink: E.blink(t, 2), squash: E.breath(t), talk: E.talk(t),
        expr: q ? 'determined' : 'sad', look: q ? [0, -0.4] : [-0.6, 0], x: 1150 + (q ? 0 : Math.sin(t * 30) * 1.5),
        arms: q ? [[-1, 0.4], [1, 2.4 + Math.sin(t * 2) * 0.1]] : [[-1, [22, -110]], [1, [-22, -110]]]
      });
      ctx.restore();
      // question bubble
      const bk = E.se(t, sq + 0.5, sq + 1.1, 'out');
      if (bk > 0) { P.bubble(ctx, 1000, 470, 520, 170, [1120, 580], bk, 5); P.write(ctx, 'Evin sıcaklığını', 1000, 455, E.seg(t, sq + 1, sq + 2), { size: 44, align: 'center' }); P.write(ctx, 'nasıl koruruz?', 1000, 510, E.seg(t, sq + 1.8, sq + 2.8), { size: 44, align: 'center' }); }
      // title
      const t1 = E.e('title') + 1.2;
      if (t < t1) { const a = 1 - E.se(t, t1 - 0.8, t1); ctx.save(); ctx.globalAlpha = 0.92 * a; ctx.translate(960, 265); ctx.scale(1.9, 1); const g = ctx.createRadialGradient(0, 0, 40, 0, 0, 430); g.addColorStop(0, 'rgba(241,234,219,1)'); g.addColorStop(0.55, 'rgba(241,234,219,0.9)'); g.addColorStop(1, 'rgba(241,234,219,0)'); ctx.fillStyle = g; ctx.fillRect(-500, -430, 1000, 860); ctx.restore(); }
      E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 205, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
      E.inkText(ctx, '21 · Sıcaklığı Koruyan Ev: Isı Yalıtımı', 960, 285, t, 1.2, t1, { size: 56, align: 'center' });
      E.inkText(ctx, 'Fen Bilimleri · 5. sınıf · Ünite 5', 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
      if (t > 1 && t < t1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([600, 230], [960, 240], [1320, 226], 30), E.se(t, 1, 2.2), { w: 3, color: PAL.light }); ctx.restore(); }
    }
  });
})();
