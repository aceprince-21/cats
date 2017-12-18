import { Component, OnInit } from '@angular/core';
import {UploadService} from './upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  getFile:any;
  constructor(private _serv : UploadService) { }
  
  ngOnInit() {
    this.uploadFetchService();
  }

  uploadFetchService(){
    this._serv.getReposForUser().subscribe(
      function(res) {
        this.getFile = res;
        console.log(this.getFile);
      });
  } 

}
