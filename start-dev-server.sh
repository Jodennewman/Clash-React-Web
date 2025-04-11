#!/bin/bash

# Load the user's shell environment
if [ -f "$HOME/.bash_profile" ]; then
    source "$HOME/.bash_profile"
elif [ -f "$HOME/.zshrc" ]; then
    source "$HOME/.zshrc"
elif [ -f "$HOME/.profile" ]; then
    source "$HOME/.profile"
fi

# Add common paths to PATH
export PATH="$PATH:$HOME/.npm-global/bin:/usr/local/bin:/opt/homebrew/bin:$HOME/.nvm/versions/node/*/bin:$HOME/node_modules/.bin"

cd "/Users/jodennewman/Documents/Code/REACT/ViteTailwindGsap/ReactWebDev 090425 - Build Approach/"

# Function to get an available port
get_available_port() {
    local port=$1
    while nc -z localhost $port 2>/dev/null; do
        echo "Port $port is in use, trying the next one..."
        port=$((port + 1))
    done
    echo $port
}

# Determine if this is a Vite project
HAS_VITE=true

if [ "$HAS_VITE" = "true" ]; then
    echo "Detected Vite project. Setting up Vite + Browser Sync..."
    
    # Get available ports
    VITE_PORT=$(get_available_port 5173)
    BROWSER_SYNC_PORT=$(get_available_port 3000)
    
    # Create a browser-sync config file
    cat > browser-sync-config.js << EOF
module.exports = {
    proxy: "localhost:${VITE_PORT}",
    port: ${BROWSER_SYNC_PORT},
    open: false,
    notify: false,
    ui: false,
    files: [
        'src/**/*.{html,js,jsx,ts,tsx,css,scss,sass,less}',
        'public/**/*'
    ],
    // Don't attempt to reload on JS changes - let Vite handle that
    injectChanges: true,
    ghostMode: false,
    logLevel: "info"
};
EOF
    
    # Start Vite in the background
    echo "Starting Vite on port $VITE_PORT..."
    if [ -f "yarn.lock" ]; then
        VITE_PORT=$VITE_PORT yarn dev &
    elif [ -f "pnpm-lock.yaml" ]; then
        VITE_PORT=$VITE_PORT pnpm dev &
    else
        VITE_PORT=$VITE_PORT npm run dev &
    fi
    VITE_PID=$!
    echo $VITE_PID > .vite-pid
    
    # Wait for Vite to start
    echo "Waiting for Vite to start..."
    sleep 5
    
    # Start Browser Sync
    echo "Starting Browser Sync on port $BROWSER_SYNC_PORT..."
    if command -v browser-sync >/dev/null 2>&1; then
        browser-sync start --config browser-sync-config.js &
    else
        npx browser-sync start --config browser-sync-config.js &
    fi
    BROWSER_SYNC_PID=$!
    echo $BROWSER_SYNC_PID > .bs-pid
    
    # Wait a moment for Browser Sync to start
    sleep 2
    
    # Open Chrome to Browser Sync URL
    open -a "Google Chrome" "http://localhost:$BROWSER_SYNC_PORT"
    
    echo "Development environment running:"
    echo "- Vite: http://localhost:$VITE_PORT (PID: $VITE_PID)"
    echo "- Browser Sync: http://localhost:$BROWSER_SYNC_PORT (PID: $BROWSER_SYNC_PID)"
    echo "To stop the servers, run ./stop-dev-server.sh"
    
    # Keep the script running to make it easier to stop with Ctrl+C
    echo "Press Ctrl+C to stop the servers"
    wait
else
    # Regular Browser Sync setup for non-Vite projects
    echo "Setting up Browser Sync for standard web project..."
    
    # Find browser-sync
    if command -v browser-sync >/dev/null 2>&1; then
        BROWSERSYNC=$(which browser-sync)
        echo "Using Browser Sync from: $BROWSERSYNC"
        "$BROWSERSYNC" start --server --files "**/*.html, **/*.css, **/*.js" --no-notify --open "local" --startPath "/" &
    else
        echo "Browser Sync not found. Attempting to use npm directly..."
        npx browser-sync start --server --files "**/*.html, **/*.css, **/*.js" --no-notify --open "local" --startPath "/" &
    fi
    
    # Store PID
    echo $! > .bs-pid
    
    echo "Development server started at http://localhost:3000"
    echo "To stop the server, run ./stop-dev-server.sh"
    
    # Keep the script running
    wait
fi
