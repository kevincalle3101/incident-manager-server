const { Router } = require("express");
const auth = require('./authRoutes');
const incidence = require('./incidencesRoutes');

const router = Router();
router.use("/auth", auth);
router.use("/incidence", incidence);


module.exports = router;
