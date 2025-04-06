# CRM_INTEGRATION_GUIDE.md: Qualification Modal

This guide outlines how to integrate the Qualification Modal with your CRM system to effectively track leads, qualification data, and the full sales journey.

## Data Schema Overview

The qualification modal collects and structures data in a format optimized for CRM integration. Here's the complete data schema:

```javascript
const leadData = {
  // Contact information
  contact: {
    name: String,        // Full name from contact form
    email: String,       // Email address from contact form
    company: String,     // Company name from contact form
    position: String     // Job title/position from contact form
  },
  
  // Qualification data
  qualification: {
    teamSize: Number,               // Numerical team size
    implementationSupport: String,  // 'self_directed', 'guided', or 'full_service'
    timeline: String,               // 'immediate', 'next_quarter', or 'exploratory'
    contentVolume: String,          // 'low', 'medium', or 'high'
    recommendedApproach: String,    // 'foundation', 'comprehensive', or 'executive'
    score: Number                   // Raw qualification score (1-11)
  },
  
  // Engagement metrics
  engagement: {
    timeSpent: Number,           // Seconds spent in qualification process
    questionInteractions: Number, // Number of interactions with questions
    focusChanges: Number,        // Number of times focus changed
    completionRate: Number       // Percentage of journey completed
  },
  
  // Funnel status
  funnel: {
    qualificationStarted: Boolean,   // Whether qualification was started
    qualificationCompleted: Boolean, // Whether qualification was completed
    recommendationViewed: Boolean,   // Whether recommendation was viewed
    calendlyScheduled: Boolean,      // Whether a call was scheduled
    callCompleted: Boolean,          // To be updated later in the funnel
    followupStatus: String           // 'pending', 'in_progress', 'converted', 'lost'
  },
  
  // Timestamps for funnel analysis
  timestamps: {
    qualificationStarted: Date,     // When qualification began
    qualificationCompleted: Date,   // When qualification finished
    recommendationViewed: Date,     // When recommendation was seen
    calendlyScheduled: Date,        // When call was booked
    firstVisit: Date,               // First landing page visit
    callDate: Date                  // Scheduled call date/time
  },
  
  // Source information
  source: {
    initialReferrer: String,         // Original referrer
    landingPage: String,             // Landing page URL
    utmSource: String,               // UTM source if available
    utmMedium: String,               // UTM medium if available
    utmCampaign: String,             // UTM campaign if available
    device: String,                  // Device type
    browser: String                  // Browser used
  }
};
```

## Integration Method 1: Direct API Integration

### Step 1: Set Up API Endpoint

Create an API endpoint in your backend service to receive qualification data:

```javascript
// Example Node.js/Express implementation
app.post('/api/qualification-data', async (req, res) => {
  try {
    const leadData = req.body;
    
    // Validate the data
    if (!leadData.contact.email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    
    // Process the data for your CRM
    const crmData = transformForCRM(leadData);
    
    // Send to CRM via API
    const crmResponse = await sendToCRM(crmData);
    
    // Return success response
    res.status(200).json({ success: true, crmId: crmResponse.id });
  } catch (error) {
    console.error('Error processing qualification data:', error);
    res.status(500).json({ error: 'Failed to process qualification data' });
  }
});
```

### Step 2: Update the Modal Component

Modify the `handleBookCall` function in VSQualificationModal.jsx to send data to your API:

```javascript
const handleBookCall = async () => {
  setShowCalendly(true);
  
  // Prepare the lead data
  const leadData = {
    contact: {
      name: answers.name,
      email: answers.email,
      company: answers.company,
      position: answers.position
    },
    qualification: {
      teamSize: parseInt(answers.teamSize || 0),
      implementationSupport: answers.implementationSupport,
      timeline: answers.timeline,
      contentVolume: answers.contentVolume,
      recommendedApproach: recommendation.type,
      score: recommendation.score
    },
    engagement: {
      timeSpent: engagement.timeSpent,
      questionInteractions: engagement.questionInteractions,
      focusChanges: engagement.focusChanges,
      completionRate: 100 // Completed all steps
    },
    funnel: {
      qualificationStarted: true,
      qualificationCompleted: true,
      recommendationViewed: true,
      calendlyScheduled: true,
      callCompleted: false,
      followupStatus: 'pending'
    },
    timestamps: {
      qualificationStarted: new Date(Date.now() - (engagement.timeSpent * 1000)),
      qualificationCompleted: new Date(),
      recommendationViewed: new Date(),
      calendlyScheduled: new Date(),
      firstVisit: new Date(sessionStorage.getItem('firstVisit') || Date.now()),
      callDate: null // Will be updated after Calendly booking
    },
    source: getSourceData() // Helper function to collect source data
  };
  
  // Send to your API endpoint
  try {
    const response = await fetch('/api/qualification-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
    });
    
    const result = await response.json();
    if (!result.success) {
      console.error('Failed to save lead data:', result.error);
    }
  } catch (error) {
    console.error('Error sending lead data:', error);
  }
  
  // Optional: still store in sessionStorage as backup
  sessionStorage.setItem('qualificationData', JSON.stringify(leadData));
};

// Helper function to collect source data
const getSourceData = () => {
  return {
    initialReferrer: document.referrer || 'direct',
    landingPage: window.location.href,
    utmSource: new URLSearchParams(window.location.search).get('utm_source') || '',
    utmMedium: new URLSearchParams(window.location.search).get('utm_medium') || '',
    utmCampaign: new URLSearchParams(window.location.search).get('utm_campaign') || '',
    device: /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/.test(navigator.userAgent) ? 'mobile' : 'desktop',
    browser: getBrowser() // Helper function to detect browser
  };
};

// Helper function to detect browser
const getBrowser = () => {
  const ua = navigator.userAgent;
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
  if (ua.includes('Edge')) return 'Edge';
  return 'Other';
};
```

## Integration Method 2: Calendly Webhook Integration

### Step 1: Configure Calendly Webhooks

1. In your Calendly account, go to Integrations > Webhooks
2. Add a new webhook for "Invitee Created" events
3. Set the webhook URL to your backend endpoint
4. Configure webhook security (use signature verification)

### Step 2: Create Webhook Handler

Create an endpoint to handle Calendly webhooks:

```javascript
// Example Node.js/Express implementation
app.post('/api/calendly-webhook', async (req, res) => {
  try {
    // Verify Calendly webhook signature
    const signature = req.headers['calendly-webhook-signature'];
    if (!verifySignature(signature, req.body, process.env.CALENDLY_WEBHOOK_SECRET)) {
      return res.status(401).json({ error: 'Invalid signature' });
    }
    
    const event = req.body;
    
    // Check if this is an invitee created event
    if (event.event === 'invitee.created') {
      const invitee = event.payload.invitee;
      
      // Extract custom answers
      const customAnswers = {};
      invitee.questions_and_answers.forEach(qa => {
        if (qa.question.startsWith('Custom_')) {
          const key = qa.question.replace('Custom_', '');
          customAnswers[key] = qa.answer;
        }
      });
      
      // Look for a1-a6 custom fields from the qualification modal
      const qualificationData = {
        teamSize: customAnswers.a1,
        implementationSupport: customAnswers.a2,
        timeline: customAnswers.a3,
        contentVolume: customAnswers.a4,
        recommendedApproach: customAnswers.a5,
        engagementMetrics: customAnswers.a6
      };
      
      // Create lead in CRM
      await createOrUpdateLeadInCRM({
        name: invitee.name,
        email: invitee.email,
        scheduled: true,
        callTime: invitee.scheduled_event.start_time,
        qualificationData
      });
    }
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error processing Calendly webhook:', error);
    res.status(500).json({ error: 'Failed to process webhook' });
  }
});
```

## Integration Method 3: Hybrid Approach (Recommended)

This approach combines direct API integration and Calendly webhooks for maximum reliability.

### Step 1: Implement Both Methods Above

Implement both the direct API integration and Calendly webhook methods.

### Step 2: Add Lead Matching Logic

Create logic to match leads between the two systems:

```javascript
// Example lead matching function
async function matchLeadData(calendlyData) {
  try {
    // Look for existing lead by email
    const existingLead = await findLeadByEmail(calendlyData.email);
    
    if (existingLead) {
      // Update existing lead with call information
      return await updateLead(existingLead.id, {
        callScheduled: true,
        callTime: calendlyData.callTime,
        lastUpdated: new Date()
      });
    } else {
      // Create new lead with limited information
      return await createLead({
        name: calendlyData.name,
        email: calendlyData.email,
        callScheduled: true,
        callTime: calendlyData.callTime,
        qualificationData: calendlyData.qualificationData,
        source: {
          channel: 'calendly_direct',
          firstTouch: new Date()
        }
      });
    }
  } catch (error) {
    console.error('Error matching lead data:', error);
    throw error;
  }
}
```

## CRM-Specific Integration Guidelines

### Kajabi Integration

For Kajabi, map the qualification data to the following structure:

1. **Contact Record**:
   - Basic contact information (name, email)
   - Custom fields for qualification data
   
2. **Tags**:
   - Recommendation-specific tags
   - Qualification stage tags
   
3. **Notes**:
   - Detailed qualification responses
   - Engagement metrics

Example Kajabi API implementation:

```javascript
const axios = require('axios');

async function createKajabiContact(leadData) {
  try {
    // Create or update contact in Kajabi
    const response = await axios({
      method: 'post',
      url: 'https://api.kajabi.com/api/v1/people',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-API-KEY': process.env.KAJABI_API_KEY
      },
      data: {
        person: {
          name: leadData.contact.name,
          email: leadData.contact.email,
          custom_field_values: {
            qualification_score: leadData.qualification.score.toString(),
            recommended_approach: leadData.qualification.recommendedApproach,
            team_size: leadData.qualification.teamSize.toString(),
            implementation_support: leadData.qualification.implementationSupport,
            timeline: leadData.qualification.timeline,
            content_volume: leadData.qualification.contentVolume
          },
          tags: [
            `qualification_complete`,
            `recommended_${leadData.qualification.recommendedApproach.toLowerCase()}`,
            `timeline_${leadData.qualification.timeline}`
          ]
        }
      }
    });
    
    // Add notes with detailed information
    await axios({
      method: 'post',
      url: `https://api.kajabi.com/api/v1/people/${response.data.id}/notes`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-API-KEY': process.env.KAJABI_API_KEY
      },
      data: {
        note: {
          body: `Qualification Data:\n
          Score: ${leadData.qualification.score}\n
          Team Size: ${leadData.qualification.teamSize}\n
          Implementation Support: ${leadData.qualification.implementationSupport}\n
          Timeline: ${leadData.qualification.timeline}\n
          Content Volume: ${leadData.qualification.contentVolume}\n
          Engagement: Time spent ${leadData.engagement.timeSpent}s, Interactions ${leadData.engagement.questionInteractions}\n
          Source: ${leadData.source.utmSource || 'Direct'}`
        }
      }
    });
    
    return {
      contactId: response.data.id
    };
  } catch (error) {
    console.error('Error creating Kajabi contact:', error);
    throw error;
  }
}
```

### Kit (formerly ConvertKit) Integration

For Kit, use the following data structure:

1. **Subscriber**:
   - Basic contact information
   
2. **Tags**:
   - Recommendation-specific tags
   - Qualification journey tags
   
3. **Custom Fields**:
   - Detailed qualification responses
   - Lead scoring data

Example Kit API implementation:

```javascript
const axios = require('axios');

async function createKitSubscriber(leadData) {
  try {
    // Create or update subscriber in Kit
    const response = await axios({
      method: 'post',
      url: 'https://api.convertkit.com/v3/subscribers',
      params: {
        api_key: process.env.KIT_API_KEY
      },
      data: {
        email: leadData.contact.email,
        first_name: leadData.contact.name.split(' ')[0],
        fields: {
          last_name: leadData.contact.name.split(' ').slice(1).join(' '),
          company: leadData.contact.company,
          position: leadData.contact.position,
          qualification_score: leadData.qualification.score,
          recommended_approach: leadData.qualification.recommendedApproach,
          team_size: leadData.qualification.teamSize,
          implementation_support: leadData.qualification.implementationSupport,
          timeline: leadData.qualification.timeline,
          content_volume: leadData.qualification.contentVolume
        }
      }
    });
    
    // Add tags based on qualification
    const tags = [
      `qualified_lead`,
      `recommendation_${leadData.qualification.recommendedApproach.toLowerCase()}`,
      `timeline_${leadData.qualification.timeline}`,
      `team_size_${leadData.qualification.teamSize < 5 ? 'small' : leadData.qualification.teamSize < 15 ? 'medium' : 'large'}`
    ];
    
    // Add each tag to the subscriber
    for (const tag of tags) {
      await axios({
        method: 'post',
        url: 'https://api.convertkit.com/v3/tags',
        params: {
          api_key: process.env.KIT_API_KEY
        },
        data: {
          tag: {
            name: tag
          }
        }
      }).then(tagResponse => {
        // Add subscriber to tag
        return axios({
          method: 'post',
          url: `https://api.convertkit.com/v3/tags/${tagResponse.data.tag.id}/subscribe`,
          params: {
            api_key: process.env.KIT_API_KEY
          },
          data: {
            email: leadData.contact.email
          }
        });
      });
    }
    
    return {
      subscriberId: response.data.subscriber.id
    };
  } catch (error) {
    console.error('Error creating Kit subscriber:', error);
    throw error;
  }
}
```

### Salesforce Integration

For Salesforce, map the qualification data to these objects:

1. **Lead Object**:
   - Basic contact information
   - Qualification score
   - Recommended approach
   
2. **Custom Qualification Object**:
   - Detailed qualification responses
   - Engagement metrics
   
3. **Task Object**:
   - Scheduled call details
   - Follow-up assignments

Example Salesforce Field Mapping:

```javascript
const salesforceMapping = {
  Lead: {
    FirstName: leadData.contact.name.split(' ')[0],
    LastName: leadData.contact.name.split(' ').slice(1).join(' '),
    Email: leadData.contact.email,
    Company: leadData.contact.company,
    Title: leadData.contact.position,
    QualificationScore__c: leadData.qualification.score,
    RecommendedApproach__c: leadData.qualification.recommendedApproach,
    LeadSource: leadData.source.utmSource || 'Website',
    Status: 'Qualified - Appointment Scheduled'
  },
  Qualification__c: {
    TeamSize__c: leadData.qualification.teamSize,
    ImplementationSupport__c: leadData.qualification.implementationSupport,
    Timeline__c: leadData.qualification.timeline,
    ContentVolume__c: leadData.qualification.contentVolume,
    TimeSpent__c: leadData.engagement.timeSpent,
    InteractionCount__c: leadData.engagement.questionInteractions
  }
};
```

### HubSpot Integration

For HubSpot, use a combination of contact properties and custom objects:

1. **Contact Record**:
   - Basic contact information
   - Qualification summary
   
2. **Deal Record**:
   - Opportunity details based on recommendation
   - Deal stage tracking
   
3. **Custom Properties**:
   - Detailed qualification responses
   - Engagement metrics

Example HubSpot API implementation:

```javascript
const hubspotClient = new hubspot.Client({ apiKey: process.env.HUBSPOT_API_KEY });

async function createHubSpotContact(leadData) {
  try {
    // Create or update contact
    const contactResponse = await hubspotClient.crm.contacts.basicApi.create({
      properties: {
        firstname: leadData.contact.name.split(' ')[0],
        lastname: leadData.contact.name.split(' ').slice(1).join(' '),
        email: leadData.contact.email,
        company: leadData.contact.company,
        jobtitle: leadData.contact.position,
        qualification_score: leadData.qualification.score.toString(),
        recommended_approach: leadData.qualification.recommendedApproach,
        team_size: leadData.qualification.teamSize.toString(),
        implementation_support: leadData.qualification.implementationSupport,
        timeline: leadData.qualification.timeline,
        content_volume: leadData.qualification.contentVolume,
        hubspot_owner_id: getSalesRepId(leadData.qualification.recommendedApproach)
      }
    });
    
    // Create deal
    const dealResponse = await hubspotClient.crm.deals.basicApi.create({
      properties: {
        dealname: `${leadData.contact.name} - ${leadData.qualification.recommendedApproach} Implementation`,
        dealstage: 'appointmentscheduled',
        pipeline: 'implementation',
        amount: getRecommendationPrice(leadData.qualification.recommendedApproach),
        qualification_score: leadData.qualification.score.toString()
      },
      associations: [
        {
          to: { id: contactResponse.id },
          types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 3 }]
        }
      ]
    });
    
    return {
      contactId: contactResponse.id,
      dealId: dealResponse.id
    };
  } catch (error) {
    console.error('Error creating HubSpot contact:', error);
    throw error;
  }
}
```

## Tracking the Complete Customer Journey

### Step 1: Add UTM Parameter Tracking

Update your landing page to capture UTM parameters:

```javascript
// Helper function to get UTM parameters
function getUTMParams() {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    utm_source: urlParams.get('utm_source') || '',
    utm_medium: urlParams.get('utm_medium') || '',
    utm_campaign: urlParams.get('utm_campaign') || '',
    utm_content: urlParams.get('utm_content') || '',
    utm_term: urlParams.get('utm_term') || ''
  };
}

// Store UTM params on first visit
if (!sessionStorage.getItem('utmParams')) {
  sessionStorage.setItem('utmParams', JSON.stringify(getUTMParams()));
  sessionStorage.setItem('firstVisit', Date.now().toString());
}
```

### Step 2: Implement Abandoned Journey Recovery

Add logic to track partial qualification journeys:

```javascript
// In VSQualificationModal.jsx
useEffect(() => {
  if (!isOpen) return;
  
  // Save progress after each stage change
  const currentProgress = {
    stage,
    answers,
    engagement,
    lastActive: Date.now()
  };
  
  localStorage.setItem('qualificationProgress', JSON.stringify(currentProgress));
}, [stage, answers, engagement, isOpen]);

// Check for abandoned journey on load
useEffect(() => {
  if (!isOpen) return;
  
  // Check for abandoned journey
  const savedProgress = localStorage.getItem('qualificationProgress');
  if (savedProgress) {
    const progress = JSON.parse(savedProgress);
    
    // If journey was abandoned recently (within 24 hours)
    if (Date.now() - progress.lastActive < 24 * 60 * 60 * 1000) {
      // Ask if user wants to continue
      const wantsToContinue = window.confirm(
        'Would you like to continue where you left off?'
      );
      
      if (wantsToContinue) {
        setStage(progress.stage);
        setAnswers(progress.answers);
        setEngagement(prev => ({
          ...prev,
          timeSpent: progress.engagement.timeSpent,
          questionInteractions: progress.engagement.questionInteractions
        }));
      } else {
        // Clear saved progress if user doesn't want to continue
        localStorage.removeItem('qualificationProgress');
      }
    } else {
      // Clear old progress
      localStorage.removeItem('qualificationProgress');
    }
  }
}, [isOpen]);
```

### Step 3: Implement Post-Call Tracking

After the sales call, update the lead status:

```javascript
// Example webhook handler for Calendly events
app.post('/api/calendly-event', async (req, res) => {
  try {
    const event = req.body;
    
    // Handle different event types
    if (event.event === 'invitee.canceled') {
      // Update lead status when call is canceled
      await updateLeadStatus(event.payload.invitee.email, 'call_canceled');
    } else if (event.event === 'invitee.created') {
      // Update lead with call details
      await updateLeadWithCallDetails(event.payload.invitee);
    } else if (event.event === 'invitee.no_show') {
      // Handle no-shows
      await updateLeadStatus(event.payload.invitee.email, 'no_show');
    }
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error handling Calendly event:', error);
    res.status(500).json({ error: 'Failed to process event' });
  }
});
```

## Analytics & Reporting

### Recommended Analytics Events

Track these key events for comprehensive journey analysis:

1. **qualification_started**: User begins qualification journey
2. **qualification_step_completed**: User completes a qualification step
3. **qualification_abandoned**: User leaves without finishing
4. **recommendation_viewed**: User sees their recommendation
5. **calendly_opened**: User opens the Calendly booking UI
6. **calendly_booked**: User successfully books a call
7. **calendly_canceled**: User cancels a booked call
8. **call_completed**: Sales call is completed
9. **deal_created**: Deal is created in CRM

Example analytics implementation:

```javascript
// Analytics tracking helper
function trackEvent(eventName, properties = {}) {
  // Send to your analytics platform
  if (window.analytics) {
    window.analytics.track(eventName, {
      ...properties,
      timestamp: new Date().toISOString()
    });
  }
  
  // Also log to console in development
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[Analytics] ${eventName}`, properties);
  }
}

// Usage in qualification modal
const handleStartQualification = () => {
  setStage('contact');
  trackEvent('qualification_started', {
    referrer: document.referrer,
    utmParams: JSON.parse(sessionStorage.getItem('utmParams') || '{}')
  });
};
```

### Recommended Dashboards

Set up these dashboards in your analytics or CRM platform:

1. **Qualification Funnel**: Shows drop-off at each qualification step
2. **Recommendation Distribution**: Breakdown of approaches recommended
3. **Conversion by Approach**: Conversion rates for each recommendation type
4. **Engagement Metrics**: Time spent and interaction patterns
5. **Lead Source Quality**: Conversion rates by original traffic source

## Troubleshooting Common Issues

### Data Not Appearing in CRM

Possible causes:
1. API endpoint errors
2. Incorrect field mapping
3. Validation failures
4. Rate limiting issues

Debugging steps:
1. Check browser console for API errors
2. Verify network requests in developer tools
3. Confirm CRM API credentials are valid
4. Test the API endpoint directly with sample data

### Duplicate Leads in CRM

Possible causes:
1. Missing deduplication logic
2. Conflict between direct API and webhook methods
3. Multiple qualification sessions by same user

Solution:
```javascript
// Deduplication function
async function deduplicateLead(email) {
  // Check if lead exists
  const existingLead = await findLeadByEmail(email);
  
  if (existingLead) {
    // Return existing lead ID
    return {
      isNew: false,
      leadId: existingLead.id
    };
  }
  
  // Create new lead
  const newLead = await createLead({ email });
  return {
    isNew: true,
    leadId: newLead.id
  };
}
```

### Calendly Integration Issues

Possible causes:
1. Incorrect Calendly configuration
2. Custom field mapping errors
3. Webhook security issues

Debugging steps:
1. Verify Calendly custom fields match expected names (a1-a6)
2. Check webhook security configuration
3. Test webhook with Calendly's webhook tester
4. Verify data is properly passed in Calendly booking URL

## Best Practices

1. **Data Security**: Always use HTTPS for API endpoints and encrypt sensitive data
2. **Error Handling**: Implement robust error handling for all API calls
3. **Rate Limiting**: Respect CRM API rate limits to avoid throttling
4. **Idempotency**: Ensure operations can be safely retried without creating duplicates
5. **Audit Trails**: Log all CRM operations for troubleshooting
6. **Fallback Mechanisms**: Use localStorage/sessionStorage as backup for API failures
7. **Privacy Compliance**: Ensure all data collection follows privacy regulations
8. **Testing**: Test integration with sample data before going live
9. **Documentation**: Document all custom fields and integration points

## CRM Integration Schedule

1. **Week 1**: Set up data schema and API endpoints
2. **Week 2**: Implement direct API integration and basic tracking
3. **Week 3**: Configure Calendly integration and webhook handling
4. **Week 4**: Implement journey tracking and analytics events
5. **Week 5**: Testing and optimization

## Support & Maintenance

### Regular Maintenance Tasks

1. Update API credentials regularly
2. Review and optimize data structures quarterly
3. Validate field mappings when CRM is updated
4. Test full qualification journey monthly
5. Review error logs weekly

### Support Resources

- Calendly API documentation: https://developer.calendly.com/api-docs
- CRM API documentation: [Your CRM API documentation URL]
- Internal wiki: [Your internal wiki URL]
- Support contact: [Support email or ticket system]