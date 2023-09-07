
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { Comment } from 'src/app/interfaces/comment.model';
import { MatSort } from "@angular/material/sort"
import { MatPaginator } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router } from "@angular/router";
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { Page } from 'src/app/_interfaces/page.model';
import { EnvironmentUrlService } from 'src/app/shared/services/environment-url.service';
import * as XLSX from "xlsx"

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})


export class CommentListComponent implements OnInit, AfterViewInit {
  public currentcomments: Comment[] = [];
  public categorySelected = new Set();
  public order: string;
  public whereIn: string = "";
  public Email: string = "";
  public loading: boolean = false;
  public page: Page = {};
  public pageSize: number = 10;
  public pageIndex: number = 0;
  public pageNumber: number = 1;
  public defaultUrl: string = `api/comments?pageSize=${this.pageSize}&pageNumber=${this.pageNumber}&email=${this.Email}`;
  public displayedColumns = ['id', 'postId', 'name', 'email', 'body']

  public dataSource = new MatTableDataSource<Comment>();
  title: string = "XlsUpload";
  file: any;
  arrayBuffer: any;
  filelist: any

  @ViewChild(MatSort) sort: any;
  @ViewChild(MatPaginator) paginator: any;

  private dialogConfig: any;

  constructor(
    private repoService: RepositoryService,
    private errorService: ErrorHandlerService,
    private router: Router,
    private dialog: MatDialog,
    private envUrl: EnvironmentUrlService
  ) {
    this.order = "email desc";
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getcomments();

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: false,
      data: {}
    }
  }


  public getcomments = () => {
    this.loading = true;
    this.repoService.getData(this.envUrl.urlAddress, this.defaultUrl)
      .subscribe(res => {
        let dt: Comment[] = res.body as Comment[];
        this.currentcomments.push(...dt);


        this.dataSource.data = dt;
        this.page = JSON.parse(res.headers.get("x-pagination") || "") as Page;
        this.pageIndex = (this.page.CurrentPage || 1) - 1;

        this.loading = false;
      }, (error) => {
        this.errorService.handleError(error)
      })

    // this.http.get<any>(`https://localhost:5000/${this.defaultUrl}`, {observe: 'response',headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json'})}).subscribe(res => {
    //   console.log(res.headers);
    // })
  }

  public doSearch(e: any) {
    if (e.target.value.length > 2) {
      this.Email = e.target.value;
    } else {
      this.Email = "";
    }

    this.search(this.Email);
  }

  public search(by: string) {
    this.defaultUrl = `api/comments?pageSize=${this.pageSize}&email=${by}`;
    this.getcomments();
  }

  customeSort = (event: any) => {
    if (event.active == "categories") {
      this.dataSource.sort = this.sort;
      return;
    }
    this.order = `${event.active} ${event.direction}`;
    this.defaultUrl = `api/comments?orderBy=${this.order}&Email=${this.Email}`
    this.getcomments();
  }

  public redirectToDetails = (id: string) => {
    let url: string = `comment/details/${id}`
    this.router.navigate([url]);
  }

  public redirectToUpdate = (id: string) => {
    const updateUrl: string = `/comment/update/${id}`
    this.router.navigate([updateUrl]);
  }

  public redirectToDelete = (id: string) => {

    let dialogRef = this.dialog.open(ConfirmDialogComponent, this.dialogConfig)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let deleteUrl: string = `api/comments/${id}`
        this.repoService.delete(deleteUrl).subscribe(res => {
          this.getcomments();
        }, (error) => {
          this.errorService.dialogConfig = { ...this.dialogConfig }
          this.errorService.handleError(error);
        })
      }
    })

  }

  refresh() {
    this.getcomments();
  }

  addfile(event) {
    this.file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
      var arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      this.filelist = [];
      console.log("File List", arraylist)
    }
  }

  public doFilter = (val: any) => {
    let value: any = val.target.value || '';
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  public pageChanged = (event: any) => {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.defaultUrl = `api/comments?pageSize=${this.pageSize}&pageNumber=${this.pageNumber}&Email=${this.Email}`;
    this.getcomments();
  }
}
