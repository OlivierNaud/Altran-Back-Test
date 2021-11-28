const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "altrancruddatabase",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM todolist";

  db.query(sqlSelect, (err, result) => {
    if (err) throw err;
    res.send(
      result.sort((a, b) => {
        return b.id - a.id;
      })
    );
  });
});

app.post("/api/insert", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const sqlInsert = "INSERT INTO todolist (title, description) VALUES (?,?)";

  db.query(sqlInsert, [title, description], (err, result) => {
    if (err) throw err;
  });

  const sqlSelect = "SELECT * FROM todolist";

  db.query(sqlSelect, (err, result) => {
    if (err) throw err;
    res.send(
      result.sort((a, b) => {
        return b.id - a.id;
      })
    );
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
