import React from 'react';
import { Compass, Mountain, Backpack, ShoppingBag } from 'lucide-react';
import Game from './components/Game';
import Header from './components/Header';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-800">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Game />
          <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Compass className="w-6 h-6" />
              How to Play
            </h2>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Mountain className="w-4 h-4" /> Use arrow keys or WASD to move
              </li>
              <li className="flex items-center gap-2">
                <Backpack className="w-4 h-4" /> Space to jump
              </li>
              <li className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" /> Collect gear to score points
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;