# ARHorizon Tech Test – Samiksha Morya

##  Tech Stack
- **Frontend**: React + Vite + TailwindCSS + Three.js (@react-three/fiber, drei)
- **Backend**: Node.js + Express + MongoDB + Mongoose
- **Other**: Axios, DRACOLoader via CDN, Render, Vercel

---

##  Hosted Links

-  **Live App**: [https://assignment-gold-nine.vercel.app](https://assignment-gold-nine.vercel.app)
-  **GitHub Repo**: [https://github.com/Moryasamiksa05/Assignment](https://github.com/Moryasamiksa05/Assignment)

---

##  Setup Instructions (for local testing)

### 🔹 Clone the Repository

```bash
git clone https://github.com/Moryasamiksa05/Assignment.git
cd Assignment
```

### 🔹 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 🔹 Backend Setup

```bash
cd backend
npm install

# Create a .env file with the following:
MONGO_URI=your-mongodb-uri

npm start
```

---

##  Features

- "Simulate QR Scan" triggers:
  - Auto-rotating 3D AR model (GLTF with Draco compression)
  - Logs scan event to backend (with IP, user-agent, and time spent)
- Campaign Analytics display:
  - Total scans
  - Unique users
  - Average time spent per scan
- Responsive UI using TailwindCSS
- DRACO decompression via public CDN

---

##  What's Not Working
- QR scanning is simulated, not using device camera
- Time spent is randomized, not tracked in real-time
- No user authentication

---

##  Bonus
- Used DRACO compressed model + CDN to reduce load time
- Clean and modern UI design
- Fully integrated backend analytics via Express + MongoDB
