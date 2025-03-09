/**
 * Pricing Table Renderer for The Vertical Shortcut
 */

// Pricing plans data
const pricingPlans = [
  {
    title: "Self-Guided",
    price: "497",
    period: "one-time",
    description: "Complete the journey at your own pace with full access to course materials.",
    features: [
      "Full Course Access",
      "Content Templates",
      "Self-Paced Learning",
      "Lifetime Updates",
      "Community Access",
    ],
    popular: false,
    cta: "Get Started",
    ctaLink: "#checkout-self-guided"
  },
  {
    title: "Guided Implementation",
    price: "997",
    period: "one-time",
    description: "Accelerate your success with guided implementation and weekly coaching.",
    features: [
      "Everything in Self-Guided",
      "Weekly Group Coaching",
      "Content Review & Feedback",
      "1-on-1 Strategy Session",
      "Team Training Templates",
      "Content Calendar Setup"
    ],
    popular: true,
    badge: "Most Popular",
    cta: "Get Started",
    ctaLink: "#checkout-guided"
  },
  {
    title: "Agency Partnership",
    price: "2,497",
    period: "one-time",
    description: "Fully customized implementation with direct access to our team.",
    features: [
      "Everything in Guided",
      "Custom Content Strategy",
      "3 Month Done-For-You Setup",
      "Team Hiring & Onboarding",
      "Private Coaching Sessions",
      "Direct Agency Access"
    ],
    popular: false,
    cta: "Apply Now",
    ctaLink: "#apply-agency"
  }
];

// Comparison table data
const comparisonFeatures = [
  {
    feature: "Course Access",
    selfGuided: true,
    guided: true,
    agency: true
  },
  {
    feature: "Lifetime Updates",
    selfGuided: true,
    guided: true,
    agency: true
  },
  {
    feature: "Content Templates",
    selfGuided: true,
    guided: true,
    agency: true
  },
  {
    feature: "Community Access",
    selfGuided: true,
    guided: true,
    agency: true
  },
  {
    feature: "Weekly Group Coaching",
    selfGuided: false,
    guided: true,
    agency: true
  },
  {
    feature: "Content Review & Feedback",
    selfGuided: false,
    guided: true,
    agency: true
  },
  {
    feature: "1-on-1 Strategy Sessions",
    selfGuided: false,
    guided: "1 Session",
    agency: "4 Sessions"
  },
  {
    feature: "Team Training Templates",
    selfGuided: false,
    guided: true,
    agency: true
  },
  {
    feature: "Custom Content Strategy",
    selfGuided: false,
    guided: false,
    agency: true
  },
  {
    feature: "Done-For-You Setup",
    selfGuided: false,
    guided: false,
    agency: true
  },
  {
    feature: "Team Hiring & Onboarding",
    selfGuided: false,
    guided: false,
    agency: true
  }
];

/**
 * Renders the pricing table
 */
function renderPricingTable() {
  try {
    console.log('Rendering pricing table...');
    
    // Find pricing containers
    const pricingCardsContainer = document.querySelector('.pricing-cards-container');
    const comparisonTableContainer = document.querySelector('.comparison-table-container');
    
    if (!pricingCardsContainer) {
      console.error('Pricing cards container not found');
      return false;
    }
    
    // Clear existing content
    pricingCardsContainer.innerHTML = '';
    
    // Render pricing cards
    pricingPlans.forEach(plan => {
      pricingCardsContainer.appendChild(createPricingCard(plan));
    });
    
    // Render comparison table if the container exists
    if (comparisonTableContainer) {
      comparisonTableContainer.innerHTML = createComparisonTable(pricingPlans);
    }
    
    // Initialize Feather icons if available
    if (typeof feather !== 'undefined') {
      feather.replace();
    }
    
    console.log('✅ Pricing table rendered successfully');
    return true;
  } catch (error) {
    console.error('❌ Error rendering pricing table:', error);
    return false;
  }
}

/**
 * Creates a pricing card element
 */
function createPricingCard(plan) {
  const card = document.createElement('div');
  card.className = 'pricing-card';
  
  if (plan.popular) {
    card.classList.add('popular');
  }
  
  card.style.setProperty('--plan-color', plan.color);
  
  // Create badge if exists
  const badgeHTML = plan.badge ? 
    `<div class="pricing-badge" style="background-color: ${plan.color}">${plan.badge}</div>` : '';
  
  // Create features list
  const featuresHTML = plan.features.map(feature => 
    `<li class="pricing-feature">
      <i data-feather="check-circle" class="feature-icon"></i>
      <span>${feature}</span>
    </li>`
  ).join('');
  
  // Create exclusions list if any
  const exclusionsHTML = plan.exclusions > 0 ? 
    plan.exclusions.map(exclusion => 
      `<li class="pricing-exclusion">
        <i data-feather="x-circle" class="exclusion-icon"></i>
        <span>${exclusion}</span>
      </li>`
    ).join('') : '';
  
  card.innerHTML = `
    ${badgeHTML}
    <h3 class="pricing-plan-name">Founder ${plan.name}</h3>
    <p class="pricing-description">${plan.description}</p>
    <div class="pricing-price">
      <span class="currency">${plan.currency}</span>
      <span class="amount">${plan.price}</span>
      ${plan.billingPeriod !== 'one-time' ? `<span class="period">/${plan.billingPeriod}</span>` : ''}
    </div>
    <ul class="pricing-features">
      ${featuresHTML}
      ${exclusionsHTML}
    </ul>
    <a href="#" class="pricing-cta" style="background-color: ${plan.color}">${plan.ctaText}</a>
  `;
  
  return card;
}

/**
 * Creates comparison table HTML
 */
function createComparisonTable(plans) {
  // Define all features for comparison
  const allFeatures = [
    'Core Curriculum Access',
    'Video Templates & Scripts',
    'Content Calendar Framework',
    'Basic Team Training',
    'Advanced Delegation Systems',
    'Hiring & Team Training Guides',
    'Group Coaching',
    'Private Community Access',
    'Content Review Sessions',
    'Updates Access',
    'VIP Direct Access',
    'Strategy Sessions',
    'Personal Critique & Feedback',
    'Custom Content Planning',
    'Priority Support'
  ];
  
  // Create table header
  const tableHeader = `
    <div class="comparison-header">
      <div class="comparison-feature-name">Feature</div>
      ${plans.map(plan => `
        <div class="comparison-plan-name" style="color: ${plan.color}">
          Founder ${plan.name}
        </div>
      `).join('')}
    </div>
  `;
  
  // Create table rows
  const tableRows = allFeatures.map(feature => {
    return `
      <div class="comparison-row">
        <div class="comparison-feature-name">${feature}</div>
        ${plans.map(plan => {
          // Check if the plan has this feature
          const hasFeature = plan.features.some(f => f.includes(feature));
          return `
            <div class="comparison-feature-value" style="--plan-color: ${plan.color}">
              ${hasFeature ? 
                `<i data-feather="check" class="feature-included"></i>` : 
                `<i data-feather="minus" class="feature-excluded"></i>`}
            </div>
          `;
        }).join('')}
      </div>
    `;
  }).join('');
  
  // Create CTA row
  const ctaRow = `
    <div class="comparison-cta-row">
      <div class="comparison-feature-name"></div>
      ${plans.map(plan => `
        <div class="comparison-cta-cell">
          <a href="#" class="comparison-cta" style="background-color: ${plan.color}">
            ${plan.ctaText}
          </a>
        </div>
      `).join('')}
    </div>
  `;
  
  return `
    <div class="comparison-table">
      ${tableHeader}
      ${tableRows}
      ${ctaRow}
    </div>
  `;
}

// Make function available globally
window.renderPricingTable = renderPricingTable;

// Function to render pricing cards
function renderPricingCards() {
  const container = document.querySelector('.pricing-cards-container');
  if (!container) return;
  
  container.innerHTML = '';
  
  pricingPlans.forEach(plan => {
    const card = document.createElement('div');
    card.className = `pricing-card ${plan.popular ? 'popular' : ''}`;
    
    let badgeHTML = '';
    if (plan.popular && plan.badge) {
      badgeHTML = `<div class="popular-badge">${plan.badge}</div>`;
    }
    
    let featuresHTML = '';
    plan.features.forEach(feature => {
      featuresHTML += `
        <div class="pricing-feature">
          <i data-feather="check-circle" class="feature-icon"></i>
          <span>${feature}</span>
        </div>
      `;
    });
    
    card.innerHTML = `
      ${badgeHTML}
      <h3 class="pricing-card-title">${plan.title}</h3>
      <div class="pricing-card-price">
        <span class="price-currency">$</span>
        ${plan.price}
        <span class="price-period">/${plan.period}</span>
      </div>
      <p class="pricing-card-description">${plan.description}</p>
      <div class="pricing-features">
        ${featuresHTML}
      </div>
      <a href="${plan.ctaLink}" class="pricing-card-cta">${plan.cta}</a>
    `;
    
    container.appendChild(card);
  });
  
  // Initialize Feather icons if available
  if (typeof feather !== 'undefined') {
    feather.replace();
  }
}

// Function to render comparison table
function renderComparisonTable() {
  const container = document.querySelector('.comparison-table-container');
  if (!container) return;
  
  let tableHTML = `
    <table class="comparison-table">
      <thead>
        <tr>
          <th>Feature</th>
          <th>Self-Guided</th>
          <th>Guided Implementation</th>
          <th>Agency Partnership</th>
        </tr>
      </thead>
      <tbody>
  `;
  
  comparisonFeatures.forEach(item => {
    tableHTML += `
      <tr class="comparison-feature-row">
        <td>${item.feature}</td>
        <td>${renderTableCell(item.selfGuided)}</td>
        <td>${renderTableCell(item.guided)}</td>
        <td>${renderTableCell(item.agency)}</td>
      </tr>
    `;
  });
  
  tableHTML += `
      </tbody>
    </table>
  `;
  
  container.innerHTML = tableHTML;
  
  // Initialize Feather icons if available
  if (typeof feather !== 'undefined') {
    feather.replace();
  }
}

// Helper function to render table cell content
function renderTableCell(value) {
  if (value === true) {
    return '<i data-feather="check" class="check-icon"></i>';
  } else if (value === false) {
    return '<i data-feather="x" class="x-icon"></i>';
  } else {
    return value; // For text content like "1 Session"
  }
}

// Initialize pricing section
document.addEventListener('DOMContentLoaded', () => {
  renderPricingCards();
  renderComparisonTable();
  initializeQuiz();
  
  // Update quiz progress indicator
  function updateQuizProgress(step) {
    const progressBar = document.querySelector('.quiz-progress-bar');
    if (progressBar) {
      progressBar.setAttribute('data-step', step);
    }
    
    // Update step indicators
    document.querySelectorAll('.quiz-step-indicator').forEach(indicator => {
      indicator.classList.remove('active');
    });
    document.querySelector(`.quiz-step-indicator[data-step="${step}"]`).classList.add('active');
  }
  
  // Initialize quiz functionality
  function initializeQuiz() {
    const quizTriggers = document.querySelectorAll('.quiz-trigger');
    const recommendationQuiz = document.getElementById('recommendation-quiz');
    const closeQuiz = document.getElementById('close-quiz');
    
    if (quizTriggers && recommendationQuiz && closeQuiz) {
      quizTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
          recommendationQuiz.classList.add('active');
          document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });
      });
      
      closeQuiz.addEventListener('click', () => {
        recommendationQuiz.classList.remove('active');
        document.body.style.overflow = '';
      });
      
      // Close modal when clicking outside the content
      recommendationQuiz.addEventListener('click', (e) => {
        if (e.target === recommendationQuiz) {
          recommendationQuiz.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }
    
    // Quiz navigation
    const quizPrev = document.getElementById('quiz-prev');
    const quizNext = document.getElementById('quiz-next');
    const quizSteps = document.querySelectorAll('.quiz-step');
    
    if (quizPrev && quizNext && quizSteps.length) {
      let currentStep = 1;
      
      quizNext.addEventListener('click', () => {
        if (currentStep === 3) {
          // Show recommendation
          document.querySelector(`.quiz-step[data-step="${currentStep}"]`).classList.remove('active');
          document.querySelector('.quiz-step[data-step="result"]').classList.add('active');
          quizNext.textContent = 'View Plans';
          quizNext.innerHTML = 'View Plans <i data-feather="external-link"></i>';
          updateQuizProgress('result');
          
          // Reinitialize Feather icons for the newly added icon
          if (typeof feather !== 'undefined') {
            feather.replace();
          }
          
          quizNext.addEventListener('click', () => {
            recommendationQuiz.classList.remove('active');
            document.body.style.overflow = '';
            document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' });
            
            // Animate the recommended plan card
            setTimeout(() => {
              const recommendedPlan = document.querySelector(`.pricing-card.${getRecommendation().toLowerCase().replace(' ', '-')}`);
              if (recommendedPlan) {
                recommendedPlan.classList.add('highlight-recommended');
                setTimeout(() => {
                  recommendedPlan.classList.remove('highlight-recommended');
                }, 2000);
              }
            }, 500);
          }, { once: true });
          return;
        }
        
        // Validate that an option is selected
        const currentOptions = document.querySelectorAll(`.quiz-step[data-step="${currentStep}"] input[type="radio"]`);
        let isOptionSelected = false;
        
        currentOptions.forEach(option => {
          if (option.checked) {
            isOptionSelected = true;
          }
        });
        
        if (!isOptionSelected) {
          showValidationMessage(currentStep);
          return;
        }
        
        // Transition to next step
        document.querySelector(`.quiz-step[data-step="${currentStep}"]`).classList.remove('active');
        currentStep++;
        document.querySelector(`.quiz-step[data-step="${currentStep}"]`).classList.add('active');
        
        quizPrev.disabled = false;
        updateQuizProgress(currentStep);
        
        if (currentStep === 3) {
          quizNext.innerHTML = 'Get Recommendation <i data-feather="check-circle"></i>';
          // Reinitialize Feather icons for the newly added icon
          if (typeof feather !== 'undefined') {
            feather.replace();
          }
        }
      });
      
      quizPrev.addEventListener('click', () => {
        document.querySelector(`.quiz-step[data-step="${currentStep}"]`).classList.remove('active');
        currentStep--;
        document.querySelector(`.quiz-step[data-step="${currentStep}"]`).classList.add('active');
        
        quizPrev.disabled = currentStep === 1;
        updateQuizProgress(currentStep);
        
        if (currentStep < 3) {
          quizNext.innerHTML = 'Next <i data-feather="arrow-right"></i>';
          // Reinitialize Feather icons
          if (typeof feather !== 'undefined') {
            feather.replace();
          }
        }
      });
      
      // Add option selection event
      document.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', () => {
          const radioInput = option.querySelector('input[type="radio"]');
          if (radioInput) {
            radioInput.checked = true;
            
            // Remove validation message if present
            const step = option.closest('.quiz-step').getAttribute('data-step');
            removeValidationMessage(step);
            
            // Process answers when all steps are completed
            if (currentStep === 3) {
              processQuizAnswers();
            }
          }
        });
      });
    }
  }
  
  // Show validation message for a step
  function showValidationMessage(step) {
    const stepEl = document.querySelector(`.quiz-step[data-step="${step}"]`);
    if (!stepEl.querySelector('.validation-message')) {
      const message = document.createElement('div');
      message.className = 'validation-message';
      message.innerHTML = '<i data-feather="alert-circle"></i> Please select an option to continue';
      stepEl.querySelector('h4').insertAdjacentElement('afterend', message);
      
      // Initialize feather icons
      if (typeof feather !== 'undefined') {
        feather.replace();
      }
      
      // Add animation
      message.style.animation = 'shake 0.5s ease';
    }
  }
  
  // Remove validation message
  function removeValidationMessage(step) {
    const message = document.querySelector(`.quiz-step[data-step="${step}"] .validation-message`);
    if (message) {
      message.remove();
    }
  }
  
  // Get recommendation based on answers
  function getRecommendation() {
    const journey = document.querySelector('input[name="journey"]:checked')?.value;
    const involvement = document.querySelector('input[name="involvement"]:checked')?.value;
    const speed = document.querySelector('input[name="speed"]:checked')?.value;
    
    // Simple logic for recommendation (can be more complex)
    if (involvement === 'none' || speed === 'fast') {
      return 'Agency Partnership';
    } else if (journey === 'beginner' || involvement === 'basics') {
      return 'Guided Implementation';
    } else {
      return 'Self-Guided';
    }
  }
  
  // Process quiz answers and show recommendation
  function processQuizAnswers() {
    const recommendation = getRecommendation();
    let recommendationText = '';
    
    // Recommendation text based on selected options
    switch(recommendation) {
      case 'Agency Partnership':
        recommendationText = 'Based on your answers, we recommend our Agency Partnership plan for the fastest implementation with minimal involvement from you.';
        break;
      case 'Guided Implementation':
        recommendationText = 'The Guided Implementation plan is perfect for you - providing the support and coaching you need without the full agency investment.';
        break;
      case 'Self-Guided':
        recommendationText = 'The Self-Guided plan appears to be a great fit for your needs, providing all the materials and community support for you to implement at your own pace.';
        break;
    }
    
    // Find the relevant plan
    const plan = pricingPlans.find(p => p.title === recommendation);
    
    const recommendationElement = document.getElementById('quiz-recommendation');
    if (recommendationElement && plan) {
      recommendationElement.innerHTML = `
        <div class="recommendation-content">
          <h3 class="recommendation-title">${plan.title}</h3>
          <div class="recommendation-price">
            <span class="price-currency">$</span>${plan.price}
            <span class="price-period">/${plan.period}</span>
          </div>
          <p class="recommendation-text">${recommendationText}</p>
          <div class="recommendation-features">
            ${plan.features.slice(0, 3).map(feature => `
              <div class="recommendation-feature">
                <i data-feather="check-circle" class="feature-icon"></i>
                <span>${feature}</span>
              </div>
            `).join('')}
            <div class="recommendation-feature-more">
              <span>+ ${plan.features.length - 3} more features</span>
            </div>
          </div>
          <a href="${plan.ctaLink}" class="pricing-card-cta recommendation-cta">
            Get Started with ${plan.title}
            <i data-feather="arrow-right"></i>
          </a>
        </div>
      `;
      
      // Add CSS to the recommendation CTA
      const recommendationCta = recommendationElement.querySelector('.recommendation-cta');
      if (recommendationCta) {
        recommendationCta.style.marginTop = '2rem';
        recommendationCta.style.display = 'flex';
        recommendationCta.style.alignItems = 'center';
        recommendationCta.style.justifyContent = 'center';
        recommendationCta.style.gap = '0.5rem';
      }
      
      // Initialize Feather icons if available
      if (typeof feather !== 'undefined') {
        feather.replace();
      }
    }
  }
}); 