// SAHNE 4 — Yeni kanıt: hilal akşamüstü Güneş'e yakın görünür; gölge ise Güneş'in ters yönünde → model yenilenmeli (FB.5.1.3 b)
(function () {
  const { PAL, line, stroke, circlePts, dashed } = INK;
  const RED = '#A23A2A', AMB = '#C07F1E';
  E.scene({
    name: 'Yeni kanıt', concept: 'Yeni kanıt ile modeli sorgulama', from: 'evidence', to: 'wrong', trFrom: [500, 500],
    draw(ctx, t) {
      const se = E.s('evidence'), sw = E.s('wrong');
      // sol: akşamüstü gökyüzü fotoğrafı
      const kp = E.se(t, se + 0.2, se + 1.0, 'out');
      const PX = 520, PY = 470, W = 760, H = 520;
      ctx.save(); ctx.translate(PX, PY); ctx.rotate(-0.02); ctx.globalAlpha = kp;
      F03.card(ctx, -W / 2 - 18, -H / 2 - 18, W + 36, H + 90, { seed: 51 });
      ctx.save(); ctx.beginPath(); ctx.rect(-W / 2, -H / 2, W, H); ctx.clip();
      const g = ctx.createLinearGradient(0, -H / 2, 0, H / 2); g.addColorStop(0, '#2E3558'); g.addColorStop(0.7, '#B7806A'); g.addColorStop(1, '#E8A55A');
      ctx.fillStyle = g; ctx.fillRect(-W / 2, -H / 2, W, H);
      const sg = ctx.createRadialGradient(170, H / 2 - 60, 10, 170, H / 2 - 60, 260); sg.addColorStop(0, 'rgba(255,220,150,0.95)'); sg.addColorStop(1, 'rgba(255,200,120,0)'); ctx.fillStyle = sg; ctx.fillRect(-W / 2, -H / 2, W, H);
      const hz = [[-W / 2, H / 2 - 70]]; for (let i = 1; i <= 16; i++) hz.push([-W / 2 + W * i / 16, H / 2 - 70 - Math.sin(i * 0.9) * 12]);
      P.fillPts(ctx, hz.concat([[W / 2, H / 2], [-W / 2, H / 2]]), '#3B3A33', 1);
      F03.phaseMoon(ctx, 20, -60, 34, 0.55, { rot: 0.7, litOnly: true, dark: '#6A5C72' });
      ctx.restore();
      stroke(ctx, [[-W / 2, -H / 2], [W / 2, -H / 2], [W / 2, H / 2], [-W / 2, H / 2], [-W / 2, -H / 2]], { w: 2.6, closed: true });
      INK.label(ctx, 'akşamüstü, batı ufku', 0, H / 2 + 56, { size: 34, align: 'center' });
      ctx.restore();
      const ka = E.se(t, se + 2.4, se + 3.4);
      if (ka > 0) {
        P.arrow(ctx, [PX + 40, PY - 20], [PX + 160, PY + 170], ka, { w: 3.4, color: '#FBF3DC', bend: -20, head: 14 });
        P.write(ctx, 'hilal', PX - 60, PY - 110, ka, { size: 40, color: '#FBF3DC' });
        P.write(ctx, 'Güneş yeni battı', PX - 20, PY + 160, E.seg(t, se + 3.2, se + 4.2), { size: 34, color: '#2A1E14' });
        P.write(ctx, 'hilal Güneş’e yakın!', PX, 850, E.seg(t, se + 4.2, se + 5.4), { size: 50, align: 'center' });
      }
      // sağ: model 1 ile karşılaştır
      const km = E.se(t, sw + 0.1, sw + 0.8);
      if (km > 0) E.layer(ctx, km, c => {
        F03.shadowModel(c, t, 1500, 490, 0.6, 1, { moon: false, labels: false });
        INK.label(c, 'Güneş', 1164, 355, { size: 36, weight: 700, align: 'center' }); INK.label(c, 'Dünya', 1500, 580, { size: 36, weight: 700, align: 'center' });
        P.arrow(c, [1470, 660], [1200, 660], E.se(t, sw + 0.8, sw + 1.8), { w: 4, color: AMB, bend: 0, head: 16 });
        P.write(c, 'hilal bu yönde', 1335, 720, E.seg(t, sw + 1.4, sw + 2.4), { size: 38, color: '#8A4A10', align: 'center' });
        P.arrow(c, [1560, 400], [1810, 400], E.se(t, sw + 2.4, sw + 3.4), { w: 4, bend: 0, head: 16 });
        P.write(c, 'gölge bu yönde', 1685, 368, E.seg(t, sw + 3.0, sw + 4.0), { size: 38, align: 'center' });
        P.write(c, 'Model 1', 1470, 240, 1, { size: 50, align: 'center' });
        P.cross(c, 1470, 222, 70, E.se(t, sw + 4.4, sw + 5.0), { w: 11, color: RED });
        if (t > sw + 5) INK.label(c, 'YANLIŞ', 1590, 240, { size: 44, weight: 700, color: RED, alpha: E.se(t, sw + 5, sw + 5.5), rot: -0.08 });
        P.write(c, '→ modeli yenile!', 1470, 820, E.seg(t, sw + 5.6, sw + 6.8), { size: 50, align: 'center', color: '#8A4A10' });
      });
    }
  });
})();
