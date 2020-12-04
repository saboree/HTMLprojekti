const date = new Date();
let isData = false;
let varausData;
let valitsettuPvm;
let varausKuukausi;
let varausPaiva;
const msg = document.querySelector('.info h1');
const field = document.querySelector('.field');

// köyttäjän syötetyt tiedot
const etunimiInput = document.getElementById('etunimi');
const sukunimiInput = document.getElementById('sukunimi');
const kloInput = document.getElementById('kello');
const kestoInput = document.getElementById('kesto');


// etsitään final kentta mihin tulostetaan varauksen tiedot
const dataBox = document.querySelector('.final');

//luodaan elementit varauksen tietojen varten
const nimi = document.createElement('h1');
const varauspvm = document.createElement('h2');
const aika = document.createElement('h2');
const kesto = document.createElement('h2');
const hinta = document.createElement('h2');

// generoidaan varoitus tai informatiiviset tekstit sivulle
const info = (teksti, msg) => {
    document.querySelector(msg).innerHTML = teksti;
}

// löydetään päivä kalenterista joka on varattu
const reservedDay = (varattuPaiva, kuukausi) => {
    let day = document.querySelectorAll('.activeDay');
    // käydään läpi kaikki päivien elementit ja etsitään varattu päivö
    day.forEach((currentDay) => {
        if (parseInt(currentDay.id) === varattuPaiva && date.getMonth() === kuukausi) {           // date.getMonth() === new Date().getMonth()) {
            // luodaan varatun päivän tyyli
            currentDay.style.color = "#fff";
            currentDay.style.background = "#a2a194";
        }
    })
}

// funktion, joka tarkista kentät lomakeella
const validateFields = () => {
    let error = 0;
    // jos aika selectissa ei ole valitsettu
    if (kloInput.value === "0") {
        error += 1;
        kloInput.style.color = "red";
        kloInput.style.border = "2px solid red";
    } else {
        // jos aika on selectissa valitsettu
        kloInput.style.color = "black";
        kloInput.style.border = "none";
    }
    // jos select varauksen kesto ei ole valitsettu
    if (kestoInput.value === "0") {
        error += 1;
        kestoInput.style.color = "red";
        kestoInput.style.border = "2px solid red";
    } else {
        // jos select kestp on valitsettu
        kestoInput.style.color = "black";
        kestoInput.style.border = "black";
    }

    // jos etunime ei ole annettu
    if (etunimiInput.value === "") {
        error += 1;
        etunimiInput.style.border = "2px solid red";
    } else {
        // jos etunime on annettu
        etunimiInput.style.border = "black";
    }
    // jos sukunimea ei ole annettu
    if (sukunimiInput.value === "") {
        error += 1;
        sukunimiInput.style.border = "2px solid red";
    } else {
        // jos sulkunimi on annettu
        sukunimiInput.style.border = "black";
    }
    // funktio tulostaa virheiden summan
    return error;
}

// funktion tuntien laskemiseksi Kellonajan selectiin
const hours = (lista) => {
    let forToday = "";
    let forAll = "";
    // käydään läpi kaikki tunnit listalta
    for (let h = 0; h < lista.length; h++) {
        // jos tunti on kelvollinen tänäisellä päivällä
        if (h + 9 > new Date().getHours()) {
            forToday += `<option value=${lista[h]}>${lista[h]}</option>`;
        }
        // lisötöön tunnit kaikille toisille päiville paitsi tönäisen
        forAll += `<option value=${lista[h]}>${lista[h]}</option>`;
    }
    // funktion tulostaa tunnit tänöön ja tunnit toisille päiville
    return {today: forToday, otherDay: forAll};
}

// funktion select kesto varauspituusen laskemiseksi
const varausPituus = (reservationTimeList, availableHours) => {
    //let leftTime = reservationTimeList.length - leftHours
    let forToday = "";
    let forAll = "";
    // käydään läpi kaikki ajat listalla
    for (let k = 0; k < reservationTimeList.length; k++) {
        // jos aika on kelvollinen tänäisellä päivällä
        if (availableHours - 1 > k ) {
            forToday += `<option value=${reservationTimeList[k]}>${reservationTimeList[k]}</option>`;
        }
        // tallennetaan ajat toisille päiville
        forAll += `<option value=${reservationTimeList[k]}>${reservationTimeList[k]}</option>`;
    }
    // funktion tulostaa ajat tänäisellä päivällä ja toisille päiville
    return {today: forToday, otherDay: forAll};

}

const getWeekDay = () => {
    const weekday = new Array(7);
    weekday[0] = "su";
    weekday[1] = "ma";
    weekday[2] = "ti";
    weekday[3] = "ke";
    weekday[4] = "to";
    weekday[5] = "pe";
    weekday[6] = "la";
}

// funktion avulla löydetään kalenterista viikonloput
const dayOff = (id) => {
    let s = date.getDay();
    let intId = parseInt(id);
    s = parseInt(s);
    s1 = 7 - s;
    s2 = s1 + 1;
    s3 = s2 + 6;
    s4 = s3 + 1;
    s5 = s4 + 6;
    s6 = s5 + 1;
    s7 = s6 + 6;
    s8 = s7 + 1;
    s9 = s8 + 6;
    s10 = s9 + 1;
    s11 = s10 + 6;
    console.log("Test == " + s3);
    // käydään iteroimalla läpi kaikki päivät kalenterissa ja löydetöön lauantait ja sunnuntait
    if (intId ===  s1 || intId === s2 || intId === s3 || intId === s4 || intId === s5 || intId === s6 || intId === s7 || intId === s8 ||
        intId === s9 || intId === s10) {
        // jos lauantai tai sunnuntai tulostetaan true
        return true;
    }
    // jos ei, ni tulostetaan false
    return false;
}

// funktion, joka lukee clickatut päivät kalenterissa
const getDay = (monthList, id, month) => {
    // varauksen päivämäärä tulostuksen varten
    const varaus = id + " " + monthList[date.getMonth()] + " " + date.getFullYear();
    const lomakeData = document.querySelector('.field h3');
    let todaysHours = 0;
    // jos lopullinen data on jo screenilla ja klikataan vielä päivällä kalenterissa
    if (isData) {
        if (confirm("Haluaisitko muuttaa varausta")) {
            location.reload();  // ladataan sivu uudelleen, jos ponnahdusikkunalla klikataan ok
        } else {
            // jos klikataan ponnahdusikkunassa cansel, jätetöön lopullinen data sivu auki
            dataBox.style.display = "block";
            // kutsutaan uudelleen funktio, joka löydö ja merkitse jo varatun päivän kalenteriin
            reservedDay(varausPaiva);
        }
    } else {
        // muutteen kuvataan lomake
        field.style.display = "block";
        // jos varaus on jo tehty, ni kutsutaan funktio, joka uudelleenluo varauspäivölle tyylin kalenterissa
        reservedDay(varausPaiva);
    }
    // tuntilista Kellonaika select kentälle
    let tuntiLista = [
        "09:00", "10:00", "11:00", "12:00",
        "13:00", "14:00", "15:00",
        "16:00", "17:00", "18:00", "19:00"
    ]
    // aikojen lista Kesto select kentälle
    let varausKesto = [
        "1 tuntia", "2 tuntia", "3 tuntia", "4 tuntia", "5 tuntia", "6 tuntia", "7 tuntia", "8 tuntia", "9 tuntia"
    ]
    // etsitään molemmat select kentät lomakeella
    const forHours = document.getElementsByTagName('select')[0];
    const forTime = document.getElementsByTagName('select')[1];

    // lisätään Kellonaika select kentään default teksti
    forHours.innerHTML = `<option value="0">${"Kellonaika"}</option>`;

    // tarkistetaan onko kalenterista valittu päivä tänäinen päivä
    if (parseInt(id) === new Date().getDate()) {
        // jos on, tulostetaan Kellonaika select kentään tunnit kulloisesta hetkestä loppuun
        forHours.innerHTML += hours(tuntiLista).today;
    } else {
        // jos joku muu päivä, nii tulostetaan kaikki työpäivän tunnit
        forHours.innerHTML += hours(tuntiLista).otherDay;
    }

    // Lisätään Kesto select kentään default teksti
    forTime.innerHTML = `<option value="0">${"Kesto"}</option>`;
    // tarkistetaan onko kalenterista valittu tänäinen päivä
    if (parseInt(id) === new Date().getDate()) {
        // jos on, ni tulostetaan Kesto select kentöön sopivat ajat
        forTime.innerHTML += varausPituus(varausKesto, forHours.length).today;
    } else {
        // jos valittu joku toinen päivä, tulostetaan kaikki ajat taulukosta
        forTime.innerHTML += varausPituus(varausKesto, forHours.length).otherDay;
    }
    // kirjoitetaan lomaken yläreunaan valittu päivämäärö
    lomakeData.innerHTML = varaus;
    // annetaan varausData muuttujale kalenterista valittu päivämäärä loppullisen tiedon vuoksi
    varausData = varaus;
    // tallennetaaan muuttujaan valittu kuukausi
    varausKuukausi = month;
    console.log("Varatud kuu on: " + month);
    // tallennetaan muuttujaan valittu päivön numero
    valitsettuPvm = parseInt(id);
}

// funktio varattu ratsastusajan hinnan laskemiseksi
const price = () => {
    let tuntihinta = 30;
    let varattuAika = parseFloat(kestoInput.value);

    return tuntihinta * varattuAika;
}

// napin painettaessa tehtään varaus
const makeReservation = () => {
    // etsitään virheitä näyttämä elementti
    const errorInfo = document.querySelector('.info h2');
    // tarkistetaan onko hetkellä lomakeelta tullut virheitä
    if (validateFields() === 0) {
        field.style.display = "none";   // jos ei, ni lomakeen laattikko poistetaan
        varausPaiva = valitsettuPvm;    // annetaan muuttujale valitsettu päivämäärö
        // tarkistetaan, onko otsikossa aktiivinen virheilmoitus
        if (errorInfo) {
            errorInfo.remove();     // poistetaan, jos löytyy
        }
        // kutsutaan funktio jolla avulla luodaan kalenteriin varattu päivälle oma tyyli
        reservedDay(varausPaiva, varausKuukausi);

        // luodaan tarvittavat elementit loppuliselle data sivulle
        const finalForm = document.createElement('form');
        const finalBtn = document.createElement('button');

        // lisätään elementeille atribuutit ja tiedot
        nimi.append(document.createTextNode(etunimiInput.value +
            " " + sukunimiInput.value));
        varauspvm.append(document.createTextNode(varausData));
        aika.append(document.createTextNode("Aika:  klo " + kloInput.value));
        kesto.append(document.createTextNode("Kesto: " +  kestoInput.value + " tuntia"));
        hinta.append(document.createTextNode("Hinta: " + price() + " euroa"));
        finalBtn.append(document.createTextNode("Uusi varaus"));
        finalBtn.classList = "uusiVaraus";
        finalForm.appendChild(finalBtn);

        // lisätään elementit data screenille
        dataBox.appendChild(nimi);
        dataBox.appendChild(varauspvm);
        dataBox.appendChild(aika);
        dataBox.appendChild(kesto);
        dataBox.appendChild(hinta);
        dataBox.appendChild(finalForm);
        // asetetaan sivun otsikoon teksti
        info("Tervetuloa ratsastamaan!", ".info h1");
        // data laattiko näytetään
        dataBox.style.display = "block";
        // asetetaan muuttujan value true, tarkoittaa, että data laattiko on auki
        isData = true;
    } else {
        // tarkistetaan, onko otsikossa virhe ilmoitus
        if (errorInfo) {
            errorInfo.remove();     // poistetaan, jos löytyy
        }

        // luodaan elementti virhe tekstin varten ja lisään näytölle
        const error = document.createElement('h2');
        error.append(document.createTextNode("Täytä pakolliset kentät!"));
        msg.appendChild(error);
    }
}

// kalenterin funktio
const renderCalender = () => {
    date.setDate(1);
    // tarkistetaan, onko varaus tehty ja data laattiko auki
    if (isData) {
        info("Tervetuloa ratsastamaan!", ".info h1");   // jos on, ilmoitetaan tervetuloa
    } else {
        info("Tee varaus kätevästi kalenterista!", ".info h1");     // jos ei, saa tehdä varaus
    }
    // löydetään kalenterin elementit
    const monthDays = document.querySelector(".days");
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

    // tallennetaan muuttujaan ensimäisen päivän indeksi
    const firstDayIndex = date.getDay();

    // tallennetaan viimeisen päivän indeksi
    const lastDayIndex = new Date(
        date.getFullYear(),
        date.getMonth() + 1, 0
    ).getDay();

    // seuraava kuukauden ensimmäiset päivät
    const nextDays = 7 - lastDayIndex ;

    // kuukausien taulu
    const months = [
        "Tammikuu",
        "Helmikuu",
        "Maaliskuu",
        "Huhtikuu",
        "Toukokuu",
        "Kesäkuu",
        "Heinäkuu",
        "Elokuu",
        "Syyskuu",
        "Lokakuu",
        "Marraskuu",
        "Joulukuu"
    ];
    // viikkonpäivät
    const daysFin = [
        "Su",
        "Ma",
        "Ti",
        "Ke",
        "To",
        "Pe",
        "La"
    ];

    // näytetään nykyinen kuukausi ja päivämäärä
    document.querySelector(".date h1").innerHTML = months[date.getMonth()];
    document.querySelector(".month p").innerHTML = new Date().toDateString();

    // muuttuja päivien varten
    let days = "";

    // käydään läpi elellisen kuukaudel lopuoäivät, jotka mahtuu nykyisen kuukauden alkuun
    for (let x = firstDayIndex; x > 0; x--) {  // tallennetaan jos löytyy
        days += `<div class="prev-date">    
        ${prevLastDay - x + 1}</div>`;

    }
    // käydään läpi kuukauden kaikki päivät
    for (let i = 1; i <= lastDay; i++) {
        if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
            days += `<div class="today" id=${i}>${i}</div>`;    // jos valittiin nykyinen päivä, annettaan div:ile luokka
        } else {
            // tarkistetaan, ettö valittaan vain päivät jotka ovat nykyisestä päivästä eteenpäin
            if ((i >= new Date().getDate() && date.getFullYear() === new Date().getFullYear() &&
                date.getMonth() >= new Date().getMonth()
                ) || (date.getFullYear() > new Date().getFullYear())) {
                // tarkistetaan viikonloput
                if (dayOff(i)) {
                    days += `<div class="dayoff" id=${i}>${i}</div>`;      // tallennetaan omalla luokalla
                } else if (i === varausPaiva && date.getMonth() === varausKuukausi) {
                    days += `<div class="varaus" id=${i}>${i}</div>`;   // jos päivä jo varattu, annetaan oma luokka
                } else {    // tössä tallennetaan kaikki aktiiviset päivät omalla luokalla
                    days += `<div class="activeDay" id=${i}>${i}</div>`;
                }
            } else {    // lopuksi elellisen kuukauden lopu ja seuraavan kuukauden alkupäivät
                days += `<div class="day" id=${i}>${i}</div>`;
            }
        }
    }

    // käydään läpi kaikki seuraavan kuukauden ensimmäiset päivöt ja tulostetaan vain tyhjä div elementti
    for (let j = 1; j <= nextDays; j++) {
        days += `<div></div>`   // eli ei näytettä niitä näytöllä
        monthDays.innerHTML = days;     // tallennetaan kaikki muut päivät kalenteriin
    }

    //  etsitään kaikki aktiiviset päivät, joita voi napsauttaa
    let openDay = document.querySelectorAll('.activeDay');
    // tarkistetaan onko kyseessä nykyinenkuukausi ja vuosi
    if (date.getMonth() === new Date().getMonth() &&
        date.getFullYear() === new Date().getFullYear()) {
        // annettaan mahdollisuus napsauttaa päiviä
        document.querySelector('.today')
            .addEventListener('click', (e) => {
                // kutsutaan funktio, joka mahdollistaa tehdä varaus sopivalle päivälle
                getDay(months, e.target.id, date.getMonth());

            })
    }

    // kutsutaan uudelleen kaikki aktiiviset päivän div elementit
    openDay.forEach((item) => {
        //console.log("Element " + item);
        item.addEventListener('click', (e) => {
            // kutsutaan funktip, joka mahdollistaa tehdä varaus sopivalle päivälle
            getDay(months, e.target.id, date.getMonth());
        })
    })
}

// kuukausien valinta taaksepäin kalenterissa
document.querySelector('.prev')
    .addEventListener('click', () => {
        // asetetaan kuukausi ja vähennetään sieltä yksi kuukausi
        date.setMonth(date.getMonth() - 1);
        // kutsutaan kalenterin funktio
        renderCalender();
    })

// kuulausien valinta eteenpäin kalenterissa
document.querySelector('.next')
    .addEventListener('click', () => {
        // asetetaan kuukausi ja mennään yksi kuukausi eteenpäin
        date.setMonth(date.getMonth() + 1);
        // kutsutaan kalenterin funktio
        renderCalender();
    })

// Varauspainike
document.querySelector('#tilaa')
    .addEventListener('click', makeReservation);

// kutsutaan kalenterin funktio
renderCalender();
