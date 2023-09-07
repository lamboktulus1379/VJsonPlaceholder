import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { Category } from 'src/app/_interfaces/category.model';
@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {
  public category: Category = { Id: "", Name: "" };
  constructor(private repository: RepositoryService, private router: Router,
    private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }
  ngOnInit() {
    this.getOwnerDetails();
  }
  private getOwnerDetails = () => {
    let id: string = this.activeRoute.snapshot.params['id'];
    let apiUrl: string = `api/categories/${id}`;

    this.repository.getData("category", apiUrl)
      .subscribe(res => {
        this.category = res.body as Category;
      },
        (error) => {
          this.errorHandler.handleError(error);
        })
  }
}