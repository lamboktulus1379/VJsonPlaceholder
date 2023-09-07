import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import {
  faHome,
  faThLarge,
  faPlusCircle,
  faShoppingCart,
  faUserAlt,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string = "";
  faHome = faHome;
  faThLarge = faThLarge;
  faPlusCircle = faPlusCircle;
  faShoppingCart = faShoppingCart;
  faUserAlt = faUserAlt;

  public title: string = "typing App"

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
  }
  public logout = () => {
    localStorage.removeItem("jwt-admin");
    localStorage.removeItem("refreshTokenAdmin");
  }
}
