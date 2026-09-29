// SAHNE 7 — Tutulma modeli önerme ve yenileme: el feneri (Güneş), oyun hamuru (Dünya, Ay), tel çember (FB.6.1.4 a, b)
(function () {
  const { PAL, line, stroke, circlePts, rng } = INK;
  const F = G62;
  const LX = 340, LY = 520, EX = 1080, EY = 520, RE = 70, RX = 330, RY = 80, MR = 20, H = 70;

  function torch(ctx) {
    const b = [[LX - 190, LY - 34], [LX - 10, LY - 44], [LX - 10, LY + 44], [LX - 190, LY + 34], [LX - 190, LY - 34]];
    P.fillPts(ctx, b, '#6D8FA6', 1); stroke(ctx, b, { w: 3, closed: true, seed: 5 });
    const h = [[LX - 10, LY - 44], [LX + 30, LY - 64], [LX + 30, LY + 64], [LX - 10, LY + 44]];
    P.fillPts(ctx, h, '#B9C9D2', 1); stroke(ctx, h.concat([h[0]]), { w: 3, closed: true, seed: 6 });
    INK.label(ctx, 'el feneri = Güneş', LX - 100, LY + 120, { size: 36, weight: 700, align: 'center' });
  }

  E.scene({
    name: 'Model', concept: 'Tutulma modeli önerme ve yenileme', from: 'model', to: 'revise', trFrom: [960, 540],
    draw(ctx, t) {
      const sm = E.s('model'), st = E.s('test'), sv = E.s('revise');
      // masa
      const tb = [[-50, 760], [E.W + 50, 760], [E.W + 50, 900], [-50, 900]];
      P.fillPts(ctx, tb, '#D9BE8E', 1); INK.wash(ctx, tb, '#8A6A45', 0.35, 101, { blooms: 1 });
      stroke(ctx, [[-50, 760], [E.W + 50, 758]], { w: 3.4, seed: 102, taper: 0.01 });
      // ışık demeti ve gölge
      const on = E.se(t, sm + 1.0, sm + 1.6);
      if (on > 0) {
        ctx.save(); ctx.globalAlpha = on;
        const g = ctx.createLinearGradient(LX, 0, EX, 0); g.addColorStop(0, 'rgba(246,217,160,0.75)'); g.addColorStop(1, 'rgba(246,217,160,0.35)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(LX + 30, LY - 60); ctx.lineTo(EX, EY - 150); ctx.lineTo(EX, EY + 150); ctx.lineTo(LX + 30, LY + 60); ctx.fill();
        P.fillPts(ctx, [[EX, EY - RE], [1900, EY - RE + 10], [1900, EY + RE - 10], [EX, EY + RE]], '#2A2A36', 0.28);
        ctx.restore();
      }
      torch(ctx);
      // ayak (çubuk) + Dünya
      line(ctx, [EX, EY + RE], [EX, 780], { w: 6 });
      // Ay'ın yörüngesi (tel çember): düz (Model 1) → eğik (Model 2)
      const tilt = E.se(t, sv + 0.2, sv + 1.0);
      const phi = E.lerp(0, Math.PI / 2, E.se(t, sv + 5.0, sv + 8.2)); // Dünya Güneş çevresinde ilerledikçe hiza değişir (modelde feneri döndürmek yerine)
      const off = a => -H * tilt * Math.cos(a) * Math.cos(phi);
      const ring = []; for (let i = 0; i <= 80; i++) { const a = i / 80 * 6.283; ring.push([EX + Math.cos(a) * RX, EY + Math.sin(a) * RY + off(a)]); }
      const rk = E.se(t, sm + 2.0, sm + 3.0);
      const back = ring.slice(40), front = ring.slice(0, 41);  // a∈[π,2π] arkada (üstte), a∈[0,π] önde
      if (rk > 0) { ctx.save(); ctx.globalAlpha = rk * 0.8; stroke(ctx, back, { w: 2.4, color: '#7E7466', dry: false }); ctx.restore(); }
      // Ay açısı: Model 1'de ~2,7 tur; Model 2'de de döner
      const speed = 6.283 / 3.2;
      const ma = t < st ? Math.PI * 0.6 : (t - st) * speed + Math.PI * 0.6;
      const mx = EX + Math.cos(ma) * RX, my = EY + Math.sin(ma) * RY + off(ma);
      const mFront = Math.sin(ma) > 0;
      const mk = P.pop(E.seg(t, sm + 2.4, sm + 3.2));
      const drawMoon = () => { if (mk > 0) {
        const inShadow = Math.cos(ma) > 0.97 && Math.abs(my - EY) < 40;
        P.moon(ctx, mx, my, MR * mk);
        if (inShadow) P.fillPts(ctx, circlePts(mx, my, MR + 1, MR + 1, 20), '#2A2A36', 0.75);
      } };
      if (!mFront) drawMoon();
      P.earth(ctx, EX, EY, RE);
      P.fillPts(ctx, P.arc(EX, EY, RE * 1.01, -Math.PI / 2, Math.PI / 2, 24), '#262A40', 0.45);
      // Ay önde ve fener ile Dünya arasında → Dünya'ya gölge
      const solar = Math.cos(ma) < -0.97 && Math.abs(my - EY) < 30 && mk > 0;
      if (solar) P.fillPts(ctx, circlePts(EX - RE + 12, my, 9, 16, 16), '#1C1B22', 0.8);
      if (rk > 0) { ctx.save(); ctx.globalAlpha = rk; stroke(ctx, front, { w: 3, color: '#7E7466', dry: false }); ctx.restore(); }
      if (mFront) drawMoon();
      // tutulma işareti
      const ecl = (Math.cos(ma) < -0.97 || Math.cos(ma) > 0.97) && Math.abs(my - EY) < 30 && t > st;
      if (ecl) { INK.label(ctx, 'tutulma!', mx, my - 50, { size: 44, weight: 700, align: 'center', color: '#8A4A10' }); }
      // sayaç
      if (t > st && t < sv + 0.6) {
        const turns = (t - st) * speed / 6.283, cnt = Math.floor(ma / Math.PI);
        E.inkText(ctx, 'Tur: ' + Math.floor(turns + 1) + '   ·   tutulma: ' + cnt, 1360, 250, t, st + 0.3, sv + 0.6, { size: 44, align: 'center' });
      }
      E.inkText(ctx, 'Her turda 2 tutulma?  Gerçekte böyle değil!', 960, 190, t, st + 5.0, sv + 0.4, { size: 46, align: 'center', color: '#A23A2A' });
      // başlıklar ve etiketler
      E.inkText(ctx, 'Model 1: düz yörünge', 960, 330, t, sm + 2.0, sv + 0.4, { size: 50, align: 'center' });
      E.inkText(ctx, 'Model 2: eğik yörünge (yenilendi)', 960, 330, t, sv + 0.6, 1e9, { size: 50, align: 'center', color: '#8A4A10' });
      E.inkText(ctx, 'oyun hamuru: Dünya ve Ay · tel çember: atık malzeme', 960, 850, t, sm + 3.4, 1e9, { size: 34, align: 'center', weight: 400 });
      const lab = E.se(t, sm + 3.0, sm + 3.8);
      if (lab > 0) { INK.label(ctx, 'Dünya', EX + 90, EY + 150, { size: 38, weight: 700, alpha: lab }); }
      if (t > sv + 2.6 && t < sv + 7) E.inkText(ctx, 'Ay, gölgenin üstünden ya da altından geçiyor', 960, 250, t, sv + 2.6, sv + 7.2, { size: 42, align: 'center' });
      E.inkText(ctx, 'Hizaya gelince tutulma olur.', 960, 250, t, sv + 7.4, 1e9, { size: 42, align: 'center' });
      E.inkText(ctx, '(model ölçekli değildir)', 1700, 890, t, sm + 3, 1e9, { size: 30, weight: 400, align: 'center', alpha: 0.7 });
    }
  });
})();
