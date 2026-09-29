// SAHNE 1 — Merak: boş odalarda yanan lambalar, bekleme modunda televizyon
(function () {
  const { PAL, stroke, line, circlePts } = INK;
  const W = W6, D = D23;
  E.scene({
    name: 'Merak', concept: 'Evde elektrik kullanımı', from: 'title', to: 'q',
    draw(ctx, t) {
      const sh = E.s('hello'), sq = E.s('q');
      // akşam
      const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(46,58,90,0.35)'); g.addColorStop(1, 'rgba(46,58,90,0.08)'); ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      W.ground(ctx, -20, E.W + 20, 860, 240, PAL.life, 7100);
      const hk = E.se(t, 5.4, 6.8);
      if (hk > 0) E.layer(ctx, hk, c => {
        const X0 = 150, X1 = 1010, Y0 = 330, Y1 = 860, XM = 580, YM = 595;
        const roof = [[X0 - 40, Y0], [(X0 + X1) / 2, Y0 - 150], [X1 + 40, Y0], [X0 - 40, Y0]]; P.fillPts(c, roof, W.HEAT, 0.75); stroke(c, roof, { w: 3, closed: true, seed: 7101 });
        const rooms = [[X0, Y0, XM, YM], [XM, Y0, X1, YM], [X0, YM, XM, Y1], [XM, YM, X1, Y1]];
        const lit = [1, 1, 0, 1];
        rooms.forEach(([a, b, cc, d], i) => {
          const r = W.rect(a, b, cc, d); P.fillPts(c, r, lit[i] ? '#F4E3BC' : '#4A4F5E', 0.95);
          if (lit[i]) { W.glow(c, (a + cc) / 2, b + 70, 260, 0.8); line(c, [(a + cc) / 2, b], [(a + cc) / 2, b + 50], { w: 2, dry: false }); W.bulb(c, (a + cc) / 2, b + 76, 0.8, 1); }
          stroke(c, r, { w: 3, closed: true, dry: false, seed: 7110 + i });
        });
        // oda içleri: koltuk, masa, yatak
        W.shape(c, W.rr(220, 520, 220, 60, 16), '#8FB0C4', 0.5, 7120); W.shape(c, W.rect(660, 530, 900, 550), '#8A6A45', 0.5, 7121);
        W.shape(c, W.rr(640, 780, 300, 70, 12), '#D98FA0', 0.4, 7122);
        W.A.tv(c, 360, 760, 0.9, t, 0, 1);
        // boş oda işaretleri
        const qk = E.se(t, sh + 2.0, sh + 2.8, 'out');
        [[365, 470], [795, 470], [795, 730]].forEach(([x, y], i) => { if (qk > 0) W.txt(c, 'boş oda', x, y, { size: 34, align: 'center', color: W.AMBER, alpha: qk }); });
        if (t > sh + 3.6) { INK.leader(c, [300, 655], [420, 795], { bend: 0.2, color: '#F4D8C8' }); P.write(c, 'bekleme modu', 190, 645, E.seg(t, sh + 3.8, sh + 4.6), { size: 32, color: '#F4D8C8' }); }
      });
      W.damla(ctx, t, { x: 1280, y: 900, s: 1.2, flip: true, expr: t > sq ? 'thinking' : 'surprised', look: [-0.8, -0.3], arms: [[-1, t > sh + 1 ? 2.1 : 0.35], [1, 0.35]], seed: 3 });
      const qk2 = E.se(t, sq + 0.3, sq + 1.0);
      if (qk2 > 0) E.layer(ctx, qk2, c => {
        W.card(c, 1080, 300, 760, 190, { seed: 7130, tint: PAL.light, tintA: 0.15 });
        P.write(c, 'Elektriği bilinçli ve tasarruflu', 1460, 375, E.seg(t, sq + 0.8, sq + 2.2), { size: 46, align: 'center' });
        P.write(c, 'kullanmak neden önemli?', 1460, 445, E.seg(t, sq + 2.0, sq + 3.2), { size: 46, align: 'center' });
      });
      W.title(ctx, t, '23 · Elektriği Bilinçli Kullanalım');
    }
  });
})();
