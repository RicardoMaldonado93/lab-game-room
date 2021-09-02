import { AuthService, IUserPublic } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';
@Component({
  selector: 'lb-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
})
export class ProfileComponent implements OnInit {
  public user!: IUserPublic;
  profileImage: HTMLElement = document.createElement('div');

  constructor(private auth: AuthService, private sanitizer: DomSanitizer) {
    this.auth.user$.subscribe((data: IUserPublic) => {
      // this.profileImage.innerHTML = data.photoURL!
      const { email, displayName, firstName, lastName, photoURL, uid } = data;

      this.user = {
        email,
        displayName,
        firstName,
        lastName,
        photoURL,
        uid,
      };
    });
  }

  ngOnInit(): void {}

  setImg() {
    const img = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    img.innerHTML = this.user.photoURL!;
    return this.user.photoURL!;
  }
}
