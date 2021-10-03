import { SurveyComponent } from './../components/survey/survey.component';
import { Injectable, TemplateRef } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { DialogFactoryService } from './dialog-factory.service';
import { EGames } from './game-stats.service';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  user!: any;
  constructor(private db: AngularFirestore, private auth: AuthService) {
    setTimeout(() => {
      this.auth.user$.subscribe( result =>{
        this.user = result;
      })
    }, 100);
  }

  async saveSurvey(survey: ISurvey): Promise<boolean> {
      try {
        const ref: AngularFirestoreDocument<ISurvey> = this.db.doc<ISurvey>(
          `surveys/${this.db.createId()}`
        );
      
        ref.set({ ...survey, uid: this.user.uid }, { merge: true });
        if(await this.setSurveyLoaded())
          return Promise.resolve(true);
        else
          return Promise.resolve(false)
      } catch {
        return Promise.resolve(false);
      }
  }

  private async setSurveyLoaded() {
    try {
      const ref: AngularFirestoreDocument = this.db.doc(`users/${this.user.uid}`);

      ref.update({
        surveyComplete: true,
      });
      return Promise.resolve(true);
    } catch {
      return Promise.resolve(false);
    }
  }

}

export interface ISurvey {
  name: string;
  lastName: string;
  age: number;
  phone: string;
  favouriteGame: EGames;
  likePage: boolean;
  rating: number;
  uid?: string;
}
