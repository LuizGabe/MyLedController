import psList from 'ps-list';
import { monitoredApps } from '../config/config.js';

// Stores the currently opened applications
let openApplications = [];

// Function to check the opened applications
export async function checkApplications() {
  const processes = await psList();

  // Check opened applications
  for (const monitoredApp of monitoredApps) {
    const { name, openAction, closeAction } = monitoredApp;
    const isOpen = processes.some(process => process.name.toLowerCase().includes(name.toLowerCase()));

    // Check if the application has been opened
    if (isOpen && !openApplications.includes(name)) {
      openApplications.push(name);
      openAction();
    }

    // Check if the application has been closed
    if (!isOpen && openApplications.includes(name)) {
      openApplications = openApplications.filter(app => app !== name);
      closeAction();
    }
  }

  // Check again after 1 second
  setTimeout(checkApplications, 1000);
}
