require('dotenv').config();
const { MongoClient } = require('mongodb');
const TelegramBot = require('node-telegram-bot-api');

const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const databaseName = process.env.DATABASE_NAME;
const mongoURL = `mongodb+srv://${username}:${password}@${databaseName}.nufiovh.mongodb.net/?retryWrites=true&w=majority`;

