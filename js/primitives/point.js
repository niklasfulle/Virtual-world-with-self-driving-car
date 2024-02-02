class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  equals(other) {
    return this.x === other.x && this.y === other.y;
  }

  draw(ctx, { size = 18, color = "black", outline = false, fill = false } = {}) {
    const rad = size / 2;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(this.x, this.y, rad, 0, 2 * Math.PI);
    ctx.fill();

    if (outline) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "red";
      ctx.arc(this.x, this.y, rad * 0.6, 0, 2 * Math.PI);
      ctx.stroke();
    }

    if (fill) {
      ctx.beginPath();
      ctx.fillStyle = "red";
      ctx.arc(this.x, this.y, rad * 0.4, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
}
