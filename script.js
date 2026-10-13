// ================================
// SMARTCART AI - DAY 4
// CART + BILLING SYSTEM
// ================================


// ================================
// CART DATA
// ================================

let shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];


// ================================
// SAVE CART
// ================================

function saveCart() {
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
}


// ================================
// ADD PRODUCT TO CART
// ================================

function addProductToCart(productName, price) {

    const existingProduct = shoppingCart.find(
        product => product.name === productName
    );

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        shoppingCart.push({
            name: productName,
            price: Number(price),
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();

    alert(productName + " added to your cart! 🛒");
}


// ================================
// UPDATE CART COUNT
// ================================

function updateCartCount() {

    const cartCountElement = document.getElementById("cart-count");

    if (cartCountElement) {

        const totalItems = shoppingCart.reduce(
            (total, product) => total + product.quantity,
            0
        );

        cartCountElement.innerText = totalItems;
    }
}


// ================================
// SHOW CART
// ================================

function showCart() {
    window.location.href = "cart.html";
}


// ================================
// REMOVE PRODUCT
// ================================

function removeFromCart(index) {

    shoppingCart.splice(index, 1);

    saveCart();

    displayCart();
    updateCartCount();
}


// ================================
// CHANGE QUANTITY
// ================================

function changeQuantity(index, change) {

    shoppingCart[index].quantity += change;

    if (shoppingCart[index].quantity <= 0) {
        shoppingCart.splice(index, 1);
    }

    saveCart();

    displayCart();
    updateCartCount();
}


// ================================
// DISPLAY CART
// ================================

function displayCart() {

    const cartContainer =
        document.getElementById("cart-items");

    const subtotalElement =
        document.getElementById("subtotal");

    const gstElement =
        document.getElementById("gst");

    const totalElement =
        document.getElementById("total");

    if (!cartContainer) {
        return;
    }


    // EMPTY CART

    if (shoppingCart.length === 0) {

        cartContainer.innerHTML =
            "<h3>Your cart is empty 🛒</h3>";

        if (subtotalElement) {
            subtotalElement.innerText = "₹0";
        }

        if (gstElement) {
            gstElement.innerText = "₹0";
        }

        if (totalElement) {
            totalElement.innerText = "₹0";
        }

        return;
    }


    // DISPLAY PRODUCTS

    cartContainer.innerHTML = "";

    let subtotal = 0;

    shoppingCart.forEach(function(product, index) {

        const productTotal =
            product.price * product.quantity;

        subtotal += productTotal;

        cartContainer.innerHTML += `
            <div class="cart-item">

                <div>
                    <h3>${product.name}</h3>

                    <p>
                        Price: ₹${product.price.toLocaleString("en-IN")}
                    </p>

                    <p>
                        Quantity:
                        <button onclick="changeQuantity(${index}, -1)">−</button>

                        <strong>${product.quantity}</strong>

                        <button onclick="changeQuantity(${index}, 1)">+</button>
                    </p>

                    <p>
                        Product Total:
                        <strong>
                            ₹${productTotal.toLocaleString("en-IN")}
                        </strong>
                    </p>
                </div>

                <button
                    onclick="removeFromCart(${index})"
                    class="remove-btn">
                    🗑️ Remove
                </button>

            </div>
        `;
    });


    // GST 18%

    const gst = subtotal * 0.18;

    const total = subtotal + gst;


    // SHOW BILL

    if (subtotalElement) {
        subtotalElement.innerText =
            "₹" + subtotal.toLocaleString("en-IN");
    }

    if (gstElement) {
        gstElement.innerText =
            "₹" + gst.toLocaleString("en-IN");
    }

    if (totalElement) {
        totalElement.innerText =
            "₹" + total.toLocaleString("en-IN");
    }
}


// =================================
// DAY 6 - REAL CHECKOUT SYSTEM
// =================================

function checkout() {

    if (shoppingCart.length === 0) {

        alert("Your cart is empty!");

        return;
    }


    // Calculate subtotal

    let subtotal = 0;

    shoppingCart.forEach(function(product) {

        subtotal +=
            product.price * product.quantity;

    });


    // GST

    const gst =
        subtotal * 0.18;


    // Final order value

    const total =
        subtotal + gst;


    // Create order

    const newOrder = {

        orderId:
            "SC" +
            Date.now(),

        date:
            new Date().toLocaleDateString("en-IN"),

        items:
            [...shoppingCart],

        subtotal:
            subtotal,

        gst:
            gst,

        total:
            total

    };


    // Get previous orders

    let orders =
        JSON.parse(
            localStorage.getItem("smartCartOrders")
        ) || [];


    // Add new order

    orders.push(newOrder);


    // Save orders

    localStorage.setItem(
        "smartCartOrders",
        JSON.stringify(orders)
    );


    // Clear cart

    shoppingCart = [];

    saveCart();

    displayCart();

    updateCartCount();


    alert(
        "🎉 Order placed successfully!\n\n" +

        "Order ID: " +
        newOrder.orderId +

        "\nTotal: ₹" +
        total.toLocaleString("en-IN") +

        "\n\nThank you for shopping with SmartCart AI!"
    );
}

// ================================
// AI RECOMMENDATION
// ================================

function getRecommendation() {

    const category =
        document.getElementById("category").value;

    const budget =
        Number(document.getElementById("budget").value);

    const preference =
        document.getElementById("preference").value;


    let product = "";
    let price = 0;
    let rating = 0;
    let reason = "";


    if (category === "electronics") {

        if (budget <= 1000) {

            product = "Bluetooth Speaker";
            price = 999;
            rating = 4.3;

            reason =
                "Affordable electronics option within your budget.";

        } else if (budget <= 5000) {

            product = "Wireless Headphones";
            price = 2499;
            rating = 4.5;

            reason =
                "Good balance of price, rating and features.";

        } else if (budget <= 10000) {

            product = "Premium Smart Watch";
            price = 7999;
            rating = 4.6;

            reason =
                "Premium choice with strong features.";

        } else {

            product = "Smartphone";
            price = 24999;
            rating = 4.6;

            reason =
                "Suitable for a higher electronics budget.";
        }


    } else if (category === "fashion") {

        if (budget < 2999) {

            product = "Smart Backpack";
            price = 1299;
            rating = 4.3;

            reason =
                "Affordable fashion and lifestyle option.";

        } else {

            product = "Casual Jacket";
            price = 2999;
            rating = 4.4;

            reason =
                "Popular fashion choice with a good rating.";
        }


    } else if (category === "home") {

        if (budget < 2000) {

            product = "Smart Home Organizer";
            price = 1499;
            rating = 4.2;

            reason =
                "Useful home product at an affordable price.";

        } else {

            product = "Kitchen Storage Set";
            price = 4999;
            rating = 4.4;

            reason =
                "Useful home product for a higher budget.";
        }


    } else {

        product = "Business & Marketing Book";
        price = 599;
        rating = 4.7;

        reason =
            "Highly rated learning option at a low price.";
    }


    let preferenceText = "";


    if (preference === "rating") {

        preferenceText =
            "Selected for its strong customer rating.";

    } else if (preference === "premium") {

        preferenceText =
            "Selected as a premium-quality option.";

    } else if (preference === "price") {

        preferenceText =
            "Selected because it offers a lower-price option.";

    } else {

        preferenceText =
            "Selected for good value for money.";
    }


    document.getElementById("recommendation-result").innerHTML =

        "<strong>✨ SmartCart AI Recommendation</strong>" +

        "<br><br>" +

        "<strong style='font-size:22px;'>" +
        product +
        "</strong>" +

        "<br><br>" +

        "<strong>💰 Price:</strong> ₹" +
        price.toLocaleString("en-IN") +

        "<br>" +

        "<strong>⭐ Rating:</strong> " +
        rating +
        "/5" +

        "<br><br>" +

        "<strong>🤖 Why recommended?</strong>" +

        "<br>" +

        "✓ " +
        reason +

        "<br>" +

        "✓ " +
        preferenceText +

        "<br>" +

        "✓ Matches your selected category and budget.";
}


// ================================
// SEARCH + FILTER
// ================================

function filterProducts() {

    const searchText =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();


    const selectedCategory =
        document.getElementById("categoryFilter").value;


    const selectedPrice =
        document.getElementById("priceFilter").value;


    const products =
        document.querySelectorAll(".product-card");


    let visibleProducts = 0;


    products.forEach(function(product) {

        const name =
            product.dataset.name.toLowerCase();

        const category =
            product.dataset.category;

        const price =
            Number(product.dataset.price);


        const matchesSearch =
            name.includes(searchText);


        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;


        let matchesPrice = true;


        if (selectedPrice !== "all") {

            matchesPrice =
                price <= Number(selectedPrice);
        }


        if (
            matchesSearch &&
            matchesCategory &&
            matchesPrice
        ) {

            product.style.display = "block";

            visibleProducts++;

        } else {

            product.style.display = "none";
        }
    });


    const noProducts =
        document.getElementById("noProducts");


    if (noProducts) {

        if (visibleProducts === 0) {

            noProducts.style.display = "block";

        } else {

            noProducts.style.display = "none";
        }
    }
}

// ================================
// PAGE INITIALISATION
// ================================
document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
    displayCart();
    loadAdminDashboard();
    loadOrderHistory();
});

// ================================
// ADMIN DASHBOARD CALCULATIONS
// ================================
function formatINR(value) {
    return "₹" + Number(value || 0).toLocaleString("en-IN", {
        maximumFractionDigits: 2,
        minimumFractionDigits: 0
    });
}

function readDemoOrders() {
    try {
        const stored = JSON.parse(localStorage.getItem("smartCartOrders") || "[]");
        return Array.isArray(stored) ? stored : [];
    } catch (error) {
        return [];
    }
}

function setTextIfPresent(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
}

function loadAdminDashboard() {
    if (!document.getElementById("dashboard-revenue")) return;

    const orders = readDemoOrders();
    let subtotal = 0;
    let gst = 0;
    let unitsSold = 0;

    orders.forEach(function (order) {
        const orderSubtotal = Number(order.subtotal ?? order.total ?? 0);
        subtotal += Number.isFinite(orderSubtotal) ? orderSubtotal : 0;
        gst += Number(order.gst || 0);
        (Array.isArray(order.items) ? order.items : []).forEach(function (item) {
            unitsSold += Math.max(0, Number(item.quantity || 1));
        });
    });

    const assumedCogs = subtotal * 0.60;
    const demoContribution = subtotal - assumedCogs;
    const illustrativeAffiliateEquivalent = subtotal * 0.03;
    const demoMargin = subtotal > 0 ? (demoContribution / subtotal) * 100 : 0;

    setTextIfPresent("dashboard-revenue", formatINR(subtotal));
    setTextIfPresent("dashboard-orders", String(orders.length));
    setTextIfPresent("dashboard-products", String(unitsSold));
    setTextIfPresent("dashboard-gst", formatINR(gst));
    setTextIfPresent("dashboard-cogs", formatINR(assumedCogs));
    setTextIfPresent("dashboard-affiliate", formatINR(illustrativeAffiliateEquivalent));
    setTextIfPresent("dashboard-profit", formatINR(demoContribution));
    setTextIfPresent("dashboard-margin", demoMargin.toFixed(1) + "%");
}

function loadOrderHistory() {
    const historyContainer = document.getElementById("order-history-list");
    if (!historyContainer) return;

    const orders = readDemoOrders();
    if (!orders.length) {
        historyContainer.innerHTML = "<p>No demo orders yet.</p>";
        return;
    }

    historyContainer.innerHTML = "";
    [...orders].reverse().slice(0, 10).forEach(function (order) {
        const row = document.createElement("div");
        row.className = "order-row";

        const left = document.createElement("div");
        const id = document.createElement("strong");
        id.textContent = "Order ID: " + String(order.orderId || "Demo order");
        const date = document.createElement("span");
        date.textContent = "Date: " + String(order.date || "—");
        left.append(id, date);

        const right = document.createElement("div");
        const amount = document.createElement("strong");
        amount.textContent = formatINR(order.subtotal ?? order.total ?? 0);
        const count = document.createElement("span");
        const itemCount = (Array.isArray(order.items) ? order.items : []).reduce((sum, item) => sum + Math.max(0, Number(item.quantity || 1)), 0);
        count.textContent = itemCount + " unit(s)";
        right.append(amount, count);

        const status = document.createElement("div");
        status.className = "order-status";
        status.textContent = "Demo record";
        row.append(left, right, status);
        historyContainer.appendChild(row);
    });
}

// COLLEGE DEMO ADMIN ACCESS ONLY. This client-side check is not secure authentication.
function adminLogin() {
    const input = document.getElementById("admin-password");
    const message = document.getElementById("login-message");
    if (!input) return;
    // Demo password for presentation testing. Change it before sharing the demo.
    if (input.value === "SCdemo2026!") {
        sessionStorage.setItem("smartCartAdminDemo", "true");
        window.location.href = "admin.html";
    } else if (message) {
        message.textContent = "Incorrect demo password. Please try again.";
    }
}

function adminLogout() {
    sessionStorage.removeItem("smartCartAdminDemo");
    window.location.href = "admin-login.html";
}

document.addEventListener("DOMContentLoaded", function () {
    if (document.body && document.body.dataset.page === "admin" && sessionStorage.getItem("smartCartAdminDemo") !== "true") {
        window.location.replace("admin-login.html");
    }
});
