import { Component, OnInit, OnDestroy } from '@angular/core';
import { UploadService } from './upload.service';
import { EdituploadService } from '../editupload/editupload.service';
import { Router, ActivatedRoute } from '@angular/router';
import { configs } from '../../environments/config';
import { DatepickerOptions } from 'ng2-datepicker';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  getData: any;
  result: any;
  p: number = 1;
  public perPage = 0;
  public Configs = [];
  public DropDowns: any;
  public totalCount = 0;
  public fileName: any;
  public selfile: any;
  public fileSize: any;
  public fileType: any;
  public CheckSize: boolean = false;
  public CheckUpload: boolean = false;
  public ErrorMsg;
  public UploadedDate = new Date(Date.now());
  public getDocTypes;
  public getStatus;
  public selectedItems;
  public selectedStatus;
  constructor(public _serv: UploadService, public _serveEdit: EdituploadService,public route: ActivatedRoute, public router: Router) { }
  
  options: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2030,
    displayFormat: 'MM/DD/YYYY',
    barTitleFormat: 'MMMM YYYY',
    firstCalendarDay: 0 // 0 - Sunday, 1 - Monday
    };

  ngOnInit() {
    this.uploadFetchService();
    this.doctypeService();
    this.DropDowns = configs.DropDowns;
    this.perPage = configs.DropDowns[0];
    this.getStatus = configs.Status;
  }

  uploadFetchService() {
    this._serv.getReposForUser().subscribe(
      data => {
        this.getData = data;
        this.totalCount = data.length;
        console.log(this.getData);
      }
  }

  parseData(info) {
    this.router.navigate(['mydocuments/edit', info]);
  }

  fileEvent(event) {
    let file = event.target.files[0];
    this.selfile = file;
    this.fileName = file.name;
    this.fileSize = file.size;
	this.fileType  =  file.type;
	this.CheckSize = true;
	
	if(this.fileType === 'application/pdf' && this.fileSize < 2899417){
		this.CheckUpload = true;
	}
	else{
		this.CheckUpload = false;
	}
  }

  uploadfile() {
    let fileList = this.selfile;
    if (this.fileSize < 2899417 && 	this.CheckUpload === true) {
      let file = fileList;
      console.log(fileList);
      let formData: FormData = new FormData();
      formData.append('file', file);
      formData.append('userName', 'Amritha');
      this._serv.getReposForUpload(formData).subscribe(
        done => this.uploadDocument(done),
        error => this.erroeMsg(error))
    }
  }
  
  uploadDocument(e){
  console.log(e.docId);
  this.router.navigate(['mydocuments/upload', e.docId])
}


doctypeService() {
  this._serveEdit.doctype().subscribe(
    data => {
      this.getDocType = data;
      console.log( this.getDocType);
    })
}

erroeMsg(e){
  this.ErrorMsg = e;
}

}
