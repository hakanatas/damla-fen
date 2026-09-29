// SAHNE 6 — Kişisel davranışların payı (SDB3.3) + vatandaş ve kamu kurumlarının görevi (OB6)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const RED = W7.RED;
  function townHall(ctx, x, y, s) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = [[-150, 0], [-150, -150], [150, -150], [150, 0], [-150, 0]];
    P.fillPts(ctx, b, PAL.white); wash(ctx, b, '#C9A46A', 0.45, 900); stroke(ctx, b, { w: 3, closed: true, seed: 901 });
    const roof = [[-170, -150], [0, -230], [170, -150], [-170, -150]]; P.fillPts(ctx, roof, PAL.white); wash(ctx, roof, '#8A6A45', 0.5, 902); stroke(ctx, roof, { w: 3, closed: true, seed: 903 });
    for (let i = 0; i < 5; i++) { const cx = -110 + i * 55; line(ctx, [cx, -140], [cx, -10], { w: 7, color: '#8A6A45', taper: 0.02, seed: 904 + i }); }
    const door = [[-24, 0], [-24, -60], [24, -60], [24, 0]]; P.fillPts(ctx, door.concat([door[0]]), '#6B4A2A', 0.7); stroke(ctx, door, { w: 2.4 });
    ctx.restore();
  }
  function truck(ctx, x, y, s, t) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const body = [[-150, -20], [-150, -130], [40, -130], [40, -20], [-150, -20]];
    P.fillPts(ctx, body, PAL.white); wash(ctx, body, '#4F8A45', 0.6, 910); stroke(ctx, body, { w: 3, closed: true, seed: 911 });
    const cab = [[40, -20], [40, -100], [100, -100], [130, -60], [130, -20], [40, -20]];
    P.fillPts(ctx, cab, PAL.white); wash(ctx, cab, '#8E8E8E', 0.5, 912); stroke(ctx, cab, { w: 3, closed: true, seed: 913 });
    P.fillPts(ctx, [[56, -90], [96, -90], [118, -62], [56, -62]], '#BFD6E2', 0.9);
    W7.recycle(ctx, -55, -75, 30, 1, { color: PAL.white, w: 7 });
    [-110, 0, 90].forEach(dx => { P.fillPts(ctx, circlePts(dx, -16, 22, 22, 20), PAL.ink); P.fillPts(ctx, circlePts(dx, -16, 8, 8, 12), '#8E8E8E'); });
    ctx.restore();
  }
  E.scene({
    name: 'Benim payım', concept: 'Kişisel davranışlar ve ortak görev', from: 'me', to: 'duty', trFrom: [960, 540],
    draw(ctx, t) {
      const sm = E.s('me'), sh = E.s('habits'), sd = E.s('duty');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      const pageA = 1 - E.se(t, sd - 0.2, sd + 0.6);
      if (pageA > 0) E.layer(ctx, pageA, c => {
        P.notebook(c, 150, 70, 1620, 840);
        P.write(c, 'Benim davranışlarım', 1180, 170, E.seg(t, sm + 0.4, sm + 1.6), { size: 62, align: 'center' });
        const hk = E.se(t, sm + 2.0, sm + 2.8);
        if (hk > 0) {
          c.save(); c.globalAlpha *= hk;
          INK.label(c, 'önce', 560, 290, { size: 44, weight: 700, align: 'center', alpha: 0.75 });
          INK.label(c, 'artık', 1360, 290, { size: 44, weight: 700, align: 'center', color: '#3F7A3A' });
          line(c, [260, 312], [1700, 308], { w: 2.4, dry: false }); line(c, [980, 250], [982, 760], { w: 2.4, dry: false });
          c.restore();
        }
        const ROWS = [
          { a: 'kâğıdın tek yüzünü kullanıp atıyordum', b: 'iki yüzünü de kullanıyorum', at: sh + 0.3, bt: sh + 3.6 },
          { a: 'atıkları karıştırıp çöpe atıyordum', b: 'atıkları ayrıştırıyorum', at: sh + 5.2, bt: sh + 7.0 }
        ];
        ROWS.forEach((r, i) => {
          const y = 430 + i * 200;
          if (t > r.at) { P.write(c, r.a, 320, y, E.seg(t, r.at, r.at + 1.4), { size: 36 }); P.cross(c, 285, y - 12, 18, E.se(t, r.at + 1.4, r.at + 1.9), { w: 5, color: RED }); }
          if (t > r.bt) { P.write(c, r.b, 1075, y, E.seg(t, r.bt, r.bt + 1.2), { size: 42, color: '#3F7A3A' }); P.check(c, 1045, y - 14, 40, E.se(t, r.bt + 1.2, r.bt + 1.7), { w: 6, color: '#3F7A3A' }); }
          if (t > r.bt - 0.4) P.arrow(c, [935, y - 12], [1000, y - 12], E.se(t, r.bt - 0.4, r.bt), { w: 3, head: 12 });
        });
        if (t > sh + 1.2) W7.item(c, 'gazete', 560, 520, 0.7 * P.pop(E.se(t, sh + 1.2, sh + 1.8, 'out')), -0.1);
      });
      // ortak görev
      const dk = E.se(t, sd + 0.1, sd + 0.8);
      if (dk > 0) E.layer(ctx, dk, c => {
        const hill = P.hillLine(E.W, 770); const HY = x => P.hillY(hill, x);
        P.landscape(c, E.W, E.H, t, { hill, tree: false });
        P.write(c, 'Ortak görev', 1180, 175, E.seg(t, sd + 0.4, sd + 1.4), { size: 62, align: 'center' });
        townHall(c, 420, HY(420) + 12, 0.9);
        P.write(c, 'belediye, kurumlar', 420, HY(420) + 70, E.seg(t, sd + 0.8, sd + 1.8), { size: 42, align: 'center' });
        const tr = E.se(t, sd + 1.6, sd + 4.0);
        truck(c, E.lerp(-200, 830, tr), 890, 0.8, t);
        ['mavi', 'sari', 'yesil', 'gri'].forEach((k, i) => W7.bin(c, k, 1180 + i * 110, HY(1180 + i * 110) + 8, 0.5 * P.pop(E.se(t, sd + 0.8 + i * 0.15, sd + 1.3 + i * 0.15, 'out'))));
        P.write(c, 'kutuları koyar, atıkları toplar', 420, HY(420) + 118, E.seg(t, sd + 2.2, sd + 3.4), { size: 36, align: 'center', weight: 400 });
        P.write(c, 'vatandaşlar doğru ayrıştırır', 1360, 330, E.seg(t, sd + 4.0, sd + 5.2), { size: 40, align: 'center' });
        // ayrıştırılan atık kutuya
        const f = E.seg(t, sd + 4.6, sd + 5.6);
        if (f > 0 && f < 1) W7.item(c, 'plastikSise', E.lerp(1640, 1290, f), E.lerp(HY(1640) - 180, HY(1290) - 110, f) - Math.sin(f * Math.PI) * 90, 0.5, f * 3);
        const hk = E.se(t, sd + 6.0, sd + 6.8, 'out');
        if (hk > 0) {
          P.arrow(c, [600, 470], [800, 505], hk, { w: 5, head: 18, color: '#3F7A3A', bend: 40 });
          P.arrow(c, [1250, 470], [1120, 505], hk, { w: 5, head: 18, color: '#3F7A3A', bend: 40 });
          P.write(c, 'hepimizin görevi', 960, 590, E.seg(t, sd + 6.4, sd + 7.6), { size: 52, align: 'center', color: '#3F7A3A' });
        }
      });
      // Damla
      if (t < sd) DAMLA.draw(ctx, { x: 1740, y: 1075, s: 0.95, view: 'q3', flip: true, expr: t < sh ? 'thinking' : 'determined', look: [-0.7, -0.4], blink: E.blink(t, 4), squash: E.breath(t), t, talk: E.talk(t), seed: 2, prop: 'notebook', arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]] });
      else DAMLA.draw(ctx, { x: 1690, y: P.hillY(P.hillLine(E.W, 770), 1690) + 4, s: 1.0, view: 'q3', flip: true, expr: 'happy', look: [-0.8, 0], blink: E.blink(t, 4), squash: E.breath(t), t, talk: E.talk(t), seed: 2, arms: [[-1, 0.4], [1, E.lerp(0.4, 1.9, E.se(t, sd + 4.2, sd + 4.6)) - 1.5 * E.se(t, sd + 4.6, sd + 5.0)]] });
    }
  });
})();
