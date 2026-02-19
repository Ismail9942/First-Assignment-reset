const loadData = async () => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products`);
    const data = await res.json();

    displayProducts(data, "product-card", 6);
    displayProducts(data, "all-products-container");
  } catch (err) {
    console.log("data fetch error", err);
  }
};

const displayProducts = (products, containerId, limit) => {
  const productsContainer = document.getElementById(containerId);

  if (!productsContainer) {
    console.log(`Container with id "${containerId}" not found`);
    return;
  }
  productsContainer.textContent = "";

  const data = limit ? products.slice(0, limit) : products;

  data.forEach((product) => {
    const card = document.createElement("div");
    card.classList = `mx-auto`;

    card.innerHTML = `
    <div class="card w-72 shadow-md">
          <figure class="bg-gray-200 w-full h-[250px]">
            <img
              src="${product.image}"
              alt="product imagee"
              class="rounded-xl w-[150px] py-6 object-cover"
            />
          </figure>
          <div class="card-body">
            <div class="flex justify-between text-[12px]">
              <span class="bg-blue-200 text-blue-500 rounded-xl px-2">
                ${product.category}
              </span>
              <p class="text-end"><i class="fa-solid fa-star"></i> ${product?.rating?.rate} (${product?.rating?.count})</p>
            </div>
            <h2 class="text-md font-semibold">${product.title.slice(0, 30)}...</h2>
            <h3 class="font-semibold text-lg">$${product.price}</h3>
            <div class="flex gap-4 justify-between">
              <button class="w-1/2 btn btn-soft">
                <i class="fa-regular fa-eye"></i>
                Details
              </button>
              <button class="btn w-1/2 btn-primary">
                <i class="fa-solid fa-cart-shopping"></i>
                Add
              </button>
            </div>
          </div>
        </div>
    `;
    productsContainer.appendChild(card);
  });
  // console.log(products);
};

const allCategories = async () => {
  const res = await fetch(`https://fakestoreapi.com/products/categories`);
  const categories = await res.json();

  // container
  const btnContainer = document.getElementById("btn-container");
  btnContainer.textContent = "";

  // All button
  const categoriesWithAll = ["all", ...categories];

  categoriesWithAll.forEach((category) => {
    const button = document.createElement("button");

    // CATEGORY NAME SET
    const displayName =
      category === "all"
        ? "All"
        : category.charAt(0).toUpperCase() + category.slice(1);

    button.innerText = displayName;
    button.className = "px-4 py-2 bg-gray-200 rounded m-2 category-btn";
    button.dataset.category = category;

    // EVENT HANDLER
    button.addEventListener("click", async () => {
      // CLASS REMOVE
      document.querySelectorAll(".category-btn").forEach((btn) => {
        btn.classList.remove("bg-blue-500", "text-white");
        btn.classList.add("bg-gray-200");
      });

      // ACTIVE CLASS ADDED
      button.classList.add("bg-blue-500", "text-white");
      button.classList.remove("bg-gray-200");

      const category = button.dataset.category;

      // LOAD FUNCTION ADDED
      if (category === "all") {
        loadData();
      } else {
        // CETEGORIES API LOADED
        const res = await fetch(
          `https://fakestoreapi.com/products/category/${category}`,
        );
        const data = await res.json();
        displayProducts(data, "all-products-container");
      }
    });

    btnContainer.appendChild(button);
  });

  // ALL DATA LOADED
  setTimeout(() => {
    document.querySelector('[data-category="all"]').click();
  }, 100);
};

loadData();
allCategories();
