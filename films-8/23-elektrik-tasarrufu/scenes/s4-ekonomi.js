// SAHNE 5 — Tasarrufun aile ve ülke ekonomisine, doğaya ve geleceğe katkısı (c)
(function () {
  const { PAL, stroke, line, circlePts, dashed } = INK;
  const W = W6, D = D23;
  const CARDS = [[80, 'Aile'], [690, 'Ülke'], [1300, 'Doğa ve gelecek']];
  E.scene({
    name: 'Ekonomi', concept: 'Aile ve ülke ekonomisine katkı', from: 'family', to: 'nature', trFrom: [960, 540],
    draw(ctx, t) {
      const ids = ['family', 'country', 'nature'];
      CARDS.forEach(([x0, head], i) => {
        const a = E.s(ids[i]); const k = E.se(t, a + 0.1, a + 0.7, 'out'); if (k <= 0) return;
        E.layer(ctx, k, c => {
          W.card(c, x0, 190, 540, 620, { seed: 7400 + i, tint: [W.SUB, W.ELEC, PAL.life][i], tintA: 0.08 });
          W.txt(c, head, x0 + 270, 255, { size: 48, align: 'center', color: W.AMBER });
          const cx = x0 + 270;
          if (i === 0) {
            const lv = 1 - 0.45 * E.se(t, a + 1.5, a + 3.0);
            D.bill(c, x0 + 40, 300, 1.0, lv);
            P.write(c, 'fatura azalır', x0 + 170, 650, E.seg(t, a + 2.2, a + 3.2), { size: 38, align: 'center' });
            for (let j = 0; j < 3; j++) { const u = E.se(t, a + 3.2 + j * 0.4, a + 4.2 + j * 0.4); if (u <= 0) continue; W.coin(c, E.lerp(x0 + 180, x0 + 420, u), E.lerp(560, 420, u) - Math.sin(u * Math.PI) * 60, 26); }
            if (t > a + 3.8) { P.icon.books(c, x0 + 420, 520, 0.55); P.write(c, 'başka ihtiyaçlara', x0 + 390, 720, E.seg(t, a + 4.2, a + 5.2), { size: 34, align: 'center', color: PAL.life }); }
          }
          if (i === 1) {
            const pts = []; const bx = [[x0 + 150, 330], [x0 + 500, 330], [x0 + 500, 700], [x0 + 150, 700], [x0 + 150, 330]];
            for (let s = 0; s < 4; s++) for (let j = 0; j < 50; j++) pts.push([bx[s][0] + (bx[s + 1][0] - bx[s][0]) * j / 50, bx[s][1] + (bx[s + 1][1] - bx[s][1]) * j / 50]);
            dashed(c, pts, { w: 2.4, color: W.ELEC, on: 12, off: 8 });
            W.txt(c, 'ülkemiz', x0 + 325, 370, { size: 34, align: 'center', color: W.ELEC });
            [[x0 + 260, 560, 0.8], [x0 + 400, 600, 0.7], [x0 + 330, 470, 0.6]].forEach(([x, y, s], j) => D.houseMini(c, x, y, s, true));
            // dışarıdan gelen kaynak
            const fk = E.se(t, a + 1.0, a + 2.0);
            W.flow(c, [x0 + 30, 520], [x0 + 190, 520], fk, { w: 14 - 7 * E.se(t, a + 4.0, a + 5.0), color: '#5A5550', head: 22 });
            W.txt(c, 'dışarıdan', x0 + 90, 470, { size: 30, align: 'center', alpha: fk });
            W.txt(c, 'alınan kaynak', x0 + 100, 590, { size: 30, align: 'center', alpha: fk });
            P.write(c, 'tasarruf → daha az dışa bağımlılık', cx, 770, E.seg(t, a + 4.0, a + 5.4), { size: W.fit(c, 'tasarruf → daha az dışa bağımlılık', 500, 34), align: 'center', color: PAL.life });
          }
          if (i === 2) {
            const smoke = 1 - 0.8 * E.se(t, a + 1.5, a + 3.0);
            W.ground(c, x0 + 4, x0 + 536, 640, 160, PAL.life, 7410);
            W.stack(c, x0 + 150, 640, 0.9, t, smoke);
            D.plant(c, x0 + 380, 640, 0.8, t);
            P.write(c, 'daha az yakıt, daha temiz hava', cx, 700, E.seg(t, a + 2.0, a + 3.2), { size: W.fit(c, 'daha az yakıt, daha temiz hava', 500, 34), align: 'center' });
            P.write(c, 'gelecek nesillere kaynak', cx, 760, E.seg(t, a + 3.6, a + 4.8), { size: 34, align: 'center', color: PAL.life });
          }
        });
      });
      W.damla(ctx, t, { x: 960, y: 905, s: 0.55, view: 'front', expr: 'happy', look: [0, -0.3], arms: [[-1, 0.4], [1, 2.3]], seed: 7 });
    }
  });
})();
