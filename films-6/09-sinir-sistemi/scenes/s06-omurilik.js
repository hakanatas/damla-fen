// SAHNE 6 — Köprü: omurilik zedelenmesi, felç; omurgayı koruma
(function () {
  const { PAL, line } = INK; const K = KIT, F = F09;
  E.scene({
    name: 'Omurilik zedelenmesi', concept: 'Köprü: felç; omurgayı koruma', from: 'injury', to: 'protect', trFrom: [540, 700],
    draw(ctx, t) {
      const s = E.s('injury'), sp = E.s('protect');
      F.head(ctx, { hi: 'cord' });
      // zedelenme işareti
      const zk = E.se(t, s + 1.0, s + 1.6);
      if (zk > 0) { ctx.save(); ctx.globalAlpha = zk; const zz = [[495, 742], [515, 752], [528, 738], [546, 756], [562, 744], [580, 752]]; INK.stroke(ctx, zz, { w: 5, color: K.RED, dry: false }); ctx.restore(); }
      // sinyal yukarıdan gelir ama zedelenen yerde durur
      const cyc = ((t - s - 1.8) % 2.4 + 2.4) % 2.4 / 2.0;
      if (t > s + 1.8 && t < sp + 6) { F.pulse(ctx, [[540, 430], [540, 560], [538, 650], [536, 735]], Math.min(cyc, 0.999)); }
      const bl = E.se(t, s + 2.2, s + 2.8);
      if (bl > 0) { ctx.save(); ctx.globalAlpha = 0.45 * bl; ctx.fillStyle = PAL.paper; ctx.fillRect(505, 760, 70, 140); ctx.restore(); }
      const ik = E.se(t, s + 0.4, s + 1.0, 'out');
      if (ik > 0) E.layer(ctx, ik, c => {
        K.card(c, 980, 190, 840, 330, { seed: 8400 });
        K.text(c, 'Omurilik zedelenirse', 1030, 270, { size: 48, color: K.LIFE_D });
        P.write(c, 'haberler iletilemeyebilir', 1030, 360, E.seg(t, s + 2.0, s + 3.2), { size: 44 });
        P.write(c, '→ felç oluşabilir.', 1030, 440, E.seg(t, s + 3.4, s + 4.4), { size: 44 });
      });
      const pk = E.se(t, sp, sp + 0.7, 'out');
      if (pk > 0) E.layer(ctx, pk, c => {
        K.card(c, 980, 560, 840, 330, { seed: 8401, line: K.RED, w: 4, tint: K.RED, tintA: 0.05 });
        K.text(c, '⚠ Omurgamı korurum!', 1030, 635, { size: 48, color: K.RED });
        ['• bisiklette kask takarım', '• araçta emniyet kemeri bağlarım', '• sığ suya atlamam'].forEach((l, i) => P.write(c, l, 1030, 715 + i * 58, E.seg(t, sp + 0.8 + i * 1.3, sp + 1.8 + i * 1.3), { size: 40 }));
      });
    }
  });
})();
