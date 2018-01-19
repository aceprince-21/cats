import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';
import { Headers, RequestOptions } from '@angular/http';
import { configs } from '../../environments/config'

@Injectable()
export class EdituploadService {

  constructor(private http : Http) { }

  EditPage(val,e): Observable<any> {
    let newVal = '';
	let url_replaceRetrieve = environment.getData.url.replace(/{origin}/g,  configs.origin);
  let url_replaceEdit = environment.setData.url.replace(/{origin}/g,  configs.origin);
    if(val === 0){
       newVal = url_replaceRetrieve+e;
    }
    else{
      newVal = url_replaceEdit+e;
    }
	console.log(e);
    return this.http
      .get(newVal)
      .map((res: any) => res.json())
  }

  getHostapp(): Observable<any> {
	 let url_replace = environment.hostApp.url.replace(/{origin}/g,  configs.origin);
    return this.http
      .get(url_replace)
      .map((res: any) => res.json())
  }

  doctype(): Observable<any> {
	   let url_replace = environment.doctype.url.replace(/{origin}/g,  configs.origin);
    return this.http
      .get(url_replace)
      .map((res: any) => res.json())
  }

  sendResponse (data: Object): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
	let url_replace = environment.mainData.url.replace(/{origin}/g,  configs.origin);
    return this.http.post(url_replace,JSON.stringify(data), options)
                     .map((res:Response) => res)
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  }
  
  reUpload(files): Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url_replace = environment.reUploaddResponse.url.replace(/{origin}/g,  configs.origin);
    return this.http.put(url_replace,files, options)
                    .map((res:Response) => res)
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));  
  }

  reUploadDocDetails(files): Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url_replace = environment.reUploaddResponse.url.replace(/{origin}/g,  configs.origin);
    return this.http.put(url_replace,files, options)
                    .map((res:Response) => res)
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));  
  }

  deleteItem(params: string): Observable <any> {
	  let url_replace = environment.deleteResponse.url.replace(/{origin}/g,  configs.origin);
    return this.http
      .delete(url_replace+params)
      .map((res: any) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
