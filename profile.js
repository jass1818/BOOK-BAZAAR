document.addEventListener("DOMContentLoaded", function () {
    let loggedInUserEmail = localStorage.getItem("loggedInUser");

    if (!loggedInUserEmail || loggedInUserEmail === "null") {
        window.location.href = "index.html"; // Redirect if not logged in
        return;
    }

    let storedUser = JSON.parse(localStorage.getItem(loggedInUserEmail));

    if (storedUser) {
        document.getElementById("fullName").value = storedUser.fullName || "";
        document.getElementById("email").value = storedUser.email || "";
        document.getElementById("phone").value = storedUser.phone || "";
        document.getElementById("address").value = storedUser.address || "";
        document.getElementById("cityState").value = storedUser.cityState || "";
        document.getElementById("pincode").value = storedUser.pincode || "";
    }

    // ✅ Load and Show Profile Picture from LocalStorage
    let savedProfilePic = localStorage.getItem(loggedInUserEmail + "_profilePic");
    if (savedProfilePic) {
        document.getElementById("profilePic").src = savedProfilePic;
    }

    // 🚀 Save Profile Changes
    document.getElementById("profileForm").addEventListener("submit", function (event) {
        event.preventDefault();

        storedUser.phone = document.getElementById("phone").value;
        storedUser.address = document.getElementById("address").value;
        storedUser.cityState = document.getElementById("cityState").value;
        storedUser.pincode = document.getElementById("pincode").value;

        localStorage.setItem(loggedInUserEmail, JSON.stringify(storedUser));
        alert("✅ Profile updated successfully!");
    });

    // 🚀 Upload Profile Picture & Save in LocalStorage
    document.getElementById("profilePicInput").addEventListener("change", function (event) {
        let file = event.target.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function (e) {
                let imageUrl = e.target.result;
                document.getElementById("profilePic").src = imageUrl;
                localStorage.setItem(loggedInUserEmail + "_profilePic", imageUrl); // Save with user email key
            };
            reader.readAsDataURL(file);
        }
    });

    // 🚪 Logout Function
    document.getElementById("logout").addEventListener("click", function () {
        localStorage.removeItem("loggedInUser");
        window.location.href = "index.html";
    });
});
