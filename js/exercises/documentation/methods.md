🧩 Array Methods (ES6+)
Method Description Example
Array.from() Creates an array from array-like or iterable objects Array.from("hello") → ['h','e','l','l','o']
Array.of() Creates an array from arguments Array.of(1, 2, 3) → [1, 2, 3]
Array.prototype.find() Returns first element that satisfies a condition [1,2,3].find(x => x > 1) → 2
Array.prototype.findIndex() Returns index of the first matching element [1,2,3].findIndex(x => x > 1) → 1
Array.prototype.includes() Checks if array contains an element [1,2,3].includes(2) → true
Array.prototype.fill() Fills array with static value [1,2,3].fill(0) → [0,0,0]
Array.prototype.copyWithin() Copies part of array to another location [1,2,3,4,5].copyWithin(0,3) → [4,5,3,4,5]
Array.prototype.entries() Returns iterator of key/value pairs for (let [i,v] of ['a','b'].entries())
Array.prototype.keys() Returns iterator of keys [...['a','b'].keys()] → [0,1]
Array.prototype.values() Returns iterator of values [...['a','b'].values()] → ['a','b']
🧵 String Methods (ES6+)
Method Description Example
String.prototype.startsWith() Checks if string starts with substring "hello".startsWith("he") → true
String.prototype.endsWith() Checks if string ends with substring "hello".endsWith("lo") → true
String.prototype.includes() Checks if string contains substring "hello".includes("ell") → true
String.prototype.repeat() Repeats the string "ha".repeat(3) → "hahaha"
String.prototype.padStart() Pads start of string "5".padStart(3, "0") → "005"
String.prototype.padEnd() Pads end of string "5".padEnd(3, "0") → "500"
🧱 Object Methods (ES6+)
Method Description Example
Object.assign() Copies properties from one object to another Object.assign({}, a, b)
Object.is() Compares two values (like === but better with NaN) Object.is(NaN, NaN) → true
Object.entries() Returns array of [key, value] pairs Object.entries({a:1,b:2}) → [['a',1],['b',2]]
Object.values() Returns array of object values Object.values({a:1,b:2}) → [1,2]
Object.keys() Returns array of keys Object.keys({a:1,b:2}) → ['a','b']
Object.fromEntries() Creates object from [key, value] pairs Object.fromEntries([['a',1],['b',2]]) → {a:1,b:2}
🔢 Number Methods
Method Description Example
Number.isFinite() Checks if value is finite number Number.isFinite(10) → true
Number.isInteger() Checks if value is integer Number.isInteger(5.5) → false
Number.isNaN() Checks if value is NaN Number.isNaN(NaN) → true
Number.isSafeInteger() Checks if within safe integer range Number.isSafeInteger(2\*\*53) → false
⚙️ Map, Set, WeakMap, WeakSet

New data structures in ES6:

const map = new Map();
map.set('name', 'Alice');
map.get('name'); // 'Alice'

const set = new Set([1, 2, 2, 3]); // duplicates removed → Set {1, 2, 3}

🧠 Function & Utility Features
Feature Example
Arrow functions (x, y) => x + y
Default parameters function greet(name = "User") { ... }
Rest parameters function sum(...nums) { return nums.reduce((a,b)=>a+b); }
Spread syntax [...arr1, ...arr2]
Destructuring const {name, age} = person;
Template literals `Hello, ${name}!`
Promises new Promise((resolve, reject) => { ... })
Classes class Person { constructor(name){ this.name = name; } }
Modules export / import

🌟 ES7 (ECMAScript 2016)
🔹 1. Array.prototype.includes()

Checks if an array contains a specific element.

[1, 2, 3].includes(2); // true
[1, 2, 3].includes(4); // false

🔹 2. Exponentiation Operator (\*\*)

Simpler way to raise numbers to a power.

2 \*\* 3; // 8

⚙️ ES8 (ECMAScript 2017)
🔹 1. Object.values()

Returns an array of object property values.

Object.values({a:1, b:2}); // [1, 2]

🔹 2. Object.entries()

Returns key-value pairs as arrays.

Object.entries({a:1, b:2}); // [['a',1], ['b',2]]

🔹 3. String.prototype.padStart() / padEnd()

Pads strings to a specified length.

"5".padStart(3, "0"); // "005"
"5".padEnd(3, "0"); // "500"

🔹 4. Object.getOwnPropertyDescriptors()

Returns all property descriptors of an object.

Object.getOwnPropertyDescriptors({a: 1});

🔹 5. async / await

Introduced for cleaner asynchronous code.

async function fetchData() {
const data = await fetch("https://api.example.com");
return data.json();
}

🧠 ES9 (ECMAScript 2018)
🔹 1. Rest/Spread for Objects

Allows rest/spread syntax with objects.

const person = {name: "Alice", age: 25, city: "NY"};
const {city, ...rest} = person; // rest = {name: "Alice", age: 25}

const newPerson = {...rest, country: "USA"};

🔹 2. Promise.prototype.finally()

Runs code after a promise resolves/rejects.

fetch("/api")
.then(res => res.json())
.catch(err => console.error(err))
.finally(() => console.log("Request complete"));

🔹 3. Asynchronous Iteration (for await...of)

Used with async generators.

for await (let item of asyncGenerator()) {
console.log(item);
}

⚡ ES10 (ECMAScript 2019)
🔹 1. Array.prototype.flat() & flatMap()

Flatten nested arrays.

[1, [2, [3]]].flat(2); // [1, 2, 3]
[1, 2, 3].flatMap(x => [x, x * 2]); // [1, 2, 2, 4, 3, 6]

🔹 2. Object.fromEntries()

Converts key-value pairs into an object.

Object.fromEntries([["a", 1], ["b", 2]]); // {a:1, b:2}

🔹 3. String.prototype.trimStart() / trimEnd()

Removes whitespace from start/end.

" hi ".trimStart(); // "hi "
" hi ".trimEnd(); // " hi"

🔹 4. try { } catch { } without error binding
try {
throw new Error("Oops");
} catch {
console.log("Error handled");
}

🧱 ES11 (ECMAScript 2020)
🔹 1. BigInt

For working with very large integers.

const big = 9007199254740991n + 10n;

🔹 2. Promise.allSettled()

Waits for all promises to settle (resolve or reject).

Promise.allSettled([
Promise.resolve(10),
Promise.reject("Error")
]);

🔹 3. Nullish Coalescing Operator (??)

Provides default only if the left is null or undefined.

null ?? "default"; // "default"
0 ?? "default"; // 0

🔹 4. Optional Chaining (?.)

Safely access nested properties.

const user = { profile: { name: "Alice" } };
user.profile?.name; // "Alice"
user.address?.city; // undefined

⚙️ ES12 (ECMAScript 2021)
🔹 1. String.prototype.replaceAll()

Replaces all occurrences of a substring.

"banana".replaceAll("a", "o"); // "bonono"

🔹 2. Logical Assignment Operators (||=, &&=, ??=)
let a = 0;
a ||= 5; // a = 5 only if a is falsy

🔹 3. Numeric Separators

Makes large numbers easier to read.

1_000_000; // 1000000

🔹 4. Promise.any()

Returns the first fulfilled promise.

Promise.any([
Promise.reject("error"),
Promise.resolve("success")
]);

🧩 ES13 (ECMAScript 2022)
🔹 1. Class Fields & Static Initialization
class Person {
name = "Alice";
static species = "Human";
}

🔹 2. Object.hasOwn()

A safer alternative to hasOwnProperty.

Object.hasOwn({a: 1}, "a"); // true

🔹 3. Top-level await

Allows await outside async functions (in modules).

const data = await fetch("/api").then(r => r.json());

⚡ ES14–ES15 (2023–2025)
🔹 1. Array.prototype.findLast() / findLastIndex()

Finds the last element matching a condition.

[1, 2, 3, 4].findLast(x => x % 2 === 0); // 4

🔹 2. Array.prototype.toSorted(), toReversed(), toSpliced(), with()

Immutable array methods (they don’t modify the original array).

const arr = [3, 1, 2];
const sorted = arr.toSorted(); // [1, 2, 3]
const reversed = arr.toReversed(); // [2, 1, 3]
const spliced = arr.toSpliced(1, 1); // removes index 1
const updated = arr.with(1, 99); // replaces element at index 1

🔹 3. Temporal API (Upcoming)

A modern replacement for Date for accurate time handling.

// Not yet fully implemented, but coming soon:
Temporal.Now.plainDateISO();
