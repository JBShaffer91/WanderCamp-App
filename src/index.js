require('dotenv').config()
const express = require('express');
const locationController = require('./controllers/locationController');
const weatherController = require('./controllers/weatherController');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/location', locationController.getLocation);
app.get('/weather', weatherController.getWeather);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
