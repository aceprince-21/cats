import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';
import { Headers, RequestOptions } from '@angular/http';


@Injectable()
export class UploadService {

  constructor(private http : Http) { }

  getReposForUser(): Observable<any> {
    return this.http
      .get(environment.mainData.url)
      .map((res: any) => res.json())
  }

getReposForUpload(files): Observable<any> {
  console.log('test::::',files);
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    return this.http.post(environment.postData.url,files, options)
               .map((res:Response) => res.json());
               
  }

}
