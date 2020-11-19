//Function to mouseclick into specific ID
function ScrollInto() {
var element = document.getElementById("scrollinto");
element.scrollIntoView({ behavior: 'smooth'});
}

//When you load website it loads this script to show time.
window.onload = function yes() {
var d = new Date();
document.getElementById("time").innerHTML = d;
}

//Function to add skill to the list, kinda scuffed :D
function AddSkill() {
  var x = document.getElementById("addskill").value;
  document.getElementById("skill").innerHTML = x;
  document.getElementById("lastskill").remove();
}
//make project bigger
function Bigger(x) {
  x.style.height = "420px";
  x.style.width = "740px";
}

//make project back to normal big
function Big(x) {
  x.style.height = "360px";
  x.style.width = "668px";
}
