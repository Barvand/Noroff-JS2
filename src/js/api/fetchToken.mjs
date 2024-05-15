import { load } from "../storage/index.mjs";


/**
 * Generates headers for a fetch request, including a bearer token for authorization.
 *
 * @returns {Object} - An object containing the headers for the fetch request.
 * @property {string} content-type - Specifies that the content type is JSON.
 * @property {string} Authorization - The bearer token for authorization.
 *
 * @example
 * const requestHeaders = headers();
 * fetch('https://api.example.com/data', {
 *   method: 'GET',
 *   headers: requestHeaders,
 * })
 *   .then(response => response.json())
 *   .then(data => console.log(data))
 *   .catch(error => console.error('Error:', error));
 */
export function headers() {
  const token = load("token");

  return {
    "content-type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export function headers() {
  const token = load("token");

  return {
    "content-type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

/**
 * Fetches a token from the specified URL with the given options and headers.
 *
 * @param {string} url - The URL to send the fetch request to.
 * @param {Object} options - Additional options for the fetch request (e.g., method, body).
 * @returns {Promise<Response>} - A promise that resolves to the fetch response.
 *
 * @example
 * const url = 'https://api.example.com/token';
 * const options = {
 *   method: 'POST',
 *   body: JSON.stringify({ username: 'user', password: 'pass' })
 * };
 * fetchToken(url, options)
 *   .then(response => response.json())
 *   .then(data => console.log(data))
 *   .catch(error => console.error('Error:', error));
 */
export async function fetchToken(url, options) {
  return fetch(url, {
    ...options,
    headers: headers(),
  });
}
