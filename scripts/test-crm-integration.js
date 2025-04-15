/**
 * Test script for CRM integration
 * 
 * This script sends test data to the CRM integration API endpoint
 * to verify it's working correctly without going through the UI.
 * 
 * Usage:
 * node scripts/test-crm-integration.js
 */

import axios from 'axios';

// Sample test data
const testData = {
  leadData: {
    contact: {
      name: 'Test User',
      email: 'test@example.com',
      company: 'Test Company',
      position: 'Marketing Director'
    },
    qualification: {
      teamSize: 5,
      implementationSupport: 'guided',
      timeline: 'immediate',
      contentVolume: 'medium',
      recommendedApproach: 'comprehensive',
      score: 7
    },
    engagement: {
      timeSpent: 120,
      questionInteractions: 8,
      focusChanges: 2
    },
    timestamps: {
      qualificationStarted: new Date(Date.now() - 120000),
      qualificationCompleted: new Date(),
      recommendationViewed: new Date()
    },
    source: {
      initialReferrer: 'direct',
      landingPage: 'http://localhost:5173',
      utmSource: '',
      utmMedium: '',
      utmCampaign: '',
      device: 'desktop',
      browser: 'Chrome'
    }
  },
  
  kajabiData: {
    person: {
      name: 'Test User',
      email: 'test@example.com',
      custom_field_values: {
        qualification_score: '7',
        recommended_approach: 'comprehensive',
        team_size: '5',
        implementation_support: 'guided',
        timeline: 'immediate',
        content_volume: 'medium'
      },
      tags: [
        'qualification_complete',
        'recommended_comprehensive',
        'timeline_immediate'
      ]
    }
  },
  
  kitData: {
    email: 'test@example.com',
    first_name: 'Test',
    fields: {
      last_name: 'User',
      company: 'Test Company',
      position: 'Marketing Director',
      qualification_score: 7,
      recommended_approach: 'comprehensive',
      team_size: 5,
      implementation_support: 'guided',
      timeline: 'immediate',
      content_volume: 'medium'
    },
    tags: [
      'qualified_lead',
      'recommendation_comprehensive',
      'timeline_immediate',
      'team_size_medium'
    ]
  }
};

const testCrmIntegration = async () => {
  try {
    console.log('Sending test data to CRM integration API...');
    
    const response = await axios.post('http://localhost:5173/api/crm-integration', testData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Response status:', response.status);
    console.log('Response data:', JSON.stringify(response.data, null, 2));
    
    if (response.data.success) {
      console.log('✅ CRM integration test successful!');
    } else {
      console.log('❌ CRM integration test failed!');
      console.log('Error:', response.data.error);
    }
  } catch (error) {
    console.error('❌ Error testing CRM integration:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
  }
};

// Run the test
testCrmIntegration();