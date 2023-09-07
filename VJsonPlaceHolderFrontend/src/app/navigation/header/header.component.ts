import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { email } from 'src/app/global';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();
  public user: string = '';

  public email: string = email;
  constructor(private jwtHelper: JwtHelperService, private route: Router, @Inject(DOCUMENT) public document: Document) { }

  ngOnInit(): void {
    this.isUserAuthenticated();
  }
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
  logout() {
    localStorage.removeItem("jwt-admin");
    localStorage.removeItem("refreshTokenAdmin");

    this.route.navigate(['/login']);
  }

  register() {
  }

  login() {
    console.log(">>> Login");
  }
  isUserAuthenticated() {
    const token: any = localStorage.getItem("jwt-admin") || "";
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.email = this.jwtHelper.decodeToken(token)["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];

      return true;
    }
    else {
      return false;
    }
  }
}
