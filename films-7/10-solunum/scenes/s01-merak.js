// SAHNE 1 — Başlık + Merak: nefes al, göğsün hareketini fark et; havanın yolu soruluyor
(function () {
  const { PAL, stroke } = INK; const K = KIT, F = F10;
  E.scene({
    name: 'Merak', concept: 'Nefes alıp verme: göğüs hareketi ve havanın yolu sorusu', from: 'title', to: 'question',
    draw(ctx, t) {
      const sb = E.s('breathe'), sq = E.s('question');
      const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(46,106,140,0.10)'); g.addColorStop(1, 'rgba(231,183,168,0.16)'); ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      stroke(ctx, [[60, 884], [1860, 880]], { w: 3, seed: 10001 });
      // nefes döngüsü: "al" (2 sn) → "ver" (3 sn)
      const cyc = (t - sb - 1.5) / 5, ph = cyc - Math.floor(cyc), on = t > sb + 1.5;
      const u = !on ? 0 : ph < 0.4 ? E.ease.io(ph / 0.4) : 1 - E.ease.io((ph - 0.4) / 0.6);
      const kk = E.se(t, sb - 0.2, sb + 0.8, 'out');
      if (kk > 0) E.layer(ctx, kk, c => {
        c.save(); c.translate(1240, 880); c.scale(1 + 0.05 * u, 1 + 0.025 * u); c.translate(-1240, -880);
        K.kid(c, 1240, 640, 1.75, { shirt: PAL.life, hair: 'short', expr: t > sq ? 'think' : 'smile', seed: 3 }); c.restore();
        // hava okları burun hizasında
        if (on && t < sq + 1) { const inh = ph < 0.4; const ax = 1310, ay = 565;
          c.save(); c.globalAlpha *= 0.85 * Math.sin(Math.PI * (inh ? ph / 0.4 : (ph - 0.4) / 0.6));
          if (inh) { P.arrow(c, [ax + 190, ay - 20], [ax + 20, ay], 1, { w: 4, color: PAL.water, head: 16 }); K.text(c, 'soluk al', ax + 60, ay - 50, { size: 40, color: PAL.water }); }
          else { P.arrow(c, [ax + 20, ay + 10], [ax + 190, ay + 40], 1, { w: 4, color: PAL.water, head: 16 }); K.text(c, 'soluk ver', ax + 60, ay + 100, { size: 40, color: PAL.water }); }
          c.restore(); }
        // göğüs işareti
        const ck = E.se(t, sb + 5, sb + 6) * (1 - E.se(t, sq, sq + 0.5));
        if (ck > 0) { c.save(); c.globalAlpha *= ck; INK.leader(c, [1000, 760], [1150, 790], { bend: -0.15 }); c.restore(); K.text(c, 'göğüs', 860, 752, { size: 42, alpha: ck }); K.text(c, 'genişler, daralır', 790, 800, { size: 34, alpha: ck * 0.8 }); }
      });
      // soru: havanın yolu
      const qk = E.se(t, sq + 0.4, sq + 1.2, 'out');
      if (qk > 0) { const pts = F.cr([[1250, 690], [1275, 740], [1260, 790], [1240, 850]], 10);
        ctx.save(); ctx.globalAlpha *= qk; INK.dashed(ctx, P.partial(pts, E.se(t, sq + 0.4, sq + 2.4)), { w: 3.4, color: PAL.water }); ctx.restore();
        K.node(ctx, 'Hava hangi yolu izliyor?', 560, 330, E.se(t, sq + 0.6, sq + 1.2, 'out'), { size: 46, tint: PAL.water, tintA: 0.2, seed: 1 });
        K.node(ctx, 'Ne işe yarıyor?', 560, 470, E.se(t, sq + 2.6, sq + 3.2, 'out'), { size: 46, tint: PAL.light, tintA: 0.25, seed: 2 });
        K.text(ctx, '?', 1330, 800, { size: 90, color: PAL.light, alpha: E.se(t, sq + 1.8, sq + 2.4) }); }
      K.damla(ctx, t, { x: 470, y: 880, s: 1.25, view: 'q3', expr: t > sq ? 'thinking' : 'happy', look: [0.7, -0.2], squash: E.breath(t) + u * 0.04, arms: [[-1, 0.5], [1, t > sq ? 2.2 : 0.6]] });
      K.title(ctx, t, 10, 'Her Nefeste Bir Yolculuk: Solunum Sistemi', 3);
    }
  });
})();
