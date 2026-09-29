// SAHNE 3 — Isı kaynakları (köprü: Dünya'nın en temel ısı kaynağı Güneş; doğal ve yapay kaynaklar) + güvenlik kartı
(function () {
  const { PAL, line, stroke, circlePts, splash } = INK;
  const F = F17;
  const RED = '#A23A2A';
  E.scene({
    name: 'Isı kaynakları', concept: 'Güneş en temel ısı kaynağı; güvenlik', from: 'sources', to: 'safety', trFrom: [960, 400],
    draw(ctx, t) {
      const ss = E.s('sources'), sf = E.s('safety');
      ctx.fillStyle = 'rgba(227,160,58,0.07)'; ctx.fillRect(0, 0, E.W, E.H);
      const out = E.se(t, sf - 0.2, sf + 0.6);
      E.layer(ctx, 1 - 0.75 * out, c => {
        // Güneş kartı (doğal, en temel)
        const k1 = E.se(t, ss + 0.2, ss + 0.9, 'out');
        if (k1 > 0) {
          c.save(); c.translate(560, 520); c.scale(P.pop(k1), P.pop(k1));
          F.card(c, 0, 0, 620, 600, { seed: 400 });
          P.sun(c, 0, -60, 130, t, { nrays: 20 });
          INK.label(c, 'Güneş', 0, 170, { size: 60, weight: 700, align: 'center' });
          INK.label(c, 'doğal · en temel ısı kaynağı', 0, 230, { size: 36, align: 'center', color: '#8A4A10' });
          c.restore();
        }
        // yapay kaynaklar
        const k2 = E.se(t, ss + 3.2, ss + 3.9, 'out'), k3 = E.se(t, ss + 4.4, ss + 5.1, 'out');
        if (k2 > 0) { c.save(); c.translate(1150, 520); c.scale(P.pop(k2), P.pop(k2)); F.card(c, 0, 0, 420, 600, { seed: 401 }); F.cooktop(c, 0, 30, 1.2, t); INK.label(c, 'ocak', 0, 200, { size: 54, weight: 700, align: 'center' }); c.restore(); }
        if (k3 > 0) { c.save(); c.translate(1600, 520); c.scale(P.pop(k3), P.pop(k3)); F.card(c, 0, 0, 420, 600, { seed: 402 }); F.stove(c, 0, 120, 0.95, t); INK.label(c, 'soba', 0, 200, { size: 54, weight: 700, align: 'center' }); c.restore(); }
        if (k3 > 0.5) INK.label(c, 'yapay ısı kaynakları', 1375, 880, { size: 38, align: 'center', color: '#8A4A10', alpha: E.se(t, ss + 5.2, ss + 6) });
      });
      // güvenlik kartı
      if (t >= sf - 0.1) {
        const k = E.se(t, sf, sf + 0.6, 'out');
        ctx.save(); ctx.translate((1 - k) * 900, 0);
        const card = [[420, 170], [1500, 160], [1510, 900], [430, 910], [420, 170]];
        ctx.save(); ctx.shadowColor = 'rgba(60,40,20,0.25)'; ctx.shadowBlur = 24; P.fillPts(ctx, card, '#FAF6EC'); ctx.restore();
        stroke(ctx, card, { w: 3.4, closed: true, color: RED, seed: 403 });
        line(ctx, [430, 250], [1500, 240], { w: 3, color: RED, dry: false });
        ctx.font = '700 50px Kalam'; ctx.fillStyle = RED; ctx.textAlign = 'center'; ctx.fillText('⚠  GÜVENLİK', 965, 222);
        // ikonlar: sıcak kap + el
        F.pot(ctx, 480, 430, 160, 120, 90, { seed: 404 }); F.steam(ctx, 560, 410, 0.8, t, { color: F.HEAT });
        P.cross(ctx, 560, 490, 80, E.se(t, sf + 1.2, sf + 1.8), { w: 10, color: RED });
        P.write(ctx, 'Sıcak kaba çıplak elle dokunma.', 720, 460, E.seg(t, sf + 1.4, sf + 2.6), { size: 42 });
        P.write(ctx, 'Ocağı ve sobayı tek başına kullanma.', 720, 540, E.seg(t, sf + 2.4, sf + 3.6), { size: 42 });
        P.write(ctx, 'Deneyler yalnızca bir yetişkin', 965, 720, E.seg(t, sf + 3.6, sf + 4.8), { size: 58, align: 'center', color: RED });
        P.write(ctx, 'eşliğinde yapılır!', 965, 800, E.seg(t, sf + 4.4, sf + 5.4), { size: 58, align: 'center', color: RED });
        ctx.restore();
      }
    }
  });
})();
