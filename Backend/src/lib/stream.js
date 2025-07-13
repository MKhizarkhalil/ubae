// Import the StreamChat client from the 'stream-chat' package
import { StreamChat } from "stream-chat";

// Import environment variables from a .env file (e.g., API keys)
import "dotenv/config";

// Load API key and secret from environment variables
const apiKey = process.env.STEAM_API_KEY;
const apiSecret = process.env.STEAM_API_SECRET;

// Check if API credentials are missing and log an error
if (!apiKey || !apiSecret) {
  console.error("Stream API key or Secret is missing");
}

// Initialize the StreamChat client using the API key and secret
const streamClient = StreamChat.getInstance(apiKey, apiSecret);

/**
 * Creates or updates a user in Stream Chat.
 * Stream uses "upsert" to either insert a new user or update an existing one.
 *
 * @param {Object} userData - An object containing Stream user information
 *                            (e.g., { id, name, image, ... }).
 * @returns {Object} userData if the upsert is successful.
 */
export const upsertStreamUser = async (userData) => {
  try {
    // Add or update the user in Stream
    await streamClient.upsertUsers([userData]);
    return userData;
  } catch (error) {
    // Log any errors during the upsert process
    console.error("Error upserting Stream user:", error);
  }
};

/**
 * Generates an authentication token for a Stream Chat user.
 * This token is used by the frontend to authenticate the user with Stream.
 *
 * @param {string|number} userId - The user ID to generate a token for.
 * @returns {string} A JWT token string that can be used for frontend auth.
 */
export const generateStreamToken = (userId) => {
  try {
    // Convert userId to string (required by Stream)
    const userIdStr = userId.toString();

    // Generate and return a Stream token for the user
    return streamClient.createToken(userIdStr);
  } catch (error) {
    // Log any errors during token generation
    console.error("Error generating Stream token:", error);
  }
};
