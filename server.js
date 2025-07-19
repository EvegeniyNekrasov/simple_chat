import express from "express";

const app = express();

const PORT = 6969;

app.get("/", (req, res) => {
  res.json({ message: "hola mundo" });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
