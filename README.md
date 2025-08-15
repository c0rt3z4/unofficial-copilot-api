<div align='center'>



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://files.catbox.moe/6xogr9.svg">
    <img src="https://files.catbox.moe/6xogr9.svg" alt="Logo" width="80" height="80">
  </a>

  <h1 align="center">unofficial-copilot-api</h3>

  <p align="center">
    <strong>Unofficial Microsoft Copilot WebSocket Api.</strong>
  </p>
</div>

  ![GitHub Repo stars](https://img.shields.io/github/stars/c0rt3z4/unofficial-copilot-api?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/c0rt3z4/unofficial-copilot-api?style=for-the-badge)
![GitHub watchers](https://img.shields.io/github/watchers/c0rt3z4/unofficial-copilot-api?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/c0rt3z4/unofficial-copilot-api?style=for-the-badge)
![GitHub license](https://img.shields.io/github/license/c0rt3z4/unofficial-copilot-api?style=for-the-badge)

--------------

### **THIS CODE IS FOR EDUCATIONAL PURPOSES ONLY, USE IT WISELY, ANY MISUSE IS NOT THE RESPONSIBILITY OF THE CREATOR.**  
</div>

### Installation
```bash
npm install ws
```

### Usage
```bash
node test.js
```

### Test JS Example:
```javascript
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
```

### Example Response:
```
Response: The father of Python is **Guido van Rossum**. He created this versatile programming language in the late 1980s, with its first release in 1991. Python was designed to be simple, readable, and accessible, 
which is why it has become one of the most popular programming languages in the world.

Are you exploring Python for a project or just curious?
```


---
## License

This project is licensed under the MIT License
