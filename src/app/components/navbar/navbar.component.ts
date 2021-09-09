import { LoaderService } from './../../services/loader.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lb-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
})
export class NavbarComponent implements OnInit {
  viewNav!:boolean;

  constructor(private auth: AuthService, private loader: LoaderService) {}

  ngOnInit(): void {
    this.auth.authState().subscribe( data =>{
      this.viewNav = !!data || false
    } )
  }

  async logOut() {
    await this.auth.logOut();
  }
}
