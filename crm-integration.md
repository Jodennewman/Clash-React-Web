# CRM Integration Documentation

This document outlines how the VSQualificationModal integrates with Kajabi and Kit CRM systems.

## Overview

The qualification modal collects user information through a multi-stage process and sends this data to:

1. **Kajabi** - For managing contacts, courses, and automations
2. **Kit** (formerly ConvertKit) - For email marketing and automation

The integration captures comprehensive user data including:
- Contact information
- Qualification answers
- Engagement metrics
- Source tracking
- Timestamps

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the root directory with your API keys:

```
VITE_KAJABI_API_KEY=your_kajabi_api_key
VITE_KIT_API_KEY=your_kit_api_key
```

> ⚠️ **Important**: Never commit the `.env` file to version control.

### 2. API Configuration

The integration is managed through the API endpoint at `/api/crm-integration`. The endpoint:

- Receives qualification data from the frontend
- Sends data to both Kajabi and Kit in parallel
- Returns a combined success/failure response

### 3. Data Mapping

The integration maps collected data to each CRM as follows:

#### Kajabi Mapping:

- **Contact Information**: Basic contact details (name, email, company)
- **Custom Fields**: Qualification data (team size, implementation preference, etc.)
- **Tags**: Tagged with recommendation type, qualification status, etc.
- **Notes**: Detailed qualification responses and engagement metrics

#### Kit Mapping:

- **Subscriber**: Basic contact information
- **Fields**: Qualification responses
- **Tags**: Segmentation based on recommendation and qualification answers

## Testing the Integration

To test the integration:

1. Set up the environment variables with test API keys
2. Run the development server: `npm run dev`
3. Open the qualification modal and complete the full journey
4. Check the browser console for [CRM Integration] logs
5. Verify the contact is created in both Kajabi and Kit admin interfaces

## Troubleshooting

Common issues and solutions:

- **API Authentication Errors**: Verify your API keys are correct and have proper permissions
- **Rate Limiting**: Kajabi and Kit have API rate limits, so implement proper error handling
- **Field Mapping Issues**: Ensure custom fields are created in both CRMs before sending data

## Data Flow Diagram

```
Frontend Modal → API Endpoint → Kajabi & Kit → Response
```

## Security Considerations

The integration includes several security measures:

1. API keys stored in environment variables, not in code
2. HTTPS for all API requests
3. No sensitive data logged or stored in browser storage
4. Error handling to prevent data leaks

## Development Notes

For local development, you can use test environments:

- Use Kajabi sandbox environment for testing
- Use Kit staging environment for testing

## CRM Webhooks

In addition to direct API integration, the system is designed to handle:

1. **Calendly webhooks** - Update lead status when calls are scheduled/completed
2. **Kajabi webhooks** - Track course enrollments and progress
3. **Kit webhooks** - Monitor email engagement

## Maintenance

Regular tasks to maintain the integration:

1. Update API credentials quarterly
2. Review and optimize data mapping annually
3. Monitor error logs weekly
4. Test the full qualification journey monthly

## Contact

For questions about this integration, contact:
- Technical Lead: [Your Technical Lead]
- CRM Admin: [Your CRM Admin]