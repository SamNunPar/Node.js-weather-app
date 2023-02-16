const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2FtbnVucCIsImEiOiJjbGR4OXh3NjQwN3poM3BvdmZ2ZmVnYTg1In0.zVOOuYhVlHTqNdZFwDcznQ&limit=1'
    
    request({ url, json: true}, (error, {body}) => {
      if(error){
        callback('No es posible conectar con los servidores', undefined)
      } else if(body.features.length === 0){
        callback('No es posible localizar la ubicacion. Prueba con otra busqueda', undefined)
      }else{
        callback(undefined, {
          latitud: body.features[0].geometry.coordinates[1],
          longitud: body.features[0].geometry.coordinates[0],
          location: body.features[0].place_name
        })
      }
    })
}

module.exports = geocode

//No le sabes jsjsjsjs