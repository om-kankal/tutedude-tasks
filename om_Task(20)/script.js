let selectedServices = [];
const serviceButtons = document.querySelectorAll(".service-btn");
const cart = document.getElementById("cart");
const total = document.getElementById("total");
serviceButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const name = button.getAttribute("data-name");
        const price = Number(button.getAttribute("data-price"));
        const alreadyAdded = selectedServices.some(function(service) {
            return service.name === name;
        });
        if (alreadyAdded) {
            selectedServices = selectedServices.filter(function(service) {
                return service.name !== name;
            });
            button.innerHTML = "Add Item ⊕";
            button.classList.remove("remove-btn");
        } else {
            selectedServices.push({
                name: name,
                price: price
            });
            button.innerHTML = "Remove Item ⊖";
            button.classList.add("remove-btn");
        }
        showCart();
    });
});
function showCart() {
    cart.innerHTML = "";
    if (selectedServices.length === 0) {
        cart.innerHTML = `
            <tr>
                <td colspan="3">
                    <div class="empty-cart">
                        <div class="empty-icon">ⓘ</div>
                        <b>No Items Added</b>
                        <p>Add items to the cart from the services box</p>
                    </div>
                </td>
            </tr>
        `;
        total.innerHTML = "₹0.00";
        return;
    }
    let totalAmount = 0;
    selectedServices.forEach(function(service, index) {
        totalAmount = totalAmount + service.price;
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${service.name}</td>
            <td>₹${service.price.toFixed(2)}</td>
        `;
        cart.appendChild(row);
    });
    total.innerHTML = "₹" + totalAmount.toFixed(2);
}
document.getElementById("hero-book").addEventListener("click", function() {
    document.getElementById("services").scrollIntoView({
        behavior: "smooth"
    });
});
emailjs.init({
    publicKey: "YOUR_PUBLIC_KEY"
});
const bookingForm = document.getElementById("booking-form");
const confirmation = document.getElementById("confirmation");
bookingForm.querySelectorAll('input:not([type="hidden"])').forEach(function(input) {
    input.addEventListener("focus", function() {
        if (selectedServices.length === 0) {
            confirmation.innerText =
                "ⓘ Add the items to the cart to book";
            confirmation.style.color = "#e45c7b";
        }
    });
});
bookingForm.addEventListener("submit", function(event) {
    event.preventDefault();
    if (selectedServices.length === 0) {
        confirmation.innerText =
            "Please add at least one service.";
        confirmation.style.color = "red";
        return;
    }
    const serviceNames = selectedServices.map(function(service) {
        return service.name;
    });
    const totalAmount = selectedServices.reduce(function(sum, service) {
        return sum + service.price;
    }, 0);
    document.getElementById("selected-services").value =
        serviceNames.join(", ");
    document.getElementById("booking-total").value =
        "₹" + totalAmount.toFixed(2);
    emailjs.sendForm(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        bookingForm
    )
    .then(function() {
        confirmation.innerText =
            "Your booking has been confirmed successfully!";
        confirmation.style.color = "green";
        bookingForm.reset();
        selectedServices = [];
        serviceButtons.forEach(function(button) {
            button.innerHTML = "Add Item ⊕";
            button.classList.remove("remove-btn");
        });
        showCart();
    })
    .catch(function(error) {
        console.log(error);
        confirmation.innerText =
            "Something went wrong. Please try again.";
        confirmation.style.color = "red";
    });
});