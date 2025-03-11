document.addEventListener("DOMContentLoaded", function () {
    const filters = document.querySelectorAll(".filter");
    const books = document.querySelectorAll(".book-card");
    const searchInput = document.getElementById("searchInput");
    const priceRange = document.getElementById("priceRange");
    const priceValue = document.getElementById("priceValue");
    const clearFiltersBtn = document.querySelector(".clear-filters");
    const cartButton = document.querySelector(".cart-button");
    const cartCount = document.getElementById("cart-count");
    let cart = [];

    function applyFilters() {
        let selectedFilters = Array.from(filters)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        let maxPrice = parseInt(priceRange.value);
        let searchQuery = searchInput.value.toLowerCase();

        books.forEach(book => {
            let bookCategory = book.dataset.category;
            let bookPrice = parseInt(book.dataset.price);
            let bookTitle = book.querySelector("h4").textContent.toLowerCase();

            let categoryMatch = selectedFilters.length === 0 || selectedFilters.includes(bookCategory);
            let priceMatch = bookPrice <= maxPrice;
            let searchMatch = bookTitle.includes(searchQuery);

            book.style.display = (categoryMatch && priceMatch && searchMatch) ? "block" : "none";
        });
    }

    filters.forEach(filter => filter.addEventListener("change", applyFilters));
    searchInput.addEventListener("input", applyFilters);
    priceRange.addEventListener("input", function () {
        priceValue.textContent = `Rs. ${priceRange.value}`;
        applyFilters();
    });
    clearFiltersBtn.addEventListener("click", function () {
        filters.forEach(filter => filter.checked = false);
        priceRange.value = "1000";
        priceValue.textContent = "Rs. 1000";
        searchInput.value = "";
        applyFilters();
    });

    // 🛍️ Add to Cart
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            let bookTitle = this.parentElement.querySelector("h4").textContent;
            let bookPrice = this.parentElement.querySelector("p:nth-of-type(2)").textContent.replace("Price: Rs. ", "");

            cart.push({ title: bookTitle, price: bookPrice });
            cartCount.textContent = cart.length;
            alert(`${bookTitle} added to cart!`);
        });
    });

    // 🛒 Open Cart (Future Enhancement)
    cartButton.addEventListener("click", function () {
        alert(`Cart Items:\n${cart.map(item => `${item.title} - Rs. ${item.price}`).join("\n") || "No items in cart"}`);
    });

    // 🛍️ Buy Now
    document.querySelectorAll(".buy-now").forEach(button => {
        button.addEventListener("click", function () {
            alert("Redirecting to checkout...");
        });
    });
});



// 📌 Run Function When Page Loads
document.addEventListener("DOMContentLoaded", displayBooks);


function openBookForm() {
    document.getElementById("bookForm").style.display = "block";
}

function closeBookForm() {
    document.getElementById("bookForm").style.display = "none";
}


function saveBook(event) {
    event.preventDefault(); // Prevent form submission refresh

    // Get Form Values
    const title = document.getElementById("bookTitle").value.trim();
    const author = document.getElementById("bookAuthor").value.trim();
    const price = document.getElementById("bookPrice").value.trim();
    const category = document.getElementById("bookCategory").value;
    const imageInput = document.getElementById("bookImage");
    const booksContainer = document.getElementById("booksList");

    // Ensure All Fields Are Filled
    if (!title || !author || !price || imageInput.files.length === 0) {
        alert("Please fill all fields and upload an image.");
        return;
    }

    // Create a Temporary Image URL
    const imageURL = URL.createObjectURL(imageInput.files[0]);

    // Get existing books from localStorage or create an empty array
    let books = JSON.parse(localStorage.getItem("books")) || [];

    // Add new book to array
    books.push({ title, author, price, category, imageURL });

    // Save updated books array to localStorage
    localStorage.setItem("books", JSON.stringify(books));

    // Refresh book list
    displayBooks();

    // Clear Form Inputs
    document.getElementById("bookTitle").value = "";
    document.getElementById("bookAuthor").value = "";
    document.getElementById("bookPrice").value = "";
    document.getElementById("bookImage").value = "";

    // Close the Form
    closeBookForm();
}
function displayBooks() {
    const booksContainer = document.getElementById("booksList");
    booksContainer.innerHTML = ""; // Clear existing content

    let books = JSON.parse(localStorage.getItem("books")) || [];
    let isAdmin = sessionStorage.getItem("adminLoggedIn") === "true"; // Check if admin is logged in

    // Add books in reverse order so the latest appears first
    books.reverse().forEach((book, index) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.setAttribute("data-category", book.category);

        bookCard.innerHTML = `
            <img src="${book.imageURL}" alt="${book.title}">
            <h4>${book.title}</h4>
            <p>Author: ${book.author}</p>
            <p>Price: Rs. ${book.price}</p>
            <button class="buy-now">Buy Now</button>
            <button class="add-to-cart">Add to Cart</button>
        `;

        if (isAdmin) {
            bookCard.innerHTML += `<button class="delete-book" onclick="deleteBook(${index})">❌ Delete</button>`;
        }

        // **Prepend books at the top instead of appending**
        booksContainer.prepend(bookCard);
    });
}




function deleteBook(index) {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    books.splice(index, 1); // Remove the book from the array
    localStorage.setItem("books", JSON.stringify(books)); // Update storage
    displayBooks(); // Refresh the book list
}

function adminLogin() {
    const password = prompt("Enter Admin Password:");

    if (password === "admin123") {  // ✅ Change this password to your own
        sessionStorage.setItem("adminLoggedIn", "true"); // Store admin session
        alert("Admin Access Granted!");
        displayBooks(); // Refresh books to show delete buttons
    } else {
        alert("Incorrect Password! Access Denied.");
    }
}

function adminLogout() {
    sessionStorage.removeItem("adminLoggedIn"); // Remove admin session
    alert("Admin Logged Out!");
    displayBooks(); // Refresh books to hide delete buttons
}

function toggleMenu() {
    document.querySelector(".nav-links").classList.toggle("show");
}










function openSellForm() {
    let form = document.getElementById("sellForm");

    // Ensure form is visible before applying animation
    form.style.display = "block";

    // Apply animation smoothly
    setTimeout(() => {
        form.classList.add("show-form");
    }, 10);
}

// 📌 Show Loading & Then Estimated Price
function showEstimatedPrice() {
    let bookName = document.getElementById("bookName").value.trim();
    let purchaseDate = document.getElementById("purchaseDate").value;
    let publicationDate = document.getElementById("publicationDate").value;
    let mrp = document.getElementById("mrp").value;
    let defects = document.getElementById("defects").value.trim();
    let sellButton = document.getElementById("sellButton");
    let loadingIndicator = document.getElementById("loadingIndicator");
    let priceDisplay = document.getElementById("priceDisplay");

    // 📌 Ensure all fields are filled before proceeding
    if (!bookName || !purchaseDate || !publicationDate || !mrp) {
        alert("Please fill in all details before selling.");
        return;
    }

    // 📌 Show Loading Animation
    sellButton.innerText = "Calculating...";
    sellButton.disabled = true; // Prevent multiple clicks
    loadingIndicator.style.display = "inline-block"; // Show loading

    setTimeout(() => {
        // 📌 Calculate estimated price (50-60% of MRP, 45-50% if defect present)
        let minPercent = defects ? 45 : 50;
        let maxPercent = defects ? 50 : 60;
        let estimatedPrice = Math.floor(mrp * ((Math.random() * (maxPercent - minPercent) + minPercent) / 100));

        // 📌 Hide loading & Show Estimated Price
        loadingIndicator.style.display = "none";
        priceDisplay.innerText = `Estimated Selling Price: ₹${estimatedPrice}`;
        priceDisplay.style.display = "block"; // Show estimated price

        // 📌 Change "Sell" button to "Continue"
        sellButton.innerText = "Continue";
        sellButton.disabled = false; // Enable button again
        sellButton.setAttribute("onclick", "openPaymentForm()");
    }, 1500); // 1.5 sec delay for realistic effect
}

// 📌 Open Payment Form
function openPaymentForm() {
    closeSellForm();
    let form = document.getElementById("paymentForm");
    form.style.display = "block";
    setTimeout(() => {
        form.classList.add("show-form");
    }, 10);
}

// 📌 Close Sell Form
function closeSellForm() {
    let form = document.getElementById("sellForm");
    form.classList.remove("show-form");
    setTimeout(() => {
        form.style.display = "none";
    }, 300);
}

// 📌 Close Payment Form
function closePaymentForm() {
    let form = document.getElementById("paymentForm");
    form.classList.remove("show-form");
    setTimeout(() => {
        form.style.display = "none";
    }, 300);
}

// 📌 Confirm Sale & Show Success Alert
function confirmSale() {
    let accountName = document.getElementById("accountName").value;
    let bankName = document.getElementById("bankName").value;
    let accountNumber = document.getElementById("accountNumber").value;
    let ifscCode = document.getElementById("ifscCode").value;

    if (!accountName || !bankName || !accountNumber || !ifscCode) {
        alert("Please fill in all bank details.");
        return;
    }

    alert("Book sold successfully! Payment will be transferred to your account.");
    closePaymentForm();
}


