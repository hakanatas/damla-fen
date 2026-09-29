// SAHNE 5 — FB.6.3.9: araç belirler, bilgi bulur, doğrular
(function () {
  const { PAL } = INK; const K = KIT;
  const TOOLS = [['laptop', ['güvenilir', 'internet siteleri']], ['books', ['basılı', 'kaynaklar']], ['expert', ['sağlık uzmanıyla', 'görüşme']]];
  const CHK = ['öğretmenime danıştım', 'güvenilir kaynaklara baktım', 'arkadaşlarımla karşılaştırdım'];
  E.scene({
    name: 'Araştırma', concept: 'Bilgi toplama araçları ve doğrulama', from: 'healthq', to: 'verify', trFrom: [960, 300],
    draw(ctx, t) {
      const sq = E.s('healthq'), st = E.s('tools'), sv = E.s('verify');
      const qa = E.se(t, sq + 0.3, sq + 1.0, 'out') * (1 - E.se(t, sv - 0.2, sv + 0.4));
      if (qa > 0) E.layer(ctx, qa, c => {
        K.card(c, 480, 185, 1260, 200, { seed: 10400, tint: PAL.life, tintA: 0.1 });
        P.write(c, 'Denetleyici ve düzenleyici sistemleri', 530, 265, E.seg(t, sq + 0.6, sq + 2.2), { size: 46 });
        P.write(c, 'sağlıklı tutmak için ne yapmalıyız?', 530, 340, E.seg(t, sq + 2.0, sq + 3.6), { size: 46 });
        TOOLS.forEach(([ic, lab], i) => {
          const k = E.se(t, st + 0.8 + i * 1.8, st + 1.4 + i * 1.8, 'out'); if (k <= 0) return; const x = 700 + i * 430;
          E.layer(c, k, cc => {
            K.card(cc, x - 190, 450, 380, 330, { seed: 10410 + i });
            if (ic === 'laptop') P.icon.laptop(cc, x, 570, 0.9); else if (ic === 'books') P.icon.books(cc, x, 570, 0.9);
            else { K.kid(cc, x, 580, 0.5, { hair: 'short', shirt: PAL.white, seed: 9, hairC: '#4A4040' }); cc.save(); cc.strokeStyle = PAL.water; cc.lineWidth = 7; cc.beginPath(); cc.moveTo(x + 30, 625); cc.lineTo(x + 30, 651); cc.moveTo(x + 17, 638); cc.lineTo(x + 43, 638); cc.stroke(); cc.restore(); }
            lab.forEach((l, j) => K.text(cc, l, x, 700 + j * 44, { size: 36, align: 'center' }));
          });
        });
      });
      // doğrulama
      const va = E.se(t, sv + 0.2, sv + 0.9, 'out');
      if (va > 0) E.layer(ctx, va, c => {
        K.card(c, 420, 210, 800, 420, { seed: 10420, fill: '#FFFFFF' });
        c.save(); c.fillStyle = 'rgba(46,106,140,0.15)'; c.fillRect(424, 214, 792, 50); c.restore();
        K.text(c, 'www. mucize-icecek ...', 460, 250, { size: 30, alpha: 0.6 });
        K.text(c, '"Bu içecek bir haftada', 820, 390, { size: 54, align: 'center' });
        K.text(c, 'boy uzatır!"', 820, 470, { size: 54, align: 'center' });
        CHK.forEach((s, i) => { const at = sv + 3.5 + i * 1.3; K.node(c, s, 1540, 300 + i * 130, E.se(t, at, at + 0.5, 'out'), { size: 34, w: 520, h: 80, seed: 80 + i }); P.check(c, 1830, 290 + i * 130, 40, E.se(t, at + 0.5, at + 0.9), { w: 6, color: K.LIFE_D }); });
        const sk = E.se(t, sv + 7.6, sv + 8.2, 'back');
        if (sk > 0) { c.save(); c.translate(820, 565); c.rotate(-0.08); c.scale(sk, sk); c.globalAlpha *= 0.9; c.strokeStyle = K.RED; c.lineWidth = 7; c.strokeRect(-250, -60, 500, 120); K.text(c, 'DOĞRU DEĞİL', 0, 26, { size: 72, align: 'center', color: K.RED, rot: 0 }); c.restore(); }
        K.text(c, 'Büyüme; beslenme, uyku ve hareketle olur.', 820, 720, { size: 40, align: 'center', color: K.LIFE_D, alpha: E.se(t, sv + 8.4, sv + 9.0) });
      });
      K.damla(ctx, t, { x: 230, y: 900, s: 1.1, expr: t > sv + 7.6 ? 'determined' : 'curious', look: [0.8, -0.4], prop: 'lens', arms: [[-1, 0.4], [1, 1.6]] });
    }
  });
})();
