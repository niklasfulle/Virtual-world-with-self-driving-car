class GraphEditor {
  constructor(viewport, graph) {
    this.viewport = viewport;
    this.canvas = viewport.canvas;
    this.graph = graph;

    this.ctx = this.canvas.getContext("2d");

    this.selectedPoint = null;
    this.hoveredPoint = null;
    this.dragging = false;
    this.mouse = null;
  }

  enable() {
    this.#addEventListeners();
  }

  disable() {
    this.#removeEventListeners();
    this.selectedPoint = null;
    this.hoveredPoint = null;
  }

  #addEventListeners() {
    this.boundMouseDown = this.#handleMouseDown.bind(this);
    this.boundMouseMove = this.#handleMouseMove.bind(this);
    this.boundMouseUp = () => (this.dragging = false);
    this.boundContextMenu = (evt) => evt.preventDefault();
    this.canvas.addEventListener("mousedown", this.boundMouseDown);
    this.canvas.addEventListener("mousemove", this.boundMouseMove);
    this.canvas.addEventListener("mouseup", this.boundMouseUp);
    this.canvas.addEventListener("contextmenu", this.boundContextMenu);
  }

  #removeEventListeners() {
    this.canvas.removeEventListener("mousedown", this.boundMouseDown);
    this.canvas.removeEventListener("mousemove", this.boundMouseMove);
    this.canvas.removeEventListener("mouseup", this.boundMouseUp);
    this.canvas.removeEventListener("contextmenu", this.boundContextMenu);
  }

  #handleMouseDown(evt) {
    if (evt.button == 2) {
      // right click
      if (this.selectedPoint) {
        this.selectedPoint = null;
      } else if (this.hoveredPoint) {
        this.#removePoint(this.hoveredPoint);
      }
    }
    if (evt.button == 0) {
      // left click
      if (this.hoveredPoint) {
        this.#select(this.hoveredPoint);
        this.dragging = true;
        return;
      }
      this.graph.addPoint(this.mouse);
      this.#select(this.mouse);
      this.hoveredPoint = this.mouse;
    }
  }

  #handleMouseMove(evt) {
    this.mouse = this.viewport.getMouse(evt, true);
    this.hoveredPoint = getNearestPoint(
      this.mouse,
      this.graph.points,
      10 * this.viewport.zoom
    );
    if (this.dragging == true) {
      this.selectedPoint.x = this.mouse.x;
      this.selectedPoint.y = this.mouse.y;
    }
  }

  #select(point) {
    if (this.selectedPoint) {
      this.graph.tryAddSegment(new Segment(this.selectedPoint, point));
    }
    this.selectedPoint = point;
  }

  #removePoint(point) {
    this.graph.removePoint(point);
    this.hoveredPoint = null;
    if (this.selectedPoint == point) {
      this.selectedPoint = null;
    }
  }

  dispose() {
    this.graph.dispose();
    this.selected = null;
    this.hovered = null;
  }

  display() {
    this.graph.draw(this.ctx);
    if (this.hoveredPoint) {
      this.hoveredPoint.draw(this.ctx, { fill: true });
    }
    if (this.selectedPoint) {
      const intent = this.hoveredPoint ? this.hoveredPoint : this.mouse;
      new Segment(this.selectedPoint, intent).draw(ctx, { dash: [3, 3] });
      this.selectedPoint.draw(this.ctx, { outline: true });
    }
  }
}
