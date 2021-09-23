import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, filter } from 'rxjs/operators';
import { AuthService, IUserPublic } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  chats: IChat[] = [];
  users: IState[] = [];
  user!: IUserPublic;
  chatRoom: any;
  session!:{ user:string, id:string }

  constructor(
    private auth: AuthService,
    private store: AngularFirestore,
    private db: AngularFireDatabase
  ) {
    this.auth.user$.subscribe((usr) => {
      this.user = usr;
      this.connected();
      this.getLastChat();
    });
  }

  loadChats() {
    return this.db
      .list<IChat>('chats', (ref) =>
        ref.orderByChild('createAt').limitToLast(12)
      )
      .valueChanges()
      .pipe(
        map((m) => {
          this.chats = m.filter((msg) => msg.roomId === this.chatRoom);
        })
      );
  }

  async createChat(toUserID: string) {
    await this.findRooms(toUserID);
    if (!this.chatRoom) {
      const chatRoom = {
        user1: this.user.uid,
        user2: toUserID!,
        id: this.db.createPushId(),
        createAt: Date.now(),
      };

      this.chatRoom = chatRoom.id;
      this.db.object(`rooms/${chatRoom.id}`).set(chatRoom);
    } else {
      this.loadChats().subscribe(() => {});
    }

    this.lastChat(toUserID);
  }

  sendMessage(message: string) {
    const chat: IChat = {
      sender: this.user.displayName!,
      message,
      uid: this.user.uid,
      createAt: Date.now(),
      roomId: this.chatRoom,
    };
    return this.db.list<IChat>('chats').push(chat);
  }

  connected() {
    if (!this.user) return;

    const user: IState = {
      uid: this.user.uid!,
      state: 'online',
      displayName: this.user.displayName!,
      avatar: this.user.photoURL || null,
    };

    return this.db.object(`users/${this.user.uid}`).set(user);
  }

  getUsersConnected() {
    return this.db
      .list<IState>('users', (ref) => ref.limitToLast(8))
      .valueChanges()
      .pipe(
        map((m) => {
          this.users = m;
          return this.users;
        })
      );
  }

  disconnected() {
    const user: IState = {
      uid: this.user.uid!,
      state: 'offline',
      displayName: this.user.displayName!,
      avatar: this.user.photoURL || null,
    };

    return this.db.object(`users/${this.user.uid}`).set(user);
  }

  findRooms(userID?: any) {
    return new Promise((resolve) => {
      this.db.list('rooms').query.on('value', (ref) => {
        const rooms: [IRoom] = ref.exportVal();
        if (rooms) {
          const obj = Object.entries(rooms).find(
            ({ '0': key, '1': value }) =>
              (value?.user1 === this.user.uid && value?.user2 === userID) ||
              (value?.user1 === userID && value?.user2 === this.user.uid)
          );
          this.chatRoom = obj?.[0];
        }
        resolve(null);
      });
    });
  }

  private lastChat(userID:string) {
    this.db.object(`lastSession/${this.user.uid}`).set({ id: this.chatRoom, user:userID });
  }

  private getLastChat() {
    this.db.object('lastSession').query.on('value', (ref) => {
      if(ref.key === this.user.uid){
        this.chatRoom = ref.val().id;
        this.session = ref.val() || null
      }
    });
  }
}

export interface IChat {
  message: string;
  createAt?: number;
  sender: string;
  uid?: string;
  photoURL?: string;
  roomId: string;
}

export interface IState {
  displayName: string;
  uid: string;
  state: 'online' | 'offline';
  avatar: string | null;
}

interface IRoom {
  // id: string;
  user1: string;
  user2: string;
  createAt: number;
}
