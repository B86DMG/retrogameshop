from fpdf import FPDF

# Create a PDF with ES6 methods summary
pdf = FPDF()
pdf.add_page()
pdf.set_font("Arial", "B", 16)
pdf.cell(0, 10, "JavaScript ES6 Methods Summary", ln=True, align="C")
pdf.ln(10)

pdf.set_font("Arial", "", 11)

content = """
🧩 Array Methods
- Array.from()
- Array.of()
- Array.prototype.find()
- Array.prototype.findIndex()
- Array.prototype.includes()
- Array.prototype.fill()
- Array.prototype.copyWithin()
- Array.prototype.entries()
- Array.prototype.keys()
- Array.prototype.values()

🧵 String Methods
- startsWith()
- endsWith()
- includes()
- repeat()
- padStart()
- padEnd()

🧱 Object Methods
- Object.assign()
- Object.is()
- Object.entries()
- Object.values()
- Object.keys()
- Object.fromEntries()

🔢 Number Methods
- Number.isFinite()
- Number.isInteger()
- Number.isNaN()
- Number.isSafeInteger()

⚙️ Map, Set, WeakMap, WeakSet
- map.set(), map.get()
- set.add(), set.has()

🧠 Function & Utility Features
- Arrow functions
- Default parameters
- Rest parameters
- Spread syntax
- Destructuring
- Template literals
- Promises
- Classes
- Modules (import/export)
"""

pdf.multi_cell(0, 8, content)

# Save the PDF
pdf.output("ES6_Methods_Summary.pdf")

print("✅ ES6_Methods_Summary.pdf created successfully.")
