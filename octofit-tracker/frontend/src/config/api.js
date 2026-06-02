/**
 * API Configuration for OctoFit Tracker
 * 
 * IMPORTANT: Define VITE_CODESPACE_NAME in .env.local for Codespaces deployment
 * Example: VITE_CODESPACE_NAME=your-codespace-name
 * 
 * The API base URL is constructed as:
 * - Codespaces: https://${VITE_CODESPACE_NAME}-8000.app.github.dev
 * - Local development: http://localhost:8000
 */

const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME;

const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

// Example Codespaces API endpoints (replace {codespace-name} with actual Codespace name)
const EXAMPLE_CODESPACE_URLS = {
  users: 'https://{codespace-name}-8000.app.github.dev/api/users',
  teams: 'https://{codespace-name}-8000.app.github.dev/api/teams',
  activities: 'https://{codespace-name}-8000.app.github.dev/api/activities',
  leaderboard: 'https://{codespace-name}-8000.app.github.dev/api/leaderboard',
  workouts: 'https://{codespace-name}-8000.app.github.dev/api/workouts',
};

export const API_ENDPOINTS = {
  users: `${API_BASE_URL}/api/users`,
  teams: `${API_BASE_URL}/api/teams`,
  activities: `${API_BASE_URL}/api/activities`,
  leaderboard: `${API_BASE_URL}/api/leaderboard`,
  workouts: `${API_BASE_URL}/api/workouts`,
};

/**
 * Fetch data from API endpoint with error handling
 * Handles both paginated and array responses
 */
export async function fetchData(endpoint) {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    
    // Handle both array and paginated responses
    return Array.isArray(data) ? data : data.results || data.data || [];
  } catch (error) {
    console.error(`Failed to fetch from ${endpoint}:`, error);
    return [];
  }

/**
 * Fetch data from API endpoint with error handling
 * Handles both paginated and array responses
 */
export async function fetchData(endpoint) {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    
    // Handle both array and paginated responses
    return Array.isArray(data) ? data : data.results || data.data || [];
  } catch (error) {
    console.error(`Failed to fetch from ${endpoint}:`, error);
    return [];
  }
}
