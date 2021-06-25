const express = require("express");
const router = express.Router();

const crudService = require("./service/crud");
const authService = require("./service/auth");

// CRUD
router.post("/product/add", crudService.addProduct);
router.get("/product/:product_id?", crudService.getProducts);
router.delete("/product/delete/:product_id?", crudService.delete);
router.patch("/product/edit/:product_id?", crudService.edit);

// AUTH
router.post("/auth/register", authService.register);
router.post("/auth/login", authService.login);
router.get("/auth/token/decode/:token", authService.decodeToken);

module.exports = router;
