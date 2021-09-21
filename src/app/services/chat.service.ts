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

  constructor(
    private auth: AuthService,
    private store: AngularFirestore,
    private db: AngularFireDatabase
  ) {
    this.auth.user$.subscribe((usr) => {
      this.user = usr;
      this.connected();
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
          this.chats = m.filter(msg => msg.roomId === this.chatRoom);
        })
      );
  }

  async createChat(toUserID: string) {
    await this.findRooms(toUserID);
    // this.findRooms(toUserID).subscribe( r =>{

    // console.log("recover", this.chatRoom)
    if(!this.chatRoom){
      const chatRoom = {
        user1: this.user.uid,
        user2: toUserID!,
        id: this.db.createPushId(),
        createAt: Date.now(),
      };

      this.chatRoom = chatRoom.id;
      console.log("genere un registro")
      this.db.object(`rooms/${chatRoom.id}`).set(chatRoom)
    }
    else{
      this.loadChats().subscribe(()=>{})
    }
    // })
  }

  sendMessage(message: string) {
    const chat: IChat = {
      sender: this.user.displayName!,
      message,
      uid: this.user.uid,
      createAt: Date.now(),
      roomId: this.chatRoom
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
    // return this.db
    //   .list<IRoom>('rooms', (ref) => )
    return new Promise((resolve) => {
      this.db.list('rooms').query.on('value', (ref) => {
        const rooms: [IRoom] = ref.exportVal();
        if(rooms){
          const obj = Object.entries(rooms).find(
            ({ '0': key, '1': value }) =>
              (value?.user1 === this.user.uid && value?.user2 === userID) ||
              (value?.user1 === userID && value?.user2 === this.user.uid)
          );
          this.chatRoom = obj?.[0]
        }
        // const result = rooms.find( r =>
        //   (value?.user1 === this.user.uid && r?.user2 === userID) || (r?.user1 === userID && r?.user2 === this.user.uid )
        // )
        // this.chatRoom =  result?.id
        resolve(null);
      });
    });

    // return this.db
    // .list<IRoom>('rooms')
    // .snapshotChanges()
    // .pipe(
    //   map((rooms) => rooms.map((m) => m.payload.val() )),
    //   map((rooms) => {
    //     console.log( "actual: ", this.user.uid )
    //     console.log( "to: ", userID )
    //     const result = rooms.find( r => (r?.user1 === this.user.uid && r?.user2 === userID) || (r?.user1 === userID && r?.user2 === this.user.uid ))
    //     console.log(result)
    //     this.chatRoom = result?.id
    //     // const room = rooms.find(
    //     //   (room) =>
    //     //     (room?.user1 == this.user.uid && room?.user2 == userID) || (room?.user1 == userID && room?.user2 == this.user.uid)
    //     // );

    //     // this.chatRoom= room?.id
    //   }),

    // );
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
