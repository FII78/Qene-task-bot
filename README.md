# Task Bot

Task Bot is a Telegram bot built with Node.js and MongoDB for task management. This bot allows you to create, list, and mark tasks as done.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [License](#license)

## Getting Started

### Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A [Telegram bot token](https://core.telegram.org/bots#botfather)

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/task-bot.git
2. Navigate to the project directory:
   ```bash
  cd task-bot
3. Install the required dependencies:
   ```bash
  npm install
4. Create a .env file in the project root and add your environment variables:
   ```bash
  YOUR_BOT_TOKEN='Your Telegram Bot Token'
  USERNAME='Your MongoDB Username'
  PASSWORD='Your MongoDB Password'
  DATABASE_NAME='Your MongoDB Database Name'
  COLLECTION_NAME='tasks' # Optional: Change this to your desired collection name
  Usage

5. To start the bot, run the following command:
   ```bash
  node bot.js

The bot will listen for incoming updates via the Telegram webhook and handle the following commands:

/start: Start the bot and get a welcome message.
/create <task description>: Create a new task.
/list: List all tasks.
/done <task number>: Mark a task as done by specifying its number.

**Deployment**

You can deploy this bot to a server or cloud platform of your choice. Make sure to configure the webhook URL for your Telegram bot in the vercel.js file. Handle incoming webhook notifications in your server code as needed.



