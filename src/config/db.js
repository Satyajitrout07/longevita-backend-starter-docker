require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['warn', 'error'],
});

async function connectDB() {
  try {
    await prisma.$connect();
    console.log('PostgreSQL connected via Prisma');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
}

async function disconnectDB() {
  await prisma.$disconnect();
  console.log('Database disconnected');
}

process.on('SIGINT', async () => {
  await disconnectDB();
  process.exit(0);
});

module.exports = { prisma, connectDB, disconnectDB };