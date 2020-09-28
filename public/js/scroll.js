///////////////////////////
//header change on scroll//
///////////////////////////
window.onscroll = function () { scrollFunction() };
var navelem = document.getElementById("scroll_nav");
navelem.classList.add("navbar-light");
navelem.classList.add("bg-light");

function scrollFunction() {
    if (document.body.scrollTop > 35 || document.documentElement.scrollTop > 35) {
        navelem.style.backgroundColor = "#343a40";
        navelem.classList.add("navbar-dark");
        navelem.classList.add("bg-dark");
        navelem.style.display = "flex";
        
    
    } else {
        navelem.style.background = 'transparent';
        navelem.style.display = "flex";
        navelem.classList.remove("navbar-dark");
        navelem.classList.remove("bg-dark");
        navelem.classList.add("navbar-light");
        navelem.classList.add("bg-light");
       
    }
} 
