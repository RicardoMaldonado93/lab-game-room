import { formsNames } from './../../../routes/routersNames';
import { Router } from '@angular/router';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DialogFactoryService } from 'src/app/services/dialog-factory.service';
import { GameStatsService } from '../../../services/game-stats.service';

@Component({
  selector: 'lb-minor-mayor',
  templateUrl: './minor-mayor.component.html',
  styleUrls: ['./minor-mayor.component.sass'],
})
export class MinorMayorComponent implements OnInit {
  @ViewChild('gameOver') gameOver!: TemplateRef<any>;
  @ViewChild('start') start!: TemplateRef<any>;

  private numbers: Array<number> = [];
  number1!: number;
  number2!: number;
  viewResult: boolean = false;
  score: number = 0;
  life: number = 3;
  disabledButtons: boolean = true;
  disableRetryButton:boolean = true;
  playNewGame:boolean = false;

  constructor(
    private dialog: DialogFactoryService,
    private gameStats: GameStatsService,
    private router:Router
  ) {
    for (let index = 0; index <= 100; index++) {
      this.numbers.push(index);
    }
    this.gameStats.setGame('minor-mayor');
  }


  ngOnInit(): void {
    setTimeout(() => {
      this.dialog.open({ template: this.start })
    }, 600);
  }

  choice(choice: any) {
    this.viewResult = true;
    this.disabledButtons = true;
    const op: any = {
      mayor: this.number1 < this.number2,
      minor: this.number1 > this.number2,
    };

    this.showCard(cards.result, 600);
    setTimeout(() => {
      this.scoring(op[choice]);
      if (this.life == 0) this.endGame();
      else this.reset();
    }, 2000);

  }

  retry() {
    this.dialog.close();
    this.score = 0;
    this.life = 3;
    this.startGame();
  }

  playGame(){
    this.dialog.close();
    this.playNewGame = true;
    this.startGame()
  }

  returnLater(){
    const { SCORES } = formsNames
    this.dialog.close();
    this.router.navigate([SCORES])
  }

  private startGame() {
    this.generateRandomNumber();
    this.showCard(cards.reference);
    setTimeout(() => {
      this.disabledButtons = false;
      this.disableRetryButton = true;
    }, 3000);
  }

  private generateRandomNumber() {
    const randomNumber = ()=> this.numbers[Math.floor(Math.random() * this.numbers.length)];

    this.number1 = randomNumber();
    this.number2 = randomNumber();
      
    while (this.number1 === this.number2) {
      this.number2 = randomNumber()
    }
    
  }

  private hiddeCard(name: string, delay = 2000) {
    if (!name) return;

    setTimeout(() => {
      const cardReference = document.getElementById(name);
      cardReference?.classList.add('card-container-hide');
      cardReference?.classList.remove('card-container-show');
      this.viewResult = false;
    }, delay);
  }

  private showCard(name: string, delay = 2000) {
    if (!name) return;

    setTimeout(() => {
      const cardReference = document.getElementById(name);
      cardReference?.classList.add('card-container-show');
      cardReference?.classList.remove('card-container-hide');
    }, delay);
  }

  

  private reset(delay = 3000) {
    this.hiddeCard(cards.reference);
    this.hiddeCard(cards.result);

    setTimeout(() => {
      this.generateRandomNumber();
      this.showCard(cards.reference, 0);
      this.disabledButtons = false;
    }, delay);
  }

  private scoring(result: boolean) {
    result && (this.score += 25);
    !result && this.life--;
  }

  private endGame(delay = 2500) {
    
    setTimeout(() => {
      this.gameStats.saveState(this.score);
      this.hiddeCard(cards.reference);
      this.hiddeCard(cards.result);
      this.disabledButtons = true;
      this.dialog.open({ template: this.gameOver });
      setTimeout(() => {
        this.disableRetryButton = false
      }, delay);
    }, delay);
    
  }
  
}

enum cards {
  reference = 'card-reference',
  result = 'card-result',
}
