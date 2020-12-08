// osoite, mistä haetaan tiedot
const url = "http://api.openweathermap.org/data/2.5/weather?id=632453&lang=fi&units=metric&appid=1bc0bd00a65d0503d31deb107a54f1d7";

// kerataan data
const teeHaku = (haku) => {
    fetch(haku)
        .then((response) => {
            return response.json();
        }).then((json) => {
        // kutsutaan funktio, joka kuvaa vastaukset näytölle
        vastaus(json);
    }).catch((error) => {   // jos tapahtu virhe, annetaan virheilmoitus
        console.log(error)
    })
}

// etsitään html sivulta article elementti, mihin kuvataan tiedot
const weather = document.querySelector('.weather');

// funktio, joka luo taulukkon tietojen varten
const weatherInfo = (data) => {
    // luodaan tarvittavat html elementit ja lisätään niile tiedot ja atribuutit
    const table = document.createElement('table');
    const tempIcon = document.createElement('i');
    tempIcon.className = "fas fa-thermometer-half";
    const temp = document.createElement('h3');
    temp.append(document.createTextNode(data.main.temp + " °C"));
    const windIcon = document.createElement('i');
    windIcon.className = "fas fa-wind";
    const wind = document.createElement('h3');
    wind.append(document.createTextNode(data.wind.speed + " m/s"))

    // luodaan taulu tietojen tallentamiseksi
    let tdLista = [[tempIcon, temp], [windIcon, wind]]

    // luodaan iteroimalla taulukko
    for (let row = 0; row < 2; row++) {
        let tr = document.createElement('tr');  // luodaan taulukkon tr elementti
        for (let col = 0; col < 2; col++) {
            let tdTemp = document.createElement('td');      // luodaan taulukkon td elementti
            // tallennetaan tiedot
            tdTemp.append(tdLista[row][col]);
            tr.appendChild(tdTemp);
        }
        // lisätään tiedot taulukoon
        table.append(tr);
    }
    // lisätään taulukko article elementiin
    weather.append(table);
}

// funktio, joka kuvaa vastaukset
const vastaus = (weatherData) => {
    // kaikki haettu tiedot console logissa // haettu säätiedot Vantaalla
    console.log(weatherData);
    // luodaan elementit ja lisätään tiedot
    const img = document.createElement('img');
    const otsikko = document.createElement('h1');

    otsikko.appendChild(document.createTextNode(weatherData.weather[0].description));
    const figcaption = document.createElement('figcaption');
    figcaption.appendChild(document.createTextNode(weatherData.weather[0].description));

    // säätietojen kuva
    img.src = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + ".png";

    // lisätään säätiedot ja kuva article elementiin
    weather.append(otsikko);
    weather.append(img);

    // kutsutaan funktio taulukon kuvamiseksi
    weatherInfo(weatherData);

}

// kutsutaan funktio kaikkien säätietojen kuvaamiseksi näytölle
teeHaku(url);
