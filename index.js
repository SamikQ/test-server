const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const cors = require("cors");
const port = 5000;
const CLIENT_PORT = 3000;

// Функція для завантаження даних з JSON-файлу
const loadCatalog = () => {
  const filePath = path.join(__dirname, "products.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(jsonData).data;
};

app.use(
  cors({
    origin: `http://localhost:${CLIENT_PORT}`,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to the catalog API! Use /catalog to get the catalog data.");
});

// Маршрут для отримання всіх позицій з каталогу
app.get("/products", (req, res) => {
  const catalog = loadCatalog();
  res.json(catalog);
});

app.get("/products/newarrivals", (req, res) => {
  const catalog = loadCatalog();
  const newArrivals = catalog.slice(0, 10);
  res.json(newArrivals);
});

// Маршрут для отримання конкретної позиції за її id
app.get("/products/:id", (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  const catalog = loadCatalog();
  const item = catalog.find((i) => i.id === itemId);
  if (item) {
    res.json(item);
  } else {
    res.status(404).send("Item not found");
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// const express = require("express");
// const bodyParser = require("body-parser");
// const sqlite3 = require("sqlite3").verbose();
// const cors = require("cors");
// require("dotenv").config();

// //Cnfigure ports
// const args = process.argv;
// const p_index = args.indexOf("--p");
// const cp_index = args.indexOf("--cp");
// const PORT = p_index !== -1 ? args[p_index + 1] : process.env.PORT || 5000;
// const CLIENT_PORT =
//   cp_index !== -1 ? args[cp_index + 1] : process.env.CLIENT_PORT || 3000;

// const app = express();
// app.use(
//   cors({
//     origin: `http://localhost:${CLIENT_PORT}`,
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//   })
// );

// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });

// const db = new sqlite3.Database("softserve.db", (err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log("Connected to  database.");
// });

// // CREATE
// app.post("/products", (req, res) => {
//   const { name, price } = req.body;
//   if (typeof name === undefined || price === undefined) {
//     res.status(400).json({ error: "Invalid data format" });
//     return;
//   }

//   const sql = `INSERT INTO products (name,  price) VALUES (?, ?)`;
//   db.run(sql, [name, price], function (err) {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.status(201).json({
//       message: "Product added successfully.",
//       productId: this.lastID,
//     });
//   });
// });

// // READ all
// app.get("/products", (req, res) => {
//   const sql = `SELECT * FROM products`;
//   db.all(sql, [], (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json(rows);
//   });
// });

// // READ once
// app.get("/products/:id", (req, res) => {
//   const id = req.params.id;
//   const sql = `SELECT * FROM products WHERE id = ? `;
//   db.get(sql, id, (err, row) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     if (!row) {
//       res.status(404).json({ error: "Product not found" });
//       return;
//     }
//     res.json(row);
//   });
// });

// // UPDATE
// app.patch("/products/:id", (req, res) => {
//   const id = req.params.id;
//   const selectSqlGet = "SELECT name, price FROM products WHERE id = ?";
//   db.get(selectSqlGet, [id], (err, row) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     if (!row) {
//       res.status(404).json({ error: "Product not found" });
//       return;
//     }
//     const name = req.body.name || row.name;
//     const price = req.body.price || row.price;
//     const sqlWrite = `UPDATE products SET name = ?, price = ? WHERE id = ?`;
//     db.run(sqlWrite, [name, price, id], function (err) {
//       if (err) {
//         res.status(500).json({ error: err.message });
//         return;
//       }
//       res.json({
//         message: "Product updated successfully.",
//       });
//     });
//   });
// });

// // DELETE
// app.delete("/products/:id", (req, res) => {
//   const id = req.params.id;
//   const sql = `DELETE FROM products WHERE id = ?`;
//   db.run(sql, id, function (err) {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     if (this.changes === 0) {
//       res.status(404).json({ error: "Product not found" });
//       return;
//     }
//     res.json({
//       message: "Product deleted successfully.",
//     });
//   });
// });
