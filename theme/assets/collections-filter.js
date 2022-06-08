fetch(window.Shopify.routes.root + "collections/collection-page", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  }
  })
  .then((response) => {
    console.log(response);
    return response.json();
  })
  .then(data => {
    console.log(data);
   
  })