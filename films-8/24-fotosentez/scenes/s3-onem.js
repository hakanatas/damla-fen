// SAHNE 3 — Yapay ışıkta fotosentez; neden-sonuç zinciri; besin zinciri ve oksijen: fotosentezin önemi (FB.8.7.1 a, b; D5.2)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const U = U7;
  // SERA — yapay ışık
  E.scene({
    name: 'Serada gece', concept: 'Fotosentez yapay ışıkta da olur', from: 'artificial', to: 'artificial', trFrom: [960, 300],
    draw(ctx, t) {
      const sa = E.s('artificial');
      ctx.save(); ctx.fillStyle = 'rgba(40,58,92,0.30)'; ctx.fillRect(0, 0, E.W, E.H); ctx.restore();
      // sera çatısı
      stroke(ctx, P.arc(960, 900, 900, Math.PI * 1.08, Math.PI * 1.92, 40, 720), { w: 4, seed: 3001 });
      for (let i = 0; i < 7; i++) { const a = Math.PI * (1.12 + i * 0.127); line(ctx, [960 + Math.cos(a) * 900, 900 + Math.sin(a) * 720], [960 + Math.cos(a) * 900, 900], { w: 2, alpha: 0.35, dry: false, seed: 3010 + i }); }
      line(ctx, [60, 900], [1860, 900], { w: 4, seed: 3002 });
      // pencerede Ay: gece
      U.moon(ctx, 1640, 330, 44); INK.label(ctx, 'gece', 1640, 410, { size: 34, align: 'center', alpha: 0.8, weight: 700 });
      const on = E.se(t, sa + 0.8, sa + 1.6);
      [640, 960, 1280].forEach((x, i) => {
        // lamba
        const bar = U.rr(x - 110, 300, 220, 30, 10, 3); U.shape(ctx, bar, '#6E6A64', 0.5, 3020 + i);
        line(ctx, [x - 80, 300], [x - 80, 200], { w: 2, dry: false }); line(ctx, [x + 80, 300], [x + 80, 200], { w: 2, dry: false });
        if (on > 0) { const g = ctx.createLinearGradient(0, 330, 0, 760); g.addColorStop(0, `rgba(227,160,58,${0.5 * on})`); g.addColorStop(1, 'rgba(227,160,58,0)'); ctx.save(); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x - 100, 330); ctx.lineTo(x + 100, 330); ctx.lineTo(x + 190, 760); ctx.lineTo(x - 190, 760); ctx.closePath(); ctx.fill(); ctx.restore(); }
        U.potPlant(ctx, x, 770, 0.95, t + i);
        // oksijen yükselir
        if (on > 0.5) for (let j = 0; j < 2; j++) { const u = ((t - sa) * 0.3 + j / 2 + i * 0.17) % 1; ctx.save(); ctx.globalAlpha *= Math.min(1, u * 5, (1 - u) * 5) * on; U.gas(ctx, x + 90 + j * 30, 640 - u * 260, 'O_2', 22); ctx.restore(); }
      });
      P.write(ctx, 'yapay ışık', 960, 250, E.seg(t, sa + 1.4, sa + 2.4), { size: 52, align: 'center', color: '#8A5A12' });
      U.damla(ctx, t, { x: 230, y: 900, s: 1.0, expr: 'happy', look: [0.7, -0.3], arms: [[-1, 0.4], [1, 1.9]] });
    }
  });

  const BOX = (c, x, y, w, h, txt, k, col, seed, o = {}) => {
    if (k <= 0) return; c.save(); c.globalAlpha *= E.clamp(k * 1.4);
    U.card(c, x - w / 2, y - h / 2, w, h, seed, { tint: col, tintA: 0.16 });
    c.restore();
    const lines = txt.split('\n'); lines.forEach((l, i) => { if (o.rich) U.rich(c, l, x, y + 14 + (i - (lines.length - 1) / 2) * 46, k, { size: o.size ?? 40, align: 'center' }); else U.wfit(c, l, x, y + 14 + (i - (lines.length - 1) / 2) * 46, k, o.size ?? 40, w - 30, { align: 'center' }); });
  };
  const XS = [290, 720, 1150, 1580];
  E.scene({
    name: 'Neden-sonuç', concept: 'Fotosentezin önemi: besin, büyüme, oksijen', from: 'cause', to: 'balance', trFrom: [960, 540],
    draw(ctx, t) {
      const sc = E.s('cause'), sch = E.s('chain'), sb = E.s('balance');
      // neden-sonuç zincirleri
      const kA = 1 - E.se(t, sch - 0.4, sch + 0.3);
      if (kA > 0) E.layer(ctx, kA, c => {
        const r1 = [['ışık + su + CO_2', U.AMB], ['fotosentez', U.LIFE], ['besin üretilir', U.SUG], ['bitki büyür', U.LIFE]];
        r1.forEach(([txt, col], i) => { const at = sc + 0.3 + i * 0.9; BOX(c, XS[i], 330, 340, 130, txt, E.se(t, at, at + 0.7), col, 3100 + i, { rich: i === 0 }); if (i) P.arrow(c, [XS[i - 1] + 176, 330], [XS[i] - 176, 330], E.se(t, at - 0.2, at + 0.3), { w: 3.4 }); });
        U.potPlant(c, XS[3] + 90, 222, 0.32, t);
        const r2 = ['ışık yok', 'fotosentez olmaz', 'besin üretilmez', 'bitki büyüyemez'];
        r2.forEach((txt, i) => { const at = sc + 4.2 + i * 0.8; const k = E.se(t, at, at + 0.7); BOX(c, XS[i], 640, 340, 130, txt, k, '#9A9387', 3200 + i); if (i) P.arrow(c, [XS[i - 1] + 176, 640], [XS[i] - 176, 640], E.se(t, at - 0.2, at + 0.3), { w: 3.4 }); });
        const k0 = E.se(t, sc + 4.2, sc + 4.9); if (k0 > 0) { P.sun(c, XS[0] - 120, 560, 26, t, { nrays: 10, cells: false, glow: false }); P.cross(c, XS[0] - 120, 560, 30, k0, { w: 5 }); }
        if (E.se(t, sc + 6.6, sc + 7.2) > 0) { c.save(); c.globalAlpha *= E.se(t, sc + 6.6, sc + 7.2); U.potPlant(c, XS[3] + 90, 532, 0.32, t, { wilt: 1, h: 160 }); c.restore(); }
        INK.label(c, 'neden', XS[0], 222, { size: 34, align: 'center', alpha: 0.7 * E.se(t, sc + 0.5, sc + 1) });
        INK.label(c, 'sonuç', XS[3] - 60, 222, { size: 34, align: 'center', alpha: 0.7 * E.se(t, sc + 3, sc + 3.5) });
        U.damla(c, t, { x: 960, y: 900, s: 0.9, expr: 'thinking', look: [0, -0.8], arms: [[-1, 0.4], [1, [34, -96]]] });
      });
      // besin zinciri
      const kB = E.se(t, sch - 0.1, sch + 0.6);
      if (kB > 0) E.layer(ctx, kB, c => {
        const orgs = [['ot', (cc, x, y) => U.grass(cc, x, y, 1.0, t)], ['çekirge', (cc, x, y) => U.hopper(cc, x - 10, y, 0.9)], ['kurbağa', (cc, x, y) => U.frog(cc, x, y, 1.0)], ['yılan', (cc, x, y) => U.snake(cc, x - 10, y, 0.85, t)]];
        const X0 = [180, 600, 1020, 1440];
        orgs.forEach(([name, dr], i) => { const at = sch + 0.3 + i * 1.0, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return; c.save(); c.globalAlpha *= k; U.orgCard(c, X0[i], 380, 300, 260, name, dr, 3300 + i, { tint: U.LIFE }); c.restore();
          if (i) { const ka = E.se(t, at - 0.3, at + 0.3); P.arrow(c, [X0[i - 1] + 312, 510], [X0[i] - 12, 510], ka, { w: 3.4 }); if (ka >= 1) { const u = ((t - at) * 0.5) % 1; U.sugar(c, E.lerp(X0[i - 1] + 320, X0[i] - 20, u), 480, 13); } } });
        P.sun(c, 640, 250, 40, t, { nrays: 12, cells: false }); U.ray(c, [600, 280], [420, 410], E.se(t, sch + 0.6, sch + 1.4), { w: 3 });
        P.write(c, 'besin, üreticiden tüketicilere aktarılır', 960, 740, E.seg(t, sch + 3.6, sch + 5.0), { size: 46, align: 'center', color: '#8A5A12' });
        // oksijen yenilenir
        const ko = E.se(t, sb, sb + 0.8);
        if (ko > 0) {
          for (let j = 0; j < 4; j++) { const u = ((t - sb) * 0.28 + j / 4) % 1; c.save(); c.globalAlpha *= ko * Math.min(1, u * 5, (1 - u) * 5); U.gas(c, 290 + (j % 2) * 60 + Math.sin(u * 6 + j) * 14, 400 - u * 220, 'O_2', 24); c.restore(); }
          U.rich(c, 'havadaki oksijen (O_2) yenilenir', 960, 830, E.seg(t, sb + 0.4, sb + 1.8), { size: 46, align: 'center', color: '#1F4A63' });
          U.stamp(c, 1560, 260, 'doğanın dengesi', E.se(t, sb + 3.2, sb + 3.9, 'out'), { size: 46, rot: -0.08 });
        }
      });
    }
  });
})();
