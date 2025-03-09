/**
 * Pricing Section JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  // Slight delay to ensure our pricing implementation takes precedence
  setTimeout(() => {
    console.log('🔄 Initializing enhanced pricing section with corrected data');
    initializePricing();
  }, 100);
});

/**
 * Initialize pricing section functionality
 */
function initializePricing() {
  console.log('Initializing pricing section...');
  
  // Setup payment toggle
  setupPaymentToggle();
  
  // Setup pricing FAQ
  setupPricingFAQ();
  
  // Initialize value counters
  initializeValueCounters();
  
  // Populate course value stats
  populateCourseValueStats();
  
  // Make sure our pricing table is rendered and takes precedence
  window.renderPricingTable = renderPricingTable;
  
  // Render pricing table
  renderPricingTable();
  
  // Apply our icons after rendering
  if (typeof feather !== 'undefined') {
    console.log('🔄 Replacing feather icons in pricing section');
    feather.replace();
  }
  
  // Add event listener for the pricing quiz button
  const quizButton = document.querySelector('.pricing-quiz-btn');
  if (quizButton) {
    quizButton.addEventListener('click', function() {
      const quiz = document.getElementById('recommendation-quiz');
      if (quiz) {
        quiz.classList.add('active');
        document.body.classList.add('quiz-open');
      }
    });
  }
  
  // Initialize module tracks preview with a slight delay to ensure DOM is ready
  setTimeout(() => {
    const moduleTracksPreview = document.querySelector('.module-tracks-preview');
    if (moduleTracksPreview) {
      // If the preview is empty, populate it
      if (moduleTracksPreview.children.length === 0) {
        populateModulePreview(moduleCategories);
      }
      
      // Add animation for the module tracks
      if (window.gsap) {
        gsap.from('.track-category', {
          y: 20,
          opacity: 0,
          stagger: 0.05,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.module-tracks-preview',
            start: 'top 80%'
          }
        });
      }
    }
  }, 300);
}

/**
 * Set up payment toggle functionality
 */
function setupPaymentToggle() {
  const toggleSwitch = document.querySelector('.plan-toggle-switch');
  const monthlyLabel = document.querySelector('.plan-toggle-monthly');
  const yearlyLabel = document.querySelector('.plan-toggle-yearly');
  const installmentLabel = document.querySelector('.plan-toggle-installment');
  
  if (!toggleSwitch || !monthlyLabel || !yearlyLabel || !installmentLabel) {
    console.warn('Payment toggle elements not found');
    return;
  }
  
  // Update the toggle labels to match the new requirements
  if (monthlyLabel) monthlyLabel.textContent = "One-Time Payment";
  if (yearlyLabel) yearlyLabel.textContent = "3 Month Installments";
  
  // Set initial active state
  monthlyLabel.classList.add('active');
  yearlyLabel.classList.remove('active');
  installmentLabel.classList.remove('active');
  
  // Toggle one-time/installment pricing
  monthlyLabel.addEventListener('click', function() {
    setActivePaymentOption('monthly'); // Keep the same function name for compatibility
  });
  
  yearlyLabel.addEventListener('click', function() {
    setActivePaymentOption('installment'); // Change to installment directly
  });
  
  installmentLabel.addEventListener('click', function() {
    setActivePaymentOption('installment');
  });
  
  toggleSwitch.addEventListener('click', function() {
    const currentActive = document.querySelector('.plan-toggle-label.active');
    if (currentActive.classList.contains('plan-toggle-monthly')) {
      setActivePaymentOption('installment'); // Toggle directly to installment
    } else {
      setActivePaymentOption('monthly'); // Toggle back to one-time
    }
  });
}

function setActivePaymentOption(option) {
  // Update active class on toggle labels
  document.querySelector('.plan-toggle-monthly').classList.toggle('active', option === 'monthly');
  document.querySelector('.plan-toggle-yearly').classList.toggle('active', option === 'installment');
  
  // Update toggle slider position
  const slider = document.querySelector('.plan-toggle-slider');
  if (slider) {
    if (option === 'installment') {
      slider.style.transform = 'translateX(100%)';
    } else {
      slider.style.transform = 'translateX(0)';
    }
  }
  
  // Show/hide appropriate price sections
  document.querySelectorAll('.price-monthly').forEach(el => {
    el.style.display = option === 'monthly' ? 'block' : 'none';
  });
  
  document.querySelectorAll('.price-installment').forEach(el => {
    el.style.display = option === 'installment' ? 'block' : 'none';
  });
}

/**
 * Set up FAQ functionality in the pricing section
 */
function setupPricingFAQ() {
  const faqItems = document.querySelectorAll('.pricing-faq .faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    if (question && answer) {
      question.addEventListener('click', function() {
        const isOpen = answer.classList.contains('active');
        
        // Close all answers
        document.querySelectorAll('.pricing-faq .faq-answer').forEach(a => {
          a.classList.remove('active');
          a.style.maxHeight = null;
        });
        
        // Toggle clicked answer
        if (!isOpen) {
          answer.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });
}

/**
 * Initialize value counters for animated number counting
 */
function initializeValueCounters() {
  const counters = document.querySelectorAll('.counter[data-value]');
  
  counters.forEach(number => {
    const targetValue = parseInt(number.getAttribute('data-value'), 10);
    if (isNaN(targetValue)) return;
    
    let currentValue = 0;
    const duration = 2000; // ms
    const interval = 20; // ms
    const increment = targetValue / (duration / interval);
    
    const counter = setInterval(() => {
      currentValue += increment;
      
      if (currentValue >= targetValue) {
        currentValue = targetValue;
        clearInterval(counter);
      }
      
      number.textContent = Math.floor(currentValue).toLocaleString();
    }, interval);
  });
}

/**
 * Add the comprehensive course module information
 */
function populateCourseValueStats() {
  // Course structure data from module directory
  const moduleCategories = {
    "Theory Basics": ["Starting an account", "Naming your account", "Creating a bio", "Managing highlights", "Developing your Linkspace", "Using Pinned Videos", "The Frame", "Safe Zones & Clutter", "Visual Hierarchy", "Movement & Contrast"],
    "Cardinal Principles": ["Cardinal Sins", "Cardinal Virtues", "Algorithmic Reality", "How Videos Actually Grow", "Good Vs Bad in Short Form", "Nailing What Actually Counts", "Applying it Across Platforms"],
    "Hook Mastery": ["Using Clarity and Intrigue", "Developing Authority", "Nailing Delivery", "The Text Hook", "The Visual Hook", "Nuanced Hooks", "BIG vs small", "False Assumptions", "The Impossible Question", "A Contrarian Statement", "This Just Happened!!?!", "PR: Who Are You?"],
    "Scripting": ["Rule 1: Simplicity", "Rule 2: Being Concise", "Rule 3: Rehooking", "Rule 4: Authenticity", "Rule 5: Storytelling", "Rule 6: Would I watch this?", "Bonus: Boulder Theory", "Script Mastery", "Getting it wrong (on purpose)", "The FOMO comment section", "Using Controversy"],
    "Metrics & Analysis": ["Likes", "Saves", "Shares", "Retention", "Comments", "Advanced Metrics", "Follower Conversion", "Completed Watchtime", "Demographics", "Traffic Sources"],
    "Platform Strategy": ["TikTok", "Instagram", "YouTube", "The Rest!", "Pillar Content Strategy", "Topics", "Buckets", "Data-Led Iteration"],
    "Authority Building": ["Scripting for Authority", "The 6 Rules of Authority", "Brand Wholism", "Complex formats", "Remixing formats", "Breaking Expectations", "The Unexpected Pivot"],
    "Content Management": ["What to do when it goes wrong", "How to save your page", "Handling Comments", "Reframing Anger", "Managing Debate", "The Best Kind of Comment", "Optimising for Conversion", "Optimising for Watch Time"],
    "Production": ["Camera Confidence", "Producing a Podcast for Clips", "Home Studio Setup", "Solo Phone Shooter", "Lofi - respecting the medium", "Hifi - the founders paradox", "Editing Basics", "Editing Team", "Editing Advanced"],
    "Research": ["Research and Writing", "Research advanced", "Generating Ideas", "Targeted Search", "Keyword Mapping", "Tailoring Your Algorithm", "Inspiration Through Different Sources", "Refining Your Script", "The Research Toolkit"],
    "Repurposing": ["From Shortform", "From Longform", "From Articles", "From LinkedIn", "Serialisation", "Podcast Clipping"],
    "Planning & Distribution": ["Posting and Scheduling for Founders", "Posting for Creators", "Platform Monetisation", "Partnerships", "Business Integration"],
    "Delegation & Team": ["First bottlenecks", "Managing Creatives", "Videography Delegated", "Make Content Run Itself", "Team Pipeline Breakdown", "Team Workflow"],
    "Conversion Strategy": ["Lead Magnets", "Youtube Strategy", "Podcasts", "Building a Newsletter", "Using your platform for sales", "Speaking engagements", "Taking People Off Platform"]
  };

  // Calculate totals
  const totalCategories = Object.keys(moduleCategories).length;
  const totalModules = Object.values(moduleCategories).reduce((acc, modules) => acc + modules.length, 0);
  const totalHours = Math.round(totalModules * 35 / 60); // Estimate 35 minutes per module
  
  // Update stats
  const statsContainer = document.querySelector('.course-value-stats');
  if (statsContainer) {
    // Populate the stats with our calculated values
    statsContainer.innerHTML = `
      <div class="value-stat">
        <div class="stat-number counter" data-value="${totalModules}">0</div>
        <div class="stat-label">Total Lessons</div>
      </div>
      <div class="value-stat">
        <div class="stat-number counter" data-value="${totalCategories}">0</div>
        <div class="stat-label">Learning Tracks</div>
      </div>
      <div class="value-stat">
        <div class="stat-number counter" data-value="${totalHours}">0</div>
        <div class="stat-label">Hours of Content</div>
      </div>
      <div class="value-stat">
        <div class="stat-number counter" data-value="12">0</div>
        <div class="stat-label">Bonus Resources</div>
      </div>
    `;
  }
  
  // Add a module count highlight to the pricing header
  const pricingHeader = document.querySelector('.pricing-header');
  if (pricingHeader) {
    const valueCountElement = document.createElement('div');
    valueCountElement.className = 'pricing-value-highlight';
    valueCountElement.innerHTML = `
      <div class="value-highlight-count">
        <span class="module-count-highlight pulse-animation">${totalModules}+</span>
      </div>
      <div class="value-highlight-text">
        comprehensive lessons across ${totalCategories} specialized tracks
      </div>
    `;
    
    // Insert after the pricing description
    const pricingDescription = pricingHeader.querySelector('.pricing-description');
    if (pricingDescription) {
      pricingDescription.parentNode.insertBefore(valueCountElement, pricingDescription.nextSibling);
    } else {
      pricingHeader.appendChild(valueCountElement);
    }
  }
  
  // Initialize counters
  initializeValueCounters();
  
  // Populate module directory preview
  populateModulePreview(moduleCategories);
}

/**
 * Populate the module directory preview section
 */
function populateModulePreview(moduleCategories) {
  const moduleTracksPreview = document.querySelector('.module-tracks-preview');
  if (!moduleTracksPreview) return;
  
  // Clear existing content
  moduleTracksPreview.innerHTML = '';
  
  // Create columns for the tracks
  const columns = [
    document.createElement('div'),
    document.createElement('div')
  ];
  
  columns.forEach(col => {
    col.className = 'track-column';
    moduleTracksPreview.appendChild(col);
  });
  
  // Get all categories and sort them alphabetically
  const categoryNames = Object.keys(moduleCategories).sort();
  
  // Distribute tracks across columns evenly
  const midpoint = Math.ceil(categoryNames.length / 2);
  
  // Add tracks to columns
  categoryNames.forEach((category, index) => {
    const columnIndex = index < midpoint ? 0 : 1;
    const modules = moduleCategories[category];
    
    const trackElement = document.createElement('div');
    trackElement.className = 'track-category';
    
    // Add a data attribute for potential filtering
    trackElement.setAttribute('data-category', category.toLowerCase().replace(/\s+/g, '-'));
    
    trackElement.innerHTML = `
      <div class="track-name">${category}</div>
      <div class="track-modules-count">${modules.length}</div>
    `;
    
    // Add hover effect with module list tooltip
    if (modules.length > 0) {
      const tooltipContent = document.createElement('div');
      tooltipContent.className = 'track-tooltip';
      tooltipContent.style.display = 'none';
      tooltipContent.innerHTML = `
        <div class="tooltip-header">${category}</div>
        <ul class="tooltip-modules">
          ${modules.slice(0, 5).map(module => `<li>${module}</li>`).join('')}
          ${modules.length > 5 ? `<li class="more-modules">+${modules.length - 5} more...</li>` : ''}
        </ul>
      `;
      
      trackElement.appendChild(tooltipContent);
      
      // Show tooltip on hover
      trackElement.addEventListener('mouseenter', () => {
        tooltipContent.style.display = 'block';
      });
      
      trackElement.addEventListener('mouseleave', () => {
        tooltipContent.style.display = 'none';
      });
    }
    
    columns[columnIndex].appendChild(trackElement);
  });
  
  // Add total modules count to the preview
  const totalModules = Object.values(moduleCategories).reduce((acc, modules) => acc + modules.length, 0);
  
  const trackValue = document.createElement('div');
  trackValue.className = 'track-value';
  trackValue.innerHTML = `
    <div class="stat-number">${totalModules}+ lessons</div>
    <div class="stat-description">Across ${categoryNames.length} learning tracks</div>
  `;
  
  moduleTracksPreview.appendChild(trackValue);
}

/**
 * Render the pricing table with tier-specific offerings
 */
function renderPricingTable() {
  console.log('🔄 Rendering enhanced pricing table with correct data');
  
  // Pricing data with valid Feather icons
  const pricingData = {
    blueprint: {
      name: "Brand Blueprint",
      icon: "book", // Using a valid Feather icon
      description: "Perfect for founders who prefer a hands-on approach and want the essentials.",
      fullPrice: "£3,095",
      monthlyPrice: "£3,095",
      yearlyPrice: "£2,476", // 20% discount
      installmentPrice: "£1,137", // 3 payments with 10% premium
      installmentLabel: "3 payments of",
      popular: false,
      badge: "Self-Guided",
      features: [
        "Full Course Access",
        "Content Templates",
        "Self-Paced Learning",
        "Lifetime Updates",
        "Community Access"
      ],
      // Track access for this tier
      trackAccess: ["Theory Basics", "Cardinal Principles", "Hook Mastery", "Scripting"],
      color: "var(--orange)"
    },
    automator: {
      name: "Authority Automator",
      icon: "award", // Using a valid Feather icon
      description: "Our most popular plan! Perfect balance of learning and support.",
      fullPrice: "£5,095",
      monthlyPrice: "£5,095",
      yearlyPrice: "£4,076", // 20% discount
      installmentPrice: "£1,868", // 3 payments with 10% premium
      installmentLabel: "3 payments of",
      popular: true,
      badge: "Most Popular",
      features: [
        "Everything in Brand Blueprint",
        "Weekly Group Coaching",
        "Content Review & Feedback",
        "1-on-1 Strategy Session",
        "Team Training Templates",
        "Content Calendar Setup"
      ],
      // Track access for this tier
      trackAccess: ["Theory Basics", "Cardinal Principles", "Hook Mastery", "Scripting", 
        "Metrics & Analysis", "Platform Strategy", "Authority Building", "Content Management"],
      color: "var(--blue)"
    },
    growth: {
      name: "The Viral Growth Machine",
      icon: "zap", // Using a valid Feather icon
      description: "Maximum support and results for founders who want the fastest growth.",
      fullPrice: "£7,500",
      monthlyPrice: "£7,500",
      yearlyPrice: "£6,000", // 20% discount
      installmentPrice: "£2,750", // 3 payments with 10% premium
      installmentLabel: "3 payments of",
      popular: false,
      badge: "By Application",
      features: [
        "Everything in Authority Automator",
        "Custom Content Strategy",
        "3 Month Done-For-You Setup",
        "Team Hiring & Onboarding",
        "Private Coaching Sessions",
        "Direct Agency Access"
      ],
      // Track access for all tracks
      trackAccess: "all",
      color: "var(--pink)"
    }
  };
  
  const pricingContainer = document.querySelector('.pricing-cards-container');
  if (!pricingContainer) {
    console.error('❌ Pricing container not found');
    return;
  }
  
  // Clear existing content
  pricingContainer.innerHTML = '';
  console.log('✅ Cleared existing pricing cards');
  
  // Add pricing cards
  Object.keys(pricingData).forEach(plan => {
    const planData = pricingData[plan];
    
    // Create features HTML
    const featuresHTML = planData.features.map(feature => `
      <li class="feature-item">${feature}</li>
    `).join('');
    
    // Create track access HTML
    let trackAccessHTML = '';
    if (planData.trackAccess === "all") {
      trackAccessHTML = `
        <li class="feature-item">
          <span class="feature-highlight">Complete access to all learning tracks</span>
        </li>
      `;
    } else if (Array.isArray(planData.trackAccess) && planData.trackAccess.length > 0) {
      trackAccessHTML = `
        <li class="feature-item">
          <span class="feature-highlight">Access to ${planData.trackAccess.length} key tracks:</span>
          ${planData.trackAccess.map(track => `<div class="track-access-item">${track}</div>`).join('')}
        </li>
      `;
    }
    
    // Create pricing card
    const cardHTML = `
      <div class="pricing-card ${plan} ${planData.popular ? 'popular' : ''}">
        ${planData.badge ? `<div class="plan-badge ${plan}">${planData.badge}</div>` : ''}
        
        <div class="card-header">
          <div class="plan-icon">
            <i data-feather="${planData.icon}"></i>
          </div>
          <h3 class="plan-name">${planData.name}</h3>
          <p class="plan-description">${planData.description}</p>
        </div>
        
        <div class="price-monthly" style="display: block;">
          <div class="plan-price">${planData.monthlyPrice}</div>
          <div class="plan-billing">one-time payment</div>
        </div>
        
        <div class="price-yearly" style="display: none;">
          <div class="plan-price">${planData.yearlyPrice}</div>
          <div class="plan-billing">one-time payment <span class="payment-option active">Save 20%</span></div>
        </div>
        
        <div class="price-installment" style="display: none;">
          <div class="plan-price">${planData.installmentPrice}</div>
          <div class="plan-billing">${planData.installmentLabel} <span class="payment-option">+10%</span></div>
        </div>
        
        <ul class="features-list">
          ${trackAccessHTML}
          ${featuresHTML}
        </ul>
        
        <div class="card-footer">
          <a href="#contact" class="plan-cta">${plan === 'growth' ? 'Apply Now' : 'Get Started'}</a>
          <div class="secondary-cta">
            <a href="#calendar">Schedule a Call</a>
          </div>
        </div>
      </div>
    `;
    
    pricingContainer.innerHTML += cardHTML;
  });
  
  console.log('✅ Added pricing cards with correct data');
  
  // Initialize the toggle immediately to ensure prices are visible
  if (typeof setActivePaymentOption === 'function') {
    setActivePaymentOption('monthly');
  }
  
  // Create comparison table
  createComparisonTable(pricingData);
  console.log('✅ Enhanced pricing table rendered successfully');
}

/**
 * Create a comparison table to show features across plans
 */
function createComparisonTable(pricingData) {
  const compareContainer = document.querySelector('.pricing-compare');
  if (!compareContainer) return;
  
  // Clear existing content
  compareContainer.innerHTML = `
    <h2 class="compare-title">Plan Comparison</h2>
    <div class="compare-table-container">
      <table class="compare-table">
        <thead>
          <tr>
            <th>Feature</th>
            <th class="compare-plan-name blueprint">Brand Blueprint</th>
            <th class="compare-plan-name automator">Authority Automator</th>
            <th class="compare-plan-name growth">The Viral Growth Machine</th>
          </tr>
        </thead>
        <tbody id="compare-table-body">
          <!-- Feature rows will be added here -->
        </tbody>
      </table>
    </div>
  `;
  
  const tableBody = document.getElementById('compare-table-body');
  if (!tableBody) return;
  
  // Course structure data
  const moduleCategories = {
    "Theory Basics": true,
    "Cardinal Principles": true,
    "Hook Mastery": true,
    "Scripting": true,
    "Metrics & Analysis": false,
    "Platform Strategy": false,
    "Authority Building": false,
    "Content Management": false,
    "Production": false,
    "Research": false,
    "Repurposing": false,
    "Planning & Distribution": false,
    "Delegation & Team": false,
    "Conversion Strategy": false
  };
  
  // Add module category rows
  Object.keys(moduleCategories).forEach(category => {
    const row = document.createElement('tr');
    
    // Blueprint has access to first 4 tracks
    const blueprintAccess = moduleCategories[category] ? true : false;
    
    // Automator has access to first 8 tracks
    const automatorAccess = blueprintAccess || ["Metrics & Analysis", "Platform Strategy", "Authority Building", "Content Management"].includes(category);
    
    // Growth has access to all tracks
    const growthAccess = true;
    
    row.innerHTML = `
      <td class="compare-feature">${category}</td>
      <td>${blueprintAccess ? '<i class="compare-check" data-feather="check"></i>' : '<i class="compare-x" data-feather="x"></i>'}</td>
      <td>${automatorAccess ? '<i class="compare-check" data-feather="check"></i>' : '<i class="compare-x" data-feather="x"></i>'}</td>
      <td>${growthAccess ? '<i class="compare-check" data-feather="check"></i>' : '<i class="compare-x" data-feather="x"></i>'}</td>
    `;
    
    tableBody.appendChild(row);
  });
  
  // Add support features
  const supportFeatures = [
    { name: "Community Access", blueprint: true, automator: true, growth: true },
    { name: "Content Templates", blueprint: true, automator: true, growth: true },
    { name: "Group Coaching", blueprint: false, automator: true, growth: true },
    { name: "Content Reviews", blueprint: false, automator: true, growth: true },
    { name: "1-on-1 Strategy Sessions", blueprint: false, automator: true, growth: true },
    { name: "Custom Content Strategy", blueprint: false, automator: false, growth: true },
    { name: "Team Training", blueprint: false, automator: true, growth: true },
    { name: "Personal Coaching", blueprint: false, automator: false, growth: true },
    { name: "Agency Access", blueprint: false, automator: false, growth: true }
  ];
  
  // Add a separator row
  const separatorRow = document.createElement('tr');
  separatorRow.innerHTML = `
    <td colspan="4" class="compare-separator"><strong>Support & Features</strong></td>
  `;
  tableBody.appendChild(separatorRow);
  
  // Add support feature rows
  supportFeatures.forEach(feature => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="compare-feature">${feature.name}</td>
      <td>${feature.blueprint ? '<i class="compare-check" data-feather="check"></i>' : '<i class="compare-x" data-feather="x"></i>'}</td>
      <td>${feature.automator ? '<i class="compare-check" data-feather="check"></i>' : '<i class="compare-x" data-feather="x"></i>'}</td>
      <td>${feature.growth ? '<i class="compare-check" data-feather="check"></i>' : '<i class="compare-x" data-feather="x"></i>'}</td>
    `;
    tableBody.appendChild(row);
  });
  
  // Replace icons
  if (typeof feather !== 'undefined') {
    feather.replace();
  }
}

// Add pulse animation to module count
setInterval(() => {
  const moduleCountHighlight = document.querySelector('.module-count-highlight');
  if (moduleCountHighlight) {
    moduleCountHighlight.classList.add('pulse-animation');
    setTimeout(() => {
      moduleCountHighlight.classList.remove('pulse-animation');
    }, 1000);
  }
}, 5000); 