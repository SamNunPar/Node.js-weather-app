const weatherForm = document.querySelector('form')
const weatherSearch = document.querySelector('input')
const ubicacion = document.querySelector('#msg1')
const clima = document.querySelector('#msg2') 


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = weatherSearch.value

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                ubicacion.textContent = data.error
            }else {
                ubicacion.textContent = ('Ubicacion: ' + data.location)
                clima.textContent = ('Clima: ' + data.forecast)
            }
        })
    })
})