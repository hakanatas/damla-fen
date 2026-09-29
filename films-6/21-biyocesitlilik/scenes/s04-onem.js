// SAHNE 5 — Biyoçeşitliliğin önemi: canlılar arası bağlar, bir halkanın kopması, doğanın katkıları, çıkarım (FB.6.7.1 d)
(function () {
  const { PAL, line, stroke, circlePts, dashed, wash } = INK;
  const F = F621;
  const fly = (c, x, y, s, t) => { c.save(); c.translate(x, y); c.scale(s, s); [-1, 1].forEach(sd => { const w = circlePts(sd * 10, -12, 12, 7, 14, sd * 0.6 + Math.sin(t * 40) * 0.2); P.fillPts(c, w, PAL.white, 0.8); stroke(c, w, { w: 1.3, closed: true, dry: false }); }); const b = circlePts(0, 0, 8, 14, 16); P.fillPts(c, b, '#3C3B45'); stroke(c, b, { w: 1.6, closed: true, dry: false }); INK.inkDot(c, 0, -14, 4); c.restore(); };
  const NODES = {
    cicek: [640, 460, 'çiçek', (c, t) => F.flower(c, 0, 50, 0.9, '#C8553D', 3, t, 80)],
    ari: [980, 250, 'arı', (c, t) => F.bee(c, 0, 0, 1.5, t)],
    bocek: [880, 700, 'böcek', (c, t) => fly(c, 0, 0, 1.8, t)],
    kurbaga: [1250, 560, 'kurbağa', (c, t) => F.frog(c, 0, 24, 1.3)],
    balikcil: [1620, 360, 'balıkçıl', (c, t) => F.heron(c, -18, 68, 0.52, t)]
  };
  const LINKS = [['ari', 'cicek', 'tozlaştırır', 0.1], ['kurbaga', 'bocek', 'yer', 1.5], ['balikcil', 'kurbaga', 'yer', 2.9]];
  function node(c, key, t, o = {}) {
    const [x, y, name, draw] = NODES[key];
    const cp = INK.wobble(circlePts(x, y, 92, 92, 50), 2, 10 + name.length);
    P.fillPts(c, cp, '#FBF8F1', 0.96); wash(c, cp, o.col ?? PAL.life, 0.16, 20 + name.length, { bleed: 1, blooms: 0 });
    if (o.gone) dashed(c, cp, { w: 3, on: 10, off: 8 }); else stroke(c, cp, { w: 3, closed: true, seed: 30 + name.length });
    c.save(); c.translate(x, y - 10); if (o.gone) c.globalAlpha *= 0.25; draw(c, t); c.restore();
    F.fit(c, name, x, y + 78, 170, 32, { color: '#2F4A1E' });
  }
  E.scene({
    name: 'Önemi', concept: 'Canlılar birbirine bağlıdır; doğanın katkıları', from: 'web', to: 'inference', trFrom: [960, 540],
    draw(ctx, t) {
      const sw = E.s('web'), sch = E.s('chain'), sg = E.s('gifts'), si = E.s('inference');
      ctx.fillStyle = 'rgba(111,138,58,0.07)'; ctx.fillRect(0, 0, E.W, E.H);
      // --- ağ
      const netA = 1 - E.se(t, sg - 0.3, sg + 0.4);
      if (netA > 0) E.layer(ctx, netA, c => {
        const gone = E.se(t, sch + 0.3, sch + 1.2);
        LINKS.forEach(([a, b, lbl, off]) => {
          const k = E.se(t, sw + 1.0 + off, sw + 2.0 + off); if (k <= 0) return;
          const A = NODES[a], B = NODES[b];
          const ang = Math.atan2(B[1] - A[1], B[0] - A[0]);
          const p0 = [A[0] + Math.cos(ang) * 100, A[1] + Math.sin(ang) * 100], p1 = [B[0] - Math.cos(ang) * 100, B[1] - Math.sin(ang) * 100];
          const broken = gone > 0.5 && (a === 'kurbaga' || b === 'kurbaga');
          c.save(); if (broken) c.globalAlpha *= 0.35;
          P.arrow(c, p0, p1, k, { w: 3.4, bend: 30, head: 16, color: '#2F4A1E' });
          const mx = (p0[0] + p1[0]) / 2 + (a === 'ari' ? -80 : 0), my = (p0[1] + p1[1]) / 2 - (a === 'ari' ? 30 : 36);
          if (k > 0.8) F.fit(c, lbl, mx, my, 220, 36, { color: '#2F4A1E' });
          c.restore();
        });
        Object.keys(NODES).forEach((key, i) => {
          const k = E.se(t, sw + 0.1 + i * 0.25, sw + 0.6 + i * 0.25, 'out'); if (k <= 0) return;
          const [x, y] = NODES[key];
          c.save(); c.translate(x, y); c.scale(P.pop(k), P.pop(k)); c.translate(-x, -y);
          node(c, key, t, { gone: key === 'kurbaga' && gone > 0.5 });
          c.restore();
        });
        if (gone > 0) {
          // kurbağa yok → böcek çoğalır, balıkçıl besinsiz
          c.save(); c.globalAlpha *= gone;
          P.cross(c, 1250, 550, 56, E.se(t, sch + 0.3, sch + 1.0), { w: 9, color: '#8A4A10' });
          const k2 = E.se(t, sch + 1.4, sch + 2.2);
          if (k2 > 0) {
            for (let i = 0; i < 5; i++) { const a = i / 5 * 6.28 + t * 0.8; fly(c, 880 + Math.cos(a) * 175, 640 + Math.sin(a) * 85, 0.9 * k2, t + i); }
            F.fit(c, 'çoğalır ↑', 880, 860, 260, 40, { color: '#8A4A10' });
          }
          const k3 = E.se(t, sch + 2.8, sch + 3.6);
          if (k3 > 0) { c.save(); c.globalAlpha *= k3; F.fit(c, 'besinsiz kalır ↓', 1640, 520, 300, 40, { color: '#8A4A10' }); c.restore(); }
          c.restore();
        }
        const wk = E.se(t, sch + 4.4, sch + 5.2, 'out');
        if (wk > 0) { c.save(); c.globalAlpha *= wk; F.card(c, 330, 800, 420, 90, 44, { tint: '#C99A22', tintA: 0.2, blur: 8 }); F.fit(c, 'Bir halka koparsa...', 540, 858, 380, 40); c.restore(); }
      });
      // --- katkılar
      const gA = Math.min(E.se(t, sg, sg + 0.5), 1 - E.se(t, si - 0.3, si + 0.4));
      if (gA > 0) E.layer(ctx, gA, c => {
        const G = [
          ['besin', (cc) => { const a = circlePts(0, 6, 30, 28, 24); P.fillPts(cc, a, '#C8553D', 0.85); stroke(cc, a, { w: 2.4, closed: true, dry: false }); line(cc, [0, -20], [4, -36], { w: 3, dry: false }); const lf = circlePts(14, -30, 12, 6, 12, -0.5); P.fillPts(cc, lf, PAL.life); }],
          ['oksijen', (cc) => { F.tree(cc, 0, 70, 0.45, 5, t); F.fit(cc, 'O₂', 44, -40, 80, 34, { color: PAL.water }); }],
          ['temiz su', (cc) => { const d = []; for (let i = 0; i <= 30; i++) { const a = i / 30 * 6.283; d.push([Math.sin(a) * 30 * Math.pow(Math.sin(a / 2), 0.8), -Math.cos(a) * 42]); } P.fillPts(cc, d, PAL.water, 0.6); stroke(cc, d, { w: 2.4, closed: true, dry: false }); }],
          ['verimli toprak', (cc) => { const s = [[-50, 30], [-40, -6], [0, -14], [44, -4], [52, 30], [-50, 30]]; P.fillPts(cc, s, '#8A5A34', 0.7); stroke(cc, s, { w: 2.4, closed: true, dry: false }); line(cc, [0, -14], [0, -46], { w: 3, color: PAL.life, dry: false }); P.fillPts(cc, circlePts(-10, -44, 11, 6, 12, 0.5), PAL.life); P.fillPts(cc, circlePts(10, -48, 11, 6, 12, -0.5), PAL.life); }],
          ['ilaç ham maddesi', (cc) => { const b = F.rr(-24, -34, 48, 70, 8); P.fillPts(cc, b, PAL.white); wash(cc, b, PAL.water, 0.25, 71, { bleed: 1, blooms: 0 }); stroke(cc, b, { w: 2.4, closed: true, dry: false }); P.fillPts(cc, F.rr(-18, -48, 36, 16, 3), '#8A6A45', 0.8); const lf = circlePts(0, 4, 10, 18, 14); P.fillPts(cc, lf, PAL.life, 0.8); }]
        ];
        F.fit(c, 'Biyoçeşitliliğin bize katkıları', 1120, 220, 1000, 58, { color: '#2F4A1E' });
        G.forEach(([name, draw], i) => {
          const at = sg + 0.6 + i * 0.9, k = E.se(t, at, at + 0.5, 'out'); if (k <= 0) return;
          const x = 440 + i * 300 + 60, y = 470;
          const cp = INK.wobble(circlePts(x, y, 110, 110, 50), 2, 80 + i);
          c.save(); c.translate(x, y); c.scale(P.pop(k), P.pop(k)); c.translate(-x, -y);
          P.fillPts(c, cp, '#FBF8F1', 0.96); wash(c, cp, PAL.life, 0.14, 90 + i, { bleed: 1, blooms: 0 }); stroke(c, cp, { w: 3, closed: true, seed: 95 + i });
          c.save(); c.translate(x, y - 6); draw(c); c.restore();
          c.restore();
          F.fit(c, name, x, y + 160, 280, 38);
        });
      });
      // --- çıkarım
      const iA = E.se(t, si + 0.1, si + 0.8, 'out');
      if (iA > 0) E.layer(ctx, iA, c => {
        F.card(c, 380, 220, 1160, 520, 55, { tint: PAL.life, tintA: 0.14 });
        P.write(c, 'Çıkarımım', 960, 320, E.seg(t, si + 0.4, si + 1.2), { size: 64, align: 'center', color: '#2F4A1E' });
        P.write(c, 'Çeşitlilik zenginse ekosistem', 960, 430, E.seg(t, si + 1.0, si + 2.4), { size: 52, align: 'center' });
        P.write(c, 'daha dengeli ve değişimlere karşı', 960, 510, E.seg(t, si + 2.2, si + 3.6), { size: 52, align: 'center' });
        P.write(c, 'daha dayanıklıdır.', 960, 590, E.seg(t, si + 3.4, si + 4.4), { size: 52, align: 'center' });
        P.drawOn(c, P.bez([700, 630], [960, 642], [1220, 626], 30), E.se(t, si + 4.4, si + 5.2), { w: 3.4, color: PAL.life });
      });
      // Damla
      const dA = 1;
      DAMLA.draw(ctx, { x: 190, y: 900, s: 1.05, view: 'q3', expr: t > si ? 'happy' : 'curious', look: [0.8, -0.4], blink: E.blink(t, 7), squash: E.breath(t), t, talk: E.talk(t), seed: 4, arms: [[-1, 0.4], [1, 2.0]] });
    }
  });
})();
