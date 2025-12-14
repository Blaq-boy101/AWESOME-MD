const fs = require('fs');
const path = require('path');

function lockDependencies() {
  const packagePath = path.join(__dirname, 'package.json');
  const lockPath = path.join(__dirname, 'package-lock.json');
  
  if (!fs.existsSync(packagePath)) {
    console.log('package.json not found');
    return false;
  }
  
  try {
    const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    console.log('Package:', packageData.name);
    console.log('Version:', packageData.version);
    console.log('Dependencies:', Object.keys(packageData.dependencies || {}).length);
    return true;
  } catch (error) {
    console.error('Error reading package.json:', error.message);
    return false;
  }
}

function checkLockFile() {
  const lockPath = path.join(__dirname, 'package-lock.json');
  return fs.existsSync(lockPath);
}

module.exports = { lockDependencies, checkLockFile };
