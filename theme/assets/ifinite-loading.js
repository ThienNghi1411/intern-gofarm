var products_on_page = $('#product-grid');
var next_url = products_on_page.data('next-url');
console.log(testval)
console.log(page_number)


var i=1;



function loadMoreProducts(){
  
    let  newListItem = document.querySelectorAll('.grid__item');




    // console.log(next_url);
   var ImageWidth = document.querySelector('.Item_img').offsetWidth;
   var itemWidth = document.querySelector('.grid__item').offsetWidth ;
   let form = document.querySelector('#myForm');
   const queryString = new URLSearchParams(new FormData(form)).toString();
   let sort = document.getElementById("sort-by").value;
    i++;
        $.ajax({
            url: 'https://internarena2022.myshopify.com/collections/'+testval+'?'+ queryString + '&sort_by=' +sort+'&page='+i,
            type:'GET',
            dataType:'html'
         }).done(function(data){
            var new_products = $(data).find('#product-grid');
            var new_item = document.querySelectorAll('.grid__item ');
            // let item_width = document.querySelector(".grid__item").offsetWidth;
            // console.log(item_width)
            console.log(new_item)
      
      
            var new_url = new_products.data('next-url');
            next_url = new_url;
             
            products_on_page.append(new_products.html());
      
            
            let ListItem = document.querySelectorAll(".grid__item");
                     
            ListItem.forEach(e=>{
               
                    let item = e.childNodes[1];
                    item.style.width = ImageWidth+'px';
                    e.style.width = itemWidth+'px';
                    e.classList.add('item_quanity1');
                
            })
         }) 
         history.replaceState(null, null,  "https://internarena2022.myshopify.com/collections/"+ testval+'?'+queryString+ '?sort_by='+ sort);

    }



window.addEventListener("scroll", () => {
    var container = document.querySelector("#product-grid").offsetHeight;
    console.log(container);
    if(container < window.scrollY  && i< parseInt(page_number))
    {
        
        loadMoreProducts();
        console.log("!")
       
    }
    if(container==0){
        document.querySelector(".right_col_empty").innerHTML="empty"
    }
    if(container!=0)
    {
        document.querySelector(".right_col_empty").innerHTML=""
    }
});

let item1 = document.querySelector('#item_quanity_1');
let item2 = document.querySelector('#item_quanity_2');
let item3 = document.querySelector('#item_quanity_3');
let item4 = document.querySelector('#item_quanity_4');

item1.addEventListener('click',()=>{
    let listItem = document.querySelectorAll('.grid__item');
    let ImageList = document.querySelectorAll('.colRight_Item_pic');

  

    listItem.forEach(box=>{
        let item = box.childNodes[1];
        item.style.width = '20%';
        box.setAttribute('style','width:100% !important')
        box.classList.add('item_quanity1');
        
    })
})

item2.addEventListener('click',()=>{
    let listItem = document.querySelectorAll('.grid__item');
    let ImageList = document.querySelectorAll('.colRight_Item_pic');
    listItem.forEach(box=>{
        let item = box.childNodes[1];
        item.style.width = '50%';
        box.setAttribute('style','width:45% !important')
        box.classList.add('item_quanity1');

        
    })
})

item3.addEventListener('click',()=>{
    let listItem = document.querySelectorAll('.grid__item');
    let ImageList = document.querySelectorAll('.colRight_Item_pic');
    listItem.forEach(box=>{
        let item = box.childNodes[1];
        item.style.width = '80%';
        box.setAttribute('style','width:30% !important')
        box.classList.add('item_quanity1');

        
    })
})

item4.addEventListener('click',()=>{
    let listItem = document.querySelectorAll('.grid__item');
    let ImageList = document.querySelectorAll('.colRight_Item_pic');
    listItem.forEach(box=>{
        let item = box.childNodes[1];
        item.style.width = '80%';
        box.setAttribute('style','width:18% !important')
        box.classList.add('item_quanity1');

        
    })
})


function sortCollection2()
{
    i=1;
    var itemWidth = document.querySelector('.grid__item').offsetWidth ;
    var ImageWidth = document.querySelector('.Item_img').offsetWidth;
    var ImageList = document.querySelectorAll('.colRight_Item_pic');
    // var page_number = document.querySelector('.current').innerText;
    // console.log(page_number)
    console.log(ImageWidth);
    var products_on_page = $('#product-grid');

    let form = document.querySelector('#myForm');   
    let sort = document.getElementById("sort-by").value;

    const queryString = new URLSearchParams(new FormData(form)).toString();
        $.ajax({
         url: 'https://internarena2022.myshopify.com/collections/'+testval+'?'+ queryString + '&sort_by=' +sort+'&page=1',
        type:'GET',
        dataType:'html'
    }).done(function(data){
        let html_div = document.createElement('div');
        html_div.innerHTML = data;
        
      let  newListItem = html_div.querySelectorAll('.grid__item');
        console.log(html_div)
    //   var new_products = $(data).find('#product-grid');
    //   var newListItem = $(data).querySelectorAll('.grid__item');
    

        console.log(newListItem);

      
        $('#product-grid').empty();
        
        newListItem.forEach(element => {  

            products_on_page.append(element);
        });

        let ListItem = document.querySelectorAll(".grid__item");
       
        ListItem.forEach(e=>{
           
                let item = e.childNodes[1];
                item.style.width = ImageWidth+'px';
                e.style.width = itemWidth+'px';
                e.classList.add('item_quanity1');
            
        })
       

     
   })
//    history.replaceState(null, null,  "https://internarena2022.myshopify.com/collections/collection-page?"+ queryString+ '?sort_by='+ sort+"&page="+i);
  
}

function filterCollections2()
{ 
  
   
        i=1;
        // var itemWidth = document.querySelector('.grid__item').offsetWidth ;
        // var ImageWidth = document.querySelector('.Item_img').offsetWidth;
        console.log("ImageWidth");
        // var products_on_page = $('#product-grid');
        let form = document.querySelector('#myForm');
        let sort = document.getElementById("sort-by").value;
        const queryString = new URLSearchParams(new FormData(form)).toString();
            $.ajax({
             url: 'https://internarena2022.myshopify.com/collections/'+testval+'?'+ queryString + '&sort_by=' + sort +'&page=1' ,
            type:'GET',
            dataType:'html'
        }).done(function(data){
            let html_div = document.createElement('div');
            html_div.innerHTML = data;
            console.log("data")
        //   let html_dom = html_div.querySelector('#ProductGridContainer').innerHTML;
        //   document.querySelector('#ProductGridContainer').innerHTML = html_dom;
        let  newListItem = html_div.querySelectorAll('.grid__item');
        console.log(newListItem.length)
      
       
            $('#product-grid').empty();
            
            newListItem.forEach(element => {  
        
                products_on_page.append(element);
            });
        
            //     let ListItem = document.querySelectorAll(".grid__item");
               
        
            //     ListItem.forEach(e=>{
                   
            //             let item = e.childNodes[1];
            //             item.style.width = ImageWidth+'px';
            //             e.style.width = itemWidth+'px';
            //             e.classList.add('item_quanity1');
                    
            // })

       })
       history.replaceState(null, null,  "https://internarena2022.myshopify.com/collections/"+ testval+'?'+queryString+ '?sort_by='+ sort);
    
 
            
              
            
  
}



var slider = document.getElementById('slider');

const input_from = document.getElementById("Filter-filter.v.price.gte");
const input_to = document.getElementById("Filter-filter.v.price.lte");
let input_to_max = input_to.getAttribute("max");

let input_from_min = input_from.getAttribute("min");
console.log(input_to_max);


if(slider){
    noUiSlider.create(slider, {
        start: [parseInt(input_from_min), parseInt(input_to_max)],
        connect: true,
        range: {
            'min': parseInt(input_from_min),
            'max': parseInt(input_to_max),
        }
    });
    
 
    console.log(input_from)
    console.log(input_to)
    const inputs = [input_from,input_to]
    slider.noUiSlider.on('update',function(values,handle){
        input_from.value=values[0];
        input_to.value=values[1];
        filterCollections2();

    })
    
}









