var filter_button = document.querySelector(".filter_button");
var filter_form = document.querySelector(".filter-form");


filter_button.addEventListener("click",()=>{

    if($('.filter_appear').length)
    {
        filter_form.classList.remove("filter_appear")
       
    }
    else{
        filter_form.classList.add("filter_appear")     
    }

})