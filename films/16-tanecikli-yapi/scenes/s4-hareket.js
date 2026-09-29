// SAHNE 4 — Taneciklerin üç hareketi: titreşim, dönme, öteleme (anahtar kavramlar; OB4 model ile inceleme)
(function () {
  const { PAL, line, stroke, circlePts, dashed, arrowHead } = INK;
  const F = F16;
  const CARDS = [
    { id: 'vib', x: 360, title: 'titreşim', sub: 'olduğu yerde ileri geri' },
    { id: 'rot', x: 960, title: 'dönme', sub: 'kendi etrafında döner' },
    { id: 'trans', x: 1560, title: 'öteleme', sub: 'yer değiştirir' }
  ];
  function demo(ctx, id, cx, cy, t) {
    const r = 46;
    if (id === 'vib') {
      const dx = Math.sin(t * 16) * 14;
      ctx.save(); ctx.globalAlpha = 0.35; [-16, 16].forEach(o => dashed(ctx, circlePts(cx + o, cy, r, r, 40), { w: 2, on: 8, off: 7 })); ctx.restore();
      F.particle(ctx, cx + dx, cy, r, -0.9, {});
      [-1, 1].forEach(sd => { for (let i = 0; i < 2; i++) stroke(ctx, P.arc(cx + sd * (r + 26 + i * 16), cy, 26 + i * 8, sd > 0 ? -0.7 : Math.PI - 0.7, sd > 0 ? 0.7 : Math.PI + 0.7, 14), { w: 2.6, dry: false, alpha: 0.7 }); });
    } else if (id === 'rot') {
      const a = t * 3.2;
      F.particle(ctx, cx, cy, r, a, {});
      const arc = P.arc(cx, cy, r + 34, a * 0.4 + 0.2, a * 0.4 + 0.2 + 4.6, 40); stroke(ctx, arc, { w: 3.4, color: PAL.water }); arrowHead(ctx, arc[37], arc[40], 15, { w: 3.2, color: PAL.water });
    } else {
      const per = 3.2, u = ((t % per) / per), x0 = cx - 180, x1 = cx + 180;
      const path = P.bez([x0, cy + 40], [cx, cy - 110], [x1, cy + 30], 40);
      const i = Math.min(40, Math.floor(E.ease.io(u) * 40)); const p = path[i];
      ctx.save(); ctx.globalAlpha = 0.6; dashed(ctx, path.slice(0, i + 1), { w: 2.6, on: 10, off: 8, color: PAL.water }); ctx.restore();
      ctx.save(); ctx.globalAlpha = 0.25; F.particle(ctx, x0, cy + 40, r * 0.8, 0, { mark: false }); ctx.restore();
      F.particle(ctx, p[0], p[1], r * 0.8, t * 2, {});
      stroke(ctx, [[x0 + 20, cy + 120], [x1 - 20, cy + 120]], { w: 3, dry: false }); arrowHead(ctx, [x1 - 60, cy + 120], [x1 - 20, cy + 120], 16, { w: 3 });
    }
  }
  E.scene({
    name: 'Üç hareket', concept: 'Titreşim, dönme, öteleme', from: 'vib', to: 'trans', trFrom: [360, 520],
    draw(ctx, t) {
      ctx.fillStyle = 'rgba(46,106,140,0.06)'; ctx.fillRect(0, 0, E.W, E.H);
      P.write(ctx, 'Taneciklerin hareketleri', 960, 215, E.seg(t, E.s('vib') + 0.1, E.s('vib') + 1.3), { size: 60, align: 'center' });
      const active = t < E.s('rot') ? 0 : t < E.s('trans') ? 1 : 2;
      CARDS.forEach((c, i) => {
        const s0 = E.s(c.id), k = E.se(t, s0 + 0.1, s0 + 0.8, 'out'); if (k <= 0) return;
        const on = i === active;
        E.layer(ctx, on ? 1 : 0.6, cc => {
          cc.save(); cc.translate(c.x, 540); cc.scale(P.pop(k), P.pop(k)); cc.translate(-c.x, -540);
          F.card(cc, c.x, 540, 500, 560, { seed: 150 + i });
          if (on) stroke(cc, INK.wobble([[c.x - 262, 272], [c.x + 262, 268], [c.x + 264, 812], [c.x - 260, 810], [c.x - 262, 272]].flatMap((p, j, a) => j < 4 ? [p, [(p[0] + a[j + 1][0]) / 2, (p[1] + a[j + 1][1]) / 2]] : [p]), 2, 160 + i), { w: 5, closed: true, color: PAL.water, seed: 161 });
          INK.label(cc, c.title, c.x, 350, { size: 66, weight: 700, align: 'center' });
          demo(cc, c.id, c.x, 540, t);
          INK.label(cc, c.sub, c.x, 760, { size: 38, align: 'center', alpha: 0.85 });
          cc.restore();
        });
      });
    }
  });
})();
