const axios = require("../utils/axios");
const qs = require("querystring");
const appConfig = require("../config");
const validationResult = require("express-validator").validationResult;

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  if (validationResult(req).isEmpty()) {
    try {
      const authenticationRequestBody = {
        client_id: appConfig.authenticationClientId,
        client_secret: appConfig.authenticationClientSecret,
        grant_type: appConfig.authenticationType,
        username: username,
        password: password,
      };
      // Authenticate from GeoNode backend
      const authenticationResponse = await axios.post(
        "o/token/",
        qs.stringify(authenticationRequestBody),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      req.session.accessToken = authenticationResponse.data.access_token;
      req.session.refreshToken = authenticationResponse.data.refresh_token;
      
      const profileResponse = await axios.get("api/profiles/", {
        params: { username },
      });

      const requestedProfile = profileResponse.data.objects[0];
      req.session.currentUser = {
        username,
        firstName: requestedProfile.first_name,
        lastName: requestedProfile.last_name,
        id: requestedProfile.id,
        avatar: requestedProfile.avatar_100,
        dateJoined: new Date(requestedProfile.date_joined),
        accessToken: authenticationResponse.data.access_token,
        refreshToken: authenticationResponse.data.refresh_token,
        expires: null,
      };
      res.redirect("/");
    } catch (error) {
      console.log(error);
      req.flash("authError", error.message);
      res.redirect("/login");
    }
  } else {
    req.flash("validationErrors", validationResult(req).array());
    res.redirect("/login");
  }
};

exports.logout = async (req, res, next) => {
  const logoutRequestBody = {
    client_id: appConfig.clientId,
    client_secret: appConfig.clientSecret,
    token: req.session.accessToken,
  };
  try {
    // await axios.post("o/revoke_token/", qs.stringify(logoutRequestBody), {
    //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
    // });
    req.session.destroy(() => {
      return res.redirect("/login");
    });
  } catch (error) {
    console.log(error);
  }
};
