# CliniSalud WhatsApp Chatbot

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

A WhatsApp chatbot designed to enhance patient engagement and communication for CliniSalud, a healthcare provider. This chatbot leverages the power of Builderbot and OpenAI agents to provide intelligent responses and automate interactions.

## Features

- **WhatsApp Integration:** Seamlessly interacts with patients through WhatsApp, a widely used messaging platform.
- **OpenAI Intelligence:** Powered by OpenAI agents, offering natural language processing and understanding capabilities.
- **Customizable Responses:** Easily tailor responses to match CliniSalud's brand voice and specific use cases.
- **Scalable and Efficient:** Built with a modular architecture using Builderbot, ensuring smooth scaling and efficient resource utilization.

## Getting Started

### Prerequisites

- **Node.js:** Ensure you have Node.js and npm (or pnpm) installed.
- **WhatsApp Business API Account:** Obtain access to the WhatsApp Business API for sending and receiving messages.
- **OpenAI API Key:** Get an API key from OpenAI to utilize their language models.

### Installation

1. Clone this repository: `git clone https://github.com/DevSol-Org/Clinisalud-bot.git`
2. Install dependencies: `npm install` (or `pnpm install`)
3. Create a `.env` file in the root directory and add your API keys and configuration: 
```bash
    OPENAI_API_KEY=your_openai_api_key 
    PORT=4016
```
4. Build the project: `npm run build` (or `pnpm build`)
5. Start the chatbot: `npm run start` (or `pnpm start`)

## Development

Use the following commands for development:

- `npm run dev` (or `pnpm dev`): Runs the chatbot in watch mode with live reloading.
- `npm run lint` (or `pnpm lint`): Lints and formats the code.
- `npm run lint:check` (or `pnpm lint:check`): Lints the code without fixing errors.

## Project Structure

- `src/`: Contains the source code for the chatbot.
- `dist/`: Contains the compiled code for production.
- `.env`:  Stores environment variables (API keys, configuration).
- `package.json`: Defines project dependencies and scripts.

## License

This project is licensed under the ISC License. See the `LICENSE` file for details.