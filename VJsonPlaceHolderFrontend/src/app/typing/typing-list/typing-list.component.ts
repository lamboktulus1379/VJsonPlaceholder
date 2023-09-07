import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { Typing } from 'src/app/interfaces/typing.model';
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
  selector: 'app-typing-list',
  templateUrl: './typing-list.component.html',
  styleUrls: ['./typing-list.component.scss']
})


export class TypingListComponent implements OnInit, AfterViewInit {
  public currenttypings: Typing[] = [];
  public categorySelected = new Set();
  public order: string;
  public whereIn: string = "";
  public Title: string = "";
  public loading: boolean = false;
  public page: Page = {};
  public pageSize: number = 10;
  public pageIndex: number = 0;
  public pageNumber: number = 1;
  public defaultUrl: string = `api/typings?pageSize=${this.pageSize}&pageNumber=${this.pageNumber}&Title=${this.Title}`;
  public displayedColumns = ['title', 'author', 'content', 'createdBy', 'updatedBy', 'createdAt', 'updatedAt', 'details', 'update', 'delete']

  public dataSource = new MatTableDataSource<Typing>();
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
    this.order = "DateCreated desc";
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.gettypings();

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: false,
      data: {}
    }
  }


  public gettypings = () => {
    this.loading = true;
    this.repoService.getData(this.envUrl.urlAddress, this.defaultUrl)
      .subscribe(res => {
        let dt: Typing[] = res.body as Typing[];
        this.currenttypings.push(...dt);


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
      this.Title = e.target.value;
    } else {
      this.Title = "";
    }

    this.search(this.Title);
  }

  public search(by: string) {
    this.defaultUrl = `api/typings?pageSize=${this.pageSize}&title=${by}`;
    this.gettypings();
  }

  customeSort = (event: any) => {
    if (event.active == "categories") {
      this.dataSource.sort = this.sort;
      return;
    }
    this.order = `${event.active} ${event.direction}`;
    this.defaultUrl = `api/typings?orderBy=${this.order}&Title=${this.Title}`
    this.gettypings();
  }

  public redirectToDetails = (id: string) => {
    let url: string = `typing/details/${id}`
    this.router.navigate([url]);
  }

  public redirectToUpdate = (id: string) => {
    const updateUrl: string = `/typing/update/${id}`
    this.router.navigate([updateUrl]);
  }

  public redirectToDelete = (id: string) => {

    let dialogRef = this.dialog.open(ConfirmDialogComponent, this.dialogConfig)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let deleteUrl: string = `api/typings/${id}`
        this.repoService.delete(deleteUrl).subscribe(res => {
          this.gettypings();
        }, (error) => {
          this.errorService.dialogConfig = { ...this.dialogConfig }
          this.errorService.handleError(error);
        })
      }
    })

  }

  refresh() {
    this.gettypings();
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
    this.defaultUrl = `api/typings?pageSize=${this.pageSize}&pageNumber=${this.pageNumber}&Title=${this.Title}`;
    this.gettypings();
  }
}
