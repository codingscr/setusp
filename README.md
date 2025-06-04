# Zomato Clone

A responsive, front-end clone of the popular food-tech platform **Zomato** built entirely with **HTML, CSS and vanilla JavaScript**.  
The goal is to imitate Zomato’s core discovery experience—searching restaurants, browsing cuisines, viewing offers—while remaining framework-free and easy to extend.

---

## ✨ Features

| Category | Details |
|----------|---------|
| Restaurant Discovery | • Real-time text search in header and hero section<br>• Sort by popularity, rating, or cost<br>• Quick filters for cuisine, rating ≥ 4.0, cost level |
| Listing UI | • Responsive card grid with offer & ETA badges<br>• Hover zoom and scroll-in animations |
| Cuisine Carousel | Draggable horizontal slider with selectable cuisine pills |
| “Load More” | Button clones/loads additional restaurant cards with animation |
| App Promo | Email/phone form with validation & toast notifications, store badges |
| Location | “Detect” button using Geolocation API (graceful fallback) |
| Toast / Alerts | Lightweight toast system for success & error messages |
| Responsive Design | Mobile-first breakpoints (≤ 992 px, 768 px, 576 px) |
| Vanilla JS | No dependencies; everything written in plain ES6 |

---

## 🛠 Technologies Used

- **HTML5** – semantic markup  
- **CSS3** – flexbox, grid, custom properties, keyframe animations  
- **JavaScript (ES6)** – DOM APIs, modules, Geolocation, form validation  
- **Font Awesome 6** – iconography  
- **Google Fonts (Poppins)** – primary typeface  

---

## 🚀 Installation & Setup

1. **Clone the repo**

```bash
git clone https://github.com/your-username/zomato-clone.git
cd zomato-clone
```

2. **Open directly in a browser**

No build step is required. Simply open `index.html` in your favourite browser or run a lightweight server:

```bash
# Python 3.x
python -m http.server 8000
# then visit http://localhost:8000
```

3. **Enjoy the UI**

Search, filter, resize the window, and explore the interactions.

---

## 📂 Project Structure

```
zomato-clone/
├── index.html
├── style.css
├── script.js
├── images/
│   ├── hero-bg.jpg
│   ├── zomato-logo.png
│   ├── app-mockup.png
│   ├── google-play.png
│   ├── app-store.png
│   ├── cuisines/
│   │   ├── pizza.jpg
│   │   └── ...
│   └── restaurants/
│       ├── restaurant1.jpg
│       └── ...
└── README.md
```

> All assets live in the `images/` directory, organised by purpose to keep things tidy.

---

## 🖼️ Adding Images

1. **Cuisines**  
   Place 80 × 80 px (or larger square) images inside `images/cuisines/`.  
   Name them descriptively, e.g. `sushi.jpg`, `italian.jpg`.

2. **Restaurants**  
   Hero/thumbnail photos (≥ 600 × 400 px recommended) go into `images/restaurants/` with filenames like `restaurant7.jpg`.

3. **Brand / UI assets**  
   Logos, store badges, hero backgrounds etc. reside directly under `images/`.

4. **Reference inside HTML/CSS**  
   Paths are relative to `index.html`, e.g.

```html
<img src="images/restaurants/restaurant7.jpg" alt="New Restaurant">
```

No further configuration is needed—the clone will automatically pick up new images.

---

## 🚧 Future Enhancements

- Restaurant **detail page** with menu, gallery & reviews  
- **Cart & checkout** flow with localStorage persistence  
- Integration with a **mock JSON API** for real data  
- **Dark mode** toggle  
- **Service Worker** for offline access & caching  
- Unit tests with **Jest** / **Vitest**

Contributions & ideas are welcome! Feel free to open issues or pull requests.

---

## 📄 License

This project is licensed under the **MIT License**.  
You’re free to use, modify, and distribute the code, but attribution is appreciated.

---

Built with ❤️ to practice front-end skills and pay tribute to Zomato’s elegant UX.
