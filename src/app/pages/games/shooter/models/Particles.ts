import ObjectProperties, { IRender } from './ObjectProperties';

class Particles extends ObjectProperties {

  public alpha:number = 1
  public friction:number = 0.97

  constructor(
    render: IRender,
    x: number,
    y: number,
    radius: number,
    color = 'red',
    velocity = {x:0, y:0}
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

  draw(){
    const { context: c } = this.render;
    c.save()
    c.globalAlpha = this.alpha
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.restore()
  }

  update(){
    this.draw()
    this.velocity.x *= this.friction
    this.velocity.y *= this.friction
    this.x = this.x + this.velocity.x
    this.y = this.y + this.velocity.y 
    this.alpha -= 0.01
  }
 
}

export default Particles;
