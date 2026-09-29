// SAHNE 4 — Dolanma + eksen eğikliği: 21 Haziran, 21 Aralık, 21 Mart / 23 Eylül (ekinoks); yarım kürelerde ters mevsimler
(function () {
  const { PAL, line, stroke, circlePts, wash, arrowHead } = INK;
  const F = F81;
  const SX = 700, SY = 520, RX = 480, RY = 150;
  const SB = RY / RX, CB = Math.sqrt(1 - SB * SB);  // bakış açısı (üstten ≈18°)
  const ER = 36;
  const POS = [ // θ: üstten bakınca saat yönünün tersine; 0 = sağ
    { th: 0, d: '21 Aralık', lx: 0, ly: 88 },
    { th: Math.PI / 2, d: '21 Mart', lx: 0, ly: -60 },
    { th: Math.PI, d: '21 Haziran', lx: 0, ly: 88 },
    { th: 1.5 * Math.PI, d: '23 Eylül', lx: 175, ly: 20 }
  ];
  const at = th => [SX + RX * Math.cos(th), SY - RY * Math.sin(th)];
  // eğik eksen (uzayda sabit yön: +X yönüne 23,5°) → ekrana izdüşümü
  const AX = [Math.sin(F.TILT), -Math.cos(F.TILT) * CB]; const AN = Math.hypot(AX[0], AX[1]); AX[0] /= AN; AX[1] /= AN;
  function earthAt(ctx, th, o = {}) {
    const [x, y] = at(th);
    P.earth(ctx, x, y, ER);
    const s = Math.sin(th), c = Math.cos(th);
    F.shade(ctx, x, y, ER, -c, s * SB, s * CB, { alpha: 0.6 });
    const L = ER * 1.55; line(ctx, [x - AX[0] * L, y - AX[1] * L], [x + AX[0] * L, y + AX[1] * L], { w: 2.6, dry: false, seed: 700, taper: 0.05 });
    INK.label(ctx, 'K', x + AX[0] * L + 2, y + AX[1] * L - 4, { size: 26, weight: 700 });
  }
  function panel(ctx, t, kind, t0, t1) {
    const k = Math.min(E.se(t, t0, t0 + 0.7), 1 - E.se(t, t1 - 0.5, t1));
    if (k <= 0) return;
    E.layer(ctx, k, c => {
      F.card(c, 1270, 170, 610, 720, { seed: 710 });
      if (kind === 'table') { table(c, t, t0); return; }
      const gx = 1610, gy = 520, gr = 165;
      const tilt = kind === 'june' ? -F.TILT : kind === 'dec' ? F.TILT : 0;
      const title = kind === 'june' ? '21 Haziran' : kind === 'dec' ? '21 Aralık' : '21 Mart · 23 Eylül';
      INK.label(c, title, 1575, 250, { size: 52, weight: 700, align: 'center' });
      F.globe(c, gx, gy, gr, { tilt, sun: -1, night: 0.55, lines: { eq: true, cancer: true, capricorn: true, w: 2.4, eqCol: PAL.ink, cancerCol: '#8A6A45', capCol: '#8A6A45' }, axisK: 1, axisExt: 1.15, poleSize: 28 });
      // dik düşen ışının vurduğu enlem
      const phi = tilt === 0 ? 0 : (tilt < 0 ? F.TILT : -F.TILT);
      const [a, b] = F.latLine(gx, gy, gr, tilt, phi);
      P.drawOn(c, F.dense(a, b, 5), E.se(t, t0 + 1.8, t0 + 2.6), { w: 5, color: F.AMBER, dry: false, seed: 720 });
      const ys = []; for (let yy = gy - 140; yy <= gy + 140; yy += 35) ys.push(yy);
      F.rays(c, 1300, gx, gy, gr, ys, E.se(t, t0 + 0.6, t0 + 1.8));
      if (t > t0 + 1.8) { F.rightMark(c, gx - gr, gy, 16, 1); INK.label(c, 'dik', gx - gr - 60, gy - 22, { size: 32, weight: 700, color: F.AMBER }); }
      INK.label(c, 'Güneş ışınları', 1300, 355, { size: 30, alpha: 0.8 });
      const nm = kind === 'june' ? 'Yengeç Dönencesi' : kind === 'dec' ? 'Oğlak Dönencesi' : 'Ekvator';
      INK.label(c, 'dik ışın: ' + nm, 1575, 782, { size: 36, weight: 700, align: 'center', color: F.AMBER, alpha: E.se(t, t0 + 2.4, t0 + 3.0) });
      const l2 = kind === 'june' ? ['Kuzey: yaz başlar', 'Güney: kış başlar'] : kind === 'dec' ? ['Kuzey: kış başlar', 'Güney: yaz başlar'] : ['gece ≈ gündüz (her yerde)', 'ekinoks'];
      const ck = E.se(t, t0 + 3.4, t0 + 4.2);
      INK.label(c, l2[0], 1575, 828, { size: 36, align: 'center', alpha: ck });
      INK.label(c, l2[1], 1575, 870, { size: 36, align: 'center', alpha: ck });
    });
  }
  const SC = { yaz: F.AMBER, kış: PAL.water, ilkbahar: PAL.life, sonbahar: '#8A6A45' };
  function table(c, t, t0) {
    INK.label(c, 'Mevsim başlangıçları', 1575, 250, { size: 46, weight: 700, align: 'center' });
    INK.label(c, 'Tarih', 1300, 340, { size: 34, weight: 700 });
    INK.label(c, 'Kuzey Y.K.', 1580, 340, { size: 34, weight: 700, align: 'center' });
    INK.label(c, 'Güney Y.K.', 1775, 340, { size: 34, weight: 700, align: 'center' });
    stroke(c, [[1295, 360], [1860, 362]], { w: 2.4, dry: false, seed: 730 });
    stroke(c, [[1480, 300], [1482, 800]], { w: 1.8, dry: false, seed: 731, alpha: 0.6 });
    stroke(c, [[1680, 300], [1682, 800]], { w: 1.8, dry: false, seed: 732, alpha: 0.6 });
    const rows = [['21 Mart', 'ilkbahar', 'sonbahar'], ['21 Haziran', 'yaz', 'kış'], ['23 Eylül', 'sonbahar', 'ilkbahar'], ['21 Aralık', 'kış', 'yaz']];
    rows.forEach((r, i) => {
      const y = 440 + i * 105, k = E.se(t, t0 + 0.6 + i * 0.9, t0 + 1.2 + i * 0.9);
      c.save(); c.globalAlpha *= k;
      INK.label(c, r[0], 1300, y, { size: 36 });
      INK.label(c, r[1], 1580, y, { size: 38, weight: 700, align: 'center', color: SC[r[1]] });
      INK.label(c, r[2], 1775, y, { size: 38, weight: 700, align: 'center', color: SC[r[2]] });
      c.restore();
    });
    INK.label(c, 'Yarım kürelerde mevsimler terstir.', 1575, 862, { size: 34, align: 'center', alpha: E.se(t, t0 + 4.5, t0 + 5.2) });
  }
  E.scene({
    name: 'Dolanma', concept: 'Mevsimlerin oluşumu', from: 'tour', to: 'south', trFrom: [700, 520],
    draw(ctx, t) {
      const st = E.s('tour'), sj = E.s('june'), sd = E.s('dec'), se = E.s('equi'), ss = E.s('south');
      // yörünge
      const ok = E.se(t, st + 0.1, st + 1.2);
      const orb = []; for (let i = 0; i <= 120; i++) orb.push(at(i / 120 * 6.283));
      P.drawOn(ctx, orb, ok, { w: 2.6, dry: false, seed: 740, alpha: 0.85 });
      if (ok > 0.95) { const arr = []; for (let i = 0; i <= 20; i++) arr.push(at(1.5 * Math.PI + 0.2 + i / 20 * 0.6)); stroke(ctx, arr.map(p => [p[0], p[1] + 22]), { w: 3.4, color: F.AMBER, dry: false, seed: 741 }); arrowHead(ctx, [arr[17][0], arr[17][1] + 22], [arr[20][0], arr[20][1] + 22], 16, { w: 3, color: F.AMBER }); }
      // Güneş (arkadaki Dünya'dan önce değil: üstteki konum Güneş'in arkasında, çakışma yok)
      P.sun(ctx, SX, SY, 70, t, { nrays: 16, cells: false });
      // tur sırasında hareketli Dünya
      const tk = E.se(t, st + 0.8, st + 6.2, 'sine');
      const th = tk * 2 * Math.PI;
      POS.forEach((p, i) => {
        const passed = t > st + 6.2 || (tk * 4 >= i && i > 0);
        if (!passed) return;
        const [x, y] = at(p.th);
        const act = (i === 2 && t > sj && t < sd) || (i === 0 && t > sd && t < se) || ((i === 1 || i === 3) && t > se && t < ss) || t > ss;
        if (act) { ctx.save(); ctx.globalAlpha *= 0.9; stroke(ctx, circlePts(x, y, ER + 16, ER + 16, 40), { w: 4, color: F.AMBER, closed: true, dry: false, seed: 750 + i }); ctx.restore(); }
        ctx.save(); ctx.globalAlpha *= (t > st + 6.2 ? 1 : 0.55); earthAt(ctx, p.th); ctx.restore();
        INK.label(ctx, p.d, x + p.lx, y + p.ly, { size: 40, weight: 700, align: p.lx ? 'left' : 'center', alpha: act ? 1 : 0.75 });
      });
      if (t < st + 6.2 && t > st + 0.8) earthAt(ctx, th);
      E.inkText(ctx, 'Eksen hep aynı yöne eğik', 700, 205, t, st + 2.0, sj + 0.5, { size: 42, align: 'center', color: PAL.ink });
      INK.label(ctx, '(çizim ölçekli değildir)', 60, 890, { size: 30, alpha: 0.55 });
      // paneller
      panel(ctx, t, 'june', sj + 0.2, sd + 0.3);
      panel(ctx, t, 'dec', sd + 0.2, se + 0.3);
      panel(ctx, t, 'equi', se + 0.2, ss + 0.3);
      panel(ctx, t, 'table', ss + 0.2, E.e('south') + 2);
      DAMLA.draw(ctx, { x: 1060, y: 905, s: 0.72, view: 'q3', flip: false, expr: 'curious', look: [0.6, -0.6], blink: E.blink(t, 5), squash: E.breath(t), t, seed: 4, arms: [[-1, 0.35], [1, 2.1]] });
    }
  });
})();
