import { map } from 'rxjs/operators';
import { AuthService, IUserPublic } from './../../services/auth.service';
import { Component, ElementRef, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'lb-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  profileImage: HTMLElement = document.createElement('div');

  constructor(
    public auth: AuthService,
    private el: ElementRef,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((data: IUserPublic) => {
      this.profileImage.innerHTML = data.photoURL!;
      // document.body.appendChild(this.profileImage)
    });
  }
}
