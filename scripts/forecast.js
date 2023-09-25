class Forecast {
    constructor() {
        this.key = 'ZzzwxxEmZ18rNn9Xp5Vv5cLIZZaVEVSf';
        this.weatherURI = 'https://dataservice.accuweather.com/currentconditions/v1/';
        this.baseCity = 'https://dataservice.accuweather.com/locations/v1/cities/search';
    }
    async updateCity(city) {
        const cityDetails = await this.getCity(city);
        const weather = await this.getWather(cityDetails.Key);

        return { cityDetails, weather };
    }
    async getWather(id) {
        const query = `${id}?apikey=${this.key}`

        const response = await fetch(this.weatherURI + query);
        const data = await response.json();

        return data[0];
    }
    async getCity(city) {
        const query = `?apikey=${this.key}&q=${city}`

        const response = await fetch(this.baseCity + query);
        const data = await response.json();

        return data[0];
    }
}