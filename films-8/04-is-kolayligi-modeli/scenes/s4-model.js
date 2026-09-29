// SAHNE 4 — Model öner → test et → yeni kanıt → yenile (3 sürüm) · karşılaştırma · bileşik makine · işten kazanç yok
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F8M;
  const FY = 880, SLAB = 190;
  function slab(ctx) {
    const s = F.rect(150, SLAB, 1210, SLAB + 28); P.fillPts(ctx, s, '#D9D4CA'); wash(ctx, s, '#6F6A60', 0.4, 4300, { bleed: 1 }); stroke(ctx, s, { w: 3, closed: true, seed: 4301 });
    F.txt(ctx, 'balkon', 1150, SLAB - 16, { size: 34, align: 'right', alpha: 0.7 });
  }
  function version(t) { if (t < E.s('v2')) return 1; if (t < E.s('v3')) return 2; return 3; }
  function sackHang(ctx, x, topY, seed) { F04.sack(ctx, x, topY + 96, 1, seed); }

  function rig(ctx, t) {
    const v = version(t);
    slab(ctx); F.floor(ctx, FY, 21);
    let hand = null, reading = null;
    if (v === 1) {
      const s = E.s('v1'), h = 120 * E.se(t, s + 2.0, s + 5.0) ;
      const fx = 720, fy = 300, r = 50;
      line(ctx, [fx, SLAB + 28], [fx, fy - r - 4], { w: 4, dry: false });
      const sackTop = FY - 96 - h, dy = 420 + h;
      F.rope(ctx, [fx - r, fy], [fx - r, sackTop]); F.ropeArc(ctx, fx, fy, r, Math.PI, 2 * Math.PI); F.rope(ctx, [fx + r, fy], [fx + r, dy]);
      F.pulley(ctx, fx, fy, r, h / r, { seed: 4310 });
      sackHang(ctx, fx - r, sackTop, 4311);
      reading = 10 * E.se(t, s + 1.0, s + 2.0);
      hand = F.dyn(ctx, fx + r, dy, reading, { L: 150, W: 44 });
    } else {
      const is3 = v === 3;
      const s = E.s(is3 ? 'v3' : 'v2');
      const fx = 760, fy = 300, r = 45, mx = 670;
      let h, th = 0;
      if (!is3) h = 100 * E.se(t, s + 2.0, s + 5.0);
      else { th = E.se(t, E.s('test3') + 0.2, E.s('work') + 4, 'io') * 6.6; h = 30 * th / 2; }
      const py = 685 - h;
      line(ctx, [fx, SLAB + 28], [fx, fy - r - 4], { w: 4, dry: false });
      F.rope(ctx, [mx - r, SLAB + 28], [mx - r, py]); F.ropeArc(ctx, mx, py, r, 0, Math.PI);
      F.rope(ctx, [mx + r, py], [fx - r, fy]); F.ropeArc(ctx, fx, fy, r, Math.PI, 2 * Math.PI);
      F.pulley(ctx, fx, fy, r, 2 * h / r, { seed: 4320 }); F.pulley(ctx, mx, py, r, -h / r, { seed: 4321 });
      const sy = F.strap(ctx, mx, py, r, 1, 10); const hy = F.hook(ctx, mx, sy, 1) - 4; sackHang(ctx, mx, hy, 4322);
      if (!is3) {
        const dy = 360 + 2 * h; F.rope(ctx, [fx + r, fy], [fx + r, dy]);
        reading = 6 * E.se(t, s + 1.0, s + 2.0);
        hand = F.dyn(ctx, fx + r, dy, reading, { L: 150, W: 44 });
      } else {
        // çıkrık: tambur (r=30) ipi sarar; kol = 3 × tambur yarıçapı
        const dr = 30, R = 90, cx = fx + r + dr, cy = 760;
        F.rope(ctx, [fx + r, fy], [fx + r, cy]);
        line(ctx, [cx, cy], [cx - 50, FY], { w: 6, seed: 4330 }); line(ctx, [cx, cy], [cx + 50, FY], { w: 6, seed: 4331 });
        const drum = circlePts(cx, cy, dr, dr, 30); P.fillPts(ctx, drum, '#E8D2A8'); wash(ctx, drum, F.WOOD, 0.5, 4332, { bleed: 1 }); stroke(ctx, drum, { w: 3, closed: true, seed: 4333 });
        INK.dashed(ctx, circlePts(cx, cy, R, R, 160), { w: 2, on: 8, off: 7, color: F.PATH });
        const a = -th - 0.6; const hx = cx + Math.cos(a) * R, hyy = cy + Math.sin(a) * R;
        line(ctx, [cx, cy], [hx, hyy], { w: 7, seed: 4334 }); P.fillPts(ctx, circlePts(hx, hyy, 12, 12, 16), F.FORCE, 0.9);
        hand = [hx, hyy];
        const kl = E.se(t, s + 1.2, s + 2.0);
        if (kl > 0) { ctx.save(); ctx.globalAlpha *= kl; F.txt(ctx, 'çıkrık', 1010, 450, { size: 40 }); F.txt(ctx, 'kol = 3 × mil', 1010, 500, { size: 34, color: F.PATH }); INK.leader(ctx, [1040, 520], [cx + 8, cy - 12], { w: 2, bend: 0.15 }); ctx.restore(); }
      }
    }
    return { v, hand, reading };
  }

  const ROWS = [
    { at: 'test1', name: '1 · sabit makara', val: '≈ 10 N', ok: false, note: 'yön değişti, kuvvet aynı' },
    { at: 'test2', name: '2 · makara sistemi', val: '≈ 6 N', ok: false, note: 'hâlâ 5 N’dan fazla' },
    { at: 'test3', name: '3 · makara sistemi + çıkrık', val: '≈ 2 N', ok: true, note: 'ölçüt karşılandı' }
  ];
  function panel(ctx, t) {
    const k0 = E.se(t, E.s('test1'), E.s('test1') + 0.6);
    if (k0 <= 0) return;
    ctx.save(); ctx.globalAlpha *= k0;
    F.card(ctx, 1280, 160, 1880, 640, { seed: 4340 });
    F.txt(ctx, 'Test günlüğü (yük 10 N)', 1310, 222, { size: 40, color: F.FORCE });
    ROWS.forEach((r, i) => {
      const s = E.s(r.at), k = E.se(t, s + 0.8, s + 1.6); if (k <= 0) return;
      const y = 300 + i * 115;
      P.write(ctx, r.name, 1310, y, k, { size: 36 });
      P.write(ctx, r.val, 1310, y + 48, k, { size: 36, color: PAL.water });
      const km = E.se(t, s + 2.2, s + 2.8);
      if (r.ok) P.check(ctx, 1500, y + 36, 40, km, { w: 6, color: PAL.life }); else P.cross(ctx, 1490, y + 36, 16, km, { w: 5, color: F.RED });
      if (km > 0) { ctx.save(); ctx.globalAlpha *= km; F.txt(ctx, r.note, 1540, y + 48, { size: 30, alpha: 0.85, color: r.ok ? PAL.life : F.RED }); ctx.restore(); }
    });
    ctx.restore();
    // yeni kanıt etiketi
    const se = E.s('evidence'), ke = E.se(t, se + 0.3, se + 1.0) * (1 - E.se(t, E.s('v2') - 0.3, E.s('v2') + 0.2));
    if (ke > 0) { ctx.save(); ctx.globalAlpha *= ke; F.tag(ctx, 'Yeni kanıt → modeli yenile!', 1580, 720, { size: 42, color: F.RED, seed: 4350 }); ctx.restore(); }
    // arkadaşın modeli (karşılaştırma)
    const sp = E.s('peers'), kp = E.se(t, sp + 0.3, sp + 1.0) * (1 - E.se(t, E.s('work') - 0.2, E.s('work') + 0.4));
    if (kp > 0) E.layer(ctx, kp, c => {
      F.card(c, 1280, 670, 1880, 890, { seed: 4360, fill: '#EEF3F4' });
      F.icon.well(c, 1390, 860, 1.0);
      F.txt(c, 'Arkadaşımın modeli:', 1510, 730, { size: 34 });
      F.txt(c, 'çıkrık', 1510, 780, { size: 38, color: F.FORCE });
      F.txt(c, '≈ 4 N: daha az kuvvet', 1510, 836, { size: 32, color: PAL.water });
    });
    // işten kazanç yok
    const sw = E.s('work'), kw = E.se(t, sw + 0.3, sw + 1.0);
    if (kw > 0) E.layer(ctx, kw, c => {
      F.card(c, 1280, 670, 1880, 890, { seed: 4370, fill: '#F6E7B8' });
      F.txt(c, 'İşten kazanç yok!', 1580, 730, { size: 44, align: 'center', color: F.FORCE });
      F.txt(c, 'kuvvet ↓  ·  kolun yolu ↑', 1580, 790, { size: 36, align: 'center' });
      F.txt(c, 'sürtünme: biraz fazla iş (ısı)', 1580, 846, { size: 32, align: 'center', color: '#B5553F' });
    });
  }

  function miniActive(t) {
    const m = [['v1', [2, 3]], ['test1', [4]], ['evidence', [5]], ['v2', [5, 3]], ['test2', [4]], ['peers', [6]], ['v3', [5, 3]], ['test3', [4]]];
    let a = [2]; m.forEach(([id, v]) => { if (t >= E.s(id)) a = v; }); return a;
  }

  E.scene({
    name: 'Model ve test', concept: 'Model öner, test et, kanıta göre yenile', from: 'v1', to: 'work', trFrom: [720, 300],
    draw(ctx, t) {
      const R = rig(ctx, t);
      // Damla: ipi / dinamometreyi çeker ya da çıkrığı çevirir
      const v = R.v, s = 1.1;
      const dx = v === 1 ? 880 : v === 2 ? 915 : 990, flip = true;
      const loc = R.hand ? [-(R.hand[0] - dx) / s, (R.hand[1] - FY) / s] : [-40, -150];
      const good = t > E.s('test3') + 2;
      const expr = (t > E.s('evidence') && t < E.s('v2')) || (t > E.s('test2') + 2 && t < E.s('v3')) ? 'thinking' : (good ? 'happy' : 'determined');
      DAMLA.draw(ctx, { x: dx, y: FY, s, view: 'q3', flip, expr, look: [-0.7, -0.3], blink: E.blink(t, 6), squash: E.breath(t), t, seed: 1, lean: -0.06, arms: [[-1, loc], [1, [loc[0] + 12, loc[1] + 16]]] });
      panel(ctx, t);
      F04.mini(ctx, miniActive(t), 1);
      // model numarası
      const lab = v === 1 ? 'Model 1' : v === 2 ? 'Model 2' : 'Model 3';
      F.txt(ctx, lab, 200, 300, { size: 52, color: F.FORCE });
    }
  });
})();
