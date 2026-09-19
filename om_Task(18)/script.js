function changeColor(box) {
    if (box.innerText == "Red") {
        box.style.backgroundColor = "red";
    }
    if (box.innerText == "Blue") {
        box.style.backgroundColor = "blue";
    }
    if (box.innerText == "Green") {
        box.style.backgroundColor = "green";
    }
    if (box.innerText == "Yellow") {
        box.style.backgroundColor = "yellow";
    }
}
function greetUser() {
    let name = document.getElementById("name").value;
    document.getElementById("heading").innerText = "Hello, " + name;
}