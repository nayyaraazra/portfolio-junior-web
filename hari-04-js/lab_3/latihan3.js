// 3.	FizzBuzz 1-50 (kelipatan 3 = Fizz, 5 = Buzz, keduanya = FizzBuzz). 
let limit = 50;
for (i = 1; i <= limit; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log("FizzBuzz");
    } else if (i % 3 === 0) {
        console.log("Fizz");
    } else if (i % 5 === 0) {
        console.log("Buzz");
    } else {
        console.log(i);
    }
}