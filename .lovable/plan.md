

# Creative Lab - Tech Startup Website Plan

## Overview
A cutting-edge, futuristic website for Creative Lab, featuring a dark mode UI with glassmorphism effects, neon accents (blue, purple, cyan), smooth animations, and full backend functionality including an AI chatbot assistant and working contact form.

---

## Design System
- **Color Palette**: Dark backgrounds with neon blue (#00D4FF), purple (#8B5CF6), and cyan (#06B6D4) accents
- **UI Style**: Glassmorphism cards with frosted glass effects and subtle borders
- **Typography**: Clean, modern sans-serif fonts with gradient text effects
- **Animations**: Smooth scroll transitions, hover micro-interactions, and fade-in effects
- **Logo**: Futuristic placeholder logo with geometric/tech-inspired design

---

## Pages & Features

### 1. Home Page
- **3D Hero Section**: Rotating geometric shapes (spheres, cubes, toruses) with glow effects using Three.js/React Three Fiber
- **Tagline**: "Engineering Intelligence. Designing the Future." with animated gradient text
- **Services Preview**: Animated cards with hover effects highlighting core offerings
- **Tech Stack Carousel**: Smooth horizontal scroll (right to left) with icons for Java, Python, C++, .NET, Docker, AWS, Jenkins, CI/CD, Firebase, Kotlin, Flask, GitHub
- **Featured Projects**: 3-4 project cards with 3D tilt effect on hover
- **AI Chatbot**: Floating assistant button in bottom-right corner

### 2. Services Page
- Detailed service cards for each offering:
  - Software Development
  - AI Solutions & Design
  - Research & Development
  - Product Engineering
  - Business Intelligence Services
- Interactive hover effects and smooth reveal animations

### 3. Projects Page
- 3-4 featured case study cards with 3D tilt effect
- Project details including tech stack, challenge, and solution
- Glassmorphism design with hover interactions

### 4. About Page
- Company mission and vision with animated elements
- Team/culture section
- Timeline or milestones with scroll animations

### 5. Contact Page
- **Functional Contact Form** (stores submissions in database):
  - Name, Email, Subject, Message fields
  - Form validation with error handling
  - Success confirmation on submit
- Company contact details
- Optional: Map or location visual

---

## Interactive Features

### AI Chatbot Assistant
- Floating chat button with pulse animation
- Expandable chat window with glassmorphism styling
- Powered by Lovable AI (requires Lovable Cloud)
- Trained to answer questions about Creative Lab's services

### Animations & Micro-interactions
- Smooth page transitions between routes
- Scroll-triggered reveal animations
- Hover effects on all interactive elements
- 3D tilt on project cards
- Parallax effects where appropriate

---

## Technical Implementation

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- React Three Fiber for 3D hero elements
- Framer Motion for animations
- React Router for navigation

### Backend (Lovable Cloud)
- Supabase database for contact form submissions
- Edge function for AI chatbot integration
- Secure data handling

---

## Responsive Design
- Fully responsive across desktop, tablet, and mobile
- Adapted navigation (hamburger menu on mobile)
- Optimized 3D elements for performance on all devices

