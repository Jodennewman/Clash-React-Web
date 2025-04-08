import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ControllerRenderProps } from 'react-hook-form';
import { AlertCircle, CheckCircle } from 'lucide-react';

// UI Components
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { 
  Form, FormControl, FormField, 
  FormItem, FormLabel, FormMessage 
} from '../ui/form';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from '../ui/card';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

// Form schema
const applicationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  linkedin: z.string().min(1, "LinkedIn profile is required"),
  commitment: z.enum(["yes", "no"], {
    required_error: "Please indicate if you can commit to the program",
  }),
  industry: z.string().min(1, "Please tell us about your work"),
  followerCount: z.string().min(1, "Please enter your follower count"),
  contentTopics: z.string().min(1, "Please tell us what you write about"),
  location: z.string().min(1, "Please tell us where you're based"),
  goals: z.array(z.string()).min(1, "Please select at least one goal"),
  revenueTarget: z.enum(["1k-2k", "4k-8k", "10k-20k", "20k-50k", "50k+"]),
  biggestChallenge: z.enum([
    "timeMotivation", "contentStrategy", "lowEngagement", 
    "platformOverwhelm", "other"
  ]),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

type ProgramBenefitProps = {
  number: string;
  title: string;
  description: string;
};

// Program benefits component
const ProgramBenefit = ({ number, title, description }: ProgramBenefitProps) => (
  <div className="flex gap-4 mb-5">
    <div className="bg-theme-primary text-theme-on-primary-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 transition-colors duration-[var(--theme-transition-normal)]">
      {number}
    </div>
    <div>
      <h4 className="font-bold text-theme-primary mb-1 transition-colors duration-[var(--theme-transition-normal)]">{title}</h4>
      <p className="text-sm text-theme-secondary transition-colors duration-[var(--theme-transition-normal)]">{description}</p>
    </div>
  </div>
);

const VerticalShortcutApplicationForm = ({ onClose }: { onClose?: () => void }) => {
  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      linkedin: '',
      commitment: undefined,
      industry: '',
      followerCount: '',
      contentTopics: '',
      location: '',
      goals: [],
      revenueTarget: undefined,
      biggestChallenge: undefined,
      termsAccepted: false,
    },
  });

  const onSubmit = async (data: ApplicationFormData) => {
    console.log(data);
    // Submit form data to your API here
    alert("Application submitted successfully! We'll be in touch within 48 hours.");
    
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="rounded-xl overflow-y-auto max-h-[80vh] bg-theme-surface transition-colors duration-[var(--theme-transition-normal)]">
      <div className="text-center p-8 pb-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-theme-primary transition-colors duration-[var(--theme-transition-normal)]">
          Vertical Shortcut: Transform Your Content into a Revenue Machine
        </h1>
        <p className="text-xl text-theme-secondary md:max-w-2xl mx-auto transition-colors duration-[var(--theme-transition-normal)]">
          Complete this application to join our exclusive program and start your journey to content mastery.
        </p>
      </div>
      
      <Card className="shadow-theme-md border-theme-border mb-10 relative overflow-hidden transition-all duration-[var(--theme-transition-normal)]">
        <CardHeader className="bg-theme-accent-secondary text-theme-on-primary-t-lg transition-colors duration-[var(--theme-transition-normal)]">
          <CardTitle className="text-2xl">Vertical Shortcut Application Form</CardTitle>
          <CardDescription className="text-theme-on-primary/80">
            Complete this short form to apply for our next cohort (Limited to 20 spots)
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[var(--theme-text-primary)] dark:text-theme-on-primary-b pb-2 border-[var(--theme-bg-secondary)]/20 dark:border-theme-border-light">Personal Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }: { field: ControllerRenderProps<ApplicationFormData, "firstName"> }) => (
                      <FormItem>
                        <FormLabel className="text-theme-primary transition-colors duration-[var(--theme-transition-normal)]">First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} className="bg-theme-surface transition-colors duration-[var(--theme-transition-normal)]" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }: { field: ControllerRenderProps<ApplicationFormData, "lastName"> }) => (
                      <FormItem>
                        <FormLabel className="text-theme-primary transition-colors duration-[var(--theme-transition-normal)]">Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} className="bg-theme-surface transition-colors duration-[var(--theme-transition-normal)]" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }: { field: ControllerRenderProps<ApplicationFormData, "email"> }) => (
                      <FormItem>
                        <FormLabel className="text-theme-primary transition-colors duration-[var(--theme-transition-normal)]">Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@example.com" {...field} className="bg-theme-surface transition-colors duration-[var(--theme-transition-normal)]" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="linkedin"
                    render={({ field }: { field: ControllerRenderProps<ApplicationFormData, "linkedin"> }) => (
                      <FormItem>
                        <FormLabel className="text-theme-primary transition-colors duration-[var(--theme-transition-normal)]">LinkedIn Profile</FormLabel>
                        <FormControl>
                          <Input placeholder="linkedin.com/in/yourprofile" {...field} className="bg-theme-surface transition-colors duration-[var(--theme-transition-normal)]" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              {/* Program benefits section */}
              <div className="p-5 rounded-lg border border-theme-primary/20 bg-theme-gradient shadow-theme-sm transition-all duration-[var(--theme-transition-normal)]">
                <h3 className="text-xl font-semibold text-theme-primary mb-4 transition-colors duration-[var(--theme-transition-normal)]">What You'll Achieve in 10 Weeks:</h3>
                
                <ProgramBenefit 
                  number="1" 
                  title="Master Hook Fundamentals" 
                  description="Learn the psychological triggers that make viewers stop scrolling instantly and watch your content"
                />
                
                <ProgramBenefit 
                  number="2" 
                  title="Build Multiple Income Streams" 
                  description="Implement our revenue generation systems to create consistent income from your content"
                />
                
                <ProgramBenefit 
                  number="3" 
                  title="Scale Your Operations" 
                  description="Transform from a one-person show to a content production machine with our delegation systems"
                />
              </div>
              
              {/* Qualification questions */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-theme-primary border-b pb-2 border-theme-border transition-all duration-[var(--theme-transition-normal)]">Qualification Questions</h3>
                
                <FormField
                  control={form.control}
                  name="commitment"
                  render={({ field }: { field: ControllerRenderProps<ApplicationFormData, "commitment"> }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-theme-primary transition-colors duration-[var(--theme-transition-normal)]">
                        Vertical Shortcut is about fast growth and monetisation. Are you prepared to work hard for 10 weeks and dedicate at least 4 hours per week?
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-2"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="yes" />
                            </FormControl>
                            <FormLabel className="font-normal text-theme-primary transition-colors duration-[var(--theme-transition-normal)]">
                              Yes, I can commit to this
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="no" />
                            </FormControl>
                            <FormLabel className="font-normal text-theme-primary transition-colors duration-[var(--theme-transition-normal)]">
                              No, I can't commit to this right now
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }: { field: ControllerRenderProps<ApplicationFormData, "industry"> }) => (
                    <FormItem>
                      <FormLabel className="text-theme-primary transition-colors duration-[var(--theme-transition-normal)]">What kind of work do you do? (Industry, seniority, etc.)</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-theme-surface transition-colors duration-[var(--theme-transition-normal)]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="followerCount"
                    render={({ field }: { field: ControllerRenderProps<ApplicationFormData, "followerCount"> }) => (
                      <FormItem>
                        <FormLabel className="text-theme-primary transition-colors duration-[var(--theme-transition-normal)]">What are your total follower counts across all platforms?</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-theme-surface transition-colors duration-[var(--theme-transition-normal)]" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }: { field: ControllerRenderProps<ApplicationFormData, "location"> }) => (
                      <FormItem>
                        <FormLabel className="text-theme-primary transition-colors duration-[var(--theme-transition-normal)]">Where are you based?</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-theme-surface transition-colors duration-[var(--theme-transition-normal)]" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="contentTopics"
                  render={({ field }: { field: ControllerRenderProps<ApplicationFormData, "contentTopics"> }) => (
                    <FormItem>
                      <FormLabel className="text-theme-primary transition-colors duration-[var(--theme-transition-normal)]">What topics do you create content about?</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-theme-surface transition-colors duration-[var(--theme-transition-normal)]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="goals"
                  render={({ field }: { field: ControllerRenderProps<ApplicationFormData, "goals"> }) => (
                    <FormItem>
                      <div className="mb-2">
                        <FormLabel className="text-theme-primary transition-colors duration-[var(--theme-transition-normal)]">What do you want to achieve? (Select all that apply)</FormLabel>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {[
                          {value: "revenue", label: "Increased revenue"},
                          {value: "leads", label: "Increased leads"},
                          {value: "followers", label: "Increased followers"},
                          {value: "brand", label: "Build a large personal brand"}
                        ].map((item) => (
                          <FormItem
                            key={item.value}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value.includes(item.value)}
                                onCheckedChange={(checked) => {
                                  const current = field.value;
                                  if (checked) {
                                    field.onChange(current.concat(item.value));
                                  } else {
                                    field.onChange(current.filter(val => val !== item.value));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal text-theme-primary transition-colors duration-[var(--theme-transition-normal)]">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="revenueTarget"
                  render={({ field }: { field: ControllerRenderProps<ApplicationFormData, "revenueTarget"> }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-theme-primary transition-colors duration-[var(--theme-transition-normal)]">How much are you aiming to make per month?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-wrap gap-3"
                        >
                          {[
                            {value: "1k-2k", label: "£1k-£2k"},
                            {value: "4k-8k", label: "£4k-£8k"},
                            {value: "10k-20k", label: "£10k-£20k"},
                            {value: "20k-50k", label: "£20k-£50k"},
                            {value: "50k+", label: "£50k+"}
                          ].map((item) => (
                            <FormItem key={item.value} className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value={item.value} />
                              </FormControl>
                              <FormLabel className="font-normal text-theme-primary transition-colors duration-[var(--theme-transition-normal)]">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="biggestChallenge"
                  render={({ field }: { field: ControllerRenderProps<ApplicationFormData, "biggestChallenge"> }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-theme-primary transition-colors duration-[var(--theme-transition-normal)]">What do you struggle with the most when it comes to scaling your brand?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="space-y-2"
                        >
                          {[
                            {value: "timeMotivation", label: "Lack of time and/or motivation"},
                            {value: "contentStrategy", label: "Not sure what to post or how to stand out"},
                            {value: "lowEngagement", label: "Low engagement / slow audience growth"},
                            {value: "platformOverwhelm", label: "Overwhelmed by social media strategies and algorithms"},
                            {value: "other", label: "Other"}
                          ].map((item) => (
                            <FormItem key={item.value} className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value={item.value} />
                              </FormControl>
                              <FormLabel className="font-normal text-theme-primary transition-colors duration-[var(--theme-transition-normal)]">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Program details */}
              <div className="p-6 rounded-lg bg-theme-gradient-primary shadow-theme-md transition-all duration-[var(--theme-transition-normal)]">
                <h3 className="text-xl font-bold mb-4 text-theme-on-primary">The Vertical Shortcut Program:</h3>
                
                <ul className="space-y-3 mb-4">
                  <li className="flex gap-2">
                    <CheckCircle className="text-theme-on-primary-5 w-5 flex-shrink-0 mt-0.5" />
                    <span className="text-theme-on-primary/90">10-week transformation program that will deliver real business results</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="text-theme-on-primary-5 w-5 flex-shrink-0 mt-0.5" />
                    <span className="text-theme-on-primary/90">Program investment: £6,500 (10% discount for full payment, or 4 installments of £1,625)</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="text-theme-on-primary-5 w-5 flex-shrink-0 mt-0.5" />
                    <span className="text-theme-on-primary/90">Limited to 20 participants to ensure personalized attention</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="text-theme-on-primary-5 w-5 flex-shrink-0 mt-0.5" />
                    <span className="text-theme-on-primary/90">100% money-back guarantee if your application isn't accepted or spots are filled</span>
                  </li>
                </ul>
                
                <Alert className="bg-theme-accent-tertiary border-none text-theme-on-primary-4 transition-colors duration-[var(--theme-transition-normal)]">
                  <AlertCircle className="h-5 w-5" />
                  <AlertTitle className="text-theme-on-primary-bold">Application Closing Soon</AlertTitle>
                  <AlertDescription className="text-theme-on-primary/90">
                    We're filling spots for our next cohort now. Submit your application today to be considered.
                  </AlertDescription>
                </Alert>
              </div>
              
              {/* Terms and submit */}
              <FormField
                control={form.control}
                name="termsAccepted"
                render={({ field }: { field: ControllerRenderProps<ApplicationFormData, "termsAccepted"> }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-theme-primary transition-colors duration-[var(--theme-transition-normal)]">
                        I agree to the <a href="#" className="text-theme-accent-tertiary underline transition-colors duration-[var(--theme-transition-normal)]">Terms and Conditions</a> and understand the program investment of £6,500
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full py-6 text-lg bg-theme-gradient-primary text-theme-on-primary-theme-btn hover-bubbly transition-all duration-[var(--theme-transition-bounce)]"
              >
                Submit Application Now
              </Button>
              
              <p className="text-center text-sm text-theme-secondary transition-colors duration-[var(--theme-transition-normal)]">
                After submission, our team will review your application within 2 business days.
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerticalShortcutApplicationForm;