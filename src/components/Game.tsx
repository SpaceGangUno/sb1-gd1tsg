import React, { useEffect, useRef, useState } from 'react';
import Player from './Player';
import Platform from './Platform';
import Item from './Item';
import { GameState, Platform as PlatformType, Item as ItemType } from '../types/game';

const GRAVITY = 0.5;
const JUMP_FORCE = -12;
const MOVE_SPEED = 5;

const INITIAL_PLATFORMS: PlatformType[] = [
  { x: 0, y: 350, width: 800, height: 50 },
  { x: 200, y: 250, width: 100, height: 200 },
  { x: 400, y: 200, width: 100, height: 300 },
  { x: 600, y: 150, width: 100, height: 350 },
];

const INITIAL_ITEMS: ItemType[] = [
  { x: 350, y: 200, collected: false },
  { x: 450, y: 150, collected: false },
  { x: 150, y: 300, collected: false },
];

const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>({
    player: { x: 50, y: 200, vy: 0, onGround: false },
    platforms: INITIAL_PLATFORMS,
    items: INITIAL_ITEMS,
    keys: { left: false, right: false, up: false }
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newKeys = { ...gameState.keys };
      if (e.key === 'ArrowLeft' || e.key === 'a') newKeys.left = true;
      if (e.key === 'ArrowRight' || e.key === 'd') newKeys.right = true;
      if ((e.key === 'ArrowUp' || e.key === 'w' || e.key === ' ') && gameState.player.onGround) {
        newKeys.up = true;
        setGameState(prev => ({
          ...prev,
          player: { ...prev.player, vy: JUMP_FORCE },
          keys: newKeys
        }));
      } else {
        setGameState(prev => ({ ...prev, keys: newKeys }));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const newKeys = { ...gameState.keys };
      if (e.key === 'ArrowLeft' || e.key === 'a') newKeys.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd') newKeys.right = false;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === ' ') newKeys.up = false;
      setGameState(prev => ({ ...prev, keys: newKeys }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState.keys, gameState.player.onGround]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const gameLoop = () => {
      // Update player position
      let { x, y, vy } = gameState.player;
      const { keys } = gameState;

      if (keys.left) x -= MOVE_SPEED;
      if (keys.right) x += MOVE_SPEED;

      // Apply gravity
      vy += GRAVITY;
      y += vy;

      // Check platform collisions
      let onGround = false;
      gameState.platforms.forEach(platform => {
        if (y + 40 > platform.y && 
            y + 40 < platform.y + platform.height &&
            x + 20 > platform.x && 
            x < platform.x + platform.width) {
          y = platform.y - 40;
          vy = 0;
          onGround = true;
        }
      });

      // Check item collisions
      const newItems = [...gameState.items];
      gameState.items.forEach((item, index) => {
        if (!item.collected && 
            Math.abs(x - item.x) < 30 && 
            Math.abs(y - item.y) < 30) {
          newItems[index] = { ...item, collected: true };
          setScore(prev => prev + 100);
        }
      });

      // Update game state
      setGameState(prev => ({
        ...prev,
        player: { x, y, vy, onGround },
        items: newItems
      }));

      // Clear canvas
      ctx.fillStyle = '#87CEEB'; // Sky blue background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw clouds
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(100, 50, 20, 0, Math.PI * 2);
      ctx.arc(130, 50, 20, 0, Math.PI * 2);
      ctx.arc(160, 50, 20, 0, Math.PI * 2);
      ctx.fill();

      // Draw game elements
      gameState.platforms.forEach(platform => Platform.draw(ctx, platform));
      gameState.items.forEach(item => {
        if (!item.collected) Item.draw(ctx, item);
      });
      Player.draw(ctx, { x, y });

      // Draw score
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '20px "Press Start 2P", system-ui';
      ctx.fillText(`SCORE: ${score}`, 20, 30);

      requestAnimationFrame(gameLoop);
    };

    const animationId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationId);
  }, [gameState, score]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        className="w-full h-[400px] rounded-lg shadow-lg"
      />
    </div>
  );
};

export default Game;