// SAHNE 2 — Problemleri yapılandırma (FB.7.1.3 a): çarpışma, zincirleme çarpışma, düşen parçalar, gözlemlere etkisi → kavram haritası
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = U7;
  function burst(c, x, y, r, k) { if (k <= 0) return; const pts = []; for (let i = 0; i <= 16; i++) { const a = i / 16 * 6.283; const q = r * (i % 2 ? 0.45 : 1) * k; pts.push([x + Math.cos(a) * q, y + Math.sin(a) * q]); } P.fillPts(c, pts, '#F6D58A', 0.95); stroke(c, pts, { w: 2.4, closed: true, color: F.AMBER_D, dry: false }); }
  function panel(ctx, t, a, b, fn) { const k = Math.min(E.se(t, a, a + 0.6, 'out'), 1 - E.se(t, b - 0.4, b)); if (k > 0) E.layer(ctx, k, c => { F.card(c, 1000, 170, 860, 700, { seed: 420 }); fn(c); }); }
  E.scene({
    name: 'Yapılandır', concept: 'Problemleri yapılandırma', from: 'debris', to: 'map', trFrom: [700, 560],
    draw(ctx, t) {
      const sd = E.s('debris'), s1 = E.s('p1'), s2 = E.s('p2'), s3 = E.s('p3'), s4 = E.s('p4'), sm = E.s('map');
      const bgk = 1 - E.se(t, sm - 0.3, sm + 0.5);
      if (bgk > 0) E.layer(ctx, bgk, c => {
        F.night(c, 1); F.stars(c, t, 1, { n: 80, seed: 82, area: [0, 150, E.W, E.H] });
        const ex = E.lerp(960, 520, E.se(t, s1 - 0.4, s1 + 0.6));
        P.earth(c, ex, 560, 190);
        F.debrisField(c, ex, 560, 190, t, 70, 9, E.se(t, sd + 0.3, sd + 3), { spread: 0.9, size: 7 });
        const lk = (a) => E.se(t, sd + a, sd + a + 0.6) * (1 - E.se(t, s1 - 0.5, s1));
        F.deadSat(c, ex + 330, 330, 0.45, t, 0.3); F.rocket(c, ex - 360, 420, 0.3, t, { rot: 1.2 });
        INK.label(c, 'görevi biten uydu', ex + 330, 250, { size: 36, weight: 700, color: '#FBF3DC', align: 'center', alpha: lk(1.2) });
        INK.label(c, 'roket parçası', ex - 380, 300, { size: 36, weight: 700, color: '#FBF3DC', align: 'center', alpha: lk(3) });
        INK.label(c, 'kopan küçük parçalar', ex + 60, 840, { size: 36, weight: 700, color: '#FBF3DC', align: 'center', alpha: lk(5) });
        INK.label(c, '(çizim ölçekli değildir)', 60, 900, { size: 26, color: '#FBF3DC', alpha: 0.7 });
      });
      // p1: çarpışma
      panel(ctx, t, s1 + 0.2, s2 + 0.2, c => {
        INK.label(c, 'Problem 1: çarpışma', 1040, 240, { size: 44, weight: 700, color: F.AMBER_D });
        const hk = E.se(t, s1 + 1.5, s1 + 4.5, 'in');
        F.satellite(c, 1560, 520, 0.9, t);
        const hx = E.lerp(1080, 1500, hk), hy = E.lerp(760, 540, hk);
        if (hk < 1) { for (let i = 1; i < 8; i++) line(c, [hx - i * 18, hy + i * 9.4], [hx - i * 18 - 10, hy + i * 9.4 + 5], { w: 2, alpha: 0.5 - i * 0.05, dry: false }); F.shard(c, hx, hy, 12, 7); }
        burst(c, 1500, 540, 70, E.se(t, s1 + 4.5, s1 + 5.2, 'out'));
        INK.label(c, 'mermiden kat kat hızlı!', 1120, 830, { size: 40, weight: 700, alpha: E.se(t, s1 + 2.5, s1 + 3.2) });
      });
      // p2: zincirleme
      panel(ctx, t, s2 + 0.2, s3 + 0.2, c => {
        INK.label(c, 'zincirleme çarpışma', 1040, 240, { size: 44, weight: 700, color: F.AMBER_D });
        const lv = [[[1150, 540]], [[1400, 380], [1400, 540], [1400, 700]], [[1680, 300], [1680, 380], [1680, 460], [1680, 540], [1680, 620], [1680, 700], [1680, 780]]];
        lv.forEach((L, i) => { const k = E.se(t, s2 + 0.8 + i * 2.2, s2 + 1.6 + i * 2.2, 'out'); if (k <= 0) return;
          L.forEach(([x, y], j) => { if (i > 0) { const px = lv[i - 1][Math.min(lv[i - 1].length - 1, Math.floor(j / (L.length / lv[i - 1].length)))]; c.save(); c.globalAlpha = k; P.arrow(c, [px[0] + 30, px[1]], [x - 30, y], k, { w: 2.4, head: 10 }); c.restore(); }
            if (i < 2) burst(c, x, y, 26, k); else F.shard(c, x, y, 12 * k, 30 + j); }); });
        INK.label(c, 'parçalar çoğalır', 1420, 850, { size: 38, weight: 700, align: 'center', alpha: E.se(t, s2 + 5.5, s2 + 6.2) });
      });
      // p3: atmosfere giriş
      panel(ctx, t, s3 + 0.2, s4 + 0.2, c => {
        INK.label(c, 'Problem 2: düşen parçalar', 1040, 240, { size: 44, weight: 700, color: F.AMBER_D });
        c.save(); c.globalAlpha = 0.5; P.fillPts(c, [[1004, 560], [1856, 560], [1856, 820], [1004, 820]], '#9CC3D8', 1); c.restore();
        INK.label(c, 'atmosfer', 1830, 600, { size: 32, weight: 700, align: 'right' });
        stroke(c, [[1004, 820], [1856, 820]], { w: 3, seed: 430 });
        INK.label(c, 'yeryüzü', 1830, 860, { size: 32, weight: 700, align: 'right' });
        [[1150, 0.55, 10, false], [1350, 0.7, 12, false], [1560, 1.0, 22, true]].forEach(([x0, depth, r, big], i) => {
          const k = E.se(t, s3 + 0.8 + i * 0.6, s3 + 5.5 + i * 0.6); const x = x0 + k * 120, yEnd = 320 + depth * 480, y = E.lerp(320, yEnd, k);
          const fire = y > 560 ? E.clamp((y - 560) / 80) : 0;
          if (fire > 0) { const fl = [[x - r * 0.8, y - r * 0.5], [x - 70 - r * 2, y - 150 - r * 2], [x + r * 0.2, y - r]]; P.fillPts(c, fl, PAL.light, 0.75 * fire); }
          if (!big && k > 0.95) { INK.label(c, 'yandı', x, y - 20, { size: 30, weight: 700, align: 'center', color: F.AMBER_D }); return; }
          F.shard(c, x, y, r, 40 + i);
        });
        INK.label(c, 'çoğu yanıp yok olur', 1250, 400, { size: 36, weight: 700, align: 'center', alpha: E.se(t, s3 + 6, s3 + 6.8) });
        INK.label(c, 'büyük parça: nadiren yere düşer', 1420, 780, { size: 34, weight: 700, align: 'center', color: F.RED, alpha: E.se(t, s3 + 7, s3 + 7.8) });
      });
      // p4: uydu izleri
      panel(ctx, t, s4 + 0.2, sm + 0.2, c => {
        INK.label(c, 'Problem 3: gözlemlere etkisi', 1040, 240, { size: 44, weight: 700, color: F.AMBER_D });
        const fr = [[1100, 300], [1760, 300], [1760, 760], [1100, 760], [1100, 300]];
        P.fillPts(c, fr, '#232A45', 1); stroke(c, fr, { w: 3, closed: true, seed: 440 });
        c.save(); c.beginPath(); c.rect(1100, 300, 660, 460); c.clip();
        F.stars(c, t, 1, { n: 70, seed: 83, area: [1100, 300, 1760, 760] });
        F.galaxy(c, 1300, 450, 70, 0, { seed: 8, n: 160 });
        [0, 1, 2, 3].forEach(i => { const k = E.se(t, s4 + 1.5 + i * 0.7, s4 + 2.5 + i * 0.7); line(c, [1080, 330 + i * 110], [E.lerp(1080, 1800, k), 330 + i * 110 + E.lerp(0, 300, k)], { w: 3, color: '#FFF6DE', alpha: 0.85, dry: false }); });
        c.restore();
        INK.label(c, 'gökyüzü fotoğrafında uydu izleri', 1430, 820, { size: 36, weight: 700, align: 'center', alpha: E.se(t, s4 + 4, s4 + 4.8) });
      });
      // kavram haritası
      if (t > sm - 0.3) {
        const node = (c, x, y, w, h, txt, k, col, seed) => { if (k <= 0) return; c.save(); c.globalAlpha = k; F.card(c, x - w / 2, y - h / 2, w, h, { seed, fill: col }); c.restore();
          txt.forEach((ln, i) => INK.label(c, ln, x, y + 12 + (i - (txt.length - 1) / 2) * 40, { size: 34, weight: 700, align: 'center', alpha: k })); };
        const k0 = E.se(t, sm + 0.2, sm + 0.9);
        INK.label(ctx, 'NEDEN', 250, 270, { size: 34, weight: 700, color: F.AMBER_D, alpha: k0, align: 'center' });
        INK.label(ctx, 'PROBLEM', 960, 270, { size: 34, weight: 700, color: F.AMBER_D, alpha: k0, align: 'center' });
        INK.label(ctx, 'SONUÇ', 1640, 270, { size: 34, weight: 700, color: F.AMBER_D, alpha: k0, align: 'center' });
        node(ctx, 250, 560, 380, 250, ['görevi biten uydular,', 'roket parçaları,', 'kopan parçalar'], k0, '#F6E7B8', 450);
        const P3 = [['çarpışma riski'], ['düşen parçalar'], ['uydu izleri']], R3 = [['çalışan uydular', 'zarar görür'], ['nadiren yere', 'düşme riski'], ['bilimsel gözlem', 'zorlaşır']];
        P3.forEach((p, i) => { const y = 380 + i * 190, k = E.se(t, sm + 1.0 + i * 0.8, sm + 1.6 + i * 0.8), k2 = E.se(t, sm + 3.4 + i * 0.8, sm + 4.0 + i * 0.8);
          ctx.save(); ctx.globalAlpha = k; P.arrow(ctx, [450, 560], [740, y], k, { w: 2.6, head: 12 }); ctx.restore(); node(ctx, 960, y, 420, 110, p, k, '#FAF6EC', 451 + i);
          ctx.save(); ctx.globalAlpha = k2; P.arrow(ctx, [1180, y], [1400, y], k2, { w: 2.6, head: 12 }); ctx.restore(); node(ctx, 1640, y, 440, 130, R3[i], k2, '#E4ECE0', 455 + i); });
      }
    }
  });
})();
