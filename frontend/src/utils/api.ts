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

  const url = new URL(endpoint, window.location.origin)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value)
    })
  }

  const { accessToken } = useAuthStore.getState()

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((fetchOptions.headers as Record<string, string>) || {}),
  }

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`
  }

  try {
    const response = await fetch(url.toString(), {
      ...fetchOptions,
      headers,
    })

    const contentType = response.headers.get('content-type')
    const isJson = contentType?.includes('application/json')
    const data = isJson ? await response.json() : await response.text()

    if (!response.ok) {
      throw new ApiError(
        typeof data === 'string' ? data : (data as { message?: string }).message || 'An error occurred',
        response.status,
        data
      )
    }

    return data as T
  } catch (error) {
    if (error instanceof ApiError) throw error
    throw new ApiError(
      error instanceof Error ? error.message : 'Network error',
      0
    )
  }
}

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
      headers: {},
    }),
}

export { ApiError }
