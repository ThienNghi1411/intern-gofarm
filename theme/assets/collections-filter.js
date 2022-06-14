
console.log(collection_handle)
let item1 = document.querySelector('#item_quanity_1');
let item2 = document.querySelector('#item_quanity_2');
let item3 = document.querySelector('#item_quanity_3');
let item4 = document.querySelector('#item_quanity_4');

item1.addEventListener('click', () => {
    let listItem = document.querySelectorAll('.grid__item');
    let ImageList = document.querySelectorAll('.colRight_Item_pic');



    listItem.forEach(box => {
        let item = box.childNodes[1];
        item.style.width = '20%';
        box.setAttribute('style', 'width:100% !important')
        box.classList.add('item_quanity1');

    })
})

item2.addEventListener('click', () => {
    let listItem = document.querySelectorAll('.grid__item');
    let ImageList = document.querySelectorAll('.colRight_Item_pic');
    listItem.forEach(box => {
        let item = box.childNodes[1];
        item.style.width = '50%';
        box.setAttribute('style', 'width:45% !important')
        box.classList.add('item_quanity1');


    })
})

item3.addEventListener('click', () => {
    let listItem = document.querySelectorAll('.grid__item');
    let ImageList = document.querySelectorAll('.colRight_Item_pic');
    listItem.forEach(box => {
        let item = box.childNodes[1];
        item.style.width = '80%';
        box.setAttribute('style', 'width:30% !important')
        box.classList.add('item_quanity1');


    })
})

item4.addEventListener('click', () => {
    let listItem = document.querySelectorAll('.grid__item');
    let ImageList = document.querySelectorAll('.colRight_Item_pic');
    listItem.forEach(box => {
        let item = box.childNodes[1];
        item.style.width = '80%';
        box.setAttribute('style', 'width:18% !important')
        box.classList.add('item_quanity1');


    })
})

function sortCollection() {
    var itemWidth = document.querySelector('.grid__item').offsetWidth;
    var ImageWidth = document.querySelector('.Item_img').offsetWidth;
    var ImageList = document.querySelectorAll('.colRight_Item_pic');
    // var page_number = document.querySelector('.current').innerText;
    // console.log(page_number)
    console.log(ImageWidth);
    var products_on_page = $('#product-grid');
    var pageNumber = document.querySelector(".current").innerText;
    let form = document.querySelector('#myForm');
    let sort = document.getElementById("sort-by").value;
    const queryString = new URLSearchParams(new FormData(form)).toString();
    $.ajax({
        url: 'https://internarena2022.myshopify.com//collections/'+ collection_handle +'?' + queryString + '&sort_by=' + sort + '&page=' + pageNumber,
        type: 'GET',
        dataType: 'html'
    }).done(function (data) {
        let html_div = document.createElement('div');
        html_div.innerHTML = data;

        let newListItem = html_div.querySelectorAll('.grid__item');
        console.log(html_div)
        //   var new_products = $(data).find('#product-grid');
        //   var newListItem = $(data).querySelectorAll('.grid__item');


        console.log(newListItem);

        var itemsProcessed = 0;
        $('#product-grid').empty();

        newListItem.forEach(element => {

            products_on_page.append(element);
        });

        let ListItem = document.querySelectorAll(".grid__item");

        ListItem.forEach(e => {

            let item = e.childNodes[1];
            item.style.width = ImageWidth + 'px';
            e.style.width = itemWidth + 'px';
            e.classList.add('item_quanity1');

        })
    })
    history.replaceState(null, null, "https://internarena2022.myshopify.com/collections/" +collection_handle +'?' + queryString + '?sort_by=' + sort + '&page=' + pageNumber);
    pageNumber = '';
}

function filterCollections() {
    var itemWidth = document.querySelector('.grid__item').offsetWidth;
    var ImageWidth = document.querySelector('.Item_img').offsetWidth;
    // var ImageList = document.querySelectorAll('.colRight_Item_pic');

    console.log("ImageWidth");
    // var products_on_page = $('#product-grid');
    let form = document.querySelector('#myForm');
    let sort = document.getElementById("sort-by").value;

    let ListButton = document.querySelectorAll(".page");


    //do page = 1 truoc r lay sl page sau
    const queryString = new URLSearchParams(new FormData(form)).toString();
    $.ajax({
        url: 'https://internarena2022.myshopify.com//collections/'+ collection_handle +'?' + queryString + '&sort_by=' + sort + '&page=1',
        type: 'GET',
        dataType: 'html'
    }).done(function (data) {
        let html_div = document.createElement('div');
        html_div.innerHTML = data;
        console.log("data")
        let html_dom = html_div.querySelector('#ProductGridContainer').innerHTML;
        document.querySelector('#ProductGridContainer').innerHTML = html_dom;
        history.replaceState(null, null, "https://internarena2022.myshopify.com/collections/" +collection_handle +'?' + queryString + '?sort_by=' + sort + '&page=1');
        let ListButton = document.querySelectorAll(".page");


        //pagination with filter
        ListButton.forEach(e => {
            e.addEventListener("click", () => {
                var pageNumber = document.querySelector(".current").innerText;
                document.querySelector(".current").classList.remove("current")
                e.classList.add("current");
                var itemWidth = document.querySelector('.grid__item').offsetWidth;
                var ImageWidth = document.querySelector('.Item_img').offsetWidth;
                // var ImageList = document.querySelectorAll('.colRight_Item_pic');

                // console.log("ImageWidth");
                // var products_on_page = $('#product-grid');
                let form = document.querySelector('#myForm');
                let sort = document.getElementById("sort-by").value;
                var pageNumber = document.querySelector(".current").innerText;
                console.log(pageNumber)
                const queryString = new URLSearchParams(new FormData(form)).toString();
                var products_on_page = $('#product-grid');
                $.ajax({
                    url: 'https://internarena2022.myshopify.com//collections/'+ collection_handle +'?' + queryString + '&sort_by=' + sort + '&page=' + pageNumber,
                    type: 'GET',
                    dataType: 'html'
                }).done(function (data) {
                    pageNumber = '';
                    let html_div = document.createElement('div');
                    html_div.innerHTML = data;

                    let newListItem = html_div.querySelectorAll('.grid__item');
                    //   var new_products = $(data).find('#product-grid');
                    //   var newListItem = $(data).querySelectorAll('.grid__item');

                    // view new page data
                    $('#product-grid').empty();

                    newListItem.forEach(element => {

                        products_on_page.append(element);
                    });

                    // change item width
                    let ListItem = document.querySelectorAll(".grid__item");

                    ListItem.forEach(e => {

                        let item = e.childNodes[1];
                        item.style.width = ImageWidth + 'px';
                        e.style.width = itemWidth + 'px';
                        e.classList.add('item_quanity1');

                    })

                })
                //change url
                history.replaceState(null, null, "https://internarena2022.myshopify.com/collections/" +collection_handle +'?' + queryString + '?sort_by=' + sort + '&page=' + pageNumber);

            })
        })

















        let ListItem = document.querySelectorAll(".grid__item");

        ListItem.forEach(e => {

            let item = e.childNodes[1];
            item.style.width = ImageWidth + 'px';
            e.style.width = itemWidth + 'px';
            e.classList.add('item_quanity1');

        })

        //   $('#product-grid').empty();
        //   products_on_page.append(new_products.html());
        //   let ListItem = document.querySelectorAll('grid__item');
        //   ListItem.forEach(e=>{
        //     e.style.width = itemWidth+'px';
        //  })

    })

    history.replaceState(null, null, "https://internarena2022.myshopify.com/collections/" +collection_handle +'?' + queryString + '?sort_by=' + sort + '&page=' + pageNumber);


}

// -------------PAGINATION-------------
var ListButton = document.querySelectorAll(".page");
ListButton.forEach(e => {
    e.addEventListener("click", () => {
        document.querySelector(".current").classList.remove("current")
        e.classList.add("current");
        var itemWidth = document.querySelector('.grid__item').offsetWidth;
        var ImageWidth = document.querySelector('.Item_img').offsetWidth;
        // var ImageList = document.querySelectorAll('.colRight_Item_pic');

        // console.log("ImageWidth");
        // var products_on_page = $('#product-grid');
        let form = document.querySelector('#myForm');
        let sort = document.getElementById("sort-by").value;
        var pageNumber = document.querySelector(".current").innerText;
        console.log(pageNumber)
        const queryString = new URLSearchParams(new FormData(form)).toString();
        var products_on_page = $('#product-grid');
        $.ajax({
            url: 'https://internarena2022.myshopify.com//collections/'+ collection_handle +'?' + queryString + '&sort_by=' + sort + '&page=' + pageNumber,
            type: 'GET',
            dataType: 'html'
        }).done(function (data) {
            pageNumber = '';
            let html_div = document.createElement('div');
            html_div.innerHTML = data;

            let newListItem = html_div.querySelectorAll('.grid__item');
            //   var new_products = $(data).find('#product-grid');
            //   var newListItem = $(data).querySelectorAll('.grid__item');


            // view newpage data
            $('#product-grid').empty();

            newListItem.forEach(element => {

                products_on_page.append(element);
            });

            //change width
            let ListItem = document.querySelectorAll(".grid__item");

            ListItem.forEach(e => {

                let item = e.childNodes[1];
                item.style.width = ImageWidth + 'px';
                e.style.width = itemWidth + 'px';
                e.classList.add('item_quanity1');

            })


        })
        //change url
        history.replaceState(null, null, "https://internarena2022.myshopify.com/collections/" +collection_handle +'?' + queryString + '?sort_by=' + sort + '&page=' + pageNumber);





    })
})
