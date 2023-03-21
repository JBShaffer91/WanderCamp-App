const fetch = require('node-fetch');

const getCoordinates = async (req, res, next) => {
  try {
    const location = req.query.location;
    const apiKey = process.env.OPEN_CAGE_API_KEY;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();
    const coordinates = data.results[0].geometry;

    req.coordinates = coordinates;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}

module.exports = { getCoordinates };
