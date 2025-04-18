import React, { useEffect, useRef } from "react";
import { Section } from "../ui/section";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion-raised";
import { courseStats, tracks, sections } from "../../lib/course-utils";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// Helper function to safely access course data with proper null checks
const courseData = {
  totalModules: courseStats?.totalModules || 0,
  totalHours: courseStats?.totalHours || 0,
  trackNames: tracks?.map(track => track.name || '').filter(Boolean).join(", ") || "multiple specialized tracks",
  getSection: (id: string) => sections?.find(s => s.id === id)?.name || "specialized"
};

// FAQ data from guidance document
const faqItems = [
  {
    question: "Why is short form a good investment?",
    answer: [
      "Short form content has only really been around since 2020. But in that short space of time it has grown an insane amount. 62.6% of the global population is currently on social media, that's well over 5 billion people, and each of them spends around 2 and a half hours on there. Every single day. 5 billion people watching for 2 and a half hours.",
      "Short form is where the attention is and it's where people are buying. Studies show that 96% of all consumers prefer video over text when learning about a product or a service, and 73% of those consumers prefer to learn about it through short form video specifically.",
      "So if you have a product - and that product could be you - short form is the only reasonable place to start dominating. Especially if you're trying to target gen z. 70% of them watch short form videos every single day, this is the place to reach them."
    ]
  },
  {
    question: "Who is this course designed for?",
    answer: [
      "This course is for founders and creative team members who are ready to transform their approach to short form over an 8-week period. Our clients include agency founders, CMOs, MDs, experts and straight up growth hackers. So, if you want to understand how to get views on short form, this course is for you."
    ]
  },
  {
    question: "How is the course structured?",
    answer: [
      "Well you *should* read the course structure. But here's the top line: 8 weeks of pre-recorded content, live sessions, workshops and PDFs. Lifetime access to all our resources, plus our founder community and our team of experts."
    ]
  },
  {
    question: "What topics does the course cover?",
    answer: [
      "Our course covers everything. And we mean everything. From the fundamentals of starting your account, to what makes a good video (and a bad one). And all the tools and theory you need to make videos that algorithms 'aka audiences' love. Plus how to get this all up and running with a content team that runs itself. And then make money and leads from it."
    ]
  },
  {
    question: "How much time should I commit weekly?",
    answer: [
      "We know how busy you are, so outside of the hour weekly sessions, the course is designed to be completely flexible. Ideally, you and/or your team dedicate 3-4 hours per week to maximise value from the weekly sessions.",
      "If you're a very time-strapped founder, please check out the founder and team tracks to know which modules you need to watch, and which ones to hand over to them."
    ]
  },
  {
    question: "How quickly will I see results?",
    answer: [
      "Despite our glowing results, short form is a tricky beast, and requires commitment. If you use the contact time right, apply yourself fully and trust the process, we'd expect you'll do great.",
      "Founders that work with us tend to see an initial warming up period, then a steady, consistent increase in views over the first 3 months."
    ]
  },
  {
    question: "What happens when I sign up?",
    answer: [
      "Once you've applied, and you're all signed off and ready to go, you'll be given immediate access to the first week of content (we don't want to overwhelm you) plus a group chat directly in contact with us, and the other lucky founders in your cohort."
    ]
  }
];

export default function FAQUpdated() {
  const sectionRef = useRef(null);
  const eyeballRef = useRef(null);
  
  // Initialize GSAP animations
  useGSAP(() => {
    // Entrance animation for the eyeball
    gsap.fromTo("#faqEyeballSvg", 
      { 
        y: 100,
        opacity: 0,
        rotation: -2
      }, 
      { 
        y: -20,
        opacity: 1,
        rotation: 0,
        duration: 1.2, 
        delay: 0.15,
        ease: "power2.out"
      }
    );
    
    // Add mouse movement effect to eyeball
    const handleMouseMove = (e) => {
      const eyeball = document.getElementById('faqEyeballSvg');
      if (!eyeball) return;
      
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const mouseXPercent = (e.clientX / windowWidth - 0.5) * 2;
      const mouseYPercent = (e.clientY / windowHeight - 0.5) * 2;
      
      gsap.to(eyeball, {
        rotation: mouseXPercent * 3,
        rotationY: mouseYPercent * 2,
        duration: 1.2,
        ease: "power1.out"
      });
    };
    
    // Add event listener for mouse movement
    window.addEventListener('mousemove', handleMouseMove);
    
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <Section ref={sectionRef} className="relative overflow-hidden pt-6 sm:pt-8 md:pt-12">
      <div className="mx-auto flex max-w-container flex-col items-center gap-6 relative">
        {/* Eyeball SVG in top left corner */}
        <svg
          width="679"
          height="600"
          viewBox="0 0 679 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          id="faqEyeballSvg"
          ref={eyeballRef}
          className="
            w-[140px] h-auto
            sm:w-[170px] md:w-[205px] lg:w-[235px]
            absolute top-[0px] left-[-30px]
            sm:top-[10px] sm:left-[-40px]
            md:top-[20px] md:left-[-60px]
            lg:top-[30px] lg:left-[-80px]
            opacity-0
            transition-all duration-500
            animate-float-gentle
            z-100
          "
          aria-hidden="true"
        >
          <circle
            cx="331.484"
            cy="347.484"
            r="231.656"
            transform="rotate(-90 331.484 347.484)"
            fill="var(--theme-eyeball-outer)"
          />
          <ellipse
            cx="387.704"
            cy="307.815"
            rx="143.553"
            ry="143.168"
            transform="rotate(-90 387.704 307.815)"
            fill="var(--theme-eyeball-iris)"
          />
          <path
            d="M324.537 240.611C337.361 218.609 357.976 202.262 382.267 194.834C406.558 187.406 432.737 189.444 455.577 200.541C478.417 211.637 496.239 230.976 505.483 254.697C514.727 278.417 514.714 304.773 505.446 328.503C496.178 352.233 478.337 371.59 455.485 382.711C432.634 393.832 406.453 395.897 382.169 388.495C357.886 381.092 337.287 364.767 324.486 342.778C311.684 320.789 307.622 294.755 313.109 269.872L411.566 291.649L324.537 240.611Z"
            fill="var(--theme-eyeball-pupil)"
          />
        </svg>
      
        <h2 className="text-center text-4xl md:text-5xl font-bold text-theme-primary mb-2 -mt-2">
          FAQs
        </h2>
        <p className="text-center text-xs md:text-sm text-theme-accent/70 italic mb-4 -mt-1">
          And frequently given answers
        </p>
        <Accordion type="single" collapsible className="w-full max-w-[800px]">
          {faqItems.map((item, index) => (
            <AccordionItem key={`item-${index + 1}`} value={`item-${index + 1}`}>
              <AccordionTrigger>
                {item.question}
              </AccordionTrigger>
              <AccordionContent>
                {item.answer.map((paragraph, pIndex) => (
                  <p 
                    key={pIndex} 
                    className={`body-text-sm mb-4 max-w-[640px] text-balance ${pIndex < item.answer.length - 1 ? 'mb-4' : ''}`}
                  >
                    {paragraph}
                  </p>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
