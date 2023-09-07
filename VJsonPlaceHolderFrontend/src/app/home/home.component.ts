import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Typing } from '../interfaces/typing.model';
import { TypingContent } from '../interfaces/typingContent.model';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { RepositoryService } from '../shared/services/repository.service';
import { Page } from '../_interfaces/page.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild("myboard")
  _el!: ElementRef;

  public contentArr: string[] = [];
  public contentDoc: TypingContent[] = [];

  public TYPING_RANDOM_URL = "api/typings/random";
  public currentTyping: string = "";

  public i = 0;
  public j = 0;
  public error = 0;
  public numberOfTyping = 0;

  public typing: Typing | undefined;
  public currentWord: string = "";
  public interval: any;
  public userTime: number = 0;
  public result: number = 0;
  public correctTyping: number = 0;

  public typingStart: boolean = false;
  constructor(
    public jwtHelper: JwtHelperService,
    private repository: RepositoryService,
    private errorService: ErrorHandlerService,
    private router: Router) { }


  ngOnInit(): void {
  }

  public go2021() {
    console.log("2021 Best!!!");
  }

  isUserAuthenticated() {
    // const token: string = localStorage.getItem("jwt-admin");
    // if (token && !this.jwtHelper.isTokenExpired(token)) {
    //   return true;
    // }
    // else {
    //   return false;
    // }
  }
}