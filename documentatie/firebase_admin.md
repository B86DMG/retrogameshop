# Firebase Admin Setup for Vanilla JS Online Shop

Acest ghid explică pas cu pas cum să migrezi un proiect de magazin online construit cu HTML, CSS și Vanilla JS de la MockAPI la Firebase (variantă gratuită) și să implementezi funcționalități de admin (add, edit, delete produse).

---

## 1. Crearea proiectului Firebase

1. Accesează [Firebase Console](https://console.firebase.google.com/).
2. Apasă pe **Add project** și urmează pașii.
3. Completează numele proiectului (ex: `RetroGameShop`) și acceptă termenii.
4. Dezactivează Google Analytics pentru test, dacă nu ai nevoie.
5. Finalizează crearea proiectului.

## 2. Configurarea Firestore

1. În panoul Firebase, mergi la **Firestore Database**.
2. Apasă **Create Database**.
3. Alege modul **Start in test mode** (nu securizat pentru producție, dar bun pentru antrenament).
4. Alege locația (ex: `us-central1`) și creează baza.
5. Nu este nevoie să creezi colecții manual; le poți crea din cod la primul addDoc.

## 3. Setarea configurației Firebase în JS

1. În `app_firebase.js`, adaugă configurația Firebase:

```javascript
const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "PROJECT_ID.firebaseapp.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
  measurementId: "MEASUREMENT_ID"
};
```

2. Importă modulele necesare:

```javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
```

3. Initializează Firebase și Firestore:

```javascript
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
```

## 4. Crearea HTML-ului pentru Admin

1. Formular pentru adăugare produs:

```html
<form id="product-form">
  <input type="text" id="nume" placeholder="Nume produs" required />
  <input type="text" id="pret" placeholder="Pret" required />
  <input type="url" id="imageURL" placeholder="Image URL" required />
  <input type="text" id="description" placeholder="Description" required />
  <input type="text" id="categorie" placeholder="Categorie" required />
  <input type="text" id="subcategorie" placeholder="Subcategorie" required />
  <input type="number" id="cantitate" placeholder="Cantitate" required />
  <button id="add-btn">Add Product</button>
</form>
```

2. Tabel pentru afișarea produselor:

```html
<table id="products-table">
  <thead>
    <tr>
      <th>ID</th>
      <th>Image</th>
      <th>Name</th>
      <th>Price</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody></tbody>
</table>
```

## 5. Adăugarea unui produs în Firestore

1. Preia valorile din formular.
2. Creează obiectul `product` cu toate câmpurile definite.
3. Folosește `addDoc` pentru a adăuga documentul în colecția `produse`.
4. Loghează ID-ul documentului și resetează formularul.

```javascript
const product = {
  nume: document.getElementById("nume").value,
  pret: parseFloat(document.getElementById("pret").value),
  imageURL: document.getElementById("imageURL").value,
  description: document.getElementById("description").value,
  categorie: document.getElementById("categorie").value,
  subcategorie: document.getElementById("subcategorie").value,
  cantitate: parseInt(document.getElementById("cantitate").value)
};

await addDoc(collection(db, "produse"), product);
```

## 6. Afișarea produselor în tabel

1. Folosește `getDocs` pe colecția `produse`.
2. Creează rânduri în tabel pentru fiecare document.
3. Adaugă butoane `Edit` și `Delete` pentru fiecare rând.

```javascript
const querySnapshot = await getDocs(collection(db, "produse"));
querySnapshot.forEach(docSnap => {
  const p = docSnap.data();
  // creare rând tabel și event listeners pentru edit/delete
});
```

## 7. Ștergerea unui produs

1. Folosește `deleteDoc(doc(db, "produse", id))`.
2. Confirmă ștergerea cu `confirm()`.
3. Refresh tabel după ștergere.

## 8. Editarea unui produs

1. Folosește `updateDoc(doc(db, "produse", id), { nume: newName })`.
2. Poți folosi prompt pentru simplu input sau un mini-form inline.
3. Refresh tabel după modificare.

## 9. Reguli de securitate (opțional pentru test)

```text
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2025, 11, 22);
    }
  }
}
```
> Aceasta este varianta `test mode`. În producție, trebuie reguli stricte pentru autentificare și acces.

## 10. Debugging tips

- Verifică că `firebaseConfig` este corect.
- Console log la fiecare pas (`Adding product`, `Document written with ID`, `Error adding product`).
- Colecția `produse` nu trebuie creată manual; `addDoc` o creează automat.
- Dacă vezi erori `Cannot read properties of null`, verifică că ID-urile din HTML corespund cu `getElementById`.
- În Firestore Console poți vedea documentele și datele inserate.

---

Acum ai un admin complet funcțional pentru adăugarea, editarea și ștergerea produselor cu Firestore și Vanilla JS.

