// SAHNE 6 — Teleskoplar: yer tabanlı (gözlemevi, kurulduğu yerin özellikleri, Türkiye'deki örnekler) ve uzay teleskopları (Hubble, James Webb)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = U7;
  function cloud(c, x, y, s, seed) {
    [[-60, 0, 36], [-20, -22, 44], [30, -10, 38], [70, 4, 30], [0, 10, 40]].forEach(([dx, dy, r], i) => { const p = circlePts(x + dx * s, y + dy * s, r * s, r * s * 0.8, 24); P.fillPts(c, p, PAL.white, 0.95); });
    stroke(c, P.arc(x, y + 12 * s, 100 * s, Math.PI * 1.05, Math.PI * 1.95, 30, 50 * s), { w: 2, alpha: 0.5, dry: false, seed });
  }
  E.scene({
    name: 'Teleskoplar', concept: 'Yer tabanlı ve uzay teleskopları', from: 'ground', to: 'space-tel', trFrom: [480, 420],
    draw(ctx, t) {
      const sg = E.s('ground'), sp = E.s('space-tel');
      // --- sol: yer tabanlı ---
      ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 960, E.H); ctx.clip();
      F.night(ctx, 1);
      F.stars(ctx, t, 1, { n: 70, seed: 76, area: [0, 150, 960, 560] });
      // şehir ışığı (ışık kirliliği)
      const cg = ctx.createRadialGradient(840, 860, 10, 840, 860, 320); cg.addColorStop(0, 'rgba(227,160,58,0.75)'); cg.addColorStop(1, 'rgba(227,160,58,0)');
      ctx.fillStyle = cg; ctx.fillRect(500, 520, 460, 560);
      const mt = [[-50, 900], [150, 700], [300, 560], [420, 500], [520, 540], [680, 700], [760, 820], [1000, 900], [1000, 1100], [-50, 1100]];
      P.fillPts(ctx, mt, '#3E4A5E', 1); stroke(ctx, mt.slice(0, 8), { w: 3, color: '#FBF3DC', alpha: 0.7, seed: 140 });
      for (let i = 0; i < 18; i++) { const R = INK.rng(150 + i); ctx.fillStyle = '#FFE3A0'; ctx.fillRect(760 + R() * 190, 830 + R() * 60, 5, 5); }
      P.icon.observatory(ctx, 420, 432, 0.75);
      const lk = (a) => E.se(t, sg + a, sg + a + 0.7);
      P.arrow(ctx, [200, 470], [320, 520], lk(3.4), { w: 3, color: '#FBF3DC', head: 12 }); INK.label(ctx, 'yüksek', 170, 455, { size: 38, weight: 700, color: '#FBF3DC', alpha: lk(3.4), align: 'center' });
      INK.label(ctx, 'açık, bulutsuz hava', 470, 310, { size: 38, weight: 700, color: '#FBF3DC', alpha: lk(4.6), align: 'center' });
      INK.label(ctx, 'şehir ışıklarından uzak', 735, 690, { size: 34, weight: 700, color: '#FBF3DC', alpha: lk(5.8), align: 'center' });
      ctx.restore();
      const tk = E.se(t, sg + 7.0, sg + 7.8, 'out');
      if (tk > 0) E.layer(ctx, tk, c => {
        F.card(c, 40, 760, 880, 140, { seed: 141 });
        INK.label(c, 'TÜBİTAK Ulusal Gözlemevi · Antalya', 70, 815, { size: 36, weight: 700 });
        INK.label(c, 'Doğu Anadolu Gözlemevi · Erzurum', 70, 870, { size: 36, weight: 700 });
      });
      INK.label(ctx, 'YER TABANLI', 480, 200, { size: 52, weight: 700, color: '#FBF3DC', align: 'center', alpha: E.se(t, sg + 0.4, sg + 1.2), font: 'Fraunces' });
      // --- sağ: uzay teleskopları ---
      const rk = E.se(t, sp - 0.2, sp + 0.8);
      ctx.save(); ctx.beginPath(); ctx.rect(960, 0, 960, E.H); ctx.clip();
      ctx.globalAlpha = 0.35 + 0.65 * rk;
      F.night(ctx, 1); F.stars(ctx, t, 1, { n: 60, seed: 77, area: [960, 0, 1920, 620] });
      const atm = ctx.createLinearGradient(0, 640, 0, 1080); atm.addColorStop(0, 'rgba(156,195,216,0)'); atm.addColorStop(0.35, 'rgba(156,195,216,0.75)'); atm.addColorStop(1, 'rgba(120,170,200,0.95)');
      ctx.fillStyle = atm; ctx.fillRect(960, 640, 960, 440);
      cloud(ctx, 1180, 800, 1, 160); cloud(ctx, 1600, 830, 1.2, 161);
      ctx.globalAlpha = 1;
      if (rk > 0) {
        E.layer(ctx, E.se(t, sp + 0.4, sp + 1.2), c => { F.hubble(c, 1230, 400, 0.85, t, { rot: -0.2 + Math.sin(t * 0.3) * 0.03 }); INK.label(c, 'Hubble', 1230, 560, { size: 42, weight: 700, color: '#FBF3DC', align: 'center' }); });
        E.layer(ctx, E.se(t, sp + 1.6, sp + 2.4), c => { F.webb(c, 1650, 390, 1.05, t); INK.label(c, 'James Webb', 1650, 560, { size: 42, weight: 700, color: '#FBF3DC', align: 'center' }); });
        INK.label(ctx, 'atmosfer ve bulutlar', 1440, 740, { size: 36, weight: 700, align: 'center', alpha: E.se(t, sp + 4.5, sp + 5.2) });
        INK.label(ctx, 'teleskoplar atmosferin dışında → net görüntü', 1440, 640, { size: 34, weight: 700, align: 'center', alpha: E.se(t, sp + 6, sp + 6.8), color: '#FBF3DC' });
        INK.label(ctx, '(çizim ölçekli değildir)', 1890, 890, { size: 26, align: 'right', alpha: 0.7, color: '#FBF3DC' });
      }
      INK.label(ctx, 'UZAY TELESKOPLARI', 1440, 200, { size: 52, weight: 700, color: '#FBF3DC', align: 'center', alpha: E.se(t, sp, sp + 0.8), font: 'Fraunces' });
      ctx.restore();
      stroke(ctx, [[960, 0], [962, 1080]], { w: 4, seed: 170, color: PAL.paper });
    }
  });
})();
