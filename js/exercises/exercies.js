function sum(a, b) {
  return (c = a + b);
}

let sum2 = (a, b) => a + b;

console.log(sum(3, 4));
console.log("Aceasta este o functie arrow: " + sum2(3, 4));

function isPositive(number) {
  return number >= 0;
}

let isPositive2 = (number) => number >= 0;

function randomNumber() {
  return Math.random;
}

let randomNumber2 = () => Math.random;

document.addEventListener("click", function () {
  console.log("Click");
});

document.addEventListener("click", () => console.log("Click2"));

class Person {
  constructor(name) {
    this.name = name;
  }

  printNameArrow() {
    setTimeout(() => {
      console.log("Arrow" + this.name);
    }, 100);
  }

  printNameFunction() {
    setTimeout(function () {
      console.log("Function" + this.name);
    }, 100);
  }
}

let person = new Person("Bob");
person.printNameArrow();
person.printNameFunction();
console.log(this.name);
