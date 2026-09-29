// SAHNE 4 — Tabloyu dört renkle boya (gruplandırır): metaller sol+orta, ametaller sağ üst, yarımetaller merdiven boyunca, soy gazlar 8A; H ametal!
(function () {
  const { PAL, stroke, line, circlePts } = INK;
  const U = U5;
  const GEO = { X0: 150, Y0: 196, GX: 90, GY: 72, W: 86, H: 66, FY: 724 };
  E.scene({
    name: 'Tabloyu boya', concept: 'Element sınıflarının tablodaki yerleri', from: 'paint', to: 'hyd', trFrom: [960, 450],
    draw(ctx, t) {
      const sp = E.s('paint'), s2 = E.s('place2'), sn = E.s('noble'), sh = E.s('hyd');
      // her sınıfın boyanma zamanı: metaller sütun sırasıyla (soldan sağa), ametal/yarımetal place2'de, soy gaz noble'da
      const paintK = (z, q) => {
        const c = U.clsOf(z); if (!c) return 0;
        if (c === 'metal') { const col = q.f ? 3 + q.i / 15 : q.c; return E.se(t, sp + 0.8 + (col - 1) * 0.28, sp + 1.3 + (col - 1) * 0.28); }
        if (c === 'ametal') return E.se(t, s2 + 0.3, s2 + 1.2);
        if (c === 'yari') return E.se(t, s2 + 3.0, s2 + 3.8);
        return E.se(t, sn + 0.3, sn + 1.2);
      };
      const hK = E.se(t, sh + 0.2, sh + 0.8);
      U.fullTable(ctx, GEO, (z, x, y, q) => {
        if (z < 0) { U.tile(ctx, x, y, GEO.W, GEO.H, '*', null, null, { lw: 1.4, tint: U.CLS.metal.c, tintA: 0.6 * E.se(t, sp + 1.3, sp + 1.8) }); return; }
        const c = U.clsOf(z), k = paintK(z, q);
        U.tile(ctx, x, y, GEO.W, GEO.H, U.SYM[z - 1], z, null, { lw: 1.4, tint: c ? U.CLS[c].c : null, tintA: 0.72 * k });
      });
      // f-bloğu yıldız notu
      U.txt(ctx, '*', GEO.X0 + 1 * GEO.GX + 40, GEO.FY + 50, { size: 44, align: 'center', alpha: 0.6 });
      // grup başlıkları
      U.GL.forEach((g, i) => U.txt(ctx, g, GEO.X0 + i * GEO.GX + GEO.W / 2, GEO.Y0 - 10, { size: 26, align: 'center', alpha: 0.55, color: g.endsWith('A') ? PAL.water : U.AMBER }));
      // merdiven çizgisi
      const stk = E.se(t, s2 + 2.2, s2 + 3.2);
      if (stk > 0) P.drawOn(ctx, U.stairPts(GEO), stk, { w: 6, color: PAL.ink });
      // renk anahtarı (tablodaki boşlukta)
      const keys = [['metal', sp + 0.6], ['ametal', s2 + 0.3], ['yari', s2 + 3.0], ['soy', sn + 0.3]];
      keys.forEach(([k, at], i) => {
        const kk = E.se(t, at, at + 0.6); if (kk <= 0) return;
        const x = 300 + i * 340, y = 208;
        ctx.save(); ctx.globalAlpha *= kk; P.fillPts(ctx, U.rect(x, y, x + 44, y + 40), U.CLS[k].c, 0.85); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.strokeRect(x, y, 44, 40); ctx.restore();
        P.write(ctx, U.CLS[k].pl, x + 56, y + 34, kk, { size: 36 });
      });
      // soy gaz sütunu vurgusu + not
      const nk = E.se(t, sn + 1.4, sn + 2.0) * (1 - E.se(t, sh, sh + 0.5));
      if (nk > 0) {
        const x = GEO.X0 + 17 * GEO.GX; ctx.save(); ctx.globalAlpha *= nk; stroke(ctx, U.rect(x - 8, GEO.Y0 - 8, x + GEO.W + 8, GEO.Y0 + 6 * GEO.GY + GEO.H + 8), { w: 4, closed: true, color: '#2F7A70', seed: 1601 }); ctx.restore();
        P.write(ctx, 'Soy gazlar da ametaldir,', 370, 330, nk, { size: 42, color: '#2F7A70' });
        P.write(ctx, 'ama ayrı ele alınır. →', 370, 384, E.seg(t, sn + 2.4, sn + 3.4) * nk / Math.max(nk, 1e-3), { size: 42, color: '#2F7A70' });
      }
      // hidrojen vurgusu
      if (hK > 0) {
        const [hx, hy] = U.tableXY(GEO, 1);
        const pulse = 1 + 0.04 * Math.sin(t * 6);
        ctx.save(); ctx.globalAlpha *= hK; stroke(ctx, circlePts(hx + GEO.W / 2, hy + GEO.H / 2, 62 * pulse, 56 * pulse, 50), { w: 5, closed: true, color: U.AMBER, seed: 1611 }); ctx.restore();
        P.arrow(ctx, [360, 318], [hx + GEO.W + 14, hy + GEO.H + 6], E.se(t, sh + 0.6, sh + 1.3), { w: 3.4, head: 14, color: U.AMBER, bend: -10 });
        P.write(ctx, 'H: 1A grubunda,', 380, 336, E.seg(t, sh + 1.2, sh + 2.0), { size: 42, color: U.AMBER });
        P.write(ctx, 'ama bir AMETAL!', 380, 390, E.seg(t, sh + 1.9, sh + 2.7), { size: 42, color: U.AMBER });
      }
      U.damla(ctx, t, { x: 1830, y: 905, s: 0.72, view: 'q3', flip: true, expr: t > sh ? 'surprised' : 'happy', look: [-0.8, -0.3], arms: [[-1, 1.6 + 0.2 * Math.sin(t * 8)], [1, 0.4]] });
    }
  });
})();
