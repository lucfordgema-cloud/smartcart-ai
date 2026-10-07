// ============================================================
// SMARTCART AI
// DAY 1 TO DAY 7 - COMPLETE SCRIPT.JS
// ============================================================


// ============================================================
// DAY 1 - BASIC SETUP
// ============================================================


// ============================================================
// DAY 4 - CART DATA
// ============================================================

let shoppingCart =
    JSON.parse(localStorage.getItem("shoppingCart")) || [];


// ============================================================
// SAVE CART
// ============================================================

function saveCart() {

    localStorage.setItem(
        "shoppingCart",
        JSON.stringify(shoppingCart)
    );

}


// ============================================================
// ADD PRODUCT TO CART
// ============================================================

function addProductToCart(productName, price) {

    const existingProduct =
        shoppingCart.find(
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


    alert(
        productName +
        " added to your cart! 🛒"
    );

}


// ============================================================
// UPDATE CART COUNT
// ============================================================

function updateCartCount() {

    const cartCountElement =
        document.getElementById("cart-count");


    if (cartCountElement) {

        const totalItems =
            shoppingCart.reduce(

                (total, product) =>
                    total + product.quantity,

                0

            );


        cartCountElement.innerText =
            totalItems;

    }

}


// ============================================================
// SHOW CART
// ============================================================

function showCart() {

    window.location.href =
        "cart.html";

}


// ============================================================
// REMOVE PRODUCT FROM CART
// ============================================================

function removeFromCart(index) {

    shoppingCart.splice(
        index,
        1
    );


    saveCart();

    displayCart();

    updateCartCount();

}


// ============================================================
// CHANGE PRODUCT QUANTITY
// ============================================================

function changeQuantity(index, change) {

    shoppingCart[index].quantity +=
        change;


    if (
        shoppingCart[index].quantity <= 0
    ) {

        shoppingCart.splice(
            index,
            1
        );

    }


    saveCart();

    displayCart();

    updateCartCount();

}


// ============================================================
// DISPLAY CART
// ============================================================

function displayCart() {

    const cartContainer =
        document.getElementById(
            "cart-items"
        );


    const subtotalElement =
        document.getElementById(
            "subtotal"
        );


    const gstElement =
        document.getElementById(
            "gst"
        );


    const totalElement =
        document.getElementById(
            "total"
        );


    // If cart page is not open
    if (!cartContainer) {

        return;

    }


    // ========================================================
    // EMPTY CART
    // ========================================================

    if (shoppingCart.length === 0) {

        cartContainer.innerHTML =
            "<h3>Your cart is empty 🛒</h3>";


        if (subtotalElement) {

            subtotalElement.innerText =
                "₹0";

        }


        if (gstElement) {

            gstElement.innerText =
                "₹0";

        }


        if (totalElement) {

            totalElement.innerText =
                "₹0";

        }


        return;

    }


    // ========================================================
    // DISPLAY PRODUCTS
    // ========================================================

    cartContainer.innerHTML = "";


    let subtotal = 0;


    shoppingCart.forEach(
        function(product, index) {

            const productTotal =
                product.price *
                product.quantity;


            subtotal +=
                productTotal;


            cartContainer.innerHTML += `

                <div class="cart-item">

                    <div>

                        <h3>
                            ${product.name}
                        </h3>

                        <p>
                            Price:
                            ₹${product.price.toLocaleString("en-IN")}
                        </p>

                        <p>

                            Quantity:

                            <button
                                onclick="changeQuantity(${index}, -1)"
                            >
                                −
                            </button>

                            <strong>
                                ${product.quantity}
                            </strong>

                            <button
                                onclick="changeQuantity(${index}, 1)"
                            >
                                +
                            </button>

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
                        class="remove-btn"
                    >
                        🗑️ Remove
                    </button>

                </div>

            `;

        }
    );


    // ========================================================
    // GST 18%
    // ========================================================

    const gst =
        subtotal * 0.18;


    const total =
        subtotal + gst;


    // ========================================================
    // SHOW BILL
    // ========================================================

    if (subtotalElement) {

        subtotalElement.innerText =
            "₹" +
            subtotal.toLocaleString("en-IN");

    }


    if (gstElement) {

        gstElement.innerText =
            "₹" +
            gst.toLocaleString("en-IN");

    }


    if (totalElement) {

        totalElement.innerText =
            "₹" +
            total.toLocaleString("en-IN");

    }

}


// ============================================================
// DAY 6 - REAL CHECKOUT SYSTEM
// ============================================================

function checkout() {


    // ========================================================
    // CHECK EMPTY CART
    // ========================================================

    if (shoppingCart.length === 0) {

        alert(
            "Your cart is empty!"
        );

        return;

    }


    // ========================================================
    // CALCULATE SUBTOTAL
    // ========================================================

    let subtotal = 0;


    shoppingCart.forEach(
        function(product) {

            subtotal +=
                product.price *
                product.quantity;

        }
    );


    // ========================================================
    // GST
    // ========================================================

    const gst =
        subtotal * 0.18;


    // ========================================================
    // FINAL ORDER VALUE
    // ========================================================

    const total =
        subtotal + gst;


    // ========================================================
    // CREATE ORDER
    // ========================================================

    const newOrder = {

        orderId:
            "SC" + Date.now(),

        date:
            new Date().toLocaleDateString(
                "en-IN"
            ),

        items:
            [...shoppingCart],

        subtotal:
            subtotal,

        gst:
            gst,

        total:
            total

    };


    // ========================================================
    // GET PREVIOUS ORDERS
    // ========================================================

    let orders =
        JSON.parse(
            localStorage.getItem(
                "smartCartOrders"
            )
        ) || [];


    // ========================================================
    // ADD NEW ORDER
    // ========================================================

    orders.push(
        newOrder
    );


    // ========================================================
    // SAVE ORDERS
    // ========================================================

    localStorage.setItem(

        "smartCartOrders",

        JSON.stringify(
            orders
        )

    );


    // ========================================================
    // CLEAR CART
    // ========================================================

    shoppingCart = [];


    saveCart();

    displayCart();

    updateCartCount();


    // ========================================================
    // SUCCESS MESSAGE
    // ========================================================

    alert(

        "🎉 Order placed successfully!\n\n" +

        "Order ID: " +
        newOrder.orderId +

        "\nTotal: ₹" +
        total.toLocaleString("en-IN") +

        "\n\nThank you for shopping with SmartCart AI!"

    );

}


// ============================================================
// DAY 3 - AI RECOMMENDATION
// ============================================================

function getRecommendation() {


    const category =
        document.getElementById(
            "category"
        ).value;


    const budget =
        Number(
            document.getElementById(
                "budget"
            ).value
        );


    const preference =
        document.getElementById(
            "preference"
        ).value;


    let product = "";

    let price = 0;

    let rating = 0;

    let reason = "";


    // ========================================================
    // ELECTRONICS
    // ========================================================

    if (
        category === "electronics"
    ) {


        if (budget <= 1000) {

            product =
                "Bluetooth Speaker";

            price =
                999;

            rating =
                4.3;

            reason =
                "Affordable electronics option within your budget.";


        } else if (
            budget <= 5000
        ) {

            product =
                "Wireless Headphones";

            price =
                2499;

            rating =
                4.5;

            reason =
                "Good balance of price, rating and features.";


        } else if (
            budget <= 10000
        ) {

            product =
                "Premium Smart Watch";

            price =
                7999;

            rating =
                4.6;

            reason =
                "Premium choice with strong features.";


        } else {

            product =
                "Smartphone";

            price =
                24999;

            rating =
                4.6;

            reason =
                "Suitable for a higher electronics budget.";

        }


    // ========================================================
    // FASHION
    // ========================================================

    } else if (
        category === "fashion"
    ) {


        if (budget < 2999) {

            product =
                "Smart Backpack";

            price =
                1299;

            rating =
                4.3;

            reason =
                "Affordable fashion and lifestyle option.";


        } else {

            product =
                "Casual Jacket";

            price =
                2999;

            rating =
                4.4;

            reason =
                "Popular fashion choice with a good rating.";

        }


    // ========================================================
    // HOME
    // ========================================================

    } else if (
        category === "home"
    ) {


        if (budget < 2000) {

            product =
                "Smart Home Organizer";

            price =
                1499;

            rating =
                4.2;

            reason =
                "Useful home product at an affordable price.";


        } else {

            product =
                "Kitchen Storage Set";

            price =
                4999;

            rating =
                4.4;

            reason =
                "Useful home product for a higher budget.";

        }


    // ========================================================
    // BOOKS / DEFAULT
    // ========================================================

    } else {

        product =
            "Business & Marketing Book";

        price =
            599;

        rating =
            4.7;

        reason =
            "Highly rated learning option at a low price.";

    }


    // ========================================================
    // PREFERENCE
    // ========================================================

    let preferenceText = "";


    if (
        preference === "rating"
    ) {

        preferenceText =
            "Selected for its strong customer rating.";


    } else if (
        preference === "premium"
    ) {

        preferenceText =
            "Selected as a premium-quality option.";


    } else if (
        preference === "price"
    ) {

        preferenceText =
            "Selected because it offers a lower-price option.";


    } else {

        preferenceText =
            "Selected for good value for money.";

    }


    // ========================================================
    // SHOW RECOMMENDATION
    // ========================================================

    const result =
        document.getElementById(
            "recommendation-result"
        );


    if (!result) {

        return;

    }


    result.innerHTML =

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


// ============================================================
// DAY 2 - SEARCH + FILTER
// ============================================================

function filterProducts() {


    const searchInput =
        document.getElementById(
            "searchInput"
        );


    const categoryFilter =
        document.getElementById(
            "categoryFilter"
        );


    const priceFilter =
        document.getElementById(
            "priceFilter"
        );


    if (
        !searchInput ||
        !categoryFilter ||
        !priceFilter
    ) {

        return;

    }


    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    const selectedCategory =
        categoryFilter.value;


    const selectedPrice =
        priceFilter.value;


    const products =
        document.querySelectorAll(
            ".product-card"
        );


    let visibleProducts = 0;


    products.forEach(
        function(product) {


            const name =
                (
                    product.dataset.name ||
                    ""
                ).toLowerCase();


            const category =
                product.dataset.category;


            const price =
                Number(
                    product.dataset.price
                );


            const matchesSearch =
                name.includes(
                    searchText
                );


            const matchesCategory =
                selectedCategory === "all" ||
                category === selectedCategory;


            let matchesPrice = true;


            if (
                selectedPrice !== "all"
            ) {

                matchesPrice =
                    price <=
                    Number(
                        selectedPrice
                    );

            }


            if (
                matchesSearch &&
                matchesCategory &&
                matchesPrice
            ) {

                product.style.display =
                    "block";

                visibleProducts++;


            } else {

                product.style.display =
                    "none";

            }

        }
    );


    const noProducts =
        document.getElementById(
            "noProducts"
        );


    if (noProducts) {


        if (
            visibleProducts === 0
        ) {

            noProducts.style.display =
                "block";


        } else {

            noProducts.style.display =
                "none";

        }

    }

}


// ============================================================
// DAY 7 - ADMIN DASHBOARD
// ============================================================

function loadAdminDashboard() {


    const revenueElement =
        document.getElementById(
            "dashboard-revenue"
        );


    // If this is not admin page
    if (!revenueElement) {

        return;

    }


    // ========================================================
    // GET ORDERS
    // ========================================================

    const orders =
        JSON.parse(
            localStorage.getItem(
                "smartCartOrders"
            )
        ) || [];


    // ========================================================
    // NO ORDERS
    // ========================================================

    if (
        orders.length === 0
    ) {


        document.getElementById(
            "dashboard-revenue"
        ).innerText =
            "₹0";


        document.getElementById(
            "dashboard-orders"
        ).innerText =
            "0";


        document.getElementById(
            "dashboard-products"
        ).innerText =
            "0";


        document.getElementById(
            "dashboard-gst"
        ).innerText =
            "₹0";


        document.getElementById(
            "dashboard-profit"
        ).innerText =
            "₹0";


        document.getElementById(
            "dashboard-affiliate"
        ).innerText =
            "₹0";


        document.getElementById(
            "dashboard-cac"
        ).innerText =
            "₹0";


        document.getElementById(
            "dashboard-margin"
        ).innerText =
            "0%";


        const cogsElement =
            document.getElementById(
                "dashboard-cogs"
            );


        if (cogsElement) {

            cogsElement.innerText =
                "₹0";

        }


        return;

    }


    // ========================================================
    // BUSINESS DATA
    // ========================================================

    let revenue = 0;

    let gst = 0;

    let productsSold = 0;


    orders.forEach(
        function(order) {


            revenue +=
                Number(order.total) || 0;


            gst +=
                Number(order.gst) || 0;


            // Count actual quantities
            if (
                Array.isArray(
                    order.items
                )
            ) {


                order.items.forEach(
                    function(item) {

                        productsSold +=
                            Number(
                                item.quantity
                            ) || 0;

                    }
                );

            }

        }
    );


    const orderCount =
        orders.length;


    // ========================================================
    // AFFILIATE COMMISSION
    // 5%
    // ========================================================

    const affiliateCommission =
        revenue * 0.05;


    // ========================================================
    // PRODUCT COST / COGS
    // 60%
    // ========================================================

    const productCost =
        revenue * 0.60;


    // ========================================================
    // MARKETING EXPENSE
    // 10%
    // ========================================================

    const marketingExpense =
        revenue * 0.10;


    // ========================================================
    // CAC
    // ========================================================

    const cac =
        orderCount > 0
            ? marketingExpense /
              orderCount
            : 0;


    // ========================================================
    // ESTIMATED PROFIT
    // ========================================================

    const profit =
        revenue -
        gst -
        productCost -
        marketingExpense;


    // ========================================================
    // PROFIT MARGIN
    // ========================================================

    const profitMargin =
        revenue > 0
            ? (
                profit /
                revenue
            ) * 100
            : 0;


    // ========================================================
    // SHOW REVENUE
    // ========================================================

    document.getElementById(
        "dashboard-revenue"
    ).innerText =

        "₹" +
        revenue.toLocaleString(
            "en-IN"
        );


    // ========================================================
    // SHOW ORDERS
    // ========================================================

    document.getElementById(
        "dashboard-orders"
    ).innerText =
        orderCount;


    // ========================================================
    // SHOW PRODUCTS
    // ========================================================

    document.getElementById(
        "dashboard-products"
    ).innerText =
        productsSold;


    // ========================================================
    // SHOW GST
    // ========================================================

    document.getElementById(
        "dashboard-gst"
    ).innerText =

        "₹" +
        gst.toLocaleString(
            "en-IN"
        );


    // ========================================================
    // SHOW PROFIT
    // ========================================================

    document.getElementById(
        "dashboard-profit"
    ).innerText =

        "₹" +
        profit.toLocaleString(
            "en-IN"
        );


    // ========================================================
    // SHOW AFFILIATE
    // ========================================================

    document.getElementById(
        "dashboard-affiliate"
    ).innerText =

        "₹" +
        affiliateCommission.toLocaleString(
            "en-IN"
        );


    // ========================================================
    // SHOW CAC
    // ========================================================

    document.getElementById(
        "dashboard-cac"
    ).innerText =

        "₹" +
        cac.toFixed(2);


    // ========================================================
    // SHOW PROFIT MARGIN
    // ========================================================

    document.getElementById(
        "dashboard-margin"
    ).innerText =

        profitMargin.toFixed(1) +
        "%";


    // ========================================================
    // SHOW COGS
    // ========================================================

    const cogsElement =
        document.getElementById(
            "dashboard-cogs"
        );


    if (cogsElement) {

        cogsElement.innerText =

            "₹" +
            productCost.toLocaleString(
                "en-IN"
            );

    }

}


// ============================================================
// DAY 7 - ORDER HISTORY
// ============================================================

function loadOrderHistory() {


    const historyContainer =
        document.getElementById(
            "order-history-list"
        );


    // If not admin page
    if (!historyContainer) {

        return;

    }


    // ========================================================
    // GET ORDERS
    // ========================================================

    const orders =
        JSON.parse(
            localStorage.getItem(
                "smartCartOrders"
            )
        ) || [];


    // ========================================================
    // NO ORDERS
    // ========================================================

    if (
        orders.length === 0
    ) {

        historyContainer.innerHTML =
            "<p>No orders yet.</p>";

        return;

    }


    historyContainer.innerHTML =
        "";


    // ========================================================
    // LATEST ORDERS FIRST
    // ========================================================

    const latestOrders =
        [...orders].reverse();


    latestOrders.forEach(
        function(order) {


            const total =
                Number(order.total) || 0;


            const itemCount =
                Array.isArray(order.items)

                    ? order.items.reduce(
                        function(total, item) {

                            return total +
                                (
                                    Number(
                                        item.quantity
                                    ) || 0
                                );

                        },
                        0
                    )

                    : 0;


            historyContainer.innerHTML += `

                <div class="order-row">

                    <div>

                        <strong>
                            Order ID:
                            ${order.orderId}
                        </strong>

                        <span>
                            Date:
                            ${order.date}
                        </span>

                    </div>


                    <div>

                        <strong>
                            ₹${total.toLocaleString("en-IN")}
                        </strong>

                        <span>
                            ${itemCount}
                            product(s)
                        </span>

                    </div>


                    <div class="order-status">

                        ✅ Completed

                    </div>

                </div>

            `;

        }
    );

}


// ============================================================
// FINAL PAGE LOAD
// IMPORTANT
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {


        // Cart count
        updateCartCount();


        // Cart page
        displayCart();


        // Admin dashboard
        loadAdminDashboard();


        // Order history
        loadOrderHistory();


    }
);