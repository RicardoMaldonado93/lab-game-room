import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import * as inicialSprites from '@dicebear/avatars-initials-sprites';
import { createAvatar } from '@dicebear/avatars/';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<any>;

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.auth.authState.pipe(
      switchMap((user) => {
        if (user)
          return this.firestore.doc<IUser>(`users/${user.uid}`).valueChanges();
        else return of(null);
      })
    );
  }

  createNewUserWithEmailAndPassword(user: IUser): Promise<boolean> {
    try{
      const { email, password } = user;
      this.auth
        .createUserWithEmailAndPassword(email, password!)
        .then((data) => {
          const { user: userRegister } = data;
          const { uid } = userRegister!;
          this.updateDataUser({ uid, ...user });
        })
        .catch((err) => console.error);
  
      return Promise.resolve(true);

    }
    catch(err){
      return Promise.resolve(false)
    }
  }

  async loginWithEmailAndPassword(credencials: ICredentials) {
    try {
      const { user, pass } = credencials;
      const userCredentials: any = await this.auth.signInWithEmailAndPassword(
        user,
        pass
      );

      this.auth.updateCurrentUser(userCredentials?.user);
      const { email, uid, firstName, lastName } = userCredentials.user
      console.log(userCredentials.user)
      this.setLog({email, uid})
   
      return Promise.resolve(true);
    } catch (error) {
      return Promise.resolve(false);
    }
  }

  private updateDataUser({
    uid,
    email,
    displayName,
    photoURL,
    firstName,
    lastName,
  }: any) {
    if (!photoURL)
      photoURL = this.generateAvatarInicials(firstName!, lastName!);

    const userRef: AngularFirestoreDocument<IUser> = this.firestore.doc(
      `users/${uid}`
    );

    const data: IUser = {
      uid,
      email,
      displayName,
      photoURL,
      firstName,
      lastName,
      date: moment().format()
    };

    return userRef.set(data, { merge: true });
  }

  private generateAvatarInicials(firstName: string, lastName: string) {
    return createAvatar(inicialSprites, { seed: `${firstName}-${lastName}` });
  }

  private setLog({ email, uid }:IUser){
    const logsRef: AngularFirestoreDocument<any> = this.firestore.doc(`logs/${this.firestore.createId()}`);

    const data = {
      email,
      uid,
      date: moment().format()
    }
    
    logsRef.set(data,{merge:true});
  }

  logOut() {
    this.auth.signOut();
  }

  authState() {
    return this.auth.authState;
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
  somethingCustom?: string;
  password?: string;
  date?:string
}

export interface IUserPublic {
  uid?: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
}
