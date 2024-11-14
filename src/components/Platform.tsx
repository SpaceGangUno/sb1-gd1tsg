const Platform = {
  draw(ctx: CanvasRenderingContext2D, platform: { x: number, y: number, width: number, height: number }) {
    // Draw main platform body
    ctx.fillStyle = '#8B4513'; // Brown color for platform
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);

    // Draw platform top
    ctx.fillStyle = '#228B22'; // Forest green for grass
    ctx.fillRect(platform.x, platform.y, platform.width, 10);

    // Add brick pattern
    ctx.strokeStyle = '#654321';
    ctx.lineWidth = 2;
    for (let i = 0; i < platform.width; i += 20) {
      for (let j = 0; j < platform.height; j += 20) {
        ctx.strokeRect(platform.x + i, platform.y + j, 20, 20);
      }
    }
  }
};

export default Platform;