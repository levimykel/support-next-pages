const prismic = require("@prismicio/client");
const sm = require("./slicemachine.config.json");

const localeOverrides = {
  "fr-fr": "fr",
};

/** @returns {Promise<import('next').NextConfig>} */
module.exports = async () => {
  const client = prismic.createClient(sm.repositoryName);

  const repository = await client.getRepository();
  // const locales = repository.languages.map((lang) => lang.id)
  const locales = repository.languages.map(
    (lang) => localeOverrides[lang.id] || lang.id
  );

  return {
    reactStrictMode: true,
    i18n: {
      locales,
      // This is the default locale. It will not be included in URLs.
      defaultLocale: locales[0],
      // defaultLocale: 'en-ca'
      localeDetection: false,
    },
  };
};
