import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/compat/firestore';
import * as inicialSprites from '@dicebear/avatars-initials-sprites';
import { createAvatar } from '@dicebear/avatars/';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateCurrentUser } from 'firebase/auth';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<any>;

  constructor(
    private auth: AngularFireAuth,
    private store: AngularFirestore,
  ) {
    this.user$ = this.auth.authState.pipe(
      switchMap((user) => {
        if (user)
          return this.store.doc<IUser>(`users/${user.uid}`).valueChanges();
        else return of(null);
      })
    );
  }

  async createNewUserWithEmailAndPassword(
    user: IUser
  ): Promise<{ status: boolean; message: string }> {

    const fire: any = getAuth();
    const { email, password } = user;
    const result = await
      createUserWithEmailAndPassword(fire, email, password!)
        .then(
          (data) => {
            const { uid } = data.user
            this.updateDataUser({ ...user, uid })
            return Promise.resolve({ status: true, message: 'OK' });
          },
          (err) => {
            return Promise.resolve({ status: false, message: err.code.replace("auth/", '') });
          }
        )
        .catch((e) => {
          throw new Error(e);
        });

    return Promise.resolve(result);

  }

  async loginWithEmailAndPassword(credencials: ICredentials): Promise<{ status: boolean, message: string }> {

    const fire: any = getAuth();
    const { user, pass } = credencials;
    const result = await signInWithEmailAndPassword(fire, user, pass)
      .then(
        (data) => {
          const { user } = data;
          const { email, uid } = user;
          updateCurrentUser(fire, user);
          this.setLog({ email: email!, uid })
          return Promise.resolve({ status: true, message: 'OK' });
        },
        (err) => {

          return Promise.resolve({ status: false, message: err.code.replace("auth/", '') });
        }
      )
      .catch((e) => {
        throw new Error(e);
      });
    return Promise.resolve(result);
  }

  private updateDataUser({ uid, email, displayName, photoURL, firstName, lastName, }: any) {
    if (!photoURL)
      photoURL = this.generateAvatarInicials(firstName!, lastName!);

    const userRef: AngularFirestoreDocument<IUser> = this.store.doc(
      `users/${uid}`
    );

    const data: IUser = {
      uid,
      email,
      displayName,
      photoURL,
      firstName,
      lastName,
      date: moment().format(),
    };
    return userRef.set(data, { merge: true });
  }

  private generateAvatarInicials(firstName: string, lastName: string) {
    return createAvatar(inicialSprites, { seed: `${firstName}-${lastName}` });
  }

  private setLog({ email, uid }: IUser) {
    const logsRef: AngularFirestoreDocument<any> = this.store.doc(
      `logs/${this.store.createId()}`
    );
    const data = {
      email,
      uid,
      date: moment().format(),
    };

    logsRef.set(data, { merge: true });
  }

  async logOut() {
    await this.auth.signOut()
  }

  authState() {
    return this.auth.authState;
  }

  async getUser(){
    return await this.auth.user.toPromise()
  }
}

interface ICredentials {
  user: string;
  pass: string;
  displayName?: string;
}

interface IUser {
  uid?: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  date?: string;
  surveyComplete?:boolean
}

export interface IUserPublic {
  uid?: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  surveyComplete?:boolean
}

