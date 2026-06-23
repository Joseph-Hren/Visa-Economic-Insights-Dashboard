# visa-vgih

Project instructions and context for Claude Code.

Visa Global Insights Hub (VGIH)



What This Is

An interactive economic data dashboard for Visa's Government Insights Hub. Five filter dropdowns control seven data visualizations showing spending trends across five Caribbean Basin countries. This is a portfolio prototype demonstrating data visualization, interactive filter logic, and AI-assisted design-to-code workflow.


Figma file

When reading Figma for component reference, use this file:
https://www.figma.com/design/Ekwh1iMcaMIhrDTJmlMUBu/VGIH?node-id=69160-5737&p=f&t=9OqGOcUrUMinZvQJ-0


File Structure — Strict Separation of Concerns


index.html — markup and structure only. No inline styles. No inline scripts. No data.
styles.css — all visual styling, hover states, responsive breakpoints
data.js — all data arrays and lookup tables. No logic. No DOM manipulation.
charts.js — Chart.js chart initialization and rendering. Reads from data.js. No filter logic.
filters.js — filter state management, dropdown event listeners, orchestrates chart updates
assets/ — logo files and icons


Do not mix these concerns. 


Chart Library

Chart.js — load from CDN:

https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js

Do not use D3, Recharts, or any other library. Chart.js only.

Animation rule: Destroy and recreate each chart on every filter change so charts animate in fresh. Never use chart.update() — always chart.destroy() followed by new Chart().


The Five Filters

FilterOptions - 
Country: Bahamas, Barbados, Belize, Canada, Cayman Islands 
Year: 2021, 2022, 2023, 2024, 2025, 2026 
Value Type: Total Spend, Total Transactions
Transaction Type: All, In-Person, Digital
Card Type: All, Credit, Debit, Prepaid

Default state: Canada / 2026 / Total Spend / All / All


The Seven Charts


Monthly Spend Trends — line chart (default) with bar chart toggle. Three series: Current Year, Previous Year, Two Years Prior. X-axis: 12 months. Y-axis: spend or transaction count depending on Value Type filter.
Industry Spend Overview — horizontal bar chart (default) with heat map of YoY growth toggle. Industries: Retail, Food & Grocery, Restaurants & Dining, Travel & Transportation, Healthcare & Medical, Entertainment & Leisure, Digital Goods & Subscriptions, Utilities & Telecommunications, Professional & Business Services, Government & Education, Automotive & Fuel, Other.
Top 5 Cities by Total Spend — horizontal bar chart. Five cities per country (see city list below). Ranked by value descending.
Top 5 Cities by YoY Growth — ranked list with inline colored bars. Shows percentage growth vs prior year.
Spend by Card Type — donut chart. Segments: Credit, Debit, Prepaid. Shows total in center. When Card Type filter is set to a specific type, highlight that segment.
Cross-Border Average Ticket Size — grouped bar chart. Three groups: Domestic, Inbound, Outbound. Shows average transaction value in USD.
Cross-Border Total Spend — grouped bar chart. Three groups: Domestic, Inbound, Outbound. Shows total spend in USD.



Cities Per Country

Chile: Santiago, Valparaíso, Concepción, Antofagasta, Viña del Mar
Canada: Toronto, Vancouver, Montreal, Calgary, Edmonton
Belize: Belize City, San Ignacio, Orange Walk, Dangriga, Placencia
Cayman Islands: George Town, West Bay, Bodden Town, East End, North Side
Barbados: Bridgetown, Speightstown, Oistins, Holetown, Bathsheba



Data Realism — Critical

Data values must reflect realistic economic scale for each country. Do not generate uniform or arbitrary values.

Approximate annual Total Spend benchmarks (2023 baseline):

Chile: Total spend: ~$45–55 billion USD
Canada: ~$120–140 billion USD
Cayman Islands: ~$3.5–4.5 billion USD
Belize: ~$700M–1 billion USD
Barbados: ~$1.5–2.5 billion USD


Annual Total Transactions benchmarks (2023 baseline):

Chile: ~2.5–3.5 billion transactions
Canada: ~8–10 billion transactions
Cayman Islands: ~180–220 million transactions
Belize: ~40–60 million transactions
Barbados: ~90–120 million transactions


Year-over-year growth pattern 2021–2025:


2021: Recovery year, +8–14% growth across all markets (post-COVID rebound)
2022: Strong growth, +10–16%
2023: Normalization, +5–9%
2024: Steady growth, +4–7%
2025: Moderate growth, +3–6%
2026: Slowing growth, mixed signals, +2–4% YTD through June

Specific for Chile: 
2021: Strong rebound +12–18% — Chile's COVID recovery was faster than regional average, bolstered by early vaccination rollout and government stimulus
2022: High growth +11–15% — commodity export boom (copper) drove consumer spending
2023: Normalization +5–8% — inflation cooling, spending stabilizing
2024: Moderate growth +4–6% — political stability returning after constitutional referendum period
2025: Steady +3–5% — maturing digital payments adoption
2026 YTD: +2–4% — aligned with broader Latin American moderation

Specific for Barbados: 
2021: Strong rebound +10–16% — tourism-dependent economy recovering from COVID travel restrictions
2022: High growth +12–18% — tourism fully resumed, strong visitor spend from US and UK markets
2023: Normalization +5–8%
2024: Steady +4–6%
2025: Moderate +3–5%
2026 YTD: +2–4%

**Year range:** June 2021 through June 2026 (rolling 12-month periods)

The X-axis labels should always show month names (Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec)


Caribbean nations should show higher volatility than Canada. Tourism-dependent economies (Bahamas, Barbados, Cayman Islands) should show stronger rebounds in 2021–2023.

Transaction Type split (approximate):


In-Person: 58–65% of spend, 70–75% of transaction count
Digital: 35–42% of spend, 25–30% of transaction count

Specific for Barbados:
In-Person: ~58–65% of spend, ~70–75% of transaction count
Digital: ~35–42% of spend, ~25–30% of transaction count

Card Type split (approximate):


Credit: 52–58%
Debit: 34–40%
Prepaid: 4–8%

Specific for Chile:
Credit: ~42–48%
Debit: ~44–50%
Prepaid: ~6–10%



Visual Design

Colors — Visa brand palette:

visa-blue: #112AA7
visa-gold: #FCC015
visa-dark-navy: #15195A
red: #AD2929
font-primary: #02041C
font-secondary: #464853
font-tertiary: #808080
component-border: #808080
component-background: #F0F0F0
component-active: #1434CB
graph-border: #ABABAB
graph-line: #CCCACA
chart-blue: #112AA7
chart-light-blue: #98C7E7
chart-violet: #9187D6
chart-lavender: #CDC4E0 chart-light-lavender: #F3F2FD white: #FFFFFF



Typography:

Use only Visa Dialect font for all text. Self-host from assets/fonts/ folder. 

Font files are in assets/fonts/ with this exact naming:
- VisaDialect-Light.woff2 / VisaDialect-Light.woff
- VisaDialect-Medium.woff2 / VisaDialect-Medium.woff  
- VisaDialect-Regular.woff2 / VisaDialect-Regular.woff
- VisaDialect-Semibold.woff2 / VisaDialect-Semibold.woff

Use this @font-face block in styles.css:

@font-face {
  font-family: 'Visa Dialect';
  src: url('assets/fonts/VisaDialect-Light.woff2') format('woff2'),
       url('assets/fonts/VisaDialect-Light.woff') format('woff');
  font-weight: 300;
}
@font-face {
  font-family: 'Visa Dialect';
  src: url('assets/fonts/VisaDialect-Medium.woff2') format('woff2'),
       url('assets/fonts/VisaDialect-Medium.woff') format('woff');
  font-weight: 500;
}
@font-face {
  font-family: 'Visa Dialect';
  src: url('assets/fonts/VisaDialect-Regular.woff2') format('woff2'),
       url('assets/fonts/VisaDialect-Regular.woff') format('woff');
  font-weight: 400;
}
@font-face {
  font-family: 'Visa Dialect';
  src: url('assets/fonts/VisaDialect-Semibold.woff2') format('woff2'),
       url('assets/fonts/VisaDialect-Semibold.woff') format('woff');
  font-weight: 600;
}

font-family stack: 'Visa Dialect', system-ui, -apple-system, sans-serif




Nav bar:


Background: var(--visa-dark-navy)
Height: 80px
Visa logo left, nav items, icons right
Active nav item: white text, visa gold underline for active link (Economic Insights), subtle blue background pill


Filter bar:


Below nav, above content
White background, component-border 
Dropdowns: component-border color for border, small label above each dropdown
Regular-case (Spend type), label on left, drop-down field on right, visa-blue chevron inside field


Chart panels:


White background
Border-radius: 4px
24 pixels internal padding on charts


Layout:


Max content width: 1600px, centered
Left column: 1158 pixels, right column: 370 pixels
Gap between panels: 24px
Page padding: 24px sides



Layout Structure (top to bottom)


Nav bar (full width, dark navy)
Page title "Economic Insights" semi-bold
Filter bar (five dropdowns in a row)
Two-column panel grid:

Left - two charts: Monthly Spend Trends (main chart), Industry Spend Overview (secondary chart) (stacked)
Right - five charts: Top 5 Cities by Total Spend, Top 5 Cities by YoY Growth, Spend by Card Type, Cross-Border Average Ticket Size, Cross-Border Total Spend (tertiary charts, stacked)






Chart Toggle Behavior — Important

Two charts have independent view toggles that are separate from the five filters:

Chart 1 — Monthly Spend Trends has a Line Chart / Bar Chart toggle.
Chart 2 — Industry Spend Overview has an Industry by Total Spend / Heat Map of YoY Growth toggle.

These toggles behave differently from filters:


Clicking a chart toggle changes only that chart's visualization type
All other six charts remain completely unchanged
The five filter dropdowns are unaffected
The toggle state is independent of filter state — if the user switches to bar chart, then changes the country filter, the monthly trends chart should still show as a bar chart
Toggle state persists across filter changes until the user explicitly switches it back


Implementation rule: Store each chart's current toggle state as a separate variable in filters.js (e.g. let monthlyChartType = 'line' and let industryChartType = 'bar'). When filters change and charts are destroyed and recreated, read these variables to recreate each chart in its current toggle state, not always defaulting back to the initial type.

Default toggle states:


Monthly Spend Trends: Line chart
Industry Spend Overview: Industry by Total Spend (bar chart)


Session plan:

Session 1: Build the complete UI layout and all seven charts using only Canada / 2026 / Total Spend / All / All hardcoded data. Filters render as dropdowns but do nothing yet. All charts must be reading from a data object in data.js — not from hardcoded numbers inside chart configs. Confirm layout and chart rendering before proceeding.

Session 2: Generate full dataset for all filter combinations in data.js. Charts still show default state.

Session 3: Wire filter logic in filters.js. All five dropdowns become interactive. All seven charts update with animation on filter change.

Session 4: Add chart type toggles (line/bar on monthly trends, bar/heatmap on industry overview). Responsive and mobile layout.


Do Not


Put data arrays in index.html or filters.js or charts.js
Put chart rendering logic in filters.js
Put filter event listeners in charts.js
Use any color not in the palette above
Use any chart library other than Chart.js
Use chart.update() — always destroy and recreate
Invent city names not in the city list above
Generate uniform data values — respect economic scale differences between countries. The Y axis will change to accommodate differences (Canada in billions, other countries in millions)





VGIH Portfolio Prototype | Joseph Hren | Senior/Staff Product Designer