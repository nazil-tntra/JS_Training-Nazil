const container = document.getElementById("product-container");

let products = [];

const cart = [];

const fetchAllProducts = async() => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    return data;
};


const displayProducts = async () => {
  const productsData = await fetchAllProducts();
  // console.log(productsData);

  products = productsData.map((product) => {
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

    btn.addEventListener("click", function () {
      // console.log(product)
      addToCart(product);
    });
  });
};


function addToCart(product) {
  const existingItem = cart.find((p) => p.id == product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  console.log("Cart : ", cart);

  cartCalculation();
}

function cartCalculation() {
  const cartData = JSON.parse(localStorage.getItem("cart")) || [];

  /* if (cartData.length == 0) {
    document.getElementById(
      "cart-table-container"
    ).innerHTML = `<p class="empty-cart">Your Cart is Empty!</p>`;
    return;
  } */

  // const myLocalCart
  console.log("My Cart", cartData);

  let totalPrice = 0;
  if(cartData.length){
    totalPrice = cartData.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }

  let totalQuantity = 0;
  cartData.forEach((product) => {
    totalQuantity += product.quantity;
  });

  const { totalDiscount, quantityDiscount, priceDiscount } = getDiscount(
    totalQuantity,
    totalPrice
  );
  const finalTotal = getFinalTotal(totalPrice, totalDiscount);

  displayCart(
    cartData,
    totalPrice,
    quantityDiscount,
    priceDiscount,
    finalTotal
  );
}

function getDiscount(totalQuantity, totalPrice) {
  let quantityDiscount = 0;
  let priceDiscount = 0;
  let subTotal = totalPrice;

  if (totalQuantity > 10) {
    quantityDiscount = totalPrice / 10;
    subTotal -= quantityDiscount;
  }

  if (totalPrice > 500) {
    priceDiscount = subTotal / 20;
  }

  let totalDiscount = quantityDiscount + priceDiscount;

  return { totalDiscount, quantityDiscount, priceDiscount };
}

function getFinalTotal(totalPrice, discount) {
  let finalTotal = totalPrice - discount;

  return finalTotal;
}


function displayCart(
  cartData,
  totalPrice,
  quantityDiscount,
  priceDiscount,
  finalTotal
) {
  console.log(`Subtotal: $${totalPrice.toFixed(2)}`);
  console.log(`Quantity Discount (10%): -$${quantityDiscount.toFixed(2)}`);
  console.log(`Price Discount (5%): -$${priceDiscount.toFixed(2)}`);
  console.log(`Final Total: $${finalTotal.toFixed(2)}`);

  if (cartData.length) {
    const table = document.getElementById("cart-table");

    let tableHTML = `
      <thead>
        <tr>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
  `;

    // console.log("My Products", products)
    /*  cartData.forEach((product)=>{
     tableHTML += `
      <tr>
        <td>${product.title}</td>
        <td>${product.price.toFixed(2)}</td>
        <td>${product.quantity}</td>
        <td>${(product.price * product.quantity).toFixed(2)}</td>
      </tr>
    `;
  }) */

    tableHTML += `
      
        <tr>
          <td>Subtotal</td>
          <td>$${totalPrice.toFixed(2)}</td>
        </tr>
        <tr><td>Quantity Discount (10%)</td><td>-$${quantityDiscount.toFixed(
          2
        )}</td></tr>
        <tr><td>Price Discount (5%)</td><td>-$${priceDiscount.toFixed(
          2
        )}</td></tr>
        <tr><td><strong>Final Total</strong></td><td><strong>$${finalTotal.toFixed(
          2
        )}</strong></td></tr>
      </tbody>  

  `;

    table.innerHTML = tableHTML;
  }
}

async function main() {

  await displayProducts();
  cartCalculation();

   const resetCartBtn = document.getElementById("reset-cart-btn");

  console.log(resetCartBtn);

  resetCartBtn.addEventListener("click", function () {
    localStorage.removeItem("cart");

    displayCart();
  }); 
}

main();
