const config = {
  PORT: process.env.PORT || 5000,
  SECRET: process.env.SECRET,
  DB_URL: process.env.DB_URL,
  serverBaseURL: "https://summit2020.cartoview.net",
  profileURL: "api/profiles/",
  authenticationURL: "o/token/",
  authenticationType: "password",
  authenticationClientId: "2DkWeRYRYCwidWqtwlA9IvL0AJMoZB6S8iJFLfU2",
  authenticationClientSecret:
    "8OsZciU4N4lkqyBHKFiEJQJuhjTnqzFZeoWsIofIEUTvxQUFu9FDRv2NelHikiGr3M47RpInANd27L862gPtjUWYbX276dQ2qlXDvRIvoob6LvMKNVu4veYieqKMt8tO",
  logoutURL: "o/revoke_token/",
  TOKEN: "7PhTP77OmVu36QKMJboeclKXRxfa4N",
  serverBaseURL: "https://summit2020.cartoview.net",
};

module.exports = config;
