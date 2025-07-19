document.addEventListener("alpine:init", () => {
  Alpine.data("chatComponent", () => ({
    message: "",
    count: 0,
    online: 0,
    user: sessionStorage.getItem("username") || "",
    date: new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date()),
    socket: null,
    typing: false,
    typingTimeout: null,
    typingUsers: [],

    handleTyping() {
      if (!this.typing) {
        this.typing = true;
        this.socket.emit("typing", { user: this.user, typing: true });
      }
      clearTimeout(this.typingTimeout);
      this.typingTimeout = setTimeout(() => {
        this.typing = false;
        this.socket.emit("typing", { user: this.user, typing: false });
      }, 250);
    },

    init() {
      if (!this.user.trim()) {
        this.user = prompt("What is your name?") || "Incognito";
        sessionStorage.setItem("username", this.user);
      }

      this.socket = io({ auth: { user: this.user } });

      this.socket.on("typing", ({ user, typing }) => {
        if (typing) {
          if (!this.typingUsers.includes(user)) this.typingUsers.push(user);
        } else {
          this.typingUsers = this.typingUsers.filter((u) => u !== user);
        }
      });

      this.socket.on("online", (n) => {
        this.online = n;
      });

      this.socket.on("user-left", (user) => {
        this.typingUsers = this.typingUsers.filter((u) => u !== user);
      });

      this.socket.on("message", (html) => {
        this.$refs.messages.insertAdjacentHTML("beforeend", html);

        const messageEl = this.$refs.messages.lastElementChild;
        const avatarBox = messageEl.querySelector("#avatar");
        const username = messageEl
          .querySelector("span[data-element='user']")
          .textContent.trim();

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
