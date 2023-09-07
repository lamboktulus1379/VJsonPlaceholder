import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { Typing } from 'src/app/interfaces/typing.model';
import { EnvironmentUrlService } from 'src/app/shared/services/environment-url.service';

@Component({
  selector: 'app-typing-details',
  templateUrl: './typing-details.component.html',
  styleUrls: ['./typing-details.component.scss']
})
export class TypingDetailsComponent implements OnInit {
  public typing: Typing | undefined;

  constructor(private repository: RepositoryService,
    private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService,
    private envUrl: EnvironmentUrlService) { }

  ngOnInit(): void {
    this.gettypingDetails();
  }
  private gettypingDetails = () => {
    let id: string = this.activeRoute.snapshot.params['id'];
    let apiUrl: string = `api/typings/${id}`;

    this.repository.getData(this.envUrl.urlAddress, apiUrl)
      .subscribe(async res => {
        this.typing = await res.body;
        console.log("typing: ", this.typing);
      },
        (error) => {
          this.errorHandler.handleError(error);
        })
  }
}
