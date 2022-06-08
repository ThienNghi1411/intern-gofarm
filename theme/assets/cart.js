

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
          document.querySelector(".main-cart-items").innerHTML = data.sections['main-cart-items']; 
          init();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
};

init();