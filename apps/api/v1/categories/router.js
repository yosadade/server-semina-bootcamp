// import router dari express
const express = require("express");
const router = express();

// import product controller
const { create, index, find, update, destroy } = require("./controller");

// pasangkan route endpoint dengan method `create`
router.get("/categories", index);
router.get("/categories/:id", find);
router.put("/categories/:id", update);
router.post("/categories", create);
router.delete("/categories/:id", destroy);

// export router
module.exports = router;
