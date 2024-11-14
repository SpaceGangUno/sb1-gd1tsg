const Player = {
  draw(ctx: CanvasRenderingContext2D, { x, y }: { x: number, y: number }) {
    // Body
    ctx.fillStyle = '#FF0000'; // Red overalls
    ctx.fillRect(x, y, 40, 40);

    // Head
    ctx.fillStyle = '#FFA07A'; // Light salmon color for skin
    ctx.fillRect(x + 8, y - 10, 24, 24);

    // Cap
    ctx.fillStyle = '#4169E1'; // Royal blue for cap
    ctx.fillRect(x + 4, y - 10, 32, 8);

    // Eyes
    ctx.fillStyle = '#000000';
    ctx.fillRect(x + 20, y - 4, 4, 4);

    // Backpack (Gear Locker theme)
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(x - 5, y + 10, 10, 25);
  }
};

export default Player;