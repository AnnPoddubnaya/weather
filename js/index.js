const cityName = document.querySelector('.header__city');
const discriptions = document.querySelector('.header__descriptions');
const temperature = document.querySelector('.header__temperature');
const headerImage = document.querySelector('.header__image');


const feelsLike = document.querySelector('.footer__value_one');
const pressure = document.querySelector('.footer__value_two');
const humidity = document.querySelector('.footer__value_three');
const speedWind = document.querySelector('.footer__value_four');

const input = document.querySelector('.city');


async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&lang=ru&units=metric&appid=f5020f72bbf9dc540d62747a839345c9`;
    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            // console.log(data);
            cityName.textContent = data.name;

            discriptions.textContent = data.weather[0]['description'];
            temperature.innerHTML = Math.round(data.main.temp) + '&deg';
            headerImage.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png"/>`;

            feelsLike.innerHTML = Math.round(data.main.feels_like) + '&deg';
            pressure.innerHTML = data.main['pressure'] + ' мм рт ст';
            humidity.innerHTML = data.main['humidity'] + ' %';
            speedWind.innerHTML = Math.round(data.wind['speed']) + ' м/с'
        })
        .catch(function () {
            console.log('Error')
        })
}
getWeather();

input.addEventListener('change', getWeather);
input.addEventListener('change', forecast);

async function forecast() {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${input.value}&lang=ru&units=metric&appid=f5020f72bbf9dc540d62747a839345c9`;
    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            // console.log(data);

            const forecastBody = document.querySelector('.main__container');
            let forecasts = '';

            for (let i = 0; i < 6; i++) {
                let item = data.list[i];
                // console.log(item);
                let temp = Math.round(item.main.temp) + '&deg';
                let icon = `<img src="https://openweathermap.org/img/wn/${item.weather[0]['icon']}@2x.png"/>`;
                // console.log(item['dt_txt'])
                let hours = (i === 0 ? 'Cейчас' : `${item['dt_txt'].slice(0, -3).slice(11)}`);
                // console.log(hours);

                let template = `  <div class="main__item">
        <div class="main__time">${hours}</div>
        <div class="main__icon">${icon}</div>
        <div class="main__temperature">${temp}</div>
    </div>`;
                forecasts += template;
            }
            forecastBody.innerHTML = forecasts;

        })
        .catch(function () {
            console.log('Error')
        })
}
forecast();
