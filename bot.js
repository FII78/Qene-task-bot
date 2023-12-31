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

bot.setWebHook('https://qene-task-bot.vercel.app/webhook');

bot.on('webhook_error', (error) => {
    console.error('Webhook error:', error);
});

module.exports = async (req, res) => {
    
    res.setHeader('Content-Type', 'application/json');

    try {
      const data = req.body;
      const updateType = data.message.text; 
      const chatId = data.message.chat.id;
      const text = data.message.text;
      const command = updateType.split(' ')[0];
      
      const tasksCollection = await initializeMongoDB();
    
    // Switch command to handle the commands
    switch (command) 
        {
        // /start command
        case  '/start':
            bot.sendMessage(chatId, 'Welcome to your task management bot! What would you like to do?');
            break;
        
        // Creating a new task using a description of a single task
        case '/create':
            const taskText = text.replace('/create', '').trim();
            try {
                const result = await tasksCollection.insertOne({ text: taskText, done: false });
                if (result.insertedCount === 1) {
                bot.sendMessage(chatId, 'Task created successfully.');
                } 
                else {
                bot.sendMessage(chatId, 'Failed to create task. Please try again.');
                }
            } catch (error) {
                console.error('Error creating task:', error);
                bot.sendMessage(chatId, 'Failed to create task. Please try again later.');
            }
            break;
        
        // List all the tasks created so far
        case '/list':
            try {
                const tasks = await tasksCollection.find({}).toArray();
                if (tasks.length === 0) {
                bot.sendMessage(chatId, 'You have no tasks.');
                } 
                else {
                const taskList = tasks.map((task, index) => {
                    return `${index + 1}. [${task.done ? 'Done' : 'Not Done'}] ${task.text}`;
                }).join('\n');
                bot.sendMessage(chatId, `Task List:\n${taskList}`);
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
                bot.sendMessage(chatId, 'Failed to fetch your tasks. Please try again later.');
            }
            break;
        
        // Mark a single task as done using it's task number    
        case '/done':
            const taskIndex = parseInt(text.replace('/done', '').trim()) - 1;
            if (!isNaN(taskIndex)) {
                try {
                const tasks = await tasksCollection.find({}).toArray();
                if (taskIndex >= 0 && taskIndex < tasks.length) {
                    const taskId = tasks[taskIndex]._id;
                    const result = await tasksCollection.updateOne({ _id: taskId }, { $set: { done: true } });
                    if (result.modifiedCount === 1) {
                    bot.sendMessage(chatId, 'Task marked as done.');
                    } else {
                    bot.sendMessage(chatId, 'Failed to mark task as done.');
                    }
                } else {
                    bot.sendMessage(chatId, 'Invalid task index. Use /done <task number>.');
                }
                } catch (error) {
                console.error('Error marking task as done:', error);
                bot.sendMessage(chatId, 'Failed to mark task as done. Please try again later.');
                }
            } else {
                bot.sendMessage(chatId, 'Invalid task index. Use /done <task number>.');
            }
            break;
        default:
            bot.sendMessage(data.message.chat.id, 'I do not understand that command. Please use /start, /create, /list, or /done.');
        }
    
        res.status(200).send(JSON.stringify({ success: true }));
    } 
    
    catch (error) 
    {
      console.error('Error handling request:', error);
      res.status(500).send(JSON.stringify({ success: false, error: 'Internal Server Error' }));
    }
  };

