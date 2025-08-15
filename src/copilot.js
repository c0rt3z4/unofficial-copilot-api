/**
* THIS CODE IS FOR EDUCATIONAL PURPOSES ONLY
* USE IT WISELY, ANY MISUSE IS NOT THE RESPONSIBILITY OF THE CREATOR
**/



const WebSocket = require('ws');

/**
 * Establishes a WebSocket connection with Microsoft Copilot and handles chat interactions
 * 
 * @param {string} prompt - The question or prompt to send to Copilot
 * @returns {Promise<string>} A promise that resolves with Copilot's response
 * 
 * @throws {Error} When the WebSocket connection fails
 * @throws {Error} When the response timeout (15 seconds) is exceeded
 * @throws {Error} When there's an error parsing the response
 * 
 * @example
 * const chatCopilot = require('./copilot.js');
 * 
 * async function main() {
 *   try {
 *     // Simple question
 *     const response1 = await chatCopilot("What is JavaScript?");
 *     console.log(response1);
 *     
 *     // Complex prompt
 *     const response2 = await chatCopilot(`
 *       Create a function that:
 *       1. Takes an array of numbers
 *       2. Returns the sum of even numbers
 *     `);
 *     console.log(response2);
 *   } catch (error) {
 *     console.error("Error:", error.message);
 *   }
 * }
 * 
 * @description
 * This function creates a WebSocket connection to Microsoft Copilot's chat API.
 * 
 * Technical Implementation Details:
 * 1. Connection Setup:
 *    - Establishes WebSocket connection to Copilot's API endpoint
 *    - Sets up a 15-second timeout for the entire operation
 * 
 * 2. Conversation Handling:
 *    - Generates a unique 21-character conversation ID using specific character set
 *    - Formats the prompt into a structured payload with required metadata
 * 
 * 3. Message Processing:
 *    - Listens for incoming WebSocket messages
 *    - Aggregates partial responses into complete result
 *    - Handles 'done' event to finalize the conversation
 * 
 * 4. Error Management:
 *    - Handles connection errors
 *    - Manages timeout scenarios
 *    - Ensures proper cleanup of WebSocket resources
 * 
 * 5. Response Format:
 *    - Returns complete text response as a single string
 *    - Maintains conversation context during the session
 * 
 * Note: The connection automatically closes after receiving complete response or on error
 */
function chatCopilot(prompt) {
    const url = "wss://copilot.microsoft.com/c/api/chat?api-version=2&features=-%2Cncedge%2Cedgepagecontext&setflight=-%2Cncedge%2Cedgepagecontext&ncedge=1";
    
    return new Promise((resolve, reject) => {
        const ws = new WebSocket(url);
        let result = '';
        
        const timeout = setTimeout(() => {
            ws.close();
            reject(new Error('Timeout: Response took too long'));
        }, 15000);

        ws.on('open', () => {
            // Generate random conversation ID
            const chars = "eEQqRXUu123456CcbBZzhj";
            const conversationId = Array.from({ length: 21 })
                .map(() => chars[Math.floor(Math.random() * chars.length)])
                .join("");

            const payload = {
                event: "send",
                conversationId: conversationId,
                content: [{
                    type: "text",
                    text: prompt
                }],
                mode: "chat",
                context: {
                    edge: "NoConsent"
                }
            };

            ws.send(JSON.stringify(payload));
        });

        ws.on('message', (data) => {
            try {
                const response = JSON.parse(data.toString());
                if (response.text) {
                    result += response.text;
                }
                if (response.event === 'done') {
                    clearTimeout(timeout);
                    ws.close();
                    resolve(result);
                }
            } catch (error) {
                clearTimeout(timeout);
                ws.close();
                reject(error);
            }
        });

        ws.on('error', (error) => {
            clearTimeout(timeout);
            ws.close();
            reject(error);
        });
    });
}

module.exports = chatCopilot;