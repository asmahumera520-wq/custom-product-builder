// ================= CART STORAGE =================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(){

let name = document.getElementById("productTitle").innerText;
let priceText = document.getElementById("cartBtn").innerText;
let price = priceText.replace("Add to Cart - $","");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart.push({
name: name,
price: price
});

localStorage.setItem("cart", JSON.stringify(cart));

alert(name + " added to cart!");

updateCartCount();

}


// ================= NAV DROPDOWN =================
document.querySelectorAll('nav ul li.dropdown').forEach(item => {
item.addEventListener('click', (e) => {
e.preventDefault();
alert('Dropdown clicked - add functionality here');
});
});


// ================= OPEN CUSTOMIZE MODAL =================
function openCustomize(name, image, price){

document.getElementById("customizeModal").style.display="flex";

document.getElementById("tshirtImage").src = image;

document.getElementById("productTitle").innerText = "Customize " + name;

let cartBtn = document.getElementById("cartBtn");

cartBtn.innerText = "Add to Cart - $" + price;

cartBtn.onclick = function(){
addToCart(name, price);
};

// clear text
document.getElementById("previewText").innerText = "";

// clear input
document.getElementById("textInput").value = "";

// remove uploaded images
document.querySelectorAll(".uploadedImg").forEach(img => img.remove());

}


// ================= CLOSE CUSTOMIZE MODAL =================
function closeCustomize(){
document.getElementById("customizeModal").style.display="none";
}


// ================= APPLY TEXT CUSTOMIZATION =================
function applyCustomization(){

let text = document.getElementById("textInput").value;
let color = document.getElementById("textColor").value;

let preview = document.getElementById("previewText");

preview.innerText = text;
preview.style.color = color;

}


// ================= CHANGE PRODUCT IMAGE =================
function changeShirtImage(image){

document.getElementById("tshirtImage").src = image;

}


// ================= CHANGE PRODUCT COLOR =================
function changeShirtColor(color){

document.getElementById("tshirtImage").style.filter =
"drop-shadow(0 0 0 " + color + ") saturate(1000%)";

}


// ================= WISHLIST =================
function toggleWishlist(icon){

icon.classList.toggle("active");

}


// ================= SHARE PRODUCT =================
function shareProduct(){

if(navigator.share){

navigator.share({
title:"Custom Product",
text:"Check this customized product!",
url:window.location.href
});

}else{

alert("Sharing not supported on this browser");

}

}


// ================= IMAGE UPLOAD =================
function handleImageUpload(){

let fileInput = document.getElementById("imageUpload");

if(fileInput.files && fileInput.files[0]){

let reader = new FileReader();

reader.onload = function(e){

document.querySelectorAll(".uploadedImg").forEach(img => img.remove());

let img = document.createElement("img");

img.src = e.target.result;

img.classList.add("uploadedImg");

img.style.position="absolute";
img.style.top="65%";
img.style.left="50%";
img.style.transform="translate(-50%,-50%)";
img.style.width="80px";
img.style.cursor="move";

document.querySelector(".image-box").appendChild(img);

makeDraggable(img);

};

reader.readAsDataURL(fileInput.files[0]);

}

}


// ================= MAKE ELEMENT DRAGGABLE =================
function makeDraggable(element){

let isDragging=false;
let offsetX, offsetY;

element.addEventListener("mousedown",function(e){

isDragging=true;

offsetX=e.clientX-element.offsetLeft;
offsetY=e.clientY-element.offsetTop;

});

document.addEventListener("mousemove",function(e){

if(isDragging){

element.style.left=(e.clientX-offsetX)+"px";
element.style.top=(e.clientY-offsetY)+"px";

}

});

document.addEventListener("mouseup",function(){

isDragging=false;

});

}


// ================= LOAD PRODUCTS FROM BACKEND =================
function loadProducts(){

fetch("http://localhost:5000/api/products")

.then(response => response.json())

.then(data => {

console.log("Products from backend:", data);

let container = document.getElementById("productContainer");

if(container){

container.innerHTML="";

data.forEach(product => {

container.innerHTML += `
<div class="product-card">

<img src="${product.image}" width="150">

<h3>${product.name}</h3>

<p>$${product.price}</p>

<button onclick="openCustomize('${product.name}','${product.image}',${product.price})">
Customize
</button>

</div>
`;

});

}

})

.catch(error => console.log(error));

}


// ================= WINDOW LOAD =================
window.onload = function(){

loadProducts();
updateCartCount();
// draggable text
let text = document.getElementById("previewText");

let isDragging=false;
let offsetX=0;
let offsetY=0;

text.addEventListener("mousedown", function(e){

isDragging = true;

offsetX = e.clientX - text.offsetLeft;
offsetY = e.clientY - text.offsetTop;

});

document.addEventListener("mousemove", function(e){

if(isDragging){

text.style.left = (e.clientX - offsetX) + "px";
text.style.top = (e.clientY - offsetY) + "px";

}

});

document.addEventListener("mouseup", function(){

isDragging=false;

});


// TEXT SIZE CONTROL
document.getElementById("textSize").addEventListener("input",function(){

text.style.fontSize = this.value + "px";

});


// IMAGE SIZE CONTROL
document.getElementById("imgSize").addEventListener("input",function(){

let img = document.querySelector(".uploadedImg");

if(img){

img.style.width = this.value + "px";

}

});

};
function updateCartCount() {

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let cartBtn = document.getElementById("cartCount");

if(cartBtn){
cartBtn.innerText = cart.length;
}

}
function changeProductColor(color){

let img = document.getElementById("tshirtImage");
let product = document.getElementById("productTitle").innerText;

/* T-SHIRT COLORS */
if(product.includes("T-Shirt")){

if(color === "black"){
img.src = "images12/tshirt-black.png";
}

if(color === "red"){
img.src = "images12/tshirt-red.png";
}

if(color === "blue"){
img.src = "images12/tshirt-blue.png";
}

}

/* MUG COLORS */
if(product.includes("Mug")){

if(color === "black"){
img.src = "images12/mug-black.png";
}

if(color === "red"){
img.src = "images12/mug-red.png";
}

if(color === "blue"){
img.src = "images12/mug-blue.png";
}

}

/* PHONE CASE COLORS */
if(product.includes("Phone Case")){

if(color === "black"){
img.src = "images12/case-black.png";
}

if(color === "red"){
img.src = "images12/case-red.png";
}

if(color === "blue"){
img.src = "images12/case-blue.png";
}

}

}
function addToCart(){

let name = document.getElementById("productTitle").innerText;
let priceText = document.getElementById("cartBtn").innerText;

let price = priceText.replace("Add to Cart - $","");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart.push({
name: name,
price: price
});

localStorage.setItem("cart", JSON.stringify(cart));

alert(name + " added to cart!");

updateCartCount();

}
function updateCartCount(){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let count = document.getElementById("cartCount");

if(count){
count.innerText = cart.length;
}

}