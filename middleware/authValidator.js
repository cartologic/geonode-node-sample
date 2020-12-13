const check = require("express-validator").check;

exports.loginValidator = (req, res, next) => {
  const { username, password } = req;
  check(username).not().isEmpty().withMessage("Username is required"),
    check(password)
      .not()
      .isEmpty()
      .withMessage("Password is required")
      .isLength({ min: 3 })
      .withMessage("Password must be at least 3 charachters");
  next();
};
