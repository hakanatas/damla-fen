// SAHNE 4 — İbnülheysem ve karanlık kutu: delikten geçen ışık ters görüntü oluşturur → ışık doğrusal yayılır
// (TYMM: "İbnülheysem'in karanlık oda (kutu) deneyi ... paylaşılabilir"; gösteri deneyi, ışınları çizme)
(function () {
  const { PAL, line, stroke, circlePts, wash, dashed } = INK;
  const F = F13;
  const HOLE = [760, 560], BACK = 1260, TOP = 360, BOT = 760;
  const CX = 260, CBASE = 720;                     // candle: base y, body h 200, flame 110 → tip y 400
  const INS = { x: 1400, y: 250, w: 420, h: 470, dy: -75 };   // back-face inset (image drawn 1:1, shifted up 75)
  const img = y => HOLE[1] - (y - HOLE[1]) * (BACK - HOLE[0]) / (HOLE[0] - CX);   // pinhole mapping (side view)

  function book(ctx, t, k) {
    const si = E.s('ibn');
    ctx.save(); ctx.globalAlpha = k;
    F.card(ctx, 330, 190, 1260, 640, { seed: 401 });
    // open manuscript
    const L = [[470, 300], [760, 280], [770, 700], [480, 720]], R = [[780, 280], [1070, 300], [1060, 720], [770, 700]];
    [L, R].forEach((pg, i) => { P.fillPts(ctx, pg, '#F3E6C4'); wash(ctx, pg, '#C9A870', 0.3, 410 + i, { bleed: 1, blooms: 1 }); stroke(ctx, pg.concat([pg[0]]), { w: 2.6, closed: true, seed: 412 + i }); });
    // sketch on left page: eye + rays; right page: dark room with hole
    P.icon.eye(ctx, 560, 440, 0.45);
    for (let i = -1; i <= 1; i++) F.ray(ctx, [720, 440 + i * 40], [610, 440 + i * 6], E.se(t, si + 1.0, si + 2.0), { w: 2.2, head: 10, heads: [0.6] });
    const box = [[830, 380], [1010, 380], [1010, 520], [830, 520], [830, 380]];
    P.fillPts(ctx, box, '#3A3440', 0.7); stroke(ctx, box, { w: 2.4, closed: true, seed: 415 });
    F.ray(ctx, [800, 410], [1010, 490], E.se(t, si + 1.4, si + 2.4), { w: 2.2, head: 10 }); F.ray(ctx, [800, 490], [1010, 410], E.se(t, si + 1.4, si + 2.4), { w: 2.2, head: 10 });
    for (let i = 0; i < 5; i++) line(ctx, [500, 560 + i * 30], [740, 555 + i * 30], { w: 1.4, alpha: 0.4, dry: false, seed: 420 + i });
    for (let i = 0; i < 5; i++) line(ctx, [810, 560 + i * 30], [1040, 565 + i * 30], { w: 1.4, alpha: 0.4, dry: false, seed: 430 + i });
    P.write(ctx, 'İbnülheysem', 1340, 380, E.seg(t, si + 0.6, si + 1.8), { size: 64, align: 'center', color: '#8A4A10' });
    P.write(ctx, '(yaklaşık 965 – 1040)', 1340, 440, E.seg(t, si + 1.4, si + 2.4), { size: 36, weight: 400, align: 'center' });
    P.write(ctx, 'Optik biliminin', 1340, 540, E.seg(t, si + 2.4, si + 3.4), { size: 42, align: 'center' });
    P.write(ctx, 'mimarı sayılır.', 1340, 595, E.seg(t, si + 3.0, si + 4.0), { size: 42, align: 'center' });
    P.write(ctx, 'Kitâbü’l-Menâzır (Optik Kitabı)', 770, 790, E.seg(t, si + 3.8, si + 5.0), { size: 36, weight: 400, align: 'center', alpha: 0.75 });
    ctx.restore();
  }

  function setup(ctx, t) {
    const sb = E.s('box'), si = E.s('image'), sw = E.s('why'), sc = E.s('because');
    // table
    stroke(ctx, [[120, BOT], [1330, BOT - 2]], { w: 4, seed: 501 });
    line(ctx, [170, BOT], [180, 905], { w: 5, seed: 502 }); line(ctx, [1290, BOT], [1280, 905], { w: 5, seed: 503 });
    // block + candle
    const blk = [[200, CBASE], [320, CBASE], [320, BOT], [200, BOT], [200, CBASE]]; P.fillPts(ctx, blk, '#8A6A45', 0.6); stroke(ctx, blk, { w: 2.4, closed: true, seed: 504 });
    const lit = E.se(t, sb + 2.5, sb + 3.2);
    const cd = F.candle(ctx, CX, CBASE, t, { h: 200, w: 50, fh: 110, glow: lit });
    if (lit < 1) { ctx.save(); ctx.globalAlpha = 1 - lit; P.fillPts(ctx, circlePts(CX, 460, 40, 70, 30), PAL.paper); ctx.restore(); }
    // flame light goes in all directions; the box front wall blocks most of it
    if (lit > 0) {
      const fc = [CX, 470];
      for (let i = 0; i < 14; i++) {
        const a = i / 14 * Math.PI * 2 + 0.11, d = [Math.cos(a), Math.sin(a)];
        let len = 170; if (d[0] > 0.3) { const tt = (HOLE[0] - fc[0]) / d[0], y = fc[1] + d[1] * tt; if (y > TOP && y < BOT) len = tt - 4; else len = 260; }
        F.ray(ctx, [fc[0] + d[0] * 60, fc[1] + d[1] * 60], [fc[0] + d[0] * len, fc[1] + d[1] * len], lit, { w: 2.2, head: 10, alpha: 0.45, heads: [0.5], seed: 520 + i });
      }
    }
    // box (side cross-section), dark inside
    const inner = [[HOLE[0], TOP], [BACK, TOP], [BACK, BOT], [HOLE[0], BOT]];
    P.fillPts(ctx, inner, '#23242F', 0.88);
    const bw = 14;
    [[[HOLE[0] - bw, TOP - bw], [BACK + bw, TOP - bw], [BACK + bw, TOP], [HOLE[0] - bw, TOP]], [[HOLE[0] - bw, BOT], [BACK + bw, BOT], [BACK + bw, BOT + bw], [HOLE[0] - bw, BOT + bw]],
     [[BACK, TOP], [BACK + bw, TOP], [BACK + bw, BOT], [BACK, BOT]], [[HOLE[0] - bw, TOP], [HOLE[0], TOP], [HOLE[0], HOLE[1] - 7], [HOLE[0] - bw, HOLE[1] - 7]], [[HOLE[0] - bw, HOLE[1] + 7], [HOLE[0], HOLE[1] + 7], [HOLE[0], BOT], [HOLE[0] - bw, BOT]]]
      .forEach((w, i) => { P.fillPts(ctx, w, '#8A6A45'); stroke(ctx, w.concat([w[0]]), { w: 2, closed: true, seed: 540 + i, dry: false }); });
    INK.label(ctx, 'karanlık kutu', 1010, TOP - 34, { size: 38, weight: 700, align: 'center' });
    const hk = E.se(t, sb + 1.2, sb + 2.0);
    if (hk > 0) { ctx.save(); ctx.globalAlpha = hk; INK.leader(ctx, [650, 320], [HOLE[0] - 8, HOLE[1] - 4], { w: 1.6, bend: -0.2 }); ctx.restore(); P.write(ctx, 'küçük delik', 620, 305, hk, { size: 38, align: 'center' }); }
    // light on the back wall (where the image forms)
    const ik = E.se(t, si + 0.2, si + 1.2);
    if (ik > 0) {
      ctx.save(); ctx.globalAlpha = ik; ctx.globalCompositeOperation = 'lighter';
      const g = ctx.createLinearGradient(BACK - 30, 0, BACK, 0); g.addColorStop(0, 'rgba(240,180,80,0)'); g.addColorStop(1, 'rgba(240,180,80,0.8)');
      ctx.fillStyle = g; ctx.fillRect(BACK - 30, img(cd.tip[1]) - (img(CBASE) > img(cd.tip[1]) ? 0 : 0), 30, 0); ctx.fillRect(BACK - 30, img(CBASE), 30, img(cd.tip[1]) - img(CBASE));
      ctx.restore();
    }
    // two rays through the hole (why)
    const r1 = E.se(t, sw + 0.3, sw + 2.6, 'sine'), r2 = E.se(t, sw + 3.2, sw + 5.4, 'sine');
    const ray2 = (a, k, seed) => { const b = [BACK - 2, img(a[1])]; F.ray(ctx, a, b, k, { w: 4, heads: [0.3, 0.8], seed }); if (k > 0.99) INK.inkDot(ctx, b[0], b[1], 6, { color: '192,127,30' }); };
    ray2([CX + 4, cd.tip[1] + 6], r1, 551);
    ray2([CX, cd.fbase[1]], r2, 552);
    P.write(ctx, 'tepe', CX - 70, cd.tip[1] + 14, E.seg(t, sw + 0.1, sw + 0.8), { size: 36, align: 'right', color: '#8A4A10' });
    P.write(ctx, 'alt', CX - 70, cd.fbase[1] + 10, E.seg(t, sw + 3.0, sw + 3.7), { size: 36, align: 'right', color: '#8A4A10' });
    if (r1 > 0.99) P.write(ctx, 'tepe', BACK - 24, img(cd.tip[1]) + 12, E.seg(t, sw + 2.6, sw + 3.2), { size: 34, align: 'right', color: '#F6D9A0' });
    if (r2 > 0.99) P.write(ctx, 'alt', BACK - 24, img(cd.fbase[1]) + 12, E.seg(t, sw + 5.4, sw + 6.0), { size: 34, align: 'right', color: '#F6D9A0' });
    // back-face inset: what appears on the tracing paper — the candle, upside down
    const pk = E.se(t, si + 0.6, si + 1.4, 'out');
    if (pk > 0) {
      ctx.save(); ctx.globalAlpha = pk;
      const I = INS; const fr = [[I.x, I.y], [I.x + I.w, I.y - 4], [I.x + I.w + 4, I.y + I.h], [I.x + 2, I.y + I.h + 2], [I.x, I.y]];
      P.fillPts(ctx, fr, '#2A2A34', 0.95); stroke(ctx, fr, { w: 4, closed: true, seed: 560 });
      ctx.save(); P.path(ctx, fr); ctx.clip();
      ctx.translate(I.x + I.w / 2, HOLE[1] + I.dy); ctx.scale(-1, -1); ctx.translate(-CX, -HOLE[1]);
      ctx.globalAlpha = pk * 0.9; F.candle(ctx, CX, CBASE, t, { h: 200, w: 50, fh: 110, glow: 0.8 });
      ctx.restore();
      ctx.restore();
      INK.label(ctx, 'arka yüz (yağlı kâğıt)', INS.x + INS.w / 2, INS.y - 24, { size: 36, weight: 700, align: 'center', alpha: pk });
      if (t > si + 1.8) { const k = E.se(t, si + 1.8, si + 2.6, 'back'); ctx.save(); ctx.translate(INS.x + INS.w - 20, INS.y + 60); ctx.scale(k, k); ctx.rotate(-0.12); P.fillPts(ctx, circlePts(0, 0, 70, 44, 30), '#FBF8F1', 0.95); stroke(ctx, circlePts(0, 0, 70, 44, 30), { w: 3, closed: true, color: '#8A4A10' }); ctx.font = '700 40px Kalam'; ctx.textAlign = 'center'; ctx.fillStyle = '#8A4A10'; ctx.fillText('ters!', 0, 13); ctx.restore(); }
    }
    // Damla watching
    DAMLA.draw(ctx, { x: 1610, y: 905, s: 0.8, view: 'q3', flip: false, expr: t > si + 1.5 && t < sw ? 'surprised' : (t > sc ? 'happy' : 'curious'), look: [0.1, -0.8], blink: E.blink(t, 7), squash: E.breath(t), arms: t > sc ? [[-1, 2.6], [1, 2.6]] : [[-1, 0.35], [1, 0.35]], t, seed: 3 });
    // conclusion
    const ck = E.se(t, sc + 0.4, sc + 1.4);
    if (ck > 0) {
      ctx.save(); ctx.globalAlpha = ck; P.fillPts(ctx, [[330, 800], [1210, 796], [1214, 880], [334, 884]], '#FBF8F1', 0.92); stroke(ctx, [[330, 800], [1210, 796], [1214, 880], [334, 884], [330, 800]], { w: 2.6, closed: true, color: F.AMB }); ctx.restore();
      P.write(ctx, 'Işık düz çizgilerle gider → görüntü ters', 772, 858, ck, { size: 44, align: 'center' });
    }
  }

  E.scene({
    name: 'Karanlık kutu', concept: 'İbnülheysem; karanlık kutuda ters görüntü', from: 'ibn', to: 'because', trFrom: [960, 540],
    draw(ctx, t) {
      const sb = E.s('box');
      ctx.fillStyle = 'rgba(24,25,40,0.10)'; ctx.fillRect(0, 0, E.W, E.H);
      const bk = 1 - E.se(t, sb - 0.2, sb + 0.6);
      if (bk > 0) E.layer(ctx, bk, c => book(c, t, 1));
      const sk = E.se(t, sb - 0.1, sb + 0.8);
      if (sk > 0) E.layer(ctx, sk, c => setup(c, t));
    }
  });
})();
