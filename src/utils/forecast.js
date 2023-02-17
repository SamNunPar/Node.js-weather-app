const request = require("request");

const forecast = (longitud, latitud, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=6ee010d7ae64f8694c085607bce76c69&query=" +
    latitud +
    "," +
    longitud;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("No se puede conectar con el servicio de clima", undefined);
    } else if (body.success === false) {
      callback("No se pudo encontrar la ubicacion", undefined);
    } else {
      callback(
        undefined,
          {
          weatherD:  body.current.weather_descriptions[0],
          temperature: body.current.temperature,
          feelslike : body.current.feelslike,
          time: body.current.observation_time,
          icon: body.current.weather_icons[0]
          }

      );
    }
  });
};

module.exports = forecast;
