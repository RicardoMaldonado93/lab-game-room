import { Router } from '@angular/router';
import { ChatService } from './../../services/chat.service';
import { LoaderService } from './../../services/loader.service';
import { AuthService, IUserPublic } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lb-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
})
export class NavbarComponent implements OnInit {
  viewNav!:boolean;
  user!:IUserPublic;

  constructor(private auth: AuthService, private chat:ChatService, private router:Router) {
    this.auth.user$.subscribe( usr => this.user = usr );
  }

  ngOnInit(): void {
    this.auth.authState().subscribe( data =>{
      this.viewNav = !!data || false
    } )
  }

  logOut() {
    this.chat.disconnected();
    this.auth.logOut();
    this.router.navigate(["login"])
  }
}
