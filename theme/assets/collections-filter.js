

let item1 = document.querySelector('#item_quanity_1');
let item2 = document.querySelector('#item_quanity_2');
let item3 = document.querySelector('#item_quanity_3');
let item4 = document.querySelector('#item_quanity_4');


let listItem = document.querySelectorAll('.grid__item');

let ImageList = document.querySelectorAll('.colRight_Item_pic');





item1.addEventListener('click',()=>{
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
    listItem.forEach(box=>{
     for (let i = 0; i < ImageList.length; i++) {
 
        let img =ImageList[i].childNodes[1];
        img.style.width ='50%';
    }
        box.style.width ='45%'
        box.classList.add('item_quanity1');

        
    })
})

item3.addEventListener('click',()=>{
    listItem.forEach(box=>{
     for (let i = 0; i < ImageList.length; i++) {
 
        let img =ImageList[i].childNodes[1];
        img.style.width = '80%';
    }
        box.style.width ='30%'
        box.classList.add('item_quanity1');

        
    })
})

item4.addEventListener('click',()=>{
    listItem.forEach(box=>{
     for (let i = 0; i < ImageList.length; i++) {
 
        let img =ImageList[i].childNodes[1];
        img.style.width = '80%';
    }
        box.style.width ='18%'
        box.classList.add('item_quanity1');

        
    })
})
