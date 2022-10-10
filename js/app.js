// Variaveis e selecao dos elementos
const apiKey = "b96872ef762895b956f8d86448364361"
const apiCountryURL = "https://countryflagsapi.com/png/"
    // Elementos de Input + Botao
const cityInput = document.querySelector('#city-input')
const searchBtn = document.querySelector('#search')
    // Elementos que serao jogados na tala: dados da API
const cityElement = document.querySelector("#city")
const tempElement = document.querySelector("#temperature span")
const descElement = document.querySelector("#description")
const weatherIconElement = document.querySelector("#weather-icon")
const countryElement = document.querySelector("#country")
const humidityElement = document.querySelector("#humidity span")
const windElement = document.querySelector("#wind span")

const weatherContainer = document.querySelector("#weather-data")

// Functions

    // Funcao para Acessar API e Retornar na Tela. Logica & Dom.

const getWeatherData = async(city) => {

    const apiWeatherURL =` https://api.openweathermap.org/data/2.5/weather?q=${city}&&units=metric&appid=${apiKey}&lang=pt-br`

    const res = await fetch(apiWeatherURL) //Espera o fetch.. await fetch()..
    const data = await res.json()  // Recebe os dados e passa Para JSON()..

    //console.log(data)  - Resposta da API - dados
    return data
}



const showWeatherData = async (city) => {
   const data = await getWeatherData(city)

   cityElement.innerText = data.name
   tempElement.innerText = parseInt(data.main.temp)
   descElement.innerText = data.weather[0].description
   weatherIconElement.setAttribute(
    "src", 
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
    countryElement.setAttribute("src", apiCountryURL + data.sys.country)
    humidityElement.innerText = `${data.main.humidity}%`
    windElement.innerText = `${data.wind.speed}km/h `

    weatherContainer.classList.remove("hide")
}




// Eventos

    // Evento de Click:
searchBtn.addEventListener("click", (e) => {
    e.preventDefault()

    const city = cityInput.value

    showWeatherData(city)
})

    // Evento de Keypress: 'Enter'
cityInput.addEventListener("keypress", (e) => {
    const key = e.key
    if(key === 'Enter'){

        const city = cityInput.value

        showWeatherData(city)
        
    }
})

// Tratamento de Dados - Caso usuario digite errado!

// Spinner de loading. carregamento do Background de acordo com o Input selecionado; com API da splash.