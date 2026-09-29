// SAHNE 3 — Su döngüsü şeması: süreçler oklarla; nitelikler (başı-sonu yok, madde yok olmaz, hâl/yer değişir)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const U = U7;
  const N = { deniz: [360, 760], buhar: [360, 330], bulut: [1040, 330], kara: [1040, 760] };
  function node(ctx, key, name, sub, k, t) {
    if (k <= 0) return; const [x, y] = N[key];
    ctx.save(); ctx.globalAlpha *= k;
    U.card(ctx, x - 160, y - 70, 320, 140, { tint: key === 'kara' ? PAL.life : PAL.water, tintA: 0.14, seed: 2700 + name.length });
    U.fit(ctx, name, x, y - 4, 290, 44);
    U.txt(ctx, sub, x, y + 44, { size: 32, align: 'center', color: PAL.water, weight: 400 });
    ctx.restore();
  }
  E.scene({
    name: 'Şema', concept: 'Su döngüsü şeması ve nitelikleri', from: 'schema', to: 'traits', trFrom: [960, 540],
    draw(ctx, t) {
      const s0 = E.s('schema'), s1 = E.s('traits');
      ctx.fillStyle = 'rgba(138,106,69,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 110, 175, 1700, 730);
      node(ctx, 'deniz', 'deniz, göl', 'sıvı', E.se(t, s0 + 0.2, s0 + 0.8), t);
      node(ctx, 'buhar', 'su buharı', 'gaz', E.se(t, s0 + 0.6, s0 + 1.2), t);
      node(ctx, 'bulut', 'bulut', 'damlacık · buz kristali', E.se(t, s0 + 1.0, s0 + 1.6), t);
      node(ctx, 'kara', 'kara: dağ, toprak', 'kar, buz, sıvı', E.se(t, s0 + 1.4, s0 + 2.0), t);
      const f = (i) => E.seg(t, s0 + 2.0 + i * 0.9, s0 + 2.8 + i * 0.9);
      U.flow(ctx, [360, 685], [360, 405], f(0), { color: PAL.water, label: 'buharlaşma', lx: 380, ly: 560, align: 'left', size: 36 });
      U.flow(ctx, [525, 320], [875, 320], f(1), { color: PAL.water, label: 'yoğuşma', ly: 290, size: 36 });
      U.flow(ctx, [1040, 405], [1040, 685], f(2), { color: PAL.water, label: 'yağış', lx: 1060, ly: 560, align: 'left', size: 36 });
      U.flow(ctx, [875, 780], [525, 780], f(3), { color: PAL.water, label: 'akış · yeraltı suyu', ly: 850, size: 34 });
      U.flow(ctx, [900, 690], [500, 400], f(4), { color: PAL.life, label: 'terleme (bitkiler)', lx: 700, ly: 520, size: 34, lcolor: U.GREEN });
      // döngüde dolaşan tanecik: başı sonu yok
      const loopK = E.se(t, s1 + 0.2, s1 + 1);
      if (loopK > 0) {
        const path = [N.deniz, N.buhar, N.bulut, N.kara, N.deniz];
        const u = ((t - s1) * 0.18) % 1, seg = Math.floor(u * 4), r = u * 4 - seg;
        const p = E.mix(path[seg], path[seg + 1], r);
        ctx.save(); ctx.globalAlpha *= loopK;
        stroke(ctx, circlePts(700, 545, 410, 290, 80), { w: 2, closed: true, alpha: 0.25, dry: false, color: PAL.water });
        DAMLA.draw(ctx, { x: p[0] + (seg === 1 ? 0 : 0), y: p[1] + 40, s: 0.42, view: 'front', expr: 'happy', t, seed: 3, state: seg === 1 ? 'vapor' : (seg === 2 ? 'ice' : 'liquid'), shadow: false });
        ctx.restore();
      }
      // nitelikler
      const tx = 1330;
      P.write(ctx, 'Nitelikler', tx, 300, E.seg(t, s1 + 0.3, s1 + 1.2), { size: 50, color: U.AMBER });
      const items = [['başı ve sonu yok', PAL.ink], ['su yok olmaz,', PAL.ink], ['hâl ve yer değiştirir', PAL.water], ['enerjisi Güneş’ten', '#C07F1E']];
      items.forEach(([s, col], i) => {
        const at = s1 + 1.2 + i * 1.1 - (i === 2 ? 0.6 : 0), y = 400 + i * 80;
        if (i !== 2) P.check(ctx, tx + 10, y - 16, 34, E.se(t, at + 0.6, at + 1.0), { w: 5 });
        P.write(ctx, s, tx + 52, y, E.seg(t, at, at + 0.9), { size: 40, color: col });
      });
      U.damla(ctx, t, { x: 1690, y: 880, s: 0.75, view: 'q3', flip: true, expr: t > s1 ? 'happy' : 'thinking', look: [-0.8, -0.3], arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook', seed: 5 });
    }
  });
})();
