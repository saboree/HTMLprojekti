//Menu
let menuBtn = document.querySelector('.menu-btn');
let menu = document.querySelector('#Navigation');

menuBtn.addEventListener('click', function (){
    menuBtn.classList.toggle('active');
    menu.classList.toggle('active');
});
