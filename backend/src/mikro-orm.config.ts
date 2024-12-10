import { defineConfig } from '@mikro-orm/mongodb';

export default defineConfig({
  entitiesTs: ['./src/**/*.entity.ts'],
  entities: ['./dist/**/*.entity.js'],
  dbName: 'POSitiveFlow',
  clientUrl: process.env.MONGO_URI || 'mongodb://localhost:27017',
  ensureIndexes: true, 
});