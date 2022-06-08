/*@license
  Gofarm by ShopThemes (https://www.shopthemes.net)
  Access unminified JS in assets/theme.js
  */

  import "./common/theme-section";

  register("product-page", {
    onLoad: function () {
      var slider = tns({
        container: "#productPage__mainImg",
        items: 1,
        navContainer: "#productPage__subImgList",
        controls: false,
        navAsThumbnails: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayButtonOutput: false,
        swipeAngle: false,
        speed: 400,
      });

      //////////////-Declaration Variable-/////////////
      const getSizes = this.container.querySelectorAll(
        ".productPage__sizeOption"
      );
      const lastPrice = this.container.querySelector(
        ".productPage__priceProduct-lastPrice"
      );
      var saveLastPrice = 0;
      const basePrice = this.container.querySelector(
        ".productPage__priceProduct-rootPrice"
      );
      var saveBasePrice = 0;
      const nameProduct = this.container.querySelector(
        ".productPage__titleProduct-namePd"
      );
      const SKUProduct = this.container.querySelector(
        ".productPage__SKU-content"
      );
  
      const dataProduct = JSON.parse(
        this.container.querySelector("#dataProduct").innerText
      ).dataProduct;
  
      const plusBtn = this.container.querySelector(
        ".productPage__quantityAdjust-plus"
      );
      const minusBtn = this.container.querySelector(
        ".productPage__quantityAdjust-minus"
      );
      const quantity = this.container.querySelector(
        ".productPage__quantityAdjust-number"
      );
  
      const addBtn = this.container.querySelector(".productPage__btnAddtoCart");
      //////////////-Add Eventlisner-/////////////
      plusBtn.addEventListener("click", () => {
        let number = quantity.innerText;
        quantity.innerText = number * 1 + 1;
        adjustTotal();
      });
  
      minusBtn.addEventListener("click", () => {
        let number = quantity.innerText;
        if (number >= 2) {
          quantity.innerText = number * 1 - 1;
        }
        adjustTotal();
      });
      addBtn.addEventListener("click", () => {
        let index = document.querySelector(".productPage__inner").getAttribute("dataIndex");
        let quantity = document.querySelector(".productPage__quantityAdjust-number").innerText;
        addToCart(dataProduct[index].id , quantity);
      });
      /////////////////-Functional-///////////////
      const adjustTotal = () => {
        lastPrice.innerText =
          "$" + (saveLastPrice * 1 * (quantity.innerText * 1)) / 100;
        basePrice.innerText =
          "$" + (saveBasePrice * 1 * (quantity.innerText * 1)) / 100;
      };
  
      const initProduct = (index) => {
        lastPrice.innerText = "$" + dataProduct[index].compare_at_price / 100;
        saveLastPrice = dataProduct[index].compare_at_price;
        basePrice.innerText = "$" + dataProduct[index].price / 100;
        saveBasePrice = dataProduct[index].price;
        nameProduct.innerText = dataProduct[index].name.replace("-", "");
        SKUProduct.innerText = dataProduct[index].sku;
        getSizes[0].classList.add("productPage__sizeOptionActive");
      };
      const addToCart = (id,quantity) => {
        let formData = {
          items: [
            {
              id: id,
              quantity: quantity
            }
          ]
        };
        fetch(window.Shopify.routes.root + "cart/add.js", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((response) => {
            alert("Added!!!");
            return response.json();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      };
      getSizes.forEach((size) => {
        size.addEventListener("click", () => {
          let index = size.getAttribute("index");
          document.querySelector(".productPage__inner").setAttribute("dataIndex",index);
          initProduct(index);
          adjustTotal();
          getSizes.forEach((size1) => {
            if (size1.classList.contains("productPage__sizeOptionActive")) {
              size1.classList.remove("productPage__sizeOptionActive");
            }
          });
          size.classList.add("productPage__sizeOptionActive");
        });
      });
      initProduct(0);
    },
    onUnload: function () {},
    onSelect: function () {},
    onDeselect: function () {},
    onBlockSelect: function (e) {},
    onBlockDeselect: function (e) {},
  });
  
  load("*");
  
  register("product-feature", {
    onLoad: function () {
      var slider1 = tns({
        container: "#productFeature__container",
        items: 6,
        controls: false,
        mouseDrag: true,
        nav: true,
        navPosition: "bottom",
        autoplay: true,
        autoplayTimeout: 1500,
        autoplayButtonOutput: false,
        swipeAngle: false,
        speed: 400,
      });
    },
    onUnload: function () {},
    onSelect: function () {},
    onDeselect: function () {},
    onBlockSelect: function (e) {},
    onBlockDeselect: function (e) {},
  });
  
  load("*");
  
  register("product-bundle", {
    onLoad: function () {
      const checkBoxs = this.container.querySelectorAll(
        ".productBundle__option-checkbox"
      );
   
      const totalLastPrice = this.container.querySelector(".productBundle__total-lastPrice");
      const totalBasePrice = this.container.querySelector(".productBundle__total-basePrice");
      
      const updateTotal = () => {
        console.log("a")
        let checkBoxsActive = this.container.querySelectorAll(".productBundle__option-checkBoxActive") ;
        let lastPrice = 0 , basePrice = 0 ;
        checkBoxsActive.forEach(boxActive =>{
          lastPrice += boxActive.getAttribute("lastPrice")*1;
          basePrice += boxActive.getAttribute("basePrice")*1
        })
        totalLastPrice.innerText = "$" + lastPrice*1/100 ;
        totalBasePrice.innerText  = "$" + basePrice*1/100 ;
      }
      const options = this.container.querySelectorAll(".productBundle__option");
      options.forEach((option) => {
        option.addEventListener("click", () => {
          let checkbox = option.querySelector(".productBundle__option-checkBox");
          if (
            checkbox.classList.contains("productBundle__option-checkBoxActive")
          ) {
            checkbox.classList.remove("productBundle__option-checkBoxActive");
          } else {
            checkbox.classList.add("productBundle__option-checkBoxActive");
          }
          updateTotal();
        });
      });
      updateTotal();

      ///////////////////////////
      const btnAdd = this.container.querySelector(".productBundle__total-btnAddtoCart");
      btnAdd.addEventListener("click" , () => {
        addAllToCart();
      })
      const addAllToCart = () => {
          let checkBoxsActive = this.container.querySelectorAll(".productBundle__option-checkBoxActive") ;
          let formData = {
          items: [
            ] 
          };
         if (checkBoxsActive.length === 0){
           alert("Empty !!!")
         }else{
            checkBoxsActive.forEach( boxActive => {
            let data = {
              id: boxActive.getAttribute("id"),
              quantity: 1
            };
            formData.items.push(data);
          })
            fetch(window.Shopify.routes.root + "cart/add.js", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            })
            .then((response) => {
              alert("Adding all your choices !!!");
              return response.json();
            })
            .catch((error) => {
              console.error("Error:", error);
            });
          }
        }
    },
    onUnload: function () {},
    onSelect: function () {},
    onDeselect: function () {},
    onBlockSelect: function (e) {},
    onBlockDeselect: function (e) {},
  });
  
  load("*");
  
 register("upSell", {
    onLoad: function () {
      var sliderUpSell = tns({
        container: "#upSell-slider",
        items: 6,
        controls: false,
        mouseDrag: true,
        nav: true,
        navPosition: "bottom",
        autoplay: true,
        autoplayTimeout: 1500,
        autoplayButtonOutput: false,
        swipeAngle: false,
        speed: 400,
      });
    },
    onUnload: function () {},
    onSelect: function () {},
    onDeselect: function () {},
    onBlockSelect: function (e) {},
    onBlockDeselect: function (e) {},
  });
  
  load("*");


//   register("product-details", {
//     onLoad: function () {
//       var content = document.getElementsByClassName("details_tabWrap")[0];
//       var link = document.getElementsByClassName("details_tabName");
//       var text =document.getElementsByClassName("details_main2");

// for(let i=0;i< link.length;i++)
// {
//     link[i].addEventListener("click",()=>{
//         var current = document.getElementsByClassName("active")[0];
//         current.className = current.className.replace(" active","");
        
//         var current2 = document.getElementsByClassName("active2")[0];
//         current2.className = current2.className.replace(" active2","");
//         //delect active Item
//         text[i].className  += " active2";
//         link[i].className  += " active";
//         //add active to current click Item

//     })
// }

//     },
//     onUnload: function () {},
//     onSelect: function () {},
//     onDeselect: function () {},
//     onBlockSelect: function (e) {},
//     onBlockDeselect: function (e) {},
//   });
//   load("*");