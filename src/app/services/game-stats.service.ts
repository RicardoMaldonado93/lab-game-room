import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService, IUserPublic } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class GameStatsService {
  private gameId!: EGames;
  private user!: IUserPublic;
  public bestScores!:gamesScores;
  constructor(private auth: AuthService, private db: AngularFireDatabase) {
    this.auth.user$.subscribe((usr) => {
      this.user = usr;
    });
    this.getScores();
  }

  setGame(game: 'hangman' | 'quizz' | 'minor-mayor' | 'earth-collapse') {
    this.gameId = EGames[game];
  }

  saveState(score: number) {
    this.db.list<IStats>('game-scores').push({
      date: Date.now(),
      player: this.user.displayName!,
      gameId: this.gameId,
      score: score,
    });
  }

  private getScores() {
    const path = 'game-scores';
    this.db
      .list<IStats>(path, (ref) => ref.orderByChild('scores'))
      .valueChanges()
      .subscribe((m) => {
        let minorOrMayor: IStats[] = [];
        let earthCollapse: IStats[] = [];
        let quizz: IStats[] = [];
        let hangman: IStats[] = [];
        m.forEach((r) => {
          if (r.gameId == EGames['earth-collapse']) earthCollapse.push(r);
          if (r.gameId == EGames['minor-mayor']) minorOrMayor.push(r);
          if (r.gameId == EGames['quizz']) quizz.push(r);
          if (r.gameId == EGames['hangman']) hangman.push(r);
        });

        minorOrMayor = this.orderByScore(minorOrMayor);
        earthCollapse = this.orderByScore(earthCollapse);
        quizz = this.orderByScore(quizz);
        hangman = this.orderByScore(hangman);
        this.bestScores = { minorOrMayor, earthCollapse, quizz, hangman };
      });
  }

  private orderByScore(array: IStats[]) {
    return array.sort((a, b) => {
      return b.score - a.score;
    }).slice(0,5);
  }
}

interface IStats {
  player: string;
  date: number;
  score: number;
  gameId: EGames;
}

export enum EGames {
  'hangman',
  'quizz',
  'minor-mayor',
  'earth-collapse',
}
export interface gamesScores {
  minorOrMayor: IStats[];
  earthCollapse: IStats[];
  quizz: IStats[];
  hangman: IStats[];
}
