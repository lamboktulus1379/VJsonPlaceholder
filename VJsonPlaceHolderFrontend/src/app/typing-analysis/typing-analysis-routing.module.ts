import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypingAnalysisListComponent } from './typing-analysis-list/typing-analysis-list.component';

const routes: Routes = [
  { path: 'typing-analysis-list', component: TypingAnalysisListComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypingAnalysisRoutingModule { }
