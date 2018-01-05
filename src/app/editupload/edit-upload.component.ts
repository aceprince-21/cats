import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EdituploadService } from './editupload.service';
import { UploadService } from '../upload/upload.service';
import { BasicfilterPipe } from '../pipe/filter/basicfilter.pipe';
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
  private messageBox:boolean = false;
  private dealerCon;
  private customerCon;
  private intUser;
  private partComp;
  private perUser;
  private selectedItem;
  private startDate;
  private endDate;
  private ErrorMsg;
  
  options: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2030,
    displayFormat: 'MM/DD/YYYY',
    barTitleFormat: 'MMMM YYYY',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
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
        this.uploadFetchService(0, this.filterItem.data);
        this.docSetting = true;
      }
      else {
        this.uploadFetchService(1, this.filterItem.data);
        this.CollectData = this.passData;
        this.newEffectiveDate = Date();
		this.newTerminationDate  = new Date();
		let newDate =  this.newEffectiveDate;
		newDate = parseInt(newDate.split(' ')[2]);
		this.newTerminationDate.setDate(newDate + 15);
      }
    });
  }


  CurrentDate(sym, sel) {
    const Months = configs.Months;
    let getMontValue = 0;
    let date = Date();
    let month = date.split(' ')[1];
    let curentDate = parseInt(date.split(' ')[2]);
    let Year = date.split(' ')[3];
    month = month.toLowerCase();

    for (let i = 0; i < Months.length; i++) {
      if (Months[i] === month) {
        getMontValue = i + 1;
      }
    }
    return getMontValue + sym + (curentDate + sel) + sym + Year;
  }

  uploadFetchService(val, e) {
    this._serveEdit.EditPage(val, e).subscribe(
      data => {
        this.passData = data;
        this.filterItemss = data.hostAppList;
        this.filterExistingItems();
		
		/*Yet to Confirm this logic is required */
	    if(val === 1){
		
      	this.passData.dealerConsent = false;
		this.passData.customerConsent = false;
		this.passData.intUserConsent = false;
		this.passData.partCompConsent = false;
		this.passData.perUserAssentReq = false;
	   }
	   
      })

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
      })
  }

  filterExistingItems() {
    let getHost = this.getHost;
    const applist = this.filterItemss;
    let keys = [];

    for (let i = 0; i < getHost.length; i++) {
      for (let j = 0; j < applist.length; j++) {
        if (getHost[i].hostAppID === applist[j].hostAppID) {
          getHost.splice(i, 1);
        }
      }
    }
    keys = getHost;
    const dataT = keys.filter((value, index, array) => {
      return array.indexOf(value) === index;
    });
    this.hostapplist = [];
    this.getHost = [];
    this.hostapplist = applist;
    this.getHost = dataT;
  }

  filterrightItems(x) {
    let getHost = x;
    const applist = this.filterItemss;
    let keyss = [];
    x.forEach((element) => {
      keyss = applist.filter(e => e !== element);
    });
    this.filterItemss = keyss;
    uploadModel.hostAppList = this.filterItemss;
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

  moveAlltoright() {
    const rightTable = this.filterItemss;
    const leftTable = this.getHost;
    let MoveTable = rightTable.concat(leftTable);
    this.filterItemss = this.removeTrue(MoveTable);
    this.filterExistingItems();
  }

  moveSelectedtoright() {
    const rightTable = this.filterItemss;
    const leftTable = this.leftSelectedItem;
    let MoveTable = rightTable.concat(leftTable);
    this.filterItemss = this.removeTrue(MoveTable);
    this.leftSelectedItem = [];
    this.filterExistingItems();
  }

  moveSelectedtoleft() {
    const rightTable = this.rightSelectedItem;
    const leftTable = this.getHost;
    let MoveTable = leftTable.concat(rightTable);
    this.getHost = this.removeTrue(MoveTable);
    console.log(MoveTable);
    this.filterrightItems(this.rightSelectedItem);
    this.rightSelectedItem = [];
  }

  moveAlltoleft() {
    const rightTable = this.filterItemss;
    const leftTable = this.getHost;
    let MoveTable = rightTable.concat(leftTable);
    console.log(MoveTable);
    this.getHost = this.removeTrue(MoveTable);
    this.filterItemss = [];
    this.filterExistingItems();
  }

  removeTrue(array) {
    array.forEach((element, index) => {
      element.active = '';
    });
    return array;
  }


  editdata() {
		
    if (this.CollectData.dealerConsent === "") {
      this.CollectData.dealerConsent = this.passData.dealerConsent;
    }

    if (this.CollectData.customerConsent === "") {
      this.CollectData.customerConsent = this.passData.customerConsent;
    }

    if (this.CollectData.intUserConsent === ""){
      this.CollectData.intUserConsent = this.passData.intUserConsent;
    }

    if (this.CollectData.partCompConsent === "") {
      this.CollectData.partCompConsent = this.passData.partCompConsent;
    }

    if (this.CollectData.perUserAssentReq == "") {
      this.CollectData.perUserAssentReq = this.passData.perUserAssentReq;
    }

    if (this.filterItemss.length === 0) {
        this.NewUploadData.hostAppList = false;
    }else{
		 this.CollectData.hostAppList = this.filterItemss;
		 this.NewUploadData.hostAppList = true;
	}
	
    if (this.CollectData.effectiveDate == "") {
      this.CollectData.effectiveDate = this.passData.effectiveDate;
    }
	
	if (this.CollectData.terminationDate == "") {
      this.CollectData.terminationDate = this.passData.terminationDate;
    }
	
	if (this.CollectData.docTypeID == "") {
      this.CollectData.docTypeID = this.passData.docTypeID;
	  this.CollectData.docTypeName = this.passData.docTypeName;
    }
	
	
	
    this.CollectData.documentID = this.passData.documentID;
	this.CollectData.documentName =this.passData.documentName;
	this.CollectData.documentURL = this.passData.documentURL;
	this.CollectData.submittedUser = this.passData.submittedUser;

	
	if (!this.filterItemss) {
        this.NewUploadData.hostAppList = false;
    }else{
			 let formData: FormData = new FormData();
				  if(this.selfile){
					 let file = this.selfile;
					 formData.append('file', file);
				    }
					else{
						formData.append('file', '');
					}
				  console.log(this.CollectData);
				  formData.append('Data', this.CollectData);
				  this._serveEdit.reUpload(formData).subscribe(
				  done => this.reuploadDocument(done),
				  error =>  this.erroeMsg(error))
	}
}


uploadData(){
     this.CollectData = [];
     let newItem:any = [];
	 /* dealerCon; customerCon; intUser; partComp; perUser; selectedItem; newEffectiveDate; newTerminationDate*/

  if (this.filterItemss.length == 0) {
		  this.CollectData.hostAppList = [];
          this.NewUploadData.hostAppList = false;
		}else{
			 this.CollectData.hostAppList = this.filterItemss;
			 this.NewUploadData.hostAppList = true;
		}
		
		if (!this.dealerCon){
			this.CollectData.dealerConsent = false
			this.NewUploadData.dealerConsent = true;
		}else{
			this.CollectData.dealerConsent = true;
			this.NewUploadData.dealerConsent = true;
		}
		
		if (!this.customerCon){
			this.CollectData.customerConsent = false;
			this.NewUploadData.customerConsent = true;
		}else{
			this.CollectData.customerConsent = true;
			this.NewUploadData.customerConsent = true;
		}
		
		if (!this.intUser){
			this.CollectData.intUserConsent = false;
			this.NewUploadData.intUserConsent = true;
		}else{
			this.CollectData.intUserConsent = true;
			this.NewUploadData.intUserConsent = true;
		}
		
		if (!this.partComp){
			this.CollectData.partCompConsent = false;
			this.NewUploadData.partCompConsent = true;
		}else{
			this.CollectData.partCompConsent = true;
			this.NewUploadData.partCompConsent = true;
		}
		
		if (!this.perUser){
			this.CollectData.perUserAssentReq = false;
			this.NewUploadData.perUserAssentReq = true;
		}else{
			this.CollectData.perUserAssentReq = true;
			this.NewUploadData.perUserAssentReq = true;
		}
		
		if (!this.selectedItem || this.selectedItem === null ){
			this.NewUploadData.docTypeID = false;
		}else{
			this.CollectData.docTypeID = this.selectedItem;
			this.NewUploadData.docTypeID = true;
		}
		
		this.CollectData.status = this.passData.status;
		this.CollectData.documentID = this.passData.document_id;
		this.CollectData.documentName = this.passData.document_name;
		this.CollectData.submittedUser = this.passData.uploaded_by;
		this.CollectData.uploadedDate = this.passData.uploaded_date;
		this.CollectData.effectiveDate = this.newEffectiveDate;
		this.CollectData.terminationDate = this.newTerminationDate;
				
      newItem.push(this.CollectData);
      console.log(newItem);
		
		 if( this.NewUploadData.hostAppList === this.NewUploadData.dealerConsent === this.NewUploadData.customerConsent === this.NewUploadData.intUserConsent === this.NewUploadData.partCompConsent === this.NewUploadData.perUserAssentReq === this.NewUploadData.docTypeID === true){
			  let formData: FormData = new FormData();
		   formData.append('Data', newItem);
		   this._serveEdit.sendResponse(formData).subscribe(
				  done => this.reuploadDocument(done),
				  error =>  this.erroeMsg(error));
		 }

}

erroeMsg(e){
    this.ErrorMsg = e;
}

reuploadDocument(e){
          setTimeout(() => {
          this.router.navigate(['/mydocuments']);
          },2000);
  }
 
  goBack() {
    this.router.navigate(['/mydocuments']);
  }

  DateValidation(x,y){
    console.log(x);
    let startData = x.split(" ");
    let endDate = y.split(" ");

    if(startData[2] <= endDate[2]){
       if(startData[1] <= endDate[1]){
          if(startData[0] < endDate[0]){
             return true;
          }
          else{
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
      this._passdata.getReposForUpload(formData).subscribe(
        done => this.reuploadDocument(done),
        error =>  console.log(error))
    }
  }

  delete(params){
    this._serveEdit.deleteItem(params).subscribe(
      done => this.reuploadDocument(done),
      error =>  console.log(error))
    }
  
  
}
