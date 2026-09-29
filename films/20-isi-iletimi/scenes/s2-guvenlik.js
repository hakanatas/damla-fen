// SAHNE 2 — Güvenlik: sıcak kaşık/tencereye dokunulmaz; deney yetişkin eşliğinde
(function () {
  const { PAL, line, stroke, circlePts, splash } = INK;
  const F = F20, RED = F.RED;
  function hand(ctx, x, y, s) { // open palm outline
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const p = [[-34, 60], [-40, 0], [-44, -40], [-34, -44], [-26, -8], [-22, -62], [-10, -64], [-6, -12], [0, -70], [12, -68], [12, -10], [22, -58], [34, -54], [30, 0], [48, -24], [58, -16], [34, 36], [26, 60]];
    P.fillPts(ctx, p, '#F3E6D5'); stroke(ctx, p.concat([p[0]]), { w: 3, closed: true, seed: 3301 });
    ctx.restore();
  }
  E.scene({
    name: 'Güvenlik', concept: 'Sıcak cisimlere dokunulmaz; yetişkin eşliği', from: 'safety', to: 'safety', trFrom: [760, 500],
    draw(ctx, t) {
      const ss = E.s('safety');
      ctx.fillStyle = 'rgba(138,106,69,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
      F.stove(ctx, 480, 700, 440, true, t);
      F.spoon(ctx, [430, 620], [320, 420], 'metal', 1, t);
      F.pot(ctx, 480, 700, 320, 150, t);
      F.steam(ctx, 480, 550, 220, 120, 0.8, t, 3310);
      const hk = E.se(t, ss + 1.0, ss + 1.6, 'out');
      if (hk > 0) { hand(ctx, 250, 370, 0.9 * P.pop(hk)); P.cross(ctx, 262, 360, 60, E.se(t, ss + 1.5, ss + 2.1), { w: 10, color: RED }); INK.label(ctx, 'SICAK!', 480, 330, { size: 56, weight: 700, color: RED, align: 'center', alpha: hk, rot: -0.06 }); }
      const k = E.se(t, ss + 0.3, ss + 1.0, 'out');
      if (k > 0) {
        ctx.save(); ctx.translate((1 - k) * 800, 0);
        const card = [[960, 160], [1850, 150], [1860, 880], [970, 890], [960, 160]];
        ctx.save(); ctx.shadowColor = 'rgba(60,40,20,0.25)'; ctx.shadowBlur = 24; P.fillPts(ctx, card, '#FAF6EC'); ctx.restore();
        stroke(ctx, card, { w: 3, closed: true, color: RED, seed: 3320 });
        line(ctx, [970, 236], [1850, 226], { w: 3, color: RED, dry: false });
        ctx.font = '700 46px Kalam'; ctx.fillStyle = RED; ctx.textAlign = 'center'; ctx.fillText('⚠  GÜVENLİK', 1410, 210);
        const rows = [['Sıcak kaşığa, tencereye', 'asla dokunma!', ss + 1.2], ['Sıcak suyu yalnızca', 'bir yetişkin kullanır.', ss + 3.2], ['Isı kaynağının yanında', 'oyun oynanmaz.', ss + 5.2]];
        rows.forEach(([a, b, at], i) => {
          const y = 330 + i * 190, rk = E.se(t, at, at + 0.6, 'out'); if (rk <= 0) return;
          ctx.save(); ctx.translate(1040, y); ctx.scale(P.pop(rk), P.pop(rk)); P.fillPts(ctx, circlePts(0, 0, 30, 30, 24), i === 0 ? RED : PAL.light, 0.85); stroke(ctx, circlePts(0, 0, 30, 30, 24), { w: 2.4, closed: true }); ctx.font = '700 36px Kalam'; ctx.textAlign = 'center'; ctx.fillStyle = PAL.white; ctx.fillText(String(i + 1), 0, 12); ctx.restore();
          P.write(ctx, a, 1100, y - 6, E.seg(t, at + 0.2, at + 1.0), { size: 44 });
          P.write(ctx, b, 1100, y + 50, E.seg(t, at + 0.8, at + 1.6), { size: 44, color: i === 0 ? RED : PAL.ink });
        });
        ctx.restore();
      }
      DAMLA.draw(ctx, { x: 820, y: 920, s: 1.2, view: 'q3', flip: true, t, seed: 3, blink: E.blink(t, 9), squash: E.breath(t), talk: E.talk(t), expr: 'determined', look: [-0.8, -0.2], arms: [[-1, 0.4], [1, 1.7]], handR: 12 });
    }
  });
})();
