import { removePost } from "../api/posts/index.mjs";
import { getPost } from "../api/posts/index.mjs";

export async function setDeletePostFormListener() {
  const url = new URL(location.href);
  const id = url.searchParams.get("id");

  // Display a confirmation dialog to the user
  const confirmed = window.confirm(
    "Are you sure you want to delete this post?"
  );

  if (confirmed) {
    try {
      // Remove the post with the given ID
      await removePost(id);
      // Redirect to the feed page after successful deletion
      window.location.href = "/feed";
    } catch (error) {
      // Handle any errors that occur during the deletion process
      console.error("Error deleting post:", error);
    }
  }
}

