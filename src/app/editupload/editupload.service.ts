import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';


@Injectable()
export class EdituploadService {

  constructor(private http : Http) { }

  EditPage(): Observable<any> {
    return this.http
      .get(`https://jsonplaceholder.typicode.com/posts/1`)
      .map((res: any) => res.json())
  }

}
