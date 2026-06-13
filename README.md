# Epicure AI - Quantum Gastronomy & Task Orchestrator

Epicure AI is a high-performance, responsive, and aesthetically striking web application designed for automated culinary planning and task scheduling. It operates as a fully client-side system tailored to fit strictly under the **10 MB limit** for PromptWars while providing advanced, simulated real-time features.

## Live Deployed Links
- **GitHub Pages Preview:** [https://avanishkasar.github.io/warmup-challenge/](https://avanishkasar.github.io/warmup-challenge/)
- **Repository URL:** [https://github.com/avanishkasar/warmup-challenge](https://github.com/avanishkasar/warmup-challenge)

---

## 🚀 Key Updates & Feature Overhaul

### 1. Robust Dynamic Heuristics & Input Considerations
- **Problem:** Previous versions returned static placeholder menu cards that ignored the user's specific culinary inputs (e.g. searching for chicken but getting fish/tofu).
- **Solution:** Overhauled the NLP planner engine in `app.js`. It now parses:
  - **Specific Dishes:** Instantly matches keywords like `butter chicken`, `pizza`, `waffles`, `burger`, `tacos`, `ramen`, etc., and renders tailor-made recipe cards.
  - **Cuisines:** Supports `Indian`, `Italian`, `Asian`/`Chinese`/`Japanese`.
  - **Dietary Constraints:** Actively filters and structures schedules for `Keto`, `Vegan`, `Vegetarian`, and `Low-Carb`.
  - **Ingredient Lists & Tasks:** Dynamically extracts raw ingredient checklists and matches prep milestones to the *actual generated recipes*.
  - **Budget Scap Adjustments:** Dynamically scales costs and upgrades tags (e.g. *Gourmet*, *Artisan*) based on your INR spending cap.

### 2. Local Walkthrough Video Loading (10 MB Repository Limit Fix)
- **Problem:** The walkthrough video is **254 MB**, exceeding GitHub's 10 MB limit. Referencing the local file path `C:/...` failed due to browser security restrictions (`Not allowed to load local resource`).
- **Solution:** Added a **"Load Local MP4"** file input under the Sim Console. By choosing the local video file in your browser, it plays instantly using a secure browser-generated Blob Object URL (`URL.createObjectURL(file)`).
- **Fallback:** Integrated a lightweight, ORB-compliant public testing video loop so the walkthrough runs out-of-the-box for other evaluators.

### 3. Railway Environment Readiness
- Added `package.json` and `server.js` (Express-based router) to enable instant deployment on **Railway.app** or similar Node.js cloud environments.

---

## 🛠️ Tech Stack & Architecture
- **Frontend:** Vanilla HTML5, CSS3 (Custom Black & White dark mode, grid overlays, glassmorphic card design), and Vanilla JavaScript.
- **Icons & Typography:** Lucide Icons (CDN) and Google Fonts (`Syne`, `Syncopate`).
- **Server:** Node.js + Express (serving static assets).
- **Simulations:** Sandbox Razorpay payment gateway simulation & live telemetry tracking console.

---

## 📖 Deployment Instructions

### How to Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/avanishkasar/warmup-challenge.git
   cd warmup-challenge
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Access the app at `http://localhost:8080`.

### Deploying to Railway
1. Push this repository to GitHub.
2. Link your repository in the **Railway.app** dashboard.
3. Railway will automatically detect the `package.json` file and run `npm start` to deploy the application instantly!
