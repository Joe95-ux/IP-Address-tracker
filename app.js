require("dotenv").config();
const express = require("express");
const _ = require("lodash");
const ejs = require("ejs");
const fetch = require("node-fetch");
const { query } = require("express");

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

const apiKey = process.env.API_KEY;
const url = "https://geo.ipify.org/api/v1?apiKey=" + apiKey;

//validate ip address
function validateIpAddress(ipaddress) {
  const ipformat =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (ipaddress.match(ipformat)) {
    return true;
  } else {
    return false;
  }
}

//validate domain
function validateDomain(domain) {
  const domainformat =
    /^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/;
  if (domain.match(domainformat)) {
    return true;
  } else {
    return false;
  }
}

app.get("/", async (req, res) => {
  try {
    const response = await fetch(url);
    const result = await response.json();
    const ip = await result.ip;
    const city = await result.location.city;
    const region = await result.location.region;
    const timezone = await result.location.timezone;
    const lat = await result.location.lat;
    const lng = await result.location.lng;
    const isp = await result.isp;
    res.render("home", {
      ip,
      city,
      region,
      timezone,
      lat,
      lng,
      isp,
    });
  } catch (e) {
    console.log(e);
  }
});

//get result if domain is passed
async function getDomainData(domain) {
  try {
    const response = await fetch(
      `https://geo.ipify.org/api/v1?apiKey=${apiKey}&domain=${domain}`
    );
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

// get result if ipd address is passed
async function getIpData(ip) {
  try {
    const response = await fetch(
      `https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ip}`
    );
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

app.get("/search", async (req, res) => {
  const query = req.query.query;
  const validDomain = validateDomain(query);
  const validIp = validateIpAddress(query);
  let result = "";
  if (validDomain) {
    result = await getDomainData(query);
  } else if (validIp) {
    result = await getIpData(query);
  } else {
    result = "";
  }

  res.render("search", {
    result: result,
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server running  on port ${PORT}`));

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
