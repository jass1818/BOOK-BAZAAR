document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page refresh

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();
    let formMessage = document.getElementById("formMessage");

    if (name === "" || email === "" || message === "") {
        formMessage.style.color = "red";
        formMessage.textContent = "Please fill in all fields.";
        formMessage.style.display = "block";
        return;
    }

    // ✅ Simulate Form Submission Success
    formMessage.style.color = "green";
    formMessage.textContent = "Your message has been sent successfully!";
    formMessage.style.display = "block";

    // ✅ Clear the form after submission
    document.getElementById("contactForm").reset();

    setTimeout(() => {
        formMessage.style.display = "none";
    }, 3000);
});


// ✅ Expandable Policy Function
function togglePolicy(id) {
    let content = document.getElementById(id);
    content.style.display = content.style.display === "block" ? "none" : "block";
}