# Qualification Modal Improvement Plan

## Overview

This document outlines the plan to implement a simplified, more user-friendly qualification modal quiz based on the provided copy. The implementation will focus on visual clarity, reduced complexity, and a direct user flow that guides users to their ideal content system implementation.

## Goals

1. Simplify the visual design to reduce confusion
2. Implement the new copy with clear messaging around the "1 Billion view system"
3. Create a 60-second quiz experience as promised in the copy
4. Deliver personalized recommendations that dynamically include user responses
5. Provide clear next steps for each recommendation tier

## Implementation Strategy

### Phase 1: Content Structure Implementation

- **Implement New Quiz Copy**: Replace all existing questions and copy with the new content
- **Personalization Logic**: Ensure responses are captured and reflected in final recommendations
- **Quiz Flow**: Maintain the four core questions plus contact information
- **Scoring Logic**: Update the scoring algorithm to correctly map to the three recommendation tiers:
  - Foundation Implementation (£1,950)
  - Comprehensive Implementation (£5,500)
  - Executive Partnership (£9,500+)

### Phase 2: UI Simplification

- **Intro Screen Redesign**: 
  - Implement new headline "Build your Perfect Content System"
  - Add "1 Billion view system" messaging
  - Simplify the 3-step process visualization

- **Question Screens**:
  - Standardize all question layouts
  - Simplify option selection with clearer visual feedback
  - Ensure mobile-friendly touch targets

- **Contact Information Screen**:
  - Add "About You" and "About Your Brand" sections
  - Include mailing list signup option
  - Add security messaging

### Phase 3: Recommendation Experience Overhaul

- **Results Presentation**:
  - Create three distinct recommendation templates with clear visual hierarchy
  - Include dynamic insertion of user's quiz responses
  - Implement "match" language to reinforce personalization

- **Foundation Implementation**:
  - Emphasize "Build your content foundation" message
  - Include "Start Instantly" CTA button
  - Display optional extras with clear pricing

- **Comprehensive Implementation**:
  - Feature "Complete support, zero guesswork" messaging
  - Implement Calendly integration for booking strategy sessions
  - Display 5 core benefits as bullet points

- **Executive Partnership**:
  - Highlight "Premium implementation. Full scale. No stress." positioning
  - Implement premium Calendly booking option
  - Show comprehensive benefits list with the "PLUS" distinction

### Phase 4: Technical Improvements

- **Component Refactoring**:
  - Simplify component architecture to match new flow
  - Implement proper TypeScript interfaces for all components
  - Ensure consistent state management

- **Performance Optimization**:
  - Streamline animations to enhance perceived speed
  - Implement progressive loading if needed
  - Optimize Calendly integration

- **Accessibility Enhancements**:
  - Ensure all interactive elements are properly accessible
  - Implement focus management between stages
  - Add appropriate ARIA attributes

## Detailed Implementation Plan

### Visual Design Simplification

- [ ] Create cleaner header with new headline "Build your Perfect Content System"
- [ ] Implement simple 3-step process visualization
- [ ] Standardize question layouts with consistent option styling
- [ ] Design three distinct recommendation cards with clear visual hierarchy
- [ ] Simplify CTAs to "Start Instantly" and "Book your strategy session" options

### Content Implementation

- [ ] Replace all question and option text with new copy
- [ ] Implement the "About You" and "About Your Brand" form sections
- [ ] Create template for recommendation screens with dynamic response inclusion
- [ ] Add distinct messaging for each recommendation tier:
  - Foundation: "Build your content foundation"
  - Comprehensive: "Complete support, zero guesswork"
  - Executive: "Premium implementation. Full scale. No stress."
- [ ] Include testimonial-style messages under each recommendation

### Recommendation Logic

- [ ] Update scoring system to properly map to the three tiers
- [ ] Implement dynamic response inclusion in "About your match" sections
- [ ] Create optional extras selection for each recommendation:
  - Foundation: Coaching, Audit, Upgrade options
  - Comprehensive: Additional coaching, Audit, Upgrade options
  - Executive: Extended support option

### Technical Implementation

- [ ] Refactor modal components to support new structure
- [ ] Implement simplified progress indicator for "60-second" experience
- [ ] Update Calendly integration with proper UTM and data passing
- [ ] Create system for displaying dynamic user responses in recommendation
- [ ] Implement proper form validation with clear feedback

## UI Component Updates

### Intro Stage
- [ ] New headline: "Build your Perfect Content System"
- [ ] Subheading: "Find the perfect plan for you to scale your content - fast"
- [ ] Simple 3-step process visualization
- [ ] "1 Billion view system" messaging
- [ ] Two CTAs: "Maybe later" and "Get my personalised plan"

### Question Stages
- [ ] Simplified question cards with clear headlines
- [ ] Three consistent option layouts per question
- [ ] Clear selection state visualization
- [ ] Optimized for mobile interactions

### Contact Stage
- [ ] Split into "About You" and "About Your Brand" sections
- [ ] Add security messaging
- [ ] Include mailing list signup option
- [ ] "Show my recommendation" CTA

### Recommendation Stages
- [ ] Clear "Your Match" headline with recommendation name
- [ ] Pricing information prominently displayed
- [ ] Dynamic user responses in "About your match" section
- [ ] Bulleted "What You Get" list
- [ ] Optional extras with pricing
- [ ] Testimonial-style message
- [ ] Clear CTA button

## Success Metrics

- Increased qualification flow completion rate to 70%+
- Reduced quiz completion time to under 90 seconds
- Improved conversion rate to booking/purchase by 25%
- Positive user feedback on clarity and personalization
- Balanced distribution of recommendations across the three tiers

## Timeline

1. **Week 1**: Copy implementation and UI design updates
2. **Week 2**: Component refactoring and recommendation logic implementation
3. **Week 3**: Calendly integration and optional extras functionality
4. **Week 4**: Testing, refinement, and deployment

## Next Steps

1. Audit existing components against new design requirements
2. Create visual mockups of the simplified UI with new copy
3. Update recommendation logic to reflect the three distinct tiers
4. Begin implementation with the intro and question stages
5. Test the recommendation personalization logic thoroughly

---

## Quiz Copy Reference

### Intro Section

**Build your Perfect Content System**

Find the perfect plan for you to scale your content - fast

**The Process**

(don't worry it takes less than 60 seconds)

Quiz Assessment → Your Personalised Solution → Start Growing

We'll tailor our 1 Billion view system to match your team size, implementation preference, vision and growth timeline 

No obligation | Personalised to your specific needs

Maybe later

Get my personalised plan

### Question 1: Team Size

**How Big is your Content Team?** 

We'll tailor our system to match your team's specific structure and size.

- Option 1: Solo Creator: Just you, a dream (and occasional freelance help)

- Option 2: Small Team: You lead a tight-knit team of 1-4 creatives, maybe a writer, an editor and/or an all-rounder

- Option 3: Growing Team: You've got a dedicated team of 5+ researchers, writers, producers, editors, strategists, and videographers

### Question 2: Learning Style

**How do you prefer to learn new systems?** 

We'll match you with the right level of support.

- Option 1: Self Driven: I'd prefer to take the course at my own pace.

- Option 2: Coaching & Support: I'd like guidance and coaching, but want to take the lead on implementing it myself.

- Option 3: Help. I want dedicated experts to implement it all for me.

### Question 3: Timeline

**When do you want to see results?** 

We'll adjust the timeline to match your goals.  

- Option 1: ASAP Growth: I'm ready to implement now and want results immediately.

- Option 2: Next 90 Days: I need some time to warm up, and would like to implement in the next 1-3 months

- Option 3: Strategic Planning: I want a roadmap to help implement it some time this year.

### Question 4: Content Vision

**What's your content vision?** 

We'll adjust the framework to fit your content growth goals. 

- Option 1: High Impact Focus: I want a small-scale strategy to maximise ROI and conversions

- Option 2: Consistent Growth: I want an content system putting out 10-30 pieces a month.

- Option 3: Full Scale Engine: I want a comprehensive efficient content system to scale across multiple platforms.

### Contact Information

**About You**

Your Name
Your Email 

**About Your Brand**

Company/Brand Name
Your Position

Your information is secure and never shared with third parties 
[sign up to our mailing list checkbox]

→ show my recommendation

### Recommendation 1: Foundation

**Your Match: The Foundation Implementation**

**Build your content foundation**

**£1,950 one-time payment**

You're not quite ready to start right away — but you're not messing around.

The Foundation Implementation is a lean, self-paced option for solo founders or small teams who want clarity, templates, and a proper system to launch with confidence (not confusion).

You don't need hand-holding. You need a jumpstart.

The Foundation Implementation is exactly that.

**About your match:**

Designed just for you to achieve your goals based on your unique responses:

•    <team size response>
•    <learning approach response>
•    <timeline response>
•    <content vision response>

**What You Get:**

•    Lifetime access to our foundation tiers
•    Our most essential content templates
•    Credit towards upgrading later

**Optional Extras:**

- 1:1 Coaching Session — £850
- Content Audit + Strategy — £950
- Upgrade to Comprehensive — £3,550

> Not quite sure? Most of our top clients started here. Then scaled like hell.

**→ Start Instantly**

### Recommendation 2: Comprehensive

**Your Match: The Comprehensive Implementation**

**Complete support, zero guesswork**

**£5,500 one time payment**

You're growing fast — and it's time your content systems did too.

This isn't another course or set of templates. It's live support, 1:1 strategy, and a full plug-and-play content engine that actually fits your business.

We'll give you the frameworks, the guidance, and the knowledge to back it up.

You bring the momentum. We'll build the machine.

**About your match:**

Designed just for you to achieve your goals based on your unique responses:

•    <team size response>
•    <learning approach response>
•    <timeline response>
•    <content vision response>

**What You Get:**

•    Two 1:1 strategy sessions
•    Weekly Group coaching + support
•    Full course, template + system access
•    3-month implementation support
•    Access to private founder community

**Optional Extras:**

- Additional coaching sessions — £850
- Content Audit + Strategy — £950
- Upgrade to Executive — £4,000+

> Scaling without support = burnout. Don't do it to yourself.

**→ Book your first strategy session**

### Recommendation 3: Executive

**Your Match: The Executive Partnership**

**Premium implementation. Full scale. No stress.**

**Starting from £9,500**

You're not playing around. Your business is moving fast, your team needs results, and content is a growth lever — not a side project. You just don't have the time.

This is where we step in and build it *with* you.

Custom strategy. Full system setup. Ongoing support.

Our experts will train up your team to make short-form your biggest growth channel.

**About your match:**

Designed just for you to achieve your goals based on your unique responses:

•    <team size response>
•    <learning approach response>
•    <timeline response>
•    <content vision response>

**What You Get:**

Everything included in the Comprehensive Course PLUS:

•    A dedicated implementation manager
•    Custom strategy development
•    Done-with-you system install
•    6 months of premium support
•    Private team onboarding + training

**Optional Extras:**

•    Extended Support (3 more months) — £1,800

> We'll build it. You focus on growth.

**→ Book your executive strategy session**