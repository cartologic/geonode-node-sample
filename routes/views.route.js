const router = require("express").Router();
const axios = require("../utils/axios");

router.get("/login", (req, res, next) => {
  res.render("login", {
    authError: req.flash("authError")[0],
    validationErrors: req.flash("validationErrors"),
    currentUser: req.session.currentUser || null,
    pageTitle: "Login",
  });
});

router.get("/", async (req, res, next) => {
  const token = req.session.accessToken || null;
  try {
    const { data } = await axios.get(`/api/layers/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const layers = data.objects.map((layer) => {
      return {
        uuid: layer.uuid,
        title: layer.title,
        abstract: layer.abstract,
        thumbnail: layer.thumbnail_url,
        date: layer.date.split("T")[0],
        url: layer.detail_url,
        viewCount: layer.popular_count,
        ownerName: layer.owner_name,
      };
    });
    return res.render("index", {
      pageTitle: "Home",
      currentUser: req.session.currentUser || null,
      layers,
    });
  } catch (err) {
    console.log(err.message);
    return res.render("index", {
      pageTitle: "Home",
      currentUser: req.session.currentUser || null,
      layers: [],
    });
  }
});

module.exports = router;
