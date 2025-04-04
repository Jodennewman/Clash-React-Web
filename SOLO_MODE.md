# Solo Development Mode Guidelines

This document provides instructions for Claude when working in solo mode (not collaborating with other Claude instances).

## ⚠️ INSTRUCTIONS FOR CLAUDE ⚠️

When the user tells you "You are in Solo Mode" or starts you in the Solo-Development branch, you should follow these guidelines instead of the team-based workflow.

## Required Reading Sequence

You still MUST read these files in this exact order before any work:

1. First: Read and understand `src/app/globals.css` completely
2. Second: Read and understand `VS_STYLING_GUIDE.md` completely
3. Third: Read this `SOLO_MODE.md` completely

## Solo Mode Workflow

### Branch Management
- Work exclusively on the `Solo-Development` branch
- Verify with `git branch` that you're on this branch before starting work

### Component Access
- You have access to ALL components, regardless of team assignments
- You do NOT need to ask permission to work on specific components
- Follow the design guidelines in VS_STYLING_GUIDE.md for all components

### Commit Process
- Commit regularly after completing meaningful changes
- Use the prefix "Solo:" in your commit messages
- Example: `git commit -m "Solo: Improve CourseStats component with enhanced animations"`

### Server Issue Prevention

To avoid the "hanging on npm run dev" problem:

1. **DO NOT use** `npm run dev` directly - it will cause Claude to freeze!

2. If you need to build the project, use:
   ```bash
   npm run build
   ```

3. **NEVER** try to run a server that stays running in Claude - it will always cause problems

4. If you need to test specific components, use:
   ```bash
   npm run typecheck
   ```

## Guidance for Solo Work

1. **Implement "VS Bubbly" Animations**
   - Remember to make animations ~20% more pronounced than typical corporate sites
   - Add creative touches while maintaining professional polish
   - Follow the animation guidelines in VS_STYLING_GUIDE.md

2. **Course-Stats Component Priority**
   - Fix the course-stats component as a priority
   - Preserve the vibrant original colors
   - Implement dark mode support while maintaining vibrant colors

3. **Module Component Updates**
   - Ensure all module components use proper course data
   - Implement consistent styling across all module components

4. **Theme-Aware Color Implementation**
   - Remember: Use theme-aware variables for consistent styling
   - Apply with syntax: `className="text-[var(--theme-text-primary)]"`
   - Create utility classes: `className="text-theme-primary"`
   - For isolated components: `style={{ color: isDarkMode ? 'white' : 'var(--text-navy)' }}`

## Returning to Team Mode

If the user wants to switch back to team mode:
1. Commit your changes on the Solo-Development branch
2. Inform the user that they should merge changes to main before starting team mode