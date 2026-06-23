/* ── Shared config ─────────────────────────────────────────────────── */

const CHART_FONT = "'Visa Dialect', system-ui, -apple-system, sans-serif";

Chart.defaults.font.family = CHART_FONT;
Chart.defaults.font.size   = 12;
Chart.defaults.color       = '#464853';

const instances = {};

function destroyChart(id) {
  if (instances[id]) {
    instances[id].destroy();
    instances[id] = null;
  }
}

function fmtBillion(v) {
  if (v === null || v === undefined) return '';
  if (v >= 1) return `$${v.toFixed(1)}B`;
  return `$${(v * 1000).toFixed(0)}M`;
}

/* Spend → "$9.8B" / "$94M";  Transactions → "9.8B" / "94M" (no dollar) */
function fmtValue(v, valueType) {
  if (v === null || v === undefined) return '';
  const prefix = valueType === 'totalSpend' ? '$' : '';
  if (v >= 1) return `${prefix}${v.toFixed(1)}B`;
  return `${prefix}${(v * 1000).toFixed(0)}M`;
}

function fmtDollar(v) {
  return `$${v.toFixed(2)}`;
}

/* ── Shared axis/grid styles ──────────────────────────────────────── */
function gridDefaults() {
  return {
    color: '#EBEBEB',
    drawTicks: false
  };
}

function tickDefaults() {
  return {
    color: '#808080',
    font: { family: CHART_FONT, size: 11 },
    padding: 6
  };
}

/* ── Plugin: draw value labels to the right of horizontal bars ─────── */
const hBarLabelPlugin = {
  id: 'hBarLabel',
  afterDraw(chart) {
    if (!chart.config.options.hBarLabel) return;
    const { ctx, data } = chart;
    const { formatter, color = '#464853', fontSize = 11 } = chart.config.options.hBarLabel;

    chart.data.datasets.forEach((dataset, dsIdx) => {
      const meta = chart.getDatasetMeta(dsIdx);
      meta.data.forEach((bar, idx) => {
        const raw = dataset.data[idx];
        if (raw === null || raw === undefined) return;
        const label = formatter ? formatter(raw, idx) : String(raw);
        ctx.save();
        ctx.font = `${fontSize}px ${CHART_FONT}`;
        ctx.fillStyle = color;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, bar.x + 6, bar.y);
        ctx.restore();
      });
    });
  }
};

/* ── Plugin: draw value labels above vertical bars ────────────────── */
const vBarLabelPlugin = {
  id: 'vBarLabel',
  afterDraw(chart) {
    if (!chart.config.options.vBarLabel) return;
    const { ctx } = chart;
    const { formatter, color = '#464853', fontSize = 11 } = chart.config.options.vBarLabel;

    chart.data.datasets.forEach((dataset, dsIdx) => {
      const meta = chart.getDatasetMeta(dsIdx);
      meta.data.forEach((bar, idx) => {
        const raw = dataset.data[idx];
        if (raw === null || raw === undefined) return;
        const label = formatter ? formatter(raw, idx) : String(raw);
        ctx.save();
        ctx.font = `${fontSize}px ${CHART_FONT}`;
        ctx.fillStyle = color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(label, bar.x, bar.y - 4);
        ctx.restore();
      });
    });
  }
};

/* ── Plugin: donut center text ────────────────────────────────────── */
const donutCenterPlugin = {
  id: 'donutCenter',
  beforeDraw(chart) {
    if (!chart.config.options.donutCenter) return;
    const { ctx, chartArea } = chart;
    if (!chartArea) return;
    const { line1, line2 } = chart.config.options.donutCenter;
    const cx = (chartArea.left + chartArea.right) / 2;
    const cy = (chartArea.top  + chartArea.bottom) / 2;

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (line1) {
      ctx.font = `600 15px ${CHART_FONT}`;
      ctx.fillStyle = '#02041C';
      ctx.fillText(line1, cx, line2 ? cy - 9 : cy);
    }
    if (line2) {
      ctx.font = `400 11px ${CHART_FONT}`;
      ctx.fillStyle = '#808080';
      ctx.fillText(line2, cx, cy + 9);
    }
    ctx.restore();
  }
};

/* ── Plugin: donut outer labels ───────────────────────────────────── */
const donutOuterLabelPlugin = {
  id: 'donutOuterLabel',
  afterDraw(chart) {
    if (chart.config.type !== 'doughnut') return;
    const { ctx, data } = chart;
    const meta = chart.getDatasetMeta(0);

    meta.data.forEach((arc, i) => {
      const { startAngle, endAngle } = arc;
      const midAngle  = (startAngle + endAngle) / 2;
      const outerR    = arc.outerRadius;
      const labelR    = outerR + 12;
      const lx        = arc.x + Math.cos(midAngle) * labelR;
      const ly        = arc.y + Math.sin(midAngle) * labelR;

      const pct   = data.datasets[0].data[i];
      const label = data.labels[i];
      const text  = `${label}: ${pct}%`;

      // text-anchor side
      let align = 'center';
      if (Math.cos(midAngle) > 0.2)  align = 'left';
      if (Math.cos(midAngle) < -0.2) align = 'right';

      ctx.save();
      ctx.font = `400 11px ${CHART_FONT}`;
      ctx.fillStyle = '#464853';
      ctx.textAlign = align;
      ctx.textBaseline = 'middle';
      ctx.fillText(text, lx, ly);
      ctx.restore();
    });
  }
};

Chart.register(hBarLabelPlugin, vBarLabelPlugin, donutCenterPlugin, donutOuterLabelPlugin);

/* ═══════════════════════════════════════════════════════════════════
   Chart 1 — Monthly Spend Trends
═══════════════════════════════════════════════════════════════════ */
function renderMonthlyChart(d, state, chartType = 'line') {
  destroyChart('monthly');
  const ctx = document.getElementById('chart-monthly');
  if (!ctx) return;

  const m = d.monthly;
  const isLine = chartType === 'line';
  const curYear  = state.year;
  const prevYear = state.year - 1;
  const twoYear  = state.year - 2;

  /* Canada → billions; smaller countries → millions */
  const isMillions = state.country !== 'canada';
  const prefix = state.valueType === 'totalSpend' ? '$' : '';
  const fmtY = v => {
    if (v === null || v === undefined) return '';
    return isMillions
      ? `${prefix}${(v * 1000).toFixed(0)}M`
      : `${prefix}${v.toFixed(1)}B`;
  };
  const yAxisUnit = state.valueType === 'totalSpend'
    ? (isMillions ? 'TOTAL SPEND (IN MILLIONS)'       : 'TOTAL SPEND (IN BILLIONS)')
    : (isMillions ? 'TOTAL TRANSACTIONS (IN MILLIONS)' : 'TOTAL TRANSACTIONS (IN BILLIONS)');

  const baseDataset = {
    fill: false,
    tension: 0.35,
    spanGaps: false,
    pointRadius: isLine ? 4 : 0,
    pointHoverRadius: isLine ? 6 : 0,
  };

  instances.monthly = new Chart(ctx, {
    type: isLine ? 'line' : 'bar',
    data: {
      labels: MONTHS,
      datasets: [
        {
          ...baseDataset,
          label: String(twoYear),
          data: m.twoYearsPrior,
          borderColor:     '#98C7E7',
          backgroundColor: isLine ? 'transparent' : 'rgba(152,199,231,0.85)',
          borderWidth: isLine ? 1.5 : 0,
          pointBackgroundColor: '#98C7E7',
          pointRadius: isLine ? 3 : 0,
          pointHoverRadius: isLine ? 5 : 0,
          order: 1
        },
        {
          ...baseDataset,
          label: String(prevYear),
          data: m.previous,
          borderColor:     '#9187D6',
          backgroundColor: isLine ? 'transparent' : 'rgba(145,135,214,0.85)',
          borderWidth: isLine ? 1.5 : 0,
          pointBackgroundColor: '#9187D6',
          pointRadius: isLine ? 3 : 0,
          pointHoverRadius: isLine ? 5 : 0,
          order: 2
        },
        {
          ...baseDataset,
          label: String(curYear),
          data: m.current,
          borderColor:     '#112AA7',
          backgroundColor: isLine ? 'transparent' : 'rgba(17,42,167,0.85)',
          borderWidth: isLine ? 2.5 : 0,
          pointBackgroundColor: '#112AA7',
          order: 3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          itemSort: (a, b) => b.datasetIndex - a.datasetIndex,
          callbacks: {
            label(ctx) {
              const v = ctx.raw;
              if (v === null) return null;
              return ` ${ctx.dataset.label}: ${fmtY(v)}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { ...gridDefaults(), drawOnChartArea: true },
          ticks: { ...tickDefaults() },
          border: { display: false }
        },
        y: {
          grid: gridDefaults(),
          ticks: {
            ...tickDefaults(),
            callback(v) { return fmtY(v); }
          },
          border: { display: false },
          title: {
            display: true,
            text: yAxisUnit,
            color: '#808080',
            font: { family: CHART_FONT, size: 10, weight: '500' },
            padding: { bottom: 8 }
          }
        }
      }
    }
  });
}

/* ═══════════════════════════════════════════════════════════════════
   Heatmap tooltip helpers
═══════════════════════════════════════════════════════════════════ */
function ensureHeatmapTooltip() {
  let el = document.getElementById('heatmap-tooltip');
  if (!el) {
    el = document.createElement('div');
    el.id = 'heatmap-tooltip';
    document.body.appendChild(el);
  }
  return el;
}

function hideHeatmapTooltip() {
  const el = document.getElementById('heatmap-tooltip');
  if (el) el.style.display = 'none';
}

function showHeatmapTooltip(hit, clientX, clientY, isTouch) {
  const el   = ensureHeatmapTooltip();
  const sign  = hit.value >= 0 ? '+' : '';
  const color = hit.value >= 0 ? '#112AA7' : '#AD2929';

  el.innerHTML =
    `<div class="htm-industry">${hit.industry}</div>` +
    `<div class="htm-year">${hit.year}</div>` +
    `<div class="htm-value" style="color:${color}">${sign}${hit.value.toFixed(1)}%</div>` +
    `<div class="htm-label">Year-over-year growth</div>`;

  el.style.display = 'block';

  const TW = el.offsetWidth  || 170;
  const TH = el.offsetHeight || 90;
  const VW = window.innerWidth;
  const VH = window.innerHeight;
  let x, y;

  if (isTouch) {
    x = clientX - TW / 2;
    y = clientY - TH - 20;
    if (y < 10) y = clientY + 28;
  } else {
    x = clientX + 16;
    y = clientY + 16;
    if (x + TW > VW - 10) x = clientX - TW - 16;
    if (y + TH > VH - 10) y = clientY - TH - 16;
  }

  el.style.left = Math.max(8, x) + 'px';
  el.style.top  = Math.max(8, y) + 'px';
}

function heatmapHitTest(cx, cy, layout) {
  const { gridX, PAD_TOP, HEADER_H, COLS, ROWS, cellW, cellH, CELL_GAP, years, rows } = layout;
  if (cx < gridX || cy < PAD_TOP + HEADER_H) return null;

  const col = Math.floor((cx - gridX) / (cellW + CELL_GAP));
  const row = Math.floor((cy - PAD_TOP - HEADER_H) / (cellH + CELL_GAP));
  if (col < 0 || col >= COLS || row < 0 || row >= ROWS) return null;

  /* confirm we're inside the cell, not in a gap */
  const cellX = gridX + col * (cellW + CELL_GAP);
  const rowY  = PAD_TOP + HEADER_H + row * (cellH + CELL_GAP);
  if (cx > cellX + cellW || cy > rowY + cellH) return null;

  return { year: years[col], industry: rows[row].name, value: rows[row].values[col] };
}

/* ═══════════════════════════════════════════════════════════════════
   Chart 2 — Industry Spend Overview (heatmap view)
═══════════════════════════════════════════════════════════════════ */
function renderIndustryHeatmap(canvas, hmData) {
  const wrap = canvas.parentElement;
  const W    = wrap.offsetWidth;
  const H    = wrap.offsetHeight;
  canvas.width  = W;
  canvas.height = H;

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, H);

  /* reverse so oldest year is left-most, selected year is right-most */
  const years = [...hmData.years].reverse();
  const rows  = hmData.rows.map(r => ({ name: r.name, values: [...r.values].reverse() }));
  const COLS  = years.length;
  const ROWS  = rows.length;

  const LABEL_W   = 222;
  const LABEL_GAP = 14;
  const HEADER_H  = 36;
  const PAD_TOP   = 6;
  const PAD_BOT   = 4;
  const CELL_GAP  = 6;

  const gridX = LABEL_W + LABEL_GAP;
  const gridW = W - gridX;
  const gridH = H - HEADER_H - PAD_TOP - PAD_BOT;
  const cellW = (gridW - CELL_GAP * (COLS - 1)) / COLS;
  const cellH = (gridH - CELL_GAP * (ROWS - 1)) / ROWS;

  const font = `'Visa Dialect', system-ui, sans-serif`;

  function heatBg(pct) {
    if (pct >= 0) {
      const t = Math.min(pct / 20, 1);
      return `rgb(${Math.round(240 - t*223)},${Math.round(243 - t*201)},${Math.round(255 - t*88)})`;
    }
    const t = Math.min(Math.abs(pct) / 30, 1);
    return `rgb(${Math.round(240 - t*67)},${Math.round(243 - t*202)},${Math.round(255 - t*214)})`;
  }

  function heatTextColor(pct) {
    const bg  = heatBg(pct);
    const m   = bg.match(/rgb\((\d+),(\d+),(\d+)\)/);
    if (!m) return '#02041C';
    const lum = (0.299*+m[1] + 0.587*+m[2] + 0.114*+m[3]) / 255;
    return lum < 0.52 ? '#FFFFFF' : '#02041C';
  }

  /* column headers */
  ctx.font         = `600 16px ${font}`;
  ctx.fillStyle    = '#464853';
  ctx.textAlign    = 'center';
  ctx.textBaseline = 'middle';
  for (let c = 0; c < COLS; c++) {
    const x = gridX + c * (cellW + CELL_GAP) + cellW / 2;
    ctx.fillText(String(years[c]), x, PAD_TOP + HEADER_H / 2);
  }

  /* rows */
  for (let r = 0; r < ROWS; r++) {
    const rowY = PAD_TOP + HEADER_H + r * (cellH + CELL_GAP);
    const midY = rowY + cellH / 2;

    ctx.font         = `400 12px ${font}`;
    ctx.fillStyle    = '#464853';
    ctx.textAlign    = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(rows[r].name, 0, midY);

    for (let c = 0; c < COLS; c++) {
      const val   = rows[r].values[c];
      const cellX = gridX + c * (cellW + CELL_GAP);

      ctx.fillStyle = heatBg(val);
      ctx.beginPath();
      ctx.roundRect(cellX, rowY, cellW, cellH, 4);
      ctx.fill();

      const sign = val >= 0 ? '+' : '';
      ctx.font         = `500 12px ${font}`;
      ctx.fillStyle    = heatTextColor(val);
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${sign}${val.toFixed(1)}%`, cellX + cellW / 2, midY);
    }
  }

  /* ── Tooltip interaction ─────────────────────────────────────── */
  const layout = { gridX, PAD_TOP, HEADER_H, COLS, ROWS, cellW, cellH, CELL_GAP, years, rows };

  const onMove = e => {
    const rect = canvas.getBoundingClientRect();
    const hit  = heatmapHitTest(e.clientX - rect.left, e.clientY - rect.top, layout);
    hit ? showHeatmapTooltip(hit, e.clientX, e.clientY, false) : hideHeatmapTooltip();
  };

  const onLeave = () => hideHeatmapTooltip();

  const onTouch = e => {
    const touch = e.touches[0];
    const rect  = canvas.getBoundingClientRect();
    const hit   = heatmapHitTest(touch.clientX - rect.left, touch.clientY - rect.top, layout);
    if (!hit) return;
    showHeatmapTooltip(hit, touch.clientX, touch.clientY, true);
    clearTimeout(canvas._hmTimer);
    canvas._hmTimer = setTimeout(hideHeatmapTooltip, 3000);
  };

  canvas._hmHandlers = { move: onMove, leave: onLeave, touch: onTouch };
  canvas.addEventListener('mousemove',  onMove);
  canvas.addEventListener('mouseleave', onLeave);
  canvas.addEventListener('touchstart', onTouch, { passive: true });
}

/* ═══════════════════════════════════════════════════════════════════
   Chart 2 — Industry Spend Overview (bar view)
═══════════════════════════════════════════════════════════════════ */
function renderIndustryChart(d, state, chartType = 'bar') {
  /* remove previous heatmap listeners and hide any open tooltip */
  const prevCanvas = document.getElementById('chart-industry');
  if (prevCanvas && prevCanvas._hmHandlers) {
    prevCanvas.removeEventListener('mousemove',  prevCanvas._hmHandlers.move);
    prevCanvas.removeEventListener('mouseleave', prevCanvas._hmHandlers.leave);
    prevCanvas.removeEventListener('touchstart', prevCanvas._hmHandlers.touch);
    clearTimeout(prevCanvas._hmTimer);
    delete prevCanvas._hmHandlers;
  }
  hideHeatmapTooltip();

  destroyChart('industry');
  const ctx = document.getElementById('chart-industry');
  if (!ctx) return;

  /* update subtitle */
  const subEl = document.getElementById('industry-subtitle');
  if (subEl) {
    if (chartType === 'heatmap') {
      const { years } = d.industryHeatmap;
      subEl.textContent = `Year-over-year growth by industry — ${years.join(', ')}`;
    } else {
      const typeLabel = state.valueType === 'totalSpend' ? 'spend' : 'transactions';
      const yearLabel = state.year === 2026
        ? '2026 year to date (January – June)'
        : String(state.year);
      subEl.textContent = `Total ${typeLabel} by industry, ${yearLabel}`;
    }
  }

  if (chartType === 'heatmap') {
    renderIndustryHeatmap(ctx, d.industryHeatmap);
    return;
  }

  // Sort descending by value, keeping 'Other' pinned to the bottom
  const raw = [...d.industrySpend];
  const otherIdx = raw.findIndex(r => r.name === 'Other');
  const other = otherIdx >= 0 ? raw.splice(otherIdx, 1)[0] : null;
  raw.sort((a, b) => b.value - a.value);
  const industries = other ? [...raw, other] : raw;

  const labels = industries.map(r => r.name);
  const values = industries.map(r => r.value);
  const maxVal = Math.max(...values);

  /* Canada + Chile → always B; smaller countries → always M with decimals */
  const isMillions = state.country !== 'canada' && state.country !== 'chile';
  const fmtIndVal = v => {
    if (v === null || v === undefined) return '';
    if (v === 0) return '0';
    const prefix = state.valueType === 'totalSpend' ? '$' : '';
    if (isMillions) {
      const m = v * 1000;
      if (m >= 100) return `${prefix}${Math.round(m)}M`;
      if (m >= 10)  return `${prefix}${m.toFixed(0)}M`;
      if (m >= 1)   return `${prefix}${m.toFixed(1)}M`;
      return `${prefix}${m.toFixed(2)}M`;
    }
    return `${prefix}${v.toFixed(1)}B`;
  };
  const xAxisTitle = state.valueType === 'totalSpend'
    ? `Total spend (in ${isMillions ? 'millions' : 'billions'})`
    : `Total transactions (in ${isMillions ? 'millions' : 'billions'})`;

  instances.industry = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Total Spend',
        data: values,
        backgroundColor: '#112AA7',
        borderRadius: 2,
        barThickness: 18
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      hBarLabel: {
        formatter: fmtIndVal,
        color: '#464853',
        fontSize: 11
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label(ctx) { return ` ${fmtIndVal(ctx.raw)}`; }
          }
        }
      },
      layout: { padding: { right: 70 } },
      scales: {
        y: {
          grid: { display: false },
          ticks: {
            ...tickDefaults(),
            font: { family: CHART_FONT, size: 11 }
          },
          border: { display: false }
        },
        x: {
          grid: gridDefaults(),
          ticks: {
            ...tickDefaults(),
            callback(v) { return fmtIndVal(v); }
          },
          border: { display: false },
          title: {
            display: true,
            text: xAxisTitle,
            color: '#808080',
            font: { family: CHART_FONT, size: 10 }
          },
          max: maxVal * 1.35
        }
      }
    }
  });
}

/* ═══════════════════════════════════════════════════════════════════
   Chart 3 — Top 5 Cities by Total Spend
═══════════════════════════════════════════════════════════════════ */
function renderCitiesSpendChart(d, state) {
  destroyChart('citiesSpend');
  const ctx = document.getElementById('chart-cities-spend');
  if (!ctx) return;

  const cities = d.topCitiesSpend;
  const labels = cities.map((c, i) => `${i + 1}. ${c.city}`);
  const values = cities.map(c => c.value);
  const maxVal = Math.max(...values);

  instances.citiesSpend = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: '#112AA7',
        borderRadius: 2,
        barThickness: 14
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      hBarLabel: {
        formatter: (v) => fmtValue(v, state.valueType),
        color: '#464853',
        fontSize: 11
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label(ctx) { return ` ${fmtValue(ctx.raw, state.valueType)}`; }
          }
        }
      },
      layout: { padding: { right: 64 } },
      scales: {
        y: {
          grid: { display: false },
          ticks: {
            ...tickDefaults(),
            font: { family: CHART_FONT, size: 11 }
          },
          border: { display: false }
        },
        x: {
          display: false,
          max: maxVal * 1.35
        }
      }
    }
  });
}

/* ═══════════════════════════════════════════════════════════════════
   Chart 4 — Top 5 Cities by YoY Growth
═══════════════════════════════════════════════════════════════════ */
function renderCitiesYoYChart(d) {
  destroyChart('citiesYoY');
  const ctx = document.getElementById('chart-cities-yoy');
  if (!ctx) return;

  const cities = d.topCitiesYoY;
  const labels = cities.map((c, i) => `${i + 1}. ${c.city}`);
  const values = cities.map(c => c.pct);
  const maxVal = Math.max(...values);

  instances.citiesYoY = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: '#112AA7',
        borderRadius: 2,
        barThickness: 14
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      hBarLabel: {
        formatter: (v) => `+${v.toFixed(1)}% YoY`,
        color: '#464853',
        fontSize: 11
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label(ctx) { return ` +${ctx.raw.toFixed(1)}% YoY`; }
          }
        }
      },
      layout: { padding: { right: 80 } },
      scales: {
        y: {
          grid: { display: false },
          ticks: {
            ...tickDefaults(),
            font: { family: CHART_FONT, size: 11 }
          },
          border: { display: false }
        },
        x: {
          display: false,
          max: maxVal * 1.6
        }
      }
    }
  });
}

/* ═══════════════════════════════════════════════════════════════════
   Chart 5 — Spend by Card Type (donut)
═══════════════════════════════════════════════════════════════════ */
function renderCardTypeChart(d) {
  destroyChart('cardType');
  const ctx = document.getElementById('chart-card-type');
  if (!ctx) return;

  const ct = d.cardType;

  instances.cardType = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Credit', 'Debit', 'Prepaid'],
      datasets: [{
        data: [ct.credit, ct.debit, ct.prepaid],
        backgroundColor: ['#112AA7', '#9187D6', '#CDC4E0'],
        borderColor: ['#112AA7', '#9187D6', '#CDC4E0'],
        borderWidth: 1,
        hoverOffset: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '62%',
      rotation: 150,
      layout: { padding: 18 },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label(ctx) { return ` ${ctx.label}: ${ctx.raw}%`; }
          }
        }
      }
    }
  });
}

/* ═══════════════════════════════════════════════════════════════════
   Chart 6 — Cross-Border Average Ticket Size
═══════════════════════════════════════════════════════════════════ */
function renderCrossTicketChart(d) {
  destroyChart('crossTicket');
  const ctx = document.getElementById('chart-cross-ticket');
  if (!ctx) return;

  const t = d.crossBorderTicket;

  instances.crossTicket = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Domestic', 'Inbound', 'Outbound'],
      datasets: [{
        data: [t.domestic, t.inbound, t.outbound],
        backgroundColor: ['#112AA7', '#1434CB', '#15195A'],
        borderRadius: 3,
        barThickness: 40
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      vBarLabel: {
        formatter: (v) => fmtDollar(v),
        color: '#464853',
        fontSize: 11
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label(ctx) { return ` ${fmtDollar(ctx.raw)}`; }
          }
        }
      },
      layout: { padding: { top: 22 } },
      scales: {
        x: {
          grid: { display: false },
          ticks: { ...tickDefaults() },
          border: { display: false }
        },
        y: {
          display: false,
          min: 0,
          max: Math.max(t.domestic, t.inbound, t.outbound) * 1.3
        }
      }
    }
  });
}

/* ═══════════════════════════════════════════════════════════════════
   Chart 7 — Cross-Border Total Spend
═══════════════════════════════════════════════════════════════════ */
function renderCrossSpendChart(d, state) {
  destroyChart('crossSpend');
  const ctx = document.getElementById('chart-cross-spend');
  if (!ctx) return;

  const s = d.crossBorderSpend;

  instances.crossSpend = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Domestic', 'Inbound', 'Outbound'],
      datasets: [{
        data: [s.domestic, s.inbound, s.outbound],
        backgroundColor: ['#112AA7', '#1434CB', '#15195A'],
        borderRadius: 3,
        barThickness: 40
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      vBarLabel: {
        formatter: (v) => fmtValue(v, state.valueType),
        color: '#464853',
        fontSize: 11
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label(ctx) { return ` ${fmtValue(ctx.raw, state.valueType)}`; }
          }
        }
      },
      layout: { padding: { top: 22 } },
      scales: {
        x: {
          grid: { display: false },
          ticks: { ...tickDefaults() },
          border: { display: false }
        },
        y: {
          display: false,
          min: 0,
          max: Math.max(s.domestic, s.inbound, s.outbound) * 1.3
        }
      }
    }
  });
}

/* ═══════════════════════════════════════════════════════════════════
   Render all charts
═══════════════════════════════════════════════════════════════════ */
function renderAllCharts(state, monthlyChartType = 'line', industryChartType = 'bar') {
  const d = getData(state.country, state.year, state.valueType, state.transactionType, state.cardType);
  if (!d) {
    console.warn('No data for state:', state);
    return;
  }

  renderMonthlyChart(d, state, monthlyChartType);
  renderIndustryChart(d, state, industryChartType);
  renderCitiesSpendChart(d, state);
  renderCitiesYoYChart(d);
  renderCardTypeChart(d);
  renderCrossTicketChart(d);
  renderCrossSpendChart(d, state);

  /* ── Update panel DOM labels ─────────────────────────────────── */
  const cardTotalEl = document.getElementById('card-type-total');
  if (cardTotalEl) {
    const label = state.valueType === 'totalSpend' ? 'Total' : 'Total transactions';
    cardTotalEl.textContent = `${label}: ${fmtValue(d.cardType.total, state.valueType)}`;
  }

  const ticketEl = document.getElementById('cross-ticket-overall');
  if (ticketEl) ticketEl.textContent = `Overall: ${fmtDollar(d.crossBorderTicket.overall)}`;

  const crossSpendEl = document.getElementById('cross-spend-overall');
  if (crossSpendEl) {
    const label = state.valueType === 'totalSpend' ? 'Overall' : 'Overall transactions';
    crossSpendEl.textContent = `${label}: ${fmtValue(d.crossBorderSpend.overall, state.valueType)}`;
  }
}
