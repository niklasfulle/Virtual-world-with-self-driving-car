class GraphEditor {
  constructor(canvas, graph) {
    this.canvas = canvas;
    this.graph = graph;
    this.ctx = this.canvas.getContext("2d");
    this.selectedPoint = null;
    this.hoveredPoint = null;

    this.#addEventListeners();
  }

  #addEventListeners() {
    this.canvas.addEventListener("mousedown", (e) => {
      const mouse = new Point(e.offsetX, e.offsetY);
      this.hoveredPoint = getNearestPoint(mouse, this.graph.points, 10);
      if (this.hoveredPoint) {
        this.selectedPoint = this.hoveredPoint;
        return;
      }
      this.graph.addPoint(mouse);
      this.selectedPoint = mouse;
    });
    this.canvas.addEventListener("mousemove", (e) => {
      const mouse = new Point(e.offsetX, e.offsetY);
      this.hoveredPoint = getNearestPoint(mouse, this.graph.points, 10);
    });
  }

  display() {
    this.graph.draw(this.ctx);
    if (this.hoveredPoint) {
      this.hoveredPoint.draw(this.ctx, { fill: true });
    }
    if (this.selectedPoint) {
      this.selectedPoint.draw(this.ctx, { outline: true });
    }
  }
}
