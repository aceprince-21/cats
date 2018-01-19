import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';
import { Headers, RequestOptions } from '@angular/http';
import { configs } from '../../environments/config';

@Injectable()
export class UploadService {

constructor(private http : Http) { }
  getReposForUser(): Observable<any> {
    let url_replace = environment.mainData.url.replace(/{origin}/g,  configs.origin);
    return this.http
      .get(url_replace)
      .map((res: any) => res.json())
  }

getReposForUpload(files): Observable<any> {
  console.log('test::::',files);
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers }); 
    let url_replace = environment.postData.url.replace(/{origin}/g,  configs.origin);
    return this.http.post(url_replace,files, options)
               .map((res:Response) => res.json());
               
  }

  getReposForReUpload(files): Observable<any> {
  console.log('test::::',files);
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    let url_replace = environment.reUploadData.url.replace(/{origin}/g,  configs.origin);
    return this.http.put(url_replace,files, options)
               .map((res:Response) => res.json()); 
   }

}
