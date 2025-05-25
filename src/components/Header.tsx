
import React from 'react';

const Header = () => {
  return (
    <header className="medical-gradient text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-xl">M</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Medi-Check.com</h1>
              <p className="text-blue-100 text-sm">Wellington Healthcare Navigator</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-100">Find the fastest care option</p>
            <p className="text-xs text-blue-200">Available 24/7</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
