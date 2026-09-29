// SAHNE 1 — Merak: akşam, evde elektrikle çalışan aletler · SAHNE 2 — Güvenlik (priz, ıslak el, pil, yetişkin)
(function () {
  const { PAL, stroke, line, circlePts } = INK;
  const W = W6;
  function room(ctx) {
    const wall = W.rect(-20, -20, E.W + 20, 780); INK.wash(ctx, wall, '#C9B48E', 0.16, 5001, { bleed: 4, blooms: 2 });
    const floor = [[-20, 780], [E.W + 20, 780], [E.W + 20, E.H + 20], [-20, E.H + 20]]; P.fillPts(ctx, floor, '#D9C7A4', 0.5); INK.wash(ctx, floor, '#8A6A45', 0.2, 5002, { bleed: 3, blooms: 1 });
    stroke(ctx, [[-20, 780], [E.W + 20, 776]], { w: 3, seed: 5003 });
    // pencere: akşam gökyüzü
    const win = W.rect(1260, 380, 1500, 600); P.fillPts(ctx, win, '#2E3A48', 0.85); INK.wash(ctx, win, '#6B5B8C', 0.35, 5004, { bleed: 1, blooms: 0 });
    P.fillPts(ctx, circlePts(1450, 430, 20, 20, 18), '#F4EBD2'); stroke(ctx, win, { w: 3, closed: true, seed: 5005 }); line(ctx, [1380, 380], [1380, 600], { w: 2.4, dry: false }); line(ctx, [1260, 490], [1500, 490], { w: 2.4, dry: false });
    // masa ve tezgâh
    const tb = W.rect(260, 600, 620, 624); W.shape(ctx, tb, '#8A6A45', 0.6, 5006); line(ctx, [290, 624], [290, 780], { w: 6, dry: false }); line(ctx, [590, 624], [590, 780], { w: 6, dry: false });
    const ct = W.rect(700, 640, 1040, 780); W.shape(ctx, ct, '#B9A57E', 0.5, 5007); line(ctx, [700, 660], [1040, 660], { w: 1.6, dry: false, alpha: 0.6 });
    W.socket(ctx, 1620, 560, 0.55);
  }
  E.scene({
    name: 'Merak', concept: 'Elektrikle çalışan aletler', from: 'title', to: 'q',
    draw(ctx, t) {
      const sh = E.s('hello'), sq = E.s('q');
      room(ctx);
      const onL = E.se(t, sh + 0.6, sh + 1.2), onK = E.se(t, sh + 2.2, sh + 2.8), onF = E.se(t, sh + 3.8, sh + 4.4);
      // gece odası: lamba yanınca aydınlanır
      ctx.save(); ctx.globalAlpha = 0.18 * (1 - onL); ctx.fillStyle = '#2E3A48'; ctx.fillRect(0, 0, E.W, E.H); ctx.restore();
      W.A.lamp(ctx, 440, 520, 1.1, t, onL);
      W.A.kettle(ctx, 870, 560, 0.95, t, onK);
      line(ctx, [1600, 575], [1560, 700], { w: 3.4, color: '#3A3530', bend: 0.2, dry: false });
      W.A.fan(ctx, 1560, 690, 1.05, t, onF);
      W.damla(ctx, t, { x: 1150, y: 900, s: 1.25, expr: t > sq ? 'curious' : 'happy', look: t > sq ? [-0.4, -0.3] : [0.2, 0], arms: [[-1, 0.35], [1, t > sq ? 2.3 : 0.4 + 0.2 * Math.sin(t * 3)]], seed: 3 });
      // soru işaretleri
      if (t > sq + 1.5) [[440, 360], [870, 420], [1560, 540]].forEach(([x, y], i) => { const k = E.se(t, sq + 1.5 + i * 0.4, sq + 2.0 + i * 0.4, 'out'); W.txt(ctx, '?', x + 70, y - 40 * k, { size: 70, color: PAL.water, alpha: k }); });
      const qk = E.se(t, sq + 0.3, sq + 1.0);
      if (qk > 0) E.layer(ctx, qk, c => {
        W.card(c, 380, 170, 1160, 120, { seed: 5010, tint: PAL.light, tintA: 0.15 });
        P.write(c, 'Elektrik enerjisi her alette neye dönüşüyor?', 960, 250, E.seg(t, sq + 0.8, sq + 2.4), { size: 50, align: 'center' });
      });
      W.title(ctx, t, '21 · Elektrik Enerjisi Neye Dönüşür?');
    }
  });

  E.scene({
    name: 'Güvenlik', concept: 'Elektrik güvenliği', from: 'safe', to: 'safe2', trFrom: [960, 540],
    draw(ctx, t) {
      const ss = E.s('safe'), s2 = E.s('safe2');
      room(ctx);
      ctx.save(); ctx.fillStyle = 'rgba(241,234,219,0.55)'; ctx.fillRect(0, 0, E.W, E.H); ctx.restore();
      // büyük priz + yaklaşan çatal → kırmızı çarpı
      W.socket(ctx, 420, 360, 1.5);
      const fk = E.se(t, ss + 0.6, ss + 1.6);
      ctx.save(); ctx.translate(E.lerp(700, 560, fk), 330); ctx.rotate(-0.2);
      line(ctx, [0, 0], [150, 0], { w: 7, color: '#8C8578', dry: false }); [-14, 0, 14].forEach(d => line(ctx, [-50, d], [0, d * 0.4], { w: 3, color: '#8C8578', dry: false }));
      ctx.restore();
      P.cross(ctx, 470, 350, 110, E.se(t, ss + 1.8, ss + 2.4), { w: 14, color: W.RED });
      // pil (güvenli)
      const pk = E.se(t, s2 + 0.3, s2 + 1.0, 'out');
      if (pk > 0) { ctx.save(); ctx.translate(420, 640); ctx.scale(P.pop(pk), P.pop(pk)); W.cell(ctx, 0, 0, 1.3); ctx.restore(); P.check(ctx, 560, 600, 60, E.se(t, s2 + 1.0, s2 + 1.5), { w: 8, color: PAL.life }); }
      W.damla(ctx, t, { x: 200, y: 900, s: 1.0, expr: t < s2 ? 'determined' : 'happy', look: [0.6, -0.2], arms: [[-1, 0.35], [1, t < s2 ? 2.6 : 1.6]], seed: 4 });
      W.safety(ctx, 860, 190, 940, ['Prize parmak ya da metal sokulmaz.', 'Islak elle fişe, prize dokunulmaz.', 'Deneylerde yalnızca pil kullanılır.', 'Bir yetişkin eşliğinde çalışılır.'], t, ss + 0.4,
        { ats: [ss + 1.0, ss + 3.2, s2 + 0.5, s2 + 2.0], size: 42, lh: 90, head: '⚠  ELEKTRİK GÜVENLİĞİ' });
    }
  });
})();
