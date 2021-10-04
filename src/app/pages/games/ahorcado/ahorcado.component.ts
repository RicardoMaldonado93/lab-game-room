import { map, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'lb-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.sass'],
})
export class AhorcadoComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  context!: CanvasRenderingContext2D;
  alphabet: string[] = [];
  wordlist: string[] = [];
  word!: string;
  index: number = 0;
  error: number = 0;
  bufferList: string[] = [];
  score: number = 0;

  constructor(private http: HttpClient) {
    const alph = 'abcdefghijklmnñopqrstuvwxyz';
    this.alphabet = alph.split('').map((k) => k.toUpperCase());
    this.wordList();
  }

  ngOnInit(): void {}

  drawError() {
    this.context = this.canvas.nativeElement.getContext('2d')!;
    const c = this.context;
    const baseColor = '#170F74';
    switch (this.error) {
      case 1:
        //? head
        c.beginPath();
        c.fillStyle = 'bisque';
        c.arc(222, 180, 30, 0, Math.PI * 2, true);
        c.fill();

        //? mouth
        c.beginPath();
        c.strokeStyle = 'red';
        c.lineWidth = 3;
        c.arc(222, 200, 10, 0, Math.PI, true);
        c.stroke();

        //? eyes
        c.beginPath();
        c.fillStyle = 'green';
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

  wordGenerator() {
    this.index = Math.floor(Math.random() * this.wordlist.length);

    while (this.bufferList.includes(this.wordlist[this.index])) {
      this.index = Math.floor(Math.random() * this.wordlist.length);
    }

    let letter = this.wordlist[this.index].split('');
    let result = this.wordlist[this.index];

    for (
      let index = 0;
      index < Math.ceil(Math.random() * letter.length);
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

  wordList() {
    const api = 'https://random-word-api.herokuapp.com/word?number=3';
    this.http.get<string[]>(api).subscribe((list) => {
      console.log(list);
      this.wordlist = list;
      const interval = setInterval(() => {
        if (this.wordlist.length > 0) {
          clearInterval(interval);
          this.wordGenerator();
        }
      }, 200);
    });
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
    }

    if (this.wordlist[this.index].toLowerCase() == this.word.toLowerCase()) {
      this.bufferList.push(this.word.toLowerCase());
      this.score++;
      if (this.bufferList.length === this.wordlist.length) {
        this.bufferList = [];
        this.wordList();
        return;
      }

      this.wordGenerator();
    }
  }
}
