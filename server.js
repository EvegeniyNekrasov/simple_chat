import express from "express";
import { Server } from "socket.io";
import path from "node:path";
import http from "node:http";
import * as hb from "express-handlebars";

const dirname = import.meta.dirname;

const app = express();
app.engine(".hbs", hb.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(dirname, "views"));

app.use(express.static(path.join(dirname, "public")));

const PORT = 6969;

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
