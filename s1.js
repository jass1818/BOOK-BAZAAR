
// 🌙 Toggle Dark & Light Mode
document.getElementById("theme-toggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    this.innerHTML = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// 🔄 Toggle Between Sign In & Sign Up Forms
function toggleForm(formType) {
    let signInForm = document.getElementById("signInForm");
    let signUpForm = document.getElementById("signUpForm");

    if (formType === "signUp") {
        signInForm.style.display = "none";
        signUpForm.style.display = "block";
    } else {
        signUpForm.style.display = "none";
        signInForm.style.display = "block";
    }
}

// ✅ Sign Up Function (Save User in LocalStorage)
function signUp() {
    let fullName = document.getElementById("fullName").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let password = document.getElementById("signUpPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    // 🚨 Validate Fields
    if (!fullName || !email || !phone || !password || !confirmPassword) {
        alert("❌ All fields are required!");
        return;
    }

    // 🚨 Validate Password Match
    if (password !== confirmPassword) {
        alert("❌ Passwords do not match!");
        return;
    }

    // 🚨 Check if User Already Exists
    if (localStorage.getItem(email)) {
        alert("❌ Email already registered! Please log in.");
        return;
    }

    // ✅ Save User Data in LocalStorage
    let userData = { fullName, email, phone, password };
    localStorage.setItem(email, JSON.stringify(userData));

    alert("✅ Account Created Successfully! Please sign in.");
    toggleForm("signIn");  // Switch to Sign In
}

// ✅ Sign In Function (Redirect to Home Page)
function signIn() {
    let email = document.getElementById("signInEmail").value;
    let password = document.getElementById("signInPassword").value;

    // 🚨 Validate Fields
    if (!email || !password) {
        alert("❌ Both fields are required!");
        return;
    }

    // 🔍 Retrieve User Data from LocalStorage
    let userData = localStorage.getItem(email);

    if (!userData) {
        alert("❌ No account found with this email! Please sign up.");
        return;
    }

    let storedUser = JSON.parse(userData);

    // 🔐 Validate Password
    if (password !== storedUser.password) {
        alert("❌ Incorrect password!");
        return;
    }

    // ✅ Login Success → Store Session & Redirect to Home Page
    localStorage.setItem("loggedInUser", storedUser.fullName);
    window.location.href = "home.html";  // ✅ Redirect to Home Page
}
