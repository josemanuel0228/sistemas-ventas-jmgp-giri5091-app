import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token = new BehaviorSubject<string>("");
  private tokenData = new BehaviorSubject<any>("");
  private isLogged = new BehaviorSubject<boolean>(false);
  private isToggle = new BehaviorSubject<boolean>(false);  

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any) { 
      this.checkToken();
    }

  get token$() {
    return this.token.asObservable();
  }

  get tokenValue() {
    return this.token.getValue();
  }

  get tokenData$() {
    return this.tokenData.asObservable();
  }

  get isLogged$() {
    return this.isLogged.asObservable();
  }

  get isToggle$() {
    return this.isToggle.asObservable();
  }

  login(credentiales: any) {
    return this.http.post<any>(`${ environment.API_URL }/auth`, credentiales)
      .pipe( map( (data: any) => {
        if (data.token) {
          this.saveLocalStorage(data.token);
          this.token.next(data.token);
          this.router.navigate(['/home']);


        }

        return data;
      }),
      catchError( (error) => this.handlerError(error) ));
  }

  saveLocalStorage(token: string) {
    sessionStorage.setItem("accessToken", token);
  }

  checkToken() {
    if (isPlatformBrowser(this.platformId)) {
      const token = sessionStorage.getItem("accessToken");
      if (token) {
        const isExpired = helper.isTokenExpired(token);
        if (isExpired) {
          this.logout()
        } else {
          this.token.next(token);
          const {iat, exp, ...payload} = helper.decodeToken(token);
          this.tokenData.next(payload);
          this.isLogged.next(true);
        }
      } else {
        this.logout();
      }
    }
  }

  logout() {
    sessionStorage.removeItem("accessToken");
    this.isLogged.next(false);
    this.token.next("");
    this.tokenData.next("null");
    this.router.navigate(['/auth']);
  }

  toggleSidenav(flag: boolean) {
    if (flag) this.isToggle.next(flag);
  }

  handlerError(error: any): Observable<never> {
    var message = "Ocurrió un error";
    if (error.error) {
      message = `${ error.error.message }`;
    }

    this.snackBar.open(message, '', {
      duration: 5 * 1000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });

    return throwError( () => Error(message) );
  }
}
