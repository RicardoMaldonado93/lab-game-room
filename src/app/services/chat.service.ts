import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService, IUserPublic } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  chats: IChat[] = [];
  user!:IUserPublic;

  constructor(
    private auth: AuthService,
    private store: AngularFirestore,
    private db: AngularFireDatabase
  ) {
    this.auth.user$.subscribe( usr => this.user = usr )
  }

  loadChats() {
    return this.db
      .list<IChat>('chats', ref => ref.orderByChild("createAt").limitToLast(12))
      .valueChanges()
      .pipe(map((m) =>{
        this.chats = m;
      }));
  }

  addMessage(message:string){
    const chat:IChat = {
      sender: this.user.displayName!,
      message,
      uid: this.user.uid,
      createAt: Date.now()
    }

    return this.db.list("chats").push(chat)
  }
}

export interface IChat {
  message: string;
  createAt?: number;
  sender: string;
  uid?: string;
  photoURL?:string
}
