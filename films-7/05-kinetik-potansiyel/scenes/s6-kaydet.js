// SAHNE 6 — Kaydet + Sıra sende (çalışma kâğıdı: kendi cümleleriyle benzerlik-farklılık; E3.8 soru sorma) + sonraki film
(function () {
  const F = F7E;
  E.scene({
    name: 'Kaydet', concept: 'Bulguları kaydetme', from: 'record', to: 'record', trFrom: [960, 540],
    draw(ctx, t) {
      F.record(ctx, t, 'Gözlem Defteri · Kinetik ve potansiyel enerji', [
        'Enerji: iş yapabilme yeteneği; birimi joule (J).',
        'Kinetik: hareketten; sürat ve kütleye bağlı.',
        'Çekim potansiyel: yükseklik ve kütleye bağlı.',
        'Esneklik potansiyel: gerilen, sıkışan cisimde.',
        'Uçan kuşta ikisi birden vardır.'
      ], { size: 42, dy: 100, step: 1.5 });
    }
  });
  E.scene({
    name: 'Sıra sende · Sıradaki', concept: 'Görev ve sonraki konu', from: 'task', to: 'end', trFrom: [960, 540],
    draw(ctx, t) {
      F.outro(ctx, t, {
        task: ['Çevrende 3 kinetik, 3 potansiyel enerji örneği bul.', 'Her birini hareket ya da konum diye sınıflandır.', 'Benzerlik ve farklılıkları kendi cümlelerinle yaz.', 'Merak ettiğin bir soruyu da ekle!'],
        next: 'Enerji Kaybolur mu? Enerjinin Korunumu',
        name: '5 · Hareket ve Konum: Kinetik ve Potansiyel Enerji', code: 'FB.7.2.2',
        nextArt(c, t, sn) {
          const px = 1500, py = 430, Lp = 260, a = 0.6 * Math.cos((t - sn) * 2.2);
          INK.line(c, [px - 80, py], [px + 80, py], { w: 5, seed: 5900 });
          const bx = px + Math.sin(a) * Lp, by = py + Math.cos(a) * Lp;
          INK.line(c, [px, py], [bx, by], { w: 2, dry: false });
          F.ball(c, bx, by, 36, F.KE, 5901);
        }
      });
    }
  });
})();
