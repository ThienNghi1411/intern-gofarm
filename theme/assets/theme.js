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
        autoplay: true,
        autoplayTimeout: 3e3,
        autoplayButtonOutput: false,
        swipeAngle: false,
        speed: 400
      });
      const getSizes = this.container.querySelectorAll(".productPage__sizeOption");
      const lastPrice = this.container.querySelector(".productPage__priceProduct-lastPrice");
      var saveLastPrice = 0;
      const basePrice = this.container.querySelector(".productPage__priceProduct-rootPrice");
      var saveBasePrice = 0;
      const nameProduct = this.container.querySelector(".productPage__titleProduct-namePd");
      const SKUProduct = this.container.querySelector(".productPage__SKU-content");
      const dataProduct = JSON.parse(this.container.querySelector("#dataProduct").innerText).dataProduct;
      const plusBtn = this.container.querySelector(".productPage__quantityAdjust-plus");
      const minusBtn = this.container.querySelector(".productPage__quantityAdjust-minus");
      const quantity = this.container.querySelector(".productPage__quantityAdjust-number");
      const addBtn = this.container.querySelector(".productPage__btnAddtoCart");
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
        let quantity2 = document.querySelector(".productPage__quantityAdjust-number").innerText;
        addToCart(dataProduct[index].id, quantity2);
      });
      const adjustTotal = () => {
        lastPrice.innerText = "$" + saveLastPrice * 1 * (quantity.innerText * 1) / 100;
        basePrice.innerText = "$" + saveBasePrice * 1 * (quantity.innerText * 1) / 100;
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
        }).catch((error) => {
          console.error("Error:", error);
        });
      };
      getSizes.forEach((size) => {
        size.addEventListener("click", () => {
          let index = size.getAttribute("index");
          document.querySelector(".productPage__inner").setAttribute("dataIndex", index);
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
  register("product-bundle", {
    onLoad: function() {
      const checkBoxs = this.container.querySelectorAll(".productBundle__option-checkbox");
      const totalLastPrice = this.container.querySelector(".productBundle__total-lastPrice");
      const totalBasePrice = this.container.querySelector(".productBundle__total-basePrice");
      const updateTotal = () => {
        console.log("a");
        let checkBoxsActive = this.container.querySelectorAll(".productBundle__option-checkBoxActive");
        let lastPrice = 0, basePrice = 0;
        checkBoxsActive.forEach((boxActive) => {
          lastPrice += boxActive.getAttribute("lastPrice") * 1;
          basePrice += boxActive.getAttribute("basePrice") * 1;
        });
        totalLastPrice.innerText = "$" + lastPrice * 1 / 100;
        totalBasePrice.innerText = "$" + basePrice * 1 / 100;
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
      updateTotal();
      const btnAdd = this.container.querySelector(".productBundle__total-btnAddtoCart");
      btnAdd.addEventListener("click", () => {
        addAllToCart();
      });
      const addAllToCart = () => {
        let checkBoxsActive = this.container.querySelectorAll(".productBundle__option-checkBoxActive");
        let formData = {
          items: []
        };
        if (checkBoxsActive.length === 0) {
          alert("Empty !!!");
        } else {
          checkBoxsActive.forEach((boxActive) => {
            let data = {
              id: boxActive.getAttribute("id"),
              quantity: 1
            };
            formData.items.push(data);
          });
          fetch(window.Shopify.routes.root + "cart/add.js", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
          }).then((response) => {
            alert("Adding all your choices !!!");
            return response.json();
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
