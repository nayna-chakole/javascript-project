document.addEventListener('DOMContentLoaded', () => {
    const cityinput = document.getElementById("cityInput");
    const getWeatherBtn = document.getElementById("get-Weather-Btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const tempratureDisplay = document.getElementById("temperature");
    const DescDisplay = document.getElementById("description");
    const humidityDisplay = document.getElementById("humidity");
    const errormessage = document.getElementById("error-message");
    
    const API_KEY = "7be2de1d23bde8abeb55015134dbc6a5"; //env variables


    getWeatherBtn.addEventListener("click", async() => {
    const city = cityinput.value.trim();
    if (!city) return;
        
        //it may throw error 
        //server/database is always in another state or continent

        try{
           const weatherData = await fetchWeatherData(city);
           displayWeatherData(weatherData);
        } catch(error){
            showError();
        }

        cityinput.value = "";
    })

    async function fetchWeatherData(city){
        //get data

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        
        const response = await fetch(url);
        console.log(typeof response);
        console.log("RESPONSE", response);

        if(!response.ok){
            throw new Error("City not found");
        }

        const data = await response.json();
        return data; 
    }

    function displayWeatherData(data){
        //display data

        console.log(data);
        const {name , main , weather} = data;
        cityNameDisplay.textContent = name;
        tempratureDisplay.textContent = `Tempratur :${main.temp}`;
        DescDisplay.textContent = `Weather :${weather[0].description}`;
        humidityDisplay.textContent = `Humidity :${main.humidity}`

        //unlock the display
        weatherInfo.classList.remove("hidden");
        errormessage.classList.add("hidden")

    }

    function showError(){
    weatherInfo.classList.add('hidden');
    errormessage.classList.remove('hidden');
}

     
    const themeBtn = document.getElementById('theme-btn');
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light');
        if(document.body.classList.contains('light')){
            themeBtn.textContent = "🔆";
        } else {
            themeBtn.textContent = "🌙";
        }
    });


})

