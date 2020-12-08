/* Array of Pictures */
const picArray = [
    {
        'title': 'Title 3',
        'filename': 'Images/pic1.jpg',
    },
    {
        'title': 'Title 3',
        'filename': 'Images/pic2.jpg',
    },
    {
        'title': 'Title 3',
        'filename': 'Images/pic3.jpg',
    },
    {
        'title': 'Title 3',
        'filename': 'Images/heppagif.gif',
    },
    {
        'title': 'Title 3',
        'filename': 'Images/pic4.jpg',
    },
    {
        'title': 'Title 3',
        'filename': 'Images/pic5.jpg',
    },
    {
        'title': 'Title 3',
        'filename': 'Images/pic6.jpg',
    },
];

// etsitääm main-elementti html-sivulta
const main = document.querySelector('.kgkuvat');
const ul = document.createElement('ul');
ul.id = "kgul";


// käydään jäsentaulukko läpi alkio kerrallaan.
for (let i = 0; i < picArray.length; i++) {
    // luodaan tarvittavat elementit
    const header = document.createElement('header');
    const li = document.createElement('li');
    const h2 = document.createElement('h2');
    const img = document.createElement('img');

    // haetaan elementeille arvot taulukosta
    h2.innerText = picArray[i].title;
    img.src = picArray[i].filename;
    li.id = "kgli";
    img.id = "kgkuva";

    // lisätään elementeille niiden lapsielementit
    header.appendChild(h2);

    ul.appendChild(li);
    li.appendChild(img);

    // lisätään luotu article-elementti main-elementin lapseksi
    main.appendChild(ul);
}