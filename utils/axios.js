const axios = require("axios");
const appConfig = require("../config");

/**
 * Axios instance to be used for all website API calls
 */
const defaultAxios = axios.create({
  baseURL: appConfig.serverBaseURL,
});

module.exports = defaultAxios;
