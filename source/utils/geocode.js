const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoidGpraXNuZXIiLCJhIjoiY2p3NHpjOWJnMW50aTRhcXBmdXZvNnlkYSJ9.W46mLaSAH9AUW9Y3eP9F_A&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to location services", undefined);
    } else if (body.features.length === 0) {
      callback("unable to find a location matching search term", undefined);
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
