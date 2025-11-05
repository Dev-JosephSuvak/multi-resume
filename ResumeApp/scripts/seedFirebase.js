import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serviceAccount = JSON.parse(
  readFileSync(join(__dirname, 'serviceAccountKey.json'), 'utf8')
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const resumeData = JSON.parse(
  readFileSync(join(__dirname, '../ClientApp/src/data/resumeData.json'), 'utf8')
);

async function seedFirestore() {
  try {
    console.log('🌱 Starting Firestore seeding...');

    // Create a single document with all resume data
    await db.collection('resume').doc('data').set(resumeData);

    console.log('✅ Successfully seeded Firestore with resume data.');
    console.log('📍 Data location: resume/data');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding Firestore:', error);
    process.exit(1);
  }
}

seedFirestore();
