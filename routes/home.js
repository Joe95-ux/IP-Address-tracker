const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");


const apiKey = process.env.API_KEY;
const url = "https://geo.ipify.org/api/v2/country,city?apiKey=" + apiKey;

router.get("/", async (req, res) => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      const {ip,location, isp} =  result;
      res.render("home", {
        ip,location,isp
      });
    } catch (e) {
      console.log(e);
    }
});




module.exports = router;