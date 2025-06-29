/**
 * API Configuration Utility
 * Provides consistent API URL resolution for all components
 */

// Get API base URL with environment-aware resolution
export const getApiBaseUrl = (): string => {
  // In browser environment
  if (typeof window !== 'undefined') {
    // Use environment variable first, fallback to current domain
    return process.env.NEXT_PUBLIC_API_URL || `${window.location.protocol}//${window.location.host}/api`;
  }
  
  // In server environment (SSR)
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
};

// API fetch wrapper with automatic URL handling
export const apiCall = async (endpoint: string, options: RequestInit = {}): Promise<Response> => {
  const baseUrl = getApiBaseUrl();
  const url = endpoint.startsWith('/') ? `${baseUrl}${endpoint}` : `${baseUrl}/${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };
  
  try {
    const response = await fetch(url, defaultOptions);
    return response;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

// Specific API functions for common endpoints
export const api = {
  // Admin APIs
  admin: {
    getDashboardStats: (token: string) => apiCall('/admin/dashboard/stats', {
      headers: { Authorization: `Bearer ${token}` }
    }),
    getStatus: (token: string) => apiCall('/admin/status', {
      headers: { Authorization: `Bearer ${token}` }
    }),
    getUsers: (token: string, params?: { page?: number; limit?: number; search?: string }) => {
      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.search) queryParams.append('search', params.search);

      const endpoint = `/admin/users${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      return apiCall(endpoint, {
        headers: { Authorization: `Bearer ${token}` }
      });
    },
    verify: (token: string) => apiCall('/admin/verify', {
      headers: { Authorization: `Bearer ${token}` }
    }),
    login: (email: string, password: string) => apiCall('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
  },

  // Monitoring APIs
  monitoring: {
    getMetrics: (token: string) => apiCall('/monitoring/metrics', {
      headers: { Authorization: `Bearer ${token}` }
    }),
    getHealth: (token: string) => apiCall('/monitoring/health', {
      headers: { Authorization: `Bearer ${token}` }
    })
  },

  // Analytics APIs
  analytics: {
    getOverview: (token: string) => apiCall('/analytics/overview', {
      headers: { Authorization: `Bearer ${token}` }
    }),
    getUserBehavior: (token: string) => apiCall('/analytics/user-behavior', {
      headers: { Authorization: `Bearer ${token}` }
    })
  },

  // Subscription APIs
  subscription: {
    getPlans: () => apiCall('/subscription/plans'),
    getCurrent: (token: string) => apiCall('/subscription/current', {
      headers: { Authorization: `Bearer ${token}` }
    }),
    getPayments: (token: string) => apiCall('/subscription/payments', {
      headers: { Authorization: `Bearer ${token}` }
    }),
    createPaymentIntent: (planId: string, paymentMethod: string, token: string) =>
      apiCall('/subscription/payment-intent', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ planId, paymentMethod })
      }),
    createTestPayment: (planId: string, token: string) =>
      apiCall('/subscription/test-payment', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ planId })
      }),
    cancel: (subscriptionId: string, token: string) => 
      apiCall(`/subscription/${subscriptionId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
  },

  // Health check
  health: () => apiCall('/health'),
};

export default api;
