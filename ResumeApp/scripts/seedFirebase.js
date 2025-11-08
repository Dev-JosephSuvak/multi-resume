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

async function seedResumeData() {
  try {
    console.log('Starting to seed resume data...');
    
    const docRef = db.collection('resume').doc('data');
    await docRef.set(resumeData);
    console.log('Resume data seeded successfully!');
  } catch (error) {
    console.error('Error seeding resume data:', error);
  }
}

async function seedFirestore() {
  await seedResumeData();
  process.exit(0);
}

seedFirestore();
