const divide = (a, b) => {
    return new Promise((resolve, reject) => {

        if (b === 0) {
            reject("Error: Division by zero is not allowed.");
        } else {
            resolve(a / b);
        }

    });
};
divide(10, 2)
    .then(result => console.log("Result:", result))
    .catch(error => console.log(error));
divide(20, 4)
    .then(result => console.log("Result:", result))
    .catch(error => console.log(error));
divide(15, 3)
    .then(result => console.log("Result:", result))
    .catch(error => console.log(error));
divide(10, 0)
    .then(result => console.log("Result:", result))
    .catch(error => console.log(error));
divide(50, 5)
    .then(result => console.log("Result:", result))
    .catch(error => console.log(error));