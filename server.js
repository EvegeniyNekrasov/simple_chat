import express from "express";
import { Server } from "socket.io";
import path from "node:path";
import http from "node:http";
import * as hb from "express-handlebars";
import "dotenv/config";

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

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("message", ({ text, user }) => {
    app.render(
      "partials/message",
      { text, user, layout: false },
      (err, html) => {
        if (err) return console.error(err);
        io.emit("message", html);
      },
    );
  });
});

server.listen(PORT, () => console.log(`http://localhost:${PORT}`));
