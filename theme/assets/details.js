var content = document.getElementsByClassName("details_tabWrap")[0];
var link = document.getElementsByClassName("details_tabName");
var text =document.getElementsByClassName("details_main2");

for(let i=0;i< link.length;i++)
{
    link[i].addEventListener("click",()=>{
        var current = document.getElementsByClassName("active")[0];
        current.className = current.className.replace(" active","");
        
        var current2 = document.getElementsByClassName("active2")[0];
        current2.className = current2.className.replace(" active2","");
        //delect active Item
        text[i].className  += " active2";
        link[i].className  += " active";
        //add active to current click Item

    })
}
