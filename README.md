# Raul Nikki Game Tracker: Bang Your Dead

A web application for tracking game tournaments, teams, and match results.

## Purpose

This application helps players and tournament organizers track:
- Team roster and operative status
- Match results and tournament standings
- Team performance analytics
- Enemy team matchups
- Mission progress

## Tech Stack

- **Framework**: Next.js 16.1 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Runtime**: React 19.2

## Getting Started

### Prerequisites

- Node.js (v20 or higher recommended)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

The page auto-updates as you edit files in the `app/` directory.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
dnd-game-tracker/
├── app/                  # Next.js app directory (routes & pages)
│   ├── page.tsx         # Home page
│   ├── layout.tsx       # Root layout
│   └── globals.css      # Global styles
├── public/              # Static assets
├── package.json         # Dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

## Features (MVP - Implemented)

- ✅ **Character Management** - Create, edit, and delete characters with class and level
- ✅ **Character Avatars** - Auto-generated fantasy avatars with ability to upload custom images (JPG, PNG, GIF, WebP)
- ✅ **Dashboard** - Campaign overview with party stats
- ✅ **HP Tracking** - Real-time health point management with visual progress bars
- ✅ **Combat Tracker** - Initiative system with sorted combatant list

## Features (Planned for Future)

### Core Combat Features
- Statblock Support - Store and display creature stats (AC, saves, skills, abilities)
- Encounter Builder - Create encounters by selecting creatures and setting quantities
- Monster Library - Access to SRD monsters and ability to import custom creatures
- Spell/Ability Tracking - Track spell slots, action economy, resistances/immunities
- Conditions System - Apply status effects (poisoned, prone, advantage, disadvantage, etc.)

### Party & NPC Management
- NPC Database - Store recurring NPCs with their stats
- Party Roster - Link to campaign parties, not just individual characters
- Shared Encounters - Join/share combat sessions with other players/DMs
- Campaign Progress Tracking - Session notes and story arcs

### Combat Enhancements
- Turn Timer - Track turn duration in combat
- Damage History - Log damage taken/healed per round
- Action Economy - Track bonus actions, reactions, legendary actions
- Sound Effects - Optional combat sounds for immersion
- Round Tracking - Visual round counter

### Quality of Life
- Dark Mode Toggle - Better for table use with reduced light
- Mobile Responsive - Optimized for tablets/phones at the table
- Keyboard Shortcuts - Fast combat management without mouse clicking
- Persistent Data - Save encounters and campaigns to local storage or cloud
- Dice Roller - Integrated dice rolling with modifiers
- Inventory System - Track party inventory and equipment
- Quest Log - Campaign quest tracking and notes

## Development Notes

- Edit `app/page.tsx` to modify the home page
- Add new routes by creating folders in the `app/` directory
- API routes can be created in `app/api/`

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
