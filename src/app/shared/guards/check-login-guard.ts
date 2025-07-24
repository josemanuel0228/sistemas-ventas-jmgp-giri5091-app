import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class checkLoginGuard implements CanActivate {
  constructor(private authSvc: AuthService) { }

  canActivate(): Observable<boolean> {
    return this.authSvc.token$.pipe(
      take(1),
      map(token => (token === '' ? true : false)) 
    );
  }
}

