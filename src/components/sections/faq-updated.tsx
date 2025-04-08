import { Section } from "../ui/section";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion-raised";
import { courseStats, tracks, sections } from "../../lib/course-utils";

// Helper function to safely access course data with proper null checks
const courseData = {
  totalModules: courseStats?.totalModules || 0,
  totalHours: courseStats?.totalHours || 0,
  trackNames: tracks?.map(track => track.name || '').filter(Boolean).join(", ") || "multiple specialized tracks",
  getSection: (id: string) => sections?.find(s => s.id === id)?.name || "specialized"
};

// FAQ data incorporating course information with null checks
const faqItems = [
  {
    question: "What exactly is the Vertical Shortcut program?",
    answer: [
      `Vertical Shortcut is a comprehensive ${courseData.totalModules}+ module training program designed to help creators and entrepreneurs master short-form video content across all major platforms.`,
      `The program includes over ${courseData.totalHours} hours of content, covering everything from content strategy and psychology to production techniques and monetization methods.`
    ]
  },
  {
    question: "How is Vertical Shortcut different from other short-form courses?",
    answer: [
      "While most courses focus only on basic filming techniques or platform-specific tricks, Vertical Shortcut provides a complete system for creating high-converting content that builds your business.",
      "Our program stands out with premium design quality, custom frameworks, and delightful touches that position your product as professional. Unlike many courses that rely on outdated practices, we're built with modern technologies and best practices."
    ]
  },
  {
    question: "Who is this program best suited for?",
    answer: [
      `Vertical Shortcut is designed for multiple learning paths through our specialized tracks: ${courseData.trackNames}.`,
      "Whether you're a busy founder with limited time, a content creator looking to grow your audience, or a technical professional wanting to improve production quality, we have a custom learning path for you."
    ]
  },
  {
    question: "How much time do I need to commit to see results?",
    answer: [
      "We recommend committing 4 hours per week over the 10-week program period for optimal results.",
      "The program is designed to be flexible, and many busy entrepreneurs see significant improvements by implementing just 1-2 strategies per week. Our most successful students complete one module per day."
    ]
  },
  {
    question: "Do I need expensive equipment to implement what I learn?",
    answer: [
      "Not at all! Many of our most successful students started with just a smartphone.",
      `Our ${courseData.getSection("shooting")} section includes specific modules like "Solo Phone Shooter" that show you how to create professional-quality content with minimal equipment.`
    ]
  },
  {
    question: "What if I'm camera shy or don't want to be on camera?",
    answer: [
      `We have a dedicated module called "Camera Confidence" in our ${courseData.getSection("shooting")} section specifically designed to help overcome camera anxiety with proven techniques.`,
      "Additionally, we teach strategies for creating engaging content without appearing on camera, or ways to build a team so you can be the strategist rather than the on-camera talent."
    ]
  },
  {
    question: "What kind of results can I expect?",
    answer: [
      "Our students typically see 300-500% increases in engagement within the first 30 days of implementing our hook and content strategies.",
      "For business owners, most report significant increases in leads and sales within 60-90 days of consistent implementation."
    ]
  },
  {
    question: "Do you offer any guarantees?",
    answer: [
      "Yes! We offer a 30-day action-based guarantee. If you complete the first 4 modules, implement the strategies, and don't see improvements in your content performance, we'll refund your investment.",
      "We stand behind our methodology because we've seen it work across industries, platforms, and for creators at all skill levels."
    ]
  },
  {
    question: "Is there ongoing support after I purchase?",
    answer: [
      "Absolutely! Your investment includes lifetime access to all current and future content, plus 12 months of access to our community for feedback and support.",
      "We also offer weekly live Q&A sessions and content reviews with our expert team for active students."
    ]
  },
  {
    question: "Can I get a discount?",
    answer: [
      "We're looking for beta testers and great examples of Vertical Shortcut in action to feature on our website. If you provide feedback to help us improve the program, you could get a huge discount plus a solid backlink for your product.",
      "If this interests you, don't hesitate to reach out by email."
    ]
  }
];

export default function FAQ() {
  return (
    <Section>
      <div className="mx-auto flex max-w-container flex-col items-center gap-12">
        <h2 className="text-center text-3xl font-semibold sm:text-5xl">
          Questions and Answers
        </h2>
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
                    className={`mb-4 max-w-[640px] text-balance text-muted-foreground ${pIndex < item.answer.length - 1 ? 'mb-4' : ''}`}
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
