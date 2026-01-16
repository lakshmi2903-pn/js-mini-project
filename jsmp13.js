let allProducts = [];

async function fetchProducts() {
  try {
    const response = await fetch("products.json");
    allProducts = await response.json();
    displayProducts(allProducts);
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

// 2. Display Products
function displayProducts(products) {
  const catalog = document.getElementById("catalog");
  catalog.innerHTML = products
    .map(
      (p) => `
        <div class="card" onclick="showDetails(${p.id})">
            <h3>${p.name}</h3>
            <p class="category">${p.category}</p>
            <p class="price">$${p.price}</p>
        </div>
    `
    )
    .join("");
}

// 3. Filtering logic
function filterByPrice(limit) {
  const filtered = allProducts.filter((p) => p.price < limit);
  displayProducts(filtered);
}

// 4. Sorting logic
function sortProducts(order) {
  const sorted = [...allProducts].sort((a, b) => a.price - b.price);
  displayProducts(sorted);
}

// 5. Product Details (Modal)
function showDetails(id) {
  const product = allProducts.find((p) => p.id === id);
  document.getElementById("modal-name").innerText = product.name;
  document.getElementById("modal-desc").innerText = product.desc;
  document.getElementById("modal-price").innerText = `Price: $${product.price}`;
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

fetchProducts();
