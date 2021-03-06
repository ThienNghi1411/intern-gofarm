(() => {
  // node_modules/@shopify/theme-sections/section.js
  var SECTION_ID_ATTR = "data-section-id";
  function Section(container, properties) {
    this.container = validateContainerElement(container);
    this.id = container.getAttribute(SECTION_ID_ATTR);
    this.extensions = [];
    Object.assign(this, validatePropertiesObject(properties));
    this.onLoad();
  }
  Section.prototype = {
    onLoad: Function.prototype,
    onUnload: Function.prototype,
    onSelect: Function.prototype,
    onDeselect: Function.prototype,
    onBlockSelect: Function.prototype,
    onBlockDeselect: Function.prototype,
    extend: function extend(extension) {
      this.extensions.push(extension);
      var extensionClone = Object.assign({}, extension);
      delete extensionClone.init;
      Object.assign(this, extensionClone);
      if (typeof extension.init === "function") {
        extension.init.apply(this);
      }
    }
  };
  function validateContainerElement(container) {
    if (!(container instanceof Element)) {
      throw new TypeError("Theme Sections: Attempted to load section. The section container provided is not a DOM element.");
    }
    if (container.getAttribute(SECTION_ID_ATTR) === null) {
      throw new Error("Theme Sections: The section container provided does not have an id assigned to the " + SECTION_ID_ATTR + " attribute.");
    }
    return container;
  }
  function validatePropertiesObject(value) {
    if (typeof value !== "undefined" && typeof value !== "object" || value === null) {
      throw new TypeError("Theme Sections: The properties object provided is not a valid");
    }
    return value;
  }
  if (typeof Object.assign != "function") {
    Object.defineProperty(Object, "assign", {
      value: function assign(target) {
        "use strict";
        if (target == null) {
          throw new TypeError("Cannot convert undefined or null to object");
        }
        var to = Object(target);
        for (var index = 1; index < arguments.length; index++) {
          var nextSource = arguments[index];
          if (nextSource != null) {
            for (var nextKey in nextSource) {
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
        return to;
      },
      writable: true,
      configurable: true
    });
  }

  // node_modules/@shopify/theme-sections/theme-sections.js
  var SECTION_TYPE_ATTR = "data-section-type";
  var SECTION_ID_ATTR2 = "data-section-id";
  window.Shopify = window.Shopify || {};
  window.Shopify.theme = window.Shopify.theme || {};
  window.Shopify.theme.sections = window.Shopify.theme.sections || {};
  var registered = window.Shopify.theme.sections.registered = window.Shopify.theme.sections.registered || {};
  var instances = window.Shopify.theme.sections.instances = window.Shopify.theme.sections.instances || [];
  function register2(type, properties) {
    if (typeof type !== "string") {
      throw new TypeError("Theme Sections: The first argument for .register must be a string that specifies the type of the section being registered");
    }
    if (typeof registered[type] !== "undefined") {
      throw new Error('Theme Sections: A section of type "' + type + '" has already been registered. You cannot register the same section type twice');
    }
    function TypedSection(container) {
      Section.call(this, container, properties);
    }
    TypedSection.constructor = Section;
    TypedSection.prototype = Object.create(Section.prototype);
    TypedSection.prototype.type = type;
    return registered[type] = TypedSection;
  }
  function load2(types, containers) {
    types = normalizeType(types);
    if (typeof containers === "undefined") {
      containers = document.querySelectorAll("[" + SECTION_TYPE_ATTR + "]");
    }
    containers = normalizeContainers(containers);
    types.forEach(function(type) {
      var TypedSection = registered[type];
      if (typeof TypedSection === "undefined") {
        return;
      }
      containers = containers.filter(function(container) {
        if (isInstance(container)) {
          return false;
        }
        if (container.getAttribute(SECTION_TYPE_ATTR) === null) {
          return false;
        }
        if (container.getAttribute(SECTION_TYPE_ATTR) !== type) {
          return true;
        }
        instances.push(new TypedSection(container));
        return false;
      });
    });
  }
  function unload(selector) {
    var instancesToUnload = getInstances(selector);
    instancesToUnload.forEach(function(instance) {
      var index = instances.map(function(e) {
        return e.id;
      }).indexOf(instance.id);
      instances.splice(index, 1);
      instance.onUnload();
    });
  }
  function getInstances(selector) {
    var filteredInstances = [];
    if (NodeList.prototype.isPrototypeOf(selector) || Array.isArray(selector)) {
      var firstElement = selector[0];
    }
    if (selector instanceof Element || firstElement instanceof Element) {
      var containers = normalizeContainers(selector);
      containers.forEach(function(container) {
        filteredInstances = filteredInstances.concat(instances.filter(function(instance) {
          return instance.container === container;
        }));
      });
    } else if (typeof selector === "string" || typeof firstElement === "string") {
      var types = normalizeType(selector);
      types.forEach(function(type) {
        filteredInstances = filteredInstances.concat(instances.filter(function(instance) {
          return instance.type === type;
        }));
      });
    }
    return filteredInstances;
  }
  function getInstanceById(id) {
    var instance;
    for (var i = 0; i < instances.length; i++) {
      if (instances[i].id === id) {
        instance = instances[i];
        break;
      }
    }
    return instance;
  }
  function isInstance(selector) {
    return getInstances(selector).length > 0;
  }
  function normalizeType(types) {
    if (types === "*") {
      types = Object.keys(registered);
    } else if (typeof types === "string") {
      types = [types];
    } else if (types.constructor === Section) {
      types = [types.prototype.type];
    } else if (Array.isArray(types) && types[0].constructor === Section) {
      types = types.map(function(TypedSection) {
        return TypedSection.prototype.type;
      });
    }
    types = types.map(function(type) {
      return type.toLowerCase();
    });
    return types;
  }
  function normalizeContainers(containers) {
    if (NodeList.prototype.isPrototypeOf(containers) && containers.length > 0) {
      containers = Array.prototype.slice.call(containers);
    } else if (NodeList.prototype.isPrototypeOf(containers) && containers.length === 0) {
      containers = [];
    } else if (containers === null) {
      containers = [];
    } else if (!Array.isArray(containers) && containers instanceof Element) {
      containers = [containers];
    }
    return containers;
  }
  if (window.Shopify.designMode) {
    document.addEventListener("shopify:section:load", function(event) {
      var id = event.detail.sectionId;
      var container = event.target.querySelector("[" + SECTION_ID_ATTR2 + '="' + id + '"]');
      if (container !== null) {
        load2(container.getAttribute(SECTION_TYPE_ATTR), container);
      }
    });
    document.addEventListener("shopify:section:unload", function(event) {
      var id = event.detail.sectionId;
      var container = event.target.querySelector("[" + SECTION_ID_ATTR2 + '="' + id + '"]');
      var instance = getInstances(container)[0];
      if (typeof instance === "object") {
        unload(container);
      }
    });
    document.addEventListener("shopify:section:select", function(event) {
      var instance = getInstanceById(event.detail.sectionId);
      if (typeof instance === "object") {
        instance.onSelect(event);
      }
    });
    document.addEventListener("shopify:section:deselect", function(event) {
      var instance = getInstanceById(event.detail.sectionId);
      if (typeof instance === "object") {
        instance.onDeselect(event);
      }
    });
    document.addEventListener("shopify:block:select", function(event) {
      var instance = getInstanceById(event.detail.sectionId);
      if (typeof instance === "object") {
        instance.onBlockSelect(event);
      }
    });
    document.addEventListener("shopify:block:deselect", function(event) {
      var instance = getInstanceById(event.detail.sectionId);
      if (typeof instance === "object") {
        instance.onBlockDeselect(event);
      }
    });
  }

  // app/scripts/common/theme-section.js
  Object.assign(window, {
    load: load2,
    register: register2
  });

  // app/scripts/theme.js
  /*@license
    Gofarm by ShopThemes (https://www.shopthemes.net)
    Access unminified JS in assets/theme.js
    */
  register("product-page", {
    onLoad: function() {
      var slider = tns({
        container: "#productPage__mainImg",
        items: 1,
        navContainer: "#productPage__subImgList",
        controls: false,
        navAsThumbnails: true,
        autoplay: false,
        autoplayTimeout: 3e3,
        autoplayButtonOutput: false,
        swipeAngle: false,
        speed: 400
      });
      const dataProduct = datas;
      const initData = pdSelected;
      const plusBtn = this.container.querySelector(".productPage__quantityAdjust-plus");
      const minusBtn = this.container.querySelector(".productPage__quantityAdjust-minus");
      const quantity = this.container.querySelector(".productPage__quantityAdjust-number");
      const addBtn = this.container.querySelector(".btnAddtoCart");
      const lastPrice = document.querySelector(".productPage__priceProduct-lastPrice");
      const basePrice = document.querySelector(".productPage__priceProduct-rootPrice");
      var saveLastPrice = 0;
      var saveBasePrice = 0;
      var idProduct;
      var qtyProduct = 0;
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
        let quantity2 = document.querySelector(".productPage__quantityAdjust-number").innerText;
        checkQtyInCart(idProduct, quantity2, qtyProduct);
      });
      const adjustTotal = () => {
        lastPrice.innerText = "$" + saveLastPrice * 1 * (quantity.innerText * 1) / 100;
        if (saveBasePrice !== 0) {
          basePrice.innerText = "$" + saveBasePrice * 1 * (quantity.innerText * 1) / 100;
        }
      };
      var optionList = {
        option1: [],
        option2: [],
        option3: []
      };
      var optionActive = {
        option1: "",
        option2: "",
        option3: ""
      };
      const checkQtyInCart = (idProduct2, qtyInput, qtyProduct2) => {
        if (qtyInput > qtyProduct2) {
          alert("Your input quantity of product is out of quantity of product in our inventory . Please try again !!!");
          return;
        }
        fetch(window.Shopify.routes.root + "cart.js", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }).then((response) => {
          return response.json();
        }).then((data) => {
          let check = true;
          data.items.forEach((tmp) => {
            if (tmp.variant_id == idProduct2 && qtyInput * 1 + tmp.quantity * 1 > qtyProduct2 * 1) {
              check = false;
            }
          });
          if (check === false) {
            alert("You can't add more this product to the cart.");
          } else {
            addToCart(idProduct2, qtyInput);
          }
        }).catch((error) => {
          console.error("Error:", error);
        });
      };
      const addToCart = (id, quantity2) => {
        let formData = {
          items: [
            {
              id,
              quantity: quantity2
            }
          ]
        };
        fetch(window.Shopify.routes.root + "cart/add.js", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }).then((response) => {
          alert("Added!!!");
          return response.json();
        }).then((data) => {
          let qtyCarts = document.querySelectorAll(".qtyCart");
          qtyCarts.forEach((qtyCart) => {
            qtyCart.innerText = qtyCart.innerText * 1 + quantity2 * 1;
          });
        }).catch((error) => {
          console.error("Error:", error);
        });
      };
      const variants = document.querySelectorAll(".productPage__sizeCont-content");
      variants.forEach((variant, i) => {
        let variantName = variant.querySelector(".productPage__sizeCont-text").innerText;
        let className = variantName + "list";
        const variantList = variant.querySelectorAll(`.${className}-option`);
        let tmp = `option${i + 1}`;
        optionList[tmp] = variantList;
      });
      const getTitle = (option1, option2, option3) => {
        if (option3 !== "" && option2 !== "") {
          return option1 + " / " + option2 + " / " + option3;
        } else if (option3 === "" && option2 !== "") {
          return option1 + " / " + option2;
        } else if (option2 === "") {
          return option1;
        }
      };
      const getProduct = (datas2, title) => {
        let tmp;
        let btnAdd = document.querySelector(".btnAddtoCart");
        let btnUnavailable = document.querySelector(".unavailableProduct");
        datas2.forEach((data) => {
          if (data.title === title) {
            tmp = data;
          }
        });
        if (tmp === void 0) {
          btnAdd.style.display = "none";
          btnUnavailable.style.display = "flex";
        } else {
          btnAdd.style.display = "flex";
          btnUnavailable.style.display = "none";
          return tmp;
        }
        ;
      };
      const updateProduct = (data) => {
        let btnAdd = document.querySelector(".btnAddtoCart");
        let btnUnavailable = document.querySelector(".unavailableProduct");
        let qty = document.querySelector(".productPage__quantityCont-inStock");
        if (data !== void 0) {
          idProduct = data.id;
          qtyProduct = data.qty;
          let pdName = document.querySelector(".productPage__titleProduct-namePd");
          pdName.innerText = data.name;
          if (data.compare_at_price === null) {
            lastPrice.innerText = "$" + data.price / 100;
            saveLastPrice = data.price;
            basePrice.innerText = "";
            saveBasePrice = 0;
          } else {
            lastPrice.innerText = "$" + data.price / 100;
            saveLastPrice = data.price;
            basePrice.innerText = "$" + data.compare_at_price / 100;
            saveBasePrice = data.compare_at_price;
          }
          let sku = document.querySelector(".productPage__SKU-content");
          sku.innerText = data.sku;
          const url = new URL(window.location);
          url.searchParams.set("variant", data.id);
          window.history.pushState({}, "", url);
          adjustTotal();
          if (data.qty === "0") {
            btnAdd.style.display = "none";
            btnUnavailable.style.display = "flex";
            btnUnavailable.innerText = "Out Of Stock!!!";
            qty.innerText = "";
          } else {
            btnAdd.style.display = "flex";
            btnUnavailable.style.display = "none";
            qty.innerText = `Only ${data.qty} left in stock`;
          }
        } else {
          btnUnavailable.innerText = "Unavaliable";
          qty.innerText = "";
        }
      };
      for (let key in optionList) {
        if (optionList[key].length > 0) {
          optionList[key].forEach((option) => {
            option.addEventListener("click", () => {
              optionList[key].forEach((tmp) => {
                if (tmp.classList.contains("productPage__sizeOptionActive")) {
                  tmp.classList.remove("productPage__sizeOptionActive");
                }
              });
              option.classList.add("productPage__sizeOptionActive");
              optionActive[key] = option.innerText;
              let title = getTitle(optionActive.option1, optionActive.option2, optionActive.option3);
              let dataPd = getProduct(dataProduct, title);
              updateProduct(dataPd);
            });
          });
        }
      }
      const init = () => {
        initData.option1 !== null ? optionActive.option1 = initData.option1 : optionActive.option1 = "";
        initData.option2 !== null ? optionActive.option2 = initData.option2 : optionActive.option2 = "";
        initData.option3 !== null ? optionActive.option3 = initData.option3 : optionActive.option3 = "";
        for (let key in optionList) {
          if (optionList[key].length > 0) {
            optionList[key].forEach((option) => {
              if (option.innerText === optionActive[key]) {
                option.classList.add("productPage__sizeOptionActive");
              }
            });
          }
        }
        let title = getTitle(optionActive.option1, optionActive.option2, optionActive.option3);
        let dataPd = getProduct(dataProduct, title);
        updateProduct(dataPd);
      };
      init();
    },
    onUnload: function() {
    },
    onSelect: function() {
    },
    onDeselect: function() {
    },
    onBlockSelect: function(e) {
    },
    onBlockDeselect: function(e) {
    }
  });
  load("*");
  register("product-feature", {
    onLoad: function() {
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
            items: 3
          },
          1024: {
            items: 4
          },
          1240: {
            items: 6
          }
        }
      });
    },
    onUnload: function() {
    },
    onSelect: function() {
    },
    onDeselect: function() {
    },
    onBlockSelect: function(e) {
    },
    onBlockDeselect: function(e) {
    }
  });
  load("*");
  register("product-bundle", {
    onLoad: function() {
      const dataProduct = JSON.parse(this.container.querySelector("#dataProduct").innerText).dataProduct;
      const lastPrice = this.container.querySelectorAll(".productBundle__discount_price");
      const basePrice = this.container.querySelectorAll(".productBundle__base_price");
      const optionLastPrice = this.container.querySelectorAll(".productBundle__option-discountPrice");
      const optionBasePrice = this.container.querySelectorAll(".productBundle__option-basePrice");
      const optionQty = this.container.querySelectorAll(".productBundle__option-quantity");
      const checkBoxsActive = this.container.querySelectorAll(".productBundle__option-checkBoxActive");
      const checkBoxs = this.container.querySelectorAll(".productBundle__option-checkBox");
      const updateInfo = (value, index) => {
        fetch(window.Shopify.routes.root + "products/" + dataProduct[index] + ".js", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }).then((response) => {
          return response.json();
        }).then((data) => {
          console.log(data);
          data.variants.forEach((tmp) => {
            console.log(value);
            if (tmp.title === value) {
              lastPrice[index].innerText = "$" + tmp.compare_at_price / 100;
              basePrice[index].innerText = "$" + tmp.price / 100;
              optionLastPrice[index].innerText = "$" + tmp.compare_at_price / 100;
              optionBasePrice[index].innerText = "$" + tmp.price / 100;
              optionQty[index].innerText = tmp.title;
              checkBoxs[index].setAttribute("lastprice", tmp.compare_at_price);
              checkBoxs[index].setAttribute("basePrice", tmp.price);
              checkBoxs[index].setAttribute("id", tmp.id);
            }
          });
          updateTotal();
        }).catch((error) => {
          console.error("Error:", error);
        });
      };
      const selectBox = document.querySelectorAll(".selectOption");
      selectBox.forEach((select, index) => {
        select.addEventListener("change", (e) => {
          updateInfo(e.target.value, index);
        });
      });
      const init = () => {
        selectBox.forEach((select, index) => {
          updateInfo(select.value, index);
        });
        updateTotal();
      };
      const totalLastPrice = this.container.querySelector(".productBundle__total-lastPrice");
      const totalBasePrice = this.container.querySelector(".productBundle__total-basePrice");
      const updateTotal = () => {
        let checkBoxsActive2 = this.container.querySelectorAll(".productBundle__option-checkBoxActive");
        let lastPrice2 = 0, basePrice2 = 0;
        checkBoxsActive2.forEach((boxActive) => {
          lastPrice2 += boxActive.getAttribute("lastPrice") * 1;
          basePrice2 += boxActive.getAttribute("basePrice") * 1;
        });
        totalLastPrice.innerText = "$" + lastPrice2 * 1 / 100;
        totalBasePrice.innerText = "$" + basePrice2 * 1 / 100;
      };
      const options = this.container.querySelectorAll(".productBundle__option");
      options.forEach((option) => {
        option.addEventListener("click", () => {
          let checkbox = option.querySelector(".productBundle__option-checkBox");
          if (checkbox.classList.contains("productBundle__option-checkBoxActive")) {
            checkbox.classList.remove("productBundle__option-checkBoxActive");
          } else {
            checkbox.classList.add("productBundle__option-checkBoxActive");
          }
          updateTotal();
        });
      });
      init();
      const btnAdd = this.container.querySelector(".productBundle__total-btnAddtoCart");
      btnAdd.addEventListener("click", () => {
        addAllToCart();
      });
      const addAllToCart = () => {
        let checkBoxsActive2 = this.container.querySelectorAll(".productBundle__option-checkBoxActive");
        let formData = {
          items: []
        };
        if (checkBoxsActive2.length === 0) {
          alert("Empty !!!");
        } else {
          checkBoxsActive2.forEach((boxActive) => {
            let data = {
              id: boxActive.getAttribute("id"),
              quantity: 1
            };
            formData.items.push(data);
          });
          console.log(formData);
          fetch(window.Shopify.routes.root + "cart/add.js", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
          }).then((response) => {
            alert("Adding all your choices !!!");
            return response.json();
          }).then((data) => {
            let qtyCarts = document.querySelectorAll(".qtyCart");
            qtyCarts.forEach((qtyCart) => {
              qtyCart.innerText = qtyCart.innerText * 1 + formData.items.length;
            });
          }).catch((error) => {
            console.error("Error:", error);
          });
        }
      };
    },
    onUnload: function() {
    },
    onSelect: function() {
    },
    onDeselect: function() {
    },
    onBlockSelect: function(e) {
    },
    onBlockDeselect: function(e) {
    }
  });
  load("*");
  register("upSell", {
    onLoad: function() {
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
        speed: 400
      });
    },
    onUnload: function() {
    },
    onSelect: function() {
    },
    onDeselect: function() {
    },
    onBlockSelect: function(e) {
    },
    onBlockDeselect: function(e) {
    }
  });
  load("*");
})();
