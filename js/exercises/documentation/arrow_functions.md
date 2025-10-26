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
🧠 this in each context (visual diagram)
javascript
Copy code
──────────────────────────────────────────────
CLASS CONTEXT
──────────────────────────────────────────────
Person instance (created with new Person("Bob"))
↓
this → Person { name: "Bob" }

──────────────────────────────────────────────
METHOD 1: printNameArrow()
──────────────────────────────────────────────
Inside printNameArrow():
this → Person { name: "Bob" }

setTimeout(
() => {
console.log("Arrow" + this.name);
}
)

↳ Arrow function DOES NOT create its own `this`
↳ Inherits `this` from outer scope (Person)

Result:
"ArrowBob"
──────────────────────────────────────────────

──────────────────────────────────────────────
METHOD 2: printNameFunction()
──────────────────────────────────────────────
Inside printNameFunction():
this → Person { name: "Bob" }

setTimeout(
function() {
console.log("Function" + this.name);
}
)

↳ Regular function CREATES its own `this`
↳ When called by setTimeout(), `this` points to:

- `window` (in browsers)
- `undefined` (in strict mode or Node.js)

Result:
"Functionundefined"
──────────────────────────────────────────────

──────────────────────────────────────────────
GLOBAL CONTEXT
──────────────────────────────────────────────
console.log(this.name);

↳ In browser → this = window
↳ In Node.js → this = {} (no global name)

Result:
undefined or ""
