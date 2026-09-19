let services = [
    {
        name: "Dry Cleaning",
        price: 200,
        image: "dry-cleaning.jpg"
    },
    {
        name: "Wash and Fold",
        price: 150,
        image: "wash-and-fold.jpg"
    },
    {
        name: "Ironing Service",
        price: 100,
        image: "ironing.jpg"
    },
    {
        name: "Leather Cleaning",
        price: 250,
        image: "leather-cleaning.jpg"
    },
    {
        name: "Stain Removal",
        price: 120,
        image: "stain-removal.jpg"
    },
    {
        name: "Wedding Dress Cleaning",
        price: 500,
        image: "wedding-dress.jpg"
    }
];
let currentService = 0;
let addedServices = [];
let serviceImage = document.getElementById("service-image");
let serviceName = document.getElementById("service-name");
let servicePrice = document.getElementById("service-price");
let addButton = document.getElementById("add-btn");
let skipButton = document.getElementById("skip-btn");
let itemsList = document.getElementById("items-list");
let total = document.getElementById("total");
let bookingMessage = document.getElementById("booking-message");
function showService() {
    serviceImage.src = services[currentService].image;
    serviceName.innerText = services[currentService].name;
    servicePrice.innerText =
        "₹" + services[currentService].price + ".00";
}
function showNextService() {
    currentService++;
    if (currentService >= services.length) {
        currentService = 0;
    }
    showService();
}
skipButton.addEventListener("click", function () {
    showNextService();
});
addButton.addEventListener("click", function () {
    addedServices.push(services[currentService]);
    bookingMessage.hidden = true;
    updateItems();
    showNextService();
});
function updateItems() {
    itemsList.innerHTML = "";
    let amount = 0;
    for (let i = 0; i < addedServices.length; i++) {
        amount = amount + addedServices[i].price;
        let item = document.createElement("div");
        item.className = "item-row";
        item.innerHTML = `
            <span>${i + 1}</span>
            <span>${addedServices[i].name}</span>
            <span>₹${addedServices[i].price}</span>
        `;
        itemsList.appendChild(item);
    }
    total.innerText = "₹ " + amount;
}
document.getElementById("book-now").addEventListener("click", function () {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    if (addedServices.length === 0) {
        bookingMessage.hidden = false;
    } else if (name === "" || email === "" || phone === "") {
        alert("Please fill all the details");
    } else {
        alert("Booking successful!");
    }
});