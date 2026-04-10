import { useAuthStore } from '@/stores'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

interface ApiOptions extends RequestInit {
  params?: Record<string, string>
}

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

async function apiClient<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const { params, ...fetchOptions } = options
  
  // Build URL with query params
  const url = new URL(endpoint, window.location.origin)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value)
    })
  }
  
  // Get auth token if available
  const { user } = useAuthStore.getState()
  
  // Default headers
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((fetchOptions.headers as Record<string, string>) || {}),
  }
  
  if (user?.id) {
    headers['Authorization'] = `Bearer ${user.id}`
  }
  
  try {
    const response = await fetch(url.toString(), {
      ...fetchOptions,
      headers,
    })
    
    // Handle non-JSON responses
    const contentType = response.headers.get('content-type')
    const isJson = contentType?.includes('application/json')
    
    const data = isJson ? await response.json() : await response.text()
    
    if (!response.ok) {
      throw new ApiError(
        typeof data === 'string' ? data : data.message || 'An error occurred',
        response.status,
        data
      )
    }
    
    return data as T
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    
    // Network or other errors
    throw new ApiError(
      error instanceof Error ? error.message : 'Network error',
      0
    )
  }
}

// API methods
export const api = {
  get: <T>(endpoint: string, options?: ApiOptions) =>
    apiClient<T>(`${API_BASE_URL}${endpoint}`, { ...options, method: 'GET' }),
    
  post: <T>(endpoint: string, body: unknown, options?: ApiOptions) =>
    apiClient<T>(`${API_BASE_URL}${endpoint}`, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    }),
    
  put: <T>(endpoint: string, body: unknown, options?: ApiOptions) =>
    apiClient<T>(`${API_BASE_URL}${endpoint}`, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    }),
    
  patch: <T>(endpoint: string, body: unknown, options?: ApiOptions) =>
    apiClient<T>(`${API_BASE_URL}${endpoint}`, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    }),
    
  delete: <T>(endpoint: string, options?: ApiOptions) =>
    apiClient<T>(`${API_BASE_URL}${endpoint}`, { ...options, method: 'DELETE' }),
    
  upload: <T>(endpoint: string, formData: FormData, options?: ApiOptions) =>
    apiClient<T>(`${API_BASE_URL}${endpoint}`, {
      ...options,
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type with boundary
    }),
}

export { ApiError }
