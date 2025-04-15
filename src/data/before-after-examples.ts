// Define the data structure for before/after examples
export interface BeforeAfterExample {
  title: string;
  beforeViews: number;
  afterViews: number;
  beforeDate: string;
  afterDate: string;
  imageBefore?: string;
  imageAfter?: string;
}

// Export example data for the BeforeAfterStats component
export const beforeAfterExamples: BeforeAfterExample[] = [
  {
    title: "Business Founder",
    beforeViews: 246,
    afterViews: 1200000,
    beforeDate: "Jan 2025",
    afterDate: "Mar 2025",
    imageBefore: "/assets/main/thumbnails-with-views/JW-jellycat.png",
    imageAfter: "/assets/main/thumbnails-with-views/JW-BrewBeers-1.jpg"
  },
  {
    title: "Marketing Coach",
    beforeViews: 532,
    afterViews: 4700000,
    beforeDate: "Dec 2024",
    afterDate: "Feb 2025",
    imageBefore: "/assets/main/thumbnails-with-views/CM-Marketing.png",
    imageAfter: "/assets/main/thumbnails-with-views/CM-Agency Predictions.jpg"
  },
  {
    title: "Agency Owner",
    beforeViews: 189,
    afterViews: 867000,
    beforeDate: "Feb 2025",
    afterDate: "Apr 2025",
    imageBefore: "/assets/main/thumbnails-with-views/CD-REGRET.jpg",
    imageAfter: "/assets/main/thumbnails-with-views/CD COFFEE.jpg"
  }
];