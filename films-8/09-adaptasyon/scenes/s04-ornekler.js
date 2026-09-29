// SAHNE 4 — Başka örnekler: kutup ayısı, boz ayı, kaktüs, deve (veri toplama; kavram yanılgısı: hörgüç)
(function () {
  const { PAL, stroke, line, circlePts } = INK;
  const F = F809;
  const EX = [
    ['polar', 'kutup ayısı', PAL.water, ['kalın yağ tabakası', 'yoğun kürk', 'geniş pençeler'], c => F.bear(c, 0, 0, 0.72, 'polar')],
    ['brown', 'boz ayı', F.BROWN, ['ormanda yaşar', 'sonbaharda yağ depolar', 'kış uykusu'], c => F.bear(c, 0, 0, 0.72, 'brown')],
    ['cactus', 'kaktüs', PAL.life, ['yaprak → diken: su kaybı az', 'kalın gövde: su deposu', 'kalın, mumsu yüzey'], c => F.cactus(c, 60, 0, 0.9)],
    ['camel', 'deve', '#8A5A20', ['hörgüç: YAĞ deposu (su değil)', 'uzun kirpikler', 'geniş ayak tabanı'], c => F.camel(c, 0, 0, 0.72)]
  ];
  E.scene({
    name: 'Başka örnekler', concept: 'Ayı, kaktüs, deve', from: 'polar', to: 'camel', trFrom: [480, 400],
    draw(ctx, t) {
      ctx.fillStyle = 'rgba(111,138,58,0.07)'; ctx.fillRect(0, 0, E.W, E.H);
      EX.forEach(([id, name, col, bullets, fn], i) => {
        const s0 = E.s(id), k = E.se(t, s0 + 0.2, s0 + 0.9, 'out'); if (k <= 0) return;
        const x = 120 + (i % 2) * 850, y = 170 + Math.floor(i / 2) * 370;
        const on = t < E.e(id);   // o anki örnek vurgulu
        E.layer(ctx, k, c => {
          F.card(c, x, y, 810, 340, 6000 + i, { tint: col, tintA: on ? 0.14 : 0.06 });
          c.save(); c.translate(x + 180, y + 300); fn(c); c.restore();
          F.fit(c, name, x + 560, y + 70, 460, 50, { color: col });
          bullets.forEach((b, j) => { const bk = E.se(t, s0 + 1.0 + j * 0.9, s0 + 1.6 + j * 0.9); if (bk <= 0) return; c.save(); c.globalAlpha *= bk; INK.inkDot(c, x + 380, y + 136 + j * 64, 5); F.fit(c, b, x + 400, y + 150 + j * 64, 400, 38, { align: 'left', weight: j === 0 && id === 'camel' ? 700 : 400, color: j === 0 && id === 'camel' ? '#8A5A20' : PAL.ink }); c.restore(); });
        });
      });
      // hörgüç: su damlası ✗
      const sc = E.s('camel');
      if (t > sc + 1.4) { const k = E.se(t, sc + 1.4, sc + 2.0); const x = 1050, y = 610;
        ctx.save(); ctx.globalAlpha *= k; const d = []; for (let i = 0; i <= 30; i++) { const a = i / 30 * 6.283; d.push([x + Math.sin(a) * 18 * Math.pow(Math.sin(a / 2), 0.8) * 1.3, y - Math.cos(a) * 24]); } P.fillPts(ctx, d, PAL.water, 0.6); stroke(ctx, d, { w: 2, closed: true, dry: false }); ctx.restore();
        P.cross(ctx, x, y, 26, E.se(t, sc + 1.8, sc + 2.3), { w: 6, color: F.RED }); }
    }
  });
})();
