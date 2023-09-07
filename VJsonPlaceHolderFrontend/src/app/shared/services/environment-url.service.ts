import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentUrlService {
  public urlAddress: string = environment.urlAddress;
  public urlScoreAddress: string = environment.urlScoreAddress;
  public urlUserAddress: string = environment.urlUserAddress;
  public urlAuth0Address: string = environment.urlAuth0Address;
  constructor() { }
}
