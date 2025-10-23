# Folosirea `async` și `await` în pagina de admin Retro Game Shop

## 1. Ce sunt `async` și `await`?

JavaScript folosește adesea operații asincrone, de exemplu:
- Cereri HTTP (`fetch`)
- Operații Firestore (`addDoc`, `getDocs`)
- Timer-e (`setTimeout`)

Exemplu clasic cu Promises:

```javascript
fetch("https://api.example.com/data")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

Sintaxă cu `async/await`:

```javascript
async function fetchData() {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    console.log("Date primite:", data);
  } catch (err) {
    console.error("Eroare:", err);
  }
}
```

Avantaje:
- Cod mai clar și liniar
- Gestionare simplă a erorilor cu `try/catch`
- Flux secvențial previzibil

---

## 2. Exemple simple

```javascript
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
  console.log("Start...");
  await wait(1000);
  console.log("1 secundă mai târziu");
  await wait(500);
  console.log("Încă 0.5 secunde mai târziu");
}

demo();
```

---

## 3. De ce folosim `async/await` cu Firestore

În admin-ul nostru:

- `addDoc(collection(db, "produse"), product)` → adaugă produs
- `getDocs(collection(db, "produse"))` → afișează produse
- `deleteDoc(doc(db, "produse", id))` → șterge produs
- `updateDoc(doc(db, "produse", id), {nume: "nou"})` → editează produs

Exemplu cu async/await:

```javascript
addBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    await addDoc(collection(db, "produse"), product);
    productForm.reset();
    await displayProducts();
  } catch (err) {
    console.error("❌ Eroare:", err);
  }
});
```

Avantaje:
- Cod secvențial clar
- Gestionare ușoară a erorilor
- UI coerent: tabelul se actualizează doar după adăugare

---

## 4. Flow complet în codul nostru

1. User apasă "Add Product".
2. Event listener `async` capturează click-ul.
3. `await addDoc(...)` → produsul este adăugat în Firestore.
4. `productForm.reset()` → formularul se curăță.
5. `await displayProducts()` → tabelul se reîncarcă cu produsele actuale.

---

## 5. Afișarea produselor cu `async/await`

```javascript
async function displayProducts() {
  const tbody = document.querySelector("#products-table tbody");
  tbody.innerHTML = "";

  try {
    const snapshot = await getDocs(collection(db, "produse"));
    let index = 1;
    snapshot.forEach(docSnap => {
      const p = docSnap.data();
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index}</td>
        <td>${p.nume}</td>
        <td>${p.pret}</td>
        <td>
          <button onclick="editProduct('${docSnap.id}')">Edit</button>
          <button onclick="deleteProduct('${docSnap.id}')">Delete</button>
        </td>
      `;
      tbody.appendChild(row);
      index++;
    });
  } catch (err) {
    console.error("❌ Eroare la afișarea produselor:", err);
  }
}
```

---

## 6. Diagramă vizuală a fluxului asincron

```mermaid
flowchart TD
    A[User apasă "Add Product"] --> B[Event listener async]
    B --> C[await addDoc(...) în Firestore]
    C -->|Succes| D[Resetează formularul]
    D --> E[await displayProducts()]
    E --> F[Afișează lista actualizată de produse]
    C -->|Eroare| G[Prinde eroarea în try/catch]
    G --> H[console.error("❌ Eroare:", err)]
```

---

## 7. Concluzii

- `async/await` simplifică codul asincron
- `try/catch` gestionează erorile elegant
- Operațiile Firestore devin secvențiale și previzibile
- Fluxul aplicației devine mai ușor de înțeles și întreținut