function addProduct(){
    window.location.href = '/products/add';
}

function cancelAdd(){
    window.location.href = '/products';
}

function cancelGoHome(){
    window.location.href = '/store';
}
function cancelDelete(){
    window.location.href = '/products';
}

// Handle hamburger
const burger = document.getElementById("navburger");
const menu = document.getElementById("navbarBasicExample");
const toggleBurger = () => {
  burger.classList.toggle("is-active");
  menu.classList.toggle("is-active");
};
burger.addEventListener("click", toggleBurger, false);