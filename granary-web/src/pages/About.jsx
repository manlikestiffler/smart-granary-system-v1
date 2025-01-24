import React from 'react';
import { motion } from 'framer-motion';
import {
  Server,
  Shield,
  Cpu,
  BarChart3,
  Users,
  Github,
  Mail,
  Globe,
  Award,
  CheckCircle2
} from 'lucide-react';

function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const features = [
    {
      icon: Server,
      title: "Real-time Monitoring",
      description: "Advanced sensor network providing continuous monitoring of grain storage conditions"
    },
    {
      icon: Shield,
      title: "Proactive Protection",
      description: "Early warning system to prevent grain spoilage and maintain quality"
    },
    {
      icon: BarChart3,
      title: "Data Analytics",
      description: "Comprehensive analytics and reporting for informed decision making"
    },
    {
      icon: Cpu,
      title: "Smart Automation",
      description: "Automated control systems for optimal storage conditions"
    }
  ];

  const stats = [
    { value: "99.9%", label: "System Uptime" },
    { value: "24/7", label: "Monitoring" },
    { value: "<2min", label: "Response Time" },
    { value: "15+", label: "Integrated Sensors" }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-4">Smart Granary System</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Advanced IoT-based grain storage monitoring and management system designed 
          to ensure optimal storage conditions and prevent losses.
        </p>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-white rounded-xl shadow-sm p-6 text-center"
          >
            <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
            <p className="text-gray-600 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Features Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <feature.icon className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* System Overview */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm p-8 mb-16"
      >
        <h2 className="text-2xl font-bold mb-6">System Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Key Capabilities</h3>
            <ul className="space-y-3">
              {[
                "Temperature & Humidity Monitoring",
                "Moisture Content Analysis",
                "Automated Ventilation Control",
                "Real-time Alert System",
                "Data Analytics & Reporting",
                "Mobile Accessibility"
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center space-x-2 text-gray-600"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Technical Specifications</h3>
            <div className="space-y-4 text-gray-600">
              <p>• Sensor Accuracy: ±0.1°C (Temperature), ±2% (Humidity)</p>
              <p>• Data Sampling Rate: Every 5 minutes</p>
              <p>• Wireless Communication: WiFi / LoRaWAN</p>
              <p>• Battery Life: Up to 12 months</p>
              <p>• Storage Capacity: Up to 1 million data points</p>
              <p>• API Integration: REST API / WebSocket</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-blue-50 rounded-xl p-8 text-center"
      >
        <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
        <p className="text-gray-600 mb-8">
          Learn more about how Smart Granary can help optimize your grain storage operations
        </p>
        <div className="flex justify-center space-x-6">
          <a
            href="mailto:contact@smartgranary.com"
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
          >
            <Mail className="w-5 h-5" />
            <span>Contact Us</span>
          </a>
          <a
            href="https://github.com/smartgranary"
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
          >
            <Github className="w-5 h-5" />
            <span>GitHub</span>
          </a>
          <a
            href="https://smartgranary.com"
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
          >
            <Globe className="w-5 h-5" />
            <span>Website</span>
          </a>
        </div>
      </motion.div>

      {/* Copyright Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-16 pt-8 border-t border-gray-200"
      >
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center space-x-2">
            <Award className="w-6 h-6 text-blue-500" />
            <span className="text-lg font-semibold">Smart Granary</span>
          </div>
          
          <div className="text-sm text-gray-500 space-y-2">
            <p>© {new Date().getFullYear()} Smart Granary. All rights reserved.</p>
            <p>Version 1.0.0</p>
            <p className="text-xs">
              Developed by Computer Engineering Class of 2025 <br />
              Chinhoyi University of Technology <br />
              Smart Granary System Project
            </p>
          </div>

          <div className="mt-4 text-xs text-gray-400">
            <p>
              A final year project developed and maintained by the Computer Engineering class <br />
              Department of Computer Engineering and Informatics
            </p>
          </div>

          <div className="flex justify-center space-x-8 text-sm text-gray-500 mt-4">
            <a href="/documentation" className="hover:text-blue-600">Documentation</a>
            <a href="/contributors" className="hover:text-blue-600">Contributors</a>
            <a href="/licenses" className="hover:text-blue-600">Licenses</a>
          </div>
        </div>
      </motion.div>

    </div>
  );
}

export default About; 