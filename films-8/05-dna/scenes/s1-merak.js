// SAHNE 1 — Merak: kardeşler neden benzer? Bilgi nerede saklanıyor? → çekirdek ve kalıtım maddesi
(function () {
  const { PAL, stroke, line, circlePts } = INK; const K = KIT, F = G8;
  E.scene({
    name: 'Merak', concept: 'Kalıtım maddesi çekirdekte', from: 'title', to: 'storm',
    draw(ctx, t) {
      const sh = E.s('hello'), ss = E.s('storm');
      const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(111,138,58,0.08)'); g.addColorStop(1, 'rgba(111,138,58,0.16)'); ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      // kardeşler
      const kk = Math.min(E.se(t, 1.5, 2.6), 1 - E.se(t, ss - 0.2, ss + 0.8));
      if (kk > 0) E.layer(ctx, kk, c => {
        K.kid(c, 1170, 600, 1.35, { hair: 'curly', shirt: PAL.life, seed: 1, expr: 'smile' });
        K.kid(c, 1510, 630, 1.2, { hair: 'curly', shirt: PAL.light, seed: 2, expr: 'smile' });
        const k2 = E.se(t, sh + 2.5, sh + 3.5);
        if (k2 > 0) { c.save(); c.globalAlpha *= k2; INK.dashed(c, F.densify(P.bez([1200, 420], [1340, 350], [1490, 440], 20), 4), { w: 2.4, on: 10, off: 8 }); K.text(c, 'benzer!', 1345, 360, { size: 40, align: 'center', color: K.LIFE_D }); c.restore(); }
        K.text(c, 'kardeşler', 1340, 860, { size: 36, align: 'center', alpha: 0.7 * E.se(t, sh, sh + 1) });
      });
      // hücre → çekirdek → kalıtım maddesi
      const ck = E.se(t, ss + 0.3, ss + 1.3, 'out');
      if (ck > 0) E.layer(ctx, ck, c => {
        F.cell(c, 1260, 540, 400 * (0.8 + 0.2 * ck), 300 * (0.8 + 0.2 * ck), { nuc: true, nr: 165, seed: 5601 });
        // kalıtım maddesi iplikleri
        const nz = INK.noiseFn(71);
        for (let j = 0; j < 5; j++) { const pts = []; for (let i = 0; i <= 40; i++) { const u = i / 40; pts.push([1260 - 110 + u * 220 + nz(u * 6 + j * 3) * 30, 540 - 90 + j * 45 + Math.sin(u * 11 + j) * 16]); } c.save(); c.globalAlpha *= E.se(t, ss + 1.2 + j * 0.2, ss + 2 + j * 0.2); stroke(c, pts, { w: 2.6, color: j % 2 ? F.CH1 : F.CH2, dry: false, seed: 300 + j }); c.restore(); }
        F.tag(c, 'çekirdek', [1600, 250], [1370, 420], E.se(t, ss + 1.6, ss + 2.4), { size: 44 });
        F.tag(c, 'kalıtım maddesi', [1560, 790], [1300, 600], E.se(t, ss + 3.2, ss + 4.0), { size: 44, dy: 44 });
      });
      // Damla
      const think = t > sh + 3 && t < ss;
      K.damla(ctx, t, { x: 430, y: 870, s: 1.45, expr: t > ss + 1.5 ? 'happy' : (think ? 'thinking' : 'curious'), look: [0.7, -0.2], talk: E.talk(t), arms: [[-1, 0.4], [1, think ? [60, -150] : (t > ss ? 2.0 : 0.5)]] });
      const bk = Math.min(E.se(t, sh + 1.6, sh + 2.4), 1 - E.se(t, ss, ss + 0.6));
      if (bk > 0) { P.bubble(ctx, 560, 330, 440, 190, [470, 560], bk, 3); ctx.save(); ctx.globalAlpha *= bk; K.text(ctx, 'Bu bilgi nerede', 560, 318, { size: 42, align: 'center' }); K.text(ctx, 'saklanıyor?', 560, 370, { size: 42, align: 'center' }); ctx.restore(); }
      K.title(ctx, t, 5, 'Yaşamın Şifresi: DNA', 3);
    }
  });
})();
