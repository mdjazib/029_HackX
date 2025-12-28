import mongoose from 'mongoose';
import account from '../schema/account.js';
import thought from '../schema/thought.js';

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

const sampleUsers = [
  { name: 'Pakeeza Islam', username: 'pakeezaislam1508' },
  { name: 'Wolf Mind', username: 'wolfmind' },
  { name: 'Code Spirit', username: 'codedspirit' },
  { name: 'Quiet Alpha', username: 'quietalpha' },
  { name: 'Mind Shift', username: 'mindshift' },
];

const sampleThoughts = [
  'Your value is not up for negotiation.',
  'Protect your peace like it\'s oxygen.',
  'Respect is expensive. Earn it.',
  'Better alone than badly accompanied.',
  'Let actions prove what words could never.',
  'Stop watering dead plants.',
  'Peace looks good on you.',
  'A calm mind wins every battle.',
  'Growth is painful, but staying the same is deadly.',
  `You are not behind.\nYou are not late.\nYou are exactly where your story needs you.`,
  `Be careful whose opinions you internalize.\nMove forward with the strength they never expected.`,
];

const categories = ['motivational','poetry','reflection','creative-writing','quote','emotion','other'];

async function run() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('MONGO_URI is not set');
    process.exit(1);
  }
  await mongoose.connect(uri);
  console.log('Connected to MongoDB');

  // Optional: clean existing
  // await thought.deleteMany({});
  // await account.deleteMany({});

  // Ensure users
  const users = [];
  for (const u of sampleUsers) {
    let doc = await account.findOne({ username: u.username });
    if (!doc) {
      doc = await account.create(u);
      console.log('Created user', u.username);
    }
    users.push(doc);
  }

  // Seed thoughts
  const toCreate = 40;
  const created = [];
  for (let i = 0; i < toCreate; i++) {
    const author = pick(users);
    const content = pick(sampleThoughts);
    const lines = content.split(/\r?\n/).filter(l => l.trim().length > 0);
    const t = await thought.create({
      authorId: author._id,
      authorUsername: author.username,
      content,
      lines,
      category: pick(categories),
      isPublic: true,
      pawprints: Math.floor(Math.random() * 25),
      saves: Math.floor(Math.random() * 10),
      shares: Math.floor(Math.random() * 8),
      replies: Math.floor(Math.random() * 5),
    });
    created.push(t);
  }
  console.log(`Created ${created.length} thoughts`);
  await mongoose.disconnect();
  console.log('Done');
}

run().catch(err => { console.error(err); process.exit(1); });
