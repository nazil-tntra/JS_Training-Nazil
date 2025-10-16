fetch("https://fakestoreapi.com/products")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);

    const products = data.map((product) => {
      return { title: product.title, price: product.price };
    });

    console.log(products)


    
  });
