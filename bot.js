require('dotenv').config();
const { MongoClient } = require('mongodb');
const TelegramBot = require('node-telegram-bot-api');

const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const databaseName = process.env.DATABASE_NAME;
const mongoURL = `mongodb+srv://${username}:${password}@${databaseName}.nufiovh.mongodb.net/?retryWrites=true&w=majority`;


//initialize MongoDb database
async function initializeMongoDB() {
    try {
      const client = await MongoClient.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      const db = client.db();  
      const tasksCollection = db.collection('tasks');  
  
      return tasksCollection;
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }

// Initialize telegram bot with Webhook
const bot = new TelegramBot(process.env.YOUR_BOT_TOKEN);

bot.setWebHook('https://task-bot-j33l.vercel.app/webhook');

bot.on('webhook_error', (error) => {
    console.error('Webhook error:', error);
});

