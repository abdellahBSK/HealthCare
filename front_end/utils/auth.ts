// Function to get user ID from token
export const getUserIdFromToken = (token: string): string | null => {
  if (!token) return null;
  
  try {
    // For JWT tokens, you can decode the payload
    // This is a simple implementation - in production you might want to use a library
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    const payload = JSON.parse(jsonPayload);
    return payload.id || null;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

// Function to check if user is authenticated
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const token = localStorage.getItem('token');
  return !!token;
};

// Function to get auth token
export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  return localStorage.getItem('token');
};