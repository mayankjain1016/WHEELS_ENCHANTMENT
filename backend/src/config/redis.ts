import { createClient, RedisClientType } from 'redis';
import { env } from './env';
import logger from '../utils/logger';

class RedisClient {
  private static instance: RedisClient;
  private client: RedisClientType | null = null;

  private constructor() {}

  public static getInstance(): RedisClient {
    if (!RedisClient.instance) {
      RedisClient.instance = new RedisClient();
    }
    return RedisClient.instance;
  }

  public async connect(): Promise<void> {
    if (!env.REDIS_HOST) {
      logger.warn('Redis configuration not found. Redis service disabled.');
      return;
    }

    try {
      this.client = createClient({
        socket: {
          host: env.REDIS_HOST,
          port: env.REDIS_PORT,
          reconnectStrategy: (retries) => {
            if (retries > 3) {
              logger.error('Redis max reconnection attempts reached. Disabling Redis.');
              return false;
            }
            return Math.min(retries * 100, 3000);
          }
        },
        password: env.REDIS_PASSWORD || undefined
      });

      this.client.on('error', (error) => {
        logger.error('Redis Client Error:', error);
      });

      this.client.on('connect', () => {
        logger.info('✅ Redis connected successfully');
      });

      this.client.on('reconnecting', () => {
        logger.warn('Redis reconnecting...');
      });

      this.client.on('ready', () => {
        logger.info('Redis client ready');
      });

      await this.client.connect();

    } catch (error) {
      logger.error('❌ Redis connection failed:', error);
      // Don't exit process - Redis is optional for basic functionality
    }
  }

  public async disconnect(): Promise<void> {
    try {
      if (this.client) {
        await this.client.quit();
        logger.info('Redis connection closed');
      }
    } catch (error) {
      logger.error('Error closing Redis connection:', error);
    }
  }

  public getClient(): RedisClientType | null {
    return this.client;
  }

  // Cache helper methods
  public async get(key: string): Promise<string | null> {
    if (!this.client) return null;
    try {
      return await this.client.get(key);
    } catch (error) {
      logger.error(`Redis GET error for key ${key}:`, error);
      return null;
    }
  }

  public async set(key: string, value: string, expirySeconds?: number): Promise<void> {
    if (!this.client) return;
    try {
      if (expirySeconds) {
        await this.client.setEx(key, expirySeconds, value);
      } else {
        await this.client.set(key, value);
      }
    } catch (error) {
      logger.error(`Redis SET error for key ${key}:`, error);
    }
  }

  public async del(key: string): Promise<void> {
    if (!this.client) return;
    try {
      await this.client.del(key);
    } catch (error) {
      logger.error(`Redis DEL error for key ${key}:`, error);
    }
  }

  public async flushPattern(pattern: string): Promise<void> {
    if (!this.client) return;
    try {
      const keys = await this.client.keys(pattern);
      if (keys.length > 0) {
        await this.client.del(keys);
      }
    } catch (error) {
      logger.error(`Redis FLUSH error for pattern ${pattern}:`, error);
    }
  }
}

export default RedisClient.getInstance();
