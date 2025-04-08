# CSS Variable Usage Report

Found 480 CSS variable usages across 43 files.

## VerticalShortcutLanding.tsx (10 findings)

- Line 615: `bg-[var(--theme-primary)]`
  - Line content: `bg-[var(--theme-primary)] animate-float-slow hidden md:block dark:hidden"></div>`
  - Variable: --theme-primary (background)
  - Suggested replacement: `text-primary`

- Line 617: `bg-[var(--theme-primary-hover)]`
  - Line content: `bg-[var(--theme-primary-hover)] animate-float-medium hidden md:block dark:hidden"></div>`
  - Variable: --theme-primary-hover (background)
  - Suggested replacement: `unknown-class-for-theme-primary-hover`

- Line 656: `bg-[var(--theme-accent-tertiary)]`
  - Line content: `<Badge variant="outline" className="bg-[var(--theme-accent-tertiary)]/10 border-[var(--theme-primary)]/30 py-2 px-4">`
  - Variable: --theme-accent-tertiary (background)
  - Suggested replacement: `text-accent`

- Line 683: `bg-[var(--theme-primary)]`
  - Line content: `bg-[var(--theme-primary)] animate-float-slow hidden md:block dark:hidden"></div>`
  - Variable: --theme-primary (background)
  - Suggested replacement: `text-primary`

- Line 685: `bg-[var(--theme-accent-secondary-light)]`
  - Line content: `bg-[var(--theme-accent-secondary-light)] animate-float-medium hidden md:block dark:hidden"></div>`
  - Variable: --theme-accent-secondary-light (background)
  - Suggested replacement: `unknown-class-for-theme-accent-secondary-light`

- Line 643: `text-[var(--theme-text-primary)]`
  - Line content: `<h2 className="text-[var(--theme-text-primary)] dark:text-white text-3xl md:text-4xl font-bold mb-6">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 646: `text-[var(--theme-text-primary)]`
  - Line content: `<p className="text-[var(--theme-text-primary)] dark:text-white/70 text-xl max-w-3xl mx-auto">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 657: `text-[var(--theme-primary)]`
  - Line content: `<span className="text-[var(--theme-primary)]  font-bold">`
  - Variable: --theme-primary (text)
  - Suggested replacement: `text-primary`

- Line 611: `border-[var(--theme-accent-secondary)]`
  - Line content: `className="py-20 border-t border-[var(--theme-accent-secondary)]/30 relative overflow-hidden"`
  - Variable: --theme-accent-secondary (border)
  - Suggested replacement: `text-secondary`

- Line 656: `border-[var(--theme-primary)]`
  - Line content: `<Badge variant="outline" className="bg-[var(--theme-accent-tertiary)]/10 border-[var(--theme-primary)]/30 py-2 px-4">`
  - Variable: --theme-primary (border)
  - Suggested replacement: `text-primary`

## App.tsx (1 findings)

- Line 49: `bg-[var(--theme-accent-secondary)]`
  - Line content: `<Link to="/painpoints" className="px-6 py-2 bg-[var(--theme-accent-secondary)] text-white rounded-lg shadow-theme-sm hover-bubbly-sm">`
  - Variable: --theme-accent-secondary (background)
  - Suggested replacement: `text-secondary`

## components/VSExampleComponent.tsx (19 findings)

- Line 54: `bg-[var(--theme-float-bg-primary)]`
  - Line content: `bg-[var(--theme-float-bg-primary)]`
  - Variable: --theme-float-bg-primary (background)
  - Suggested replacement: `unknown-class-for-theme-float-bg-primary`

- Line 58: `bg-[var(--theme-float-bg-secondary)]`
  - Line content: `bg-[var(--theme-float-bg-secondary)]`
  - Variable: --theme-float-bg-secondary (background)
  - Suggested replacement: `unknown-class-for-theme-float-bg-secondary`

- Line 63: `bg-[var(--theme-bg-secondary)]`
  - Line content: `<div className="bg-[var(--theme-bg-secondary)]/10`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 99: `bg-[var(--theme-bg-secondary)]`
  - Line content: `<code className="text-[var(--theme-accent-tertiary)] mx-1 px-1 bg-[var(--theme-bg-secondary)]/10 rounded">`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 130: `bg-[var(--theme-bg-secondary)]`
  - Line content: `<code className="text-[var(--theme-accent-tertiary)] mx-1 px-1 bg-[var(--theme-bg-secondary)]/10 rounded">`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 184: `bg-[var(--theme-accent-secondary)]`
  - Line content: `<tr className="bg-[var(--theme-accent-secondary)]/5 border-b border-theme-border-light">`
  - Variable: --theme-accent-secondary (background)
  - Suggested replacement: `text-secondary`

- Line 194: `bg-[var(--theme-bg-secondary)]`
  - Line content: `<code className="px-2 py-1 bg-[var(--theme-bg-secondary)]/10 rounded text-sm">`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 199: `bg-[var(--theme-bg-secondary)]`
  - Line content: `<code className="px-2 py-1 bg-[var(--theme-bg-secondary)]/10 rounded text-sm">`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 207: `bg-[var(--theme-bg-secondary)]`
  - Line content: `<code className="px-2 py-1 bg-[var(--theme-bg-secondary)]/10 rounded text-sm">`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 208: `bg-[var(--theme-bg-primary)]`
  - Line content: `className="bg-[var(--theme-bg-primary)]"`
  - Variable: --theme-bg-primary (background)
  - Suggested replacement: `bg-cream dark:bg-navy`

- Line 212: `bg-[var(--theme-bg-secondary)]`
  - Line content: `<code className="px-2 py-1 bg-[var(--theme-bg-secondary)]/10 rounded text-sm">`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 220: `bg-[var(--theme-bg-secondary)]`
  - Line content: `<code className="px-2 py-1 bg-[var(--theme-bg-secondary)]/10 rounded text-sm">`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 225: `bg-[var(--theme-bg-secondary)]`
  - Line content: `<code className="px-2 py-1 bg-[var(--theme-bg-secondary)]/10 rounded text-sm">`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 99: `text-[var(--theme-accent-tertiary)]`
  - Line content: `<code className="text-[var(--theme-accent-tertiary)] mx-1 px-1 bg-[var(--theme-bg-secondary)]/10 rounded">`
  - Variable: --theme-accent-tertiary (text)
  - Suggested replacement: `text-accent`

- Line 100: `text-[var(--theme-var-name)]`
  - Line content: `text-[var(--theme-var-name)]`
  - Variable: --theme-var-name (text)
  - Suggested replacement: `unknown-class-for-theme-var-name`

- Line 130: `text-[var(--theme-accent-tertiary)]`
  - Line content: `<code className="text-[var(--theme-accent-tertiary)] mx-1 px-1 bg-[var(--theme-bg-secondary)]/10 rounded">`
  - Variable: --theme-accent-tertiary (text)
  - Suggested replacement: `text-accent`

- Line 200: `text-[var(--theme-text-primary)]`
  - Line content: `className="text-[var(--theme-text-primary)]"`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 242: `text-[var(--theme-accent-tertiary)]`
  - Line content: `<span className="text-[var(--theme-accent-tertiary)] font-bold">!</span>`
  - Variable: --theme-accent-tertiary (text)
  - Suggested replacement: `text-accent`

- Line 64: `border-[var(--theme-border-primary)]`
  - Line content: `border border-[var(--theme-border-primary)] mb-4 py-2 px-4`
  - Variable: --theme-border-primary (border)
  - Suggested replacement: `unknown-class-for-theme-border-primary`

## components/ThemeTest.tsx (2 findings)

- Line 54: `bg-[var(--theme-bg-primary)]`
  - Line content: `<div className="h-4 w-full bg-[var(--theme-bg-primary)] border border-theme-border" title="--bg-cream"></div>`
  - Variable: --theme-bg-primary (background)
  - Suggested replacement: `bg-cream dark:bg-navy`

- Line 55: `bg-[var(--theme-text-primary)]`
  - Line content: `<div className="h-4 w-full bg-[var(--theme-text-primary)] mt-1 border border-theme-border" title="--text-navy"></div>`
  - Variable: --theme-text-primary (background)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

## components/ThemeDemo.tsx (28 findings)

- Line 24: `bg-[var(--theme-primary)]`
  - Line content: `bg-[var(--theme-primary)] animate-float-slow hidden dark:hidden"></div>`
  - Variable: --theme-primary (background)
  - Suggested replacement: `text-primary`

- Line 26: `bg-[var(--theme-accent-secondary-light)]`
  - Line content: `bg-[var(--theme-accent-secondary-light)] animate-float-medium hidden dark:hidden"></div>`
  - Variable: --theme-accent-secondary-light (background)
  - Suggested replacement: `unknown-class-for-theme-accent-secondary-light`

- Line 59: `bg-[var(--theme-primary)]`
  - Line content: `? 'bg-[var(--theme-primary)] text-white font-medium'`
  - Variable: --theme-primary (background)
  - Suggested replacement: `text-primary`

- Line 60: `bg-[var(--theme-bg-secondary)]`
  - Line content: `: 'bg-[var(--theme-bg-secondary)] dark:bg-white/10 text-[var(--theme-text-primary)] dark:text-white/80'`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 69: `bg-[var(--theme-primary)]`
  - Line content: `? 'bg-[var(--theme-primary)] text-white font-medium'`
  - Variable: --theme-primary (background)
  - Suggested replacement: `text-primary`

- Line 70: `bg-[var(--theme-bg-secondary)]`
  - Line content: `: 'bg-[var(--theme-bg-secondary)] dark:bg-white/10 text-[var(--theme-text-primary)] dark:text-white/80'`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 79: `bg-[var(--theme-primary)]`
  - Line content: `? 'bg-[var(--theme-primary)] text-white font-medium'`
  - Variable: --theme-primary (background)
  - Suggested replacement: `text-primary`

- Line 80: `bg-[var(--theme-bg-secondary)]`
  - Line content: `: 'bg-[var(--theme-bg-secondary)] dark:bg-white/10 text-[var(--theme-text-primary)] dark:text-white/80'`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 158: `bg-[var(--theme-primary)]`
  - Line content: `<button className="bg-[var(--theme-primary)]`
  - Variable: --theme-primary (background)
  - Suggested replacement: `text-primary`

- Line 168: `bg-[var(--theme-accent-secondary)]`
  - Line content: `<button className="bg-[var(--theme-accent-secondary)]`
  - Variable: --theme-accent-secondary (background)
  - Suggested replacement: `text-secondary`

- Line 194: `bg-[var(--theme-text-primary)]`
  - Line content: `hover:bg-[var(--theme-text-primary)]/5 dark:hover:bg-theme-bg-surface/5">`
  - Variable: --theme-text-primary (background)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 43: `text-[var(--theme-text-primary)]`
  - Line content: `<h1 className="text-4xl md:text-5xl font-medium mb-6 text-[var(--theme-text-primary)] dark:text-theme-on-primary">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 46: `text-[var(--theme-text-primary)]`
  - Line content: `<p className="text-xl text-[var(--theme-text-primary)] dark:text-theme-on-primary/80 mb-2">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 49: `text-[var(--theme-text-primary)]`
  - Line content: `<p className="text-[var(--theme-text-primary)] dark:text-theme-on-primary/70 mb-4">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 60: `text-[var(--theme-text-primary)]`
  - Line content: `: 'bg-[var(--theme-bg-secondary)] dark:bg-white/10 text-[var(--theme-text-primary)] dark:text-white/80'`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 70: `text-[var(--theme-text-primary)]`
  - Line content: `: 'bg-[var(--theme-bg-secondary)] dark:bg-white/10 text-[var(--theme-text-primary)] dark:text-white/80'`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 80: `text-[var(--theme-text-primary)]`
  - Line content: `: 'bg-[var(--theme-bg-secondary)] dark:bg-white/10 text-[var(--theme-text-primary)] dark:text-white/80'`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 97: `text-[var(--theme-text-primary)]`
  - Line content: `<h2 className="text-xl font-medium mb-4 text-[var(--theme-text-primary)] dark:text-theme-on-primary">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 101: `text-[var(--theme-text-primary)]`
  - Line content: `<code className="text-sm text-[var(--theme-text-primary)] dark:text-theme-on-primary/90 font-mono">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 102: `text-[var(--theme-text-primary)]`
  - Line content: `className="text-[var(--theme-text-primary)] dark:text-theme-on-primary"`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 105: `text-[var(--theme-text-primary)]`
  - Line content: `<p className="text-[var(--theme-text-primary)] dark:text-theme-on-primary/80 mb-4">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 118: `text-[var(--theme-text-primary)]`
  - Line content: `<h2 className="text-xl font-medium mb-4 text-[var(--theme-text-primary)] dark:text-theme-on-primary">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 122: `text-[var(--theme-text-primary)]`
  - Line content: `<code className="text-sm text-[var(--theme-text-primary)] dark:text-theme-on-primary/90 font-mono">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 126: `text-[var(--theme-text-primary)]`
  - Line content: `<p className="text-[var(--theme-text-primary)] dark:text-theme-on-primary/80 mb-4">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 138: `text-[var(--theme-text-primary)]`
  - Line content: `<h2 className="text-xl font-medium mb-6 text-[var(--theme-text-primary)] dark:text-theme-on-primary">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 154: `text-[var(--theme-text-primary)]`
  - Line content: `<h2 className="text-xl font-medium mb-6 text-[var(--theme-text-primary)] dark:text-theme-on-primary">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 229: `text-[var(--theme-text-primary)]`
  - Line content: `<p className="mt-2 text-sm text-[var(--theme-text-primary)] dark:text-theme-on-primary/80">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 191: `border-[var(--theme-text-primary)]`
  - Line content: `border border-[var(--theme-text-primary)]/20 dark:border-theme-border-light-[var(--theme-text-primary)] dark:text-theme-on-primary-4 py-2 rounded-full`
  - Variable: --theme-text-primary (border)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

## components/DirectTest.tsx (4 findings)

- Line 16: `bg-[var(--theme-primary)]`
  - Line content: `className="bg-[var(--theme-primary)] text-theme-on-primary-medium"`
  - Variable: --theme-primary (background)
  - Suggested replacement: `text-primary`

- Line 22: `bg-[var(--theme-accent-secondary)]`
  - Line content: `className="bg-[var(--theme-accent-secondary)] text-theme-on-primary-medium"`
  - Variable: --theme-accent-secondary (background)
  - Suggested replacement: `text-secondary`

- Line 28: `bg-[var(--theme-text-primary)]`
  - Line content: `className="bg-[var(--theme-text-primary)] font-medium"`
  - Variable: --theme-text-primary (background)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 34: `bg-[var(--theme-accent-tertiary)]`
  - Line content: `className="bg-[var(--theme-accent-tertiary)] font-medium"`
  - Variable: --theme-accent-tertiary (background)
  - Suggested replacement: `text-accent`

## components/ui/vs-modal.tsx (3 findings)

- Line 147: `bg-[var(--theme-float-bg-primary)]`
  - Line content: `<div className="modal-floating-element absolute top-10 right-10 -z-10 w-20 h-20 rounded-[40%] rotate-12 opacity-[var(--theme-float-opacity)] bg-[var(--theme-float-bg-primary)]"></div>`
  - Variable: --theme-float-bg-primary (background)
  - Suggested replacement: `unknown-class-for-theme-float-bg-primary`

- Line 148: `bg-[var(--theme-float-bg-secondary)]`
  - Line content: `<div className="modal-floating-element absolute bottom-10 left-10 -z-10 w-24 h-24 rounded-[30%] -rotate-6 opacity-[var(--theme-float-opacity-secondary)] bg-[var(--theme-float-bg-secondary)]"></div>`
  - Variable: --theme-float-bg-secondary (background)
  - Suggested replacement: `unknown-class-for-theme-float-bg-secondary`

- Line 154: `border-[var(--theme-border-light)]`
  - Line content: `<div className="p-5 md:p-6 border-b border-[var(--theme-border-light)] flex items-center justify-between">`
  - Variable: --theme-border-light (border)
  - Suggested replacement: `unknown-class-for-theme-border-light`

## components/ui/tile.tsx (1 findings)

- Line 19: `bg-[var(--theme-float-bg-primary)]`
  - Line content: `bg-[var(--theme-float-bg-primary)]`
  - Variable: --theme-float-bg-primary (background)
  - Suggested replacement: `unknown-class-for-theme-float-bg-primary`

## components/ui/theme-index.ts (2 findings)

- Line 48: `bg-[var(--theme-bg-primary)]`
  - Line content: `*      lightClassName="bg-[var(--theme-bg-primary)]"`
  - Variable: --theme-bg-primary (background)
  - Suggested replacement: `bg-cream dark:bg-navy`

- Line 49: `bg-[var(--theme-bg-primary)]`
  - Line content: `*      darkClassName="bg-[var(--theme-bg-primary)]"`
  - Variable: --theme-bg-primary (background)
  - Suggested replacement: `bg-cream dark:bg-navy`

## components/ui/sheet.tsx (1 findings)

- Line 75: `bg-[var(--theme-float-bg-primary)]`
  - Line content: `bg-[var(--theme-float-bg-primary)]`
  - Variable: --theme-float-bg-primary (background)
  - Suggested replacement: `unknown-class-for-theme-float-bg-primary`

## components/ui/section.tsx (1 findings)

- Line 18: `bg-[var(--theme-float-bg-primary)]`
  - Line content: `bg-[var(--theme-float-bg-primary)]`
  - Variable: --theme-float-bg-primary (background)
  - Suggested replacement: `unknown-class-for-theme-float-bg-primary`

## components/ui/ThemeController.tsx (6 findings)

- Line 78: `bg-[var(--theme-card-bg-navy)]`
  - Line content: `? "bg-[var(--theme-card-bg-navy)] border-[var(--theme-text-secondary)]/10 text-[var(--theme-text-secondary)]"`
  - Variable: --theme-card-bg-navy (background)
  - Suggested replacement: `unknown-class-for-theme-card-bg-navy`

- Line 79: `bg-[var(--theme-bg-primary)]`
  - Line content: `: "bg-[var(--theme-bg-primary)] border-[var(--theme-text-primary)]/10 text-[var(--theme-text-primary)]"`
  - Variable: --theme-bg-primary (background)
  - Suggested replacement: `bg-cream dark:bg-navy`

- Line 78: `text-[var(--theme-text-secondary)]`
  - Line content: `? "bg-[var(--theme-card-bg-navy)] border-[var(--theme-text-secondary)]/10 text-[var(--theme-text-secondary)]"`
  - Variable: --theme-text-secondary (text)
  - Suggested replacement: `unknown-class-for-theme-text-secondary`

- Line 79: `text-[var(--theme-text-primary)]`
  - Line content: `: "bg-[var(--theme-bg-primary)] border-[var(--theme-text-primary)]/10 text-[var(--theme-text-primary)]"`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 78: `border-[var(--theme-text-secondary)]`
  - Line content: `? "bg-[var(--theme-card-bg-navy)] border-[var(--theme-text-secondary)]/10 text-[var(--theme-text-secondary)]"`
  - Variable: --theme-text-secondary (border)
  - Suggested replacement: `unknown-class-for-theme-text-secondary`

- Line 79: `border-[var(--theme-text-primary)]`
  - Line content: `: "bg-[var(--theme-bg-primary)] border-[var(--theme-text-primary)]/10 text-[var(--theme-text-primary)]"`
  - Variable: --theme-text-primary (border)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

## components/sections/pricing-section.tsx (43 findings)

- Line 58: `bg-[var(--theme-primary)]`
  - Line content: `bg-[var(--theme-primary)] animate-float-slow hidden dark:hidden"></div>`
  - Variable: --theme-primary (background)
  - Suggested replacement: `text-primary`

- Line 60: `bg-[var(--theme-accent-tertiary)]`
  - Line content: `bg-[var(--theme-accent-tertiary)] animate-float-medium hidden dark:hidden"></div>`
  - Variable: --theme-accent-tertiary (background)
  - Suggested replacement: `text-accent`

- Line 100: `bg-[var(--theme-bg-secondary)]`
  - Line content: `<div className="bg-[var(--theme-bg-secondary)]/50 /50 backdrop-blur-sm px-6 py-3 rounded-lg flex items-center gap-4 border border-theme-border-light-card-shadow">`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 143: `bg-[var(--theme-bg-secondary)]`
  - Line content: `<tr className="bg-[var(--theme-bg-secondary)]/50 /50">`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 186: `bg-[var(--theme-bg-secondary)]`
  - Line content: `<tr className="bg-[var(--theme-bg-secondary)]/50 /50">`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 231: `bg-[var(--theme-primary)]`
  - Line content: `bg-[var(--theme-primary)] animate-float-slow hidden dark:hidden"></div>`
  - Variable: --theme-primary (background)
  - Suggested replacement: `text-primary`

- Line 233: `bg-[var(--theme-accent-tertiary)]`
  - Line content: `bg-[var(--theme-accent-tertiary)] animate-float-medium hidden dark:hidden"></div>`
  - Variable: --theme-accent-tertiary (background)
  - Suggested replacement: `text-accent`

- Line 248: `bg-[var(--theme-bg-primary)]`
  - Line content: `bg-[var(--theme-bg-primary)]/50 dark:bg-[var(--theme-bg-primary)]/50 backdrop-blur-sm hover-bubbly-sm">`
  - Variable: --theme-bg-primary (background)
  - Suggested replacement: `bg-cream dark:bg-navy`

- Line 248: `bg-[var(--theme-bg-primary)]`
  - Line content: `bg-[var(--theme-bg-primary)]/50 dark:bg-[var(--theme-bg-primary)]/50 backdrop-blur-sm hover-bubbly-sm">`
  - Variable: --theme-bg-primary (background)
  - Suggested replacement: `bg-cream dark:bg-navy`

- Line 252: `bg-[var(--theme-bg-secondary)]`
  - Line content: `<AccordionContent className="px-4 py-4 bg-[var(--theme-bg-secondary)]/50 /50 text-theme-custom/80 /80">`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 263: `bg-[var(--theme-bg-primary)]`
  - Line content: `bg-[var(--theme-bg-primary)]/50 dark:bg-[var(--theme-bg-primary)]/50 backdrop-blur-sm hover-bubbly-sm">`
  - Variable: --theme-bg-primary (background)
  - Suggested replacement: `bg-cream dark:bg-navy`

- Line 263: `bg-[var(--theme-bg-primary)]`
  - Line content: `bg-[var(--theme-bg-primary)]/50 dark:bg-[var(--theme-bg-primary)]/50 backdrop-blur-sm hover-bubbly-sm">`
  - Variable: --theme-bg-primary (background)
  - Suggested replacement: `bg-cream dark:bg-navy`

- Line 267: `bg-[var(--theme-bg-secondary)]`
  - Line content: `<AccordionContent className="px-4 py-4 bg-[var(--theme-bg-secondary)]/50 /50 text-theme-custom/80 /80">`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 278: `bg-[var(--theme-bg-primary)]`
  - Line content: `bg-[var(--theme-bg-primary)]/50 dark:bg-[var(--theme-bg-primary)]/50 backdrop-blur-sm hover-bubbly-sm">`
  - Variable: --theme-bg-primary (background)
  - Suggested replacement: `bg-cream dark:bg-navy`

- Line 278: `bg-[var(--theme-bg-primary)]`
  - Line content: `bg-[var(--theme-bg-primary)]/50 dark:bg-[var(--theme-bg-primary)]/50 backdrop-blur-sm hover-bubbly-sm">`
  - Variable: --theme-bg-primary (background)
  - Suggested replacement: `bg-cream dark:bg-navy`

- Line 282: `bg-[var(--theme-bg-secondary)]`
  - Line content: `<AccordionContent className="px-4 py-4 bg-[var(--theme-bg-secondary)]/50 /50 text-theme-custom/80 /80">`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 293: `bg-[var(--theme-bg-primary)]`
  - Line content: `bg-[var(--theme-bg-primary)]/50 dark:bg-[var(--theme-bg-primary)]/50 backdrop-blur-sm hover-bubbly-sm">`
  - Variable: --theme-bg-primary (background)
  - Suggested replacement: `bg-cream dark:bg-navy`

- Line 293: `bg-[var(--theme-bg-primary)]`
  - Line content: `bg-[var(--theme-bg-primary)]/50 dark:bg-[var(--theme-bg-primary)]/50 backdrop-blur-sm hover-bubbly-sm">`
  - Variable: --theme-bg-primary (background)
  - Suggested replacement: `bg-cream dark:bg-navy`

- Line 297: `bg-[var(--theme-bg-secondary)]`
  - Line content: `<AccordionContent className="px-4 py-4 bg-[var(--theme-bg-secondary)]/50 /50 text-theme-custom/80 /80">`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 308: `bg-[var(--theme-bg-primary)]`
  - Line content: `bg-[var(--theme-bg-primary)]/50 dark:bg-[var(--theme-bg-primary)]/50 backdrop-blur-sm hover-bubbly-sm">`
  - Variable: --theme-bg-primary (background)
  - Suggested replacement: `bg-cream dark:bg-navy`

- Line 308: `bg-[var(--theme-bg-primary)]`
  - Line content: `bg-[var(--theme-bg-primary)]/50 dark:bg-[var(--theme-bg-primary)]/50 backdrop-blur-sm hover-bubbly-sm">`
  - Variable: --theme-bg-primary (background)
  - Suggested replacement: `bg-cream dark:bg-navy`

- Line 312: `bg-[var(--theme-bg-secondary)]`
  - Line content: `<AccordionContent className="px-4 py-4 bg-[var(--theme-bg-secondary)]/50 /50 text-theme-custom/80 /80">`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 322: `bg-[var(--theme-bg-primary)]`
  - Line content: `bg-[var(--theme-bg-primary)]/50 dark:bg-[var(--theme-bg-primary)]/50 backdrop-blur-sm hover-bubbly-sm">`
  - Variable: --theme-bg-primary (background)
  - Suggested replacement: `bg-cream dark:bg-navy`

- Line 322: `bg-[var(--theme-bg-primary)]`
  - Line content: `bg-[var(--theme-bg-primary)]/50 dark:bg-[var(--theme-bg-primary)]/50 backdrop-blur-sm hover-bubbly-sm">`
  - Variable: --theme-bg-primary (background)
  - Suggested replacement: `bg-cream dark:bg-navy`

- Line 326: `bg-[var(--theme-bg-secondary)]`
  - Line content: `<AccordionContent className="px-4 py-4 bg-[var(--theme-bg-secondary)]/50 /50 text-theme-custom/80 /80">`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 581: `bg-[var(--theme-primary)]`
  - Line content: `<div className="text-2xl font-bold bg-[var(--theme-primary)]">{pricingStats.totalModules}+</div>`
  - Variable: --theme-primary (background)
  - Suggested replacement: `text-primary`

- Line 586: `bg-[var(--theme-primary)]`
  - Line content: `<div className="text-2xl font-bold bg-[var(--theme-primary)]">{pricingStats.totalCategories}</div>`
  - Variable: --theme-primary (background)
  - Suggested replacement: `text-primary`

- Line 591: `bg-[var(--theme-primary)]`
  - Line content: `<div className="text-2xl font-bold bg-[var(--theme-primary)]">{pricingStats.totalHours}+</div>`
  - Variable: --theme-primary (background)
  - Suggested replacement: `text-primary`

- Line 699: `bg-[var(--theme-primary)]`
  - Line content: `className="absolute top-0 right-0 text-xs font-medium text-theme-on-primary-3 py-1 rounded-bl-lg bg-[var(--theme-primary)]"`
  - Variable: --theme-primary (background)
  - Suggested replacement: `text-primary`

- Line 707: `bg-[var(--theme-primary)]`
  - Line content: `<div className="absolute top-0 left-0 text-xs font-medium px-3 py-1 rounded-br-lg bg-[var(--theme-primary)]">`
  - Variable: --theme-primary (background)
  - Suggested replacement: `text-primary`

- Line 715: `bg-[var(--theme-bg-navy-gradient)]`
  - Line content: `className="w-12 h-12 rounded-full flex items-center justify-center border bg-[var(--theme-bg-navy-gradient)]"`
  - Variable: --theme-bg-navy-gradient (background)
  - Suggested replacement: `unknown-class-for-theme-bg-navy-gradient`

- Line 768: `bg-[var(--theme-primary)]`
  - Line content: `className="h-5 w-5 shrink-0 mt-0.5 group-hover:scale-110 transition-transform bg-[var(--theme-primary)]"`
  - Variable: --theme-primary (background)
  - Suggested replacement: `text-primary`

- Line 80: `text-[var(--theme-primary)]`
  - Line content: `<div className="text-[var(--theme-primary)]  text-sm">{moduleCategories[category]?.length || 0}</div>`
  - Variable: --theme-primary (text)
  - Suggested replacement: `text-primary`

- Line 93: `text-[var(--theme-primary)]`
  - Line content: `<div className="text-[var(--theme-primary)]  text-sm">{moduleCategories[category]?.length || 0}</div>`
  - Variable: --theme-primary (text)
  - Suggested replacement: `text-primary`

- Line 102: `text-[var(--theme-primary)]`
  - Line content: `<div className="text-2xl font-bold text-[var(--theme-primary)] ">{totalModules}+</div>`
  - Variable: --theme-primary (text)
  - Suggested replacement: `text-primary`

- Line 107: `text-[var(--theme-primary)]`
  - Line content: `<div className="text-2xl font-bold text-[var(--theme-primary)] ">{totalCategories}</div>`
  - Variable: --theme-primary (text)
  - Suggested replacement: `text-primary`

- Line 112: `text-[var(--theme-primary)]`
  - Line content: `<div className="text-2xl font-bold text-[var(--theme-primary)] ">{totalHours}+</div>`
  - Variable: --theme-primary (text)
  - Suggested replacement: `text-primary`

- Line 162: `text-[var(--theme-primary)]`
  - Line content: `<Check className="h-5 w-5 text-[var(--theme-primary)]  mx-auto" />`
  - Variable: --theme-primary (text)
  - Suggested replacement: `text-primary`

- Line 169: `text-[var(--theme-accent-secondary)]`
  - Line content: `<Check className="h-5 w-5 text-[var(--theme-accent-secondary)]  mx-auto" />`
  - Variable: --theme-accent-secondary (text)
  - Suggested replacement: `text-secondary`

- Line 176: `text-[var(--theme-accent-quaternary)]`
  - Line content: `<Check className="h-5 w-5 text-[var(--theme-accent-quaternary)]  mx-auto" />`
  - Variable: --theme-accent-quaternary (text)
  - Suggested replacement: `text-accent-red`

- Line 197: `text-[var(--theme-primary)]`
  - Line content: `<Check className="h-5 w-5 text-[var(--theme-primary)]  mx-auto" />`
  - Variable: --theme-primary (text)
  - Suggested replacement: `text-primary`

- Line 204: `text-[var(--theme-accent-secondary)]`
  - Line content: `<Check className="h-5 w-5 text-[var(--theme-accent-secondary)]  mx-auto" />`
  - Variable: --theme-accent-secondary (text)
  - Suggested replacement: `text-secondary`

- Line 211: `text-[var(--theme-accent-quaternary)]`
  - Line content: `<Check className="h-5 w-5 text-[var(--theme-accent-quaternary)]  mx-auto" />`
  - Variable: --theme-accent-quaternary (text)
  - Suggested replacement: `text-accent-red`

## components/sections/pricing-quiz-modal.tsx (12 findings)

- Line 79: `bg-[var(--theme-bg-primary)]`
  - Line content: `<Button className="px-5 py-2 bg-[var(--theme-bg-primary)]/75 backdrop-blur-sm border border-[var(--theme-primary)]/30 /30 text-theme-custom  hover:bg-[var(--theme-accent-secondary)]/30 dark:hover:bg-[var(--theme-accent-secondary)]/30 gap-2 hover-bubbly-sm vs-card-shadow">`
  - Variable: --theme-bg-primary (background)
  - Suggested replacement: `bg-cream dark:bg-navy`

- Line 79: `bg-[var(--theme-accent-secondary)]`
  - Line content: `<Button className="px-5 py-2 bg-[var(--theme-bg-primary)]/75 backdrop-blur-sm border border-[var(--theme-primary)]/30 /30 text-theme-custom  hover:bg-[var(--theme-accent-secondary)]/30 dark:hover:bg-[var(--theme-accent-secondary)]/30 gap-2 hover-bubbly-sm vs-card-shadow">`
  - Variable: --theme-accent-secondary (background)
  - Suggested replacement: `text-secondary`

- Line 79: `bg-[var(--theme-accent-secondary)]`
  - Line content: `<Button className="px-5 py-2 bg-[var(--theme-bg-primary)]/75 backdrop-blur-sm border border-[var(--theme-primary)]/30 /30 text-theme-custom  hover:bg-[var(--theme-accent-secondary)]/30 dark:hover:bg-[var(--theme-accent-secondary)]/30 gap-2 hover-bubbly-sm vs-card-shadow">`
  - Variable: --theme-accent-secondary (background)
  - Suggested replacement: `text-secondary`

- Line 91: `bg-[var(--theme-primary)]`
  - Line content: `bg-[var(--theme-primary)] animate-float-slow hidden dark:hidden"></div>`
  - Variable: --theme-primary (background)
  - Suggested replacement: `text-primary`

- Line 93: `bg-[var(--theme-accent-tertiary)]`
  - Line content: `bg-[var(--theme-accent-tertiary)] animate-float-medium hidden dark:hidden"></div>`
  - Variable: --theme-accent-tertiary (background)
  - Suggested replacement: `text-accent`

- Line 117: `bg-[var(--theme-primary)]`
  - Line content: `idx <= currentStep ? 'bg-[var(--theme-primary)] dark:bg-[var(--theme-primary-light)]' : 'bg-white/20 dark:bg-white/20'`
  - Variable: --theme-primary (background)
  - Suggested replacement: `text-primary`

- Line 117: `bg-[var(--theme-primary-light)]`
  - Line content: `idx <= currentStep ? 'bg-[var(--theme-primary)] dark:bg-[var(--theme-primary-light)]' : 'bg-white/20 dark:bg-white/20'`
  - Variable: --theme-primary-light (background)
  - Suggested replacement: `text-primary-light`

- Line 132: `bg-[var(--theme-primary)]`
  - Line content: `? 'border-[var(--theme-primary)] dark:border-[var(--theme-primary-light)] bg-[var(--theme-primary)]/10 dark:bg-[var(--theme-primary)]/10'`
  - Variable: --theme-primary (background)
  - Suggested replacement: `text-primary`

- Line 132: `bg-[var(--theme-primary)]`
  - Line content: `? 'border-[var(--theme-primary)] dark:border-[var(--theme-primary-light)] bg-[var(--theme-primary)]/10 dark:bg-[var(--theme-primary)]/10'`
  - Variable: --theme-primary (background)
  - Suggested replacement: `text-primary`

- Line 79: `border-[var(--theme-primary)]`
  - Line content: `<Button className="px-5 py-2 bg-[var(--theme-bg-primary)]/75 backdrop-blur-sm border border-[var(--theme-primary)]/30 /30 text-theme-custom  hover:bg-[var(--theme-accent-secondary)]/30 dark:hover:bg-[var(--theme-accent-secondary)]/30 gap-2 hover-bubbly-sm vs-card-shadow">`
  - Variable: --theme-primary (border)
  - Suggested replacement: `text-primary`

- Line 132: `border-[var(--theme-primary)]`
  - Line content: `? 'border-[var(--theme-primary)] dark:border-[var(--theme-primary-light)] bg-[var(--theme-primary)]/10 dark:bg-[var(--theme-primary)]/10'`
  - Variable: --theme-primary (border)
  - Suggested replacement: `text-primary`

- Line 132: `border-[var(--theme-primary-light)]`
  - Line content: `? 'border-[var(--theme-primary)] dark:border-[var(--theme-primary-light)] bg-[var(--theme-primary)]/10 dark:bg-[var(--theme-primary)]/10'`
  - Variable: --theme-primary-light (border)
  - Suggested replacement: `text-primary-light`

## components/sections/pricing-3-cols-subscription.tsx (11 findings)

- Line 124: `bg-[var(--theme-primary)]`
  - Line content: `bg-[var(--theme-primary)] animate-float-slow hidden dark:hidden"></div>`
  - Variable: --theme-primary (background)
  - Suggested replacement: `text-primary`

- Line 137: `text-[var(--theme-text-primary)]`
  - Line content: `<h2 className="flex items-center gap-2 font-bold text-[var(--theme-text-primary)] dark:text-theme-on-primary">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 148: `text-[var(--theme-text-primary)]`
  - Line content: `<p className="text-[var(--theme-text-primary)]/70 dark:text-theme-on-primary/70 max-w-[220px] text-sm">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 157: `text-[var(--theme-text-primary)]`
  - Line content: `<span className="text-[var(--theme-text-primary)]/70 dark:text-theme-on-primary/70 text-2xl font-bold">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 160: `text-[var(--theme-primary)]`
  - Line content: `<span className="text-6xl font-bold text-[var(--theme-primary)] ">`
  - Variable: --theme-primary (text)
  - Suggested replacement: `text-primary`

- Line 167: `text-[var(--theme-text-primary)]`
  - Line content: `<span className="text-sm text-[var(--theme-text-primary)] dark:text-theme-on-primary">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 170: `text-[var(--theme-text-primary)]`
  - Line content: `<span className="text-[var(--theme-text-primary)]/70 dark:text-theme-on-primary/70 text-sm">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 191: `text-[var(--theme-primary)]`
  - Line content: `<CircleCheckBig className="text-[var(--theme-primary)]  size-4 shrink-0 group-hover:scale-110 transition-transform" />`
  - Variable: --theme-primary (text)
  - Suggested replacement: `text-primary`

- Line 192: `text-[var(--theme-text-primary)]`
  - Line content: `<span className="text-[var(--theme-text-primary)]/80 dark:text-theme-on-primary/80">{feature}</span>`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 118: `border-[var(--theme-bg-secondary)]`
  - Line content: `"max-w-container relative flex flex-col gap-6 overflow-hidden rounded-2xl p-8 shadow-[2px_2px_8px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(53,115,128,0.15)] bg-gradient-to-br from-white to-[var(--theme-bg-primary)]/80 dark:bg-gradient-to-br dark:from-[var(--theme-bg-primary)] dark:to-[var(--theme-bg-secondary)] border border-[var(--theme-bg-secondary)]/10 dark:border-white/10 hover-bubbly",`
  - Variable: --theme-bg-secondary (border)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 182: `border-[var(--theme-bg-secondary)]`
  - Line content: `<hr className="border-[var(--theme-bg-secondary)]/10 dark:border-theme-border-light" />`
  - Variable: --theme-bg-secondary (border)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

## components/sections/course-viewer.tsx (10 findings)

- Line 346: `bg-[var(--theme-float-bg-primary)]`
  - Line content: `bg-[var(--theme-float-bg-primary)]"></div>`
  - Variable: --theme-float-bg-primary (background)
  - Suggested replacement: `unknown-class-for-theme-float-bg-primary`

- Line 349: `bg-[var(--theme-float-bg-secondary)]`
  - Line content: `bg-[var(--theme-float-bg-secondary)]"></div>`
  - Variable: --theme-float-bg-secondary (background)
  - Suggested replacement: `unknown-class-for-theme-float-bg-secondary`

- Line 352: `bg-[var(--theme-accent-tertiary)]`
  - Line content: `bg-[var(--theme-accent-tertiary)]"></div>`
  - Variable: --theme-accent-tertiary (background)
  - Suggested replacement: `text-accent`

- Line 389: `bg-[var(--theme-float-bg-primary)]`
  - Line content: `bg-[var(--theme-float-bg-primary)]"></div>`
  - Variable: --theme-float-bg-primary (background)
  - Suggested replacement: `unknown-class-for-theme-float-bg-primary`

- Line 392: `bg-[var(--theme-float-bg-secondary)]`
  - Line content: `bg-[var(--theme-float-bg-secondary)]"></div>`
  - Variable: --theme-float-bg-secondary (background)
  - Suggested replacement: `unknown-class-for-theme-float-bg-secondary`

- Line 469: `bg-[var(--bg-navy)]`
  - Line content: `className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-[var(--bg-navy)]/40"`
  - Variable: --bg-navy (background)
  - Suggested replacement: `bg-navy`

- Line 484: `bg-[var(--theme-float-bg-primary)]`
  - Line content: `bg-[var(--theme-float-bg-primary)]"></div>`
  - Variable: --theme-float-bg-primary (background)
  - Suggested replacement: `unknown-class-for-theme-float-bg-primary`

- Line 487: `bg-[var(--theme-float-bg-secondary)]`
  - Line content: `bg-[var(--theme-float-bg-secondary)]"></div>`
  - Variable: --theme-float-bg-secondary (background)
  - Suggested replacement: `unknown-class-for-theme-float-bg-secondary`

- Line 531: `bg-[var(--theme-primary)]`
  - Line content: `<span className="mr-2 text-xs px-1.5 py-0.5 bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] rounded-full">`
  - Variable: --theme-primary (background)
  - Suggested replacement: `text-primary`

- Line 531: `text-[var(--theme-primary)]`
  - Line content: `<span className="mr-2 text-xs px-1.5 py-0.5 bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] rounded-full">`
  - Variable: --theme-primary (text)
  - Suggested replacement: `text-primary`

## components/sections/course-stats.tsx (2 findings)

- Line 183: `bg-[var(--theme-float-bg-primary)]`
  - Line content: `bg-[var(--theme-float-bg-primary)]`
  - Variable: --theme-float-bg-primary (background)
  - Suggested replacement: `unknown-class-for-theme-float-bg-primary`

- Line 187: `bg-[var(--theme-float-bg-secondary)]`
  - Line content: `bg-[var(--theme-float-bg-secondary)]`
  - Variable: --theme-float-bg-secondary (background)
  - Suggested replacement: `unknown-class-for-theme-float-bg-secondary`

## components/sections/VSPricingQuizModal.tsx (7 findings)

- Line 88: `bg-[var(--theme-bg-primary)]`
  - Line content: `className="px-5 py-2 bg-[var(--theme-bg-primary)] border border-[var(--theme-primary)]/30 text-theme-on-primary-[var(--theme-accent-secondary)]/30 gap-2 hover-bubbly-sm"`
  - Variable: --theme-bg-primary (background)
  - Suggested replacement: `bg-cream dark:bg-navy`

- Line 103: `bg-[var(--theme-bg-primary)]`
  - Line content: `<div className="p-6 bg-[var(--theme-bg-primary)] text-theme-on-primary">`
  - Variable: --theme-bg-primary (background)
  - Suggested replacement: `bg-cream dark:bg-navy`

- Line 114: `bg-[var(--theme-primary)]`
  - Line content: `idx <= currentStep ? 'bg-[var(--theme-primary)]' : 'bg-white/20'`
  - Variable: --theme-primary (background)
  - Suggested replacement: `text-primary`

- Line 131: `bg-[var(--theme-primary)]`
  - Line content: `? 'border-[var(--theme-primary)] bg-[var(--theme-primary)]/10 hover:bg-[var(--theme-primary)]/15'`
  - Variable: --theme-primary (background)
  - Suggested replacement: `text-primary`

- Line 131: `bg-[var(--theme-primary)]`
  - Line content: `? 'border-[var(--theme-primary)] bg-[var(--theme-primary)]/10 hover:bg-[var(--theme-primary)]/15'`
  - Variable: --theme-primary (background)
  - Suggested replacement: `text-primary`

- Line 88: `border-[var(--theme-primary)]`
  - Line content: `className="px-5 py-2 bg-[var(--theme-bg-primary)] border border-[var(--theme-primary)]/30 text-theme-on-primary-[var(--theme-accent-secondary)]/30 gap-2 hover-bubbly-sm"`
  - Variable: --theme-primary (border)
  - Suggested replacement: `text-primary`

- Line 131: `border-[var(--theme-primary)]`
  - Line content: `? 'border-[var(--theme-primary)] bg-[var(--theme-primary)]/10 hover:bg-[var(--theme-primary)]/15'`
  - Variable: --theme-primary (border)
  - Suggested replacement: `text-primary`

## components/sections/VSPainPoints.tsx (2 findings)

- Line 116: `bg-[var(--theme-float-bg-primary)]`
  - Line content: `bg-[var(--theme-float-bg-primary)]`
  - Variable: --theme-float-bg-primary (background)
  - Suggested replacement: `unknown-class-for-theme-float-bg-primary`

- Line 120: `bg-[var(--theme-float-bg-secondary)]`
  - Line content: `bg-[var(--theme-float-bg-secondary)]`
  - Variable: --theme-float-bg-secondary (background)
  - Suggested replacement: `unknown-class-for-theme-float-bg-secondary`

## components/sections/VSCharts.tsx (2 findings)

- Line 181: `bg-[var(--theme-float-bg-primary)]`
  - Line content: `bg-[var(--theme-float-bg-primary)]`
  - Variable: --theme-float-bg-primary (background)
  - Suggested replacement: `unknown-class-for-theme-float-bg-primary`

- Line 185: `bg-[var(--theme-float-bg-secondary)]`
  - Line content: `bg-[var(--theme-float-bg-secondary)]`
  - Variable: --theme-float-bg-secondary (background)
  - Suggested replacement: `unknown-class-for-theme-float-bg-secondary`

## components/sections/ModuleHUDShowcase.tsx (5 findings)

- Line 220: `bg-[var(--theme-float-bg-primary)]`
  - Line content: `bg-[var(--theme-float-bg-primary)]`
  - Variable: --theme-float-bg-primary (background)
  - Suggested replacement: `unknown-class-for-theme-float-bg-primary`

- Line 225: `bg-[var(--theme-float-bg-secondary)]`
  - Line content: `bg-[var(--theme-float-bg-secondary)]`
  - Variable: --theme-float-bg-secondary (background)
  - Suggested replacement: `unknown-class-for-theme-float-bg-secondary`

- Line 244: `bg-[var(--theme-accent)]`
  - Line content: `opacity-40 bg-[var(--theme-accent)]`
  - Variable: --theme-accent (background)
  - Suggested replacement: `unknown-class-for-theme-accent`

- Line 247: `bg-[var(--theme-primary)]`
  - Line content: `opacity-30 bg-[var(--theme-primary)]`
  - Variable: --theme-primary (background)
  - Suggested replacement: `text-primary`

- Line 250: `bg-[var(--theme-accent-secondary)]`
  - Line content: `opacity-35 bg-[var(--theme-accent-secondary)]`
  - Variable: --theme-accent-secondary (background)
  - Suggested replacement: `text-secondary`

## components/sections/ModuleHUD.tsx (10 findings)

- Line 176: `bg-[var(--hud-accent-red)]`
  - Line content: `<div className="absolute -top-2 -right-2 w-[15px] h-[15px] bg-[var(--hud-accent-red)] rounded-full shadow-theme-sm"></div>`
  - Variable: --hud-accent-red (background)
  - Suggested replacement: `unknown-class-for-hud-accent-red`

- Line 207: `bg-[var(--hud-accent-red)]`
  - Line content: `<div className="absolute -top-2 -right-2 w-[12px] h-[12px] bg-[var(--hud-accent-red)] rounded-full shadow-theme-sm"></div>`
  - Variable: --hud-accent-red (background)
  - Suggested replacement: `unknown-class-for-hud-accent-red`

- Line 443: `bg-[var(--theme-float-bg-primary)]`
  - Line content: `bg-[var(--theme-float-bg-primary)]`
  - Variable: --theme-float-bg-primary (background)
  - Suggested replacement: `unknown-class-for-theme-float-bg-primary`

- Line 448: `bg-[var(--theme-float-bg-secondary)]`
  - Line content: `bg-[var(--theme-float-bg-secondary)]`
  - Variable: --theme-float-bg-secondary (background)
  - Suggested replacement: `unknown-class-for-theme-float-bg-secondary`

- Line 530: `bg-[var(--theme-float-bg-primary)]`
  - Line content: `<div className="absolute top-0 left-0 w-full h-1/3 bg-[var(--theme-float-bg-primary)] opacity-10"></div>`
  - Variable: --theme-float-bg-primary (background)
  - Suggested replacement: `unknown-class-for-theme-float-bg-primary`

- Line 531: `bg-[var(--theme-float-bg-secondary)]`
  - Line content: `<div className="absolute top-1/3 left-0 w-full h-1/3 bg-[var(--theme-float-bg-secondary)] opacity-15"></div>`
  - Variable: --theme-float-bg-secondary (background)
  - Suggested replacement: `unknown-class-for-theme-float-bg-secondary`

- Line 532: `bg-[var(--theme-float-bg-tertiary)]`
  - Line content: `<div className="absolute top-2/3 left-0 w-full h-1/3 bg-[var(--theme-float-bg-tertiary)] opacity-10"></div>`
  - Variable: --theme-float-bg-tertiary (background)
  - Suggested replacement: `unknown-class-for-theme-float-bg-tertiary`

- Line 539: `bg-[var(--hud-accent-red)]`
  - Line content: `<div className="absolute -top-2 -right-2 w-[15px] h-[15px] bg-[var(--hud-accent-red)] rounded-full shadow-theme-sm"></div>`
  - Variable: --hud-accent-red (background)
  - Suggested replacement: `unknown-class-for-hud-accent-red`

- Line 548: `bg-[var(--theme-float-bg-primary)]`
  - Line content: `bg-[var(--theme-float-bg-primary)]`
  - Variable: --theme-float-bg-primary (background)
  - Suggested replacement: `unknown-class-for-theme-float-bg-primary`

- Line 552: `bg-[var(--theme-float-bg-secondary)]`
  - Line content: `bg-[var(--theme-float-bg-secondary)]`
  - Variable: --theme-float-bg-secondary (background)
  - Suggested replacement: `unknown-class-for-theme-float-bg-secondary`

## components/sections/Case-Studies.tsx (80 findings)

- Line 99: `bg-[var(--theme-bg-secondary)]`
  - Line content: `<div className="bg-[var(--theme-bg-secondary)]/80 dark:bg-[var(--theme-bg-secondary)]/90`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 99: `bg-[var(--theme-bg-secondary)]`
  - Line content: `<div className="bg-[var(--theme-bg-secondary)]/80 dark:bg-[var(--theme-bg-secondary)]/90`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 121: `bg-[var(--theme-bg-primary)]`
  - Line content: `className="bg-[var(--theme-bg-primary)] min-h-screen flex flex-col justify-center py-20 dark:bg-[var(--theme-bg-primary)] relative overflow-hidden border-t border-[var(--theme-text-primary)]/10 dark:border-theme-border-light"`
  - Variable: --theme-bg-primary (background)
  - Suggested replacement: `bg-cream dark:bg-navy`

- Line 121: `bg-[var(--theme-bg-primary)]`
  - Line content: `className="bg-[var(--theme-bg-primary)] min-h-screen flex flex-col justify-center py-20 dark:bg-[var(--theme-bg-primary)] relative overflow-hidden border-t border-[var(--theme-text-primary)]/10 dark:border-theme-border-light"`
  - Variable: --theme-bg-primary (background)
  - Suggested replacement: `bg-cream dark:bg-navy`

- Line 128: `bg-[var(--theme-primary)]`
  - Line content: `bg-[var(--theme-primary)] animate-float-slow hidden md:block dark:hidden"></div>`
  - Variable: --theme-primary (background)
  - Suggested replacement: `text-primary`

- Line 130: `bg-[var(--theme-primary-hover)]`
  - Line content: `bg-[var(--theme-primary-hover)] animate-float-medium hidden md:block dark:hidden"></div>`
  - Variable: --theme-primary-hover (background)
  - Suggested replacement: `unknown-class-for-theme-primary-hover`

- Line 160: `bg-[var(--theme-bg-secondary)]`
  - Line content: `bg-[var(--theme-bg-secondary)]/20 dark:bg-[var(--theme-bg-secondary)]/40`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 160: `bg-[var(--theme-bg-secondary)]`
  - Line content: `bg-[var(--theme-bg-secondary)]/20 dark:bg-[var(--theme-bg-secondary)]/40`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 182: `bg-[var(--theme-bg-secondary)]`
  - Line content: `<div ref={chartRef} className="flex-1 bg-[var(--theme-bg-secondary)]/20 dark:bg-[var(--theme-bg-secondary)]/40`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 182: `bg-[var(--theme-bg-secondary)]`
  - Line content: `<div ref={chartRef} className="flex-1 bg-[var(--theme-bg-secondary)]/20 dark:bg-[var(--theme-bg-secondary)]/40`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 199: `bg-[var(--theme-bg-secondary)]`
  - Line content: `? "bg-[var(--theme-bg-secondary)]/60 dark:bg-[var(--theme-bg-primary)]/80 text-[var(--theme-text-primary)] dark:text-white"`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 199: `bg-[var(--theme-bg-primary)]`
  - Line content: `? "bg-[var(--theme-bg-secondary)]/60 dark:bg-[var(--theme-bg-primary)]/80 text-[var(--theme-text-primary)] dark:text-white"`
  - Variable: --theme-bg-primary (background)
  - Suggested replacement: `bg-cream dark:bg-navy`

- Line 201: `bg-[var(--theme-primary)]`
  - Line content: `? "bg-[var(--theme-primary)] text-white"`
  - Variable: --theme-primary (background)
  - Suggested replacement: `text-primary`

- Line 203: `bg-[var(--theme-accent-secondary)]`
  - Line content: `? "bg-[var(--theme-accent-secondary)] text-white"`
  - Variable: --theme-accent-secondary (background)
  - Suggested replacement: `text-secondary`

- Line 204: `bg-[var(--theme-accent-tertiary)]`
  - Line content: `: "bg-[var(--theme-accent-tertiary)] text-white"`
  - Variable: --theme-accent-tertiary (background)
  - Suggested replacement: `text-accent`

- Line 205: `bg-[var(--theme-bg-secondary)]`
  - Line content: `: "bg-[var(--theme-bg-secondary)]/30 dark:bg-[var(--theme-bg-primary)]/50 hover:bg-[var(--theme-bg-secondary)]/40 hover:dark:bg-[var(--theme-bg-primary)]/70"}`}`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 205: `bg-[var(--theme-bg-primary)]`
  - Line content: `: "bg-[var(--theme-bg-secondary)]/30 dark:bg-[var(--theme-bg-primary)]/50 hover:bg-[var(--theme-bg-secondary)]/40 hover:dark:bg-[var(--theme-bg-primary)]/70"}`}`
  - Variable: --theme-bg-primary (background)
  - Suggested replacement: `bg-cream dark:bg-navy`

- Line 205: `bg-[var(--theme-bg-secondary)]`
  - Line content: `: "bg-[var(--theme-bg-secondary)]/30 dark:bg-[var(--theme-bg-primary)]/50 hover:bg-[var(--theme-bg-secondary)]/40 hover:dark:bg-[var(--theme-bg-primary)]/70"}`}`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 205: `bg-[var(--theme-bg-primary)]`
  - Line content: `: "bg-[var(--theme-bg-secondary)]/30 dark:bg-[var(--theme-bg-primary)]/50 hover:bg-[var(--theme-bg-secondary)]/40 hover:dark:bg-[var(--theme-bg-primary)]/70"}`}`
  - Variable: --theme-bg-primary (background)
  - Suggested replacement: `bg-cream dark:bg-navy`

- Line 322: `bg-[var(--theme-bg-secondary)]`
  - Line content: `<div className="bg-[var(--theme-bg-secondary)]/20 dark:bg-[var(--theme-bg-secondary)]/40`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 322: `bg-[var(--theme-bg-secondary)]`
  - Line content: `<div className="bg-[var(--theme-bg-secondary)]/20 dark:bg-[var(--theme-bg-secondary)]/40`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 326: `bg-[var(--theme-bg-secondary)]`
  - Line content: `hover:bg-[var(--theme-bg-secondary)]/30 dark:hover:bg-[var(--theme-bg-secondary)]/60`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 326: `bg-[var(--theme-bg-secondary)]`
  - Line content: `hover:bg-[var(--theme-bg-secondary)]/30 dark:hover:bg-[var(--theme-bg-secondary)]/60`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 329: `bg-[var(--theme-primary)]`
  - Line content: `<div className="w-1.5 h-12 bg-[var(--theme-primary)]/70  rounded-full mr-2.5"></div>`
  - Variable: --theme-primary (background)
  - Suggested replacement: `text-primary`

- Line 340: `bg-[var(--theme-bg-secondary)]`
  - Line content: `<div className="bg-[var(--theme-bg-secondary)]/20 dark:bg-[var(--theme-bg-secondary)]/40`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 340: `bg-[var(--theme-bg-secondary)]`
  - Line content: `<div className="bg-[var(--theme-bg-secondary)]/20 dark:bg-[var(--theme-bg-secondary)]/40`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 344: `bg-[var(--theme-bg-secondary)]`
  - Line content: `hover:bg-[var(--theme-bg-secondary)]/30 dark:hover:bg-[var(--theme-bg-secondary)]/60`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 344: `bg-[var(--theme-bg-secondary)]`
  - Line content: `hover:bg-[var(--theme-bg-secondary)]/30 dark:hover:bg-[var(--theme-bg-secondary)]/60`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 347: `bg-[var(--theme-accent-secondary)]`
  - Line content: `<div className="w-1.5 h-12 bg-[var(--theme-accent-secondary)]/70  rounded-full mr-2.5"></div>`
  - Variable: --theme-accent-secondary (background)
  - Suggested replacement: `text-secondary`

- Line 358: `bg-[var(--theme-bg-secondary)]`
  - Line content: `<div className="col-span-2 bg-[var(--theme-bg-secondary)]/20 dark:bg-[var(--theme-bg-secondary)]/40`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 358: `bg-[var(--theme-bg-secondary)]`
  - Line content: `<div className="col-span-2 bg-[var(--theme-bg-secondary)]/20 dark:bg-[var(--theme-bg-secondary)]/40`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 362: `bg-[var(--theme-bg-secondary)]`
  - Line content: `hover:bg-[var(--theme-bg-secondary)]/30 dark:hover:bg-[var(--theme-bg-secondary)]/60">`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 362: `bg-[var(--theme-bg-secondary)]`
  - Line content: `hover:bg-[var(--theme-bg-secondary)]/30 dark:hover:bg-[var(--theme-bg-secondary)]/60">`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 364: `bg-[var(--theme-accent-tertiary)]`
  - Line content: `<div className="w-1.5 h-12 bg-[var(--theme-accent-tertiary)]/70  rounded-full mr-2.5"></div>`
  - Variable: --theme-accent-tertiary (background)
  - Suggested replacement: `text-accent`

- Line 371: `bg-[var(--theme-accent-tertiary)]`
  - Line content: `<div className="bg-[var(--theme-accent-tertiary)]/10 /20 p-1.5 rounded-full">`
  - Variable: --theme-accent-tertiary (background)
  - Suggested replacement: `text-accent`

- Line 381: `bg-[var(--theme-bg-secondary)]`
  - Line content: `<div className="flex-1 bg-[var(--theme-bg-secondary)]/20 dark:bg-[var(--theme-bg-secondary)]/40`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 381: `bg-[var(--theme-bg-secondary)]`
  - Line content: `<div className="flex-1 bg-[var(--theme-bg-secondary)]/20 dark:bg-[var(--theme-bg-secondary)]/40`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 385: `bg-[var(--theme-primary)]`
  - Line content: `<span className="inline-block w-1 h-4 bg-[var(--theme-primary)]/70  mr-2 rounded-full"></span>`
  - Variable: --theme-primary (background)
  - Suggested replacement: `text-primary`

- Line 395: `bg-[var(--theme-bg-secondary)]`
  - Line content: `bg-[var(--theme-bg-secondary)]/20 dark:bg-[var(--theme-bg-primary)]/50`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 395: `bg-[var(--theme-bg-primary)]`
  - Line content: `bg-[var(--theme-bg-secondary)]/20 dark:bg-[var(--theme-bg-primary)]/50`
  - Variable: --theme-bg-primary (background)
  - Suggested replacement: `bg-cream dark:bg-navy`

- Line 401: `bg-[var(--theme-bg-secondary)]`
  - Line content: `hover:translate-x-[2px] hover:bg-[var(--theme-bg-secondary)]/40 dark:hover:bg-[var(--theme-bg-primary)]/70`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 401: `bg-[var(--theme-bg-primary)]`
  - Line content: `hover:translate-x-[2px] hover:bg-[var(--theme-bg-secondary)]/40 dark:hover:bg-[var(--theme-bg-primary)]/70`
  - Variable: --theme-bg-primary (background)
  - Suggested replacement: `bg-cream dark:bg-navy`

- Line 404: `bg-[var(--theme-bg-secondary)]`
  - Line content: `? 'bg-[var(--theme-bg-secondary)]/40 dark:bg-[var(--theme-bg-primary)]/70 shadow-[0_1px_2px_rgba(0,0,0,0.02)] dark:shadow-[0_1px_4px_rgba(0,0,0,0.15)]'`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 404: `bg-[var(--theme-bg-primary)]`
  - Line content: `? 'bg-[var(--theme-bg-secondary)]/40 dark:bg-[var(--theme-bg-primary)]/70 shadow-[0_1px_2px_rgba(0,0,0,0.02)] dark:shadow-[0_1px_4px_rgba(0,0,0,0.15)]'`
  - Variable: --theme-bg-primary (background)
  - Suggested replacement: `bg-cream dark:bg-navy`

- Line 426: `bg-[var(--theme-primary)]`
  - Line content: `<div className="h-4 w-1 bg-[var(--theme-primary)]  rounded-full"></div>`
  - Variable: --theme-primary (background)
  - Suggested replacement: `text-primary`

- Line 103: `text-[var(--theme-text-primary)]`
  - Line content: `<p className="font-medium text-sm text-[var(--theme-text-primary)] dark:text-theme-on-primary-b border-[var(--theme-text-primary)]/5 dark:border-theme-border-light-1 mb-1.5">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 146: `text-[var(--theme-text-primary)]`
  - Line content: `<h2 className="text-[var(--theme-text-primary)] dark:text-theme-on-primary-4xl md:text-5xl font-bold mb-4">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 149: `text-[var(--theme-text-primary)]`
  - Line content: `<p className="text-[var(--theme-text-primary)] dark:text-theme-on-primary/70 text-lg md:text-xl mb-2 max-w-3xl mx-auto">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 172: `text-[var(--theme-text-primary)]`
  - Line content: `<h3 className="text-[var(--theme-text-primary)] dark:text-theme-on-primary md:text-xl font-medium mb-0.5">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 175: `text-[var(--theme-text-primary)]`
  - Line content: `<p className="text-[var(--theme-text-primary)]/70 dark:text-theme-on-primary/70 text-xs md:text-sm">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 188: `text-[var(--theme-text-primary)]`
  - Line content: `{ id: "all", label: "All Metrics", color: "text-[var(--theme-text-primary)] dark:text-white" },`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 189: `text-[var(--theme-primary)]`
  - Line content: `{ id: "views", label: "Views", color: "text-[var(--theme-primary)] dark:text-[var(--theme-primary-light)]" },`
  - Variable: --theme-primary (text)
  - Suggested replacement: `text-primary`

- Line 189: `text-[var(--theme-primary-light)]`
  - Line content: `{ id: "views", label: "Views", color: "text-[var(--theme-primary)] dark:text-[var(--theme-primary-light)]" },`
  - Variable: --theme-primary-light (text)
  - Suggested replacement: `text-primary-light`

- Line 190: `text-[var(--theme-accent-secondary)]`
  - Line content: `{ id: "followers", label: "Followers", color: "text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)]" },`
  - Variable: --theme-accent-secondary (text)
  - Suggested replacement: `text-secondary`

- Line 190: `text-[var(--theme-accent-secondary-light)]`
  - Line content: `{ id: "followers", label: "Followers", color: "text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)]" },`
  - Variable: --theme-accent-secondary-light (text)
  - Suggested replacement: `unknown-class-for-theme-accent-secondary-light`

- Line 191: `text-[var(--theme-accent-tertiary)]`
  - Line content: `{ id: "interactions", label: "Interactions", color: "text-[var(--theme-accent-tertiary)]" },`
  - Variable: --theme-accent-tertiary (text)
  - Suggested replacement: `text-accent`

- Line 199: `text-[var(--theme-text-primary)]`
  - Line content: `? "bg-[var(--theme-bg-secondary)]/60 dark:bg-[var(--theme-bg-primary)]/80 text-[var(--theme-text-primary)] dark:text-white"`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 234: `text-[var(--theme-text-primary)]`
  - Line content: `className="text-[var(--theme-text-primary)]/40 dark:text-theme-on-primary/40 text-xs"`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 239: `text-[var(--theme-text-primary)]`
  - Line content: `className="text-[var(--theme-text-primary)]/40 dark:text-theme-on-primary/40 text-xs"`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 247: `text-[var(--theme-text-primary)]`
  - Line content: `<span className="text-[var(--theme-text-primary)] dark:text-theme-on-primary-xs">{value}</span>`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 331: `text-[var(--theme-text-primary)]`
  - Line content: `<div className="text-[var(--theme-text-primary)]/60 dark:text-theme-on-primary/60 text-xs">Views</div>`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 332: `text-[var(--theme-primary)]`
  - Line content: `<div className="text-[var(--theme-primary)]  text-lg font-semibold">`
  - Variable: --theme-primary (text)
  - Suggested replacement: `text-primary`

- Line 349: `text-[var(--theme-text-primary)]`
  - Line content: `<div className="text-[var(--theme-text-primary)]/60 dark:text-theme-on-primary/60 text-xs">Followers</div>`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 350: `text-[var(--theme-accent-secondary)]`
  - Line content: `<div className="text-[var(--theme-accent-secondary)]  text-lg font-semibold">`
  - Variable: --theme-accent-secondary (text)
  - Suggested replacement: `text-secondary`

- Line 366: `text-[var(--theme-text-primary)]`
  - Line content: `<div className="text-[var(--theme-text-primary)]/60 dark:text-theme-on-primary/60 text-xs">Interactions</div>`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 367: `text-[var(--theme-accent-tertiary)]`
  - Line content: `<div className="text-[var(--theme-accent-tertiary)]  text-lg font-semibold">`
  - Variable: --theme-accent-tertiary (text)
  - Suggested replacement: `text-accent`

- Line 384: `text-[var(--theme-text-primary)]`
  - Line content: `<h3 className="text-[var(--theme-text-primary)] dark:text-theme-on-primary-sm font-medium mb-3 flex items-center">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 418: `text-[var(--theme-text-primary)]`
  - Line content: `<h4 className="text-[var(--theme-text-primary)] dark:text-theme-on-primary-medium text-sm truncate">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 421: `text-[var(--theme-text-primary)]`
  - Line content: `<p className="text-[var(--theme-text-primary)]/60 dark:text-theme-on-primary/60 text-xs truncate">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 102: `border-[var(--theme-text-primary)]`
  - Line content: `border border-[var(--theme-text-primary)]/5 dark:border-theme-border-light">`
  - Variable: --theme-text-primary (border)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 103: `border-[var(--theme-text-primary)]`
  - Line content: `<p className="font-medium text-sm text-[var(--theme-text-primary)] dark:text-theme-on-primary-b border-[var(--theme-text-primary)]/5 dark:border-theme-border-light-1 mb-1.5">`
  - Variable: --theme-text-primary (border)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 121: `border-[var(--theme-text-primary)]`
  - Line content: `className="bg-[var(--theme-bg-primary)] min-h-screen flex flex-col justify-center py-20 dark:bg-[var(--theme-bg-primary)] relative overflow-hidden border-t border-[var(--theme-text-primary)]/10 dark:border-theme-border-light"`
  - Variable: --theme-text-primary (border)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 161: `border-[var(--theme-text-primary)]`
  - Line content: `rounded-md border border-[var(--theme-text-primary)]/5 dark:border-theme-border-light-[0_1px_3px_rgba(0,0,0,0.01)] shadow-theme-">`
  - Variable: --theme-text-primary (border)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 184: `border-[var(--theme-text-primary)]`
  - Line content: `border border-[var(--theme-text-primary)]/5 dark:border-theme-border-light-[0_1px_3px_rgba(0,0,0,0.01)] shadow-theme-">`
  - Variable: --theme-text-primary (border)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 324: `border-[var(--theme-text-primary)]`
  - Line content: `border border-[var(--theme-text-primary)]/5 dark:border-theme-border-light-[0_1px_2px_rgba(0,0,0,0.01)] shadow-theme-`
  - Variable: --theme-text-primary (border)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 342: `border-[var(--theme-text-primary)]`
  - Line content: `border border-[var(--theme-text-primary)]/5 dark:border-theme-border-light-[0_1px_2px_rgba(0,0,0,0.01)] shadow-theme-`
  - Variable: --theme-text-primary (border)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 360: `border-[var(--theme-text-primary)]`
  - Line content: `border border-[var(--theme-text-primary)]/5 dark:border-theme-border-light-[0_1px_2px_rgba(0,0,0,0.01)] shadow-theme-`
  - Variable: --theme-text-primary (border)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 383: `border-[var(--theme-text-primary)]`
  - Line content: `border border-[var(--theme-text-primary)]/5 dark:border-theme-border-light-[0_1px_3px_rgba(0,0,0,0.01)] shadow-theme-">`
  - Variable: --theme-text-primary (border)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 398: `border-[var(--theme-primary)]`
  - Line content: `? 'border-[var(--theme-primary)] dark:border-[var(--theme-primary)]'`
  - Variable: --theme-primary (border)
  - Suggested replacement: `text-primary`

- Line 398: `border-[var(--theme-primary)]`
  - Line content: `? 'border-[var(--theme-primary)] dark:border-[var(--theme-primary)]'`
  - Variable: --theme-primary (border)
  - Suggested replacement: `text-primary`

## components/sections/navbar/sticky.tsx (1 findings)

- Line 12: `bg-[var(--theme-bg-primary)]`
  - Line content: `<div className="mx-auto max-w-container bg-theme-bg-surface/75 dark:bg-[var(--theme-bg-primary)]/75 backdrop-blur-md rounded-xl overflow-hidden">`
  - Variable: --theme-bg-primary (background)
  - Suggested replacement: `bg-cream dark:bg-navy`

## components/sections/navbar/default.tsx (1 findings)

- Line 15: `bg-[var(--theme-bg-primary)]`
  - Line content: `<div className="max-w-container relative mx-auto bg-theme-bg-surface/75 dark:bg-[var(--theme-bg-primary)]/75 backdrop-blur-md rounded-xl overflow-hidden">`
  - Variable: --theme-bg-primary (background)
  - Suggested replacement: `bg-cream dark:bg-navy`

## components/sections/carousel/VSCarousel.tsx (6 findings)

- Line 98: `bg-[var(--theme-primary)]`
  - Line content: `<span className="absolute -bottom-1 left-0 w-full h-1 bg-[var(--theme-primary)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"></span>`
  - Variable: --theme-primary (background)
  - Suggested replacement: `text-primary`

- Line 145: `bg-[var(--theme-primary)]`
  - Line content: `className="absolute inset-0 bg-[var(--theme-primary)]/20 scale-[2.5] opacity-0 transition-all duration-500 group-hover:opacity-40 animate-pulse"`
  - Variable: --theme-primary (background)
  - Suggested replacement: `text-primary`

- Line 95: `text-[var(--theme-text-primary)]`
  - Line content: `<span className="text-[var(--theme-text-primary)] dark:text-theme-on-primary">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 103: `text-[var(--theme-text-primary)]`
  - Line content: `<p className="text-xl max-w-[720px] text-balance text-[var(--theme-text-primary)]/80 dark:text-theme-on-primary/80">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 157: `text-[var(--theme-primary)]`
  - Line content: `<SlideDescription className="text-[var(--theme-primary)]  text-sm font-medium uppercase tracking-wider mb-2 text-shadow-sm">`
  - Variable: --theme-primary (text)
  - Suggested replacement: `text-primary`

- Line 176: `text-[var(--theme-primary-light)]`
  - Line content: `<span className="text-[var(--theme-primary-light)] font-medium text-shadow-sm"> {`
  - Variable: --theme-primary-light (text)
  - Suggested replacement: `text-primary-light`

## components/sections/bento-grid/vsBentoGrid.tsx (33 findings)

- Line 8: `bg-[var(--theme-bg-primary)]`
  - Line content: `<Section className="bg-[var(--theme-bg-primary)] py-24 relative overflow-hidden dark:bg-[var(--theme-bg-primary)]">`
  - Variable: --theme-bg-primary (background)
  - Suggested replacement: `bg-cream dark:bg-navy`

- Line 8: `bg-[var(--theme-bg-primary)]`
  - Line content: `<Section className="bg-[var(--theme-bg-primary)] py-24 relative overflow-hidden dark:bg-[var(--theme-bg-primary)]">`
  - Variable: --theme-bg-primary (background)
  - Suggested replacement: `bg-cream dark:bg-navy`

- Line 15: `bg-[var(--theme-primary)]`
  - Line content: `bg-[var(--theme-primary)] animate-pulse hidden md:block dark:hidden"></div>`
  - Variable: --theme-primary (background)
  - Suggested replacement: `text-primary`

- Line 17: `bg-[var(--theme-accent-secondary-light)]`
  - Line content: `bg-[var(--theme-accent-secondary-light)] hidden md:block dark:hidden"></div>`
  - Variable: --theme-accent-secondary-light (background)
  - Suggested replacement: `unknown-class-for-theme-accent-secondary-light`

- Line 40: `bg-[var(--theme-bg-primary)]`
  - Line content: `<div className="col-span-4 rounded-xl p-6 border border-[rgba(0,0,0,0.03)] dark:border-theme-border-light-[2px_2px_8px_rgba(0,0,0,0.05)] shadow-theme- transition-all duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:translate-y-[-4px] hover:rotate-[0.5deg] hover:scale-[1.02] hover:shadow-[2px_2px_12px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_0_20px_rgba(53,115,128,0.2)] group relative overflow-hidden bg-[var(--theme-bg-primary)] ">`
  - Variable: --theme-bg-primary (background)
  - Suggested replacement: `bg-cream dark:bg-navy`

- Line 43: `bg-[var(--theme-accent-secondary-light)]`
  - Line content: `bg-[var(--theme-accent-secondary-light)] dark:hidden"></div>`
  - Variable: --theme-accent-secondary-light (background)
  - Suggested replacement: `unknown-class-for-theme-accent-secondary-light`

- Line 52: `bg-[var(--theme-accent-secondary)]`
  - Line content: `<div className="w-16 h-16 rounded-full flex items-center justify-center bg-[var(--theme-accent-secondary)]  shadow-[1px_1px_4px_rgba(0,0,0,0.1)] shadow-theme-">`
  - Variable: --theme-accent-secondary (background)
  - Suggested replacement: `text-secondary`

- Line 69: `bg-[var(--theme-primary-light)]`
  - Line content: `bg-[var(--theme-primary-light)] dark:hidden"></div>`
  - Variable: --theme-primary-light (background)
  - Suggested replacement: `text-primary-light`

- Line 78: `bg-[var(--theme-primary)]`
  - Line content: `<div className="w-16 h-16 rounded-full flex items-center justify-center bg-[var(--theme-primary)]  shadow-[1px_1px_4px_rgba(0,0,0,0.1)] shadow-theme-">`
  - Variable: --theme-primary (background)
  - Suggested replacement: `text-primary`

- Line 95: `bg-[var(--theme-primary-light)]`
  - Line content: `bg-[var(--theme-primary-light)] dark:hidden"></div>`
  - Variable: --theme-primary-light (background)
  - Suggested replacement: `text-primary-light`

- Line 104: `bg-[var(--theme-primary)]`
  - Line content: `<div className="w-16 h-16 rounded-full flex items-center justify-center bg-[var(--theme-primary)]  shadow-[1px_1px_4px_rgba(0,0,0,0.1)] shadow-theme-">`
  - Variable: --theme-primary (background)
  - Suggested replacement: `text-primary`

- Line 122: `bg-[var(--theme-accent-secondary-light)]`
  - Line content: `bg-[var(--theme-accent-secondary-light)] dark:hidden"></div>`
  - Variable: --theme-accent-secondary-light (background)
  - Suggested replacement: `unknown-class-for-theme-accent-secondary-light`

- Line 124: `bg-[var(--theme-accent-secondary)]`
  - Line content: `bg-[var(--theme-accent-secondary)] dark:hidden"></div>`
  - Variable: --theme-accent-secondary (background)
  - Suggested replacement: `text-secondary`

- Line 136: `bg-[var(--theme-accent-secondary)]`
  - Line content: `<div className="w-16 h-16 rounded-full flex items-center justify-center bg-[var(--theme-accent-secondary)]  shadow-[1px_1px_4px_rgba(0,0,0,0.1)] shadow-theme-">`
  - Variable: --theme-accent-secondary (background)
  - Suggested replacement: `text-secondary`

- Line 153: `bg-[var(--theme-accent-tertiary)]`
  - Line content: `bg-[var(--theme-accent-tertiary)] dark:hidden"></div>`
  - Variable: --theme-accent-tertiary (background)
  - Suggested replacement: `text-accent`

- Line 155: `bg-[var(--theme-accent-quaternary)]`
  - Line content: `bg-[var(--theme-accent-quaternary)] dark:hidden"></div>`
  - Variable: --theme-accent-quaternary (background)
  - Suggested replacement: `text-accent-red`

- Line 30: `text-[var(--theme-text-primary)]`
  - Line content: `<h2 className="text-[var(--theme-text-primary)] dark:text-theme-on-primary-4xl md:text-5xl font-bold mb-6">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 33: `text-[var(--theme-text-primary)]`
  - Line content: `<p className="text-[var(--theme-text-primary)] dark:text-theme-on-primary/70 text-xl max-w-3xl mx-auto">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 56: `text-[var(--theme-primary)]`
  - Line content: `<Zap className="size-8 text-[var(--theme-primary)] mb-3 transition-transform duration-300 group-hover:scale-110" />`
  - Variable: --theme-primary (text)
  - Suggested replacement: `text-primary`

- Line 57: `text-[var(--theme-text-primary)]`
  - Line content: `<h3 className="text-[var(--theme-text-primary)] text-2xl font-semibold mb-3 dark:text-theme-on-primary">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 60: `text-[var(--theme-text-primary)]`
  - Line content: `<p className="text-[var(--theme-text-primary)] dark:text-theme-on-primary/70">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 82: `text-[var(--theme-accent-secondary)]`
  - Line content: `<PieChart className="size-8 text-[var(--theme-accent-secondary)] mb-3 transition-transform duration-300 group-hover:scale-110" />`
  - Variable: --theme-accent-secondary (text)
  - Suggested replacement: `text-secondary`

- Line 83: `text-[var(--theme-text-primary)]`
  - Line content: `<h3 className="text-[var(--theme-text-primary)] text-2xl font-semibold mb-3 dark:text-theme-on-primary">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 86: `text-[var(--theme-text-primary)]`
  - Line content: `<p className="text-[var(--theme-text-primary)] dark:text-theme-on-primary/70">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 108: `text-[var(--theme-primary)]`
  - Line content: `<Globe className="size-8 text-[var(--theme-primary)] mb-3 transition-transform duration-300 group-hover:scale-110" />`
  - Variable: --theme-primary (text)
  - Suggested replacement: `text-primary`

- Line 109: `text-[var(--theme-text-primary)]`
  - Line content: `<h3 className="text-[var(--theme-text-primary)] text-2xl font-semibold mb-3 dark:text-theme-on-primary">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 112: `text-[var(--theme-text-primary)]`
  - Line content: `<p className="text-[var(--theme-text-primary)] dark:text-theme-on-primary/70">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 140: `text-[var(--theme-primary-hover)]`
  - Line content: `<VideoIcon className="size-8 text-[var(--theme-primary-hover)] mb-3 transition-transform duration-300 group-hover:scale-110" />`
  - Variable: --theme-primary-hover (text)
  - Suggested replacement: `unknown-class-for-theme-primary-hover`

- Line 141: `text-[var(--theme-text-primary)]`
  - Line content: `<h3 className="text-[var(--theme-text-primary)] text-2xl font-semibold mb-3 dark:text-theme-on-primary">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 144: `text-[var(--theme-text-primary)]`
  - Line content: `<p className="text-[var(--theme-text-primary)] dark:text-theme-on-primary/70">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 171: `text-[var(--theme-accent-tertiary)]`
  - Line content: `<Shield className="size-8 text-[var(--theme-accent-tertiary)] mb-3 transition-transform duration-300 group-hover:scale-110" />`
  - Variable: --theme-accent-tertiary (text)
  - Suggested replacement: `text-accent`

- Line 172: `text-[var(--theme-text-primary)]`
  - Line content: `<h3 className="text-[var(--theme-text-primary)] text-2xl font-semibold mb-3 dark:text-theme-on-primary">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 175: `text-[var(--theme-text-primary)]`
  - Line content: `<p className="text-[var(--theme-text-primary)] dark:text-theme-on-primary/70">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

## components/modals/VSSubmoduleModal.tsx (27 findings)

- Line 73: `bg-[var(--theme-primary)]`
  - Line content: `<div className="bg-white dark:bg-[var(--theme-primary)] rounded-full w-16 h-16 flex items-center justify-center shadow-md transform transition-transform group-hover:scale-110">`
  - Variable: --theme-primary (background)
  - Suggested replacement: `text-primary`

- Line 129: `bg-[var(--theme-bg-primary)]`
  - Line content: `<div className="bg-white/50 dark:bg-[var(--theme-bg-primary)]/50 rounded-[--border-radius-lg] overflow-hidden border border-[var(--theme-bg-secondary)]/30 dark:border-white/5">`
  - Variable: --theme-bg-primary (background)
  - Suggested replacement: `bg-cream dark:bg-navy`

- Line 139: `bg-[var(--theme-bg-primary)]`
  - Line content: `className={`p-4 flex items-center hover:bg-[var(--theme-bg-primary)]/30 dark:hover:bg-white/5 cursor-pointer transition-colors ${selectedSubmoduleId === submodule.id ? 'bg-[var(--theme-bg-primary)]/50 dark:bg-white/10' : ''}`}`
  - Variable: --theme-bg-primary (background)
  - Suggested replacement: `bg-cream dark:bg-navy`

- Line 139: `bg-[var(--theme-bg-primary)]`
  - Line content: `className={`p-4 flex items-center hover:bg-[var(--theme-bg-primary)]/30 dark:hover:bg-white/5 cursor-pointer transition-colors ${selectedSubmoduleId === submodule.id ? 'bg-[var(--theme-bg-primary)]/50 dark:bg-white/10' : ''}`}`
  - Variable: --theme-bg-primary (background)
  - Suggested replacement: `bg-cream dark:bg-navy`

- Line 163: `bg-[var(--theme-bg-secondary)]`
  - Line content: `<span className="ml-2 text-xs px-2 py-0.5 bg-[var(--theme-bg-secondary)]/30 dark:bg-white/10 rounded-full text-[var(--theme-text-primary)]/60 dark:text-white/60">`
  - Variable: --theme-bg-secondary (background)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 197: `bg-[var(--theme-accent-secondary)]`
  - Line content: `hover:bg-[var(--theme-accent-secondary)]/5 dark:hover:bg-white/5`
  - Variable: --theme-accent-secondary (background)
  - Suggested replacement: `text-secondary`

- Line 74: `text-[var(--theme-primary)]`
  - Line content: `<Play className="h-8 w-8 text-[var(--theme-primary)] dark:text-white fill-current ml-1" />`
  - Variable: --theme-primary (text)
  - Suggested replacement: `text-primary`

- Line 90: `text-[var(--theme-text-primary)]`
  - Line content: `<h3 className="text-[var(--theme-text-primary)] dark:text-white text-xl font-semibold mb-3">About This Module</h3>`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 91: `text-[var(--theme-text-primary)]`
  - Line content: `<p className="text-[var(--theme-text-primary)]/80 dark:text-white/70">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 98: `text-[var(--theme-primary)]`
  - Line content: `<div className="text-[var(--theme-primary)]  text-2xl font-bold mb-1">`
  - Variable: --theme-primary (text)
  - Suggested replacement: `text-primary`

- Line 101: `text-[var(--theme-text-primary)]`
  - Line content: `<div className="text-[var(--theme-text-primary)]/70 dark:text-white/60 text-sm">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 107: `text-[var(--theme-primary)]`
  - Line content: `<div className="text-[var(--theme-primary)]  text-2xl font-bold mb-1">`
  - Variable: --theme-primary (text)
  - Suggested replacement: `text-primary`

- Line 110: `text-[var(--theme-text-primary)]`
  - Line content: `<div className="text-[var(--theme-text-primary)]/70 dark:text-white/60 text-sm">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 116: `text-[var(--theme-primary)]`
  - Line content: `<div className="text-[var(--theme-primary)]  text-2xl font-bold mb-1">`
  - Variable: --theme-primary (text)
  - Suggested replacement: `text-primary`

- Line 119: `text-[var(--theme-text-primary)]`
  - Line content: `<div className="text-[var(--theme-text-primary)]/70 dark:text-white/60 text-sm">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 131: `text-[var(--theme-text-primary)]`
  - Line content: `<h3 className="text-[var(--theme-text-primary)] dark:text-white font-semibold">Module Content</h3>`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 142: `text-[var(--theme-primary)]`
  - Line content: `<div className="flex-shrink-0 mr-3 text-[var(--theme-primary)] ">`
  - Variable: --theme-primary (text)
  - Suggested replacement: `text-primary`

- Line 155: `text-[var(--theme-text-primary)]`
  - Line content: `<h4 className={`text-sm font-medium ${submodule.isLocked ? 'text-[var(--theme-text-primary)]/50 dark:text-white/40' : 'text-[var(--theme-text-primary)] dark:text-white'}`}>`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 155: `text-[var(--theme-text-primary)]`
  - Line content: `<h4 className={`text-sm font-medium ${submodule.isLocked ? 'text-[var(--theme-text-primary)]/50 dark:text-white/40' : 'text-[var(--theme-text-primary)] dark:text-white'}`}>`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 159: `text-[var(--theme-text-primary)]`
  - Line content: `<span className={`text-xs ${submodule.isLocked ? 'text-[var(--theme-text-primary)]/40 dark:text-white/30' : 'text-[var(--theme-text-primary)]/60 dark:text-white/50'}`}>`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 159: `text-[var(--theme-text-primary)]`
  - Line content: `<span className={`text-xs ${submodule.isLocked ? 'text-[var(--theme-text-primary)]/40 dark:text-white/30' : 'text-[var(--theme-text-primary)]/60 dark:text-white/50'}`}>`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 163: `text-[var(--theme-text-primary)]`
  - Line content: `<span className="ml-2 text-xs px-2 py-0.5 bg-[var(--theme-bg-secondary)]/30 dark:bg-white/10 rounded-full text-[var(--theme-text-primary)]/60 dark:text-white/60">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 194: `text-[var(--theme-accent-secondary)]`
  - Line content: `className="border border-[var(--theme-accent-secondary)] text-[var(--theme-accent-secondary)]`
  - Variable: --theme-accent-secondary (text)
  - Suggested replacement: `text-secondary`

- Line 129: `border-[var(--theme-bg-secondary)]`
  - Line content: `<div className="bg-white/50 dark:bg-[var(--theme-bg-primary)]/50 rounded-[--border-radius-lg] overflow-hidden border border-[var(--theme-bg-secondary)]/30 dark:border-white/5">`
  - Variable: --theme-bg-secondary (border)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 130: `border-[var(--theme-bg-secondary)]`
  - Line content: `<div className="p-4 border-b border-[var(--theme-bg-secondary)]/30 dark:border-white/5">`
  - Variable: --theme-bg-secondary (border)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

- Line 148: `border-[var(--theme-primary)]`
  - Line content: `<div className="w-5 h-5 rounded-full border-2 border-[var(--theme-primary)]  flex items-center justify-center">`
  - Variable: --theme-primary (border)
  - Suggested replacement: `text-primary`

- Line 194: `border-[var(--theme-accent-secondary)]`
  - Line content: `className="border border-[var(--theme-accent-secondary)] text-[var(--theme-accent-secondary)]`
  - Variable: --theme-accent-secondary (border)
  - Suggested replacement: `text-secondary`

## components/modals/VSModalExamples.tsx (1 findings)

- Line 144: `bg-[var(--theme-primary)]`
  - Line content: `className="border border-theme-primary text-theme-primary hover:bg-[var(--theme-primary)]/10 px-4 py-2 rounded-full hover-bubbly-sm w-full"`
  - Variable: --theme-primary (background)
  - Suggested replacement: `text-primary`

## components/modals/VSApplicationModal.tsx (2 findings)

- Line 124: `bg-[var(--theme-float-bg-primary)]`
  - Line content: `bg-[var(--theme-float-bg-primary)]`
  - Variable: --theme-float-bg-primary (background)
  - Suggested replacement: `unknown-class-for-theme-float-bg-primary`

- Line 128: `bg-[var(--theme-float-bg-secondary)]`
  - Line content: `bg-[var(--theme-float-bg-secondary)]`
  - Variable: --theme-float-bg-secondary (background)
  - Suggested replacement: `unknown-class-for-theme-float-bg-secondary`

## components/modals/TimelineModal.tsx (5 findings)

- Line 144: `bg-[var(--theme-float-bg-primary)]`
  - Line content: `bg-[var(--theme-float-bg-primary)]"></div>`
  - Variable: --theme-float-bg-primary (background)
  - Suggested replacement: `unknown-class-for-theme-float-bg-primary`

- Line 148: `bg-[var(--theme-float-bg-secondary)]`
  - Line content: `bg-[var(--theme-float-bg-secondary)]"></div>`
  - Variable: --theme-float-bg-secondary (background)
  - Suggested replacement: `unknown-class-for-theme-float-bg-secondary`

- Line 246: `bg-[--hud-accent-red]`
  - Line content: `<span className="ml-2 text-xs px-2 py-0.5 bg-[--hud-accent-red]/10 text-[--hud-accent-red] rounded-full">`
  - Variable: --hud-accent-red (background)
  - Suggested replacement: `unknown-class-for-hud-accent-red`

- Line 163: `text-[--hud-accent-red]`
  - Line content: `<div className="flex items-center mt-1 text-[--hud-accent-red]">`
  - Variable: --hud-accent-red (text)
  - Suggested replacement: `unknown-class-for-hud-accent-red`

- Line 246: `text-[--hud-accent-red]`
  - Line content: `<span className="ml-2 text-xs px-2 py-0.5 bg-[--hud-accent-red]/10 text-[--hud-accent-red] rounded-full">`
  - Variable: --hud-accent-red (text)
  - Suggested replacement: `unknown-class-for-hud-accent-red`

## components/modals/OrderDetailsModal.tsx (6 findings)

- Line 63: `bg-[var(--theme-border-primary)]`
  - Line content: `<TimelineConnector className="bg-[var(--theme-border-primary)]" />`
  - Variable: --theme-border-primary (background)
  - Suggested replacement: `unknown-class-for-theme-border-primary`

- Line 79: `bg-[var(--theme-border-primary)]`
  - Line content: `<TimelineConnector className="bg-[var(--theme-border-primary)]" />`
  - Variable: --theme-border-primary (background)
  - Suggested replacement: `unknown-class-for-theme-border-primary`

- Line 95: `bg-[var(--theme-border-primary)]`
  - Line content: `<TimelineConnector className="bg-[var(--theme-border-primary)]" />`
  - Variable: --theme-border-primary (background)
  - Suggested replacement: `unknown-class-for-theme-border-primary`

- Line 42: `border-[var(--theme-border-light)]`
  - Line content: `className="bg-theme-gradient-card border border-[var(--theme-border-light)] shadow-theme-md"`
  - Variable: --theme-border-light (border)
  - Suggested replacement: `unknown-class-for-theme-border-light`

- Line 44: `border-[var(--theme-border-light)]`
  - Line content: `<DialogHeader className="relative m-0 block p-6 border-b border-[var(--theme-border-light)]">`
  - Variable: --theme-border-light (border)
  - Suggested replacement: `unknown-class-for-theme-border-light`

- Line 112: `border-[var(--theme-border-light)]`
  - Line content: `<DialogFooter className="border-t border-[var(--theme-border-light)]">`
  - Variable: --theme-border-light (border)
  - Suggested replacement: `unknown-class-for-theme-border-light`

## components/modals/ModalsImplementation.tsx (2 findings)

- Line 144: `bg-[var(--theme-float-bg-primary)]`
  - Line content: `<div className="floating-element absolute top-40 left-[10%] w-32 h-32 rounded-[40%] rotate-12 opacity-[var(--theme-float-opacity)] bg-[var(--theme-float-bg-primary)]"></div>`
  - Variable: --theme-float-bg-primary (background)
  - Suggested replacement: `unknown-class-for-theme-float-bg-primary`

- Line 145: `bg-[var(--theme-float-bg-secondary)]`
  - Line content: `<div className="floating-element absolute bottom-60 right-[10%] w-48 h-48 rounded-[30%] -rotate-6 opacity-[var(--theme-float-opacity-secondary)] bg-[var(--theme-float-bg-secondary)]"></div>`
  - Variable: --theme-float-bg-secondary (background)
  - Suggested replacement: `unknown-class-for-theme-float-bg-secondary`

## components/marble-buttons/AnimatedButtonsDemo.tsx (6 findings)

- Line 10: `bg-[var(--theme-bg-primary)]`
  - Line content: `bg-[var(--theme-bg-primary)] text-[var(--theme-text-primary)] dark:bg-[var(--theme-bg-primary)] dark:text-[var(--theme-text-secondary)]`
  - Variable: --theme-bg-primary (background)
  - Suggested replacement: `bg-cream dark:bg-navy`

- Line 10: `bg-[var(--theme-bg-primary)]`
  - Line content: `bg-[var(--theme-bg-primary)] text-[var(--theme-text-primary)] dark:bg-[var(--theme-bg-primary)] dark:text-[var(--theme-text-secondary)]`
  - Variable: --theme-bg-primary (background)
  - Suggested replacement: `bg-cream dark:bg-navy`

- Line 16: `bg-[var(--theme-primary)]`
  - Line content: `bg-[var(--theme-primary)] text-theme-on-primary-medium`
  - Variable: --theme-primary (background)
  - Suggested replacement: `text-primary`

- Line 17: `bg-[var(--theme-primary-hover)]`
  - Line content: `hover:bg-[var(--theme-primary-hover)] transition-colors"`
  - Variable: --theme-primary-hover (background)
  - Suggested replacement: `unknown-class-for-theme-primary-hover`

- Line 10: `text-[var(--theme-text-primary)]`
  - Line content: `bg-[var(--theme-bg-primary)] text-[var(--theme-text-primary)] dark:bg-[var(--theme-bg-primary)] dark:text-[var(--theme-text-secondary)]`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 10: `text-[var(--theme-text-secondary)]`
  - Line content: `bg-[var(--theme-bg-primary)] text-[var(--theme-text-primary)] dark:bg-[var(--theme-bg-primary)] dark:text-[var(--theme-text-secondary)]`
  - Variable: --theme-text-secondary (text)
  - Suggested replacement: `unknown-class-for-theme-text-secondary`

## components/marble-buttons/AnimatedButton.tsx (1 findings)

- Line 240: `bg-[var(--theme-bg-primary)]`
  - Line content: `${variant === "docs" ? "hover:bg-[var(--theme-bg-primary)]/10 focus:ring-theme-primary"`
  - Variable: --theme-bg-primary (background)
  - Suggested replacement: `bg-cream dark:bg-navy`

## components/logos/AnimatedLogo.tsx (4 findings)

- Line 195: `text-[var(--theme-accent-secondary)]`
  - Line content: `fill="[var(--secondary-200)]" className="dashed-path text-[var(--theme-accent-secondary)] " />`
  - Variable: --theme-accent-secondary (text)
  - Suggested replacement: `text-secondary`

- Line 199: `text-[var(--theme-accent-secondary)]`
  - Line content: `fill="[var(--secondary-200)]" className="dashed-path text-[var(--theme-accent-secondary)] " />`
  - Variable: --theme-accent-secondary (text)
  - Suggested replacement: `text-secondary`

- Line 203: `text-[var(--theme-accent-secondary)]`
  - Line content: `fill="[var(--secondary-200)]" className="dashed-path text-[var(--theme-accent-secondary)] " />`
  - Variable: --theme-accent-secondary (text)
  - Suggested replacement: `text-secondary`

- Line 207: `text-[var(--theme-accent-secondary)]`
  - Line content: `fill="[var(--secondary-200)]" className="dashed-path text-[var(--theme-accent-secondary)] " />`
  - Variable: --theme-accent-secondary (text)
  - Suggested replacement: `text-secondary`

## components/hero/SimpleHero.tsx (7 findings)

- Line 115: `bg-[var(--theme-float-bg-primary)]`
  - Line content: `bg-[var(--theme-float-bg-primary)]`
  - Variable: --theme-float-bg-primary (background)
  - Suggested replacement: `unknown-class-for-theme-float-bg-primary`

- Line 119: `bg-[var(--theme-float-bg-secondary)]`
  - Line content: `bg-[var(--theme-float-bg-secondary)]`
  - Variable: --theme-float-bg-secondary (background)
  - Suggested replacement: `unknown-class-for-theme-float-bg-secondary`

- Line 133: `bg-[var(--theme-accent-secondary)]`
  - Line content: `<div style={{ gridColumn: '5 / 6', gridRow: '1 / 3' }} className="w-full h-full bg-[var(--theme-accent-secondary)] z-10" /> {/* Teal block */}`
  - Variable: --theme-accent-secondary (background)
  - Suggested replacement: `text-secondary`

- Line 134: `bg-[var(--theme-primary)]`
  - Line content: `<div style={{ gridColumn: '6 / 8', gridRow: '1 / 4' }} className="w-full h-full bg-[var(--theme-primary)] z-10" /> {/* Orange block */}`
  - Variable: --theme-primary (background)
  - Suggested replacement: `text-primary`

- Line 135: `bg-[var(--theme-accent-coral)]`
  - Line content: `<div style={{ gridColumn: '8 / 10', gridRow: '1 / 5' }} className="w-full h-full bg-[var(--theme-accent-coral)] z-10" /> {/* Red block */}`
  - Variable: --theme-accent-coral (background)
  - Suggested replacement: `unknown-class-for-theme-accent-coral`

- Line 234: `text-[var(--theme-accent-coral)]`
  - Line content: `<span className="font-medium text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-[var(--theme-accent-coral)] transition-all duration-500">`
  - Variable: --theme-accent-coral (text)
  - Suggested replacement: `unknown-class-for-theme-accent-coral`

- Line 248: `text-[var(--theme-accent-coral)]`
  - Line content: `<span className="text-[var(--theme-accent-coral)] font-bold">proven, turn-key system </span>`
  - Variable: --theme-accent-coral (text)
  - Suggested replacement: `unknown-class-for-theme-accent-coral`

## components/funModal/InputWithClearButton.tsx (2 findings)

- Line 41: `border-[var(--theme-border-light)]`
  - Line content: `className="w-full px-4 py-2 border border-[var(--theme-border-light)] rounded-md bg-theme-surface text-theme-primary focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] focus:border-[var(--theme-primary)]"`
  - Variable: --theme-border-light (border)
  - Suggested replacement: `unknown-class-for-theme-border-light`

- Line 41: `border-[var(--theme-primary)]`
  - Line content: `className="w-full px-4 py-2 border border-[var(--theme-border-light)] rounded-md bg-theme-surface text-theme-primary focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] focus:border-[var(--theme-primary)]"`
  - Variable: --theme-primary (border)
  - Suggested replacement: `text-primary`

## components/form/form-shadcn-claude.tsx (2 findings)

- Line 121: `text-[var(--theme-text-primary)]`
  - Line content: `<h3 className="text-xl font-semibold text-[var(--theme-text-primary)] dark:text-theme-on-primary-b pb-2 border-[var(--theme-bg-secondary)]/20 dark:border-theme-border-light">Personal Information</h3>`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 121: `border-[var(--theme-bg-secondary)]`
  - Line content: `<h3 className="text-xl font-semibold text-[var(--theme-text-primary)] dark:text-theme-on-primary-b pb-2 border-[var(--theme-bg-secondary)]/20 dark:border-theme-border-light">Personal Information</h3>`
  - Variable: --theme-bg-secondary (border)
  - Suggested replacement: `bg-cream-darker dark:bg-navy-darker`

## components/Calendly/CalendlyInlineWidget.tsx (6 findings)

- Line 113: `bg-[var(--theme-bg-primary)]`
  - Line content: `return 'bg-[var(--theme-bg-primary)]';`
  - Variable: --theme-bg-primary (background)
  - Suggested replacement: `bg-cream dark:bg-navy`

- Line 157: `text-[var(--theme-text-secondary)]`
  - Line content: `<div className="text-[var(--theme-text-secondary)] text-sm mb-2 uppercase tracking-wide font-medium">`
  - Variable: --theme-text-secondary (text)
  - Suggested replacement: `unknown-class-for-theme-text-secondary`

- Line 162: `text-[var(--theme-text-primary)]`
  - Line content: `<h2 className="text-[var(--theme-text-primary)] text-2xl md:text-3xl font-bold mb-4">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 152: `border-[var(--theme-border-light)]`
  - Line content: `${cardStyle !== 'borderless' ? 'border border-[var(--theme-border-light)]' : ''}`
  - Variable: --theme-border-light (border)
  - Suggested replacement: `unknown-class-for-theme-border-light`

- Line 135: `bg-[--primary-orange]`
  - Line content: `bg-[--primary-orange] animate-float-slow hidden dark:hidden"></div>`
  - Variable: --primary-orange (background)
  - Suggested replacement: `text-primary`

- Line 137: `bg-[--secondary-teal-light]`
  - Line content: `bg-[--secondary-teal-light] animate-float-medium hidden dark:hidden"></div>`
  - Variable: --secondary-teal-light (background)
  - Suggested replacement: `text-secondary-light`

## components/Calendly/CalendlyDemo.tsx (85 findings)

- Line 34: `text-[var(--theme-accent-secondary)]`
  - Line content: `<div className="text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] font-medium mb-3 uppercase tracking-wide text-sm">`
  - Variable: --theme-accent-secondary (text)
  - Suggested replacement: `text-secondary`

- Line 34: `text-[var(--theme-accent-secondary-light)]`
  - Line content: `<div className="text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] font-medium mb-3 uppercase tracking-wide text-sm">`
  - Variable: --theme-accent-secondary-light (text)
  - Suggested replacement: `unknown-class-for-theme-accent-secondary-light`

- Line 38: `text-[var(--theme-text-primary)]`
  - Line content: `<h1 className="text-[var(--theme-text-primary)] dark:text-white text-4xl md:text-5xl font-bold mb-6">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 42: `text-[var(--theme-text-secondary)]`
  - Line content: `<p className="text-[var(--theme-text-secondary)] dark:text-white/70 text-lg mb-8 max-w-2xl mx-auto">`
  - Variable: --theme-text-secondary (text)
  - Suggested replacement: `unknown-class-for-theme-text-secondary`

- Line 68: `text-[var(--theme-text-primary)]`
  - Line content: `<h2 className="text-[var(--theme-text-primary)] dark:text-white text-3xl md:text-4xl font-bold mb-8 text-center">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 78: `text-[var(--theme-text-primary)]`
  - Line content: `<h3 className="text-[var(--theme-text-primary)] dark:text-white text-xl font-semibold mb-6">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 85: `text-[var(--theme-text-secondary)]`
  - Line content: `<span className="text-xs text-[var(--theme-text-secondary)] dark:text-white/70">Default</span>`
  - Variable: --theme-text-secondary (text)
  - Suggested replacement: `unknown-class-for-theme-text-secondary`

- Line 89: `text-[var(--theme-text-secondary)]`
  - Line content: `<span className="text-xs text-[var(--theme-text-secondary)] dark:text-white/70">Secondary</span>`
  - Variable: --theme-text-secondary (text)
  - Suggested replacement: `unknown-class-for-theme-text-secondary`

- Line 93: `text-[var(--theme-text-secondary)]`
  - Line content: `<span className="text-xs text-[var(--theme-text-secondary)] dark:text-white/70">Vibrant</span>`
  - Variable: --theme-text-secondary (text)
  - Suggested replacement: `unknown-class-for-theme-text-secondary`

- Line 97: `text-[var(--theme-text-secondary)]`
  - Line content: `<span className="text-xs text-[var(--theme-text-secondary)] dark:text-white/70">Outline</span>`
  - Variable: --theme-text-secondary (text)
  - Suggested replacement: `unknown-class-for-theme-text-secondary`

- Line 101: `text-[var(--theme-text-secondary)]`
  - Line content: `<span className="text-xs text-[var(--theme-text-secondary)] dark:text-white/70">Subtle</span>`
  - Variable: --theme-text-secondary (text)
  - Suggested replacement: `unknown-class-for-theme-text-secondary`

- Line 105: `text-[var(--theme-text-secondary)]`
  - Line content: `<span className="text-xs text-[var(--theme-text-secondary)] dark:text-white/70">Destructive</span>`
  - Variable: --theme-text-secondary (text)
  - Suggested replacement: `unknown-class-for-theme-text-secondary`

- Line 109: `text-[var(--theme-text-primary)]`
  - Line content: `<h3 className="text-[var(--theme-text-primary)] dark:text-white text-xl font-semibold mb-6">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 116: `text-[var(--theme-text-secondary)]`
  - Line content: `<span className="text-xs text-[var(--theme-text-secondary)] dark:text-white/70">Extra Small</span>`
  - Variable: --theme-text-secondary (text)
  - Suggested replacement: `unknown-class-for-theme-text-secondary`

- Line 120: `text-[var(--theme-text-secondary)]`
  - Line content: `<span className="text-xs text-[var(--theme-text-secondary)] dark:text-white/70">Small</span>`
  - Variable: --theme-text-secondary (text)
  - Suggested replacement: `unknown-class-for-theme-text-secondary`

- Line 124: `text-[var(--theme-text-secondary)]`
  - Line content: `<span className="text-xs text-[var(--theme-text-secondary)] dark:text-white/70">Default</span>`
  - Variable: --theme-text-secondary (text)
  - Suggested replacement: `unknown-class-for-theme-text-secondary`

- Line 128: `text-[var(--theme-text-secondary)]`
  - Line content: `<span className="text-xs text-[var(--theme-text-secondary)] dark:text-white/70">Large</span>`
  - Variable: --theme-text-secondary (text)
  - Suggested replacement: `unknown-class-for-theme-text-secondary`

- Line 132: `text-[var(--theme-text-secondary)]`
  - Line content: `<span className="text-xs text-[var(--theme-text-secondary)] dark:text-white/70">Extra Large</span>`
  - Variable: --theme-text-secondary (text)
  - Suggested replacement: `unknown-class-for-theme-text-secondary`

- Line 136: `text-[var(--theme-text-primary)]`
  - Line content: `<h3 className="text-[var(--theme-text-primary)] dark:text-white text-xl font-semibold mb-6">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 150: `text-[var(--theme-text-secondary)]`
  - Line content: `<span className="text-xs text-[var(--theme-text-secondary)] dark:text-white/70">Icon at Start</span>`
  - Variable: --theme-text-secondary (text)
  - Suggested replacement: `unknown-class-for-theme-text-secondary`

- Line 160: `text-[var(--theme-text-secondary)]`
  - Line content: `<span className="text-xs text-[var(--theme-text-secondary)] dark:text-white/70">No Icon</span>`
  - Variable: --theme-text-secondary (text)
  - Suggested replacement: `unknown-class-for-theme-text-secondary`

- Line 171: `text-[var(--theme-text-secondary)]`
  - Line content: `<span className="text-xs text-[var(--theme-text-secondary)] dark:text-white/70">Icon at End</span>`
  - Variable: --theme-text-secondary (text)
  - Suggested replacement: `unknown-class-for-theme-text-secondary`

- Line 175: `text-[var(--theme-text-primary)]`
  - Line content: `<h3 className="text-[var(--theme-text-primary)] dark:text-white text-xl font-semibold mb-6">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 186: `text-[var(--theme-text-secondary)]`
  - Line content: `<span className="text-xs text-[var(--theme-text-secondary)] dark:text-white/70">Custom Button</span>`
  - Variable: --theme-text-secondary (text)
  - Suggested replacement: `unknown-class-for-theme-text-secondary`

- Line 193: `text-[var(--theme-text-primary)]`
  - Line content: `<span className="text-[var(--theme-text-primary)] dark:text-white font-medium">Book Appointment</span>`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 196: `text-[var(--theme-text-secondary)]`
  - Line content: `<span className="text-xs text-[var(--theme-text-secondary)] dark:text-white/70">Card Trigger</span>`
  - Variable: --theme-text-secondary (text)
  - Suggested replacement: `unknown-class-for-theme-text-secondary`

- Line 205: `text-[var(--theme-text-secondary)]`
  - Line content: `<span className="text-xs text-[var(--theme-text-secondary)] dark:text-white/70">Text Link</span>`
  - Variable: --theme-text-secondary (text)
  - Suggested replacement: `unknown-class-for-theme-text-secondary`

- Line 216: `text-[var(--theme-text-primary)]`
  - Line content: `<h2 className="text-[var(--theme-text-primary)] dark:text-white text-3xl md:text-4xl font-bold mb-8 text-center">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 223: `text-[var(--theme-text-primary)]`
  - Line content: `<h3 className="text-[var(--theme-text-primary)] dark:text-white text-xl font-semibold mb-4">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 239: `text-[var(--theme-text-primary)]`
  - Line content: `<h3 className="text-[var(--theme-text-primary)] dark:text-white text-xl font-semibold mb-4">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 258: `text-[var(--theme-text-primary)]`
  - Line content: `<h3 className="text-[var(--theme-text-primary)] dark:text-white text-xl font-semibold mb-4">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 275: `text-[var(--theme-text-primary)]`
  - Line content: `<h3 className="text-[var(--theme-text-primary)] dark:text-white text-xl font-semibold mb-4">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 292: `text-[var(--theme-text-primary)]`
  - Line content: `<h3 className="text-[var(--theme-text-primary)] dark:text-white text-xl font-semibold mb-4 text-center">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 316: `text-[var(--theme-text-primary)]`
  - Line content: `<h2 className="text-[var(--theme-text-primary)] dark:text-white text-3xl md:text-4xl font-bold mb-4">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 319: `text-[var(--theme-text-secondary)]`
  - Line content: `<p className="text-[var(--theme-text-secondary)] dark:text-white/70">`
  - Variable: --theme-text-secondary (text)
  - Suggested replacement: `unknown-class-for-theme-text-secondary`

- Line 332: `text-[var(--theme-text-primary)]`
  - Line content: `<h3 className="text-[var(--theme-text-primary)] dark:text-white text-xl font-semibold mb-4 flex items-center">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 338: `text-[var(--theme-text-secondary)]`
  - Line content: `<ul className="text-[var(--theme-text-secondary)] dark:text-white/70 space-y-2">`
  - Variable: --theme-text-secondary (text)
  - Suggested replacement: `unknown-class-for-theme-text-secondary`

- Line 340: `text-[var(--theme-accent-secondary)]`
  - Line content: `<CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />`
  - Variable: --theme-accent-secondary (text)
  - Suggested replacement: `text-secondary`

- Line 340: `text-[var(--theme-accent-secondary-light)]`
  - Line content: `<CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />`
  - Variable: --theme-accent-secondary-light (text)
  - Suggested replacement: `unknown-class-for-theme-accent-secondary-light`

- Line 344: `text-[var(--theme-accent-secondary)]`
  - Line content: `<CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />`
  - Variable: --theme-accent-secondary (text)
  - Suggested replacement: `text-secondary`

- Line 344: `text-[var(--theme-accent-secondary-light)]`
  - Line content: `<CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />`
  - Variable: --theme-accent-secondary-light (text)
  - Suggested replacement: `unknown-class-for-theme-accent-secondary-light`

- Line 348: `text-[var(--theme-accent-secondary)]`
  - Line content: `<CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />`
  - Variable: --theme-accent-secondary (text)
  - Suggested replacement: `text-secondary`

- Line 348: `text-[var(--theme-accent-secondary-light)]`
  - Line content: `<CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />`
  - Variable: --theme-accent-secondary-light (text)
  - Suggested replacement: `unknown-class-for-theme-accent-secondary-light`

- Line 352: `text-[var(--theme-accent-secondary)]`
  - Line content: `<CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />`
  - Variable: --theme-accent-secondary (text)
  - Suggested replacement: `text-secondary`

- Line 352: `text-[var(--theme-accent-secondary-light)]`
  - Line content: `<CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />`
  - Variable: --theme-accent-secondary-light (text)
  - Suggested replacement: `unknown-class-for-theme-accent-secondary-light`

- Line 356: `text-[var(--theme-accent-secondary)]`
  - Line content: `<CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />`
  - Variable: --theme-accent-secondary (text)
  - Suggested replacement: `text-secondary`

- Line 356: `text-[var(--theme-accent-secondary-light)]`
  - Line content: `<CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />`
  - Variable: --theme-accent-secondary-light (text)
  - Suggested replacement: `unknown-class-for-theme-accent-secondary-light`

- Line 360: `text-[var(--theme-accent-secondary)]`
  - Line content: `<CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />`
  - Variable: --theme-accent-secondary (text)
  - Suggested replacement: `text-secondary`

- Line 360: `text-[var(--theme-accent-secondary-light)]`
  - Line content: `<CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />`
  - Variable: --theme-accent-secondary-light (text)
  - Suggested replacement: `unknown-class-for-theme-accent-secondary-light`

- Line 364: `text-[var(--theme-accent-secondary)]`
  - Line content: `<CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />`
  - Variable: --theme-accent-secondary (text)
  - Suggested replacement: `text-secondary`

- Line 364: `text-[var(--theme-accent-secondary-light)]`
  - Line content: `<CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />`
  - Variable: --theme-accent-secondary-light (text)
  - Suggested replacement: `unknown-class-for-theme-accent-secondary-light`

- Line 368: `text-[var(--theme-accent-secondary)]`
  - Line content: `<CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />`
  - Variable: --theme-accent-secondary (text)
  - Suggested replacement: `text-secondary`

- Line 368: `text-[var(--theme-accent-secondary-light)]`
  - Line content: `<CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />`
  - Variable: --theme-accent-secondary-light (text)
  - Suggested replacement: `unknown-class-for-theme-accent-secondary-light`

- Line 381: `text-[var(--theme-text-primary)]`
  - Line content: `<h3 className="text-[var(--theme-text-primary)] dark:text-white text-xl font-semibold mb-4 flex items-center">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 387: `text-[var(--theme-text-secondary)]`
  - Line content: `<ul className="text-[var(--theme-text-secondary)] dark:text-white/70 space-y-2">`
  - Variable: --theme-text-secondary (text)
  - Suggested replacement: `unknown-class-for-theme-text-secondary`

- Line 389: `text-[var(--theme-accent-secondary)]`
  - Line content: `<CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />`
  - Variable: --theme-accent-secondary (text)
  - Suggested replacement: `text-secondary`

- Line 389: `text-[var(--theme-accent-secondary-light)]`
  - Line content: `<CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />`
  - Variable: --theme-accent-secondary-light (text)
  - Suggested replacement: `unknown-class-for-theme-accent-secondary-light`

- Line 393: `text-[var(--theme-accent-secondary)]`
  - Line content: `<CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />`
  - Variable: --theme-accent-secondary (text)
  - Suggested replacement: `text-secondary`

- Line 393: `text-[var(--theme-accent-secondary-light)]`
  - Line content: `<CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />`
  - Variable: --theme-accent-secondary-light (text)
  - Suggested replacement: `unknown-class-for-theme-accent-secondary-light`

- Line 397: `text-[var(--theme-accent-secondary)]`
  - Line content: `<CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />`
  - Variable: --theme-accent-secondary (text)
  - Suggested replacement: `text-secondary`

- Line 397: `text-[var(--theme-accent-secondary-light)]`
  - Line content: `<CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />`
  - Variable: --theme-accent-secondary-light (text)
  - Suggested replacement: `unknown-class-for-theme-accent-secondary-light`

- Line 401: `text-[var(--theme-accent-secondary)]`
  - Line content: `<CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />`
  - Variable: --theme-accent-secondary (text)
  - Suggested replacement: `text-secondary`

- Line 401: `text-[var(--theme-accent-secondary-light)]`
  - Line content: `<CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />`
  - Variable: --theme-accent-secondary-light (text)
  - Suggested replacement: `unknown-class-for-theme-accent-secondary-light`

- Line 405: `text-[var(--theme-accent-secondary)]`
  - Line content: `<CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />`
  - Variable: --theme-accent-secondary (text)
  - Suggested replacement: `text-secondary`

- Line 405: `text-[var(--theme-accent-secondary-light)]`
  - Line content: `<CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />`
  - Variable: --theme-accent-secondary-light (text)
  - Suggested replacement: `unknown-class-for-theme-accent-secondary-light`

- Line 409: `text-[var(--theme-accent-secondary)]`
  - Line content: `<CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />`
  - Variable: --theme-accent-secondary (text)
  - Suggested replacement: `text-secondary`

- Line 409: `text-[var(--theme-accent-secondary-light)]`
  - Line content: `<CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />`
  - Variable: --theme-accent-secondary-light (text)
  - Suggested replacement: `unknown-class-for-theme-accent-secondary-light`

- Line 413: `text-[var(--theme-accent-secondary)]`
  - Line content: `<CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />`
  - Variable: --theme-accent-secondary (text)
  - Suggested replacement: `text-secondary`

- Line 413: `text-[var(--theme-accent-secondary-light)]`
  - Line content: `<CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />`
  - Variable: --theme-accent-secondary-light (text)
  - Suggested replacement: `unknown-class-for-theme-accent-secondary-light`

- Line 417: `text-[var(--theme-accent-secondary)]`
  - Line content: `<CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />`
  - Variable: --theme-accent-secondary (text)
  - Suggested replacement: `text-secondary`

- Line 417: `text-[var(--theme-accent-secondary-light)]`
  - Line content: `<CheckIcon className="w-5 h-5 text-[var(--theme-accent-secondary)] dark:text-[var(--theme-accent-secondary-light)] mt-1 flex-shrink-0" />`
  - Variable: --theme-accent-secondary-light (text)
  - Suggested replacement: `unknown-class-for-theme-accent-secondary-light`

- Line 432: `text-[var(--theme-text-primary)]`
  - Line content: `<h2 className="text-[var(--theme-text-primary)] dark:text-white text-3xl font-bold mb-4">`
  - Variable: --theme-text-primary (text)
  - Suggested replacement: `unknown-class-for-theme-text-primary`

- Line 435: `text-[var(--theme-text-secondary)]`
  - Line content: `<p className="text-[var(--theme-text-secondary)] dark:text-white/70">`
  - Variable: --theme-text-secondary (text)
  - Suggested replacement: `unknown-class-for-theme-text-secondary`

- Line 20: `bg-[--primary-orange]`
  - Line content: `bg-[--primary-orange] animate-float-slow hidden dark:hidden"></div>`
  - Variable: --primary-orange (background)
  - Suggested replacement: `text-primary`

- Line 22: `bg-[--secondary-teal-light]`
  - Line content: `bg-[--secondary-teal-light] animate-float-medium hidden dark:hidden"></div>`
  - Variable: --secondary-teal-light (background)
  - Suggested replacement: `text-secondary-light`

- Line 191: `bg-[--bg-navy]`
  - Line content: `<div className="cursor-pointer flex flex-col items-center bg-white dark:bg-[--bg-navy] p-4 rounded-lg shadow-md border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow">`
  - Variable: --bg-navy (background)
  - Suggested replacement: `bg-navy`

- Line 326: `bg-[--bg-navy]`
  - Line content: `<div className="bg-white/80 dark:bg-[--bg-navy]/60`
  - Variable: --bg-navy (background)
  - Suggested replacement: `bg-navy`

- Line 375: `bg-[--bg-navy]`
  - Line content: `<div className="bg-white/80 dark:bg-[--bg-navy]/60`
  - Variable: --bg-navy (background)
  - Suggested replacement: `bg-navy`

- Line 192: `text-[--primary-orange]`
  - Line content: `<CalendarIcon className="w-8 h-8 text-[--primary-orange] mb-2" />`
  - Variable: --primary-orange (text)
  - Suggested replacement: `text-primary`

- Line 201: `text-[--primary-orange]`
  - Line content: `<span className="cursor-pointer text-[--primary-orange] dark:text-[--primary-orange-light] underline hover:text-[--primary-orange-hover] dark:hover:text-[--primary-orange]">`
  - Variable: --primary-orange (text)
  - Suggested replacement: `text-primary`

- Line 201: `text-[--primary-orange-light]`
  - Line content: `<span className="cursor-pointer text-[--primary-orange] dark:text-[--primary-orange-light] underline hover:text-[--primary-orange-hover] dark:hover:text-[--primary-orange]">`
  - Variable: --primary-orange-light (text)
  - Suggested replacement: `text-primary-light`

- Line 201: `text-[--primary-orange-hover]`
  - Line content: `<span className="cursor-pointer text-[--primary-orange] dark:text-[--primary-orange-light] underline hover:text-[--primary-orange-hover] dark:hover:text-[--primary-orange]">`
  - Variable: --primary-orange-hover (text)
  - Suggested replacement: `text-primary-hover`

- Line 201: `text-[--primary-orange]`
  - Line content: `<span className="cursor-pointer text-[--primary-orange] dark:text-[--primary-orange-light] underline hover:text-[--primary-orange-hover] dark:hover:text-[--primary-orange]">`
  - Variable: --primary-orange (text)
  - Suggested replacement: `text-primary`

- Line 333: `text-[--primary-orange]`
  - Line content: `<svg className="w-5 h-5 mr-2 text-[--primary-orange]" fill="none" viewBox="0 0 24 24" stroke="currentColor">`
  - Variable: --primary-orange (text)
  - Suggested replacement: `text-primary`

- Line 382: `text-[--primary-orange]`
  - Line content: `<svg className="w-5 h-5 mr-2 text-[--primary-orange]" fill="none" viewBox="0 0 24 24" stroke="currentColor">`
  - Variable: --primary-orange (text)
  - Suggested replacement: `text-primary`

## Qualification_components/qualification-modal.tsx (17 findings)

- Line 1527: `bg-[var(--theme-float-bg-primary)]`
  - Line content: `<div className="modal-floating-element absolute top-10 right-10 -z-10 w-20 h-20 rounded-[40%] rotate-12 opacity-[var(--theme-float-opacity)] bg-[var(--theme-float-bg-primary)]"></div>`
  - Variable: --theme-float-bg-primary (background)
  - Suggested replacement: `unknown-class-for-theme-float-bg-primary`

- Line 1528: `bg-[var(--theme-float-bg-secondary)]`
  - Line content: `<div className="modal-floating-element absolute bottom-10 left-10 -z-10 w-24 h-24 rounded-[30%] -rotate-6 opacity-[var(--theme-float-opacity-secondary)] bg-[var(--theme-float-bg-secondary)]"></div>`
  - Variable: --theme-float-bg-secondary (background)
  - Suggested replacement: `unknown-class-for-theme-float-bg-secondary`

- Line 2282: `bg-[var(--theme-primary)]`
  - Line content: `className="flex items-center gap-2 px-6 py-2 rounded-lg transition-colors hover-bubbly-sm text-theme-primary bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-hover)] text-white"`
  - Variable: --theme-primary (background)
  - Suggested replacement: `text-primary`

- Line 2282: `bg-[var(--theme-primary-hover)]`
  - Line content: `className="flex items-center gap-2 px-6 py-2 rounded-lg transition-colors hover-bubbly-sm text-theme-primary bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-hover)] text-white"`
  - Variable: --theme-primary-hover (background)
  - Suggested replacement: `unknown-class-for-theme-primary-hover`

- Line 455: `border-[var(--theme-border-light)]`
  - Line content: `<h4 className="text-sm font-medium text-theme-primary mb-3 border-b border-[var(--theme-border-light)] pb-1">`
  - Variable: --theme-border-light (border)
  - Suggested replacement: `unknown-class-for-theme-border-light`

- Line 503: `border-[var(--theme-border-light)]`
  - Line content: `<h4 className="text-sm font-medium text-theme-primary mb-3 border-b border-[var(--theme-border-light)] pb-1">`
  - Variable: --theme-border-light (border)
  - Suggested replacement: `unknown-class-for-theme-border-light`

- Line 547: `border-[var(--theme-border-light)]`
  - Line content: `<div className="col-span-3 border-l border-[var(--theme-border-light)] h-full">`
  - Variable: --theme-border-light (border)
  - Suggested replacement: `unknown-class-for-theme-border-light`

- Line 550: `border-[var(--theme-border-light)]`
  - Line content: `<div className="p-3 border-b border-[var(--theme-border-light)] flex justify-between items-center">`
  - Variable: --theme-border-light (border)
  - Suggested replacement: `unknown-class-for-theme-border-light`

- Line 1531: `border-[var(--theme-border-light)]`
  - Line content: `<div className="flex items-center justify-between border-b border-[var(--theme-border-light)] p-6">`
  - Variable: --theme-border-light (border)
  - Suggested replacement: `unknown-class-for-theme-border-light`

- Line 1739: `border-[var(--theme-border-light)]`
  - Line content: `<h3 className="text-sm font-medium text-theme-primary border-b border-[var(--theme-border-light)] pb-1">About You</h3>`
  - Variable: --theme-border-light (border)
  - Suggested replacement: `unknown-class-for-theme-border-light`

- Line 1750: `border-[var(--theme-border-light)]`
  - Line content: `className={`w-full rounded-lg border ${errors.name ? 'border-red-500 dark:border-red-400' : 'border-[var(--theme-border-light)]'} bg-theme-bg-surface px-3 py-2 text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent`}`
  - Variable: --theme-border-light (border)
  - Suggested replacement: `unknown-class-for-theme-border-light`

- Line 1767: `border-[var(--theme-border-light)]`
  - Line content: `className={`w-full rounded-lg border ${errors.email ? 'border-red-500 dark:border-red-400' : 'border-[var(--theme-border-light)]'} bg-theme-bg-surface px-3 py-2 text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent`}`
  - Variable: --theme-border-light (border)
  - Suggested replacement: `unknown-class-for-theme-border-light`

- Line 1778: `border-[var(--theme-border-light)]`
  - Line content: `<h3 className="text-sm font-medium text-theme-primary border-b border-[var(--theme-border-light)] pb-1">About the Brand</h3>`
  - Variable: --theme-border-light (border)
  - Suggested replacement: `unknown-class-for-theme-border-light`

- Line 1789: `border-[var(--theme-border-light)]`
  - Line content: `className={`w-full rounded-lg border ${errors.company ? 'border-red-500 dark:border-red-400' : 'border-[var(--theme-border-light)]'} bg-theme-bg-surface px-3 py-2 text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent`}`
  - Variable: --theme-border-light (border)
  - Suggested replacement: `unknown-class-for-theme-border-light`

- Line 1806: `border-[var(--theme-border-light)]`
  - Line content: `className="w-full rounded-lg border border-[var(--theme-border-light)] bg-theme-bg-surface px-3 py-2 text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent"`
  - Variable: --theme-border-light (border)
  - Suggested replacement: `unknown-class-for-theme-border-light`

- Line 2200: `border-[var(--theme-border-light)]`
  - Line content: `<div className="p-5 flex items-center justify-between border-b border-[var(--theme-border-light)] bg-theme-gradient-primary/10">`
  - Variable: --theme-border-light (border)
  - Suggested replacement: `unknown-class-for-theme-border-light`

- Line 2248: `border-[var(--theme-border-light)]`
  - Line content: `<div className="border-t border-[var(--theme-border-light)] p-6">`
  - Variable: --theme-border-light (border)
  - Suggested replacement: `unknown-class-for-theme-border-light`

## Qualification_components/modal-implementation.tsx (4 findings)

- Line 107: `bg-[var(--theme-float-bg-primary)]`
  - Line content: `<div className="absolute top-5 right-5 -z-10 w-16 h-16 rounded-[40%] rotate-12 opacity-[var(--theme-float-opacity)] bg-[var(--theme-float-bg-primary)] animate-float-slow"></div>`
  - Variable: --theme-float-bg-primary (background)
  - Suggested replacement: `unknown-class-for-theme-float-bg-primary`

- Line 118: `bg-[var(--theme-float-bg-primary)]`
  - Line content: `<div className="absolute top-5 right-5 -z-10 w-16 h-16 rounded-[40%] rotate-6 opacity-[var(--theme-float-opacity)] bg-[var(--theme-float-bg-primary)] animate-float-slow"></div>`
  - Variable: --theme-float-bg-primary (background)
  - Suggested replacement: `unknown-class-for-theme-float-bg-primary`

- Line 129: `bg-[var(--theme-float-bg-primary)]`
  - Line content: `<div className="absolute top-5 right-5 -z-10 w-16 h-16 rounded-[40%] -rotate-12 opacity-[var(--theme-float-opacity)] bg-[var(--theme-float-bg-primary)] animate-float-slow"></div>`
  - Variable: --theme-float-bg-primary (background)
  - Suggested replacement: `unknown-class-for-theme-float-bg-primary`

- Line 52: `border-[var(--theme-border-light)]`
  - Line content: `<header className="border-b border-[var(--theme-border-light)] py-6">`
  - Variable: --theme-border-light (border)
  - Suggested replacement: `unknown-class-for-theme-border-light`

