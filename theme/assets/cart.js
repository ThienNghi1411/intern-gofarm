

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
      let line = e.target.parentElement.getAttribute("index");
      adjustCart(line, quantity * 1 - 1);
    });
  });

  plusBtns.forEach((plusBtn) => {
      plusBtn.addEventListener("click", (e) => {
        let quantity = e.target.parentElement.querySelector(
          ".cart__quantityLineItem"
        ).value;
        let line = e.target.parentElement.getAttribute("index");
        adjustCart(line, quantity * 1 + 1);
      });
  });

  inputQtys.forEach((inputQty) => {
    inputQty.addEventListener("change", (e) => {
      let quantity = e.target.value;
      let line = e.target.parentElement.getAttribute("index");
      adjustCart(line, quantity);
    });
  });

  if ( removeBtns){
    removeBtns.forEach( (removeBtn) => {
      removeBtn.addEventListener("click", (e) => {
        let line = e.target.getAttribute("index");
        adjustCart(line, 0);
      });
    })
  }

}

const updateLine = (data,line) => {
  const lineItem = document.getElementsByClassName("cart__item")[line];
  const itemPrice = lineItem.querySelector(".cart__itemLastPrice");
  itemPrice.innerText = "$"+ data.price / 100;
  const linePrice = lineItem.querySelector(".cart__itemSubtotal-LastPrice");
  linePrice.innerText = "$"+ data.line_price / 100;
  const qtyLine = lineItem.querySelector(".cart__quantityLineItem");
  qtyLine.value = data.quantity;
}

const removeLine = (line) => {
  const lineItem = document.getElementsByClassName("cart__item")[line];
  lineItem.remove();
}

const adjustCart = (line, quantity) => {
    console.log(line);
    fetch(window.Shopify.routes.root + "cart/change.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            'line': line,
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
          console.log(data);
          if (quantity > 0){               // checking case delete item
            updateLine(data.items[line-1] , line -1);
          }else{
            removeLine(line-1);
          }
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