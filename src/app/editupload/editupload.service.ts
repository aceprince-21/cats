import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';
import { Headers, RequestOptions } from '@angular/http';

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

  sendResponse(files): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(environment.editedResponse.url,files, options).map((res:Response) => res.json());
  }

}
