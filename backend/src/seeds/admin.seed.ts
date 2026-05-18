import database from '../config/database';
import User from '../models/User';
import { env } from '../config/env';
import logger from '../utils/logger';

const seedAdmin = async () => {
  try {
    await database.connect();

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: env.ADMIN_EMAIL });

    if (existingAdmin) {
      logger.info('Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      name: 'Admin',
      email: env.ADMIN_EMAIL,
      password: env.ADMIN_PASSWORD,
      role: 'super_admin',
      isActive: true
    });

    logger.info('✅ Admin user created successfully');
    logger.info(`Email: ${admin.email}`);
    logger.info(`Password: ${env.ADMIN_PASSWORD}`);
    logger.info('⚠️  IMPORTANT: Change the password immediately after first login!');

    process.exit(0);
  } catch (error) {
    logger.error('Failed to seed admin user:', error);
    process.exit(1);
  }
};

seedAdmin();
