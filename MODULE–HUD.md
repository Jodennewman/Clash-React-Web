# Minimalist Course Viewer HUD Implementation

## Design Reference Screenshots
1. The menu at rest: [Screenshot 1](https://github.com/Jodennewman/nnbcghcu/blob/46f80891d38e242b8bd1a110b9129969a3cd8b38/Screenshot%202025-04-03%20at%2008.02.16.png)
2. The menu when a section is clicked (expands to reveal modules): [Screenshot 2](https://github.com/Jodennewman/nnbcghcu/blob/main/Screenshot%202025-04-03%20at%2008.02.23.png)
3. When a module is clicked, modal with info and submodules appears: [Screenshot 3](https://github.com/Jodennewman/nnbcghcu/blob/main/Screenshot%202025-04-03%20at%2008.02.29.png)

## Implementation Status

### Completed
- ✅ Base layout structure following specific pattern of "Bigsquare ||| column of 3 squares ||| column of 2 squares ||| Bigsquare ||| column of 2 squares ||| BigSquare"
- ✅ Proper spacing (horizontal: 1.5x width, vertical: 1x width) 
- ✅ Featured module indicators with red circles
- ✅ Responsive design for mobile and tablet with flex direction changes
- ✅ Section expansion animation with GSAP and proper easing
- ✅ Dynamic module grid size based on module count
- ✅ Special design for the last square (system) with three sections
- ✅ Theme-aware styling with proper CSS variables
- ✅ Hover animations with VS Bubbly effect

### Next Steps
1. **Module Modal Implementation**
   - Create the modal component for module content as specified in section 4 of requirements
   - Implement thumbnail, title, description, and bullet points
   - Add the submodule list with visual indicators

2. **Enhanced Animations**
   - Further refine expansion animations for smoother transitions
   - Add subtle animations for module cards within grid

3. **Integration Improvements**
   - Ensure proper data flow from course-data.ts to HUD component
   - Optimize performance for large module lists

4. **Polish & Refinement**
   - Add additional visual feedback for user interactions
   - Improve mobile experience for small screens
   - Add subtle background patterns for visual interest

## Design Specifications

### 1. Base Design Elements
- Background color: Warm cream (#FDF7E4)
- Section-block cards: Rounded squares (1rem radius) with subtle drop shadows
- Color coding: Each module type uses a different brand color from our palette
- Typography: Clean, neeue haas grotesk as per style guide, with clear hierarchy

### 2. minimalist layout:

Bigsquare(double scale) ||| column of 3 squares ||| column of 2 squares ||| Bigsquare(double scale) ||| column of 2 squares ||| BigSquare (or tri-square, or rotating 3d cube, or square with smoke coming out, or square with metal texture, or 3 squares with different robotic desingn features)

The last square design will have to connote the 3 parts of the 'product/turn key system' as it will be more an actual resource than a educational or training product

Gaps between squares are 
    horizontally:(normal square width)*1.5
    vertically: (normal square width)*1
    
when it comes to responsive design, there will have to be a dynamic approach to this. For tablet and mobile breakpoints this should be having the layout rotate 90 degrees – although to avoid rotation complications, this would be better expressed through flex direction changes (the outer l-r row becomes a t-b column && the tinner t-b column  becomes a l-r row)

Modules marked 'featured:true' in the database will have a small red circle (overflow: visible) centred on their top right corner, to mimic the notification ui viewers are likely to be familar with through mobile app notifications.


### 3. Expansion Animation
- On click, a section-block smoothly expands to reveal content.
- A square will expand depending on the amount of module-blocks it needs to display.
- For example, if it has 7 modules, then it will expand to the size of a 9x9 grid of squares – if it has 11 modules it will expand to the size of 4x4 squares, with squares inside scaled in a fashion that still fills the square, so some larger or more important modules can be expanded in width/height to fill the square (duration and 'featured modules' are both flagged in the database and can be used to determine this).
- Animation should use GSAP for smooth transitions (0.3-0.4s duration with a 'bounce back' type of ease).
- Expanded section-block should push other content away rather than overlay ( if there is chance of overlap)
- when a module-block is then clicked, A Modal will pop-up with the module content structure

### 4. Module Content Structure
- Module thumbnail at the top
- Module title overlaying the base of the thumbnail (18-24px, bold)
- Brief description (14-16px, regular weight)
- Three bulletpoints on what's inside
- List of the module's component sub-modules with small icons down the left hand menu.
- Visual indicators for "must-watch" or "founder essential" content
- on click of a submodule, some more details about it appear, possibly as a tooltip, possibly in another section of the modal. When a decision is made here, update this.

### 5. Interactive Elements
- Hover effects: Subtle scale (1.02-1.05x) and shadow increase (as per website design guide)
- Click anywhere on module card to expand/collapse
- Filter tabs at top to show specific module categories (not priority)

### Implementation Note
- Focus only on the rig in the center of the screen. All data will be based off of the course-data.json file. The interface must function in this minimalist way, with featured modules having a red circle indicator. There are two very big sections in the course: Core Theory and Core Mastery.
- it may be most wise to have the certain parts of the data from the course, especiallly those that effect layout, parsed first, and hardcoded into another temp database or .env file that has the variables for the layout in it. This would only then update once whenever course-data.json is changed. This would hopefully reduce page load times.

## Course Structure
Below is only for example and understanding, all actual data here must be provided through course-data.json parsing, or a fluid .env file as suggested above. Below is subject to change and does not contain the copy or the submodules, so should not be hardcoded.

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
