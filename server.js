const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const axios = require("axios");
const db = require('./src/models')

// Initialize Express
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up a static folder
app.use(express.static('public'));


// Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraperdb";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Routes

app.get("/scrape", function (req, res) {

  // Use axious to submit get request for webpage
  //axios.get("http://www.usatoday.com/sports/").then(function (response) {

  axios.get("https://www.cnet.com").then(function (response) {

    // Use the cheerio selectors to locate the link and title components
    var $ = cheerio.load(response.data);

    // Create an array to hold results of scraping
    var pgresults = [];

    // Use cheerio selectors to find desired web page components

    $(".latestScrollItems h3").each(function (i, element) {



      // Locate the Link and Text of the news articles shown
      var title = $(element).text();

      var link = $(element)
        .children("a")
        .attr("href");

      // Load link results and text into pgresults array

      pgresults.push({
        title: title,
        link: link
      });


    });

    console.log(pgresults);

    db.Articles.insertMany(pgresults, function (err, data) {

      if (err) return res.json({ err: err.message });

      //Send a message to the client
      res.send(data);

    });

  });

  app.get('/articles', function (req, res) {
    db.find()
    res.json()
  })

  //db.articles.insert(pgresults, function (err) {

  //  if (err) return res.json({ err: err.message });

  //Send a message to the client
  //  res.send("Scrape Complete");

  //});


});

// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});