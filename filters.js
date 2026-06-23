/* ═══════════════════════════════════════════════════════════════════
   filters.js — filter state, dropdown UI, chart toggle state
   Charts do not yet update on filter change (Session 3).
═══════════════════════════════════════════════════════════════════ */

const CURRENT_YEAR = 2026;

/* ── Current filter state (internal data keys) ─────────────────── */
const state = {
  country:         'canada',
  year:            2026,
  valueType:       'totalSpend',
  transactionType: 'all',
  cardType:        'all',
};

/* ── Chart toggle state (persists across filter changes) ────────── */
let monthlyChartType  = 'line';
let industryChartType = 'bar';

/* ── Filter config: display label → internal value ──────────────── */
const FILTER_CONFIG = [
  {
    groupClass: 'filter-group--country',
    stateKey: 'country',
    options: [
      { label: 'Barbados',       value: 'barbados' },
      { label: 'Belize',         value: 'belize' },
      { label: 'Canada',         value: 'canada' },
      { label: 'Cayman Islands', value: 'caymanIslands' },
      { label: 'Chile',          value: 'chile' },
    ],
  },
  {
    groupClass: 'filter-group--year',
    stateKey: 'year',
    options: [
      { label: '2026', value: 2026 },
      { label: '2025', value: 2025 },
      { label: '2024', value: 2024 },
      { label: '2023', value: 2023 },
      { label: '2022', value: 2022 },
      { label: '2021', value: 2021 },
    ],
  },
  {
    groupClass: 'filter-group--value-type',
    stateKey: 'valueType',
    options: [
      { label: 'Total Spend',        value: 'totalSpend' },
      { label: 'Total Transactions', value: 'totalTransactions' },
    ],
  },
  {
    groupClass: 'filter-group--transaction-type',
    stateKey: 'transactionType',
    options: [
      { label: 'All',       value: 'all' },
      { label: 'In-Person', value: 'inPerson' },
      { label: 'Digital',   value: 'digital' },
    ],
  },
  {
    groupClass: 'filter-group--card-type',
    stateKey: 'cardType',
    options: [
      { label: 'All',     value: 'all' },
      { label: 'Credit',  value: 'credit' },
      { label: 'Debit',   value: 'debit' },
      { label: 'Prepaid', value: 'prepaid' },
    ],
  },
];

/* ── Active menu tracking ───────────────────────────────────────── */
let activeMenu     = null;
let activeDropdown = null;

function closeActiveMenu() {
  if (activeMenu)     { activeMenu.remove();                          activeMenu = null; }
  if (activeDropdown) { activeDropdown.classList.remove('is-open'); activeDropdown = null; }
}

function openDropdown(dropdown, options, currentValue, onSelect) {
  closeActiveMenu();

  const menu = document.createElement('div');
  menu.className = 'dropdown-menu';

  options.forEach(({ label, value }) => {
    const isSelected = value === currentValue;
    const item = document.createElement('div');
    item.className = 'dropdown-option' + (isSelected ? ' dropdown-option--selected' : '');

    // Checkmark SVG via DOM (avoids innerHTML/namespace issues)
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'dropdown-checkmark');
    svg.setAttribute('width', '14');
    svg.setAttribute('height', '14');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2.5');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    poly.setAttribute('points', '20 6 9 17 4 12');
    svg.appendChild(poly);

    const labelSpan = document.createElement('span');
    labelSpan.textContent = label;

    item.appendChild(svg);
    item.appendChild(labelSpan);

    // Use click (not mousedown) + stopPropagation so the event doesn't
    // bubble back up to the filter-dropdown's own click handler and reopen.
    item.addEventListener('click', e => {
      e.stopPropagation();
      onSelect(value, label);
      closeActiveMenu();
    });

    menu.appendChild(item);
  });

  // Append inside the filter-dropdown so position:absolute works relative to it
  dropdown.appendChild(menu);
  activeMenu     = menu;
  activeDropdown = dropdown;
  dropdown.classList.add('is-open');
}

/* ── Global close handlers ──────────────────────────────────────── */
document.addEventListener('click', closeActiveMenu);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeActiveMenu(); });

/* ── Monthly chart subtitle + legend ────────────────────────────── */
function updateMonthlySubtitle(year) {
  const el = document.getElementById('monthly-subtitle');
  if (!el) return;
  const prefix = year === CURRENT_YEAR ? `${year} year-to-date` : String(year);
  el.textContent = `${prefix} and previous two years`;
}

function updateMonthlyLegend(year) {
  const legend = document.getElementById('monthly-legend');
  if (!legend) return;
  const labels = legend.querySelectorAll('.legend-label');
  if (labels.length < 3) return;
  labels[0].textContent = String(year);
  labels[1].textContent = String(year - 1);
  labels[2].textContent = String(year - 2);
}

/* ── Wire up each filter dropdown ───────────────────────────────── */
FILTER_CONFIG.forEach(({ groupClass, stateKey, options }) => {
  const group = document.querySelector(`.${groupClass}`);
  if (!group) return;
  const dropdown = group.querySelector('.filter-dropdown');
  const valueEl  = group.querySelector('.filter-value');

  dropdown.addEventListener('click', e => {
    e.stopPropagation();
    if (activeDropdown === dropdown) { closeActiveMenu(); return; }
    openDropdown(dropdown, options, state[stateKey], (value, label) => {
      state[stateKey] = value;
      valueEl.textContent = label;
      if (stateKey === 'year') {
        updateMonthlySubtitle(value);
        updateMonthlyLegend(value);
      }
      renderAllCharts(state, monthlyChartType, industryChartType);
    });
  });
});

/* ── Chart toggle buttons ───────────────────────────────────────── */
document.querySelectorAll('.toggle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const chart = btn.dataset.chart;
    const view  = btn.dataset.view;
    const group = btn.closest('.chart-toggle');
    group.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('toggle-btn--active'));
    btn.classList.add('toggle-btn--active');
    const d = getData(state.country, state.year, state.valueType, state.transactionType, state.cardType);
    if (!d) return;
    if (chart === 'monthly') {
      monthlyChartType = view;
      renderMonthlyChart(d, state, monthlyChartType);
    }
    if (chart === 'industry') {
      industryChartType = view;
      renderIndustryChart(d, state, industryChartType);
    }
  });
});

/* ── Initial chart render ───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderAllCharts(state, monthlyChartType, industryChartType);
});
