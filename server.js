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

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.render("index");
});

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  io.emit("online", io.of("/").sockets.size);
  socket.on("disconnect", () => {
    io.emit("online", io.of("/").sockets.size);
  });
  socket.on("message", ({ text, user, date }) => {
    app.render(
      "partials/message",
      { text, user, date, layout: false },
      (err, html) => {
        if (err) return console.error(err);
        io.emit("message", html);
      },
    );
  });
});

server.listen(PORT, () => console.log(`http://localhost:${PORT}`));
