// SAHNE 1–3 — Giriş ve deney sorusu · şema çizimi (sembollerle) · grup çalışması ve görev dağılımı
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  function bg(ctx) { ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H); }

  // ---------------- SAHNE 1 ----------------
  E.scene({
    name: 'Giriş', concept: 'Deney sorusu', from: 'title', to: 'question',
    draw(ctx, t) {
      const sh = E.s('hello'), sp = E.s('plan'), sq = E.s('question');
      ctx.save();
      E.cam(ctx, { x: 960, y: 540, z: 1 + 0.02 * E.se(t, 0, E.e('question'), 'sine') });
      CK.table(ctx, 820);
      // masada malzemeler (henüz kurulmamış)
      CK.holder(ctx, 1080, 760, 0.8);
      CK.switch(ctx, 1380, 800, 0.8, 0);
      const so = CK.socket(ctx, 1640, 800, 0.8); CK.bulb(ctx, so.top[0], so.top[1] + 5, 0.8, 0);
      CK.cable(ctx, 1260, 690, 0.6); CK.cable(ctx, 1520, 670, 0.6, '#3A3842');
      const o = { x: 420, y: 822, s: 1.35, view: 'front', expr: 'happy', look: [0.3, -0.1], blink: E.blink(t, 2), squash: E.breath(t), t, talk: E.talk(t), seed: 1, arms: [[-1, 0.35], [1, 0.4]] };
      if (t > sh && t < sp) o.arms = [[-1, 0.35], [1, 2.4 + 0.3 * Math.sin(t * 8)]];
      if (t >= sp && t < sq) { o.view = 'q3'; o.arms = [[-1, 0.4], [1, 2.0 + 0.1 * Math.sin(t * 2)]]; o.look = [0.8, -0.4]; o.expr = 'determined'; }
      if (t >= sq) { o.view = 'q3'; o.expr = 'thinking'; o.arms = [[-1, 0.4], [1, [30, -86]]]; o.look = [0.6, -0.7]; }
      DAMLA.draw(ctx, o);
      // plan kartı
      const kp = Math.min(E.se(t, sp + 0.3, sp + 1.0, 'out'), 1 - E.se(t, sq - 0.1, sq + 0.4));
      if (kp > 0) E.layer(ctx, kp, c => {
        CK.card(c, 700, 170, 1000, 420, { seed: 40 });
        P.write(c, 'Planım', 750, 250, E.seg(t, sp + 0.6, sp + 1.4), { size: 56 });
        const steps = ['Şema çiz', 'Düzenek kur', 'Gözle, kaydet', 'Raporla'];
        steps.forEach((s, i) => {
          const at = sp + 1.2 + i * 1.3, k = E.se(t, at, at + 0.5, 'out'); if (k <= 0) return;
          const x = 800 + i * 230, y = 420;
          const cp = INK.wobble(circlePts(x, y, 95 * P.pop(k), 95 * P.pop(k), 40), 2, 50 + i);
          P.fillPts(c, cp, i === 0 ? '#F6E7B8' : PAL.white); stroke(c, cp, { w: 3, closed: true, seed: 60 + i });
          const [a, b] = s.split(' '); c.save(); c.font = '700 32px Kalam'; c.textAlign = 'center'; c.fillStyle = PAL.ink; c.globalAlpha = k;
          if (b) { c.fillText(a, x, y - 4); c.fillText(b, x, y + 32); } else c.fillText(a, x, y + 12); c.restore();
          INK.label(c, String(i + 1), x, y - 62, { size: 30, align: 'center', weight: 700, alpha: 0.5 * k });
          if (i > 0) P.arrow(c, [x - 230 + 98, y], [x - 98, y], E.se(t, at - 0.2, at + 0.2), { w: 3, head: 11 });
        });
      });
      // deney sorusu kartı
      const kq = E.se(t, sq + 0.2, sq + 0.9, 'out');
      if (kq > 0) {
        ctx.save(); ctx.translate(1200, 380); ctx.rotate(-0.02); ctx.scale(P.pop(kq), P.pop(kq));
        CK.card(ctx, -500, -210, 1000, 400, { fill: '#F6E7B8', seed: 70 });
        INK.label(ctx, 'Deney sorum:', -450, -140, { size: 40, weight: 700, alpha: 0.7 });
        P.write(ctx, 'Anahtar açıkken ve kapalıyken', -450, -60, E.seg(t, sq + 0.8, sq + 2.2), { size: 54 });
        P.write(ctx, 'ampul ışık verir mi?', -450, 10, E.seg(t, sq + 1.8, sq + 3.0), { size: 54 });
        CK.sym(ctx, 'anahtar', -250, 110, 1.1, { closed: 0, k: E.seg(t, sq + 3.0, sq + 3.8) });
        CK.sym(ctx, 'anahtar', 50, 110, 1.1, { closed: 1, k: E.seg(t, sq + 3.4, sq + 4.2) });
        INK.label(ctx, 'açık', -250, 160, { size: 30, align: 'center', alpha: 0.7 * E.seg(t, sq + 3.6, sq + 4.2) });
        INK.label(ctx, 'kapalı', 50, 160, { size: 30, align: 'center', alpha: 0.7 * E.seg(t, sq + 3.8, sq + 4.4) });
        INK.label(ctx, '?', 360, 130, { size: 130, weight: 700, color: CK.AMBD, align: 'center', alpha: E.seg(t, sq + 4.0, sq + 4.6) });
        ctx.restore();
      }
      ctx.restore();
      CK.titleCard(ctx, t, 23, 'Şemadan Devreye: Deney Zamanı');
    }
  });

  // ---------------- SAHNE 2: şema ----------------
  E.scene({
    name: 'Şema', concept: 'Sembollerle devre şeması çizme', from: 'draw', to: 'draw', trFrom: [1200, 380],
    draw(ctx, t) {
      const sd = E.s('draw');
      ctx.save(); bg(ctx);
      P.notebook(ctx, 150, 80, 1620, 900);
      P.write(ctx, 'Devre şemam', 300, 215, E.seg(t, sd + 0.3, sd + 1.5), { size: 60 });
      const B = { x0: 520, y0: 330, x1: 1240, y1: 760 };
      const k = E.seg(t, sd + 1.0, sd + 7.5);
      const placed = CK.loop(ctx, B, [
        { type: 'pil', side: 'top', f: 0.5 },
        { type: 'anahtar', side: 'right', f: 0.5, closed: 0 },
        { type: 'ampul', side: 'bottom', f: 0.5 }
      ], { k, s: 1.35 });
      // etiketler
      const tot = 2 * (B.x1 - B.x0) + 2 * (B.y1 - B.y0);
      const lab = [['pil', 880, 262, 360 / tot], ['anahtar', 1300, 560, (720 + 215) / tot], ['ampul', 880, 850, (720 + 430 + 360) / tot], ['kablolar', 440, 560, 0.93]];
      lab.forEach(([s, x, y, f], i) => { const kk = E.se(t, sd + 1.0 + f * 6.5, sd + 1.6 + f * 6.5); if (kk > 0) INK.label(ctx, s, x, y, { size: 42, weight: 700, align: i === 3 ? 'right' : i === 1 ? 'left' : 'center', alpha: kk, color: '#8A4A10' }); });
      DAMLA.draw(ctx, {
        x: 1560, y: 930, s: 1.15, view: 'q3', flip: true, expr: t > sd + 7.8 ? 'happy' : 'determined', look: [-0.8, -0.3], blink: E.blink(t, 5), squash: E.breath(t), t, talk: E.talk(t), seed: 3,
        arms: t > sd + 7.8 ? [[-1, 2.5], [1, 0.4]] : [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: t > sd + 7.8 ? null : 'notebook'
      });
      ctx.restore();
    }
  });

  // ---------------- SAHNE 3: grup çalışması ----------------
  function roleIcon(ctx, i, t) {
    if (i === 0) { const b = [[-55, -20], [55, -20], [48, 45], [-48, 45], [-55, -20]]; P.fillPts(ctx, b, '#E6DCC6'); INK.wash(ctx, b, '#8A6A45', 0.45, 81, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 3, closed: true }); CK.battery(ctx, -10, -30, 0.35); CK.cable(ctx, 20, -40, 0.3); }
    if (i === 1) { CK.holder(ctx, -10, 10, 0.4); CK.wire(ctx, [40, 22], [70, -30], { sag: -10, w: 5 }); }
    if (i === 2) P.icon.eye(ctx, 0, 0, 0.6);
    if (i === 3) { P.icon.pencil(ctx, 20, 0, 0.6, -0.8); const nb = [[-50, -40], [0, -44], [4, 40], [-46, 44], [-50, -40]]; P.fillPts(ctx, nb, PAL.white); stroke(ctx, nb, { w: 2.6, closed: true }); for (let j = 0; j < 4; j++) line(ctx, [-40, -24 + j * 16], [-8, -26 + j * 16], { w: 1.2, dry: false, alpha: 0.6 }); }
  }
  E.scene({
    name: 'Grup', concept: 'Görev dağılımı ve yardımlaşma', from: 'group', to: 'group', trFrom: [960, 540],
    draw(ctx, t) {
      const sg = E.s('group');
      ctx.save(); bg(ctx);
      P.notebook(ctx, 150, 80, 1620, 900);
      P.write(ctx, 'Grubumuzda görevler', 300, 215, E.seg(t, sg + 0.3, sg + 1.5), { size: 60 });
      const roles = [['Malzeme', 'sorumlusu'], ['Düzeneği', 'kuran'], ['Gözlem', 'yapan'], ['Kayıt', 'tutan']];
      roles.forEach(([a, b], i) => {
        const at = sg + 1.0 + i * 0.9, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
        const x = 390 + i * 350, y = 470;
        ctx.save(); ctx.translate(x, y); ctx.rotate([-0.03, 0.02, -0.01, 0.03][i]); ctx.scale(P.pop(k), P.pop(k));
        CK.card(ctx, -150, -170, 300, 340, { seed: 90 + i });
        ctx.save(); ctx.translate(0, -60); roleIcon(ctx, i, t); ctx.restore();
        ctx.font = '700 40px Kalam'; ctx.textAlign = 'center'; ctx.fillStyle = PAL.ink; ctx.fillText(a, 0, 80); ctx.fillText(b, 0, 124);
        ctx.restore();
      });
      // yardımlaşma okları
      const kh = E.se(t, sg + 4.8, sg + 5.8);
      if (kh > 0) { for (let i = 0; i < 3; i++) P.arrow(ctx, [470 + i * 350, 670], [660 + i * 350, 670], kh, { w: 2.6, bend: -30, head: 10, color: PAL.life }); }
      P.write(ctx, 'görev bilinci · yardımlaşma · sorumluluk', 900, 790, E.seg(t, sg + 5.8, sg + 7.2), { size: 44, align: 'center', color: '#5C7230' });
      DAMLA.draw(ctx, {
        x: 1690, y: 1000, s: 0.95, view: 'q3', flip: true, expr: 'happy', look: [-0.8, -0.4], blink: E.blink(t, 6), squash: E.breath(t), t, talk: E.talk(t), seed: 3, arms: [[-1, 2.3 + 0.1 * Math.sin(t * 3)], [1, 0.4]]
      });
      ctx.restore();
    }
  });
})();
