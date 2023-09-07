import { isPlatformBrowser } from '@angular/common';
import { Injectable, OnInit, Inject, PLATFORM_ID } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  signOut(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.localStorage.clear();
    }
  }

  public saveToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      window.localStorage.removeItem(TOKEN_KEY);
      window.localStorage.setItem(TOKEN_KEY, token);
    }
  }

  public getToken(): any {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(TOKEN_KEY);
    }
  }

  public saveUser(user : any): void {
    if (isPlatformBrowser(this.platformId)) {
      window.localStorage.removeItem(USER_KEY);
      window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  }

  public getUser(): any {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(USER_KEY);  
    }
  }
}
