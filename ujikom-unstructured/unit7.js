// soal 1
function loopToTen(){
  for(var i=0; i < 10; i++){
    console.log(i)
  }
}

// soal 2
function displayEvenNumbers(numbers){
  var evenNumbers = [];
  for(var i = 0; i < numbers.length; i++){
    if(numbers[i] % 2 === 0) {
      evenNumbers.push(numbers[i]);
    }
  }
  return evenNumbers;
}
displayEvenNumbers([1,2,3,4,5,6,7,8])

// // soal 3
// let html = '<p>Click here to <a href="#Book">reservation</a></p>';
// console.log(html);

// // soal 4
// let seven = 7;
// let three = "3";
// let total = seven + Number(three);
// console.log(total);

// // soal 5
// console.log("Hi %s, my name is %s, i'm %d years old, %f cm height and %f kg weight. I have %d children, %s, %s, and %s", 'world', 'Joe', 23, 169.9, 80.5, 3, "Sandra", "Bella", "Surdi");