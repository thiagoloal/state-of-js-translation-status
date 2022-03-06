// @ts-check
const axios = require("axios").default;

const retryer = require("../common/retryer");

const {
  request,
  logger,
  CustomError,
} = require("../common/utils");

require("dotenv").config();

/**
 * @param {string} locale
 */
const fetcher = (locale) => {
  return request(
    {
      query: `
      {
        locale(localeId: "${locale}") {
          id
          completion
          totalCount
          translatedCount
          label
        }
      }
      `
    },
    {},
  );
};


/**
 * @param {string} locale
 */
async function fetchStats(
  locale
) {

  let res = await retryer(() => fetcher(locale),{});

  if (res.data.errors) {
    logger.error(res.data.errors);
    throw new CustomError(
      res.data.errors[0].message || "Could not fetch user",
      CustomError.USER_NOT_FOUND,
    );
  }
  console.log(res.data.data)

  const  { totalCount, translatedCount, label } = res.data.data.locale;
  const percentage = (translatedCount / totalCount) * 100
  return { percentage, locale, label };
}

module.exports = fetchStats;
