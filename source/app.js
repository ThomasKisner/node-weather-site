const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for expres config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Tom"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "HELP!!!",
    message: "SAVE ME",
    name: "Tom"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Tom"
  });
});

app.get("/title", (req, res) => {
  res.send("Title");
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({"error": "An address must be provided"});
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({error});
    }

    forecast(longitude, latitude, (error, forecastData) => {
      if (error) {
        return res.send("There was an error getting forecast");
      }
      res.send({
        address: location,
        forecast: forecastData
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help article not found",
    name: "Tom",
    error: "Page does not exist"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Page not found",
    name: "Tom",
    error: "Page not found"
  });
});

app.listen(3000, () => {
  console.log("Server is runnning on port 3000");
});
