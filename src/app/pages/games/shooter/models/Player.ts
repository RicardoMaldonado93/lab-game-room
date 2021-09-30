import Enemy from './Enemy';
import ObjectProperties, { IRender } from './ObjectProperties';
import Projectile from './Projectiles';
import Particles from './Particles';
import { gsap } from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin';

class Player extends ObjectProperties {
  private projectiles: Projectile[] = [];
  private enemies: Enemy[] = [];
  private particles: Particles[] = [];
  public life!: number;
  public score: number = 0;

  constructor(
    render: IRender,
    x: number,
    y: number,
    radius: number,
    color = 'red',
    life = 3
  ) {
    super(render, x, y, radius, color);
    this.life = life;
    gsap.registerPlugin(CSSPlugin);
    this.draw();
    this.animate();
    this.spawnEnemies();

    addEventListener('click', (event) => {
      const { width, height } = render.canvas.nativeElement;
      const { clientX, clientY } = event;

      const angle = Math.atan2(clientY - height / 2, clientX - width / 2);
      const velocity = {
        x: Math.cos(angle) * 4,
        y: Math.sin(angle) * 4,
      };

      this.projectiles.push(
        new Projectile(render, width / 2, height / 2, 5, 'white', velocity)
      );

    });
  }

  animate(): void {
    const animationId = requestAnimationFrame(() => {
      this.animate();
    });
    const { width, height } = this.render.canvas.nativeElement;
    const { context } = this.render;

    context.fillStyle = 'rgba(0,0,0,0.05)';
    context.fillRect(0, 0, width, height);
    this.draw();

    this.particles.forEach((particle, index) => {
      if (particle.alpha <= 0) {
        this.particles.slice(index, 1);
      } else {
        particle.update();
      }
    });

    this.projectiles.forEach((projectile, index) => {
      projectile.update();

      if (
        projectile.x + projectile.radius < 0 ||
        projectile.x - projectile.radius > width ||
        projectile.y + projectile.radius < 0 ||
        projectile.y - projectile.radius > height
      ) {
        setTimeout(() => {
          this.projectiles.splice(index, 1);
        }, 0);
      }
    });

    this.enemies.forEach((enemy, index) => {
      enemy.update();

      const dist = Math.hypot(this.x - enemy.x, this.y - enemy.y);
      if (dist - enemy.radius - this.radius < 1) {
        this.life = 0
        cancelAnimationFrame(animationId);
      }

      this.projectiles.forEach((projectile, indexPro) => {
        const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
        if (dist - enemy.radius - projectile.radius < 1) {
          this.projectiles.splice(indexPro,1)

          for (let i = 0; i < enemy.radius * 2; i++) {
            this.particles.push(
              new Particles(
                this.render,
                projectile.x,
                projectile.y,
                Math.random() * 2,
                enemy.color,
                {
                  x: (Math.random() - 0.5) * (Math.random() * 4),
                  y: (Math.random() - 0.5) * (Math.random() * 4),
                }
              )
            );
          }
          if (enemy.radius - 10 > 10) {
            this.score += 100;
            gsap.to(enemy, { radius: enemy.radius - 10 });
            setTimeout(() => {
              this.projectiles.slice(indexPro, 1);
            }, 0);
          } else {
            this.score += 250;

            setTimeout(() => {
              this.enemies.splice(index, 1);
              this.projectiles.slice(indexPro, 1);
            }, 0);
          }
        }
      });
    });
  }

  spawnEnemies() {
    setInterval(() => {
      const { width, height } = this.render.canvas.nativeElement;
      const radius = Math.random() * (30 - 10) + 10;
      const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
      let x, y;

      if (Math.random() < 0.5) {
        x = Math.random() < 0.5 ? 0 - radius : width + radius;
        y = Math.random() * height;
      } else {
        x = Math.random() * width;
        y = Math.random() < 0.5 ? 0 - radius : height + radius;
      }

      const speed = 1.25//Math.random() * (4 - 2) + 2
      const angle = Math.atan2(height / 2 - y, width / 2 - x);
      const velocity = {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed,
      };
      this.enemies.push(new Enemy(this.render, x, y, radius, color, velocity));
    }, 600);
  }
}

export default Player;
