#!/bin/bash
cd "/Users/jodennewman/Documents/Code/REACT/ViteTailwindGsap/ReactWebDev 090425 - Build Approach/"

STOPPED=false

if [ -f ".bs-pid" ]; then
    kill $(cat .bs-pid) 2>/dev/null
    rm .bs-pid
    echo "Browser Sync server stopped"
    STOPPED=true
fi

if [ -f ".vite-pid" ]; then
    kill $(cat .vite-pid) 2>/dev/null
    rm .vite-pid
    echo "Vite development server stopped"
    STOPPED=true
fi

if [ "$STOPPED" = "false" ]; then
    echo "No running development servers found"
fi
