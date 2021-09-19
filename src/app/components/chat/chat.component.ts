import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ChatService } from './../../services/chat.service';
import { SnackbarService } from './../../services/snackbar.service';
@Component({
  selector: 'lb-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass'],
})
export class ChatComponent implements OnInit {
  message!: string;
  element!: HTMLElement | any;
  minimized: boolean = false;
  today: Date = new Date();
  chats!: HTMLElement;
  loader: boolean = true;

  constructor(public cs: ChatService, private snackbar: SnackbarService) {
    this.cs.loadChats().subscribe(() => {
      setTimeout(() => {
        this.chats.scrollTop = this.chats?.scrollHeight;
        this.loader = false;
      }, 100);
    });
  }

  ngOnInit() {
    this.element = document.getElementById('app-mensajes');
    this.chats = document.getElementById('chats')!;

    setTimeout(() => {
      this.element?.classList.remove('animate__delay-3s');
    }, 4000);
  }

  enviarMensaje() {
    if (!this.message) return this.snackbar.openError('Debe enviar un mensaje');

    this.cs
      .addMessage(this.message)
      .then((res) => (this.message = ''))
      .catch((err) => this.snackbar.openError(err));
  }

  openClose() {
    this.minimized = !this.minimized;
    console.log("click")
    if (this.minimized) {
      this.element?.classList.remove('animate__animated', 'animate__slideInUp');
      this.element?.classList.add('animate__animated', 'animate__slideOutDown');
    } else {
      this.element?.classList.remove(
        'animate__animated',
        'animate__slideOutDown'
      );
      this.element?.classList.add('animate__animated', 'animate__slideInUp');
    }
  }

  formatDate(date: number | undefined) {
    if (!date) return;

    return moment(date).calendar();
  }
}
