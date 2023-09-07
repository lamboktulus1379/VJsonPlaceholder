import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { ServerErrorComponent } from './error-pages/server-error/server-error.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'comment', loadChildren: () => import('./comment/comment.module').then(m => m.CommentModule) },
  { path: 'typing', loadChildren: () => import('./typing/typing.module').then(m => m.TypingModule), canActivate: [] },
  { path: 'typing-analysis', loadChildren: () => import('./typing-analysis/typing-analysis.module').then(m => m.TypingAnalysisModule), canActivate: [] },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule), canActivate: [] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '500', component: ServerErrorComponent },
  // { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
