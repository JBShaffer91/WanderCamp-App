const fetch = require('node-fetch');

class WeatherController {
  constructor() {
    this.apiKey = process.env.OPENWEATHERMAP_API_KEY;
  }

  async getWeather(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
}

module.exports = new WeatherController();
