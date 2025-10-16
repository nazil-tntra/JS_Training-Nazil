const container = document.getElementById("product-container") 

fetch("https://fakestoreapi.com/products")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);

    const products = data.map((product) => {
      return { title: product.title, price: product.price, image: product.image, rating: product.rating };
    });

    console.log(products);


    products.forEach((product)=>{
        const productCard = document.createElement("div")
        productCard.classList.add("product-card")


        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h2 class="product-name">${product.title}</h2>
            <div class="flex">
                <div class="rating">${product.rating.rate}</div>
                <p class="price">$${product.price}</p>
            </div>
            <button class="btn-cart">Add to Cart</button>
        `

        container.appendChild(productCard)
    })
  });
