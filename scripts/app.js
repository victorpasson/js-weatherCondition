/* 
    Variables
*/

const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

/* 
    Events
*/

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    const city = cityForm.city.value.trim().toLowerCase();
    cityForm.reset();

    // update the ui with new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    // set local storage
    window.localStorage.setItem('city', city)
});

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('city')) {
        updateCity(localStorage.getItem('city'))
            .then(data => updateUI(data))
            .catch(err => console.log(err));
    }
});

/* 
    Functions
*/

const updateCity = async (city) => {

    const cityDetails = await getCity(city);
    const weather = await getWather(cityDetails.Key);

    return {
        // Does the exactly same thing as, because we're just saying to presuming that the property name is the same as the variable name.
        cityDetails,
        weather
    };

}

const updateUI = (data) => {

    /* 
    const cityDetails = data.cityDetails;
    const weather = data.weather; 
    */

    // destructure properties: make the same thing as above, but in a more elegant way
    // The constants must be the same name as the properties that we're getting from the object
    const { cityDetails, weather } = data;

    // update details template
    details.innerHTML = `
        <h5 class="my-3 h2">${cityDetails.LocalizedName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span><span>&deg;C</span>
        </div>
    `

    // update the night/day
    /*
        Ternary Operator: the ternary operator in JavaScript give us a way to check a certain condition to see whether it's true or false, and then based on that condition, we can run one of two different pieces of code.
    */
    let timeSrc = (weather.IsDayTime) ? 'img/day.svg' : 'img/night.svg';

    time.setAttribute('src', timeSrc);
    time.setAttribute('alt', weather.WeatherText);

    // update the icon
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
    icon.setAttribute('alt', weather.WeatherText);



    // remove the d-none class if present
    //card.classList.toggle('d-none', false);
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
}

