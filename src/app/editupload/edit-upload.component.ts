import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EdituploadService } from './editupload.service';
import { UploadService } from '../upload/upload.service';
import { DatepickerOptions } from 'ng2-datepicker';
import { uploadModel } from './exportmodel';
import { configs } from '../../environments/config'

@Component({
  selector: 'app-edit-upload',
  templateUrl: './edit-upload.component.html',
  styleUrls: ['./edit-upload.component.scss']
})
export class EditUploadComponent implements OnInit {
  constructor(private _passdata: UploadService, private _serveEdit: EdituploadService, private route: ActivatedRoute, private router: Router) { }
  private passData: any = [];
  private getHost: any = [];
  private getDocType: any = [];
  private id: any = [];
  private filterItem;
  private filterItemss: any = [];
  private hostapplist: any = [];
  private leftSelectedItem: any = [];
  private rightSelectedItem: any = [];
  private CollectData: any = [];
  private NewUploadData: any = [];
  private docSetting: boolean = false;
  private newEffectiveDate: any = null;
  private newTerminationDate: any = null;
  private fileName: any;
  private selfile: any;
  private fileSize: any;
  private fileType: any;
  private CheckSize: boolean = false;
  private CheckUpload: boolean = false;
  private messageBox: boolean = false;
  private dealerCon;
  private customerCon;
  private intUser;
  private partComp;
  private perUser;
  private selectedItem;
  private startDate;
  private endDate;
  private ErrorMsg;
  private CurrentDate = new Date();
  private MaxDate = new Date(Date.now());
  private DateErrorHandle = false;

  options: DatepickerOptions = {
  minYear: 1970,
  maxYear: 2030,
  displayFormat: 'MM/DD/YYYY',
  barTitleFormat: 'MMMM YYYY',
  firstCalendarDay: 0 // 0 - Sunday, 1 - Monday
  };

  ngOnInit() {
    this.hostAppService();
    this.doctypeService();
    this.CollectData = uploadModel;
    
    this.route.params.subscribe((params: Params) => {
      /**files  / data**/
      this.filterItem = params;
      const get_path = this.router.url.split('/')[2];
      console.log(get_path);
      if (get_path != 'upload') {
        this.uploadFetchService(0, this.filterItem.files);
        this.docSetting = true;
      }
      else {
        this.uploadFetchService(1, this.filterItem.data);
        this.CollectData = this.passData;
        this.newEffectiveDate = this.CurrentDate;
        this.newTerminationDate = this.MaxDate;
      }
    });
	this.validation();
  }

validation(){
	 if(this.newEffectiveDate > this.newTerminationDate){
		 	this.DateErrorHandle = true;
	 }
	 else{
		 this.DateErrorHandle = false;
	 }
}
  CurrentDates(sym, sel) {
    const Months = configs.Months;
	let getMontValue = 0;
    return getMontValue;
  }

  uploadFetchService(val, e) {
    this._serveEdit.EditPage(val, e).subscribe(
      data => {
        this.passData = data;
        this.filterItemss = data.hostAppList;
        this.hostAppService();
        /*Yet to Confirm this logic is required */
        if (val === 1) {
          this.passData.dealerConsent = false;
          this.passData.customerConsent = false;
          this.passData.intUserConsent = false;
          this.passData.partCompConsent = false;
          this.passData.perUserAssentReq = false;
        }
        console.log(data);
      })
  }
  

    leftSelectedArray(host, ind) {
    if (host.active === 'true') {
      host.active = '';
      console.log(host);
      const remIem = this.leftSelectedItem.filter(e => e !== host)
      this.leftSelectedItem = remIem;
      host.active = ''
    }
    else {
      this.leftSelectedItem.push(host);
      const newitem = this.leftSelectedItem.filter((value, index, array) => {
        return array.indexOf(value) === index;
      });
      this.leftSelectedItem = newitem;
      host.active = 'true'
    }
  }
  
   righttSelectedArray(host, ind) {
    if (host.active === 'true') {
      host.active = '';
      console.log(host);
      const remIem = this.rightSelectedItem.filter(e => e !== host)
      this.rightSelectedItem = remIem;
      host.active = ''
    }
    else {
      this.rightSelectedItem.push(host);

      const newitem = this.rightSelectedItem.filter((value, index, array) => {
        return array.indexOf(value) === index;
      });
      this.rightSelectedItem = newitem;
      host.active = 'true'
    }
  }
  
  initialFilter(){
	   const currentItem = this.getHost;
	   const remItem = this.filterItemss;
	     console.log(remItem ,currentItem );
	      for(let i=0; i<currentItem.length; i++){
			   for(let j=0; j<remItem.length; j++){
			         if(currentItem[i].hostAppID === remItem[j].hostAppID ){
						 currentItem.splice(i,1);
					 }
		         }
		  }
	   this.filterItemss = this.filterItemss.filter(function(elem, i, array) {
        return array.indexOf(elem) === i;
       });
	   
	   this.getHost = this.getHost.filter(function(elem, i, array) {
        return array.indexOf(elem) === i;
       });
	   
  }
  
  moveSelectedtoright(){
      const leftItem = this.leftSelectedItem;
	  let rightItem = this.filterItemss;
	  this.filterItemss = rightItem.concat(leftItem);
	  this.filterItemss = this.filterItemss.filter(function(elem, i, array) {
        return array.indexOf(elem) === i;
       });
	  this.removeTrue(this.getHost);
	  this.initialFilter();
	  this.leftSelectedItem = [];
  }

  moveSelectedtoleft() {
	  const rightItem = this.rightSelectedItem;
	  const currentItem = this.getHost;
	  console.log(rightItem);
	  let alltItem = this.filterItemss;
	  for(let i=0; i<alltItem.length; i++){
			   for(let j=0; j<rightItem.length; j++){
			         if(alltItem[i].hostAppID === rightItem[j].hostAppID ){
						 this.filterItemss.splice(i,1);
					 }
		         }
		  }

	  this.getHost = currentItem.concat(rightItem);
	   this.getHost = this.getHost.filter(function(elem, i, array) {
        return array.indexOf(elem) === i;
       });
	   	  this.removeTrue(this.getHost);
		  this.rightSelectedItem = [];
  }
  
  moveAlltoleft() {
    const rightTable = this.filterItemss;
    const leftTable = this.getHost;
    let MoveTable = rightTable.concat(leftTable);
    console.log(MoveTable);
    this.getHost = this.removeTrue(MoveTable);
    this.filterItemss = [];
    this.initialFilter();
  }
  
 moveAlltoright() {
    const rightTable = this.filterItemss;
    const leftTable = this.getHost;
    let MoveTable = rightTable.concat(leftTable);
    this.filterItemss = this.removeTrue(MoveTable);
    this.initialFilter();
  }
  
  removeTrue(array) {
    array.forEach((element, index) => {
      element.active = '';
    });
    return array;
  }
  

  doctypeService() {
    this._serveEdit.doctype().subscribe(
      data => {
        this.getDocType = data;
      })
  }


  hostAppService() {
    this._serveEdit.getHostapp().subscribe(
      data => {
        this.getHost = data;
		this.initialFilter();
      })
  }

  editdata() {
    this.CollectData = {};
	 /* dealerCon; customerCon; intUser; partComp; perUser;*/
	 console.log(this.dealerCon);
    if (!this.dealerCon) {
      this.CollectData.dealerConsent = this.passData.dealerConsent;
    }
	else{
		 this.CollectData.dealerConsent  = this.dealerCon;
	}
	
    if (!this.customerCon) {
      this.CollectData.customerConsent = this.passData.customerConsent;
    }else{
		 this.CollectData.customerConsent = this.customerCon;
	}

    if (!this.intUser) {
      this.CollectData.intUserConsent = this.passData.intUserConsent;
    }else{
	   this.CollectData.intUserConsent = this.intUser;
	}

    if (!this.partComp) {
      this.CollectData.partCompConsent = this.passData.partCompConsent;
    }else{
	  this.CollectData.partCompConsent = this.partComp;
	}

    if (!this.perUser) {
      this.CollectData.perUserAssentReq = this.passData.perUserAssentReq;
    }else{
		this.CollectData.perUserAssentReq = this.perUser;
	}

    if (this.filterItemss.length === 0) {
      this.NewUploadData.hostAppList = false;
    } else {
      this.CollectData.hostAppList = this.filterItemss;
      this.NewUploadData.hostAppList = true;
    }

    if (!this.CollectData.effectiveDate) {
      this.CollectData.effectiveDate = this.passData.effectiveDate;
    }

    if (!this.CollectData.terminationDate) {
      this.CollectData.terminationDate = this.passData.terminationDate;
    }

    if (!this.CollectData.docTypeID) {
      this.CollectData.docTypeID = this.passData.docTypeID;
      this.CollectData.docTypeName = this.passData.docTypeName;
    }

    this.CollectData.documentID = this.passData.documentID;
    this.CollectData.documentName = this.passData.documentName;
    this.CollectData.documentURL = this.passData.documentID;
    this.CollectData.submittedUser = this.passData.submittedUser;
    this.CollectData.status = 'Active';
    this.CollectData.effectiveDate = '2018-1-6';
    this.CollectData.terminationDate = '2018-2-2';

    if (this.filterItemss === 0) {
      this.NewUploadData.hostAppList = false;
    } else {
      //let formData: FormData = new FormData();
      console.log(this.CollectData);
      if (this.passData.checkFile === true) {
        this._serveEdit.sendResponse(this.CollectData).subscribe(
          done => this.reuploadDocument(done),
          error => this.erroeMsg(error));
      }
      else {
        this._serveEdit.reUpload(this.CollectData).subscribe(
          done => this.reuploadDocument(done),
          error => this.erroeMsg(error))
      }


    }
  }


  uploadData() {
    this.CollectData = {};
    /* dealerCon; customerCon; intUser; partComp; perUser; selectedItem; newEffectiveDate; newTerminationDate*/

    if (this.filterItemss.length == 0) {
      this.CollectData.hostAppList = [];
      this.NewUploadData.hostAppList = false;
    } else {
      this.CollectData.hostAppList = this.filterItemss;
      this.NewUploadData.hostAppList = true;
    }

    if (!this.dealerCon) {
      this.CollectData.dealerConsent = false
      this.NewUploadData.dealerConsent = true;
    } else {
      this.CollectData.dealerConsent = true;
      this.NewUploadData.dealerConsent = true;
    }

    if (!this.customerCon) {
      this.CollectData.customerConsent = false;
      this.NewUploadData.customerConsent = true;
    } else {
      this.CollectData.customerConsent = true;
      this.NewUploadData.customerConsent = true;
    }

    if (!this.intUser) {
      this.CollectData.intUserConsent = false;
      this.NewUploadData.intUserConsent = true;
    } else {
      this.CollectData.intUserConsent = true;
      this.NewUploadData.intUserConsent = true;
    }

    if (!this.partComp) {
      this.CollectData.partCompConsent = false;
      this.NewUploadData.partCompConsent = true;
    } else {
      this.CollectData.partCompConsent = true;
      this.NewUploadData.partCompConsent = true;
    }

    if (!this.perUser) {
      this.CollectData.perUserAssentReq = false;
      this.NewUploadData.perUserAssentReq = true;
    } else {
      this.CollectData.perUserAssentReq = true;
      this.NewUploadData.perUserAssentReq = true;
    }

    if (!this.selectedItem || this.selectedItem === null) {
      this.NewUploadData.docTypeID = false;
    } else {
      this.CollectData.docTypeID = this.selectedItem;
      this.NewUploadData.docTypeID = true;
    }

    const effDate = this.CurrentDates(this.newEffectiveDate, '-');
    const terDate = this.CurrentDates(this.newTerminationDate, '-');
    const curDate = this.CurrentDates(Date(), '-');
	 console.log(curDate);
    this.CollectData.status = 'Active';
    this.CollectData.documentID = this.passData.document_id;
    this.CollectData.documentName = this.passData.document_name;
    this.CollectData.submittedUser = this.passData.uploaded_by;
    this.CollectData.uploadedDate =  curDate;
    this.CollectData.effectiveDate =  effDate;
    this.CollectData.terminationDate = terDate ; 
    this.CollectData.documentURL = this.passData.document_id;

    console.log(this.CollectData);


    if (this.NewUploadData.hostAppList === this.NewUploadData.dealerConsent === this.NewUploadData.customerConsent === this.NewUploadData.intUserConsent === this.NewUploadData.partCompConsent === this.NewUploadData.perUserAssentReq === this.NewUploadData.docTypeID === true &&  this.DateErrorHandle == false) {
      this._serveEdit.sendResponse(this.CollectData).subscribe(
        done => this.reuploadDocument(done),
        error => this.erroeMsg(error));
    }

  }

  erroeMsg(e) {
    this.ErrorMsg += e + ' | ';
  }

  reuploadDocument(e) {
    console.log(e);
    //setTimeout(() => {
    this.router.navigate(['/mydocuments']);
    // },2000);
  }

  goBack() {
    if(this.passData.checkFile === true){
      this._serveEdit.deleteItem(this.passData.documentID).subscribe(
      done => this.reuploadDocument(done),
      error => this.erroeMsg(error))
    }
    else{
      this.router.navigate(['/mydocuments']);
    }
  }

  DateValidation(x, y) {
    console.log(x);
    let startData = x.split(" ");
    let endDate = y.split(" ");

    if (startData[2] <= endDate[2]) {
      if (startData[1] <= endDate[1]) {
        if (startData[0] < endDate[0]) {
          return true;
        }
        else {
          return false;
        }
      }
    }
  }

  fileEvent(event) {
    let file = event.target.files[0];
    this.selfile = file;
    this.fileName = file.name;
    this.fileSize = file.size;
    this.fileType = file.type;
    this.CheckSize = true;

    if (this.fileType === 'application/pdf' && this.fileSize < 2899417) {
      this.CheckUpload = true;
    }
    else {
      this.CheckUpload = false;
    }
  }

  uploadfile() {
    let fileList = this.selfile;
    if (this.fileSize < 2899417 && this.CheckUpload === true) {
      let file = fileList;
      console.log(fileList);
      let formData: FormData = new FormData();
      formData.append('file', file);
      formData.append('docid', this.passData.documentID);
      this._passdata.getReposForReUpload(formData).subscribe(
        done => this.uploadDocument(done),
        error => this.erroeMsg(error))
    }
  }

  uploadDocument(e) {
    console.log(e.document_id);
    this.passData.documentID = e.document_id;
    this.passData.documentName = e.document_name;
    this.passData.submittedUser = e.uploaded_by;
    this.passData.uploadedDate = e.uploaded_date;

    this.passData.checkFile = true;
    this.router.navigate(['mydocuments/edit', e.document_id])
  }

  delete(params) {
    this._serveEdit.deleteItem(params).subscribe(
      done => this.reuploadDocument(done),
      error => this.erroeMsg(error))
  }


}
