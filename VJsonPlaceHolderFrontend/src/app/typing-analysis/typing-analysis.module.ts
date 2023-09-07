import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypingAnalysisRoutingModule } from './typing-analysis-routing.module';
import { TypingAnalysisListComponent } from './typing-analysis-list/typing-analysis-list.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    TypingAnalysisListComponent
  ],
  imports: [
    CommonModule,
    TypingAnalysisRoutingModule,
    SharedModule,
    RouterModule,
  ]
})
export class TypingAnalysisModule { }
