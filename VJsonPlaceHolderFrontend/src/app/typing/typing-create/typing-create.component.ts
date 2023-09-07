import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Location } from "@angular/common";
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { SuccessDialogComponent } from 'src/app/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import TypingForCreation from 'src/app/interfaces/TypingCreation';
import { EnvironmentUrlService } from 'src/app/shared/services/environment-url.service';

@Component({
  selector: 'app-typing-create',
  templateUrl: './typing-create.component.html',
  styleUrls: ['./typing-create.component.scss']
})
export class TypingCreateComponent implements OnInit {
  private dialogConfig: MatDialogConfig<any> | undefined;


  public typingForm: any;
  constructor(private location: Location, private repository: RepositoryService, private dialog: MatDialog, private errorService: ErrorHandlerService,
    private envUrl: EnvironmentUrlService,) { }

  ngOnInit(): void {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    this.typingForm = new UntypedFormGroup({
      Title: new UntypedFormControl('Quote', [Validators.required, Validators.maxLength(60)]),
      Author: new UntypedFormControl('', [Validators.required, Validators.maxLength(100)]),
      Content: new UntypedFormControl('', [Validators.required, Validators.minLength(20)])
    });

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: {}
    }
  }


  public executeTypingCreation(typingFormValue: any) {
    const typing: TypingForCreation = {
      Title: typingFormValue.Title,
      Author: typingFormValue.Author,
      Content: typingFormValue.Content,
      CreatedBy: 'Admin',
      UpdatedBy: 'Admin',
      CreatedAt: new Date(),
      UpdatedAt: new Date()
    }

    let apiUrl = 'api/typings';

    this.repository.create(this.envUrl.urlAddress, apiUrl, typing).subscribe(async (res) => {
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

  public hasError = (controlName: string, errorName: string) => {
    return this.typingForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  public createtyping = (typingFormValue: any) => {
    if (this.typingForm.valid) {
      this.executeTypingCreation(typingFormValue);
    }
  }
}
