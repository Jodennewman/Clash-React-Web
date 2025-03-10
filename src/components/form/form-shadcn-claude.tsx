import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ControllerRenderProps } from 'react-hook-form';
import { Link } from 'react-router-dom';

// UI Components
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Checkbox } from '../../components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { 
  Form, FormControl, FormField, 
  FormItem, FormLabel, FormMessage 
} from '../../components/ui/form';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from '../../components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';
import Glow from '../../components/ui/glow';

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

// Testimonial component
type TestimonialProps = {
  quote: string;
  author: string;
  position: string;
};

const Testimonial = ({ quote, author, position }: TestimonialProps) => (
  <div className="bg-[#FDEBDD] p-5 rounded-lg my-6 border-l-4 border-[#FEA35D]">
    <p className="italic text-[#09232F] mb-2">"{quote}"</p>
    <div className="font-semibold text-[#154D59]">{author} <span className="font-normal text-sm">• {position}</span></div>
  </div>
);

type ProgramBenefitProps = {
  number: string;
  title: string;
  description: string;
};

// Program benefits component
const ProgramBenefit = ({ number, title, description }: ProgramBenefitProps) => (
  <div className="flex gap-4 mb-5">
    <div className="bg-[#FEA35D] text-white font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
      {number}
    </div>
    <div>
      <h4 className="font-bold text-[#154D59] mb-1">{title}</h4>
      <p className="text-sm text-[#09232F]/80">{description}</p>
    </div>
  </div>
);

const VerticalShortcutApplicationForm = () => {
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--deep-blue)] to-[color(display-p3_0.008_0.08_0.106)] py-12">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <div className="mb-8">
          <Link to="/">
            <Button 
              variant="outline" 
              className="border border-[var(--primary-orange)]/30 text-[var(--primary-orange)] hover:bg-[var(--primary-orange)]/10"
            >
              &larr; Back to Home
            </Button>
          </Link>
        </div>
        
        {/* Header with compelling offer */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-[#09232F]">
            Vertical Shortcut: Transform Your Content into a Revenue Machine
          </h1>
          <p className="text-xl text-[#154D59] md:max-w-2xl mx-auto">
            Join our exclusive 10-week program and learn how to create content that generates consistent leads and revenue.
          </p>
          
          {/* Key stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-8 mb-2">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#B92234]">10 Weeks</div>
              <div className="text-sm">Transformation</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#B92234]">£6,500</div>
              <div className="text-sm">Investment</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#B92234]">4 Hours/Week</div>
              <div className="text-sm">Commitment</div>
            </div>
          </div>
        </div>

        {/* Featured testimonial */}
        <Testimonial 
          quote="Vertical Shortcut completely transformed my approach to content. I went from barely making £1,000/month to consistently earning £12,000+ in just 8 weeks. The ROI is incredible."
          author="James Lewis"
          position="Marketing Consultant"
        />
        
        <Card className="shadow-lg border-[#FDEBDD] mb-10 relative overflow-hidden">
          <Glow variant="above" className="opacity-30" />
          <CardHeader className="bg-[#09232F] text-white rounded-t-lg">
            <CardTitle className="text-2xl">Vertical Shortcut Application Form</CardTitle>
            <CardDescription className="text-white/80">
              Complete this short form to apply for our next cohort (Limited to 20 spots)
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Information Section */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-[#154D59] border-b pb-2">Personal Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }: { field: ControllerRenderProps<ApplicationFormData, "firstName"> }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
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
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
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
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="you@example.com" {...field} />
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
                          <FormLabel>LinkedIn Profile</FormLabel>
                          <FormControl>
                            <Input placeholder="linkedin.com/in/yourprofile" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                {/* Program benefits section */}
                <div className="bg-[#FFF5E9] p-5 rounded-lg">
                  <h3 className="text-xl font-semibold text-[#154D59] mb-4">What You'll Achieve in 10 Weeks:</h3>
                  
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
                  <h3 className="text-xl font-semibold text-[#154D59] border-b pb-2">Qualification Questions</h3>
                  
                  <FormField
                    control={form.control}
                    name="commitment"
                    render={({ field }: { field: ControllerRenderProps<ApplicationFormData, "commitment"> }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>
                          Vertical Shortcut is about fast growth and monetisation. Are you prepared to work hard for 10 weeks and dedicate at least 4 hours per week?
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="yes" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Yes, I can commit to this
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="no" />
                              </FormControl>
                              <FormLabel className="font-normal">
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
                        <FormLabel>What kind of work do you do? (Industry, seniority, etc.)</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                          <FormLabel>What are your total follower counts across all platforms?</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                          <FormLabel>Where are you based?</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                        <FormLabel>What topics do you create content about?</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                          <FormLabel>What do you want to achieve? (Select all that apply)</FormLabel>
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
                              <FormLabel className="font-normal">
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
                        <FormLabel>How much are you aiming to make per month?</FormLabel>
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
                                <FormLabel className="font-normal">
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
                        <FormLabel>What do you struggle with the most when it comes to scaling your brand?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="space-y-1"
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
                                <FormLabel className="font-normal">
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
                <div className="bg-[#09232F] text-white p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">The Vertical Shortcut Program:</h3>
                  
                  <ul className="space-y-3 mb-4">
                    <li className="flex gap-2">
                      <span className="text-[#FEA35D]">•</span>
                      <span>10-week transformation program that will deliver real business results</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#FEA35D]">•</span>
                      <span>Program investment: £6,500 (10% discount for full payment, or 4 installments of £1,625)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#FEA35D]">•</span>
                      <span>Limited to 20 participants to ensure personalized attention</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#FEA35D]">•</span>
                      <span>100% money-back guarantee if your application isn't accepted or spots are filled</span>
                    </li>
                  </ul>
                  
                  <Alert className="bg-[#154D59] border-[#FEA35D] mt-4">
                    <AlertTitle className="text-[#FEA35D]">Application Closing Soon</AlertTitle>
                    <AlertDescription className="text-white/90">
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
                        <FormLabel>
                          I agree to the <a href="#" className="text-[#B92234] underline">Terms and Conditions</a> and understand the program investment of £6,500
                        </FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full py-6 text-lg bg-[#B92234] hover:bg-[#DE6B59]"
                >
                  Submit Application Now
                </Button>
                
                <p className="text-center text-sm text-gray-500">
                  After submission, our team will review your application within 2 business days.
                </p>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerticalShortcutApplicationForm;