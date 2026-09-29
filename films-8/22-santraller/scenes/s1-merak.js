// SAHNE 1 — Merak: vantilatör (elektrik → hareket), bisiklet dinamosu (hareket → elektrik)
// SAHNE 2 — Elektrik üretiminin nitelikleri (FB.8.6.8 a): kaynak → türbin → jeneratör → elektrik
(function () {
  const { PAL, stroke, line, circlePts } = INK;
  const W = W6;
  E.scene({
    name: 'Merak', concept: 'Hareket enerjisi elektriğe dönüşebilir mi?', from: 'title', to: 'dynamo2',
    draw(ctx, t) {
      const sh = E.s('hello'), sd = E.s('dynamo'), s2 = E.s('dynamo2');
      const floor = [[-20, 800], [E.W + 20, 800], [E.W + 20, E.H + 20], [-20, E.H + 20]]; P.fillPts(ctx, floor, '#D9C7A4', 0.45); stroke(ctx, [[-20, 800], [E.W + 20, 796]], { w: 3, dry: false });
      // vantilatör
      const fanOn = E.se(t, sh + 0.3, sh + 1.0);
      W.A.fan(ctx, 330, 640, 1.35, t, fanOn);
      const fk = E.se(t, sh + 1.2, sh + 1.8, 'out');
      W.badge(ctx, 'elektrik', 250, 360, fk, { size: 36 }); W.flow(ctx, [250, 400], [250, 470], E.se(t, sh + 1.6, sh + 2.2), { color: W.MOVE, w: 4, head: 14 });
      if (fk > 0) W.txt(ctx, 'vantilatör', 330, 850, { size: 38, align: 'center', alpha: fk });
      // tersi?
      const rk = E.se(t, sh + 3.0, sh + 3.6, 'out');
      if (rk > 0 && t < sd) { W.badge(ctx, 'hareket', 980, 360, rk, { size: 44, t }); W.flow(ctx, [1100, 360], [1300, 360], E.se(t, sh + 3.4, sh + 4.0), { color: W.ELEC }); W.badge(ctx, 'elektrik', 1440, 360, E.se(t, sh + 3.9, sh + 4.4, 'out'), { size: 44 }); W.txt(ctx, '?', 1600, 380, { size: 80, color: PAL.water, alpha: E.se(t, sh + 4.3, sh + 4.8) }); }
      // bisiklet: tekerlek + dinamo + far
      const bk = E.se(t, sd - 0.2, sd + 0.6);
      if (bk > 0) E.layer(ctx, bk, c => {
        const wx = 1180, wy = 610, r = 185;
        const spin = t < sd + 1.0 ? 0 : (t < s2 + 2.4 ? E.se(t, sd + 1.0, sd + 1.8) : 1 - E.se(t, s2 + 2.4, s2 + 3.4));
        // açı: hızın integrali (yaklaşık)
        const tt = Math.min(t, s2 + 3.4); const ang = Math.max(0, tt - (sd + 1.0)) * 4 - Math.max(0, tt - (s2 + 2.4)) * 2;
        W.wheel(c, wx, wy, r, ang);
        stroke(c, [[wx, wy], [wx + 200, wy - 270], [wx + 240, wy - 330]], { w: 7, seed: 6100 }); // çatal + gidon
        line(c, [wx + 200, wy - 330], [wx + 300, wy - 340], { w: 7, dry: false });
        line(c, [wx, wy], [wx - 260, wy - 40], { w: 7, dry: false });
        // dinamo (lastiğe değer)
        const dx = wx + 132, dy = wy - 132;
        const dyn = W.rr(dx - 18, dy - 60, 36, 70, 10); W.shape(c, dyn, W.METAL, 0.5, 6101); P.fillPts(c, circlePts(dx - 4, dy + 12, 12, 12, 14), '#5A564E');
        // far
        const on = spin;
        W.bulb(c, wx + 330, wy - 250, 1.1, on * 0.95);
        stroke(c, P.bez([dx, dy - 60], [dx + 60, dy - 150], [wx + 330, wy - 200], 20), { w: 3, color: '#3A3530', dry: false });
        if (on > 0.2) W.dots(c, [[dx, dy - 60], [dx + 60, dy - 150], [wx + 330, wy - 200]], t, on, 4);
        INK.leader(c, [dx + 120, dy + 110], [dx + 16, dy - 20], { bend: 0.2 }); W.txt(c, 'dinamo', dx + 130, dy + 140, { size: 40 });
        // zincir: hareket → elektrik → ışık
        const ck = E.se(t, s2 + 0.2, s2 + 0.8, 'out');
        W.badge(c, 'hareket', 1000, 230, ck, { size: 40, t }); W.flow(c, [1110, 230], [1230, 230], E.se(t, s2 + 0.6, s2 + 1.1), { color: W.ELEC, w: 4, head: 14 });
        W.badge(c, 'elektrik', 1360, 230, E.se(t, s2 + 1.0, s2 + 1.5, 'out'), { size: 40 }); W.flow(c, [1490, 230], [1600, 230], E.se(t, s2 + 1.4, s2 + 1.9), { color: W.SUB, w: 4, head: 14 });
        W.badge(c, 'isik', 1700, 230, E.se(t, s2 + 1.8, s2 + 2.3, 'out'), { size: 40 });
      });
      W.damla(ctx, t, { x: 700, y: 900, s: 1.1, expr: t > sd + 1.5 ? 'happy' : 'curious', look: [t > sd ? 0.8 : -0.8, -0.3], flip: t < sd, arms: [[-1, 0.35], [1, t > sh + 3 ? 2.3 : 0.4]], seed: 3 });
      W.title(ctx, t, '22 · Elektrik Nerede Üretilir? Santraller');
    }
  });

  E.scene({
    name: 'Nitelikler', concept: 'Kaynak → türbin → jeneratör → elektrik', from: 'how', to: 'feat2', trFrom: [960, 540],
    draw(ctx, t) {
      const sw = E.s('how'), sf = E.s('feat'), s2 = E.s('feat2');
      const Y = 520;
      // şehir (sağ): ışıklar yanar
      const lit = E.se(t, sf + 3.5, sf + 4.5);
      [[1560, 170, 260], [1650, 150, 330], [1740, 160, 220]].forEach(([x, w, h], i) => { const b = W.rect(x - w / 2, Y + 160 - h, x + w / 2, Y + 160); W.shape(c0(ctx), b, '#8C8578', 0.35, 6200 + i); for (let r = 0; r < Math.floor(h / 60); r++) for (let k = 0; k < 2; k++) { const win = W.rect(x - w / 2 + 20 + k * (w / 2 - 10), Y + 160 - h + 20 + r * 60, x - w / 2 + 50 + k * (w / 2 - 10), Y + 160 - h + 50 + r * 60); P.fillPts(ctx, win, lit > 0.5 && (r + k + i) % 3 ? '#FFE7A8' : '#46505C', 0.9); } });
      W.glow(ctx, 1650, Y, 260, lit * 0.5);
      W.txt(ctx, 'şehir', 1650, Y + 220, { size: 38, align: 'center', alpha: E.se(t, sw + 0.8, sw + 1.4) });
      const k1 = E.se(t, sf + 0.2, sf + 0.8, 'out');
      if (k1 > 0) E.layer(ctx, k1, c => {
        // kaynak akışı
        for (let i = 0; i < 5; i++) { const u = ((t * 0.6 + i / 5) % 1); const yy = Y - 80 + i * 40; line(c, [180 + u * 320, yy], [260 + u * 320, yy], { w: 4, color: PAL.water, alpha: 0.8 * Math.sin(u * Math.PI), dry: false, seed: 6210 + i }); }
        const src = W.rr(120, Y - 130, 170, 260, 18); W.shape(c, src, PAL.water, 0.3, 6211);
        W.txt(c, 'su', 205, Y - 40, { size: 38, align: 'center' }); W.txt(c, 'buhar', 205, Y + 10, { size: 38, align: 'center' }); W.txt(c, 'rüzgâr', 205, Y + 60, { size: 38, align: 'center' });
        W.txt(c, 'enerji kaynağı', 205, Y + 210, { size: 38, align: 'center' });
      });
      const k2 = E.se(t, sf + 1.2, sf + 1.8, 'out');
      if (k2 > 0) E.layer(ctx, k2, c => { W.turbine(c, 680, Y, 125, t * 3 * k2, { n: 8 }); W.txt(c, 'türbin', 680, Y + 210, { size: 42, align: 'center' }); W.flow(c, [330, Y], [540, Y], 1, { color: PAL.water, w: 4 }); });
      const k3 = E.se(t, sf + 2.4, sf + 3.0, 'out');
      if (k3 > 0) E.layer(ctx, k3, c => {
        line(c, [805, Y], [990, Y], { w: 10, color: '#5A564E', dry: false });
        W.generator(c, 1130, Y, 1.25, t * 3, E.se(t, sf + 3.2, sf + 3.8));
        W.txt(c, 'jeneratör', 1130, Y + 210, { size: 42, align: 'center' });
        const wp = [[1245, Y - 40], [1330, Y - 40], [1330, Y - 120], [1470, Y - 120]]; W.wire(c, wp, E.se(t, sf + 3.2, sf + 3.8)); if (lit > 0) W.dots(c, wp, t, lit, 4);
      });
      // mıknatıs ve tel sargı etiketleri
      if (t > s2) {
        INK.leader(ctx, [980, 280], [1060, Y - 50], { bend: 0.2 }); P.write(ctx, 'mıknatıs', 900, 260, E.seg(t, s2 + 0.4, s2 + 1.2), { size: 40, color: W.HEAT });
        INK.leader(ctx, [1250, 270], [1150, Y - 45], { bend: -0.2 }); P.write(ctx, 'tel sargı', 1210, 250, E.seg(t, s2 + 1.2, s2 + 2.0), { size: 40, color: '#8A5A2A' });
        E.inkText(ctx, 'birbirine göre döner → elektrik', 1130, 850, t, s2 + 2.4, 1e9, { size: 44, align: 'center', color: W.ELEC });
      }
      W.damla(ctx, t, { x: 470, y: 905, s: 0.85, expr: 'curious', look: [0.8, -0.3], arms: [[-1, 0.35], [1, 2.2]], seed: 4 });
    }
  });
  const c0 = c => c;
})();
