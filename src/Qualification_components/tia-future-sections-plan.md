# Plan for Consistent Quiz Section Structure

This document outlines how to ensure all future quiz sections follow the same shape, structure, and design patterns established in the intro section, while maintaining their unique content and functionality.

## Common Design Elements

### 1. Header Styling
- Use smaller, simpler header title in the modal container
- Consistent padding and spacing around titles
- Font sizes: text-base for section headings, larger sizes for key messaging

### 2. Content Organization
- Clean visual hierarchy with clear sectioning
- Limited use of borders and decorative elements
- Focus on readability and clarity over visual complexity
- Consistent spacing between sections (space-y-4)

### 3. Interactive Elements
- Hover effects on interactive components (increased opacity, subtle border color changes)
- Cursor-pointer indicators for interactive areas
- Smooth transitions (duration-300) for all hover states

## Section-by-Section Implementation Plan

### Question Stages (Team Size, Learning Style, Timeline, Content Vision)

Current structure:
```
<div className="bg-theme-gradient/5 rounded-lg p-5">
  <div className="flex items-center">
    <h4>{title}</h4>
    <div className="icon">{icon}</div>
  </div>
  
  <p className="description">{description}</p>
  
  <div className="options-grid">
    {options.map(option => (
      <Option 
        isSelected={...}
        onClick={...}
      />
    ))}
  </div>
</div>
```

Revised structure:
```
<div className="p-5 md:p-6">
  <div className="flex flex-col space-y-4">
    {/* Title header - simple, left-aligned */}
    <div className="mb-2">
      <h4 className="text-theme-primary text-base font-medium">{title}</h4>
    </div>
    
    {/* Main content area with hover effect */}
    <div className="bg-theme-gradient/5 hover:bg-theme-gradient/10 hover:border-theme-primary/20 
                    transition-all duration-300 rounded-lg p-5 border border-theme-border-light cursor-pointer">
      <div className="flex items-center mb-2">
        <h4 className="text-base md:text-lg font-medium text-theme-primary">{subTitle}</h4>
        <span className="text-sm text-theme-tertiary ml-2">{note}</span>
      </div>
      
      {/* Options grid with consistent styling */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {options.map(option => (
          <OptionCard
            key={option.id}
            label={option.label}
            description={option.description}
            isSelected={selectedValue === option.value}
            onClick={() => onSelect(option.value)}
            isAnimating={isAnimating && selectedChoice === option.value}
          />
        ))}
      </div>
    </div>
    
    {/* Supporting text - larger, with tracking */}
    <div className="p-2">
      <p className="text-theme-primary text-center text-xl md:text-2xl font-medium tracking-wide">
        {supportingText}
      </p>
    </div>
  </div>
</div>
```

### Contact Stage

Current structure:
```
<div className="p-5 bg-theme-bg-surface rounded-lg">
  <h3>{title}</h3>
  
  <div className="form-grid">
    <FormField label="Name" error={errors.name} />
    <FormField label="Email" error={errors.email} />
    <FormField label="Company" error={errors.company} />
    <FormField label="Position" />
  </div>
  
  <div className="buttons">
    <Button onClick={onBack}>{backText}</Button>
    <Button onClick={onNext} disabled={!canProceed}>{nextText}</Button>
  </div>
</div>
```

Revised structure:
```
<div className="p-5 md:p-6">
  <div className="flex flex-col space-y-4">
    {/* Title header - simple, left-aligned */}
    <div className="mb-2">
      <h4 className="text-theme-primary text-base font-medium">About You</h4>
    </div>
    
    {/* Form section with hover effect */}
    <div className="bg-theme-gradient/5 hover:bg-theme-gradient/10 hover:border-theme-primary/20 
                   transition-all duration-300 rounded-lg p-5 border border-theme-border-light">
      <div className="flex items-center mb-4">
        <h4 className="text-base md:text-lg font-medium text-theme-primary">Your Information</h4>
      </div>
      
      {/* Form fields in consistent grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <FormField label="Your Name" error={errors.name} />
        <FormField label="Your Email" error={errors.email} />
        <FormField label="Company/Brand Name" error={errors.company} />
        <FormField label="Your Position" />
      </div>
      
      {/* Mailing list checkbox */}
      <div className="flex items-center mb-2">
        <input type="checkbox" className="mr-2" />
        <label className="text-sm text-theme-secondary">Sign up to our mailing list</label>
      </div>
      
      {/* Security text */}
      <p className="text-xs text-theme-tertiary mb-4">
        Your information is secure and never shared with third parties
      </p>
    </div>
    
    {/* Support text with tracking */}
    <div className="p-2">
      <p className="text-theme-primary text-center text-xl md:text-2xl font-medium tracking-wide">
        We're almost there! Just a few details to personalize your recommendation.
      </p>
    </div>
  </div>
</div>
```

### Recommendation Stage

Current structure:
```
<div className="p-5">
  <div className="bg-theme-bg-surface rounded-lg">
    <div className="header">
      <h2>{title}</h2>
      <div className="pricing">{price}</div>
    </div>
    
    <div className="content">
      <p>{description}</p>
      <div className="features">{features}</div>
    </div>
    
    <div className="extras">{optionalExtras}</div>
    
    <Button onClick={onCTA}>{ctaText}</Button>
  </div>
</div>
```

Revised structure:
```
<div className="p-5 md:p-6">
  <div className="flex flex-col space-y-4">
    {/* Title header - simple, left-aligned */}
    <div className="mb-2">
      <h4 className="text-theme-primary text-base font-medium">Your Perfect Match</h4>
    </div>
    
    {/* Recommendation card with hover effect */}
    <div className="bg-theme-gradient/5 hover:bg-theme-gradient/10 hover:border-theme-primary/20 
                   transition-all duration-300 rounded-lg p-5 border border-theme-border-light">
      <div className="flex flex-col md:flex-row justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-theme-primary">{title}</h3>
          <p className="text-theme-secondary">{tagline}</p>
        </div>
        <div className="text-xl font-bold text-theme-primary">{price}</div>
      </div>
      
      <div className="mb-6">
        {description.map((paragraph, i) => (
          <p key={i} className="text-theme-secondary mb-2">{paragraph}</p>
        ))}
      </div>
      
      {/* About your match section */}
      <div className="mb-4">
        <h4 className="text-base font-medium text-theme-primary mb-2">About your match:</h4>
        <p className="text-theme-secondary mb-2">
          Designed just for you to achieve your goals based on your unique responses:
        </p>
        <ul className="space-y-2 ml-1">
          {responseKeys.map(key => (
            <li className="flex items-start gap-2">
              <div className="mt-1 text-theme-accent-secondary">•</div>
              <p className="text-theme-secondary">{responses[key]}</p>
            </li>
          ))}
        </ul>
      </div>
      
      {/* What you get section */}
      <div className="mb-6">
        <h4 className="text-base font-medium text-theme-primary mb-2">What You Get:</h4>
        <ul className="space-y-2 ml-1">
          {benefits.map((benefit, i) => (
            <li key={i} className="flex items-start gap-2">
              <div className="mt-1 text-theme-accent-secondary">•</div>
              <p className="text-theme-secondary">{benefit}</p>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Optional extras */}
      <div className="mb-6">
        <h4 className="text-base font-medium text-theme-primary mb-2">Optional Extras:</h4>
        <div className="space-y-2">
          {extras.map((extra, i) => (
            <div key={i} className="flex justify-between items-center p-3 border rounded-lg">
              <span className="text-theme-secondary">{extra.name}</span>
              <span className="text-theme-primary font-medium">{extra.price}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Testimonial quote */}
      <div className="bg-theme-bg-primary/30 p-4 rounded-lg mb-6">
        <p className="text-theme-tertiary italic">{testimonial}</p>
      </div>
      
      <button
        onClick={onCTA}
        className="w-full py-3 px-4 bg-theme-primary hover:bg-theme-primary-hover text-white 
                   rounded-lg font-medium transition-colors"
      >
        {ctaText}
      </button>
    </div>
    
    {/* Support text with tracking */}
    <div className="p-2">
      <p className="text-theme-primary text-center text-xl md:text-2xl font-medium tracking-wide">
        The perfect solution tailored to your specific needs
      </p>
    </div>
  </div>
</div>
```

## Implementation Approach

1. **Create Consistent Component Templates**:
   - Extract common layouts and styling patterns into reusable templates
   - Define consistent spacing, sizing, and interaction patterns
   - Ensure all stages follow the same container structure

2. **Update Component Props**:
   - Standardize props across all section components
   - Add support for the new structure and styling patterns
   - Ensure backward compatibility during transition

3. **Phase Implementation**:
   - Start with one section at a time (e.g., team size question first)
   - Test thoroughly after each section implementation
   - Validate responsive behavior on all device sizes

4. **Visual Verification**:
   - Create side-by-side comparisons of old vs new structure
   - Ensure all sections maintain consistent visual language
   - Verify that the user flow feels cohesive and seamless

## Expected Benefits

- **Improved Visual Consistency**: All sections will follow the same structure, creating a more cohesive experience
- **Enhanced Readability**: Cleaner layouts with better typography will improve comprehension
- **Better Engagement**: Interactive hover states and clearer calls-to-action will improve user engagement
- **Easier Maintenance**: Standardized structure makes future updates simpler and more predictable
- **Faster Development**: Reusable patterns can be applied to new sections more quickly