// @ts-check
const Card = require("../common/Card");

const {
  getCardColors,
} = require("../common/utils");

const DEFAULT_CARD_WIDTH = 400;
const CARD_PADDING = 25;

const renderSubTitle = (locale) => `
<g data-testid="card-title" transform="translate(0, 10)">
  <g transform="translate(0, 0)">
    <text x="0" y="0" class="sub" data-testid="sub">Current % of translations of 'State of JS' in "${locale}"</text>
  </g>
</g>`

/**
 * @param {string} lang
 * @param {number} width
 * @param {number} percentage
 * @returns {string}
 */
const renderCompactLayout = (lang, width, percentage) => `
  ${renderSubTitle(lang)}
  <g data-testid="main-card-body" transform="translate(0, 35)">
    <text x="0" y="13" class="score" data-testid="header">${Math.round(percentage * 100) / 100}%</text>
    <g data-testid="lang-items" x="0">
      <g transform="translate(0, 25)">
        <rect rx="5" ry="5" x="0" y="0" width="${width - (CARD_PADDING* 2)}" height="10" fill="#ddd"/>
        <rect height="10" fill="#f1e05a" rx="5" ry="5" x="0" y="0" data-testid="lang-progress" width="calc(${Math.round(percentage * 100) / 100}% - ${(CARD_PADDING* 2)}px)">
        </rect>
      </g>
    </g>
  </g>`;

/**
 * @param {Partial<import("./types").StateOfJsOptions>} options
 * @returns {string}
 */
const renderTopLanguages = (options = {}) => {
  const {
    card_width,
    title_color,
    text_color,
    bg_color,
    theme,
    locale,
    percentage,
    border_radius,
    border_color,
  } = options;

  let width = isNaN(card_width) ? DEFAULT_CARD_WIDTH : card_width;
  let height = 150;

  let finalLayout = renderCompactLayout(locale, width, percentage);

  // returns theme based colors with proper overrides and defaults
  const colors = getCardColors({
    title_color,
    text_color,
    bg_color,
    border_color,
    theme,
  });

  const card = new Card({
    defaultTitle: `Translation status: ${locale}`,
    width,
    height,
    border_radius,
    colors,
  });

  card.disableAnimations();
  card.setCSS(
    `
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
      font: 700 30px 'Segoe UI', Ubuntu, Sans-Serif;
    }
    @supports(-moz-appearance: auto) {
      /* Selector detects Firefox */
      .header { font-size: 15.5px; }
    }
    .lang-name { font: 400 11px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${colors.textColor} }`,
  );

  return card.render(`
    <svg data-testid="lang-items" x="${CARD_PADDING}"  viewBox="0 0 ${width} 150" fill="none">
      ${finalLayout}
    </svg>
  `);
};

module.exports = renderTopLanguages;
