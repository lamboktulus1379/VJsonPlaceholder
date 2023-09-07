import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TypingAnalysis } from 'src/app/interfaces/typingAnalysis.model';
import { EnvironmentUrlService } from 'src/app/shared/services/environment-url.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { Page } from 'src/app/_interfaces/page.model';

@Component({
  selector: 'app-typing-analysis-list',
  templateUrl: './typing-analysis-list.component.html',
  styleUrls: ['./typing-analysis-list.component.scss']
})

export class TypingAnalysisListComponent implements OnInit, AfterViewInit {
  public typingAnalysis: TypingAnalysis[] = [];
  public categorySelected = new Set();
  public order: string;
  public whereIn: string = "";
  public Title: string = "";
  public loading: boolean = false;
  public page: Page = {};
  public pageSize: number = 10;
  public pageIndex: number = 0;
  public pageNumber: number = 1;
  public defaultUrl: string = `api/typing-analysis?pageSize=${this.pageSize}&pageNumber=${this.pageNumber}&Title=${this.Title}`;
  public displayedColumns = ['user', 'content', 'typing', 'speed', 'accuracy', 'createdAt']

  public dataSource = new MatTableDataSource<TypingAnalysis>();
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
    private envUrl: EnvironmentUrlService) {
    this.order = "DateCreated desc";
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getTypingAnalysis();

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: false,
      data: {}
    }
  }
  public getTypingAnalysis = () => {
    this.loading = true;
    this.repoService.getData(this.envUrl.urlAddress, this.defaultUrl)
      .subscribe(res => {
        let dt: TypingAnalysis[] = res.body as TypingAnalysis[];
        this.typingAnalysis.push(...dt);


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

  public pageChanged = (event: any) => {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.defaultUrl = `api/typing-analysis?pageSize=${this.pageSize}&pageNumber=${this.pageNumber}&Title=${this.Title}`;
    this.getTypingAnalysis();
  }

  public customeSort = (event: any) => {
    if (event.active == "categories") {
      this.dataSource.sort = this.sort;
      return;
    }
    this.order = `${event.active} ${event.direction}`;
    this.defaultUrl = `api/typing-analysis?orderBy=${this.order}&Title=${this.Title}`
    this.getTypingAnalysis();
  }

  refresh() {
    this.getTypingAnalysis();
  }
}
