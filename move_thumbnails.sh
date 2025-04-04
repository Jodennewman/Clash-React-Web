#!/bin/bash

# Create target directory if it doesn't exist
mkdir -p /Users/jodennewman/Documents/Code/REACT/ViteTailwindGsap/ReactWebDev/public/assets/main/DataBaseThumbnails/renamed

# Copy renamed files to the public directory for web access
cp -r /Users/jodennewman/Documents/Code/REACT/ViteTailwindGsap/ReactWebDev/assets/main/DataBaseThumbnails/renamed/* /Users/jodennewman/Documents/Code/REACT/ViteTailwindGsap/ReactWebDev/public/assets/main/DataBaseThumbnails/renamed/

echo "All renamed files have been copied to the public directory for web access."