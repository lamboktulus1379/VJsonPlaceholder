import { AfterViewInit, Component, ErrorHandler, NgModule, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { Category } from 'src/app/_interfaces/category.model';
import { MatSort } from "@angular/material/sort"
import { MatPaginator } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router } from "@angular/router";
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})


export class CategoryListComponent implements OnInit, AfterViewInit {

  public order: string;
  public displayedColumns = ['name', 'details', 'update', 'delete']

  public dataSource = new MatTableDataSource<Category>();

  @ViewChild(MatSort) sort: any;
  @ViewChild(MatPaginator) paginator: any;

  private dialogConfig: any;

  constructor(private repoService: RepositoryService, private errorService: ErrorHandlerService, private router: Router, private dialog: MatDialog) {
    this.order = "Id desc";
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getAllCategories();

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: false,
      data: {}
    }
  }

  public getAllCategories = () => {
    this.repoService.getData("categoryHos", `api/categories?orderBy=${this.order}`)
      .subscribe(res => {
        this.dataSource.data = res.body as Category[];
        console.log(res);
      }, (error) => {
        this.errorService.handleError(error)
      })
  }

  customeSort = (event: any) => {
    console.log(event);

    this.order = `${event.active} ${event.direction}`;
    this.getAllCategories();
  }

  public redirectToDetails = (id: string) => {
    let url: string = `category/details/${id}`
    this.router.navigate([url]);
  }

  public redirectToUpdate = (id: string) => {
    const updateUrl: string = `/category/update/${id}`
    this.router.navigate([updateUrl]);
  }

  public redirectToDelete = (id: string) => {

    let dialogRef = this.dialog.open(ConfirmDialogComponent, this.dialogConfig)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let deleteUrl: string = `api/categories/${id}`
        this.repoService.delete(deleteUrl).subscribe(res => {
          this.getAllCategories();
        }, (error) => {
          this.errorService.dialogConfig = { ...this.dialogConfig }
          this.errorService.handleError(error);
        })
      }
    })

  }

  public doFilter = (val: any) => {
    let value: string | '' = val.target.value
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  public pageChanged = (event: any) => {
    console.log(event);

  }
}
