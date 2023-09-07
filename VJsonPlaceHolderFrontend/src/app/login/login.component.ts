import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EnvironmentUrlService } from 'src/app/shared/services/environment-url.service'
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { userForLogin } from '../_interfaces/userForLogin.model';
import { RepositoryService } from '../shared/services/repository.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  private dialogConfig: any;
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  public invalidLogin: boolean = true;

  constructor(
    private router: Router,
    private errorService: ErrorHandlerService,
    private repository: RepositoryService,
    private jwtHelper: JwtHelperService,
    private envUrl: EnvironmentUrlService,
  ) { }

  ngOnInit(): void {
    if (this.isUserAuthenticated()) {
      // Comment for ads verification
      this.router.navigate(['/home']);
    }

    this.loginForm = new UntypedFormGroup({
      Email: new UntypedFormControl('', [Validators.required, Validators.email]),
      Password: new UntypedFormControl('', [Validators.required])
    });
    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: {
      }
    }
  }
  public loginForm: any;

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }
  isUserAuthenticated() {
    let token: string = "";
    token = localStorage.getItem("jwt-admin") || "";
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

  public executeLoginUser(loginFormValue: any) {
    let user: userForLogin = {
      Email: loginFormValue.Email,
      Password: loginFormValue.Password
    }

    let apiUrl = 'api/auth/login';

    this.repository.create(this.envUrl.urlUserAddress, apiUrl, user).subscribe(res => {
      console.log("Response: ", res);
      const token = (<any>res).Token;
      const refreshToken = (<any>res).RefreshToken;
      const id = (<any>res).Id;
      localStorage.setItem("jwt-admin", token);
      localStorage.setItem("refreshTokenAdmin", refreshToken);
      localStorage.setItem('id', id);

      this.invalidLogin = false;
      this.router.navigate(["/"]);
      console.log("Success Login");

    }, (error) => {
      console.log("Error: ", error);

      this.errorService.dialogConfig = { ...this.dialogConfig }
      this.errorService.handleError(error);
    })
  }
  public loginUser = (loginFormValue: any) => {
    if (this.loginForm.valid) {
      this.executeLoginUser(loginFormValue);
    }
  }
}
