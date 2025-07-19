document.addEventListener("alpine:init", () => {
  Alpine.data("chatComponent", () => ({
    message: "",
    user: sessionStorage.getItem("username") || "",
    socket: null,

    init() {
      if (!this.user.trim()) {
        this.user = prompt("What is your name?") || "Incognito";
        sessionStorage.setItem("username", this.user);
      }

      this.socket = io();
      this.socket.on("message", (html) => {
        this.$refs.messages.insertAdjacentHTML("beforeend", html);
        this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight;
      });
    },
    sendMessage() {
      const txt = this.message.trim();
      if (!txt) return;

      this.socket.emit("message", { text: txt, user: this.user });
      this.message = "";
    },
  }));
});
