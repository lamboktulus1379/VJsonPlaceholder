import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CommentListComponent } from '../comment-list/comment-list.component';

const routes: Routes = [
  { path: 'comments', component: CommentListComponent },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CommentRoutingModule { }
