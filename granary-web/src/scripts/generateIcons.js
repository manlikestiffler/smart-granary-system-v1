const fs = require('fs');
const path = require('path');

// Base64 encoded small PNG icon (32x32) - green leaf design
const icon32Base64 = `iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB1klEQVR4AcXBgY3bMBAF0Y8FXIIrcAkqwSW4BJfgElyCSnAJKkEluASXsOBhQUmWZVs2cLhA3uNwHEe+kSQeZcZ9M+4bSTzKjPtm3DeSeJQZ9824byTxKDPum3HfSOJRZtw3476RxKPMuG/GfSOJR5lx34z7RhKPMuO+GfeNJB5lxn0z7htJPMqM+2bcN5J4lBn3zbhvJPEoM+6bcd9I4lFm3DfjvpHEo8y4b8Z9I4lHmXHfjPtGEo8y474Z940kHmXGfTPuG0k8yoz7Ztw3kniUGffNuG8k8Sgz7ptx30jiUWbcN+O+kcSjzLhvxn0jiUeZcd+M+0YSjzLjvhn3jSQeZcZ9M+4bSTzKjPtm3DeSeJQZ9824byTxKDPum3HfSOJRZtw3476RxKPMuG/GfSOJR5lx34z7RhKPMuO+GfeNJB5lxn0z7htJPMqM+2bcN5J4lBn3zbhvJPEoM+6bcd9I4lFm3DfjvpHEo8y4b8Z9I4lHmXHfjPtGEo8y474Z940kHmXGfTPuG0k8yoz7Ztw3kniUGffNuG8k8Sgz7ptx30jiUWbcN+O+kcSjzLhvxn0jiUeZcd+M+0YSjzLjvhn3jSQeZcZ9M+4bSTzKjPtm3DeS+F9/AdO6bxUwuXQbAAAAAElFTkSuQmCC`;

// Create directories if they don't exist
const iconDir = path.join(__dirname, '../public/icons');
if (!fs.existsSync(iconDir)) {
    fs.mkdirSync(iconDir, { recursive: true });
}

// Write the base64 icon to files
fs.writeFileSync(
    path.join(iconDir, 'env-icon-32.png'),
    Buffer.from(icon32Base64, 'base64')
);

// Copy the same icon for other sizes (in a real app, you'd want different sized versions)
fs.copyFileSync(
    path.join(iconDir, 'env-icon-32.png'),
    path.join(iconDir, 'env-icon-192.png')
);
fs.copyFileSync(
    path.join(iconDir, 'env-icon-32.png'),
    path.join(iconDir, 'env-icon-512.png')
); 