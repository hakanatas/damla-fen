// SAHNE 6 — İbnü'n Nefîs: küçük kan dolaşımını ilk açıklayan ve anatomik çizimini yapan bilgin
(function () {
  const { PAL, stroke, wash, line } = INK; const K = KIT, F = F08;
  E.scene({
    name: "İbnü'n Nefîs", concept: 'Bilim tarihi: küçük kan dolaşımının keşfi', from: 'nafis', to: 'nafis', trFrom: [900, 500],
    draw(ctx, t) {
      const s = E.s('nafis'); const INKB = '#6B4A2A';
      ctx.fillStyle = 'rgba(138,106,69,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
      const pk = E.se(t, s + 0.2, s + 1.0, 'out');
      E.layer(ctx, pk, c => {
        K.card(c, 260, 190, 1150, 690, { seed: 8700, fill: '#F3E6C8', tint: '#C9A56A', tintA: 0.25 });
        // eski el yazması çerçevesi
        stroke(c, K.rrect(835, 535, 1080, 620, 12), { w: 2, closed: true, color: INKB, alpha: 0.6, dry: false });
        // sade çizim: kalp ve akciğerler arası yol (kahverengi mürekkep)
        const dk = E.se(t, s + 1.2, s + 5.0);
        c.save(); c.globalAlpha *= 0.9;
        const heart = F.closed([[560, 560], [600, 540], [640, 570], [630, 640], [590, 690], [555, 640]], 6); P.drawOn(c, heart.concat([heart[0]]), E.clamp(dk * 3), { w: 3, color: INKB });
        [[-1, 470], [1, 720]].forEach(([sd, lx], i) => { const L = F.closed([[lx, 330], [lx + 40 * sd, 360], [lx + 50 * sd, 460], [lx + 20 * sd, 510], [lx - 20 * sd, 480], [lx - 10 * sd, 380]], 5); P.drawOn(c, L.concat([L[0]]), E.clamp(dk * 3 - 0.8 - i * 0.3), { w: 2.6, color: INKB }); });
        P.drawOn(c, F.cr([[570, 545], [520, 480], [480, 420]], 8), E.clamp(dk * 3 - 1.6), { w: 2.4, color: INKB }); P.drawOn(c, F.cr([[720, 420], [680, 480], [620, 545]], 8), E.clamp(dk * 3 - 1.9), { w: 2.4, color: INKB });
        c.restore();
        K.text(c, 'İbnü’n Nefîs', 880, 330, { size: 70, color: INKB, fam: 'Fraunces', weight: 600 });
        P.write(c, '13. yüzyıl · hekim ve bilgin', 880, 410, E.seg(t, s + 1.5, s + 2.5), { size: 40 });
        P.write(c, 'küçük kan dolaşımını', 880, 520, E.seg(t, s + 2.8, s + 3.8), { size: 42 });
        P.write(c, 'ilk kez açıkladı', 880, 580, E.seg(t, s + 3.6, s + 4.6), { size: 42 });
        P.write(c, 've anatomik çizimini yaptı', 880, 640, E.seg(t, s + 4.4, s + 5.6), { size: 42 });
        INK.label(c, 'temsilî çizim', 600, 780, { size: 26, align: 'center', alpha: 0.6 });
      });
      K.damla(ctx, t, { x: 1640, y: 880, s: 1.25, flip: true, expr: 'curious', look: [-0.8, -0.2], prop: 'lens', arms: [[-1, 0.4], [1, 1.6]] });
    }
  });
})();
