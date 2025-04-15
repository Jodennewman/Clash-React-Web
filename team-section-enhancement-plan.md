# Team Section Enhancement Plan

## Core Issues to Fix

1. **Z-index Hierarchy**: Ensure all team images have lower z-index than text content
2. **Image Sizing**: Increase the size of team images with varied scales
3. **Image Path Error**: Fix import from "../assets/main/Meet_The_Team-webp/All-Team-Images/"
4. **Dynamic Image Loading**: Create a function to parse and serve images by team member

## Implementation Plan

### 1. Image Directory Structure Analysis
- Analyze structure of new Meet_The_Team-webp directory
- Identify naming patterns of images to enable dynamic loading
- Categorize images by team member

### 2. Create Dynamic Image Loading Function
- Develop a utility function in imageMap.js that:
  - Scans the directory structure
  - Filters images by team member name
  - Categorizes by image type (halftone vs regular)
  - Returns an array of images with metadata (person, type, size hint)
  - Apply randomization for variety while maintaining person-specific images

### 3. Update TeamSection Component
- Fix z-index hierarchy across all elements
- Implement varied image sizing:
  - Closer images: Larger size, higher speed, lower opacity (~40-60%)
  - Mid-distance: Medium size, medium speed, medium opacity (~60-80%)
  - Far images: Smaller size, slower speed, higher opacity (~80-100%)
- Use GSAP ScrollTrigger to create staggered parallax effects:
  - Different start/end points for different image groups
  - Varied scrub factors for smoother/faster movements
  - Alternate directions for visual interest
  - Add subtle rotation to some images

### 4. Visual Layout Enhancements
- Create visual depth with overlapping images at different z-indices
- Vary image placement using calculated positioning:
  - Use modulo and trigonometric functions for "semi-random" but visually pleasing layouts
  - Ensure no awkward overlaps with important content
  - Guarantee responsive behavior across screen sizes

### 5. Site-Wide Image Integration
- Identify 3-5 key sections for sparse team image placement
- Add 1-2 images per section with:
  - Subtle parallax effects
  - Lower opacity than main section
  - Strategic positioning to complement content
  - Consistent animation behavior with the team section

### 6. Performance Optimization
- Implement image lazy loading
- Use requestAnimationFrame for all animations
- Throttle scroll events
- Ensure cleanup of all GSAP instances and event listeners

## Timeline
1. Directory analysis and utility function creation - 30 minutes
2. TeamSection component update - 1 hour  
3. Site-wide integration - 30 minutes
4. Testing and refinement - 30 minutes

Total estimated time: ~2.5 hours