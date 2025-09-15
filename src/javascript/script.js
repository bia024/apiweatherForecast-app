document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#city_name').value;

    if(!cityName) {
         document.querySelector("#weather").classList.remove('show');
        showAlert('Você precisa digitar alguma cidade...');
        return;
    }

    const apiKey = 'c5e288f38ce85a64511e93ff2137087e';  // Coloque sua API key aqui   
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`
    const results = await fetch(apiUrl);
    const json = await results.json();

    if (json.cod === 200) {
        showInformations({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].tempIcon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity,

        });
    } else {
         document.querySelector("#weather").classList.remove('show');

        showAlert(`
            Não foi possível localizar esta cidade...
            Verifique se o nome está correto ou se a cidade existe.
            <img src="src/images/not-found-pg.svg"/>
            `);
    }
});

function showInformations(json){
    showAlert('');
    document.querySelector("#weather").classList.add('show');
    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`; /*esse ta pegando */
    document.querySelector('#temperature_value').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>°C</sup>`;
    document.querySelector('#temperature_description').innerHTML = `${json.description}`;
    document.querySelector('#temperature_max').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.',',')} <sup>°C</sup>`;
    document.querySelector('#humidity').innerHTML = `${json.humidity}%`;
    document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(1)} km/h`;
}

function showAlert(message) {
    document.querySelector('#alert').innerHTML = message;
} 