import { IUserPublic } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ChatService, IChat, IState } from './../../services/chat.service';
import { SnackbarService } from './../../services/snackbar.service';
@Component({
  selector: 'lb-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass'],
})
export class ChatComponent implements OnInit {

  today: Date = new Date();
  chats!: HTMLElement;
  loader: boolean = true;
  message!: string;
  minimized: boolean = false;
  chatsContainer!: HTMLElement | any;
  usersConnected!: HTMLElement | any;
  userSelected:any;

  constructor(public cs: ChatService, private snackbar: SnackbarService) {
    this.cs.loadChats().subscribe(() => {
      setTimeout(() => {
        this.chats.scrollTop = this.chats?.scrollHeight;
        this.loader = false;
      }, 100);
      this.userSelected= { uid:this.cs.session }
    });

    this.cs.getUsersConnected().subscribe((a)=>{})
    
  }

  ngOnInit() {
    this.chatsContainer = document.getElementById('chats-container');
    this.chats = document.getElementById('chats')!;
    this.usersConnected = document.getElementById("users-connected")

    setTimeout(() => {
      this.chatsContainer?.classList.remove('animate__delay-3s');
      this.usersConnected?.classList.remove('animate__delay-3s');
    }, 4000);

    setTimeout(() => {
      this.openClose()
    }, 6000);
  }

  enviarMensaje() {
    if (!this.message) return this.snackbar.openError('Debe enviar un mensaje');

    this.cs
      .sendMessage(this.message)
      .then((res) => (this.message = ''))
      .catch((err) => this.snackbar.openError(err));
  }

  openClose() {
    this.minimized = !this.minimized;
    if (this.minimized) {
      this.chatsContainer?.classList.remove('animate__animated', 'animate__slideInUp');
      this.chatsContainer?.classList.add('animate__animated', 'animate__slideOutDown');
      this.usersConnected?.classList.remove('animate__animated', 'animate__slideInRight');
      this.usersConnected?.classList.add('animate__animated', 'animate__slideOutRight');
    } else {
      this.chatsContainer?.classList.remove('animate__animated','animate__slideOutDown');
      this.chatsContainer?.classList.add('animate__animated', 'animate__slideInUp');
      this.usersConnected?.classList.remove('animate__animated','animate__slideOutRight');
      this.usersConnected?.classList.add('animate__animated', 'animate__slideInRight');
    }
  }

  formatDate(date: number | undefined) {
    if (!date) return;

    return moment(date).calendar();
  }

  sendMessage(userSelected:IState){
    this.userSelected = userSelected;
    this.cs.createChat(userSelected.uid);
  }
}
