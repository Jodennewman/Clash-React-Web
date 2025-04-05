# Qualification Modal Implementation Guide

## Overview

This guide explains how to implement the Qualification Modal system for your high-ticket product landing page. The system follows the "solution spectrum" approach outlined in the implementation strategy document, presenting different implementation options based on user responses to qualification questions.

## Components Included

1. **VSQualificationModal.jsx** - The main modal component that handles the qualification journey
2. **ModalImplementation.jsx** - Example implementation showing how to integrate the modal with your landing page

## Key Features

- **Multi-stage qualification process** that gathers strategic information
- **Dynamic recommendation engine** that scores responses to determine the right implementation approach
- **Theme-aware styling** that works seamlessly with your VS design system in both light and dark modes
- **Engagement tracking** to factor user engagement into recommendation calculations
- **Calendly integration** for seamless booking with prefilled qualification data

## Implementation Instructions

### Step 1: Install Dependencies

Make sure you have the required dependencies installed:

```bash
npm install @calendly/react-calendly lucide-react
```

### Step 2: Integrate the Modal Component

1. Copy the `VSQualificationModal.jsx` component to your project's components directory.
2. Import the component in your landing page:

```jsx
import VSQualificationModal from './components/VSQualificationModal';
```

3. Add state management for opening and closing the modal:

```jsx
const [isModalOpen, setIsModalOpen] = useState(false);

const openModal = () => {
  setIsModalOpen(true);
  // Disable scroll on body when modal is open
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  setIsModalOpen(false);
  // Re-enable scroll on body when modal is closed
  document.body.style.overflow = 'auto';
};
```

4. Add the modal component to your page:

```jsx
<VSQualificationModal 
  isOpen={isModalOpen} 
  onClose={closeModal} 
/>
```

5. Create CTA buttons that open the modal:

```jsx
<button
  onClick={openModal}
  className="bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-hover)] text-white font-medium py-2 px-4 rounded-lg transition-colors"
>
  Find Your Implementation Strategy
</button>
```

### Step 3: Customize the Calendly Integration

1. Replace the placeholder Calendly URL in the VSQualificationModal.jsx file:

```jsx
<PopupModal
  url="https://calendly.com/your-calendly-link" // Replace with your actual Calendly link
  // other props...
/>
```

2. Customize the custom fields mapping if needed. By default, the component maps:
   - `a1`: Team size
   - `a2`: Implementation preference
   - `a3`: Timeline
   - `a4`: Content volume
   - `a5`: Recommendation type
   - `a6`: Engagement metrics

### Step 4: Customize Recommendation Scoring

You can adjust the recommendation scoring logic in the `processAnswers` function to match your specific product tiers. The current implementation follows this logic:

- Team Size (1-3 points)
  - Large team (20+): 3 points
  - Medium team (10-19): 2 points
  - Small team (1-9): 1 point

- Implementation Support (1-3 points)
  - Full service: 3 points
  - Guided implementation: 2 points
  - Self-directed: 1 point

- Timeline (0-2 points)
  - Immediate (0-1 month): 2 points
  - Next quarter: 1 point
  - Exploratory: 0 points

- Content Volume (0-2 points)
  - High volume (50+/mo): 2 points
  - Medium volume (10-49): 1 point
  - Low volume (<10): 0 points

- Engagement Bonus (0-1 point)
  - High engagement: 1 point
  - Standard engagement: 0 points

**Recommendation Thresholds:**
- Executive (8-11 points)
- Comprehensive (5-7 points)
- Foundation (1-4 points)

### Step 5: Customize Recommendation Content

Modify the recommendation descriptions and features in the VSQualificationModal.jsx file to match your specific implementation approaches:

1. Update the base explanations in the `processAnswers` function:

```jsx
const baseExplanations = {
  foundation: "Your custom foundation tier explanation",
  comprehensive: "Your custom comprehensive tier explanation",
  executive: "Your custom executive tier explanation"
};
```

2. Update the pricing in the `processAnswers` function:

```jsx
pricing: recommendationType === 'executive' ? '£9,500' : 
        recommendationType === 'comprehensive' ? '£5,500' : 
        '£1,950'
```

3. Update the feature lists in the Recommendation Stage section of the modal.

## CRM Integration

The component currently stores qualification data in sessionStorage. For actual CRM integration:

1. Add your CRM's API endpoints and calls in the `handleBookCall` function:

```jsx
// Example CRM integration
const saveToCRM = async (leadData) => {
  try {
    const response = await fetch('your-crm-endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error saving to CRM:', error);
  }
};

// Then call this in handleBookCall
saveToCRM(leadData);
```

## Abandoned Journey Recovery

To implement abandoned journey recovery:

1. When the user starts the qualification process, store their progress in localStorage.
2. Create an email capture in the first step.
3. If they abandon the process, send a recovery email with a link to continue.
4. When they return, check localStorage and restore their progress.

## Testing

Test the qualification journey on different devices and in both light and dark modes to ensure the theme-aware styling works correctly.

## Advanced Customization

### Analytics Integration

The component tracks engagement metrics that can be sent to your analytics platform:

```jsx
// Example analytics integration in handleBookCall
const sendToAnalytics = (data) => {
  // Your analytics code here
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'qualificationCompleted',
    qualification: data.qualification,
    engagement: data.engagement
  });
};

// Then call this in handleBookCall
sendToAnalytics(leadData);
```

### A/B Testing

You can implement A/B testing by creating variants of the qualification questions or scoring algorithm:

```jsx
// Example A/B test implementation
const abTestVariant = Math.random() > 0.5 ? 'A' : 'B';

// Use different scoring for each variant
const processAnswers = () => {
  if (abTestVariant === 'A') {
    // Original scoring logic
  } else {
    // Alternative scoring logic
  }
};
```

## Troubleshooting

### Modal Not Appearing

- Verify that you're correctly updating the `isOpen` state.
- Check for console errors related to React rendering.

### Calendly Integration Issues

- Ensure you have the correct Calendly URL.
- Verify that the prefill fields match your Calendly custom questions.
- Test the integration in an incognito window to avoid caching issues.

### Styling Inconsistencies

- Make sure your app has the theme CSS variables defined in globals.css.
- Test in both light and dark modes to ensure proper theme transitions.

## Conclusion

This qualification modal system provides a sophisticated, personalized experience for your website visitors while helping you guide them to the most appropriate implementation approach for their needs. By collecting strategic information rather than focusing on budget constraints upfront, it creates a consultative sales process that feels premium and tailored.