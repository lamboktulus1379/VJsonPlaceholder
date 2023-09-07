import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypingListComponent } from './typing-list/typing-list.component';
import { TypingRoutingModule } from './typing-routing/typing-routing.module';
import {MaterialModule} from '../material/material.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TypingCreateComponent } from './typing-create/typing-create.component';
import { TypingDetailsComponent } from './typing-details/typing-details.component';
import { TypingUpdateComponent } from './typing-update/typing-update.component';


@NgModule({
  declarations: [TypingListComponent, TypingCreateComponent, TypingDetailsComponent, TypingUpdateComponent],
  imports: [
    CommonModule,
    TypingRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class TypingModule { }
