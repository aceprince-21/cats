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
  constructor(public _passdata: UploadService, public _serveEdit: EdituploadService, public route: ActivatedRoute, public router: Router) { }
  public passData: any = [];
  public getHost: any = [];
  public getDocType: any = [];
  public id: any = [];
  public filterItem;
  public filterItemss: any = [];
  public hostapplist: any = [];
  public leftSelectedItem: any = [];
  public rightSelectedItem = [];
  public CollectData: any = [];
  public NewUploadData: any = [];
  public docSetting: boolean = false;
  public newEffectiveDate: any = null;
  public newTerminationDate: any = null;
  public fileName: any;
  public selfile: any;
  public fileSize: any;
  public fileType: any;
  public CheckSize: boolean = false;
  public CheckUpload: boolean = false;
  public messageBox: boolean = false;
  public dealerCon;
  public customerCon;
  public intUser;
  public partComp;
  public perUser;
  public selectedItem;
  public startDate;
  public endDate;
  public ErrorMsg;
  public CurrentDate = new Date();
  public MaxDate = new Date(Date.now());
  public DateErrorHandle = false;
  public keys:any = [];
  public windowUrl : any;
  public documentUrl: any =null;

  options: DatepickerOptions = {
  minYear: 1970,
  maxYear: 2030,
  displayFormat: 'MM/DD/YYYY',
  barTitleFormat: 'MMMM YYYY',
  firstCalendarDay: 0 // 0 - Sunday, 1 - Monday
  };

  ngOnInit() {
    this.windowUrl = configs.origin;
    
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
       // this.filterItemss = [];
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


  uploadFetchService(val, e) {
    this._serveEdit.EditPage(val, e).subscribe(
      data => {
        this.passData = data;
        
        /*Yet to Confirm this logic is required */
      
        console.log(data);
      },error => {
		  console.log('error')
		},() => {
      if(!this.passData.hostAppList){
      this.filterItemss = [];
      }
      else{
      this.filterItemss = this.passData.hostAppList;
      }
		  //this.filterItemss = this.passData.hostAppList;
		    if (val === 1) {
			  this.passData.dealerConsent = false;
			  this.passData.customerConsent = false;
			  this.passData.intUserConsent = false;
			  this.passData.partCompConsent = false;
			  this.passData.perUserAssentReq = false;
        this.documentUrl = this.windowUrl + "/documents/files/"+this.passData.docId;
        console.log(this.documentUrl);
			}
			else{
				  this.newEffectiveDate = new Date(this.passData.effectiveDate);
          this.newTerminationDate = new Date(this.passData.terminationDate);
          this.documentUrl = this.windowUrl + "/documents/files/"+this.passData.documentID;
          console.log(this.documentUrl);
        }
			
			
			this.hostAppService();
	  } );
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
		let getFilterID = [];
		let getHost = [];
		getHost = this.getHost;
	    getFilterID = this.filterItemss;
			   for(let i=0; i<getHost.length; i++){
				   for(let j=0; j<getFilterID.length; j++){
						if(getHost[i].hostAppID === getFilterID[j].hostAppID){
							 this.keys.push(getHost[i]);
							 getHost.splice(i,1);
						}
			      }
	         	}
				this.getHost = getHost;
				this.filterItemss = this.keys;
				this.getHost.filter((elem,i,arr)=> { return arr.indexOf(elem) === i});
				this.filterItemss.filter((elem,i,arr)=> {return arr.indexOf(elem) === i});
    }
  
  moveSelectedtoright(){
	  let LeftSelected = this.leftSelectedItem;
	  this.filterItemss = this.filterItemss.concat(LeftSelected);
	  this.removeTrue(LeftSelected);
	  this.initialFilter();
	  this.leftSelectedItem = [];
  }

  moveSelectedtoleft(){
	    let getFilterID = [];
		let getHost = [];
		getHost = this.rightSelectedItem;
		getFilterID = this.filterItemss;
		     for(let i=0; i<getHost.length; i++){
				   for(let j=0; j<getFilterID.length; j++){
						if(getHost[i].hostAppID === getFilterID[j].hostAppID){
							 getFilterID.splice(j,1);
						}
			      }
	         	}
		this.filterItemss = getFilterID;
		this.getHost = this.getHost.concat(this.rightSelectedItem);
	    this.removeTrue(getHost);
	    this.initialFilter();
		this.rightSelectedItem = [];
  }
  
  moveAlltoleft() {
		  this.getHost = this.getHost.concat(this.filterItemss);
		  this.filterItemss = [];
		  
  }
  
  moveAlltoright() {
			this.filterItemss = this.filterItemss.concat(this.getHost);
		    this.getHost = [];
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
      },error =>{
		  console.log('error');
	  },()=>{
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
    this.CollectData.documentURL = this.documentUrl;
    this.CollectData.submittedUser = this.passData.submittedUser;
	
	  const effDate = this.CurrentDates(this.newEffectiveDate, '-');
    const terDate = this.CurrentDates(this.newTerminationDate, '-');
    const curDate = this.CurrentDates(Date(), '-');
	
    this.CollectData.status = 'Active';
    this.CollectData.effectiveDate = effDate;
    this.CollectData.terminationDate = terDate;
    this.CollectData.uploadedDate = curDate;
	
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
    this.CollectData.status = 'Active';
    this.CollectData.documentID = this.passData.docId;
    this.CollectData.documentName = this.passData.docName;
    this.CollectData.submittedUser = this.passData.uploadedBy;
    this.CollectData.uploadedDate =  curDate;
    this.CollectData.effectiveDate =  effDate;
    this.CollectData.terminationDate = terDate ; 
    this.CollectData.documentURL = this.documentUrl;


    if (this.NewUploadData.hostAppList === this.NewUploadData.dealerConsent === this.NewUploadData.customerConsent === this.NewUploadData.intUserConsent === this.NewUploadData.partCompConsent === this.NewUploadData.perUserAssentReq === this.NewUploadData.docTypeID === true &&  this.DateErrorHandle == false) {
      this._serveEdit.sendResponse(this.CollectData).subscribe(
        done => this.reuploadDocument(done),
        error => this.erroeMsg(error));
    }

  }

  CurrentDates(sym, sel) {
    const Months = configs.Months;
    let getMontValue = 0;
    const getNewDate = sym.toString().split(' ');
    const getMonth =  getNewDate[1].toLowerCase();
    const getDay =  getNewDate[2];
    const getYear =  getNewDate[3];
    for(let i=0; i<Months.length; i++){
        if(getMonth === Months[i]){
          getMontValue = i+1;
        }
    }
    console.log(getMontValue+sel+getDay+sel+getYear);
    return getYear+sel+getMontValue+sel+getDay;
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
    this.passData.documentID = e.docId;
    this.passData.documentName = e.docName;
    this.passData.submittedUser = e.uploadedBy;
    this.passData.uploadedDate = e.uploadedDate;
    
    this.passData.checkFile = true;
    this.documentUrl = this.windowUrl + "/documents/files/"+this.passData.documentID;
    //this.router.navigate(['mydocuments/edit', e.docId])
  }

  delete(params) {
    this._serveEdit.deleteItem(params).subscribe(
      done => this.reuploadDocument(done),
      error => this.erroeMsg(error))
  }


}
