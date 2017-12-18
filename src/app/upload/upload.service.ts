import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class UploadService {

  constructor(private http : Http) { }

  getReposForUser(): Observable<any> {
    return this.http
      .get(`https://jsonplaceholder.typicode.com/posts/1`)
      .map((res: any) => res.json())
  }

}
