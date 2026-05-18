import app from './app';
import { env } from './config/env';
import database from './config/database';
import redis from './config/redis';
import logger from './utils/logger';

const PORT = env.PORT || 5000;

console.log('🔄 Initializing server...');

/**
 * Start server
 */
const startServer = async () => {
  console.log('='.repeat(50));
  console.log('🚀 STARTING WHEELS ENCHANTMENT BACKEND');
  console.log('='.repeat(50));
  
  try {
    console.log('🔧 Environment:', env.NODE_ENV);
    console.log('📍 Port:', PORT);
    console.log('🌐 Frontend URL:', env.FRONTEND_URL);
    console.log('');

    console.log('📦 Step 1: Connecting to MongoDB...');
    await database.connect();
    console.log('✅ MongoDB connected!');
    console.log('');

    console.log('📦 Step 2: Connecting to Redis...');
    await redis.connect().catch((error) => {
      console.log('⚠️  Redis not available, continuing without cache');
      logger.warn('Redis connection failed, continuing without cache:', error.message);
    });
    console.log('');

    console.log('📦 Step 3: Starting Express server...');
    const server = app.listen(PORT, () => {
      console.log('='.repeat(50));
      console.log('✅ SERVER STARTED SUCCESSFULLY!');
      console.log('='.repeat(50));
      console.log('');
      console.log('🚀 Server running on port', PORT);
      console.log('🌍 Environment:', env.NODE_ENV);
      console.log('');
      console.log('📡 API Endpoints:');
      console.log('   - API Base: http://localhost:' + PORT + '/api/v1');
      console.log('   - Health Check: http://localhost:' + PORT + '/health');
      console.log('');
      console.log('🎨 Frontend:');
      console.log('   - URL: http://localhost:5173');
      console.log('   - Admin: http://localhost:5173/admin/login');
      console.log('');
      console.log('⚡ Ready to accept requests!');
      console.log('='.repeat(50));
      console.log('');
      
      logger.info(`🚀 Server running on port ${PORT} in ${env.NODE_ENV} mode`);
    });

    // Graceful shutdown
    const gracefulShutdown = async (signal: string) => {
      console.log('');
      console.log(`${signal} received. Starting graceful shutdown...`);
      logger.info(`${signal} received. Starting graceful shutdown...`);

      server.close(async () => {
        console.log('HTTP server closed');
        logger.info('HTTP server closed');

        await database.disconnect();
        await redis.disconnect();

        console.log('All connections closed. Exiting process.');
        logger.info('All connections closed. Exiting process.');
        process.exit(0);
      });

      setTimeout(() => {
        console.error('Forced shutdown after timeout');
        logger.error('Forced shutdown after timeout');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  } catch (error: any) {
    console.log('');
    console.log('='.repeat(50));
    console.error('❌ FAILED TO START SERVER');
    console.log('='.repeat(50));
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
    console.log('');
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Global error handlers
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Start the server
startServer().catch((error) => {
  console.error('❌ Fatal error during startup:', error);
  logger.error('Fatal error during startup:', error);
  process.exit(1);
});
