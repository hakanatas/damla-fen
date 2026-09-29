// SAHNE 1 — Giriş: Damla'nın pilli lamba devresi; devreyi resim gibi çizmek çok uzun sürer (köprü kurma)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  E.scene({
    name: 'Giriş', concept: 'Devreyi anlatmanın zorluğu', from: 'title', to: 'slow',
    draw(ctx, t) {
      const sh = E.s('hello'), sd = E.s('draw'), ss = E.s('slow');
      ctx.save();
      E.cam(ctx, { x: 960 + 20 * E.se(t, 0, sd, 'sine'), y: 540, z: 1 + 0.03 * E.se(t, 0, E.e('slow'), 'sine') });
      CK.table(ctx, 820);
      // devre: anahtar kapanır, ampul yanar
      const kClose = E.se(t, sh + 3.2, sh + 4.0);
      const bright = E.se(t, sh + 3.9, sh + 4.4) * 0.9;
      CK.realCircuit(ctx, 1380, 800, 1.25, kClose, bright, t);
      if (t > sh + 4.4 && t < sd + 1) E.inkText(ctx, 'ışık verdi!', 1560, 420, t, sh + 4.6, sd + 1, { size: 44, color: '#8A4A10' });

      // Damla
      const drawing = t > sd + 1.2;
      const tired = t > ss + 0.5;
      const o = { x: 330, y: 822, s: 1.35, view: 'q3', expr: 'happy', look: [0.8, -0.2], blink: E.blink(t, 2), squash: E.breath(t), t, talk: E.talk(t), seed: 1 };
      if (t < sh + 2.6) { o.view = 'front'; o.expr = t < sh ? 'neutral' : 'happy'; o.look = [0, 0.1]; o.arms = t > sh + 0.2 ? [[-1, 0.35], [1, 2.4 + 0.3 * Math.sin(t * 8)]] : [[-1, 0.35], [1, 0.35]]; }
      else if (!drawing) { o.arms = [[-1, 0.4], [1, 1.9]]; o.expr = t > sh + 4.2 ? 'happy' : 'curious'; }
      else if (!tired) { o.expr = 'determined'; o.look = [0.6, -0.8]; o.prop = 'notebook'; o.arms = [[-1, 1.1], [1, 1.4 + Math.sin(t * 11) * 0.14]]; }
      else { o.expr = 'sad'; o.look = [0.5, -0.9]; o.prop = 'notebook'; o.arms = [[-1, 0.9], [1, 0.8]]; o.squash = 0.96 + 0.01 * Math.sin(t * 2); }
      DAMLA.draw(ctx, o);

      // yavaş çizim kartı: devreyi resim gibi çizmek
      const kc = E.se(t, sd + 0.6, sd + 1.3, 'out');
      if (kc > 0) {
        ctx.save(); ctx.translate(760, 330); ctx.rotate(-0.02); ctx.scale(P.pop(kc), P.pop(kc));
        CK.card(ctx, -380, -210, 760, 420, { seed: 31 });
        INK.label(ctx, 'Devrem (resim olarak)', -350, -155, { size: 36, weight: 700 });
        // ilerleme çok yavaş: sahne sonunda bile yarım kalır
        const prog = E.lerp(0, 0.62, E.seg(t, sd + 1.4, E.e('slow') - 0.5));
        ctx.save(); ctx.beginPath(); ctx.rect(-370, -130, 740 * prog, 330); ctx.clip();
        ctx.save(); ctx.translate(0, 60); ctx.scale(0.72, 0.72); ctx.translate(-1375, -710);
        CK.realCircuit(ctx, 1380, 800, 1.25, 1, 0, t);
        ctx.restore(); ctx.restore();
        // kalem ucu
        const px = -370 + 740 * prog, py = 40 + Math.sin(t * 13) * 40;
        P.icon.pencil(ctx, px + 30, py - 30, 0.6, 2.2);
        ctx.restore();
      }
      // saat: zaman akıp gidiyor
      const kk = E.se(t, ss, ss + 0.6, 'out');
      if (kk > 0) {
        ctx.save(); ctx.translate(1260, 200); ctx.scale(P.pop(kk), P.pop(kk));
        P.icon.clock(ctx, 0, 0, 1, (t - ss) * 5);
        ctx.restore();
        E.inkText(ctx, 'çok uzun sürüyor...', 1345, 225, t, ss + 0.8, 1e9, { size: 42 });
      }
      ctx.restore();
      CK.titleCard(ctx, t, 22, 'Devrenin Ortak Dili: Semboller');
    }
  });
})();
