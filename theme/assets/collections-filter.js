

let item1 = document.querySelector('#item_quanity_1');
let item2 = document.querySelector('#item_quanity_2');
let item3 = document.querySelector('#item_quanity_3');
let item4 = document.querySelector('#item_quanity_4');










item1.addEventListener('click',()=>{
    let listItem = document.querySelectorAll('.grid__item');
    let ImageList = document.querySelectorAll('.colRight_Item_pic');
    listItem.forEach(box=>{
     for (let i = 0; i < ImageList.length; i++) {
 
        let img =ImageList[i].childNodes[1];
        img.style.width = '20%';
    }
        box.setAttribute('style','width:100% !important')
        box.classList.add('item_quanity1');
        
    })
})

item2.addEventListener('click',()=>{
    let listItem = document.querySelectorAll('.grid__item');
    let ImageList = document.querySelectorAll('.colRight_Item_pic');
    listItem.forEach(box=>{
     for (let i = 0; i < ImageList.length; i++) {
 
        let img =ImageList[i].childNodes[1];
        img.style.width ='50%';
    }
        box.setAttribute('style','width:45% !important')
        box.classList.add('item_quanity1');

        
    })
})

item3.addEventListener('click',()=>{
    let listItem = document.querySelectorAll('.grid__item');
    let ImageList = document.querySelectorAll('.colRight_Item_pic');
    listItem.forEach(box=>{
     for (let i = 0; i < ImageList.length; i++) {
 
        let img =ImageList[i].childNodes[1];
        img.style.width = '80%';
    }
        box.setAttribute('style','width:30% !important')
        box.classList.add('item_quanity1');

        
    })
})

item4.addEventListener('click',()=>{
    let listItem = document.querySelectorAll('.grid__item');
    let ImageList = document.querySelectorAll('.colRight_Item_pic');
    listItem.forEach(box=>{
     for (let i = 0; i < ImageList.length; i++) {
 
        let img =ImageList[i].childNodes[1];
        img.style.width = '80%';
    }
        box.setAttribute('style','width:18% !important')
        box.classList.add('item_quanity1');

        
    })
})


// pagination reload

var pageItem = document.querySelectorAll(".page");
var option = document.getElementById("sort-by").value;
var form = document.getElementById("myForm");

const queryString = new URLSearchParams(new FormData(form)).toString();


pageItem.forEach(target=>{
    target.addEventListener("click",()=>{
        console.log(option);
        console.log(queryString);

        fetch('/collections/{{ collection.handle }}?sort_by=' + a.value + '&' + queryString)
        .then(response => response.text())
        .then(data => {
            let html_div = document.createElement('div');
             html_div.innerHTML = data;

             let html_dom = html_div.querySelector('#ProductGridContainer').innerHTML;
            document.querySelector('#ProductGridContainer').innerHTML = html_dom;
            history.replaceState(null, null, '?sort_by=' + a.value + '&' + queryString );

        })
    })

})



