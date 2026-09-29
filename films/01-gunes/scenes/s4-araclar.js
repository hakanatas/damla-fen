// SAHNE 4 — Bilgi toplama araçları + doğrulama (FB.5.1.1 a: araç belirler, c: doğrular; dijital kaynakların güvenilirliği)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const RED = '#A23A2A';
  E.scene({
    name: 'Araçlar', concept: 'Bilgi toplama araçları ve doğrulama', from: 'where', to: 'verify', trFrom: [960, 700],
    draw(ctx, t) {
      const sw = E.s('where'), st = E.s('tools'), sv = E.s('verify');
      ctx.save();
      // desk tint
      ctx.fillStyle = 'rgba(138,106,69,0.18)'; ctx.fillRect(0, 0, E.W, E.H);
      E.cam(ctx, { x: 960, y: 540, z: 1 + 0.02 * Math.sin(t * 0.3) });
      P.notebook(ctx, 150, 80, 1620, 920);
      P.write(ctx, 'Bilgi nereden toplanır?', 300, 190, E.seg(t, sw + 0.6, sw + 2.2), { size: 64 });
      if (t > sw + 2.2) P.drawOn(ctx, P.bez([296, 212], [600, 222], [930, 206], 30), E.se(t, sw + 2.2, sw + 2.8), { w: 3, color: PAL.light });

      const cards = [
        { ic: 'books', a: 'kütüphane', b: 'kitaplar, ansiklopediler', x: 430, at: st + 0.1 },
        { ic: 'laptop', a: 'dijital kaynaklar', b: 'güvenilir siteler', x: 790, at: st + 2.3 },
        { ic: 'observatory', a: 'gözlemevi', b: 'güneş filtreli teleskop', x: 1150, at: st + 4.7 },
        { ic: 'probe', a: 'uzay araçları', b: 'Güneş’e yaklaşan sondalar', x: 1510, at: st + 7.5 }
      ];
      const up = E.se(t, sv + 0.2, sv + 1.2);
      cards.forEach((c, i) => {
        const k = E.se(t, c.at, c.at + 0.6, 'out'); if (k <= 0) return;
        const y = E.lerp(470, 350, up), sc = E.lerp(1, 0.62, up);
        ctx.save(); ctx.translate(c.x, y); ctx.scale(P.pop(k) * sc, P.pop(k) * sc);
        const fr = INK.wobble([[-150, -150], [150, -154], [154, 170], [-152, 174], [-150, -150]].flatMap((p, j, a) => j < a.length - 1 ? [p, [(p[0] + a[j + 1][0]) / 2, (p[1] + a[j + 1][1]) / 2]] : [p]), 1.5, 40 + i);
        P.fillPts(ctx, fr, PAL.white, 0.85); stroke(ctx, fr, { w: 2.4, closed: true, seed: 50 + i });
        P.icon[c.ic](ctx, 0, -40, 0.85, t);
        ctx.font = '700 38px Kalam'; ctx.textAlign = 'center'; ctx.fillStyle = PAL.ink; ctx.fillText(c.a, 0, 98);
        ctx.font = '400 26px Kalam'; ctx.globalAlpha = 0.75; ctx.fillText(c.b, 0, 136);
        ctx.restore();
      });

      // --- verify: a claim seen online is checked against scientific sources + teacher ---
      if (t > sv + 0.6) {
        const kn = E.se(t, sv + 0.6, sv + 1.3, 'out');
        ctx.save(); ctx.translate(540, 720); ctx.rotate(-0.04); ctx.scale(P.pop(kn), P.pop(kn));
        const note = [[-300, -110], [300, -118], [306, 110], [-296, 116], [-300, -110]];
        P.fillPts(ctx, note, '#F6E7B8', 0.95); stroke(ctx, note, { w: 2.4, closed: true, seed: 61 });
        ctx.font = '400 28px Kalam'; ctx.fillStyle = PAL.ink; ctx.globalAlpha = 0.7; ctx.fillText('internette gördüm:', -260, -60); ctx.globalAlpha = 1;
        ctx.font = '700 40px Kalam'; ctx.fillText('“Güneş, Dünya’dan küçüktür!”', -260, 10);
        ctx.restore();
        // question → cross
        P.cross(ctx, 540, 725, 150, E.se(t, sv + 8.6, sv + 9.4), { w: 14, color: RED });
        if (t > sv + 9.2) INK.label(ctx, 'YANLIŞ', 700, 850, { size: 48, weight: 700, color: RED, alpha: E.se(t, sv + 9.2, sv + 9.8), rot: -0.08 });
        // check sources
        const kx = E.se(t, sv + 3.2, sv + 4.2);
        if (kx > 0) { P.arrow(ctx, [870, 700], [1030, 690], kx, { w: 3, bend: 20 }); }
        const rows = [['bilimsel kaynak', sv + 4.6], ['öğretmenim', sv + 6.6]];
        rows.forEach(([txt, at], i) => {
          const y = 650 + i * 110, k = E.se(t, at, at + 0.8); if (k <= 0) return;
          const box = [[1060, y - 40], [1120, y - 42], [1122, y + 18], [1062, y + 20], [1060, y - 40]];
          stroke(ctx, box, { w: 2.6, closed: true, seed: 70 + i });
          P.check(ctx, 1088, y - 14, 50, E.se(t, at + 0.5, at + 1.1), { w: 6 });
          P.write(ctx, txt, 1150, y + 8, k, { size: 44 });
        });
        if (t > sv + 7.6) P.write(ctx, '→ birden çok kaynakla karşılaştır', 1060, 900, E.seg(t, sv + 7.6, sv + 8.8), { size: 32, weight: 400 });
      }

      // Damla peeking at the corner of the notebook, pointing at the cards
      const pk = E.se(t, sw + 0.2, sw + 1.0, 'out');
      const pointing = t > st && t < sv;
      const target = pointing ? cards[Math.max(0, cards.filter(c => t > c.at).length - 1)] : null;
      DAMLA.draw(ctx, {
        x: 1690, y: 1060 + (1 - pk) * 300, s: 1.05, view: 'q3', flip: true,
        expr: t > sv && t < sv + 3.5 ? 'thinking' : (t > sv + 9 ? 'happy' : 'neutral'),
        look: target ? [-0.8, -0.5] : [-0.2, 0.1], blink: E.blink(t, 6), squash: E.breath(t), t, talk: E.talk(t), seed: 2,
        arms: pointing ? [[-1, 0.4], [1, 2.3 + Math.sin(t * 2) * 0.08]] : [[-1, 0.35], [1, 0.4]]
      });
      ctx.restore();
    }
  });
})();
