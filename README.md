# 🌐 Simple chat

A minimal real‑time chat skeleton built with **Express.js**, **HTMX**, **Alpine.js**, **Handlebars**, and **Tailwind CSS**.  The initial release focuses on a clean project structure you can fork or extend for side projects, coding interviews, or learning modern progressive‑enhancement workflows.

<div align="center">
  <img alt="Project screenshot" src="docs/todo..." width="600"/>
</div>

> **Status:** early prototype – core plumbing is in place, but functionality is intentionally lean to encourage experimentation.

---

## ✨ Features

| Area       | Highlights                                                                              |
| ---------- | --------------------------------------------------------------------------------------- |
| Server     | ⚡ Express 5  |
| Templating | 🔧 Handlebars partials & layouts • HTMX request helpers                                 |
| Front‑End  | ✨ Alpine.js reactive snippets • HTMX progressive enhancement • Tailwind utility styling |
| Tooling    | 🔄 Concurrent dev scripts (server + Tailwind CLI) • ESLint/Prettier (optional)          |

---

## 📚 Tech Stack

* **Node.js ≥ 20** / **Express 5** – lightweight HTTP & API layer
* **HTMX 2.0.6** – server‑driven interactivity (AJAX, SSE, websockets, etc.)
* **Alpine.js v3** – sprinkle‑in reactivity for client‑only micro interactions
* **Handlebars v8** – semantic HTML templating with layouts & partials
* **Tailwind CSS v4** – utility‑first styling compiled at build time

---

## 🚀 Quick Start

### 1. Prerequisites

| Tool        | Version         |
| ----------- | --------------- |
| **Node.js** | 20 LTS or newer |
| **npm**     | 10.x            |
| **Git**     | any             |

### 2. Clone & Install

```bash
# Fork / clone
$ git clone https://github.com/EvegeniyNekrasov/simple_chat.git && cd simple_chat

# Install dependencies
$ npm install
```

### 3. Run in dev mode

```bash
# concurrently: nodemon (server) + tailwind --watch
$ npm run dev

# Visit ➜ http://localhost:6969
```

## 🗂️ Project Layout

```
.
├── public/
│   └── js/
│       └── chat.js
├── views/
│   ├── layouts/
│   │   └── main.hbs
│   ├── partials/
│   │   └── message.hbs
│   └── index.hbs
├── server.js
├── package.json
└── README.md
```

---

## 🔧 Configuration

Create a local `.env` (copied from `.env.example`).

| Variable    | Default       | Description                 |
| ----------- | ------------- | --------------------------- |
| `PORT`      | `6969`        | HTTP port for Express       |

The config helper surfaces these vars via `process.env` and provides sane fallbacks.

---

## 📜 Available npm Scripts

| Script      | Purpose                                                                  |
| ----------- | ------------------------------------------------------------------------ |
| `dev`       | run server & Tailwind CLI in watch mode (recommended during development) |
| `start`     | start compiled server (NODE\_ENV=production)                             |
| `build:css` | build & purge Tailwind to `public/css/tailwind.min.css`                  |
| `lint`      | run ESLint & Prettier checks                                             |
| `test`      | placeholder for upcoming Vitest suite                                    |

---

## 🗺️ Roadmap

* [ ] Switch to **websockets** for real‑time push
* [ ] Add **authentication** (passkeys or magic links)
* [ ] Integrate **Prisma** & SQLite/Postgres for persistence
* [ ] Unit/integration **tests** with Vitest & Supertest
* [ ] One‑click deploy buttons (Render & Fly.io)

Feel free to submit feature requests via GitHub issues.

---

## 🤝 Contributing

Contributions are welcome!  Please:

1. **Fork** the repo & create your branch: `git checkout -b feature/my-awesome-feature`
2. **Commit** changes with conventional commits: `feat: add X`
3. **Open** a Pull Request – describe what you changed & why

We follow the [Contributor Covenant](https://www.contributor-covenant.org) code of conduct.

---

## 🪪 License

Distributed under the **MIT License**.  See `LICENSE` for more information.

---

## 🙏 Acknowledgements

* [HTMX](https://htmx.org) • [Alpine.js](https://alpinejs.dev) • [Tailwind CSS](https://tailwindcss.com)
* [Handlebars](https://handlebarsjs.com) templating engine
* [Icons8](https://icons8.com) for placeholder images

---

> Built with ♥︎ by **Evgeniy Nekrasov**
