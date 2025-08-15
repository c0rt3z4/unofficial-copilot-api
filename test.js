/**
* THIS CODE IS FOR EDUCATIONAL PURPOSES ONLY
* USE IT WISELY, ANY MISUSE IS NOT THE RESPONSIBILITY OF THE CREATOR
**/

const chatCopilot = require('./src/copilot.js');

async function main() {
    try {
        const response = await chatCopilot("Hello, Who is the father of Python?");
        console.log("Response:", response);
    } catch (error) {
        console.error("Error:", error.message);
    }
}

main();