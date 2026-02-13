/**
 * Get the WebSocket and API URLs from the backend config endpoint
 * This allows the frontend to work in both development and production without rebuilding
 */
export async function getServerConfig(): Promise<{
  wsUrl: string;
  apiUrl: string;
}> {
  try {
    // Detect the backend URL from the current window location
    const protocol = window.location.protocol === 'https:' ? 'https:' : 'http:';
    const backendHost = '127.0.0.1:8000'; // Use IPv4 to avoid localhost IPv6 issues
    const backendUrl = `${protocol}//${backendHost}`;
    
    // Try to get config from the backend
    const response = await fetch(`${backendUrl}/config`, { 
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.ok) {
      const config = await response.json();
      console.log('Config fetched from backend:', config);
      return config;
    }
  } catch (error) {
    console.warn('Failed to fetch config from backend:', error);
  }

  // Fallback to defaults with IPv4
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  return {
    wsUrl: `${protocol}//127.0.0.1:8000/ws`,
    apiUrl: 'http://127.0.0.1:8000',
  };
}
