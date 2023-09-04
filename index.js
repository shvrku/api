const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();

app.get('/', async function(req, res) {
  try {
    const url = 'https://tracker.gg/valorant/profile/riot/shvrku%23yours/overview';

    // Make an HTTP GET request using axios
    const response = await axios.get(url);

    // Load the response data into cheerio
    const $ = cheerio.load(response.data);

    // Select the desired elements and extract text
    const Rank = $('.flex > :nth-child(1) > .stat__value').text();
    
    // Assuming HS% is stored in an element with a specific class name
    const HSPercentage = $('.giant-stats > :nth-child(3) > .wrapper > .numbers > .value').text();

    const WinRate = $('.giant-stats > :nth-child(4) > .wrapper > .numbers > .value').text()
    // Create a JSON response with the desired structure
    const json = { "Rank": Rank, "HS%": HSPercentage, "Win %": WinRate };

    // Send the JSON as a response to the client
    res.send(json);
  } catch (error) {
    // Handle errors by sending an error response
    console.error(error);
    res.status(500).send({ error: 'An error occurred' });
  }
});

app.listen(process.env.PORT || 5000);
module.exports = app;
