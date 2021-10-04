import { IState } from './../../services/chat.service';
import { gamesScores, GameStatsService } from 'src/app/services/game-stats.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lb-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.sass'],
})
export class ScoresComponent implements OnInit {
  scores!:gamesScores;

  constructor(public gs: GameStatsService) {
    // this.scores = gamesStats.bestScores;
  }

  ngOnInit(): void {
    
  }
}

