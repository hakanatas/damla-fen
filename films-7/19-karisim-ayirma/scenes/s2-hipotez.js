// SAHNE 2 — Kart çekme · hipotez (süzme) · test · hipotez doğrulanmadı → yeni yöntem (a: deney tasarlar; SDB3.1)
(function () {
  const { PAL, line, stroke, circlePts, rng } = INK;
  const K = K7;
  const SLIPS = ['kum + su', 'tuz + su', 'zeytinyağı + su', 'etil alkol + su', 'kepek + un', 'odun talaşı + su'];
  function cardsPart(ctx, t) {
    const sc = E.s('cards'), sd = E.s('draw');
    SLIPS.forEach((n, i) => {
      const at = sc + 0.8 + i * 1.0, k = E.se(t, at, at + 0.5, 'out'); if (k <= 0) return;
      const pick = i === 1 ? E.se(t, sd + 0.2, sd + 1.2) : 0;
      const x0 = 330 + (i % 3) * 470, y0 = 300 + Math.floor(i / 3) * 190;
      const x = E.lerp(x0, 760, pick), y = E.lerp(y0, 380, pick), s = 1 + 0.35 * pick;
      const fade = i === 1 ? 1 : 1 - 0.9 * E.se(t, sd + 0.2, sd + 1.0);
      E.layer(ctx, k * fade, c => {
        c.save(); c.translate(x, y); c.scale(s, s); c.rotate((i % 2 ? 0.03 : -0.025) * (1 - pick));
        K.card(c, -190, -60, 380, 120, { seed: 7100 + i, tint: i === 1 && pick > 0.5 ? PAL.light : null, tintA: 0.3 });
        INK.label(c, n, 0, 16, { size: 46, weight: 700, align: 'center', rot: 0 });
        c.restore();
      });
    });
    const hk = E.se(t, sd + 1.4, sd + 2.0);
    if (hk > 0) E.layer(ctx, hk, c => {
      K.card(c, 1060, 300, 700, 200, { seed: 7120 });
      P.write(c, 'Hipotez:', 1100, 370, E.seg(t, sd + 1.6, sd + 2.2), { size: 46, color: K.AMBER });
      P.write(c, 'Süzersem tuzu sudan ayırırım.', 1100, 450, E.seg(t, sd + 2.2, sd + 3.4), { size: 46 });
    });
  }
  function testPart(ctx, t) {
    const st = E.s('test'), sf = E.s('fail');
    K.bench(ctx, -40, 1960, 860, 7130);
    // halka + huni + beher
    line(ctx, [760, 860], [760, 300], { w: 8, color: '#6B6460', taper: 0.02 }); line(ctx, [760, 420], [880, 420], { w: 5, color: '#6B6460', taper: 0.02 });
    const pour = E.se(t, st + 0.4, st + 4.0);
    K.funnel(ctx, 960, 400, 1.2, { fill: 0.6 * Math.sin(pour * Math.PI) });
    K.beaker(ctx, 960, 860, 220, 220, { level: 0.1 + 0.5 * pour, t, seed: 40 });
    // dökülen beher
    if (pour > 0 && pour < 1) { ctx.save(); ctx.translate(1130, 330); ctx.rotate(-0.9 * Math.sin(Math.min(1, pour * 1.3) * Math.PI / 2)); K.beaker(ctx, 0, 0, 120, 140, { level: 0.5 * (1 - pour), t, seed: 41 }); ctx.restore(); }
    // damlalar
    if (pour > 0.05 && pour < 0.95) for (let i = 0; i < 4; i++) { const u = ((t * 1.8 + i / 4) % 1); ctx.save(); ctx.fillStyle = 'rgba(46,106,140,0.6)'; ctx.beginPath(); ctx.ellipse(960, 640 + u * 70, 4, 7, 0, 0, 7); ctx.fill(); ctx.restore(); }
    // büyüteç: kâğıt temiz
    const lk = E.se(t, st + 4.4, st + 5.2);
    if (lk > 0) E.layer(ctx, lk, c => {
      stroke(c, circlePts(1330, 460, 90, 90, 40), { w: 5, closed: true, seed: 7140 }); line(c, [1394, 524], [1450, 580], { w: 12, taper: 0.02 });
      INK.leader(c, [1250, 470], [1040, 500], { bend: 0.1 });
      P.write(c, 'süzgeç kâğıdında tuz yok', 1250, 640, E.seg(t, st + 5.2, st + 6.2), { size: 42 });
      P.write(c, 'tuz çözündü, kâğıttan geçti', 1250, 710, E.seg(t, st + 6.4, st + 7.6), { size: 42, color: K.AMBER });
    });
    // sonuç
    const fk = E.se(t, sf + 0.2, sf + 0.8);
    if (fk > 0) E.layer(ctx, fk, c => {
      K.card(c, 1250, 180, 560, 130, { seed: 7150 });
      P.write(c, 'Hipotez doğrulanmadı', 1300, 262, E.seg(t, sf + 0.3, sf + 1.2), { size: 46, color: K.RED });
      P.write(c, '→ yeni yöntem dene!', 1300, 800, E.seg(t, sf + 2.0, sf + 3.0), { size: 50, color: PAL.water });
    });
    F19.damla(ctx, t, { x: 330, y: 860, s: 1.25, look: [0.8, -0.3], expr: t > sf ? (t > sf + 2 ? 'determined' : 'sad') : 'curious', arms: [[-1, 0.35], [1, t > sf + 2 ? 2.3 : 1.2]] });
  }
  E.scene({
    name: 'Kart ve hipotez', concept: 'Karışım seç, hipotez kur', from: 'cards', to: 'draw', trFrom: [960, 450],
    draw(ctx, t) { cardsPart(ctx, t); F19.damla(ctx, t, { x: 230, y: 900, s: 0.95, look: [0.8, -0.3], expr: 'curious', arms: [[-1, 0.35], [1, 1.4]] }); }
  });
  E.scene({
    name: 'Süzme testi', concept: 'Hipotezi test etme', from: 'test', to: 'fail', trFrom: [960, 500],
    draw(ctx, t) { testPart(ctx, t); }
  });
})();
