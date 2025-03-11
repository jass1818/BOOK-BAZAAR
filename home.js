document.addEventListener("DOMContentLoaded", function () {
    let loggedInUserEmail = localStorage.getItem("loggedInUser");

    if (!loggedInUserEmail || loggedInUserEmail === "null") {
        window.location.href = "index.html";
    } else {
        document.getElementById("username").textContent = loggedInUserEmail;
    }

    // ✅ Load Profile Picture
    let savedProfilePic = localStorage.getItem(loggedInUserEmail + "_profilePic");
    if (savedProfilePic) {
        document.getElementById("profileIcon").src = savedProfilePic;
    }

    // ✅ Navigate to Profile Page
    document.getElementById("profileIcon").addEventListener("click", function () {
        window.location.href = "profile.html";
    });

    // ✨ Animation for Welcome Message
    let welcomeText = "Welcome to,";
    let booksText = "BOOKS BAZAAR";
    let welcomeElement = document.getElementById("animatedWelcome");
    let booksElement = document.getElementById("animatedBooksBazaar");
    let scrollSection = document.getElementById("scrollSection");
    let trendingSection = document.getElementById("trendingSection");

    function typeText(text, element, callback) {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, 100);
            } else if (callback) {
                setTimeout(callback, 200);
            }
        }
        type();
    }

    typeText(welcomeText, welcomeElement, () => typeText(booksText, booksElement, () => {
        setTimeout(() => {
            document.getElementById("welcomeContainer").classList.add("hidden");
            setTimeout(() => {
                scrollSection.style.display = "block"; 
                setTimeout(() => {
                    scrollSection.classList.add("show");
                }, 100);
            }, 500);
        }, 1500);
    }));

    // 🔥 Show Trending Items on Scroll
    window.addEventListener("scroll", function () {
        let trendingPosition = trendingSection.getBoundingClientRect().top;
        let windowHeight = window.innerHeight;
        if (trendingPosition < windowHeight - 100) {
            trendingSection.classList.add("show");
        }
    });
});
// document.addEventListener("DOMContentLoaded", function () {
//     let scrollContainer = document.querySelector(".trending-container");

//     scrollContainer.addEventListener("wheel", function (event) {
//         event.preventDefault();
//         scrollContainer.scrollLeft += event.deltaY;
//     });
// });

document.addEventListener("DOMContentLoaded", function () {
    let logoutButton = document.getElementById("logout");
    
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("loggedInUser");
            window.location.href = "index.html"; // Redirect to login page
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {
    // Redirect to Latest Books Page when "Show Me All" is clicked
    document.getElementById("newBook").addEventListener("click", function () {
        window.location.href = "LatestBooks.html"; // Ensure this file name matches your latest books page
    });
});
document.addEventListener("DOMContentLoaded", function () {
    // Redirect to Latest Books Page when "Show Me All" is clicked
    document.getElementById("oldBook").addEventListener("click", function () {
        window.location.href = "SellBooks.html"; // Ensure this file name matches your latest books page
    });
});
document.addEventListener("DOMContentLoaded", function () {
    // Redirect to Latest Books Page when "Show Me All" is clicked
    document.getElementById("stationary").addEventListener("click", function () {
        window.location.href = "stationary.html"; // Ensure this file name matches your latest books page
    });
});
document.addEventListener("DOMContentLoaded", function () {
    // Redirect to Latest Books Page when "Show Me All" is clicked
    document.getElementById("about").addEventListener("click", function () {
        window.location.href = "about.html"; // Ensure this file name matches your latest books page
    });
});


