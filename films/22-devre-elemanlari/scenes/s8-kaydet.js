// SAHNE 8 — Kaydet (afiş) + Sıra sende (kart eşleştirme oyunu, afiş) · SAHNE 9 — Sıradaki film + bitiş
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  function bg(ctx) { ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H); }
  const ROWS = [
    ['pil', 'pil', 'uzun çizgi (+), kısa çizgi (−)'],
    ['ampul', 'ampul', 'daire içinde çarpı'],
    ['anahtar', 'anahtar', 'açık ya da kapalı'],
    ['bağlantı kablosu', 'kablo', 'düz çizgi, dik köşe']
  ];
  E.scene({
    name: 'Kaydet', concept: 'Eleman–sembol afişi; sıra sende', from: 'record', to: 'yourturn', trFrom: [960, 540],
    draw(ctx, t) {
      const sr = E.s('record'), sy = E.s('yourturn');
      ctx.save(); bg(ctx);
      P.notebook(ctx, 150, 60, 1620, 900);
      P.write(ctx, 'Gözlem Defteri · Devrenin Ortak Dili', 290, 170, E.seg(t, sr + 0.3, sr + 1.6), { size: 60 });
      if (t > sr + 1.6) P.drawOn(ctx, P.bez([286, 192], [700, 204], [1180, 188], 30), E.se(t, sr + 1.6, sr + 2.1), { w: 3, color: PAL.light });
      // tablo
      const kt = E.se(t, sr + 1.4, sr + 2.2);
      if (kt > 0) {
        ctx.save(); ctx.globalAlpha = kt;
        INK.label(ctx, 'eleman', 300, 260, { size: 34, weight: 700, alpha: 0.6 }); INK.label(ctx, 'sembol', 740, 260, { size: 34, weight: 700, alpha: 0.6 }); INK.label(ctx, 'özelliği', 1000, 260, { size: 34, weight: 700, alpha: 0.6 });
        line(ctx, [290, 282], [1520, 280], { w: 2, dry: false, alpha: 0.6 });
        ctx.restore();
      }
      ROWS.forEach(([name, sym, note], i) => {
        const at = sr + 2.0 + i * 1.3, y = 350 + i * 105, k = E.se(t, at, at + 0.5); if (k <= 0) return;
        P.write(ctx, name, 300, y + 14, E.seg(t, at, at + 0.8), { size: 44 });
        if (sym === 'anahtar') { CK.sym(ctx, 'anahtar', 720, y, 0.8, { k: E.seg(t, at + 0.2, at + 1.0), closed: 0 }); CK.sym(ctx, 'anahtar', 860, y, 0.8, { k: E.seg(t, at + 0.2, at + 1.0), closed: 1 }); }
        else CK.sym(ctx, sym, 790, y, sym === 'kablo' ? 1.5 : 1, { k: E.seg(t, at + 0.2, at + 1.0) });
        P.write(ctx, note, 1000, y + 12, E.seg(t, at + 0.5, at + 1.3), { size: 38, weight: 400 });
        if (i < 3) line(ctx, [290, y + 52], [1520, y + 50], { w: 1.2, dry: false, alpha: 0.3 * k });
      });
      const kn = sr + 2.0 + 4 * 1.3;
      P.write(ctx, 'Sembolü olmayanlar: duy, pil yatağı', 300, 800, E.seg(t, kn, kn + 1.4), { size: 44, color: '#8A4A10' });
      // Damla yazıyor
      DAMLA.draw(ctx, {
        x: 1650, y: 1030, s: 1.05, view: 'q3', flip: true, expr: 'neutral', look: [-0.7, 0.3], blink: E.blink(t, 11), squash: E.breath(t), t, talk: E.talk(t), seed: 5,
        arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook'
      });
      // Sıra sende kartı
      const rk = E.se(t, sy, sy + 0.7, 'out');
      if (rk > 0) E.layer(ctx, rk, c => {
        c.fillStyle = 'rgba(241,234,219,0.6)'; c.fillRect(0, 0, E.W, E.H);
        CK.card(c, 330, 170, 1260, 620, { seed: 400 });
        P.write(c, 'Sıra sende!', 420, 280, E.seg(t, sy + 0.4, sy + 1.4), { size: 76, color: '#8A4A10' });
        const tasks = [
          ['Eleman ve sembol kartları hazırla.', sy + 1.2],
          ['Arkadaşınla eşleştirme oyunu oyna.', sy + 3.4],
          ['Elemanlar ve sembollerle bir afiş yap.', sy + 5.6]
        ];
        tasks.forEach(([txt, at], i) => {
          const y = 410 + i * 140, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
          c.save(); c.translate(470, y - 16); c.scale(P.pop(k), P.pop(k));
          if (i === 0) { CK.symCard(c, 'ampul', -20, 0, 0.5, { flip: 1, shadow: false }); CK.symCard(c, null, 30, 14, 0.5, { flip: 0, shadow: false }); }
          else if (i === 1) { CK.symCard(c, 'pil', -24, 0, 0.5, { flip: 1, shadow: false }); P.check(c, 40, 0, 40, 1, { w: 6, color: PAL.life }); }
          else { CK.card(c, -55, -60, 110, 110, { shadow: false, seed: 410 }); CK.sym(c, 'pil', -20, -25, 0.4); CK.sym(c, 'ampul', 22, 10, 0.45); line(c, [-40, 36], [40, 36], { w: 2, dry: false, alpha: 0.6 }); }
          c.restore();
          INK.label(c, String(i + 1) + '.', 590, y, { size: 44, weight: 700, alpha: k });
          P.write(c, txt, 640, y, E.seg(t, at + 0.2, at + 1.4), { size: 46 });
        });
      });
      ctx.restore();
    }
  });

  E.scene({
    name: 'Sıradaki', concept: 'Sonraki film: şemadan devreye deney', from: 'next', to: 'end', trFrom: [960, 540],
    draw(ctx, t) {
      const sn = E.s('next');
      ctx.save();
      CK.table(ctx, 820);
      // şema kartı → gerçek devre
      ctx.save(); ctx.translate(560, 420); ctx.rotate(-0.03);
      CK.card(ctx, -240, -170, 480, 330, { seed: 500 });
      CK.loop(ctx, { x0: -170, y0: -110, x1: 170, y1: 110 }, [
        { type: 'pil', side: 'left', f: 0.5 }, { type: 'anahtar', side: 'bottom', f: 0.5, closed: 1 }, { type: 'ampul', side: 'right', f: 0.5 }
      ], { k: E.seg(t, sn + 0.4, sn + 2.4), s: 0.8 });
      ctx.restore();
      const ka = E.se(t, sn + 2.2, sn + 3.0);
      if (ka > 0) P.arrow(ctx, [830, 440], [1010, 520], ka, { w: 4, bend: 40, head: 18 });
      const kc = E.se(t, sn + 2.6, sn + 3.4);
      if (kc > 0) E.layer(ctx, kc, c => CK.realCircuit(c, 1400, 800, 1.0, 1, E.se(t, sn + 3.6, sn + 4.2) * 0.9, t));
      DAMLA.draw(ctx, { x: 880, y: 822, s: 1.2, view: 'front', expr: 'happy', look: [0.5, -0.2], blink: E.blink(t, 12), squash: E.breath(t), t, talk: E.talk(t), seed: 1, arms: [[-1, 0.35], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
      ctx.restore();
      E.inkText(ctx, 'Sıradaki gözlem:', 1180, 150, t, sn + 0.8, E.s('end') + 0.5, { size: 46, align: 'center', weight: 400 });
      E.inkText(ctx, '23 · Şemadan Devreye: Deney Zamanı', 1180, 228, t, sn + 1.4, E.s('end') + 0.5, { size: 60, align: 'center' });
      CK.endCard(ctx, t, 22, 'Devrenin Ortak Dili: Semboller', 'FB.5.6.1');
    }
  });
})();
