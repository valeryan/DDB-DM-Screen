import GM_fetch from '@trim21/gm-fetch';
import jwtDecode from 'jwt-decode';
import { appStore } from '../store/app-store';

interface DDBToken extends Object {
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': number;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': string;
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': Array<string>;
  displayName: string;
  avatarUrl: string;
  exp: number;
}

interface AuthData extends Object {
  id: number;
  name: string;
  emailAddress: string;
  displayName: string;
  avatarUrl: string;
  role: Array<string>;
  exp: number;
}

interface ShortTermToken {
  token: string;
  data: AuthData;
  exp: number;
}

let shortTermToken: ShortTermToken | null = null;
const authURL = 'https://auth-service.dndbeyond.com/v1/cobalt-token';

/**
 * Decode a JWT Token from DDB, Validate token data, translate to AuthData
 * @param data encoded jwt token
 * @returns
 */
function decodeToken(data: string): AuthData {
  const decoded: DDBToken = jwtDecode(data);
  const expectedKeys = [
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier',
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name',
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress',
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
    'displayName',
    'avatarUrl',
    'exp',
  ];

  // Check that the decoded object has the expected keys
  expectedKeys.forEach((key) => {
    if (!Object.prototype.hasOwnProperty.call(decoded, key)) {
      throw new Error(
        `Invalid JWT: Decoded object is missing required key '${key}'`
      );
    }
  });

  return {
    id: decoded[
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
    ],
    name: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
    emailAddress:
      decoded[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
      ],
    role: decoded[
      'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
    ],
    displayName: decoded.displayName,
    avatarUrl: decoded.avatarUrl,
    exp: decoded.exp,
  } as AuthData;
}

async function getAuthToken() {
  if (!shortTermToken || Date.now() >= shortTermToken.exp) {
    // Fetch new short-term token
    try {
      const response = await GM_fetch(authURL, { method: 'post', credentials: 'include' });
      if (!response.ok) {
        throw new Error(
          `Failed to fetch short-term token: ${response.statusText}`
        );
      }
      const tokenData = await response.json();
      const authData: AuthData = decodeToken(tokenData.token);
      shortTermToken = {
        token: tokenData.token,
        data: authData,
        exp: Date.now() + authData.exp * 1000 - 60000, // Allow for clock variance
      };

      // Update Auth Store
      appStore.setAuthUser(shortTermToken.data.id, shortTermToken.data.name);
    } catch (error) {
      console.log(error);
    }
  }
}

async function makeRequest<T>(
  url: string,
  method: string = 'get',
  data: any = null,
  headers: globalThis.HeadersInit = {}
): Promise<T> {
  // Check if short-term token exists and is not expired
  await getAuthToken();

  // Set Authorization header with short-term token
  headers = {
    Authorization: `Bearer ${shortTermToken?.token}`, ...headers
  };
  // Make the request using fetch
  const options: globalThis.RequestInit = { method, headers };

  if (data) {
    options.body = JSON.stringify(data);
  }
  const response = await GM_fetch(url, options);
  if (!response.ok) {
    throw new Error(`Failed to make request: ${response.statusText}`);
  }

  const responseBody = await response.json();
  if (Object.prototype.hasOwnProperty.call(responseBody, 'data')) {
    return responseBody.data as T;
  }
  return responseBody as T;
}

export async function get<T>(url: string): Promise<T> {
  return makeRequest<T>(url);
}

export async function post<T>(url: string, data?: any): Promise<T> {
  return makeRequest<T>(url, 'post', data);
}

export async function postForm<T>(url: string, data?: any): Promise<T> {
  return makeRequest<T>(url, 'post', data, { 'Content-Type': 'application/x-www-form-urlencoded' });
}
