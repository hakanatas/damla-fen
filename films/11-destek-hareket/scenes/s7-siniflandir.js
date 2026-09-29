// SAHNE 7 — Sınıflandırmayı tamamla (tanılayıcı dallanmış ağaç gibi) + İbni Sina
(function () {
  const { PAL, stroke, line, wash } = INK;
  function book(ctx, x, y, s, t) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const L = [[-300, -200], [0, -180], [0, 200], [-300, 180], [-300, -200]], R = [[0, -180], [300, -200], [300, 180], [0, 200], [0, -180]];
    [L, R].forEach((pg, i) => { P.fillPts(ctx, pg, '#F3E6C4'); wash(ctx, pg, '#C08A3A', 0.25, 40 + i, { bleed: 1.5, blooms: 2 }); stroke(ctx, pg, { w: 3, closed: true, seed: 50 + i }); });
    // left page: text lines (manuscript), right page: simple anatomy sketch
    for (let j = 0; j < 9; j++) stroke(ctx, [[-270, -140 + j * 36], [-30 - (j % 3) * 30, -140 + j * 36 + 3]], { w: 2, alpha: 0.45, dry: false, seed: 60 + j, color: '#6B4A1E' });
    for (let j = 0; j < 4; j++) stroke(ctx, [[30, 40 + j * 36], [270 - (j % 2) * 40, 42 + j * 36]], { w: 2, alpha: 0.45, dry: false, seed: 80 + j, color: '#6B4A1E' });
    const orn = INK.circlePts(150, -80, 70, 70, 40); stroke(ctx, orn, { w: 3, closed: true, color: '#8A4A10', seed: 90 });
    for (let j = 0; j < 8; j++) { const a = j / 8 * 6.283; stroke(ctx, P.bez([150, -80], [150 + Math.cos(a + 0.4) * 50, -80 + Math.sin(a + 0.4) * 50], [150 + Math.cos(a) * 66, -80 + Math.sin(a) * 66], 10), { w: 2, color: '#8A4A10', dry: false, seed: 91 + j }); }
    ctx.restore();
  }
  E.scene({
    name: 'Sınıflandır', concept: 'Sınıflandırma ve İbni Sina', from: 'classify', to: 'canon', trFrom: [960, 300],
    draw(ctx, t) {
      const F = F11, sc = E.s('classify'), si = E.s('ibnisina'), sn = E.s('canon');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      const a1 = 1 - E.se(t, si - 0.3, si + 0.4);
      if (a1 > 0) E.layer(ctx, a1, c => {
        P.notebook(c, 150, 80, 1620, 830);
        const on = id => 1;
        const seq = ['uzun', 'kisa', 'yassi', 'kulak', 'burun', 'oynar', 'yari', 'oynamaz', 'iskk', 'duz', 'kalp', 'istek', 'disi1', 'disi2'];
        const rev = { root: 1, isk: 1, kas: 1, kemik: 1, kikirdak: 1, eklem: 1 };
        seq.forEach((id, i) => { rev[id] = E.se(t, sc + 0.4 + i * 0.5, sc + 0.9 + i * 0.5); });
        F.tree(c, rev);
        const kk = E.se(t, sc + 7.8, sc + 8.6);
        if (kk > 0) { P.check(c, 1500, 830, 60, kk, { w: 9, color: '#3E5A1A' }); P.write(c, 'etiketlendi!', 1420, 860, kk, { size: 44, align: 'right', color: '#3E5A1A' }); }
      });
      if (a1 < 1) E.layer(ctx, 1 - a1, c => {
        book(c, 960, 510, 1.15, t);
        P.write(c, 'İbni Sina (980–1037)', 960, 170, E.seg(t, si + 0.5, si + 1.6), { size: 64, align: 'center', color: '#6B4A1E' });
        P.write(c, 'El-Kanun fi’t-Tıb', 960, 820, E.seg(t, si + 3, si + 4.2), { size: 56, align: 'center', font: 'Fraunces', weight: 600 });
        P.write(c, 'yüzyıllarca tıp eğitiminde kullanıldı', 960, 880, E.seg(t, sn + 0.5, sn + 1.8), { size: 40, weight: 400, align: 'center' });
      });
      DAMLA.draw(ctx, { x: 1840, y: 1045, s: 0.85, view: 'q3', flip: true, expr: 'happy', look: [-0.7, -0.4], blink: E.blink(t, 9), squash: E.breath(t), t, talk: E.talk(t), seed: 4, arms: [[-1, 0.4], [1, 2.2 + Math.sin(t * 2) * 0.06]] });
    }
  });
})();
