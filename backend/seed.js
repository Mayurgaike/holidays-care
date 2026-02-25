const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const Tour = require('./models/Tour');
const HeroImage = require('./models/HeroImage');

const sampleTours = [
  {
    title: 'Goa Beach Paradise',
    description: 'Experience the beautiful beaches of Goa with this 5-day package. Enjoy pristine beaches, water sports, beach parties, and delicious seafood. Visit popular spots like Calangute, Baga, and Anjuna beaches.',
    price: 15000,
    originalPrice: 18000,
    duration: '5 Days / 4 Nights',
    category: 'domestic',
    destination: 'Goa',
    highlights: [
      'Visit 10+ beaches', 'Water sports activities', 'Beach parties', 'Goan seafood', 'Fort Aguada', 'Anjuna Market'
    ],
    inclusions: ['4 nights hotel', 'Breakfast & dinner', 'Transfers', 'Sightseeing', 'Water sports (1 session)', 'Guide'],
    exclusions: ['Flights', 'Lunch', 'Personal expenses', 'Entry fees', 'Insurance'],
    maxGroupSize: 15,
    difficulty: 'easy',
    rating: 4.8,
    totalReviews: 156,
    featured: true,
    popular: true,
    tags: ['beach', 'adventure', 'nightlife'],
    isActive: true,
  },
  {
    title: 'Kashmir Valley Tour',
    description: 'Explore Paradise on Earth. Visit Srinagar, Gulmarg, and Pahalgam. Enjoy shikara rides, gondola rides, and stunning mountain views. Perfect for honeymooners.',
    price: 25000,
    originalPrice: 30000,
    duration: '7 Days / 6 Nights',
    category: 'domestic',
    destination: 'Kashmir',
    highlights: ['Shikara ride', 'Gondola ride', 'Betaab Valley', 'Houseboat stay', 'Mughal Gardens', 'Snow activities'],
    inclusions: ['6 nights accommodation', 'All meals', 'Transfers', 'Sightseeing', 'Shikara & Gondola', 'Guide'],
    exclusions: ['Flights', 'Personal expenses', 'Camera fees', 'Insurance'],
    maxGroupSize: 12,
    difficulty: 'moderate',
    rating: 4.9,
    totalReviews: 203,
    featured: true,
    popular: true,
    tags: ['honeymoon', 'nature', 'scenic'],
    isActive: true,
  },
  {
    title: 'Dubai Luxury Experience',
    description: 'Experience luxury in Dubai. Visit Burj Khalifa, Dubai Mall, Palm Jumeirah, desert safari. Shop at Dubai Shopping Festival.',
    price: 45000,
    originalPrice: 55000,
    duration: '5 Days / 4 Nights',
    category: 'international',
    destination: 'Dubai',
    highlights: ['Burj Khalifa', 'Desert safari', 'Dubai Marina cruise', 'Dubai Mall', 'Palm Jumeirah', 'Dubai Frame'],
    inclusions: ['4 nights 4* hotel', 'Breakfast', 'Visa', 'Transfers', 'Desert safari', 'City tour', 'Burj tickets'],
    exclusions: ['Flights', 'Meals', 'Personal expenses', 'Insurance'],
    maxGroupSize: 15,
    difficulty: 'easy',
    rating: 4.8,
    totalReviews: 189,
    featured: true,
    popular: true,
    tags: ['luxury', 'shopping', 'adventure'],
    isActive: true,
  },
  {
    title: 'Thailand Adventure',
    description: 'Explore Bangkok and Pattaya. Visit temples, floating markets, enjoy beaches and nightlife. Includes island hopping.',
    price: 35000,
    originalPrice: 42000,
    duration: '6 Days / 5 Nights',
    category: 'international',
    destination: 'Thailand',
    highlights: ['Grand Palace', 'Floating Market', 'Coral Island', 'Alcazar Show', 'Thai massage', 'MBK Shopping'],
    inclusions: ['5 nights hotels', 'Breakfast & dinner', 'Visa', 'Transfers', 'Tours', 'Coral Island', 'Shows'],
    exclusions: ['Flights', 'Lunch', 'Water sports', 'Personal expenses', 'Insurance'],
    maxGroupSize: 20,
    difficulty: 'easy',
    rating: 4.6,
    totalReviews: 167,
    featured: true,
    popular: false,
    tags: ['beach', 'culture', 'nightlife'],
    isActive: true,
  }
];

const seedDatabase = async () => {
  try {
    console.log('🌱 Seeding enhanced database...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    await Tour.deleteMany({});
    await HeroImage.deleteMany({});
    console.log('🗑️  Cleared existing data');
    const existingAdmin = await User.findOne({ email: 'admin@holidayscare.com' });
    if (!existingAdmin) {
      const admin = new User({ username: 'admin', email: 'admin@holidayscare.com', password: 'admin123', role: 'admin' });
      await admin.save();
      console.log('✅ Admin created');
    }
    await Tour.insertMany(sampleTours);
    console.log(`✅ Created ${sampleTours.length} enhanced tours`);
    console.log('✨ Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

seedDatabase();
