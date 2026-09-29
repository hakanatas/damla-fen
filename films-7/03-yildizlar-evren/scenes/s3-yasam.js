// SAHNE 3 — Yıldızların yaşamı: hiyerarşik ilişkiler ve uyumlu bütün (FB.7.1.4 a, b · KB2.4)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = U7;
  const YT = 340, YB = 690;
  function node(c, t, k, x, y, draw, name, o = {}) {
    if (k <= 0) return; E.layer(c, k, cc => { draw(cc); const ls = name.split('\n'); ls.forEach((ln, i) => INK.label(cc, ln, x, y + (o.ly ?? 100) + i * 36, { size: 32, weight: 700, color: '#FBF3DC', align: 'center' })); });
  }
  function arr(c, a, b, k) { if (k <= 0) return; c.save(); c.globalAlpha = k; P.arrow(c, a, b, k, { w: 3, color: '#F6D58A', head: 12 }); c.restore(); }
  E.scene({
    name: 'Yıldızların yaşamı', concept: 'Bulutsudan beyaz cüceye, kara deliğe', from: 'nebula', to: 'whole', trFrom: [180, 520],
    draw(ctx, t) {
      const sn = E.s('nebula'), sm = E.s('mass'), ss = E.s('small'), s2 = E.s('small2'), sb = E.s('big'), b2 = E.s('big2'), sw = E.s('whole');
      const K = (a) => E.se(t, a, a + 0.8, 'out');
      F.night(ctx, 1);
      F.stars(ctx, t, 0.6, { n: 60, seed: 93, area: [0, 150, E.W, 900] });
      // bulutsu → önyıldız
      node(ctx, t, K(sn + 0.3), 170, 515, c => F.nebula(c, 170, 515, 120, ['#C78FB0', '#7FA7D8', '#9C7CC0'], 21), 'bulutsu', { ly: 130 });
      const pk = K(sn + 4.5);
      node(ctx, t, pk, 420, 515, c => { F.nebula(c, 420, 515, 50, ['#E3A03A', '#C78FB0'], 22); F.star(c, 420, 515, 10, '#FFB38A', t, { spikes: false }); }, 'önyıldız');
      arr(ctx, [270, 515], [360, 515], pk);
      // dallanma
      const mk = K(sm + 0.5);
      arr(ctx, [470, 490], [600, YT + 10], mk); arr(ctx, [470, 540], [600, YB - 10], mk);
      INK.label(ctx, 'küçük kütleli', 540, 360, { size: 32, weight: 700, color: '#AFC8FF', alpha: mk, align: 'right' });
      INK.label(ctx, 'büyük kütleli', 540, 745, { size: 32, weight: 700, color: '#FFB38A', alpha: mk, align: 'right' });
      // küçük kütleli yol
      node(ctx, t, K(sm + 2.5), 680, YT, c => F.star(c, 680, YT, 16, '#FFF1B0', t), 'yıldız\n(Güneş gibi)', { ly: 80 });
      const rk = K(ss + 3.5); arr(ctx, [730, YT], [890, YT], rk);
      node(ctx, t, rk, 990, YT, c => { c.save(); c.globalAlpha *= 0.9; P.fillPts(c, circlePts(990, YT, 60, 60, 40), '#E8764A', 0.85); c.restore(); F.star(c, 990, YT, 16, '#FF9A6A', t, { spikes: false }); }, 'kırmızı dev', { ly: 100 });
      const gk = K(s2 + 0.5); arr(ctx, [1060, YT], [1200, YT], gk);
      node(ctx, t, gk, 1300, YT, c => { stroke(c, circlePts(1300, YT, 60, 52, 40), { w: 6, color: '#7FD0C8', closed: true, alpha: 0.7, dry: false }); F.nebula(c, 1300, YT, 60, ['#7FD0C8', '#C78FB0'], 23, 0.7); }, 'gezegenimsi\nbulutsu', { ly: 100 });
      const wk = K(s2 + 4.5); arr(ctx, [1370, YT], [1560, YT], wk);
      node(ctx, t, wk, 1640, YT, c => F.star(c, 1640, YT, 7, '#FFFFFF', t), 'beyaz cüce', { ly: 70 });
      // büyük kütleli yol
      node(ctx, t, K(sm + 3.5), 680, YB, c => F.star(c, 680, YB, 22, '#9DB8FF', t), 'büyük\nkütleli yıldız', { ly: 80 });
      const sk = K(sb + 3.0); arr(ctx, [740, YB], [880, YB], sk);
      node(ctx, t, sk, 990, YB, c => { P.fillPts(c, circlePts(990, YB, 82, 82, 40), '#C9503A', 0.8); F.star(c, 990, YB, 18, '#FF9A6A', t, { spikes: false }); }, 'kırmızı süperdev', { ly: 118 });
      const nk = K(sb + 5.5); arr(ctx, [1080, YB], [1200, YB], nk);
      node(ctx, t, nk, 1300, YB, c => { const R = INK.rng(7); const pts = []; for (let i = 0; i <= 18; i++) { const a = i / 18 * 6.283; const q = (i % 2 ? 30 : 70) * (0.8 + R() * 0.4); pts.push([1300 + Math.cos(a) * q, YB + Math.sin(a) * q]); } P.fillPts(c, pts, '#F6D58A', 0.9); F.star(c, 1300, YB, 16, '#FFFFFF', t); }, 'süpernova', { ly: 105 });
      const ek = K(b2 + 0.5);
      arr(ctx, [1370, YB - 20], [1560, YB - 90], ek); arr(ctx, [1370, YB + 20], [1560, YB + 90], K(b2 + 3.5));
      node(ctx, t, ek, 1640, YB - 100, c => F.star(c, 1640, YB - 100, 6, '#CFE0FF', t), 'nötron yıldızı', { ly: 50 });
      node(ctx, t, K(b2 + 3.5), 1640, YB + 90, c => { const g = c.createRadialGradient(1640, YB + 90, 10, 1640, YB + 90, 44); g.addColorStop(0, '#000'); g.addColorStop(0.6, '#000'); g.addColorStop(0.8, 'rgba(246,213,138,0.9)'); g.addColorStop(1, 'rgba(246,213,138,0)'); c.fillStyle = g; c.beginPath(); c.arc(1640, YB + 90, 44, 0, 7); c.fill(); }, 'kara delik', { ly: 76 });
      INK.label(ctx, 'milyarlarca yıl', 830, YT - 70, { size: 30, color: '#FBF3DC', alpha: 0.85 * K(ss + 1.5), align: 'center' });
      INK.label(ctx, 'daha kısa yaşam', 830, YB - 110, { size: 30, color: '#FBF3DC', alpha: 0.85 * K(sb + 1.2), align: 'center' });
      // bütün: kalıntılar yeni bulutsulara katılır
      const wh = E.se(t, sw + 0.6, sw + 3.5);
      if (wh > 0) { const pts = P.bez([1640, 250], [900, 150], [200, 400], 60); c2(pts, wh);
        const pts2 = P.bez([1560, YB + 170], [900, 960], [200, 640], 60); c2(pts2, wh); }
      function c2(p, k) { P.drawOn(ctx, p, k, { w: 3, color: '#C78FB0', dry: false }); if (k > 0.98) INK.arrowHead(ctx, p[p.length - 3], p[p.length - 1], 14, { w: 3, color: '#C78FB0' }); }
      INK.label(ctx, 'gaz ve toz → yeni bulutsular', 960, 165, { size: 36, weight: 700, color: '#E7B8D2', align: 'center', alpha: E.se(t, sw + 3, sw + 3.8) });
      INK.label(ctx, '(çizim ölçekli değildir)', 60, 900, { size: 26, color: '#FBF3DC', alpha: 0.7 });
    }
  });
})();
