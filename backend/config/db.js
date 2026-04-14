import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "church_db",
});

db.connect((err) => {
  if (err) {
    console.error("Erreur connexion MySQL:", err);
  } else {
    console.log("MySQL connecté ✅");
  }
});

export default db;
