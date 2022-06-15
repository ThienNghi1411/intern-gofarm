

const init = () => {
  const minusBtns = document.querySelectorAll(".cart__minusBtn");
  const plusBtns = document.querySelectorAll(".cart__plusBtn");
  const removeBtns = document.querySelectorAll(".cart__btnRemove");
  const inputQtys = document.querySelectorAll(".cart__quantityLineItem");


  minusBtns.forEach((minusBtn) => {
    minusBtn.addEventListener("click", (e) => {
      let quantity = e.target.parentElement.querySelector(
        ".cart__quantityLineItem"
      ).value;
      // 
      let id = e.target.parentElement.getAttribute("idProduct");
      if(quantity*1 > 1){
        adjustCart(id, quantity * 1 - 1 , e.target);
      }else{
        adjustCart(id, quantity * 1 - 1 , e.target.parentElement.parentElement);
      }
      
    });
  });

  plusBtns.forEach((plusBtn) => {
      plusBtn.addEventListener("click", (e) => {
        let quantity = e.target.parentElement.querySelector(
          ".cart__quantityLineItem"
        ).value;
        let id = e.target.parentElement.getAttribute("idProduct");
        adjustCart(id, quantity * 1 + 1 , e.target);
      });
  });

  inputQtys.forEach((inputQty) => {
    inputQty.addEventListener("change", (e) => {
      let quantity = e.target.value;
      let id = e.target.parentElement.getAttribute("idProduct");
      adjustCart(id, quantity, e.target);
    });
  });


  removeBtns.forEach( (removeBtn ) => {
    removeBtn.addEventListener("click", (e) => {
      let id = e.target.getAttribute("idProduct");
      adjustCart(id, 0 , e.target);
     
    });
  })
  

}

const updateLine = (data,index) => {
  console.log(data);
  const lineItem = document.getElementsByClassName("cart__item")[index];
  const itemPrice = lineItem.querySelector(".cart__itemLastPrice");
  itemPrice.innerText = "$"+ data.price / 100;
  const linePrice = lineItem.querySelector(".cart__itemSubtotal-LastPrice");
  linePrice.innerText = "$"+ data.line_price / 100;
  const qtyLine = lineItem.querySelector(".cart__quantityLineItem");
  qtyLine.value = data.quantity;
}

const adjustCart = (id, quantity , dom) => {

    fetch(window.Shopify.routes.root + "cart/change.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            'id': id,
            'quantity': quantity,
            'sections': "main-cart-items",
            'sections_url': window.location.pathname
        }),
        })
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then(data => {
          if (quantity > 0){               // checking case delete item
            data.items.forEach( (tmp ,index) => {
              if(tmp.id === id*1){
                updateLine(tmp , index);
              }
            })
           
          }else{
            console.log(dom.parentElement.parentElement);
            dom.parentElement.parentElement.remove();
          }
          let qtyCarts = document.querySelectorAll(".qtyCart");
          qtyCarts.forEach(qtyCart => {
            qtyCart.innerText = data.item_count;
          }) 
          const subTotal = document.querySelector(".cart__total-subTotal-content");
          const lastTotal = document.querySelector(".cart__total-total-content")
          subTotal.innerText =  "$" + data.original_total_price/100;
          lastTotal.innerText =  "$" + data.total_price/100;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
};

init();