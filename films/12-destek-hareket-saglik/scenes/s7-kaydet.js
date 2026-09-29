// SAHNE 7 — Kaydet (ç), "Hastalığınızdan önce sağlığınızın kıymetini bilin.", Sıra sende (poster), sonraki film
(function () {
  const { PAL, stroke, line, circlePts, wash } = INK;
  const ITEMS = ['Yeterli ve dengeli beslen.', 'Düzenli spor yap, hareket et.', 'Ekrana mola ver, dik otur.', 'Kask, dizlik, dirseklik kullan.', 'Kırık şüphesinde yetişkine haber ver.'];
  function record(ctx, t) {
    const F = F12, sr = E.s('record'), sq = E.s('quote'), st = E.s('task');
    ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
    P.notebook(ctx, 150, 60, 1620, 850);
    const la = 1 - E.se(t, sq - 0.2, sq + 0.6);
    if (la > 0) E.layer(ctx, la, c => {
      P.write(c, 'Gözlem Defteri · Sağlıklı Destek ve Hareket', 290, 170, E.seg(t, sr + 0.2, sr + 1.4), { size: 54 });
      ITEMS.forEach((txt, i) => {
        const at = sr + 1 + i * 0.9, y = 290 + i * 95;
        const box = [[300, y - 40], [346, y - 42], [348, y + 4], [302, y + 6], [300, y - 40]];
        if (t > at - 0.3) stroke(c, box, { w: 2.4, closed: true, seed: 90 + i });
        P.check(c, 322, y - 20, 42, E.se(t, at + 0.6, at + 1), { w: 6 });
        P.write(c, txt, 375, y, E.seg(t, at, at + 1), { size: 44 });
      });
      const ke = E.se(t, sr + 4.6, sr + 5.4, 'out');
      if (ke > 0) { c.save(); c.globalAlpha *= ke; F.kid(c, 1460, 800, 1.05, { run: true, phase: t * 5, helmet: true, pads: true, skates: true, t }); c.restore(); P.write(c, 'Ege iyileşti!', 1460, 330, ke, { size: 48, align: 'center', color: '#3E5A1A' }); }
    });
    const qk = Math.min(E.se(t, sq, sq + 0.8), 1 - E.se(t, st - 0.2, st + 0.6));
    if (qk > 0) E.layer(ctx, qk, c => {
      P.write(c, '“Hastalığınızdan önce', 960, 400, E.seg(t, sq + 0.4, sq + 1.8), { size: 76, align: 'center', font: 'Fraunces', weight: 600 });
      P.write(c, 'sağlığınızın kıymetini bilin.”', 960, 500, E.seg(t, sq + 1.6, sq + 3.2), { size: 76, align: 'center', font: 'Fraunces', weight: 600 });
      P.drawOn(c, P.bez([560, 540], [960, 556], [1360, 536], 30), E.se(t, sq + 3.2, sq + 4), { w: 3, color: PAL.light });
      P.write(c, 'Sağlığımız çok değerli!', 960, 640, E.seg(t, sq + 3.6, sq + 4.8), { size: 48, align: 'center', color: '#3E5A1A' });
    });
    const tk = E.se(t, st, st + 0.8, 'out');
    if (tk > 0) E.layer(ctx, tk, c => {
      P.write(c, 'Sıra sende!', 640, 260, E.seg(t, st + 0.4, st + 1.4), { size: 84, align: 'center', color: '#8A4A10' });
      P.write(c, 'Bir poster ya da afiş hazırla.', 640, 360, E.seg(t, st + 1.2, st + 2.6), { size: 48, align: 'center' });
      P.write(c, 'Bir uzmanla röportaj yapabilirsin.', 640, 430, E.seg(t, st + 3.2, st + 4.6), { size: 44, align: 'center', weight: 400 });
      P.write(c, 'Kaynaklarını posterine yazmayı unutma!', 640, 520, E.seg(t, st + 5, st + 6.4), { size: 38, align: 'center', weight: 400, color: '#6B4A1E' });
      // poster mockup
      const pk = E.se(t, st + 1.6, st + 2.4, 'out');
      c.save(); c.translate(1380, 520); c.rotate(0.04); c.scale(P.pop(pk), P.pop(pk));
      const ps = [[-230, -300], [230, -300], [230, 300], [-230, 300], [-230, -300]]; P.fillPts(c, ps, '#FFFDF6'); stroke(c, ps, { w: 3, closed: true, seed: 5 });
      c.font = '700 40px Kalam'; c.textAlign = 'center'; c.fillStyle = '#3E5A1A'; c.fillText('Sağlıklı Kemikler,', 0, -230); c.fillText('Güçlü Kaslar', 0, -180);
      F.food(c, 'milk', -130, -60, 0.8); F.food(c, 'greens', -30, -60, 0.8); F12.ball(c, 90, -60, 36, 0);
      F.bag(c, -100, 110, 0.7, true); F.sitter(c, 110, 190, 0.5, true, 0);
      c.font = '400 26px Kalam'; c.fillStyle = PAL.ink; c.fillText('Kaynaklar: ...', 0, 270);
      c.restore();
    });
    DAMLA.draw(ctx, { x: 1840, y: 1045, s: 0.85, view: 'q3', flip: true, expr: t > sq ? 'happy' : 'neutral', look: [-0.7, -0.3], blink: E.blink(t, 11), squash: E.breath(t), t, talk: E.talk(t), seed: 5, prop: t > sq ? null : 'notebook', arms: t > sq ? [[-1, 0.4], [1, 2.3 + 0.2 * Math.sin(t * 5)]] : [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]] });
  }
  function next(ctx, t) {
    const sn = E.s('next'), hill = P.hillLine(E.W);
    P.landscape(ctx, E.W, E.H, t, { hill });
    const dx = 820, dy = P.hillY(hill, dx) + 4;
    // a lamp with straight rays (next film: light)
    const k = E.se(t, sn + 1.8, sn + 2.8);
    if (k > 0) {
      const lx = 1420, ly = 520;
      ctx.save(); ctx.globalAlpha *= k;
      for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283; P.arrow(ctx, [lx + Math.cos(a) * 70, ly + Math.sin(a) * 70], [lx + Math.cos(a) * (70 + 170 * k), ly + Math.sin(a) * (70 + 170 * k)], 1, { w: 3, color: '#C07F1E', head: 12 }); }
      const bulb = circlePts(lx, ly, 50, 50, 30); P.fillPts(ctx, bulb, '#F6D9A0'); wash(ctx, bulb, PAL.light, 0.6, 3); stroke(ctx, bulb, { w: 3, closed: true });
      ctx.restore();
    }
    DAMLA.draw(ctx, { x: dx, y: dy, s: 1.4, view: 'q3', expr: 'happy', look: [0.6, -0.5], blink: E.blink(t, 12), squash: E.breath(t), t, talk: E.talk(t), seed: 1, arms: [[-1, 0.35], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    E.inkText(ctx, 'Sıradaki gözlem:', 960, 200, t, sn + 0.5, E.e('next') + 1, { size: 50, align: 'center', weight: 400 });
    E.inkText(ctx, 'Işığın Yolculuğu', 960, 285, t, sn + 1.1, E.e('next') + 1, { size: 76, align: 'center' });
    F12.endCard(ctx, t, 12, 'Destek ve Hareket Sistemimizin Sağlığı', 'FB.5.3.4');
  }
  E.scene({ name: 'Kaydet', concept: 'Kaydetme, sağlığın kıymeti, poster görevi', from: 'record', to: 'task', trFrom: [960, 540], draw: record });
  E.scene({ name: 'Sıradaki', concept: 'Işığın yolculuğu', from: 'next', to: 'end', trFrom: [820, 700], draw: next });
})();
