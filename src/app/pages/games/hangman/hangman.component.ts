import { formsNames } from './../../../routes/routersNames';
import { GameStatsService } from './../../../services/game-stats.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { DialogFactoryService } from './../../../services/dialog-factory.service';
import { LoaderService } from './../../../services/loader.service';

@Component({
  selector: 'lb-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.sass'],
})
export class HangmanComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('menu') menu!: TemplateRef<any>;
  @ViewChild('endGame') endGame!: TemplateRef<any>;

  context!: CanvasRenderingContext2D;
  alphabet: string[] = [];
  wordlist: string[] = [];
  word!: string;
  index: number = 0;
  error: number = 0;
  bufferList: string[] = [];
  score: number = 0;

  constructor(
    private http: HttpClient,
    private dl: DialogFactoryService,
    private loader: LoaderService,
    private router: Router,
    private gameStats:GameStatsService
  ) {
    const alph = 'abcdefghijklmnñopqrstuvwxyz';
    this.alphabet = alph.split('').map((k) => k.toUpperCase());
    this.gameStats.setGame('hangman')
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.dl.open({template:this.menu})
    }, 100);
  }

  private drawError() {
    this.context = this.canvas.nativeElement.getContext('2d')!;
    const c = this.context;
    const baseColor = '#444444';
    switch (this.error) {
      case 1:
        //? head
        c.beginPath();
        c.fillStyle = baseColor;
        c.arc(222, 180, 30, 0, Math.PI * 2, true);
        c.fill();

        //? mouth
        c.beginPath();
        c.strokeStyle = 'white';
        c.lineWidth = 3;
        c.arc(222, 200, 10, 0, Math.PI, true);
        c.stroke();

        //? eyes
        c.beginPath();
        c.fillStyle = 'white';
        c.arc(210, 168, 3, 0, Math.PI * 2, true);
        c.fill();
        c.arc(234, 168, 3, 0, Math.PI * 2, true);
        c.fill();
        break;

      case 2:
        //? body
        c.beginPath();
        c.moveTo(222, 210);
        c.lineTo(222, 320);
        c.lineWidth = 8;
        c.strokeStyle = baseColor;
        c.stroke();
        break;

      case 3:
        //? right leg
        c.beginPath();
        c.strokeStyle = baseColor;
        c.moveTo(222, 320);
        c.lineTo(265, 420);
        c.stroke();
        break;

      case 4:
        //? left leg
        c.beginPath();
        c.strokeStyle = baseColor;
        c.moveTo(185, 420);
        c.lineTo(222, 320);
        c.stroke();
        break;

      case 5:
        //? right arm
        c.beginPath();
        c.strokeStyle = baseColor;
        c.moveTo(222, 235);
        c.lineTo(255, 320);
        c.stroke();
        break;

      case 6:
        //? left arm
        c.beginPath();
        c.strokeStyle = baseColor;
        c.moveTo(222, 235);
        c.lineTo(190, 320);
        c.stroke();
        break;
    }
  }

  private wordGenerator() {
    this.index = Math.floor(Math.random() * this.wordlist.length);

    while (this.bufferList.includes(this.wordlist[this.index])) {
      this.index = Math.floor(Math.random() * this.wordlist.length);
    }

    let letter = this.wordlist[this.index].split('');
    let result = this.wordlist[this.index];

    for (
      let index = 0;
      index < Math.floor(letter.length / 2); //Math.ceil(Math.random() * letter.length);
      index++
    ) {
      if (index != 0) letter = result.split('');

      let i = Math.ceil(Math.random() * letter.length);
      let char = letter[i];

      while (char == '_')
        char = letter[Math.ceil(Math.random() * letter.length)];

      const randomChar = char;
      const regex = new RegExp(`${randomChar}`, 'g');
      const r = result.replace(regex, '_');
      result = r;
    }
    this.word = result;
  }

  private wordList() {

    this.loader.show();
    this.wordlist = [];

    const api =
      'https://palabras-aleatorias-public-api.herokuapp.com/experimental/random';
    this.http.get<RootObject>(api).subscribe(
      (list) => {
        const wordFilter = this.removeAccents(list.body.Word);
        this.wordlist.push(wordFilter);
        const interval = setInterval(() => {
          if (this.wordlist.length > 0) {
            clearInterval(interval);
            this.loader.hide();
            this.wordGenerator();
          }
        }, 200);
      },
      () => {
        const api = 'https://random-word-api.herokuapp.com/word?number=3';
        this.http.get<string[]>(api).subscribe((list) => {
          console.log(list);
          this.wordlist = list;
          const interval = setInterval(() => {
            if (this.wordlist.length > 0) {
              clearInterval(interval);
              this.loader.hide();
              this.wordGenerator();
            }
          }, 200);
        });
      }
    );
  }

  showLetter(letter: string) {
    const result = this.wordlist[this.index].split('');
    const buffer = this.word;

    result.forEach((l, i) => {
      if (l.toLowerCase() == letter.toLowerCase()) {
        const word = this.word.split('');
        word[i] = l;
        this.word = word.join('');
      }
    });

    if (buffer === this.word) {
      this.error++;
      this.drawError();

      if (this.error == 6) 
        this.showEndGame()
    }

    if (this.wordlist[this.index].toLowerCase() == this.word.toLowerCase()) {
      this.bufferList.push(this.word.toLowerCase());
      this.score += this.word.length * 35;

      if (this.bufferList.length === this.wordlist.length) {
        this.bufferList = [];
        this.wordList();
        return;
      }

      this.wordGenerator();
    }
  }

  goBack() {
    const { SCORES } = formsNames
    this.dl.close()
    this.router.navigate([SCORES])
  }

  startGame(){
    this.dl.close()
    this.wordList();
    this.score = 0
  }

  private removeAccents(word: string) {
    return word.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  private showEndGame(){
    this.gameStats.saveState(this.score);
    this.dl.open({template:this.endGame})
  }
}

interface RootObject {
  api_owner: Apiowner;
  body: Body;
}

interface Body {
  Word: string;
  Definition: string;
  Author: string;
  ErrorMessage?: any;
  EncodingWebName: string;
  WordOrigin?: any;
  UrlDefinitionSource?: any;
  DefinitionMD: string;
  Related: any[];
}

interface Apiowner {
  author: string;
  cafecito: string;
  instagram: string;
  github: string;
  linkedin: string;
}
