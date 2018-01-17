import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class EdituploadService {

  constructor(private http : Http) { }

  EditPage(val,e): Observable<any> {
    let newVal = '';
    if(val === 0){
       newVal = environment.getData.url+e;
    }
    else{
      newVal = environment.setData.url+e;
    }
	console.log(e);
    return this.http
      .get(newVal)
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

  sendResponse (data: Object): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

console.log("url "+ environment.mainData.url);
    return this.http.post(environment.mainData.url,JSON.stringify(data), options)
                     .map((res:Response) => res)
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  }
  
  reUpload(files): Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(environment.reUploaddResponse.url,files, options)
                    .map((res:Response) => res)
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));  
  }

  reUploadDocDetails(files): Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(environment.reUploaddResponse.url,files, options)
                    .map((res:Response) => res)
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));  
  }

  deleteItem(params: string): Observable <any> {
    return this.http
      .delete(environment.deleteResponse.url+params)
      .map((res: any) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
