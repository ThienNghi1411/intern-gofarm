var products_on_page = $('#product-grid');
var next_url = products_on_page.data('next-url');





function loadMoreProducts(){

   var itemWidth = document.querySelector('.grid__item').offsetWidth ;
   let form = document.querySelector('#myForm');
   const queryString = new URLSearchParams(new FormData(form)).toString();
if(next_url !='')
{
   $.ajax({
      url: '/collections/{{ collection.handle }}?sort_by=' + this.sort + '&' + queryString,
      type:'GET',
      dataType:'html'
   }).done(function(data){
      var new_products = $(data).find('#product-grid');
      var new_item = document.querySelectorAll('.grid__item ');
      let item_width = document.querySelector(".grid__item").offsetWidth;
      console.log(item_width)
      console.log(new_item)
      
      new_item.forEach(e=>{
         e.style.width = item_width+"px";
      })
     
      
      var new_url = new_products.data('next-url');
      next_url = new_url;
     
      products_on_page.append(new_products.html());
   })  
}
else{
   console.log("end");
}

  
}

var button = document.querySelector('.button_loadMore');

button.addEventListener("click",loadMoreProducts)


document.querySelectorAll('grid__item');

