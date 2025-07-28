import axios from 'axios';

// Base API configuration
const API_BASE_URL = 'https://clandr-api.vercel.app';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Types for API responses
export interface PublicEvent {
  id: string;
  name: string;
  description: string | null;
  durationInMinutes: number;
  clerkUserId: string;
  isActive: true;
}

export interface BookingAvailability {
  event: {
    id: string;
    name: string;
    description: string | null;
    durationInMinutes: number;
  };
  user: {
    id: string;
    fullName: string | null;
  };
  validTimes: string[]; // ISO date strings
}

// API functions for public booking
export const publicBookingApi = {
  /**
   * Get user's public events
   * GET /api/book/[userId]
   */
  getUserPublicEvents: async (userId: string): Promise<PublicEvent[]> => {
    try {
      const response = await apiClient.get(`/api/book/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch public events: ${error}`);
    }
  },

  /**
   * Get booking availability for a specific event
   * GET /api/book/[userId]/[eventId]
   */
  getBookingAvailability: async (
    userId: string,
    eventId: string
  ): Promise<BookingAvailability> => {
    try {
      const response = await apiClient.get(`/api/book/${userId}/${eventId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch booking availability: ${error}`);
    }
  },
};

// Export the configured axios instance for additional use if needed
export { apiClient };