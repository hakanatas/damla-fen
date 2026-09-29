// SAHNE 7 — Kaydet · SAHNE 8 — Sıra sende (afiş / model görevi), sıradaki: santraller, bitiş
(function () {
  const { PAL, stroke, line } = INK;
  const W = W6;
  E.scene({
    name: 'Kaydet', concept: 'Gözlem defterine kayıt', from: 'record', to: 'record', trFrom: [960, 540],
    draw(ctx, t) {
      const sr = E.s('record');
      W.record(ctx, t, sr, 'Gözlem Defteri · Enerji dönüşümü', [
        'Elektrik enerjisi ısı, ışık, ses, harekete dönüşür.',
        'Isı: ütü, su ısıtıcısı  ·  Işık: ampul, el feneri',
        'Ses: hoparlör, zil  ·  Hareket: vantilatör, mikser',
        'Bir alet birden fazla dönüşüm yapabilir.',
        'Akım geçen tel ısınır: akımın ısı etkisi.',
        'Model, yeni kayıtlarla yenilenir.'
      ], { step: 1.25, size: 42 });
      W.damla(ctx, t, { x: 1620, y: 880, s: 0.95, flip: true, expr: 'happy', look: [-0.7, 0.3], arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook', seed: 9 });
    }
  });
  E.scene({
    name: 'Görev ve sıradaki', concept: 'Afiş/model görevi; sıradaki film', from: 'task', to: 'end', trFrom: [960, 540],
    draw(ctx, t) {
      const sk = E.s('task'), sn = E.s('next'), se = E.s('end');
      // akşam manzarası: evden uzaklara uzanan elektrik hattı
      const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(46,70,110,0.26)'); g.addColorStop(0.7, 'rgba(227,150,70,0.16)'); g.addColorStop(1, 'rgba(227,150,70,0.06)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      const hill = P.hillLine(E.W, 930);
      P.landscape(ctx, E.W, E.H, t, { hill, tree: false });
      W.house(ctx, 180, P.hillY(hill, 300) + 10, 240, 170, { lights: [1, 0.8, 0.9, 1] });
      // direkler ve hat
      const poles = [620, 960, 1300, 1640].map(x => [x, P.hillY(hill, x) + 6]);
      poles.forEach(([x, y], i) => { line(ctx, [x, y], [x, y - 330], { w: 5, seed: 5400 + i }); line(ctx, [x - 50, y - 300], [x + 50, y - 300], { w: 4, dry: false }); });
      const wires = [[420, P.hillY(hill, 300) - 150]].concat(poles.map(([x, y]) => [x - 40, y - 300]), [[1900, 400]]);
      for (let i = 0; i < wires.length - 1; i++) stroke(ctx, P.bez(wires[i], [(wires[i][0] + wires[i + 1][0]) / 2, Math.max(wires[i][1], wires[i + 1][1]) + 30], wires[i + 1], 20), { w: 2, dry: false });
      W.damla(ctx, t, { x: 820, y: P.hillY(hill, 820) + 4, s: 0.85, expr: 'curious', look: [0.8, -0.5], arms: [[-1, 0.35], [1, 2.3]], seed: 10 });
      W.task(ctx, t, sk, sn, 'Sıra sende!', [
        'Evindeki elektrikli aletleri listele.',
        'Isı · ışık · ses · hareket gruplarına ayır.',
        'Afiş hazırla ya da kendi dönüşüm modelini tasarla.',
        'Modelini yeni gözlemlerine göre yenile.'
      ], { x: 330, y: 170, w: 1260, h: 460, size: 42, extra: c => { W.sym(c, 'isi', 1440, 300, 1.2, t); W.sym(c, 'isik', 1500, 300, 1.2); W.sym(c, 'ses', 1440, 360, 1.2); W.sym(c, 'hareket', 1505, 362, 1.2, t); } });
      W.next(ctx, t, sn + 0.2, se, 'Elektrik Üretim Santralleri', c => {
        W.card(c, 1160, 410, 600, 380, { seed: 5410, tint: PAL.water, tintA: 0.12 });
        c.save(); c.beginPath(); c.rect(1164, 414, 596, 374); c.clip();
        W.ground(c, 1160, 1764, 740, 60, PAL.life, 5411);
        W.tower(c, 1300, 740, 0.75, t, 1);
        W.wind(c, 1560, 740, 250, t, 1); W.wind(c, 1690, 740, 190, t + 0.4, 1);
        c.restore();
      });
      W.end(ctx, t, '21 · Elektrik Enerjisi Neye Dönüşür?', 'FB.8.6.6 · FB.8.6.7');
    }
  });
})();
