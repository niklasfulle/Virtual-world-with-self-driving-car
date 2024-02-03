class Viewport {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.zoom = 1;
    this.offset = new Point(0, 0);

    this.drag = {
      active: false,
      start: new Point(0, 0),
      end: new Point(0, 0),
      offset: new Point(0, 0),
    };

    this.#addEventListeners();
  }

  getMouse(evt) {
    return new Point(evt.offsetX * this.zoom, evt.offsetY * this.zoom);
  }

  #addEventListeners() {
    this.canvas.addEventListener("mousewheel", this.#handleMouseWheel.bind(this));
    this.canvas.addEventListener("mousedown", this.#handleMouseDown.bind(this));
    this.canvas.addEventListener("mousemove", this.#handleMouseMove.bind(this));
    this.canvas.addEventListener("mouseup", this.#handleMouseUp.bind(this));
  }

  #handleMouseWheel(evt) {
    const dir = Math.sign(evt.deltaY);
    const step = 0.1;
    this.zoom += dir * step;
    this.zoom = Math.max(1, Math.min(5, this.zoom));
  }

  #handleMouseDown(evt) {
    // middle button
    if (evt.button == 1) {
      this.drag.start = this.getMouse(evt);
      this.drag.active = true;
    }
  }

  #handleMouseMove(evt) {
    if (this.drag.active) {
      this.drag.end = this.getMouse(evt);
      this.drag.offset = subtract(this.drag.end, this.drag.start);
    }
  }

  #handleMouseUp(evt) {
    if (this.drag.active) {
      this.offset = add(this.offset, this.drag.offset);
      this.drag = {
        active: false,
        start: new Point(0, 0),
        end: new Point(0, 0),
        offset: new Point(0, 0),
      };
    }
  }
}
