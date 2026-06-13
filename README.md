# Epicure AI - AI Cooking & Task Planner

Epicure AI is a responsive, aesthetically premium client-side application designed for automated culinary planning, budget matching, and task orchestration under the 10 MB PromptWars limit.

## Live Links
- **Live Deployment:** [https://avanishkasar.github.io/warmup-challenge/](https://avanishkasar.github.io/warmup-challenge/)
- **GitHub Repository:** [https://github.com/avanishkasar/warmup-challenge](https://github.com/avanishkasar/warmup-challenge)

---

## 🛠️ Changes & Updates in Deployed Version

### 1. Dynamic Input Considerations & Heuristics
* **Smart Parsing:** Overhauled the planner to contextually extract diets (Keto/Veg/Vegan), cuisines (Indian/Italian/Asian), proteins, and specific dishes (e.g. *butter chicken, pizza, waffles*) from the user's text.
* **Cohesive Datasets:** Ingredients, milestones, and substitutions dynamically update based on the *actual recipes chosen* instead of static defaults.
* **Budget Scaling:** Prices and premium tags (Gourmet, Artisan) scale dynamically based on the spending cap.

### 2. Walkthrough Video & 10MB Limit Solution
* **Local MP4 Selector:** Added a "Load Local MP4" button that converts large files (like the 254MB walkthrough) to local Blob URLs for instant playback. This keeps the Git repository tiny (<10MB) and bypasses browser security restrictions (`Not allowed to load local resource`).
* **CORS-safe Fallback:** Integrated a lightweight public video source as a reliable default.

### 3. Cloud Deployment Support
* **Railway Ready:** Integrated `package.json` and a lightweight Express `server.js` for instant deployment.
* **Git Exclusions:** Added `.gitignore` to block `node_modules` and keep the push footprint clean.
