import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';

@Injectable()
export class EdituploadService {

  constructor(private http : Http) { }

  EditPage(e): Observable<any> {
    return this.http
      .get(environment.getData.url+e)
      .map((res: any) => res.json())
  }

  getHostapp(): Observable<any> {
    return this.http
      .get(environment.hostApp.url)
      .map((res: any) => res.json())
  }

  doctype(): Observable<any> {
    return this.http
      .get(environment.doctype.url)
      .map((res: any) => res.json())
  }

}
