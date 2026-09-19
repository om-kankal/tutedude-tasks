let n = 10;
let number = 153;
let prime = 17;
let factor = 153;
let armstrong = 153;
let sum = 0;
for (let i = 1; i <= n; i++) {
    sum = sum + i;
}
console.log("Sum of first " + n + " numbers : " + sum);
console.log("Table of " + n);
for (let i = 1; i <= 10; i++) {
    console.log(n + " x " + i + " = " + (n * i));
}
let checkPrime = true;
for (let i = 2; i < prime; i++) {
    if (prime % i == 0) {
        checkPrime = false;
        break;
    }
}
if (checkPrime) {
    console.log(prime + " is a prime number");
} else {
    console.log(prime + " is not a prime number");
}
console.log("Factors of " + factor);
for (let i = 1; i <= factor; i++) {
    if (factor % i == 0) {
        console.log(i);
    }
}
let digitSum = 0;
let temp = number;
while (temp > 0) {
    let digit = temp % 10;
    digitSum = digitSum + digit;
    temp = Math.floor(temp / 10);
}
console.log("Sum of digits of " + number + " : " + digitSum);
let armstrongSum = 0;
let temp2 = armstrong;
while (temp2 > 0) {
    let digit = temp2 % 10;
    armstrongSum = armstrongSum + digit * digit * digit;
    temp2 = Math.floor(temp2 / 10);
}
if (armstrongSum == armstrong) {
    console.log(armstrong + " is an Armstrong number");
} else {
    console.log(armstrong + " is not an Armstrong number");
}