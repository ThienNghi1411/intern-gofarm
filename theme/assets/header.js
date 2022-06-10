const menuToggle_mobile = document.querySelector(".menu-Mobile");
const closeBtn = document.querySelector(".menuMobile-show__closeBtn");
const menuMobile_show = document.querySelector(".menuMobile-show");
const searchBtn = document.querySelector(".headerCont__mobileSearch");
const searchField = document.querySelector(".headerCont__searchField");

const toggleMenu = () => {
    if (  menuToggle_mobile.classList.contains("menuToggle-active") ){
        menuToggle_mobile.classList.remove("menuToggle-active")
        menuMobile_show.style.display="none";
        body.style.overflow="scroll";
    }else{
        menuToggle_mobile.classList.add("menuToggle-active")
        menuMobile_show.style.display="block";
        body.style.overflow="hidden";
    }
}
menuToggle_mobile.addEventListener("click" , () => {
    toggleMenu();
})

closeBtn.addEventListener("click" , () => {
    toggleMenu();
})

const toggleSearch = () => {
    if (  searchBtn.classList.contains("searchToggle-active") ){
        searchBtn.classList.remove("searchToggle-active")
        searchField.style.display="none";
        body.style.overflow="scroll";
    }else{
        searchBtn.classList.add("searchToggle-active")
        searchField.style.display="block";
        body.style.overflow="hidden";
    }
}

searchBtn.addEventListener("click", () => {
    toggleSearch();
})