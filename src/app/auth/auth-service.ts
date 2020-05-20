import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, Subject, throwError} from 'rxjs';
import {User} from './user.model';
import {Router} from '@angular/router';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn : 'root'})
export class AuthService {

  user = new BehaviorSubject<User>(null);

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  signUp(email: string, password: string) {
    return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA0n2pN7HiQsIS8aDGptscAqAgeKS_PUvg',
      {
        email,
        password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError), tap(responseData => {
        this.handleAuthenticatedUser(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
      }
    ));
  }

  login(email: string, password: string) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA0n2pN7HiQsIS8aDGptscAqAgeKS_PUvg',
      {
        email,
        password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError), tap(responseData => {
      this.handleAuthenticatedUser(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
    }
    ));
  }

  autoLogin() {
    // tslint:disable-next-line:max-line-length
    const userData: {email: string, id: string, _token: string, _tokenExpirationDate: string} = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if (loadedUser.token) {
      this.user.next(loadedUser);
      // tslint:disable-next-line:max-line-length
      // computing the expiration time by subtracting the token expiration time extracted from local storage and subtracting the current time from it.
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
  }

  autoLogout(expirationDuration: number) {
     setTimeout(() =>
     {
       this.logout();
     }, expirationDuration);
  }

  private handleAuthenticatedUser(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct';
        break;
    }
    return throwError(errorMessage);
  }
}
