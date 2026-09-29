// SAHNE 2 — Deney düzeneği ve gözlemler: fener → madde → ekran; cam, buzlu cam, karton; veri tablosu
// (TYMM: kitap, şeffaf dosya, karton, cam, buzlu cam, alüminyum folyo üzerine düşürülen ışığı gözlemleme; tablo)
(function () {
  const { PAL, line, stroke, circlePts, wash, dashed } = INK;
  const F = F14, RED = F.RED;
  const L = [345, 560], MX = 820, SX = 1215, BENCH = 780;

  function spot(ctx, a, r = 1) { // light patch on the screen face
    if (a <= 0) return;
    ctx.save(); ctx.globalCompositeOperation = 'source-over';
    const g = ctx.createRadialGradient(SX + 40, 560, 0, SX + 40, 560, 120 * r);
    g.addColorStop(0, `rgba(250,210,120,${0.95 * a})`); g.addColorStop(0.55, `rgba(245,190,90,${0.55 * a})`); g.addColorStop(1, 'rgba(245,190,90,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(SX + 40, 560, 70 * r, 110 * r, 0, 0, 7); ctx.fill(); ctx.restore();
  }

  function bench(ctx, t, mat, st) {
    // bench + screen
    stroke(ctx, [[100, BENCH], [1460, BENCH - 3]], { w: 4, seed: 201 });
    const face = [[SX, 300], [SX + 110, 330], [SX + 110, 800], [SX, 776]];
    P.fillPts(ctx, face, '#FBF8F1'); stroke(ctx, face.concat([face[0]]), { w: 3, closed: true, seed: 202 });
    // stand
    line(ctx, [MX, 700], [MX, BENCH], { w: 5, seed: 203 }); line(ctx, [MX - 50, BENCH - 2], [MX + 50, BENCH - 2], { w: 6, seed: 204 });
    F.flashlight(ctx, L[0], L[1], 0, 1, 1);
    line(ctx, [200, 580], [210, BENCH], { w: 4, seed: 205 }); line(ctx, [260, 580], [250, BENCH], { w: 4, seed: 206 });
    // rays
    const rk = E.se(t, st, st + 1.2);
    const pass = mat ? { cam: 1, buzlu: 0.4, karton: 0 }[mat] : 1;
    for (let i = -2; i <= 2; i++) {
      const a = i * 0.045, p = [L[0] + 8, L[1] + i * 16];
      const m = [MX - 8, p[1] + Math.tan(a) * (MX - 8 - p[0])];
      const s = [SX + 12, p[1] + Math.tan(a) * (SX + 12 - p[0])];
      F.ray(ctx, p, m, E.clamp(rk * 2), { w: 3.2, head: 13, heads: [0.5], seed: 210 + i });
      if (rk > 0.5) {
        const k2 = E.clamp(rk * 2 - 1);
        if (pass === 1) F.ray(ctx, [mat ? MX + 8 : MX - 8, m[1]], s, k2, { w: 3.2, head: 13, heads: [0.5], seed: 220 + i });
        else if (pass > 0) {
          if (i % 2 === 0) F.ray(ctx, [MX + 8, m[1]], s, k2, { w: 2.4, head: 11, heads: [0.5], alpha: 0.5, seed: 220 + i });
          for (let j = 0; j < 2; j++) { const b = (j ? 1 : -1) * (0.4 + (i + 2) * 0.12); F.ray(ctx, [MX + 8, m[1]], [MX + 8 + Math.cos(b) * 120, m[1] + Math.sin(b) * 120], k2, { w: 2, head: 9, heads: [0.6], alpha: 0.45, seed: 230 + i * 2 + j }); }
        }
      }
    }
    const sa = rk > 0.95 ? pass : 0;
    spot(ctx, pass === 1 ? sa : sa * 0.55, pass === 1 ? 1 : 1.35);
    if (pass === 0 && rk > 0.95) { ctx.save(); ctx.fillStyle = 'rgba(40,40,55,0.28)'; ctx.beginPath(); ctx.ellipse(SX + 55, 560, 50, 150, 0, 0, 7); ctx.fill(); ctx.restore(); }
    if (mat) { F.sheet(ctx, mat, MX, 560, 280); }
    else { stroke(ctx, [[MX - 3, 700], [MX + 3, 700]], { w: 2 }); }
  }

  function inset(ctx, mat, k) {
    if (k <= 0) return;
    const x = 1470, y = 200, w = 360, h = 320;
    ctx.save(); ctx.globalAlpha *= k;
    const fr = [[x, y], [x + w, y - 4], [x + w + 4, y + h], [x + 2, y + h + 2], [x, y]];
    P.fillPts(ctx, fr, '#FBF8F1');
    ctx.save(); P.path(ctx, fr); ctx.clip();
    if (mat === 'cam') { F.flower(ctx, x + w / 2 - 4, y + h - 40, 1.4); P.fillPts(ctx, fr, 'rgba(170,215,235,0.25)'); line(ctx, [x + 40, y + 80], [x + 100, y + 30], { w: 4, color: PAL.white, dry: false }); }
    if (mat === 'buzlu') { F.blurFlower(ctx, x + w / 2 - 4, y + h - 40, 1.4); P.fillPts(ctx, fr, 'rgba(215,230,236,0.55)'); for (let i = 0; i < 120; i++) INK.inkDot(ctx, x + (i * 37 % w), y + (i * 53 % h), 1.3, { alpha: 0.25 }); }
    if (mat === 'karton') { P.fillPts(ctx, fr, '#C9A06A'); wash(ctx, fr, '#8A6A45', 0.3, 240, { bleed: 2 }); }
    ctx.restore();
    stroke(ctx, fr, { w: 4, closed: true, seed: 241 });
    ctx.restore();
    INK.label(ctx, 'arkasına bakınca', x + w / 2, y - 22, { size: 34, weight: 700, align: 'center', alpha: k });
    const res = { cam: 'net görünüyor', buzlu: 'bulanık görünüyor', karton: 'görünmüyor' }[mat];
    P.write(ctx, 'çiçek ' + res, x + w / 2, y + h + 58, k, { size: 38, align: 'center' });
  }

  const ROWS = ['cam', 'dosya', 'tul', 'buzlu', 'karton', 'kitap', 'folyo'];
  function table(ctx, t) {
    const s0 = E.s('table');
    F.card(ctx, 250, 150, 1420, 745, { seed: 250 });
    const cx = [560, 900, 1190, 1480];
    [['Madde', 380], ['Işığı geçirdi', cx[1]], ['Kısmen geçirdi', cx[2]], ['Geçirmedi', cx[3]]].forEach(([h, x]) => P.write(ctx, h, x, 215, 1, { size: 40, align: 'center' }));
    line(ctx, [270, 240], [1650, 234], { w: 3, dry: false }); [720, 1050, 1335].forEach(x => line(ctx, [x, 170], [x + 2, 880], { w: 2, alpha: 0.7, dry: false }));
    ROWS.forEach((m, i) => {
      const y = 300 + i * 88, at = s0 + 0.8 + i * 1.15, k = E.se(t, at, at + 0.5);
      if (i) line(ctx, [270, y - 44], [1650, y - 46], { w: 1, alpha: 0.35, dry: false });
      if (k <= 0) return;
      ctx.save(); ctx.globalAlpha = k; F.icon(ctx, m, 320, y, 0.5); ctx.restore();
      P.write(ctx, F.MAT[m].name, 370, y + 14, k, { size: 38 });
      P.check(ctx, cx[F.MAT[m].cls + 1] - 10, y - 4, 48, E.se(t, at + 0.4, at + 0.9), { w: 6 });
    });
  }

  E.scene({
    name: 'Işık deneyi', concept: 'Maddelerin ışığı geçirme niteliklerini belirleme', from: 'setup', to: 'table', trFrom: [960, 540],
    draw(ctx, t) {
      const ss = E.s('setup'), sf = E.s('safe'), sg = E.s('glass'), sb = E.s('frost'), sc = E.s('carton'), stb = E.s('table');
      ctx.fillStyle = 'rgba(24,25,40,0.14)'; ctx.fillRect(0, 0, E.W, E.H);
      const mat = t >= sc ? 'karton' : t >= sb ? 'buzlu' : t >= sg ? 'cam' : null;
      const st = t >= sc ? sc + 0.5 : t >= sb ? sb + 0.5 : t >= sg ? sg + 0.5 : ss + 0.6;
      const ba = 1 - E.se(t, stb - 0.2, stb + 0.6);
      E.layer(ctx, ba, c => {
        bench(c, t, mat, st);
        P.write(c, 'el feneri', 250, 470, E.seg(t, ss + 0.4, ss + 1.4), { size: 40, align: 'center' });
        P.write(c, 'madde', MX, 390, E.seg(t, ss + 1.4, ss + 2.2) * (mat ? 0 : 1), { size: 40, align: 'center' });
        P.write(c, 'ekran', SX + 55, 860, E.seg(t, ss + 2.2, ss + 3.0), { size: 40, align: 'center' });
        if (mat) {
          P.write(c, F.MAT[mat].name, MX, 390, E.seg(t, st - 0.5, st + 0.3), { size: 44, align: 'center' });
          const res = { cam: 'ışığı geçirdi', buzlu: 'ışığın bir kısmını geçirdi', karton: 'ışığı geçirmedi' }[mat];
          P.write(c, res, MX, 860, E.seg(t, st + 1.4, st + 2.4), { size: 40, align: 'center', color: '#8A4A10' });
        }
        inset(c, mat, mat ? E.se(t, st + 1.8, st + 2.4) : 0);
        DAMLA.draw(c, { x: 1650, y: 900, s: 0.95, view: 'q3', flip: true, expr: mat === 'karton' ? 'surprised' : mat ? 'happy' : 'curious', look: [-0.6, -0.4], blink: E.blink(t, 5), squash: E.breath(t), t, seed: 2 });
        // safety note
        const sk = Math.min(E.se(t, sf + 0.2, sf + 0.8, 'out'), 1 - E.se(t, sg - 0.3, sg + 0.2));
        if (sk > 0) {
          c.save(); c.globalAlpha = sk;
          const card = F.card(c, 560, 170, 900, 120, { color: RED, seed: 260, w: 3 });
          c.restore();
          P.write(c, '⚠  Fenerin ışığını kimsenin gözüne tutma!', 1010, 248, E.seg(t, sf + 0.4, sf + 1.6) * sk, { size: 44, align: 'center', color: RED });
        }
      });
      const ta = E.se(t, stb - 0.1, stb + 0.6);
      E.layer(ctx, ta, c => table(c, t));
    }
  });
})();
