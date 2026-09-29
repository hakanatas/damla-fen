// SAHNE 6 — Sıra sende (atık günlüğü) + veda + serinin bitiş kartı
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  E.scene({
    name: 'Veda', concept: 'Sıra sende ve 5. sınıf serisinin sonu', from: 'task', to: 'end', trFrom: [960, 540],
    draw(ctx, t) {
      const sk = E.s('task'), sb = E.s('bye'), se = E.s('end');
      const hill = P.hillLine(E.W);
      const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(46,70,110,0.22)'); g.addColorStop(0.6, 'rgba(227,150,70,0.26)'); g.addColorStop(1, 'rgba(227,150,70,0.1)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      P.sun(ctx, 1640, 720, 90, t, { cells: false, nrays: 18 });
      W7.school(ctx, 1380, P.hillY(hill, 1380) + 20, 0.9);
      P.landscape(ctx, E.W, E.H, t, { hill });
      ['mavi', 'sari', 'yesil', 'gri', 'kahve', 'siyah'].forEach((k, i) => W7.bin(ctx, k, 1040 + i * 82, P.hillY(hill, 1040 + i * 82) + 30, 0.34));
      const dx = 760, dy = P.hillY(hill, dx) + 4;
      const wave = t > sb;
      DAMLA.draw(ctx, { x: dx, y: dy, s: 1.5, view: wave ? 'front' : 'q3', expr: 'happy', look: [0.3, -0.3], blink: E.blink(t, 12), squash: E.breath(t), t, talk: E.talk(t), seed: 1, arms: wave ? [[-1, 0.4], [1, 2.4 + 0.35 * Math.sin(t * 8)]] : [[-1, 1.1], [1, 1.4]], prop: wave ? null : 'notebook' });
      // görev kartı
      const ck = Math.min(E.se(t, sk, sk + 0.7, 'out'), 1 - E.se(t, sb - 0.3, sb + 0.4));
      if (ck > 0) E.layer(ctx, ck, c => {
        const card = [[300, 150], [1620, 140], [1630, 860], [310, 872], [300, 150]];
        c.save(); c.shadowColor = 'rgba(40,30,20,0.3)'; c.shadowBlur = 30; P.fillPts(c, card, '#FAF6EC'); c.restore(); stroke(c, card, { w: 3, closed: true });
        P.write(c, 'Sıra sende!', 960, 260, E.seg(t, sk + 0.4, sk + 1.4), { size: 76, align: 'center', color: '#8A4A10' });
        P.write(c, 'Bir hafta boyunca atık günlüğü tut.', 960, 360, E.seg(t, sk + 1.2, sk + 2.6), { size: 52, align: 'center' });
        const Q = [['Önleyebilir miyim?', '#3F7A3A'], ['Azaltabilir miyim?', '#5E8F45'], ['Yeniden kullanabilir miyim?', '#7FA052']];
        Q.forEach(([q, col], i) => {
          const at = sk + 2.8 + i * 1.1, y = 470 + i * 85; if (t < at) return;
          const cp = circlePts(560, y - 14, 22, 22, 20); P.fillPts(c, cp, col, 0.7); stroke(c, cp, { w: 2, closed: true, dry: false });
          P.write(c, q, 610, y, E.seg(t, at, at + 1.0), { size: 48, color: col });
        });
        P.write(c, 'Sonra sınıfınla paylaş ve birlikte değerlendirin.', 960, 780, E.seg(t, sk + 6.4, sk + 7.8), { size: 40, align: 'center', weight: 400 });
        W7.item(c, 'kavanoz', 1400, 560, 0.9); P.icon.pencil(c, 1420, 460, 0.8, -0.8);
      });
      if (wave) {
        E.inkText(ctx, 'Merakını hiç kaybetme!', 960, 230, t, sb + 0.3, se + 0.4, { size: 70, align: 'center' });
        E.inkText(ctx, 'Görüşmek üzere!', 960, 320, t, sb + 1.4, se + 0.4, { size: 56, align: 'center', color: '#3F7A3A' });
      }
      // bitiş kartı (serinin sonu)
      const ek = E.se(t, se, se + 0.8);
      if (ek > 0) E.layer(ctx, ek, c => {
        c.fillStyle = PAL.paper; c.globalAlpha = 0.93; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
        INK.label(c, 'Damla’nın Gözlem Defteri', 960, 250, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
        INK.label(c, '27 · Atık Yönetimi ve Sıfır Atık', 960, 335, { size: 56, weight: 700, align: 'center' });
        P.drawOn(c, P.bez([600, 365], [960, 376], [1320, 360], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: PAL.life });
        INK.label(c, '5. sınıf serisinin sonu · 27 film · Teşekkürler!', 960, 440, { size: 46, weight: 700, align: 'center', color: '#3F7A3A', alpha: E.se(t, se + 0.8, se + 1.6) });
        W7.UNITS.forEach((u, i) => {
          const k = E.se(t, se + 1.2 + i * 0.25, se + 1.7 + i * 0.25, 'out'); if (k <= 0) return;
          const x = 450 + i * 170, y = 590;
          c.save(); c.translate(x, y); c.scale(0.5 * P.pop(k), 0.5 * P.pop(k)); c.translate(-x, -y); u.draw(c, x, y, t); c.restore();
        });
        INK.label(c, 'Fen Bilimleri · 5. sınıf · FB.5.7.3 · Türkiye Yüzyılı Maarif Modeli', 960, 720, { size: 32, align: 'center', alpha: 0.7 });
        INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 775, { size: 32, align: 'center', alpha: 0.7 });
        DAMLA.draw(c, { x: 960, y: 1010, s: 0.8, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
      });
    }
  });
})();
