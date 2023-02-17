const weatherForm = document.querySelector('form')
const weatherSearch = document.querySelector('input')
const ubicacion = document.querySelector('#msg1')
const clima = document.querySelector('#msg2') 
const temperatura = document.querySelector('#msg3')
const sensacionTermica = document.querySelector('#msg4')
const hora = document.querySelector('#msg5')
const icon = document.querySelector('#wicon')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = weatherSearch.value

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                ubicacion.textContent = data.error
            }else {
                ubicacion.textContent = ('Location: ' + data.location + '\n')
                clima.textContent = ('Weather: ' + data.forecast.weatherD)
                temperatura.textContent = ('Temperature: ' + data.forecast.temperature + ' °C')
                sensacionTermica.textContent = ('Thermal sensation: ' + data.forecast.feelslike + ' °C')
                hora.textContent = ('Time in the consulted place: ' + data.forecast.time)
                icon.src = data.forecast.icon
            }
        })
    })
})

/* clima.textContent = ('Clima: ' + data.forecast.) */