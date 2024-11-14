import React from 'react';
import { Compass } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-950/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-8 h-8 text-white" />
            <h1 className="text-2xl font-bold text-white">Gear Locker Adventure</h1>
          </div>
          <div className="text-white font-mono">
            High Score: <span className="text-yellow-400">0</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;