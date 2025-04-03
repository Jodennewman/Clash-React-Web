# CLAUDE.md

This file guides Claude Code when working with this repository. Follow these instructions PRECISELY.

## Initial Requirements

- Before providing advice or making changes, state: "I have read and will fully comply with CLAUDE.md."
- First question: "Am I working in Solo Mode or Team Mode (if Team Mode, which team A or B)?"
- Based on response, work ONLY on components assigned to your mode/team

## Mandatory Reading Sequence
1. Read this CLAUDE.md completely
2. Read `src/app/globals.css` completely 
3. Read `VS_STYLING_GUIDE.md` completely
4. If in Team Mode, read `TEAM_STRUCTURE.md` completely

## ⚠️ CRITICAL: TEXT COLOR IMPLEMENTATION FOR DARK MODE ⚠️

### THE #1 MOST IMPORTANT RULE

**❌ NEVER EVER DO THIS - IT WILL BREAK:**
```jsx
<p className="text-[var(--text-navy)]">This will NOT work in dark mode</p>
```

**✅ ALWAYS DO THIS INSTEAD:**
```jsx
<p style={{ color: 'var(--text-navy)' }} className="dark:text-white">This works correctly</p>
```

### The ONLY Correct Ways to Implement Text Colors

**PATTERN #1: Inline style + dark class (PREFERRED)**
```jsx
<p style={{ color: 'var(--text-navy)' }} className="dark:text-white">
  Text content
</p>

<h2 style={{ color: 'var(--text-navy)' }} className="dark:text-white">
  Heading content
</h2>
```

**PATTERN #2: Direct color classes**
```jsx
<p className="text-[#122E3B] dark:text-white">
  Text content
</p>
```

### For Background Elements (This Works Correctly):

```jsx
<div className="bg-[var(--bg-cream)] dark:bg-[var(--bg-navy)]">
  Content here
</div>
```

### Always Test Both Modes

After ANY styling change:
1. Test in light mode first
2. Then test in dark mode by adding `dark` class to HTML element
3. Verify text is visible in BOTH modes

## Critical Do's and Don'ts

### DO NOT:
- Use `text-[var(--var)]` for text colors - THIS WILL BREAK DARK MODE
- Change grid layouts (grid-cols-*) under any circumstances
- Replace CSS variables with hardcoded hex values (except for text colors)
- Implement quick fixes - identify and fix root causes
- Change responsive behavior
- Make assumptions about the codebase without verification
- Deviate from stated plans without explanation

### DO:
- Use inline styles for text colors: `style={{ color: 'var(--text-navy)' }}`
- Always add dark mode classes for text: `className="dark:text-white"`
- Examine component structure before making changes
- Create a written plan and get approval before proceeding
- Make minimal, targeted changes for specific issues
- Test in both light and dark mode
- Verify changes don't affect layout, responsiveness, or color scheme

## Current Priority Issues
1. Fix course-stats.tsx component styling with preserved vibrant colors
2. Fix components that don't switch properly between light/dark mode
3. Convert remaining hardcoded hex values to CSS variables

## Required Git Workflow

### Commit ALL Changes
- ALWAYS use `git add .` to stage ALL modified files
- NEVER selectively commit only some changes
- Files modified together should be committed together

### Commit Procedure
1. Run `git status` to check modified files
2. Add ALL changes: `git add .`
3. Verify all changes are staged: `git status`
4. Commit with prefix and description:
   - Solo Mode: `git commit -m "Solo: [description]"`
   - Team A: `git commit -m "A: [description]"`
   - Team B: `git commit -m "B: [description]"`

### Commit Frequency
- After each significant component change
- At least once per hour of work
- Immediately after fixing bugs

## Special Components
- CourseStats component must preserve its unique vibrant colors
- Convert any hex colors to OKLCH format for compatibility
- Add well-named classes with specific colors using OKLCH
- Document exceptions in code comments

## "VS Bubbly" Animation Style
- Animations should be 20% more pronounced than typical corporate sites
- Use cubic-bezier(0.34, 1.56, 0.64, 1) for springy hover effects
- Combine transform properties (translateY + scale) for richer interactions
- Example hover: `hover:translate-y-[-4px] hover:scale-[1.02]`

## Development Commands
- DO NOT use `npm run dev` directly - it causes freezing!
- Use `npm run build` for building
- Use `npm run typecheck` for testing components

## Most Important Rule
After stating your plan, NEVER deviate from it without permission. It's better to do nothing than to implement something contrary to your stated plan.

## Example Component with Proper Dark Mode

```jsx
function ExampleCard() {
  return (
    <div className="bg-white dark:bg-[var(--card-bg-navy)] p-6 rounded-lg shadow-md">
      <h3 
        style={{ color: 'var(--text-navy)' }} 
        className="dark:text-white text-xl mb-2"
      >
        Card Title
      </h3>
      
      <p 
        style={{ color: 'var(--text-navy)' }} 
        className="dark:text-white/70 mb-4"
      >
        This card has proper dark mode implementation.
      </p>
      
      <button 
        className="bg-[var(--primary-orange)] dark:bg-[var(--primary-orange-hover)] 
                 text-white px-4 py-2 rounded-full 
                 transition-all duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]
                 hover:translate-y-[-3px] hover:scale-[1.03] hover:shadow-lg"
      >
        Learn More
      </button>
    </div>
  )
}
```

## Common Pitfalls to Avoid

### Dark Mode Implementation
❌ **WRONG**:
```jsx
<div style={{ backgroundColor: 'var(--bg-cream)' }}>Won't switch in dark mode</div>
<p className="text-[var(--text-navy)]">Text will disappear in dark mode</p>
```

✅ **CORRECT**:
```jsx
<div className="bg-[var(--bg-cream)] dark:bg-[var(--bg-navy)]">Works correctly</div>
<p style={{ color: 'var(--text-navy)' }} className="dark:text-white">Text visible in both modes</p>
```

### Color Balance
❌ **WRONG**: Too many accent colors in one section
✅ **CORRECT**: Limit orange accents to ~20% of any section

## Debugging Dark Mode Issues

If text disappears in dark mode, check for:

1. Using `text-[var(--variable)]` instead of inline styles (This is the #1 cause of issues)
2. Missing `dark:text-[color]` class for text elements
3. Inconsistent variable names between light and dark mode

REMEMBER: ALWAYS TEST IN BOTH LIGHT AND DARK MODE!