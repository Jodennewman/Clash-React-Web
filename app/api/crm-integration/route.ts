import { NextResponse } from 'next/server';
import axios from 'axios';

// Helper function to send data to Kajabi
const sendToKajabi = async (kajabiData: any) => {
  try {
    const response = await axios({
      method: 'post',
      url: 'https://api.kajabi.com/api/v1/people',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-API-KEY': process.env.KAJABI_API_KEY
      },
      data: kajabiData
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
          Score: ${kajabiData.person.custom_field_values.qualification_score}\n
          Team Size: ${kajabiData.person.custom_field_values.team_size}\n
          Implementation Support: ${kajabiData.person.custom_field_values.implementation_support}\n
          Timeline: ${kajabiData.person.custom_field_values.timeline}\n
          Content Volume: ${kajabiData.person.custom_field_values.content_volume}`
        }
      }
    });
    
    return {
      success: true,
      contactId: response.data.id
    };
  } catch (error: any) {
    console.error('Error creating Kajabi contact:', error);
    return {
      success: false,
      error: error.message || 'Failed to create Kajabi contact'
    };
  }
};

// Helper function to send data to Kit (formerly ConvertKit)
const sendToKit = async (kitData: any) => {
  try {
    // Create or update subscriber in Kit
    const response = await axios({
      method: 'post',
      url: 'https://api.convertkit.com/v3/subscribers',
      params: {
        api_key: process.env.KIT_API_KEY
      },
      data: {
        email: kitData.email,
        first_name: kitData.first_name,
        fields: kitData.fields
      }
    });
    
    // Add each tag to the subscriber
    for (const tag of kitData.tags) {
      // First create tag if it doesn't exist
      const tagResponse = await axios({
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
      });
      
      // Then add subscriber to tag
      await axios({
        method: 'post',
        url: `https://api.convertkit.com/v3/tags/${tagResponse.data.tag.id}/subscribe`,
        params: {
          api_key: process.env.KIT_API_KEY
        },
        data: {
          email: kitData.email
        }
      });
    }
    
    return {
      success: true,
      subscriberId: response.data.subscriber.id
    };
  } catch (error: any) {
    console.error('Error creating Kit subscriber:', error);
    return {
      success: false,
      error: error.message || 'Failed to create Kit subscriber'
    };
  }
};

// API handler function
export async function POST(request: Request) {
  try {
    // Parse the request body
    const { leadData, kajabiData, kitData } = await request.json();
    
    // Validate required data
    if (!leadData || !kajabiData || !kitData) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required data' 
        },
        { status: 400 }
      );
    }
    
    // Initialize results
    let kajabiResult = null;
    let kitResult = null;
    
    // Send data to Kajabi
    kajabiResult = await sendToKajabi(kajabiData);
    
    // Send data to Kit
    kitResult = await sendToKit(kitData);
    
    // Determine overall success
    const success = kajabiResult.success && kitResult.success;
    
    // Return response
    return NextResponse.json(
      {
        success,
        kajabi: kajabiResult,
        kit: kitResult
      },
      { status: success ? 200 : 500 }
    );
  } catch (error: any) {
    console.error('Error processing CRM integration:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Internal server error' 
      },
      { status: 500 }
    );
  }
}