const Item = {
  draw(ctx: CanvasRenderingContext2D, item: { x: number, y: number }) {
    // Draw gear coin
    ctx.fillStyle = '#FFD700'; // Gold color
    ctx.beginPath();
    ctx.arc(item.x, item.y, 15, 0, Math.PI * 2);
    ctx.fill();

    // Draw gear teeth
    ctx.fillStyle = '#DAA520'; // Darker gold for teeth
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const x1 = item.x + Math.cos(angle) * 15;
      const y1 = item.y + Math.sin(angle) * 15;
      ctx.beginPath();
      ctx.arc(x1, y1, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw center hole
    ctx.fillStyle = '#B8860B';
    ctx.beginPath();
    ctx.arc(item.x, item.y, 5, 0, Math.PI * 2);
    ctx.fill();
  }
};

export default Item;