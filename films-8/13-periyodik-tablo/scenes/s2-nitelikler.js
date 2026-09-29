// SAHNE 2 — Nitelikleri tanımla (a): bakır, kükürt, silisyum, neon örnek kartları · anlam çözümleme tablosu ile ayrıştır (b)
(function () {
  const { PAL, stroke, line, circlePts, rng, wobble, wash } = INK;
  const U = U5;
  const CARDS = [
    { k: 'metal', beat: 'metal', ex: 'bakır (Cu)', lines: ['parlak', 'ısıyı, elektriği iletir', 'tel, levha olur'], more: ['cıva hariç katı', 'erime n. yüksek'], more2: 'metal2' },
    { k: 'ametal', beat: 'ametal', ex: 'kükürt (S)', lines: ['mat', 'ısıyı, elektriği', 'iletmez', 'kırılgan (katıysa)'], more: ['katı, sıvı ya da gaz', 'erime n. düşük'], more2: 'ametal2' },
    { k: 'yari', beat: 'yari', ex: 'silisyum (Si)', lines: ['parlak', 'ama kırılgan', 'elektriği biraz', 'iletir'] },
    { k: 'soy', beat: 'soy', ex: 'neon (Ne)', lines: ['oda koşulunda gaz', 'tek atomlu', 'renksiz'] }
  ];
  // örnek çizimleri (kart içinde, merkez x,y)
  function sample(ctx, k, x, y, t) {
    if (k === 'metal') { // bakır tel bobini + levha
      const lv = [[x - 110, y + 10], [x - 20, y - 4], [x - 10, y + 50], [x - 104, y + 62], [x - 110, y + 10]];
      P.fillPts(ctx, lv, '#C07A45'); wash(ctx, lv, '#8A4A20', 0.3, 1401, { bleed: 1, blooms: 0 }); stroke(ctx, lv, { w: 2.2, closed: true, dry: false });
      line(ctx, [x - 90, y + 16], [x - 40, y + 8], { w: 3, color: '#FBE3C8', dry: false });
      for (let i = 0; i < 6; i++) stroke(ctx, circlePts(x + 30 + i * 12, y + 26, 16, 34, 24), { w: 3.4, closed: true, dry: false, color: '#B06A35', seed: 1402 + i });
      line(ctx, [x + 96, y + 26], [x + 130, y - 20], { w: 3.4, color: '#B06A35', dry: false });
    } else if (k === 'ametal') { // sarı kükürt parçaları
      const r = rng(1410);
      for (let i = 0; i < 6; i++) { const cx = x - 90 + i * 36 + r() * 10, cy = y + 30 - (i % 2) * 26; const p = wobble(circlePts(cx, cy, 24 + r() * 10, 18 + r() * 8, 9), 5, 1411 + i); P.fillPts(ctx, p, '#E8CF4A'); wash(ctx, p, '#A88A1A', 0.25, 1420 + i, { bleed: 1, blooms: 0 }); stroke(ctx, p, { w: 2, closed: true, dry: false }); }
    } else if (k === 'yari') { // parlak gri silisyum parçası
      const p = [[x - 90, y + 50], [x - 60, y - 20], [x + 10, y - 40], [x + 80, y - 5], [x + 70, y + 55], [x - 90, y + 50]];
      P.fillPts(ctx, p, '#8E95A3'); stroke(ctx, p, { w: 2.4, closed: true, dry: false });
      P.fillPts(ctx, [[x - 60, y - 20], [x + 10, y - 40], [x - 10, y + 10]], '#C8CDD6', 0.9); P.fillPts(ctx, [[x + 10, y - 40], [x + 80, y - 5], [x + 20, y + 15]], '#B0B6C2', 0.9);
      line(ctx, [x - 40, y - 12], [x - 6, y - 26], { w: 3, color: '#FFFFFF', dry: false, alpha: 0.9 });
    } else { // neon dolu cam tüp (renksiz gaz: tanecikler)
      const tube = [[x - 130, y - 20], [x + 130, y - 20], [x + 130, y + 40], [x - 130, y + 40], [x - 130, y - 20]];
      ctx.save(); ctx.globalAlpha *= 0.12; P.fillPts(ctx, tube, PAL.white); ctx.restore(); stroke(ctx, tube, { w: 2.6, closed: true, dry: false });
      const r = rng(1430); for (let i = 0; i < 12; i++) { const px = x - 115 + ((r() * 230 + t * 40 * (r() - 0.5)) % 230 + 230) % 230, py = y - 8 + ((r() * 36 + t * 25 * (r() - 0.5)) % 36 + 36) % 36; U.ball(ctx, px, py, 7, U.CLS.soy.c); }
    }
  }
  E.scene({
    name: 'Nitelikler', concept: 'Metal, ametal, yarımetal, soy gaz özellikleri', from: 'metal', to: 'soy', trFrom: [960, 540],
    draw(ctx, t) {
      CARDS.forEach((C, i) => {
        const s0 = E.s(C.beat), k = E.se(t, s0 - 0.2, s0 + 0.5, 'out'); if (k <= 0) return;
        const cl = U.CLS[C.k], x = 90 + i * 445, y = 180, w = 410, h = 700;
        E.layer(ctx, k, c => {
          U.card(c, x, y, w, h, { seed: 1440 + i, tint: cl.c, tintA: 0.22 });
          P.fillPts(c, U.rect(x + 14, y + 14, x + w - 14, y + 76), cl.c, 0.75);
          U.txt(c, cl.name.toUpperCase(), x + w / 2, y + 62, { size: 46, align: 'center' });
          sample(c, C.k, x + w / 2, y + 170, t);
          U.txt(c, 'örnek: ' + C.ex, x + w / 2, y + 290, { size: 34, align: 'center', alpha: 0.8 });
          C.lines.forEach((l, j) => P.write(c, (/^(iletmez|iletir|ama)/.test(l) ? '   ' : '• ') + l, x + 26, y + 370 + j * 56, E.seg(t, s0 + 1.0 + j * 0.8, s0 + 1.8 + j * 0.8), { size: 38 }));
          if (C.more) { const s2 = E.s(C.more2); C.more.forEach((l, j) => P.write(c, '• ' + l, x + 26, y + 370 + (C.lines.length + j) * 56, E.seg(t, s2 + 0.5 + j * 1.2, s2 + 1.4 + j * 1.2), { size: 38, color: PAL.water })); }
        });
      });
      // Damla: bir sonraki (henüz boş) kart yerinde, büyüteçle bakar
      const cur = t < E.s('ametal') ? 0 : t < E.s('yari') ? 1 : 2;
      const dk = 1 - E.se(t, E.s('soy') - 0.4, E.s('soy') + 0.1);
      const dx = E.lerp(90 + cur * 445 + 650, 90 + cur * 445 + 650, 1);
      if (dk > 0) E.layer(ctx, dk, c => U.damla(c, t, { x: dx, y: 880, s: 1.0, view: 'q3', flip: true, expr: 'curious', look: [-0.8, 0.1], arms: [[-1, 1.5], [1, 0.4]], prop: 'lens' }));
    }
  });
  // Anlam çözümleme tablosu
  const COLS = ['parlak', 'iyi iletken', 'tel / levha', 'oda koşulunda'];
  // 1: evet, 0: hayır, 0.5: az; metin: hâl
  const ROWS = [['metal', 1, 1, 1, 'katı (cıva sıvı)'], ['ametal', 0, 0, 0, 'katı · sıvı · gaz'], ['yari', 1, 0.5, 0, 'katı'], ['soy', 0, 0, 0, 'gaz']];
  E.scene({
    name: 'Anlam çözümleme', concept: 'Özelliklere göre ayrıştırma', from: 'grid', to: 'grid', trFrom: [960, 540],
    draw(ctx, t) {
      const sg = E.s('grid');
      const X = 200, Y = 230, CW = [330, 250, 280, 280, 400], RH = 120;
      U.card(ctx, X - 40, Y - 50, CW.reduce((a, b) => a + b, 0) + 80, RH * 5 + 90, { seed: 1460 });
      let cx = X + CW[0]; COLS.forEach((c, j) => { U.txt(ctx, c, cx + CW[j + 1] / 2, Y + 70, { size: 40, align: 'center' }); cx += CW[j + 1]; });
      line(ctx, [X, Y + RH], [X + CW.reduce((a, b) => a + b, 0), Y + RH], { w: 3, dry: false });
      ROWS.forEach((r, i) => {
        const at = sg + 0.4 + i * 1.1, k = E.se(t, at, at + 0.5); if (k <= 0) return;
        const yy = Y + RH * (i + 1), cl = U.CLS[r[0]];
        ctx.save(); ctx.globalAlpha *= k; P.fillPts(ctx, U.rect(X, yy + 8, X + CW[0] - 20, yy + RH - 8), cl.c, 0.55); ctx.restore();
        U.txt(ctx, cl.name, X + 20, yy + 76, { size: 46, alpha: k });
        let cx = X + CW[0];
        for (let j = 0; j < 4; j++) {
          const v = r[j + 1], mx = cx + CW[j + 1] / 2, my = yy + RH / 2, kk = E.se(t, at + 0.3 + j * 0.15, at + 0.8 + j * 0.15);
          if (typeof v === 'string') U.txt(ctx, v, mx, yy + 76, { size: 38, align: 'center', alpha: kk });
          else if (v === 1) P.check(ctx, mx - 6, my - 6, 46, kk, { w: 6, color: PAL.life });
          else if (v === 0.5) U.txt(ctx, 'az', mx, yy + 76, { size: 42, align: 'center', alpha: kk, color: U.AMBER });
          else P.cross(ctx, mx, my, 18, kk, { w: 5 });
          cx += CW[j + 1];
        }
        line(ctx, [X, yy + RH], [X + CW.reduce((a, b) => a + b, 0), yy + RH], { w: 1.6, dry: false, alpha: 0.6 * k });
      });
    }
  });
})();
