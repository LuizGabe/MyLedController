import { checkApplications } from './src/modules/checkApps.js';
import { createAndCloseProcess } from './src/tests/process.test.js';

checkApplications();

setTimeout(() => {
  // createAndCloseProcess();
}, 5000)

