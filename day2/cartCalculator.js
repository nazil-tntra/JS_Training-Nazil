const container = document.getElementById("product-container");

const cart = [];

const fetchAllProducts = () => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    resolve(data);
  });
};

const displayProducts = async () => {
  const productsData = await fetchAllProducts();
  // console.log(productsData);

  const products = productsData.map((product) => {
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      rating: product.rating,
    };
  });

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h2 class="product-name">${product.title}</h2>
        <div class="flex">
            <div class="rating">${product.rating.rate}</div>
            <p class="price">$${product.price}</p>
        </div>
        <button class="add-to-cart-btn" id="${product.id}">Add to Cart</button>
    `;

    container.appendChild(productCard);
    
    const btn = productCard.querySelector(".add-to-cart-btn");

    btn.addEventListener("click",function() {
      // console.log(product)
      addToCart(product)
    })

  });

    
};

displayProducts();

function addToCart(product) {
  const existingItem = cart.find((p) => p.id == product.id);

  if(existingItem) {
    existingItem.quantity += 1;
  }
  else{
    cart.push({...product, quantity: 1});
  }


  localStorage.setItem("cart",JSON.stringify(cart))

  console.log("Cart : ", cart)
}
