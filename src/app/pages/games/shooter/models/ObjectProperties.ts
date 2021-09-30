import { ElementRef } from '@angular/core';
abstract class ObjectProperties {
  public x!: number;
  public y!: number;
  public radius!: number;
  public color!: string;
  public render!: IRender;
  public velocity!: { x: number; y: number };

  constructor(
    render: IRender,
    x: number,
    y: number,
    radius: number,
    color = 'red',
    velocity = { x: 0, y: 0 }
  ) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.render = render;
  }

  protected draw() {
    const { context: c } = this.render;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  abstract animate(): void;

  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

export default ObjectProperties;

export interface IRender {
  context: CanvasRenderingContext2D;
  canvas: ElementRef<HTMLCanvasElement>;
}
