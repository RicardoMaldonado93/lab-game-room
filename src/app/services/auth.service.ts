import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { formsNames } from '../routes/routersNames';
import * as inicialSprites from '@dicebear/avatars-initials-sprites';
import { createAvatar } from '@dicebear/avatars/';

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

  async loginWithEmailAndPassword(credencials: ICredentials) {
    !credencials && new Error('credentials cannot be null');
    const { user, pass } = credencials;
    const userCredentials: any = await this.auth.signInWithEmailAndPassword(
      user,
      pass
    );

    this.auth.updateCurrentUser(userCredentials?.user);
    this.getDataUser(userCredentials?.uid).subscribe((data) => {
      console.log(userCredentials.uid, data);
    });
    return Promise.resolve(true);
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
    console.log({ uid, email, displayName, photoURL });

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
    };

    console.log(data);
    return userRef.set(data, { merge: true });
  }

  getDataUser(uid: string) {
    return this.firestore.collection('users').doc(uid).snapshotChanges();
  }

  private generateAvatarInicials(firstName: string, lastName: string) {
    return createAvatar(inicialSprites, { seed: `${firstName}-${lastName}` });
  }

  logOut() {
    const { LOGIN } = formsNames;
    this.auth.signOut();
    this.router.navigate([`/${LOGIN}`]);
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
}

export interface IUserPublic {
  uid?: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
}
