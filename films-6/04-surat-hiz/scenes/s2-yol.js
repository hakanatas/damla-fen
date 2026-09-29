// SAHNE 2 — Alınan yol ve yer değiştirme (harita), yüzücü (gidiş-dönüş), matris tablo
(function () {
  const { PAL, line, stroke, dashed, circlePts } = INK;
  // route: 1.2 px = 1 m; home → school: 400 m doğu + 300 m kuzey (basamaklı sokaklar)
  const H = [420, 800], S = [900, 440];
  const ROUTE = [H, [660, 800], [660, 620], [900, 620], S];
  const seglen = (a, b) => Math.hypot(b[0] - a[0], b[1] - a[1]);
  function along(k) { // polyline up to fraction k
    const tot = ROUTE.slice(1).reduce((s, p, i) => s + seglen(ROUTE[i], p), 0); let d = k * tot; const out = [ROUTE[0]];
    for (let i = 1; i < ROUTE.length; i++) { const L = seglen(ROUTE[i - 1], ROUTE[i]); if (d >= L) { out.push(ROUTE[i]); d -= L; } else { out.push(E.mix(ROUTE[i - 1], ROUTE[i], d / L)); break; } }
    return out;
  }
  function map(ctx, t) {
    const sp = E.s('path'), sd = E.s('disp'), sl = E.s('longer');
    F64.grid(ctx, 300, 270, 1020, 880, 420, 800);
    // streets (blocks)
    ctx.save(); ctx.globalAlpha = 0.5;
    [[[330, 800], [1000, 800]], [[330, 620], [1000, 620]], [[330, 440], [1000, 440]], [[420, 290], [420, 860]], [[660, 290], [660, 860]], [[900, 290], [900, 860]]].forEach((s, i) => line(ctx, s[0], s[1], { w: 14, color: '#CFC3AA', dry: false, taper: 0, seed: 4100 + i }));
    ctx.restore();
    // compass
    P.arrow(ctx, [960, 360], [960, 300], 1, { w: 3, head: 12 }); INK.label(ctx, 'K', 960, 290, { size: 30, weight: 700, align: 'center' });
    F64.house(ctx, H[0] - 10, H[1] - 14, 0.42); F64.school(ctx, S[0] + 10, S[1] - 18, 0.36);
    // path trail
    const pk = E.se(t, sp + 0.4, sp + 4.4, 'io');
    if (pk > 0) { const pts = along(pk); stroke(ctx, pts, { w: 7, color: F64.YOL, taper: 0, dry: false, vary: 0.1, seed: 4110 }); const hd = pts[pts.length - 1]; if (pk < 1) DAMLA.draw(ctx, { x: hd[0], y: hd[1] + 18, s: 0.3, view: 'front', expr: 'happy', t, seed: 1, shadow: false }); }
    if (pk >= 1) F64.tag(ctx, 'alınan yol: 700 m', 560, 856, { size: 38, color: F64.YOL, seed: 4111 });
    // displacement arrow
    const dk = E.se(t, sd + 0.4, sd + 1.8);
    if (dk > 0) P.arrow(ctx, [H[0] + 6, H[1] - 6], [S[0] - 8, S[1] + 8], dk, { w: 6, head: 22, color: F64.YER });
    if (dk >= 1) { ctx.save(); ctx.translate(548, 505); ctx.rotate(-0.64); F64.tag(ctx, 'yer değiştirme: 500 m', 0, 0, { size: 34, color: F64.YER, seed: 4112 }); ctx.restore(); }
    E.inkText(ctx, 'yönü: evden okula doğru', 660, 245, t, sd + 3.0, 1e9, { size: 38, align: 'center', color: F64.YER });
    // comparison: straightened strings (to scale)
    const ck = E.se(t, sl + 0.3, sl + 1.5);
    if (ck > 0) E.layer(ctx, ck, c => {
      const x0 = 1120, sc = 0.9; // 1 m = 0.9 px
      stroke(c, [[x0, 450], [x0 + 700 * sc * ck, 450]], { w: 9, color: F64.YOL, taper: 0, dry: false, seed: 4120 });
      stroke(c, [[x0, 560], [x0 + 500 * sc * ck, 560]], { w: 9, color: F64.YER, taper: 0, dry: false, seed: 4121 });
      INK.label(c, 'alınan yol · 700 m', x0, 420, { size: 38, weight: 700, color: F64.YOL });
      INK.label(c, 'yer değiştirme · 500 m', x0, 530, { size: 38, weight: 700, color: F64.YER });
      E.inkText(c, 'Alınan yol daha uzun!', x0 + 280, 650, t, sl + 1.8, 1e9, { size: 50, align: 'center' });
    });
  }
  function pool(ctx, t) {
    const sp = E.s('pool');
    const x0 = 400, x1 = 1500, y0 = 380, y1 = 640, cy = 510;
    const pl = [[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]];
    P.fillPts(ctx, pl, '#CFE3EA'); INK.wash(ctx, pl, PAL.water, 0.35, 4130, { bleed: 2, blooms: 2 }); stroke(ctx, pl, { w: 4, closed: true, seed: 4131 });
    [440, 580].forEach((y, i) => dashed(ctx, [[x0 + 10, y], [x1 - 10, y]], { w: 2.4, on: 14, off: 10, color: PAL.white }));
    // ruler 50 m
    line(ctx, [x0, 330], [x1, 330], { w: 2.4, dry: false }); line(ctx, [x0, 315], [x0, 345], { w: 2.4 }); line(ctx, [x1, 315], [x1, 345], { w: 2.4 });
    INK.label(ctx, '50 m', (x0 + x1) / 2, 310, { size: 42, weight: 700, align: 'center' });
    const g = E.seg(t, sp + 0.4, sp + 6.4); const u = g < 0.5 ? E.ease.io(g * 2) : 1 - E.ease.io((g - 0.5) * 2);
    const sx = x0 + 60 + (x1 - x0 - 120) * u, dir = g < 0.5 ? 1 : -1;
    // trail out (above) and back (below)
    const out = E.clamp(g * 2), back = E.clamp(g * 2 - 1);
    if (out > 0) { stroke(ctx, [[x0 + 60, 470], [x0 + 60 + (x1 - x0 - 120) * E.ease.io(out), 470]], { w: 5, color: F64.YOL, taper: 0, dry: false, seed: 4132 }); }
    if (back > 0) { const xb = x1 - 60 - (x1 - x0 - 120) * E.ease.io(back); stroke(ctx, [[x1 - 60, 552], [xb, 552]], { w: 5, color: F64.YOL, taper: 0, dry: false, seed: 4133 }); INK.arrowHead(ctx, [xb + 10, 552], [xb, 552], 14, { w: 4, color: F64.YOL }); }
    if (out >= 1) INK.arrowHead(ctx, [x1 - 70, 470], [x1 - 60, 470], 14, { w: 4, color: F64.YOL });
    F64.swimmer(ctx, sx, cy, dir, t);
    inkDotStart(ctx, x0 + 60, cy);
    if (g >= 1) {
      F64.tag(ctx, 'alınan yol: 100 m', 700, 760, { size: 44, color: F64.YOL, seed: 4134 });
      F64.tag(ctx, 'yer değiştirme: 0', 1250, 760, { size: 44, color: F64.YER, seed: 4135 });
      INK.label(ctx, 'başladığı yere döndü', x0 + 60, 690, { size: 34, weight: 700, align: 'center', color: F64.YER });
    }
  }
  function inkDotStart(ctx, x, y) { INK.inkDot(ctx, x, y + 70, 7); }
  const ROWS = [['Hareket', 'Alınan yol', 'Yer değiştirme'], ['Evden okula', '700 m', '500 m, okula doğru'], ['Havuzda gidiş-dönüş', '100 m', '0']];
  function matrix(ctx, t) {
    const sm = E.s('matrix');
    P.notebook(ctx, 200, 200, 1520, 700);
    P.write(ctx, 'Matris tablo', 330, 300, E.seg(t, sm + 0.2, sm + 1.2), { size: 58 });
    F64.table(ctx, 330, 360, [480, 360, 520], ROWS, 80, i => E.se(t, sm + 1.0 + i * 1.3, sm + 2.2 + i * 1.3), { size: 44 });
    E.inkText(ctx, 'Çıkarım: Yer değiştirme, alınan yoldan büyük olamaz.', 960, 740, t, sm + 5.4, 1e9, { size: 46, align: 'center', color: '#8A4A10' });
  }
  E.scene({
    name: 'Yol ve yer değiştirme', concept: 'Alınan yol, yer değiştirme', from: 'path', to: 'longer', trFrom: [420, 800],
    draw(ctx, t) {
      map(ctx, t);
      DAMLA.draw(ctx, { x: 1620, y: 900, s: 1.0, view: 'q3', flip: true, expr: 'curious', look: [-0.8, -0.2], blink: E.blink(t, 4), squash: E.breath(t), t, seed: 1, arms: [[-1, 0.4], [1, 1.0]], prop: 'notebook' });
    }
  });
  E.scene({
    name: 'Havuz', concept: 'Gidiş-dönüş: yer değiştirme sıfır', from: 'pool', to: 'pool', trFrom: [960, 510],
    draw(ctx, t) { pool(ctx, t); }
  });
  E.scene({
    name: 'Matris tablo', concept: 'Verileri tabloya kaydetme', from: 'matrix', to: 'matrix', trFrom: [960, 540],
    draw(ctx, t) { matrix(ctx, t); DAMLA.draw(ctx, { x: 1760, y: 1000, s: 0.95, view: 'q3', flip: true, expr: 'thinking', look: [-0.7, 0.1], blink: E.blink(t, 6), squash: E.breath(t), t, seed: 1, arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' }); }
  });
})();
