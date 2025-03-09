import React, { useState } from 'react';
import { ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

const VerticalShortcutApplicationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    socialLinks: {
      tiktok: '',
      instagram: '',
      linkedin: '',
      youtube: '',
    },
    dedicationAgreement: false,
    industryType: '',
    targetAudience: '',
    contentExperience: '',
    totalFollowersCount: '',
    contentTopics: '',
    locationCountry: '',
    contentGoals: '',
    monthlyRevenueTarget: '',
    biggestContentChallenge: '',
    otherChallenge: '',
    teamStructure: '',
    previousCoursesOrPrograms: '',
    referralSource: '',
    whyJoin: '',
    termsAndConditions: false,
    privacyPolicy: false,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalSteps = 5;

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  // Validate the current step
  const validateStep = (step) => {
    const newErrors = {};
    
    switch(step) {
      case 1:
        if (!formData.firstName) newErrors.firstName = "First name is required";
        if (!formData.lastName) newErrors.lastName = "Last name is required";
        if (!formData.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
        if (!formData.companyName) newErrors.companyName = "Company name is required";
        break;
        
      case 2:
        const hasSocialLink = Object.values(formData.socialLinks).some(link => link && link.trim() !== '');
        if (!hasSocialLink) newErrors.socialLinks = "At least one social media link is required";
        if (!formData.dedicationAgreement) newErrors.dedicationAgreement = "You must agree to dedicate the time";
        break;
        
      case 3:
        if (!formData.industryType) newErrors.industryType = "Industry is required";
        if (!formData.targetAudience) newErrors.targetAudience = "Target audience is required";
        if (!formData.contentExperience) newErrors.contentExperience = "Please select your experience level";
        if (!formData.contentTopics) newErrors.contentTopics = "Content topics are required";
        break;
        
      case 4:
        if (!formData.contentGoals) newErrors.contentGoals = "Please select your main goal";
        if (!formData.monthlyRevenueTarget) newErrors.monthlyRevenueTarget = "Please select a revenue target";
        if (!formData.biggestContentChallenge) newErrors.biggestContentChallenge = "Please select your biggest challenge";
        if (formData.biggestContentChallenge === 'other' && !formData.otherChallenge) {
          newErrors.otherChallenge = "Please describe your challenge";
        }
        break;
        
      case 5:
        if (!formData.whyJoin) newErrors.whyJoin = "Please tell us why you want to join";
        if (!formData.termsAndConditions) newErrors.termsAndConditions = "You must agree to the terms and conditions";
        if (!formData.privacyPolicy) newErrors.privacyPolicy = "You must agree to the privacy policy";
        break;
        
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Move to the next step
  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
      } else {
        handleSubmit();
      }
    }
  };

  // Move to the previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (validateStep(currentStep)) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        console.log("Form submitted:", formData);
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1500);
    }
  };

  // Render form progress bar
  const renderProgress = () => {
    return (
      <div className="form-progress mb-8">
        <div className="progress-bar-container bg-gray-800 h-2 w-full rounded-full mb-2">
          <div 
            className="progress-bar h-full rounded-full" 
            style={{ 
              width: `${(currentStep / totalSteps) * 100}%`,
              background: 'linear-gradient(to right, #FEAF52, #E76662)' 
            }}
          ></div>
        </div>
        <div className="flex justify-between">
          {[...Array(totalSteps)].map((_, i) => (
            <div 
              key={i} 
              className={`step-indicator flex flex-col items-center`}
            >
              <div 
                className={`w-8 h-8 rounded-full mb-2 flex items-center justify-center ${
                  i + 1 === currentStep 
                    ? 'bg-gradient-to-r from-[#FEAF52] to-[#E76662] text-white' 
                    : i + 1 < currentStep 
                      ? 'bg-gradient-to-r from-[#33626F] to-[#378596] text-white' 
                      : 'bg-gray-800 text-gray-500'
                }`}
              >
                {i + 1}
              </div>
              <span className={`text-xs ${i + 1 === currentStep ? 'text-[#FEAF52]' : 'text-gray-500'}`}>
                {['Personal', 'Social', 'Content', 'Goals', 'Finish'][i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render form steps
  const renderFormStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="step-content">
            <h2 className="text-2xl font-bold mb-6 text-white">Personal Information</h2>
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg bg-gray-800 border ${errors.firstName ? 'border-red-500' : 'border-gray-700'} text-white`}
                placeholder="Your first name"
              />
              {errors.firstName && <p className="text-red-500 mt-1 text-sm">{errors.firstName}</p>}
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg bg-gray-800 border ${errors.lastName ? 'border-red-500' : 'border-gray-700'} text-white`}
                placeholder="Your last name"
              />
              {errors.lastName && <p className="text-red-500 mt-1 text-sm">{errors.lastName}</p>}
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg bg-gray-800 border ${errors.email ? 'border-red-500' : 'border-gray-700'} text-white`}
                placeholder="your.email@example.com"
              />
              {errors.email && <p className="text-red-500 mt-1 text-sm">{errors.email}</p>}
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Company Name *</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg bg-gray-800 border ${errors.companyName ? 'border-red-500' : 'border-gray-700'} text-white`}
                placeholder="Your company name"
              />
              {errors.companyName && <p className="text-red-500 mt-1 text-sm">{errors.companyName}</p>}
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="step-content">
            <h2 className="text-2xl font-bold mb-6 text-white">Social & Commitment</h2>
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">TikTok Profile URL</label>
              <input
                type="text"
                name="socialLinks.tiktok"
                value={formData.socialLinks.tiktok}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
                placeholder="https://tiktok.com/@yourusername"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Instagram Profile URL</label>
              <input
                type="text"
                name="socialLinks.instagram"
                value={formData.socialLinks.instagram}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
                placeholder="https://instagram.com/yourusername"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">LinkedIn Profile URL</label>
              <input
                type="text"
                name="socialLinks.linkedin"
                value={formData.socialLinks.linkedin}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
                placeholder="https://linkedin.com/in/yourusername"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">YouTube Channel URL</label>
              <input
                type="text"
                name="socialLinks.youtube"
                value={formData.socialLinks.youtube}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
                placeholder="https://youtube.com/@yourusername"
              />
            </div>
            
            {errors.socialLinks && <p className="text-red-500 mb-4 text-sm">{errors.socialLinks}</p>}
            
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="dedicationAgreement"
                  checked={formData.dedicationAgreement}
                  onChange={handleChange}
                  className="mr-3 h-5 w-5 accent-[#FEAF52]"
                />
                <span className={`text-${errors.dedicationAgreement ? 'red-500' : 'gray-300'}`}>
                  I agree to dedicate at least 4 hours weekly to implement the Vertical Shortcut system *
                </span>
              </label>
              {errors.dedicationAgreement && <p className="text-red-500 mt-1 text-sm">{errors.dedicationAgreement}</p>}
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="step-content">
            <h2 className="text-2xl font-bold mb-6 text-white">Content Experience</h2>
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Industry Type *</label>
              <input
                type="text"
                name="industryType"
                value={formData.industryType}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg bg-gray-800 border ${errors.industryType ? 'border-red-500' : 'border-gray-700'} text-white`}
                placeholder="e.g., SaaS, E-commerce, Healthcare, etc."
              />
              {errors.industryType && <p className="text-red-500 mt-1 text-sm">{errors.industryType}</p>}
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Who is your target audience? *</label>
              <textarea
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg bg-gray-800 border ${errors.targetAudience ? 'border-red-500' : 'border-gray-700'} text-white h-24`}
                placeholder="Describe your ideal customer or audience"
              ></textarea>
              {errors.targetAudience && <p className="text-red-500 mt-1 text-sm">{errors.targetAudience}</p>}
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Your content creation experience level *</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { value: 'beginner', label: 'Beginner (Haven\'t started yet)' },
                  { value: 'occasional', label: 'Occasional (Post a few times a month)' },
                  { value: 'regular', label: 'Regular (Post weekly)' },
                  { value: 'experienced', label: 'Experienced (Consistent system in place)' }
                ].map(option => (
                  <label key={option.value} className={`flex items-center p-3 border ${formData.contentExperience === option.value ? 'border-[#FEAF52] bg-[#FEAF52]/10' : 'border-gray-700 bg-gray-800'} rounded-lg cursor-pointer transition-all duration-200`}>
                    <input
                      type="radio"
                      name="contentExperience"
                      value={option.value}
                      checked={formData.contentExperience === option.value}
                      onChange={handleChange}
                      className="mr-3 h-4 w-4 accent-[#FEAF52]"
                    />
                    <span className="text-gray-200">{option.label}</span>
                  </label>
                ))}
              </div>
              {errors.biggestContentChallenge && <p className="text-red-500 mt-1 text-sm">{errors.biggestContentChallenge}</p>}
            </div>
            
            {formData.biggestContentChallenge === 'other' && (
              <div className="mb-6">
                <label className="block text-gray-300 mb-2">Please describe your challenge *</label>
                <textarea
                  name="otherChallenge"
                  value={formData.otherChallenge}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-lg bg-gray-800 border ${errors.otherChallenge ? 'border-red-500' : 'border-gray-700'} text-white h-24`}
                  placeholder="Tell us about your specific content challenge"
                ></textarea>
                {errors.otherChallenge && <p className="text-red-500 mt-1 text-sm">{errors.otherChallenge}</p>}
              </div>
            )}
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Team structure</label>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { value: 'soloFounder', label: 'Solo founder (doing everything myself)' },
                  { value: 'smallTeam', label: 'Small team (but no dedicated content creators)' },
                  { value: 'dedicatedCreative', label: 'Have 1-2 dedicated content creators' },
                  { value: 'marketingTeam', label: 'Full marketing team with content department' },
                  { value: 'agency', label: 'Working with agency/freelancers' }
                ].map(option => (
                  <label key={option.value} className={`flex items-center p-3 border ${formData.teamStructure === option.value ? 'border-[#FEAF52] bg-[#FEAF52]/10' : 'border-gray-700 bg-gray-800'} rounded-lg cursor-pointer transition-all duration-200`}>
                    <input
                      type="radio"
                      name="teamStructure"
                      value={option.value}
                      checked={formData.teamStructure === option.value}
                      onChange={handleChange}
                      className="mr-3 h-4 w-4 accent-[#FEAF52]"
                    />
                    <span className="text-gray-200">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="step-content">
            <h2 className="text-2xl font-bold mb-6 text-white">Final Details</h2>
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">How did you hear about the Vertical Shortcut?</label>
              <input
                type="text"
                name="referralSource"
                value={formData.referralSource}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
                placeholder="e.g., Social media, friend, search engine, etc."
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Why do you want to join the Vertical Shortcut? *</label>
              <textarea
                name="whyJoin"
                value={formData.whyJoin}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg bg-gray-800 border ${errors.whyJoin ? 'border-red-500' : 'border-gray-700'} text-white h-32`}
                placeholder="Tell us about your goals and why you want to join this program"
              ></textarea>
              {errors.whyJoin && <p className="text-red-500 mt-1 text-sm">{errors.whyJoin}</p>}
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Previous courses or programs (optional)</label>
              <textarea
                name="previousCoursesOrPrograms"
                value={formData.previousCoursesOrPrograms}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white h-24"
                placeholder="List any relevant courses or programs you've completed"
              ></textarea>
            </div>
            
            <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
              <p className="text-gray-300 mb-4">The Vertical Shortcut is a 12-week transformation program that includes:</p>
              <ul className="list-disc pl-5 mb-4 text-gray-300 space-y-2">
                <li>Complete access to all course modules and resources</li>
                <li>Weekly group coaching sessions</li>
                <li>Private community access for networking and support</li>
                <li>Templates, swipe files, and implementation guides</li>
                <li>Beta cohort with extra 1:1 support and early adopter pricing</li>
              </ul>
              <p className="text-gray-300">Investment options:</p>
              <ul className="list-disc pl-5 mb-4 text-gray-300 space-y-2">
                <li>Full payment: £4,600 (save 10%)</li>
                <li>Installment plan: 3 monthly payments of £1,685</li>
              </ul>
              <p className="text-gray-300 text-sm">Limited to 10 spots for this beta cohort. Your application does not guarantee acceptance.</p>
            </div>
            
            <div className="mb-6">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="termsAndConditions"
                  checked={formData.termsAndConditions}
                  onChange={handleChange}
                  className="mr-3 h-5 w-5 mt-1 accent-[#FEAF52]"
                />
                <span className={`text-${errors.termsAndConditions ? 'red-500' : 'gray-300'}`}>
                  I agree to the Vertical Shortcut's <a href="#" className="text-[#FEAF52] underline">Terms and Conditions</a> *
                </span>
              </label>
              {errors.termsAndConditions && <p className="text-red-500 mt-1 text-sm">{errors.termsAndConditions}</p>}
            </div>
            
            <div className="mb-6">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="privacyPolicy"
                  checked={formData.privacyPolicy}
                  onChange={handleChange}
                  className="mr-3 h-5 w-5 mt-1 accent-[#FEAF52]"
                />
                <span className={`text-${errors.privacyPolicy ? 'red-500' : 'gray-300'}`}>
                  I agree to the Vertical Shortcut's <a href="#" className="text-[#FEAF52] underline">Privacy Policy</a> *
                </span>
              </label>
              {errors.privacyPolicy && <p className="text-red-500 mt-1 text-sm">{errors.privacyPolicy}</p>}
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  // Success message after submission
  const renderSuccessMessage = () => {
    return (
      <div className="bg-gray-800 rounded-lg p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#FEAF52] to-[#E76662] rounded-full mb-6">
          <CheckCircle className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-3 text-white">Application Submitted!</h2>
        <p className="text-gray-300 mb-6">
          Thank you for applying to the Vertical Shortcut program. Our team will review your application and contact you within 2-3 business days.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg mb-6">
          <p className="text-gray-400 text-sm">Application Reference:</p>
          <p className="text-[#FEAF52] font-bold">VS-{Math.floor(Math.random() * 10000)}</p>
        </div>
        <p className="text-gray-300 mb-6">
          While you wait, check your email for a confirmation message with next steps.
        </p>
        <a 
          href="#" 
          className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#FEAF52] to-[#E76662] text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
        >
          Return to Home
        </a>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-[#08141B] rounded-xl p-6 sm:p-10 w-full max-w-4xl shadow-2xl border border-gray-800">
        {!isSubmitted ? (
          <>
            <div className="text-center mb-10">
              <div className="w-32 h-16 mx-auto mb-6">
                <svg viewBox="0 0 156 87" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path d="M66.7891 19.8562L67.1486 19.0352H67.1486L66.7891 19.8562ZM125.516 43.8891L126.102 44.5983H126.102L125.516 43.8891ZM34.6892 64.2773L35.4387 63.8003V63.8003L34.6892 64.2773ZM66.4297 20.6772C67.0134 21.0979 67.8129 20.9823 68.2336 20.3986C68.6543 19.8149 68.5387 19.0153 67.955 18.5946L66.4297 20.6772ZM55.0859 15.6973C54.4342 16.0173 54.1531 16.7821 54.4731 17.4338C54.7931 18.0855 55.5579 18.3666 56.2096 18.0466L55.0859 15.6973ZM67.955 18.5946C67.3713 18.1739 66.5717 18.2895 66.1511 18.8732C65.7304 19.4569 65.846 20.2565 66.4297 20.6772L67.955 18.5946ZM79.3047 23.6564C79.9564 23.3365 80.2375 22.5717 79.9175 21.92C79.5975 21.2683 78.8327 20.9872 78.181 21.3071L79.3047 23.6564ZM107.535 78.4775C107.091 79.0413 107.176 79.8449 107.74 80.289C108.304 80.733 109.107 80.6475 109.552 80.0837L107.535 78.4775ZM128.066 57.5061C128.51 56.9423 128.425 56.1386 127.861 55.6946C127.297 55.2506 126.493 55.3361 126.049 55.8999L128.066 57.5061ZM126.049 55.8999C125.605 56.4637 125.691 57.2673 126.254 57.7114C126.818 58.1554 127.622 58.0699 128.066 57.5061L126.049 55.8999ZM109.552 34.921C110.107 35.3651 110.911 35.2797 111.355 34.7159C111.799 34.1521 111.714 33.3484 111.15 32.9044L109.552 34.921ZM80.1225 32.9044C79.5587 33.3484 79.4732 34.1521 79.9173 34.7159C80.3613 35.2797 81.165 35.3651 81.7288 34.921L80.1225 32.9044ZM63.6079 57.5061C64.0519 56.9423 63.9664 56.1386 63.4026 55.6946C62.8389 55.2506 62.0352 55.3361 61.5911 55.8999L63.6079 57.5061ZM61.5911 55.8999C61.147 56.4637 61.2325 57.2673 61.7963 57.7114C62.3601 58.1554 63.1638 58.0699 63.6079 57.5061L61.5911 55.8999ZM81.7288 80.0838C82.1728 79.52 82.0873 78.7163 81.5235 78.2723C80.9597 77.8282 80.156 77.9137 79.712 78.4775L81.7288 80.0838ZM50.3165 78.4775C49.8724 79.0413 49.9579 79.845 50.5217 80.289C51.0855 80.733 51.8892 80.6476 52.3332 80.0838L50.3165 78.4775ZM82.9023 49.5027C83.3464 48.9389 83.2609 48.1352 82.6971 47.6912C82.1333 47.2471 81.3296 47.3326 80.8856 47.8964L82.9023 49.5027ZM80.8856 47.8964C80.4415 48.4602 80.527 49.2639 81.0908 49.708C81.6546 50.152 82.4583 50.0665 82.9023 49.5027L80.8856 47.8964ZM50.5217 34.9209C51.0855 35.365 51.8892 35.2795 52.3332 34.7157C52.7773 34.1519 52.6918 33.3483 52.128 32.9042L50.5217 34.9209ZM35.4387 63.8003C35.9165 63.1533 35.7391 62.2741 35.0921 61.7964C34.4451 61.3187 33.5659 61.496 33.0882 62.143L35.4387 63.8003ZM33.0882 62.143C32.6104 62.7901 32.7878 63.6693 33.4348 64.147C34.0818 64.6247 34.961 64.4473 35.4387 63.8003L33.0882 62.143ZM22.5825 54.9526C23.2295 54.4748 23.4069 53.5957 22.9292 52.9486C22.4514 52.3016 21.5723 52.1242 20.9252 52.602L22.5825 54.9526ZM7.1899 62.143C6.71216 62.7901 6.88957 63.6693 7.53659 64.147C8.18361 64.6247 9.06277 64.4473 9.54051 63.8003L7.1899 62.143ZM9.54051 63.8003C10.0182 63.1533 9.84083 62.2741 9.19381 61.7964C8.54679 61.3187 7.66763 61.496 7.1899 62.143L9.54051 63.8003ZM20.9252 52.602C20.2782 53.0797 20.1007 53.9589 20.5785 54.6059C21.0562 55.2529 21.9354 55.4304 22.5825 54.9526L20.9252 52.602ZM34.9387 44.7509C34.461 45.3979 34.6384 46.277 35.2854 46.7548C35.9324 47.2325 36.8116 47.0551 37.2893 46.4081L34.9387 44.7509ZM37.2893 46.4081C37.767 45.7611 37.5896 44.8819 36.9426 44.4042C36.2956 43.9265 35.4164 44.1039 34.9387 44.7509L37.2893 46.4081ZM22.9292 36.0448C22.4514 35.3978 21.5723 35.2204 20.9252 35.6981C20.2782 36.1758 20.1007 37.055 20.5785 37.702L22.9292 36.0448ZM20.5785 37.702C21.0562 38.349 21.9354 38.5264 22.5825 38.0487C23.2295 37.571 23.4069 36.6918 22.9292 36.0448L20.5785 37.702ZM35.0921 27.2442C35.7391 26.7665 35.9165 25.8873 35.4387 25.2403C34.961 24.5933 34.0818 24.4159 33.4348 24.8936L35.0921 27.2442ZM106.868 19.8562L107.227 19.0352H107.227L106.868 19.8562ZM85.6172 15.6973C84.9655 16.0173 84.6844 16.7821 85.0043 17.4338C85.3243 18.0855 86.0891 18.3666 86.7408 18.0466L85.6172 15.6973ZM107.227 19.0352C106.788 18.4515 105.988 18.3359 105.404 18.7566C104.821 19.1773 104.705 19.9769 105.126 20.5606L106.868 19.0352ZM108.336 23.6564C108.988 23.3365 109.269 22.5717 108.949 21.92C108.629 21.2683 107.864 20.9872 107.212 21.3071L108.336 23.6564ZM33.4348 24.8936C32.7878 25.3714 32.6104 26.2505 33.0882 26.8976C33.5659 27.5446 34.4451 27.722 35.0921 27.2442L33.4348 24.8936ZM154.93 44.7509C154.452 45.3979 154.63 46.277 155.277 46.7548C155.924 47.2325 156.803 47.0551 157.281 46.4081L154.93 44.7509ZM157.281 46.4081C157.759 45.7611 157.581 44.8819 156.934 44.4042C156.287 43.9265 155.408 44.1039 154.93 44.7509L157.281 46.4081ZM140.592 54.9526C141.239 54.4748 141.416 53.5957 140.938 52.9486C140.461 52.3016 139.582 52.1242 138.935 52.602L140.592 54.9526ZM129.589 64.2773L130.339 63.8003V63.8003L129.589 64.2773ZM130.339 63.8003C130.816 63.1533 130.639 62.2741 129.992 61.7964C129.345 61.3187 128.466 61.496 127.988 62.143L130.339 63.8003ZM127.988 62.143C127.51 62.7901 127.688 63.6693 128.335 64.147C128.982 64.6247 129.861 64.4473 130.339 63.8003L127.988 62.143ZM138.935 52.602C138.288 53.0797 138.11 53.9589 138.588 54.6059C139.066 55.2529 139.945 55.4304 140.592 54.9526L138.935 52.602ZM29.0234 13.8891L28.4369 13.1799H28.4369L29.0234 13.8891ZM88.4167 11.1246C88.4167 10.4344 87.8569 9.87461 87.1667 9.87461C86.4765 9.87461 85.9167 10.4344 85.9167 11.1246L88.4167 11.1246ZM85.9167 11.1246C85.9167 11.8148 86.4765 12.3746 87.1667 12.3746C87.8569 12.3746 88.4167 11.8148 88.4167 11.1246L85.9167 11.1246ZM69.9167 11.1246C69.9167 10.4344 69.3569 9.87461 68.6667 9.87461C67.9765 9.87461 67.4167 10.4344 67.4167 11.1246L69.9167 11.1246ZM67.4167 11.1246C67.4167 11.8148 67.9765 12.3746 68.6667 12.3746C69.3569 12.3746 69.9167 11.8148 69.9167 11.1246L67.4167 11.1246ZM105.126 20.5606C105.987 21.7281 106.811 22.9081 107.212 21.3071L106.811 22.9081L107.212 21.3071L105.126 20.5606ZM67.1486 19.0352C66.7099 18.4515 65.9103 18.3359 65.3267 18.7566C64.743 19.1773 64.6274 19.9769 65.0661 20.5606L67.1486 19.0352ZM67.955 18.5946L67.1486 19.0352L66.43 19.8772L67.2364 19.4366L67.955 18.5946ZM56.2096 18.0466C59.3457 16.4918 62.8213 15.1746 66.43 19.8772L67.1486 19.0352C63.1399 13.7726 59.026 15.2828 55.0859 15.6973L56.2096 18.0466ZM67.2364 19.4366C72.3623 17.3452 74.8608 20.1372 78.181 21.3071L79.3047 23.6564C75.5945 22.3425 72.4711 19.2148 66.4297 20.6772L67.2364 19.4366ZM109.552 80.0837C115.562 72.5763 120.172 65.7711 123.627 59.636C127.077 53.5101 129.363 48.062 130.6 43.177C131.838 38.2874 132.027 33.9723 131.296 30.1975C130.565 26.4227 128.914 23.1918 126.429 20.4384C123.945 17.6851 120.629 15.426 116.591 13.6093C112.553 11.7925 107.794 10.4179 102.431 9.39865C91.7061 7.36013 78.6348 6.82654 65.3267 7.49284C78.6348 6.82654 91.7061 7.36013 102.431 9.39865C107.794 10.4179 112.553 11.7925 116.591 13.6093C120.629 15.426 123.945 17.6851 126.429 20.4384C128.914 23.1918 130.565 26.4227 131.296 30.1975C132.027 33.9723 131.838 38.2874 130.6 43.177C129.363 48.062 127.077 53.5101 123.627 59.636C120.172 65.7711 115.562 72.5763 109.552 80.0837ZM126.102 44.5983C132.953 40.6396 138.088 36.3563 141.631 31.7936C145.178 27.2261 147.123 22.3921 147.67 17.3563C148.218 12.3205 147.366 7.08619 145.232 1.7244H145.232C140.968 -9.02755 127.452 11.0968 126.102 44.5983ZM111.15 32.9044C104.758 27.8583 96.6196 25.0542 87.1667 24.1249C96.6196 25.0542 104.758 27.8583 111.15 32.9044ZM81.7288 34.921C88.1208 27.8583 80.1225 32.9044 81.7288 34.921ZM61.5911 55.8999C60.7493 56.962 60.0352 58.0453 59.4561 59.1435C58.8783 60.2389 58.4357 61.3481 58.1361 62.4631C57.5368 64.6933 57.5368 66.9489 58.1361 69.1791C58.4357 70.294 58.8783 71.4032 59.4561 72.4987C60.0352 73.5969 60.7493 74.6802 61.5911 75.7423C62.4329 76.8043 63.401 77.8402 64.4839 78.8347C65.5667 79.8291 66.7624 80.7815 68.0585 81.6773C70.6508 83.4689 73.6776 85.0213 77.0391 86.2865C80.4007 87.5517 84.0968 88.5298 87.9961 89.1931C91.8955 89.8563 95.9982 90.2047 100.19 90.2106C104.382 90.2165 108.663 89.8799 112.825 89.2006C113.918 88.9903 115.004 88.7557 116.083 88.497C113.918 88.9903 111.722 89.4007 109.503 89.7281C104.764 90.4638 99.8913 90.6812 95.0325 90.3803C90.1737 90.0794 85.3287 89.26 80.6642 87.9329C75.9996 86.6058 71.5157 84.7709 67.3968 82.4478C65.3373 81.2863 63.3913 80.0023 61.583 78.6021C59.7763 77.2034 58.1078 75.6898 56.6009 74.0705C55.094 72.4512 53.7492 70.7269 52.5902 68.9099C51.4296 67.0906 50.456 65.1809 49.6856 63.1943C49.3004 62.2011 48.9731 61.1857 48.7033 60.15C48.4334 59.1144 48.221 58.0584 48.0661 56.9841C47.7563 54.8356 47.7563 52.6439 48.0661 50.4954C48.221 49.4211 48.4334 48.3651 48.7033 47.3295C48.9731 46.2938 49.3004 45.2784 49.6856 44.2852C50.456 42.2986 51.4296 40.3889 52.5902 38.5696C53.7492 36.7526 55.094 35.0283 56.6009 33.409C58.1078 31.7897 59.7763 30.2761 61.583 28.8774C63.3913 27.4771 65.3373 26.1932 67.3968 25.0317C71.5157 22.7086 75.9996 20.8737 80.6642 19.5466C85.3287 18.2195 90.1737 17.4001 95.0325 17.0992C99.8913 16.7983 104.764 17.0157 109.503 17.7514C111.722 18.0787 113.918 18.4892 116.083 18.9825C115.004 18.7238 113.918 18.4891 112.825 18.2788C108.663 17.5995 104.382 17.263 100.19 17.2689C95.9982 17.2748 91 w-4 accent-[#FEAF52]"
                    />
                    <span className="text-gray-200">{option.label}</span>
                  </label>
                ))}
              </div>
              {errors.contentExperience && <p className="text-red-500 mt-1 text-sm">{errors.contentExperience}</p>}
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Total followers across all platforms *</label>
              <input
                type="text"
                name="totalFollowersCount"
                value={formData.totalFollowersCount}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg bg-gray-800 border ${errors.totalFollowersCount ? 'border-red-500' : 'border-gray-700'} text-white`}
                placeholder="e.g., 5,000 or Just starting"
              />
              {errors.totalFollowersCount && <p className="text-red-500 mt-1 text-sm">{errors.totalFollowersCount}</p>}
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">What topics do you create content about? *</label>
              <textarea
                name="contentTopics"
                value={formData.contentTopics}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg bg-gray-800 border ${errors.contentTopics ? 'border-red-500' : 'border-gray-700'} text-white h-24`}
                placeholder="Describe the main topics or themes of your content"
              ></textarea>
              {errors.contentTopics && <p className="text-red-500 mt-1 text-sm">{errors.contentTopics}</p>}
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Where are you based?</label>
              <input
                type="text"
                name="locationCountry"
                value={formData.locationCountry}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
                placeholder="Country/Region"
              />
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="step-content">
            <h2 className="text-2xl font-bold mb-6 text-white">Goals & Challenges</h2>
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">What are your main content goals? *</label>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { value: 'buildAuthority', label: 'Build authority & thought leadership' },
                  { value: 'increaseRevenue', label: 'Increase revenue directly from content' },
                  { value: 'generateLeads', label: 'Generate leads & sales opportunities' },
                  { value: 'buildCommunity', label: 'Build a large community around my brand' },
                  { value: 'allOfTheAbove', label: 'All of the above' }
                ].map(option => (
                  <label key={option.value} className={`flex items-center p-3 border ${formData.contentGoals === option.value ? 'border-[#FEAF52] bg-[#FEAF52]/10' : 'border-gray-700 bg-gray-800'} rounded-lg cursor-pointer transition-all duration-200`}>
                    <input
                      type="radio"
                      name="contentGoals"
                      value={option.value}
                      checked={formData.contentGoals === option.value}
                      onChange={handleChange}
                      className="mr-3 h-4 w-4 accent-[#FEAF52]"
                    />
                    <span className="text-gray-200">{option.label}</span>
                  </label>
                ))}
              </div>
              {errors.contentGoals && <p className="text-red-500 mt-1 text-sm">{errors.contentGoals}</p>}
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Monthly revenue target from content? *</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { value: 'under5k', label: '£1k-£5k monthly' },
                  { value: '5kTo10k', label: '£5k-£10k monthly' },
                  { value: '10kTo25k', label: '£10k-£25k monthly' },
                  { value: '25kTo50k', label: '£25k-£50k monthly' },
                  { value: '50kPlus', label: '£50k+ monthly' }
                ].map(option => (
                  <label key={option.value} className={`flex items-center p-3 border ${formData.monthlyRevenueTarget === option.value ? 'border-[#FEAF52] bg-[#FEAF52]/10' : 'border-gray-700 bg-gray-800'} rounded-lg cursor-pointer transition-all duration-200`}>
                    <input
                      type="radio"
                      name="monthlyRevenueTarget"
                      value={option.value}
                      checked={formData.monthlyRevenueTarget === option.value}
                      onChange={handleChange}
                      className="mr-3 h-4 w-4 accent-[#FEAF52]"
                    />
                    <span className="text-gray-200">{option.label}</span>
                  </label>
                ))}
              </div>
              {errors.monthlyRevenueTarget && <p className="text-red-500 mt-1 text-sm">{errors.monthlyRevenueTarget}</p>}
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Your biggest content challenge? *</label>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { value: 'noTime', label: 'No time for content creation' },
                  { value: 'inconsistentResults', label: 'Inconsistent results (random viral hits followed by crickets)' },
                  { value: 'teamChaos', label: 'Team chaos (bottlenecks, approval delays, quality issues)' },
                  { value: 'platformOverwhelm', label: 'Platform overwhelm (too many platforms to keep up with)' },
                  { value: 'poorConversion', label: 'Content not converting to business results' },
                  { value: 'other', label: 'Other (please specify)' }
                ].map(option => (
                  <label key={option.value} className={`flex items-center p-3 border ${formData.biggestContentChallenge === option.value ? 'border-[#FEAF52] bg-[#FEAF52]/10' : 'border-gray-700 bg-gray-800'} rounded-lg cursor-pointer transition-all duration-200`}>
                    <input
                      type="radio"
                      name="biggestContentChallenge"
                      value={option.value}
                      checked={formData.biggestContentChallenge === option.value}
                      onChange={handleChange}
                      className="mr-3 h-4