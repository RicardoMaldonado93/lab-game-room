import { Router } from '@angular/router';
import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { IRender } from './models/ObjectProperties';
import Player from './models/Player';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { CSSPlugin } from 'gsap/CSSPlugin';
import { DialogFactoryService } from 'src/app/services/dialog-factory.service';
import { GameStatsService } from 'src/app/services/game-stats.service';

@Component({
  selector: 'lb-shooter',
  templateUrl: './shooter.component.html',
  styleUrls: ['./shooter.component.sass'],
})
export class ShooterComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  @ViewChild('menu') menu!: TemplateRef<any>;
  @ViewChild('endGame') endGame!: TemplateRef<any>;

  public context!: CanvasRenderingContext2D;
  public player!: Player;

  constructor(
    private df: DialogFactoryService,
    private gameStats: GameStatsService,
    private router: Router
  ) {
    gsap.registerPlugin(MotionPathPlugin, CSSPlugin);
    gameStats.setGame('earth-collapse')
  }

  ngOnInit(): void {
    this.canvas.nativeElement.width = innerWidth;
    this.canvas.nativeElement.height = innerHeight;
    this.context = this.canvas.nativeElement.getContext('2d')!;

    setTimeout(() => {
      this.df.open({ template: this.menu });
    }, 50);

  }

  private showmenu() {
    const menu = setInterval(() => {
      if (this.player?.life == 0) {
        clearInterval(menu);
        this.df.open({ template: this.endGame});
        this.gameStats.saveState(this.player.score)
      }
    }, 1000);
  }

  startGame() {
    this.df.close()
    const x = this.canvas.nativeElement.width / 2;
    const y = this.canvas.nativeElement.height / 2;
    const render: IRender = {
      canvas: this.canvas,
      context: this.context,
    };

    this.player = new Player(render, x, y, 15, 'white');
    this.showmenu();
  }

  goBack(){
    this.df.close();
    this.router.navigate(['home'])
  }
}
