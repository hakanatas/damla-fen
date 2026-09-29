// SAHNE 3 — Nitelikleri tanımlama: dönme ekseni, dolanma düzlemi, eksen eğikliği (≈23,5°), ekvator, dönenceler
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F81;
  const OX = 1100, OY = 560, R = 250, T = F.TILT;
  E.scene({
    name: 'Eksen eğikliği', concept: 'Nitelikleri tanımla', from: 'axis', to: 'lines', trFrom: [1100, 560],
    draw(ctx, t) {
      const sa = E.s('axis'), sp = E.s('plane'), st = E.s('tilt'), sl = E.s('lines');
      const [ax, ay] = F.axisVec(T), ex = Math.cos(T), ey = Math.sin(T);
      // dolanma düzlemi (arkada)
      const pk = E.se(t, sp + 0.3, sp + 1.6) * (1 - 0.7 * E.se(t, sl, sl + 1));
      if (pk > 0) {
        ctx.save(); ctx.globalAlpha *= pk;
        const pl = circlePts(OX, OY, 640 * E.se(t, sp + 0.3, sp + 1.6, 'out'), 62, 80);
        wash(ctx, pl, PAL.water, 0.22, 611, { bleed: 2, blooms: 1 }); stroke(ctx, pl, { w: 2.4, closed: true, dry: false, seed: 612, alpha: 0.8 });
        ctx.restore();
        E.inkText(ctx, 'dolanma düzlemi', 1600, 680, t, sp + 1.2, sl + 0.6, { size: 42, color: PAL.water, align: 'center' });
      }
      // Dünya
      F.globe(ctx, OX, OY, R, {
        tilt: T, axisK: E.se(t, sa + 1.2, sa + 2.6), axisExt: 1.3,
        lines: {}
      });
      // ekvator / dönenceler çizgilerini sırayla çiz (üstüne yeniden, ilerleyen)
      const lat = (phi, t0, col, seed) => { const [a, b] = F.latLine(OX, OY, R, T, phi); P.drawOn(ctx, F.dense(a, b, 6), E.se(t, t0, t0 + 0.8), { w: 4, color: col, dry: false, seed }); return a; };
      if (t > sl) {
        const e0 = lat(0, sl + 0.3, PAL.ink, 621), c0 = lat(T, sl + 2.8, F.AMBER, 622), k0 = lat(-T, sl + 3.6, F.AMBER, 623);
        const L = [[e0, 'Ekvator · 0°', sl + 0.8], [c0, 'Yengeç Dönencesi · 23,5° K', sl + 3.3], [k0, 'Oğlak Dönencesi · 23,5° G', sl + 4.1]];
        const ly = { 'Ekvator · 0°': 455, 'Yengeç Dönencesi · 23,5° K': 365, 'Oğlak Dönencesi · 23,5° G': 575 };
        L.forEach(([p, txt, t0], i) => {
          const k = E.se(t, t0, t0 + 0.6); if (k <= 0) return;
          ctx.save(); ctx.globalAlpha *= k;
          INK.label(ctx, txt, 790, ly[txt], { size: 38, weight: 700, align: 'right', color: i ? F.AMBER : PAL.ink });
          INK.leader(ctx, [800, ly[txt] - 12], p, { bend: 0.05 });
          ctx.restore();
        });
      }
      // dönme oku (kuzey kutbu çevresinde; üstten bakınca saat yönünün tersine → önde sağa)
      const rk = E.se(t, sa + 2.4, sa + 3.4);
      if (rk > 0) {
        const cx = OX - ax * R * 1.12, cy = OY - ay * R * 1.12;
        const arc = []; for (let i = 0; i <= 30; i++) { const a = Math.PI * (0.95 - 0.9 * i / 30); const u = Math.cos(a) * 70, v = Math.sin(a) * 20; arc.push([cx + u * ex - v * ax, cy + u * ey - v * ay]); }
        P.drawOn(ctx, arc, rk, { w: 3.4, color: F.AMBER, dry: false, seed: 631 });
        if (rk > 0.97) INK.arrowHead(ctx, arc[26], arc[30], 16, { w: 3, color: F.AMBER });
      }
      E.inkText(ctx, 'dönme ekseni', OX + ax * R * 1.3 - 250, OY + ay * R * 1.3 - 10, t, sa + 2.2, sp + 0.2, { size: 42, align: 'right', color: PAL.ink });
      // dik doğrultu + açı
      const tk = E.se(t, st + 0.4, st + 1.4);
      if (tk > 0) {
        F.dash(ctx, [OX, OY - R - 4], [OX, E.lerp(OY - R - 4, OY - R * 1.48, tk)], { w: 2.6, color: PAL.water });
        const ak = E.se(t, st + 1.6, st + 2.6);
        if (ak > 0) {
          const arc = []; for (let i = 0; i <= 20; i++) { const th = T * i / 20; arc.push([OX + Math.sin(th) * R * 1.16, OY - Math.cos(th) * R * 1.16]); }
          P.drawOn(ctx, arc, ak, { w: 3.4, color: F.AMBER, dry: false, seed: 641 });
        }
        E.inkText(ctx, 'dolanma düzlemine dik', OX - 20, OY - R * 1.48 + 20, t, st + 1.0, sl + 0.3, { size: 34, align: 'right', color: PAL.water });
        const lk = E.se(t, st + 2.4, st + 3.0);
        if (lk > 0) { ctx.save(); ctx.globalAlpha *= lk; INK.label(ctx, '≈ 23,5°', 1238, 300, { size: 50, weight: 700, color: F.AMBER }); ctx.restore(); }
      }
      // Kutup Yıldızı yönü
      const sk = E.se(t, st + 3.4, st + 4.2);
      if (sk > 0) { const sx = OX + ax * R * 1.6, sy = OY + ay * R * 1.6; F.star(ctx, sx, sy, 18, sk); ctx.save(); ctx.globalAlpha *= sk; INK.label(ctx, 'Kutup Yıldızı yönü', sx + 34, sy + 10, { size: 34 }); ctx.restore(); }
      INK.label(ctx, '(yandan görünüm · çizim ölçekli değildir)', 1860, 890, { size: 30, align: 'right', alpha: 0.55 });
      // Damla
      DAMLA.draw(ctx, { x: 250, y: 900, s: 1.0, view: 'q3', expr: t > st ? 'curious' : 'happy', look: [0.9, -0.5], blink: E.blink(t, 4), squash: E.breath(t), t, seed: 3,
        arms: [[-1, 0.35], [1, 2.0 + 0.1 * Math.sin(t * 2)]] });
    }
  });
})();
