// SAHNE 3 — Mühendislik tasarım döngüsü + ölçüt + sınırlılık + güvenlik
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F8M;
  const STEPS = ['tanımla', 'araştır', 'tasarla', 'yap', 'test et', 'geliştir', 'paylaş'];
  // sağ üstte küçük döngü şeridi; active: vurgulanan adım indeksi (dizi olabilir)
  F04.mini = function (ctx, active, k = 1) {
    if (k <= 0) return; ctx.save(); ctx.globalAlpha *= k; ctx.font = '700 32px Kalam';
    const ws = STEPS.map(s => ctx.measureText(s).width), gap = 34;
    let x = 1870 - ws.reduce((a, b) => a + b, 0) - gap * (STEPS.length - 1), y = 84;
    const act = [].concat(active);
    STEPS.forEach((s, i) => {
      const on = act.includes(i);
      if (on) { const r = [[x - 8, y - 32], [x + ws[i] + 8, y - 34], [x + ws[i] + 10, y + 12], [x - 8, y + 12], [x - 8, y - 32]]; P.fillPts(ctx, r, PAL.light, 0.55); }
      F.txt(ctx, s, x, y, { size: 32, alpha: on ? 1 : 0.45, rot: 0 });
      if (i < STEPS.length - 1) F.txt(ctx, '›', x + ws[i] + gap / 2, y, { size: 32, align: 'center', alpha: 0.4, rot: 0 });
      x += ws[i] + gap;
    });
    ctx.restore();
  };

  function cycle(ctx, t) {
    const s = E.s('cycle'), cx = 760, cy = 540, R = 300;
    const pos = i => { const a = -Math.PI / 2 + i / STEPS.length * 2 * Math.PI; return [cx + Math.cos(a) * R, cy + Math.sin(a) * R]; };
    STEPS.forEach((st, i) => {
      const at = s + 0.6 + i * 0.9, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
      const [x, y] = pos(i), [x2, y2] = pos((i + 1) % STEPS.length);
      if (i < STEPS.length) { const ka = E.se(t, at + 0.4, at + 1.0); if (ka > 0 && (i < STEPS.length - 1 || t > s + 7)) { const a0 = -Math.PI / 2 + (i + 0.22) / STEPS.length * 2 * Math.PI, a1 = -Math.PI / 2 + (i + 0.78) / STEPS.length * 2 * Math.PI; const arc = P.arc(cx, cy, R, a0, a1, 20); P.drawOn(ctx, arc, ka, { w: 3, color: F.PATH }); if (ka > 0.97) INK.arrowHead(ctx, arc[arc.length - 3], arc[arc.length - 1], 14, { w: 3, color: F.PATH }); } }
      const w = F.tw(ctx, st, 40) + 44, r = P.pop(k);
      const bx = [[x - w / 2 * r, y - 38 * r], [x + w / 2 * r, y - 40 * r], [x + w / 2 * r + 3, y + 34 * r], [x - w / 2 * r, y + 36 * r], [x - w / 2 * r, y - 38 * r]];
      P.fillPts(ctx, bx, i === 4 || i === 5 ? '#F6E7B8' : '#FBF8F1'); stroke(ctx, bx, { w: 2.6, closed: true, seed: 4200 + i });
      if (k > 0.7) F.txt(ctx, st, x, y + 13, { size: 40, align: 'center' });
    });
    const kc = E.se(t, s + 0.2, s + 0.9);
    if (kc > 0) { ctx.save(); ctx.globalAlpha *= kc; F.txt(ctx, 'tasarım', cx, cy - 10, { size: 50, align: 'center', color: F.FORCE }); F.txt(ctx, 'döngüsü', cx, cy + 46, { size: 50, align: 'center', color: F.FORCE }); ctx.restore(); }
    const kn = E.se(t, s + 6.8, s + 7.6);
    if (kn > 0) { ctx.save(); ctx.globalAlpha *= kn; F.txt(ctx, 'Döngü tekrar eder:', 1480, 470, { size: 44, align: 'center' }); F.txt(ctx, 'test → geliştir → test…', 1480, 530, { size: 44, align: 'center', color: F.FORCE }); ctx.restore(); }
  }

  function brief(ctx, t) {
    const sc = E.s('criteria'), sl = E.s('limits');
    // ölçüt kartı
    F.card(ctx, 150, 200, 900, 800, { seed: 4210 });
    P.write(ctx, 'Ölçütler', 200, 290, E.seg(t, sc + 0.2, sc + 1.0), { size: 58, color: F.FORCE });
    const C = ['10 N’luk yükü 1 m kaldırsın', 'kuvvet 5 N’dan az olsun', 'güvenli ve sağlam olsun'];
    C.forEach((c, i) => { const at = sc + 1.0 + i * 0.9; P.write(ctx, '• ' + c, 200, 400 + i * 90, E.seg(t, at, at + 1.0), { size: 42 }); });
    // sınırlılık kartı
    const kl = E.se(t, sl - 0.2, sl + 0.5);
    if (kl > 0) E.layer(ctx, kl, c => {
      F.card(c, 1000, 200, 1770, 800, { seed: 4220 });
      P.write(c, 'Sınırlılıklar', 1050, 290, E.seg(t, sl + 0.2, sl + 1.0), { size: 58, color: F.FORCE });
      // malzeme ikonları
      const y = 470;
      // iplik makarası
      const sp = F.rect(1090, y - 60, 1150, y + 40); P.fillPts(c, sp, '#E8D2A8'); stroke(c, sp, { w: 2.6, closed: true, seed: 4221 }); for (let i = 0; i < 6; i++) line(c, [1094, y - 44 + i * 14], [1146, y - 40 + i * 14], { w: 3, color: F.RED, dry: false, alpha: 0.7 });
      // ip
      stroke(c, P.bez([1210, y + 30], [1260, y - 90], [1320, y + 20], 20), { w: 4, color: F.ROPE, seed: 4222 });
      // karton
      const cb = [[1370, y - 50], [1480, y - 60], [1490, y + 40], [1376, y + 44], [1370, y - 50]]; P.fillPts(c, cb, '#D9B98A'); stroke(c, cb, { w: 2.6, closed: true, seed: 4223 });
      // çubuk + şişe kapağı
      line(c, [1530, y + 40], [1640, y - 70], { w: 9, color: F.WOOD, seed: 4224 });
      P.fillPts(c, circlePts(1690, y + 10, 26, 26, 20), PAL.water, 0.6); stroke(c, circlePts(1690, y + 10, 26, 26, 20), { w: 2.4, closed: true });
      F.txt(c, 'makara · ip · karton · çubuk · kapak', 1385, 580, { size: 36, align: 'center' });
      F.txt(c, 'yalnızca atık / basit malzeme', 1385, 660, { size: 40, align: 'center', color: F.FORCE });
      F.txt(c, 'iki ders saatinde bitmeli', 1385, 730, { size: 36, align: 'center', alpha: 0.8 });
    });
  }

  function safety(ctx, t) {
    const s = E.s('safety'), k = E.se(t, s + 0.1, s + 0.7, 'out');
    if (k <= 0) return;
    E.layer(ctx, k, c => {
      c.fillStyle = 'rgba(40,20,10,0.25)'; c.fillRect(0, 0, E.W, E.H);
      F.card(c, 460, 230, 1460, 780, { seed: 4230, color: F.RED, w: 4 });
      const tri = [[560, 420], [640, 280], [720, 420], [560, 420]]; P.fillPts(c, tri, F.RED, 0.9); F.txt(c, '!', 640, 405, { size: 90, align: 'center', color: PAL.white, rot: 0 });
      F.txt(c, 'Güvenlik', 780, 360, { size: 70, color: F.RED });
      F.txt(c, 'Makas ve maket bıçağını', 560, 520, { size: 46 });
      F.txt(c, 'bir yetişkin eşliğinde kullan.', 560, 580, { size: 46 });
      F.txt(c, 'Asılı yükün altında durma!', 560, 690, { size: 50, color: F.RED });
    });
  }

  E.scene({
    name: 'Tasarım döngüsü', concept: 'Mühendislik tasarım süreci', from: 'cycle', to: 'cycle', trFrom: [760, 540],
    draw(ctx, t) {
      cycle(ctx, t);
      DAMLA.draw(ctx, { x: 1500, y: 880, s: 1.0, view: 'q3', flip: true, expr: 'curious', look: [-0.8, -0.3], blink: E.blink(t, 4), squash: E.breath(t), t, seed: 1, arms: [[-1, [-50, -150]], [1, 0.4]] });
    }
  });
  E.scene({
    name: 'Ölçüt ve sınırlılık', concept: 'Ölçüt, sınırlılık, güvenlik', from: 'criteria', to: 'safety', trFrom: [520, 500],
    draw(ctx, t) {
      brief(ctx, t);
      F04.mini(ctx, [0, 1], 1);
      safety(ctx, t);
    }
  });
})();
