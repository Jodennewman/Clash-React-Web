import { z } from "zod";

// Enum options for multiple choice questions
const contentGoalsEnum = z.enum([
  "buildAuthority",
  "increaseRevenue",
  "generateLeads",
  "buildCommunity",
  "allOfTheAbove"
]);

const revenueTargetEnum = z.enum([
  "under5k",
  "5kTo10k",
  "10kTo25k",
  "25kTo50k",
  "50kPlus"
]);

const contentChallengeEnum = z.enum([
  "noTime",
  "lacksStrategy",
  "inconsistentResults",
  "teamChaos",
  "platformOverwhelm",
  "poorConversion",
  "other"
]);

const teamSizeEnum = z.enum([
  "soloFounder",
  "smallTeam",
  "dedicatedCreative",
  "marketingTeam",
  "agency"
]);

const contentExperienceEnum = z.enum([
  "beginner",
  "occasional",
  "regular",
  "experienced"
]);

// Define the Vertical Shortcut application form schema
export const verticalShortcutApplicationSchema = z.object({
  // Personal Information
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" })
    .max(50, { message: "First name must be less than 50 characters" }),
  
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" })
    .max(50, { message: "Last name must be less than 50 characters" }),
  
  email: z
    .string()
    .email({ message: "Please enter a valid email address" }),
  
  companyName: z
    .string()
    .min(2, { message: "Company name must be at least 2 characters" })
    .max(100, { message: "Company name must be less than 100 characters" }),
  
  // Social Media Info
  socialLinks: z.object({
    tiktok: z.string().optional(),
    instagram: z.string().optional(),
    linkedin: z.string().optional(),
    youtube: z.string().optional(),
  }).refine(data => 
    Object.values(data).some(value => value && value.trim() !== ""), 
    { message: "Please provide at least one social media link" }
  ),
  
  // Content Creation Readiness
  dedicationAgreement: z
    .boolean()
    .refine(val => val === true, { 
      message: "You must agree to dedicate at least 4 hours weekly to content creation" 
    }),
  
  // Business & Industry Information
  industryType: z
    .string()
    .min(2, { message: "Please specify your industry" })
    .max(100),
  
  targetAudience: z
    .string()
    .min(10, { message: "Please describe your target audience in more detail" })
    .max(500),
  
  // Content Experience & Goals
  contentExperience: contentExperienceEnum,
  
  totalFollowersCount: z
    .string()
    .min(1, { message: "Please provide your total follower count" }),
  
  contentTopics: z
    .string()
    .min(10, { message: "Please describe your content topics in more detail" })
    .max(500),
  
  locationCountry: z
    .string()
    .min(2, { message: "Please specify your country" }),
  
  // Growth & Revenue Goals
  contentGoals: contentGoalsEnum,
  
  monthlyRevenueTarget: revenueTargetEnum,
  
  biggestContentChallenge: contentChallengeEnum,
  
  otherChallenge: z
    .string()
    .max(500)
    .optional(),
  
  // Team Structure
  teamStructure: teamSizeEnum,
  
  // Additional Information
  previousCoursesOrPrograms: z
    .string()
    .max(500)
    .optional(),
  
  // How did you hear about us
  referralSource: z
    .string()
    .min(2, { message: "Please let us know how you heard about us" })
    .max(200),
  
  // Application-specific questions
  whyJoin: z
    .string()
    .min(20, { message: "Please tell us more about why you want to join" })
    .max(1000),
  
  // Terms acceptance
  termsAndConditions: z
    .boolean()
    .refine(val => val === true, { 
      message: "You must agree to the terms and conditions" 
    }),
  
  // Privacy Policy
  privacyPolicy: z
    .boolean()
    .refine(val => val === true, { 
      message: "You must agree to the privacy policy" 
    }),
});

// Type inference from the schema
export type VerticalShortcutApplication = z.infer<typeof verticalShortcutApplicationSchema>;

// Example application data validation
export const validateApplication = (data: unknown) => {
  return verticalShortcutApplicationSchema.safeParse(data);
};

// Form submission helper with error handling
export const submitApplicationForm = async (formData: VerticalShortcutApplication) => {
  const validationResult = validateApplication(formData);
  
  if (!validationResult.success) {
    return {
      success: false,
      errors: validationResult.error.format()
    };
  }
  
  try {
    // Here you would normally send the data to your API
    // const response = await fetch('https://api.verticalshortcut.com/applications', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(validationResult.data),
    // });
    
    // if (!response.ok) {
    //   throw new Error('Failed to submit application');
    // }
    
    // const responseData = await response.json();
    
    // For now, we'll simulate a successful submission
    return {
      success: true,
      // applicationId: responseData.applicationId
      applicationId: "VS-" + Math.floor(Math.random() * 10000)
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      errors: {
        server: "There was an error submitting your application. Please try again."
      }
    };
  }
};
