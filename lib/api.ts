/**
 * API client for BugLense
 */

// Set the base API URL from environment variables or use a default
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Custom error class for API errors
export class ApiError extends Error {
  status: number;
  data?: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

// Global error handler for consistent error handling across the app
export const handleGlobalError = (error: unknown) => {
  if (error instanceof ApiError) {
    // Different handling based on status code
    if (error.status === 401) {
      // Handle unauthorized - could redirect to login
      console.error('Authentication required:', error.message);
      // Clear auth token and redirect to login page if needed
      // window.location.href = '/login';
    } else if (error.status === 403) {
      console.error('Permission denied:', error.message);
    } else if (error.status >= 500) {
      console.error('Server error:', error.message);
    } else {
      console.error(`API error (${error.status}):`, error.message);
    }
  } else if (error instanceof Error) {
    console.error('Application error:', error.message);
  } else {
    console.error('Unknown error:', error);
  }
  
  // You could also send errors to a monitoring service like Sentry here
};

/**
 * Main API client for handling requests to the backend
 */
export class ApiClient {
  private token: string | null = null;

  /**
   * Set the auth token for API requests
   */
  setToken(token: string | null) {
    this.token = token;
  }

  /**
   * Get the current auth token
   */
  getToken(): string | null {
    return this.token;
  }

  /**
   * Create headers for API requests
   */
  private createHeaders(isFormData: boolean = false): HeadersInit {
    const headers: HeadersInit = {};
    
    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }
    
    headers['Accept'] = 'application/json';

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  /**
   * Handle API response and error cases
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      // Try to get error details from response
      let errorMessage: string;
      let errorData: any = null;
      
      try {
        errorData = await response.json();
        errorMessage = errorData.message || `Error: ${response.status} ${response.statusText}`;
      } catch (e) {
        errorMessage = `Error: ${response.status} ${response.statusText}`;
      }
      
      throw new ApiError(errorMessage, response.status, errorData);
    }

    // For 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    return await response.json() as T;
  }

  /**
   * Make a GET request
   */
  async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const url = new URL(`${API_URL}${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: this.createHeaders(false),
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      // Log the error but still throw it for component-level handling
      if (error instanceof ApiError) {
        handleGlobalError(error);
      }
      throw error;
    }
  }

  /**
   * Make a POST request
   */
  async post<T>(endpoint: string, data?: any): Promise<T> {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: this.createHeaders(false),
        body: data ? JSON.stringify(data) : undefined,
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof ApiError) {
        handleGlobalError(error);
      }
      throw error;
    }
  }

  /**
   * Make a PUT request
   */
  async put<T>(endpoint: string, data?: any): Promise<T> {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'PUT',
        headers: this.createHeaders(false),
        body: data ? JSON.stringify(data) : undefined,
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof ApiError) {
        handleGlobalError(error);
      }
      throw error;
    }
  }

  /**
   * Make a PATCH request
   */
  async patch<T>(endpoint: string, data?: any): Promise<T> {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'PATCH',
        headers: this.createHeaders(false),
        body: data ? JSON.stringify(data) : undefined,
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof ApiError) {
        handleGlobalError(error);
      }
      throw error;
    }
  }

  /**
   * Make a DELETE request
   */
  async delete<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'DELETE',
        headers: this.createHeaders(false),
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof ApiError) {
        handleGlobalError(error);
      }
      throw error;
    }
  }

  /**
   * Make a POST request with FormData (for file uploads)
   */
  async postFormData<T>(endpoint: string, formData: FormData): Promise<T> {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: this.createHeaders(true),
        body: formData,
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof ApiError) {
        handleGlobalError(error);
      }
      throw error;
    }
  }
}

// Create a singleton instance of the API client
export const apiClient = new ApiClient();

// Export default for easier imports
export default apiClient; 