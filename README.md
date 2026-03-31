<line_number> <h1 align="center">Sahil Pahat</h1>
<line_number>
<line_number> <p align="center">
<line_number> React Native Developer • Mobile App Engineer • Cross-Platform Specialist
<line_number> </p>
<line_number>
<line_number> <p align="center">
<line_number> <a href="https//pahatsahil.github.io/portfolio/">🌐 Live Portfolio</a> •
<line_number> <a href="https//github.com/Pahatsahil">GitHub</a> •
<line_number> <a href="https://linkedin.com/in/sahilpahat101019">LinkedIn</a>

</p>

---

# Modern React Native Portfolio

A high-performance, dynamic **developer portfolio and resume management system** built using **React, TypeScript, Vite, and Firebase**.

This project features a fully integrated **Admin Dashboard** with real-time Firestore synchronization, allowing for instant updates to projects, skills, and resume layouts without touching code.

## 🚀 Key Features

### 💻 Admin Panel (CMS)

- **Authenticated Access:** Secure login via Firebase Authentication.
- **Real-time Editing:** updates to Firestore broadcast instantly to the frontend.
- **Image Cloud Storage:** Integrated Firebase Storage for project thumbnails and profile photos.
- **Detailed Control:** Manage experience bullet points, project visibility, and skill groupings.

### 📄 Pro Resume Engine

- **Theme Switching:** Toggle between `Modern Dark` and `Classic (Deedy-inspired)` themes.
- **Layout Control:** Switch between 1-column and 2-column (sidebar) layouts dynamically.
- **PDF Optimized:** Custom CSS print engine ensures a perfect A4 PDF export with no page-break glitches.
- **Granular Visibility:** Independently hide specific projects or limit experience bullets for the resume view.

### 🎨 Design & Experience

- **Smooth Animations:** Powered by `framer-motion`.
- **Responsive:** Mobile-first layout optimized for all device sizes.
- **Rich Tech Stack:** Type-safe architecture using TypeScript and modular CSS.

---

## 🛠 Tech Stack

### Frontend & UI

- **Framework:** React 18 (Vite)
- **Styling:** TailwindCSS & Custom Modular CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React

### Backend & Infrastructure

- **Database:** Firebase Firestore (NoSQL)
- **Authentication:** Firebase Auth
- **File Storage:** Firebase Storage (Images/PDFs)
- **Deployment:** GitHub Pages + GitHub Actions (CI/CD)
- **Forms:** EmailJS

---

## 🏗 Project Architecture

```text
src
├ components      # UI components (Hero, About, Projects, etc.)
├ pages
│  ├ Portfolio    # Main Landing Page
│  ├ Resume       # Dynamic Resume Engine
│  └ admin        # Authenticated Admin Dashboard
├ hooks           # Real-time Firestore listeners
├ lib             # Firebase & Third-party configs
└ App.tsx         # Layout & Routing logic
```

---

## 📦 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/Pahatsahil/portfolio.git
cd portfolio
pnpm install
```

### 2. Environment Setup

Create a `.env` file in the root:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_MEASUREMENT_ID=...

VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

### 3. Run Locally

```bash
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173). Access Admin at `/admin`.

---

## 🔐 Firestore Security Rules

Since this project uses an Admin Panel with Authenticated writes, update your rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Publicly readable data
    match /{document=**} {
      allow read: if true;
      // Only authenticated owner can modify data
      allow write: if request.auth != null && request.auth.uid == "YOUR_ADMIN_UID";
    }
  }
}
```

---

## 📬 Contact

- **Email:** [sahilpahat12@gmail.com](mailto:sahilpahat12@gmail.com)
- **LinkedIn:** [Pahatsahil](https://linkedin.com/in/sahilpahat101019)
- **GitHub:** [@Pahatsahil](https://github.com/Pahatsahil)

## 📄 License

MIT License
