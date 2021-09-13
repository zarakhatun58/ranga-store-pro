
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
      <h5 class="fw-bold">${product.title.slice(0, 30)}</h5>
      <p class="fw-bold"" style="color:coral;">Category: ${product.category}</p>
      <h5 class="fw-bold">Price: $ ${product.price}</h5>
      <h6 class="fw-bold">Total-Rating : ${product.rating.count}  </h6>
        <p>Average-rating: ${product.rating.rate} </p> 
           <h6> <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    <i class="fas fa-star-half-alt"></i>
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
  const converted = parseFloat(element);

  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);

  const total = convertedOldPrice + convertPrice;
  //console.log(total, typeof total)

  // document.getElementById(id).innerText = Math.round(total);
  document.getElementById(id).innerText = parseFloat(total.toFixed(2));
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value.toFixed(2));

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
  console.log(grandTotal);

  document.getElementById("total").innerText = (grandTotal.toFixed(2));
};



