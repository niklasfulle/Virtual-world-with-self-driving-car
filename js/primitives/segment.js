class Segment {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  }

  equals(other) {
    return this.includes(other.p1) && this.includes(other.p2);
  }

  includes(point) {
    return this.p1.equals(point) || this.p2.equals(point);
  }

  draw(ctx, color = "black") {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.stroke();
  }
}
