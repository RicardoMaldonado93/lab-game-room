import ObjectProperties, { IRender } from './ObjectProperties';

class Projectile extends ObjectProperties {
 
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
    
  }

  

}

export default Projectile;
