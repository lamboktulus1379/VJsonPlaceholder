import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CommentRoutingModule } from './comment-routing/comment-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [CommentListComponent],
  imports: [
    CommonModule,
    CommentRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CommentModule { }
