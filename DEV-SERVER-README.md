# Development Server Setup

This folder contains scripts to start and stop a development server optimized for your project.

## Project Type
- Detected: Vite-based project

## Starting the Server

1. Open Terminal
2. Navigate to this folder: `cd "/Users/jodennewman/Documents/Code/REACT/ViteTailwindGsap/ReactWebDev 090425 - Build Approach/"`
3. Run: `./start-dev-server.sh`

This will:
- Start Vite's development server (handles HMR, TypeScript, etc.)
- Start Browser Sync as a proxy to Vite
- Automatically refresh the browser when non-JS files change
- Let Vite handle JS/TS hot module replacement

## Stopping the Server

Run: `./stop-dev-server.sh`

## Using Chrome DevTools

For the best development experience:
1. Open Chrome Developer Tools with: Cmd+Opt+I
2. Use the Elements panel to inspect HTML
3. Use the Sources panel to set breakpoints
4. Use the Network panel to debug requests
