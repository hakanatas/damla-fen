// SAHNE 5 — Tartış (FB.8.6.9): kartopu tekniği, avantaj/dezavantaj tablosu, görüş + gerekçe, görüşleri kıyaslama, tarafsızlık
(function () {
  const { PAL, stroke, line, circlePts } = INK;
  const W = W6;
  const GREY = '#6B6460';
  const ROWS = [
    ['Hidroelektrik', 'yakıt yakmaz, yenilenebilir', 'baraj gölü doğal alanları su altında bırakır'],
    ['Termik', 'hava koşullarından bağımsız üretir', 'havayı kirletir, sera gazı salar'],
    ['Nükleer', 'az yakıtla çok enerji üretir', 'radyoaktif atık, kaza riski'],
    ['Jeotermal', 'gece gündüz sürekli üretir', 'yalnızca uygun bölgelerde kurulur'],
    ['Rüzgâr', 'yakıt yakmaz, havayı kirletmez', 'rüzgâr her zaman esmez, gürültü'],
    ['Dalga', 'yakıt yakmaz, temizdir', 'yalnızca kıyılarda, henüz az yaygın'],
    ['Güneş', 'sessiz ve temiz, çatıya kurulur', 'gece üretmez, geniş alan ister']
  ];
  function student(ctx, x, y, r, i) { const c = circlePts(x, y, r, r, 18); P.fillPts(ctx, c, ['#8FB0C4', '#D9B45A', '#B5A0C8', '#9FC48A'][i % 4], 0.9); stroke(ctx, c, { w: 2, closed: true, dry: false, seed: 6500 + i }); }
  E.scene({
    name: 'Kartopu', concept: 'Kartopu tekniğiyle tartışma', from: 'debate', to: 'debate', trFrom: [960, 540],
    draw(ctx, t) {
      const sd = E.s('debate');
      const st = [sd + 0.8, sd + 3.2, sd + 5.6];
      const labels = ['ikişer', 'dörder', 'tüm sınıf'];
      // 16 öğrenci: 8 çift → 4 grup → 1 sınıf
      const pos = (i, stage) => {
        if (stage === 0) { const p = Math.floor(i / 2), side = i % 2; return [300 + (p % 4) * 440 + side * 70, 380 + Math.floor(p / 4) * 260]; }
        if (stage === 1) { const g = Math.floor(i / 4), j = i % 4; return [420 + g * 360 + (j % 2) * 70, 400 + Math.floor(j / 2) * 70 + (g % 2) * 150]; }
        const a = i / 16 * 6.283; return [960 + Math.cos(a) * 260, 560 + Math.sin(a) * 170];
      };
      const k1 = E.se(t, st[1], st[1] + 1.4), k2 = E.se(t, st[2], st[2] + 1.4);
      for (let i = 0; i < 16; i++) {
        const a = E.se(t, st[0] - 0.4 + i * 0.03, st[0] + i * 0.03, 'out'); if (a <= 0) continue;
        const p0 = pos(i, 0), p1 = pos(i, 1), p2 = pos(i, 2);
        const p = E.mix(E.mix(p0, p1, k1), p2, k2);
        ctx.save(); ctx.globalAlpha *= a; student(ctx, p[0], p[1], 26, i); ctx.restore();
      }
      // kartopu: büyüyen top
      const bs = 40 + 40 * E.se(t, st[0], st[0] + 1) + 50 * k1 + 70 * k2;
      const bx = 960, by = 560;
      if (k2 > 0.3) { const c = INK.wobble(circlePts(bx, by, bs, bs, 40), 3, 6510); P.fillPts(ctx, c, '#FBF8F1', 0.95); INK.wash(ctx, c, PAL.water, 0.15, 6511, { bleed: 2, blooms: 1 }); stroke(ctx, c, { w: 3, closed: true, seed: 6512 }); W.txt(ctx, 'ortak görüş', bx, by + 14, { size: 40, align: 'center' }); }
      // aşama çubuğu
      labels.forEach((l, i) => { const k = E.se(t, st[i], st[i] + 0.5, 'out'); if (k <= 0) return; const x = 640 + i * 320; W.card(ctx, x - 130, 790, 260, 70, { seed: 6520 + i, tint: i === Math.round(k1 + k2) ? PAL.light : null, tintA: 0.3 }); W.txt(ctx, (i + 1) + '. ' + l, x, 838, { size: 38, align: 'center', alpha: k }); if (i > 0) W.flow(ctx, [x - 190, 825], [x - 140, 825], k, { w: 3, head: 12 }); });
      W.damla(ctx, t, { x: 1790, y: 905, s: 0.75, flip: true, expr: 'curious', look: [-0.8, -0.2], arms: [[-1, 0.35], [1, 0.4]], seed: 7 });
    }
  });
  E.scene({
    name: 'Tablo', concept: 'Avantaj ve dezavantajlar', from: 'table', to: 'table', trFrom: [960, 540], tr: 0.9,
    draw(ctx, t) {
      const s0 = E.s('table');
      const X0 = 150, X1 = 480, X2 = 1080, X3 = 1790, Y0 = 170, HH = 76, RH = 90;
      W.card(ctx, X0, Y0, X3 - X0, HH + RH * 7 + 10, { seed: 6530 });
      P.fillPts(ctx, W.rect(X0 + 4, Y0 + 2, X3 - 2, Y0 + HH), PAL.light, 0.18);
      W.txt(ctx, 'Santral', (X0 + X1) / 2, Y0 + 52, { size: 40, align: 'center' });
      W.txt(ctx, '+ Avantaj', (X1 + X2) / 2, Y0 + 52, { size: 40, align: 'center', color: W.MOVE });
      W.txt(ctx, '− Dezavantaj', (X2 + X3) / 2, Y0 + 52, { size: 40, align: 'center', color: W.HEAT });
      [X1, X2].forEach(x => line(ctx, [x, Y0 + 6], [x, Y0 + HH + RH * 7], { w: 2, dry: false }));
      line(ctx, [X0, Y0 + HH], [X3, Y0 + HH], { w: 2.4, dry: false });
      ROWS.forEach((r, i) => {
        const at = s0 + 0.8 + i * 1.9, y = Y0 + HH + RH * i;
        if (i > 0) line(ctx, [X0 + 10, y], [X3 - 10, y], { w: 1.2, dry: false, alpha: 0.4 });
        const yy = y + 58;
        P.write(ctx, r[0], X0 + 24, yy, E.seg(t, at, at + 0.5), { size: 36 });
        P.write(ctx, r[1], X1 + 22, yy, E.seg(t, at + 0.4, at + 1.1), { size: W.fit(ctx, r[1], X2 - X1 - 40, 34), color: '#2E5E5E' });
        P.write(ctx, r[2], X2 + 22, yy, E.seg(t, at + 0.9, at + 1.7), { size: W.fit(ctx, r[2], X3 - X2 - 40, 34), color: '#8A3F2C' });
      });
    }
  });
  E.scene({
    name: 'Görüşler', concept: 'Görüş, gerekçe, karşılaştırma, tarafsızlık', from: 'view', to: 'fair', trFrom: [960, 540],
    draw(ctx, t) {
      const sv = E.s('view'), s2 = E.s('view2'), sf = E.s('fair');
      // Damla ve görüş balonu
      W.damla(ctx, t, { x: 330, y: 905, s: 1.05, view: 'q3', expr: t < s2 ? 'determined' : (t < sf ? 'thinking' : 'happy'), look: [0.6, -0.4], arms: [[-1, 0.35], [1, t < s2 ? 2.4 : 0.5]], seed: 8 });
      const b1 = E.se(t, sv + 0.2, sv + 0.8, 'out');
      if (b1 > 0) E.layer(ctx, b1, c => {
        W.card(c, 150, 200, 760, 250, { seed: 6540, tint: W.MOVE, tintA: 0.1 });
        W.txt(c, 'Benim görüşüm', 190, 255, { size: 36, color: W.MOVE });
        P.write(c, 'Rüzgâr santrali iyidir,', 190, 325, E.seg(t, sv + 0.6, sv + 1.6), { size: 44 });
        P.write(c, 'çünkü yakıt yakmaz, havayı kirletmez.', 190, 395, E.seg(t, sv + 1.6, sv + 3.0), { size: 40, color: W.AMBER });
        W.txt(c, 'görüş + gerekçe', 880, 435, { size: 30, align: 'right', alpha: 0.55 * E.se(t, sv + 3, sv + 3.6) });
      });
      const b2 = E.se(t, s2 + 0.2, s2 + 0.8, 'out');
      if (b2 > 0) E.layer(ctx, b2, c => {
        W.card(c, 1010, 200, 760, 250, { seed: 6541, tint: W.HEAT, tintA: 0.1 });
        W.txt(c, 'Arkadaşımın görüşü', 1050, 255, { size: 36, color: W.HEAT });
        P.write(c, 'Ama rüzgâr her zaman esmez!', 1050, 325, E.seg(t, s2 + 0.6, s2 + 1.8), { size: 44 });
        P.write(c, 'Rüzgârsız günde üretim düşer.', 1050, 395, E.seg(t, s2 + 1.8, s2 + 3.0), { size: 40, color: W.AMBER });
        W.txt(c, 'görüş + gerekçe', 1740, 435, { size: 30, align: 'right', alpha: 0.55 * E.se(t, s2 + 3, s2 + 3.6) });
      });
      // terazi: artılar ↔ eksiler
      const tk = E.se(t, sv + 1.0, sv + 1.8);
      if (tk > 0) E.layer(ctx, tk, c => {
        const cx = 1100, cy = 560;
        const tilt = 0.18 * E.se(t, sv + 2.0, sv + 3.0) - 0.36 * E.se(t, s2 + 2.0, s2 + 3.0) + 0.18 * E.se(t, sf + 0.5, sf + 2.0);
        line(c, [cx, cy], [cx, cy + 300], { w: 6, dry: false }); P.fillPts(c, [[cx - 80, cy + 310], [cx + 80, cy + 310], [cx + 50, cy + 290], [cx - 50, cy + 290]], '#8A6A45', 0.9);
        const L = 300, lx = cx - Math.cos(tilt) * L, ly = cy + Math.sin(tilt) * L, rx = cx + Math.cos(tilt) * L, ry = cy - Math.sin(tilt) * L;
        line(c, [lx, ly], [rx, ry], { w: 6, dry: false }); INK.inkDot(c, cx, cy, 8);
        [[lx, ly, '+', W.MOVE], [rx, ry, '−', W.HEAT]].forEach(([x, y, s, col], i) => {
          line(c, [x, y], [x - 60, y + 110], { w: 2, dry: false }); line(c, [x, y], [x + 60, y + 110], { w: 2, dry: false });
          const pan = P.arc(x, y + 110, 80, 0, Math.PI, 20, 30); P.fillPts(c, pan, '#E3C170', 0.8); stroke(c, pan, { w: 2.4, dry: false, seed: 6550 + i });
          W.txt(c, s, x, y + 100, { size: 70, align: 'center', color: col });
        });
      });
      const fk = E.se(t, sf + 1.2, sf + 1.8);
      if (fk > 0) E.layer(ctx, fk, c => {
        W.card(c, 1500, 520, 330, 250, { seed: 6560, tint: PAL.light, tintA: 0.2 });
        P.write(c, '• kanıta bak', 1525, 590, E.seg(t, sf + 1.6, sf + 2.4), { size: 40 });
        P.write(c, '• tarafsız ol', 1525, 660, E.seg(t, sf + 2.4, sf + 3.2), { size: 40 });
        P.write(c, '• nazik ol', 1525, 730, E.seg(t, sf + 3.2, sf + 4.0), { size: 40 });
      });
    }
  });
})();
