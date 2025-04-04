#!/bin/bash

# Make a backup of the original file
cp /Users/jodennewman/Documents/Code/REACT/ViteTailwindGsap/ReactWebDev/src/data/course-data.ts /Users/jodennewman/Documents/Code/REACT/ViteTailwindGsap/ReactWebDev/src/data/course-data.ts.backup

# Replace .jpg with .webp in thumbnail paths
sed -i '' 's/\.jpg"/\.webp"/g' /Users/jodennewman/Documents/Code/REACT/ViteTailwindGsap/ReactWebDev/src/data/course-data.ts

echo "Updated all thumbnail extensions from .jpg to .webp in course-data.ts"