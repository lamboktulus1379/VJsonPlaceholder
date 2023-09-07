import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TypingListComponent } from '../typing-list/typing-list.component';
import { TypingCreateComponent } from '../typing-create/typing-create.component';
import { TypingDetailsComponent } from '../typing-details/typing-details.component';
import { TypingUpdateComponent } from '../typing-update/typing-update.component';

const routes: Routes = [
  {path: 'typings', component: TypingListComponent},
  {path: 'create', component: TypingCreateComponent},
  {path: 'details/:id', component: TypingDetailsComponent},
  {path: 'update/:id', component: TypingUpdateComponent},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TypingRoutingModule { }
