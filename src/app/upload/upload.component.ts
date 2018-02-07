import { Component, OnInit, OnDestroy } from '@angular/core';
import { UploadService } from './upload.service';
import { EdituploadService } from '../editupload/editupload.service';
import { Router, ActivatedRoute } from '@angular/router';
import { configs } from '../../environments/config';
import { DatepickerOptions } from 'ng2-datepicker';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

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
  public getUploadedDate:any = '';
  public getnewUploadedDate:any ='';
  public getDocTypes;
  public getStatus;
  public selectedItems = '';
  public getselectedItems = '';
  public selectedStatus = '';
  public getselectedStatus = '';
  public itemItems= '';
  public documentIds = '';
  public getdocumentIds = '';
  public documentName = '';
  public getdocumentName = '';
  public uploaderCws = '';
  public getuploaderCws = '';
  public filterItems;
  isDesc;
  column;
  constructor(private modalService:NgbModal, public _serv: UploadService, public _serveEdit: EdituploadService, public route: ActivatedRoute, public router: Router) { }
  
  options: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2030,
    displayFormat: 'MM/DD/YYYY',
    barTitleFormat: 'MMMM YYYY',
    firstCalendarDay: 0 // 0 - Sunday, 1 - Monday
    };

  ngOnInit() {
    this.getData = [];
    this.uploadFetchService();
    this.doctypeService();
    this.DropDowns = configs.DropDowns;
    this.perPage = configs.DropDowns[0];
    this.getStatus = configs.Status;
    this.filterItems = '';
  }

  uploadFetchService() {
    this._serv.getReposForUser().subscribe(
      data => {
        this.getData = data;
        this.totalCount = data.length;
        console.log(this.getData);
      });
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
      this.getDocTypes = data;
      console.log( this.getDocTypes);
    })
}

erroeMsg(e){
  this.ErrorMsg = e;
}

search(){
  let strr:any;
  let res:any;
  this.getdocumentIds= this.documentIds;
  this.getselectedItems= this.selectedItems;
  this.getuploaderCws = this.uploaderCws;
  this.getdocumentName = this.documentName;
  if(this.getnewUploadedDate === ''){
    this.getUploadedDate = '';
  }
  else{
    this.getUploadedDate = this.getnewUploadedDate;
  }
  this.getselectedStatus = this.selectedStatus;
}

SelectDate(){
  this.getnewUploadedDate = this.CurrentDates(this.UploadedDate, '-');
}

reset() {
  this.documentIds = '';
  this.selectedItems='';
  this.uploaderCws ='';
  this.documentName='';
  this.selectedStatus = '';
  this.getdocumentIds= ''
  this.getselectedItems= '';
  this.getuploaderCws = '';
  this.getdocumentName = '';
  this.getUploadedDate = '';
  this.getnewUploadedDate = '';
  this.getselectedStatus = '';
}

open(content) {
  this.modalService.open(content);
}

getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}

CurrentDates(sym, sel) {
  const Months = configs.Months;
  let getMontValue:any;
  const getNewDate = sym.toString().split(' ');
  const getMonth =  getNewDate[1].toLowerCase();
  const getDay =  getNewDate[2];
  const getYear =  getNewDate[3];
  for(let i=0; i<Months.length; i++){
      if(getMonth === Months[i]){
        getMontValue = i+1;
      }
  }
  if(getMontValue.toString.length === 1){
    getMontValue = '0'+getMontValue;
  }
  return getYear+sel+getMontValue+sel+getDay;
}


sort(property){
  this.isDesc = !this.isDesc; //change the direction    
  this.column = property;
  let direction = this.isDesc ? 1 : -1;

  this.getData.sort(function(a, b){
      if(a[property] < b[property]){
          return -1 * direction;
      }
      else if( a[property] > b[property]){
          return 1 * direction;
      }
      else{
          return 0;
      }
  });
};



}
