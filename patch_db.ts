import { db } from './src/server/db.js';

console.log('Current config:', db.getAdminConfig());
db.updateAdminCredentials('admin', 'admin@rashed1998');
console.log('New config:', db.getAdminConfig());
