// SAHNE 6 — Kaydet · Sıra sende (enerji dedektifi) · Sıradaki: fotosentez · bitiş
(function () {
  const { PAL, stroke, line } = INK;
  const W = W6, D = D23;
  E.scene({
    name: 'Kaydet', concept: 'Gözlem defterine kayıt', from: 'record', to: 'record', trFrom: [960, 540],
    draw(ctx, t) {
      const sr = E.s('record');
      W.record(ctx, t, sr, 'Gözlem Defteri · Tasarruf', [
        'Boş odada ışığı kapat; gün ışığından yararlan.',
        'LED ampul, akkordan çok daha az enerji harcar.',
        'Bekleme modu da elektrik harcar: fişi çek.',
        'Enerji etiketinde A sınıfı daha verimlidir.',
        'Tasarruf, karanlıkta oturmak değil; israf etmemektir.',
        'Aile ve ülke ekonomisine, doğaya katkı sağlar.'
      ], { step: 1.1, size: 42 });
      W.damla(ctx, t, { x: 1640, y: 880, s: 0.9, flip: true, expr: 'happy', look: [-0.7, 0.3], arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook', seed: 9 });
    }
  });
  E.scene({
    name: 'Görev ve sıradaki', concept: 'Enerji dedektifi görevi; sıradaki film', from: 'task', to: 'end', trFrom: [960, 540],
    draw(ctx, t) {
      const sk = E.s('task'), sn = E.s('next'), se = E.s('end');
      const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(227,160,58,0.16)'); g.addColorStop(1, 'rgba(111,138,58,0.08)'); ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      const hill = P.hillLine(E.W, 930);
      P.sun(ctx, 1800, 170, 70, t, { nrays: 18 });
      P.landscape(ctx, E.W, E.H, t, { hill, treeAt: [1830, P.hillY(hill, 1830) + 6] });
      W.house(ctx, 180, P.hillY(hill, 300) + 10, 240, 170, { lights: [0, 0, 0, 0] });
      W.damla(ctx, t, { x: 820, y: P.hillY(hill, 820) + 4, s: 0.85, expr: 'happy', look: [0.7, -0.5], arms: [[-1, 0.35], [1, 2.3]], seed: 10 });
      W.task(ctx, t, sk, sn, 'Sıra sende!', [
        'Bir hafta ailenle enerji dedektifi ol.',
        'Boşuna yanan lambaları ve bekleme modundaki aletleri not et.',
        'Evdeki aletlerin enerji etiketlerine bak.',
        'Ailenle birlikte bir tasarruf planı hazırlayın.'
      ], { x: 300, y: 170, w: 1320, h: 460, size: 40, extra: c => { P.icon.magnifier(c, 1480, 280, 0.7); } });
      W.next(ctx, t, sn + 0.2, se, 'Fotosentez', c => {
        W.card(c, 1160, 410, 560, 380, { seed: 7500, tint: PAL.life, tintA: 0.12 });
        c.save(); c.beginPath(); c.rect(1164, 414, 552, 372); c.clip();
        P.sun(c, 1640, 480, 50, t, { nrays: 12, cells: false });
        W.ground(c, 1160, 1720, 740, 60, '#8A6A45', 7501);
        D.plant(c, 1380, 740, 1.1, t);
        for (let i = 0; i < 3; i++) W.flow(c, [1600 - i * 20, 520 + i * 20], [1480 - i * 20, 600 + i * 20], 1, { w: 3, color: W.SUB, head: 12 });
        c.restore();
      });
      W.end(ctx, t, '23 · Elektriği Bilinçli Kullanalım', 'FB.8.6.10');
    }
  });
})();
