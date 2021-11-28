const { request } = require("express");
const express = require("express");

const users = {

}

const router = express.Router();
router.get("/login", (request, response) => {
    response.status(200).end();
    //todo implement autentication
});

router.post("/register", (request, response) => {
    response.status(200).end();
    //todo implement registration
});

module.exports = router;