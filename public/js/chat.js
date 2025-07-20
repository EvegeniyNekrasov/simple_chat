document.addEventListener("alpine:init", () => {
  Alpine.data("chatComponent", () => ({
    message: "",
    count: 0,
    online: 0,
    user: "",
    socket: null,
    typing: false,
    typingTimeout: null,
    typingUsers: [],
    replyTo: null,
    highlighted: null,
    totalMessages: 0,

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
      this.user = prompt("What is your name?") || "Incognito";

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
        const url = `https://api.dicebear.com/9.x/fun-emoji/svg?seed=${encodeURIComponent(username)}&size=28`;
        fetch(url)
          .then((r) => r.text())
          .then((svg) => {
            avatarBox.outerHTML = svg;
          })
          .catch(console.error);
        const isSelf = username === this.user;
        messageEl.classList.add(
          ...(isSelf
            ? ["self-start", "text-left"]
            : ["self-end", "text-right"]),
        );
        this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight;
        this.$refs.messages.addEventListener("click", (e) => {
          const li = e.target.closest("li[data-id]");
          if (!li) return;

          if (li.dataset.user === this.user) return;

          this.highlight(li);

          this.replyTo = {
            id: li.dataset.id,
            user: li.dataset.user,
            text: li.dataset.text,
          };

          this.$refs.replyPreview.innerText = `${this.replyTo.user}: ${this.replyTo.text}`;
          this.$refs.replyPreview.hidden = false;
        });
      });
    },

    highlight(li) {
      if (this.highlighted) this.highlighted.classList.remove("bg-zinc-100");
      li.classList.add("bg-zinc-100");
      this.highlighted = li;
    },
    sendMessage() {
      const txt = this.message.trim();
      if (!txt) return;

      const msg = {
        id: Date.now().toString(),
        text: txt,
        user: this.user,
        date: new Intl.DateTimeFormat("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(new Date()),
        replyTo: this.replyTo,
      };

      this.socket.emit("message", msg);
      this.message = "";
      this.totalMessages++;

      this.replyTo = null;
      this.$refs.replyPreview.hidden = true;
      if (this.highlighted) this.highlighted.classList.remove("bg-zinc-100");
      this.highlighted = null;
    },
  }));
});
