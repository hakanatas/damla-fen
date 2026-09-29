// SAHNE 5 — Kalem neden kırık görünür? Uçtan gelen ışın yüzeyde kırılır; göz ışığı düz gelmiş sayar → uç yukarıda görünür.
// Yüzey noktası F712.surfPoint (ikiye bölme, Snell), görünen uç F712.apparent (birbirine yakın iki ışının geri uzantılarının kesişimi).
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F712, V = F.V;
  const WS = 520, T = [800, 790], Pn = [1080, WS], A = V.add(Pn, V.mul(V.sub(Pn, T), 0.72));
  const EYE = [470, 205];
  const AP = F.apparent(T, EYE, WS), S = AP.S, TA = AP.A;
  // balık kutucuğu
  const FW = 1500, FB = [1360, 1860], FT = [1400, 470], FEYE = [1400, 250];
  let FAP = null;

  E.scene({
    name: 'Kalem neden kırık?', concept: 'Görünen konum (kırılmanın sonucu)', from: 'why', to: 'fish', trFrom: [1080, 520],
    draw(ctx, t) {
      const sw = E.s('why'), sb = E.s('brain'), sf = E.s('fish');
      F.medium(ctx, 420, 1300, WS, 880, 'su');
      INK.label(ctx, 'su', 450, WS + 60, { size: 38, weight: 700, color: PAL.water });
      // gerçek kalem: su üstü + su içi (su içi, görünen konum çizilince soluklaşır)
      const ghost = E.se(t, sb + 3.2, sb + 4.2);
      ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 1920, WS); ctx.clip(); F.pencil(ctx, A, V.add(Pn, V.mul(V.norm(V.sub(T, A)), 40)), { seed: 501 }); ctx.restore();
      ctx.save(); ctx.beginPath(); ctx.rect(0, WS, 1920, 600); ctx.clip(); F.pencil(ctx, V.sub(Pn, V.mul(V.norm(V.sub(T, A)), 40)), T, { eraser: false, seed: 502, alpha: 1 - 0.6 * ghost }); ctx.restore();
      E.inkText(ctx, 'gerçek uç', T[0] - 40, T[1] + 60, t, sb + 4.0, 1e9, { size: 34, align: 'right' });
      // göz
      P.icon.eye(ctx, EYE[0] - 40, EYE[1] - 24, 0.5);
      INK.label(ctx, 'göz', EYE[0] - 130, EYE[1] + 50, { size: 34, weight: 700 });
      // ışın: uç → yüzey → göz
      const k1 = E.se(t, sw + 3.0, sw + 4.4), k2 = E.se(t, sw + 4.4, sw + 5.6);
      F.ray(ctx, T, S, k1, { seed: 511 });
      F.ray(ctx, S, EYE, k2, { seed: 512 });
      if (t > sw + 4.3) { F.dline(ctx, [S[0], S[1] - 110], [S[0], S[1] + 110], { w: 2.2, color: PAL.water, alpha: 0.7 }); F.glow(ctx, S[0], S[1], 60, E.se(t, sw + 4.3, sw + 5) * 0.8); }
      E.inkText(ctx, 'yüzeyde kırılır', S[0] + 30, S[1] - 26, t, sw + 5.0, sb + 0.5, { size: 34, color: '#8A4A10' });
      // göz ışığı düz gelmiş sayar → geri uzantı
      const kb = E.se(t, sb + 0.6, sb + 2.2);
      if (kb > 0) {
        F.dline(ctx, S, F.at(S, TA, kb), { color: PAL.ink, alpha: 0.6, w: 2.4 });
        if (kb > 0.95) {
          ctx.save(); ctx.beginPath(); ctx.rect(0, WS, 1920, 600); ctx.clip();
          E.layer(ctx, E.se(t, sb + 2.2, sb + 3.2), c => F.pencil(c, V.sub(Pn, V.mul(V.norm(V.sub(TA, Pn)), 40)), TA, { eraser: false, seed: 503 }));
          ctx.restore();
          E.inkText(ctx, 'görünen uç', TA[0] - 60, TA[1] + 70, t, sb + 2.8, 1e9, { size: 36, color: '#8A4A10', align: 'right' });
          if (t > sb + 3.4) { ctx.save(); ctx.globalAlpha *= E.se(t, sb + 3.4, sb + 4); P.arrow(ctx, [T[0] + 30, T[1] - 20], [TA[0] + 10, TA[1] + 30], 1, { w: 2.6, head: 12, bend: -10 }); ctx.restore(); }
        }
      }
      // balık: aynı neden
      const kf = E.se(t, sf + 0.2, sf + 0.9);
      if (kf > 0) E.layer(ctx, kf, c => {
        F.card(c, FB[0], 170, FB[1] - FB[0], 380, { seed: 521 });
        const pool = [[FB[0] + 20, 330], [FB[1] - 20, 330], [FB[1] - 20, 530], [FB[0] + 20, 530]];
        P.fillPts(c, pool, PAL.water, 0.22); line(c, pool[0], pool[1], { w: 3, color: PAL.water, dry: false });
        const FTr = [1700, 490], EY = [1440, 215];
        FAP = FAP || F.apparent(FTr, EY, 330);
        F.fish(c, FTr[0], FTr[1], 0.5, { alpha: 0.35 });
        F.fish(c, FAP.A[0], FAP.A[1], 0.5);
        F.ray(c, FTr, FAP.S, 1, { w: 2.4, head: 10, seed: 531 }); F.ray(c, FAP.S, EY, 1, { w: 2.4, head: 10, seed: 532 });
        F.dline(c, FAP.S, FAP.A, { color: PAL.ink, alpha: 0.5, w: 1.8, on: 8, off: 7 });
        P.icon.eye(c, EY[0] - 18, EY[1] - 8, 0.28);
        INK.label(c, 'görünen', FAP.A[0] + 40, FAP.A[1] - 18, { size: 26, color: '#8A4A10' });
        INK.label(c, 'gerçek', FTr[0] - 40, FTr[1] + 30, { size: 26, align: 'right', alpha: 0.7 });
      });
      DAMLA.draw(ctx, { x: 1690, y: 895, s: 0.95, view: 'q3', flip: true, expr: t > sb + 3 ? 'happy' : 'thinking', look: [-0.9, 0], blink: E.blink(t, 23), squash: E.breath(t), t, talk: E.talk(t), seed: 5,
        arms: [[-1, 0.35], [1, t > sw + 3 ? 2.0 : 0.35]] });
      INK.label(ctx, '(çizim ölçekli değildir)', 1290, 910, { size: 24, align: 'right', alpha: 0.5 });
    }
  });
})();
