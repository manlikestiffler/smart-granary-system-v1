# Smart Granary System

A comprehensive IoT-based grain storage monitoring and management system that helps maintain optimal storage conditions through real-time sensor data and automated controls.

## Features

### Real-time Monitoring
- Temperature monitoring and control
- Humidity level tracking
- Moisture content measurement
- Multi-zone support
- Real-time sensor data visualization

### Alert System
- Configurable threshold alerts
- Multi-channel notifications (Push, Email, SMS)
- Critical condition warnings
- Automated response system

### Mobile Application
- Cross-platform mobile app (iOS & Android)
- Real-time dashboard
- Detailed sensor logs
- Customizable settings
- User-friendly interface

## Technology Stack

### Mobile App
- React Native
- TailwindCSS (NativeWind)
- React Navigation
- Vector Icons

### Backend
- Node.js
- Express
- MongoDB
- WebSocket for real-time updates

### IoT Components
- Temperature sensors
- Humidity sensors
- Moisture sensors
- Automated ventilation control
- Smart cooling system

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- React Native development environment
- Android Studio / Xcode

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/smart-granary-system.git
cd smart-granary-system
```

2. Install dependencies for the mobile app:
```bash
cd granary-mobile
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on Android/iOS:
```bash
# For Android
npm run android

# For iOS
npm run ios
```

## Project Structure

```
smart-granary-system/
├── granary-mobile/        # Mobile application
│   ├── src/
│   │   ├── screens/      # Screen components
│   │   ├── components/   # Reusable components
│   │   ├── navigation/   # Navigation configuration
│   │   └── utils/        # Utility functions
│   ├── App.js
│   └── package.json
├── backend/              # Backend server (if applicable)
└── README.md
```

## Configuration

### Sensor Thresholds
- Temperature: 26°C - 28°C (warning - critical)
- Humidity: 65% - 70% (warning - critical)
- Moisture: 15% - 16% (warning - critical)

### Notification Settings
- Push notifications
- Email alerts
- SMS notifications
- Customizable alert preferences

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Project Link: https://github.com/yourusername/smart-granary-system

## Acknowledgments

- React Native Community
- TailwindCSS Team
- All contributors who have helped this project grow 