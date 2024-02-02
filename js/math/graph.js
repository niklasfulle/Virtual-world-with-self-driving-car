class Graph {
  constructor(points = [], segments = []) {
    this.points = points;
    this.segments = segments;
  }

  tryAddPoint(point) {
    if (!this.containsPoint(point)) {
      this.addPoint(point);
      return true;
    }
    return false;
  }

  addPoint(point) {
    this.points.push(point);
  }

  containsPoint(point) {
    return this.points.find((p) => p.equals(point));
  }

  removePoint(point) {
    const segmentsToRemove = this.getSegmentsWithPoint(point);
    segmentsToRemove.forEach((s) => this.removeSegment(s));
    this.points.splice(this.points.indexOf(point), 1);
  }

  tryAddSegment(segment) {
    if (!this.containsSegment(segment)) {
      this.addSegment(segment);
      return true;
    }
    return false;
  }

  addSegment(segment) {
    this.segments.push(segment);
  }

  containsSegment(segment) {
    return this.segments.find((s) => s.equals(segment));
  }

  removeSegment(segment) {
    this.segments.splice(this.segments.indexOf(segment), 1);
  }

  getSegmentsWithPoint(point) {
    return this.segments.filter((s) => s.includes(point));
  }

  removeAll() {
    this.points = [];
    this.segments = [];
  }

  draw(ctx) {
    for (const seg of this.segments) {
      seg.draw(ctx, "black");
    }

    for (const point of this.points) {
      point.draw(ctx, 15, "black");
    }
  }
}
