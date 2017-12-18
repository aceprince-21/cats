import { Component, OnInit, OnDestroy } from '@angular/core';
import {UploadService} from './upload.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  getData:any;
  constructor(private _serv : UploadService, private route:ActivatedRoute,  private router: Router) { }
  
  ngOnInit() {
    this.uploadFetchService();
  }

  uploadFetchService(){
    this._serv.getReposForUser().subscribe(
      data => {
        this.getData = data;
        console.log(this.getData);
      })
  }

  parseData(info){
    this.router.navigate(['upload/edit', info]);
  }

}
