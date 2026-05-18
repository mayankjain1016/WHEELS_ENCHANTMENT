import mongoose from 'mongoose';
import { env } from './env';
import logger from '../utils/logger';

class Database {
  private static instance: Database;

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect(): Promise<void> {
    try {
      const uri = env.MONGODB_URI;
      
      console.log('🔄 Connecting to MongoDB...');
      console.log('📍 URI:', uri.replace(/\/\/.*@/, '//***@')); // Hide credentials

      mongoose.set('strictQuery', true);

      const options: mongoose.ConnectOptions = {
        maxPoolSize: 10,
        minPoolSize: 5,
        socketTimeoutMS: 45000,
        serverSelectionTimeoutMS: 10000, // Increased timeout
        family: 4
      };

      await mongoose.connect(uri, options);

      console.log('✅ MongoDB connected successfully');
      logger.info('✅ MongoDB connected successfully');

      // Connection event handlers
      mongoose.connection.on('error', (error) => {
        logger.error('MongoDB connection error:', error);
      });

      mongoose.connection.on('disconnected', () => {
        logger.warn('MongoDB disconnected. Attempting to reconnect...');
      });

      mongoose.connection.on('reconnected', () => {
        logger.info('MongoDB reconnected successfully');
      });

      // Graceful shutdown
      process.on('SIGINT', async () => {
        await this.disconnect();
        process.exit(0);
      });

    } catch (error) {
      console.error('❌ MongoDB connection failed:', error);
      logger.error('❌ MongoDB connection failed:', error);
      console.log('\n⚠️  Make sure MongoDB is running:');
      console.log('   - Windows: Start MongoDB service');
      console.log('   - Mac/Linux: mongod');
      console.log('   - Or use MongoDB Atlas cloud database\n');
      process.exit(1);
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await mongoose.connection.close();
      logger.info('MongoDB connection closed');
    } catch (error) {
      logger.error('Error closing MongoDB connection:', error);
    }
  }

  public getConnection(): mongoose.Connection {
    return mongoose.connection;
  }
}

export default Database.getInstance();
