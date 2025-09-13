const loadTrees = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((json) => displayTrees(json.categories));
};

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("trees-show-container").classList.add("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("trees-show-container").classList.remove("hidden");
  }
};
const loadTreeCart = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`categories-btn-${id}`);
      // console.log(clickBtn);
      clickBtn.classList.add("active");
      displayCatTrees(data.plants);
    });
};

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".tree-button");
  // console.log(lessonButtons);
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};

const displayCatTrees = (trees) => {
  console.log(trees);

  const treeShowCon = document.getElementById("trees-show-container");
  treeShowCon.innerHTML = "";

  trees.forEach((tree) => {
    console.log(tree);
    const card = document.createElement("div");
    card.innerHTML = `
<div class="grid-cols-3 gap-5 p-4 items-stretch ">
            <div class="rounded-lg p-3 shadow-sm bg-white space-y-2 flex flex-col md:h-[480px] sm:h-[450px]  ">
              <img class="w-full h-40 rounded-md object-cover" src="${
                tree.image
              }" alt="" />
              <h3 onclick="loadCatTreesDetails(${
                tree.id
              })" class="font-semibold">${tree.name}</h3>
              <p class="flex-grow">${tree.description}</p>
              <div class="flex items-center justify-between">
                <button class="btn btn-xs">${tree.name}</button>
                <p>$<span>${tree.price}</span></p>
              </div>
              <button onclick='alert("${
                tree.name
              } added to your cart"); addToCart(${JSON.stringify(tree)})'
                class="btn btn-success mt-2 items-center border-none py-2 bg-[#15803d] text-white w-full"
              >
                Add to Cart
              </button>
            </div>
          </div>
    `;
    treeShowCon.append(card);
  });
  manageSpinner(false);
};

const loadCatTreesDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  console.log(url);
  const res = await fetch(url);
  const details = await res.json();
  displayCatTreesDetails(details.plants);
};
const displayCatTreesDetails = (tree) => {
  console.log(tree);
  const detailsBox = document.getElementById("details-con");
  detailsBox.innerHTML = ` <div class="bg-white rounded-xl shadow-md p-4 flex flex-col gap-3 max-w-sm mx-auto">
            <h3 class="font-bold text-lg text-center">${tree.name}</h3>
            <img class="w-full h-48 sm:h-56 rounded-md object-cover" src="${tree.image}" alt="" />
            <p class="font-semibold text-sm sm:text-base">Category: ${tree.category}</p>
            <h5 class="text-base sm:text-lg font-medium">Price:$- ${tree.price}</h5>
            <p class=""text-sm sm:text-base leading-relaxed">Description: ${tree.description}</p>
          </div>`;
  document.getElementById("my_modal_5").showModal();
};
const displayTrees = (categories) => {
  const treeBtnCon = document.getElementById("btn-select-trees-container");
  treeBtnCon.innerHTML = "";

  categories.forEach((category) => {
    console.log(category);

    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
     <button id="categories-btn-${category.id}" onclick="loadTreeCart( ${category.id})"
              class="btn btn-success tree-button hover:bg-[#15803d10] mt-2 items-center border-none py-2 bg-white text-[#1f2937] w-full "
            >
              ${category.category_name}
            </button>
    `;
    treeBtnCon.append(btnDiv);
  });
};
let cart = [];
function addToCart(tree) {
  cart.push(tree);
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

function renderCart() {
  const cartList = document.getElementById("cart-list");
  const totalEl = document.getElementById("cart-total");

  cartList.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += parseFloat(item.price);

    const li = document.createElement("li");
    li.className =
      "flex justify-between items-center bg-[#f0fdf4] px-2 py-1 rounded-md";

    li.innerHTML = `
      <span class="font-medium">${item.name} - $ ${item.price} </span>
      <button onclick="removeFromCart(${index})" class="text-red-500 font-bold">
        ❌
      </button>
    `;

    cartList.appendChild(li);
  });

  totalEl.textContent = total.toFixed(2);
}
loadTrees();
