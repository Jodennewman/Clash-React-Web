# VS Modal System

This directory contains a set of modal components that follow the VS styling guidelines for both light and dark modes.

## Available Components

1. `VSModal` - Base modal component
2. `VSApplicationModal` - Multi-step application form modal
3. `VSSubmoduleModal` - Course module viewer modal with video player
4. `VSQuizModal` - Interactive quiz modal with progress tracking

## Usage

### Basic Modal

```tsx
import { VSModal } from '../components/modals';
import { useState } from 'react';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Open Modal
      </button>
      
      <VSModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Modal Title"
        description="Optional description text"
        width="md" // 'sm', 'md', 'lg', 'xl', or 'full'
      >
        <div>
          <p>Modal content goes here</p>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      </VSModal>
    </>
  );
}
```

### Application Form Modal

```tsx
import { VSApplicationModal } from '../components/modals';
import { useState } from 'react';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleSubmit = (data) => {
    console.log('Form submitted:', data);
    setIsOpen(false);
    // Process the form data
  };
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Apply Now
      </button>
      
      <VSApplicationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
}
```

### Submodule Modal

```tsx
import { VSSubmoduleModal } from '../components/modals';
import { useState } from 'react';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Sample module data
  const moduleData = {
    id: 'module-1',
    title: 'Content Creation Fundamentals',
    submodules: [
      {
        id: 'sub-1',
        title: 'Introduction',
        duration: '5:24',
        isCompleted: true,
        isLocked: false
      },
      // More submodules...
    ],
    thumbnailUrl: '/path/to/thumbnail.jpg'
  };
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        View Module
      </button>
      
      <VSSubmoduleModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        moduleId={moduleData.id}
        moduleTitle={moduleData.title}
        submodules={moduleData.submodules}
        thumbnailUrl={moduleData.thumbnailUrl}
      />
    </>
  );
}
```

### Quiz Modal

```tsx
import { VSQuizModal } from '../components/modals';
import { useState } from 'react';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Sample quiz questions
  const questions = [
    {
      id: 'q1',
      question: 'What is the most important factor for engagement?',
      options: [
        { value: 'a', label: 'Option A' },
        { value: 'b', label: 'Option B' },
        { value: 'c', label: 'Option C' },
        { value: 'd', label: 'Option D' },
      ],
      explanation: 'Optional explanation text'
    },
    // More questions...
  ];
  
  const handleQuizComplete = (score, answers) => {
    console.log('Quiz completed with score:', score);
    console.log('User answers:', answers);
    // Process quiz results
  };
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Take Quiz
      </button>
      
      <VSQuizModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onComplete={handleQuizComplete}
        questions={questions}
        title="Knowledge Check" // Optional
      />
    </>
  );
}
```

## Styling Features

All modals implement the following VS styling features:

- Properly styled for both light and dark modes
- Gradient backgrounds (no flat white or flat dark colors)
- Floating elements for visual interest
- VS "bubbly" animations
- Appropriate shadows (directional for light, glow for dark)
- Direct CSS variable references using the new Tailwind v4 pattern
- GSAP animations with proper cleanup

## Animation and Behavior

The modals use GSAP for animations with the following features:

- Fade-in/scale entrance animation
- Fade-out/scale exit animation
- Animated floating elements
- Proper cleanup to prevent memory leaks
- ESC key to close
- Click outside to close (configurable)

## Best Practices

1. Keep modals focused on a single task or piece of information
2. Use appropriate modal widths for the content:
   - `sm` for confirmations or alerts
   - `md` for forms or standard content
   - `lg` for more complex forms
   - `xl` for media content
   - `full` for detailed content viewers
3. Always provide clear actions/buttons
4. Ensure modals are keyboard accessible
5. Test in both light and dark modes