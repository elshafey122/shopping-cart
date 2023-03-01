let carticon=document.querySelector("#cart-icon");
let cart=document.querySelector(".cart");
let closecart=document.querySelector("#colse-cart");

carticon.onclick=()=>
{
    cart.classList.add("active");
}

closecart.onclick=()=>
{
    cart.classList.remove("active");
}

//remove items from cart
if(document.readyState=="loading"){
    document.addEventListener("DOMContentLoaded",ready);
}
else{
    ready();
}

function ready()
{
    let removebuttons=document.getElementsByClassName("cart-remove");
    for(var i=0;i<removebuttons.length;i++)
    {
        var button=removebuttons[i];
        button.addEventListener("click",remove);
    }
    var quantityinputs=document.getElementsByClassName("cart-quantity");
    for(var i=0;i<quantityinputs.length;i++)
    {
        var input=quantityinputs[i];
        input.addEventListener("change",quantitychange);

    }

    var addcarts=document.getElementsByClassName("add-cart");
    for(var i=0;i<addcarts.length;i++)
    {
        var button=addcarts[i];
        button.addEventListener("click",addcartclicked);
    }
}
function remove(event)
{
    let buttonclicked=event.target;
    buttonclicked.parentElement.remove();
    updatetotal();
}

function quantitychange(event)
{
    var input=event.target;
    if(isNaN(input.value) || input.value<0)
    {
        input.value=1;
    }
    updatetotal();
}

function addcartclicked(event)
{
    var button = event.target;
    var shopproducts=button.parentElement;
    var title=shopproducts.getElementsByClassName("product-title")[0].innerText;
    var price=shopproducts.getElementsByClassName("price")[0].innerText;
    var productimg=shopproducts.getElementsByClassName("product-img")[0].src;
    addproducttocard(title,price,productimg);
    updatetotal();
}

function addproducttocard(title,price,productimg)
{
    var carshopbox=document.createElement("div");
    carshopbox.classList.add("cart-box");
    var cartitems=document.getElementsByClassName("cart-content")[0];
    var cartitemnames=document.getElementsByClassName("cart-product-title");
    for(var i=0;i<cartitemnames.length;i++)
    {
        if(cartitemnames[i].innerText==title){
        alert("you have already add this item to cart");
        return;
        }
    }
    var carboxcontent=
                       `<img src=${productimg} alt="" class="cart-img">
                        <div class="details-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" name="" id="" value="1" class="cart-quantity">
                        </div>
                        <i class="fa-solid fa-trash cart-remove"></i>`;

    carshopbox.innerHTML=carboxcontent;
    cartitems.append(carshopbox);
    carshopbox.getElementsByClassName("cart-remove")[0].addEventListener("click",remove);
    carshopbox.getElementsByClassName("cart-quantity")[0].addEventListener("change",quantitychange);
}

function updatetotal()
{
    let total=0;
    var cartcontent=document.getElementsByClassName("cart-content")[0];
    var cartboxs=cartcontent.getElementsByClassName("cart-box");
    for(let i=0;i<cartboxs.length;i++)
    {
        var cartbox=cartboxs[i];
        var priceelement=cartbox.getElementsByClassName("cart-price")[0];
        var quantityelement=cartbox.getElementsByClassName("cart-quantity")[0];
        console.log(quantityelement.value)
        var quantity=quantityelement.value;
        console.log(quantity);
        var price=parseFloat(priceelement.innerText.replace("$",""))
        total=total+(quantity*price);
        total=Math.round(total*100)/100;
    }
    document.getElementsByClassName("total-price")[0].innerText="$"+total;
}

btncart=document.getElementsByClassName(".btn-buy");
btncart.click=()=>{
    alert("your order is placed")
}