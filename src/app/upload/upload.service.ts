import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';

@Injectable()
export class UploadService {

  constructor(private http : Http) { }

  getReposForUser(): Observable<any> {
    return this.http
      .get(environment.mainData.url)
      .map((res: any) => res.json())
  }

}
