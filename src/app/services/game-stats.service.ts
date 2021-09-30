import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService, IUserPublic } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameStatsService {
  private gameId!: games;
  private user!: IUserPublic;

  constructor(private auth: AuthService, private db: AngularFireDatabase) {
    this.auth.user$.subscribe((usr) => {
      this.user = usr;
    });
  }

  setGame(game:'hung'|'asked'|'minor-mayor'|'earth-collapse') {
    this.gameId = games[game];
  }

  saveState(score: number) {
    this.db.list<IStats>('game-scores').push({
      date: Date.now(),
      player: this.user.uid!,
      gameId: this.gameId,
      score: score,
    });
  }
}

interface IStats {
  player: string;
  date: number;
  score: number;
  gameId: games;
}

enum games {
  'hung',
  'asked',
  'minor-mayor',
  'earth-collapse',
}
