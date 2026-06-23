const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

/* ── Transaction type multipliers ────────────────────────────────── */
const TX_MULT = {
  totalSpend:        { all: 1, inPerson: 0.62, digital: 0.38 },
  totalTransactions: { all: 1, inPerson: 0.72, digital: 0.28 }
};

/* ── Card type share by transaction type ─────────────────────────── */
const CARD_SHARE = {
  all:      { all: 1,    credit: 0.55, debit: 0.37, prepaid: 0.08 },
  inPerson: { all: 1,    credit: 0.50, debit: 0.42, prepaid: 0.08 },
  digital:  { all: 1,    credit: 0.64, debit: 0.30, prepaid: 0.06 }
};

/* ── Card type percentages per country × transaction type ────────── */
const CARD_PCT = {
  canada: {
    all:      { credit: 56, debit: 38, prepaid: 6 },
    inPerson: { credit: 50, debit: 43, prepaid: 7 },
    digital:  { credit: 65, debit: 29, prepaid: 6 }
  },
  belize: {
    all:      { credit: 54, debit: 39, prepaid: 7 },
    inPerson: { credit: 48, debit: 45, prepaid: 7 },
    digital:  { credit: 63, debit: 31, prepaid: 6 }
  },
  caymanIslands: {
    all:      { credit: 60, debit: 34, prepaid: 6 },
    inPerson: { credit: 54, debit: 40, prepaid: 6 },
    digital:  { credit: 69, debit: 26, prepaid: 5 }
  },
  barbados: {
    all:      { credit: 55, debit: 37, prepaid: 8 },
    inPerson: { credit: 49, debit: 43, prepaid: 8 },
    digital:  { credit: 65, debit: 29, prepaid: 6 }
  },
  chile: {
    all:      { credit: 45, debit: 47, prepaid: 8 },
    inPerson: { credit: 38, debit: 54, prepaid: 8 },
    digital:  { credit: 58, debit: 36, prepaid: 6 }
  }
};

/* ══════════════════════════════════════════════════════════════════
   DATA  —  keyed by DATA[country][year][valueType]
   transactionType + cardType are handled by getData() multipliers
══════════════════════════════════════════════════════════════════ */
const DATA = {

  /* ────────────────────────────────────────────────────────────────
     CANADA
  ──────────────────────────────────────────────────────────────── */
  canada: {

    /* ── 2026 ── */
    2026: {
      totalSpend: {
        monthly: {
          current:       [10.5,  9.6, 11.1, 11.7, 12.3, 12.8, null, null, null, null, null, null],
          previous:      [10.2,  9.3, 10.7, 11.3, 11.9, 12.3, 12.8, 13.1, 12.4, 12.1, 12.7, 13.2],
          twoYearsPrior: [ 9.8,  8.9, 10.2, 10.8, 11.4, 11.8, 12.2, 12.5, 11.9, 11.6, 12.1, 12.8]
        },
        industrySpend: [
          { name: 'Retail',                           value: 16.2 },
          { name: 'Food & Grocery',                   value: 11.3 },
          { name: 'Travel & Transportation',          value: 10.1 },
          { name: 'Restaurants & Dining',             value:  7.4 },
          { name: 'Healthcare & Medical',             value:  4.5 },
          { name: 'Entertainment & Leisure',          value:  3.9 },
          { name: 'Digital Goods & Subscriptions',   value:  3.5 },
          { name: 'Professional & Business Services', value:  3.3 },
          { name: 'Utilities & Telecommunications',   value:  2.9 },
          { name: 'Automotive & Fuel',                value:  2.2 },
          { name: 'Government & Education',           value:  1.6 },
          { name: 'Other',                            value:  1.9 }
        ],
        industryHeatmap: {
          years: [2026, 2025, 2024],
          rows: [
            { name: 'Retail',                           values: [ 2.2,  3.6,  4.1] },
            { name: 'Food & Grocery',                   values: [ 2.0,  3.3,  3.8] },
            { name: 'Travel & Transportation',          values: [ 3.7,  5.2,  6.1] },
            { name: 'Restaurants & Dining',             values: [ 3.1,  4.8,  5.4] },
            { name: 'Healthcare & Medical',             values: [ 1.8,  2.9,  3.2] },
            { name: 'Entertainment & Leisure',          values: [ 2.8,  4.3,  4.9] },
            { name: 'Digital Goods & Subscriptions',   values: [ 4.2,  6.6,  7.3] },
            { name: 'Professional & Business Services', values: [ 1.9,  3.1,  3.5] },
            { name: 'Utilities & Telecommunications',   values: [ 0.7,  1.6,  2.1] },
            { name: 'Automotive & Fuel',                values: [-1.4, -0.3,  1.9] },
            { name: 'Government & Education',           values: [ 1.4,  2.3,  2.8] },
            { name: 'Other',                            values: [ 2.1,  3.2,  3.7] }
          ]
        },
        topCitiesSpend: [
          { city: 'Toronto',   value: 22.4 },
          { city: 'Vancouver', value: 13.6 },
          { city: 'Montreal',  value: 11.2 },
          { city: 'Calgary',   value:  7.5 },
          { city: 'Edmonton',  value:  5.1 }
        ],
        topCitiesYoY: [
          { city: 'Vancouver', pct: 4.2 },
          { city: 'Toronto',   pct: 3.6 },
          { city: 'Montreal',  pct: 2.9 },
          { city: 'Calgary',   pct: 2.4 },
          { city: 'Edmonton',  pct: 1.8 }
        ],
        cardType: { credit: 56, debit: 38, prepaid: 6, total: 68.0 },
        crossBorderTicket: { overall: 64.80, domestic: 57.20, inbound: 94.50, outbound: 86.30 },
        crossBorderSpend:  { overall: 68.0,  domestic: 52.4,  inbound:  8.8,  outbound:  6.8 }
      },
      totalTransactions: {
        monthly: {
          current:       [0.795, 0.727, 0.840, 0.886, 0.932, 0.969, null, null, null, null, null, null],
          previous:      [0.721, 0.658, 0.757, 0.799, 0.841, 0.870, 0.905, 0.926, 0.877, 0.856, 0.898, 0.933],
          twoYearsPrior: [0.686, 0.623, 0.714, 0.756, 0.798, 0.826, 0.854, 0.875, 0.833, 0.812, 0.847, 0.896]
        },
        industrySpend: [
          { name: 'Retail',                           value: 1.24 },
          { name: 'Food & Grocery',                   value: 0.93 },
          { name: 'Travel & Transportation',          value: 0.41 },
          { name: 'Restaurants & Dining',             value: 0.67 },
          { name: 'Healthcare & Medical',             value: 0.31 },
          { name: 'Entertainment & Leisure',          value: 0.36 },
          { name: 'Digital Goods & Subscriptions',   value: 0.36 },
          { name: 'Professional & Business Services', value: 0.21 },
          { name: 'Utilities & Telecommunications',   value: 0.26 },
          { name: 'Automotive & Fuel',                value: 0.10 },
          { name: 'Government & Education',           value: 0.15 },
          { name: 'Other',                            value: 0.15 }
        ],
        industryHeatmap: {
          years: [2026, 2025, 2024],
          rows: [
            { name: 'Retail',                           values: [ 2.2,  3.6,  4.1] },
            { name: 'Food & Grocery',                   values: [ 2.0,  3.3,  3.8] },
            { name: 'Travel & Transportation',          values: [ 3.7,  5.2,  6.1] },
            { name: 'Restaurants & Dining',             values: [ 3.1,  4.8,  5.4] },
            { name: 'Healthcare & Medical',             values: [ 1.8,  2.9,  3.2] },
            { name: 'Entertainment & Leisure',          values: [ 2.8,  4.3,  4.9] },
            { name: 'Digital Goods & Subscriptions',   values: [ 4.2,  6.6,  7.3] },
            { name: 'Professional & Business Services', values: [ 1.9,  3.1,  3.5] },
            { name: 'Utilities & Telecommunications',   values: [ 0.7,  1.6,  2.1] },
            { name: 'Automotive & Fuel',                values: [-1.4, -0.3,  1.9] },
            { name: 'Government & Education',           values: [ 1.4,  2.3,  2.8] },
            { name: 'Other',                            values: [ 2.1,  3.2,  3.7] }
          ]
        },
        topCitiesSpend: [
          { city: 'Toronto',   value: 1.68 },
          { city: 'Vancouver', value: 1.01 },
          { city: 'Montreal',  value: 0.83 },
          { city: 'Calgary',   value: 0.56 },
          { city: 'Edmonton',  value: 0.38 }
        ],
        topCitiesYoY: [
          { city: 'Vancouver', pct: 4.2 },
          { city: 'Toronto',   pct: 3.6 },
          { city: 'Montreal',  pct: 2.9 },
          { city: 'Calgary',   pct: 2.4 },
          { city: 'Edmonton',  pct: 1.8 }
        ],
        cardType: { credit: 56, debit: 38, prepaid: 6, total: 5.15 },
        crossBorderTicket: { overall: 64.80, domestic: 57.20, inbound: 94.50, outbound: 86.30 },
        crossBorderSpend:  { overall: 5.15,  domestic: 3.97,  inbound: 0.67,  outbound: 0.52 }
      }
    },

    /* ── 2025 ── */
    2025: {
      totalSpend: {
        monthly: {
          current:       [10.2,  9.3, 10.7, 11.3, 11.9, 12.3, 12.8, 13.1, 12.4, 12.1, 12.7, 13.2],
          previous:      [ 9.8,  8.9, 10.2, 10.8, 11.4, 11.8, 12.2, 12.5, 11.9, 11.6, 12.1, 12.8],
          twoYearsPrior: [ 9.3,  8.5,  9.7, 10.3, 10.8, 11.2, 11.6, 11.9, 11.3, 11.0, 11.5, 12.2]
        },
        industrySpend: [
          { name: 'Retail',                           value: 33.2 },
          { name: 'Food & Grocery',                   value: 23.1 },
          { name: 'Travel & Transportation',          value: 20.7 },
          { name: 'Restaurants & Dining',             value: 15.1 },
          { name: 'Healthcare & Medical',             value:  9.2 },
          { name: 'Entertainment & Leisure',          value:  8.0 },
          { name: 'Digital Goods & Subscriptions',   value:  7.2 },
          { name: 'Professional & Business Services', value:  6.8 },
          { name: 'Utilities & Telecommunications',   value:  5.9 },
          { name: 'Automotive & Fuel',                value:  4.5 },
          { name: 'Government & Education',           value:  3.2 },
          { name: 'Other',                            value:  3.9 }
        ],
        industryHeatmap: {
          years: [2025, 2024, 2023],
          rows: [
            { name: 'Retail',                           values: [ 3.6,  4.1,  5.8] },
            { name: 'Food & Grocery',                   values: [ 3.3,  3.8,  4.9] },
            { name: 'Travel & Transportation',          values: [ 5.2,  6.1,  8.5] },
            { name: 'Restaurants & Dining',             values: [ 4.8,  5.4,  7.2] },
            { name: 'Healthcare & Medical',             values: [ 2.9,  3.2,  4.1] },
            { name: 'Entertainment & Leisure',          values: [ 4.3,  4.9,  6.8] },
            { name: 'Digital Goods & Subscriptions',   values: [ 6.6,  7.3,  9.1] },
            { name: 'Professional & Business Services', values: [ 3.1,  3.5,  4.6] },
            { name: 'Utilities & Telecommunications',   values: [ 1.6,  2.1,  2.8] },
            { name: 'Automotive & Fuel',                values: [-0.3,  1.9,  2.8] },
            { name: 'Government & Education',           values: [ 2.3,  2.8,  3.7] },
            { name: 'Other',                            values: [ 3.2,  3.7,  4.9] }
          ]
        },
        topCitiesSpend: [
          { city: 'Toronto',   value: 46.1 },
          { city: 'Vancouver', value: 27.8 },
          { city: 'Montreal',  value: 22.9 },
          { city: 'Calgary',   value: 15.4 },
          { city: 'Edmonton',  value: 10.4 }
        ],
        topCitiesYoY: [
          { city: 'Vancouver', pct: 4.8 },
          { city: 'Montreal',  pct: 4.2 },
          { city: 'Toronto',   pct: 3.8 },
          { city: 'Calgary',   pct: 3.1 },
          { city: 'Edmonton',  pct: 2.6 }
        ],
        cardType: { credit: 56, debit: 38, prepaid: 6, total: 141.0 },
        crossBorderTicket: { overall: 63.20, domestic: 55.80, inbound: 92.10, outbound: 84.20 },
        crossBorderSpend:  { overall: 141.0, domestic: 108.6, inbound: 18.2,  outbound: 14.2 }
      },
      totalTransactions: {
        monthly: {
          current:       [0.721, 0.658, 0.757, 0.799, 0.841, 0.870, 0.905, 0.926, 0.877, 0.856, 0.898, 0.933],
          previous:      [0.686, 0.623, 0.714, 0.756, 0.798, 0.826, 0.854, 0.875, 0.833, 0.812, 0.847, 0.896],
          twoYearsPrior: [0.651, 0.595, 0.679, 0.721, 0.756, 0.784, 0.812, 0.833, 0.791, 0.770, 0.805, 0.854]
        },
        industrySpend: [
          { name: 'Retail',                           value: 2.39 },
          { name: 'Food & Grocery',                   value: 1.79 },
          { name: 'Travel & Transportation',          value: 0.80 },
          { name: 'Restaurants & Dining',             value: 1.30 },
          { name: 'Healthcare & Medical',             value: 0.60 },
          { name: 'Entertainment & Leisure',          value: 0.70 },
          { name: 'Digital Goods & Subscriptions',   value: 0.70 },
          { name: 'Professional & Business Services', value: 0.40 },
          { name: 'Utilities & Telecommunications',   value: 0.50 },
          { name: 'Automotive & Fuel',                value: 0.20 },
          { name: 'Government & Education',           value: 0.30 },
          { name: 'Other',                            value: 0.30 }
        ],
        industryHeatmap: {
          years: [2025, 2024, 2023],
          rows: [
            { name: 'Retail',                           values: [ 3.6,  4.1,  5.8] },
            { name: 'Food & Grocery',                   values: [ 3.3,  3.8,  4.9] },
            { name: 'Travel & Transportation',          values: [ 5.2,  6.1,  8.5] },
            { name: 'Restaurants & Dining',             values: [ 4.8,  5.4,  7.2] },
            { name: 'Healthcare & Medical',             values: [ 2.9,  3.2,  4.1] },
            { name: 'Entertainment & Leisure',          values: [ 4.3,  4.9,  6.8] },
            { name: 'Digital Goods & Subscriptions',   values: [ 6.6,  7.3,  9.1] },
            { name: 'Professional & Business Services', values: [ 3.1,  3.5,  4.6] },
            { name: 'Utilities & Telecommunications',   values: [ 1.6,  2.1,  2.8] },
            { name: 'Automotive & Fuel',                values: [-0.3,  1.9,  2.8] },
            { name: 'Government & Education',           values: [ 2.3,  2.8,  3.7] },
            { name: 'Other',                            values: [ 3.2,  3.7,  4.9] }
          ]
        },
        topCitiesSpend: [
          { city: 'Toronto',   value: 3.25 },
          { city: 'Vancouver', value: 1.96 },
          { city: 'Montreal',  value: 1.61 },
          { city: 'Calgary',   value: 1.09 },
          { city: 'Edmonton',  value: 0.74 }
        ],
        topCitiesYoY: [
          { city: 'Vancouver', pct: 4.8 },
          { city: 'Montreal',  pct: 4.2 },
          { city: 'Toronto',   pct: 3.8 },
          { city: 'Calgary',   pct: 3.1 },
          { city: 'Edmonton',  pct: 2.6 }
        ],
        cardType: { credit: 56, debit: 38, prepaid: 6, total: 9.97 },
        crossBorderTicket: { overall: 63.20, domestic: 55.80, inbound: 92.10, outbound: 84.20 },
        crossBorderSpend:  { overall: 9.97,  domestic: 7.68,  inbound: 1.30,  outbound: 0.99 }
      }
    },

    /* ── 2024 ── */
    2024: {
      totalSpend: {
        monthly: {
          current:       [ 9.8,  8.9, 10.2, 10.8, 11.4, 11.8, 12.2, 12.5, 11.9, 11.6, 12.1, 12.8],
          previous:      [ 9.3,  8.5,  9.7, 10.3, 10.8, 11.2, 11.6, 11.9, 11.3, 11.0, 11.5, 12.2],
          twoYearsPrior: [ 8.7,  8.0,  9.1,  9.7, 10.1, 10.5, 10.9, 11.2, 10.6, 10.3, 10.8, 11.4]
        },
        industrySpend: [
          { name: 'Retail',                           value: 32.0 },
          { name: 'Food & Grocery',                   value: 22.3 },
          { name: 'Travel & Transportation',          value: 20.0 },
          { name: 'Restaurants & Dining',             value: 14.6 },
          { name: 'Healthcare & Medical',             value:  8.8 },
          { name: 'Entertainment & Leisure',          value:  7.8 },
          { name: 'Digital Goods & Subscriptions',   value:  6.9 },
          { name: 'Professional & Business Services', value:  6.5 },
          { name: 'Utilities & Telecommunications',   value:  5.7 },
          { name: 'Automotive & Fuel',                value:  4.4 },
          { name: 'Government & Education',           value:  3.1 },
          { name: 'Other',                            value:  3.8 }
        ],
        industryHeatmap: {
          years: [2024, 2023, 2022],
          rows: [
            { name: 'Retail',                           values: [ 4.1,  5.8, 13.4] },
            { name: 'Food & Grocery',                   values: [ 3.8,  4.9, 12.8] },
            { name: 'Travel & Transportation',          values: [ 6.1,  8.5, 19.2] },
            { name: 'Restaurants & Dining',             values: [ 5.4,  7.2, 15.1] },
            { name: 'Healthcare & Medical',             values: [ 3.2,  4.1, 10.8] },
            { name: 'Entertainment & Leisure',          values: [ 4.9,  6.8, 16.4] },
            { name: 'Digital Goods & Subscriptions',   values: [ 7.3,  9.1, 19.8] },
            { name: 'Professional & Business Services', values: [ 3.5,  4.6, 11.5] },
            { name: 'Utilities & Telecommunications',   values: [ 2.1,  2.8,  7.4] },
            { name: 'Automotive & Fuel',                values: [ 1.9,  2.8, 12.1] },
            { name: 'Government & Education',           values: [ 2.8,  3.7,  9.8] },
            { name: 'Other',                            values: [ 3.7,  4.9, 12.4] }
          ]
        },
        topCitiesSpend: [
          { city: 'Toronto',   value: 44.5 },
          { city: 'Vancouver', value: 26.8 },
          { city: 'Montreal',  value: 22.0 },
          { city: 'Calgary',   value: 14.8 },
          { city: 'Edmonton',  value:  9.9 }
        ],
        topCitiesYoY: [
          { city: 'Vancouver', pct: 5.3 },
          { city: 'Montreal',  pct: 4.8 },
          { city: 'Toronto',   pct: 4.5 },
          { city: 'Calgary',   pct: 3.8 },
          { city: 'Edmonton',  pct: 3.0 }
        ],
        cardType: { credit: 55, debit: 38, prepaid: 7, total: 136.0 },
        crossBorderTicket: { overall: 61.80, domestic: 54.50, inbound: 89.80, outbound: 82.40 },
        crossBorderSpend:  { overall: 136.0, domestic: 104.7, inbound: 17.5,  outbound: 13.7 }
      },
      totalTransactions: {
        monthly: {
          current:       [0.686, 0.623, 0.714, 0.756, 0.798, 0.826, 0.854, 0.875, 0.833, 0.812, 0.847, 0.896],
          previous:      [0.651, 0.595, 0.679, 0.721, 0.756, 0.784, 0.812, 0.833, 0.791, 0.770, 0.805, 0.854],
          twoYearsPrior: [0.585, 0.538, 0.611, 0.652, 0.679, 0.706, 0.733, 0.753, 0.712, 0.692, 0.726, 0.766]
        },
        industrySpend: [
          { name: 'Retail',                           value: 2.28 },
          { name: 'Food & Grocery',                   value: 1.71 },
          { name: 'Travel & Transportation',          value: 0.76 },
          { name: 'Restaurants & Dining',             value: 1.24 },
          { name: 'Healthcare & Medical',             value: 0.57 },
          { name: 'Entertainment & Leisure',          value: 0.67 },
          { name: 'Digital Goods & Subscriptions',   value: 0.67 },
          { name: 'Professional & Business Services', value: 0.38 },
          { name: 'Utilities & Telecommunications',   value: 0.48 },
          { name: 'Automotive & Fuel',                value: 0.19 },
          { name: 'Government & Education',           value: 0.29 },
          { name: 'Other',                            value: 0.29 }
        ],
        industryHeatmap: {
          years: [2024, 2023, 2022],
          rows: [
            { name: 'Retail',                           values: [ 4.1,  5.8, 13.4] },
            { name: 'Food & Grocery',                   values: [ 3.8,  4.9, 12.8] },
            { name: 'Travel & Transportation',          values: [ 6.1,  8.5, 19.2] },
            { name: 'Restaurants & Dining',             values: [ 5.4,  7.2, 15.1] },
            { name: 'Healthcare & Medical',             values: [ 3.2,  4.1, 10.8] },
            { name: 'Entertainment & Leisure',          values: [ 4.9,  6.8, 16.4] },
            { name: 'Digital Goods & Subscriptions',   values: [ 7.3,  9.1, 19.8] },
            { name: 'Professional & Business Services', values: [ 3.5,  4.6, 11.5] },
            { name: 'Utilities & Telecommunications',   values: [ 2.1,  2.8,  7.4] },
            { name: 'Automotive & Fuel',                values: [ 1.9,  2.8, 12.1] },
            { name: 'Government & Education',           values: [ 2.8,  3.7,  9.8] },
            { name: 'Other',                            values: [ 3.7,  4.9, 12.4] }
          ]
        },
        topCitiesSpend: [
          { city: 'Toronto',   value: 3.10 },
          { city: 'Vancouver', value: 1.87 },
          { city: 'Montreal',  value: 1.54 },
          { city: 'Calgary',   value: 1.04 },
          { city: 'Edmonton',  value: 0.70 }
        ],
        topCitiesYoY: [
          { city: 'Vancouver', pct: 5.3 },
          { city: 'Montreal',  pct: 4.8 },
          { city: 'Toronto',   pct: 4.5 },
          { city: 'Calgary',   pct: 3.8 },
          { city: 'Edmonton',  pct: 3.0 }
        ],
        cardType: { credit: 55, debit: 38, prepaid: 7, total: 9.52 },
        crossBorderTicket: { overall: 61.80, domestic: 54.50, inbound: 89.80, outbound: 82.40 },
        crossBorderSpend:  { overall: 9.52,  domestic: 7.33,  inbound: 1.24,  outbound: 0.95 }
      }
    },

    /* ── 2023 ── */
    2023: {
      totalSpend: {
        monthly: {
          current:       [ 9.3,  8.5,  9.7, 10.3, 10.8, 11.2, 11.6, 11.9, 11.3, 11.0, 11.5, 12.2],
          previous:      [ 8.7,  8.0,  9.1,  9.7, 10.1, 10.5, 10.9, 11.2, 10.6, 10.3, 10.8, 11.4],
          twoYearsPrior: [ 7.7,  7.1,  8.1,  8.6,  8.9,  9.3,  9.6,  9.9,  9.4,  9.1,  9.6, 10.1]
        },
        industrySpend: [
          { name: 'Retail',                           value: 30.4 },
          { name: 'Food & Grocery',                   value: 21.2 },
          { name: 'Travel & Transportation',          value: 19.0 },
          { name: 'Restaurants & Dining',             value: 13.8 },
          { name: 'Healthcare & Medical',             value:  8.4 },
          { name: 'Entertainment & Leisure',          value:  7.4 },
          { name: 'Digital Goods & Subscriptions',   value:  6.6 },
          { name: 'Professional & Business Services', value:  6.2 },
          { name: 'Utilities & Telecommunications',   value:  5.4 },
          { name: 'Automotive & Fuel',                value:  4.1 },
          { name: 'Government & Education',           value:  3.0 },
          { name: 'Other',                            value:  3.6 }
        ],
        industryHeatmap: {
          years: [2023, 2022, 2021],
          rows: [
            { name: 'Retail',                           values: [ 5.8, 13.4, 10.2] },
            { name: 'Food & Grocery',                   values: [ 4.9, 12.8,  9.6] },
            { name: 'Travel & Transportation',          values: [ 8.5, 19.2, 16.4] },
            { name: 'Restaurants & Dining',             values: [ 7.2, 15.1, 12.8] },
            { name: 'Healthcare & Medical',             values: [ 4.1, 10.8,  8.5] },
            { name: 'Entertainment & Leisure',          values: [ 6.8, 16.4, 13.2] },
            { name: 'Digital Goods & Subscriptions',   values: [ 9.1, 19.8, 15.6] },
            { name: 'Professional & Business Services', values: [ 4.6, 11.5,  9.1] },
            { name: 'Utilities & Telecommunications',   values: [ 2.8,  7.4,  5.9] },
            { name: 'Automotive & Fuel',                values: [ 2.8, 12.1,  9.4] },
            { name: 'Government & Education',           values: [ 3.7,  9.8,  7.8] },
            { name: 'Other',                            values: [ 4.9, 12.4,  9.8] }
          ]
        },
        topCitiesSpend: [
          { city: 'Toronto',   value: 42.2 },
          { city: 'Vancouver', value: 25.4 },
          { city: 'Montreal',  value: 20.9 },
          { city: 'Calgary',   value: 14.0 },
          { city: 'Edmonton',  value:  9.4 }
        ],
        topCitiesYoY: [
          { city: 'Vancouver', pct: 6.5 },
          { city: 'Montreal',  pct: 6.1 },
          { city: 'Toronto',   pct: 5.8 },
          { city: 'Calgary',   pct: 5.1 },
          { city: 'Edmonton',  pct: 4.2 }
        ],
        cardType: { credit: 55, debit: 39, prepaid: 6, total: 129.3 },
        crossBorderTicket: { overall: 60.50, domestic: 53.20, inbound: 87.50, outbound: 80.60 },
        crossBorderSpend:  { overall: 129.3, domestic:  99.6, inbound: 16.7,  outbound: 13.1 }
      },
      totalTransactions: {
        monthly: {
          current:       [0.651, 0.595, 0.679, 0.721, 0.756, 0.784, 0.812, 0.833, 0.791, 0.770, 0.805, 0.854],
          previous:      [0.585, 0.538, 0.611, 0.652, 0.679, 0.706, 0.733, 0.753, 0.712, 0.692, 0.726, 0.766],
          twoYearsPrior: [0.517, 0.476, 0.543, 0.577, 0.597, 0.624, 0.644, 0.664, 0.631, 0.610, 0.644, 0.678]
        },
        industrySpend: [
          { name: 'Retail',                           value: 2.17 },
          { name: 'Food & Grocery',                   value: 1.63 },
          { name: 'Travel & Transportation',          value: 0.72 },
          { name: 'Restaurants & Dining',             value: 1.18 },
          { name: 'Healthcare & Medical',             value: 0.54 },
          { name: 'Entertainment & Leisure',          value: 0.63 },
          { name: 'Digital Goods & Subscriptions',   value: 0.63 },
          { name: 'Professional & Business Services', value: 0.36 },
          { name: 'Utilities & Telecommunications',   value: 0.45 },
          { name: 'Automotive & Fuel',                value: 0.18 },
          { name: 'Government & Education',           value: 0.27 },
          { name: 'Other',                            value: 0.27 }
        ],
        industryHeatmap: {
          years: [2023, 2022, 2021],
          rows: [
            { name: 'Retail',                           values: [ 5.8, 13.4, 10.2] },
            { name: 'Food & Grocery',                   values: [ 4.9, 12.8,  9.6] },
            { name: 'Travel & Transportation',          values: [ 8.5, 19.2, 16.4] },
            { name: 'Restaurants & Dining',             values: [ 7.2, 15.1, 12.8] },
            { name: 'Healthcare & Medical',             values: [ 4.1, 10.8,  8.5] },
            { name: 'Entertainment & Leisure',          values: [ 6.8, 16.4, 13.2] },
            { name: 'Digital Goods & Subscriptions',   values: [ 9.1, 19.8, 15.6] },
            { name: 'Professional & Business Services', values: [ 4.6, 11.5,  9.1] },
            { name: 'Utilities & Telecommunications',   values: [ 2.8,  7.4,  5.9] },
            { name: 'Automotive & Fuel',                values: [ 2.8, 12.1,  9.4] },
            { name: 'Government & Education',           values: [ 3.7,  9.8,  7.8] },
            { name: 'Other',                            values: [ 4.9, 12.4,  9.8] }
          ]
        },
        topCitiesSpend: [
          { city: 'Toronto',   value: 2.95 },
          { city: 'Vancouver', value: 1.78 },
          { city: 'Montreal',  value: 1.47 },
          { city: 'Calgary',   value: 0.99 },
          { city: 'Edmonton',  value: 0.67 }
        ],
        topCitiesYoY: [
          { city: 'Vancouver', pct: 6.5 },
          { city: 'Montreal',  pct: 6.1 },
          { city: 'Toronto',   pct: 5.8 },
          { city: 'Calgary',   pct: 5.1 },
          { city: 'Edmonton',  pct: 4.2 }
        ],
        cardType: { credit: 55, debit: 39, prepaid: 6, total: 9.05 },
        crossBorderTicket: { overall: 60.50, domestic: 53.20, inbound: 87.50, outbound: 80.60 },
        crossBorderSpend:  { overall: 9.05,  domestic: 6.97,  inbound: 1.18,  outbound: 0.90 }
      }
    },

    /* ── 2022 ── */
    2022: {
      totalSpend: {
        monthly: {
          current:       [ 8.7,  8.0,  9.1,  9.7, 10.1, 10.5, 10.9, 11.2, 10.6, 10.3, 10.8, 11.4],
          previous:      [ 7.7,  7.1,  8.1,  8.6,  8.9,  9.3,  9.6,  9.9,  9.4,  9.1,  9.6, 10.1],
          twoYearsPrior: [ 9.2,  8.4,  7.1,  5.4,  6.6,  7.3,  8.5,  8.8,  8.1,  7.9,  7.2,  7.8]
        },
        industrySpend: [
          { name: 'Retail',                           value: 28.5 },
          { name: 'Food & Grocery',                   value: 19.9 },
          { name: 'Travel & Transportation',          value: 17.8 },
          { name: 'Restaurants & Dining',             value: 13.0 },
          { name: 'Healthcare & Medical',             value:  7.9 },
          { name: 'Entertainment & Leisure',          value:  6.9 },
          { name: 'Digital Goods & Subscriptions',   value:  6.2 },
          { name: 'Professional & Business Services', value:  5.8 },
          { name: 'Utilities & Telecommunications',   value:  5.1 },
          { name: 'Automotive & Fuel',                value:  3.9 },
          { name: 'Government & Education',           value:  2.8 },
          { name: 'Other',                            value:  3.4 }
        ],
        industryHeatmap: {
          years: [2022, 2021, 2020],
          rows: [
            { name: 'Retail',                           values: [13.4, 10.2,  -8.2] },
            { name: 'Food & Grocery',                   values: [12.8,  9.6,  -5.4] },
            { name: 'Travel & Transportation',          values: [19.2, 16.4, -38.6] },
            { name: 'Restaurants & Dining',             values: [15.1, 12.8, -22.4] },
            { name: 'Healthcare & Medical',             values: [10.8,  8.5,  -6.2] },
            { name: 'Entertainment & Leisure',          values: [16.4, 13.2, -31.8] },
            { name: 'Digital Goods & Subscriptions',   values: [19.8, 15.6,  18.4] },
            { name: 'Professional & Business Services', values: [11.5,  9.1, -12.4] },
            { name: 'Utilities & Telecommunications',   values: [ 7.4,  5.9,   4.2] },
            { name: 'Automotive & Fuel',                values: [12.1,  9.4, -19.8] },
            { name: 'Government & Education',           values: [ 9.8,  7.8,   8.6] },
            { name: 'Other',                            values: [12.4,  9.8,  -7.6] }
          ]
        },
        topCitiesSpend: [
          { city: 'Toronto',   value: 39.5 },
          { city: 'Vancouver', value: 23.8 },
          { city: 'Montreal',  value: 19.6 },
          { city: 'Calgary',   value: 13.1 },
          { city: 'Edmonton',  value:  8.8 }
        ],
        topCitiesYoY: [
          { city: 'Edmonton',  pct: 14.3 },
          { city: 'Toronto',   pct: 13.9 },
          { city: 'Calgary',   pct: 13.9 },
          { city: 'Montreal',  pct: 13.4 },
          { city: 'Vancouver', pct: 12.8 }
        ],
        cardType: { credit: 54, debit: 39, prepaid: 7, total: 121.3 },
        crossBorderTicket: { overall: 58.20, domestic: 51.00, inbound: 84.30, outbound: 77.90 },
        crossBorderSpend:  { overall: 121.3, domestic:  93.4, inbound: 15.6,  outbound: 12.3 }
      },
      totalTransactions: {
        monthly: {
          current:       [0.585, 0.538, 0.611, 0.652, 0.679, 0.706, 0.733, 0.753, 0.712, 0.692, 0.726, 0.766],
          previous:      [0.517, 0.476, 0.543, 0.577, 0.597, 0.624, 0.644, 0.664, 0.631, 0.610, 0.644, 0.678],
          twoYearsPrior: [0.608, 0.555, 0.469, 0.357, 0.436, 0.483, 0.562, 0.582, 0.535, 0.522, 0.476, 0.516]
        },
        industrySpend: [
          { name: 'Retail',                           value: 1.96 },
          { name: 'Food & Grocery',                   value: 1.47 },
          { name: 'Travel & Transportation',          value: 0.65 },
          { name: 'Restaurants & Dining',             value: 1.06 },
          { name: 'Healthcare & Medical',             value: 0.49 },
          { name: 'Entertainment & Leisure',          value: 0.57 },
          { name: 'Digital Goods & Subscriptions',   value: 0.57 },
          { name: 'Professional & Business Services', value: 0.33 },
          { name: 'Utilities & Telecommunications',   value: 0.41 },
          { name: 'Automotive & Fuel',                value: 0.16 },
          { name: 'Government & Education',           value: 0.24 },
          { name: 'Other',                            value: 0.24 }
        ],
        industryHeatmap: {
          years: [2022, 2021, 2020],
          rows: [
            { name: 'Retail',                           values: [13.4, 10.2,  -8.2] },
            { name: 'Food & Grocery',                   values: [12.8,  9.6,  -5.4] },
            { name: 'Travel & Transportation',          values: [19.2, 16.4, -38.6] },
            { name: 'Restaurants & Dining',             values: [15.1, 12.8, -22.4] },
            { name: 'Healthcare & Medical',             values: [10.8,  8.5,  -6.2] },
            { name: 'Entertainment & Leisure',          values: [16.4, 13.2, -31.8] },
            { name: 'Digital Goods & Subscriptions',   values: [19.8, 15.6,  18.4] },
            { name: 'Professional & Business Services', values: [11.5,  9.1, -12.4] },
            { name: 'Utilities & Telecommunications',   values: [ 7.4,  5.9,   4.2] },
            { name: 'Automotive & Fuel',                values: [12.1,  9.4, -19.8] },
            { name: 'Government & Education',           values: [ 9.8,  7.8,   8.6] },
            { name: 'Other',                            values: [12.4,  9.8,  -7.6] }
          ]
        },
        topCitiesSpend: [
          { city: 'Toronto',   value: 2.66 },
          { city: 'Vancouver', value: 1.61 },
          { city: 'Montreal',  value: 1.32 },
          { city: 'Calgary',   value: 0.89 },
          { city: 'Edmonton',  value: 0.60 }
        ],
        topCitiesYoY: [
          { city: 'Edmonton',  pct: 14.3 },
          { city: 'Toronto',   pct: 13.9 },
          { city: 'Calgary',   pct: 13.9 },
          { city: 'Montreal',  pct: 13.4 },
          { city: 'Vancouver', pct: 12.8 }
        ],
        cardType: { credit: 54, debit: 39, prepaid: 7, total: 8.15 },
        crossBorderTicket: { overall: 58.20, domestic: 51.00, inbound: 84.30, outbound: 77.90 },
        crossBorderSpend:  { overall: 8.15,  domestic: 6.28,  inbound: 1.06,  outbound: 0.81 }
      }
    },

    /* ── 2021 ── */
    2021: {
      totalSpend: {
        monthly: {
          current:       [ 7.7,  7.1,  8.1,  8.6,  8.9,  9.3,  9.6,  9.9,  9.4,  9.1,  9.6, 10.1],
          previous:      [ 9.2,  8.4,  7.1,  5.4,  6.6,  7.3,  8.5,  8.8,  8.1,  7.9,  7.2,  7.8],
          twoYearsPrior: [ 7.2,  6.5,  7.4,  7.7,  8.2,  8.4,  8.8,  8.6,  8.0,  8.1,  8.7,  9.4]
        },
        industrySpend: [
          { name: 'Retail',                           value: 25.2 },
          { name: 'Food & Grocery',                   value: 17.6 },
          { name: 'Travel & Transportation',          value: 15.8 },
          { name: 'Restaurants & Dining',             value: 11.5 },
          { name: 'Healthcare & Medical',             value:  7.0 },
          { name: 'Entertainment & Leisure',          value:  6.1 },
          { name: 'Digital Goods & Subscriptions',   value:  5.5 },
          { name: 'Professional & Business Services', value:  5.2 },
          { name: 'Utilities & Telecommunications',   value:  4.5 },
          { name: 'Automotive & Fuel',                value:  3.4 },
          { name: 'Government & Education',           value:  2.5 },
          { name: 'Other',                            value:  3.0 }
        ],
        industryHeatmap: {
          years: [2021, 2020, 2019],
          rows: [
            { name: 'Retail',                           values: [10.2,  -8.2,  3.8] },
            { name: 'Food & Grocery',                   values: [ 9.6,  -5.4,  4.2] },
            { name: 'Travel & Transportation',          values: [16.4, -38.6,  5.2] },
            { name: 'Restaurants & Dining',             values: [12.8, -22.4,  4.8] },
            { name: 'Healthcare & Medical',             values: [ 8.5,  -6.2,  4.1] },
            { name: 'Entertainment & Leisure',          values: [13.2, -31.8,  3.6] },
            { name: 'Digital Goods & Subscriptions',   values: [15.6,  18.4,  8.9] },
            { name: 'Professional & Business Services', values: [ 9.1, -12.4,  3.4] },
            { name: 'Utilities & Telecommunications',   values: [ 5.9,   4.2,  2.8] },
            { name: 'Automotive & Fuel',                values: [ 9.4, -19.8,  2.8] },
            { name: 'Government & Education',           values: [ 7.8,   8.6,  3.2] },
            { name: 'Other',                            values: [ 9.8,  -7.6,  3.4] }
          ]
        },
        topCitiesSpend: [
          { city: 'Toronto',   value: 34.8 },
          { city: 'Vancouver', value: 20.9 },
          { city: 'Montreal',  value: 17.3 },
          { city: 'Calgary',   value: 11.5 },
          { city: 'Edmonton',  value:  7.7 }
        ],
        topCitiesYoY: [
          { city: 'Vancouver', pct: 12.1 },
          { city: 'Toronto',   pct: 11.2 },
          { city: 'Montreal',  pct:  9.8 },
          { city: 'Calgary',   pct:  9.1 },
          { city: 'Edmonton',  pct:  8.4 }
        ],
        cardType: { credit: 53, debit: 40, prepaid: 7, total: 107.4 },
        crossBorderTicket: { overall: 55.40, domestic: 48.60, inbound: 79.60, outbound: 73.20 },
        crossBorderSpend:  { overall: 107.4, domestic:  82.7, inbound: 13.9,  outbound: 10.8 }
      },
      totalTransactions: {
        monthly: {
          current:       [0.517, 0.476, 0.543, 0.577, 0.597, 0.624, 0.644, 0.664, 0.631, 0.610, 0.644, 0.678],
          previous:      [0.608, 0.555, 0.469, 0.357, 0.436, 0.483, 0.562, 0.582, 0.535, 0.522, 0.476, 0.516],
          twoYearsPrior: [0.505, 0.456, 0.519, 0.540, 0.575, 0.589, 0.617, 0.603, 0.561, 0.568, 0.610, 0.659]
        },
        industrySpend: [
          { name: 'Retail',                           value: 1.73 },
          { name: 'Food & Grocery',                   value: 1.30 },
          { name: 'Travel & Transportation',          value: 0.58 },
          { name: 'Restaurants & Dining',             value: 0.94 },
          { name: 'Healthcare & Medical',             value: 0.43 },
          { name: 'Entertainment & Leisure',          value: 0.50 },
          { name: 'Digital Goods & Subscriptions',   value: 0.50 },
          { name: 'Professional & Business Services', value: 0.29 },
          { name: 'Utilities & Telecommunications',   value: 0.36 },
          { name: 'Automotive & Fuel',                value: 0.14 },
          { name: 'Government & Education',           value: 0.22 },
          { name: 'Other',                            value: 0.22 }
        ],
        industryHeatmap: {
          years: [2021, 2020, 2019],
          rows: [
            { name: 'Retail',                           values: [10.2,  -8.2,  3.8] },
            { name: 'Food & Grocery',                   values: [ 9.6,  -5.4,  4.2] },
            { name: 'Travel & Transportation',          values: [16.4, -38.6,  5.2] },
            { name: 'Restaurants & Dining',             values: [12.8, -22.4,  4.8] },
            { name: 'Healthcare & Medical',             values: [ 8.5,  -6.2,  4.1] },
            { name: 'Entertainment & Leisure',          values: [13.2, -31.8,  3.6] },
            { name: 'Digital Goods & Subscriptions',   values: [15.6,  18.4,  8.9] },
            { name: 'Professional & Business Services', values: [ 9.1, -12.4,  3.4] },
            { name: 'Utilities & Telecommunications',   values: [ 5.9,   4.2,  2.8] },
            { name: 'Automotive & Fuel',                values: [ 9.4, -19.8,  2.8] },
            { name: 'Government & Education',           values: [ 7.8,   8.6,  3.2] },
            { name: 'Other',                            values: [ 9.8,  -7.6,  3.4] }
          ]
        },
        topCitiesSpend: [
          { city: 'Toronto',   value: 2.35 },
          { city: 'Vancouver', value: 1.42 },
          { city: 'Montreal',  value: 1.17 },
          { city: 'Calgary',   value: 0.78 },
          { city: 'Edmonton',  value: 0.53 }
        ],
        topCitiesYoY: [
          { city: 'Vancouver', pct: 12.1 },
          { city: 'Toronto',   pct: 11.2 },
          { city: 'Montreal',  pct:  9.8 },
          { city: 'Calgary',   pct:  9.1 },
          { city: 'Edmonton',  pct:  8.4 }
        ],
        cardType: { credit: 53, debit: 40, prepaid: 7, total: 7.20 },
        crossBorderTicket: { overall: 55.40, domestic: 48.60, inbound: 79.60, outbound: 73.20 },
        crossBorderSpend:  { overall: 7.20,  domestic:  5.54, inbound: 0.94,  outbound: 0.72 }
      }
    }

  }, /* end canada */

  /* ────────────────────────────────────────────────────────────────
     CAYMAN ISLANDS
     Tourism-dominant economy; high inbound, peak Jan–Mar & Dec,
     trough Sep–Oct (hurricane season). COVID 2020 near-zero.
  ──────────────────────────────────────────────────────────────── */
  caymanIslands: {

    /* ── 2026 ── */
    2026: {
      totalSpend: {
        monthly: {
          current:       [0.46, 0.48, 0.46, 0.39, 0.30, 0.31, null, null, null, null, null, null],
          previous:      [0.44, 0.46, 0.44, 0.38, 0.29, 0.30, 0.36, 0.38, 0.27, 0.27, 0.29, 0.43],
          twoYearsPrior: [0.42, 0.44, 0.42, 0.36, 0.28, 0.29, 0.34, 0.36, 0.26, 0.26, 0.28, 0.41]
        },
        industrySpend: [
          { name: 'Travel & Transportation',          value: 0.62 },
          { name: 'Retail',                           value: 0.53 },
          { name: 'Restaurants & Dining',             value: 0.41 },
          { name: 'Entertainment & Leisure',          value: 0.19 },
          { name: 'Food & Grocery',                   value: 0.19 },
          { name: 'Healthcare & Medical',             value: 0.12 },
          { name: 'Digital Goods & Subscriptions',   value: 0.10 },
          { name: 'Professional & Business Services', value: 0.08 },
          { name: 'Utilities & Telecommunications',   value: 0.07 },
          { name: 'Automotive & Fuel',                value: 0.04 },
          { name: 'Government & Education',           value: 0.02 },
          { name: 'Other',                            value: 0.02 }
        ],
        industryHeatmap: {
          years: [2026, 2025, 2024],
          rows: [
            { name: 'Travel & Transportation',          values: [ 4.2,  5.8,  7.2] },
            { name: 'Retail',                           values: [ 3.1,  4.6,  6.1] },
            { name: 'Restaurants & Dining',             values: [ 4.8,  6.2,  7.8] },
            { name: 'Entertainment & Leisure',          values: [ 3.6,  5.1,  6.8] },
            { name: 'Food & Grocery',                   values: [ 2.4,  3.8,  5.2] },
            { name: 'Healthcare & Medical',             values: [ 2.1,  3.2,  4.4] },
            { name: 'Digital Goods & Subscriptions',   values: [ 4.8,  6.6,  8.1] },
            { name: 'Professional & Business Services', values: [ 2.8,  4.1,  5.6] },
            { name: 'Utilities & Telecommunications',   values: [ 1.2,  2.2,  3.1] },
            { name: 'Automotive & Fuel',                values: [-0.8,  0.6,  2.4] },
            { name: 'Government & Education',           values: [ 1.8,  2.8,  3.8] },
            { name: 'Other',                            values: [ 2.6,  3.8,  5.2] }
          ]
        },
        topCitiesSpend: [
          { city: 'George Town',  value: 1.49 },
          { city: 'West Bay',     value: 0.52 },
          { city: 'Bodden Town',  value: 0.24 },
          { city: 'East End',     value: 0.10 },
          { city: 'North Side',   value: 0.06 }
        ],
        topCitiesYoY: [
          { city: 'West Bay',     pct: 6.2 },
          { city: 'George Town',  pct: 5.8 },
          { city: 'Bodden Town',  pct: 5.1 },
          { city: 'East End',     pct: 4.7 },
          { city: 'North Side',   pct: 4.2 }
        ],
        cardType: { credit: 60, debit: 34, prepaid: 6, total: 2.40 },
        crossBorderTicket: { overall: 69.20, domestic: 61.80, inbound: 118.40, outbound: 94.60 },
        crossBorderSpend:  { overall: 2.40,  domestic: 0.96,  inbound:  1.27,  outbound:  0.17 }
      },
      totalTransactions: {
        monthly: {
          current:       [0.0236, 0.0246, 0.0236, 0.0200, 0.0154, 0.0159, null, null, null, null, null, null],
          previous:      [0.0229, 0.0240, 0.0229, 0.0198, 0.0151, 0.0156, 0.0188, 0.0198, 0.0141, 0.0141, 0.0151, 0.0224],
          twoYearsPrior: [0.0221, 0.0231, 0.0221, 0.0189, 0.0147, 0.0153, 0.0179, 0.0189, 0.0137, 0.0137, 0.0147, 0.0216]
        },
        industrySpend: [
          { name: 'Travel & Transportation',          value: 0.0148 },
          { name: 'Retail',                           value: 0.0295 },
          { name: 'Restaurants & Dining',             value: 0.0221 },
          { name: 'Entertainment & Leisure',          value: 0.0148 },
          { name: 'Food & Grocery',                   value: 0.0148 },
          { name: 'Healthcare & Medical',             value: 0.0074 },
          { name: 'Digital Goods & Subscriptions',   value: 0.0074 },
          { name: 'Professional & Business Services', value: 0.0049 },
          { name: 'Utilities & Telecommunications',   value: 0.0037 },
          { name: 'Automotive & Fuel',                value: 0.0012 },
          { name: 'Government & Education',           value: 0.0012 },
          { name: 'Other',                            value: 0.0012 }
        ],
        industryHeatmap: {
          years: [2026, 2025, 2024],
          rows: [
            { name: 'Travel & Transportation',          values: [ 4.2,  5.8,  7.2] },
            { name: 'Retail',                           values: [ 3.1,  4.6,  6.1] },
            { name: 'Restaurants & Dining',             values: [ 4.8,  6.2,  7.8] },
            { name: 'Entertainment & Leisure',          values: [ 3.6,  5.1,  6.8] },
            { name: 'Food & Grocery',                   values: [ 2.4,  3.8,  5.2] },
            { name: 'Healthcare & Medical',             values: [ 2.1,  3.2,  4.4] },
            { name: 'Digital Goods & Subscriptions',   values: [ 4.8,  6.6,  8.1] },
            { name: 'Professional & Business Services', values: [ 2.8,  4.1,  5.6] },
            { name: 'Utilities & Telecommunications',   values: [ 1.2,  2.2,  3.1] },
            { name: 'Automotive & Fuel',                values: [-0.8,  0.6,  2.4] },
            { name: 'Government & Education',           values: [ 1.8,  2.8,  3.8] },
            { name: 'Other',                            values: [ 2.6,  3.8,  5.2] }
          ]
        },
        topCitiesSpend: [
          { city: 'George Town',  value: 0.0764 },
          { city: 'West Bay',     value: 0.0268 },
          { city: 'Bodden Town',  value: 0.0122 },
          { city: 'East End',     value: 0.0052 },
          { city: 'North Side',   value: 0.0031 }
        ],
        topCitiesYoY: [
          { city: 'West Bay',     pct: 6.2 },
          { city: 'George Town',  pct: 5.8 },
          { city: 'Bodden Town',  pct: 5.1 },
          { city: 'East End',     pct: 4.7 },
          { city: 'North Side',   pct: 4.2 }
        ],
        cardType: { credit: 60, debit: 34, prepaid: 6, total: 0.1231 },
        crossBorderTicket: { overall: 69.20, domestic: 61.80, inbound: 118.40, outbound: 94.60 },
        crossBorderSpend:  { overall: 0.1231, domestic: 0.0492, inbound: 0.0652, outbound: 0.0086 }
      }
    },

    /* ── 2025 ── */
    2025: {
      totalSpend: {
        monthly: {
          current:       [0.44, 0.46, 0.44, 0.38, 0.29, 0.30, 0.36, 0.38, 0.27, 0.27, 0.29, 0.43],
          previous:      [0.42, 0.44, 0.42, 0.36, 0.28, 0.29, 0.34, 0.36, 0.26, 0.26, 0.28, 0.41],
          twoYearsPrior: [0.40, 0.42, 0.39, 0.34, 0.26, 0.27, 0.32, 0.34, 0.24, 0.24, 0.27, 0.40]
        },
        industrySpend: [
          { name: 'Travel & Transportation',          value: 1.13 },
          { name: 'Retail',                           value: 0.95 },
          { name: 'Restaurants & Dining',             value: 0.74 },
          { name: 'Entertainment & Leisure',          value: 0.35 },
          { name: 'Food & Grocery',                   value: 0.35 },
          { name: 'Healthcare & Medical',             value: 0.22 },
          { name: 'Digital Goods & Subscriptions',   value: 0.17 },
          { name: 'Professional & Business Services', value: 0.15 },
          { name: 'Utilities & Telecommunications',   value: 0.13 },
          { name: 'Automotive & Fuel',                value: 0.07 },
          { name: 'Government & Education',           value: 0.04 },
          { name: 'Other',                            value: 0.04 }
        ],
        industryHeatmap: {
          years: [2025, 2024, 2023],
          rows: [
            { name: 'Travel & Transportation',          values: [ 5.8,  7.2, 19.4] },
            { name: 'Retail',                           values: [ 4.6,  6.1, 16.8] },
            { name: 'Restaurants & Dining',             values: [ 6.2,  7.8, 21.2] },
            { name: 'Entertainment & Leisure',          values: [ 5.1,  6.8, 18.6] },
            { name: 'Food & Grocery',                   values: [ 3.8,  5.2, 14.2] },
            { name: 'Healthcare & Medical',             values: [ 3.2,  4.4, 12.4] },
            { name: 'Digital Goods & Subscriptions',   values: [ 6.6,  8.1, 21.8] },
            { name: 'Professional & Business Services', values: [ 4.1,  5.6, 15.4] },
            { name: 'Utilities & Telecommunications',   values: [ 2.2,  3.1,  8.6] },
            { name: 'Automotive & Fuel',                values: [ 0.6,  2.4, 14.2] },
            { name: 'Government & Education',           values: [ 2.8,  3.8, 10.4] },
            { name: 'Other',                            values: [ 3.8,  5.2, 14.8] }
          ]
        },
        topCitiesSpend: [
          { city: 'George Town',  value: 2.66 },
          { city: 'West Bay',     value: 0.95 },
          { city: 'Bodden Town',  value: 0.43 },
          { city: 'East End',     value: 0.18 },
          { city: 'North Side',   value: 0.11 }
        ],
        topCitiesYoY: [
          { city: 'West Bay',     pct: 5.8 },
          { city: 'George Town',  pct: 5.2 },
          { city: 'Bodden Town',  pct: 4.6 },
          { city: 'East End',     pct: 4.1 },
          { city: 'North Side',   pct: 3.8 }
        ],
        cardType: { credit: 60, debit: 34, prepaid: 6, total: 4.33 },
        crossBorderTicket: { overall: 67.80, domestic: 60.40, inbound: 116.20, outbound: 92.80 },
        crossBorderSpend:  { overall: 4.33,  domestic: 1.73,  inbound:  2.30,  outbound:  0.30 }
      },
      totalTransactions: {
        monthly: {
          current:       [0.0229, 0.0240, 0.0229, 0.0198, 0.0151, 0.0156, 0.0188, 0.0198, 0.0141, 0.0141, 0.0151, 0.0224],
          previous:      [0.0221, 0.0231, 0.0221, 0.0189, 0.0147, 0.0153, 0.0179, 0.0189, 0.0137, 0.0137, 0.0147, 0.0216],
          twoYearsPrior: [0.0212, 0.0223, 0.0207, 0.0181, 0.0138, 0.0143, 0.0170, 0.0181, 0.0127, 0.0127, 0.0143, 0.0212]
        },
        industrySpend: [
          { name: 'Travel & Transportation',          value: 0.0271 },
          { name: 'Retail',                           value: 0.0541 },
          { name: 'Restaurants & Dining',             value: 0.0406 },
          { name: 'Entertainment & Leisure',          value: 0.0271 },
          { name: 'Food & Grocery',                   value: 0.0271 },
          { name: 'Healthcare & Medical',             value: 0.0135 },
          { name: 'Digital Goods & Subscriptions',   value: 0.0135 },
          { name: 'Professional & Business Services', value: 0.0090 },
          { name: 'Utilities & Telecommunications',   value: 0.0068 },
          { name: 'Automotive & Fuel',                value: 0.0023 },
          { name: 'Government & Education',           value: 0.0023 },
          { name: 'Other',                            value: 0.0023 }
        ],
        industryHeatmap: {
          years: [2025, 2024, 2023],
          rows: [
            { name: 'Travel & Transportation',          values: [ 5.8,  7.2, 19.4] },
            { name: 'Retail',                           values: [ 4.6,  6.1, 16.8] },
            { name: 'Restaurants & Dining',             values: [ 6.2,  7.8, 21.2] },
            { name: 'Entertainment & Leisure',          values: [ 5.1,  6.8, 18.6] },
            { name: 'Food & Grocery',                   values: [ 3.8,  5.2, 14.2] },
            { name: 'Healthcare & Medical',             values: [ 3.2,  4.4, 12.4] },
            { name: 'Digital Goods & Subscriptions',   values: [ 6.6,  8.1, 21.8] },
            { name: 'Professional & Business Services', values: [ 4.1,  5.6, 15.4] },
            { name: 'Utilities & Telecommunications',   values: [ 2.2,  3.1,  8.6] },
            { name: 'Automotive & Fuel',                values: [ 0.6,  2.4, 14.2] },
            { name: 'Government & Education',           values: [ 2.8,  3.8, 10.4] },
            { name: 'Other',                            values: [ 3.8,  5.2, 14.8] }
          ]
        },
        topCitiesSpend: [
          { city: 'George Town',  value: 0.1398 },
          { city: 'West Bay',     value: 0.0492 },
          { city: 'Bodden Town',  value: 0.0223 },
          { city: 'East End',     value: 0.0095 },
          { city: 'North Side',   value: 0.0056 }
        ],
        topCitiesYoY: [
          { city: 'West Bay',     pct: 5.8 },
          { city: 'George Town',  pct: 5.2 },
          { city: 'Bodden Town',  pct: 4.6 },
          { city: 'East End',     pct: 4.1 },
          { city: 'North Side',   pct: 3.8 }
        ],
        cardType: { credit: 60, debit: 34, prepaid: 6, total: 0.2255 },
        crossBorderTicket: { overall: 67.80, domestic: 60.40, inbound: 116.20, outbound: 92.80 },
        crossBorderSpend:  { overall: 0.2255, domestic: 0.0902, inbound: 0.1195, outbound: 0.0158 }
      }
    },

    /* ── 2024 ── */
    2024: {
      totalSpend: {
        monthly: {
          current:       [0.42, 0.44, 0.42, 0.36, 0.28, 0.29, 0.34, 0.36, 0.26, 0.26, 0.28, 0.41],
          previous:      [0.40, 0.42, 0.39, 0.34, 0.26, 0.27, 0.32, 0.34, 0.24, 0.24, 0.27, 0.40],
          twoYearsPrior: [0.34, 0.36, 0.34, 0.29, 0.22, 0.23, 0.27, 0.29, 0.20, 0.20, 0.23, 0.33]
        },
        industrySpend: [
          { name: 'Travel & Transportation',          value: 1.07 },
          { name: 'Retail',                           value: 0.91 },
          { name: 'Restaurants & Dining',             value: 0.70 },
          { name: 'Entertainment & Leisure',          value: 0.33 },
          { name: 'Food & Grocery',                   value: 0.33 },
          { name: 'Healthcare & Medical',             value: 0.21 },
          { name: 'Digital Goods & Subscriptions',   value: 0.16 },
          { name: 'Professional & Business Services', value: 0.14 },
          { name: 'Utilities & Telecommunications',   value: 0.12 },
          { name: 'Automotive & Fuel',                value: 0.06 },
          { name: 'Government & Education',           value: 0.04 },
          { name: 'Other',                            value: 0.04 }
        ],
        industryHeatmap: {
          years: [2024, 2023, 2022],
          rows: [
            { name: 'Travel & Transportation',          values: [ 7.2, 19.4, 24.2] },
            { name: 'Retail',                           values: [ 6.1, 16.8, 21.4] },
            { name: 'Restaurants & Dining',             values: [ 7.8, 21.2, 26.8] },
            { name: 'Entertainment & Leisure',          values: [ 6.8, 18.6, 23.2] },
            { name: 'Food & Grocery',                   values: [ 5.2, 14.2, 18.4] },
            { name: 'Healthcare & Medical',             values: [ 4.4, 12.4, 16.2] },
            { name: 'Digital Goods & Subscriptions',   values: [ 8.1, 21.8, 26.4] },
            { name: 'Professional & Business Services', values: [ 5.6, 15.4, 19.8] },
            { name: 'Utilities & Telecommunications',   values: [ 3.1,  8.6, 11.2] },
            { name: 'Automotive & Fuel',                values: [ 2.4, 14.2, 16.8] },
            { name: 'Government & Education',           values: [ 3.8, 10.4, 13.2] },
            { name: 'Other',                            values: [ 5.2, 14.8, 18.6] }
          ]
        },
        topCitiesSpend: [
          { city: 'George Town',  value: 2.55 },
          { city: 'West Bay',     value: 0.90 },
          { city: 'Bodden Town',  value: 0.41 },
          { city: 'East End',     value: 0.17 },
          { city: 'North Side',   value: 0.10 }
        ],
        topCitiesYoY: [
          { city: 'West Bay',     pct: 6.8 },
          { city: 'George Town',  pct: 6.2 },
          { city: 'Bodden Town',  pct: 5.8 },
          { city: 'East End',     pct: 5.2 },
          { city: 'North Side',   pct: 4.8 }
        ],
        cardType: { credit: 59, debit: 35, prepaid: 6, total: 4.12 },
        crossBorderTicket: { overall: 65.90, domestic: 58.60, inbound: 113.50, outbound: 90.20 },
        crossBorderSpend:  { overall: 4.12,  domestic: 1.65,  inbound:  2.18,  outbound:  0.29 }
      },
      totalTransactions: {
        monthly: {
          current:       [0.0221, 0.0231, 0.0221, 0.0189, 0.0147, 0.0153, 0.0179, 0.0189, 0.0137, 0.0137, 0.0147, 0.0216],
          previous:      [0.0212, 0.0223, 0.0207, 0.0181, 0.0138, 0.0143, 0.0170, 0.0181, 0.0127, 0.0127, 0.0143, 0.0212],
          twoYearsPrior: [0.0184, 0.0194, 0.0184, 0.0157, 0.0119, 0.0124, 0.0146, 0.0157, 0.0108, 0.0108, 0.0124, 0.0178]
        },
        industrySpend: [
          { name: 'Travel & Transportation',          value: 0.0260 },
          { name: 'Retail',                           value: 0.0521 },
          { name: 'Restaurants & Dining',             value: 0.0390 },
          { name: 'Entertainment & Leisure',          value: 0.0260 },
          { name: 'Food & Grocery',                   value: 0.0260 },
          { name: 'Healthcare & Medical',             value: 0.0130 },
          { name: 'Digital Goods & Subscriptions',   value: 0.0130 },
          { name: 'Professional & Business Services', value: 0.0087 },
          { name: 'Utilities & Telecommunications',   value: 0.0065 },
          { name: 'Automotive & Fuel',                value: 0.0022 },
          { name: 'Government & Education',           value: 0.0022 },
          { name: 'Other',                            value: 0.0022 }
        ],
        industryHeatmap: {
          years: [2024, 2023, 2022],
          rows: [
            { name: 'Travel & Transportation',          values: [ 7.2, 19.4, 24.2] },
            { name: 'Retail',                           values: [ 6.1, 16.8, 21.4] },
            { name: 'Restaurants & Dining',             values: [ 7.8, 21.2, 26.8] },
            { name: 'Entertainment & Leisure',          values: [ 6.8, 18.6, 23.2] },
            { name: 'Food & Grocery',                   values: [ 5.2, 14.2, 18.4] },
            { name: 'Healthcare & Medical',             values: [ 4.4, 12.4, 16.2] },
            { name: 'Digital Goods & Subscriptions',   values: [ 8.1, 21.8, 26.4] },
            { name: 'Professional & Business Services', values: [ 5.6, 15.4, 19.8] },
            { name: 'Utilities & Telecommunications',   values: [ 3.1,  8.6, 11.2] },
            { name: 'Automotive & Fuel',                values: [ 2.4, 14.2, 16.8] },
            { name: 'Government & Education',           values: [ 3.8, 10.4, 13.2] },
            { name: 'Other',                            values: [ 5.2, 14.8, 18.6] }
          ]
        },
        topCitiesSpend: [
          { city: 'George Town',  value: 0.1344 },
          { city: 'West Bay',     value: 0.0473 },
          { city: 'Bodden Town',  value: 0.0215 },
          { city: 'East End',     value: 0.0091 },
          { city: 'North Side',   value: 0.0054 }
        ],
        topCitiesYoY: [
          { city: 'West Bay',     pct: 6.8 },
          { city: 'George Town',  pct: 6.2 },
          { city: 'Bodden Town',  pct: 5.8 },
          { city: 'East End',     pct: 5.2 },
          { city: 'North Side',   pct: 4.8 }
        ],
        cardType: { credit: 59, debit: 35, prepaid: 6, total: 0.2168 },
        crossBorderTicket: { overall: 65.90, domestic: 58.60, inbound: 113.50, outbound: 90.20 },
        crossBorderSpend:  { overall: 0.2168, domestic: 0.0867, inbound: 0.1149, outbound: 0.0152 }
      }
    },

    /* ── 2023 ── */
    2023: {
      totalSpend: {
        monthly: {
          current:       [0.40, 0.42, 0.39, 0.34, 0.26, 0.27, 0.32, 0.34, 0.24, 0.24, 0.27, 0.40],
          previous:      [0.34, 0.36, 0.34, 0.29, 0.22, 0.23, 0.27, 0.29, 0.20, 0.20, 0.23, 0.33],
          twoYearsPrior: [0.27, 0.29, 0.27, 0.23, 0.18, 0.19, 0.22, 0.23, 0.16, 0.16, 0.19, 0.27]
        },
        industrySpend: [
          { name: 'Travel & Transportation',          value: 1.01 },
          { name: 'Retail',                           value: 0.85 },
          { name: 'Restaurants & Dining',             value: 0.66 },
          { name: 'Entertainment & Leisure',          value: 0.31 },
          { name: 'Food & Grocery',                   value: 0.31 },
          { name: 'Healthcare & Medical',             value: 0.19 },
          { name: 'Digital Goods & Subscriptions',   value: 0.16 },
          { name: 'Professional & Business Services', value: 0.14 },
          { name: 'Utilities & Telecommunications',   value: 0.12 },
          { name: 'Automotive & Fuel',                value: 0.06 },
          { name: 'Government & Education',           value: 0.04 },
          { name: 'Other',                            value: 0.04 }
        ],
        industryHeatmap: {
          years: [2023, 2022, 2021],
          rows: [
            { name: 'Travel & Transportation',          values: [19.4, 24.2, 18.8] },
            { name: 'Retail',                           values: [16.8, 21.4, 16.2] },
            { name: 'Restaurants & Dining',             values: [21.2, 26.8, 20.4] },
            { name: 'Entertainment & Leisure',          values: [18.6, 23.2, 17.8] },
            { name: 'Food & Grocery',                   values: [14.2, 18.4, 14.1] },
            { name: 'Healthcare & Medical',             values: [12.4, 16.2, 12.4] },
            { name: 'Digital Goods & Subscriptions',   values: [21.8, 26.4, 19.8] },
            { name: 'Professional & Business Services', values: [15.4, 19.8, 14.8] },
            { name: 'Utilities & Telecommunications',   values: [ 8.6, 11.2,  8.4] },
            { name: 'Automotive & Fuel',                values: [14.2, 16.8, 11.4] },
            { name: 'Government & Education',           values: [10.4, 13.2,  9.8] },
            { name: 'Other',                            values: [14.8, 18.6, 13.8] }
          ]
        },
        topCitiesSpend: [
          { city: 'George Town',  value: 2.41 },
          { city: 'West Bay',     value: 0.85 },
          { city: 'Bodden Town',  value: 0.38 },
          { city: 'East End',     value: 0.16 },
          { city: 'North Side',   value: 0.10 }
        ],
        topCitiesYoY: [
          { city: 'West Bay',     pct: 18.2 },
          { city: 'George Town',  pct: 17.8 },
          { city: 'Bodden Town',  pct: 17.1 },
          { city: 'East End',     pct: 16.4 },
          { city: 'North Side',   pct: 15.8 }
        ],
        cardType: { credit: 58, debit: 36, prepaid: 6, total: 3.88 },
        crossBorderTicket: { overall: 63.40, domestic: 56.20, inbound: 109.80, outbound: 87.60 },
        crossBorderSpend:  { overall: 3.88,  domestic: 1.55,  inbound:  2.06,  outbound:  0.27 }
      },
      totalTransactions: {
        monthly: {
          current:       [0.0212, 0.0223, 0.0207, 0.0181, 0.0138, 0.0143, 0.0170, 0.0181, 0.0127, 0.0127, 0.0143, 0.0212],
          previous:      [0.0184, 0.0194, 0.0184, 0.0157, 0.0119, 0.0124, 0.0146, 0.0157, 0.0108, 0.0108, 0.0124, 0.0178],
          twoYearsPrior: [0.0151, 0.0162, 0.0151, 0.0128, 0.0100, 0.0106, 0.0123, 0.0128, 0.0089, 0.0089, 0.0106, 0.0151]
        },
        industrySpend: [
          { name: 'Travel & Transportation',          value: 0.0248 },
          { name: 'Retail',                           value: 0.0495 },
          { name: 'Restaurants & Dining',             value: 0.0372 },
          { name: 'Entertainment & Leisure',          value: 0.0248 },
          { name: 'Food & Grocery',                   value: 0.0248 },
          { name: 'Healthcare & Medical',             value: 0.0124 },
          { name: 'Digital Goods & Subscriptions',   value: 0.0124 },
          { name: 'Professional & Business Services', value: 0.0083 },
          { name: 'Utilities & Telecommunications',   value: 0.0062 },
          { name: 'Automotive & Fuel',                value: 0.0021 },
          { name: 'Government & Education',           value: 0.0021 },
          { name: 'Other',                            value: 0.0021 }
        ],
        industryHeatmap: {
          years: [2023, 2022, 2021],
          rows: [
            { name: 'Travel & Transportation',          values: [19.4, 24.2, 18.8] },
            { name: 'Retail',                           values: [16.8, 21.4, 16.2] },
            { name: 'Restaurants & Dining',             values: [21.2, 26.8, 20.4] },
            { name: 'Entertainment & Leisure',          values: [18.6, 23.2, 17.8] },
            { name: 'Food & Grocery',                   values: [14.2, 18.4, 14.1] },
            { name: 'Healthcare & Medical',             values: [12.4, 16.2, 12.4] },
            { name: 'Digital Goods & Subscriptions',   values: [21.8, 26.4, 19.8] },
            { name: 'Professional & Business Services', values: [15.4, 19.8, 14.8] },
            { name: 'Utilities & Telecommunications',   values: [ 8.6, 11.2,  8.4] },
            { name: 'Automotive & Fuel',                values: [14.2, 16.8, 11.4] },
            { name: 'Government & Education',           values: [10.4, 13.2,  9.8] },
            { name: 'Other',                            values: [14.8, 18.6, 13.8] }
          ]
        },
        topCitiesSpend: [
          { city: 'George Town',  value: 0.1280 },
          { city: 'West Bay',     value: 0.0450 },
          { city: 'Bodden Town',  value: 0.0204 },
          { city: 'East End',     value: 0.0087 },
          { city: 'North Side',   value: 0.0052 }
        ],
        topCitiesYoY: [
          { city: 'West Bay',     pct: 18.2 },
          { city: 'George Town',  pct: 17.8 },
          { city: 'Bodden Town',  pct: 17.1 },
          { city: 'East End',     pct: 16.4 },
          { city: 'North Side',   pct: 15.8 }
        ],
        cardType: { credit: 58, debit: 36, prepaid: 6, total: 0.2064 },
        crossBorderTicket: { overall: 63.40, domestic: 56.20, inbound: 109.80, outbound: 87.60 },
        crossBorderSpend:  { overall: 0.2064, domestic: 0.0826, inbound: 0.1094, outbound: 0.0144 }
      }
    },

    /* ── 2022 ── */
    2022: {
      totalSpend: {
        monthly: {
          current:       [0.34, 0.36, 0.34, 0.29, 0.22, 0.23, 0.27, 0.29, 0.20, 0.20, 0.23, 0.33],
          previous:      [0.27, 0.29, 0.27, 0.23, 0.18, 0.19, 0.22, 0.23, 0.16, 0.16, 0.19, 0.27],
          twoYearsPrior: [0.23, 0.21, 0.13, 0.03, 0.03, 0.03, 0.06, 0.07, 0.05, 0.05, 0.06, 0.12]
        },
        industrySpend: [
          { name: 'Travel & Transportation',          value: 0.85 },
          { name: 'Retail',                           value: 0.72 },
          { name: 'Restaurants & Dining',             value: 0.56 },
          { name: 'Entertainment & Leisure',          value: 0.26 },
          { name: 'Food & Grocery',                   value: 0.26 },
          { name: 'Healthcare & Medical',             value: 0.16 },
          { name: 'Digital Goods & Subscriptions',   value: 0.13 },
          { name: 'Professional & Business Services', value: 0.11 },
          { name: 'Utilities & Telecommunications',   value: 0.10 },
          { name: 'Automotive & Fuel',                value: 0.05 },
          { name: 'Government & Education',           value: 0.03 },
          { name: 'Other',                            value: 0.03 }
        ],
        industryHeatmap: {
          years: [2022, 2021, 2020],
          rows: [
            { name: 'Travel & Transportation',          values: [24.2, 18.8, -52.4] },
            { name: 'Retail',                           values: [21.4, 16.2, -24.8] },
            { name: 'Restaurants & Dining',             values: [26.8, 20.4, -48.6] },
            { name: 'Entertainment & Leisure',          values: [23.2, 17.8, -44.2] },
            { name: 'Food & Grocery',                   values: [18.4, 14.1, -18.4] },
            { name: 'Healthcare & Medical',             values: [16.2, 12.4, -12.8] },
            { name: 'Digital Goods & Subscriptions',   values: [26.4, 19.8,  14.2] },
            { name: 'Professional & Business Services', values: [19.8, 14.8, -28.4] },
            { name: 'Utilities & Telecommunications',   values: [11.2,  8.4,   2.8] },
            { name: 'Automotive & Fuel',                values: [16.8, 11.4, -38.6] },
            { name: 'Government & Education',           values: [13.2,  9.8,   4.2] },
            { name: 'Other',                            values: [18.6, 13.8, -22.4] }
          ]
        },
        topCitiesSpend: [
          { city: 'George Town',  value: 2.03 },
          { city: 'West Bay',     value: 0.72 },
          { city: 'Bodden Town',  value: 0.32 },
          { city: 'East End',     value: 0.14 },
          { city: 'North Side',   value: 0.08 }
        ],
        topCitiesYoY: [
          { city: 'George Town',  pct: 23.8 },
          { city: 'West Bay',     pct: 22.4 },
          { city: 'Bodden Town',  pct: 21.6 },
          { city: 'East End',     pct: 21.2 },
          { city: 'North Side',   pct: 20.8 }
        ],
        cardType: { credit: 58, debit: 36, prepaid: 6, total: 3.28 },
        crossBorderTicket: { overall: 59.80, domestic: 52.40, inbound: 104.20, outbound: 83.10 },
        crossBorderSpend:  { overall: 3.28,  domestic: 1.31,  inbound:  1.74,  outbound:  0.23 }
      },
      totalTransactions: {
        monthly: {
          current:       [0.0184, 0.0194, 0.0184, 0.0157, 0.0119, 0.0124, 0.0146, 0.0157, 0.0108, 0.0108, 0.0124, 0.0178],
          previous:      [0.0151, 0.0162, 0.0151, 0.0128, 0.0100, 0.0106, 0.0123, 0.0128, 0.0089, 0.0089, 0.0106, 0.0151],
          twoYearsPrior: [0.0125, 0.0114, 0.0071, 0.0016, 0.0016, 0.0016, 0.0033, 0.0038, 0.0027, 0.0027, 0.0033, 0.0065]
        },
        industrySpend: [
          { name: 'Travel & Transportation',          value: 0.0214 },
          { name: 'Retail',                           value: 0.0428 },
          { name: 'Restaurants & Dining',             value: 0.0321 },
          { name: 'Entertainment & Leisure',          value: 0.0214 },
          { name: 'Food & Grocery',                   value: 0.0214 },
          { name: 'Healthcare & Medical',             value: 0.0107 },
          { name: 'Digital Goods & Subscriptions',   value: 0.0107 },
          { name: 'Professional & Business Services', value: 0.0071 },
          { name: 'Utilities & Telecommunications',   value: 0.0053 },
          { name: 'Automotive & Fuel',                value: 0.0018 },
          { name: 'Government & Education',           value: 0.0018 },
          { name: 'Other',                            value: 0.0018 }
        ],
        industryHeatmap: {
          years: [2022, 2021, 2020],
          rows: [
            { name: 'Travel & Transportation',          values: [24.2, 18.8, -52.4] },
            { name: 'Retail',                           values: [21.4, 16.2, -24.8] },
            { name: 'Restaurants & Dining',             values: [26.8, 20.4, -48.6] },
            { name: 'Entertainment & Leisure',          values: [23.2, 17.8, -44.2] },
            { name: 'Food & Grocery',                   values: [18.4, 14.1, -18.4] },
            { name: 'Healthcare & Medical',             values: [16.2, 12.4, -12.8] },
            { name: 'Digital Goods & Subscriptions',   values: [26.4, 19.8,  14.2] },
            { name: 'Professional & Business Services', values: [19.8, 14.8, -28.4] },
            { name: 'Utilities & Telecommunications',   values: [11.2,  8.4,   2.8] },
            { name: 'Automotive & Fuel',                values: [16.8, 11.4, -38.6] },
            { name: 'Government & Education',           values: [13.2,  9.8,   4.2] },
            { name: 'Other',                            values: [18.6, 13.8, -22.4] }
          ]
        },
        topCitiesSpend: [
          { city: 'George Town',  value: 0.1055 },
          { city: 'West Bay',     value: 0.0389 },
          { city: 'Bodden Town',  value: 0.0177 },
          { city: 'East End',     value: 0.0075 },
          { city: 'North Side',   value: 0.0045 }
        ],
        topCitiesYoY: [
          { city: 'George Town',  pct: 23.8 },
          { city: 'West Bay',     pct: 22.4 },
          { city: 'Bodden Town',  pct: 21.6 },
          { city: 'East End',     pct: 21.2 },
          { city: 'North Side',   pct: 20.8 }
        ],
        cardType: { credit: 58, debit: 36, prepaid: 6, total: 0.1783 },
        crossBorderTicket: { overall: 59.80, domestic: 52.40, inbound: 104.20, outbound: 83.10 },
        crossBorderSpend:  { overall: 0.1783, domestic: 0.0713, inbound: 0.0945, outbound: 0.0125 }
      }
    },

    /* ── 2021 ── */
    2021: {
      totalSpend: {
        monthly: {
          current:       [0.27, 0.29, 0.27, 0.23, 0.18, 0.19, 0.22, 0.23, 0.16, 0.16, 0.19, 0.27],
          previous:      [0.23, 0.21, 0.13, 0.03, 0.03, 0.03, 0.06, 0.07, 0.05, 0.05, 0.06, 0.12],
          twoYearsPrior: [0.32, 0.33, 0.32, 0.27, 0.20, 0.21, 0.25, 0.27, 0.19, 0.19, 0.21, 0.31]
        },
        industrySpend: [
          { name: 'Travel & Transportation',          value: 0.69 },
          { name: 'Retail',                           value: 0.58 },
          { name: 'Restaurants & Dining',             value: 0.45 },
          { name: 'Entertainment & Leisure',          value: 0.21 },
          { name: 'Food & Grocery',                   value: 0.21 },
          { name: 'Healthcare & Medical',             value: 0.13 },
          { name: 'Digital Goods & Subscriptions',   value: 0.11 },
          { name: 'Professional & Business Services', value: 0.09 },
          { name: 'Utilities & Telecommunications',   value: 0.08 },
          { name: 'Automotive & Fuel',                value: 0.04 },
          { name: 'Government & Education',           value: 0.02 },
          { name: 'Other',                            value: 0.02 }
        ],
        industryHeatmap: {
          years: [2021, 2020, 2019],
          rows: [
            { name: 'Travel & Transportation',          values: [18.8, -52.4,  6.8] },
            { name: 'Retail',                           values: [16.2, -24.8,  5.2] },
            { name: 'Restaurants & Dining',             values: [20.4, -48.6,  6.4] },
            { name: 'Entertainment & Leisure',          values: [17.8, -44.2,  5.8] },
            { name: 'Food & Grocery',                   values: [14.1, -18.4,  4.8] },
            { name: 'Healthcare & Medical',             values: [12.4, -12.8,  4.2] },
            { name: 'Digital Goods & Subscriptions',   values: [19.8,  14.2,  9.8] },
            { name: 'Professional & Business Services', values: [14.8, -28.4,  4.4] },
            { name: 'Utilities & Telecommunications',   values: [ 8.4,   2.8,  3.2] },
            { name: 'Automotive & Fuel',                values: [11.4, -38.6,  3.4] },
            { name: 'Government & Education',           values: [ 9.8,   4.2,  3.8] },
            { name: 'Other',                            values: [13.8, -22.4,  4.6] }
          ]
        },
        topCitiesSpend: [
          { city: 'George Town',  value: 1.64 },
          { city: 'West Bay',     value: 0.58 },
          { city: 'Bodden Town',  value: 0.26 },
          { city: 'East End',     value: 0.11 },
          { city: 'North Side',   value: 0.06 }
        ],
        topCitiesYoY: [
          { city: 'George Town',  pct: 18.3 },
          { city: 'West Bay',     pct: 17.6 },
          { city: 'Bodden Town',  pct: 16.8 },
          { city: 'East End',     pct: 16.2 },
          { city: 'North Side',   pct: 15.4 }
        ],
        cardType: { credit: 57, debit: 37, prepaid: 6, total: 2.65 },
        crossBorderTicket: { overall: 55.20, domestic: 48.10, inbound: 96.40, outbound: 77.30 },
        crossBorderSpend:  { overall: 2.65,  domestic: 1.06,  inbound:  1.40,  outbound:  0.19 }
      },
      totalTransactions: {
        monthly: {
          current:       [0.0151, 0.0162, 0.0151, 0.0128, 0.0100, 0.0106, 0.0123, 0.0128, 0.0089, 0.0089, 0.0106, 0.0151],
          previous:      [0.0125, 0.0114, 0.0071, 0.0016, 0.0016, 0.0016, 0.0033, 0.0038, 0.0027, 0.0027, 0.0033, 0.0065],
          twoYearsPrior: [0.0167, 0.0173, 0.0167, 0.0141, 0.0105, 0.0110, 0.0131, 0.0141, 0.0099, 0.0099, 0.0110, 0.0162]
        },
        industrySpend: [
          { name: 'Travel & Transportation',          value: 0.0178 },
          { name: 'Retail',                           value: 0.0355 },
          { name: 'Restaurants & Dining',             value: 0.0266 },
          { name: 'Entertainment & Leisure',          value: 0.0178 },
          { name: 'Food & Grocery',                   value: 0.0178 },
          { name: 'Healthcare & Medical',             value: 0.0089 },
          { name: 'Digital Goods & Subscriptions',   value: 0.0089 },
          { name: 'Professional & Business Services', value: 0.0059 },
          { name: 'Utilities & Telecommunications',   value: 0.0044 },
          { name: 'Automotive & Fuel',                value: 0.0015 },
          { name: 'Government & Education',           value: 0.0015 },
          { name: 'Other',                            value: 0.0015 }
        ],
        industryHeatmap: {
          years: [2021, 2020, 2019],
          rows: [
            { name: 'Travel & Transportation',          values: [18.8, -52.4,  6.8] },
            { name: 'Retail',                           values: [16.2, -24.8,  5.2] },
            { name: 'Restaurants & Dining',             values: [20.4, -48.6,  6.4] },
            { name: 'Entertainment & Leisure',          values: [17.8, -44.2,  5.8] },
            { name: 'Food & Grocery',                   values: [14.1, -18.4,  4.8] },
            { name: 'Healthcare & Medical',             values: [12.4, -12.8,  4.2] },
            { name: 'Digital Goods & Subscriptions',   values: [19.8,  14.2,  9.8] },
            { name: 'Professional & Business Services', values: [14.8, -28.4,  4.4] },
            { name: 'Utilities & Telecommunications',   values: [ 8.4,   2.8,  3.2] },
            { name: 'Automotive & Fuel',                values: [11.4, -38.6,  3.4] },
            { name: 'Government & Education',           values: [ 9.8,   4.2,  3.8] },
            { name: 'Other',                            values: [13.8, -22.4,  4.6] }
          ]
        },
        topCitiesSpend: [
          { city: 'George Town',  value: 0.0918 },
          { city: 'West Bay',     value: 0.0323 },
          { city: 'Bodden Town',  value: 0.0147 },
          { city: 'East End',     value: 0.0062 },
          { city: 'North Side',   value: 0.0037 }
        ],
        topCitiesYoY: [
          { city: 'George Town',  pct: 18.3 },
          { city: 'West Bay',     pct: 17.6 },
          { city: 'Bodden Town',  pct: 16.8 },
          { city: 'East End',     pct: 16.2 },
          { city: 'North Side',   pct: 15.4 }
        ],
        cardType: { credit: 57, debit: 37, prepaid: 6, total: 0.1480 },
        crossBorderTicket: { overall: 55.20, domestic: 48.10, inbound: 96.40, outbound: 77.30 },
        crossBorderSpend:  { overall: 0.1480, domestic: 0.0592, inbound: 0.0784, outbound: 0.0104 }
      }
    }

  }, /* end caymanIslands */

  /* ────────────────────────────────────────────────────────────────
     BELIZE
     Mixed economy: tourism, agriculture, services. Less seasonal
     than Cayman. Peak Dec–Feb; trough Sep (hurricane). Modest
     inbound ticket; higher domestic share than Cayman.
  ──────────────────────────────────────────────────────────────── */
  belize: {

    /* ── 2026 ── */
    2026: {
      totalSpend: {
        monthly: {
          current:       [0.097, 0.094, 0.090, 0.084, 0.076, 0.080, null, null, null, null, null, null],
          previous:      [0.094, 0.091, 0.087, 0.081, 0.073, 0.077, 0.085, 0.088, 0.067, 0.070, 0.081, 0.094],
          twoYearsPrior: [0.089, 0.086, 0.083, 0.077, 0.069, 0.073, 0.081, 0.084, 0.064, 0.067, 0.077, 0.089]
        },
        industrySpend: [
          { name: 'Retail',                           value: 0.130 },
          { name: 'Food & Grocery',                   value: 0.094 },
          { name: 'Travel & Transportation',          value: 0.073 },
          { name: 'Restaurants & Dining',             value: 0.062 },
          { name: 'Automotive & Fuel',                value: 0.042 },
          { name: 'Healthcare & Medical',             value: 0.036 },
          { name: 'Entertainment & Leisure',          value: 0.026 },
          { name: 'Utilities & Telecommunications',   value: 0.021 },
          { name: 'Digital Goods & Subscriptions',   value: 0.016 },
          { name: 'Professional & Business Services', value: 0.010 },
          { name: 'Government & Education',           value: 0.005 },
          { name: 'Other',                            value: 0.005 }
        ],
        industryHeatmap: {
          years: [2026, 2025, 2024],
          rows: [
            { name: 'Retail',                           values: [ 2.6,  3.8,  5.2] },
            { name: 'Food & Grocery',                   values: [ 1.8,  2.9,  4.1] },
            { name: 'Travel & Transportation',          values: [ 3.8,  5.4,  7.6] },
            { name: 'Restaurants & Dining',             values: [ 3.4,  4.8,  6.4] },
            { name: 'Automotive & Fuel',                values: [ 0.6,  1.8,  4.2] },
            { name: 'Healthcare & Medical',             values: [ 1.6,  2.4,  3.6] },
            { name: 'Entertainment & Leisure',          values: [ 2.9,  4.2,  5.8] },
            { name: 'Utilities & Telecommunications',   values: [ 1.0,  1.8,  2.8] },
            { name: 'Digital Goods & Subscriptions',   values: [ 4.2,  5.8,  7.4] },
            { name: 'Professional & Business Services', values: [ 2.4,  3.4,  4.8] },
            { name: 'Government & Education',           values: [ 1.4,  2.2,  3.2] },
            { name: 'Other',                            values: [ 2.1,  3.0,  4.4] }
          ]
        },
        topCitiesSpend: [
          { city: 'Belize City', value: 0.270 },
          { city: 'San Ignacio', value: 0.094 },
          { city: 'Orange Walk', value: 0.073 },
          { city: 'Dangriga',    value: 0.052 },
          { city: 'Placencia',   value: 0.031 }
        ],
        topCitiesYoY: [
          { city: 'Placencia',   pct: 5.4 },
          { city: 'Belize City', pct: 4.8 },
          { city: 'San Ignacio', pct: 4.2 },
          { city: 'Orange Walk', pct: 3.8 },
          { city: 'Dangriga',    pct: 3.4 }
        ],
        cardType: { credit: 54, debit: 39, prepaid: 7, total: 0.52 },
        crossBorderTicket: { overall: 41.20, domestic: 36.80, inbound: 72.40, outbound: 62.80 },
        crossBorderSpend:  { overall: 0.52,  domestic: 0.338, inbound: 0.130, outbound: 0.052 }
      },
      totalTransactions: {
        monthly: {
          current:       [0.0056, 0.0055, 0.0052, 0.0049, 0.0044, 0.0046, null, null, null, null, null, null],
          previous:      [0.0055, 0.0054, 0.0051, 0.0048, 0.0043, 0.0045, 0.0050, 0.0052, 0.0039, 0.0041, 0.0048, 0.0055],
          twoYearsPrior: [0.0053, 0.0051, 0.0049, 0.0046, 0.0041, 0.0044, 0.0048, 0.0050, 0.0038, 0.0040, 0.0046, 0.0053]
        },
        industrySpend: [
          { name: 'Retail',                           value: 0.0082 },
          { name: 'Food & Grocery',                   value: 0.0060 },
          { name: 'Travel & Transportation',          value: 0.0024 },
          { name: 'Restaurants & Dining',             value: 0.0042 },
          { name: 'Automotive & Fuel',                value: 0.0030 },
          { name: 'Healthcare & Medical',             value: 0.0024 },
          { name: 'Entertainment & Leisure',          value: 0.0015 },
          { name: 'Utilities & Telecommunications',   value: 0.0012 },
          { name: 'Digital Goods & Subscriptions',   value: 0.0006 },
          { name: 'Professional & Business Services', value: 0.0003 },
          { name: 'Government & Education',           value: 0.0002 },
          { name: 'Other',                            value: 0.0002 }
        ],
        industryHeatmap: {
          years: [2026, 2025, 2024],
          rows: [
            { name: 'Retail',                           values: [ 2.6,  3.8,  5.2] },
            { name: 'Food & Grocery',                   values: [ 1.8,  2.9,  4.1] },
            { name: 'Travel & Transportation',          values: [ 3.8,  5.4,  7.6] },
            { name: 'Restaurants & Dining',             values: [ 3.4,  4.8,  6.4] },
            { name: 'Automotive & Fuel',                values: [ 0.6,  1.8,  4.2] },
            { name: 'Healthcare & Medical',             values: [ 1.6,  2.4,  3.6] },
            { name: 'Entertainment & Leisure',          values: [ 2.9,  4.2,  5.8] },
            { name: 'Utilities & Telecommunications',   values: [ 1.0,  1.8,  2.8] },
            { name: 'Digital Goods & Subscriptions',   values: [ 4.2,  5.8,  7.4] },
            { name: 'Professional & Business Services', values: [ 2.4,  3.4,  4.8] },
            { name: 'Government & Education',           values: [ 1.4,  2.2,  3.2] },
            { name: 'Other',                            values: [ 2.1,  3.0,  4.4] }
          ]
        },
        topCitiesSpend: [
          { city: 'Belize City', value: 0.0157 },
          { city: 'San Ignacio', value: 0.0054 },
          { city: 'Orange Walk', value: 0.0042 },
          { city: 'Dangriga',    value: 0.0030 },
          { city: 'Placencia',   value: 0.0018 }
        ],
        topCitiesYoY: [
          { city: 'Placencia',   pct: 5.4 },
          { city: 'Belize City', pct: 4.8 },
          { city: 'San Ignacio', pct: 4.2 },
          { city: 'Orange Walk', pct: 3.8 },
          { city: 'Dangriga',    pct: 3.4 }
        ],
        cardType: { credit: 54, debit: 39, prepaid: 7, total: 0.0302 },
        crossBorderTicket: { overall: 41.20, domestic: 36.80, inbound: 72.40, outbound: 62.80 },
        crossBorderSpend:  { overall: 0.0302, domestic: 0.0196, inbound: 0.0076, outbound: 0.0030 }
      }
    },

    /* ── 2025 ── */
    2025: {
      totalSpend: {
        monthly: {
          current:       [0.094, 0.091, 0.087, 0.081, 0.073, 0.077, 0.085, 0.088, 0.067, 0.070, 0.081, 0.094],
          previous:      [0.089, 0.086, 0.083, 0.077, 0.069, 0.073, 0.081, 0.084, 0.064, 0.067, 0.077, 0.089],
          twoYearsPrior: [0.084, 0.081, 0.077, 0.072, 0.065, 0.068, 0.076, 0.078, 0.060, 0.062, 0.072, 0.084]
        },
        industrySpend: [
          { name: 'Retail',                           value: 0.248 },
          { name: 'Food & Grocery',                   value: 0.178 },
          { name: 'Travel & Transportation',          value: 0.139 },
          { name: 'Restaurants & Dining',             value: 0.119 },
          { name: 'Automotive & Fuel',                value: 0.079 },
          { name: 'Healthcare & Medical',             value: 0.069 },
          { name: 'Entertainment & Leisure',          value: 0.050 },
          { name: 'Utilities & Telecommunications',   value: 0.040 },
          { name: 'Digital Goods & Subscriptions',   value: 0.030 },
          { name: 'Professional & Business Services', value: 0.020 },
          { name: 'Government & Education',           value: 0.009 },
          { name: 'Other',                            value: 0.009 }
        ],
        industryHeatmap: {
          years: [2025, 2024, 2023],
          rows: [
            { name: 'Retail',                           values: [ 3.8,  5.2, 10.4] },
            { name: 'Food & Grocery',                   values: [ 2.9,  4.1,  8.2] },
            { name: 'Travel & Transportation',          values: [ 5.4,  7.6, 14.8] },
            { name: 'Restaurants & Dining',             values: [ 4.8,  6.4, 12.6] },
            { name: 'Automotive & Fuel',                values: [ 1.8,  4.2, 12.8] },
            { name: 'Healthcare & Medical',             values: [ 2.4,  3.6,  7.1] },
            { name: 'Entertainment & Leisure',          values: [ 4.2,  5.8, 11.2] },
            { name: 'Utilities & Telecommunications',   values: [ 1.8,  2.8,  5.8] },
            { name: 'Digital Goods & Subscriptions',   values: [ 5.8,  7.4, 13.8] },
            { name: 'Professional & Business Services', values: [ 3.4,  4.8,  9.4] },
            { name: 'Government & Education',           values: [ 2.2,  3.2,  6.4] },
            { name: 'Other',                            values: [ 3.0,  4.4,  8.8] }
          ]
        },
        topCitiesSpend: [
          { city: 'Belize City', value: 0.515 },
          { city: 'San Ignacio', value: 0.178 },
          { city: 'Orange Walk', value: 0.139 },
          { city: 'Dangriga',    value: 0.099 },
          { city: 'Placencia',   value: 0.059 }
        ],
        topCitiesYoY: [
          { city: 'Placencia',   pct: 6.2 },
          { city: 'Belize City', pct: 5.4 },
          { city: 'San Ignacio', pct: 5.1 },
          { city: 'Orange Walk', pct: 4.6 },
          { city: 'Dangriga',    pct: 4.2 }
        ],
        cardType: { credit: 54, debit: 39, prepaid: 7, total: 0.99 },
        crossBorderTicket: { overall: 40.60, domestic: 36.20, inbound: 71.30, outbound: 61.80 },
        crossBorderSpend:  { overall: 0.99,  domestic: 0.644, inbound: 0.248, outbound: 0.099 }
      },
      totalTransactions: {
        monthly: {
          current:       [0.0055, 0.0054, 0.0051, 0.0048, 0.0043, 0.0045, 0.0050, 0.0052, 0.0039, 0.0041, 0.0048, 0.0055],
          previous:      [0.0053, 0.0051, 0.0049, 0.0046, 0.0041, 0.0044, 0.0048, 0.0050, 0.0038, 0.0040, 0.0046, 0.0053],
          twoYearsPrior: [0.0051, 0.0049, 0.0047, 0.0044, 0.0039, 0.0041, 0.0046, 0.0047, 0.0036, 0.0038, 0.0044, 0.0051]
        },
        industrySpend: [
          { name: 'Retail',                           value: 0.0157 },
          { name: 'Food & Grocery',                   value: 0.0116 },
          { name: 'Travel & Transportation',          value: 0.0047 },
          { name: 'Restaurants & Dining',             value: 0.0081 },
          { name: 'Automotive & Fuel',                value: 0.0058 },
          { name: 'Healthcare & Medical',             value: 0.0047 },
          { name: 'Entertainment & Leisure',          value: 0.0029 },
          { name: 'Utilities & Telecommunications',   value: 0.0023 },
          { name: 'Digital Goods & Subscriptions',   value: 0.0012 },
          { name: 'Professional & Business Services', value: 0.0006 },
          { name: 'Government & Education',           value: 0.0003 },
          { name: 'Other',                            value: 0.0003 }
        ],
        industryHeatmap: {
          years: [2025, 2024, 2023],
          rows: [
            { name: 'Retail',                           values: [ 3.8,  5.2, 10.4] },
            { name: 'Food & Grocery',                   values: [ 2.9,  4.1,  8.2] },
            { name: 'Travel & Transportation',          values: [ 5.4,  7.6, 14.8] },
            { name: 'Restaurants & Dining',             values: [ 4.8,  6.4, 12.6] },
            { name: 'Automotive & Fuel',                values: [ 1.8,  4.2, 12.8] },
            { name: 'Healthcare & Medical',             values: [ 2.4,  3.6,  7.1] },
            { name: 'Entertainment & Leisure',          values: [ 4.2,  5.8, 11.2] },
            { name: 'Utilities & Telecommunications',   values: [ 1.8,  2.8,  5.8] },
            { name: 'Digital Goods & Subscriptions',   values: [ 5.8,  7.4, 13.8] },
            { name: 'Professional & Business Services', values: [ 3.4,  4.8,  9.4] },
            { name: 'Government & Education',           values: [ 2.2,  3.2,  6.4] },
            { name: 'Other',                            values: [ 3.0,  4.4,  8.8] }
          ]
        },
        topCitiesSpend: [
          { city: 'Belize City', value: 0.0303 },
          { city: 'San Ignacio', value: 0.0105 },
          { city: 'Orange Walk', value: 0.0081 },
          { city: 'Dangriga',    value: 0.0058 },
          { city: 'Placencia',   value: 0.0035 }
        ],
        topCitiesYoY: [
          { city: 'Placencia',   pct: 6.2 },
          { city: 'Belize City', pct: 5.4 },
          { city: 'San Ignacio', pct: 5.1 },
          { city: 'Orange Walk', pct: 4.6 },
          { city: 'Dangriga',    pct: 4.2 }
        ],
        cardType: { credit: 54, debit: 39, prepaid: 7, total: 0.0582 },
        crossBorderTicket: { overall: 40.60, domestic: 36.20, inbound: 71.30, outbound: 61.80 },
        crossBorderSpend:  { overall: 0.0582, domestic: 0.0378, inbound: 0.0146, outbound: 0.0058 }
      }
    },

    /* ── 2024 ── */
    2024: {
      totalSpend: {
        monthly: {
          current:       [0.089, 0.086, 0.083, 0.077, 0.069, 0.073, 0.081, 0.084, 0.064, 0.067, 0.077, 0.089],
          previous:      [0.084, 0.081, 0.077, 0.072, 0.065, 0.068, 0.076, 0.078, 0.060, 0.062, 0.072, 0.084],
          twoYearsPrior: [0.075, 0.073, 0.069, 0.065, 0.058, 0.062, 0.068, 0.070, 0.054, 0.056, 0.065, 0.075]
        },
        industrySpend: [
          { name: 'Retail',                           value: 0.235 },
          { name: 'Food & Grocery',                   value: 0.169 },
          { name: 'Travel & Transportation',          value: 0.132 },
          { name: 'Restaurants & Dining',             value: 0.113 },
          { name: 'Automotive & Fuel',                value: 0.075 },
          { name: 'Healthcare & Medical',             value: 0.066 },
          { name: 'Entertainment & Leisure',          value: 0.047 },
          { name: 'Utilities & Telecommunications',   value: 0.038 },
          { name: 'Digital Goods & Subscriptions',   value: 0.028 },
          { name: 'Professional & Business Services', value: 0.019 },
          { name: 'Government & Education',           value: 0.009 },
          { name: 'Other',                            value: 0.009 }
        ],
        industryHeatmap: {
          years: [2024, 2023, 2022],
          rows: [
            { name: 'Retail',                           values: [ 5.2, 10.4, 14.8] },
            { name: 'Food & Grocery',                   values: [ 4.1,  8.2, 11.8] },
            { name: 'Travel & Transportation',          values: [ 7.6, 14.8, 19.4] },
            { name: 'Restaurants & Dining',             values: [ 6.4, 12.6, 16.8] },
            { name: 'Automotive & Fuel',                values: [ 4.2, 12.8, 18.1] },
            { name: 'Healthcare & Medical',             values: [ 3.6,  7.1, 10.2] },
            { name: 'Entertainment & Leisure',          values: [ 5.8, 11.2, 15.4] },
            { name: 'Utilities & Telecommunications',   values: [ 2.8,  5.8,  9.4] },
            { name: 'Digital Goods & Subscriptions',   values: [ 7.4, 13.8, 18.6] },
            { name: 'Professional & Business Services', values: [ 4.8,  9.4, 13.2] },
            { name: 'Government & Education',           values: [ 3.2,  6.4,  9.8] },
            { name: 'Other',                            values: [ 4.4,  8.8, 13.2] }
          ]
        },
        topCitiesSpend: [
          { city: 'Belize City', value: 0.489 },
          { city: 'San Ignacio', value: 0.169 },
          { city: 'Orange Walk', value: 0.132 },
          { city: 'Dangriga',    value: 0.094 },
          { city: 'Placencia',   value: 0.056 }
        ],
        topCitiesYoY: [
          { city: 'Placencia',   pct: 7.8 },
          { city: 'Belize City', pct: 7.2 },
          { city: 'San Ignacio', pct: 6.8 },
          { city: 'Orange Walk', pct: 6.4 },
          { city: 'Dangriga',    pct: 5.9 }
        ],
        cardType: { credit: 53, debit: 40, prepaid: 7, total: 0.94 },
        crossBorderTicket: { overall: 39.80, domestic: 35.40, inbound: 69.80, outbound: 60.40 },
        crossBorderSpend:  { overall: 0.94,  domestic: 0.611, inbound: 0.235, outbound: 0.094 }
      },
      totalTransactions: {
        monthly: {
          current:       [0.0053, 0.0051, 0.0049, 0.0046, 0.0041, 0.0044, 0.0048, 0.0050, 0.0038, 0.0040, 0.0046, 0.0053],
          previous:      [0.0051, 0.0049, 0.0047, 0.0044, 0.0039, 0.0041, 0.0046, 0.0047, 0.0036, 0.0038, 0.0044, 0.0051],
          twoYearsPrior: [0.0046, 0.0045, 0.0043, 0.0040, 0.0036, 0.0038, 0.0042, 0.0043, 0.0033, 0.0035, 0.0040, 0.0046]
        },
        industrySpend: [
          { name: 'Retail',                           value: 0.0151 },
          { name: 'Food & Grocery',                   value: 0.0112 },
          { name: 'Travel & Transportation',          value: 0.0045 },
          { name: 'Restaurants & Dining',             value: 0.0078 },
          { name: 'Automotive & Fuel',                value: 0.0056 },
          { name: 'Healthcare & Medical',             value: 0.0045 },
          { name: 'Entertainment & Leisure',          value: 0.0028 },
          { name: 'Utilities & Telecommunications',   value: 0.0022 },
          { name: 'Digital Goods & Subscriptions',   value: 0.0011 },
          { name: 'Professional & Business Services', value: 0.0006 },
          { name: 'Government & Education',           value: 0.0003 },
          { name: 'Other',                            value: 0.0003 }
        ],
        industryHeatmap: {
          years: [2024, 2023, 2022],
          rows: [
            { name: 'Retail',                           values: [ 5.2, 10.4, 14.8] },
            { name: 'Food & Grocery',                   values: [ 4.1,  8.2, 11.8] },
            { name: 'Travel & Transportation',          values: [ 7.6, 14.8, 19.4] },
            { name: 'Restaurants & Dining',             values: [ 6.4, 12.6, 16.8] },
            { name: 'Automotive & Fuel',                values: [ 4.2, 12.8, 18.1] },
            { name: 'Healthcare & Medical',             values: [ 3.6,  7.1, 10.2] },
            { name: 'Entertainment & Leisure',          values: [ 5.8, 11.2, 15.4] },
            { name: 'Utilities & Telecommunications',   values: [ 2.8,  5.8,  9.4] },
            { name: 'Digital Goods & Subscriptions',   values: [ 7.4, 13.8, 18.6] },
            { name: 'Professional & Business Services', values: [ 4.8,  9.4, 13.2] },
            { name: 'Government & Education',           values: [ 3.2,  6.4,  9.8] },
            { name: 'Other',                            values: [ 4.4,  8.8, 13.2] }
          ]
        },
        topCitiesSpend: [
          { city: 'Belize City', value: 0.0291 },
          { city: 'San Ignacio', value: 0.0101 },
          { city: 'Orange Walk', value: 0.0078 },
          { city: 'Dangriga',    value: 0.0056 },
          { city: 'Placencia',   value: 0.0034 }
        ],
        topCitiesYoY: [
          { city: 'Placencia',   pct: 7.8 },
          { city: 'Belize City', pct: 7.2 },
          { city: 'San Ignacio', pct: 6.8 },
          { city: 'Orange Walk', pct: 6.4 },
          { city: 'Dangriga',    pct: 5.9 }
        ],
        cardType: { credit: 53, debit: 40, prepaid: 7, total: 0.0560 },
        crossBorderTicket: { overall: 39.80, domestic: 35.40, inbound: 69.80, outbound: 60.40 },
        crossBorderSpend:  { overall: 0.0560, domestic: 0.0364, inbound: 0.0140, outbound: 0.0056 }
      }
    },

    /* ── 2023 ── */
    2023: {
      totalSpend: {
        monthly: {
          current:       [0.084, 0.081, 0.077, 0.072, 0.065, 0.068, 0.076, 0.078, 0.060, 0.062, 0.072, 0.084],
          previous:      [0.075, 0.073, 0.069, 0.065, 0.058, 0.062, 0.068, 0.070, 0.054, 0.056, 0.065, 0.075],
          twoYearsPrior: [0.065, 0.063, 0.060, 0.056, 0.050, 0.053, 0.059, 0.060, 0.047, 0.048, 0.056, 0.065]
        },
        industrySpend: [
          { name: 'Retail',                           value: 0.221 },
          { name: 'Food & Grocery',                   value: 0.159 },
          { name: 'Travel & Transportation',          value: 0.123 },
          { name: 'Restaurants & Dining',             value: 0.106 },
          { name: 'Automotive & Fuel',                value: 0.070 },
          { name: 'Healthcare & Medical',             value: 0.062 },
          { name: 'Entertainment & Leisure',          value: 0.044 },
          { name: 'Utilities & Telecommunications',   value: 0.035 },
          { name: 'Digital Goods & Subscriptions',   value: 0.026 },
          { name: 'Professional & Business Services', value: 0.018 },
          { name: 'Government & Education',           value: 0.008 },
          { name: 'Other',                            value: 0.008 }
        ],
        industryHeatmap: {
          years: [2023, 2022, 2021],
          rows: [
            { name: 'Retail',                           values: [10.4, 14.8, 12.4] },
            { name: 'Food & Grocery',                   values: [ 8.2, 11.8,  9.8] },
            { name: 'Travel & Transportation',          values: [14.8, 19.4, 16.2] },
            { name: 'Restaurants & Dining',             values: [12.6, 16.8, 14.2] },
            { name: 'Automotive & Fuel',                values: [12.8, 18.1, 11.4] },
            { name: 'Healthcare & Medical',             values: [ 7.1, 10.2,  8.6] },
            { name: 'Entertainment & Leisure',          values: [11.2, 15.4, 13.1] },
            { name: 'Utilities & Telecommunications',   values: [ 5.8,  9.4,  7.8] },
            { name: 'Digital Goods & Subscriptions',   values: [13.8, 18.6, 14.8] },
            { name: 'Professional & Business Services', values: [ 9.4, 13.2, 11.1] },
            { name: 'Government & Education',           values: [ 6.4,  9.8,  8.1] },
            { name: 'Other',                            values: [ 8.8, 13.2, 11.0] }
          ]
        },
        topCitiesSpend: [
          { city: 'Belize City', value: 0.458 },
          { city: 'San Ignacio', value: 0.158 },
          { city: 'Orange Walk', value: 0.123 },
          { city: 'Dangriga',    value: 0.088 },
          { city: 'Placencia',   value: 0.053 }
        ],
        topCitiesYoY: [
          { city: 'Placencia',   pct: 14.2 },
          { city: 'Belize City', pct: 12.8 },
          { city: 'San Ignacio', pct: 12.4 },
          { city: 'Orange Walk', pct: 11.8 },
          { city: 'Dangriga',    pct: 11.2 }
        ],
        cardType: { credit: 53, debit: 40, prepaid: 7, total: 0.88 },
        crossBorderTicket: { overall: 38.90, domestic: 34.60, inbound: 68.20, outbound: 58.90 },
        crossBorderSpend:  { overall: 0.88,  domestic: 0.572, inbound: 0.220, outbound: 0.088 }
      },
      totalTransactions: {
        monthly: {
          current:       [0.0051, 0.0049, 0.0047, 0.0044, 0.0039, 0.0041, 0.0046, 0.0047, 0.0036, 0.0038, 0.0044, 0.0051],
          previous:      [0.0046, 0.0045, 0.0043, 0.0040, 0.0036, 0.0038, 0.0042, 0.0043, 0.0033, 0.0035, 0.0040, 0.0046],
          twoYearsPrior: [0.0041, 0.0040, 0.0038, 0.0035, 0.0032, 0.0034, 0.0037, 0.0038, 0.0030, 0.0030, 0.0035, 0.0041]
        },
        industrySpend: [
          { name: 'Retail',                           value: 0.0144 },
          { name: 'Food & Grocery',                   value: 0.0107 },
          { name: 'Travel & Transportation',          value: 0.0043 },
          { name: 'Restaurants & Dining',             value: 0.0075 },
          { name: 'Automotive & Fuel',                value: 0.0053 },
          { name: 'Healthcare & Medical',             value: 0.0043 },
          { name: 'Entertainment & Leisure',          value: 0.0027 },
          { name: 'Utilities & Telecommunications',   value: 0.0021 },
          { name: 'Digital Goods & Subscriptions',   value: 0.0011 },
          { name: 'Professional & Business Services', value: 0.0005 },
          { name: 'Government & Education',           value: 0.0002 },
          { name: 'Other',                            value: 0.0002 }
        ],
        industryHeatmap: {
          years: [2023, 2022, 2021],
          rows: [
            { name: 'Retail',                           values: [10.4, 14.8, 12.4] },
            { name: 'Food & Grocery',                   values: [ 8.2, 11.8,  9.8] },
            { name: 'Travel & Transportation',          values: [14.8, 19.4, 16.2] },
            { name: 'Restaurants & Dining',             values: [12.6, 16.8, 14.2] },
            { name: 'Automotive & Fuel',                values: [12.8, 18.1, 11.4] },
            { name: 'Healthcare & Medical',             values: [ 7.1, 10.2,  8.6] },
            { name: 'Entertainment & Leisure',          values: [11.2, 15.4, 13.1] },
            { name: 'Utilities & Telecommunications',   values: [ 5.8,  9.4,  7.8] },
            { name: 'Digital Goods & Subscriptions',   values: [13.8, 18.6, 14.8] },
            { name: 'Professional & Business Services', values: [ 9.4, 13.2, 11.1] },
            { name: 'Government & Education',           values: [ 6.4,  9.8,  8.1] },
            { name: 'Other',                            values: [ 8.8, 13.2, 11.0] }
          ]
        },
        topCitiesSpend: [
          { city: 'Belize City', value: 0.0277 },
          { city: 'San Ignacio', value: 0.0096 },
          { city: 'Orange Walk', value: 0.0075 },
          { city: 'Dangriga',    value: 0.0053 },
          { city: 'Placencia',   value: 0.0032 }
        ],
        topCitiesYoY: [
          { city: 'Placencia',   pct: 14.2 },
          { city: 'Belize City', pct: 12.8 },
          { city: 'San Ignacio', pct: 12.4 },
          { city: 'Orange Walk', pct: 11.8 },
          { city: 'Dangriga',    pct: 11.2 }
        ],
        cardType: { credit: 53, debit: 40, prepaid: 7, total: 0.0533 },
        crossBorderTicket: { overall: 38.90, domestic: 34.60, inbound: 68.20, outbound: 58.90 },
        crossBorderSpend:  { overall: 0.0533, domestic: 0.0346, inbound: 0.0133, outbound: 0.0053 }
      }
    },

    /* ── 2022 ── */
    2022: {
      totalSpend: {
        monthly: {
          current:       [0.075, 0.073, 0.069, 0.065, 0.058, 0.062, 0.068, 0.070, 0.054, 0.056, 0.065, 0.075],
          previous:      [0.065, 0.063, 0.060, 0.056, 0.050, 0.053, 0.059, 0.060, 0.047, 0.048, 0.056, 0.065],
          twoYearsPrior: [0.054, 0.050, 0.040, 0.022, 0.024, 0.026, 0.038, 0.040, 0.030, 0.030, 0.032, 0.040]
        },
        industrySpend: [
          { name: 'Retail',                           value: 0.198 },
          { name: 'Food & Grocery',                   value: 0.142 },
          { name: 'Travel & Transportation',          value: 0.111 },
          { name: 'Restaurants & Dining',             value: 0.095 },
          { name: 'Automotive & Fuel',                value: 0.063 },
          { name: 'Healthcare & Medical',             value: 0.055 },
          { name: 'Entertainment & Leisure',          value: 0.040 },
          { name: 'Utilities & Telecommunications',   value: 0.032 },
          { name: 'Digital Goods & Subscriptions',   value: 0.024 },
          { name: 'Professional & Business Services', value: 0.016 },
          { name: 'Government & Education',           value: 0.007 },
          { name: 'Other',                            value: 0.007 }
        ],
        industryHeatmap: {
          years: [2022, 2021, 2020],
          rows: [
            { name: 'Retail',                           values: [14.8, 12.4, -14.8] },
            { name: 'Food & Grocery',                   values: [11.8,  9.8,  -8.6] },
            { name: 'Travel & Transportation',          values: [19.4, 16.2, -38.4] },
            { name: 'Restaurants & Dining',             values: [16.8, 14.2, -28.6] },
            { name: 'Automotive & Fuel',                values: [18.1, 11.4, -24.8] },
            { name: 'Healthcare & Medical',             values: [10.2,  8.6,  -6.4] },
            { name: 'Entertainment & Leisure',          values: [15.4, 13.1, -24.8] },
            { name: 'Utilities & Telecommunications',   values: [ 9.4,  7.8,   2.4] },
            { name: 'Digital Goods & Subscriptions',   values: [18.6, 14.8,  12.8] },
            { name: 'Professional & Business Services', values: [13.2, 11.1, -16.4] },
            { name: 'Government & Education',           values: [ 9.8,  8.1,   4.8] },
            { name: 'Other',                            values: [13.2, 11.0, -10.2] }
          ]
        },
        topCitiesSpend: [
          { city: 'Belize City', value: 0.411 },
          { city: 'San Ignacio', value: 0.142 },
          { city: 'Orange Walk', value: 0.111 },
          { city: 'Dangriga',    value: 0.079 },
          { city: 'Placencia',   value: 0.047 }
        ],
        topCitiesYoY: [
          { city: 'Placencia',   pct: 18.4 },
          { city: 'Belize City', pct: 16.2 },
          { city: 'San Ignacio', pct: 15.8 },
          { city: 'Orange Walk', pct: 15.2 },
          { city: 'Dangriga',    pct: 14.8 }
        ],
        cardType: { credit: 52, debit: 41, prepaid: 7, total: 0.79 },
        crossBorderTicket: { overall: 37.60, domestic: 33.40, inbound: 66.10, outbound: 57.20 },
        crossBorderSpend:  { overall: 0.79,  domestic: 0.514, inbound: 0.198, outbound: 0.079 }
      },
      totalTransactions: {
        monthly: {
          current:       [0.0046, 0.0045, 0.0043, 0.0040, 0.0036, 0.0038, 0.0042, 0.0043, 0.0033, 0.0035, 0.0040, 0.0046],
          previous:      [0.0041, 0.0040, 0.0038, 0.0035, 0.0032, 0.0034, 0.0037, 0.0038, 0.0030, 0.0030, 0.0035, 0.0041],
          twoYearsPrior: [0.0033, 0.0030, 0.0024, 0.0013, 0.0015, 0.0016, 0.0023, 0.0024, 0.0018, 0.0018, 0.0019, 0.0024]
        },
        industrySpend: [
          { name: 'Retail',                           value: 0.0132 },
          { name: 'Food & Grocery',                   value: 0.0098 },
          { name: 'Travel & Transportation',          value: 0.0039 },
          { name: 'Restaurants & Dining',             value: 0.0068 },
          { name: 'Automotive & Fuel',                value: 0.0049 },
          { name: 'Healthcare & Medical',             value: 0.0039 },
          { name: 'Entertainment & Leisure',          value: 0.0024 },
          { name: 'Utilities & Telecommunications',   value: 0.0020 },
          { name: 'Digital Goods & Subscriptions',   value: 0.0010 },
          { name: 'Professional & Business Services', value: 0.0005 },
          { name: 'Government & Education',           value: 0.0002 },
          { name: 'Other',                            value: 0.0002 }
        ],
        industryHeatmap: {
          years: [2022, 2021, 2020],
          rows: [
            { name: 'Retail',                           values: [14.8, 12.4, -14.8] },
            { name: 'Food & Grocery',                   values: [11.8,  9.8,  -8.6] },
            { name: 'Travel & Transportation',          values: [19.4, 16.2, -38.4] },
            { name: 'Restaurants & Dining',             values: [16.8, 14.2, -28.6] },
            { name: 'Automotive & Fuel',                values: [18.1, 11.4, -24.8] },
            { name: 'Healthcare & Medical',             values: [10.2,  8.6,  -6.4] },
            { name: 'Entertainment & Leisure',          values: [15.4, 13.1, -24.8] },
            { name: 'Utilities & Telecommunications',   values: [ 9.4,  7.8,   2.4] },
            { name: 'Digital Goods & Subscriptions',   values: [18.6, 14.8,  12.8] },
            { name: 'Professional & Business Services', values: [13.2, 11.1, -16.4] },
            { name: 'Government & Education',           values: [ 9.8,  8.1,   4.8] },
            { name: 'Other',                            values: [13.2, 11.0, -10.2] }
          ]
        },
        topCitiesSpend: [
          { city: 'Belize City', value: 0.0254 },
          { city: 'San Ignacio', value: 0.0088 },
          { city: 'Orange Walk', value: 0.0068 },
          { city: 'Dangriga',    value: 0.0049 },
          { city: 'Placencia',   value: 0.0029 }
        ],
        topCitiesYoY: [
          { city: 'Placencia',   pct: 18.4 },
          { city: 'Belize City', pct: 16.2 },
          { city: 'San Ignacio', pct: 15.8 },
          { city: 'Orange Walk', pct: 15.2 },
          { city: 'Dangriga',    pct: 14.8 }
        ],
        cardType: { credit: 52, debit: 41, prepaid: 7, total: 0.0488 },
        crossBorderTicket: { overall: 37.60, domestic: 33.40, inbound: 66.10, outbound: 57.20 },
        crossBorderSpend:  { overall: 0.0488, domestic: 0.0317, inbound: 0.0122, outbound: 0.0049 }
      }
    },

    /* ── 2021 ── */
    2021: {
      totalSpend: {
        monthly: {
          current:       [0.065, 0.063, 0.060, 0.056, 0.050, 0.053, 0.059, 0.060, 0.047, 0.048, 0.056, 0.065],
          previous:      [0.054, 0.050, 0.040, 0.022, 0.024, 0.026, 0.038, 0.040, 0.030, 0.030, 0.032, 0.040],
          twoYearsPrior: [0.057, 0.055, 0.052, 0.049, 0.044, 0.047, 0.052, 0.053, 0.041, 0.043, 0.049, 0.057]
        },
        industrySpend: [
          { name: 'Retail',                           value: 0.170 },
          { name: 'Food & Grocery',                   value: 0.122 },
          { name: 'Travel & Transportation',          value: 0.095 },
          { name: 'Restaurants & Dining',             value: 0.082 },
          { name: 'Automotive & Fuel',                value: 0.054 },
          { name: 'Healthcare & Medical',             value: 0.048 },
          { name: 'Entertainment & Leisure',          value: 0.034 },
          { name: 'Utilities & Telecommunications',   value: 0.027 },
          { name: 'Digital Goods & Subscriptions',   value: 0.020 },
          { name: 'Professional & Business Services', value: 0.014 },
          { name: 'Government & Education',           value: 0.006 },
          { name: 'Other',                            value: 0.006 }
        ],
        industryHeatmap: {
          years: [2021, 2020, 2019],
          rows: [
            { name: 'Retail',                           values: [12.4, -14.8,  4.4] },
            { name: 'Food & Grocery',                   values: [ 9.8,  -8.6,  3.8] },
            { name: 'Travel & Transportation',          values: [16.2, -38.4,  5.8] },
            { name: 'Restaurants & Dining',             values: [14.2, -28.6,  5.2] },
            { name: 'Automotive & Fuel',                values: [11.4, -24.8,  3.2] },
            { name: 'Healthcare & Medical',             values: [ 8.6,  -6.4,  3.4] },
            { name: 'Entertainment & Leisure',          values: [13.1, -24.8,  4.8] },
            { name: 'Utilities & Telecommunications',   values: [ 7.8,   2.4,  2.8] },
            { name: 'Digital Goods & Subscriptions',   values: [14.8,  12.8,  8.4] },
            { name: 'Professional & Business Services', values: [11.1, -16.4,  3.8] },
            { name: 'Government & Education',           values: [ 8.1,   4.8,  3.4] },
            { name: 'Other',                            values: [11.0, -10.2,  3.8] }
          ]
        },
        topCitiesSpend: [
          { city: 'Belize City', value: 0.354 },
          { city: 'San Ignacio', value: 0.122 },
          { city: 'Orange Walk', value: 0.095 },
          { city: 'Dangriga',    value: 0.068 },
          { city: 'Placencia',   value: 0.041 }
        ],
        topCitiesYoY: [
          { city: 'Placencia',   pct: 16.4 },
          { city: 'Belize City', pct: 13.2 },
          { city: 'San Ignacio', pct: 12.8 },
          { city: 'Orange Walk', pct: 12.4 },
          { city: 'Dangriga',    pct: 11.8 }
        ],
        cardType: { credit: 51, debit: 42, prepaid: 7, total: 0.68 },
        crossBorderTicket: { overall: 36.20, domestic: 32.10, inbound: 63.80, outbound: 55.40 },
        crossBorderSpend:  { overall: 0.68,  domestic: 0.442, inbound: 0.170, outbound: 0.068 }
      },
      totalTransactions: {
        monthly: {
          current:       [0.0041, 0.0040, 0.0038, 0.0035, 0.0032, 0.0034, 0.0037, 0.0038, 0.0030, 0.0030, 0.0035, 0.0041],
          previous:      [0.0033, 0.0030, 0.0024, 0.0013, 0.0015, 0.0016, 0.0023, 0.0024, 0.0018, 0.0018, 0.0019, 0.0024],
          twoYearsPrior: [0.0036, 0.0034, 0.0033, 0.0031, 0.0028, 0.0029, 0.0033, 0.0033, 0.0026, 0.0027, 0.0031, 0.0036]
        },
        industrySpend: [
          { name: 'Retail',                           value: 0.0116 },
          { name: 'Food & Grocery',                   value: 0.0086 },
          { name: 'Travel & Transportation',          value: 0.0034 },
          { name: 'Restaurants & Dining',             value: 0.0060 },
          { name: 'Automotive & Fuel',                value: 0.0043 },
          { name: 'Healthcare & Medical',             value: 0.0034 },
          { name: 'Entertainment & Leisure',          value: 0.0022 },
          { name: 'Utilities & Telecommunications',   value: 0.0017 },
          { name: 'Digital Goods & Subscriptions',   value: 0.0009 },
          { name: 'Professional & Business Services', value: 0.0004 },
          { name: 'Government & Education',           value: 0.0002 },
          { name: 'Other',                            value: 0.0002 }
        ],
        industryHeatmap: {
          years: [2021, 2020, 2019],
          rows: [
            { name: 'Retail',                           values: [12.4, -14.8,  4.4] },
            { name: 'Food & Grocery',                   values: [ 9.8,  -8.6,  3.8] },
            { name: 'Travel & Transportation',          values: [16.2, -38.4,  5.8] },
            { name: 'Restaurants & Dining',             values: [14.2, -28.6,  5.2] },
            { name: 'Automotive & Fuel',                values: [11.4, -24.8,  3.2] },
            { name: 'Healthcare & Medical',             values: [ 8.6,  -6.4,  3.4] },
            { name: 'Entertainment & Leisure',          values: [13.1, -24.8,  4.8] },
            { name: 'Utilities & Telecommunications',   values: [ 7.8,   2.4,  2.8] },
            { name: 'Digital Goods & Subscriptions',   values: [14.8,  12.8,  8.4] },
            { name: 'Professional & Business Services', values: [11.1, -16.4,  3.8] },
            { name: 'Government & Education',           values: [ 8.1,   4.8,  3.4] },
            { name: 'Other',                            values: [11.0, -10.2,  3.8] }
          ]
        },
        topCitiesSpend: [
          { city: 'Belize City', value: 0.0224 },
          { city: 'San Ignacio', value: 0.0077 },
          { city: 'Orange Walk', value: 0.0060 },
          { city: 'Dangriga',    value: 0.0043 },
          { city: 'Placencia',   value: 0.0026 }
        ],
        topCitiesYoY: [
          { city: 'Placencia',   pct: 16.4 },
          { city: 'Belize City', pct: 13.2 },
          { city: 'San Ignacio', pct: 12.8 },
          { city: 'Orange Walk', pct: 12.4 },
          { city: 'Dangriga',    pct: 11.8 }
        ],
        cardType: { credit: 51, debit: 42, prepaid: 7, total: 0.0430 },
        crossBorderTicket: { overall: 36.20, domestic: 32.10, inbound: 63.80, outbound: 55.40 },
        crossBorderSpend:  { overall: 0.0430, domestic: 0.0280, inbound: 0.0108, outbound: 0.0043 }
      }
    }

  } /* end belize */,

  /* ────────────────────────────────────────────────────────────────
     BARBADOS   — annual totals: $1.48B (2021) → $2.05B (2025)
     Tourism-dependent; peak Jan–Mar and Jul–Aug; COVID visible 2020
  ──────────────────────────────────────────────────────────────── */
  barbados: {

    /* ── 2026 ── */
    2026: {
      totalSpend: {
        monthly: {
          current:       [0.2014, 0.1908, 0.1908, 0.1590, 0.1484, 0.1590, null, null, null, null, null, null],
          previous:      [0.1948, 0.1845, 0.1845, 0.1538, 0.1435, 0.1538, 0.1845, 0.1948, 0.1333, 0.1435, 0.1743, 0.2050],
          twoYearsPrior: [0.1862, 0.1764, 0.1764, 0.1470, 0.1372, 0.1470, 0.1764, 0.1862, 0.1274, 0.1372, 0.1666, 0.1960]
        },
        industrySpend: [
          { name: 'Travel & Transportation',          value: 0.2098 },
          { name: 'Retail',                           value: 0.1574 },
          { name: 'Restaurants & Dining',             value: 0.1469 },
          { name: 'Food & Grocery',                   value: 0.1049 },
          { name: 'Entertainment & Leisure',          value: 0.0839 },
          { name: 'Healthcare & Medical',             value: 0.0629 },
          { name: 'Utilities & Telecommunications',   value: 0.0525 },
          { name: 'Professional & Business Services', value: 0.0525 },
          { name: 'Digital Goods & Subscriptions',   value: 0.0504 },
          { name: 'Automotive & Fuel',                value: 0.0420 },
          { name: 'Other',                            value: 0.0545 },
          { name: 'Government & Education',           value: 0.0315 }
        ],
        industryHeatmap: {
          years: [2026, 2025, 2024],
          rows: [
            { name: 'Travel & Transportation',          values: [ 4.8,  5.4,  7.2] },
            { name: 'Retail',                           values: [ 3.2,  3.8,  5.8] },
            { name: 'Restaurants & Dining',             values: [ 3.6,  4.4,  6.2] },
            { name: 'Food & Grocery',                   values: [ 3.0,  3.6,  5.4] },
            { name: 'Entertainment & Leisure',          values: [ 4.2,  4.8,  6.4] },
            { name: 'Healthcare & Medical',             values: [ 2.8,  3.4,  5.0] },
            { name: 'Utilities & Telecommunications',   values: [ 2.4,  3.2,  4.6] },
            { name: 'Professional & Business Services', values: [ 2.8,  3.6,  4.8] },
            { name: 'Digital Goods & Subscriptions',   values: [ 5.2,  5.8,  7.4] },
            { name: 'Automotive & Fuel',                values: [ 2.2,  2.8,  3.8] },
            { name: 'Other',                            values: [ 3.1,  3.8,  5.2] },
            { name: 'Government & Education',           values: [ 2.0,  2.4,  3.4] }
          ]
        },
        topCitiesSpend: [
          { city: 'Bridgetown',   value: 0.5455 },
          { city: 'Holetown',     value: 0.2098 },
          { city: 'Oistins',      value: 0.1259 },
          { city: 'Speightstown', value: 0.1049 },
          { city: 'Bathsheba',    value: 0.0629 }
        ],
        topCitiesYoY: [
          { city: 'Holetown',     pct: 4.5 },
          { city: 'Oistins',      pct: 3.8 },
          { city: 'Bridgetown',   pct: 3.2 },
          { city: 'Speightstown', pct: 2.8 },
          { city: 'Bathsheba',    pct: 2.1 }
        ],
        cardType: { credit: 55, debit: 37, prepaid: 8, total: 1.049 },
        crossBorderTicket: { overall: 62.40, domestic: 40.50, inbound: 84.80, outbound: 91.50 },
        crossBorderSpend:  { overall: 1.049, domestic: 0.608, inbound: 0.315, outbound: 0.126 }
      },
      totalTransactions: {
        monthly: {
          current:       [0.01060, 0.01005, 0.01005, 0.00837, 0.00781, 0.00837, null, null, null, null, null, null],
          previous:      [0.01026, 0.00972, 0.00972, 0.00810, 0.00756, 0.00810, 0.00972, 0.01026, 0.00702, 0.00756, 0.00918, 0.01080],
          twoYearsPrior: [0.009785, 0.009270, 0.009270, 0.007725, 0.007210, 0.007725, 0.009270, 0.009785, 0.006695, 0.007210, 0.008755, 0.010300]
        },
        industrySpend: [
          { name: 'Retail',                           value: 0.0110 },
          { name: 'Restaurants & Dining',             value: 0.0088 },
          { name: 'Food & Grocery',                   value: 0.0077 },
          { name: 'Travel & Transportation',          value: 0.0055 },
          { name: 'Entertainment & Leisure',          value: 0.0044 },
          { name: 'Healthcare & Medical',             value: 0.0039 },
          { name: 'Digital Goods & Subscriptions',   value: 0.0033 },
          { name: 'Utilities & Telecommunications',   value: 0.0028 },
          { name: 'Professional & Business Services', value: 0.0028 },
          { name: 'Government & Education',           value: 0.0022 },
          { name: 'Automotive & Fuel',                value: 0.0017 },
          { name: 'Other',                            value: 0.0011 }
        ],
        industryHeatmap: {
          years: [2026, 2025, 2024],
          rows: [
            { name: 'Retail',                           values: [ 3.4,  4.2,  6.1] },
            { name: 'Restaurants & Dining',             values: [ 3.6,  4.4,  6.2] },
            { name: 'Food & Grocery',                   values: [ 3.0,  3.6,  5.4] },
            { name: 'Travel & Transportation',          values: [ 4.8,  5.4,  7.2] },
            { name: 'Entertainment & Leisure',          values: [ 4.2,  4.8,  6.4] },
            { name: 'Healthcare & Medical',             values: [ 2.8,  3.4,  5.0] },
            { name: 'Digital Goods & Subscriptions',   values: [ 5.2,  5.8,  7.4] },
            { name: 'Utilities & Telecommunications',   values: [ 2.4,  3.2,  4.6] },
            { name: 'Professional & Business Services', values: [ 2.8,  3.6,  4.8] },
            { name: 'Government & Education',           values: [ 2.0,  2.4,  3.4] },
            { name: 'Automotive & Fuel',                values: [ 2.2,  2.8,  3.8] },
            { name: 'Other',                            values: [ 3.1,  3.8,  5.2] }
          ]
        },
        topCitiesSpend: [
          { city: 'Bridgetown',   value: 0.02750 },
          { city: 'Oistins',      value: 0.00990 },
          { city: 'Holetown',     value: 0.00825 },
          { city: 'Speightstown', value: 0.00660 },
          { city: 'Bathsheba',    value: 0.00275 }
        ],
        topCitiesYoY: [
          { city: 'Holetown',     pct: 4.5 },
          { city: 'Oistins',      pct: 3.8 },
          { city: 'Bridgetown',   pct: 3.2 },
          { city: 'Speightstown', pct: 2.8 },
          { city: 'Bathsheba',    pct: 2.1 }
        ],
        cardType: { credit: 53, debit: 40, prepaid: 7, total: 0.055 },
        crossBorderTicket: { overall: 62.40, domestic: 40.50, inbound: 84.80, outbound: 91.50 },
        crossBorderSpend:  { overall: 0.055, domestic: 0.03575, inbound: 0.01210, outbound: 0.00715 }
      }
    },

    /* ── 2025 ── */
    2025: {
      totalSpend: {
        monthly: {
          current:       [0.1948, 0.1845, 0.1845, 0.1538, 0.1435, 0.1538, 0.1845, 0.1948, 0.1333, 0.1435, 0.1743, 0.2050],
          previous:      [0.1862, 0.1764, 0.1764, 0.1470, 0.1372, 0.1470, 0.1764, 0.1862, 0.1274, 0.1372, 0.1666, 0.1960],
          twoYearsPrior: [0.1758, 0.1665, 0.1665, 0.1388, 0.1295, 0.1388, 0.1665, 0.1758, 0.1203, 0.1295, 0.1573, 0.1850]
        },
        industrySpend: [
          { name: 'Travel & Transportation',          value: 0.4100 },
          { name: 'Retail',                           value: 0.3075 },
          { name: 'Restaurants & Dining',             value: 0.2870 },
          { name: 'Food & Grocery',                   value: 0.2050 },
          { name: 'Entertainment & Leisure',          value: 0.1640 },
          { name: 'Healthcare & Medical',             value: 0.1230 },
          { name: 'Utilities & Telecommunications',   value: 0.1025 },
          { name: 'Professional & Business Services', value: 0.1025 },
          { name: 'Digital Goods & Subscriptions',   value: 0.0984 },
          { name: 'Automotive & Fuel',                value: 0.0820 },
          { name: 'Other',                            value: 0.1066 },
          { name: 'Government & Education',           value: 0.0615 }
        ],
        industryHeatmap: {
          years: [2025, 2024, 2023],
          rows: [
            { name: 'Travel & Transportation',          values: [ 5.4,  7.2,  9.0] },
            { name: 'Retail',                           values: [ 3.8,  5.8,  7.2] },
            { name: 'Restaurants & Dining',             values: [ 4.4,  6.2,  7.8] },
            { name: 'Food & Grocery',                   values: [ 3.6,  5.4,  7.0] },
            { name: 'Entertainment & Leisure',          values: [ 4.8,  6.4,  8.4] },
            { name: 'Healthcare & Medical',             values: [ 3.4,  5.0,  6.4] },
            { name: 'Utilities & Telecommunications',   values: [ 3.2,  4.6,  5.8] },
            { name: 'Professional & Business Services', values: [ 3.6,  4.8,  6.2] },
            { name: 'Digital Goods & Subscriptions',   values: [ 5.8,  7.4,  9.2] },
            { name: 'Automotive & Fuel',                values: [ 2.8,  3.8,  5.2] },
            { name: 'Other',                            values: [ 3.8,  5.2,  6.8] },
            { name: 'Government & Education',           values: [ 2.4,  3.4,  4.8] }
          ]
        },
        topCitiesSpend: [
          { city: 'Bridgetown',   value: 1.066 },
          { city: 'Holetown',     value: 0.410 },
          { city: 'Oistins',      value: 0.246 },
          { city: 'Speightstown', value: 0.205 },
          { city: 'Bathsheba',    value: 0.123 }
        ],
        topCitiesYoY: [
          { city: 'Holetown',     pct: 5.8 },
          { city: 'Bridgetown',   pct: 4.8 },
          { city: 'Oistins',      pct: 4.5 },
          { city: 'Speightstown', pct: 4.2 },
          { city: 'Bathsheba',    pct: 3.5 }
        ],
        cardType: { credit: 55, debit: 37, prepaid: 8, total: 2.050 },
        crossBorderTicket: { overall: 61.20, domestic: 39.80, inbound: 82.40, outbound: 89.50 },
        crossBorderSpend:  { overall: 2.050, domestic: 1.189, inbound: 0.615, outbound: 0.246 }
      },
      totalTransactions: {
        monthly: {
          current:       [0.01026, 0.00972, 0.00972, 0.00810, 0.00756, 0.00810, 0.00972, 0.01026, 0.00702, 0.00756, 0.00918, 0.01080],
          previous:      [0.009785, 0.009270, 0.009270, 0.007725, 0.007210, 0.007725, 0.009270, 0.009785, 0.006695, 0.007210, 0.008755, 0.010300],
          twoYearsPrior: [0.009215, 0.008730, 0.008730, 0.007275, 0.006790, 0.007275, 0.008730, 0.009215, 0.006305, 0.006790, 0.008245, 0.009700]
        },
        industrySpend: [
          { name: 'Retail',                           value: 0.0216 },
          { name: 'Restaurants & Dining',             value: 0.0173 },
          { name: 'Food & Grocery',                   value: 0.0151 },
          { name: 'Travel & Transportation',          value: 0.0108 },
          { name: 'Entertainment & Leisure',          value: 0.0086 },
          { name: 'Healthcare & Medical',             value: 0.0076 },
          { name: 'Digital Goods & Subscriptions',   value: 0.0065 },
          { name: 'Utilities & Telecommunications',   value: 0.0054 },
          { name: 'Professional & Business Services', value: 0.0054 },
          { name: 'Government & Education',           value: 0.0043 },
          { name: 'Automotive & Fuel',                value: 0.0032 },
          { name: 'Other',                            value: 0.0022 }
        ],
        industryHeatmap: {
          years: [2025, 2024, 2023],
          rows: [
            { name: 'Retail',                           values: [ 4.2,  6.1,  7.2] },
            { name: 'Restaurants & Dining',             values: [ 4.4,  6.2,  7.8] },
            { name: 'Food & Grocery',                   values: [ 3.6,  5.4,  7.0] },
            { name: 'Travel & Transportation',          values: [ 5.4,  7.2,  9.0] },
            { name: 'Entertainment & Leisure',          values: [ 4.8,  6.4,  8.4] },
            { name: 'Healthcare & Medical',             values: [ 3.4,  5.0,  6.4] },
            { name: 'Digital Goods & Subscriptions',   values: [ 5.8,  7.4,  9.2] },
            { name: 'Utilities & Telecommunications',   values: [ 3.2,  4.6,  5.8] },
            { name: 'Professional & Business Services', values: [ 3.6,  4.8,  6.2] },
            { name: 'Government & Education',           values: [ 2.4,  3.4,  4.8] },
            { name: 'Automotive & Fuel',                values: [ 2.8,  3.8,  5.2] },
            { name: 'Other',                            values: [ 3.8,  5.2,  6.8] }
          ]
        },
        topCitiesSpend: [
          { city: 'Bridgetown',   value: 0.05400 },
          { city: 'Oistins',      value: 0.01944 },
          { city: 'Holetown',     value: 0.01620 },
          { city: 'Speightstown', value: 0.01296 },
          { city: 'Bathsheba',    value: 0.00540 }
        ],
        topCitiesYoY: [
          { city: 'Holetown',     pct: 5.8 },
          { city: 'Bridgetown',   pct: 4.8 },
          { city: 'Oistins',      pct: 4.5 },
          { city: 'Speightstown', pct: 4.2 },
          { city: 'Bathsheba',    pct: 3.5 }
        ],
        cardType: { credit: 53, debit: 40, prepaid: 7, total: 0.108 },
        crossBorderTicket: { overall: 61.20, domestic: 39.80, inbound: 82.40, outbound: 89.50 },
        crossBorderSpend:  { overall: 0.108, domestic: 0.07020, inbound: 0.02376, outbound: 0.01404 }
      }
    },

    /* ── 2024 ── */
    2024: {
      totalSpend: {
        monthly: {
          current:       [0.1862, 0.1764, 0.1764, 0.1470, 0.1372, 0.1470, 0.1764, 0.1862, 0.1274, 0.1372, 0.1666, 0.1960],
          previous:      [0.1758, 0.1665, 0.1665, 0.1388, 0.1295, 0.1388, 0.1665, 0.1758, 0.1203, 0.1295, 0.1573, 0.1850],
          twoYearsPrior: [0.1634, 0.1548, 0.1548, 0.1290, 0.1204, 0.1290, 0.1548, 0.1634, 0.1118, 0.1204, 0.1462, 0.1720]
        },
        industrySpend: [
          { name: 'Travel & Transportation',          value: 0.3920 },
          { name: 'Retail',                           value: 0.2940 },
          { name: 'Restaurants & Dining',             value: 0.2744 },
          { name: 'Food & Grocery',                   value: 0.1960 },
          { name: 'Entertainment & Leisure',          value: 0.1568 },
          { name: 'Healthcare & Medical',             value: 0.1176 },
          { name: 'Utilities & Telecommunications',   value: 0.0980 },
          { name: 'Professional & Business Services', value: 0.0980 },
          { name: 'Digital Goods & Subscriptions',   value: 0.0941 },
          { name: 'Automotive & Fuel',                value: 0.0784 },
          { name: 'Other',                            value: 0.1019 },
          { name: 'Government & Education',           value: 0.0588 }
        ],
        industryHeatmap: {
          years: [2024, 2023, 2022],
          rows: [
            { name: 'Travel & Transportation',          values: [ 7.2,  9.0, 18.5] },
            { name: 'Retail',                           values: [ 5.8,  7.2, 15.8] },
            { name: 'Restaurants & Dining',             values: [ 6.2,  7.8, 17.2] },
            { name: 'Food & Grocery',                   values: [ 5.4,  7.0, 14.6] },
            { name: 'Entertainment & Leisure',          values: [ 6.4,  8.4, 16.8] },
            { name: 'Healthcare & Medical',             values: [ 5.0,  6.4, 13.4] },
            { name: 'Utilities & Telecommunications',   values: [ 4.6,  5.8, 12.8] },
            { name: 'Professional & Business Services', values: [ 4.8,  6.2, 13.2] },
            { name: 'Digital Goods & Subscriptions',   values: [ 7.4,  9.2, 19.4] },
            { name: 'Automotive & Fuel',                values: [ 3.8,  5.2, 11.8] },
            { name: 'Other',                            values: [ 5.2,  6.8, 14.8] },
            { name: 'Government & Education',           values: [ 3.4,  4.8, 10.2] }
          ]
        },
        topCitiesSpend: [
          { city: 'Bridgetown',   value: 1.019 },
          { city: 'Holetown',     value: 0.392 },
          { city: 'Oistins',      value: 0.235 },
          { city: 'Speightstown', value: 0.196 },
          { city: 'Bathsheba',    value: 0.118 }
        ],
        topCitiesYoY: [
          { city: 'Holetown',     pct: 7.2 },
          { city: 'Bridgetown',   pct: 6.1 },
          { city: 'Oistins',      pct: 5.8 },
          { city: 'Speightstown', pct: 5.5 },
          { city: 'Bathsheba',    pct: 4.9 }
        ],
        cardType: { credit: 55, debit: 37, prepaid: 8, total: 1.960 },
        crossBorderTicket: { overall: 59.80, domestic: 38.90, inbound: 80.10, outbound: 87.20 },
        crossBorderSpend:  { overall: 1.960, domestic: 1.137, inbound: 0.588, outbound: 0.235 }
      },
      totalTransactions: {
        monthly: {
          current:       [0.009785, 0.009270, 0.009270, 0.007725, 0.007210, 0.007725, 0.009270, 0.009785, 0.006695, 0.007210, 0.008755, 0.010300],
          previous:      [0.009215, 0.008730, 0.008730, 0.007275, 0.006790, 0.007275, 0.008730, 0.009215, 0.006305, 0.006790, 0.008245, 0.009700],
          twoYearsPrior: [0.00855, 0.00810, 0.00810, 0.00675, 0.00630, 0.00675, 0.00810, 0.00855, 0.00585, 0.00630, 0.00765, 0.00900]
        },
        industrySpend: [
          { name: 'Retail',                           value: 0.0206 },
          { name: 'Restaurants & Dining',             value: 0.0165 },
          { name: 'Food & Grocery',                   value: 0.0144 },
          { name: 'Travel & Transportation',          value: 0.0103 },
          { name: 'Entertainment & Leisure',          value: 0.0082 },
          { name: 'Healthcare & Medical',             value: 0.0072 },
          { name: 'Digital Goods & Subscriptions',   value: 0.0062 },
          { name: 'Utilities & Telecommunications',   value: 0.0052 },
          { name: 'Professional & Business Services', value: 0.0052 },
          { name: 'Government & Education',           value: 0.0041 },
          { name: 'Automotive & Fuel',                value: 0.0031 },
          { name: 'Other',                            value: 0.0021 }
        ],
        industryHeatmap: {
          years: [2024, 2023, 2022],
          rows: [
            { name: 'Retail',                           values: [ 6.1,  7.2, 15.8] },
            { name: 'Restaurants & Dining',             values: [ 6.2,  7.8, 17.2] },
            { name: 'Food & Grocery',                   values: [ 5.4,  7.0, 14.6] },
            { name: 'Travel & Transportation',          values: [ 7.2,  9.0, 18.5] },
            { name: 'Entertainment & Leisure',          values: [ 6.4,  8.4, 16.8] },
            { name: 'Healthcare & Medical',             values: [ 5.0,  6.4, 13.4] },
            { name: 'Digital Goods & Subscriptions',   values: [ 7.4,  9.2, 19.4] },
            { name: 'Utilities & Telecommunications',   values: [ 4.6,  5.8, 12.8] },
            { name: 'Professional & Business Services', values: [ 4.8,  6.2, 13.2] },
            { name: 'Government & Education',           values: [ 3.4,  4.8, 10.2] },
            { name: 'Automotive & Fuel',                values: [ 3.8,  5.2, 11.8] },
            { name: 'Other',                            values: [ 5.2,  6.8, 14.8] }
          ]
        },
        topCitiesSpend: [
          { city: 'Bridgetown',   value: 0.05150 },
          { city: 'Oistins',      value: 0.01854 },
          { city: 'Holetown',     value: 0.01545 },
          { city: 'Speightstown', value: 0.01236 },
          { city: 'Bathsheba',    value: 0.00515 }
        ],
        topCitiesYoY: [
          { city: 'Holetown',     pct: 7.2 },
          { city: 'Bridgetown',   pct: 6.1 },
          { city: 'Oistins',      pct: 5.8 },
          { city: 'Speightstown', pct: 5.5 },
          { city: 'Bathsheba',    pct: 4.9 }
        ],
        cardType: { credit: 53, debit: 40, prepaid: 7, total: 0.103 },
        crossBorderTicket: { overall: 59.80, domestic: 38.90, inbound: 80.10, outbound: 87.20 },
        crossBorderSpend:  { overall: 0.103, domestic: 0.06695, inbound: 0.02266, outbound: 0.01339 }
      }
    },

    /* ── 2023 ── */
    2023: {
      totalSpend: {
        monthly: {
          current:       [0.1758, 0.1665, 0.1665, 0.1388, 0.1295, 0.1388, 0.1665, 0.1758, 0.1203, 0.1295, 0.1573, 0.1850],
          previous:      [0.1634, 0.1548, 0.1548, 0.1290, 0.1204, 0.1290, 0.1548, 0.1634, 0.1118, 0.1204, 0.1462, 0.1720],
          twoYearsPrior: [0.1406, 0.1332, 0.1332, 0.1110, 0.1036, 0.1110, 0.1332, 0.1406, 0.0962, 0.1036, 0.1258, 0.1480]
        },
        industrySpend: [
          { name: 'Travel & Transportation',          value: 0.3700 },
          { name: 'Retail',                           value: 0.2775 },
          { name: 'Restaurants & Dining',             value: 0.2590 },
          { name: 'Food & Grocery',                   value: 0.1850 },
          { name: 'Entertainment & Leisure',          value: 0.1480 },
          { name: 'Healthcare & Medical',             value: 0.1110 },
          { name: 'Utilities & Telecommunications',   value: 0.0925 },
          { name: 'Professional & Business Services', value: 0.0925 },
          { name: 'Digital Goods & Subscriptions',   value: 0.0888 },
          { name: 'Automotive & Fuel',                value: 0.0740 },
          { name: 'Other',                            value: 0.0962 },
          { name: 'Government & Education',           value: 0.0555 }
        ],
        industryHeatmap: {
          years: [2023, 2022, 2021],
          rows: [
            { name: 'Travel & Transportation',          values: [ 9.0, 18.5, 14.8] },
            { name: 'Retail',                           values: [ 7.2, 15.8, 13.4] },
            { name: 'Restaurants & Dining',             values: [ 7.8, 17.2, 14.2] },
            { name: 'Food & Grocery',                   values: [ 7.0, 14.6, 12.8] },
            { name: 'Entertainment & Leisure',          values: [ 8.4, 16.8, 13.8] },
            { name: 'Healthcare & Medical',             values: [ 6.4, 13.4, 12.2] },
            { name: 'Utilities & Telecommunications',   values: [ 5.8, 12.8, 11.6] },
            { name: 'Professional & Business Services', values: [ 6.2, 13.2, 12.0] },
            { name: 'Digital Goods & Subscriptions',   values: [ 9.2, 19.4, 15.4] },
            { name: 'Automotive & Fuel',                values: [ 5.2, 11.8, 10.4] },
            { name: 'Other',                            values: [ 6.8, 14.8, 12.8] },
            { name: 'Government & Education',           values: [ 4.8, 10.2,  9.2] }
          ]
        },
        topCitiesSpend: [
          { city: 'Bridgetown',   value: 0.962 },
          { city: 'Holetown',     value: 0.370 },
          { city: 'Oistins',      value: 0.222 },
          { city: 'Speightstown', value: 0.185 },
          { city: 'Bathsheba',    value: 0.111 }
        ],
        topCitiesYoY: [
          { city: 'Holetown',     pct: 9.1 },
          { city: 'Bridgetown',   pct: 7.8 },
          { city: 'Oistins',      pct: 7.5 },
          { city: 'Speightstown', pct: 7.0 },
          { city: 'Bathsheba',    pct: 6.2 }
        ],
        cardType: { credit: 55, debit: 37, prepaid: 8, total: 1.850 },
        crossBorderTicket: { overall: 57.60, domestic: 37.50, inbound: 77.50, outbound: 85.00 },
        crossBorderSpend:  { overall: 1.850, domestic: 1.073, inbound: 0.555, outbound: 0.222 }
      },
      totalTransactions: {
        monthly: {
          current:       [0.009215, 0.008730, 0.008730, 0.007275, 0.006790, 0.007275, 0.008730, 0.009215, 0.006305, 0.006790, 0.008245, 0.009700],
          previous:      [0.00855, 0.00810, 0.00810, 0.00675, 0.00630, 0.00675, 0.00810, 0.00855, 0.00585, 0.00630, 0.00765, 0.00900],
          twoYearsPrior: [0.007315, 0.006930, 0.006930, 0.005775, 0.005390, 0.005775, 0.006930, 0.007315, 0.005005, 0.005390, 0.006545, 0.007700]
        },
        industrySpend: [
          { name: 'Retail',                           value: 0.0194 },
          { name: 'Restaurants & Dining',             value: 0.0155 },
          { name: 'Food & Grocery',                   value: 0.0136 },
          { name: 'Travel & Transportation',          value: 0.0097 },
          { name: 'Entertainment & Leisure',          value: 0.0078 },
          { name: 'Healthcare & Medical',             value: 0.0068 },
          { name: 'Digital Goods & Subscriptions',   value: 0.0058 },
          { name: 'Utilities & Telecommunications',   value: 0.0049 },
          { name: 'Professional & Business Services', value: 0.0049 },
          { name: 'Government & Education',           value: 0.0039 },
          { name: 'Automotive & Fuel',                value: 0.0029 },
          { name: 'Other',                            value: 0.0019 }
        ],
        industryHeatmap: {
          years: [2023, 2022, 2021],
          rows: [
            { name: 'Retail',                           values: [ 7.2, 15.8, 13.4] },
            { name: 'Restaurants & Dining',             values: [ 7.8, 17.2, 14.2] },
            { name: 'Food & Grocery',                   values: [ 7.0, 14.6, 12.8] },
            { name: 'Travel & Transportation',          values: [ 9.0, 18.5, 14.8] },
            { name: 'Entertainment & Leisure',          values: [ 8.4, 16.8, 13.8] },
            { name: 'Healthcare & Medical',             values: [ 6.4, 13.4, 12.2] },
            { name: 'Digital Goods & Subscriptions',   values: [ 9.2, 19.4, 15.4] },
            { name: 'Utilities & Telecommunications',   values: [ 5.8, 12.8, 11.6] },
            { name: 'Professional & Business Services', values: [ 6.2, 13.2, 12.0] },
            { name: 'Government & Education',           values: [ 4.8, 10.2,  9.2] },
            { name: 'Automotive & Fuel',                values: [ 5.2, 11.8, 10.4] },
            { name: 'Other',                            values: [ 6.8, 14.8, 12.8] }
          ]
        },
        topCitiesSpend: [
          { city: 'Bridgetown',   value: 0.04850 },
          { city: 'Oistins',      value: 0.01746 },
          { city: 'Holetown',     value: 0.01455 },
          { city: 'Speightstown', value: 0.01164 },
          { city: 'Bathsheba',    value: 0.00485 }
        ],
        topCitiesYoY: [
          { city: 'Holetown',     pct: 9.1 },
          { city: 'Bridgetown',   pct: 7.8 },
          { city: 'Oistins',      pct: 7.5 },
          { city: 'Speightstown', pct: 7.0 },
          { city: 'Bathsheba',    pct: 6.2 }
        ],
        cardType: { credit: 53, debit: 40, prepaid: 7, total: 0.097 },
        crossBorderTicket: { overall: 57.60, domestic: 37.50, inbound: 77.50, outbound: 85.00 },
        crossBorderSpend:  { overall: 0.097, domestic: 0.06305, inbound: 0.02134, outbound: 0.01261 }
      }
    },

    /* ── 2022 ── */
    2022: {
      totalSpend: {
        monthly: {
          current:       [0.1634, 0.1548, 0.1548, 0.1290, 0.1204, 0.1290, 0.1548, 0.1634, 0.1118, 0.1204, 0.1462, 0.1720],
          previous:      [0.1406, 0.1332, 0.1332, 0.1110, 0.1036, 0.1110, 0.1332, 0.1406, 0.0962, 0.1036, 0.1258, 0.1480],
          twoYearsPrior: [0.1300, 0.1235, 0.1105, 0.0845, 0.0780, 0.0845, 0.1040, 0.1105, 0.1040, 0.1040, 0.1300, 0.1365]
        },
        industrySpend: [
          { name: 'Travel & Transportation',          value: 0.3440 },
          { name: 'Retail',                           value: 0.2580 },
          { name: 'Restaurants & Dining',             value: 0.2408 },
          { name: 'Food & Grocery',                   value: 0.1720 },
          { name: 'Entertainment & Leisure',          value: 0.1376 },
          { name: 'Healthcare & Medical',             value: 0.1032 },
          { name: 'Utilities & Telecommunications',   value: 0.0860 },
          { name: 'Professional & Business Services', value: 0.0860 },
          { name: 'Digital Goods & Subscriptions',   value: 0.0826 },
          { name: 'Automotive & Fuel',                value: 0.0688 },
          { name: 'Other',                            value: 0.0894 },
          { name: 'Government & Education',           value: 0.0516 }
        ],
        industryHeatmap: {
          years: [2022, 2021, 2020],
          rows: [
            { name: 'Travel & Transportation',          values: [18.5, 14.8, -41.2] },
            { name: 'Retail',                           values: [15.8, 13.4, -18.4] },
            { name: 'Restaurants & Dining',             values: [17.2, 14.2, -28.6] },
            { name: 'Food & Grocery',                   values: [14.6, 12.8, -10.2] },
            { name: 'Entertainment & Leisure',          values: [16.8, 13.8, -32.4] },
            { name: 'Healthcare & Medical',             values: [13.4, 12.2,  -8.6] },
            { name: 'Utilities & Telecommunications',   values: [12.8, 11.6,  -4.2] },
            { name: 'Professional & Business Services', values: [13.2, 12.0,  -6.8] },
            { name: 'Digital Goods & Subscriptions',   values: [19.4, 15.4,  12.8] },
            { name: 'Automotive & Fuel',                values: [11.8, 10.4, -22.6] },
            { name: 'Other',                            values: [14.8, 12.8, -15.4] },
            { name: 'Government & Education',           values: [10.2,  9.2,  -6.4] }
          ]
        },
        topCitiesSpend: [
          { city: 'Bridgetown',   value: 0.894 },
          { city: 'Holetown',     value: 0.344 },
          { city: 'Oistins',      value: 0.206 },
          { city: 'Speightstown', value: 0.172 },
          { city: 'Bathsheba',    value: 0.103 }
        ],
        topCitiesYoY: [
          { city: 'Holetown',     pct: 18.5 },
          { city: 'Oistins',      pct: 17.8 },
          { city: 'Bridgetown',   pct: 16.0 },
          { city: 'Speightstown', pct: 15.2 },
          { city: 'Bathsheba',    pct: 13.9 }
        ],
        cardType: { credit: 55, debit: 37, prepaid: 8, total: 1.720 },
        crossBorderTicket: { overall: 55.40, domestic: 36.20, inbound: 74.80, outbound: 82.50 },
        crossBorderSpend:  { overall: 1.720, domestic: 0.998, inbound: 0.516, outbound: 0.206 }
      },
      totalTransactions: {
        monthly: {
          current:       [0.00855, 0.00810, 0.00810, 0.00675, 0.00630, 0.00675, 0.00810, 0.00855, 0.00585, 0.00630, 0.00765, 0.00900],
          previous:      [0.007315, 0.006930, 0.006930, 0.005775, 0.005390, 0.005775, 0.006930, 0.007315, 0.005005, 0.005390, 0.006545, 0.007700],
          twoYearsPrior: [0.006800, 0.006460, 0.005780, 0.004420, 0.004080, 0.004420, 0.005440, 0.005780, 0.005440, 0.005440, 0.006800, 0.007140]
        },
        industrySpend: [
          { name: 'Retail',                           value: 0.0180 },
          { name: 'Restaurants & Dining',             value: 0.0144 },
          { name: 'Food & Grocery',                   value: 0.0126 },
          { name: 'Travel & Transportation',          value: 0.0090 },
          { name: 'Entertainment & Leisure',          value: 0.0072 },
          { name: 'Healthcare & Medical',             value: 0.0063 },
          { name: 'Digital Goods & Subscriptions',   value: 0.0054 },
          { name: 'Utilities & Telecommunications',   value: 0.0045 },
          { name: 'Professional & Business Services', value: 0.0045 },
          { name: 'Government & Education',           value: 0.0036 },
          { name: 'Automotive & Fuel',                value: 0.0027 },
          { name: 'Other',                            value: 0.0018 }
        ],
        industryHeatmap: {
          years: [2022, 2021, 2020],
          rows: [
            { name: 'Retail',                           values: [15.8, 13.4, -18.4] },
            { name: 'Restaurants & Dining',             values: [17.2, 14.2, -28.6] },
            { name: 'Food & Grocery',                   values: [14.6, 12.8, -10.2] },
            { name: 'Travel & Transportation',          values: [18.5, 14.8, -41.2] },
            { name: 'Entertainment & Leisure',          values: [16.8, 13.8, -32.4] },
            { name: 'Healthcare & Medical',             values: [13.4, 12.2,  -8.6] },
            { name: 'Digital Goods & Subscriptions',   values: [19.4, 15.4,  12.8] },
            { name: 'Utilities & Telecommunications',   values: [12.8, 11.6,  -4.2] },
            { name: 'Professional & Business Services', values: [13.2, 12.0,  -6.8] },
            { name: 'Government & Education',           values: [10.2,  9.2,  -6.4] },
            { name: 'Automotive & Fuel',                values: [11.8, 10.4, -22.6] },
            { name: 'Other',                            values: [14.8, 12.8, -15.4] }
          ]
        },
        topCitiesSpend: [
          { city: 'Bridgetown',   value: 0.04500 },
          { city: 'Oistins',      value: 0.01620 },
          { city: 'Holetown',     value: 0.01350 },
          { city: 'Speightstown', value: 0.01080 },
          { city: 'Bathsheba',    value: 0.00450 }
        ],
        topCitiesYoY: [
          { city: 'Holetown',     pct: 18.5 },
          { city: 'Oistins',      pct: 17.8 },
          { city: 'Bridgetown',   pct: 16.0 },
          { city: 'Speightstown', pct: 15.2 },
          { city: 'Bathsheba',    pct: 13.9 }
        ],
        cardType: { credit: 53, debit: 40, prepaid: 7, total: 0.090 },
        crossBorderTicket: { overall: 55.40, domestic: 36.20, inbound: 74.80, outbound: 82.50 },
        crossBorderSpend:  { overall: 0.090, domestic: 0.05850, inbound: 0.01980, outbound: 0.01170 }
      }
    },

    /* ── 2021 ── */
    2021: {
      totalSpend: {
        monthly: {
          current:       [0.1406, 0.1332, 0.1332, 0.1110, 0.1036, 0.1110, 0.1332, 0.1406, 0.0962, 0.1036, 0.1258, 0.1480],
          previous:      [0.1300, 0.1235, 0.1105, 0.0845, 0.0780, 0.0845, 0.1040, 0.1105, 0.1040, 0.1040, 0.1300, 0.1365],
          twoYearsPrior: [0.1663, 0.1575, 0.1575, 0.1313, 0.1225, 0.1313, 0.1575, 0.1663, 0.1138, 0.1225, 0.1488, 0.1750]
        },
        industrySpend: [
          { name: 'Travel & Transportation',          value: 0.2960 },
          { name: 'Retail',                           value: 0.2220 },
          { name: 'Restaurants & Dining',             value: 0.2072 },
          { name: 'Food & Grocery',                   value: 0.1480 },
          { name: 'Entertainment & Leisure',          value: 0.1184 },
          { name: 'Healthcare & Medical',             value: 0.0888 },
          { name: 'Utilities & Telecommunications',   value: 0.0740 },
          { name: 'Professional & Business Services', value: 0.0740 },
          { name: 'Digital Goods & Subscriptions',   value: 0.0710 },
          { name: 'Automotive & Fuel',                value: 0.0592 },
          { name: 'Other',                            value: 0.0770 },
          { name: 'Government & Education',           value: 0.0444 }
        ],
        industryHeatmap: {
          years: [2021, 2020, 2019],
          rows: [
            { name: 'Travel & Transportation',          values: [14.8, -41.2,  8.4] },
            { name: 'Retail',                           values: [13.4, -18.4,  5.2] },
            { name: 'Restaurants & Dining',             values: [14.2, -28.6,  6.4] },
            { name: 'Food & Grocery',                   values: [12.8, -10.2,  4.6] },
            { name: 'Entertainment & Leisure',          values: [13.8, -32.4,  5.8] },
            { name: 'Healthcare & Medical',             values: [12.2,  -8.6,  4.2] },
            { name: 'Utilities & Telecommunications',   values: [11.6,  -4.2,  3.8] },
            { name: 'Professional & Business Services', values: [12.0,  -6.8,  4.4] },
            { name: 'Digital Goods & Subscriptions',   values: [15.4,  12.8, 18.4] },
            { name: 'Automotive & Fuel',                values: [10.4, -22.6,  3.2] },
            { name: 'Other',                            values: [12.8, -15.4,  4.8] },
            { name: 'Government & Education',           values: [ 9.2,  -6.4,  3.6] }
          ]
        },
        topCitiesSpend: [
          { city: 'Bridgetown',   value: 0.770 },
          { city: 'Holetown',     value: 0.296 },
          { city: 'Oistins',      value: 0.178 },
          { city: 'Speightstown', value: 0.148 },
          { city: 'Bathsheba',    value: 0.089 }
        ],
        topCitiesYoY: [
          { city: 'Oistins',      pct: 15.5 },
          { city: 'Holetown',     pct: 14.2 },
          { city: 'Bridgetown',   pct: 13.9 },
          { city: 'Speightstown', pct: 13.2 },
          { city: 'Bathsheba',    pct: 11.8 }
        ],
        cardType: { credit: 55, debit: 37, prepaid: 8, total: 1.480 },
        crossBorderTicket: { overall: 52.90, domestic: 34.80, inbound: 71.50, outbound: 79.80 },
        crossBorderSpend:  { overall: 1.480, domestic: 0.858, inbound: 0.444, outbound: 0.178 }
      },
      totalTransactions: {
        monthly: {
          current:       [0.007315, 0.006930, 0.006930, 0.005775, 0.005390, 0.005775, 0.006930, 0.007315, 0.005005, 0.005390, 0.006545, 0.007700],
          previous:      [0.006800, 0.006460, 0.005780, 0.004420, 0.004080, 0.004420, 0.005440, 0.005780, 0.005440, 0.005440, 0.006800, 0.007140],
          twoYearsPrior: [0.008740, 0.008280, 0.008280, 0.006900, 0.006440, 0.006900, 0.008280, 0.008740, 0.005980, 0.006440, 0.007820, 0.009200]
        },
        industrySpend: [
          { name: 'Retail',                           value: 0.0154 },
          { name: 'Restaurants & Dining',             value: 0.0123 },
          { name: 'Food & Grocery',                   value: 0.0108 },
          { name: 'Travel & Transportation',          value: 0.0077 },
          { name: 'Entertainment & Leisure',          value: 0.0062 },
          { name: 'Healthcare & Medical',             value: 0.0054 },
          { name: 'Digital Goods & Subscriptions',   value: 0.0046 },
          { name: 'Utilities & Telecommunications',   value: 0.0039 },
          { name: 'Professional & Business Services', value: 0.0039 },
          { name: 'Government & Education',           value: 0.0031 },
          { name: 'Automotive & Fuel',                value: 0.0023 },
          { name: 'Other',                            value: 0.0015 }
        ],
        industryHeatmap: {
          years: [2021, 2020, 2019],
          rows: [
            { name: 'Retail',                           values: [13.4, -18.4,  5.2] },
            { name: 'Restaurants & Dining',             values: [14.2, -28.6,  6.4] },
            { name: 'Food & Grocery',                   values: [12.8, -10.2,  4.6] },
            { name: 'Travel & Transportation',          values: [14.8, -41.2,  8.4] },
            { name: 'Entertainment & Leisure',          values: [13.8, -32.4,  5.8] },
            { name: 'Healthcare & Medical',             values: [12.2,  -8.6,  4.2] },
            { name: 'Digital Goods & Subscriptions',   values: [15.4,  12.8, 18.4] },
            { name: 'Utilities & Telecommunications',   values: [11.6,  -4.2,  3.8] },
            { name: 'Professional & Business Services', values: [12.0,  -6.8,  4.4] },
            { name: 'Government & Education',           values: [ 9.2,  -6.4,  3.6] },
            { name: 'Automotive & Fuel',                values: [10.4, -22.6,  3.2] },
            { name: 'Other',                            values: [12.8, -15.4,  4.8] }
          ]
        },
        topCitiesSpend: [
          { city: 'Bridgetown',   value: 0.03850 },
          { city: 'Oistins',      value: 0.01386 },
          { city: 'Holetown',     value: 0.01155 },
          { city: 'Speightstown', value: 0.00924 },
          { city: 'Bathsheba',    value: 0.00385 }
        ],
        topCitiesYoY: [
          { city: 'Oistins',      pct: 15.5 },
          { city: 'Holetown',     pct: 14.2 },
          { city: 'Bridgetown',   pct: 13.9 },
          { city: 'Speightstown', pct: 13.2 },
          { city: 'Bathsheba',    pct: 11.8 }
        ],
        cardType: { credit: 53, debit: 40, prepaid: 7, total: 0.077 },
        crossBorderTicket: { overall: 52.90, domestic: 34.80, inbound: 71.50, outbound: 79.80 },
        crossBorderSpend:  { overall: 0.077, domestic: 0.05005, inbound: 0.01694, outbound: 0.01001 }
      }
    }

  } /* end barbados */,

  /* ────────────────────────────────────────────────────────────────
     CHILE   — annual totals: $38B (2021) → $50.5B (2025)
     Southern Hemisphere seasons; debit-heavy card mix; COVID visible 2020
     Cities: Santiago (dominant), Concepción, Valparaíso, Antofagasta, Viña del Mar
  ──────────────────────────────────────────────────────────────── */
  chile: {

    /* ── 2026 ── */
    2026: {
      totalSpend: {
        monthly: {
          current:       [4.94, 4.57, 4.42, 4.06, 3.90, 3.90, null, null, null, null, null, null],
          previous:      [4.80, 4.44, 4.29, 3.94, 3.79, 3.79, 3.79, 3.94, 4.29, 4.29, 4.44, 4.70],
          twoYearsPrior: [4.61, 4.27, 4.12, 3.78, 3.64, 3.64, 3.64, 3.78, 4.12, 4.12, 4.27, 4.51]
        },
        industrySpend: [
          { name: 'Retail',                           value: 4.64 },
          { name: 'Travel & Transportation',          value: 3.61 },
          { name: 'Food & Grocery',                   value: 3.09 },
          { name: 'Restaurants & Dining',             value: 2.84 },
          { name: 'Healthcare & Medical',             value: 2.06 },
          { name: 'Professional & Business Services', value: 2.06 },
          { name: 'Utilities & Telecommunications',   value: 1.81 },
          { name: 'Entertainment & Leisure',          value: 1.55 },
          { name: 'Digital Goods & Subscriptions',   value: 1.29 },
          { name: 'Government & Education',           value: 1.29 },
          { name: 'Automotive & Fuel',                value: 1.03 },
          { name: 'Other',                            value: 0.52 }
        ],
        industryHeatmap: {
          years: [2026, 2025, 2024],
          rows: [
            { name: 'Retail',                           values: [ 3.1,  3.6,  5.2] },
            { name: 'Travel & Transportation',          values: [ 4.2,  5.0,  6.8] },
            { name: 'Food & Grocery',                   values: [ 2.8,  3.4,  4.8] },
            { name: 'Restaurants & Dining',             values: [ 3.2,  4.0,  5.6] },
            { name: 'Healthcare & Medical',             values: [ 2.6,  3.2,  4.4] },
            { name: 'Professional & Business Services', values: [ 2.8,  3.4,  4.8] },
            { name: 'Utilities & Telecommunications',   values: [ 2.2,  2.8,  4.0] },
            { name: 'Entertainment & Leisure',          values: [ 3.4,  4.2,  5.8] },
            { name: 'Digital Goods & Subscriptions',   values: [ 5.8,  6.4,  8.2] },
            { name: 'Government & Education',           values: [ 2.0,  2.4,  3.6] },
            { name: 'Automotive & Fuel',                values: [ 1.8,  2.4,  3.4] },
            { name: 'Other',                            values: [ 2.8,  3.2,  4.6] }
          ]
        },
        topCitiesSpend: [
          { city: 'Santiago',     value: 17.54 },
          { city: 'Concepción',   value:  2.58 },
          { city: 'Valparaíso',   value:  2.32 },
          { city: 'Antofagasta',  value:  2.06 },
          { city: 'Viña del Mar', value:  1.29 }
        ],
        topCitiesYoY: [
          { city: 'Antofagasta',  pct: 3.8 },
          { city: 'Santiago',     pct: 3.2 },
          { city: 'Concepción',   pct: 3.0 },
          { city: 'Viña del Mar', pct: 2.8 },
          { city: 'Valparaíso',   pct: 2.6 }
        ],
        cardType: { credit: 45, debit: 47, prepaid: 8, total: 25.79 },
        crossBorderTicket: { overall: 74.20, domestic: 62.40, inbound: 108.50, outbound: 118.80 },
        crossBorderSpend:  { overall: 25.79, domestic: 18.57, inbound: 4.64, outbound: 2.58 }
      },
      totalTransactions: {
        monthly: {
          current:       [0.313, 0.289, 0.289, 0.272, 0.265, 0.265, null, null, null, null, null, null],
          previous:      [0.304, 0.281, 0.281, 0.264, 0.257, 0.257, 0.257, 0.264, 0.281, 0.281, 0.281, 0.294],
          twoYearsPrior: [0.292, 0.270, 0.270, 0.254, 0.247, 0.247, 0.247, 0.254, 0.270, 0.270, 0.270, 0.282]
        },
        industrySpend: [
          { name: 'Retail',                           value: 0.374 },
          { name: 'Food & Grocery',                   value: 0.255 },
          { name: 'Restaurants & Dining',             value: 0.238 },
          { name: 'Travel & Transportation',          value: 0.153 },
          { name: 'Healthcare & Medical',             value: 0.136 },
          { name: 'Entertainment & Leisure',          value: 0.119 },
          { name: 'Digital Goods & Subscriptions',   value: 0.102 },
          { name: 'Utilities & Telecommunications',   value: 0.102 },
          { name: 'Professional & Business Services', value: 0.102 },
          { name: 'Government & Education',           value: 0.068 },
          { name: 'Automotive & Fuel',                value: 0.034 },
          { name: 'Other',                            value: 0.017 }
        ],
        industryHeatmap: {
          years: [2026, 2025, 2024],
          rows: [
            { name: 'Retail',                           values: [ 3.1,  3.6,  5.2] },
            { name: 'Food & Grocery',                   values: [ 2.8,  3.4,  4.8] },
            { name: 'Restaurants & Dining',             values: [ 3.2,  4.0,  5.6] },
            { name: 'Travel & Transportation',          values: [ 4.2,  5.0,  6.8] },
            { name: 'Healthcare & Medical',             values: [ 2.6,  3.2,  4.4] },
            { name: 'Entertainment & Leisure',          values: [ 3.4,  4.2,  5.8] },
            { name: 'Digital Goods & Subscriptions',   values: [ 5.8,  6.4,  8.2] },
            { name: 'Utilities & Telecommunications',   values: [ 2.2,  2.8,  4.0] },
            { name: 'Professional & Business Services', values: [ 2.8,  3.4,  4.8] },
            { name: 'Government & Education',           values: [ 2.0,  2.4,  3.6] },
            { name: 'Automotive & Fuel',                values: [ 1.8,  2.4,  3.4] },
            { name: 'Other',                            values: [ 2.8,  3.2,  4.6] }
          ]
        },
        topCitiesSpend: [
          { city: 'Santiago',     value: 1.190 },
          { city: 'Concepción',   value: 0.170 },
          { city: 'Antofagasta',  value: 0.140 },
          { city: 'Valparaíso',   value: 0.130 },
          { city: 'Viña del Mar', value: 0.068 }
        ],
        topCitiesYoY: [
          { city: 'Antofagasta',  pct: 3.8 },
          { city: 'Santiago',     pct: 3.2 },
          { city: 'Concepción',   pct: 3.0 },
          { city: 'Viña del Mar', pct: 2.8 },
          { city: 'Valparaíso',   pct: 2.6 }
        ],
        cardType: { credit: 42, debit: 50, prepaid: 8, total: 1.70 },
        crossBorderTicket: { overall: 74.20, domestic: 62.40, inbound: 108.50, outbound: 118.80 },
        crossBorderSpend:  { overall: 1.70, domestic: 1.275, inbound: 0.238, outbound: 0.187 }
      }
    },

    /* ── 2025 ── */
    2025: {
      totalSpend: {
        monthly: {
          current:       [4.80, 4.44, 4.29, 3.94, 3.79, 3.79, 3.79, 3.94, 4.29, 4.29, 4.44, 4.70],
          previous:      [4.61, 4.27, 4.12, 3.78, 3.64, 3.64, 3.64, 3.78, 4.12, 4.12, 4.27, 4.51],
          twoYearsPrior: [4.37, 4.05, 3.91, 3.59, 3.45, 3.45, 3.45, 3.59, 3.91, 3.91, 4.05, 4.28]
        },
        industrySpend: [
          { name: 'Retail',                           value: 9.09 },
          { name: 'Travel & Transportation',          value: 7.07 },
          { name: 'Food & Grocery',                   value: 6.06 },
          { name: 'Restaurants & Dining',             value: 5.56 },
          { name: 'Healthcare & Medical',             value: 4.04 },
          { name: 'Professional & Business Services', value: 4.04 },
          { name: 'Utilities & Telecommunications',   value: 3.54 },
          { name: 'Entertainment & Leisure',          value: 3.03 },
          { name: 'Digital Goods & Subscriptions',   value: 2.53 },
          { name: 'Government & Education',           value: 2.53 },
          { name: 'Automotive & Fuel',                value: 2.02 },
          { name: 'Other',                            value: 1.01 }
        ],
        industryHeatmap: {
          years: [2025, 2024, 2023],
          rows: [
            { name: 'Retail',                           values: [ 3.6,  5.2,  7.2] },
            { name: 'Travel & Transportation',          values: [ 5.0,  6.8,  8.8] },
            { name: 'Food & Grocery',                   values: [ 3.4,  4.8,  7.0] },
            { name: 'Restaurants & Dining',             values: [ 4.0,  5.6,  7.6] },
            { name: 'Healthcare & Medical',             values: [ 3.2,  4.4,  6.2] },
            { name: 'Professional & Business Services', values: [ 3.4,  4.8,  6.6] },
            { name: 'Utilities & Telecommunications',   values: [ 2.8,  4.0,  5.8] },
            { name: 'Entertainment & Leisure',          values: [ 4.2,  5.8,  7.8] },
            { name: 'Digital Goods & Subscriptions',   values: [ 6.4,  8.2, 10.4] },
            { name: 'Government & Education',           values: [ 2.4,  3.6,  5.2] },
            { name: 'Automotive & Fuel',                values: [ 2.4,  3.4,  5.0] },
            { name: 'Other',                            values: [ 3.2,  4.6,  6.4] }
          ]
        },
        topCitiesSpend: [
          { city: 'Santiago',     value: 34.34 },
          { city: 'Concepción',   value:  5.05 },
          { city: 'Valparaíso',   value:  4.55 },
          { city: 'Antofagasta',  value:  4.04 },
          { city: 'Viña del Mar', value:  2.53 }
        ],
        topCitiesYoY: [
          { city: 'Antofagasta',  pct: 5.2 },
          { city: 'Santiago',     pct: 4.2 },
          { city: 'Concepción',   pct: 3.8 },
          { city: 'Viña del Mar', pct: 3.6 },
          { city: 'Valparaíso',   pct: 3.2 }
        ],
        cardType: { credit: 45, debit: 47, prepaid: 8, total: 50.50 },
        crossBorderTicket: { overall: 72.80, domestic: 61.20, inbound: 106.20, outbound: 116.40 },
        crossBorderSpend:  { overall: 50.50, domestic: 36.36, inbound: 9.09, outbound: 5.05 }
      },
      totalTransactions: {
        monthly: {
          current:       [0.304, 0.281, 0.281, 0.264, 0.257, 0.257, 0.257, 0.264, 0.281, 0.281, 0.281, 0.294],
          previous:      [0.292, 0.270, 0.270, 0.254, 0.247, 0.247, 0.247, 0.254, 0.270, 0.270, 0.270, 0.282],
          twoYearsPrior: [0.276, 0.255, 0.255, 0.240, 0.234, 0.234, 0.234, 0.240, 0.255, 0.255, 0.255, 0.267]
        },
        industrySpend: [
          { name: 'Retail',                           value: 0.726 },
          { name: 'Food & Grocery',                   value: 0.495 },
          { name: 'Restaurants & Dining',             value: 0.462 },
          { name: 'Travel & Transportation',          value: 0.297 },
          { name: 'Healthcare & Medical',             value: 0.264 },
          { name: 'Entertainment & Leisure',          value: 0.231 },
          { name: 'Digital Goods & Subscriptions',   value: 0.198 },
          { name: 'Utilities & Telecommunications',   value: 0.198 },
          { name: 'Professional & Business Services', value: 0.198 },
          { name: 'Government & Education',           value: 0.132 },
          { name: 'Automotive & Fuel',                value: 0.066 },
          { name: 'Other',                            value: 0.033 }
        ],
        industryHeatmap: {
          years: [2025, 2024, 2023],
          rows: [
            { name: 'Retail',                           values: [ 3.6,  5.2,  7.2] },
            { name: 'Food & Grocery',                   values: [ 3.4,  4.8,  7.0] },
            { name: 'Restaurants & Dining',             values: [ 4.0,  5.6,  7.6] },
            { name: 'Travel & Transportation',          values: [ 5.0,  6.8,  8.8] },
            { name: 'Healthcare & Medical',             values: [ 3.2,  4.4,  6.2] },
            { name: 'Entertainment & Leisure',          values: [ 4.2,  5.8,  7.8] },
            { name: 'Digital Goods & Subscriptions',   values: [ 6.4,  8.2, 10.4] },
            { name: 'Utilities & Telecommunications',   values: [ 2.8,  4.0,  5.8] },
            { name: 'Professional & Business Services', values: [ 3.4,  4.8,  6.6] },
            { name: 'Government & Education',           values: [ 2.4,  3.6,  5.2] },
            { name: 'Automotive & Fuel',                values: [ 2.4,  3.4,  5.0] },
            { name: 'Other',                            values: [ 3.2,  4.6,  6.4] }
          ]
        },
        topCitiesSpend: [
          { city: 'Santiago',     value: 2.310 },
          { city: 'Concepción',   value: 0.330 },
          { city: 'Antofagasta',  value: 0.272 },
          { city: 'Valparaíso',   value: 0.253 },
          { city: 'Viña del Mar', value: 0.132 }
        ],
        topCitiesYoY: [
          { city: 'Antofagasta',  pct: 5.2 },
          { city: 'Santiago',     pct: 4.2 },
          { city: 'Concepción',   pct: 3.8 },
          { city: 'Viña del Mar', pct: 3.6 },
          { city: 'Valparaíso',   pct: 3.2 }
        ],
        cardType: { credit: 42, debit: 50, prepaid: 8, total: 3.30 },
        crossBorderTicket: { overall: 72.80, domestic: 61.20, inbound: 106.20, outbound: 116.40 },
        crossBorderSpend:  { overall: 3.30, domestic: 2.475, inbound: 0.462, outbound: 0.363 }
      }
    },

    /* ── 2024 ── */
    2024: {
      totalSpend: {
        monthly: {
          current:       [4.61, 4.27, 4.12, 3.78, 3.64, 3.64, 3.64, 3.78, 4.12, 4.12, 4.27, 4.51],
          previous:      [4.37, 4.05, 3.91, 3.59, 3.45, 3.45, 3.45, 3.59, 3.91, 3.91, 4.05, 4.28],
          twoYearsPrior: [4.09, 3.78, 3.66, 3.35, 3.23, 3.23, 3.23, 3.35, 3.66, 3.66, 3.78, 4.00]
        },
        industrySpend: [
          { name: 'Retail',                           value: 8.73 },
          { name: 'Travel & Transportation',          value: 6.79 },
          { name: 'Food & Grocery',                   value: 5.82 },
          { name: 'Restaurants & Dining',             value: 5.34 },
          { name: 'Healthcare & Medical',             value: 3.88 },
          { name: 'Professional & Business Services', value: 3.88 },
          { name: 'Utilities & Telecommunications',   value: 3.40 },
          { name: 'Entertainment & Leisure',          value: 2.91 },
          { name: 'Digital Goods & Subscriptions',   value: 2.43 },
          { name: 'Government & Education',           value: 2.43 },
          { name: 'Automotive & Fuel',                value: 1.94 },
          { name: 'Other',                            value: 0.97 }
        ],
        industryHeatmap: {
          years: [2024, 2023, 2022],
          rows: [
            { name: 'Retail',                           values: [ 5.2,  7.2, 12.4] },
            { name: 'Travel & Transportation',          values: [ 6.8,  8.8, 15.4] },
            { name: 'Food & Grocery',                   values: [ 4.8,  7.0, 11.8] },
            { name: 'Restaurants & Dining',             values: [ 5.6,  7.6, 13.2] },
            { name: 'Healthcare & Medical',             values: [ 4.4,  6.2, 10.8] },
            { name: 'Professional & Business Services', values: [ 4.8,  6.6, 11.4] },
            { name: 'Utilities & Telecommunications',   values: [ 4.0,  5.8, 10.2] },
            { name: 'Entertainment & Leisure',          values: [ 5.8,  7.8, 13.6] },
            { name: 'Digital Goods & Subscriptions',   values: [ 8.2, 10.4, 16.8] },
            { name: 'Government & Education',           values: [ 3.6,  5.2,  9.2] },
            { name: 'Automotive & Fuel',                values: [ 3.4,  5.0,  8.8] },
            { name: 'Other',                            values: [ 4.6,  6.4, 11.2] }
          ]
        },
        topCitiesSpend: [
          { city: 'Santiago',     value: 32.98 },
          { city: 'Concepción',   value:  4.85 },
          { city: 'Valparaíso',   value:  4.37 },
          { city: 'Antofagasta',  value:  3.88 },
          { city: 'Viña del Mar', value:  2.43 }
        ],
        topCitiesYoY: [
          { city: 'Antofagasta',  pct: 6.8 },
          { city: 'Santiago',     pct: 5.8 },
          { city: 'Concepción',   pct: 5.2 },
          { city: 'Viña del Mar', pct: 5.0 },
          { city: 'Valparaíso',   pct: 4.6 }
        ],
        cardType: { credit: 45, debit: 47, prepaid: 8, total: 48.50 },
        crossBorderTicket: { overall: 70.60, domestic: 59.40, inbound: 103.80, outbound: 113.60 },
        crossBorderSpend:  { overall: 48.50, domestic: 34.92, inbound: 8.73, outbound: 4.85 }
      },
      totalTransactions: {
        monthly: {
          current:       [0.292, 0.270, 0.270, 0.254, 0.247, 0.247, 0.247, 0.254, 0.270, 0.270, 0.270, 0.282],
          previous:      [0.276, 0.255, 0.255, 0.240, 0.234, 0.234, 0.234, 0.240, 0.255, 0.255, 0.255, 0.267],
          twoYearsPrior: [0.260, 0.240, 0.240, 0.226, 0.220, 0.220, 0.220, 0.226, 0.240, 0.240, 0.240, 0.250]
        },
        industrySpend: [
          { name: 'Retail',                           value: 0.697 },
          { name: 'Food & Grocery',                   value: 0.476 },
          { name: 'Restaurants & Dining',             value: 0.444 },
          { name: 'Travel & Transportation',          value: 0.285 },
          { name: 'Healthcare & Medical',             value: 0.254 },
          { name: 'Entertainment & Leisure',          value: 0.222 },
          { name: 'Digital Goods & Subscriptions',   value: 0.190 },
          { name: 'Utilities & Telecommunications',   value: 0.190 },
          { name: 'Professional & Business Services', value: 0.190 },
          { name: 'Government & Education',           value: 0.127 },
          { name: 'Automotive & Fuel',                value: 0.063 },
          { name: 'Other',                            value: 0.032 }
        ],
        industryHeatmap: {
          years: [2024, 2023, 2022],
          rows: [
            { name: 'Retail',                           values: [ 5.2,  7.2, 12.4] },
            { name: 'Food & Grocery',                   values: [ 4.8,  7.0, 11.8] },
            { name: 'Restaurants & Dining',             values: [ 5.6,  7.6, 13.2] },
            { name: 'Travel & Transportation',          values: [ 6.8,  8.8, 15.4] },
            { name: 'Healthcare & Medical',             values: [ 4.4,  6.2, 10.8] },
            { name: 'Entertainment & Leisure',          values: [ 5.8,  7.8, 13.6] },
            { name: 'Digital Goods & Subscriptions',   values: [ 8.2, 10.4, 16.8] },
            { name: 'Utilities & Telecommunications',   values: [ 4.0,  5.8, 10.2] },
            { name: 'Professional & Business Services', values: [ 4.8,  6.6, 11.4] },
            { name: 'Government & Education',           values: [ 3.6,  5.2,  9.2] },
            { name: 'Automotive & Fuel',                values: [ 3.4,  5.0,  8.8] },
            { name: 'Other',                            values: [ 4.6,  6.4, 11.2] }
          ]
        },
        topCitiesSpend: [
          { city: 'Santiago',     value: 2.219 },
          { city: 'Concepción',   value: 0.317 },
          { city: 'Antofagasta',  value: 0.261 },
          { city: 'Valparaíso',   value: 0.243 },
          { city: 'Viña del Mar', value: 0.127 }
        ],
        topCitiesYoY: [
          { city: 'Antofagasta',  pct: 6.8 },
          { city: 'Santiago',     pct: 5.8 },
          { city: 'Concepción',   pct: 5.2 },
          { city: 'Viña del Mar', pct: 5.0 },
          { city: 'Valparaíso',   pct: 4.6 }
        ],
        cardType: { credit: 42, debit: 50, prepaid: 8, total: 3.17 },
        crossBorderTicket: { overall: 70.60, domestic: 59.40, inbound: 103.80, outbound: 113.60 },
        crossBorderSpend:  { overall: 3.17, domestic: 2.378, inbound: 0.444, outbound: 0.348 }
      }
    },

    /* ── 2023 ── */
    2023: {
      totalSpend: {
        monthly: {
          current:       [4.37, 4.05, 3.91, 3.59, 3.45, 3.45, 3.45, 3.59, 3.91, 3.91, 4.05, 4.28],
          previous:      [4.09, 3.78, 3.66, 3.35, 3.23, 3.23, 3.23, 3.35, 3.66, 3.66, 3.78, 4.00],
          twoYearsPrior: [3.61, 3.34, 3.23, 2.96, 2.85, 2.85, 2.85, 2.96, 3.23, 3.23, 3.34, 3.53]
        },
        industrySpend: [
          { name: 'Retail',                           value: 8.28 },
          { name: 'Travel & Transportation',          value: 6.44 },
          { name: 'Food & Grocery',                   value: 5.52 },
          { name: 'Restaurants & Dining',             value: 5.06 },
          { name: 'Healthcare & Medical',             value: 3.68 },
          { name: 'Professional & Business Services', value: 3.68 },
          { name: 'Utilities & Telecommunications',   value: 3.22 },
          { name: 'Entertainment & Leisure',          value: 2.76 },
          { name: 'Digital Goods & Subscriptions',   value: 2.30 },
          { name: 'Government & Education',           value: 2.30 },
          { name: 'Automotive & Fuel',                value: 1.84 },
          { name: 'Other',                            value: 0.92 }
        ],
        industryHeatmap: {
          years: [2023, 2022, 2021],
          rows: [
            { name: 'Retail',                           values: [ 7.2, 12.4, 14.8] },
            { name: 'Travel & Transportation',          values: [ 8.8, 15.4, 18.2] },
            { name: 'Food & Grocery',                   values: [ 7.0, 11.8, 14.2] },
            { name: 'Restaurants & Dining',             values: [ 7.6, 13.2, 15.6] },
            { name: 'Healthcare & Medical',             values: [ 6.2, 10.8, 13.4] },
            { name: 'Professional & Business Services', values: [ 6.6, 11.4, 14.2] },
            { name: 'Utilities & Telecommunications',   values: [ 5.8, 10.2, 12.8] },
            { name: 'Entertainment & Leisure',          values: [ 7.8, 13.6, 16.2] },
            { name: 'Digital Goods & Subscriptions',   values: [10.4, 16.8, 20.4] },
            { name: 'Government & Education',           values: [ 5.2,  9.2, 11.8] },
            { name: 'Automotive & Fuel',                values: [ 5.0,  8.8, 11.4] },
            { name: 'Other',                            values: [ 6.4, 11.2, 13.8] }
          ]
        },
        topCitiesSpend: [
          { city: 'Santiago',     value: 31.28 },
          { city: 'Concepción',   value:  4.60 },
          { city: 'Valparaíso',   value:  4.14 },
          { city: 'Antofagasta',  value:  3.68 },
          { city: 'Viña del Mar', value:  2.30 }
        ],
        topCitiesYoY: [
          { city: 'Antofagasta',  pct: 8.8 },
          { city: 'Santiago',     pct: 7.4 },
          { city: 'Concepción',   pct: 7.0 },
          { city: 'Viña del Mar', pct: 6.8 },
          { city: 'Valparaíso',   pct: 6.2 }
        ],
        cardType: { credit: 45, debit: 47, prepaid: 8, total: 46.00 },
        crossBorderTicket: { overall: 68.40, domestic: 57.60, inbound: 100.40, outbound: 110.20 },
        crossBorderSpend:  { overall: 46.00, domestic: 33.12, inbound: 8.28, outbound: 4.60 }
      },
      totalTransactions: {
        monthly: {
          current:       [0.276, 0.255, 0.255, 0.240, 0.234, 0.234, 0.234, 0.240, 0.255, 0.255, 0.255, 0.267],
          previous:      [0.260, 0.240, 0.240, 0.226, 0.220, 0.220, 0.220, 0.226, 0.240, 0.240, 0.240, 0.250],
          twoYearsPrior: [0.230, 0.213, 0.213, 0.200, 0.195, 0.195, 0.195, 0.200, 0.213, 0.213, 0.213, 0.221]
        },
        industrySpend: [
          { name: 'Retail',                           value: 0.660 },
          { name: 'Food & Grocery',                   value: 0.450 },
          { name: 'Restaurants & Dining',             value: 0.420 },
          { name: 'Travel & Transportation',          value: 0.270 },
          { name: 'Healthcare & Medical',             value: 0.240 },
          { name: 'Entertainment & Leisure',          value: 0.210 },
          { name: 'Digital Goods & Subscriptions',   value: 0.180 },
          { name: 'Utilities & Telecommunications',   value: 0.180 },
          { name: 'Professional & Business Services', value: 0.180 },
          { name: 'Government & Education',           value: 0.120 },
          { name: 'Automotive & Fuel',                value: 0.060 },
          { name: 'Other',                            value: 0.030 }
        ],
        industryHeatmap: {
          years: [2023, 2022, 2021],
          rows: [
            { name: 'Retail',                           values: [ 7.2, 12.4, 14.8] },
            { name: 'Food & Grocery',                   values: [ 7.0, 11.8, 14.2] },
            { name: 'Restaurants & Dining',             values: [ 7.6, 13.2, 15.6] },
            { name: 'Travel & Transportation',          values: [ 8.8, 15.4, 18.2] },
            { name: 'Healthcare & Medical',             values: [ 6.2, 10.8, 13.4] },
            { name: 'Entertainment & Leisure',          values: [ 7.8, 13.6, 16.2] },
            { name: 'Digital Goods & Subscriptions',   values: [10.4, 16.8, 20.4] },
            { name: 'Utilities & Telecommunications',   values: [ 5.8, 10.2, 12.8] },
            { name: 'Professional & Business Services', values: [ 6.6, 11.4, 14.2] },
            { name: 'Government & Education',           values: [ 5.2,  9.2, 11.8] },
            { name: 'Automotive & Fuel',                values: [ 5.0,  8.8, 11.4] },
            { name: 'Other',                            values: [ 6.4, 11.2, 13.8] }
          ]
        },
        topCitiesSpend: [
          { city: 'Santiago',     value: 2.100 },
          { city: 'Concepción',   value: 0.300 },
          { city: 'Antofagasta',  value: 0.246 },
          { city: 'Valparaíso',   value: 0.228 },
          { city: 'Viña del Mar', value: 0.120 }
        ],
        topCitiesYoY: [
          { city: 'Antofagasta',  pct: 8.8 },
          { city: 'Santiago',     pct: 7.4 },
          { city: 'Concepción',   pct: 7.0 },
          { city: 'Viña del Mar', pct: 6.8 },
          { city: 'Valparaíso',   pct: 6.2 }
        ],
        cardType: { credit: 42, debit: 50, prepaid: 8, total: 3.00 },
        crossBorderTicket: { overall: 68.40, domestic: 57.60, inbound: 100.40, outbound: 110.20 },
        crossBorderSpend:  { overall: 3.00, domestic: 2.250, inbound: 0.420, outbound: 0.330 }
      }
    },

    /* ── 2022 ── */
    2022: {
      totalSpend: {
        monthly: {
          current:       [4.09, 3.78, 3.66, 3.35, 3.23, 3.23, 3.23, 3.35, 3.66, 3.66, 3.78, 4.00],
          previous:      [3.61, 3.34, 3.23, 2.96, 2.85, 2.85, 2.85, 2.96, 3.23, 3.23, 3.34, 3.53],
          twoYearsPrior: [3.50, 3.30, 2.80, 1.98, 1.80, 1.80, 2.31, 2.48, 2.48, 2.80, 3.50, 4.25]
        },
        industrySpend: [
          { name: 'Retail',                           value: 7.74 },
          { name: 'Travel & Transportation',          value: 6.02 },
          { name: 'Food & Grocery',                   value: 5.16 },
          { name: 'Restaurants & Dining',             value: 4.73 },
          { name: 'Healthcare & Medical',             value: 3.44 },
          { name: 'Professional & Business Services', value: 3.44 },
          { name: 'Utilities & Telecommunications',   value: 3.01 },
          { name: 'Entertainment & Leisure',          value: 2.58 },
          { name: 'Digital Goods & Subscriptions',   value: 2.15 },
          { name: 'Government & Education',           value: 2.15 },
          { name: 'Automotive & Fuel',                value: 1.72 },
          { name: 'Other',                            value: 0.86 }
        ],
        industryHeatmap: {
          years: [2022, 2021, 2020],
          rows: [
            { name: 'Retail',                           values: [12.4, 14.8,  -8.6] },
            { name: 'Travel & Transportation',          values: [15.4, 18.2, -28.6] },
            { name: 'Food & Grocery',                   values: [11.8, 14.2,  -4.2] },
            { name: 'Restaurants & Dining',             values: [13.2, 15.6, -18.4] },
            { name: 'Healthcare & Medical',             values: [10.8, 13.4,  -4.0] },
            { name: 'Professional & Business Services', values: [11.4, 14.2,  -6.2] },
            { name: 'Utilities & Telecommunications',   values: [10.2, 12.8,  -2.8] },
            { name: 'Entertainment & Leisure',          values: [13.6, 16.2, -22.4] },
            { name: 'Digital Goods & Subscriptions',   values: [16.8, 20.4,  14.2] },
            { name: 'Government & Education',           values: [ 9.2, 11.8,  -4.8] },
            { name: 'Automotive & Fuel',                values: [ 8.8, 11.4, -16.4] },
            { name: 'Other',                            values: [11.2, 13.8,  -8.2] }
          ]
        },
        topCitiesSpend: [
          { city: 'Santiago',     value: 29.24 },
          { city: 'Concepción',   value:  4.30 },
          { city: 'Valparaíso',   value:  3.87 },
          { city: 'Antofagasta',  value:  3.44 },
          { city: 'Viña del Mar', value:  2.15 }
        ],
        topCitiesYoY: [
          { city: 'Santiago',     pct: 13.5 },
          { city: 'Concepción',   pct: 13.2 },
          { city: 'Antofagasta',  pct: 12.8 },
          { city: 'Valparaíso',   pct: 12.4 },
          { city: 'Viña del Mar', pct: 11.8 }
        ],
        cardType: { credit: 45, debit: 47, prepaid: 8, total: 43.00 },
        crossBorderTicket: { overall: 65.20, domestic: 54.80, inbound: 96.20, outbound: 105.40 },
        crossBorderSpend:  { overall: 43.00, domestic: 30.96, inbound: 7.74, outbound: 4.30 }
      },
      totalTransactions: {
        monthly: {
          current:       [0.260, 0.240, 0.240, 0.226, 0.220, 0.220, 0.220, 0.226, 0.240, 0.240, 0.240, 0.250],
          previous:      [0.230, 0.213, 0.213, 0.200, 0.195, 0.195, 0.195, 0.200, 0.213, 0.213, 0.213, 0.221],
          twoYearsPrior: [0.230, 0.219, 0.185, 0.128, 0.116, 0.116, 0.162, 0.174, 0.174, 0.196, 0.230, 0.270]
        },
        industrySpend: [
          { name: 'Retail',                           value: 0.620 },
          { name: 'Food & Grocery',                   value: 0.423 },
          { name: 'Restaurants & Dining',             value: 0.395 },
          { name: 'Travel & Transportation',          value: 0.254 },
          { name: 'Healthcare & Medical',             value: 0.226 },
          { name: 'Entertainment & Leisure',          value: 0.197 },
          { name: 'Digital Goods & Subscriptions',   value: 0.169 },
          { name: 'Utilities & Telecommunications',   value: 0.169 },
          { name: 'Professional & Business Services', value: 0.169 },
          { name: 'Government & Education',           value: 0.113 },
          { name: 'Automotive & Fuel',                value: 0.056 },
          { name: 'Other',                            value: 0.028 }
        ],
        industryHeatmap: {
          years: [2022, 2021, 2020],
          rows: [
            { name: 'Retail',                           values: [12.4, 14.8,  -8.6] },
            { name: 'Food & Grocery',                   values: [11.8, 14.2,  -4.2] },
            { name: 'Restaurants & Dining',             values: [13.2, 15.6, -18.4] },
            { name: 'Travel & Transportation',          values: [15.4, 18.2, -28.6] },
            { name: 'Healthcare & Medical',             values: [10.8, 13.4,  -4.0] },
            { name: 'Entertainment & Leisure',          values: [13.6, 16.2, -22.4] },
            { name: 'Digital Goods & Subscriptions',   values: [16.8, 20.4,  14.2] },
            { name: 'Utilities & Telecommunications',   values: [10.2, 12.8,  -2.8] },
            { name: 'Professional & Business Services', values: [11.4, 14.2,  -6.2] },
            { name: 'Government & Education',           values: [ 9.2, 11.8,  -4.8] },
            { name: 'Automotive & Fuel',                values: [ 8.8, 11.4, -16.4] },
            { name: 'Other',                            values: [11.2, 13.8,  -8.2] }
          ]
        },
        topCitiesSpend: [
          { city: 'Santiago',     value: 1.974 },
          { city: 'Concepción',   value: 0.282 },
          { city: 'Antofagasta',  value: 0.231 },
          { city: 'Valparaíso',   value: 0.214 },
          { city: 'Viña del Mar', value: 0.113 }
        ],
        topCitiesYoY: [
          { city: 'Santiago',     pct: 13.5 },
          { city: 'Concepción',   pct: 13.2 },
          { city: 'Antofagasta',  pct: 12.8 },
          { city: 'Valparaíso',   pct: 12.4 },
          { city: 'Viña del Mar', pct: 11.8 }
        ],
        cardType: { credit: 42, debit: 50, prepaid: 8, total: 2.82 },
        crossBorderTicket: { overall: 65.20, domestic: 54.80, inbound: 96.20, outbound: 105.40 },
        crossBorderSpend:  { overall: 2.82, domestic: 2.115, inbound: 0.395, outbound: 0.310 }
      }
    },

    /* ── 2021 ── */
    2021: {
      totalSpend: {
        monthly: {
          current:       [3.61, 3.34, 3.23, 2.96, 2.85, 2.85, 2.85, 2.96, 3.23, 3.23, 3.34, 3.53],
          previous:      [3.50, 3.30, 2.80, 1.98, 1.80, 1.80, 2.31, 2.48, 2.48, 2.80, 3.50, 4.25],
          twoYearsPrior: [3.45, 3.28, 3.35, 3.02, 2.74, 2.91, 2.79, 3.05, 3.15, 2.68, 2.30, 2.82]
        },
        industrySpend: [
          { name: 'Retail',                           value: 6.84 },
          { name: 'Travel & Transportation',          value: 5.32 },
          { name: 'Food & Grocery',                   value: 4.56 },
          { name: 'Restaurants & Dining',             value: 4.18 },
          { name: 'Healthcare & Medical',             value: 3.04 },
          { name: 'Professional & Business Services', value: 3.04 },
          { name: 'Utilities & Telecommunications',   value: 2.66 },
          { name: 'Entertainment & Leisure',          value: 2.28 },
          { name: 'Digital Goods & Subscriptions',   value: 1.90 },
          { name: 'Government & Education',           value: 1.90 },
          { name: 'Automotive & Fuel',                value: 1.52 },
          { name: 'Other',                            value: 0.76 }
        ],
        industryHeatmap: {
          years: [2021, 2020, 2019],
          rows: [
            { name: 'Retail',                           values: [14.8,  -8.6,  5.2] },
            { name: 'Travel & Transportation',          values: [18.2, -28.6,  6.4] },
            { name: 'Food & Grocery',                   values: [14.2,  -4.2,  4.8] },
            { name: 'Restaurants & Dining',             values: [15.6, -18.4,  5.8] },
            { name: 'Healthcare & Medical',             values: [13.4,  -4.0,  4.4] },
            { name: 'Professional & Business Services', values: [14.2,  -6.2,  5.2] },
            { name: 'Utilities & Telecommunications',   values: [12.8,  -2.8,  4.0] },
            { name: 'Entertainment & Leisure',          values: [16.2, -22.4,  5.8] },
            { name: 'Digital Goods & Subscriptions',   values: [20.4,  14.2, 12.8] },
            { name: 'Government & Education',           values: [11.8,  -4.8,  3.8] },
            { name: 'Automotive & Fuel',                values: [11.4, -16.4,  4.2] },
            { name: 'Other',                            values: [13.8,  -8.2,  4.6] }
          ]
        },
        topCitiesSpend: [
          { city: 'Santiago',     value: 25.84 },
          { city: 'Concepción',   value:  3.80 },
          { city: 'Valparaíso',   value:  3.42 },
          { city: 'Antofagasta',  value:  3.04 },
          { city: 'Viña del Mar', value:  1.90 }
        ],
        topCitiesYoY: [
          { city: 'Antofagasta',  pct: 16.4 },
          { city: 'Santiago',     pct: 15.2 },
          { city: 'Concepción',   pct: 14.8 },
          { city: 'Valparaíso',   pct: 14.2 },
          { city: 'Viña del Mar', pct: 13.6 }
        ],
        cardType: { credit: 45, debit: 47, prepaid: 8, total: 38.00 },
        crossBorderTicket: { overall: 61.80, domestic: 52.40, inbound: 91.60, outbound: 100.20 },
        crossBorderSpend:  { overall: 38.00, domestic: 27.36, inbound: 6.84, outbound: 3.80 }
      },
      totalTransactions: {
        monthly: {
          current:       [0.230, 0.213, 0.213, 0.200, 0.195, 0.195, 0.195, 0.200, 0.213, 0.213, 0.213, 0.221],
          previous:      [0.230, 0.219, 0.185, 0.128, 0.116, 0.116, 0.162, 0.174, 0.174, 0.196, 0.230, 0.270],
          twoYearsPrior: [0.222, 0.208, 0.216, 0.204, 0.188, 0.198, 0.190, 0.205, 0.208, 0.180, 0.152, 0.188]
        },
        industrySpend: [
          { name: 'Retail',                           value: 0.550 },
          { name: 'Food & Grocery',                   value: 0.375 },
          { name: 'Restaurants & Dining',             value: 0.350 },
          { name: 'Travel & Transportation',          value: 0.225 },
          { name: 'Healthcare & Medical',             value: 0.200 },
          { name: 'Entertainment & Leisure',          value: 0.175 },
          { name: 'Digital Goods & Subscriptions',   value: 0.150 },
          { name: 'Utilities & Telecommunications',   value: 0.150 },
          { name: 'Professional & Business Services', value: 0.150 },
          { name: 'Government & Education',           value: 0.100 },
          { name: 'Automotive & Fuel',                value: 0.050 },
          { name: 'Other',                            value: 0.025 }
        ],
        industryHeatmap: {
          years: [2021, 2020, 2019],
          rows: [
            { name: 'Retail',                           values: [14.8,  -8.6,  5.2] },
            { name: 'Food & Grocery',                   values: [14.2,  -4.2,  4.8] },
            { name: 'Restaurants & Dining',             values: [15.6, -18.4,  5.8] },
            { name: 'Travel & Transportation',          values: [18.2, -28.6,  6.4] },
            { name: 'Healthcare & Medical',             values: [13.4,  -4.0,  4.4] },
            { name: 'Entertainment & Leisure',          values: [16.2, -22.4,  5.8] },
            { name: 'Digital Goods & Subscriptions',   values: [20.4,  14.2, 12.8] },
            { name: 'Utilities & Telecommunications',   values: [12.8,  -2.8,  4.0] },
            { name: 'Professional & Business Services', values: [14.2,  -6.2,  5.2] },
            { name: 'Government & Education',           values: [11.8,  -4.8,  3.8] },
            { name: 'Automotive & Fuel',                values: [11.4, -16.4,  4.2] },
            { name: 'Other',                            values: [13.8,  -8.2,  4.6] }
          ]
        },
        topCitiesSpend: [
          { city: 'Santiago',     value: 1.750 },
          { city: 'Concepción',   value: 0.250 },
          { city: 'Antofagasta',  value: 0.205 },
          { city: 'Valparaíso',   value: 0.190 },
          { city: 'Viña del Mar', value: 0.100 }
        ],
        topCitiesYoY: [
          { city: 'Antofagasta',  pct: 16.4 },
          { city: 'Santiago',     pct: 15.2 },
          { city: 'Concepción',   pct: 14.8 },
          { city: 'Valparaíso',   pct: 14.2 },
          { city: 'Viña del Mar', pct: 13.6 }
        ],
        cardType: { credit: 42, debit: 50, prepaid: 8, total: 2.50 },
        crossBorderTicket: { overall: 61.80, domestic: 52.40, inbound: 91.60, outbound: 100.20 },
        crossBorderSpend:  { overall: 2.50, domestic: 1.875, inbound: 0.350, outbound: 0.275 }
      }
    }

  } /* end chile */

}; /* end DATA */

/* ── getData: applies TX and card-type multipliers on the fly ──────── */
function getData(country, year, valueType, transactionType, cardType) {
  const base = DATA[country]?.[year]?.[valueType];
  if (!base) return null;

  const txMult   = TX_MULT[valueType]?.[transactionType]   ?? 1;
  const cardMult = CARD_SHARE[transactionType]?.[cardType] ?? 1;
  const mult     = txMult * cardMult;

  const pct = CARD_PCT[country]?.[transactionType]
    ?? { credit: base.cardType.credit, debit: base.cardType.debit, prepaid: base.cardType.prepaid };

  if (mult === 1 && transactionType === 'all') return base;

  const sc    = v   => v === null ? null : Math.round(v * mult * 1000000) / 1000000;
  const scArr = arr => arr.map(sc);

  return {
    monthly: {
      current:       scArr(base.monthly.current),
      previous:      scArr(base.monthly.previous),
      twoYearsPrior: scArr(base.monthly.twoYearsPrior)
    },
    industrySpend:   base.industrySpend.map(r => ({ name: r.name, value: sc(r.value) })),
    industryHeatmap: base.industryHeatmap,
    topCitiesSpend:  base.topCitiesSpend.map(r => ({ city: r.city, value: sc(r.value) })),
    topCitiesYoY:    base.topCitiesYoY,
    cardType: {
      credit:  pct.credit,
      debit:   pct.debit,
      prepaid: pct.prepaid,
      total:   sc(base.cardType.total)
    },
    crossBorderTicket: base.crossBorderTicket,
    crossBorderSpend: {
      overall:  sc(base.crossBorderSpend.overall),
      domestic: sc(base.crossBorderSpend.domestic),
      inbound:  sc(base.crossBorderSpend.inbound),
      outbound: sc(base.crossBorderSpend.outbound)
    }
  };
}
