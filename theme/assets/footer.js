var btnClose = document.querySelector(".footer_NavMenu_Header-iconClose");
var btnOpen = document.querySelector(".moblie-menu_wrap");
var navMenu = document.querySelector(".footer_NavMenu");
var body = document.querySelector("body");


btnClose.addEventListener("click", () => {
    navMenu.style.display = "none";

    body.style.overflow = "scroll";

});

btnOpen.addEventListener("click", () => {
    navMenu.style.display = "block";
    navMenu.style.overflow = "scroll";
    body.style.overflow = "hidden";

});


// 
window.addEventListener('resize', () => {

    if (window.innerWidth >= 1000) {
        navMenu.style.display = "none";
        body.style.overflow = "scroll";
    }
});
