//Menu
let menuBtn = document.querySelector('.menu-btn');
let menu = document.querySelector('#Navigation');

menuBtn.addEventListener('click', function (){
    menuBtn.classList.toggle('active');
    menu.classList.toggle('active');
});

//Background for weather widget
let element = document.querySelector('.weather');
theTime = new Date();
theHour = theTime.getHours();

if(theHour > 6 && theHour < 18){
    //element.style.backgroundImage = "url(../Images/weatherbg.jpeg)";
    //TAI
    //document.write('<article background="/Images/weatherbg.jpeg" text="day" >');
}
else{
    //element.style.backgroundImage = "url(../Images/starsBg.jpeg)";
    //TAI
    //document.write('<article background="/Images/starsBg.jpg" text="night" >');
}