// SAHNE 2 — Soğurma deneyi (FB.6.4.4 b: sıcaklık değişimlerini tabloya kaydetme — OB7, KB2.6)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F613;
  // örnek ölçüm (nitel eğilim doğru; sayılar temsilidir)
  const ROWS = [['0', '20', '20'], ['5', '22', '24'], ['10', '23', '27'], ['15', '24', '30']];
  const lv = c => (c - 15) / 20; // termometre dolum oranı
  E.scene({
    name: 'Deney', concept: 'Beyaz ve siyah kutu: sıcaklık ölçümü', from: 'setup', to: 'data', trFrom: [1400, 600],
    draw(ctx, t) {
      const ss = E.s('setup'), sd = E.s('data');
      // row reveal times
      const rowAt = i => sd + 0.4 + i * 1.5;
      const rowsShown = ROWS.filter((r, i) => t > rowAt(i) + 0.2).length;
      // continuous thermometer reading
      const temp = (col) => {
        if (t < rowAt(0)) return 20;
        for (let i = 1; i < ROWS.length; i++) if (t < rowAt(i)) return E.lerp(+ROWS[i - 1][col], +ROWS[i][col], E.se(t, rowAt(i) - 1.3, rowAt(i)));
        return +ROWS[3][col];
      };
      ctx.save();
      // sunny sill: warm light from upper right
      const g = ctx.createRadialGradient(1760, 150, 30, 1760, 150, 1100); g.addColorStop(0, 'rgba(227,160,58,0.35)'); g.addColorStop(1, 'rgba(227,160,58,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      P.sun(ctx, 1790, 170, 70, t, { nrays: 16, cells: false });
      // ground / sill
      const sill = [[960, 800], [1900, 796], [1900, 850], [960, 854], [960, 800]];
      P.fillPts(ctx, sill, '#D9C7A4', 0.8); stroke(ctx, sill, { w: 2.6, closed: true, seed: 21 });
      // boxes appear
      const bk = E.se(t, ss + 0.6, ss + 1.4, 'out'), bk2 = E.se(t, ss + 1.6, ss + 2.4, 'out');
      const BX = [[1100, F.OBJ.white, 'beyaz kutu', bk, 2], [1440, F.OBJ.black, 'siyah kutu', bk2, 3]];
      // sun rays onto boxes (same light for both)
      const rk = E.se(t, ss + 5.2, ss + 6.4);
      [[1190, 560], [1260, 560], [1530, 560], [1600, 560]].forEach((p, i) => F.ray(ctx, [1740 - (i < 2 ? 60 : 20) + i * 8, 250 + i * 6], p, rk, { w: 3, head: 13, seed: 30 + i }));
      BX.forEach(([x, c, name, k, sd2]) => {
        if (k <= 0) return;
        ctx.save(); ctx.translate(x + 110, 800); ctx.scale(P.pop(k), P.pop(k)); ctx.translate(-(x + 110), -800);
        F.box(ctx, x, 580, 220, 220, c, sd2);
        const th = E.se(t, ss + 3.0, ss + 4.2, 'out');
        if (th > 0) { ctx.save(); ctx.globalAlpha *= th; F.thermo(ctx, x + 150, 700, 250 * th, lv(temp(c === F.OBJ.white ? 1 : 2)), 1); ctx.restore(); }
        ctx.restore();
        INK.label(ctx, name, x + 120, 900, { size: 38, weight: 700, align: 'center', alpha: k });
      });
      // live readouts above thermometers
      if (t > sd) [[1100, 1], [1440, 2]].forEach(([x, col]) => { const ka = E.se(t, sd, sd + 0.6); ctx.save(); ctx.globalAlpha *= ka; F.card(ctx, x + 95, 378, 110, 56, { seed: 27 + col, w: 1.8 }); ctx.restore(); INK.label(ctx, Math.round(temp(col)) + ' °C', x + 150, 420, { size: 40, weight: 700, align: 'center', color: F.HEAT, alpha: ka }); });
      if (t > ss + 6) INK.label(ctx, 'aynı güneş ışığı · aynı süre', 1330, 330, { size: 34, align: 'center', alpha: 0.75 * E.se(t, ss + 6, ss + 6.8) });

      // data table (left)
      const tk = E.se(t, sd - 0.3, sd + 0.5);
      if (tk > 0) E.layer(ctx, tk, c => {
        F.card(c, 130, 200, 780, 600, { seed: 25 });
        P.write(c, 'Sıcaklık tablosu', 175, 270, E.seg(t, sd - 0.2, sd + 0.8), { size: 50 });
        const cx = [260, 520, 770], hy = 350;
        [['süre (dk)', 0], ['beyaz kutu', 1], ['siyah kutu', 2]].forEach(([h, i]) => INK.label(c, h, cx[i], hy, { size: 36, weight: 700, align: 'center' }));
        line(c, [160, hy + 22], [880, hy + 18], { w: 2.6, dry: false });
        line(c, [390, hy - 40], [392, 780], { w: 2, dry: false, alpha: 0.6 }); line(c, [650, hy - 40], [652, 780], { w: 2, dry: false, alpha: 0.6 });
        ROWS.forEach((r, i) => {
          const k = E.se(t, rowAt(i), rowAt(i) + 0.6); if (k <= 0) return;
          const y = hy + 95 + i * 95;
          P.write(c, r[0], cx[0], y, k, { size: 44, align: 'center' });
          P.write(c, r[1] + ' °C', cx[1], y, k, { size: 44, align: 'center' });
          P.write(c, r[2] + ' °C', cx[2], y, k, { size: 44, align: 'center', color: i === 3 ? F.HEAT : PAL.ink });
        });
        INK.label(c, 'örnek ölçüm', 870, 790, { size: 28, align: 'right', alpha: 0.6 });
        if (t > rowAt(3) + 1.2) { c.save(); c.globalAlpha = E.se(t, rowAt(3) + 1.2, rowAt(3) + 1.8); stroke(c, circlePts(770, hy + 95 * 4 - 14, 95, 42, 40), { w: 3, closed: true, color: F.HEAT, seed: 26 }); c.restore(); }
      });
      // Damla observing
      DAMLA.draw(ctx, {
        x: 1000, y: 905, s: 0.8, view: 'q3', expr: t > rowAt(3) + 0.8 ? 'surprised' : 'curious', look: [0.7, -0.2],
        blink: E.blink(t, 4), squash: E.breath(t), t, talk: E.talk(t), seed: 3,
        arms: t < sd ? [[-1, 0.4], [1, 2.2]] : [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: t < sd ? null : 'notebook'
      });
      ctx.restore();
    }
  });
})();
