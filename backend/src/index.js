const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin: '*',
}))

app.get("/api/test", (req, res) => {
  res.status(200).send("Todo OK");
});

app.post("/api/weather", async (req, res) => {
  
  let days = 3;
  let latitude = req.body.latitude;
  let longitude = req.body.longitude;
  let lang = req.body.lang;

  let url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${latitude}%2C${longitude}&days=${days}&lang=${lang}`;


  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };
  
  fetch(url, options)
    .then( async(response) => {
      let weatherComplete = await response.json();
      res.status(200).json(weatherComplete);
    })
    .catch(err => {
      res.status(400).send("Problema en el ingreso de datos.");
    });
});

app.listen(port, () => {
  console.log(`Api loaded on port ${port}`);
})