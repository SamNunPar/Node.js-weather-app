const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Samuel Nungaray',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Sobre Mi',
    name: 'Samuel Nungaray',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Pagina de ayuda',
    name: 'Samuel Nungaray',
    helpText: 'Este es un texto de ayuda',
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Samuel Nungaray',
    errorMsg: 'Help article not found'
  });
});

app.get('/weather', (req, res) => {
  if(!req.query.address){
    return res.send({
      error: 'Por favor, ingrese una direccion'
    })
  }

  //Coordenadas usando el nombre de la ubicacion
  geocode(req.query.address, (error, { latitud, longitud, location } = {}) => {
    if(error){
      return res.send(error)
    }

    //Datos metereologicos usando coordenadas
    forecast(longitud, latitud, (error, forecastData) => {
      if(error){
        return res.send({ error })
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'Por favor, ingrese un termino de busqueda'
    })
  }

  console.log(req.query)
  res.send({
    products: []
  })
})

app.get('/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Samuel Nungaray',
    errorMsg: 'Page not found'
  });
});

app.listen(port, () => {
  console.log('Server is on port ' + port + '.');
});
