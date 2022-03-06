require("dotenv").config();
const {
  renderError,
  parseBoolean,
  parseArray,
  clampValue,
  CONSTANTS,
} = require("../src/common/utils");
const fetchStats = require("../src/fetchers/state-off-js-fetcher");
const renderStatsCard = require("../src/cards/stats-card");

module.exports = async (req, res) => {
  const {
    hide,
    hide_title,
    hide_border,
    card_width,
    title_color,
    text_color,
    bg_color,
    theme,
    cache_seconds,
    layout,
    langs_count,
    custom_title,
    locale = 'es-ES',
    border_radius,
    border_color,
  } = req.query;
  res.setHeader("Content-Type", "image/svg+xml");

  try {
    const stats = await fetchStats(
      locale
    );
    const cacheSeconds = clampValue(
      parseInt(cache_seconds || CONSTANTS.TWO_HOURS, 10),
      CONSTANTS.TWO_HOURS,
      CONSTANTS.ONE_DAY,
    );

    res.setHeader("Cache-Control", `public, max-age=${cacheSeconds}`);

    return res.send(
      renderStatsCard(stats, {
        custom_title,
        hide_title: parseBoolean(hide_title),
        hide_border: parseBoolean(hide_border),
        card_width: parseInt(card_width, 10),
        hide: parseArray(hide),
        title_color,
        text_color,
        bg_color,
        theme,
        layout,
        langs_count,
        border_radius,
        border_color,
        locale,
      }),
    );
  } catch (err) {
    return res.send(renderError(err.message, err.secondaryMessage));
  }
};
