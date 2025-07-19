document.addEventListener("alpine:init", () => {
  Alpine.data("chatComponent", () => ({
    message: "",
    count: 0,
    user: sessionStorage.getItem("username") || "",
    date: new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date()),
    socket: null,

    init() {
      if (!this.user.trim()) {
        this.user = prompt("What is your name?") || "Incognito";
        sessionStorage.setItem("username", this.user);
      }

      this.socket = io();

      this.socket.on("online", (n) => {
        this.online = n;
      });
      this.socket.on("message", (html) => {
        this.$refs.messages.insertAdjacentHTML("beforeend", html);

        const messageEl = this.$refs.messages.lastElementChild;
        const avatarBox = messageEl.querySelector("#avatar");
        const username = messageEl.querySelector("strong").textContent.trim();

        const url = `https://api.dicebear.com/9.x/bottts/svg?seed=${encodeURIComponent(username)}&size=28`;
        fetch(url)
          .then((r) => r.text())
          .then((svg) => {
            avatarBox.outerHTML = svg;
          })
          .catch(console.error);
        this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight;
      });
    },
    sendMessage() {
      const txt = this.message.trim();
      if (!txt) return;

      this.socket.emit("message", {
        text: txt,
        user: this.user,
        date: this.date,
      });
      this.message = "";
    },
  }));
});
