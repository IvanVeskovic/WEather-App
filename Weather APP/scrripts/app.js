const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {

    
    // destructure properties
    const {cityDets, weather } = data;
    console.log(cityDets, weather);

    // update details template
    details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `;

    // remove the d-none if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

    // update night/daty & icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';

    time.setAttribute('src', timeSrc);
};

const updateCity = async (city) => {

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {
        cityDets,
        weather
    }
}

cityForm.addEventListener('submit', e => {
    // prevent default action
    e.preventDefault();

    // get citi value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update UI with new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
})