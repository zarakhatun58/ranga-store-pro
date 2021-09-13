const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;

  //console.log(url)
  fetch(url)
    .then((response) => response.json())
    //.then((data) => console.log(data));
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((product) => product);
  for (const product of allProducts) {
    const image = product.image;
    //  solve destructuring
    const { rate, count } = product.rating;

    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h5>${product.title.slice(0, 30)}</h5>
      <p>Category: ${product.category}</p>
      <h5>Price: $ ${product.price}</h5>
      <h6>Total-Rating : ${count}   </h6>
        <p>Average-rating: ${rate} </p> 
        <h6> <i class="fas fa-star" id="star"></i></i>
    <i class="fas fa-star" id="star"></i>
    <i class="fas fa-star" id="star"></i>
    </h6>

        
    <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-secondary">add to cart</button>
    <button id="details-btn" onclick='showDetails(${product.price},${rate})' class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button></div>
    `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  //console.log(price, typeof price)

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;

  updateTotal();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseInt(element);

  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);

  const total = convertedOldPrice + convertPrice;
  //console.log(total, typeof total)

  document.getElementById(id).innerText = Math.round(total);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  console.log(
    getInputValue("price"),
    getInputValue("delivery-charge"),
    getInputValue("total-tax")
  );


  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  //console.log(grandTotal);

  document.getElementById("total").innerText = grandTotal.toFixed(2);
};


// const showDetails = (price, rating) => {
//   //console.log(price, rating)

//   document.getElementById("modal-body").innerHTML = ` <div class="p-4">
//     <p> Rating:${Array.from(Array(parseInt(rating)).keys()).map(
//     (r) => '<i class="bi bi-star-fill text-warning"></i>'
//   )}</p>
//     <h2>Price: $ ${price}</h2></p>

//   </div > `;


// }
