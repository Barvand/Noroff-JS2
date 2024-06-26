
    import { API_SOCIAL_URL } from "../constants.mjs";

    import { fetchToken } from "../fetchToken.mjs";

    const action = "/posts";
    const method = "delete";

    export async function removePost(id) {
      if (!id) {
        throw new Error("Delete requires a postID ");
      }

      const removePostURL = `${API_SOCIAL_URL}${action}/${id}`;

      const response = await fetchToken(removePostURL, {
        method,
      });

      return await response.json();
      
    }

