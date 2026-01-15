# Architecture Overview

## Purpose
A single-page web application for tracking Warhammer 40K/Kill Team game tournaments. Manages team operatives, enemy teams, combat encounters, and match statistics.

## Tech Stack
- **Next.js 16.1** - React framework with App Router
- **React 19.2** - UI library with hooks for state management
- **TypeScript 5** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first styling
- **Geist Fonts** - Google Fonts (Sans & Mono)

## File Structure

### Core Application Files
```
app/
├── layout.tsx          # Root layout, metadata, font configuration
├── page.tsx            # Main application logic (all features)
└── globals.css         # Tailwind imports and CSS variables

Configuration Files
├── package.json        # Dependencies and npm scripts
├── tsconfig.json       # TypeScript compiler settings
├── next.config.ts      # Next.js configuration
├── postcss.config.mjs  # PostCSS for Tailwind processing
├── eslint.config.mjs   # ESLint rules
└── .gitignore          # Git exclusions

Static Assets
└── public/             # Images and static files
```

## Application Flow

### 1. Application Bootstrap
- `layout.tsx` loads Google Fonts and sets page metadata
- Renders the root HTML structure with font CSS variables
- Wraps children with consistent styling (`antialiased`)
- `globals.css` applies Tailwind and dark mode preferences

### 2. Main Application (`page.tsx`)
**Single client-side component** managing all state and UI logic.

#### State Management (React hooks)
```typescript
- characters[]       # Team operatives roster
- monsters[]         # Enemy team library
- combatants[]       # Active combat participants
- activeTab          # Current view (dashboard/characters/combat/monsters)
- Form inputs        # New character creation fields
```

#### Core Data Types
- **Character**: Operative with HP, AC, class, level, conditions, custom image
- **Monster**: Enemy team with type, AC, HP, damage, abilities

### 3. User Interaction Flow

#### Tab Navigation
User clicks tab button → `setActiveTab()` → Conditional rendering shows selected view

#### Dashboard Tab
- Displays aggregated stats (team size, avg HP%, active matches)
- Shows campaign/mission information
- Read-only overview

#### Characters Tab
**Character Creation:**
1. User fills form (name, class, level)
2. Clicks "Add Operative"
3. `addCharacter()` creates new character with defaults
4. Character added to state array

**Character Management:**
- HP updates: Input changes → `updateCharacterHp()` → Clamped to 0-maxHp
- Image upload: File selected → FileReader converts to base64 → Stored in character state
- Conditions: Toggle button → `toggleCondition()` → Add/remove from conditions array
- Delete: Click X → `deleteCharacter()` → Filter out by ID

**Auto-generated Avatars:**
- If no custom image, uses DiceBear API with character name as seed
- Generates consistent fantasy avatars

#### Combat Tab
**Combat Tracker:**
- Displays `sortedCombatants` (sorted by AC, highest first)
- First combatant highlighted as "Active Turn"
- HP adjustment: +1/-1 buttons → Update combatant HP in state
- Shows active conditions per combatant

**Sorting Logic:**
```javascript
sortedCombatants = [...combatants].sort((a, b) => (b.ac || 0) - (a.ac || 0))
```
*Note: Uses AC instead of traditional initiative rolls*

#### Monsters Tab
**Enemy Teams:**
- Grid display of predefined monster stat blocks
- "Add to Match" → `addMonsterToCombat()` → Creates new combatant from monster template
- Converts Monster to Character format for combat tracker

### 4. Data Flow Pattern

```
User Action → Event Handler → State Update (useState) → React Re-render → UI Update
```

**Example: HP Change**
1. User types in HP input field
2. `onChange` triggers `updateCharacterHp(id, newValue)`
3. Function maps through characters, updates matching ID
4. `setCharacters()` updates state
5. React re-renders character card with new HP bar width

### 5. State Isolation
- **No persistence**: All data in-memory only (resets on page refresh)
- **No cross-tab sync**: Characters and combatants are separate state arrays
- **Initial data**: Hard-coded default characters and monsters

## Key Features

### Character Management
- CRUD operations for operatives
- Custom image upload (JPG, PNG, GIF, WebP) via base64 encoding
- HP tracking with visual progress bars
- Conditions system (7 conditions: Poisoned, Prone, etc.)

### Combat Tracker
- Initiative-based combat (sorted by AC)
- Real-time HP adjustments
- Condition display
- Active turn highlighting

### Monster Library
- Pre-defined enemy teams
- One-click add to combat
- Stat blocks with abilities

## Styling Approach

**Color Palette:**
- Dark theme: `slate-900`, `slate-800`, `slate-700` backgrounds
- Accent: `amber-400`, `amber-500` for highlights
- Status: `green-500` (HP bars), `red-400` (damage), `purple-600` (conditions)

**Layout:**
- Responsive grid with Tailwind breakpoints (`md:`, `lg:`)
- Max-width container (`max-w-7xl`)
- Card-based UI with rounded corners and borders

## Current Limitations

1. **No Data Persistence**: Page refresh loses all data
2. **Hardcoded Initial Data**: Characters and monsters baked into component
3. **State Isolation**: Combat HP changes don't sync back to character roster
4. **AC-based Initiative**: Not traditional D&D initiative (d20 + DEX)
5. **No Backend**: Fully client-side application

## Potential Extensions

- LocalStorage integration for persistence
- Real initiative system with dice rolls
- Sync combat HP with character roster
- Database backend for multi-device access
- Additional tabs (spell tracking, inventory, quest log)
