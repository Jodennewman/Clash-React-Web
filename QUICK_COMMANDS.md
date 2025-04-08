# VS Project Quick Commands

## Starting Claude in Different Modes

### Solo Mode (one Claude)
```bash
git checkout Solo-Development && claude-code
```
Then tell Claude: "You are in Solo Mode"

### Team Mode (two Claudes)
Terminal 1:
```bash
git checkout Team-A-Development && claude-code
```
Then tell Claude: "You are in Team Mode, Team A"

Terminal 2:
```bash
git checkout Team-B-Development && claude-code
```
Then tell Claude: "You are in Team Mode, Team B"

## Merging Changes

### After Solo Mode
```bash
git checkout main && git merge Solo-Development
```

### After Team Mode
```bash
git checkout main && git merge Team-A-Development && git merge Team-B-Development
```

## Common Git Commands

### Check Status
```bash
git status
```

### View Recent Commits
```bash
git log --oneline -n 5
```

### Compare Branches
```bash
git diff main..Team-A-Development
```

### Discard Changes
```bash
git checkout -- filename.tsx
```

## Safe Build Commands

Instead of npm run dev (which freezes Claude), use:
```bash
npm run build
```

For type checking:
```bash
npm run typecheck
```

For linting:
```bash
npm run lint
```