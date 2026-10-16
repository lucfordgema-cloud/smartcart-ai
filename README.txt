SmartCart AI replacement files

Included:
- index.html: clarified recommendation wording, added affiliate disclosure near products, preserved the provided product cards and financial snapshot.
- cart.html: added a clarification that Amazon links open separately and the demo cart does not purchase on Amazon.
- admin-login.html: clarified that this is a prototype login and removed the visible demo password from the page.

IMPORTANT:
1. Keep your existing style.css and script.js in the same folder.
2. These files expect the same function names used by your existing script.js: showCart(), getRecommendation(), filterProducts(), addProductToCart(), checkout(), adminLogin().
3. The admin-login page no longer displays the password. Your current script.js may still check the demo password in client-side code; the login will only work if you enter the same password that script.js expects. Client-side login is demo-only and is not secure.
4. Before replacing your live site, download a backup of your current repository.
5. Product prices, ratings, and Amazon links have not been independently verified in this package.
