export const compactLayout = {
  name: 'compact',
  svg: (lang:string, percentage: number) => `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="150" viewBox="0 0 300 150" fill="none">
  <style>
    .header {
      font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
      fill: #2f80ed;
      animation: fadeInAnimation 0.8s ease-in-out forwards;
    }
    .sub {
      fill: #bdbdbd;
      font: 500 12px 'Segoe UI', Ubuntu, Sans-Serif;
    }
    .score {
      fill: #ccc;
      font: 900 20px 'Segoe UI', Ubuntu, Sans-Serif;
    }
    @supports(-moz-appearance: auto) {
      /* Selector detects Firefox */
      .header { font-size: 15.5px; }
    }
    .lang-name { font: 400 11px 'Segoe UI', Ubuntu, Sans-Serif; fill: #434d58 }
  </style>
  <rect data-testid="card-bg" x="0.5" y="0.5" rx="4.5" height="99%" stroke="#e4e2e2" width="299" fill="#fffefe" stroke-opacity="1"/>
<g data-testid="card-title" transform="translate(15, 35)">
  <g transform="translate(0, 0)">
<text x="0" y="0" class="header" data-testid="header">Translation status: ${lang}</text>

<text x="0" y="25" class="sub" data-testid="sub">Current percentage of translations on "${lang}"</text>

<text x="0" y="42" class="sub" data-testid="sub">of the State of JS keys</text></g>
</g>
  <g data-testid="main-card-body" transform="translate(15, 95)">
<text x="0" y="13" class="score" data-testid="header">${Math.round(percentage * 100) / 100}%</text><svg data-testid="lang-items" x="0">
<g transform="translate(0, 0)">
<svg width="260" x="0" y="25">
<rect rx="5" ry="5" x="0" y="0" width="260" height="8" fill="#ddd"/>
<rect height="8" fill="#f1e05a" rx="5" ry="5" x="0" y="0" data-testid="lang-progress" width="${Math.round(percentage * 100) / 100}%">
</rect>
</svg>

</g>
</svg>

  </g>
</svg>`
}