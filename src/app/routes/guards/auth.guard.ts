import { formsNames } from './../routersNames';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from './../../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(next: any, state: any): Observable<boolean> {
     return this.auth.user$.pipe(
      take(1),
      map((user) => !!user),
      tap((loggedIn) => {
        const { LOGIN } = formsNames;
        if (!loggedIn) {
          this.router.navigate([`/${LOGIN}`]);
        }
      })
    );
  }

}
