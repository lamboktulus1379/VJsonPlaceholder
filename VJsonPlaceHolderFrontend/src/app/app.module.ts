import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { InternalServerComponent } from './error-pages/internal-server/internal-server.component';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './layout/layout.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './navigation/header/header.component'
import { MaterialModule } from './material/material.module';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { TypingModule } from './typing/typing.module';
import { CategoryModule } from './category/category.module';
import { ServerErrorComponent } from './error-pages/server-error/server-error.component';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { TypingAnalysisModule } from './typing-analysis/typing-analysis.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';

export function tokenGetter() {
  return localStorage.getItem("jwt-admin");
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    InternalServerComponent,
    NotFoundComponent,
    LayoutComponent,
    HeaderComponent,
    SidenavListComponent,
    ServerErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    CommentModule,
    TypingModule,
    CategoryModule,
    RouterModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5001', 'localhost:5003', 'localhost:5005', 'localhost:5007', 'tulus.fun', 'score.tulus.fun', 'typing.tulus.fun', 'user.tulus.fun', 'gra.tulus.fun', 'admin.tulus.fun'],
        disallowedRoutes: []
      }
    }),
    TypingAnalysisModule,
    UserModule
  ],
  exports: [
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
