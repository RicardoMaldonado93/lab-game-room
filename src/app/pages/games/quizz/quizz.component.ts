import { formsNames } from './../../../routes/routersNames';
import { GameStatsService } from './../../../services/game-stats.service';
import { Router } from '@angular/router';
import { DialogFactoryService } from './../../../services/dialog-factory.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { LoaderService } from './../../../services/loader.service';
declare var countdown: any;
@Component({
  selector: 'lb-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.sass'],
})
export class QuizzComponent implements OnInit {
  @ViewChild('menu') menu!: TemplateRef<any>;
  @ViewChild('endGame') endGame!: TemplateRef<any>;
  question!: countries;
  countries: countries[] = [];
  options: string[] = [];
  view: boolean = false;
  init:boolean = false;
  buffer: string[] = [];
  status: 'correct' | 'error' | 'in-game' = 'in-game';
  score: number = 0;
  countdown!:moment.Moment
  clicked:boolean = false;

  constructor(
    private http: HttpClient,
    public spinner: LoaderService,
    private dl: DialogFactoryService,
    private router: Router,
    private gameStats: GameStatsService
  ) {
    this.gameStats.setGame('quizz');
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.dl.open({ template: this.menu });
    }, 200);
  }

  gameInit() {
    this.init = true
    this.getCountries();
    this.startGame();
  }

  private getCountries() {
    const api = 'https://restcountries.com/v2/all?fields=name,flag';
    this.spinner.show();
    this.http.get<countries[]>(api).subscribe((data) => {
      this.countries = data;
      console.log(this.countries);
    });
  }

  private getNewCountry() {
    let index = Math.ceil(Math.random() * this.countries.length);

    while (this.buffer.includes(this.countries[index].name)) {
      index = Math.ceil(Math.random() * this.countries.length);
    }

    this.question = this.countries[index];
    this.options.push(this.question.name);
    this.generateOptions();

  }

  private generateOptions() {
    for (let index = 0; index < 3; index++) {
      let i = Math.ceil(Math.random() * this.countries.length);
      while (
        !this.countries[i] ||
        this.options.includes(this.countries[i].name) ||
        this.question.name === this.countries[i].name
      ) {
        i = Math.ceil(Math.random() * this.countries.length);
      }
      this.options.push(this.countries[i].name);
      this.options.sort(() => {
        return Math.random() - 0.5;
      });
    }
  }

  option(country: string) {
    console.log(country);
    this.clicked = true;
    this.buffer.push(country);
    if (country === this.question.name) {
      this.status = 'correct';
      this.score += 150;
      this.setTimer('add')
    } else {
      this.status = 'error';
      this.setTimer('remove')
    }

    this.animated();
  }

  private animated() {
    const id = this.status == 'error' ? 'incorrect' : 'correct';
    const feedback = document.getElementById(id);
    const flag = document.getElementById('flag');

    feedback?.classList.remove('animate__rubberBand');
    feedback?.classList.add('animate__fadeOut', 'animate__slow');
    flag?.classList.remove('animate__fadeIn');
    flag?.classList.add('animate__fadeOut');

    setTimeout(() => {
      this.question = { flag: '', name: '' };
      this.options = [];
      this.getNewCountry();
      this.status = 'in-game';
      feedback?.classList.add('animate__rubberBand');
      feedback?.classList.remove('animate__fadeOut', 'animate__slow');
      flag?.classList.remove('animate__fadeOut');
      flag?.classList.add('animate__fadeIn');
      this.clicked = false
    }, 1100);
  }

  private initTimer() {
    
    this.countdown = moment(Date.now()).add(5, 'minute');

    const timer = setInterval(() => {
      const diff = this.countdown.diff(Date.now());
      document.getElementById('timer')!.innerHTML = moment
        .utc(diff)
        .format('mm:ss');

      if (diff <= 0) {
        clearInterval(timer);
        document.getElementById('timer')!.innerHTML = '00:00';
        this.gameOver();
      }
    });
  }

  private setTimer(op: 'add'|'remove'){
    const time = {
      add:  moment(this.countdown).add(10, 'second'),
      remove: moment(this.countdown).subtract(20, 'second'),
    }

    this.countdown = time[op]
  }
  

  startGame() {
    this.score = 0;
    this.options = []
    this.dl.close();
    const interval = setInterval(() => {
      if (this.countries.length > 0) {
        clearInterval(interval);
        this.getNewCountry();
        setTimeout(() => {
          this.view = true;
          this.spinner.hide();
        }, 1000);
      }
    }, 100);

    this.initTimer();
  }

  gameOver() {
    this.gameStats.saveState(this.score);
    this.dl.open({ template: this.endGame });
  }

  goBack() {
    const { SCORES } = formsNames;
    this.dl.close()
    this.router.navigate([`${SCORES}`])
  }
}

interface countries {
  flag: string;
  name: string;
}
