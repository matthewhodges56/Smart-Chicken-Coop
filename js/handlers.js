/**
 * Handles all session-related API operations with the sessions.php endpoint.
 * 
 * @param {string} method - HTTP method ('GET', 'POST', 'PUT', 'DELETE')
 * @param {Object} data - Data to send with the request (varies by method)
 * @returns {Promise<Object>} - JSON response from the API
 * 
 * Usage examples:
 * - Create a session: sessionApiHandler('POST', {Email, Password})
 * - Update session: sessionApiHandler('PUT', {SessionID})
 * - Delete session: sessionApiHandler('DELETE', {SessionID})
 * - Validate session: sessionApiHandler('GET', {SessionID})
 */
async function sessionApiHandler(method, data = {}) {
    try {
        // Base URL for the endpoint
        let url = 'https://simplecoop.swollenhippo.com/sessions.php';

        // For GET, add SessionID as a query parameter
        if (method === 'GET' && data.SessionID) {
            url = `${url}?SessionID=${encodeURIComponent(data.SessionID)}`;
        }

        // Prepare request options
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        // For POST, PUT, and DELETE, format the data as URL parameters
        if ((method === 'POST' || method === 'PUT' || method === 'DELETE') && Object.keys(data).length > 0) {
            const formData = new URLSearchParams();
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value);
            });
            options.body = formData.toString();
        }

        // Make the API call
        const response = await fetch(url, options);

        // Log the raw response for debugging
        const responseText = await response.text();
        console.log(`${method} Session API Raw Response:`, responseText);

        // Parse and return the JSON response
        const jsonResponse = JSON.parse(responseText);
        return jsonResponse;

    } catch (error) {
        console.error(`Error in ${method} session operation:`, error);
        return { 
            Error: error.message,
            Outcome: `Error: ${error.message}`
        };
    }
}

/**
 * Handles all user address-related API operations with the useraddress.php endpoint.
 * 
 * @param {string} method - HTTP method ('GET', 'POST', 'PUT', 'DELETE')
 * @param {Object} data - Data to send with the request (varies by method)
 * @returns {Promise<Object>} - JSON response from the API
 * 
 * Usage examples:
 * - Create new address: userAddressApiHandler('POST', {Email, Street1, Street2, City, State, ZIP})
 * - Update address: userAddressApiHandler('PUT', {Email, Street1, Street2, City, State, ZIP})
 * - Delete address: userAddressApiHandler('DELETE', {Email})
 * - Get address details: userAddressApiHandler('GET', {Email})
 */
async function userAddressApiHandler(method, data = {}) {
    try {
        // Base URL for the endpoint
        let url = 'https://simplecoop.swollenhippo.com/useraddress.php';

        // For GET, add Email as a query parameter
        if (method === 'GET' && data.Email) {
            url = `${url}?Email=${encodeURIComponent(data.Email)}`;
        }

        // Prepare request options
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        // For POST, PUT, and DELETE, format the data as URL parameters
        if ((method === 'POST' || method === 'PUT' || method === 'DELETE') && Object.keys(data).length > 0) {
            const formData = new URLSearchParams();
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value);
            });
            options.body = formData.toString();
        }

        // Make the API call
        const response = await fetch(url, options);

        // Log the raw response for debugging
        const responseText = await response.text();
        console.log(`${method} User Address API Raw Response:`, responseText);

        // Parse and return the JSON response
        const jsonResponse = JSON.parse(responseText);
        return jsonResponse;

    } catch (error) {
        console.error(`Error in ${method} user address operation:`, error);
        return { 
            Error: error.message,
            Outcome: `Error: ${error.message}`
        };
    }
}

/**
 * Handles all coop-related API operations with the coop.php endpoint.
 * 
 * @param {string} method - HTTP method ('GET', 'POST', 'PUT', 'DELETE')
 * @param {Object} data - Data to send with the request (varies by method)
 * @returns {Promise<Object>} - JSON response from the API
 * 
 * Usage examples:
 * - Get a new CoopID: coopApiHandler('POST') - No parameters needed
 * - Update coop info: coopApiHandler('PUT', {SessionID, Street1, Street2, City, State, ZIP})
 * - Delete coop: coopApiHandler('DELETE', {SessionID})
 * - Get coop details: coopApiHandler('GET', {SessionID})
 */
async function coopApiHandler(method, data = {}) {
    try {
        // Base URL for the endpoint
        const url = 'https://simplecoop.swollenhippo.com/coop.php';
        
        // Prepare request options
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        
        // For all methods except POST, format the data as URL parameters
        // (POST doesn't need parameters according to the API spec)
        if ((method === 'PUT' || method === 'DELETE' || method === 'GET') && Object.keys(data).length > 0) {
            const formData = new URLSearchParams();
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value);
            });
            options.body = formData.toString();
        }
        
        // Make the API call
        const response = await fetch(url, options);
        
        // Log the raw response for debugging
        const responseText = await response.text();
        console.log(`${method} Coop API Raw Response:`, responseText);
        
        // Parse and return the JSON response
        const jsonResponse = JSON.parse(responseText);
        return jsonResponse;
        
    } catch (error) {
        console.error(`Error in ${method} coop operation:`, error);
        return { 
            Error: error.message,
            Outcome: `Error: ${error.message}`
        };
    }
}

/**
 * Handles all user-related API operations with the users.php endpoint.
 * 
 * @param {string} method - HTTP method ('GET', 'POST', 'PUT', 'DELETE')
 * @param {Object} data - Data to send with the request
 * @returns {Promise<Object>} - JSON response from the API
 * 
 * Usage examples:
 * - Create new user: userApiHandler('POST', {Email, Password, FirstName, LastName, CoopID})
 * - Update user: userApiHandler('PUT', {Email, Password, FirstName, LastName})
 * - Delete user: userApiHandler('DELETE', {Email})
 * - Get user details: userApiHandler('GET', {Email})
 */
async function userApiHandler(method, data = {}) {
    try {
        // Base URL for the endpoint
        let url = 'https://simplecoop.swollenhippo.com/users.php';
        
        // For GET, add Email as a query parameter
        if (method === 'GET' && data.Email) {
            url = `${url}?Email=${encodeURIComponent(data.Email)}`;
        }
        
        // Prepare request options
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        
        // For POST, PUT and DELETE, format the data as URL parameters
        if ((method === 'POST' || method === 'PUT' || method === 'DELETE') && Object.keys(data).length > 0) {
            const formData = new URLSearchParams();
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value);
            });
            options.body = formData.toString();
        }
        
        // Make the API call
        const response = await fetch(url, options);
        
        // Log the raw response for debugging
        const responseText = await response.text();
        console.log(`${method} User API Raw Response:`, responseText);
        
        // Parse and return the JSON response
        const jsonResponse = JSON.parse(responseText);
        return jsonResponse;
        
    } catch (error) {
        console.error(`Error in ${method} user operation:`, error);
        return { 
            Error: error.message,
            Outcome: `Error: ${error.message}`
        };
    }
}

/**
 * Handles all settings-related API operations with the settings.php endpoint.
 * 
 * @param {string} method - HTTP method ('GET', 'POST', 'PUT', 'DELETE')
 * @param {Object} data - Data to send with the request (varies by method)
 * @returns {Promise<Object>} - JSON response from the API
 * 
 * Usage examples:
 * - Create a setting: settingsApiHandler('POST', {SessionID, setting, value})
 * - Update a setting: settingsApiHandler('PUT', {SessionID, setting, value})
 * - Delete a setting: settingsApiHandler('DELETE', {SessionID, setting})
 * - Get a setting: settingsApiHandler('GET', {SessionID, setting})
 */
async function settingsApiHandler(method, data = {}) {
    try {
        // Base URL for the endpoint
        let url = 'https://simplecoop.swollenhippo.com/settings.php';

        // For GET, add SessionID and setting as query parameters
        if (method === 'GET' && data.SessionID && data.setting) {
            url = `${url}?SessionID=${encodeURIComponent(data.SessionID)}&setting=${encodeURIComponent(data.setting)}`;
        }

        // Prepare request options
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        // For POST, PUT, and DELETE, format the data as URL parameters
        if ((method === 'POST' || method === 'PUT' || method === 'DELETE') && Object.keys(data).length > 0) {
            const formData = new URLSearchParams();
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value);
            });
            options.body = formData.toString();
        }

        // Make the API call
        const response = await fetch(url, options);

        // Log the raw response for debugging
        const responseText = await response.text();
        console.log(`${method} Settings API Raw Response:`, responseText);

        // Parse and return the JSON response
        const jsonResponse = JSON.parse(responseText);
        return jsonResponse;

    } catch (error) {
        console.error(`Error in ${method} settings operation:`, error);
        return { 
            Error: error.message,
            Outcome: `Error: ${error.message}`
        };
    }
}

/**
 * Handles all egg-related API operations with the eggs.php endpoint.
 * 
 * @param {string} method - HTTP method ('GET', 'POST', 'PUT', 'DELETE')
 * @param {Object} data - Data to send with the request (varies by method)
 * @returns {Promise<Object>} - JSON response from the API
 * 
 * Usage examples:
 * - Add harvested eggs: eggApiHandler('POST', {SessionID, observationDateTime, eggs})
 * - Update egg log: eggApiHandler('PUT', {SessionID, logID})
 * - Delete all egg logs: eggApiHandler('DELETE', {SessionID})
 * - Get egg logs: eggApiHandler('GET', {SessionID, days})
 */
async function eggApiHandler(method, data = {}) {
    try {
        // Base URL for the endpoint
        let url = 'https://simplecoop.swollenhippo.com/eggs.php';

        // For GET, add query parameters
        if (method === 'GET' && data.SessionID && data.days) {
            url = `${url}?SessionID=${encodeURIComponent(data.SessionID)}&days=${encodeURIComponent(data.days)}`;
        }

        // Prepare request options
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        // For POST, PUT, and DELETE, format the data as URL parameters
        if ((method === 'POST' || method === 'PUT' || method === 'DELETE') && Object.keys(data).length > 0) {
            const formData = new URLSearchParams();
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value);
            });
            options.body = formData.toString();
        }

        // Make the API call
        const response = await fetch(url, options);

        // Log the raw response for debugging
        const responseText = await response.text();
        console.log(`${method} Egg API Raw Response:`, responseText);

        // Parse and return the JSON response
        const jsonResponse = JSON.parse(responseText);
        return jsonResponse;

    } catch (error) {
        console.error(`Error in ${method} egg operation:`, error);
        return { 
            Error: error.message,
            Outcome: `Error: ${error.message}`
        };
    }
}