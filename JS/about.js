//Menu
let menuBtn = document.querySelector('.menu-btn');
let menu = document.querySelector('#Navigation');

menuBtn.addEventListener('click', function (){
    menuBtn.classList.toggle('active');
    menu.classList.toggle('active');
});

//Background for weather widget
theTime = new Date();
theHour = theTime.getHours();
if(theHour > 6 && theHour < 18){
    document.write('<article background="/Images/weatherbg.jpeg" text="day" >');
}
else{
    document.write('<article background="/Images/starsBg.jpg" text="night" >');
}