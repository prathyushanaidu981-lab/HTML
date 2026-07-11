//display products:-
function displayProducts() {
    let output = "";
    for (let i = 0; i < products.length; i++) {
        output += `
        <div class="card">
            <h3>${products[i].name}</h3>
            <p>${products[i].category}</p>
            <p>₹${products[i].price}</p>
            <button onclick="addCart(${products[i].id})">
                Add to Cart
            </button>
        </div>
        `;
    }

    document.getElementById("products").innerHTML = output;
}
//add to cart:-
function addCart(id) {
    let found = false;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
            cart[i].qty++;
            found = true;
            break;
        }
    }
    if (found == false) {
        for (let i = 0; i < products.length; i++) {
            if (products[i].id == id) {
                cart.push({
                    id: products[i].id,
                    name: products[i].name,
                    price: products[i].price,
                    qty: 1
                });

                break;
            }
        }
    }

    showCart();
}
//show cart:-
function showCart() {
    let output = "";
    let total = 0;
    let items = 0;
    for (let i = 0; i < cart.length; i++) {
        output += `
        <tr>
            <td>${cart[i].name}</td>
            <td>${cart[i].price}</td>
            <td>${cart[i].qty}</td>
            <td>${cart[i].price * cart[i].qty}</td>
        </tr>
        `;

        total += cart[i].price * cart[i].qty;
        items += cart[i].qty;
    }

    document.getElementById("cartItems").innerHTML = output;
    document.getElementById("totalItems").innerHTML = items;
    document.getElementById("totalPrice").innerHTML = total;
}
//search product:-
function searchProduct() {
    let text = document.getElementById("search").value.toLowerCase();
    let output = "";
    for (let i = 0; i < products.length; i++) {
        if (products[i].name.toLowerCase().includes(text)) {
            output += `
            <div class="card">
                <h3>${products[i].name}</h3>
                <p>${products[i].category}</p>
                <p>₹${products[i].price}</p>
                <button onclick="addCart(${products[i].id})">
                    Add to Cart
                </button>
            </div>
            `;
        }
    }

    document.getElementById("products").innerHTML = output;
}

document.getElementById("search").addEventListener("keyup", searchProduct);

//cupon
let discount = 0;

function applyCoupon() {

    let code = document.getElementById("coupon").value;

    let total = 0;

    for (let i = 0; i < cart.length; i++) {

        total += cart[i].price * cart[i].qty;
    }

    if (code == "SAVE10") {

        discount = total * 10 / 100;
        alert("10% Discount Applied");

    } else if (code == "SAVE20") {

        discount = total * 20 / 100;
        alert("20% Discount Applied");

    } else {

        discount = 0;
        alert("Invalid Coupon");
    }

    showCart();
}
//chechout
function checkout() {

    let total = 0;

    for (let i = 0; i < cart.length; i++) {

        total += cart[i].price * cart[i].qty;
    }

    let gst = total * 18 / 100;

    let grandTotal = total + gst - discount;

    document.getElementById("invoice").innerHTML = `
        <h2>Invoice</h2>
        <p>Customer: ${document.getElementById("customer").value}</p>
        <p>Total: ₹${total}</p>
        <p>GST: ₹${gst}</p>
        <p>Discount: ₹${discount}</p>
        <h3>Grand Total: ₹${grandTotal}</h3>
        <h2>Purchase Successful</h2>
    `;

    cart = [];
    showCart();
}