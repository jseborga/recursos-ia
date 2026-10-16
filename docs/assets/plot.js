// Utilidades comunes: lienzo nítido, colores del tema y gráfica de series (lineal o logarítmica)
window.Lab = (function () {
  function css(v) { return getComputedStyle(document.documentElement).getPropertyValue(v).trim(); }

  function fit(canvas, aspect) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth || 600;
    const h = Math.round(w / aspect);
    const ctx = canvas.getContext("2d");
    if (canvas._w !== w || canvas._dpr !== dpr) {          // solo reasigna el lienzo si cambió su tamaño
      canvas.style.height = h + "px";
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      canvas._w = w; canvas._dpr = dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, w, h };
  }

  function nice(span) {
    const raw = span / 5, p = Math.pow(10, Math.floor(Math.log10(raw))), r = raw / p;
    return (r < 1.5 ? 1 : r < 3.5 ? 2 : r < 7.5 ? 5 : 10) * p;
  }

  // series: [{xs:[], ys:[], color:'--a', width:2, dash:[]}]
  function plot(canvas, aspect, series, o) {
    o = o || {};
    const { ctx, w, h } = fit(canvas, aspect);
    const L = 58, R = 12, T = 12, B = 38;
    ctx.fillStyle = css("--sheet"); ctx.fillRect(0, 0, w, h);
    let xmin = Infinity, xmax = -Infinity, ymin = Infinity, ymax = -Infinity;
    const tf = o.logY ? (y) => Math.log10(Math.max(y, 1e-300)) : (y) => y;
    series.forEach(s => s.xs.forEach((x, i) => {
      const y = tf(s.ys[i]); if (!isFinite(y)) return;
      xmin = Math.min(xmin, x); xmax = Math.max(xmax, x); ymin = Math.min(ymin, y); ymax = Math.max(ymax, y);
    }));
    if (o.xmin !== undefined) xmin = o.xmin; if (o.xmax !== undefined) xmax = o.xmax;
    if (o.ymin !== undefined) ymin = tf(o.ymin); if (o.ymax !== undefined) ymax = tf(o.ymax);
    if (!isFinite(xmin)) { xmin = 0; xmax = 1; ymin = 0; ymax = 1; }
    if (xmax === xmin) xmax = xmin + 1;
    if (ymax === ymin) { ymax += 1; ymin -= 1; }
    if (o.logY) { ymin = Math.floor(ymin); ymax = Math.ceil(ymax); }
    else { const pad = (ymax - ymin) * 0.08; ymax += pad; if (!o.zeroBase) ymin -= pad; }
    const X = x => L + (x - xmin) / (xmax - xmin) * (w - L - R);
    const Y = y => h - B - (y - ymin) / (ymax - ymin) * (h - T - B);
    ctx.font = "11px 'JetBrains Mono', monospace"; ctx.fillStyle = css("--muted"); ctx.strokeStyle = css("--grid"); ctx.lineWidth = 1;
    // ejes y rejilla
    const sx = nice(xmax - xmin);
    ctx.textAlign = "center"; ctx.textBaseline = "top";
    for (let x = Math.ceil(xmin / sx) * sx; x <= xmax + 1e-12; x += sx) {
      ctx.beginPath(); ctx.moveTo(X(x), T); ctx.lineTo(X(x), h - B); ctx.stroke();
      ctx.fillText(+x.toPrecision(6) + "", X(x), h - B + 5);
    }
    ctx.textAlign = "right"; ctx.textBaseline = "middle";
    if (o.logY) {
      const step = Math.max(1, Math.ceil((ymax - ymin) / 6));
      for (let e = ymin; e <= ymax; e += step) {
        ctx.beginPath(); ctx.moveTo(L, Y(e)); ctx.lineTo(w - R, Y(e)); ctx.stroke();
        ctx.fillText("1e" + e, L - 6, Y(e));
      }
    } else {
      const sy = nice(ymax - ymin);
      for (let y = Math.ceil(ymin / sy) * sy; y <= ymax + 1e-12; y += sy) {
        ctx.beginPath(); ctx.moveTo(L, Y(y)); ctx.lineTo(w - R, Y(y)); ctx.stroke();
        ctx.fillText(+y.toPrecision(6) + "", L - 6, Y(y));
      }
    }
    ctx.strokeStyle = css("--ink"); ctx.beginPath(); ctx.moveTo(L, T); ctx.lineTo(L, h - B); ctx.lineTo(w - R, h - B); ctx.stroke();
    ctx.textAlign = "center"; ctx.textBaseline = "bottom"; ctx.fillStyle = css("--muted");
    if (o.xLabel) ctx.fillText(o.xLabel, L + (w - L - R) / 2, h - 2);
    if (o.yLabel) { ctx.save(); ctx.translate(12, T + (h - T - B) / 2); ctx.rotate(-Math.PI / 2); ctx.textBaseline = "middle"; ctx.fillText(o.yLabel, 0, 0); ctx.restore(); }
    // series
    ctx.save(); ctx.beginPath(); ctx.rect(L, T, w - L - R, h - T - B); ctx.clip();
    series.forEach(s => {
      ctx.strokeStyle = css(s.color); ctx.lineWidth = s.width || 2; ctx.setLineDash(s.dash || []);
      ctx.beginPath(); let started = false;
      s.xs.forEach((x, i) => { const y = tf(s.ys[i]); if (!isFinite(y)) { started = false; return; }
        started ? ctx.lineTo(X(x), Y(y)) : ctx.moveTo(X(x), Y(y)); started = true; });
      ctx.stroke(); ctx.setLineDash([]);
      if (s.points) { ctx.fillStyle = css(s.color); s.xs.forEach((x, i) => { ctx.beginPath(); ctx.arc(X(x), Y(tf(s.ys[i])), 4, 0, 7); ctx.fill(); }); }
    });
    if (o.vline !== undefined) { ctx.strokeStyle = css("--muted"); ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(X(o.vline), T); ctx.lineTo(X(o.vline), h - B); ctx.stroke(); ctx.setLineDash([]); }
    ctx.restore();
    return { X, Y };
  }

  function fmt(x, n) { return Number.isFinite(x) ? x.toLocaleString("es-BO", { minimumFractionDigits: n, maximumFractionDigits: n }) : "—"; }
  function sci(x) {
    if (!Number.isFinite(x)) return "—";
    if (x === 0) return "0";
    const [m, e] = x.toExponential(1).split("e"), sup = { "-": "⁻", "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };
    return m.replace(".", ",") + " × 10" + String(+e).split("").map(c => sup[c] || "").join("");
  }
  const reduced = () => window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  return { css, fit, plot, fmt, sci, reduced };
})();
