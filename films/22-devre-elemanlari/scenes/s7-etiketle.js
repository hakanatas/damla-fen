// SAHNE 7 — Sembolleri niteliklerine göre etiketleme (ç) + semboller birleşince devre şeması + ortak dil
(function () {
  const { PAL, line, stroke, circlePts, leader } = INK;
  const RED = CK.RED;
  function bg(ctx) { ctx.fillStyle = 'rgba(138,106,69,0.18)'; ctx.fillRect(0, 0, E.W, E.H); }
  E.scene({
    name: 'Etiketle', concept: 'Sembolleri özelliklerine göre etiketleme', from: 'l-pil', to: 'l-kablo', trFrom: [1420, 600],
    draw(ctx, t) {
      const sp = E.s('l-pil'), sa = E.s('l-anahtar'), sk = E.s('l-kablo');
      ctx.save(); bg(ctx);
      P.notebook(ctx, 150, 80, 1620, 900);
      P.write(ctx, 'Sembollerin özellikleri', 300, 215, E.seg(t, sp + 0.4, sp + 1.8), { size: 56 });
      if (t > sp + 1.8) P.drawOn(ctx, P.bez([296, 236], [560, 246], [860, 232], 30), E.se(t, sp + 1.8, sp + 2.3), { w: 3, color: PAL.light });
      // panel çizgisi
      if (t > sa - 0.5) { ctx.save(); ctx.globalAlpha = E.se(t, sa - 0.5, sa); INK.dashed(ctx, [[960, 280], [960, 880]], { w: 2, alpha: 0.35 }); ctx.restore(); }

      // --- PİL ---
      const kp = E.seg(t, sp + 1.2, sp + 2.8);
      CK.sym(ctx, 'pil', 560, 470, 2.6, { k: kp, pm: true });
      const l1 = E.se(t, sp + 3.2, sp + 3.9), l2 = E.se(t, sp + 5.4, sp + 6.1);
      if (l1 > 0) { ctx.save(); ctx.globalAlpha = l1; leader(ctx, [420, 668], [538, 540], { bend: -0.15 }); ctx.restore(); P.write(ctx, 'uzun çizgi → artı (+) kutup', 250, 700, E.seg(t, sp + 3.4, sp + 4.8), { size: 42 }); }
      if (l2 > 0) { ctx.save(); ctx.globalAlpha = l2; leader(ctx, [700, 752], [590, 520], { bend: 0.2 }); ctx.restore(); P.write(ctx, 'kısa çizgi → eksi (−) kutup', 250, 790, E.seg(t, sp + 5.6, sp + 7.0), { size: 42 }); }

      // --- ANAHTAR: açık / kapalı ---
      const ka = E.se(t, sa + 0.1, sa + 0.8);
      if (ka > 0) E.layer(ctx, ka, c => {
        const loops = [{ x: 1010, closed: 0, t1: 'açık anahtar', t2: 'devre kesik → ışık yok' }, { x: 1380, closed: 1, t1: 'kapalı anahtar', t2: 'devre tamam → ışık var' }];
        loops.forEach((L, i) => {
          const kk = E.seg(t, sa + 0.3 + i * 2.6, sa + 1.8 + i * 2.6); if (kk <= 0) return;
          const lit = L.closed ? E.se(t, sa + 2.0 + i * 2.6, sa + 2.6 + i * 2.6) : 0;
          CK.loop(c, { x0: L.x, y0: 290, x1: L.x + 300, y1: 480 }, [
            { type: 'anahtar', side: 'top', f: 0.5, closed: L.closed },
            { type: 'ampul', side: 'right', f: 0.5, lit },
            { type: 'pil', side: 'left', f: 0.5 }
          ], { k: kk, s: 0.8, w: 5 });
          P.write(c, L.t1, L.x + 150, 540, E.seg(t, sa + 1.2 + i * 2.6, sa + 2.2 + i * 2.6), { size: 36, align: 'center' });
          P.write(c, L.t2, L.x + 150, 582, E.seg(t, sa + 1.6 + i * 2.6, sa + 2.6 + i * 2.6), { size: 28, weight: 400, align: 'center' });
        });
      });
      // --- KABLO: düz çizgi, dik köşe ---
      const kk2 = E.se(t, sk + 0.1, sk + 0.8);
      if (kk2 > 0) E.layer(ctx, kk2, c => {
        // yanlış: eğri çizgi
        const wav = []; for (let i = 0; i <= 40; i++) { const u = i / 40; wav.push([1040 + u * 230, 700 + Math.sin(u * 9) * 22 + u * 60]); }
        P.drawOn(c, wav, E.seg(t, sk + 0.3, sk + 1.3), { w: 5, dry: false });
        P.cross(c, 1155, 730, 50, E.se(t, sk + 1.4, sk + 2.0), { w: 8, color: RED });
        // doğru: düz ve dik açılı
        const pl = [[1400, 680], [1620, 680], [1620, 820]];
        P.drawOn(c, pl, E.seg(t, sk + 1.8, sk + 3.0), { w: 5, dry: false, taper: 0 });
        if (t > sk + 3.0) { c.save(); c.globalAlpha = E.se(t, sk + 3.0, sk + 3.5); stroke(c, [[1596, 680], [1596, 704], [1620, 704]], { w: 2.4, dry: false }); c.restore(); INK.label(c, '90°', 1540, 740, { size: 30, alpha: 0.7 * E.se(t, sk + 3.0, sk + 3.5) }); }
        P.check(c, 1470, 760, 50, E.se(t, sk + 3.2, sk + 3.8), { w: 7, color: PAL.life });
        P.write(c, 'düz çizgi, dik köşe', 1330, 870, E.seg(t, sk + 3.6, sk + 4.8), { size: 40, align: 'center' });
      });
      DAMLA.draw(ctx, {
        x: 1790, y: 1000, s: 0.85, view: 'q3', flip: true, expr: 'happy', look: [-0.8, -0.5], blink: E.blink(t, 9), squash: E.breath(t), t, talk: E.talk(t), seed: 4,
        arms: [[-1, 2.2 + 0.1 * Math.sin(t * 2)], [1, 0.4]]
      });
      ctx.restore();
    }
  });

  // ---------------- devre şeması ----------------
  E.scene({
    name: 'Devre şeması', concept: 'Semboller birleşince devre şeması', from: 'schema', to: 'world', trFrom: [960, 540],
    draw(ctx, t) {
      const ss = E.s('schema'), sw = E.s('world');
      ctx.save(); bg(ctx);
      P.notebook(ctx, 150, 80, 1620, 900);
      const out = E.se(t, sw, sw + 1.0);
      // gerçek devre (solda)
      E.layer(ctx, 1 - out, c => {
        INK.label(c, 'gerçek devre', 560, 230, { size: 44, weight: 700, align: 'center' });
        CK.realCircuit(c, 580, 600, 0.95, 1, 0.8, t);
      });
      // şema (sağda → ortaya)
      const bx = E.lerp(1110, 430, out), by = E.lerp(330, 300, out), sc = E.lerp(1, 1.1, out);
      const B = { x0: bx, y0: by, x1: bx + 500 * sc, y1: by + 340 * sc };
      const kd = E.seg(t, ss + 1.0, ss + 4.0);
      CK.loop(ctx, B, [
        { type: 'pil', side: 'left', f: 0.5, pm: true },
        { type: 'anahtar', side: 'bottom', f: 0.5, closed: 1 },
        { type: 'ampul', side: 'right', f: 0.5, lit: 0 }
      ], { k: kd, s: sc });
      INK.label(ctx, 'devre şeması', (B.x0 + B.x1) / 2, B.y0 - 50, { size: 48, weight: 700, align: 'center', alpha: E.se(t, ss + 0.5, ss + 1.2) });
      // eşleştirme okları
      if (out < 1) E.layer(ctx, 1 - out, c => {
        const ka = E.se(t, ss + 4.2, ss + 5.2);
        if (ka > 0) {
          INK.dashed(c, P.partial(P.bez([420, 540], [700, 380], [1070, 500], 30), ka), { w: 2.4, color: CK.AMBD });
          INK.dashed(c, P.partial(P.bez([640, 650], [880, 760], [1300, 690], 30), ka), { w: 2.4, color: CK.AMBD });
          INK.dashed(c, P.partial(P.bez([900, 450], [1300, 360], [1590, 470], 30), ka), { w: 2.4, color: CK.AMBD });
        }
        const kt = E.se(t, ss + 5.4, ss + 6.0, 'out');
        if (kt > 0) { c.save(); c.translate(1500, 800); c.scale(P.pop(kt), P.pop(kt)); P.icon.clock(c, -150, 0, 0.6, 0.5); c.font = '700 44px Kalam'; c.fillStyle = PAL.ink; c.fillText('birkaç saniye!', -100, 14); c.restore(); }
      });
      // dünya: herkes aynı okur
      if (out > 0) E.layer(ctx, out, c => {
        P.earth(c, 1420, 520, 110, { rot: t * 0.05 });
        const ws = [['pil', 1240, 380], ['battery', 1610, 370], ['pile', 1620, 700], ['Batterie', 1230, 700]];
        ws.forEach(([w, x, y], i) => INK.label(c, w, x, y, { size: 38, weight: 700, align: 'center', alpha: E.se(t, sw + 1.0 + i * 0.4, sw + 1.5 + i * 0.4) }));
        P.write(c, 'Dünyanın her yerinde aynı okunur.', 960, 850, E.seg(t, sw + 2.6, sw + 4.2), { size: 50, align: 'center', color: '#8A4A10' });
      });
      ctx.restore();
    }
  });
})();
