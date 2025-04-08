#!/bin/bash

# Make a backup of the original file
cp /Users/jodennewman/Documents/Code/REACT/ViteTailwindGsap/ReactWebDev/src/data/course-data.json /Users/jodennewman/Documents/Code/REACT/ViteTailwindGsap/ReactWebDev/src/data/course-data.json.backup

# Replace .jpg with .webp in thumbnail paths
sed -i '' 's/\.jpg"/.webp"/g' /Users/jodennewman/Documents/Code/REACT/ViteTailwindGsap/ReactWebDev/src/data/course-data.json

echo "Updated all thumbnail extensions from .jpg to .webp in course-data.json"