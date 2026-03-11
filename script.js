// No advanced JS behavior is visible in the image.
// But if you want basic dropdown menu functionality, here is a skeleton code for nav dropdowns.

document.querySelectorAll('nav ul li.dropdown').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    // toggle dropdown is not visible on the image's UI
    // this section can be expanded if needed for functionality
    alert('Dropdown clicked - add functionality here');
  });
});
function openCustomize(name,image,price){

document.getElementById("customizeModal").style.display="flex";

document.getElementById("tshirtImage").src=image;

document.getElementById("productTitle").innerText="Customize " + name;

document.getElementById("cartBtn").innerText="Add to Cart - $" + price;

/* clear old text */
document.getElementById("previewText").innerText="";

/* clear text input */
document.getElementById("textInput").value="";

/* remove uploaded images */
document.querySelectorAll(".uploadedImg").forEach(img => img.remove());

}


function closeCustomize(){
document.getElementById("customizeModal").style.display="none";
}
/* This function runs when user clicks Customize button */
function applyCustomization(){

/* get text typed by user */
let text = document.getElementById("textInput").value;

/* get selected color */
let color = document.getElementById("textColor").value;

/* select preview text element */
let preview = document.getElementById("previewText");

/* show the text on product */
preview.innerText = text;

/* change text color */
preview.style.color = color;
function changeShirtColor(image){

document.getElementById("tshirtImage").src = image;

}
//change tshirt color
function changeShirtColor(color){

document.getElementById("tshirtImage").style.filter =
"drop-shadow(0 0 0 " + color + ") saturate(1000%)";

}
//wishlist function toggle
function toggleWishlist(icon){

icon.classList.toggle("active");

}
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

/* handle uploaded image */
let fileInput = document.getElementById("imageUpload");

if(fileInput.files && fileInput.files[0]){

let reader = new FileReader();

/* when image loads */
reader.onload = function(e){
/*remove old image */
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
window.onload=function(){
let text = document.getElementById("previewText");

let isDragging = false;
let offsetX=0;
let offsetY=0;;

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
isDragging = false;
});
};
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