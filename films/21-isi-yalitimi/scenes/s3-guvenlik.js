// SAHNE 3 — Güvenlik: ılık suyu yetişkin hazırlar; kaynar su yok; kesici aletler yetişkinle
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F21, RED = F.RED;
  function kettle(ctx, x, y, s) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = [[-70, 0], [-60, -150], [60, -150], [70, 0], [-70, 0]]; P.fillPts(ctx, b, '#D9DDE0'); wash(ctx, b, '#6E767B', 0.3, 4401); stroke(ctx, b, { w: 3, closed: true });
    stroke(ctx, P.arc(0, -150, 60, Math.PI, 2 * Math.PI, 20, 30), { w: 3 });
    stroke(ctx, P.arc(84, -80, 34, -1.5, 1.5, 16, 50), { w: 8 });
    line(ctx, [-66, -110], [-110, -140], { w: 10, taper: 0.1 });
    P.fillPts(ctx, [[-80, 6], [80, 6], [80, 26], [-80, 26]], '#3A3740');
    ctx.restore();
  }
  function scissors(ctx, x, y, s) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-0.4);
    line(ctx, [-80, -10], [60, 12], { w: 5 }); line(ctx, [-80, 10], [60, -12], { w: 5 });
    stroke(ctx, circlePts(78, 20, 18, 14, 20), { w: 4, closed: true, color: RED }); stroke(ctx, circlePts(78, -20, 18, 14, 20), { w: 4, closed: true, color: RED });
    ctx.restore();
  }
  E.scene({
    name: 'Güvenlik', concept: 'Ilık su yetişkin eşliğinde; kesici aletlere dikkat', from: 'safety', to: 'safety', trFrom: [500, 600],
    draw(ctx, t) {
      const ss = E.s('safety');
      ctx.fillStyle = 'rgba(138,106,69,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
      const tb = [[60, 780], [780, 776], [790, 820], [50, 824], [60, 780]]; P.fillPts(ctx, tb, '#E3D3B3'); wash(ctx, tb, '#8A6A45', 0.4, 4410); stroke(ctx, tb, { w: 3, closed: true, seed: 4411 });
      kettle(ctx, 210, 770, 1.1);
      F.thermos(ctx, 440, 700, 0.6, null);
      scissors(ctx, 630, 740, 0.9);
      const sk = E.se(t, ss + 1.2, ss + 1.8);
      if (sk > 0) { INK.label(ctx, 'SICAK!', 210, 520, { size: 52, weight: 700, color: RED, align: 'center', alpha: sk, rot: -0.06 }); INK.label(ctx, 'KESKİN!', 630, 620, { size: 44, weight: 700, color: RED, align: 'center', alpha: E.se(t, ss + 5.5, ss + 6.1), rot: -0.06 }); }
      const k = E.se(t, ss + 0.3, ss + 1.0, 'out');
      if (k > 0) {
        ctx.save(); ctx.translate((1 - k) * 800, 0);
        const card = [[1000, 160], [1850, 150], [1860, 880], [1010, 890], [1000, 160]];
        ctx.save(); ctx.shadowColor = 'rgba(60,40,20,0.25)'; ctx.shadowBlur = 24; P.fillPts(ctx, card, '#FAF6EC'); ctx.restore();
        stroke(ctx, card, { w: 3, closed: true, color: RED, seed: 4420 });
        line(ctx, [1010, 236], [1850, 226], { w: 3, color: RED, dry: false });
        ctx.font = '700 46px Kalam'; ctx.fillStyle = RED; ctx.textAlign = 'center'; ctx.fillText('⚠  GÜVENLİK', 1430, 210);
        const rows = [['Ilık suyu yalnızca', 'bir yetişkin hazırlar.', ss + 1.2], ['Kaynar su', 'kullanılmaz!', ss + 3.4], ['Makas ve maket bıçağını', 'yetişkinle kullan.', ss + 5.4]];
        rows.forEach(([a, b, at], i) => {
          const y = 330 + i * 190, rk = E.se(t, at, at + 0.6, 'out'); if (rk <= 0) return;
          ctx.save(); ctx.translate(1080, y); ctx.scale(P.pop(rk), P.pop(rk)); P.fillPts(ctx, circlePts(0, 0, 30, 30, 24), i === 1 ? RED : PAL.light, 0.85); stroke(ctx, circlePts(0, 0, 30, 30, 24), { w: 2.4, closed: true }); ctx.font = '700 36px Kalam'; ctx.textAlign = 'center'; ctx.fillStyle = PAL.white; ctx.fillText(String(i + 1), 0, 12); ctx.restore();
          P.write(ctx, a, 1140, y - 6, E.seg(t, at + 0.2, at + 1.0), { size: 44 });
          P.write(ctx, b, 1140, y + 50, E.seg(t, at + 0.8, at + 1.6), { size: 44, color: i === 1 ? RED : PAL.ink });
        });
        ctx.restore();
      }
      DAMLA.draw(ctx, { x: 880, y: 900, s: 1.0, view: 'q3', flip: true, t, seed: 3, blink: E.blink(t, 9), squash: E.breath(t), talk: E.talk(t), expr: 'determined', look: [0.3, -0.2], arms: [[-1, 0.4], [1, 1.7]], handR: 12 });
    }
  });
})();
