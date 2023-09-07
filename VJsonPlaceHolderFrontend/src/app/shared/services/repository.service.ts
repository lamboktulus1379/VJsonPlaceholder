import { Injectable } from '@angular/core';

import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { EnvironmentUrlService } from './environment-url.service';
import { Category } from 'src/app/_interfaces/category.model';
import { Page } from 'src/app/_interfaces/page.model';
@Injectable({
  providedIn: 'root',
})

export class RepositoryService {

  constructor(
    private http: HttpClient,
    private envUrl: EnvironmentUrlService,
  ) { }

  public getData = (host: string = this.envUrl.urlAddress, route: string) => {
    return this.http.get<any>(
      this.createCompleteRoute(route, host), { observe: 'response', ...this.generateHeaders() },
    );
  };

  public create = (host: string = this.envUrl.urlAddress, route: string, body: any) => {
    return this.http.post(
      this.createCompleteRoute(route, host),
      body,
      { ...this.generateHeaders() }
    );
  };

  public update = (route: string, body: any) => {
    return this.http.put(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      body,
      this.generateHeaders()
    );
  };

  public delete = (route: string) => {
    return this.http.delete(
      this.createCompleteRoute(route, this.envUrl.urlAddress)
    );
  };

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  };

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };
  };
}
