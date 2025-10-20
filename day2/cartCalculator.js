const container = document.getElementById("product-container");

let products = [];

const cart = [];

const fetchAllProducts = async () => {
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
        <button class="add-to-cart-btn">Add to Cart</button>
    `;

    container.appendChild(productCard);

    const btn = productCard.querySelector(".add-to-cart-btn");

    btn.addEventListener("click", function () {
      // console.log(product)
      addToCart(product);

      /* Success Message */
      // const successMsgContainer = document.createElement("div")
      // successMsgContainer.classList.add("success-msg-container")

      const p = document.createElement("p")
      p.classList.add("success-message")
      productCard.appendChild(p)
      p.textContent = "Product Added ✅"
      // console.log(productCard.lastElementChild)
    
      const elemToRemove = productCard.lastElementChild;
      setTimeout(()=>{
        productCard.removeChild(elemToRemove)
      },1000)
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

  /* const successMsgContainer = document.createElement("div")
  successMsgContainer.classList.add("success-msg-container")

  const p = document.createElement("p")
  p.textContent = "Product Added ✅"
  p.classList.add("success-message")
  successMsgContainer.appendChild(p)

  document.appendChild(successMsgContainer) */

  // console.log("Cart : ", cart);

  cartCalculation();
}

function cartCalculation() {
  const cartData = JSON.parse(localStorage.getItem("cart")) || [];

  console.log("My Cart", cartData);

  let subTotal = 0,
    totalQuantity = 0;
  cartData.forEach((product) => {
    subTotal += product.price * product.quantity;
    totalQuantity += product.quantity;
  });

  const { totalDiscount, quantityDiscount, priceDiscount } = getDiscount(
    totalQuantity,
    subTotal
  );
  const finalTotal = getFinalTotal(subTotal, totalDiscount);

  displayCart(cartData, subTotal, quantityDiscount, priceDiscount, finalTotal);
}

function getDiscount(totalQuantity, actualPrice) {
  let quantityDiscount = 0;
  let priceDiscount = 0;
  let subTotal = actualPrice;

  if (totalQuantity > 10) {
    quantityDiscount = actualPrice * 0.1;
    subTotal -= quantityDiscount;
  }

  if (actualPrice > 500) {
    priceDiscount = subTotal * 0.05;
  }

  let totalDiscount = quantityDiscount + priceDiscount;

  return { totalDiscount, quantityDiscount, priceDiscount };
}

function getFinalTotal(subTotal, discount) {
  let finalTotal = subTotal - discount;

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

async function main() {
  await displayProducts();
  cartCalculation();

  const resetCartBtn = document.getElementById("reset-cart-btn");

  console.log(resetCartBtn);

  resetCartBtn.addEventListener("click", function () {
    localStorage.removeItem("cart");

    displayCart([], 0, 0, 0, 0);
  });
}

main();
