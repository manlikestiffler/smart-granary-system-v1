import React from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import cn from 'classnames';

function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={cn(
          "flex-1 p-4 sm:p-6 lg:p-8",
          "ml-[72px] md:ml-[240px]",
          "transition-all duration-300"
        )}
      >
        {children}
      </motion.main>
    </div>
  );
}

export default Layout; 