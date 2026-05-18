import database from '../config/database';
import Category from '../models/Category';
import Subcategory from '../models/Subcategory';
import logger from '../utils/logger';

const seedCategories = async () => {
  try {
    await database.connect();

    // Clear existing categories
    await Category.deleteMany({});
    await Subcategory.deleteMany({});

    // Create categories
    const categories = [
      {
        name: 'Skates',
        slug: 'skates',
        description: 'Premium skating equipment for all levels',
        hasSubcategories: true,
        displayOrder: 1,
        isActive: true
      },
      {
        name: 'Helmets',
        slug: 'helmets',
        description: 'Safety helmets for skating',
        hasSubcategories: false,
        displayOrder: 2,
        isActive: true
      },
      {
        name: 'Wheels',
        slug: 'wheels',
        description: 'High-quality skating wheels',
        hasSubcategories: false,
        displayOrder: 3,
        isActive: true
      },
      {
        name: 'Protection',
        slug: 'protection',
        description: 'Protective gear for safe skating',
        hasSubcategories: false,
        displayOrder: 4,
        isActive: true
      }
    ];

    const createdCategories = await Category.insertMany(categories);
    logger.info(`✅ Created ${createdCategories.length} categories`);

    // Create subcategories for Skates
    const skatesCategory = createdCategories.find(c => c.slug === 'skates');

    if (skatesCategory) {
      const subcategories = [
        {
          name: 'Adjustable Skates',
          slug: 'adjustable-skates',
          categoryId: skatesCategory._id,
          description: 'Perfect for growing kids - adjustable size skates',
          displayOrder: 1,
          isActive: true
        },
        {
          name: 'Quads Skates',
          slug: 'quads-skates',
          categoryId: skatesCategory._id,
          description: 'Classic four-wheel skates for stability',
          displayOrder: 2,
          isActive: true
        },
        {
          name: 'Inline Skates',
          slug: 'inline-skates',
          categoryId: skatesCategory._id,
          description: 'Speed and performance inline skates',
          displayOrder: 3,
          isActive: true
        }
      ];

      const createdSubcategories = await Subcategory.insertMany(subcategories);
      logger.info(`✅ Created ${createdSubcategories.length} subcategories`);
    }

    logger.info('✅ Categories seeded successfully');
    process.exit(0);
  } catch (error) {
    logger.error('Failed to seed categories:', error);
    process.exit(1);
  }
};

seedCategories();
