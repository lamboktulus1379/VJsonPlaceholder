import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Location } from "@angular/common";
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { categoryForCreation } from 'src/app/_interfaces/categoryForCreation.model';
import { MatDialog } from "@angular/material/dialog";
import { SuccessDialogComponent } from 'src/app/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit {
  private dialogConfig: any;
  public categoryForm: any;

  public executeCategoryCreation(categoryFormValue: any) {
    let category: categoryForCreation = {
      Name: categoryFormValue.Name
    }

    let apiUrl = 'api/categories';

    this.repository.create("", apiUrl, category).subscribe(res => {
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


  constructor(private location: Location, private repository: RepositoryService, private dialog: MatDialog, private errorService: ErrorHandlerService) { }

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
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.categoryForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  public createCategory = (categoryFormValue: any) => {
    if (this.categoryForm.valid) {
      this.executeCategoryCreation(categoryFormValue);
    }
  }
}
