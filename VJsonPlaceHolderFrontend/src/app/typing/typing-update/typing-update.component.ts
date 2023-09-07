import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Location } from "@angular/common";
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { TypingForUpdate } from 'src/app/interfaces/TypingForUpdate.model';
import { MatDialog } from "@angular/material/dialog";
import { SuccessDialogComponent } from 'src/app/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Category } from 'src/app/_interfaces/category.model';
import { ActivatedRoute } from '@angular/router';
import { Typing } from 'src/app/interfaces/typing.model';
import { EnvironmentUrlService } from 'src/app/shared/services/environment-url.service';

@Component({
  selector: 'app-typing-update',
  templateUrl: './typing-update.component.html',
  styleUrls: ['./typing-update.component.scss']
})
export class TypingUpdateComponent implements OnInit {
  private dialogConfig: any;

  public categories: Category[] = [];
  public typing: Typing | undefined;
  public typingId: string = "";

  public typingForm: any;
  constructor(private location: Location, private repository: RepositoryService, private dialog: MatDialog, private errorHandler: ErrorHandlerService, private activeRoute: ActivatedRoute,
    private envUrl: EnvironmentUrlService) { }

  ngOnInit(): void {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    this.typingForm = new UntypedFormGroup({
      Title: new UntypedFormControl('', [Validators.required, Validators.maxLength(60)]),
      Author: new UntypedFormControl('', [Validators.required, Validators.maxLength(100)]),
      Content: new UntypedFormControl('', [Validators.required, Validators.minLength(20)]),
    })

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: {}
    }
    this.gettypingById();
  }
  private gettypingById = () => {
    this.typingId = this.activeRoute.snapshot.params['id'];
    let apiUrl: string = `api/typings/${this.typingId}`;

    this.repository.getData(this.envUrl.urlAddress, apiUrl)
      .subscribe(res => {
        this.typing = res.body as Typing;

        this.typingForm.patchValue(this.typing);
      },
        (error) => {
          this.errorHandler.handleError(error);
        })
  }


  public executetypingUpdate(typingFormValue: any) {
    let typing: TypingForUpdate = {
      Title: typingFormValue.Title,
      Author: typingFormValue.Author,
      Content: typingFormValue.Content,
      UpdatedAt: new Date(),
      CreatedBy: this.typing?.CreatedBy,
      UpdatedBy: 'Admin'
    }

    let apiUrl = `api/typings/${this.typingId}`;

    this.repository.update(apiUrl, typing).subscribe(res => {
      let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig)
      dialogRef.afterClosed()
        .subscribe(result => {
          this.location.back();
        });

    }, (error) => {
      this.errorHandler.dialogConfig = { ...this.dialogConfig }
      this.errorHandler.handleError(error);
    })
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.typingForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  public updatetyping = (typingFormValue: any) => {
    if (this.typingForm.valid) {
      this.executetypingUpdate(typingFormValue);
    }
  }
}
