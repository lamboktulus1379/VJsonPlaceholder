import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Location } from "@angular/common";
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { categoryForUpdate } from 'src/app/_interfaces/categoryForUpdate.model';
import { MatDialog } from "@angular/material/dialog";
import { SuccessDialogComponent } from 'src/app/shared/dialogs/success-dialog/success-dialog.component';
import { Router, ActivatedRoute } from "@angular/router";
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Category } from 'src/app/_interfaces/category.model';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.scss']
})
export class CategoryUpdateComponent implements OnInit {
  private dialogConfig: any;
  public category: any;
  public categoryId: string = "";

  public executeCategoryUpdate(categoryFormValue: any) {
    let category: categoryForUpdate = {
      Name: categoryFormValue.Name
    }

    let apiUrl = `api/categories/${this.categoryId}`;

    this.repository.update(apiUrl, category).subscribe(res => {
      let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig)
      dialogRef.afterClosed()
        .subscribe(result => {
          this.location.back();
        });

    }, (error) => {
      this.errorService.dialogConfig = { ...this.dialogConfig }
      this.errorService.handleError(error);
    })
  }

  public categoryForm: any;
  constructor(private location: Location, private repository: RepositoryService, private dialog: MatDialog, private errorService: ErrorHandlerService, private activeRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.categoryForm = new UntypedFormGroup({
      Name: new UntypedFormControl('', [Validators.required, Validators.maxLength(60)])
    })

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: {}
    }

    this.getCategoryById();
  }
  getCategoryById() {
    this.categoryId = this.activeRouter.snapshot.params['id'];

    let categoryByIdUrl: string = `api/categories/${this.categoryId}`;

    this.repository.getData("", categoryByIdUrl)
      .subscribe(res => {
        this.category = res.body as Category;
        console.log(this.category);
        this.categoryForm.patchValue(this.category);
      })
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.categoryForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  public updateCategory = (categoryFormValue: any) => {
    if (this.categoryForm.valid) {
      this.executeCategoryUpdate(categoryFormValue);
    }
  }
}
