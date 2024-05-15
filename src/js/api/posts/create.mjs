import { API_SOCIAL_URL } from "../constants.mjs";

import { fetchToken } from "../fetchToken.mjs";


const action = "/posts";
const method = "post";


/**
 * Sends postData to an API endpoint and returns the JSON response
 * @param {array} postData - The data to be posted to the API
 * @returns {Promise<Object>} - The JSON response from the API
 */
export async function createPost(postData) {
    const createPostURL = API_SOCIAL_URL + action

    const response = await fetchToken(createPostURL, { 
        method,
        body: JSON.stringify(postData)

    })

    return await response.json()
}

