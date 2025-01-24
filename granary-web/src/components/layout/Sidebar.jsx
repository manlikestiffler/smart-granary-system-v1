import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  Bell,
  Settings,
  Info,
  ChevronLeft,
  ChevronRight,
  Wheat
} from 'lucide-react';
import { cn } from '@/lib/utils';
import useMediaQuery from '@/hooks/useMediaQuery';

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    setIsCollapsed(isMobile);
  }, [isMobile]);

  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { path: '/logs', name: 'Data Logs', icon: FileText },
    { path: '/alerts', name: 'Alerts', icon: Bell },
    { path: '/settings', name: 'Settings', icon: Settings },
    { path: '/about', name: 'About', icon: Info },
  ];

  const sidebarVariants = {
    expanded: { width: '240px' },
    collapsed: { width: '72px' }
  };

  return (
    <motion.div
      initial={isMobile ? "collapsed" : "expanded"}
      animate={isCollapsed ? 'collapsed' : 'expanded'}
      variants={sidebarVariants}
      className={cn(
        "fixed left-0 top-0 h-screen bg-white border-r border-gray-100",
        "flex flex-col transition-all duration-300 z-50",
        "overflow-hidden"
      )}
    >
      {/* Logo Section */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: isCollapsed ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <Wheat className="w-8 h-8 text-blue-600" />
          </motion.div>
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isCollapsed ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "font-semibold text-lg text-gray-900",
              isCollapsed && "hidden"
            )}
          >
            Smart Granary
          </motion.div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-xl transition-all duration-200",
                    "hover:bg-gray-50 group relative",
                    isActive && "bg-blue-50 text-blue-600"
                  )}
                >
                  <Icon className={cn(
                    "w-5 h-5",
                    !isActive && "text-gray-500 group-hover:text-gray-700"
                  )} />
                  <motion.span
                    initial={{ opacity: 1 }}
                    animate={{ opacity: isCollapsed ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "font-medium",
                      !isActive && "text-gray-700",
                      isCollapsed && "hidden"
                    )}
                  >
                    {item.name}
                  </motion.span>
                  
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {item.name}
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Collapse Button */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "w-full flex items-center justify-center p-2 rounded-xl",
            "text-gray-500 hover:text-gray-700 hover:bg-gray-50",
            "transition-all duration-200"
          )}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <div className="flex items-center space-x-2">
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm">Collapse</span>
            </div>
          )}
        </button>
      </div>
    </motion.div>
  );
}

export default Sidebar; 