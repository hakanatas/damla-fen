// SAHNE 3 — Soru + bilgi toplama araçlarını belirleme (a) ve kullanma (b): genel ağ, basılı kaynak, uzman görüşmesi
(function () {
  const { PAL, stroke, line, circlePts } = INK;
  E.scene({
    name: 'Araçlar', concept: 'Bilgi toplama araçlarını belirleme', from: 'question', to: 'interview', trFrom: [960, 540],
    draw(ctx, t) {
      const F = F12, sq = E.s('question'), st = E.s('tools'), si = E.s('interview');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      const a3 = E.se(t, si - 0.2, si + 0.6);
      if (a3 < 1) E.layer(ctx, 1 - a3, c => {
        P.notebook(c, 150, 80, 1620, 830);
        P.write(c, 'Sorum:', 300, 200, E.seg(t, sq + 0.4, sq + 1.2), { size: 52, color: '#8A4A10' });
        P.write(c, 'Destek ve hareket sistemimizi sağlıklı', 470, 200, E.seg(t, sq + 1.2, sq + 3), { size: 46 });
        P.write(c, 'tutmak için ne yapmalıyız?', 470, 262, E.seg(t, sq + 2.8, sq + 4.4), { size: 46 });
        const cards = [
          { x: 480, ic: c2 => P.icon.laptop(c2, 480, 500, 1.1, t), a: 'güvenilir genel ağ adresleri', b: 'resmî kurum ve üniversite siteleri', at: st + 3.4 },
          { x: 960, ic: c2 => P.icon.books(c2, 960, 510, 1.1), a: 'basılı kaynaklar', b: 'kitap, ansiklopedi, dergi', at: st + 5.6 },
          { x: 1440, ic: c2 => F.adult(c2, 1440, 640, 0.46, { coat: true }), a: 'alan uzmanı', b: 'doktor, fizyoterapist', at: st + 7.4 }
        ];
        P.write(c, 'Araçlarım:', 300, 355, E.seg(t, st + 0.5, st + 1.5), { size: 44, color: '#8A4A10' });
        cards.forEach((cd, i) => {
          const k = E.se(t, cd.at, cd.at + 0.6, 'out'); if (k <= 0) return;
          c.save(); c.translate(cd.x, 590); c.scale(P.pop(k), P.pop(k)); c.translate(-cd.x, -590);
          const fr = INK.wobble(F.rrect(cd.x, 590, 420, 400, 20, 6), 1.5, 40 + i); P.fillPts(c, fr, PAL.white, 0.9); stroke(c, fr, { w: 2.4, closed: true, seed: 50 + i });
          cd.ic(c); c.restore();
          P.write(c, cd.a, cd.x, 710, k, { size: cd.a.length > 20 ? 34 : 40, align: 'center' });
          P.write(c, cd.b, cd.x, 755, E.seg(t, cd.at + 0.5, cd.at + 1.5), { size: 28, weight: 400, align: 'center', color: '#6B4A1E' });
        });
      });
      if (a3 > 0) E.layer(ctx, a3, c => {
        const floor = [[-20, 880], [1940, 872], [1940, 1100], [-20, 1100]]; P.fillPts(c, floor, '#D9C4A0', 0.6); stroke(c, [[-20, 880], [1940, 872]], { w: 3, seed: 5 });
        F.adult(c, 1250, 880, 1.25, { coat: true, hair: '#5A4A3A' });
        F.tag(c, 'fizyoterapist', 1560, 330, [1300, 380], E.se(t, si + 1.2, si + 2), { size: 44, seed: 3 });
        // Damla's question card
        const kq = E.se(t, si + 3.4, si + 4.2, 'out');
        if (kq > 0) {
          c.save(); c.translate(560, 380); c.rotate(-0.03); c.scale(P.pop(kq), P.pop(kq));
          const n = [[-330, -140], [330, -146], [334, 140], [-326, 146], [-330, -140]]; P.fillPts(c, n, '#F6E7B8', 0.97); stroke(c, n, { w: 2.4, closed: true, seed: 61 });
          c.font = '700 40px Kalam'; c.fillStyle = PAL.ink; c.fillText('Sorularım:', -290, -80);
          c.font = '400 34px Kalam'; c.fillText('1. Kemiklerimi nasıl güçlendiririm?', -290, -20); c.fillText('2. Çantamı nasıl taşımalıyım?', -290, 36); c.fillText('3. Ekran başında nasıl oturmalıyım?', -290, 92);
          c.restore();
        }
      });
      const inI = t > si;
      DAMLA.draw(ctx, { x: inI ? 760 : 1840, y: inI ? 880 : 1045, s: inI ? 1.2 : 0.85, view: 'q3', flip: !inI, expr: 'curious', look: inI ? [0.8, -0.5] : [-0.7, -0.4], blink: E.blink(t, 9), squash: E.breath(t), t, talk: E.talk(t), seed: 4, prop: inI ? 'notebook' : null, arms: inI ? [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]] : [[-1, 0.4], [1, 2.2 + Math.sin(t * 2) * 0.06]] });
    }
  });
})();
