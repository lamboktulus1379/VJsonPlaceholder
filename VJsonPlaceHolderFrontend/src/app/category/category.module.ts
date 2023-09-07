import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryRoutingModule } from './category-routing/category-routing.module'
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { CategoryCreateComponent } from './category-create/category-create.component'
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from '../shared/shared.module';
import { CategoryUpdateComponent } from './category-update/category-update.component';

@NgModule({
  declarations: [CategoryListComponent, CategoryDetailsComponent, CategoryCreateComponent, CategoryUpdateComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CategoryModule { }
