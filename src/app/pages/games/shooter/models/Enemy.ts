import { ViewChild } from '@angular/core';
import ObjectProperties, { IRender } from './ObjectProperties';

class Enemy extends ObjectProperties {
  constructor(
    render: IRender,
    x: number,
    y: number,
    radius: number,
    color = 'red',
    velocity = { x: 0, y: 0 }
  ) {
    super(render, x, y, radius, color, velocity);
  }

  animate(): void {
    requestAnimationFrame(() => {
      this.animate();
    });
    this.render.context.clearRect(
      0,
      0,
      this.render.canvas.nativeElement.width,
      this.render.canvas.nativeElement.height
    );
    this.draw();
  }
}

export default Enemy;
