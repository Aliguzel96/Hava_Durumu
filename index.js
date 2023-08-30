const apikey = "729233f1a8f610f16d36686b30d195bf";

const weatherDataElement = document.getElementById("weather-data")

const cityInputElement = document.getElementById("city-input")

const formElement = document.querySelector("form")

formElement.addEventListener("submit", (event)=>{
    event.preventDefault();
    const cityValue = cityInputElement.value;
    getWeatherData(cityValue);

});


async function getWeatherData(cityValue){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)

        if(!response.ok){
            throw new Error("Bağlantı Kurulamadı!")
        }

        const data = await response.json()
        //console.log(data);
        const temperature = Math.round(data.main.temp)

        const description = data.weather[0].description

        const icon = data.weather[0].icon

        const details = [
            `Hissedilen: ${Math.round(data.main.feels_like)}°C`,
            `Nem: %${Math.round(data.main.humidity)}`,
            `Rüzgar Hızı: ${Math.round(data.wind.speed)} m/s`
        ]


        weatherDataElement.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">` 
        weatherDataElement.querySelector(".temperature").textContent = `${temperature}°C`;
        weatherDataElement.querySelector(".description").textContent = `${description}`;

        weatherDataElement.querySelector(".details").innerHTML = details.map((detail)=>`<div>${detail}</div>`).join("");

    } catch (error) {
        weatherDataElement.querySelector(".icon").innerHTML = "";
        weatherDataElement.querySelector(".temperature").textContent = "";
        weatherDataElement.querySelector(".description").textContent = "Verilere ulaşırken hata meydana geldi";

        weatherDataElement.querySelector(".details").innerHTML = "";
    }
}