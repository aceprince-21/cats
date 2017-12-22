import { Component, OnInit, OnDestroy } from '@angular/core';
import {UploadService} from './upload.service';
import { Router, ActivatedRoute } from '@angular/router';
import {configs} from '../../environments/config'

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  getData:any;
  result:any;
  private perPage = 0;
  private Configs = [];
  private DropDowns = [];
  private totalCount = 0;
  constructor(private _serv : UploadService, private route:ActivatedRoute,  private router: Router) { }
  
  ngOnInit() {
    this.uploadFetchService();
    this.perPage = 1;
    this.DropDowns = configs.DropDowns;
  }

  uploadFetchService(){
    this._serv.getReposForUser().subscribe(
      data => {
        this.getData = data;
        this.totalCount = data.length;
        console.log(this.getData);
      })
  }

  parseData(info){
    this.router.navigate(['upload/edit', info]);
  }

uploadfile(event) {  
let fileList: FileList = event.target.files;  
if (fileList.length > 0) {  
let file: File = fileList[0];  
let formData: FormData = new FormData();  
formData.append('file', file, file.name); 
console.log(formData); 
this._serv.getReposForUpload(formData).subscribe(error => console.log(error))
} 
 
window.location.reload();  
} 
}
