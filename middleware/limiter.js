const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: "Trop de requêtes effectuées, veuillez réessayer plus tard.",
  standardHeaders: true,
});

module.exports = limiter;
