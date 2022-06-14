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
        autoplay: false,
        autoplayTimeout: 3000,
        autoplayButtonOutput: false,
        swipeAngle: false,
        speed: 400,
      });

      //-------------------------------------------------------------------//
      console.log(cartInfo);
      const dataProduct = datas;
      const plusBtn = this.container.querySelector(
        ".productPage__quantityAdjust-plus"
        );
      const minusBtn = this.container.querySelector(
        ".productPage__quantityAdjust-minus"
      );
      const quantity = this.container.querySelector(
        ".productPage__quantityAdjust-number"
      );
      const addBtn = this.container.querySelector(".btnAddtoCart");
      const lastPrice = document.querySelector(".productPage__priceProduct-lastPrice");
      const basePrice = document.querySelector(".productPage__priceProduct-rootPrice");
      var saveLastPrice = 0;
      var saveBasePrice = 0;
      var idProduct;
      var qtyProduct= 0;

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
  
        let quantity = document.querySelector(".productPage__quantityAdjust-number").innerText;
        checkQtyInCart(idProduct, quantity , qtyProduct);
      });
      const adjustTotal = () => {
        lastPrice.innerText =
        "$" + (saveLastPrice * 1 * (quantity.innerText * 1)) / 100;
        basePrice.innerText =
          "$" + (saveBasePrice * 1 * (quantity.innerText * 1)) / 100;
      }
      var optionList = {
        option1: [],
        option2: [],
        option3: []
      }

      var optionActive = {
        option1: "",
        option2: "",
        option3: ""
      }

      const checkQtyInCart = (idProduct , qtyInput , qtyProduct) => {
          if (qtyInput > qtyProduct  ){
            alert("Your input quantity of product is out of quantity of product in our inventory . Please try again !!!")
            return;
          }
          fetch(window.Shopify.routes.root + "cart.js", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            }
          })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            let check = true;
            data.items.forEach( tmp => {
              if (tmp.variant_id == idProduct && qtyInput*1 + tmp.quantity*1 > qtyProduct*1 ){   
                  check = false;
              }
            })
            if(check === false ){
              alert("You can't add more this product to the cart.");
            }else{
              addToCart(idProduct , qtyInput );
            }

          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
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

      const variants = document.querySelectorAll(".productPage__sizeCont-content");
      variants.forEach( (variant , i ) => {
        let variantName = variant.querySelector(".productPage__sizeCont-text").innerText;
        let className = variantName+"list";
        const variantList = variant.querySelectorAll(`.${ className }-option`);
        let tmp = `option${i+1}`;
        optionList[tmp] = variantList;
      })
      
      const getTitle = (option1 , option2 , option3) => {
        if (option3 !== "" && option2 !== "" ){
          return option1 + " / " + option2 + " / " + option3;
        }
        else if (option3 === "" && option2 !== "" ){
          return option1 + " / " + option2 ;
        }else if(option2 === ""){
            return option1;
        }
      }

      const getProduct = (datas , title  ) => {
        let tmp ;
        let btnAdd = document.querySelector(".btnAddtoCart");
        let btnUnavailable = document.querySelector(".unavailableProduct");
        datas.forEach(data => {
          if (data.title === title){
            tmp = data ;
          }
        })
        if (tmp === undefined){
          btnAdd.style.display = "none";
          btnUnavailable.style.display = "flex";
        }else{
          btnAdd.style.display = "flex";
          btnUnavailable.style.display = "none";
          return tmp;
        };
      }

      const updateProduct = (data) => {
        let btnAdd = document.querySelector(".btnAddtoCart");
        let btnUnavailable = document.querySelector(".unavailableProduct");
        if (data !== undefined){
          idProduct = data.id;
          qtyProduct = data.qty;
          let pdName = document.querySelector(".productPage__titleProduct-namePd");
          pdName.innerText = data.name;
          lastPrice.innerText = "$"+ data.price/100;
          saveLastPrice = data.price;
          basePrice.innerText = "$"+ data.price/100;
          saveBasePrice = data.price;
          let sku = document.querySelector(".productPage__SKU-content");
          sku.innerText = data.sku;
          let qty = document.querySelector(".productPage__quantityCont-inStock");
          qty.innerText = `Only ${data.qty} left in stock`;
          adjustTotal();
          if (data.qty === "0"){
            btnAdd.style.display = "none";
            btnUnavailable.style.display = "flex";
            btnUnavailable.innerText = "Out Of Stock!!!"
          }else{
            btnAdd.style.display = "flex";
            btnUnavailable.style.display = "none";
          }
        }else{
          btnUnavailable.innerText = "Unavaliable";
        }

      }
      for (let key in optionList) {
        if(optionList[key].length > 0){
          optionList[key].forEach(option => {
            option.addEventListener('click' , ()=> {
              optionList[key].forEach(tmp => {
                if(tmp.classList.contains("productPage__sizeOptionActive")){
                  tmp.classList.remove("productPage__sizeOptionActive");
                }
              })
              option.classList.add("productPage__sizeOptionActive");
              optionActive[key]=option.innerText;
              let title = getTitle(optionActive.option1 , optionActive.option2 , optionActive.option3);
              let dataPd = getProduct(dataProduct, title);
              updateProduct(dataPd);
            })
          })
        }
      }
      
      const init = () => {
        if(optionList.option1[0] !== undefined){
           optionList.option1[0].classList.add("productPage__sizeOptionActive");
           optionActive.option1 =  optionList.option1[0].innerText ;
        }
        if(optionList.option2[0] !== undefined){
           optionList.option2[0].classList.add("productPage__sizeOptionActive");
           optionActive.option2 =  optionList.option2[0].innerText ;
        }
        if(optionList.option3[0] !== undefined){
           optionList.option3[0].classList.add("productPage__sizeOptionActive");
           optionActive.option3 =  optionList.option3[0].innerText ;
        }
        let title = getTitle(optionActive.option1 , optionActive.option2 , optionActive.option3);
        let dataPd = getProduct(dataProduct, title);
        updateProduct(dataPd);
      }

      init();
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
        items: 2,
        controls: false,
        mouseDrag: true,
        nav: true,
        navPosition: "bottom",
        autoplay: true,
        autoplayTimeout: 1500,
        autoplayButtonOutput: false,
        swipeAngle: false,
        speed: 400,
        responsive: {
          600: {
            items: 3,
          },
          1024: {
            items: 4,
          },
          1240: {
            items: 6,
          }
        },
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


