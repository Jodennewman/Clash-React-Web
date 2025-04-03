# Minimalist Course Viewer HUD Implementation

## Design Reference Screenshots
1. The menu at rest: [Screenshot 1](https://github.com/Jodennewman/nnbcghcu/blob/46f80891d38e242b8bd1a110b9129969a3cd8b38/Screenshot%202025-04-03%20at%2008.02.16.png)
2. The menu when a section is clicked (expands to reveal modules): [Screenshot 2](https://github.com/Jodennewman/nnbcghcu/blob/main/Screenshot%202025-04-03%20at%2008.02.23.png)
3. When a module is clicked, modal with info and submodules appears: [Screenshot 3](https://github.com/Jodennewman/nnbcghcu/blob/main/Screenshot%202025-04-03%20at%2008.02.29.png)

## Design Specifications

### 1. Base Design Elements
- Background color: Warm cream (#FDF7E4)
- Module cards: Rounded rectangles (12px radius) with subtle drop shadows
- Color coding: Each module type uses a different brand color from our palette
- Typography: Clean, sans-serif with clear hierarchy

### 2. Module Grid Layout
- Start with a grid of collapsed modules (colorful squares/rectangles)
- Varying sizes to create visual hierarchy (main sections larger than sub-modules)
- Comfortable spacing between elements (20-30px minimum)
- Responsive design that maintains layout integrity across screen sizes

### 3. Expansion Animation
- On click, a module smoothly expands to reveal content
- Animation should use GSAP for smooth transitions (0.3-0.4s duration)
- Expanded module should push other content away rather than overlay
- Add subtle fade-in for text content inside expanded modules

### 4. Module Content Structure
- Module title at top (18-24px, bold)
- Brief description (14-16px, regular weight)
- List of sub-modules or lessons with small icons
- Visual indicators for "must-watch" or "founder essential" content

### 5. Interactive Elements
- Hover effects: Subtle scale (1.02-1.05x) and shadow increase
- Click anywhere on module card to expand/collapse
- Progress indicators for completed modules (small circular progress)
- Filter tabs at top to show specific module categories

### Implementation Note
Focus only on the rig in the center of the screen. All data will be based off of the course-data.json file. The interface must function in this minimalist way, with featured modules having a red circle indicator. There are two very big sections in the course: Core Theory and Core Mastery.

## Course Structure
Each module will be split into 2-6 submodules.

### Section 1: Basic Theory
1. Intro: Big picture on short form (Founder specific)
2. Algorithmic Understanding
3. 3 cardinal sins and cardinal virtues
4. Starting an account for success
5. Posting and Scheduling
6. Helpful Formats 101
7. Strategy: Pillars, Topics and Buckets
8. Hooking fundamentals
9. Scriptwriting 101
10. The Script of Sisyphus (boulder theory)
11. Visual Framing
12. Engagement Metrics 101
13. Platform Differences

### Upskiller 📝: The super authentic Researcher Writer
1. Research Basics
2. Research Advanced
3. Repurposing Normal
4. Repurposing LinkedIn

### Upskiller 🎬: The Shorts Ready Videographer
1. Solo Phone Shooter
2. Videography Pro
3. Camera Confidence
4. Setting up a Studio Space
5. Producing a Podcast for Clips

### Upskiller 🎞️: Vertical Video Editors
1. Editing Basics
2. Editing Advanced
3. Editing Team
4. Podcast Clipping

### Section 2: PR and Authority
1. Authority and Brand Holism through Short for Content
2. PR and Positioning
3. Handling a Comment Section

### Section 3: Advanced Theory
1. Complex Formats and Remixing
2. Data Led Iteration
3. Nuanced Hook: Morally Dubious
4. Script Mastery
5. Advanced Engagement Metrics
6. The Importance of Lo-Fi and Founder Paradox
7. Serialisation
8. Emotional Positioning

### Section 4: Delegation
1. Intro to delegation
2. First Bottle Necks (setup)
3. Managing a creative team (filling in the roles)
4. Videography Delegated
5. How to make the content run itself
6. Creating a team workflow

### Section 5: Monetisation
1. Monetisation Basics (setting up platform)
2. Monetisation Pro
3. Monetisation

### Section 6: Conversion
1. Taking people off platform (intro to conversions)
2. Lead Magnets
3. YouTube
4. Podcasting
5. Newsletter
6. How it builds your business
7. Speaking Engagements

### System 💾: The Quantity and Quality Notion system
* Manage hundreds of scripts and videos a month
* Have a super slick team
* With Custom Code

### System 🏭: The Home-Delivered Engine Room
* Video Ingester app
* Premiere Pro extension that lays out footage

### System 🖥️: The Viral Video OS
* Premiere pro assets
* Time saving plugins for editors
* Presets, think less!