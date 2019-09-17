const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const axios = require("axios");

// Initialize Express
const app = express();

const PORT = 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up a static folder
app.use(express.static('public'));

// Database configuration
var databaseUrl = "scraperdb";
var collections = ["articles"];

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/scraperdb", { useNewUrlParser: true });

////var db = mongoose(databaseUrl, collections);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("we're connected!");
});


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

  });

  //db.articles.insert(pgresults, function (err) {
  //  if (err) return res.json({ err: err.message });

  //Send a message to the client
  res.send("Scrape Complete");

  $("#root").append(pgresults);

  //});




  // Start the server
  app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
  });

});

