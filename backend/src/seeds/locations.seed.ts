import database from '../config/database';
import Location from '../models/Location';
import logger from '../utils/logger';

const seedLocations = async () => {
  try {
    await database.connect();

    // Clear existing locations
    await Location.deleteMany({});

    // Create locations
    const locations = [
      {
        area: 'East Kolkata',
        places: [
          'Salt Lake (Sector I–V)',
          'New Town (Action Areas, Eco Park)',
          'Rajarhat',
          'EM Bypass (Ruby, Science City)'
        ],
        displayOrder: 1,
        isActive: true
      },
      {
        area: 'North Kolkata',
        places: ['Sinthee', 'Cossipore', 'Kankurgachi', 'Phoolbagan'],
        displayOrder: 2,
        isActive: true
      },
      {
        area: 'South Kolkata',
        places: [
          'Gariahat',
          'Ballygunge',
          'Tollygunge',
          'Bhawanipore',
          'Alipore',
          'Behala'
        ],
        displayOrder: 3,
        isActive: true
      },
      {
        area: 'Howrah',
        places: ['Mullick Fatak', 'Shibpur'],
        displayOrder: 4,
        isActive: true
      },
      {
        area: 'Central Kolkata',
        places: [
          'Wood Street',
          'Park Street',
          'Burrabazar',
          'Victoria Memorial',
          'Rowland Row',
          'Minto Park'
        ],
        displayOrder: 5,
        isActive: true
      }
    ];

    const createdLocations = await Location.insertMany(locations);
    logger.info(`✅ Created ${createdLocations.length} locations`);
    logger.info('✅ Locations seeded successfully');

    process.exit(0);
  } catch (error) {
    logger.error('Failed to seed locations:', error);
    process.exit(1);
  }
};

seedLocations();
