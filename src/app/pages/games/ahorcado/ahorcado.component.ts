import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lb-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.sass']
})
export class AhorcadoComponent implements OnInit {

  alphabet:string[] = [];

  constructor() { 
    const alph = "abcdefghijklmnñopqrstuvwxyz";

    this.alphabet = alph.split('').map( k => k.toUpperCase())

    console.log(this.alphabet)
  }

  ngOnInit(): void {
  }

}
