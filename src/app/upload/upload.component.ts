import { Component, OnInit, OnDestroy } from '@angular/core';
import { UploadService } from './upload.service';
import { Router, ActivatedRoute } from '@angular/router';
import { configs } from '../../environments/config'

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  getData: any;
  result: any;
  private perPage = 0;
  private Configs = [];
  private DropDowns: any;
  private totalCount = 0;
  private fileName: any;
  private selfile: any;
  private fileSize: any;
  private CheckSize: boolean = false;
  constructor(private _serv: UploadService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.uploadFetchService();

    this.DropDowns = configs.DropDowns;
    this.perPage = configs.DropDowns[0];
  }

  uploadFetchService() {
    this._serv.getReposForUser().subscribe(
      data => {
        this.getData = data;
        this.totalCount = data.length;
        console.log(this.getData);
      })
  }

  parseData(info) {
    this.router.navigate(['mydocuments/edit', info]);
  }

  fileEvent(event) {
    let file = event.target.files[0];
    this.selfile = file;
    this.fileName = file.name;
    this.fileSize = file.size;

  }

  uploadfile() {
    let fileList: FileList = this.selfile;
    console.log(fileList);
    if (this.fileSize > 2899417) {
      this.CheckSize = true;
    }
    else {
      this.CheckSize = false;
    }

    if (fileList.length > 0 && this.fileSize < 2899417) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('file', file);
      this._serv.getReposForUpload(formData).subscribe(
        done => console.log('done'),
        error =>  console.log(error))
    }
    this.router.navigate(['mydocuments/upload', 'newDoc']) 
  }
}
