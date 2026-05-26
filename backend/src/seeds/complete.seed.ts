import database from '../config/database';
import Category from '../models/Category';
import Subcategory from '../models/Subcategory';
import Coach from '../models/Coach';
import Product from '../models/Product';
import Gallery from '../models/Gallery';
import logger from '../utils/logger';

// Local image paths (from frontend assets, copied to backend uploads)
const imageUrls = {
  coaches: {
    coach1: '/uploads/coaches/Coach1.jpeg',
    coach2: '/uploads/coaches/Coach2.jpeg',
    coach3: '/uploads/coaches/Coach3.jpeg',
    coach4: '/uploads/coaches/Coach4.jpeg',
    coach5: '/uploads/coaches/Coach5.jpeg',
    coach6: '/uploads/coaches/Coach6.jpeg',
    coach7: '/uploads/coaches/Coach7.jpeg',
    coach8: '/uploads/coaches/Coach8.jpeg',
    coach9: '/uploads/coaches/Coach9.jpeg',
  },
  products: {
    adjustableSkates: [
      '/uploads/products/adjustable/214678e6-4794-4fed-9f81-9d9e14368442.jfif',
      '/uploads/products/adjustable/ab4c43e3-c398-4e0f-aa8a-730b587c0fa4.jfif',
      '/uploads/products/adjustable/aca31ffc-f337-42fd-8b94-fabd17264956.jfif',
    ],
    quadsSkates: [
      '/uploads/products/quads/0d292238-4cc3-4125-a635-dfc011119e74.jfif',
      '/uploads/products/quads/104580e2-89d5-4dfe-9a65-ae8cd9f33dc9.jfif',
      '/uploads/products/quads/23c59442-3996-48e1-a1fe-794a196e74d5.jfif',
      '/uploads/products/quads/245708b9-dc99-45fc-b60d-842bfb8ceef3.jfif',
    ],
    inlineSkates: [
      '/uploads/products/inline/05c1f840-16a3-433a-b79f-2acc0b980f8e.jfif',
      '/uploads/products/inline/06a710a0-2fa5-4d99-81f7-307a5e9c58ba.jfif',
      '/uploads/products/inline/0d810191-eb81-4fa7-96a3-ac092b47ddde.jfif',
      '/uploads/products/inline/1531c625-29ac-4d71-9ccd-a8e7e02bdcdc.jfif',
    ],
    helmets: [
      '/uploads/products/helmets/WhatsApp Image 2026-04-17 at 12.24.46 AM (1).jpeg',
      '/uploads/products/helmets/WhatsApp Image 2026-04-17 at 12.24.46 AM.jpeg',
      '/uploads/products/helmets/WhatsApp Image 2026-04-17 at 12.24.47 AM (1).jpeg',
      '/uploads/products/helmets/WhatsApp Image 2026-04-17 at 12.24.47 AM (2).jpeg',
    ],
    wheels: [
      '/uploads/products/wheels/WhatsApp Image 2026-04-17 at 12.14.34 AM.jpeg',
      '/uploads/products/wheels/WhatsApp Image 2026-04-17 at 12.14.35 AM (1).jpeg',
      '/uploads/products/wheels/WhatsApp Image 2026-04-17 at 12.14.35 AM (2).jpeg',
      '/uploads/products/wheels/WhatsApp Image 2026-04-17 at 12.14.35 AM.jpeg',
    ],
    protection: [
      '/uploads/products/protection/WhatsApp Image 2026-04-17 at 12.46.16 AM (1).jpeg',
      '/uploads/products/protection/WhatsApp Image 2026-04-17 at 12.46.16 AM.jpeg',
    ]
  },
  gallery: {
    training: [
      '/uploads/gallery/IMG_2450.JPG.jpeg',
      '/uploads/gallery/IMG_2451.JPG.jpeg',
    ],
    competition: [
      '/uploads/gallery/IMG_2452.JPG.jpeg',
      '/uploads/gallery/IMG_2453.JPG.jpeg',
    ],
    events: [
      '/uploads/gallery/IMG_2454.JPG.jpeg',
      '/uploads/gallery/IMG_2456.JPG.jpeg',
    ],
    facilities: [
      '/uploads/gallery/IMG_2457.JPG.jpeg',
      '/uploads/gallery/IMG_2458.JPG.jpeg',
    ],
    students: [
      '/uploads/gallery/IMG_2459.JPG.jpeg',
      '/uploads/gallery/IMG_2460.JPG.jpeg',
    ]
  }
};

const seedComplete = async () => {
  try {
    await database.connect();

    logger.info('🌱 Starting complete seeding...');

    // Clear existing data
    logger.info('🗑️  Clearing existing data...');
    await Category.deleteMany({});
    await Subcategory.deleteMany({});
    await Coach.deleteMany({});
    await Product.deleteMany({});
    await Gallery.deleteMany({});

    // =====================================================
    // 1. SEED CATEGORIES & SUBCATEGORIES
    // =====================================================
    logger.info('📂 Seeding categories...');

    const categoriesData = [
      {
        name: 'Skates',
        slug: 'skates',
        description: 'Premium skating equipment for all levels',
        image: {
          url: imageUrls.products.adjustableSkates[0],
          thumbnail: imageUrls.products.adjustableSkates[0],
          alt: 'Skates Category',
          filename: 'skates-category.jfif'
        },
        hasSubcategories: true,
        displayOrder: 1,
        isActive: true
      },
      {
        name: 'Helmets',
        slug: 'helmets',
        description: 'Safety helmets for skating protection',
        image: {
          url: imageUrls.products.helmets[0],
          thumbnail: imageUrls.products.helmets[0],
          alt: 'Helmets Category',
          filename: 'helmets-category.jpeg'
        },
        hasSubcategories: false,
        displayOrder: 2,
        isActive: true
      },
      {
        name: 'Wheels',
        slug: 'wheels',
        description: 'High-quality skating wheels',
        image: {
          url: imageUrls.products.wheels[0],
          thumbnail: imageUrls.products.wheels[0],
          alt: 'Wheels Category',
          filename: 'wheels-category.jpeg'
        },
        hasSubcategories: false,
        displayOrder: 3,
        isActive: true
      },
      {
        name: 'Protection',
        slug: 'protection',
        description: 'Protective gear for safe skating',
        image: {
          url: imageUrls.products.protection[0],
          thumbnail: imageUrls.products.protection[0],
          alt: 'Protection Category',
          filename: 'protection-category.jpeg'
        },
        hasSubcategories: false,
        displayOrder: 4,
        isActive: true
      }
    ];

    const createdCategories = await Category.insertMany(categoriesData);
    logger.info(`✅ Created ${createdCategories.length} categories`);

    // Create subcategories for Skates
    const skatesCategory = createdCategories.find(c => c.slug === 'skates')!;
    let subcategoriesData: any[] = [];
    let createdSubcategories: any[] = [];

    if (skatesCategory) {
      subcategoriesData = [
        {
          name: 'Adjustable Skates',
          slug: 'adjustable-skates',
          categoryId: skatesCategory._id,
          description: 'Perfect for growing kids - adjustable size skates',
          image: {
            url: imageUrls.products.adjustableSkates[0],
            thumbnail: imageUrls.products.adjustableSkates[0],
            alt: 'Adjustable Skates',
            filename: 'adjustable-skates.jfif'
          },
          displayOrder: 1,
          isActive: true
        },
        {
          name: 'Quads Skates',
          slug: 'quads-skates',
          categoryId: skatesCategory._id,
          description: 'Classic four-wheel skates for stability',
          image: {
            url: imageUrls.products.quadsSkates[0],
            thumbnail: imageUrls.products.quadsSkates[0],
            alt: 'Quads Skates',
            filename: 'quads-skates.jfif'
          },
          displayOrder: 2,
          isActive: true
        },
        {
          name: 'Inline Skates',
          slug: 'inline-skates',
          categoryId: skatesCategory._id,
          description: 'Speed and performance inline skates',
          image: {
            url: imageUrls.products.inlineSkates[0],
            thumbnail: imageUrls.products.inlineSkates[0],
            alt: 'Inline Skates',
            filename: 'inline-skates.jfif'
          },
          displayOrder: 3,
          isActive: true
        }
      ];

      createdSubcategories = await Subcategory.insertMany(subcategoriesData);
      logger.info(`✅ Created ${createdSubcategories.length} subcategories`);
    }

    // =====================================================
    // 2. SEED COACHES
    // =====================================================
    logger.info('👨‍🏫 Seeding coaches...');

    const coachesData = [
      {
        name: 'Rajesh Kumar',
        role: 'Head Coach - Speed Skating',
        experience: '15 years',
        specialty: 'Speed & Competitive Training',
        bio: 'Experienced coach specializing in speed skating with national certifications. Trained multiple medalists at national level competitions.',
        image: {
          url: imageUrls.coaches.coach1,
          thumbnail: imageUrls.coaches.coach1,
          alt: 'Rajesh Kumar',
          filename: 'rajesh-kumar.jpeg'
        },
        displayOrder: 1,
        isActive: true,
        isFeatured: true,
        socialLinks: {
          facebook: 'https://facebook.com/rajesh-skating',
          instagram: 'https://instagram.com/rajesh_speed_skates'
        }
      },
      {
        name: 'Priya Sharma',
        role: 'Assistant Coach - Technique Training',
        experience: '10 years',
        specialty: 'Technique & Form Correction',
        bio: 'Specializes in teaching proper skating techniques and form correction. Known for patient and detailed approach to training beginners.',
        image: {
          url: imageUrls.coaches.coach2,
          thumbnail: imageUrls.coaches.coach2,
          alt: 'Priya Sharma',
          filename: 'priya-sharma.jpeg'
        },
        displayOrder: 2,
        isActive: true,
        isFeatured: true,
        socialLinks: {
          facebook: 'https://facebook.com/priya-skating',
          instagram: 'https://instagram.com/priya_technique'
        }
      },
      {
        name: 'Amit Patel',
        role: 'Coach - Freestyle & Tricks',
        experience: '12 years',
        specialty: 'Freestyle Skating & Trick Techniques',
        bio: 'Expert in freestyle skating and advanced trick techniques. Has won multiple competitions in freestyle category.',
        image: {
          url: imageUrls.coaches.coach3,
          thumbnail: imageUrls.coaches.coach3,
          alt: 'Amit Patel',
          filename: 'amit-patel.jpeg'
        },
        displayOrder: 3,
        isActive: true,
        isFeatured: true,
        socialLinks: {
          facebook: 'https://facebook.com/amit-freestyle',
          instagram: 'https://instagram.com/amit_tricks'
        }
      },
      {
        name: 'Neha Singh',
        role: 'Junior Coach - Kids Training',
        experience: '8 years',
        specialty: 'Kids & Beginners Training',
        bio: 'Passionate about teaching young skaters with fun and engaging methods. Creates positive learning environment for children.',
        image: {
          url: imageUrls.coaches.coach4,
          thumbnail: imageUrls.coaches.coach4,
          alt: 'Neha Singh',
          filename: 'neha-singh.jpeg'
        },
        displayOrder: 4,
        isActive: true,
        isFeatured: false,
        socialLinks: {
          facebook: 'https://facebook.com/neha-kids-skating',
          instagram: 'https://instagram.com/neha_kids_coach'
        }
      }
    ];

    const createdCoaches = await Coach.insertMany(coachesData);
    logger.info(`✅ Created ${createdCoaches.length} coaches`);

    // =====================================================
    // 3. SEED PRODUCTS
    // =====================================================
    logger.info('🛒 Seeding products...');

    const helmetsCategory = createdCategories.find(c => c.slug === 'helmets')!;
    const wheelsCategory = createdCategories.find(c => c.slug === 'wheels')!;
    const protectionCategory = createdCategories.find(c => c.slug === 'protection')!;

    const adjustableSkatesSubcat = createdSubcategories.find(s => s.slug === 'adjustable-skates')!;
    const quadsSkatesSubcat = createdSubcategories.find(s => s.slug === 'quads-skates')!;
    const inlineSkatesSubcat = createdSubcategories.find(s => s.slug === 'inline-skates')!;

    const productsData = [
      // Adjustable Skates
      {
        name: 'ProGlide Adjustable Skates - Kids',
        slug: 'proglide-adjustable-skates-kids',
        categoryId: skatesCategory._id,
        subcategoryId: adjustableSkatesSubcat._id,
        description: 'High-quality adjustable skates perfect for growing children. Easy to adjust size.',
        specifications: 'Size: Adjustable XS-M | Wheels: 64mm | Bearing: ABEC-7',
        images: [
          {
            url: imageUrls.products.adjustableSkates[0],
            thumbnail: imageUrls.products.adjustableSkates[0],
            alt: 'ProGlide Adjustable Skates',
            filename: '214678e6-4794-4fed-9f81-9d9e14368442.jfif'
          },
          {
            url: imageUrls.products.adjustableSkates[1],
            thumbnail: imageUrls.products.adjustableSkates[1],
            alt: 'ProGlide Adjustable Skates Side View',
            filename: 'ab4c43e3-c398-4e0f-aa8a-730b587c0fa4.jfif'
          }
        ],
        price: 2499,
        compareAtPrice: 3499,
        sku: 'SKATE-ADJ-001',
        stock: 50,
        isInStock: true,
        isFeatured: true,
        isBestseller: true,
        displayOrder: 1,
        isActive: true,
        seo: {
          metaTitle: 'ProGlide Adjustable Skates for Kids | Best Quality',
          metaDescription: 'High-quality adjustable skates with ABEC-7 bearings. Perfect for growing children.',
          keywords: ['adjustable skates', 'kids skates', 'growing skates', 'beginners']
        }
      },
      {
        name: 'FlexFit Adjustable Skates Pro',
        slug: 'flexfit-adjustable-skates-pro',
        categoryId: skatesCategory._id,
        subcategoryId: adjustableSkatesSubcat._id,
        description: 'Professional grade adjustable skates with reinforced ankle support.',
        specifications: 'Size: Adjustable S-XL | Wheels: 70mm | Bearing: ABEC-9',
        images: [
          {
            url: imageUrls.products.adjustableSkates[2],
            thumbnail: imageUrls.products.adjustableSkates[2],
            alt: 'FlexFit Adjustable Skates Pro',
            filename: 'aca31ffc-f337-42fd-8b94-fabd17264956.jfif'
          }
        ],
        price: 3999,
        compareAtPrice: 5499,
        sku: 'SKATE-ADJ-002',
        stock: 35,
        isInStock: true,
        isFeatured: true,
        isBestseller: false,
        displayOrder: 2,
        isActive: true,
        seo: {
          metaTitle: 'FlexFit Pro Adjustable Skates | Professional Grade',
          metaDescription: 'Professional adjustable skates with ABEC-9 bearings and ankle support.',
          keywords: ['professional skates', 'adjustable', 'ankle support']
        }
      },

      // Quads Skates
      {
        name: 'ClassicRoll Quad Skates - Classic',
        slug: 'classicroll-quad-skates-classic',
        categoryId: skatesCategory._id,
        subcategoryId: quadsSkatesSubcat._id,
        description: 'Traditional four-wheel quad skates with excellent stability for all ages.',
        specifications: 'Size: 1-10 | Wheels: 62mm | Bearing: ABEC-5 | Color: Black/Red',
        images: [
          {
            url: imageUrls.products.quadsSkates[0],
            thumbnail: imageUrls.products.quadsSkates[0],
            alt: 'ClassicRoll Quad Skates',
            filename: '0d292238-4cc3-4125-a635-dfc011119e74.jfif'
          },
          {
            url: imageUrls.products.quadsSkates[1],
            thumbnail: imageUrls.products.quadsSkates[1],
            alt: 'ClassicRoll Quad Skates Variant',
            filename: '104580e2-89d5-4dfe-9a65-ae8cd9f33dc9.jfif'
          }
        ],
        price: 1999,
        compareAtPrice: 2999,
        sku: 'SKATE-QUAD-001',
        stock: 75,
        isInStock: true,
        isFeatured: false,
        isBestseller: true,
        displayOrder: 3,
        isActive: true,
        seo: {
          metaTitle: 'ClassicRoll Quad Skates | Traditional Four Wheel Design',
          metaDescription: 'Classic four-wheel quad skates with excellent stability. Perfect for family skating.',
          keywords: ['quad skates', 'four wheel skates', 'stability']
        }
      },
      {
        name: 'Elite Quad Skates Professional',
        slug: 'elite-quad-skates-professional',
        categoryId: skatesCategory._id,
        subcategoryId: quadsSkatesSubcat._id,
        description: 'High-end quad skates designed for competitive skating and performances.',
        specifications: 'Size: 3-12 | Wheels: 65mm | Bearing: ABEC-7 | Color: Silver',
        images: [
          {
            url: imageUrls.products.quadsSkates[2],
            thumbnail: imageUrls.products.quadsSkates[2],
            alt: 'Elite Quad Skates',
            filename: '23c59442-3996-48e1-a1fe-794a196e74d5.jfif'
          },
          {
            url: imageUrls.products.quadsSkates[3],
            thumbnail: imageUrls.products.quadsSkates[3],
            alt: 'Elite Quad Skates Variant',
            filename: '245708b9-dc99-45fc-b60d-842bfb8ceef3.jfif'
          }
        ],
        price: 5999,
        compareAtPrice: 7999,
        sku: 'SKATE-QUAD-002',
        stock: 25,
        isInStock: true,
        isFeatured: true,
        isBestseller: false,
        displayOrder: 4,
        isActive: true,
        seo: {
          metaTitle: 'Elite Professional Quad Skates | Competition Grade',
          metaDescription: 'Professional quad skates with ABEC-7 bearings for competitive skating.',
          keywords: ['professional quad skates', 'competition', 'high-end']
        }
      },

      // Inline Skates
      {
        name: 'SpeedRush Inline Skates - Standard',
        slug: 'speedrush-inline-skates-standard',
        categoryId: skatesCategory._id,
        subcategoryId: inlineSkatesSubcat._id,
        description: 'Fast and agile inline skates perfect for street skating and fitness.',
        specifications: 'Size: 1-10 | Wheels: 80mm | Bearing: ABEC-7 | Frame: Aluminum',
        images: [
          {
            url: imageUrls.products.inlineSkates[0],
            thumbnail: imageUrls.products.inlineSkates[0],
            alt: 'SpeedRush Inline Skates',
            filename: '05c1f840-16a3-433a-b79f-2acc0b980f8e.jfif'
          },
          {
            url: imageUrls.products.inlineSkates[1],
            thumbnail: imageUrls.products.inlineSkates[1],
            alt: 'SpeedRush Inline Skates Variant',
            filename: '06a710a0-2fa5-4d99-81f7-307a5e9c58ba.jfif'
          }
        ],
        price: 2299,
        compareAtPrice: 3299,
        sku: 'SKATE-INLINE-001',
        stock: 60,
        isInStock: true,
        isFeatured: true,
        isBestseller: true,
        displayOrder: 5,
        isActive: true,
        seo: {
          metaTitle: 'SpeedRush Inline Skates | Fast & Agile Performance',
          metaDescription: 'High-performance inline skates with ABEC-7 bearings for speed enthusiasts.',
          keywords: ['inline skates', 'speed', 'fitness skating']
        }
      },
      {
        name: 'RaceLite Inline Skates - Pro Series',
        slug: 'racelite-inline-skates-pro-series',
        categoryId: skatesCategory._id,
        subcategoryId: inlineSkatesSubcat._id,
        description: 'Racing-grade inline skates with maximum speed capability.',
        specifications: 'Size: 2-12 | Wheels: 90mm | Bearing: ABEC-9 | Frame: Carbon Fiber',
        images: [
          {
            url: imageUrls.products.inlineSkates[2],
            thumbnail: imageUrls.products.inlineSkates[2],
            alt: 'RaceLite Pro Inline Skates',
            filename: '0d810191-eb81-4fa7-96a3-ac092b47ddde.jfif'
          },
          {
            url: imageUrls.products.inlineSkates[3],
            thumbnail: imageUrls.products.inlineSkates[3],
            alt: 'RaceLite Pro Inline Skates Variant',
            filename: '1531c625-29ac-4d71-9ccd-a8e7e02bdcdc.jfif'
          }
        ],
        price: 6999,
        compareAtPrice: 8999,
        sku: 'SKATE-INLINE-002',
        stock: 20,
        isInStock: true,
        isFeatured: true,
        isBestseller: false,
        displayOrder: 6,
        isActive: true,
        seo: {
          metaTitle: 'RaceLite Pro Series Inline Skates | Racing Grade',
          metaDescription: 'Professional racing inline skates with carbon fiber frame and ABEC-9 bearings.',
          keywords: ['racing skates', 'professional inline', 'speed racing']
        }
      },

      // Helmets
      {
        name: 'SafeGuard Helmet - Kids',
        slug: 'safeguard-helmet-kids',
        categoryId: helmetsCategory._id,
        description: 'Lightweight and comfortable helmet for children with excellent protection.',
        specifications: 'Size: XS-M | Weight: 250g | Certification: ISI/CE',
        images: [
          {
            url: imageUrls.products.helmets[0],
            thumbnail: imageUrls.products.helmets[0],
            alt: 'SafeGuard Kids Helmet',
            filename: 'WhatsApp Image 2026-04-17 at 12.24.46 AM (1).jpeg'
          },
          {
            url: imageUrls.products.helmets[1],
            thumbnail: imageUrls.products.helmets[1],
            alt: 'SafeGuard Kids Helmet Variant',
            filename: 'WhatsApp Image 2026-04-17 at 12.24.46 AM.jpeg'
          }
        ],
        price: 899,
        compareAtPrice: 1299,
        sku: 'HELMET-001',
        stock: 100,
        isInStock: true,
        isFeatured: true,
        isBestseller: true,
        displayOrder: 7,
        isActive: true,
        seo: {
          metaTitle: 'SafeGuard Kids Helmet | Safe Skating',
          metaDescription: 'Lightweight kids helmet with ISI/CE certification for safe skating.',
          keywords: ['kids helmet', 'safety', 'protective gear']
        }
      },
      {
        name: 'ProShield Helmet - Adult',
        slug: 'proshield-helmet-adult',
        categoryId: helmetsCategory._id,
        description: 'Professional-grade helmet for adult skaters with superior protection.',
        specifications: 'Size: S-XL | Weight: 320g | Certification: ISI/CE/DOT',
        images: [
          {
            url: imageUrls.products.helmets[2],
            thumbnail: imageUrls.products.helmets[2],
            alt: 'ProShield Adult Helmet',
            filename: 'WhatsApp Image 2026-04-17 at 12.24.47 AM (1).jpeg'
          },
          {
            url: imageUrls.products.helmets[3],
            thumbnail: imageUrls.products.helmets[3],
            alt: 'ProShield Adult Helmet Variant',
            filename: 'WhatsApp Image 2026-04-17 at 12.24.47 AM (2).jpeg'
          }
        ],
        price: 1599,
        compareAtPrice: 2299,
        sku: 'HELMET-002',
        stock: 80,
        isInStock: true,
        isFeatured: true,
        isBestseller: false,
        displayOrder: 8,
        isActive: true,
        seo: {
          metaTitle: 'ProShield Adult Helmet | Professional Protection',
          metaDescription: 'Professional helmet with ISI/CE/DOT certification for adult skaters.',
          keywords: ['adult helmet', 'professional protection', 'DOT certified']
        }
      },

      // Wheels
      {
        name: 'SpinMax Wheels - 64mm',
        slug: 'spinmax-wheels-64mm',
        categoryId: wheelsCategory._id,
        description: 'High-performance wheels with superior grip and durability.',
        specifications: 'Size: 64mm | Hardness: 78A | Material: Polyurethane | Set of 8',
        images: [
          {
            url: imageUrls.products.wheels[0],
            thumbnail: imageUrls.products.wheels[0],
            alt: 'SpinMax 64mm Wheels',
            filename: 'WhatsApp Image 2026-04-17 at 12.14.34 AM.jpeg'
          },
          {
            url: imageUrls.products.wheels[1],
            thumbnail: imageUrls.products.wheels[1],
            alt: 'SpinMax 64mm Wheels Detail',
            filename: 'WhatsApp Image 2026-04-17 at 12.14.35 AM (1).jpeg'
          }
        ],
        price: 1299,
        compareAtPrice: 1699,
        sku: 'WHEEL-001',
        stock: 150,
        isInStock: true,
        isFeatured: false,
        isBestseller: true,
        displayOrder: 9,
        isActive: true,
        seo: {
          metaTitle: 'SpinMax 64mm Wheels | High Performance',
          metaDescription: 'High-quality polyurethane wheels with excellent grip. Set of 8.',
          keywords: ['wheels', '64mm', 'polyurethane', 'replacement wheels']
        }
      },
      {
        name: 'TurboGlide Wheels - 80mm',
        slug: 'turboglide-wheels-80mm',
        categoryId: wheelsCategory._id,
        description: 'Speed-optimized wheels for maximum velocity and smooth rolling.',
        specifications: 'Size: 80mm | Hardness: 82A | Material: Polyurethane | Set of 8',
        images: [
          {
            url: imageUrls.products.wheels[2],
            thumbnail: imageUrls.products.wheels[2],
            alt: 'TurboGlide 80mm Wheels',
            filename: 'WhatsApp Image 2026-04-17 at 12.14.35 AM (2).jpeg'
          },
          {
            url: imageUrls.products.wheels[3],
            thumbnail: imageUrls.products.wheels[3],
            alt: 'TurboGlide 80mm Wheels Detail',
            filename: 'WhatsApp Image 2026-04-17 at 12.14.35 AM.jpeg'
          }
        ],
        price: 1599,
        compareAtPrice: 2199,
        sku: 'WHEEL-002',
        stock: 120,
        isInStock: true,
        isFeatured: true,
        isBestseller: false,
        displayOrder: 10,
        isActive: true,
        seo: {
          metaTitle: 'TurboGlide 80mm Wheels | Speed Wheels',
          metaDescription: 'Speed wheels with 82A hardness for maximum velocity and smooth rolling.',
          keywords: ['speed wheels', '80mm', 'high performance']
        }
      },

      // Protection Gear
      {
        name: 'SoftGuard Wrist Guards - Pair',
        slug: 'softguard-wrist-guards',
        categoryId: protectionCategory._id,
        description: 'Comfortable wrist guards with excellent protection against falls.',
        specifications: 'Material: Neoprene + Plastic | Size: One size fits most | Pair',
        images: [
          {
            url: imageUrls.products.protection[0],
            thumbnail: imageUrls.products.protection[0],
            alt: 'SoftGuard Wrist Guards',
            filename: 'WhatsApp Image 2026-04-17 at 12.46.16 AM (1).jpeg'
          }
        ],
        price: 699,
        compareAtPrice: 999,
        sku: 'PROTECT-001',
        stock: 200,
        isInStock: true,
        isFeatured: true,
        isBestseller: true,
        displayOrder: 11,
        isActive: true,
        seo: {
          metaTitle: 'SoftGuard Wrist Guards | Protection Gear',
          metaDescription: 'Comfortable neoprene wrist guards for skateboarding and skating protection.',
          keywords: ['wrist guards', 'protection', 'safety gear']
        }
      },
      {
        name: 'CompletePro Protection Kit',
        slug: 'completepro-protection-kit',
        categoryId: protectionCategory._id,
        description: 'Complete protection package including wrist, knee, and elbow guards.',
        specifications: 'Includes: Wrist (Pair) + Knee (Pair) + Elbow (Pair) | One size fits most',
        images: [
          {
            url: imageUrls.products.protection[1],
            thumbnail: imageUrls.products.protection[1],
            alt: 'CompletePro Protection Kit',
            filename: 'WhatsApp Image 2026-04-17 at 12.46.16 AM.jpeg'
          }
        ],
        price: 1999,
        compareAtPrice: 2999,
        sku: 'PROTECT-002',
        stock: 80,
        isInStock: true,
        isFeatured: true,
        isBestseller: false,
        displayOrder: 12,
        isActive: true,
        seo: {
          metaTitle: 'CompletePro Protection Kit | Full Protection',
          metaDescription: 'Complete protection kit with wrist, knee, and elbow guards.',
          keywords: ['protection kit', 'knee guards', 'elbow guards', 'complete protection']
        }
      }
    ];

    const createdProducts = await Product.insertMany(productsData);
    logger.info(`✅ Created ${createdProducts.length} products`);

    // =====================================================
    // 4. SEED GALLERY
    // =====================================================
    logger.info('🖼️  Seeding gallery...');

    const galleryData = [
      // Training
      {
        title: 'Beginner Training Session',
        caption: 'Our coaches guiding young skaters through basic techniques',
        image: {
          url: imageUrls.gallery.training[0],
          thumbnail: imageUrls.gallery.training[0],
          alt: 'Beginner Training Session',
          filename: 'training-1.jpeg',
          width: 800,
          height: 600
        },
        category: 'Training',
        tags: ['beginner', 'training', 'kids', 'technique'],
        uploadDate: new Date('2024-01-15'),
        displayOrder: 1,
        isActive: true
      },
      {
        title: 'Advanced Speed Training',
        caption: 'Professional athletes during speed skating training',
        image: {
          url: imageUrls.gallery.training[1],
          thumbnail: imageUrls.gallery.training[1],
          alt: 'Advanced Speed Training',
          filename: 'training-2.jpeg',
          width: 800,
          height: 600
        },
        category: 'Training',
        tags: ['advanced', 'speed', 'professional', 'training'],
        uploadDate: new Date('2024-02-10'),
        displayOrder: 2,
        isActive: true
      },

      // Competition
      {
        title: 'National Speed Championship 2024',
        caption: 'Thrilling moments from the national speed skating championship',
        image: {
          url: imageUrls.gallery.competition[0],
          thumbnail: imageUrls.gallery.competition[0],
          alt: 'National Championship',
          filename: 'competition-1.jpeg',
          width: 800,
          height: 600
        },
        category: 'Competition',
        tags: ['championship', 'competition', 'national', '2024'],
        uploadDate: new Date('2024-03-20'),
        displayOrder: 3,
        isActive: true
      },
      {
        title: 'Freestyle Skating Championship',
        caption: 'Amazing tricks and performances at freestyle championship',
        image: {
          url: imageUrls.gallery.competition[1],
          thumbnail: imageUrls.gallery.competition[1],
          alt: 'Freestyle Championship',
          filename: 'competition-2.jpeg',
          width: 800,
          height: 600
        },
        category: 'Competition',
        tags: ['freestyle', 'tricks', 'championship', 'performance'],
        uploadDate: new Date('2024-04-05'),
        displayOrder: 4,
        isActive: true
      },

      // Events
      {
        title: 'Annual Skating Festival',
        caption: 'Family-friendly skating festival with participants of all ages',
        image: {
          url: imageUrls.gallery.events[0],
          thumbnail: imageUrls.gallery.events[0],
          alt: 'Skating Festival',
          filename: 'events-1.jpeg',
          width: 800,
          height: 600
        },
        category: 'Events',
        tags: ['festival', 'event', 'family', 'community'],
        uploadDate: new Date('2024-05-12'),
        displayOrder: 5,
        isActive: true
      },
      {
        title: 'Summer Camp - Group Photo',
        caption: 'Happy participants from our summer skating camp',
        image: {
          url: imageUrls.gallery.events[1],
          thumbnail: imageUrls.gallery.events[1],
          alt: 'Summer Camp',
          filename: 'events-2.jpeg',
          width: 800,
          height: 600
        },
        category: 'Events',
        tags: ['summer camp', 'group', 'training', 'fun'],
        uploadDate: new Date('2024-06-01'),
        displayOrder: 6,
        isActive: true
      },

      // Facilities
      {
        title: 'State-of-the-Art Indoor Skating Rink',
        caption: 'Our modern indoor facility with professional-grade skating surface',
        image: {
          url: imageUrls.gallery.facilities[0],
          thumbnail: imageUrls.gallery.facilities[0],
          alt: 'Indoor Skating Rink',
          filename: 'facilities-1.jpeg',
          width: 800,
          height: 600
        },
        category: 'Facilities',
        tags: ['facility', 'indoor', 'rink', 'professional'],
        uploadDate: new Date('2024-02-14'),
        displayOrder: 7,
        isActive: true
      },
      {
        title: 'Training Equipment and Gear',
        caption: 'Professional skating equipment and safety gear available at our center',
        image: {
          url: imageUrls.gallery.facilities[1],
          thumbnail: imageUrls.gallery.facilities[1],
          alt: 'Equipment',
          filename: 'facilities-2.jpeg',
          width: 800,
          height: 600
        },
        category: 'Facilities',
        tags: ['equipment', 'gear', 'facility', 'professional'],
        uploadDate: new Date('2024-03-01'),
        displayOrder: 8,
        isActive: true
      },

      // Students
      {
        title: 'Young Skater Progress',
        caption: 'A young student successfully mastering new skating techniques',
        image: {
          url: imageUrls.gallery.students[0],
          thumbnail: imageUrls.gallery.students[0],
          alt: 'Young Skater',
          filename: 'students-1.jpeg',
          width: 800,
          height: 600
        },
        category: 'Students',
        tags: ['student', 'beginner', 'progress', 'learning'],
        uploadDate: new Date('2024-04-10'),
        displayOrder: 9,
        isActive: true
      },
      {
        title: 'Student Achievement - Medal Winner',
        caption: 'Our student proudly showing medal from local skating competition',
        image: {
          url: imageUrls.gallery.students[1],
          thumbnail: imageUrls.gallery.students[1],
          alt: 'Medal Winner',
          filename: 'students-2.jpeg',
          width: 800,
          height: 600
        },
        category: 'Students',
        tags: ['achievement', 'medal', 'winner', 'student', 'competition'],
        uploadDate: new Date('2024-05-05'),
        displayOrder: 10,
        isActive: true
      }
    ];

    const createdGallery = await Gallery.insertMany(galleryData);
    logger.info(`✅ Created ${createdGallery.length} gallery items`);

    // =====================================================
    // SUMMARY
    // =====================================================
    logger.info('\n🎉 ========== SEEDING COMPLETE ==========');
    logger.info(`✅ Categories: ${createdCategories.length}`);
    logger.info(`✅ Subcategories: ${createdSubcategories.length}`);
    logger.info(`✅ Coaches: ${createdCoaches.length}`);
    logger.info(`✅ Products: ${createdProducts.length}`);
    logger.info(`✅ Gallery Items: ${createdGallery.length}`);
    logger.info('=========================================\n');

    process.exit(0);
  } catch (error) {
    logger.error('❌ Failed to seed database:', error);
    process.exit(1);
  }
};

seedComplete();
