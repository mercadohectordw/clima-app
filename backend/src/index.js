const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({
  credentials: true,
  origin: ["http::localhost:4200"]
}))

app.get("/api/weather", async (req, res) => {
  
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
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
  
  res.status(200).send("oky");
});

app.listen(port, () => {
  console.log(`Api loaded on port ${port}`);
})