import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from '../category-list/category-list.component';
import { RouterModule, Routes } from '@angular/router';
import { CategoryDetailsComponent } from '../category-details/category-details.component';
import { CategoryCreateComponent } from '../category-create/category-create.component';
import { CategoryUpdateComponent } from '../category-update/category-update.component';

const routes: Routes = [
  {path: 'categories', component: CategoryListComponent},
  {path: 'details/:id', component: CategoryDetailsComponent},
  {path: 'create', component: CategoryCreateComponent},
  { path: 'update/:id', component: CategoryUpdateComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CategoryRoutingModule { }
