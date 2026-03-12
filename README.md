<h1 align="center">Sahil Pahat</h1>

<p align="center">
React Native Developer • Mobile App Engineer • Cross-Platform Specialist
</p>

<p align="center">
<a href="https://pahatsahil.github.io/sahil-portfolio-test/">🌐 Live Portfolio</a> •
<a href="https://github.com/Pahatsahil">GitHub</a> •
<a href="https://linkedin.com/in/sahilpahat101019">LinkedIn</a>
</p>

---

# React Native Developer Portfolio

A modern **developer portfolio website** built using **React, TypeScript, TailwindCSS, and Firebase**.

This portfolio showcases my **React Native mobile development experience**, projects, and skills.  
All portfolio content is dynamically loaded from **Firebase Firestore**, allowing updates without redeploying the website.

The site is optimized for **performance, responsiveness, and GitHub Pages deployment**.

---

# Live Demo

https://pahatsahil.github.io/sahil-portfolio-test/

---

# Features

- Modern responsive UI (mobile, tablet, desktop)
- Dark theme developer portfolio
- Smooth animations with Framer Motion
- Firebase Firestore powered CMS
- Firebase Analytics integration
- Firebase App Check security
- EmailJS contact form
- Dynamic portfolio data (no hardcoded content)
- GitHub Pages deployment
- Type-safe React + TypeScript architecture

---

# Tech Stack

### Frontend

- React
- TypeScript
- Vite
- TailwindCSS
- Framer Motion

### Backend / Services

- Firebase Firestore
- Firebase Analytics
- Firebase App Check
- EmailJS

### Deployment

- GitHub Pages

---

# Portfolio Preview

![Portfolio Screenshot](./screenshots/portfolio.png)

---

# Project Architecture

src
├ components
│ ├ Hero
│ ├ About
│ ├ SkillsSection
│ ├ ExperienceSection
│ ├ ProjectsSection
│ ├ Contact
│ └ Footer
│
├ hooks
│ ├ useProfile
│ ├ useExperience
│ ├ useProjects
│ ├ useSkills
│ ├ useSocial
│ └ useContact
│
├ lib
│ └ firebase.ts
│
└ App.tsx

---

# Firestore Data Structure

The portfolio data is stored in **Firebase Firestore**.

Collections:

profile
experience
projects
skills
social
contact

Example structure:

profile
main

experience
doc1
doc2

projects
doc1
doc2

skills
doc1
doc2

---

# Getting Started

## Clone the repository

```bash
git clone https://github.com/Pahatsahil/sahil-portfolio-test.git
cd sahil-portfolio-test
```

## Install dependencies

```
pnpm install
```

## Setup Environment Variables

Create a .env file in the project root.

```
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=

VITE_FIREBASE_API_KEY=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_MEASUREMENT_ID=
```

## Run Development Server

```
pnpm dev
```

The app will start at:

```
http://localhost:5173
```

## Firebase Setup

1. Create a Firebase project

2. Enable Firestore Database

3. Create Firestore collections:

```
profile
experience
projects
skills
social
contact
```

## Firestore Security Rules

For a portfolio site (read-only public data):

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    match /{document=**} {
      allow read: if true;
      allow write: if false;
    }

  }
}
```

## Contact

Email:
sahilpahat12@gmail.com

LinkedIn:
https://linkedin.com/in/sahilpahat101019

GitHub:
https://github.com/Pahatsahil

## License

MIT License
