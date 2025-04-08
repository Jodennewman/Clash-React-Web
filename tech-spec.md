# TECHNICAL_SPECIFICATION.md: Qualification Modal

## Component Architecture

The Qualification Modal system is composed of the following components:

### 1. VSQualificationModal.jsx (Core Component)

This is the main React component that implements the entire qualification journey. It includes:

- **Modal Container**: Base container with proper positioning and backdrop
- **Journey Stages**: Various content views for each step of the qualification process
- **Navigation Controls**: Buttons to progress through the journey
- **Progress Indicator**: Visual indicator of qualification progress
- **Recommendation Engine**: Algorithm for determining the appropriate recommendation
- **Calendly Integration**: PopupModal for direct booking

```
VSQualificationModal
├── Modal Container
│   ├── Header
│   ├── Progress Bar
│   ├── Content Area (changes based on stage)
│   │   ├── Intro Stage
│   │   ├── Contact Stage
│   │   ├── Team Size Stage
│   │   ├── Implementation Support Stage
│   │   ├── Timeline Stage
│   │   ├── Content Volume Stage
│   │   └── Recommendation Stage
│   └── Footer (Navigation Buttons)
└── Calendly PopupModal
```

### 2. ModalImplementation.jsx (Example Implementation)

This component demonstrates how to integrate the VSQualificationModal into a landing page, including:

- **State Management**: Controlling modal visibility
- **CTA Buttons**: Triggering modal opening
- **Document Body Control**: Handling scroll behavior

## State Management

The component uses React's useState hook to manage several pieces of state:

1. **stage**: Current step in the qualification journey (string)
   - Possible values: 'intro', 'contact', 'teamSize', 'implementationSupport', 'timeline', 'contentVolume', 'recommendation'

2. **answers**: Object containing all user responses
   ```typescript
   {
     name: string;
     email: string;
     company: string;
     position: string;
     teamSize: string;
     implementationSupport: string; // 'self_directed', 'guided', or 'full_service'
     timeline: string; // 'immediate', 'next_quarter', or 'exploratory'
     contentVolume: string; // 'low', 'medium', or 'high'
   }
   ```

3. **recommendation**: Result of the scoring algorithm
   ```typescript
   {
     type: string; // 'foundation', 'comprehensive', or 'executive'
     score: number; // 1-11
     explanation: string;
     pricing: string;
   }
   ```

4. **engagement**: Tracking metrics for user interaction
   ```typescript
   {
     timeSpent: number; // seconds
     questionInteractions: number;
     focusChanges: number;
   }
   ```

5. **showCalendly**: Boolean to control Calendly modal visibility

## Core Functions

### 1. Stage Navigation

```javascript
// Proceed to next stage
const goToNextStage = () => {
  switch (stage) {
    case 'intro':
      setStage('contact');
      break;
    case 'contact':
      setStage('teamSize');
      break;
    // Additional cases...
  }
};

// Go back to previous stage
const goToPreviousStage = () => {
  switch (stage) {
    case 'contact':
      setStage('intro');
      break;
    // Additional cases...
  }
};
```

### 2. Recommendation Algorithm

```javascript
const processAnswers = () => {
  // Initialize score
  let score = 0;
  
  // 1. Team size factor (1-3 points)
  if (teamSize >= 20) score += 3;
  else if (teamSize >= 10) score += 2;
  else score += 1;
  
  // Additional scoring factors...
  
  // Determine recommendation based on total score
  let recommendationType;
  if (score >= 8) {
    recommendationType = 'executive';
  } else if (score >= 5) {
    recommendationType = 'comprehensive';
  } else {
    recommendationType = 'foundation';
  }
  
  // Generate personalized explanation
  // ...
  
  // Set recommendation and proceed to recommendation stage
  setRecommendation({
    type: recommendationType,
    score: score,
    explanation: explanation,
    pricing: pricing
  });
  
  setStage('recommendation');
};
```

### 3. Engagement Tracking

```javascript
// Track time spent
useEffect(() => {
  if (!isOpen) return;
  
  const interval = setInterval(() => {
    setEngagement(prev => ({
      ...prev,
      timeSpent: prev.timeSpent + 1
    }));
  }, 1000);
  
  return () => clearInterval(interval);
}, [isOpen]);

// Track interactions
const handleAnswerChange = (key, value) => {
  setAnswers(prev => ({
    ...prev,
    [key]: value
  }));
  
  // Track interaction
  setEngagement(prev => ({
    ...prev,
    questionInteractions: prev.questionInteractions + 1
  }));
};
```

### 4. Calendly Integration

```javascript
const handleBookCall = () => {
  setShowCalendly(true);
  
  // Save lead data
  const leadData = {
    contact: {
      name: answers.name,
      email: answers.email,
      // additional fields...
    },
    qualification: {
      teamSize: parseInt(answers.teamSize || 0),
      // additional fields...
    },
    // additional data...
  };
  
  // Store data for potential CRM integration
  sessionStorage.setItem('qualificationData', JSON.stringify(leadData));
};
```

## Technical Requirements

### Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers: iOS Safari, Android Chrome

### Dependencies

- **React**: ^16.8.0 or higher (for hooks)
- **@calendly/react-calendly**: ^4.0.0 or higher
- **lucide-react**: ^0.20.0 or higher (for icons)

### Performance Considerations

1. **Modal Loading**: The component should load quickly and not block the main thread
2. **Interaction Responsiveness**: All buttons and form elements should respond immediately
3. **Calendly Integration**: Should load asynchronously without blocking UI
4. **Animation Performance**: Transitions between stages should be smooth (60fps)

### Theme System Integration

The component must use our theme-aware CSS variable approach:

1. **Direct CSS Variable References**: Use `var(--theme-variable)` syntax
2. **No Competing Styles**: Avoid `dark:` variant classes that conflict
3. **Theme-Aware Variables**: Use variables that automatically update with theme
4. **Component-Specific Classes**: Follow VS design system patterns

Example of correct theme-aware styling:
```jsx
<div className="text-[var(--theme-text-primary)] bg-[var(--theme-bg-surface)]">
  Content that updates with theme changes
</div>
```

## Data Flow

### Input Data

- **isOpen**: Boolean controlling modal visibility
- **onClose**: Function to call when closing the modal

### Output Data

Data stored in sessionStorage as 'qualificationData':
```json
{
  "contact": {
    "name": "string",
    "email": "string",
    "company": "string",
    "position": "string"
  },
  "qualification": {
    "teamSize": "number",
    "implementationSupport": "string",
    "timeline": "string",
    "contentVolume": "string",
    "recommendedApproach": "string"
  },
  "engagement": {
    "timeSpent": "number",
    "questionInteractions": "number",
    "focusChanges": "number"
  },
  "funnel": {
    "qualificationCompleted": "boolean",
    "recommendationViewed": "boolean",
    "calendlyScheduled": "boolean"
  }
}
```

### Calendly Data Passing

Data passed to Calendly via prefill:
```typescript
{
  name: string;
  email: string;
  customAnswers: {
    a1: string; // Team size
    a2: string; // Implementation preference
    a3: string; // Timeline
    a4: string; // Content volume
    a5: string; // Recommendation type
    a6: string; // Engagement metrics
  }
}
```

## Error Handling

1. **Validation Errors**: Form fields have appropriate validation
2. **Calendly Integration Errors**: Graceful fallbacks if Calendly fails to load
3. **Storage Errors**: Catch and handle localStorage/sessionStorage exceptions
4. **State Management Errors**: Prevent invalid state transitions

## Accessibility Considerations

1. **Keyboard Navigation**: Full keyboard support for all interactions
2. **Focus Management**: Proper focus trapping within the modal
3. **Screen Reader Support**: Appropriate ARIA attributes
4. **Color Contrast**: Compliance with WCAG 2.1 AA standards
5. **Motion Sensitivity**: Reduced motion support for animations

## Testing Requirements

1. **Unit Tests**: Test core functions like the recommendation algorithm
2. **Component Tests**: Test rendering of different stages
3. **Integration Tests**: Test the full qualification journey
4. **Responsive Tests**: Verify behavior across device sizes
5. **Theme Tests**: Verify appearance in both light and dark mode

## Security Considerations

1. **Data Storage**: Only store necessary data in sessionStorage
2. **Input Validation**: Validate all user inputs
3. **Calendly Integration**: Use secure methods for data passing
4. **Error Messages**: Avoid exposing sensitive information in errors

## Implementation Checklist

- [ ] Create base modal component with theme-aware styling
- [ ] Implement multi-stage journey flow
- [ ] Develop recommendation algorithm
- [ ] Add engagement tracking
- [ ] Integrate Calendly booking
- [ ] Add accessibility features
- [ ] Implement responsive design
- [ ] Test in both light and dark modes
- [ ] Write documentation
- [ ] Perform code review