# PlantTalk AI Website

A modern, beautiful website for **PlantTalk AI** — an AI plant company focused on building environmental models for monitoring and helping with plant growth.

## 🌱 About PlantTalk AI

**Vision:** Use AI to help people better interact with plants through emotional value and intelligent growth modeling.

**Hero Message:** *"Horticulture is the only remaining garden of eden in this AI era"*

## 🛠️ Our Products

### EZplants
AI-powered plant diagnosis platform with real-time disease detection and live video consultation.
- 99.2% diagnosis accuracy
- 180+ plant species supported
- 50M+ plants analyzed

### PlantTalk
Revolutionary AI that creates unique personalities for each plant, enabling genuine conversations.
- Natural language conversations
- Emotional expressions
- Plant social network

### PlantEmoji
Smart sensor that monitors plant environment and communicates status through expressive emojis.
- 4-in-1 sensors (temperature, humidity, light, soil moisture)
- Real-time emoji feedback
- 6-month battery life

### Plart
AI art studio that transforms plant photos into stunning artwork in 50+ styles.
- Watercolor, oil painting, anime, and more
- 4K resolution output
- Print-ready exports

### PlantScape
Nature experience platform that generates ambient soundscapes from visual scenes.
- AI music generation
- Scene recognition
- Immersive spatial audio

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Font:** Satoshi

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── vision/               # Vision & mission page
│   ├── about/                # About the company
│   ├── solutions/
│   │   ├── page.tsx          # All products overview
│   │   └── [category]/       # Individual product pages
│   ├── stories/              # Blog & updates
│   └── contact/              # Contact form
└── components/
    ├── Navigation.tsx        # Header with mega menu
    ├── Hero.tsx              # Hero section
    ├── Solutions.tsx         # Products showcase
    ├── Projects.tsx          # Success stories
    ├── About.tsx             # Vision section
    ├── Stories.tsx           # Blog section
    ├── Newsletter.tsx        # Email signup
    └── Footer.tsx            # Site footer
```

## 🎨 Design System

### Colors
- **Background:** `#0a0a0a` (near black)
- **Accent:** `#4ade80` (vibrant green)
- **Accent Dark:** `#22c55e` (darker green)
- **Card:** `#141414` (dark gray)
- **Text:** `#fafafa` (off-white)

### Typography
- **Font:** Satoshi (from Fontshare)
- **Headings:** Bold, tight tracking
- **Body:** Regular weight, relaxed leading

## 🏃 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run development server**
   ```bash
   npm run dev
   ```

3. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📄 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, products, success stories, vision |
| Vision | `/vision` | Mission, values, timeline |
| About | `/about` | Team, story, values |
| Solutions | `/solutions` | All 5 products overview |
| EZplants | `/solutions/ezplants` | AI plant diagnosis |
| PlantTalk | `/solutions/planttalk` | Plant conversations |
| PlantEmoji | `/solutions/plantemoji` | Emoji sensors |
| Plart | `/solutions/plart` | AI art studio |
| PlantScape | `/solutions/plantscape` | Nature soundscapes |
| Stories | `/stories` | Blog & updates |
| Contact | `/contact` | Contact form |

## 🌿 Philosophy

> "When plants can speak, and humans can listen, we rediscover our place in the garden."

PlantTalk AI believes technology should deepen our connection to nature, not replace it. Every product is designed to amplify the emotional bond between humans and plants.

---

Built with 🌱 by the PlantTalk AI team
