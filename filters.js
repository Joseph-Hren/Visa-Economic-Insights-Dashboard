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
      renderChips();
      renderAllCharts(state, monthlyChartType, industryChartType);
    });
  });
});

/* ── Mobile: chip defaults (values that show always or only when non-default) */
const CHIP_DEFAULTS = {
  country:         'canada',
  year:            2026,
  valueType:       'totalSpend',
  transactionType: 'all',
  cardType:        'all',
};

/* ── Sync desktop filter bar display text to match current state ─── */
function syncFilterBar() {
  FILTER_CONFIG.forEach(({ groupClass, stateKey, options }) => {
    const group = document.querySelector(`.${groupClass}`);
    if (!group) return;
    const valueEl = group.querySelector('.filter-value');
    const opt = options.find(o => o.value === state[stateKey]);
    if (valueEl && opt) valueEl.textContent = opt.label;
  });
  updateMonthlySubtitle(state.year);
  updateMonthlyLegend(state.year);
}

/* ── Render mobile filter chips ─────────────────────────────────── */
function renderChips() {
  const container = document.getElementById('filter-chips');
  if (!container) return;
  container.innerHTML = '';

  const ALWAYS_SHOW = ['country', 'year', 'valueType'];

  FILTER_CONFIG.forEach(({ stateKey, options }) => {
    const val = state[stateKey];
    const isDefault = val === CHIP_DEFAULTS[stateKey];
    if (!ALWAYS_SHOW.includes(stateKey) && isDefault) return;

    const opt = options.find(o => o.value === val);
    const label = opt ? opt.label : String(val);

    const chip = document.createElement('div');
    chip.className = 'filter-chip';

    const labelSpan = document.createElement('span');
    labelSpan.className = 'filter-chip-label';
    labelSpan.textContent = label;
    chip.appendChild(labelSpan);

    const closeBtn = document.createElement('button');
    closeBtn.className = 'filter-chip-close';
    closeBtn.setAttribute('aria-label', `Reset ${stateKey} filter`);
    closeBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
    closeBtn.addEventListener('click', () => {
      state[stateKey] = CHIP_DEFAULTS[stateKey];
      syncFilterBar();
      renderChips();
      renderAllCharts(state, monthlyChartType, industryChartType);
    });
    chip.appendChild(closeBtn);

    container.appendChild(chip);
  });
}

/* ── Filter modal ───────────────────────────────────────────────── */
let modalState = null;

function openFilterModal() {
  modalState = { ...state };

  const overlay = document.getElementById('filter-modal-overlay');
  const body    = document.getElementById('filter-modal-body');
  if (!overlay || !body) return;

  body.innerHTML = '';

  const LABELS = {
    country: 'Country', year: 'Year', valueType: 'Value type',
    transactionType: 'Transaction type', cardType: 'Card type',
  };

  FILTER_CONFIG.forEach(({ stateKey, options }) => {
    const group = document.createElement('div');
    group.className = 'filter-modal-group';

    const labelEl = document.createElement('span');
    labelEl.className = 'filter-modal-label';
    labelEl.textContent = LABELS[stateKey] || stateKey;
    group.appendChild(labelEl);

    const dropdown = document.createElement('div');
    dropdown.className = 'filter-dropdown';
    dropdown.setAttribute('role', 'button');
    dropdown.setAttribute('tabindex', '0');

    const valueEl = document.createElement('span');
    valueEl.className = 'filter-value';
    const currentOpt = options.find(o => o.value === modalState[stateKey]);
    valueEl.textContent = currentOpt ? currentOpt.label : String(modalState[stateKey]);
    dropdown.appendChild(valueEl);

    const svg  = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'filter-chevron');
    svg.setAttribute('width', '14'); svg.setAttribute('height', '14');
    svg.setAttribute('viewBox', '0 0 24 24'); svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor'); svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round'); svg.setAttribute('stroke-linejoin', 'round');
    const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    poly.setAttribute('points', '6 9 12 15 18 9');
    svg.appendChild(poly);
    dropdown.appendChild(svg);

    dropdown.addEventListener('click', e => {
      e.stopPropagation();
      if (activeDropdown === dropdown) { closeActiveMenu(); return; }
      openDropdown(dropdown, options, modalState[stateKey], (value, label) => {
        modalState[stateKey] = value;
        valueEl.textContent = label;
      });
    });

    group.appendChild(dropdown);
    body.appendChild(group);
  });

  overlay.classList.add('is-open');
  overlay.setAttribute('aria-hidden', 'false');
}

function closeFilterModal() {
  modalState = null;
  closeActiveMenu();
  const overlay = document.getElementById('filter-modal-overlay');
  if (!overlay) return;
  overlay.classList.remove('is-open');
  overlay.setAttribute('aria-hidden', 'true');
}

function acceptFilterModal() {
  if (!modalState) return;
  Object.assign(state, modalState);
  syncFilterBar();
  closeFilterModal();
  renderChips();
  renderAllCharts(state, monthlyChartType, industryChartType);
}

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

/* ── Wire modal buttons ─────────────────────────────────────────── */
document.getElementById('show-all-filters')
  ?.addEventListener('click', openFilterModal);

document.getElementById('filter-modal-close')
  ?.addEventListener('click', closeFilterModal);

document.getElementById('filter-modal-accept')
  ?.addEventListener('click', acceptFilterModal);

document.getElementById('filter-modal-cancel')
  ?.addEventListener('click', closeFilterModal);

/* Close modal on overlay click (outside the modal card) */
document.getElementById('filter-modal-overlay')
  ?.addEventListener('click', e => { if (e.target.id === 'filter-modal-overlay') closeFilterModal(); });

/* ── Initial chart render ───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderAllCharts(state, monthlyChartType, industryChartType);
  renderChips();
});
