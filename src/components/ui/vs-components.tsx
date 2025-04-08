// VS Components - Helper components that correctly implement light/dark mode styling

// Export text components
export { 
  VSText, 
  VSHeading, 
  VSGradientText 
} from './vs-text';

// Export background components
export {
  VSBackground,
  VSCard,
  VSSection
} from './vs-background';

// Export button components
export {
  VSButton,
  VSIconButton
} from './vs-button';

// Usage guide for developers:
/**
 * These helper components implement the VS styling guide requirements
 * for correct dark mode implementation.
 * 
 * EXAMPLES:
 * 
 * // Text - using inline styles for CSS variables and dark: classes for dark mode
 * <VSText>Regular text with navy color</VSText>
 * <VSText color="--primary-orange)">Orange colored text</VSText>
 * <VSHeading variant="h2">Properly styled heading</VSHeading>
 * <VSGradientText>Gradient text with dark mode support</VSGradientText>
 * 
 * // Backgrounds - using className for CSS variables and dark: variants
 * <VSBackground>Content with standard background</VSBackground>
 * <VSCard>Card with proper styling in both modes</VSCard>
 * <VSSection>Section with all the correct styling patterns</VSSection>
 * 
 * // Buttons - implementing all the VS Bubbly animations
 * <VSButton>Default primary button</VSButton>
 * <VSButton variant="vibrant" size="lg">Large vibrant button</VSButton>
 * <VSIconButton icon={<Icon />}>Button with icon</VSIconButton>
 */